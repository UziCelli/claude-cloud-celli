import { describe, expect, it } from 'vitest'
import { emLinkCadastro, linkCadastro } from './cadastro'

describe('link de cadastro', () => {
  it('usa o domínio da marca e termina em /cadastro', () => {
    expect(linkCadastro).toMatch(/^https:\/\/[^/]+\/cadastro$/)
  })
  it('reconhece só o caminho /cadastro', () => {
    expect(emLinkCadastro('/cadastro')).toBe(true)
    expect(emLinkCadastro('/')).toBe(false)
    expect(emLinkCadastro('/instalar')).toBe(false)
  })
})
