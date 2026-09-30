import { describe, expect, it } from 'vitest'
import { buscarExercicios } from './busca'

const nomes = (t: string, l?: number) => buscarExercicios(t, l).map((r) => r.nome)

describe('buscarExercicios', () => {
  it('vazio ou só espaços: lista vazia', () => {
    expect(buscarExercicios('')).toEqual([])
    expect(buscarExercicios('   ')).toEqual([])
  })
  it('devolve nome e grupo', () => {
    const [r] = buscarExercicios('agachamento livre barra')
    expect(r).toEqual({ nome: 'Agachamento Livre Barra', grupo: 'Quadríceps e Glúteos' })
  })
  it('ignora acentos e maiúsculas', () => {
    expect(nomes('BULGARO')).toEqual(nomes('búlgaro'))
    expect(nomes('bulgaro').length).toBeGreaterThan(0)
    expect(nomes('bulgaro').every((n) => /búlgaro/i.test(n))).toBe(true)
  })
  it('todos os termos precisam casar, em qualquer ordem', () => {
    expect(nomes('halt bulg')).toEqual(['Búlgaro com Halter'])
    expect(nomes('bulg halt')).toEqual(['Búlgaro com Halter'])
    const r = nomes('agach livre')
    expect(r).toEqual(['Agachamento Livre Barra', 'Agachamento Livre Halter', 'Agachamento Livre Banco'])
  })
  it('termo sem correspondência: vazio', () => {
    expect(buscarExercicios('zzzxyz')).toEqual([])
    expect(buscarExercicios('agach zzzxyz')).toEqual([])
  })
  it('respeita o limite (padrão 8)', () => {
    expect(buscarExercicios('a').length).toBe(8)
    expect(buscarExercicios('a', 3).length).toBe(3)
  })
  it('ordem: nome começa com o texto, depois palavra começa, depois contém', () => {
    const r = nomes('barra', 200)
    const rank = (n: string) => {
      const x = n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      return x.startsWith('barra') ? 0 : x.split(/\s+/).some((p) => p.startsWith('barra')) ? 1 : 2
    }
    const ranks = r.map(rank)
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b))
    expect(ranks).toContain(1)
    const r2 = nomes('agachamento')
    expect(r2.every((n) => n.toLowerCase().startsWith('agachamento'))).toBe(true)
  })
  it('contém no meio da palavra entra por último', () => {
    expect(nomes('chamento').slice(0, 2)).toEqual(['Agachamento Livre Barra', 'Agachamento Livre Halter'])
  })
})
