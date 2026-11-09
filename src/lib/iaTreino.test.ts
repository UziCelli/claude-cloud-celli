import { describe, expect, it } from 'vitest'
import { corpoPedido, lerResposta, MAX_POR_TREINO, MODELO_IA, PROMPT_SISTEMA } from './iaTreino'

const resposta = (treinos: unknown) => ({ content: [{ type: 'text', text: 'ok' }, { type: 'tool_use', name: 'montar_treinos', input: { treinos } }] })

describe('lerResposta', () => {
  it('normaliza nome do catálogo (acento e maiúscula) e marca o que está fora', () => {
    const r = lerResposta(resposta([{ treino: 1, exercicios: ['agachamento livre barra', ' Rosca Inventada '] }]), 3)
    expect(r).toEqual([
      { treino: 1, exercicios: [{ nome: 'Agachamento Livre Barra', noCatalogo: true }, { nome: 'Rosca Inventada', noCatalogo: false }] },
    ])
  })

  it('descarta treino fora da frequência, não inteiro, vazio e exercício repetido', () => {
    const r = lerResposta(
      resposta([
        { treino: 0, exercicios: ['a'] },
        { treino: 4, exercicios: ['b'] },
        { treino: 1.5, exercicios: ['c'] },
        { treino: 2, exercicios: ['  ', 'Supino', 'supino', 7] },
        { treino: 3, exercicios: [] },
      ]),
      3,
    )
    expect(r).toEqual([{ treino: 2, exercicios: [{ nome: 'Supino', noCatalogo: false }] }])
  })

  it('junta o mesmo treino repetido, ordena e limita a 10 por treino', () => {
    const muitos = Array.from({ length: 15 }, (_, i) => `Exercício ${i}`)
    const r = lerResposta(resposta([{ treino: 2, exercicios: ['x'] }, { treino: 1, exercicios: muitos }, { treino: 2, exercicios: ['y'] }]), 3)
    expect(r.map((t) => t.treino)).toEqual([1, 2])
    expect(r[0].exercicios).toHaveLength(MAX_POR_TREINO)
    expect(r[1].exercicios.map((e) => e.nome)).toEqual(['x', 'y'])
  })

  it('resposta torta ou sem a ferramenta vira lista vazia, nunca erro', () => {
    for (const lixo of [null, undefined, 'texto', {}, { content: 'x' }, { content: [{ type: 'text' }] }, resposta('nada'), resposta([null, 5])]) {
      expect(lerResposta(lixo, 3)).toEqual([])
    }
  })
})

describe('corpoPedido', () => {
  it('usa o Haiku, força a ferramenta e deixa o catálogo no texto fixo (cacheável)', () => {
    const c = corpoPedido('treino um supino', 3)
    expect(c.model).toBe(MODELO_IA)
    expect(c.tool_choice).toEqual({ type: 'tool', name: 'montar_treinos' })
    expect(c.system[0].text).toBe(PROMPT_SISTEMA)
    expect(PROMPT_SISTEMA).toContain('Agachamento Livre Barra')
    expect(c.messages[0].content).toContain('1 a 3')
    expect(c.messages[0].content).toContain('treino um supino')
  })

  it('corta fala enorme', () => {
    expect(corpoPedido('a'.repeat(5000), 3).messages[0].content.length).toBeLessThan(2100)
  })
})
