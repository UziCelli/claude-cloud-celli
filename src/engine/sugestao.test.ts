import { describe, expect, it } from 'vitest'
import { prescreverSessao } from './sessao'
import { aplicarSugestao, classificarEquipamento, sugerirMetodos } from './sugestao'
import type { AplicacaoMetodo, Meso, Slot } from './tipos'

const nomes = (...n: string[]): Slot[] => n.map((nome, i) => ({ slotId: `s${i + 1}`, nome }))
const L = [10, 10, 10, null, null, null]

// 1 treino, 1 semana, séries 3×10, pausa 60 s. Cada exercício vale 3 min de pausa: 10 + (30·N + 180·N)/60.
const mesoCom = (exercicios: string[], extra: Partial<Meso> = {}): Meso => ({
  frequencia: 1,
  semanas: 2,
  inicio: '2026-10-05',
  pausaS: 60,
  divisao: [nomes(...exercicios)],
  progressao: { principais: [L, L], auxiliares: [L, L] },
  metodos: [],
  ...extra,
})
const tempo = (m: Meso, semana = 1) => prescreverSessao(m, semana, 1)!.tempoMin
const met = (m: Partial<AplicacaoMetodo>): AplicacaoMetodo => ({
  ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Biset', escopo: 'Todas as séries', ...m,
})

// Posições 1–2 (principais) + 7 candidatos de grupos diferentes (Bíc, Tríc, Quad, Post, Ombros, Pant, Abd).
const PRINCIPAIS = ['Supino Reto Barra', 'Remada Curvada com Barra']
const NOVE = [
  ...PRINCIPAIS,
  'Rosca Direta Halter', // 3 Bíceps
  'Tríceps Pulley Corda', // 4 Tríceps
  'Cadeira Extensora Tradicional', // 5 Quadríceps
  'Mesa Flexora', // 6 Posterior
  'Elevação Lateral Halter', // 7 Ombros
  'Panturrilha em Pé Máquina', // 8 Panturrilha
  'Abdominal Máquina Crunch', // 9 Abdome
]

describe('classificarEquipamento', () => {
  it.each([
    ['Crossover no Cabo', 'duasPolias'],
    ['Crucifixo Inclinado CrossOver', 'duasPolias'],
    ['Crucifixo Inverso na Polia Alta Unilateral', 'duasPolias'],
    ['Voador no Cabo', 'duasPolias'],
    ['Tríceps Pulley Corda', 'polia'],
    ['Rosca Direta Cabo', 'polia'],
    ['Puxada Frente Aberta', 'polia'],
    ['Glúteo Coice na Polia', 'polia'],
    ['Rosca Direta Halter', 'halter'],
    ['Crucifixo Reto Halter', 'halter'], // crucifixo sem polia/cabo não é duasPolias
    ['Supino Reto Barra', 'barra'],
    ['Agachamento Livre Barra', 'barra'],
    ['Cadeira Extensora Tradicional', 'maquina'],
    ['Leg Press 45', 'maquina'],
    ['Agachamento no Smith', 'maquina'],
    ['Peck Deck', 'maquina'],
    ['Mesa Flexora', 'maquina'],
    ['Barra Fixa Aberta', 'pesoCorporal'],
    ['Flexão de Braços', 'pesoCorporal'],
    ['Passada', 'pesoCorporal'],
    ['ELEVAÇÃO LATERAL HALTER', 'halter'], // sem distinção de caixa/acento
  ])('%s -> %s', (nome, esperado) => expect(classificarEquipamento(nome)).toBe(esperado))
})

describe('sugerirMetodos — quando não sugerir', () => {
  it('tempo já dentro do limite: nenhuma proposta', () => {
    const m = mesoCom(NOVE)
    expect(sugerirMetodos(m, 1, 1, tempo(m))).toEqual([])
    expect(sugerirMetodos(m, 1, 1, 999)).toEqual([])
  })

  it('semana/treino inexistentes: nenhuma proposta', () => {
    expect(sugerirMetodos(mesoCom(NOVE), 9, 1, 10)).toEqual([])
    expect(sugerirMetodos(mesoCom(NOVE), 1, 5, 10)).toEqual([])
  })
})

