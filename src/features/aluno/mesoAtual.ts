// Escolhe o mesociclo "atual" do aluno: o que está em andamento hoje, senão o mais recente.
import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import { semanaAtual } from '../../lib/treino'

export function mesoAtual(mesos: (MesoSalvo & { id: string })[], hoje = new Date()) {
  if (mesos.length === 0) return null
  const emAndamento = mesos.find((d) => semanaAtual(docParaMeso(d), hoje).estado === 'durante')
  const doc = emAndamento ?? [...mesos].sort((a, b) => b.inicio.localeCompare(a.inicio))[0]
  return { doc, meso: docParaMeso(doc), estado: semanaAtual(docParaMeso(doc), hoje) }
}
