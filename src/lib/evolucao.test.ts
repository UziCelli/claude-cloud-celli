import { describe, expect, it } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import type { Meso, Slot } from '../engine'
import { diaSP } from './acesso'
import {
  comparacaoToneladas,
  historicoExercicios,
  painelEvolucao,
  rankingAlunos,
  recordeAnterior,
  resumoTreino,
  treinosFeitos,
  type MesoEvolucao,
  type RegistroEvolucao,
} from './evolucao'

const sp = (iso: string) => new Date(`${iso}-03:00`)
const ts = (iso: string) => Timestamp.fromDate(sp(iso))
const dia = (iso: string) => diaSP(sp(`${iso}T12:00`).getTime())
// Sábado; a semana de calendário atual começa na segunda 05/10.
const agora = sp('2026-10-10T08:00')
const segundaAtual = dia('2026-10-05')

const slot = (slotId: string, nome = slotId): Slot => ({ slotId, nome })
const linha = [10, 10]
// Treino 1: Agachamento (A) e Supino (B); treino 2: Remada (C). 2 séries de 10 reps cada.
const meso = (over: Partial<Meso> = {}): Meso => ({
  frequencia: 2,
  semanas: 12,
  inicio: '2026-07-20',
  pausaS: 60,
  divisao: [[slot('A', 'Agachamento'), slot('B', 'Supino')], [slot('C', 'Remada')]],
  progressao: { principais: Array(12).fill(linha), auxiliares: Array(12).fill(linha) },
  metodos: [],
  ...over,
})
const m1: MesoEvolucao = { id: 'm1', meso: meso() }

const feito = (mesoId: string, semana: number, treino: number, iso: string, cargas: RegistroEvolucao['cargas'] = {}): RegistroEvolucao => ({
  mesoId,
  semana,
  treino,
  realizado: true,
  realizadoEm: ts(iso),
  cargas,
})
const carga = (slotId: string, kg: number) => ({ [slotId]: { s1: kg, s2: kg } })

// Quarta-feira da semana de calendário `k` semanas antes da atual, às 10h.
const quarta = (k: number) => new Date(Date.UTC(2026, 9, 7 - 7 * k)).toISOString().slice(0, 10) + 'T10:00'
const emSemana = (k: number, semana: number, treinos = [1]) => treinos.map((t) => feito('m1', semana, t, quarta(k)))
const painel = (registros: RegistroEvolucao[], mesoId?: string, mesos = [m1]) => painelEvolucao(mesos, registros, agora, mesoId)

describe('treinosFeitos', () => {
  it('realizado conta; registro vazio e cargas zeradas não contam', () => {
    const r = treinosFeitos(
      [m1],
      [
        { mesoId: 'm1', semana: 1, treino: 1, realizado: true, realizadoEm: ts('2026-09-01T10:00') },
        { mesoId: 'm1', semana: 1, treino: 2, realizado: false },
        { mesoId: 'm1', semana: 2, treino: 1, cargas: { A: { s1: 0, s2: null } } },
      ],
    )
    expect(r).toEqual([{ mesoId: 'm1', semana: 1, treino: 1, dia: dia('2026-09-01') }])
  })

  it('só com carga (sem realizado) conta; só com reps feitas também', () => {
    const r = treinosFeitos(
      [m1],
      [
        { mesoId: 'm1', semana: 1, treino: 1, cargas: { A: { s1: 50 } }, atualizadoEm: ts('2026-09-01T10:00') },
        { mesoId: 'm1', semana: 1, treino: 2, reps: { C: { s1: 8 } } },
      ],
    )
    expect(r.map((t) => [t.semana, t.treino])).toEqual([
      [1, 1],
      [1, 2],
    ])
  })

  it('dia = realizadoEm ?? inicioEm ?? atualizadoEm; sem data fica null mas conta', () => {
    const base = { mesoId: 'm1', realizado: true }
    const r = treinosFeitos(
      [m1],
      [
        { ...base, semana: 1, treino: 1, realizadoEm: ts('2026-09-03T10:00'), inicioEm: ts('2026-09-01T10:00'), atualizadoEm: ts('2026-09-04T10:00') },
        { ...base, semana: 2, treino: 1, realizadoEm: null, inicioEm: ts('2026-09-08T10:00'), atualizadoEm: ts('2026-09-09T10:00') },
        { ...base, semana: 3, treino: 1, realizadoEm: null, atualizadoEm: ts('2026-09-15T10:00') },
        { ...base, semana: 4, treino: 1 },
      ],
    )
    expect(r.map((t) => t.dia)).toEqual([dia('2026-09-03'), dia('2026-09-08'), dia('2026-09-15'), null])
  })

  it('dia de São Paulo (23h de SP ainda é o mesmo dia, apesar do UTC)', () => {
    const [t] = treinosFeitos([m1], [feito('m1', 1, 1, '2026-09-01T23:30')])
    expect(t.dia).toBe(dia('2026-09-01'))
  })

  it('ignora registro de meso desconhecido e repetido', () => {
    const r = treinosFeitos(
      [m1],
      [feito('outro', 1, 1, '2026-09-01T10:00'), feito('m1', 1, 1, '2026-09-01T10:00'), feito('m1', 1, 1, '2026-09-01T11:00')],
    )
    expect(r).toHaveLength(1)
  })
})