describe('sugerirMetodos — quem entra', () => {
  it('posições 1–2 ficam fora por padrão', () => {
    const m = mesoCom(['Supino Reto Barra', 'Remada Curvada com Barra', 'Rosca Direta Halter', 'Tríceps Pulley Corda'])
    const todas = sugerirMetodos(m, 1, 1, 0).flatMap((p) => p.posicoes)
    expect(todas.sort()).toEqual([3, 4])
  })

  it('incluirPrincipais: true libera as posições 1–2 (antagonistas peito×costas primeiro)', () => {
    const m = mesoCom(['Supino Reto Barra', 'Remada Curvada com Barra', 'Rosca Direta Halter', 'Tríceps Pulley Corda'])
    const r = sugerirMetodos(m, 1, 1, 0, { incluirPrincipais: true })
    expect(r.map((p) => p.posicoes)).toEqual([[1, 2], [3, 4]])
  })

  it('exercício fora do catálogo fica fora', () => {
    const m = mesoCom([...PRINCIPAIS, 'Rosca Direta Halter', 'Exercício Inventado', 'Tríceps Pulley Corda'])
    const r = sugerirMetodos(m, 1, 1, 0)
    expect(r.map((p) => p.posicoes)).toEqual([[3, 5]])
  })

  it('nunca usa exercício duasPolias (crossover)', () => {
    const m = mesoCom([...PRINCIPAIS, 'Crossover no Cabo', 'Rosca Direta Halter', 'Tríceps Pulley Corda'])
    const r = sugerirMetodos(m, 1, 1, 0)
    expect(r.flatMap((p) => p.posicoes)).not.toContain(3)
    expect(r.map((p) => p.posicoes)).toEqual([[4, 5]])
  })

  it('exercícios já em método (qualquer linha ativa da semana+treino) ficam fora', () => {
    const base = mesoCom([...PRINCIPAIS, 'Rosca Direta Halter', 'Tríceps Pulley Corda', 'Cadeira Extensora Tradicional'])
    const comDrop = { ...base, metodos: [met({ exercicio: 3, metodo: 'Dropset', etapas: 1 })] }
    expect(sugerirMetodos(comDrop, 1, 1, 0).map((p) => p.posicoes)).toEqual([[4, 5]])
    // linha inativa ou de outra semana não conta
    const irrelevante = { ...base, metodos: [met({ exercicio: 3, ativo: false }), met({ exercicio: 4, semana: 2 })] }
    expect(sugerirMetodos(irrelevante, 1, 1, 25).map((p) => p.posicoes)).toEqual([[3, 4]])
  })

  it('usa o exercício da troca da semana', () => {
    const m = mesoCom([...PRINCIPAIS, 'Rosca Direta Halter', 'Rosca Martelo Halter'], {
      trocas: { '1-1-4': { slotId: 'x', nome: 'Tríceps Pulley Corda' } },
    })
    expect(sugerirMetodos(m, 1, 1, 0).map((p) => p.posicoes)).toEqual([[3, 4]]) // bíceps × tríceps (troca)
    expect(sugerirMetodos(m, 2, 1, 0)).toEqual([]) // semana 2: dois bíceps, mesmo grupo
  })

  it('mesmo grupo muscular não forma par', () => {
    const m = mesoCom([...PRINCIPAIS, 'Rosca Direta Halter', 'Rosca Martelo Halter', 'Rosca Scott Máquina'])
    expect(sugerirMetodos(m, 1, 1, 0)).toEqual([])
  })
})

