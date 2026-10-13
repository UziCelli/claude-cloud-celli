// Notificação "Descanso acabou" mesmo com o app fechado: avisa o Worker da Cloudflare (push/)
// quando o descanso termina. Tudo opcional e silencioso: qualquer falha é ignorada para nunca quebrar o cronômetro.
const BASE = import.meta.env.VITE_PUSH_URL as string | undefined
const CHAVE_VAPID = 'forca-push-vapid'

export const b64uParaBytes = (s: string): Uint8Array<ArrayBuffer> => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

export const juntarUrl = (base: string, caminho: string) => base.replace(/\/+$/, '') + caminho

// A inscrição existente só serve se foi criada com a chave VAPID atual do Worker.
export function mesmaChave(atual: ArrayBuffer | null, vapid: string): boolean {
  if (!atual) return false
  const a = new Uint8Array(atual)
  const b = b64uParaBytes(vapid)
  return a.length === b.length && a.every((v, i) => v === b[i])
}

// Chave por aparelho: '0' = a pessoa desligou o aviso do fim do descanso (aba Conta).
export const CHAVE_AVISOS = 'forca-avisos-descanso'
export const avisosLigados = () => {
  try {
    return localStorage.getItem(CHAVE_AVISOS) !== '0'
  } catch {
    return true
  }
}

const disponivel = () =>
  !!BASE && typeof Notification !== 'undefined' && Notification.permission === 'granted' && 'serviceWorker' in navigator && 'PushManager' in window

async function chaveVapid(base: string): Promise<string> {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_VAPID) ?? 'null') as [string, string] | null
    if (salvo?.[0] === base) return salvo[1]
  } catch {
    /* sem armazenamento */
  }
  const { publicKey } = (await (await fetch(juntarUrl(base, '/vapid'))).json()) as { publicKey: string }
  try {
    localStorage.setItem(CHAVE_VAPID, JSON.stringify([base, publicKey]))
  } catch {
    /* sem armazenamento */
  }
  return publicKey
}

async function inscricao(base: string): Promise<PushSubscription> {
  const reg = await navigator.serviceWorker.ready
  const chave = await chaveVapid(base)
  const atual = await reg.pushManager.getSubscription()
  if (atual && mesmaChave(atual.options.applicationServerKey, chave)) return atual
  await atual?.unsubscribe()
  return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64uParaBytes(chave) })
}

async function chamar(base: string, caminho: string, corpo: object) {
  const { auth } = await import('./firebase') // só carrega o Firebase se for mesmo usar
  const token = await auth.currentUser?.getIdToken()
  if (!token) return
  return fetch(juntarUrl(base, caminho), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
    keepalive: true,
  })
}

// As chamadas saem uma de cada vez e na ordem: um "cancelar" nunca é ultrapassado por um "agendar" mais lento.
let fila: Promise<unknown> = Promise.resolve()
let ultimo = 0
const enfileirar = (tarefa: () => Promise<void>) => {
  fila = fila.then(tarefa).catch(() => {}) // sem push: o cronômetro segue normal
}

// fimEm: instante (ms desde 1970) em que o descanso acaba.
export function agendarPush(fimEm: number) {
  if (!disponivel() || !avisosLigados()) return
  const base = BASE!
  const meu = ++ultimo
  enfileirar(async () => {
    if (meu !== ultimo) return // já foi cancelado ou substituído
    const sub = await inscricao(base)
    if (meu !== ultimo) return
    await chamar(base, '/agendar', { subscription: sub.toJSON(), fimEm })
  })
}

export function cancelarPush() {
  if (!disponivel()) return
  const base = BASE!
  ultimo++
  enfileirar(async () => void (await chamar(base, '/cancelar', {})))
}

// Avisos fixos (treino novo e mensalidade): inscrição guardada no Worker até a pessoa desligar.
// Chave por aparelho: '0' = desligado na aba Conta.
export const CHAVE_AVISOS_COACH = 'forca-avisos-coach'
export const avisosCoachLigados = () => {
  try {
    return localStorage.getItem(CHAVE_AVISOS_COACH) !== '0'
  } catch {
    return true
  }
}

const CHAVE_INSCRITO = 'forca-avisos-inscrito'
const SETE_DIAS = 7 * 24 * 3600 * 1000
// Reenvia se mudou o uid ou o endpoint, ou se passou 7 dias do último envio.
export const precisaInscrever = (salvo: unknown, uid: string, endpoint: string, agora: number) => {
  if (!Array.isArray(salvo)) return true
  const [u, e, t] = salvo
  return u !== uid || e !== endpoint || typeof t !== 'number' || agora - t >= SETE_DIAS
}

export async function inscreverAvisos() {
  if (!disponivel() || !avisosCoachLigados()) return
  const base = BASE!
  try {
    const { auth } = await import('./firebase')
    const uid = auth.currentUser?.uid
    if (!uid) return
    const sub = await inscricao(base)
    let salvo: unknown = null
    try {
      salvo = JSON.parse(localStorage.getItem(CHAVE_INSCRITO) ?? 'null')
    } catch {
      /* sem armazenamento: reenvia */
    }
    const agora = Date.now()
    if (!precisaInscrever(salvo, uid, sub.endpoint, agora)) return
    const r = await chamar(base, '/inscrever', { subscription: sub.toJSON() })
    if (!r?.ok) return
    try {
      localStorage.setItem(CHAVE_INSCRITO, JSON.stringify([uid, sub.endpoint, agora]))
    } catch {
      /* sem armazenamento */
    }
  } catch {
    /* sem push: o app segue normal */
  }
}

export async function desinscreverAvisos() {
  try {
    localStorage.removeItem(CHAVE_INSCRITO)
  } catch {
    /* sem armazenamento */
  }
  if (!BASE) return
  try {
    await chamar(BASE, '/desinscrever', {})
  } catch {
    /* sem rede: o aviso só deixa de ser reenviado */
  }
}

// Coach: avisa o aluno que o treino novo está pronto. Não grava nada no Firestore.
export async function avisarTreinoPronto(alunoId: string): Promise<'enviado' | 'sem-notificacoes' | 'erro'> {
  if (!BASE) return 'erro'
  try {
    const r = await chamar(BASE, '/treino-pronto', { alunoId })
    if (!r?.ok) return 'erro'
    return ((await r.json()) as { enviado?: boolean }).enviado ? 'enviado' : 'sem-notificacoes'
  } catch {
    return 'erro'
  }
}
