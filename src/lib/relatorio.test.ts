import { describe, expect, it } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import type { Meso, Slot } from '../engine'
import type { MesoEvolucao, RegistroEvolucao } from './evolucao'
import { cicloTerminou, relatorioCiclo, relatoriosParaRevisar } from './relatorio'

const sp = (iso: string) => new Date(`${iso}-03:00`)
const ts = (iso: string) => Timestamp.fromDate(sp(iso))
const agora = sp('2026-10-10T08:00')

const slot = (slotId: string, nome = slotId): Slot => ({ slotId, nome })
const linha = [10, 10]
// Treino 1: Agachamento (A) e Supino (B); treino 2: Remada (C). 2 séries de 10 reps.
const meso = (over: Partial<Meso> = {}): Meso => ({
  frequencia: 2,
  semanas: 4,
  inicio: '2026-09-07',
  pausaS: 60,
  divisao: [[slot('A', 'Agachamento'), slot('B', 'Supino')], [slot('C', 'Remada')]],
  progressao: { principais: Array(4).fill(linha), auxiliares: Array(4).fill(linha) },
  metodos: [],
  ...over,
})
const m0: MesoEvolucao = { id: 'm0', meso: meso({ inicio: '2026-08-03' }), nome: 'Ciclo 1' }
const m1: MesoEvolucao = { id: 'm1', meso: meso(), nome: 'Ciclo 2' }
const carga = (slotId: string, kg: number) => ({ [slotId]: { s1: kg, s2: kg } })
const feito = (mesoId: string, semana: number, treino: number, fim: string, cargas: RegistroEvolucao['cargas'], inicio?: string): RegistroEvolucao => ({
  mesoId,
  semana,
  treino,
  realizado: true,
  realizadoEm: ts(fim),
  ...(inicio && { inicioEm: ts(inicio) }),
  cargas,
})

const registros = [
  feito('m0', 1, 1, '2026-08-04T10:00', { ...carga('A', 70), ...carga('B', 40) }),
  feito('m1', 1, 1, '2026-09-08T10:00', { ...carga('A', 50), ...carga('B', 40) }, '2026-09-08T09:00'), // 60 min
  feito('m1', 1, 2, '2026-09-10T11:00', carga('C', 30), '2026-09-10T10:30'), // 30 min
  feito('m1', 2, 1, '2026-09-15T10:00', { ...carga('A', 55), ...carga('B', 40) }, '2026-09-15T06:00'), // 240 min: esqueceu
  feito('m1', 3, 1, '2026-09-22T10:00', { ...carga('A', 60), ...carga('B', 45) }),
]

describe('relatorioCiclo', () => {
  it('ciclo terminado: frequência, volume, evolução, recordes contra todo o histórico e tempo médio', () => {
    expect(relatorioCiclo([m0, m1], registros, 'm1', agora)).toEqual({
      nome: 'Ciclo 2',
      inicio: '2026-09-07',
      fim: '2026-10-04',
      semanas: 4,
      frequencia: 2,
      feitos: 4,
      previstos: 8,
      aderenciaPct: 50,
      semanasCompletas: 1,
      porSemana: [
        { semana: 1, feitos: 2, previstos: 2, volumeKg: 2400, movimentos: 60 },
        { semana: 2, feitos: 1, previstos: 2, volumeKg: 1900, movimentos: 40 },
        { semana: 3, feitos: 1, previstos: 2, volumeKg: 2100, movimentos: 40 },
        { semana: 4, feitos: 0, previstos: 2, volumeKg: 0, movimentos: 0 },
      ],
      evolucoes: [
        { nome: 'Agachamento', de: 50, ate: 60, kg: 10, pct: 20 },
        { nome: 'Supino', de: 40, ate: 45, kg: 5, pct: 12.5 },
      ],
      // Agachamento nunca passou dos 70 do ciclo anterior; Remada 30 é a 1ª carga (não é recorde).
      recordes: [{ nome: 'Supino', kg: 45, semana: 3, treino: 1 }],
      volumeKg: 6400,
      movimentos: 140,
      tempoMedioMin: 45,
    })
  })

  it('ciclo em andamento: previstos só até a semana atual', () => {
    const r = relatorioCiclo([m1], registros.slice(1, 3), 'm1', sp('2026-09-16T08:00'))!
    expect(r.porSemana.map((s) => s.semana)).toEqual([1, 2])
    expect([r.feitos, r.previstos, r.aderenciaPct]).toEqual([2, 4, 50])
  })

  it('sem treino: zeros e tempo médio null; meso desconhecido: null', () => {
    const r = relatorioCiclo([m1], [], 'm1', agora)!
    expect([r.feitos, r.aderenciaPct, r.volumeKg, r.movimentos, r.tempoMedioMin, r.recordes, r.evolucoes]).toEqual([0, 0, 0, 0, null, [], []])
    expect(relatorioCiclo([m1], [], 'x', agora)).toBeNull()
  })

  it('peso do corpo: carga lida pelo conversor (formato antigo: extra 2 + corpo 80; série vazia conta o corpo)', () => {
    const corpo: MesoEvolucao = { id: 'mc', meso: meso({ divisao: [[slot('P', 'Barra fixa')], [slot('C', 'Remada')]] }) }
    const r = relatorioCiclo([corpo], [{ ...feito('mc', 1, 1, '2026-09-08T10:00', { P: { s1: 2 } }), pc: { P: 80 } }], 'mc', agora)!
    expect(r.volumeKg).toBe(82 * 10 + 80 * 10)
  })
})

describe('cicloTerminou e relatoriosParaRevisar', () => {
  it('terminou só depois do último dia', () => {
    expect(cicloTerminou(m1.meso, sp('2026-10-04T23:00'))).toBe(false)
    expect(cicloTerminou(m1.meso, sp('2026-10-05T00:30'))).toBe(true)
  })

  it('terminados há até 30 dias sem relatório liberado, o mais recente primeiro', () => {
    const m2: MesoEvolucao = { id: 'm2', meso: meso({ inicio: '2026-08-10' }) } // termina 06/09: 34 dias
    const m3: MesoEvolucao = { id: 'm3', meso: meso({ inicio: '2026-08-31' }) } // termina 27/09
    const m4: MesoEvolucao = { id: 'm4', meso: meso({ inicio: '2026-08-14' }) } // termina 10/09: 30 dias
    const andamento: MesoEvolucao = { id: 'm5', meso: meso({ inicio: '2026-10-05' }) }
    expect(relatoriosParaRevisar([m0, m1, m2, m3, m4, andamento], new Set(), agora).map((m) => m.id)).toEqual(['m1', 'm3', 'm4'])
    expect(relatoriosParaRevisar([m1, m3], new Set(['m1']), agora).map((m) => m.id)).toEqual(['m3'])
  })
})
