import { describe, expect, it } from 'vitest'
import { ajustarSeries, progressaoAutomatica, reduzirVolume, tempoPorSemana } from './volume'
import { prescreverSessao } from './sessao'
import type { Meso, Slot } from './tipos'

const slot = (slotId: string): Slot => ({ slotId, nome: slotId })

describe('ajustarSeries', () => {
  it('3x8 +5% -> 9/9/8 (26 movimentos, sobra nas primeiras)', () => {
    expect(ajustarSeries([8, 8, 8, null, null, null], 5, 15)).toEqual([9, 9, 8, null, null, null])
  })

  it('3x10 -20% -> 8/8/8', () => {
    expect(ajustarSeries([10, 10, 10, null, null, null], -20, 15)).toEqual([8, 8, 8, null, null, null])
  })

  it('limite 15: 3x15 +10% vira 4 séries (50 -> 13/13/12/12)', () => {
    expect(ajustarSeries([15, 15, 15, null, null, null], 10, 15)).toEqual([13, 13, 12, 12, null, null])
  })

  it('no máximo 6 séries', () => {
    const r = ajustarSeries([15, 15, 15, 15, 15, 15], 50, 15)
    expect(r.filter((x) => x !== null)).toHaveLength(6)
  })

  it('nunca menos de 1 rep por série', () => {
    expect(ajustarSeries([1, 1, 1, null, null, null], -90, 15)).toEqual([1, 1, 1, null, null, null])
    expect(ajustarSeries([2, 2, null, null, null, null], -100, 15)).toEqual([1, 1, null, null, null, null])
  })

  it('reps sempre inteiras, mesmo com % quebrado', () => {
    const r = ajustarSeries([7, 7, 7, null, null, null], 13.3333, 15).filter((x) => x !== null) as number[]
    expect(r.every(Number.isInteger)).toBe(true)
  })

  it('sem erro de ponto flutuante: 20 +10% = 22 exato', () => {
    expect(ajustarSeries([10, 10, null, null, null, null], 10, 15)).toEqual([11, 11, null, null, null, null])
  })

  it('linha vazia continua vazia', () => {
    expect(ajustarSeries([null, null, null, null, null, null], 5, 15)).toEqual([null, null, null, null, null, null])
  })
})

// 8 semanas, 1 treino com 3 exercícios (2 principais + 1 auxiliar), tudo 3x8 na semana 1.
const linha8 = () => [8, 8, 8, null, null, null]
const mesoBase = (extra: Partial<Meso> = {}): Meso => ({
  frequencia: 2,
  semanas: 8,
  inicio: '2026-10-05',
  pausaS: 60,
  divisao: [[slot('A'), slot('B'), slot('C')], [slot('D'), slot('E'), slot('F')]],
  progressao: {
    principais: Array.from({ length: 8 }, linha8),
    auxiliares: Array.from({ length: 8 }, linha8),
  },
  metodos: [],
  ...extra,
})
const movs = (l: (number | null)[]) => l.reduce<number>((s, r) => s + (r ?? 0), 0)

