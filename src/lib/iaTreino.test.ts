import { describe, expect, it } from 'vitest'
import { acharPosicao, corpoPedido, descreverAcao, lerResposta, listaAtual, MAX_POR_TREINO, MODELO_IA, PROMPT_SISTEMA } from './iaTreino'

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

describe('lerResposta: progressão, volume e métodos', () => {
  it('progressao: com ou sem treino; reps e semanas limpas; exercício sem treino vira aviso', () => {
    const r = lerResposta(
      resposta([
        { acao: 'progressao', reps: [12, 12, 10], semanas: [2, 1, 1, 99] },
        { acao: 'progressao', treino: 1, exercicio: 'Supino', reps: [8, 0, 8.5, 8] },
        { acao: 'progressao', exercicio: 'Supino', reps: [10] },
        { acao: 'progressao', treino: 1, reps: [] },
        { acao: 'progressao', treino: 9, reps: [10] },
      ]),
      DIV,
    )
    expect(r.acoes).toEqual([
      { tipo: 'progressao', semanas: [1, 2], reps: [12, 12, 10] },
      { tipo: 'progressao', treino: 1, exercicio: 'Supino', semanas: [], reps: [8, 8] },
    ])
    expect(r.avisos).toHaveLength(2)
  })

  it('volume: progredir tem padrão; reduzir e polimento pedem % e semana', () => {
    const r = lerResposta(
      resposta([
        { acao: 'volume', modo: 'progredir' },
        { acao: 'volume', modo: 'reduzir', pct: 30, de_semana: 4, treino: 2 },
        { acao: 'volume', modo: 'polimento', pct: 20, de_semana: 5, ate_semana: 3 },
        { acao: 'volume', modo: 'reduzir', de_semana: 4 },
        { acao: 'volume', modo: 'polimento', pct: 20 },
        { acao: 'volume', modo: 'progredir', pct: 80 },
        { acao: 'volume', modo: 'outro', pct: 10 },
      ]),
      DIV,
    )
    expect(r.acoes).toEqual([
      { tipo: 'volume', modo: 'progredir', de: 2 },
      { tipo: 'volume', modo: 'reduzir', pct: 30, de: 4, ate: 4, treino: 2 },
      { tipo: 'volume', modo: 'polimento', pct: 20, de: 5, ate: 5 },
    ])
    expect(r.avisos).toHaveLength(3)
  })

  it('metodo: precisa de treino, exercício e método válido (ou remover)', () => {
    const r = lerResposta(
      resposta([
        { acao: 'metodo', treino: 1, exercicio: 'Supino', metodo: 'Dropset', series: [3, 2, 9] },
        { acao: 'metodo', treino: 1, exercicio: 1, metodo: 'Biset', parceiros: ['Crucifixo', ''] },
        { acao: 'metodo', treino: 1, exercicio: 'Supino', remover: true },
        { acao: 'metodo', treino: 1, exercicio: 'Supino', metodo: 'Inventado' },
        { acao: 'metodo', exercicio: 'Supino', metodo: 'Dropset' },
        { acao: 'metodo', treino: 1, exercicio: 'Supino', metodo: 'Rest-pause', series: [3, 2] },
        { acao: 'metodo', treino: 1, exercicio: 'Supino', metodo: 'Biset', parceiros: ['Crucifixo'], series: [2] },
      ]),
      DIV,
    )
    expect(r.acoes).toEqual([
      { tipo: 'metodo', treino: 1, exercicio: 'Supino', metodo: 'Dropset', semanas: [], parceiros: [], series: [2, 3], remover: false },
      { tipo: 'metodo', treino: 1, exercicio: '1', metodo: 'Biset', semanas: [], parceiros: ['Crucifixo'], series: [], remover: false },
      { tipo: 'metodo', treino: 1, exercicio: 'Supino', semanas: [], parceiros: [], series: [], remover: true },
      { tipo: 'metodo', treino: 1, exercicio: 'Supino', metodo: 'Rest-pause', semanas: [], parceiros: [], series: [2], remover: false },
      { tipo: 'metodo', treino: 1, exercicio: 'Supino', metodo: 'Biset', semanas: [], parceiros: ['Crucifixo'], series: [], remover: false },
    ])
  })
})

describe('descreverAcao', () => {
  it('texto da prévia', () => {
    expect(descreverAcao({ tipo: 'progressao', semanas: [], reps: [12, 12, 10] }, 4)).toBe('progressão padrão · todas as semanas · 3 séries: 12, 12, 10')
    expect(descreverAcao({ tipo: 'volume', modo: 'reduzir', pct: 30, de: 4, ate: 4, treino: 2 }, 6)).toBe('todos do Treino 2 · reduzir 30% · semana 4 · volta em 2 semanas')
    expect(descreverAcao({ tipo: 'metodo', treino: 1, exercicio: 'Supino', metodo: 'Dropset', semanas: [1, 2], parceiros: [], series: [3], remover: false }, 4)).toBe(
      'Dropset · Supino · S3 · semanas 1–2',
    )
    expect(descreverAcao({ tipo: 'metodo', treino: 1, exercicio: 'Supino', semanas: [], parceiros: [], series: [], remover: true }, 4)).toBe(
      'Tirar todos os métodos · Supino · todas as semanas',
    )
  })

  it('corpoPedido avisa quantas semanas o meso tem', () => {
    expect(corpoPedido('x', DIV, 6).messages[0].content).toContain('O meso tem 6 semanas.')
  })
})

it('isometria aceita 60 segundos; exercícios comuns conservam teto de 50 repetições', () => {
  const nome='Prancha Frontal Isométrica (cotovelos)'
  const r=lerResposta(resposta([{acao:'progressao',treino:1,exercicio:nome,reps:[60,60,60]},{acao:'progressao',treino:1,exercicio:'Supino',reps:[60]}]),[[nome,'Supino']])
  expect(r.acoes).toEqual([{tipo:'progressao',treino:1,exercicio:nome,semanas:[],reps:[60,60,60]}])
})
