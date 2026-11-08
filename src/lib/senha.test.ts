import { describe, expect, it } from 'vitest'
import { problemaSenha } from './senha'

describe('problemaSenha', () => {
  it('aceita 8+ caracteres com letra e número', () => {
    expect(problemaSenha('senha123')).toBe('')
    expect(problemaSenha('Ábaco 2026')).toBe('')
  })
  it('recusa curta, sem número ou sem letra', () => {
    expect(problemaSenha('abc123')).toMatch(/8 caracteres/)
    expect(problemaSenha('senhalonga')).toMatch(/número/)
    expect(problemaSenha('12345678')).toMatch(/letra/)
  })
})
