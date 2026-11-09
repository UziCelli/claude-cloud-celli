import { describe, expect, it } from 'vitest'
import { textosDepoimento } from './cartaoDepoimento'

describe('cartão do depoimento', () => {
  it('usa só o primeiro nome, a frase entre aspas e a assinatura da marca', () => {
    const t = textosDepoimento({ texto: '  Nunca mais perdi uma carga.  ', nome: 'Ana Souza Lima' })
    expect(t.frase).toBe('“Nunca mais perdi uma carga.”')
    expect(t.autor).toBe('— Ana')
    expect(t.assinatura).toMatch(/^aluno\(a\) que treina com (o|a) /)
  })
})
