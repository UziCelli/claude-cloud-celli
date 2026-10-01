import { describe, expect, it } from 'vitest'

// log.ts importa o Firebase; os testes só usam as funções puras.
import { vi } from 'vitest'
vi.mock('./firebase', () => ({ auth: {}, db: {} }))
vi.mock('firebase/firestore', () => ({}))
vi.mock('firebase/auth', () => ({}))
const { contarDia, cortar, empilhar, montarItem } = await import('./log')

describe('log', () => {
  it('limita 20 por dia e zera no dia seguinte', () => {
    expect(contarDia(null, '2026-10-01')).toEqual({ dia: '2026-10-01', n: 1 })
    expect(contarDia({ dia: '2026-10-01', n: 19 }, '2026-10-01')).toEqual({ dia: '2026-10-01', n: 20 })
    expect(contarDia({ dia: '2026-10-01', n: 20 }, '2026-10-01')).toBeNull()
    expect(contarDia({ dia: '2026-10-01', n: 20 }, '2026-10-02')).toEqual({ dia: '2026-10-02', n: 1 })
  })
  it('fila guarda só os 20 mais recentes', () => {
    let f: number[] = []
    for (let i = 0; i < 25; i++) f = empilhar(f, i)
    expect(f).toHaveLength(20)
    expect(f[0]).toBe(5)
    expect(f[19]).toBe(24)
  })
  it('corta os tamanhos', () => {
    expect(cortar('x'.repeat(600), 500)).toHaveLength(500)
    const i = montarItem('erro', 'm'.repeat(600), { tela: 't'.repeat(200), versao: 'v'.repeat(80), aparelho: 'a'.repeat(300), online: true })
    expect([i.mensagem.length, i.tela.length, i.versao.length, i.aparelho.length]).toEqual([500, 100, 40, 200])
  })
})
