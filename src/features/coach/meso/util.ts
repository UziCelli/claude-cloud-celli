import catalogo from '../../../data/exercicios.json'
import type { Meso } from '../../../engine'

// Cresce/encolhe um array preservando os itens existentes.
export function redimensionar<T>(arr: T[], n: number, fabrica: () => T): T[] {
  if (arr.length === n) return arr
  if (arr.length > n) return arr.slice(0, n)
  return [...arr, ...Array.from({ length: n - arr.length }, fabrica)]
}

export const nomesCatalogo: string[] = catalogo.flatMap((g) => g.exercicios.map((e) => e.nome))

// Número de séries preenchidas na progressão de uma posição, numa semana.
export function seriesDaPosicao(meso: Meso, semana: number, pos: number): number {
  const linha = (pos <= 2 ? meso.progressao.principais : meso.progressao.auxiliares)[semana - 1] ?? []
  return linha.filter((r) => typeof r === 'number').length
}

// Semanas (1..meso.semanas) em que a posição `pos` do treino `t` tem alguma carga registrada,
// considerando o slotId vigente naquela semana (troca pontual, se houver).
export function semanasComHistorico(
  meso: Meso,
  registros: Record<string, Record<string, (number | null)[]>>,
  t: number,
  pos: number,
): number[] {
  const semanas: number[] = []
  for (let w = 1; w <= meso.semanas; w++) {
    const slot = meso.trocas?.[`${w}-${t}-${pos}`] ?? meso.divisao[t - 1]?.[pos - 1]
    if (!slot) continue
    const cargas = registros[`${w}-${t}`]?.[slot.slotId]
    if (cargas?.some((c) => c != null)) semanas.push(w)
  }
  return semanas
}
