import { describe, expect, it } from 'vitest'
import type { Meso } from '../engine'
import { sinaisProgressao, type RegistroProgressao } from './progressaoFisio'
import { sugestoesFisio } from './sugestoesFisio'
import type { RelatoDor } from './dor'

// A1 (números aprovados pelo Victor em 13/11/2026). Rodar só antes de juntar (pedido do Victor).
const agora = new Date('2026-11-13T15:00:00Z')
const DIA = 86400_000
const ts = (ms: number) => ({ toMillis: () => ms }) as never
const ha = (dias: number) => ts(agora.getTime() - dias * DIA)
const linha = [8, 8, 8, null, null, null]
const meso: Meso = {
  frequencia: 1, semanas: 8, inicio: '2026-09-21', pausaS: 60,
  divisao: [[{ slotId: 'a', nome: 'Agachamento Livre Barra' }]],
  progressao: { principais: Array(8).fill(linha), auxiliares: Array(8).fill(linha) },
  metodos: [],
}
const mesos = new Map([['m', meso]])
const reg = (semana: number, dias: number, kg: number, reps: number): RegistroProgressao => ({
  alunoId: 'ana', mesoId: 'm', semana, treino: 1, realizado: true, realizadoEm: ha(dias),
  cargas: { a: { s1: kg, s2: kg, s3: kg } }, reps: { a: { s1: reps, s2: reps, s3: reps } },
})
const tipos = (rs: RegistroProgressao[]) => sinaisProgressao('ana', mesos, rs, agora).map((s) => s.tipo).sort()

describe('sinaisProgressao', () => {
  it('reps 2+ acima do alvo em 2 sessões seguidas → repsAcima; uma só não basta', () => {
    expect(tipos([reg(1, 9, 60, 8), reg(2, 5, 60, 10), reg(3, 1, 60, 11)])).toContain('repsAcima')
    expect(tipos([reg(1, 9, 60, 8), reg(2, 5, 60, 8), reg(3, 1, 60, 11)])).not.toContain('repsAcima')
  })
  it('carga subindo com reps 2+ abaixo em 2 sessões seguidas → cargaEgo', () => {
    expect(tipos([reg(1, 9, 60, 8), reg(2, 5, 70, 6), reg(3, 1, 80, 5)])).toContain('cargaEgo')
    expect(tipos([reg(1, 9, 60, 8), reg(2, 5, 70, 6), reg(3, 1, 70, 5)])).not.toContain('cargaEgo') // carga não subiu
  })
  it('salto: última semana ≥ 1,3× a média das 3 anteriores na região', () => {
    const base = [reg(1, 23, 60, 8), reg(2, 16, 60, 8), reg(3, 9, 60, 8)]
    expect(tipos([...base, reg(4, 1, 80, 8)])).toContain('salto') // +33%
    expect(tipos([...base, reg(4, 1, 70, 8)])).not.toContain('salto') // +17%
    expect(tipos([reg(4, 1, 200, 8)])).not.toContain('salto') // sem base: não compara
  })
  it('treino não concluído e exercício fora do catálogo não contam', () => {
    expect(tipos([reg(1, 9, 60, 8), { ...reg(2, 5, 60, 11), realizado: false }, reg(3, 1, 60, 11)])).not.toContain('repsAcima')
  })
})

describe('sugestoesFisio com progressão (A1)', () => {
  const dor = (art: string, dias: number, intensidade = 4): RelatoDor => ({ id: `d${dias}`, alunoId: 'ana', exercicio: 'Agachamento Livre Barra', articulacao: art as RelatoDor['articulacao'], tipo: 'dor', intensidade, momento: 'durante', texto: '', em: ha(dias), resposta: null, respondidoEm: null, vistoEm: null, sessao: null })
  const prog = sinaisProgressao('ana', mesos, [reg(1, 9, 60, 8), reg(2, 5, 60, 10), reg(3, 1, 60, 11)], agora)
  const rodar = (dores: RelatoDor[], anamnese = new Map<string, string[]>()) => sugestoesFisio({ dores, checkins: [], sinais: [], agora, progressao: prog, anamnese })
  it('só vira sugestão com dor na mesma região nos últimos 14 dias', () => {
    expect(rodar([]).filter((s) => s.tipo === 'progressao')).toEqual([])
    expect(rodar([dor('ombro', 2)]).filter((s) => s.tipo === 'progressao')).toEqual([])
    expect(rodar([dor('joelho', 2)]).find((s) => s.tipo === 'progressao')?.motivo).toMatch(/reps 2 ou mais acima/)
    expect(rodar([dor('joelho', 20)]).filter((s) => s.tipo === 'progressao')).toEqual([])
  })
  it('região na anamnese aparece no motivo; prioridade conversar > progressao > polimento', () => {
    const s = rodar([dor('joelho', 2), dor('joelho', 1, 8)], new Map([['ana', ['joelho']]]))
    expect(s.map((x) => x.tipo)).toEqual(['conversar', 'progressao'])
    expect(s[1].motivo).toMatch(/já na anamnese/)
  })
  it('dor que não passou em 24 h (check-in) gera "converse"', () => {
    const ck = { id: 'c1', alunoId: 'ana', sono: 4, estresse: 4, cansaco: 4, alimentacao: 4, em: ha(1), sessao: null, dor24h: false }
    expect(sugestoesFisio({ dores: [], checkins: [ck], sinais: [], agora })[0].motivo).toMatch(/não passou em até 1 dia/)
  })
})

describe('propostaPolimento (A1, passo 3)', () => {
  it('só os exercícios da região e a semana seguinte; null fora do meso', async () => {
    const { propostaPolimento } = await import('./progressaoFisio')
    const m: Meso = { ...meso, frequencia: 1, divisao: [[{ slotId: 'a', nome: 'Agachamento Livre Barra' }, { slotId: 'b', nome: 'Supino Reto Barra' }]] }
    expect(propostaPolimento(m, 'joelho', 3)).toMatchObject({ slotIds: ['a'], semanas: [4] })
    expect(propostaPolimento(m, null, 3)?.slotIds).toEqual(['a', 'b'])
    expect(propostaPolimento(m, 'joelho', 1)?.semanas).toEqual([2])
    expect(propostaPolimento(m, 'joelho', m.semanas)).toBeNull()
    expect(propostaPolimento(m, 'punho', 3)?.slotIds).toEqual(['b']) // supino carrega o punho
  })
})
