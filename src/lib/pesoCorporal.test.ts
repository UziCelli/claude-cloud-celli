import { describe, expect, it } from 'vitest'
import { corpoEhCarga, fracaoPC } from './pesoCorporal'

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
