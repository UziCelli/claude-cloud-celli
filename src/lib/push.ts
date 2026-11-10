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

// Authorization sempre; X-Firebase-AppCheck só se houver token (o Worker repassa ao Firestore).
export const cabecalhosPush = (token: string, appCheck?: string): Record<string, string> => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  ...(appCheck ? { 'X-Firebase-AppCheck': appCheck } : {}),
})

async function chamar(base: string, caminho: string, corpo: object) {
  const { auth, appCheck } = await import('./firebase') // só carrega o Firebase se for mesmo usar
  const token = await auth.currentUser?.getIdToken()
  if (!token) return
  let ac: string | undefined
  if (appCheck) {
    try {
      const { getToken } = await import('firebase/app-check')
      ac = (await getToken(appCheck, false)).token
    } catch {
      /* sem App Check: segue sem o cabeçalho */
    }
  }
  return fetch(juntarUrl(base, caminho), {
    method: 'POST',
    headers: cabecalhosPush(token, ac),
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

// Avisos fixos (tudo menos o descanso): inscrição guardada no Worker. Cada tipo liga/desliga em Conta.
// Contrato em docs/plano-notificacoes.md. Os ids são os mesmos de push/src/validar.ts (TIPOS).
export const AVISOS_ALUNO = [
  ['treino', 'Treino novo pronto'],
  ['lembrete', 'Lembrete do treino do dia'],
  ['recado', 'Avisos do coach'],
  ['mensalidade', 'Vencimento da mensalidade'],
] as const
export const AVISOS_COACH = [
  ['concluiu', 'Aluno concluiu o treino'],
  ['comentou', 'Aluno escreveu uma anotação'],
  ['pagou', 'Aluno tocou em "Já paguei"'],
] as const
export type TipoAviso = (typeof AVISOS_ALUNO)[number][0] | (typeof AVISOS_COACH)[number][0]

// Por aparelho: lista dos tipos desligados. A chave antiga ('forca-avisos-coach' = '0') desligava treino e mensalidade juntos.
const CHAVE_DESLIGADOS = 'forca-avisos-desligados'
const CHAVE_ANTIGA = 'forca-avisos-coach'
export const lerDesligados = (novo: string | null, antigo: string | null): string[] => {
  try {
    const v: unknown = JSON.parse(novo ?? 'null')
    if (Array.isArray(v)) return v.filter((t) => typeof t === 'string')
  } catch {
    /* valor estragado: vale o padrão */
  }
  return antigo === '0' ? ['treino', 'mensalidade'] : []
}
export const avisosDesligados = (): string[] => {
  try {
    return lerDesligados(localStorage.getItem(CHAVE_DESLIGADOS), localStorage.getItem(CHAVE_ANTIGA))
  } catch {
    return []
  }
}

// Liga/desliga um tipo neste aparelho e manda a lista nova ao Worker.
export function trocarAviso(tipo: TipoAviso, ligado: boolean, coach = false) {
  const lista = avisosDesligados().filter((t) => t !== tipo)
  if (!ligado) lista.push(tipo)
  try {
    localStorage.setItem(CHAVE_DESLIGADOS, JSON.stringify(lista))
  } catch {
    /* sem armazenamento: vale só até fechar o app */
  }
  void inscreverAvisos(coach)
}

const CHAVE_INSCRITO = 'forca-avisos-inscrito'
const SETE_DIAS = 7 * 24 * 3600 * 1000
// Reenvia se mudou o uid, o endpoint ou as preferências, ou se passou 7 dias do último envio.
export const precisaInscrever = (salvo: unknown, uid: string, endpoint: string, agora: number, prefs = '') => {
  if (!Array.isArray(salvo)) return true
  const [u, e, t, p = ''] = salvo
  return u !== uid || e !== endpoint || p !== prefs || typeof t !== 'number' || agora - t >= SETE_DIAS
}

// coach = true: o Worker confere o papel e passa a mandar a este aparelho os avisos dos alunos.
export async function inscreverAvisos(coach = false) {
  if (!disponivel()) return
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
    const desligados = avisosDesligados()
    const prefs = `${coach ? 'c' : 'a'}:${[...desligados].sort().join(',')}`
    if (!precisaInscrever(salvo, uid, sub.endpoint, agora, prefs)) return
    const r = await chamar(base, '/inscrever', { subscription: sub.toJSON(), desligados, ...(coach && { coach: true }) })
    if (!r?.ok) return
    try {
      localStorage.setItem(CHAVE_INSCRITO, JSON.stringify([uid, sub.endpoint, agora, prefs]))
    } catch {
      /* sem armazenamento */
    }
  } catch {
    /* sem push: o app segue normal */
  }
}

// Ao sair da conta: este aparelho para de receber os avisos de quem saiu.
export async function desinscreverAvisos() {
  try {
    localStorage.removeItem(CHAVE_INSCRITO)
  } catch {
    /* sem armazenamento */
  }
  // Sem permissão de notificação este aparelho nunca se inscreveu: não há o que apagar.
  if (!disponivel()) return
  try {
    // Só este aparelho: quem usa celular e computador continua recebendo no outro.
    const sub = await (await navigator.serviceWorker.ready).pushManager.getSubscription()
    if (!sub) return
    await chamar(BASE!, '/desinscrever', { endpoint: sub.endpoint })
  } catch {
    /* sem rede: a inscrição deste aparelho fica no Worker até o endereço morrer (ou sair da lista de 3 aparelhos) */
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

// Aluno: avisa o coach (concluiu o treino, escreveu anotação, tocou "Já paguei"). Silencioso: sem rede, o aviso
// se perde (o dado em si já foi gravado no Firestore). O Worker limita a 1 por tipo a cada 10 min.
export function avisarCoach(tipo: 'concluiu' | 'comentou' | 'pagou') {
  if (!BASE) return
  chamar(BASE, '/avisar-coach', { tipo }).catch(() => {})
}

export const lotes = <T,>(lista: T[], n: number): T[][] => Array.from({ length: Math.ceil(lista.length / n) }, (_, i) => lista.slice(i * n, i * n + n))

// Coach: aviso escrito para um ou vários alunos (15 por chamada). Devolve quantos receberam, ou null se nada pôde ser enviado.
export async function enviarRecado(alunoIds: string[], texto: string): Promise<number | null> {
  if (!BASE) return null
  let enviados = 0
  let algumOk = false
  for (const lote of lotes(alunoIds, 15)) {
    try {
      const r = await chamar(BASE, '/recado', { alunoIds: lote, texto })
      if (!r?.ok) continue
      algumOk = true
      enviados += ((await r.json()) as { enviados?: number }).enviados ?? 0
    } catch {
      /* segue para o próximo lote */
    }
  }
  return algumOk ? enviados : null
}
