import { describe, expect, it } from 'vitest'
import { migrarProgressao } from './progressao'
import { prescreverSessao } from './sessao'
import type { Meso, Slot } from './tipos'

const slot = (slotId: string): Slot => ({ slotId, nome: slotId })
const L = (...r: number[]) => [...r, ...Array(6 - r.length).fill(null)] as (number | null)[]

const antigo = (extra: Partial<Meso> = {}): Meso => ({
  frequencia: 2,
  semanas: 2,
  inicio: '2026-10-05',
  pausaS: 60,
  divisao: [[slot('A'), slot('B'), slot('C')], [slot('D'), slot('E')]],
  progressao: {
    principais: [L(10, 9, 8, 7), L(12, 10, 8)],
    auxiliares: [L(15, 14, 13), L(20, 18)],
  },
  metodos: [],
  ...extra,
})

const todas = (m: Meso) =>
  Array.from({ length: m.semanas }, (_, w) =>
    Array.from({ length: m.frequencia }, (_, t) => prescreverSessao(m, w + 1, t + 1)),
  )

describe('migrarProgressao', () => {
  it('padrao = auxiliares; posições 1–2 com principais diferente ganham override por slotId', () => {
    const m = migrarProgressao(antigo())
    expect(m.progressao.padrao).toEqual(antigo().progressao.auxiliares)
    expect(m.progressaoExercicio).toEqual({
      A: antigo().progressao.principais,
      B: antigo().progressao.principais,
      D: antigo().progressao.principais,
      E: antigo().progressao.principais,
    })
  })

  it('o aluno não vê diferença: sessões idênticas antes e depois', () => {
    expect(todas(migrarProgressao(antigo()))).toEqual(todas(antigo()))
  })

  it('principais igual a auxiliares: sem overrides novos', () => {
    const igual = antigo({ progressao: { principais: [L(8, 8, 8), L(9, 9)], auxiliares: [L(8, 8, 8), L(9, 9)] } })
    const m = migrarProgressao(igual)
    expect(m.progressaoExercicio).toBeUndefined()
    expect(m.progressao.padrao).toEqual(igual.progressao.auxiliares)
  })

  it('override antigo `treino-pos` passa para o slotId (e vence o de principais)', () => {
    const ov = [L(5, 5), L(6, 6, 6)]
    const velho = antigo({ progressaoExercicio: { '1-2': ov, '1-3': ov } })
    const m = migrarProgressao(velho)
    expect(m.progressaoExercicio!.B).toEqual(ov)
    expect(m.progressaoExercicio!.C).toEqual(ov)
    expect(Object.keys(m.progressaoExercicio!).some((k) => /^\d+-\d+$/.test(k))).toBe(false)
    expect(todas(m)).toEqual(todas(velho))
  })

  it('override antigo de posição que não existe na divisão é descartado', () => {
    const m = migrarProgressao(antigo({ progressaoExercicio: { '2-9': [L(5)] } }))
    expect(m.progressaoExercicio).not.toHaveProperty('2-9')
  })

  it('idempotente: migrar de novo não muda nada', () => {
    const uma = migrarProgressao(antigo({ progressaoExercicio: { '1-3': [L(5, 5)] } }))
    expect(migrarProgressao(uma)).toEqual(uma)
  })

  it('meso já no formato novo (com padrao) não tem padrão/overrides de principais refeitos', () => {
    const novo = antigo({ progressao: { ...antigo().progressao, padrao: [L(7, 7), L(8, 8)] } })
    const m = migrarProgressao(novo)
    expect(m.progressao.padrao).toEqual([L(7, 7), L(8, 8)])
    expect(m.progressaoExercicio).toBeUndefined()
  })

  it('não altera o meso original', () => {
    const o = antigo({ progressaoExercicio: { '1-3': [L(5, 5)] } })
    const copia = JSON.parse(JSON.stringify(o))
    migrarProgressao(o)
    expect(o).toEqual(copia)
  })

  it('só migra posições 1–2 de cada treino (treino com 1 exercício)', () => {
    const m = migrarProgressao(antigo({ divisao: [[slot('A')], [slot('D'), slot('E'), slot('F')]] }))
    expect(Object.keys(m.progressaoExercicio!).sort()).toEqual(['A', 'D', 'E'])
  })
})
