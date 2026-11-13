// Check-in de recuperação no fim do treino (rodada 4 do Físio, docs/plano-fisio.md): fisioCheckins/{id automático}.
// Base: questionários de bem-estar (Hooper & McLean; Saw et al. 2016) — sono, estresse e cansaço; alimentação é
// só contexto (pedido do Victor) e não entra em regra. Escala 1–5, sempre 1 = ruim e 5 = ótimo. Dado de saúde:
// nunca em log, push ou IA. Regras em firestore.rules (fisioCheckins).
import type { Timestamp } from 'firebase/firestore'

export const COLECAO_CHECKINS = 'fisioCheckins'
export const PERGUNTAS_CHECKIN = [
  { id: 'sono', rotulo: 'Como você dormiu esta noite?', ruim: 'Muito mal', bom: 'Muito bem' },
  { id: 'estresse', rotulo: 'Como está o seu estresse?', ruim: 'Muito alto', bom: 'Tranquilo' },
  { id: 'cansaco', rotulo: 'Cansaço ou dor muscular no corpo', ruim: 'Muito cansado', bom: 'Descansado' },
  { id: 'alimentacao', rotulo: 'Como você se alimentou hoje?', ruim: 'Muito mal', bom: 'Muito bem' },
] as const
export type CampoCheckin = (typeof PERGUNTAS_CHECKIN)[number]['id']
export type CheckinForm = Record<CampoCheckin, number>
// Sessão do treino (revisão do PR, F3): um check-in por sessão, id = registroId(mesoId, semana, treino).
// Documentos antigos sem sessão continuam válidos (sessao = null); nada é inventado para eles.
export type SessaoCheckin = { mesoId: string; semana: number; treino: number }
// dor24h (A1): "a dor do último treino passou em até 1 dia?" — só perguntado quando houve relato no treino anterior.
export type Checkin = CheckinForm & { id: string; alunoId: string; em: Timestamp | null; sessao: SessaoCheckin | null; dor24h: boolean | null }

const nota = (v: unknown): v is number => Number.isInteger(v) && (v as number) >= 1 && (v as number) <= 5

export const checkinValido = (f: Partial<CheckinForm>): f is CheckinForm => PERGUNTAS_CHECKIN.every((p) => nota(f[p.id]))

// Recuperação = sono + estresse + cansaço (3 a 15). Alimentação fica fora (só contexto).
export const somaRecuperacao = (c: CheckinForm) => c.sono + c.estresse + c.cansaco

// Leitura desconfiada: o que não confere é ignorado.
export function lerCheckin(id: string, valor: unknown): Checkin | null {
  if (!valor || typeof valor !== 'object') return null
  const d = valor as Record<string, unknown>
  if (typeof d.alunoId !== 'string' || !d.alunoId || !checkinValido(d as Partial<CheckinForm>)) return null
  const em = d.em && typeof (d.em as Timestamp).toMillis === 'function' ? (d.em as Timestamp) : null
  const sessao = typeof d.mesoId === 'string' && Number.isInteger(d.semana) && Number.isInteger(d.treino)
    ? { mesoId: d.mesoId, semana: d.semana as number, treino: d.treino as number } : null
  return { id, alunoId: d.alunoId, sono: d.sono as number, estresse: d.estresse as number, cansaco: d.cansaco as number, alimentacao: d.alimentacao as number, em, sessao,
    dor24h: typeof d.dor24h === 'boolean' ? d.dor24h : null }
}
