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
    expect(cargaAnterior(meso, registros, 4, 1, 2)).toEqual([90, null]) // s4 b4 ← s3 b
  })
  it('pula semana sem carga e semana com exercício trocado', () => {
    expect(cargaAnterior(meso, registros, 4, 1, 1)).toEqual([40, 42]) // s3 vazia, s2 Remada
    expect(cargaAnterior(meso, registros, 3, 1, 2)).toEqual([80]) // s2 b = []
  })
  it('null quando não há carga anterior', () => {
    expect(cargaAnterior(meso, registros, 1, 1, 1)).toBeNull()
    expect(cargaAnterior(meso, registros, 2, 1, 1)).toBeNull() // Remada não aparece antes
    expect(cargaAnterior(meso, {}, 4, 1, 1)).toBeNull()
    expect(cargaAnterior(meso, registros, 4, 1, 9)).toBeNull() // posição inexistente
  })
})
