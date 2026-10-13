import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { diaSP } from './acesso'
import { diaNumero, idCardio, rotuloCardio, TIPOS } from './cardio'

describe('cardio', () => {
  it('id = uid_dia', () => expect(idCardio('u1', '2026-10-13')).toBe('u1_2026-10-13'))
  it('rótulo', () => expect(rotuloCardio('eliptico')).toBe('Elíptico'))
  it('diaNumero casa com diaSP', () => expect(diaNumero('2026-10-13')).toBe(diaSP(Date.parse('2026-10-13T12:00:00-03:00'))))
  it('tipos iguais aos da regra do Firestore', () => {
    const regras = readFileSync('firestore.rules', 'utf8')
    const m = /tipo in \[([^\]]*)\]/.exec(regras.slice(Math.max(0, regras.indexOf('match /cardios'))))
    expect(m).not.toBeNull()
    const ids = [...m![1].matchAll(/'([^']+)'/g)].map((x) => x[1])
    expect(ids).toEqual(TIPOS.map((t) => t.id))
  })
})