describe('historicoExercicios', () => {
  it('só treinos feitos, cronológico por meso (inicio), semana, treino', () => {
    const m0: MesoEvolucao = { id: 'm0', meso: meso({ inicio: '2026-05-04' }) }
    const h = historicoExercicios(
      [m1, m0], // fora de ordem de propósito
      [
        feito('m1', 1, 1, '2026-07-21T10:00', carga('B', 60)),
        feito('m0', 2, 1, '2026-05-12T10:00', carga('B', 40)),
        feito('m0', 1, 2, '2026-05-06T10:00', carga('C', 20)),
        feito('m0', 1, 1, '2026-05-05T10:00', carga('B', 30)),
        { mesoId: 'm0', semana: 3, treino: 1, realizado: false }, // vazio: fora
      ],
    )
    expect(h.Supino.map((o) => [o.mesoId, o.semana, o.cargaMax])).toEqual([
      ['m0', 1, 30],
      ['m0', 2, 40],
      ['m1', 1, 60],
    ])
    expect(h.Remada).toHaveLength(1)
  })

  it('troca de exercício casa pelo nome', () => {
    const comTroca: MesoEvolucao = { id: 'm1', meso: meso({ trocas: { '2-1-1': slot('Z', 'Terra') } }) }
    const h = historicoExercicios(
      [comTroca],
      [feito('m1', 1, 1, '2026-07-21T10:00', carga('A', 100)), feito('m1', 2, 1, '2026-07-28T10:00', { ...carga('Z', 120), ...carga('B', 50) })],
    )
    expect(h.Agachamento.map((o) => o.cargaMax)).toEqual([100])
    expect(h.Terra.map((o) => [o.semana, o.cargaMax])).toEqual([[2, 120]])
    expect(h.Supino.map((o) => o.cargaMax)).toEqual([null, 50])
  })

  it('exercício igual em 2 mesos soma no histórico', () => {
    const m2: MesoEvolucao = { id: 'm2', meso: meso({ inicio: '2026-09-28' }) }
    const h = historicoExercicios([m1, m2], [feito('m1', 1, 1, '2026-07-21T10:00', carga('B', 50)), feito('m2', 1, 1, '2026-09-29T10:00', carga('B', 55))])
    expect(h.Supino.map((o) => [o.mesoId, o.cargaMax])).toEqual([
      ['m1', 50],
      ['m2', 55],
    ])
  })

  it('peso do corpo (pc) normalizado: carga antiga só com o extra soma o corpo', () => {
    const r: RegistroEvolucao = { ...feito('m1', 1, 1, '2026-07-21T10:00', carga('B', 20)), pc: { B: 70 } }
    const [o] = historicoExercicios([m1], [r]).Supino
    expect(o.cargaMax).toBe(90)
    expect(o.volume).toBe(90 * 10 + 90 * 10)
  })

  it('reps feitas substituem as prescritas no volume; carga zero/ausente dá cargaMax null ou 0', () => {
    const r: RegistroEvolucao = { ...feito('m1', 1, 1, '2026-07-21T10:00', carga('B', 50)), reps: { B: { s1: 8 } } }
    const h = historicoExercicios([m1], [r])
    expect(h.Supino[0].volume).toBe(50 * 8 + 50 * 10)
    expect(h.Agachamento[0]).toMatchObject({ cargaMax: null, volume: null })
  })

  it('guarda o dia e a posição na ocorrência', () => {
    const h = historicoExercicios([m1], [feito('m1', 3, 2, '2026-09-01T10:00', carga('C', 20))])
    expect(h.Remada).toEqual([{ mesoId: 'm1', semana: 3, treino: 2, dia: dia('2026-09-01'), cargaMax: 20, volume: 400 }])
  })
})

