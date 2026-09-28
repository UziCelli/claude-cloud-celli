import { describe, expect, it } from 'vitest'
import { evolucaoExercicio, metricasExercicio, metricasSemana, metricasSessao } from './metricas'
import { prescreverSessao } from './sessao'
import type { Meso, Slot } from './tipos'

const slot = (slotId: string, nome = slotId): Slot => ({ slotId, nome })

// Semana 1: principais [10,9,8,7], auxiliares [15,14,13,12]; semana 2: principais [12,10,8], auxiliares [20,18,16]
const meso: Meso = {
  frequencia: 2,
  semanas: 2,
  inicio: '2026-08-24',
  pausaS: 60,
  divisao: [[slot('A', 'Agachamento'), slot('B', 'Terra'), slot('C', 'Supino')], [slot('D', 'Supino')]],
  progressao: {
    principais: [
      [10, 9, 8, 7],
      [12, 10, 8],
    ],
    auxiliares: [
      [15, 14, 13, 12],
      [20, 18, 16],
    ],
  },
  metodos: [],
}

describe('metricasExercicio', () => {
  it('movimentos, média/máx das cargas preenchidas e volume Σ reps×kg', () => {
    // movimentos = 10+9+8+7 = 34; cargas 50,50,60 → média 160/3, máx 60
    // volume = 10·50 + 9·50 + 7·60 = 500 + 450 + 420 = 1370
    const m = metricasExercicio([10, 9, 8, 7], [50, 50, null, 60])
    expect(m.movimentos).toBe(34)
    expect(m.cargaMedia).toBeCloseTo(160 / 3, 9)
    expect(m.cargaMax).toBe(60)
    expect(m.volume).toBe(1370)
  })

  it('[CORRIGIDO] a média inclui a série 1', () => {
    expect(metricasExercicio([10, 10], [40, 60]).cargaMedia).toBe(50) // ignorando a série 1 daria 60
    expect(metricasExercicio([10, 10], [40, null]).cargaMedia).toBe(40)
  })

  it('sem cargas → null (não 0)', () => {
    expect(metricasExercicio([10, 10], [])).toEqual({ movimentos: 20, cargaMedia: null, cargaMax: null, volume: null })
    expect(metricasExercicio([10, 10], [null, null]).volume).toBeNull()
  })

  it('etapas do dropset entram no volume', () => {
    // 50·(10+9+8+7) + 40·6 + 30·7 = 1700 + 240 + 210 = 2150
    expect(metricasExercicio([10, 9, 8, 7, 6, 7], [50, 50, 50, 50, 40, 30]).volume).toBe(2150)
  })
})

describe('metricasSessao / metricasSemana', () => {
  const s11 = prescreverSessao(meso, 1, 1)! // A [10,9,8,7], B [10,9,8,7], C [15,14,13,12]
  const s12 = prescreverSessao(meso, 1, 2)! // D [10,9,8,7]
  const c11 = { A: [50, 50, null, 60], B: [20, 30] } // C sem registro
  const c12 = { D: [100, 100, 100, 100] }

  it('sessão: Σ movimentos, média das cargaMedia > 0, Σ volumes', () => {
    // A: mov 34, média 160/3, vol 1370 · B: mov 34, média 25, vol 10·20 + 9·30 = 470 · C: mov 54, nulls
    const m = metricasSessao(s11, c11)
    expect(m.exercicios.map((e) => e.volume)).toEqual([1370, 470, null])
    expect(m.movimentos).toBe(122)
    expect(m.cargaMedia).toBeCloseTo((160 / 3 + 25) / 2, 9) // = 235/6
    expect(m.volume).toBe(1840)
  })

  it('sessão sem cargas → cargaMedia e volume null', () => {
    const m = metricasSessao(s11, {})
    expect([m.movimentos, m.cargaMedia, m.volume]).toEqual([122, null, null])
  })

  it('semana: Σ, média das sessões com valor, sessões ativas e status', () => {
    // s12: mov 34, média 100, vol 100·34 = 3400
    const m = metricasSemana([
      { sessao: s11, cargas: c11 },
      { sessao: s12, cargas: c12 },
    ])
    expect(m.movimentos).toBe(156) // 122 + 34
    expect(m.cargaMedia).toBeCloseTo((235 / 6 + 100) / 2, 9) // = 835/12
    expect(m.volume).toBe(5240) // 1840 + 3400
    expect(m.sessoesAtivas).toBe(2)
    expect(m.status).toBe('Ativa')
  })

  it('semana: sessão sem cargas não entra na média', () => {
    const m = metricasSemana([
      { sessao: s11, cargas: {} },
      { sessao: s12, cargas: c12 },
    ])
    expect([m.movimentos, m.cargaMedia, m.volume, m.sessoesAtivas]).toEqual([156, 100, 3400, 2])
  })

  it('semana vazia → nulls e status ""', () => {
    expect(metricasSemana([])).toEqual({ movimentos: 0, cargaMedia: null, volume: null, sessoesAtivas: 0, status: '' })
  })
})

describe('evolucaoExercicio', () => {
  it('lista cada ocorrência por semana/treino/posição, respeitando trocas', () => {
    // 'Supino': (s1,t1,pos3 C aux [15,14,13,12]), (s1,t2,pos1 D princ [10,9,8,7]),
    //           (s2,t1,pos3 trocado por Remada → fora), (s2,t2,pos1 D princ [12,10,8])
    const comTroca = { ...meso, trocas: { '2-1-3': slot('X', 'Remada') } }
    const registros = {
      '1-1': { C: [30, 30, 40, 40] }, // máx 40, média 35, vol 15·30+14·30+13·40+12·40 = 450+420+520+480 = 1870
      '1-2': { D: [60, 70] }, // máx 70, média 65, vol 10·60 + 9·70 = 600 + 630 = 1230
      '2-1': { X: [99] },
    }
    expect(evolucaoExercicio(comTroca, registros, 'Supino')).toEqual([
      { ocorrencia: 1, semana: 1, treino: 1, cargaMax: 40, cargaMedia: 35, volume: 1870 },
      { ocorrencia: 2, semana: 1, treino: 2, cargaMax: 70, cargaMedia: 65, volume: 1230 },
      { ocorrencia: 3, semana: 2, treino: 2, cargaMax: null, cargaMedia: null, volume: null },
    ])
    expect(evolucaoExercicio(comTroca, registros, 'Remada')).toEqual([
      { ocorrencia: 1, semana: 2, treino: 1, cargaMax: 99, cargaMedia: 99, volume: 99 * 20 },
    ])
  })
})
