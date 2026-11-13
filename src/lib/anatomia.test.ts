import { describe, expect, it } from 'vitest'
import anatomia from '../data/anatomia.json'
import catalogo from '../data/exercicios.json'
import { TODAS } from './anamnese'
import { anatomiaDo, ARTICULACOES, articulacoesDo, MUSCULOS } from './anatomia'

const ids = catalogo.flatMap((g) => g.exercicios.map((e) => e.id))

describe('anatomia do catálogo', () => {
  it('cobre exatamente os exercícios do catálogo (nem falta, nem sobra)', () => {
    expect(Object.keys(anatomia).sort()).toEqual([...ids].sort())
  })

  it('todo exercício tem articulação e músculo principal, só com ids válidos e sem repetir', () => {
    for (const [id, a] of Object.entries(anatomia)) {
      expect(a.articulacoes.length, id).toBeGreaterThan(0)
      expect(a.principais.length, id).toBeGreaterThan(0)
      for (const x of a.articulacoes) expect(ARTICULACOES, `${id}: ${x}`).toContain(x)
      for (const m of [...a.principais, ...a.secundarios]) expect(Object.keys(MUSCULOS), `${id}: ${m}`).toContain(m)
      expect(new Set(a.articulacoes).size, id).toBe(a.articulacoes.length)
      expect(new Set([...a.principais, ...a.secundarios]).size, id).toBe(a.principais.length + a.secundarios.length)
    }
  })

  it('articulações = opções de dor da anamnese (menos "Outra")', () => {
    const dores = TODAS.find((p) => p.id === 'dores')
    const opcoes = dores && 'opcoes' in dores ? dores.opcoes.map((o) => o.id).filter((o) => o !== 'outra') : []
    expect(opcoes).toEqual([...ARTICULACOES])
  })
})

describe('anatomiaDo / articulacoesDo', () => {
  it('acha pelo nome, sem ligar para acento, caixa ou espaço', () => {
    expect(anatomiaDo('Cadeira Extensora Tradicional')?.articulacoes).toEqual(['joelho'])
    expect(anatomiaDo('  cadeira extensora tradicional ')?.principais).toEqual(['quadriceps'])
    expect(articulacoesDo('Agachamento Livre Barra')[0]).toBe('joelho')
    expect(anatomiaDo('Supino Reto Barra')?.principais).toEqual(['peitoral'])
  })
  it('nome fora do catálogo: null e todas as articulações como opção', () => {
    expect(anatomiaDo('Exercício inventado')).toBeNull()
    expect(articulacoesDo('Exercício inventado')).toEqual(ARTICULACOES)
  })
})
