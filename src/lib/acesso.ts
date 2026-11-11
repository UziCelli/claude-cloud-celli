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

// Tolerância depois do vencimento (CDC): o acesso só pausa 7 dias após o pagoAte. Igual em firestore.rules e push/.
export const CARENCIA_DIAS = 7

// Coach sempre entra. Aluno: igual à regra (ativo e agora < pagoAte + 7 dias).
export function liberado(u: Usuario | null, agora: Date) {
  if (!u) return false
  if (u.papel === 'coach') return true
  return u.status === 'ativo' && !!u.pagoAte && agora.getTime() < u.pagoAte.toMillis() + CARENCIA_DIAS * DIA
}

// Dias de atraso (calendário de São Paulo) de aluno ativo com app que já venceu mas ainda está liberado. null = não se aplica.
export function emAtraso(u: Usuario | null, agora: Date) {
  if (!u || u.papel !== 'aluno' || u.presencial || !u.pagoAte || !liberado(u, agora)) return null
  if (agora.getTime() < u.pagoAte.toMillis()) return null
  return Math.max(1, -diasParaVencer(u.pagoAte, agora))
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

// Mensalidade perto de vencer (0..dias, calendário de São Paulo): o app já mostra o Pix antes do bloqueio.
// Só aluno ativo com app (presencial não tem login). null = longe, vencido ou não se aplica.
export function vencePerto(u: Usuario | null, agora: Date, dias = 5) {
  if (!u || u.papel !== 'aluno' || u.status !== 'ativo' || u.presencial || !u.pagoAte) return null
  if (agora.getTime() >= u.pagoAte.toMillis()) return null
  const faltam = diasParaVencer(u.pagoAte, agora)
  return faltam >= 0 && faltam <= dias ? faltam : null
}

// YYYY-MM-DD no calendário de São Paulo, daqui a `dias` (toISOString seria UTC: +1 dia depois das 21h).
export const hojeMaisDias = (dias: number) =>
  new Date(Date.now() + dias * DIA).toLocaleDateString('sv', { timeZone: 'America/Sao_Paulo' })

// Próximo vencimento (YYYY-MM-DD, São Paulo): dia fixo. Soma 1 mês ao pagoAte (adiantado ou atrasado),
// preso ao último dia do mês (31/01 → 28 ou 29/02). Se o resultado ainda ficar no passado ou for hoje
// (ou não há pagoAte), conta 1 mês a partir de hoje.
export function proximoVencimento(pagoAte: Timestamp | undefined, agora: Date) {
  const mais1 = (ms: number) => {
    const [a, m, d] = new Date(inicioDoDiaSP(diaSP(ms))).toLocaleDateString('sv', { timeZone: 'America/Sao_Paulo' }).split('-').map(Number)
    const dia = Math.min(d, new Date(Date.UTC(a, m + 1, 0)).getUTCDate())
    return new Date(Date.UTC(a, m, dia)).toISOString().slice(0, 10)
  }
  const hoje = new Date(agora.getTime() + SP).toISOString().slice(0, 10)
  const novo = pagoAte && mais1(pagoAte.toMillis())
  return novo && novo > hoje ? novo : mais1(agora.getTime())
}
