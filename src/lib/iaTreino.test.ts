import { describe, expect, it } from 'vitest'
import { acharPosicao, corpoPedido, lerResposta, listaAtual, MAX_POR_TREINO, MODELO_IA, PROMPT_SISTEMA } from './iaTreino'

const resposta = (acoes: unknown, avisos?: unknown) => ({ content: [{ type: 'text', text: 'ok' }, { type: 'tool_use', name: 'montar_treinos', input: { acoes, avisos } }] })
const DIV = [['Supino Reto Barra', 'Crucifixo Halter'], [], ['Leg Press 45', 'Hack']]

describe('lerResposta', () => {
  it('adicionar: normaliza nome do catálogo (acento e maiúscula) e marca o que está fora', () => {
    const r = lerResposta(resposta([{ acao: 'adicionar', treino: 1, exercicios: ['agachamento livre barra', ' Rosca Inventada '] }]), DIV)
    expect(r.acoes).toEqual([
      { tipo: 'adicionar', treino: 1, exercicios: [{ nome: 'Agachamento Livre Barra', noCatalogo: true }, { nome: 'Rosca Inventada', noCatalogo: false }] },
    ])
  })

  it('substituir: acha o exercício por nome parecido ou posição e devolve o nome real da lista', () => {
    const r = lerResposta(
      resposta([
        { acao: 'substituir', treino: 3, de: 'leg press', por: 'Hack' },
        { acao: 'substituir', treino: 1, de: '2', por: 'Supino Inclinado Halter' },
      ]),
      DIV,
    )
    expect(r.acoes).toMatchObject([
      { tipo: 'substituir', treino: 3, pos: 1, de: 'Leg Press 45', por: { nome: 'Hack' } },
      { tipo: 'substituir', treino: 1, pos: 2, de: 'Crucifixo Halter' },
    ])
  })

  it('substituir exercício que não existe (ou ambíguo) vira aviso, não ação', () => {
    const r = lerResposta(resposta([{ acao: 'substituir', treino: 1, de: 'Remada', por: 'X' }, { acao: 'substituir', treino: 1, de: 'supino', por: 'Y' }, { acao: 'substituir', treino: 1, de: '9', por: 'Z' }]), [['Supino Reto', 'Supino Inclinado']])
    expect(r.acoes).toEqual([])
    expect(r.avisos).toHaveLength(3)
  })

  it('descarta treino fora da lista, não inteiro, ação desconhecida, lista vazia e exercício repetido', () => {
    const r = lerResposta(
      resposta([
        { acao: 'adicionar', treino: 0, exercicios: ['a'] },
        { acao: 'adicionar', treino: 4, exercicios: ['b'] },
        { acao: 'adicionar', treino: 1.5, exercicios: ['c'] },
        { acao: 'remover', treino: 1, exercicios: ['d'] },
        { acao: 'definir', treino: 2, exercicios: ['  ', 'Supino', 'supino', 7] },
        { acao: 'adicionar', treino: 3, exercicios: [] },
      ]),
      DIV,
    )
    expect(r.acoes).toEqual([{ tipo: 'definir', treino: 2, exercicios: [{ nome: 'Supino', noCatalogo: false }] }])
  })

  it('limita a 10 por ação e guarda os avisos da IA (no máximo 5, só texto)', () => {
    const muitos = Array.from({ length: 15 }, (_, i) => `Exercício ${i}`)
    const r = lerResposta(resposta([{ acao: 'adicionar', treino: 1, exercicios: muitos }], ['a', 2, ' ', 'b', 'c', 'd', 'e', 'f']), DIV)
    expect(r.acoes[0]).toMatchObject({ tipo: 'adicionar' })
    expect((r.acoes[0] as { exercicios: unknown[] }).exercicios).toHaveLength(MAX_POR_TREINO)
    expect(r.avisos).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  it('resposta torta ou sem a ferramenta vira vazio, nunca erro', () => {
    for (const lixo of [null, undefined, 'texto', {}, { content: 'x' }, { content: [{ type: 'text' }] }, resposta('nada'), resposta([null, 5])]) {
      expect(lerResposta(lixo, DIV)).toEqual({ acoes: [], avisos: [] })
    }
  })
})

describe('acharPosicao', () => {
  it('número, nome exato, parte do nome única; ambíguo ou ausente = 0', () => {
    const l = ['Supino Reto', 'Supino Inclinado', 'Remada']
    expect(acharPosicao(l, '3')).toBe(3)
    expect(acharPosicao(l, 'remada')).toBe(3)
    expect(acharPosicao(l, 'supino inclinado')).toBe(2)
    expect(acharPosicao(l, 'supino')).toBe(0)
    expect(acharPosicao(l, '4')).toBe(0)
    expect(acharPosicao(l, '')).toBe(0)
  })
})

describe('corpoPedido', () => {
  it('usa o Haiku, força a ferramenta, catálogo no texto fixo (cacheável) e lista atual na mensagem', () => {
    const c = corpoPedido('adiciona supino no treino um', DIV)
    expect(c.model).toBe(MODELO_IA)
    expect(c.tool_choice).toEqual({ type: 'tool', name: 'montar_treinos' })
    expect(c.system[0].text).toBe(PROMPT_SISTEMA)
    expect(PROMPT_SISTEMA).toContain('Agachamento Livre Barra')
    expect(c.messages[0].content).toContain('Treino 1: 1. Supino Reto Barra; 2. Crucifixo Halter')
    expect(c.messages[0].content).toContain('Treino 2: (vazio)')
    expect(c.messages[0].content).toContain('adiciona supino no treino um')
    expect(listaAtual([[]])).toBe('Treino 1: (vazio)')
  })

  it('corta fala enorme', () => {
    expect(corpoPedido('a'.repeat(5000), DIV).messages[0].content.length).toBeLessThan(2300)
  })
})
