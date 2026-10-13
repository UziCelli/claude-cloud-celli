import { deb64u } from './b64'
import { PROJETOS, type Projeto } from './jwt'

export type Inscricao = { endpoint: string; keys: { p256dh: string; auth: string } }

// Só servidores de push dos navegadores (Chrome/Android, Safari/iPhone, Firefox, Edge).
// Sem isso, um aluno poderia fazer o Worker chamar qualquer endereço da internet.
const HOSTS = ['fcm.googleapis.com', 'push.apple.com', 'push.services.mozilla.com', 'notify.windows.com']
const hostOk = (h: string) => HOSTS.some((d) => h === d || h.endsWith(`.${d}`))

const bytesOk = (s: unknown, tam: number, primeiro?: number) => {
  if (typeof s !== 'string') return false
  try {
    const b = deb64u(s)
    return b.length === tam && (primeiro === undefined || b[0] === primeiro)
  } catch {
    return false
  }
}

// Devolve só os campos usados, ou null se a inscrição não for válida.
export function validarInscricao(s: unknown): Inscricao | null {
  const o = s as { endpoint?: unknown; keys?: { p256dh?: unknown; auth?: unknown } } | null
  if (!o || typeof o !== 'object' || typeof o.endpoint !== 'string' || o.endpoint.length > 1000 || !o.keys) return null
  let u: URL
  try {
    u = new URL(o.endpoint)
  } catch {
    return null
  }
  if (u.protocol !== 'https:' || u.username || u.password || u.port || !hostOk(u.hostname)) return null
  if (!bytesOk(o.keys.p256dh, 65, 4) || !bytesOk(o.keys.auth, 16)) return null
  return { endpoint: o.endpoint, keys: { p256dh: o.keys.p256dh as string, auth: o.keys.auth as string } }
}

// fimEm em ms: entre agora+1 s e agora+15 min.
export const validarFimEm = (v: unknown, agora: number): v is number =>
  typeof v === 'number' && Number.isFinite(v) && v >= agora + 1000 && v <= agora + 15 * 60_000

// uid do Firebase: começa com letra/número (barra '__vapid') e não tem ':' (não colide com o nome da Gislane).
export const uidOk = (u: unknown): u is string => typeof u === 'string' && /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(u)

// Nome da instância (Durable Object): VFIT = uid puro (o que já está no ar); Gislane = projeto:uid.
export const nomeDO = (projeto: Projeto, uid: string): string => (projeto === 'forca--app' ? uid : `${projeto}:${uid}`)

export type Aviso = { uid: string; tipo: 'vence-3d' | 'vence-hoje' }

// Corpo de /aviso-pagamento: projeto da lista, no máximo 20 avisos (limite de 50 subpedidos do plano grátis), só os 2 tipos do contrato.
export function validarAvisos(c: unknown): { projeto: Projeto; avisos: Aviso[] } | null {
  const o = c as { projeto?: unknown; avisos?: unknown } | null
  const projeto = PROJETOS.find((p) => p === o?.projeto)
  if (!projeto || !Array.isArray(o?.avisos) || o.avisos.length > 20) return null
  const avisos: Aviso[] = []
  for (const a of o.avisos as { uid?: unknown; tipo?: unknown }[]) {
    if (!a || !uidOk(a.uid) || (a.tipo !== 'vence-3d' && a.tipo !== 'vence-hoje')) return null
    avisos.push({ uid: a.uid, tipo: a.tipo })
  }
  return { projeto, avisos }
}
