import { describe, expect, it } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import { checkinValido, lerCheckin, PERGUNTAS_CHECKIN, somaRecuperacao } from './checkin'

describe('check-in', () => {
  const ok = { sono: 4, estresse: 3, cansaco: 2, alimentacao: 5 }
  it('4 perguntas, escala 1–5 inteira', () => {
    expect(PERGUNTAS_CHECKIN.map((p) => p.id)).toEqual(['sono', 'estresse', 'cansaco', 'alimentacao'])
    expect(checkinValido(ok)).toBe(true)
    for (const ruim of [{ sono: 0 }, { estresse: 6 }, { cansaco: 2.5 }, { alimentacao: undefined }]) expect(checkinValido({ ...ok, ...ruim })).toBe(false)
  })
  it('recuperação = sono + estresse + cansaço (alimentação fica fora)', () => {
    expect(somaRecuperacao(ok)).toBe(9)
    expect(somaRecuperacao({ ...ok, alimentacao: 1 })).toBe(9)
  })
  it('leitura desconfiada', () => {
    expect(lerCheckin('c', { ...ok, alunoId: 'ana', em: Timestamp.now() })?.sono).toBe(4)
    expect(lerCheckin('c', { ...ok, alunoId: 'ana', em: null })?.em).toBeNull()
    expect(lerCheckin('c', { ...ok, sono: 9, alunoId: 'ana' })).toBeNull()
    expect(lerCheckin('c', { ...ok })).toBeNull()
    expect(lerCheckin('c', null)).toBeNull()
  })
})
