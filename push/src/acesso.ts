import type { Projeto } from './jwt'
import { uidOk } from './validar'

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

// Token do App Check repassado ao Firestore: string simples, sem espaços/quebras, até 4096. Inválido = ignorado.
export const appCheckOk = (v: unknown): string | undefined => (typeof v === 'string' && /^\S{1,4096}$/.test(v) ? v : undefined)

// Lê usuarios/<uid> no projeto, com o token de quem chama (as regras decidem quem pode ler; nenhum segredo novo).
// Campos = lido; false = negado ou inexistente; null = não deu para saber (rede ou erro do Firestore).
async function lerPerfil(projeto: Projeto, uid: string, token: string, buscar: typeof fetch, appCheck?: string): Promise<Campos | false | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${projeto}/databases/(default)/documents/usuarios/${encodeURIComponent(uid)}`
  try {
    const r = await buscar(url, {
      headers: { Authorization: `Bearer ${token}`, ...(appCheckOk(appCheck) ? { 'X-Firebase-AppCheck': appCheck! } : {}) },
    })
    if (r.status === 401 || r.status === 403 || r.status === 404) return false
    if (!r.ok) return null
    return ((await r.json()) as { fields?: Campos }).fields ?? {}
  } catch {
    return null
  }
}

// true/false = decisão; null = não deu para saber: quem chama não agenda.
export async function lerPermissao(uid: string, token: string, agora: number, projeto: Projeto, buscar: typeof fetch = fetch, appCheck?: string): Promise<boolean | null> {
  const campos = await lerPerfil(projeto, uid, token, buscar, appCheck)
  return campos === null ? null : campos !== false && liberado(campos, agora)
}

// /treino-pronto: o token de quem chama precisa conseguir ler o perfil do aluno (só o coach consegue, pelas regras).
// Devolve o status HTTP: 200 pode avisar; 400 alunoId inválido; 403 sem permissão, próprio uid ou alvo coach; 503 sem resposta do Firestore.
export async function podeAvisarTreino(projeto: Projeto, uid: string, alunoId: unknown, token: string, buscar: typeof fetch = fetch, appCheck?: string): Promise<200 | 400 | 403 | 503> {
  if (!uidOk(alunoId)) return 400
  if (alunoId === uid) return 403
  const campos = await lerPerfil(projeto, alunoId, token, buscar, appCheck)
  if (campos === null) return 503
  return campos === false || campos.papel?.stringValue === 'coach' ? 403 : 200
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

// Janela deslizante: devolve as marcas novas, ou null se já houve `limite` registros na janela (padrão: 30 por minuto).
export function registrarAgendamento(marcas: number[], agora: number, limite = LIMITE, janela = JANELA_MS): number[] | null {
  const recentes = marcas.filter((t) => agora - t < janela)
  return recentes.length >= limite ? null : [...recentes, agora]
}
