// Qual semana o aluno vê ao abrir o treino. Função pura.
import type { Meso } from '../engine'
import { semanaAtual } from './treino'

// max(semana pela data, primeira semana ainda não concluída), limitada a 1..semanas.
// "Concluída" = todos os treinos 1..frequencia com `realizado`.
export function semanaParaAbrir(
  meso: Meso,
  registros: { semana: number; treino: number; realizado?: boolean }[],
  hoje: Date,
): number {
  const feito = new Set(registros.filter((r) => r.realizado).map((r) => `${r.semana}-${r.treino}`))
  let aberta = 1
  while (
    aberta <= meso.semanas &&
    Array.from({ length: meso.frequencia }, (_, i) => i + 1).every((t) => feito.has(`${aberta}-${t}`))
  ) aberta++
  return Math.min(Math.max(semanaAtual(meso, hoje).semana, aberta), meso.semanas)
}
