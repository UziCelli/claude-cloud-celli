import type { Timestamp } from 'firebase/firestore'
import { METODOS_FISIO } from '../data/fisio'

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
  return { id, alunoId: d.alunoId, metodoId: d.metodoId, condicao: d.condicao, recado: d.recado, contextoLiberacao: d.contextoLiberacao, liberacao, alertasRevisados: true, recolhida: d.recolhida, sinalRelatado: d.sinalRelatado, em }
}