describe('painelEvolucao: frequência', () => {
  it('total, porSemana (12, mais antiga primeiro, segunda de SP) e sem treino vazio', () => {
    const p = painel([...emSemana(1, 1, [1, 2]), ...emSemana(0, 2)])
    expect(p.totalTreinos).toBe(3)
    expect(p.porSemana).toHaveLength(12)
    expect(p.porSemana[0].inicio).toBe(segundaAtual - 77)
    expect(p.porSemana[10]).toEqual({ inicio: segundaAtual - 7, feitos: 2 })
    expect(p.porSemana[11]).toEqual({ inicio: segundaAtual, feitos: 1 })
  })

  it('semana atual vazia não quebra a sequência', () => {
    const p = painel([...emSemana(1, 1), ...emSemana(2, 2), ...emSemana(3, 3)])
    expect(p.semanasSeguidas).toBe(3)
  })

  it('semana atual com treino entra na sequência', () => {
    expect(painel([...emSemana(0, 1), ...emSemana(1, 2), ...emSemana(2, 3)]).semanasSeguidas).toBe(3)
  })

  it('semana anterior vazia e atual vazia: zero; lacuna quebra a sequência', () => {
    expect(painel([...emSemana(2, 1), ...emSemana(3, 2)]).semanasSeguidas).toBe(0)
    expect(painel([...emSemana(0, 1), ...emSemana(2, 2), ...emSemana(3, 3)]).semanasSeguidas).toBe(1)
  })

  it('melhor sequência de todos os tempos', () => {
    const p = painel([...[6, 7, 8, 9, 10].flatMap((k, i) => emSemana(k, i + 1)), ...emSemana(1, 6), ...emSemana(2, 7)])
    expect(p.semanasSeguidas).toBe(2)
    expect(p.melhorSequencia).toBe(5)
  })

  it('registro sem data conta no total, mas fica fora do calendário e da sequência', () => {
    const p = painel([{ mesoId: 'm1', semana: 1, treino: 1, realizado: true }])
    expect(p.totalTreinos).toBe(1)
    expect(p.dias).toEqual([])
    expect(p.semanasSeguidas).toBe(0)
    expect(p.melhorSequencia).toBe(0)
    expect(p.porSemana.every((s) => s.feitos === 0)).toBe(true)
  })

  it('mediaSemanal: treinos das últimas 8 semanas de calendário / 8', () => {
    const p = painel([...[0, 1, 2, 3, 4, 5, 6, 7].flatMap((k) => emSemana(k, k + 1, [1, 2])), ...emSemana(9, 10, [1, 2])])
    expect(p.mediaSemanal).toBe(2)
    expect(painel([]).mediaSemanal).toBe(0)
  })

  it('mediaSemanal de quem começou há pouco: só as semanas desde o 1º treino (a atual vazia não conta)', () => {
    expect(painel([...emSemana(1, 1, [1, 2]), ...emSemana(0, 2, [1, 2])]).mediaSemanal).toBe(2)
    expect(painel(emSemana(1, 1, [1, 2, 3])).mediaSemanal).toBe(3)
    expect(painel([...emSemana(2, 1, [1, 2]), ...emSemana(0, 2, [1, 2])]).mediaSemanal).toBe(1.33)
  })

  it('dias: dias distintos com treino nos últimos 84 dias, em ordem', () => {
    const p = painel([
      feito('m1', 1, 1, '2026-07-18T10:00'), // 84 dias atrás: fora
      feito('m1', 2, 1, '2026-07-19T10:00'), // 83 dias atrás: dentro
      feito('m1', 3, 1, '2026-10-08T10:00'),
      feito('m1', 3, 2, '2026-10-08T18:00'), // mesmo dia
    ])
    expect(p.dias).toEqual([dia('2026-07-19'), dia('2026-10-08')])
  })

  it('meta = frequência do meso mais recente', () => {
    const m2: MesoEvolucao = { id: 'm2', meso: meso({ inicio: '2026-09-28', frequencia: 4 }) }
    expect(painel([], undefined, [m2, m1]).meta).toBe(4)
    expect(painel([], undefined, []).meta).toBeNull()
  })

  it('semanas completas: todos os treinos 1..frequência feitos', () => {
    const p = painel([...emSemana(3, 1, [1, 2]), ...emSemana(2, 2, [1]), ...emSemana(1, 3, [1, 2])])
    expect(p.semanasCompletas).toBe(2)
  })
})

