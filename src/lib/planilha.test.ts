import { describe, expect, it } from 'vitest'
import { abaSugerida, planilhaParaMeso } from './planilha'
import { abrirPlanilha, type Valor } from './xlsx'
import { abaMesoFalsa as aba, criarXlsx } from './__fixtures__/xlsxFalso'

type Cel = Record<string, Valor>
const ids = () => {
  let n = 0
  return () => `id${++n}`
}

const metodoLinha = (r: number, cc: string[], v: Valor[]): Cel => Object.fromEntries(v.map((x, i) => [`${cc[i]}${r}`, x]))
// colunas AY.. : id ativo semana treino exercicio nomeExercicio metodo escopo serie grupo reducaoCarga
const AY = ['AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI']

describe('planilhaParaMeso', () => {
  it('lê config, divisão, progressão, pausa e cargas (layout antigo)', () => {
    const { meso, registros } = planilhaParaMeso(new Map(Object.entries(aba())), ids())
    expect(meso).toMatchObject({ frequencia: 2, semanas: 2, inicio: '2024-01-01', pausaS: 90 })
    expect(meso.divisao.map((d) => d.map((s) => s.nome))).toEqual([['Supino', 'Crucifixo'], ['Agachamento']])
    expect(meso.progressao.principais).toEqual([[4, 3, null, null, null, null], [5, null, null, null, null, null]])
    expect(meso.progressao.auxiliares[0]).toEqual([2, 2, null, null, null, null])
    // carga 0 = vazio; semana 1 treino 1 realizado
    expect(registros[0]).toEqual({ semana: 1, treino: 1, realizado: true, cargas: { id1: { s1: 20, s3: 22.5 } } })
  })

  it('trunca progressão, troca de exercício vira slot novo e leva a carga', () => {
    const { meso, registros, deFora } = planilhaParaMeso(new Map(Object.entries(aba())), ids())
    expect(meso.progressao.principais[1]).toEqual([5, null, null, null, null, null])
    expect(meso.trocas).toEqual({ '2-1-1': { slotId: 'id4', nome: 'Voador' } })
    // Semana 2, treino 1 não foi realizado, mas tem carga (Voador 10): fica de fora e é contado.
    expect(registros).toEqual([expect.objectContaining({ semana: 1, treino: 1, realizado: true })])
    expect(deFora).toBe(1)
    // Realizado: a carga vai para o slot da troca, não para o da divisão.
    const feito = planilhaParaMeso(new Map(Object.entries(aba(false, { B82: true, C82: 'Realizado' }))), ids())
    expect(feito.registros[1]).toEqual({ semana: 2, treino: 1, realizado: true, cargas: { id4: { s1: 10 } } })
    expect(feito.deFora).toBe(0)
  })

  it('layout novo: rótulo em BN5, tabela em BN12, métodos deduplicados', () => {
    const linha = metodoLinha(12, ['BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX'],
      ['x', 'sim', 1, 1, 2, 'Crucifixo', 'Dropset', 'Todas as séries', 0, null, 0.125])
    const iguais = metodoLinha(13, ['BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX'],
      ['y', 'SIM', 1, 1, 2, 'outro nome', 'Dropset', 'Todas as séries', 0, null, 0.125])
    const outroTreino = metodoLinha(14, ['BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU'], ['z', 'SIM', 1, 3, 1, 'a', 'Biset', 'Todas as séries'])
    const { meso } = planilhaParaMeso(new Map(Object.entries(aba(true, { ...linha, ...iguais, ...outroTreino, CD12: 3, CE12: 2, CD13: 3, CE13: 2 }))), ids())
    expect(meso.frequencia).toBe(2)
    expect(meso.metodos).toEqual([
      { ativo: true, semana: 1, treino: 1, exercicio: 2, metodo: 'Dropset', escopo: 'Todas as séries', reducaoCarga: 12, cargaEtapa: [3, 2, null] },
    ])
  })

  it('métodos: opcionais só com número diferente de 0; linha incompleta ignorada', () => {
    const l = metodoLinha(10, [...AY, 'BJ'], ['', 'NÃO', 1, 2, 1, 'n', 'Biset', 'Todas as séries', '3', 2, 0.2, 30])
    const ruim = metodoLinha(11, AY, ['', 'SIM', 1, 1, null, 'n', 'Biset', 'Todas as séries'])
    const { meso } = planilhaParaMeso(new Map(Object.entries(aba(false, { ...l, ...ruim }))), ids())
    expect(meso.metodos).toEqual([
      { ativo: false, semana: 1, treino: 2, exercicio: 1, metodo: 'Biset', escopo: 'Todas as séries', grupo: 2, reducaoCarga: 20, pausaInternaS: 30 },
    ])
  })

  it('erros em português', () => {
    const sem = aba()
    delete sem.AZ3
    expect(() => planilhaParaMeso(new Map(Object.entries(sem)))).toThrow('Esta aba não tem a Configuração do Meso (número de semanas). Use uma aba do modelo atual.')
    expect(() => planilhaParaMeso(new Map(Object.entries(aba(false, { AZ4: 'ontem' }))))).toThrow('A data inicial (AZ4) não é uma data.')
    expect(() => planilhaParaMeso(new Map(Object.entries(aba(false, { C16: 'x' }))))).toThrow('Layout inesperado na semana 1, treino 2 (linha 16).')
    expect(() => planilhaParaMeso(new Map(Object.entries(aba(true, { BO6: null }))))).toThrow('(BO6)')
  })

  it('funciona de ponta a ponta a partir de um .xlsx', async () => {
    const p = await abrirPlanilha(await criarXlsx({ 'Meso 3x': {}, M1: aba() }))
    expect(abaSugerida(p.abas)).toBe('M1')
    const { meso, registros } = planilhaParaMeso(await p.ler('M1'))
    expect(meso.divisao[0][0].nome).toBe('Supino')
    expect(registros[0].realizado).toBe(true)
  })
})

describe('abaSugerida', () => {
  it('última aba que começa com M e não é modelo', () => {
    expect(abaSugerida(['Meso 3x', 'M1', 'M2', 'Meso 6x', 'Resumo'])).toBe('M2')
    expect(abaSugerida(['Meso 3x', 'Resumo'])).toBeUndefined()
  })
})

describe('abaSugerida e limites', () => {
  it('sugere a última aba M<n>, ignorando modelos e outras abas com M', () => {
    expect(abaSugerida(['M1', 'M (2)', 'Meso 6x', 'Monitoramento', 'Metas'])).toBe('M (2)')
    expect(abaSugerida(['Meso 3x', 'Rotina'])).toBeUndefined()
  })

  it('recusa semanas ou treinos por semana fora do esperado', () => {
    expect(() => planilhaParaMeso(new Map(Object.entries(aba(false, { AZ3: 500 }))), ids())).toThrow('semanas')
    expect(() => planilhaParaMeso(new Map(Object.entries(aba(false, { AZ5: 9 }))), ids())).toThrow('Treinos por semana')
  })
})
