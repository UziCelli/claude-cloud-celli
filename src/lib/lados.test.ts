import { describe, expect, it } from 'vitest'
import { doisLados, doisLadosPadrao, ladosDiferentes, lerCelula, totalLados } from './lados'

describe('doisLados', () => {
  it('usa o catálogo pelo nome (sem acento/caixa)', () => {
    expect(doisLados({ nome: 'Rosca Direta Halter' })).toBe(true)
    expect(doisLados({ nome: ' rosca direta halter ' })).toBe(true)
    expect(doisLadosPadrao('Cadeira Extensora Articulada (Peso Acima)')).toBe(true)
  })
  it('exercício sem marca ou fora do catálogo é comum', () => {
    expect(doisLados({ nome: 'Rosca Concentrada Halter' })).toBe(false)
    expect(doisLados({ nome: 'Rosca Scott Halter' })).toBe(false)
    expect(doisLados({ nome: 'Exercício que não existe' })).toBe(false)
  })
  it('o ajuste do slot vence o catálogo, nos dois sentidos', () => {
    expect(doisLados({ nome: 'Rosca Scott Halter', doisLados: true })).toBe(true)
    expect(doisLados({ nome: 'Rosca Direta Halter', doisLados: false })).toBe(false)
  })
})

describe('lerCelula / totalLados', () => {
  it('formato novo: direito = total - corpo - esquerdo', () => {
    expect(lerCelula(12, 6)).toEqual({ esq: 6, dir: 6, antigo: null })
    expect(lerCelula(14, 6)).toEqual({ esq: 6, dir: 8, antigo: null })
    expect(lerCelula(92, 6, 80)).toEqual({ esq: 6, dir: 6, antigo: null })
  })
  it('total = esq + dir + corpo (ida e volta)', () => {
    expect(totalLados(6, 8, 80)).toBe(94)
    expect(lerCelula(totalLados(6.5, 8.25, 10), 6.5, 10)).toEqual({ esq: 6.5, dir: 8.25, antigo: null })
  })
  it('célula antiga (sem lados) mostra o número inteiro, sem dividir', () => {
    expect(lerCelula(12, null)).toEqual({ esq: null, dir: null, antigo: 12 })
    expect(lerCelula(92, undefined, 80)).toEqual({ esq: null, dir: null, antigo: 12 })
  })
  it('esquerdo maior que total - corpo (versão velha editou só o total): vira antiga', () => {
    expect(lerCelula(8, 6, 4)).toEqual({ esq: null, dir: null, antigo: 4 })
    expect(lerCelula(10, 6)).toEqual({ esq: 6, dir: 4, antigo: null })
  })
  it('série vazia concluída com corpo (0 | 0 + corpo) é formato novo', () => {
    expect(lerCelula(totalLados(0, 0, 76), 0, 76)).toEqual({ esq: 0, dir: 0, antigo: null })
  })
  it('célula vazia', () => {
    expect(lerCelula(null, null)).toEqual({ esq: null, dir: null, antigo: null })
  })
  it('ladosDiferentes só olha formato novo', () => {
    expect(ladosDiferentes([lerCelula(12, 6), lerCelula(14, 6)])).toBe(true)
    expect(ladosDiferentes([lerCelula(12, 6), lerCelula(10, null)])).toBe(false)
  })
})

describe('doisLados.json', () => {
  it('todo id existe no catálogo (id errado = marca perdida em silêncio)', async () => {
    const catalogo = (await import('../data/exercicios.json')).default
    const ids = new Set(catalogo.flatMap((g) => g.exercicios.map((e) => e.id)))
    const marcados = (await import('../data/doisLados.json')).default as string[]
    expect(marcados.length).toBe(46)
    expect(marcados.filter((id) => !ids.has(id))).toEqual([])
  })
})