describe('progressaoAutomatica', () => {
  it('semana a semana a partir da anterior (todos)', () => {
    const m = progressaoAutomatica(mesoBase(), { pct: 5, de: 2, ate: 4, alvo: { tipo: 'todos' } })
    expect(m.progressao.principais.slice(0, 4)).toEqual([
      [8, 8, 8, null, null, null],
      [9, 9, 8, null, null, null], // 24 -> 26
      [10, 9, 9, null, null, null], // 26 -> 28 (27,3 -> 28)
      [10, 10, 10, null, null, null], // 28 -> 30 (29,4 -> 30)
    ])
    expect(m.progressao.auxiliares[1]).toEqual([9, 9, 8, null, null, null])
    // fora do intervalo não muda
    expect(m.progressao.principais[4]).toEqual(linha8())
  })

  it('não altera o meso original', () => {
    const original = mesoBase()
    const copia = JSON.parse(JSON.stringify(original))
    progressaoAutomatica(original, { pct: 5, de: 2, ate: 4, alvo: { tipo: 'todos' } })
    expect(original).toEqual(copia)
  })

  it('usa limiteReps do meso', () => {
    const m = progressaoAutomatica(mesoBase({ limiteReps: 8 }), { pct: 5, de: 2, ate: 2, alvo: { tipo: 'todos' } })
    // 26 com limite 8: 3 séries dariam 9 > 8 -> 4 séries (7/7/6/6)
    expect(m.progressao.principais[1]).toEqual([7, 7, 6, 6, null, null])
  })

  it('semana 1 não tem anterior: começa na 2', () => {
    const m = progressaoAutomatica(mesoBase(), { pct: 5, de: 1, ate: 2, alvo: { tipo: 'todos' } })
    expect(m.progressao.principais[0]).toEqual(linha8())
    expect(m.progressao.principais[1]).toEqual([9, 9, 8, null, null, null])
  })

  it('alvo treino: cria override só das posições daquele treino', () => {
    const m = progressaoAutomatica(mesoBase(), { pct: 5, de: 2, ate: 2, alvo: { tipo: 'treino', treino: 2 } })
    expect(Object.keys(m.progressaoExercicio!).sort()).toEqual(['2-1', '2-2', '2-3'])
    expect(m.progressaoExercicio!['2-1'][1]).toEqual([9, 9, 8, null, null, null])
    // linhas do grupo intactas
    expect(m.progressao).toEqual(mesoBase().progressao)
    // o treino 1 segue igual
    expect(prescreverSessao(m, 2, 1)!.exercicios[0].reps).toEqual([8, 8, 8])
    expect(prescreverSessao(m, 2, 2)!.exercicios[0].reps).toEqual([9, 9, 8])
  })

  it('alvo exercício: cria override só dele, sem mexer nos outros', () => {
    const m = progressaoAutomatica(mesoBase(), { pct: 5, de: 2, ate: 3, alvo: { tipo: 'exercicio', treino: 1, pos: 3 } })
    expect(Object.keys(m.progressaoExercicio!)).toEqual(['1-3'])
    expect(m.progressaoExercicio!['1-3']).toHaveLength(8) // nasce como cópia das 8 semanas
    expect(m.progressaoExercicio!['1-3'][0]).toEqual(linha8())
    expect(m.progressaoExercicio!['1-3'][2]).toEqual([10, 9, 9, null, null, null])
    expect(m.progressao).toEqual(mesoBase().progressao)
    expect(prescreverSessao(m, 3, 1)!.exercicios.map((e) => e.reps.reduce((a, b) => a + b, 0))).toEqual([24, 24, 28])
  })

  it('alvo exercício parte do override já existente', () => {
    const base = mesoBase({ progressaoExercicio: { '1-1': Array.from({ length: 8 }, () => [10, 10, 10, null, null, null]) } })
    const m = progressaoAutomatica(base, { pct: 10, de: 2, ate: 2, alvo: { tipo: 'exercicio', treino: 1, pos: 1 } })
    expect(m.progressaoExercicio!['1-1'][1]).toEqual([11, 11, 11, null, null, null]) // 30 -> 33
  })

  it('alvo todos também ajusta os overrides existentes', () => {
    const base = mesoBase({ progressaoExercicio: { '1-1': Array.from({ length: 8 }, () => [10, 10, 10, null, null, null]) } })
    const m = progressaoAutomatica(base, { pct: 10, de: 2, ate: 2, alvo: { tipo: 'todos' } })
    expect(m.progressaoExercicio!['1-1'][1]).toEqual([11, 11, 11, null, null, null])
    expect(m.progressao.principais[1]).toEqual([9, 9, 9, null, null, null]) // 24 -> 26,4 -> 27
  })
})