describe('painelEvolucao: exercícios', () => {
  // Supino: 40 → 50 → 60; Remada: 20 → 30; Agachamento: 100 → 100 (sem evolução)
  const regs = [
    feito('m1', 1, 1, '2026-09-01T10:00', { ...carga('B', 40), ...carga('A', 100) }),
    feito('m1', 1, 2, '2026-09-02T10:00', carga('C', 20)),
    feito('m1', 2, 1, '2026-09-08T10:00', { ...carga('B', 50), ...carga('A', 100) }),
    feito('m1', 2, 2, '2026-09-09T10:00', carga('C', 30)),
    feito('m1', 3, 1, '2026-09-15T10:00', { ...carga('B', 60), ...carga('A', 100) }),
  ]

  it('topEvolucao: de, até, kg e %; empate no % desempata por kg; sem evolução fica fora', () => {
    const { topEvolucao } = painel(regs)
    expect(topEvolucao).toEqual([
      { nome: 'Supino', de: 40, ate: 60, kg: 20, pct: 50 },
      { nome: 'Remada', de: 20, ate: 30, kg: 10, pct: 50 },
    ])
  })

  it('topEvolucao: exige 2 ocorrências com carga > 0 e mostra no máximo 5', () => {
    expect(painel(regs.slice(0, 2)).topEvolucao).toEqual([]) // cada exercício apareceu 1×
    const sete = Array.from({ length: 7 }, (_, i) => slot(`E${i}`))
    const grande: MesoEvolucao = { id: 'g', meso: meso({ frequencia: 1, divisao: [sete] }) }
    const cargas = (k: number) => Object.fromEntries(sete.map((s, i) => [s.slotId, { s1: 100 + k * (i + 1) }]))
    const p = painelEvolucao([grande], [feito('g', 1, 1, '2026-09-01T10:00', cargas(0)), feito('g', 2, 1, '2026-09-08T10:00', cargas(1))], agora)
    expect(p.topEvolucao.map((e) => e.nome)).toEqual(['E6', 'E5', 'E4', 'E3', 'E2'])
  })

  it('maisConstante: maior sequência sem baixar a carga (mínimo 3)', () => {
    const seq = (a: number[], b: number[]) =>
      a.map((kg, i) => feito('m1', i + 1, 1, '2026-09-01T10:00', { ...carga('A', kg), ...carga('B', b[i]) }))
    expect(painel(seq([100, 90, 95, 100], [40, 45, 45, 50])).maisConstante).toEqual({ nome: 'Supino', sequencia: 4 })
    expect(painel(seq([100, 90, 95], [40, 30, 35])).maisConstante).toBeNull() // só 2 seguidas
    expect(painel([]).maisConstante).toBeNull()
  })

  it('recordes: 1ª ocorrência não é recorde; igual não é recorde; últimos 30 dias', () => {
    const p = painel([
      feito('m1', 1, 1, '2026-08-20T10:00', carga('B', 40)), // 1ª: não é recorde
      feito('m1', 2, 1, '2026-09-01T10:00', carga('B', 50)), // recorde (39 dias atrás)
      feito('m1', 3, 1, '2026-09-10T10:00', carga('B', 50)), // igual: não
      feito('m1', 4, 1, '2026-10-08T10:00', carga('B', 60)), // recorde (2 dias atrás)
    ])
    expect(p.recordes).toEqual({ total: 2, ultimos30: 1 })
  })

  it('recordes: ocorrência sem carga não é "a 1ª"; a 1ª com carga também não conta', () => {
    const p = painel([feito('m1', 1, 1, '2026-09-01T10:00'), feito('m1', 2, 1, '2026-09-08T10:00', carga('B', 30))])
    expect(p.recordes).toEqual({ total: 0, ultimos30: 0 })
  })

  it('volumeKg: Σ carga × reps efetivas de todos os treinos feitos', () => {
    const p = painel([feito('m1', 1, 1, '2026-09-01T10:00', { ...carga('A', 100), ...carga('B', 50) })])
    expect(p.volumeKg).toBe(100 * 20 + 50 * 20)
  })
})

