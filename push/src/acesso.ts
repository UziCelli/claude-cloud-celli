import { PROJETO } from './jwt'

const CACHE_MS = 10 * 60_000
const LIMITE = 30
const JANELA_MS = 60_000

type Campos = { papel?: { stringValue?: string }; status?: { stringValue?: string }; pagoAte?: { timestampValue?: string } }

// Coach sempre pode; aluno só com status 'ativo' e pagoAte no futuro (mesma regra do firestore.rules).
const liberado = (campos: Campos | undefined, agora: number): boolean => {
  if (campos?.papel?.stringValue === 'coach') return true
  const ate = Date.parse(campos?.pagoAte?.timestampValue ?? '')
  return campos?.status?.stringValue === 'ativo' && ate > agora
}

// Lê o perfil com o próprio token do aluno (as regras deixam ler o próprio perfil; nenhum segredo novo).
// true/false = decisão; null = não deu para saber (rede ou erro do Firestore): quem chama não agenda.
export async function lerPermissao(uid: string, token: string, agora: number, buscar: typeof fetch = fetch): Promise<boolean | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJETO}/databases/(default)/documents/usuarios/${encodeURIComponent(uid)}`
  try {
    const r = await buscar(url, { headers: { Authorization: `Bearer ${token}` } })
    if (r.status === 401 || r.status === 403 || r.status === 404) return false
    if (!r.ok) return null
    return liberado(((await r.json()) as { fields?: Campos }).fields, agora)
  } catch {
    return null
  }
}

export type CacheAcesso = { ok: boolean; ate: number }

// Reaproveita a decisão por 10 min; só decisões reais entram no cache (falha de leitura não).
export async function acessoComCache(
  cache: CacheAcesso | undefined,
  agora: number,
  ler: () => Promise<boolean | null>,
): Promise<{ ok: boolean | null; cache: CacheAcesso | undefined }> {
  if (cache && cache.ate > agora) return { ok: cache.ok, cache }
  const ok = await ler()
  return { ok, cache: ok === null ? undefined : { ok, ate: agora + CACHE_MS } }
}

// Janela deslizante: devolve as marcas novas, ou null se já houve 30 agendamentos no último minuto.
export function registrarAgendamento(marcas: number[], agora: number): number[] | null {
  const recentes = marcas.filter((t) => agora - t < JANELA_MS)
  return recentes.length >= LIMITE ? null : [...recentes, agora]
}
