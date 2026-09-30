import { describe, expect, it } from 'vitest'
import { fracaoPC } from './pesoCorporal'

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
