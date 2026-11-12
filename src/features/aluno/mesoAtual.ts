// Escolhe o mesociclo "atual" do aluno: o que está em andamento hoje, senão o mais recente.
import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import { diaSP } from '../../lib/acesso'
import { semanaAtual } from '../../lib/treino'

// Data de hoje no calendário de São Paulo (YYYY-MM-DD) e dia da semana curto de uma data assim ("Seg").
export const dataSP = (d: Date) => new Date(diaSP(d.getTime()) * 86400_000).toISOString().slice(0, 10)
export const DIAS_CURTO = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
export const diaCurto = (data: string) => DIAS_CURTO[new Date(`${data}T12:00:00Z`).getUTCDay()]

export function mesoAtual(mesos: (MesoSalvo & { id: string })[], hoje = new Date()) {
  if (mesos.length === 0) return null
  const maisRecente = (a: { inicio: string }, b: { inicio: string }) => b.inicio.localeCompare(a.inicio)
  const emAndamento = [...mesos].sort(maisRecente).find((d) => semanaAtual(docParaMeso(d), hoje).estado === 'durante')
  const doc = emAndamento ?? [...mesos].sort(maisRecente)[0]
  return { doc, meso: docParaMeso(doc), estado: semanaAtual(docParaMeso(doc), hoje) }
}

// Meso que ainda não começou, o mais próximo (ou null). O coach monta com antecedência; o aluno só vê a data.
export function proximoMeso<T extends MesoSalvo>(mesos: T[], hoje = new Date()) {
  const h = dataSP(hoje)
  return mesos.filter((d) => d.inicio.slice(0, 10) > h).sort((a, b) => a.inicio.localeCompare(b.inicio))[0] ?? null
}

// "Amanhã" ou "Qua, 14": quando o próximo treino acontece.
export const quando = (iso: string, hojeISO: string) =>
  Date.parse(iso) - Date.parse(hojeISO) === 86400_000 ? 'Amanhã' : `${diaCurto(iso)}, ${Number(iso.slice(8))}`
