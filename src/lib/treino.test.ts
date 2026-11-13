import { describe, expect, it } from 'vitest'
import type { Meso, Slot } from '../engine'
import { cargaAnterior, semanaAtual } from './treino'

const sp = (iso: string) => new Date(`${iso}-03:00`)
const slot = (slotId: string, nome: string): Slot => ({ slotId, nome })

const base: Meso = {
  frequencia: 1,
  semanas: 4,
  inicio: '2026-10-05', // segunda
  pausaS: 60,
  divisao: [[slot('a', 'Supino'), slot('b', 'Agachamento')]],
  progressao: { principais: [], auxiliares: [] },
  metodos: [],
}

describe('semanaAtual (dia de calendário em São Paulo)', () => {
  it('antes do início: semana 1 e dias para começar', () => {
    expect(semanaAtual(base, sp('2026-10-04T23:59'))).toEqual({ estado: 'antes', semana: 1, diasParaComecar: 1 })
    expect(semanaAtual(base, sp('2026-09-28T08:00'))).toEqual({ estado: 'antes', semana: 1, diasParaComecar: 7 })
  })
  it('conta pelo dia de São Paulo, não UTC', () => {
    // 04/10 23:30 em SP já é dia 05 em UTC
    expect(semanaAtual(base, sp('2026-10-04T23:30')).estado).toBe('antes')
    // 11/10 23:30 em SP ainda é semana 1 (em UTC já seria 12/10)
    expect(semanaAtual(base, sp('2026-10-11T23:30'))).toEqual({ estado: 'durante', semana: 1 })
  })
  it('semana w cobre [inicio+7(w−1), inicio+7w)', () => {
    expect(semanaAtual(base, sp('2026-10-05T00:00'))).toEqual({ estado: 'durante', semana: 1 })
    expect(semanaAtual(base, sp('2026-10-12T00:00'))).toEqual({ estado: 'durante', semana: 2 })
    expect(semanaAtual(base, sp('2026-11-01T23:59'))).toEqual({ estado: 'durante', semana: 4 })
  })
  it('depois do fim: última semana', () => {
    expect(semanaAtual(base, sp('2026-11-02T00:00'))).toEqual({ estado: 'depois', semana: 4 })
    expect(semanaAtual(base, sp('2027-03-01T12:00'))).toEqual({ estado: 'depois', semana: 4 })
  })
})

