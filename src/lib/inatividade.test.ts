import { describe, expect, it, vi } from 'vitest'

vi.mock('./firebase', () => ({ db: {} }))
vi.mock('firebase/firestore', () => ({ waitForPendingWrites: () => Promise.resolve() }))
vi.mock('./acoes', () => ({ sair: () => {} }))
const { expirou, LIMITE_MIN } = await import('./inatividade')

describe('inatividade', () => {
  it('limites por papel', () => {
    expect(LIMITE_MIN).toEqual({ coach: 20, aluno: 240 })
  })
  it('expira no limite exato, não antes', () => {
    const t0 = 1_000_000
    expect(expirou(t0, t0 + 19 * 60_000, 'coach')).toBe(false)
    expect(expirou(t0, t0 + 20 * 60_000, 'coach')).toBe(true)
    expect(expirou(t0, t0 + 20 * 60_000, 'aluno')).toBe(false)
    expect(expirou(t0, t0 + 239 * 60_000, 'aluno')).toBe(false)
    expect(expirou(t0, t0 + 240 * 60_000, 'aluno')).toBe(true)
  })
  it('sem marca (aparelho sem armazenamento) não derruba ninguém', () => {
    expect(expirou(0, Date.now(), 'coach')).toBe(false)
  })
})
