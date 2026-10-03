// Ajuda de preparação dos emuladores para o teste e2e (fetch puro, sem SDK do Firebase).
import { VERSAO_PRIVACIDADE } from '../src/lib/privacidade'
const PROJETO = 'demo-forca'
const AUTH = 'http://127.0.0.1:9099'
const FIRESTORE = 'http://127.0.0.1:8080'

export async function limparEmuladores() {
  await fetch(`${FIRESTORE}/emulator/v1/projects/${PROJETO}/databases/(default)/documents`, { method: 'DELETE' })
  await fetch(`${AUTH}/emulator/v1/projects/${PROJETO}/accounts`, { method: 'DELETE' })
}

// Cria um usuário no Auth emulator e devolve o uid.
async function criarConta(email: string, senha: string): Promise<string> {
  const r = await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: senha, returnSecureToken: true }),
  })
  if (!r.ok) throw new Error(`signUp falhou: ${r.status} ${await r.text()}`)
  const { localId } = await r.json()
  return localId as string
}

// Converte um valor JS para o formato de campo do Firestore REST (recursivo).
// Date -> timestampValue; null -> nullValue; number inteiro -> integerValue, senão doubleValue;
// array -> arrayValue; objeto -> mapValue.
function valorFirestore(v: unknown): unknown {
  if (v === null || v === undefined) return { nullValue: null }
  if (v instanceof Date) return { timestampValue: v.toISOString() }
  if (typeof v === 'string') return { stringValue: v }
  if (typeof v === 'boolean') return { booleanValue: v }
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }
  if (Array.isArray(v)) return { arrayValue: { values: v.map(valorFirestore) } }
  return { mapValue: { fields: paraCampos(v as Record<string, unknown>) } }
}

const paraCampos = (dados: Record<string, unknown>): Record<string, unknown> =>
  Object.fromEntries(Object.entries(dados).map(([k, v]) => [k, valorFirestore(v)]))

// Grava um documento direto via REST do Firestore emulator (Bearer owner ignora as regras).
async function gravarDoc(caminho: string, dados: Record<string, unknown>) {
  const r = await fetch(`${FIRESTORE}/v1/projects/${PROJETO}/databases/(default)/documents/${caminho}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
    body: JSON.stringify({ fields: paraCampos(dados) }),
  })
  if (!r.ok) throw new Error(`gravar ${caminho} falhou: ${r.status} ${await r.text()}`)
}

// Lê um documento direto via REST do Firestore emulator (Bearer owner ignora as regras).
export async function lerDoc(caminho: string): Promise<Record<string, unknown> | null> {
  const r = await fetch(`${FIRESTORE}/v1/projects/${PROJETO}/databases/(default)/documents/${caminho}`, {
    headers: { Authorization: 'Bearer owner' },
  })
  if (r.status === 404) return null
  if (!r.ok) throw new Error(`ler ${caminho} falhou: ${r.status} ${await r.text()}`)
  return r.json()
}

// Custom claim mfaDispensado: as regras aceitam no lugar do 2º fator. Só existe aqui, no emulador
// (em produção só a Admin SDK poderia defini-lo, e nenhum código nosso o faz).
async function dispensarMfa(uid: string) {
  const r = await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/projects/${PROJETO}/accounts:update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
    body: JSON.stringify({ localId: uid, customAttributes: JSON.stringify({ mfaDispensado: true }) }),
  })
  if (!r.ok) throw new Error(`claim mfaDispensado falhou: ${r.status} ${await r.text()}`)
}

// Cria a conta do coach (Auth + Firestore), pronta e ativa, com o 2º fator dispensado (só emulador).
export async function criarCoach(nome: string, email: string, senha: string): Promise<string> {
  const uid = await criarConta(email, senha)
  await dispensarMfa(uid)
  await gravarDoc(`usuarios/${uid}`, { papel: 'coach', status: 'ativo', nome, email })
  return uid
}

// Cria a conta do aluno (Auth + Firestore), já ativa e paga por 30 dias.
export async function criarAluno(nome: string, email: string, senha: string, pesoKg?: number, aceitou = true): Promise<string> {
  const uid = await criarConta(email, senha)
  const pagoAte = new Date(Date.now() + 30 * 86_400_000)
  await gravarDoc(`usuarios/${uid}`, { papel: 'aluno', status: 'ativo', nome, email, pagoAte, ...(aceitou ? { privacidadeVersao: VERSAO_PRIVACIDADE, privacidadeEm: new Date() } : {}), ...(pesoKg ? { pesoKg } : {}) })
  return uid
}

// Hoje (YYYY-MM-DD) no calendário de São Paulo (UTC-03:00 fixo).
export function hojeSaoPaulo(): string {
  const d = new Date(Date.now() - 3 * 3600_000)
  return d.toISOString().slice(0, 10)
}

export interface MesoSeed {
  alunoId: string
  nome: string
  frequencia: number
  semanas: number
  inicio: string // YYYY-MM-DD
  pausaS: number
  divisao: Record<string, { slotId: string; nome: string }[]>
  progressao: { principais: Record<string, (number | null)[]>; auxiliares: Record<string, (number | null)[]> }
  trocas?: Record<string, unknown>
  metodos?: unknown[]
}

// Cria mesos/{id} direto no formato gravado por salvarMeso (ver src/lib/conversores.ts).
export async function criarMeso(m: MesoSeed): Promise<string> {
  const id = Math.random().toString(36).slice(2, 10)
  await gravarDoc(`mesos/${id}`, {
    alunoId: m.alunoId,
    nome: m.nome,
    frequencia: m.frequencia,
    semanas: m.semanas,
    inicio: m.inicio,
    pausaS: m.pausaS,
    divisao: m.divisao,
    progressao: m.progressao,
    trocas: m.trocas ?? {},
    metodos: m.metodos ?? [],
    criadoEm: new Date(),
    atualizadoEm: new Date(),
  })
  return id
}

// Cria registros/{id} direto, com os campos que o teste quiser (ex.: formato antigo, sem rebasear/preencherCorpo).
export async function criarRegistro(mesoId: string, alunoId: string, semana: number, treino: number, campos: Record<string, unknown>) {
  const id = `${mesoId}_s${String(semana).padStart(2, '0')}_t${treino}`
  await gravarDoc(`registros/${id}`, { alunoId, mesoId, semana, treino, ...campos, atualizadoEm: new Date() })
  return id
}

// Cria um aluno arquivado (para a lista "Arquivados").
export async function criarAlunoArquivado(nome: string, email: string, senha: string): Promise<string> {
  const uid = await criarConta(email, senha)
  await gravarDoc(`usuarios/${uid}`, { papel: 'aluno', status: 'arquivado', nome, email })
  return uid
}