describe('reduzirVolume', () => {
  // Semana 2 = 26 (9/9/8) a partir de progressão de 5%; ref = semana 2 (de = 3).
  const prog = () => progressaoAutomatica(mesoBase(), { pct: 5, de: 2, ate: 2, alvo: { tipo: 'todos' } })
  const total = (m: Meso, semana: number) => movs(m.progressao.principais[semana - 1])

  it('-20% nas semanas 3-4, volta em 2 semanas, depois progressão de 5% a partir de ref', () => {
    const m = reduzirVolume(prog(), { pct: 20, de: 3, ate: 4, retorno: 2, alvo: { tipo: 'todos' } })
    expect(m.progressao.principais.map((l) => movs(l))).toEqual([
      24, // s1
      26, // s2 = ref
      20, // s3: 26 * 0,80 = 20,8 -> 20
      20, // s4
      22, // s5: -13,33% -> 22,5 -> 22
      24, // s6: -6,67% -> 24,3 -> 24
      28, // s7: ref +5% = 27,3 -> 28
      30, // s8: 28 +5% = 29,4 -> 30
    ])
    expect(m.progressao.principais[2]).toEqual([7, 7, 6, null, null, null])
    expect(m.progressao.principais[4]).toEqual([8, 7, 7, null, null, null])
    expect(m.progressao.principais[5]).toEqual([8, 8, 8, null, null, null])
    expect(m.progressao.auxiliares.map((l) => movs(l))).toEqual([24, 26, 20, 20, 22, 24, 28, 30])
  })

  it('de = 1: ref é a própria semana 1', () => {
    const m = reduzirVolume(mesoBase(), { pct: 25, de: 1, ate: 1, retorno: 1, alvo: { tipo: 'todos' } })
    expect(total(m, 1)).toBe(18) // 24 * 0,75
    expect(total(m, 2)).toBe(21) // -12,5% -> 21
    expect(total(m, 3)).toBe(26) // ref +5% = 25,2 -> 26
  })

  it('usa progressaoPct do meso na retomada', () => {
    const m = reduzirVolume(mesoBase({ progressaoPct: 10 }), { pct: 20, de: 2, ate: 2, retorno: 0, alvo: { tipo: 'todos' } })
    expect(total(m, 2)).toBe(19) // 24 * 0,8 = 19,2 -> 19
    expect(total(m, 3)).toBe(27) // ref 24 +10% = 26,4 -> 27
  })

  it('não passa do fim do meso', () => {
    const m = reduzirVolume(mesoBase({ semanas: 4 }), { pct: 20, de: 3, ate: 4, retorno: 2, alvo: { tipo: 'todos' } })
    expect(m.progressao.principais).toHaveLength(8) // arrays da planilha intactos além do meso
    expect(total(m, 4)).toBe(19)
  })

  it('alvo exercício: só ele muda', () => {
    const m = reduzirVolume(mesoBase(), { pct: 20, de: 2, ate: 2, retorno: 1, alvo: { tipo: 'exercicio', treino: 2, pos: 1 } })
    expect(Object.keys(m.progressaoExercicio!)).toEqual(['2-1'])
    expect(m.progressao).toEqual(mesoBase().progressao)
    expect(movs(m.progressaoExercicio!['2-1'][1])).toBe(19)
  })
})

describe('tempoPorSemana', () => {
  it('maior tempoMin entre os treinos de cada semana', () => {
    const meso = mesoBase({
      semanas: 2,
      divisao: [[slot('A')], [slot('B'), slot('C'), slot('D')]],
    })
    const t = tempoPorSemana(meso)
    expect(t).toHaveLength(2)
    const esperado = Math.max(prescreverSessao(meso, 1, 1)!.tempoMin, prescreverSessao(meso, 1, 2)!.tempoMin)
    expect(t[0]).toBe(esperado)
    expect(t[0]).toBe(prescreverSessao(meso, 1, 2)!.tempoMin)
  })

  it('reflete overrides', () => {
    const meso = mesoBase({ semanas: 2 })
    const antes = tempoPorSemana(meso)[1]
    const depois = tempoPorSemana(progressaoAutomatica(meso, { pct: 50, de: 2, ate: 2, alvo: { tipo: 'todos' } }))[1]
    expect(depois).toBeGreaterThan(antes)
  })
})
