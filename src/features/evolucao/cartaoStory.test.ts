import { describe, expect, it } from 'vitest'
import { textosCartao } from './cartaoStory'

describe('textosCartao', () => {
  it('formata em pt-BR com vírgula e plural', () => {
    const t = textosCartao({ nome: 'Ana', treinos: 1, semanasSeguidas: 12, toneladas: '48 t', comparacao: '≈ 8 elefantes', destaque: { nome: 'Supino', de: 40, ate: 52.5, pct: 31.25 } })
    expect(t.numeros.map((n) => n.rotulo)).toEqual(['treino feito', 'semanas seguidas', '≈ 8 elefantes'])
    expect(t.destaque).toEqual({ nome: 'Supino', linha: '40 → 52,5 kg', pct: '+31%' })
  })
  it('sem destaque nem comparação', () => {
    const t = textosCartao({ nome: 'Bia', treinos: 2, semanasSeguidas: 0, toneladas: '1,2 t' })
    expect(t.destaque).toBeUndefined()
    expect(t.numeros[2].rotulo).toBe('levantadas no total')
  })
})
