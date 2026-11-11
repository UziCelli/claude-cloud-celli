import { beforeEach, describe, expect, it } from 'vitest'
import { estadoSenha, lembrarSenha, problemaSenha, requisitosSenha } from './senha'

describe('problemaSenha', () => {
  it('aceita 8+ caracteres com letra e número', () => {
    expect(problemaSenha('senha123')).toBe('')
    expect(problemaSenha('Ábaco 2026')).toBe('')
  })
  it('recusa curta, sem número ou sem letra', () => {
    expect(problemaSenha('abc123')).toMatch(/8 caracteres/)
    expect(problemaSenha('senhalonga')).toMatch(/número/)
    expect(problemaSenha('12345678')).toMatch(/letra/)
    expect(problemaSenha('123456')).not.toBe('')
  })
})

describe('requisitosSenha', () => {
  const oks = (s: string) => requisitosSenha(s).map((r) => r.ok)
  it('marca cada requisito ao vivo', () => {
    expect(oks('')).toEqual([false, false, false])
    expect(oks('123456')).toEqual([false, false, true])
    expect(oks('senhalonga')).toEqual([true, true, false])
    expect(oks('senha123')).toEqual([true, true, true])
  })
  it('todos ok exatamente quando problemaSenha não reclama', () => {
    for (const s of ['', 'a1', '12345678', 'abcdefgh', 'abcdefg1', 'Ábaco 2026', '1234567a'])
      expect(requisitosSenha(s).every((r) => r.ok)).toBe(problemaSenha(s) === '')
  })
})

describe('estadoSenha', () => {
  beforeEach(() => {
    const m = new Map<string, string>()
    globalThis.localStorage = {
      getItem: (k: string) => m.get(k) ?? null,
      setItem: (k: string, v: string) => void m.set(k, v),
      removeItem: (k: string) => void m.delete(k),
    } as Storage
  })
  it('lembra por conta e não vale para outra', () => {
    expect(estadoSenha('a')).toBeNull()
    lembrarSenha('a', 'fraca')
    expect(estadoSenha('a')).toBe('fraca')
    expect(estadoSenha('b')).toBeNull()
    lembrarSenha('a', 'ok')
    expect(estadoSenha('a')).toBe('ok')
  })
  it('valor estragado vira desconhecido', () => {
    localStorage.setItem('forca-senha', '{x')
    expect(estadoSenha('a')).toBeNull()
    localStorage.setItem('forca-senha', JSON.stringify({ uid: 'a', estado: 'talvez' }))
    expect(estadoSenha('a')).toBeNull()
  })
})

describe('senhaJaConferida', () => {
  it('só quem aceitou a versão 2026-11-09 ou mais nova', async () => {
    const { senhaJaConferida } = await import('./privacidade')
    expect(senhaJaConferida({})).toBe(false)
    expect(senhaJaConferida({ privacidadeVersao: '2026-10-13' })).toBe(false)
    expect(senhaJaConferida({ privacidadeVersao: '2026-11-08' })).toBe(false)
    expect(senhaJaConferida({ privacidadeVersao: '2026-11-09' })).toBe(true)
    expect(senhaJaConferida({ privacidadeVersao: '2026-11-09b' })).toBe(true)
    expect(senhaJaConferida({ privacidadeVersao: '2026-11-10b' })).toBe(true)
    expect(senhaJaConferida({ privacidadeVersao: '2027-01-02' })).toBe(true)
  })
})
