import type { Timestamp } from 'firebase/firestore'
import { METODOS_FISIO, type MetodoFisio } from '../data/fisio'
import type { Respostas } from './anamnese'
import { norm } from './busca'

export const COLECAO_FISIO = 'fisioOrientacoes'
export const CONTEXTOS_LIBERACAO = 'Pós-cirúrgico, lesão aguda, osteoporose, fibromialgia ou dor irradiada'
export type LiberacaoProfissional = { profissional: string; registro: string; data: string }
export type OrientacaoForm = {
  metodoId: string
  condicao: string
  recado: string
  contextoLiberacao: boolean
  liberacao: LiberacaoProfissional | null
  alertasRevisados: boolean
}
export type OrientacaoFisio = OrientacaoForm & {
  id: string
  alunoId: string
  recolhida: boolean
  sinalRelatado: boolean
  em: Timestamp | null
  exercicios: string[] // nomes do catálogo onde o aluno vê o selo Físio no treino (rodada 4)
  sinalEm: Timestamp | null // quando o aluno marcou o sinal (as sugestões ao coach usam para não esconder sinal novo)
}

export const metodoFisio = (id: string) => METODOS_FISIO.find((m) => m.id === id)
export const metodoLiberavel = (id: string) => !!metodoFisio(id)?.encaminharSe.length
export const precisaLiberacao = (f: Pick<OrientacaoForm, 'metodoId' | 'contextoLiberacao'>) => !!metodoFisio(f.metodoId)?.liberacao || f.contextoLiberacao
const texto = (v: unknown, max: number, minimo = 1): v is string => typeof v === 'string' && v.trim().length >= minimo && v.length <= max
const dataValida = (d: string) => /^\d{4}-\d{2}-\d{2}$/.test(d) && Number.isFinite(Date.parse(d)) && new Date(d).toISOString().slice(0, 10) === d
function lerLiberacao(v: unknown): LiberacaoProfissional | null {
  if (!v || typeof v !== 'object') return null
  const l = v as Record<string, unknown>
  return texto(l.profissional, 120) && texto(l.registro, 80) && typeof l.data === 'string' && dataValida(l.data)
    ? { profissional: l.profissional, registro: l.registro, data: l.data } : null
}

// Nada deriva diagnóstico, carga ou limiar de dor da queixa. Sem sinais na fonte, só consulta do coach.
export function validarOrientacao(f: OrientacaoForm, hoje: string): string | null {
  if (!metodoLiberavel(f.metodoId)) return 'A pesquisa ainda não definiu sinais de alerta para este método. Disponível somente para consulta.'
  if (!texto(f.condicao, 300)) return 'Informe a condição relatada pelo aluno ou já diagnosticada por médico/fisioterapeuta.'
  if (!texto(f.recado, 2000, 0)) return 'O recado deve ter até 2000 caracteres.'
  if (!f.alertasRevisados) return 'Revise os sinais de alerta com o aluno antes de enviar.'
  if (precisaLiberacao(f) && !f.liberacao) return 'Registre a liberação existente de médico ou fisioterapeuta.'
  if (f.liberacao && (!lerLiberacao(f.liberacao) || f.liberacao.data > hoje)) return 'Confira o profissional, o conselho/registro e a data da liberação (não pode ser futura).'
  return null
}

// Leitura desconfiada inclusive para documentos antigos/admin. Booleano inválido nunca vira "sem sinal".
export function lerOrientacao(id: string, valor: unknown): OrientacaoFisio | null {
  if (!valor || typeof valor !== 'object') return null
  const d = valor as Record<string, unknown>
  if (!texto(d.alunoId, 128) || typeof d.metodoId !== 'string' || !metodoFisio(d.metodoId)
    || !texto(d.condicao, 300) || !texto(d.recado, 2000, 0)
    || typeof d.recolhida !== 'boolean' || typeof d.sinalRelatado !== 'boolean'
    || typeof d.contextoLiberacao !== 'boolean' || d.alertasRevisados !== true) return null
  const liberacao = d.liberacao === null ? null : lerLiberacao(d.liberacao)
  if (d.liberacao !== null && !liberacao) return null
  if (precisaLiberacao({ metodoId: d.metodoId, contextoLiberacao: d.contextoLiberacao }) && !liberacao) return null
  const em = d.em && typeof (d.em as Timestamp).toMillis === 'function' ? d.em as Timestamp : null
  return { id, alunoId: d.alunoId, metodoId: d.metodoId, condicao: d.condicao, recado: d.recado, contextoLiberacao: d.contextoLiberacao, liberacao, alertasRevisados: true, recolhida: d.recolhida, sinalRelatado: d.sinalRelatado, em,
    sinalEm: d.sinalEm && typeof (d.sinalEm as Timestamp).toMillis === 'function' ? d.sinalEm as Timestamp : null,
    exercicios: Array.isArray(d.exercicios) ? d.exercicios.filter((e): e is string => typeof e === 'string' && e.trim() !== '').slice(0, MAX_EXERCICIOS) : [] }
}

// ---- Rodada 4: selo Físio no treino e cruzamentos com a anamnese (docs/plano-fisio.md) ----

export const MAX_EXERCICIOS = 10 // o mesmo limite de firestore.rules (exerciciosFisio)

// Orientações ativas (não recolhidas) que marcam este exercício. Nome comparado sem acento/caixa/espaço.
export const orientacoesDoExercicio = (orientacoes: OrientacaoFisio[], nome: string) => {
  const n = norm(nome.trim())
  return orientacoes.filter((o) => !o.recolhida && o.exercicios.some((e) => norm(e.trim()) === n))
}

// Ids iguais nos três lugares: articulação (anatomia/anamnese) = queixa do método.
const ARTICULACAO_QUEIXA = ['lombar', 'ombro', 'joelho', 'quadril', 'tornozelo', 'cervical']

// Ordem do formulário de orientação: primeiro os métodos ligados às queixas do aluno (anamnese + relatos),
// depois os demais. Só ordena: o rótulo da tela é "relacionado", nunca "recomendado".
export function metodosRelacionados(articulacoes: readonly string[]): { relacionados: MetodoFisio[]; outros: MetodoFisio[] } {
  const q = new Set(articulacoes.filter((a) => ARTICULACAO_QUEIXA.includes(a)))
  const relacionados = METODOS_FISIO.filter((m) => m.queixas.some((x) => q.has(x)))
  return { relacionados, outros: METODOS_FISIO.filter((m) => !relacionados.includes(m)) }
}

// Articulações que o aluno marcou como dor na anamnese (sem "outra").
export const doresDaAnamnese = (r: Respostas | null | undefined): string[] =>
  Array.isArray(r?.dores) ? (r.dores as string[]).filter((d) => d !== 'outra') : []

// Motivo para pré-marcar e travar o contexto de liberação (pós-cirúrgico etc.) a partir da anamnese mais recente.
// Conservador: na dúvida, exige o registro profissional.
export function contextoPelaAnamnese(r: Respostas | null | undefined): string | null {
  if (!r) return null
  if (r.cirurgia12m === true) return 'A anamnese informa cirurgia nos últimos 12 meses.'
  if (r.gestante === 'sim') return 'A anamnese informa gestação.'
  if (r.ossoArticulacao === true) return 'A anamnese informa problema de osso, articulação ou coluna que piora com exercício.'
  return null
}
