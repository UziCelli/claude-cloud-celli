import { describe, expect, it } from 'vitest'
import { acimaDoLimite, fmtMin } from './tempo'

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