describe('sugerirMetodos — prioridade dos pares', () => {
  // 5 exercícios = 27,5 min; limite 25 pede um biset só
  const primeiro = (exercicios: string[]) => sugerirMetodos(mesoCom([...PRINCIPAIS, ...exercicios]), 1, 1, 25)[0].posicoes

  it('antagonistas vencem polia+halter e o resto', () => {
    // 3 Bíceps (halter), 4 Ombros (halter), 5 Tríceps (polia): (3,5) antagonistas; (4,5) polia+halter; (3,4) resto
    expect(primeiro(['Rosca Direta Halter', 'Elevação Lateral Halter', 'Tríceps Pulley Corda'])).toEqual([3, 5])
  })

  it.each([
    ['peito × costas', ['Supino Inclinado Halter', 'Mesa Flexora', 'Remada Baixa com Triângulo'], [3, 5]],
    ['quadríceps × posterior', ['Elevação Lateral Halter', 'Cadeira Extensora Tradicional', 'Mesa Flexora'], [4, 5]],
  ])('antagonistas: %s', (_, ex, par) => expect(primeiro(ex)).toEqual(par))

  it('polia+halter vence polia+polia e o resto', () => {
    // 3 Ombros (halter), 4 Posterior (máquina), 5 Dorsais (polia)
    expect(primeiro(['Elevação Lateral Halter', 'Mesa Flexora', 'Puxada Frente Aberta'])).toEqual([3, 5])
  })

  it('polia+polia vence o resto', () => {
    // 3 Posterior (máquina), 4 Dorsais (polia), 5 Ombros (polia: Elevação Lateral no Cabo)
    expect(primeiro(['Mesa Flexora', 'Puxada Frente Aberta', 'Elevação Lateral no Cabo'])).toEqual([4, 5])
  })

  it('empate: a ordem de posição decide', () => {
    expect(primeiro(['Elevação Lateral Halter', 'Mesa Flexora', 'Panturrilha em Pé Máquina'])).toEqual([3, 4])
  })
})

describe('sugerirMetodos — guloso até caber no tempo', () => {
  // 9 exercícios 3×10 = 41,5 min; cada biset economiza 3 min.
  const m = mesoCom(NOVE)

  it('tempo base do cenário', () => expect(tempo(m)).toBeCloseTo(41.5, 6))

  it('forma só os pares necessários (para quando ≤ limite)', () => {
    const r = sugerirMetodos(m, 1, 1, 38.5)
    expect(r).toHaveLength(1)
    expect(r[0]).toMatchObject({ treino: 1, semana: 1, posicoes: [3, 4], metodo: 'Biset' }) // bíceps × tríceps
    expect(r[0].tempoAntes).toBeCloseTo(41.5, 6)
    expect(r[0].tempoDepois).toBeCloseTo(38.5, 6)
  })

  it('o tempo cai a cada proposta, encadeado, e termina ≤ limite', () => {
    const r = sugerirMetodos(m, 1, 1, 35.5)
    expect(r.map((p) => p.posicoes)).toEqual([[3, 4], [5, 6]]) // os dois antagonistas
    expect(r.map((p) => [p.tempoAntes, p.tempoDepois].map((t) => Math.round(t * 10) / 10))).toEqual([
      [41.5, 38.5],
      [38.5, 35.5],
    ])
  })

  it('o tempoDepois bate com aplicar as propostas no meso', () => {
    const r = sugerirMetodos(m, 1, 1, 33)
    const aplicado = r.reduce((acc, p) => aplicarSugestao(acc, p, [1]), m)
    expect(tempo(aplicado)).toBeCloseTo(r[r.length - 1].tempoDepois, 6)
    expect(tempo(aplicado)).toBeLessThanOrEqual(33)
  })

  it('não muta o meso', () => {
    const copia = JSON.parse(JSON.stringify(m))
    sugerirMetodos(m, 1, 1, 30)
    expect(m).toEqual(copia)
  })

  it('bisets bastam: nenhum triset', () => {
    const r = sugerirMetodos(m, 1, 1, 32.5)
    expect(r).toHaveLength(3)
    expect(r.every((p) => p.metodo === 'Biset' && p.posicoes.length === 2)).toBe(true)
    expect(r[2].tempoDepois).toBeCloseTo(32.5, 6)
  })

  it('bisets não bastam: o sobrante vira triset (um biset ganha o 3º exercício)', () => {
    const r = sugerirMetodos(m, 1, 1, 30)
    expect(r.map((p) => [p.metodo, p.posicoes.length])).toEqual([['Triset', 3], ['Biset', 2], ['Biset', 2]])
    expect(r[0].posicoes).toEqual([3, 4, 9])
    expect(r[r.length - 1].tempoDepois).toBeCloseTo(29.5, 6)
    expect(r[0].tempoAntes).toBeCloseTo(41.5, 6)
    // os tempos continuam encadeados depois da conversão
    r.slice(1).forEach((p, i) => expect(p.tempoAntes).toBeCloseTo(r[i].tempoDepois, 6))
  })

  it('o 3º exercício do triset é de grupo diferente dos outros dois', () => {
    const cenario = mesoCom([...PRINCIPAIS, 'Rosca Direta Halter', 'Tríceps Pulley Corda', 'Rosca Martelo Halter'])
    const r = sugerirMetodos(cenario, 1, 1, 0)
    expect(r).toHaveLength(1)
    expect(r[0].posicoes).toEqual([3, 4]) // bíceps de novo não entra como 3º
    expect(r[0].metodo).toBe('Biset')
  })

  it('sem como chegar ao limite: devolve o melhor possível', () => {
    const r = sugerirMetodos(m, 1, 1, 10)
    expect(r.flatMap((p) => p.posicoes).sort()).toEqual([3, 4, 5, 6, 7, 8, 9])
    expect(r[r.length - 1].tempoDepois).toBeGreaterThan(10)
  })
})

