import { describe, expect, it } from 'vitest'
import { limitar, textosCartao, textosFotoTreino } from './cartaoStory'

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

describe('limitar', () => {
  it('até 3 itens e "+N" se houver mais', () => {
    expect(limitar(['a', 'b'])).toEqual(['a', 'b'])
    expect(limitar(['a', 'b', 'c', 'd', 'e'])).toEqual(['a', 'b', 'c', '+2'])
  })
})

describe('textosFotoTreino', () => {
  const base = { nome: 'Ana', data: '14 de outubro', duracao: '45:10', volume: '12.500 kg', recordes: [], subiram: [], semana: { feitos: 2, total: 3 } }
  it('chips completos e sem selo', () => {
    const t = textosFotoTreino(base)
    expect(t.chips).toEqual([['DURAÇÃO', '45:10'], ['VOLUME', '12.500 kg'], ['SEMANA', '2 de 3']])
    expect(t.selo).toBeUndefined()
  })
  it('omite chip sem dado', () => {
    expect(textosFotoTreino({ ...base, duracao: null }).chips.map((c) => c[0])).toEqual(['VOLUME', 'SEMANA'])
    expect(textosFotoTreino({ ...base, volume: null }).chips.map((c) => c[0])).toEqual(['DURAÇÃO', 'SEMANA'])
  })
  it('selo de recorde no singular e no plural', () => {
    expect(textosFotoTreino({ ...base, recordes: ['a'] }).selo).toBe('1 NOVO RECORDE')
    expect(textosFotoTreino({ ...base, recordes: ['a', 'b'] }).selo).toBe('2 NOVOS RECORDES')
  })
})
