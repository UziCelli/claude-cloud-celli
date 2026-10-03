import { describe, expect, it } from 'vitest'
import type { Meso } from '../../../engine'
import { copiarTreino, filtrarMetodos } from './util'

const meso = {
  frequencia: 3,
  semanas: 4,
  inicio: '2026-01-05',
  pausaS: 90,
  divisao: [
    [{ slotId: 'a1', nome: 'Agachamento', pausaS: 60 }, { slotId: 'a2', nome: 'Leg Press' }],
    [{ slotId: 'b1', nome: 'Supino' }],
    [],
  ],
  trocas: { '1-1-1': { slotId: 'x', nome: 'Troca' } },
  progressao: { principais: [], auxiliares: [] },
  metodos: [
    { treino: 1, id: 'm1' },
    { treino: 2, id: 'm2' },
  ],
  progressaoExercicio: { a1: [[10, 8]], b1: [[5]] },
} as unknown as Meso

describe('copiarTreino', () => {
  it('copia slots com ids novos, métodos e progressão; não mexe na origem nem nas trocas', () => {
    const r = copiarTreino(meso, 1, 2)
    expect(r.divisao[0]).toBe(meso.divisao[0])
    expect(r.divisao[1].map((s) => [s.nome, s.pausaS])).toEqual([['Agachamento', 60], ['Leg Press', undefined]])
    const ids = r.divisao[1].map((s) => s.slotId)
    expect(ids).not.toContain('a1')
    expect(new Set(ids).size).toBe(2)
    expect(r.metodos.filter((m) => m.treino === 2)).toEqual([{ treino: 2, id: 'm1' }])
    expect(r.metodos.filter((m) => m.treino === 1)).toHaveLength(1)
    expect(r.progressaoExercicio[ids[0]]).toEqual([[10, 8]])
    expect(r.progressaoExercicio[ids[0]]).not.toBe(meso.progressaoExercicio!.a1)
    expect(r.progressaoExercicio.a1).toEqual([[10, 8]])
    expect(r.progressaoExercicio.b1).toBeUndefined()
    expect(r.progressaoExercicio[ids[1]]).toBeUndefined()
  })
})

describe('filtrarMetodos', () => {
  const lista = [
    { semana: 1, treino: 1, exercicio: 1 },
    { semana: 2, treino: 1, exercicio: 3 },
    { semana: 2, treino: 2, exercicio: 3 },
  ] as Meso['metodos']
  it('sem filtro devolve tudo, com os índices originais', () => {
    expect(filtrarMetodos(lista, {}).map((x) => x.idx)).toEqual([0, 1, 2])
  })
  it('filtra por semana, treino e exercício combinados', () => {
    expect(filtrarMetodos(lista, { semana: 2 }).map((x) => x.idx)).toEqual([1, 2])
    expect(filtrarMetodos(lista, { semana: 2, treino: 2 }).map((x) => x.idx)).toEqual([2])
    expect(filtrarMetodos(lista, { exercicio: 3 }).map((x) => x.idx)).toEqual([1, 2])
    expect(filtrarMetodos(lista, { semana: 1, exercicio: 3 })).toEqual([])
  })
})
