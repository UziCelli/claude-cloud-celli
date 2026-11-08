import { describe, expect, it } from 'vitest'
import { confirmarNumero } from './ui'

describe('confirmarNumero', () => {
  it('aceita o número digitado depois de apagar tudo', () => expect(confirmarNumero('10', 1, 12, false, 4)).toBe(10))
  it('limita ao máximo ao sair', () => expect(confirmarNumero('42', 1, 12, false, 4)).toBe(12))
  it('limita ao mínimo e aceita 0', () => {
    expect(confirmarNumero('0', 0, undefined, false, 5)).toBe(0)
    expect(confirmarNumero('0', 1, 12, false, 4)).toBe(1)
  })
  it('vazio volta ao valor anterior', () => expect(confirmarNumero('', 1, 12, false, 4)).toBe(4))
  it('vazio com vazio=undefined limpa', () => expect(confirmarNumero(' ', 1, undefined, true, 45)).toBeUndefined())
  it('texto inválido volta ao anterior', () => expect(confirmarNumero('abc', 1, 12, false, 4)).toBe(4))
})
