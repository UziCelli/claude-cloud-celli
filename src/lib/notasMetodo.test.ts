import { beforeEach, describe, expect, it } from 'vitest'
import { dispensarNota, mostrarNotasDeNovo, notaDispensada } from './notasMetodo'

function falsoStorage() {
  const d: Record<string, string> = {}
  return new Proxy(
    { getItem: (k: string) => d[k] ?? null, setItem: (k: string, v: string) => void (d[k] = v), removeItem: (k: string) => void delete d[k] } as Record<string, unknown>,
    { ownKeys: () => Reflect.ownKeys(d), getOwnPropertyDescriptor: (_, k) => (k in d ? { enumerable: true, configurable: true, value: d[k as string] } : undefined) },
  )
}

describe('notasMetodo', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'localStorage', { value: falsoStorage(), configurable: true })
  })
  it('dispensa por método', () => {
    expect(notaDispensada('Dropset')).toBe(false)
    dispensarNota('Dropset')
    expect(notaDispensada('Dropset')).toBe(true)
    expect(notaDispensada('Biset')).toBe(false)
  })
  it('chave antiga vale para sequências, não para dropset', () => {
    localStorage.setItem('forca-aviso-biset', '1')
    for (const m of ['Biset', 'Triset', 'Superset', 'Circuito'] as const) expect(notaDispensada(m)).toBe(true)
    expect(notaDispensada('Dropset')).toBe(false)
  })
  it('mostrar de novo apaga tudo', () => {
    localStorage.setItem('forca-aviso-biset', '1')
    dispensarNota('Dropset')
    mostrarNotasDeNovo()
    expect(notaDispensada('Dropset')).toBe(false)
    expect(notaDispensada('Biset')).toBe(false)
  })
  it('sem storage, a nota aparece', () => {
    Object.defineProperty(globalThis, 'localStorage', { get: () => { throw new Error('x') }, configurable: true })
    expect(notaDispensada('Dropset')).toBe(false)
    expect(() => { dispensarNota('Dropset'); mostrarNotasDeNovo() }).not.toThrow()
  })
})
