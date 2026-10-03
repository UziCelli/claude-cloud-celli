import { describe, expect, it } from 'vitest'
import { acimaDoLimite, fmtMin, fmtReps } from './tempo'

describe('fmtMin', () => {
  it('arredonda para cima, sem "~"', () => {
    expect(fmtMin(58.1)).toBe('59 min')
    expect(fmtMin(60)).toBe('60 min')
    expect(fmtMin(13.5)).toBe('14 min')
  })
})

describe('acimaDoLimite', () => {
  it('sem limite nunca avisa', () => {
    expect(acimaDoLimite(500)).toBe(false)
    expect(acimaDoLimite(500, undefined)).toBe(false)
  })
  it('só passa do limite, não igual', () => {
    expect(acimaDoLimite(75, 75)).toBe(false)
    expect(acimaDoLimite(75.1, 75)).toBe(true)
    expect(acimaDoLimite(60, 75)).toBe(false)
  })
})

describe('fmtReps', () => {
  it('séries iguais viram NxR; diferentes ficam separadas por barra', () => {
    expect(fmtReps([10, 10, 10], 3)).toBe('3×10')
    expect(fmtReps([10, 10, 8], 3)).toBe('10/10/8')
    expect(fmtReps([12], 1)).toBe('1×12')
  })
  it('etapas do dropset entram depois das séries', () => {
    expect(fmtReps([10, 10, 8, 6], 2)).toBe('2×10 + 8/6 drop')
    expect(fmtReps([10, 8, 8], 2)).toBe('10/8 + 8 drop')
  })
  it('sem séries devolve traço', () => {
    expect(fmtReps([], 0)).toBe('—')
  })
})
