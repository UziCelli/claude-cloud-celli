// Regras de acesso do lado do app (espelham liberado() de firestore.rules). Funções puras.
import type { Timestamp } from 'firebase/firestore'

export interface Usuario {
  papel: 'coach' | 'aluno'
  nome: string
  email: string
  status: 'aguardando' | 'ativo' | 'bloqueado'
  pagoAte?: Timestamp
  criadoEm?: Timestamp
  pesoKg?: number // peso corporal do aluno (20..300), usado no checkbox PC
  presencial?: boolean // aluno sem app/login (o coach anota as cargas); email '' e sem pagoAte
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

// Instante (ms) em que começa o dia `dia` (número de diaSP) em São Paulo.
export const inicioDoDiaSP = (dia: number) => dia * DIA - SP

// Dias de calendário (São Paulo) até o vencimento: 0 no próprio dia, negativo se vencido.
export const diasParaVencer = (pagoAte: Timestamp, agora: Date) =>
  diaSP(pagoAte.toMillis()) - diaSP(agora.getTime())

// YYYY-MM-DD no calendário de São Paulo, daqui a `dias` (toISOString seria UTC: +1 dia depois das 21h).
export const hojeMaisDias = (dias: number) =>
  new Date(Date.now() + dias * DIA).toLocaleDateString('sv', { timeZone: 'America/Sao_Paulo' })
