import { describe, expect, it } from 'vitest'
import { corpoEhCarga, fracaoPC, preencherCorpo, rebasear } from './pesoCorporal'

describe('fracaoPC', () => {
  it.each([
    ['Flexão de Braço', 0.64],
    ['Flexão de braço com joelhos apoiados', 0.49],
    ['Barra Fixa Supinada', 0.95],
    ['Mergulho na Paralela', 0.9],
    ['Remada Invertida', 0.6],
    ['Agachamento Búlgaro', 0.88],
    ['Panturrilha em Pé', 0.95],
    ['Hiperextensão Lombar', 0.55],
    ['Elevação Pélvica', 0.5],
    ['Abdominal Infra', 0.3],
    ['Superman', 0.3],
    ['Paraquedista', 0.3],
    ['Rosca Superman Cabo Barra Reta', 1],
    ['Supino Reto Barra', 1],
  ])('%s -> %s', (nome, f) => expect(fracaoPC(nome)).toBe(f))
})

describe('corpoEhCarga', () => {
  it.each([
    'Barra Fixa Aberta',
    'Barra Fixa Supinada',
    'Barra Fixa Fechada',
    'Flexão de Braços',
    'Flexão de Braços Militar',
    'Abdominal Infra no Solo',
    'Abdominal Infra no Solo Completo',
    'Abdominal Tesoura',
    'Abdominal Recolhimento',
    'Abdominal Recolhimento Lateral',
    'Agachamento com Peso do Corpo',
    'Superman',
    'Paraquedista',
  ])('%s: corpo é a carga', (nome) => expect(corpoEhCarga(nome)).toBe(true))

  it.each([
    'Agachamento no Smith',
    'Agachamento Livre Barra',
    'Agachamento Livre Halter',
    'Agachamento Livre Banco',
    'Flexão Nórdica Máquina',
    'Flexão de Joelhos em pé com Caneleira',
    'Flexão Palmar Máquina',
    'Abdominal Máquina Crunch',
    'Abdominal no Cabo (em Pé)',
    'Abdominal Oblíquo (Polia Baixa)',
    'Abdominal Oblíquo Anilha',
    'Abdominal no Solo Peso Acima',
    'Abdominal Paralela Caneleira',
    'Remada Curvada Barra',
    'Tríceps Barra Paralela',
  ])('%s: não é automático', (nome) => expect(corpoEhCarga(nome)).toBe(false))

  it('o catálogo tem o agachamento com peso do corpo', async () => {
    const { default: cat } = await import('../data/exercicios.json')
    const ids = cat.flatMap((g) => g.exercicios.map((e) => e.id))
    expect(ids).toContain('agachamento-com-peso-do-corpo')
  })
})

describe('rebasear', () => {
  it('troca o corpo mantendo o extra digitado', () => {
    expect(rebasear([10, null, 12.5], 0, 80)).toEqual([{ coluna: 0, kg: 90 }, { coluna: 2, kg: 92.5 }])
    expect(rebasear([90, 92.5], 80, 0)).toEqual([{ coluna: 0, kg: 10 }, { coluna: 1, kg: 12.5 }])
    expect(rebasear([85], 76, 80.5)).toEqual([{ coluna: 0, kg: 89.5 }])
  })
  it('carga gravada sem o corpo antigo (dado antigo) fica como está; não grava quando nada muda', () => {
    expect(rebasear([5], 80, 0)).toEqual([]) // nenhuma carga se perde
    expect(rebasear([5, 85], 80, 0)).toEqual([{ coluna: 1, kg: 5 }])
    expect(rebasear([10, 20], 80, 80)).toEqual([])
    expect(rebasear([null, null], 0, 80)).toEqual([])
    expect(rebasear([], 0, 80)).toEqual([])
  })
})

describe('rebasear sobre valor normalizado (formato antigo)', () => {
  it('célula antiga 2 com pc 80 vira 82; ao desmarcar grava 2; trocar o pc mantém o extra', () => {
    expect(rebasear([82], 80, 0)).toEqual([{ coluna: 0, kg: 2 }])
    expect(rebasear([82], 80, 76)).toEqual([{ coluna: 0, kg: 78 }])
  })
})

describe('preencherCorpo', () => {
  it('preenche só séries prescritas vazias com o corpo', () => {
    expect(preencherCorpo([null, 5, undefined as never], 3, 76)).toEqual([{ coluna: 0, kg: 76 }, { coluna: 2, kg: 76 }])
    expect(preencherCorpo([], 2, 76)).toEqual([{ coluna: 0, kg: 76 }, { coluna: 1, kg: 76 }])
  })
  it('ignora colunas de drop e corpo zerado', () => {
    expect(preencherCorpo([null, null, null, null], 3, 50)).toHaveLength(3)
    expect(preencherCorpo([null], 1, 0)).toEqual([])
  })
  it('nunca sobrescreve carga existente (nem 0)', () => {
    expect(preencherCorpo([0, 60], 2, 76)).toEqual([])
  })
})
