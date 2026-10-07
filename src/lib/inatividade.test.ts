import { describe, expect, it, vi } from 'vitest'

vi.mock('./firebase', () => ({ db: {} }))
vi.mock('firebase/firestore', () => ({ waitForPendingWrites: () => Promise.resolve() }))
vi.mock('./acoes', () => ({ sair: () => {} }))
const { expirou, LIMITE_MIN, treinoEmAndamento, marcarTreino, limparTreino } = await import('./inatividade')

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
  describe('treino em andamento', () => {
    const memo = () => {
      const m = new Map<string, string>()
      return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) }
    }
    const H = 60 * 60_000
    it('marca válida segura o login; vencida não; sem marca não', () => {
      const a = memo()
      expect(treinoEmAndamento(1000, a)).toBe(false)
      marcarTreino(1000, a)
      expect(treinoEmAndamento(1000 + 3 * H - 1, a)).toBe(true)
      expect(treinoEmAndamento(1000 + 3 * H, a)).toBe(false)
    })
    it('limpar apaga a marca', () => {
      const a = memo()
      marcarTreino(1000, a)
      limparTreino(a)
      expect(treinoEmAndamento(2000, a)).toBe(false)
    })
    it('armazenamento quebrado ou marca ruim não quebra', () => {
      const quebrado = { getItem: () => { throw new Error('x') }, setItem: () => { throw new Error('x') }, removeItem: () => { throw new Error('x') } }
      expect(treinoEmAndamento(1, quebrado)).toBe(false)
      expect(() => marcarTreino(1, quebrado)).not.toThrow()
      expect(() => limparTreino(quebrado)).not.toThrow()
      const ruim = memo()
      ruim.setItem('forca-treino-andamento', '{lixo')
      expect(treinoEmAndamento(1, ruim)).toBe(false)
    })
  })
})
