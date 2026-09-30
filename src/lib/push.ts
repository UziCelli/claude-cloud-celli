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
  await fetch(juntarUrl(base, caminho), {
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
  if (!disponivel()) return
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
  enfileirar(() => chamar(base, '/cancelar', {}))
}
