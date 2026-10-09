// Regras de acesso do lado do app (espelham liberado() de firestore.rules). Funções puras.
import type { Timestamp } from 'firebase/firestore'

export interface Usuario {
  papel: 'coach' | 'aluno'
  nome: string
  email: string
  status: 'aguardando' | 'ativo' | 'bloqueado' | 'arquivado'
  pagoAte?: Timestamp
  criadoEm?: Timestamp
  pesoKg?: number // peso corporal do aluno (20..300), usado no checkbox PC
  presencial?: boolean // aluno sem app/login (o coach anota as cargas); email '' e sem pagoAte
  privacidadeEm?: Timestamp // aceite da Política de Privacidade (LGPD)
  privacidadeVersao?: string // VERSAO_PRIVACIDADE aceita
  selo?: boolean // aluno escolheu mostrar o selo da marca na foto
  mensalidade?: number // R$, definida pelo coach
  pagamentoInformadoEm?: Timestamp // aluno tocou "Já paguei"
}

// fotos/{uid}: foto de perfil opcional (JPEG pequeno em data URL; sem Storage, que exige plano pago).
export interface Foto {
  img: string
  atualizadoEm?: Timestamp
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

// O coach só tem poder com login que passou pelo 2º fator (ou o claim de teste mfaDispensado,
// que só existe no seed do emulador). Espelha segundoFator() de firestore.rules.
export function faltaSegundoFator(claims: Record<string, unknown>) {
  const fb = claims.firebase as { sign_in_second_factor?: unknown } | undefined
  return fb?.sign_in_second_factor == null && claims.mfaDispensado !== true
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

// Próximo vencimento (YYYY-MM-DD, São Paulo): 1 mês depois do pagoAte (se ainda não venceu) ou de hoje,
// preso ao último dia do mês (31/01 → 28 ou 29/02).
export function proximoVencimento(pagoAte: Timestamp | undefined, agora: Date) {
  const emDia = !!pagoAte && agora.getTime() < pagoAte.toMillis()
  const base = new Date(inicioDoDiaSP(diaSP(emDia ? pagoAte!.toMillis() : agora.getTime())))
  const [a, m, d] = base.toLocaleDateString('sv', { timeZone: 'America/Sao_Paulo' }).split('-').map(Number)
  const dia = Math.min(d, new Date(Date.UTC(a, m + 1, 0)).getUTCDate())
  return new Date(Date.UTC(a, m, dia)).toISOString().slice(0, 10)
}
