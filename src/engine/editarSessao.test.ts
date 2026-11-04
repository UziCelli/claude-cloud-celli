import { describe, expect, it } from 'vitest'
import {
  adicionarExercicio,
  adicionarMetodo,
  escoposPara,
  iniciarEdicao,
  mudarSeries,
  removerExercicio,
  removerMetodo,
  trocarExercicio,
} from './editarSessao'
import { metodosDaSessao, prescreverSessao } from './sessao'
import type { AplicacaoMetodo, Meso, Slot } from './tipos'

const slot = (slotId: string, nome = slotId, extra: Partial<Slot> = {}): Slot => ({ slotId, nome, ...extra })
const met = (m: Partial<AplicacaoMetodo>): AplicacaoMetodo => ({
  ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Série específica', serie: 3, ...m,
})

// principais (pos 1–2): 3 séries de 10; auxiliares (3+): 4 séries de 15. Semana 2 com reps diferentes.
const base: Meso = {
  frequencia: 1,
  semanas: 2,
  inicio: '2026-12-28',
  pausaS: 60,
  pausaPrincipaisS: 120,
  divisao: [[slot('A'), slot('B'), slot('C', 'C', { pausaS: 45 })]],
  trocas: { '1-1-2': slot('B2', 'B troca') },
  progressao: {
    principais: [[10, 10, 10, null], [8, 8, 8, null]],
    auxiliares: [[15, 15, 15, 15], [12, 12, 12, 12]],
  },
  metodos: [met({ exercicio: 1 }), met({ semana: 2, exercicio: 3 })],
  progressaoExercicio: { C: [[20, 20], [18, 18]] },
}

const editado = (s: ReturnType<typeof iniciarEdicao>, semana = 1): Meso => ({ ...base, sessoes: { [`${semana}-1`]: s } })
const nomes = (m: Meso, w = 1) => prescreverSessao(m, w, 1)!.exercicios.map((e) => e.slot.nome)

describe('iniciarEdicao', () => {
  it('copia o treino do dia (com trocas e métodos daquela sessão) e não muda o que o motor prescreve', () => {
    const s = iniciarEdicao(base, 1, 1)
    expect(s.exercicios.map((e) => e.nome)).toEqual(['A', 'B troca', 'C'])
    expect(s.metodos).toEqual([met({ exercicio: 1 })])
    expect(prescreverSessao(editado(s), 1, 1)).toEqual(prescreverSessao(base, 1, 1))
  })

  it('reaproveita a edição já salva', () => {
    const s = removerExercicio(iniciarEdicao(base, 1, 1), 2)
    expect(iniciarEdicao(editado(s), 1, 1)).toEqual(s)
  })
})

describe('sessão editada no motor', () => {
  it('só vale para aquela semana e treino', () => {
    const m = editado(removerExercicio(iniciarEdicao(base, 1, 1), 1))
    expect(nomes(m, 1)).toEqual(['B troca', 'C'])
    expect(nomes(m, 2)).toEqual(['A', 'B', 'C'])
  })

  it('exercício que ficou segue a progressão e a pausa da posição original, mesmo trocando de lugar', () => {
    const m = editado(removerExercicio(iniciarEdicao(base, 1, 1), 1))
    const [b, c] = prescreverSessao(m, 1, 1)!.exercicios
    expect(b.reps).toEqual([10, 10, 10]) // era principal (pos 2)
    expect(b.pausaS).toBe(120)
    expect(c.reps).toEqual([20, 20]) // progressão própria do slot C
    expect(c.pausaS).toBe(45)
  })

  it('a progressão continua viva: semana de volta / ajuste de volume no plano chegam na sessão editada', () => {
    const s = iniciarEdicao(base, 2, 1)
    const plano = { ...base, progressaoExercicio: { C: [[20, 20], [5, 5, 5]] } }
    const m = { ...plano, sessoes: { '2-1': removerExercicio(s, 1) } }
    expect(prescreverSessao(m, 2, 1)!.exercicios.at(-1)!.reps).toEqual([5, 5, 5])
  })

  it('exercício novo segue a progressão dos auxiliares e a pausa do meso', () => {
    const m = editado(adicionarExercicio(iniciarEdicao(base, 1, 1), 'Novo', 'n1'))
    const novo = prescreverSessao(m, 1, 1)!.exercicios[3]
    expect(novo).toMatchObject({ pos: 4, slot: { slotId: 'n1', nome: 'Novo' }, reps: [15, 15, 15, 15], pausaS: 60 })
  })

  it('exercício novo usa a progressão padrão quando o meso tem uma', () => {
    const comPadrao = { ...base, progressao: { ...base.progressao, padrao: [[9, 9], [7, 7]] } }
    const m = { ...comPadrao, sessoes: { '1-1': adicionarExercicio(iniciarEdicao(comPadrao, 1, 1), 'Novo', 'n1') } }
    expect(prescreverSessao(m, 1, 1)!.exercicios[3].reps).toEqual([9, 9])
  })

  it('métodos da sessão editada substituem os do plano só naquele dia', () => {
    const m = editado(removerMetodo(iniciarEdicao(base, 1, 1), 1, 'Dropset'))
    expect(metodosDaSessao(m, 1, 1)).toEqual([])
    expect(prescreverSessao(m, 1, 1)!.exercicios[0].rotulo).toBe('')
    expect(metodosDaSessao(m, 2, 1)).toEqual([met({ semana: 2, exercicio: 3 })])
  })
})

