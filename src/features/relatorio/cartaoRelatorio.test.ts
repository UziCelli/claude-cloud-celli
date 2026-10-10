import { describe, expect, it } from 'vitest'
import type { RelatorioCiclo } from '../../lib/relatorio'
import { dadosCartaoRelatorio, textosRelatorio, volumeTexto } from './cartaoRelatorio'

const r = {
  nome: 'Ciclo 2', inicio: '2026-09-07', fim: '2026-10-04', semanas: 4, frequencia: 2, feitos: 7, previstos: 8, aderenciaPct: 88,
  semanasCompletas: 3, porSemana: [], evolucoes: [{ nome: 'Supino', de: 40, ate: 52.5, kg: 12.5, pct: 31.25 }],
  recordes: [{ nome: 'Supino', kg: 52.5, semana: 4, treino: 1 }], volumeKg: 12500, movimentos: 80, tempoMedioMin: 55,
} as RelatorioCiclo

describe('cartão do relatório', () => {
  it('usa só o primeiro nome e formata em pt-BR', () => {
    const d = dadosCartaoRelatorio(r, 'Carla Souza Lima')
    expect(d.nome).toBe('Carla')
    expect(d.periodo).toBe('07/09/2026 a 04/10/2026')
    const t = textosRelatorio(d)
    expect(t.numeros.map((n) => [n.valor, n.rotulo])).toEqual([
      ['88%', '7 de 8 treinos feitos'],
      ['12,5 t', 'levantadas no ciclo'],
      ['1', 'recorde batido'],
    ])
    expect(t.destaque).toEqual({ nome: 'Supino', linha: '40 → 52,5 kg', pct: '+31%' })
  })
  it('sem destaque e volume pequeno em kg', () => {
    expect(textosRelatorio(dadosCartaoRelatorio({ ...r, evolucoes: [], recordes: [] }, 'Bia')).destaque).toBeUndefined()
    expect(volumeTexto(850)).toBe('850 kg')
  })
})
