// Regras de acesso do lado do app (espelham liberado() de firestore.rules). Funções puras.
import type { Timestamp } from 'firebase/firestore'

export interface Usuario {
  papel: 'coach' | 'aluno'
  nome: string
  email: string
  status: 'aguardando' | 'ativo' | 'bloqueado'
  pagoAte?: Timestamp
  criadoEm?: Timestamp
}

// São Paulo = UTC−03:00 fixo: o Brasil não tem horário de verão desde 2019.
const SP = -3 * 3600_000
const DIA = 86400_000

export const fimDoDiaSaoPaulo = (data: string) => new Date(`${data}T23:59:59.999-03:00`)

// Coach sempre entra. Aluno: igual à regra (ativo e agora < pagoAte).
export function liberado(u: Usuario | null, agora: Date) {
  if (!u) return false
  if (u.papel === 'coach') return true
  return u.status === 'ativo' && !!u.pagoAte && agora.getTime() < u.pagoAte.toMillis()
}

// Nº do dia de calendário em São Paulo (independe do fuso do aparelho).
export const diaSP = (ms: number) => Math.floor((ms + SP) / DIA)

// Dias de calendário (São Paulo) até o vencimento: 0 no próprio dia, negativo se vencido.
export const diasParaVencer = (pagoAte: Timestamp, agora: Date) =>
  diaSP(pagoAte.toMillis()) - diaSP(agora.getTime())