describe('aplicarSugestao', () => {
  const m = mesoCom(NOVE)
  const prop = { treino: 1, semana: 1, posicoes: [3, 4], metodo: 'Biset' as const, tempoAntes: 0, tempoDepois: 0 }

  it('cria uma linha de método por posição, "Todas as séries", com o mesmo grupo', () => {
    const r = aplicarSugestao(m, prop, [1])
    expect(r.metodos).toEqual([
      { ativo: true, semana: 1, treino: 1, exercicio: 3, metodo: 'Biset', escopo: 'Todas as séries', pausaInternaS: 15, blocos: 1, grupo: 1 },
      { ativo: true, semana: 1, treino: 1, exercicio: 4, metodo: 'Biset', escopo: 'Todas as séries', pausaInternaS: 15, blocos: 1, grupo: 1 },
    ])
  })

  it('vale para cada semana escolhida; só elas mudam', () => {
    const r = aplicarSugestao(m, prop, [1, 2])
    expect(r.metodos.map((x) => [x.semana, x.exercicio])).toEqual([[1, 3], [1, 4], [2, 3], [2, 4]])
    expect(tempo(r, 2)).toBeCloseTo(tempo(m, 2) - 3, 6)
  })

  it('escolhe um grupo livre (não colide com os já usados no treino)', () => {
    const base = { ...m, metodos: [met({ exercicio: 1, grupo: 1 }), met({ exercicio: 2, grupo: 1 }), met({ exercicio: 5, metodo: 'Triset', grupo: 2 })] }
    const r = aplicarSugestao(base, prop, [1])
    expect(r.metodos.slice(3).map((x) => x.grupo)).toEqual([3, 3])
  })

  it('grupo livre em todas as semanas escolhidas', () => {
    const base = { ...m, metodos: [met({ semana: 2, exercicio: 5, grupo: 1 })] }
    expect(aplicarSugestao(base, prop, [1, 2]).metodos.slice(1).map((x) => x.grupo)).toEqual([2, 2, 2, 2])
  })

  it('triset: três linhas Triset no mesmo grupo', () => {
    const r = aplicarSugestao(m, { ...prop, metodo: 'Triset', posicoes: [3, 4, 9] }, [1])
    expect(r.metodos.map((x) => [x.metodo, x.exercicio, x.grupo])).toEqual([['Triset', 3, 1], ['Triset', 4, 1], ['Triset', 9, 1]])
    expect(tempo(r)).toBeCloseTo(tempo(m) - 6, 6) // economiza 2 pausas
  })

  it('não muta o meso original', () => {
    const copia = JSON.parse(JSON.stringify(m))
    aplicarSugestao(m, prop, [1, 2])
    expect(m).toEqual(copia)
  })
})
