import { describe, expect, it } from 'vitest'
import { ehRecorde } from './recorde'

describe('ehRecorde', () => {
  it('só quando já havia carga e a nova é maior', () => {
    expect(ehRecorde(40, 45)).toBe(true)
    expect(ehRecorde(40, 40)).toBe(false)
    expect(ehRecorde(40, 30)).toBe(false)
  })
  it('sem histórico ou sem valor novo não é recorde', () => {
    expect(ehRecorde(null, 45)).toBe(false)
    expect(ehRecorde(40, null)).toBe(false)
  })
})
