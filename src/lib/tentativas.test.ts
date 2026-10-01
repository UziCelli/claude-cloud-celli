import { describe, expect, it } from 'vitest'
import { esperaSeg } from './tentativas'

describe('esperaSeg', () => {
  it('livre até a 4ª falha; a 5ª espera 30 s e dobra', () => {
    expect([0, 1, 4].map(esperaSeg)).toEqual([0, 0, 0])
    expect([5, 6, 7, 8].map(esperaSeg)).toEqual([30, 60, 120, 240])
  })
  it('máximo de 15 min', () => {
    expect(esperaSeg(10)).toBe(900)
    expect(esperaSeg(500)).toBe(900)
  })
})
