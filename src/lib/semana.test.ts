import { describe, expect, it } from 'vitest'
import type { Meso } from '../engine'
import { semanaParaAbrir } from './semana'

const sp = (iso: string) => new Date(`${iso}-03:00`)

const meso: Meso = {
  frequencia: 2,
  semanas: 4,
  inicio: '2026-10-05', // segunda
  pausaS: 60,
  divisao: [[], []],
  progressao: { principais: [], auxiliares: [] },
  metodos: [],
}

const feitos = (semana: number, treinos = [1, 2]) => treinos.map((treino) => ({ semana, treino, realizado: true }))

describe('semanaParaAbrir', () => {
  it('antes do início abre a semana 1', () => {
    expect(semanaParaAbrir(meso, [], sp('2026-09-28T08:00'))).toBe(1)
  })
  it('semana 1 incompleta e data na semana 1: fica na 1', () => {
    expect(semanaParaAbrir(meso, feitos(1, [1]), sp('2026-10-06T08:00'))).toBe(1)
  })
  it('semana 1 completa com a data ainda na semana 1: abre a 2', () => {
    expect(semanaParaAbrir(meso, feitos(1), sp('2026-10-07T08:00'))).toBe(2)
  })
  it('treino sem "realizado" não conta como feito', () => {
    const regs = [...feitos(1, [1]), { semana: 1, treino: 2 }, { semana: 1, treino: 2, realizado: false }]
    expect(semanaParaAbrir(meso, regs, sp('2026-10-07T08:00'))).toBe(1)
  })
  it('data na semana 3 com a semana 2 incompleta: abre a 3', () => {
    const regs = [...feitos(1), ...feitos(2, [1])]
    expect(semanaParaAbrir(meso, regs, sp('2026-10-20T08:00'))).toBe(3)
  })
  it('atrasado: a primeira incompleta só vale se estiver à frente da data', () => {
    const regs = [...feitos(1), ...feitos(2)]
    expect(semanaParaAbrir(meso, regs, sp('2026-10-07T08:00'))).toBe(3)
  })
  it('todas completas: última semana (limitada a 1..semanas)', () => {
    const regs = [1, 2, 3, 4].flatMap((w) => feitos(w))
    expect(semanaParaAbrir(meso, regs, sp('2026-10-07T08:00'))).toBe(4)
  })
  it('depois do fim do meso: última semana', () => {
    expect(semanaParaAbrir(meso, [], sp('2027-03-01T12:00'))).toBe(4)
  })
})
