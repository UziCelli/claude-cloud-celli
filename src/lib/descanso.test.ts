import { describe, expect, it } from 'vitest'
import { gravarEstado, lerEstado, marcosBipes, mmss, vibracaoDoMarco } from './descanso'

const mem = () => {
  const d: Record<string, string> = {}
  return {
    getItem: (k: string) => d[k] ?? null,
    setItem: (k: string, v: string) => void (d[k] = v),
    removeItem: (k: string) => void delete d[k],
  }
}

describe('descanso', () => {
  it('mmss', () => expect(mmss(75)).toBe('1:15'))
  it('bipes de 60 s: 6 marcos nos offsets certos', () => {
    const b = marcosBipes(60)
    expect(b.map((x) => x.em)).toEqual([55, 56, 57, 58, 59, 60])
    expect(b[0].tons[0].freq).toBe(880)
    expect(b[2].tons[0].freq).toBe(1320)
    expect(b[5].tons.map((t) => t.freq)).toEqual([990, 1480])
  })
  it('bipes de 2 s: só 2,1,0', () => expect(marcosBipes(2).map((x) => x.em)).toEqual([0, 1, 2]))
  it('vibração por marco', () => {
    expect(vibracaoDoMarco(3)).toBe(120)
    expect(vibracaoDoMarco(0)).toEqual([400, 150, 400])
    expect(vibracaoDoMarco(4)).toBeNull()
  })
  it('estado salvo: restaura, expira e limpa', () => {
    const a = mem()
    gravarEstado({ slot: 's1', fimEm: 10_000, total: 60, pausadoRestante: null, uid: 'u1' }, a)
    expect(lerEstado(5_000, 'u1', a)?.slot).toBe('s1')
    expect(lerEstado(11_000, 'u1', a)).toBeNull()
    gravarEstado({ slot: 's1', fimEm: null, total: 60, pausadoRestante: 20, uid: 'u1' }, a)
    expect(lerEstado(99_000, 'u1', a)?.pausadoRestante).toBe(20)
    gravarEstado(null, a)
    expect(lerEstado(0, 'u1', a)).toBeNull()
  })
  it('estado de outro uid (ou sem uid, ou sem usuário logado) é ignorado e limpo', () => {
    for (const [salvo, logado] of [
      ['u1', 'u2'],
      [undefined, 'u2'],
      ['u1', null],
    ] as const) {
      const a = mem()
      gravarEstado({ slot: 's1', fimEm: 10_000, total: 60, pausadoRestante: null, uid: salvo }, a)
      expect(lerEstado(5_000, logado, a)).toBeNull()
      expect(a.getItem('forca-descanso')).toBeNull()
    }
  })
  it('estado do mesmo uid fica guardado', () => {
    const a = mem()
    gravarEstado({ slot: 's1', fimEm: 10_000, total: 60, pausadoRestante: null, uid: 'u1' }, a)
    expect(lerEstado(5_000, 'u1', a)?.uid).toBe('u1')
    expect(a.getItem('forca-descanso')).not.toBeNull()
  })
})
