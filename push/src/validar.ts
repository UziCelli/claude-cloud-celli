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

export type Aviso = { uid: string; tipo: 'vence-3d' | 'vence-hoje' | 'treino-hoje' }

// Corpo de /aviso-pagamento: projeto da lista, no máximo 20 avisos (limite de 50 subpedidos do plano grátis), só os tipos do contrato.
export function validarAvisos(c: unknown): { projeto: Projeto; avisos: Aviso[] } | null {
  const o = c as { projeto?: unknown; avisos?: unknown } | null
  const projeto = PROJETOS.find((p) => p === o?.projeto)
  if (!projeto || !Array.isArray(o?.avisos) || o.avisos.length > 20) return null
  const avisos: Aviso[] = []
  for (const a of o.avisos as { uid?: unknown; tipo?: unknown }[]) {
    if (!a || !uidOk(a.uid) || (a.tipo !== 'vence-3d' && a.tipo !== 'vence-hoje' && a.tipo !== 'treino-hoje')) return null
    avisos.push({ uid: a.uid, tipo: a.tipo })
  }
  return { projeto, avisos }
}

// Tipos de aviso que a pessoa liga/desliga em Conta (o descanso tem chave própria no aparelho).
// Aluno recebe: treino, mensalidade, lembrete, recado. Coach recebe: concluiu, comentou, pagou.
export const TIPOS = ['treino', 'mensalidade', 'lembrete', 'recado', 'concluiu', 'comentou', 'pagou'] as const
export type Tipo = (typeof TIPOS)[number]
export type TipoCoach = 'concluiu' | 'comentou' | 'pagou'

// `desligados` de /inscrever: ausente = nada desligado; inválido = null.
export function validarDesligados(v: unknown): Tipo[] | null {
  if (v === undefined) return []
  if (!Array.isArray(v) || v.length > TIPOS.length) return null
  const tipos = v.map((t) => TIPOS.find((x) => x === t))
  return tipos.some((t) => !t) ? null : [...new Set(tipos as Tipo[])]
}

export const tipoCoachOk = (t: unknown): t is TipoCoach => t === 'concluiu' || t === 'comentou' || t === 'pagou'

// Texto livre numa linha só: caracteres de controle e espaços repetidos viram um espaço.
const umaLinha = (s: string) => s.replace(/[\u0000-\u001f\u007f\s]+/g, ' ').trim()

// Corpo de /recado: até 15 alunos por chamada (cada um custa 2 subpedidos) e texto de 1 a 200 caracteres.
export function validarRecado(c: unknown): { alunoIds: string[]; texto: string } | null {
  const o = c as { alunoIds?: unknown; texto?: unknown } | null
  if (!o || !Array.isArray(o.alunoIds) || typeof o.texto !== 'string') return null
  const alunoIds = [...new Set(o.alunoIds as unknown[])]
  if (alunoIds.length < 1 || alunoIds.length > 15 || !alunoIds.every(uidOk)) return null
  const texto = umaLinha(o.texto)
  return texto.length < 1 || texto.length > 200 ? null : { alunoIds: alunoIds as string[], texto }
}

// Nome do aluno no aviso ao coach: vem do perfil no Firestore, nunca do corpo do pedido.
export const nomeLimpo = (n: unknown): string => (typeof n === 'string' && umaLinha(n).slice(0, 60)) || 'Um aluno'

// Instância que guarda os uids dos coaches do projeto ('__' na frente: nunca colide com uid).
export const nomeCoaches = (projeto: Projeto): string => `__coaches:${projeto}`