describe('painelEvolucao: conquistas', () => {
  it('lista fixa: todas, ganhas e não ganhas, com progresso e falta', () => {
    const { conquistas } = painel([feito('m1', 1, 1, '2026-09-01T10:00', { ...carga('A', 100), ...carga('B', 50) })])
    expect(conquistas).toHaveLength(6 + 6 + 4 + 5 + 3)
    expect(conquistas.filter((c) => c.categoria === 'treinos').map((c) => c.meta)).toEqual([1, 10, 25, 50, 100, 200])
    expect(conquistas.find((c) => c.id === 'treinos-1')).toMatchObject({ ganha: true, progresso: 1, falta: 0 })
    const dez = conquistas.find((c) => c.id === 'treinos-10')!
    expect(dez).toMatchObject({ ganha: false, falta: 9 })
    expect(dez.progresso).toBeCloseTo(0.1)
    expect(new Set(conquistas.map((c) => c.id)).size).toBe(conquistas.length)
  })

  it('toneladas: 4.000 kg = 4 t; faltam 6 t para 10 t', () => {
    // A e B: 2 séries × 100 kg × 10 reps cada = 4.000 kg
    const { conquistas } = painel([feito('m1', 1, 1, '2026-09-01T10:00', { ...carga('A', 100), ...carga('B', 100) })])
    expect(conquistas.find((c) => c.id === 'toneladas-1')!.ganha).toBe(true)
    const dez = conquistas.find((c) => c.id === 'toneladas-10')!
    expect(dez.ganha).toBe(false)
    expect(dez.progresso).toBeCloseTo(0.4)
    expect(dez.falta).toBe(6)
  })

  it('falta de toneladas arredonda para cima, com 1 casa', () => {
    // 7.700 kg → falta 2,3 t para 10 t (10 − 7,7 dá 2,3000000000000007 em ponto flutuante)
    const c = painel([feito('m1', 1, 1, '2026-09-01T10:00', { ...carga('A', 192.5), ...carga('B', 192.5) })]).conquistas.find((x) => x.id === 'toneladas-10')!
    expect(c.falta).toBe(2.3)
  })

  it('sequência, recordes e semanas completas contam na lista', () => {
    const regs = [...emSemana(3, 1, [1, 2]), ...emSemana(2, 2), ...emSemana(1, 3)]
    const { conquistas } = painel(regs)
    expect(conquistas.find((c) => c.id === 'sequencia-2')!.ganha).toBe(true)
    expect(conquistas.find((c) => c.id === 'sequencia-4')).toMatchObject({ ganha: false, falta: 1 })
    expect(conquistas.find((c) => c.id === 'semanasCompletas-1')!.ganha).toBe(true)
    expect(conquistas.find((c) => c.id === 'recordes-1')).toMatchObject({ ganha: false, falta: 1 })
  })
})

describe('painelEvolucao: filtro por meso', () => {
  const m2: MesoEvolucao = { id: 'm2', meso: meso({ inicio: '2026-09-28', frequencia: 3 }) }
  const regs = [
    feito('m1', 1, 1, '2026-08-04T10:00', carga('B', 40)),
    feito('m1', 2, 1, '2026-08-11T10:00', carga('B', 50)),
    feito('m2', 1, 1, '2026-09-29T10:00', carga('B', 60)),
  ]

  it('filtra tudo, menos as conquistas (usam todos os dados)', () => {
    const tudo = painelEvolucao([m1, m2], regs, agora)
    const so2 = painelEvolucao([m1, m2], regs, agora, 'm2')
    expect(tudo.totalTreinos).toBe(3)
    expect(so2.totalTreinos).toBe(1)
    expect(so2.meta).toBe(3)
    expect(so2.topEvolucao).toEqual([]) // no m2 o Supino apareceu 1×
    expect(tudo.topEvolucao).toEqual([{ nome: 'Supino', de: 40, ate: 60, kg: 20, pct: 50 }])
    expect(so2.conquistas).toEqual(tudo.conquistas)
    expect(so2.conquistas.find((c) => c.id === 'treinos-10')!.falta).toBe(7)
  })
})