describe('cargaAnterior', () => {
  const meso: Meso = {
    ...base,
    progressao: { principais: [[10, 10], [10, 10], [10, 10], [10, 10]], auxiliares: [[10, 10], [10, 10], [10, 10], [10, 10]] },
    trocas: {
      '2-1-1': slot('x', 'Remada'), // outro exercício na semana 2
      '4-1-2': slot('b4', 'Agachamento'), // mesmo nome, outro slotId
    },
  }
  const registros = {
    '1-1': { a: [40, 42], b: [80] },
    '2-1': { x: [30], b: [] },
    '3-1': { a: [null, null], b: [90, null] },
  }

  it('semana anterior mais recente com o mesmo nome, pelo slotId daquela semana', () => {
    expect(cargaAnterior(meso, registros, 4, 1, 2)).toEqual({ series: [90, null], drops: [] }) // s4 b4 ← s3 b
  })
  it('pula semana sem carga e semana com exercício trocado', () => {
    expect(cargaAnterior(meso, registros, 4, 1, 1)).toEqual({ series: [40, 42], drops: [] }) // s3 vazia, s2 Remada
    expect(cargaAnterior(meso, registros, 3, 1, 2)).toEqual({ series: [80], drops: [] }) // s2 b = []
  })
  it('null quando não há carga anterior', () => {
    expect(cargaAnterior(meso, registros, 1, 1, 1)).toBeNull()
    expect(cargaAnterior(meso, registros, 2, 1, 1)).toBeNull() // Remada não aparece antes
    expect(cargaAnterior(meso, {}, 4, 1, 1)).toBeNull()
    expect(cargaAnterior(meso, registros, 4, 1, 9)).toBeNull() // posição inexistente
  })
  it('com pcs, devolve só o extra: total menos o peso do corpo DAQUELE registro (não o de hoje)', () => {
    const pcs = { '3-1': { b: 76 }, '1-1': { b: 0 } }
    expect(cargaAnterior(meso, registros, 4, 1, 2, pcs)).toEqual({ series: [14, null], drops: [] }) // 90 - 76
    expect(cargaAnterior(meso, registros, 3, 1, 2, pcs)).toEqual({ series: [80], drops: [] }) // s1 b: pc 0, total = extra
    expect(cargaAnterior(meso, { '3-1': { b: [70, 90] } }, 4, 1, 2, pcs)).toEqual({ series: [0, 14], drops: [] }) // nunca negativo
  })
  it('separa séries e drops pelo n da semana anterior (3 séries + D1 vs. 4 séries hoje)', () => {
    const m: Meso = {
      ...base,
      divisao: [[slot('a', 'Supino')]],
      progressao: { principais: [[10, 10, 10], [10, 10, 10, 10]], auxiliares: [] },
      metodos: [{ semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', ativo: true, escopo: 'Últimas 2 séries', etapas: 1 }],
    }
    const r = cargaAnterior(m, { '1-1': { a: [50, 50, 50, 30] } }, 2, 1, 1)
    expect(r).toEqual({ series: [50, 50, 50], drops: [] }) // hoje não tem drop
    expect(r!.series[3]).toBeUndefined() // S4 não herda o D1
    const comDrop = { ...m, metodos: [...m.metodos, { ...m.metodos[0], semana: 2 }] }
    expect(cargaAnterior(comDrop, { '1-1': { a: [50, 50, 50, 30] } }, 2, 1, 1)!.drops).toEqual([30]) // D1 da S3 → D1 da S4
  })

  it('drops seguem a série: o D1 da S1 puxa o D1 da S1 da semana anterior', () => {
    const d = (semana: number, serie: number, etapas: number) =>
      ({ semana, treino: 1, exercicio: 1, metodo: 'Dropset', ativo: true, escopo: 'Série específica', serie, etapas }) as const
    const m: Meso = {
      ...base,
      divisao: [[slot('a', 'Supino')]],
      progressao: { principais: [[10, 10, 10], [10, 10, 10]], auxiliares: [] },
      metodos: [d(1, 1, 1), d(1, 3, 2), d(2, 3, 1)], // semana 2: só o drop da S3
    }
    // semana 1: S1 S2 S3 | S1·D1=40 | S3·D1=30 S3·D2=20
    expect(cargaAnterior(m, { '1-1': { a: [60, 60, 60, 40, 30, 20] } }, 2, 1, 1)!.drops).toEqual([30])
  })
})

describe('cargaAnterior com treino ajustado no presencial', () => {
  const m: Meso = {
    frequencia: 1, semanas: 2, inicio: '2026-01-05', pausaS: 60,
    divisao: [[{ slotId: 'A', nome: 'Supino' }, { slotId: 'B', nome: 'Remada' }]],
    progressao: { principais: [[10, 10], [10, 10]], auxiliares: [[12, 12], [12, 12]] },
    metodos: [],
    sessoes: { '2-1': { semana: 2, treino: 1, exercicios: [{ slotId: 'B', nome: 'Remada', de: 2 }, { slotId: 'n', nome: 'Supino' }], metodos: [] } },
  }
  it('acha o mesmo exercício em outra posição da semana anterior', () => {
    const regs = { '1-1': { A: [50, 52], B: [30, null] } }
    expect(cargaAnterior(m, regs, 2, 1, 1)).toEqual({ series: [30, null], drops: [] })
    expect(cargaAnterior(m, regs, 2, 1, 2)).toEqual({ series: [50, 52], drops: [] })
  })
})

describe('cargaAnterior com 2 lados', () => {
  const meso: Meso = {
    ...base,
    divisao: [[slot('r', 'Rosca Direta Halter'), slot('s', 'Supino')]],
    progressao: { principais: [[10, 10], [10, 10], [10, 10]], auxiliares: [] },
  }
  it('ignora célula antiga (sem lados): não dá para saber se era por lado ou total', () => {
    expect(cargaAnterior(meso, { '1-1': { r: [12, 12] } }, 2, 1, 1)).toBeNull()
    expect(cargaAnterior(meso, { '1-1': { r: [12, 12] } }, 2, 1, 1, undefined, {})).toBeNull()
  })
  it('célula nova: devolve o esquerdo e o direito por lado', () => {
    const r = cargaAnterior(meso, { '1-1': { r: [12, 14] } }, 2, 1, 1, undefined, { '1-1': { r: [6, 6] } })
    expect(r).toEqual({ series: [6, 6], drops: [], dir: { series: [6, 8], drops: [] } })
  })
  it('com corpo no registro de origem, o direito sai de total - corpo - esquerdo', () => {
    const r = cargaAnterior(meso, { '1-1': { r: [92] } }, 2, 1, 1, { '1-1': { r: 80 } }, { '1-1': { r: [6] } })
    expect(r!.series).toEqual([6])
    expect(r!.dir!.series).toEqual([6])
  })
  it('pula a semana antiga e usa a anterior no formato novo', () => {
    const r = cargaAnterior(meso, { '1-1': { r: [10] }, '2-1': { r: [20] } }, 3, 1, 1, undefined, { '1-1': { r: [5] } })
    expect(r!.series).toEqual([5])
  })
  it('exercício comum não muda (sem dir)', () => {
    expect(cargaAnterior(meso, { '1-1': { s: [50] } }, 2, 1, 2)).toEqual({ series: [50], drops: [] })
  })
})