describe('trocarExercicio', () => {
  it('troca nome e id (cargas antigas ficam no id velho), mantém progressão, pausa e métodos da posição', () => {
    const s = trocarExercicio(iniciarEdicao(base, 1, 1), 3, 'Outro', 'o1')
    expect(s.exercicios[2]).toEqual({ slotId: 'o1', nome: 'Outro', de: 3, pausaS: 45 })
    const e = prescreverSessao(editado(s), 1, 1)!.exercicios[2]
    expect(e.reps).toEqual([20, 20])
  })

  it('mesmo nome: não muda nada', () => {
    const s = iniciarEdicao(base, 1, 1)
    expect(trocarExercicio(s, 1, ' A ', 'x')).toBe(s)
  })
})

describe('removerExercicio', () => {
  it('tira o exercício, apaga os métodos dele e renumera os de depois', () => {
    let s = iniciarEdicao(base, 1, 1)
    s = adicionarMetodo(s, 3, 'Rest-pause', 2)
    s = removerExercicio(s, 1)
    expect(s.exercicios.map((e) => e.nome)).toEqual(['B troca', 'C'])
    expect(s.metodos).toEqual([expect.objectContaining({ metodo: 'Rest-pause', exercicio: 2 })])
  })

  it('desfaz o grupo que ficaria com um exercício só', () => {
    let s = iniciarEdicao({ ...base, metodos: [] }, 1, 1)
    s = adicionarMetodo(s, 1, 'Biset', 3, [2])
    s = removerExercicio(s, 2)
    expect(s.metodos).toEqual([])
  })
})

describe('adicionarMetodo / removerMetodo', () => {
  const limpo = () => iniciarEdicao({ ...base, metodos: [] }, 1, 1)

  it('dropset e rest-pause vão na última série, com os padrões do editor', () => {
    const s = adicionarMetodo(adicionarMetodo(limpo(), 1, 'Dropset', 3), 2, 'Rest-pause', 3)
    expect(s.metodos).toEqual([
      { ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Série específica', serie: 3, pausaInternaS: 10, blocos: 1, etapas: 1, reducaoCarga: 20 },
      { ativo: true, semana: 1, treino: 1, exercicio: 2, metodo: 'Rest-pause', escopo: 'Série específica', serie: 3, pausaInternaS: 20, blocos: 2 },
    ])
    expect(prescreverSessao(editado(s), 1, 1)!.exercicios[0].reps).toHaveLength(4) // 3 séries + 1 etapa do drop
  })

  it('biset junta os exercícios escolhidos num grupo novo', () => {
    const s = adicionarMetodo(adicionarMetodo(limpo(), 1, 'Biset', 3, [2]), 3, 'Biset', 4, [1])
    const grupos = s.metodos.map((m) => [m.exercicio, m.grupo])
    expect(grupos).toEqual([[1, 1], [2, 1], [3, 2], [1, 2]])
  })

  it('não duplica o mesmo método no mesmo exercício', () => {
    const s = adicionarMetodo(limpo(), 1, 'Dropset', 3)
    expect(adicionarMetodo(s, 1, 'Dropset', 3)).toBe(s)
  })

  it('tirar um método de grupo tira dos parceiros também', () => {
    let s = adicionarMetodo(limpo(), 1, 'Triset', 3, [2, 3])
    s = adicionarMetodo(s, 2, 'Dropset', 3)
    s = removerMetodo(s, 3, 'Triset')
    expect(s.metodos.map((m) => m.metodo)).toEqual(['Dropset'])
  })
})

describe('escoposPara', () => {
  it('só as opções que cabem nas séries do exercício', () => {
    expect(escoposPara(3)).toEqual(['Todas as séries', 'Série específica', 'Primeiras 2 séries', 'Últimas 2 séries'])
    expect(escoposPara(1)).toEqual(['Todas as séries', 'Série específica'])
    expect(escoposPara(5)).toHaveLength(8)
  })
})

describe('mudarSeries', () => {
  const limpo = () => iniciarEdicao({ ...base, metodos: [] }, 1, 1)

  it('dropset da última série para a S1, e de volta para todas (sem `serie`)', () => {
    let s = mudarSeries(adicionarMetodo(limpo(), 1, 'Dropset', 3), 1, 'Dropset', 'Série específica', 1)
    expect(s.metodos[0]).toMatchObject({ escopo: 'Série específica', serie: 1 })
    expect(prescreverSessao(editado(s), 1, 1)!.exercicios[0].rotulo).toBe('Dropset [S1]')
    s = mudarSeries(s, 1, 'Dropset', 'Últimas 2 séries')
    expect(s.metodos[0].escopo).toBe('Últimas 2 séries')
    expect(s.metodos[0]).not.toHaveProperty('serie')
  })

  it('método de grupo muda as séries do grupo inteiro, sem tocar nos outros', () => {
    let s = adicionarMetodo(limpo(), 1, 'Biset', 3, [2])
    s = adicionarMetodo(s, 3, 'Rest-pause', 4)
    s = mudarSeries(s, 2, 'Biset', 'Primeiras 2 séries')
    expect(s.metodos.map((m) => m.escopo)).toEqual(['Primeiras 2 séries', 'Primeiras 2 séries', 'Série específica'])
  })

  it('sem mudança devolve o mesmo objeto', () => {
    const s = adicionarMetodo(limpo(), 1, 'Dropset', 3)
    expect(mudarSeries(s, 1, 'Dropset', 'Série específica', 3)).toBe(s)
    expect(mudarSeries(s, 2, 'Dropset', 'Todas as séries')).toBe(s)
  })
})
