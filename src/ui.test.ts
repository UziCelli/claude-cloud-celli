import { describe, expect, it } from 'vitest'
import { classesBotao, confirmarNumero } from './ui'

describe('classesBotao', () => {
  it('md tem alvo de toque de 44px', () => expect(classesBotao('primario', 'md')).toContain('min-h-11'))
  it('lg é o botão grande do onboarding', () => expect(classesBotao('primario', 'lg')).toContain('h-14'))
  it('vidro e fantasma existem como o Voltar e o Pular', () => {
    expect(classesBotao('vidro', 'md')).toContain('vidro-escuro')
    expect(classesBotao('fantasma', 'md')).toContain('bg-transparent')
  })
  it('classe de fora entra por último', () => expect(classesBotao('primario', 'md', 'w-full').endsWith('w-full')).toBe(true))
})

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