describe('comparacaoToneladas', () => {
  it('null abaixo de 0,4 t', () => {
    expect(comparacaoToneladas(399)).toBeNull()
    expect(comparacaoToneladas(0)).toBeNull()
    expect(comparacaoToneladas(-5)).toBeNull()
  })

  it('maior objeto com quantidade ≥ 5 (mais divertido); senão o maior com ≥ 1', () => {
    expect(comparacaoToneladas(400)).toEqual({ qtd: 1, objeto: 'piano', plural: 'pianos' })
    expect(comparacaoToneladas(1000)).toMatchObject({ qtd: 1, objeto: 'carro popular' })
    expect(comparacaoToneladas(1500)).toMatchObject({ qtd: 1, objeto: 'hipopótamo' })
    expect(comparacaoToneladas(2000)).toMatchObject({ qtd: 5, objeto: 'piano' })
    expect(comparacaoToneladas(9000)).toEqual({ qtd: 6, objeto: 'hipopótamo', plural: 'hipopótamos' })
    expect(comparacaoToneladas(48000)).toMatchObject({ qtd: 8, objeto: 'elefante' })
    expect(comparacaoToneladas(12000)).toMatchObject({ qtd: 8, objeto: 'hipopótamo' })
    expect(comparacaoToneladas(150000)).toMatchObject({ qtd: 8, objeto: 'caminhão', plural: 'caminhões' }) // 7,5 → 8
    expect(comparacaoToneladas(1_500_000)).toMatchObject({ qtd: 10, objeto: 'baleia-azul' })
  })
})

describe('recordeAnterior', () => {
  const o = (semana: number, treino: number, cargaMax: number | null, mesoId = 'm1') => ({ mesoId, semana, treino, dia: null, cargaMax, volume: null })
  const h = { Supino: [o(1, 1, 40), o(2, 1, 60), o(3, 1, 50), o(4, 1, null)], Remada: [o(1, 2, null), o(2, 2, 0)] }

  it('maior carga máx do exercício; null se nunca teve carga > 0 ou não existe', () => {
    expect(recordeAnterior(h, 'Supino')).toBe(60)
    expect(recordeAnterior(h, 'Remada')).toBeNull()
    expect(recordeAnterior(h, 'Terra')).toBeNull()
  })

  it('ignora o registro excluído (mesmo meso, semana e treino)', () => {
    expect(recordeAnterior(h, 'Supino', { mesoId: 'm1', semana: 2, treino: 1 })).toBe(50)
    expect(recordeAnterior(h, 'Supino', { mesoId: 'm2', semana: 2, treino: 1 })).toBe(60) // outro meso
    expect(recordeAnterior({ Supino: [o(1, 1, 40)] }, 'Supino', { mesoId: 'm1', semana: 1, treino: 1 })).toBeNull()
  })
})

describe('resumoTreino', () => {
  const o = (semana: number, cargaMax: number | null, volume: number | null = null) => ({ mesoId: 'm1', semana, treino: 1, dia: null, cargaMax, volume })
  const h = {
    Supino: [o(1, 40, 800), o(2, 60, 1200), o(3, 70, 1400)], // recorde (antes 60)
    Agachamento: [o(1, 80, 1600), o(2, 100, 2000), o(3, 90, 1800)], // caiu: nada
    Terra: [o(3, 100, 2000)], // 1ª vez: não é recorde
    Rosca: [o(1, 20, 400), o(2, 10, 200), o(3, 15, 300)], // subiu 10 → 15, abaixo do recorde 20
    Remada: [o(1, 50, 1000), o(2, null, null)], // não treinou na semana 3
  }

  it('volume do treino, recordes contra os treinos anteriores e cargas que subiram', () => {
    expect(resumoTreino(h, { mesoId: 'm1', semana: 3, treino: 1 })).toEqual({
      volumeKg: 1400 + 1800 + 2000 + 300,
      recordes: [{ nome: 'Supino', kg: 70, antes: 60 }],
      subiram: [{ nome: 'Rosca', antes: 10, agora: 15 }],
    })
  })

  it('treino antigo compara só com o que veio antes dele', () => {
    expect(resumoTreino(h, { mesoId: 'm1', semana: 2, treino: 1 })).toEqual({
      volumeKg: 1200 + 2000 + 200,
      recordes: [
        { nome: 'Supino', kg: 60, antes: 40 },
        { nome: 'Agachamento', kg: 100, antes: 80 },
      ],
      subiram: [],
    })
  })

  it('treino sem nada registrado: tudo vazio', () => {
    expect(resumoTreino(h, { mesoId: 'm2', semana: 1, treino: 1 })).toEqual({ volumeKg: 0, recordes: [], subiram: [] })
  })
})

describe('rankingAlunos', () => {
  // Meso atual do aluno a: começa 21/09 (segunda), 4 semanas, 2 por semana.
  const atualA: MesoEvolucao & { alunoId: string } = { id: 'a-atual', alunoId: 'a', meso: meso({ inicio: '2026-09-21', semanas: 4 }) }
  const antigoA: MesoEvolucao & { alunoId: string } = { id: 'a-antigo', alunoId: 'a', meso: meso({ inicio: '2026-08-03', semanas: 4 }) }
  const futuroA: MesoEvolucao & { alunoId: string } = { id: 'a-futuro', alunoId: 'a', meso: meso({ inicio: '2026-11-02' }) }
  const regs = [
    feito('a-antigo', 1, 1, '2026-09-25T10:00'), // feito em outro meso: fora do feitos4s (mas conta na sequência)
    feito('a-atual', 1, 1, '2026-09-22T10:00', { ...carga('B', 40), ...carga('A', 100) }),
    feito('a-atual', 1, 2, '2026-09-24T10:00', carga('C', 20)),
    feito('a-atual', 2, 1, '2026-09-29T10:00', { ...carga('B', 50), ...carga('A', 100) }),
    feito('a-atual', 2, 2, '2026-10-06T10:00', carga('C', 30)),
    feito('b-atual', 1, 1, '2026-10-06T10:00', carga('B', 40)),
  ]
  const alunos = [
    { id: 'a', nome: 'Ana' },
    { id: 'b', nome: 'Bia' },
    { id: 'c', nome: 'Caio' },
  ]
  const bAtual: MesoEvolucao & { alunoId: string } = { id: 'b-atual', alunoId: 'b', meso: meso({ inicio: '2026-09-07', semanas: 8, frequencia: 3 }) }
  const r = rankingAlunos(alunos, [antigoA, futuroA, atualA, bAtual], regs, agora)

  it('usa o meso atual (o mais recente que já começou): evolução, feitos e previstos das últimas 4 semanas', () => {
    // meso de 21/09 a 18/10 cobre 3 das 4 últimas semanas (a de 14/09 é anterior): 2 × 3
    expect(r[0]).toMatchObject({ id: 'a', nome: 'Ana', feitos4s: 4, previstos4s: 2 * 3 })
    // Supino 40→50 (25%) e Remada 20→30 (50%); Agachamento sem evolução fica fora: média 37,5
    expect(r[0].evolucaoPct).toBeCloseTo(37.5)
  })

  it('semanas seguidas e recordes dos últimos 30 dias', () => {
    // a: semanas de 21/09, 28/09 e 05/10 com treino (o antigo, em 25/09, cai na semana de 21/09)
    expect(r[0].semanasSeguidas).toBe(3)
    expect(r[0].recordes30).toBe(2) // Supino 50 e Remada 30
  })

  it('aluno com 1 treino: sem evolução; previstos = frequência × semanas do meso nas 4 últimas', () => {
    expect(r[1]).toEqual({ id: 'b', nome: 'Bia', evolucaoPct: null, feitos4s: 1, previstos4s: 3 * 4, semanasSeguidas: 1, recordes30: 0 })
  })

  it('aluno sem meso: zerado', () => {
    expect(r[2]).toEqual({ id: 'c', nome: 'Caio', evolucaoPct: null, feitos4s: 0, previstos4s: 0, semanasSeguidas: 0, recordes30: 0 })
  })

  it('meso que já terminou conta só as semanas de calendário que ele cobriu', () => {
    const acabou = { id: 'x', alunoId: 'x', meso: meso({ inicio: '2026-08-31', semanas: 3, frequencia: 2 }) } // 31/08 a 20/09
    const [x] = rankingAlunos([{ id: 'x', nome: 'X' }], [acabou], [], agora)
    expect(x.previstos4s).toBe(2 * 1) // só a semana de 14/09 (as outras 3 já estão fora do meso)
  })
})
