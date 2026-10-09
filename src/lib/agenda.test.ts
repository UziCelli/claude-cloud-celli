import { describe, expect, it } from 'vitest'
import { prescreverSessao, type Meso } from '../engine'
import { cargaVolta, comVolta, diasDaSemana, semanaDeVolta, travado, treinoDeHoje } from './agenda'

const sp = (iso: string) => new Date(`${iso}-03:00`)
const L = (...r: number[]) => [...r, ...Array(6 - r.length).fill(null)]

// Início numa quarta (2026-10-07): o bloco de cada semana vai de quarta a terça.
// Semana 1: 07/10–13/10 · 2: 14/10–20/10 · 3: 21/10–27/10 · 4: 28/10–03/11.
const base: Meso = {
  frequencia: 3,
  semanas: 4,
  inicio: '2026-10-07',
  pausaS: 60,
  divisao: [
    [{ slotId: 'a', nome: 'Supino' }, { slotId: 'b', nome: 'Remada' }],
    [{ slotId: 'c', nome: 'Agachamento' }],
    [{ slotId: 'd', nome: 'Terra' }],
  ],
  progressao: {
    principais: [],
    auxiliares: [],
    padrao: [L(10, 10, 10), L(10, 10, 10), L(11, 11, 11), L(12, 12, 12)],
  },
  metodos: [],
}
const comDias: Meso = { ...base, dias: [1, 3, 5] } // seg, qua, sex

const feito = (semana: number, treino: number) => ({ semana, treino, realizado: true })
const reps = (m: Meso, semana: number, treino: number, pos: number) => prescreverSessao(m, semana, treino)!.exercicios[pos - 1].reps

describe('diasDaSemana', () => {
  it('bloco que começa na quarta: k-ésimo dia de treino em ordem de calendário = Treino k', () => {
    const d = diasDaSemana(comDias, 1)
    expect(d.map((x) => x.data)).toEqual(['2026-10-07', '2026-10-08', '2026-10-09', '2026-10-10', '2026-10-11', '2026-10-12', '2026-10-13'])
    expect(d.map((x) => x.diaSemana)).toEqual([3, 4, 5, 6, 0, 1, 2])
    expect(d.map((x) => x.treino)).toEqual([1, null, 2, null, null, 3, null])
  })

  it('semana 3 começa 14 dias depois do início', () => {
    expect(diasDaSemana(comDias, 3)[0]).toEqual({ data: '2026-10-21', diaSemana: 3, treino: 1 })
  })

  it('sem dias: 7 dias, nenhum com treino', () => {
    const d = diasDaSemana(base, 2)
    expect(d).toHaveLength(7)
    expect(d[0].data).toBe('2026-10-14')
    expect(d.every((x) => x.treino === null)).toBe(true)
  })

  it('inicio com hora no texto continua valendo só a data', () => {
    expect(diasDaSemana({ ...comDias, inicio: '2026-10-07T00:00:00.000Z' }, 1)[0].data).toBe('2026-10-07')
  })
})

describe('treinoDeHoje', () => {
  it('com dias: o treino marcado para a data de hoje', () => {
    expect(treinoDeHoje(comDias, [], sp('2026-10-07T08:00'))).toEqual({ semana: 1, treino: 1, dataTreino: '2026-10-07', feito: false })
    expect(treinoDeHoje(comDias, [], sp('2026-10-12T20:00'))).toMatchObject({ semana: 1, treino: 3, dataTreino: '2026-10-12' })
  })

  it('com dias: marca se o treino de hoje já foi feito', () => {
    expect(treinoDeHoje(comDias, [feito(1, 1)], sp('2026-10-07T08:00'))).toMatchObject({ treino: 1, feito: true })
  })

  it('virada de meia-noite em São Paulo (UTC−3), não em UTC', () => {
    // 23:30 de quarta em SP já é quinta em UTC (02:30Z): continua sendo o Treino 1.
    expect(treinoDeHoje(comDias, [], new Date('2026-10-08T02:30:00Z'))).toMatchObject({ semana: 1, treino: 1, dataTreino: '2026-10-07' })
    // 00:00 de quinta em SP: o de ontem não feito deixa de ser o de hoje; quinta é descanso.
    expect(treinoDeHoje(comDias, [], new Date('2026-10-08T03:00:00Z'))).toEqual({
      semana: 1,
      descanso: true,
      proximo: { semana: 1, treino: 2, dataTreino: '2026-10-09' },
    })
  })

  it('dia de descanso: aparece o próximo dia de treino', () => {
    expect(treinoDeHoje(comDias, [], sp('2026-10-10T10:00'))).toEqual({
      semana: 1,
      descanso: true,
      proximo: { semana: 1, treino: 3, dataTreino: '2026-10-12' },
    })
  })

  it('último dia do bloco em descanso: o próximo é o Treino 1 da semana seguinte', () => {
    expect(treinoDeHoje(comDias, [], sp('2026-10-13T10:00'))).toEqual({
      semana: 1,
      descanso: true,
      proximo: { semana: 2, treino: 1, dataTreino: '2026-10-14' },
    })
  })

  it('última semana, sem mais treinos: descanso sem próximo', () => {
    expect(treinoDeHoje(comDias, [], sp('2026-11-03T10:00'))).toEqual({ semana: 4, descanso: true })
  })

  it('antes do início e depois do fim: null', () => {
    expect(treinoDeHoje(comDias, [], sp('2026-10-06T10:00'))).toBeNull()
    expect(treinoDeHoje(comDias, [], sp('2026-11-04T00:00'))).toBeNull()
    expect(treinoDeHoje(base, [], sp('2026-10-06T10:00'))).toBeNull()
  })

  // base: frequência 3 → DIAS_AUTO [0,2,4]: T1 07/10, T2 09/10, T3 11/10 (bloco da semana 1 vai até 13/10).
  const em = (semana: number, treino: number, iso: string) => ({ semana, treino, realizado: true, realizadoEm: { toMillis: () => sp(iso).getTime() } })

  it('sem dias: planejado pelo calendário automático', () => {
    expect(treinoDeHoje(base, [], sp('2026-10-07T10:00'))).toEqual({ semana: 1, treino: 1, dataTreino: '2026-10-07', feito: false })
    expect(treinoDeHoje(base, [em(1, 1, '2026-10-07T09:00')], sp('2026-10-08T10:00'))).toEqual({ semana: 1, treino: 2, dataTreino: '2026-10-09', feito: false })
  })

  it('sem dias: feito hoje → o próximo fica para amanhã (mesmo que o planejado fosse hoje)', () => {
    expect(treinoDeHoje(base, [em(1, 1, '2026-10-09T08:00')], sp('2026-10-09T10:00'))).toMatchObject({ treino: 2, dataTreino: '2026-10-10' })
  })

  it('sem dias: adiantado → o próximo fica na data planejada', () => {
    expect(treinoDeHoje(base, [em(1, 1, '2026-10-07T08:00'), em(1, 2, '2026-10-08T08:00')], sp('2026-10-08T10:00'))).toMatchObject({ treino: 3, dataTreino: '2026-10-11' })
  })

  it('sem dias: atrasado → a data planejada já passou (vira Hoje)', () => {
    expect(treinoDeHoje(base, [em(1, 1, '2026-10-07T08:00')], sp('2026-10-10T10:00'))).toMatchObject({ treino: 2, dataTreino: '2026-10-09' })
  })

  it('sem dias: limitado ao último dia do bloco da semana', () => {
    const regs = [em(1, 1, '2026-10-13T08:00'), em(1, 2, '2026-10-13T09:00')]
    expect(treinoDeHoje(base, regs, sp('2026-10-13T10:00'))).toMatchObject({ semana: 1, treino: 3, dataTreino: '2026-10-13' })
  })

  it('sem dias: realizadoEm null (gravação pendente offline) conta como feito agora', () => {
    expect(treinoDeHoje(base, [{ ...feito(1, 1), realizadoEm: null }], sp('2026-10-09T10:00'))).toMatchObject({ treino: 2, dataTreino: '2026-10-10' })
  })

  it('sem dias: 23:30 em São Paulo (02:30Z do dia seguinte) ainda é o dia de São Paulo', () => {
    const regs = [em(1, 1, '2026-10-08T23:30')]
    expect(treinoDeHoje(base, regs, new Date('2026-10-09T02:30:00Z'))).toMatchObject({ treino: 2, dataTreino: '2026-10-09' })
  })

  it('sem dias: treino feito na semana anterior conta para o dia seguinte; registro antigo sem realizadoEm não', () => {
    expect(treinoDeHoje(base, [em(1, 1, '2026-10-13T08:00'), feito(1, 2), feito(1, 3)], sp('2026-10-14T10:00'))).toMatchObject({ semana: 2, treino: 1, dataTreino: '2026-10-14' })
    expect(treinoDeHoje(base, [feito(1, 1)], sp('2026-10-08T10:00'))).toMatchObject({ treino: 2, dataTreino: '2026-10-09' })
  })

  it('sem dias: frequência 2 → [0,3]; frequência 4 → [0,1,3,4]', () => {
    const f2: Meso = { ...base, frequencia: 2, divisao: base.divisao.slice(0, 2) }
    expect(treinoDeHoje(f2, [em(1, 1, '2026-10-07T08:00')], sp('2026-10-08T10:00'))).toMatchObject({ treino: 2, dataTreino: '2026-10-10' })
    const f4: Meso = { ...base, frequencia: 4, divisao: [...base.divisao, base.divisao[0]] }
    const regs = [em(1, 1, '2026-10-07T08:00'), em(1, 2, '2026-10-08T08:00'), em(1, 3, '2026-10-08T09:00')]
    expect(treinoDeHoje(f4, regs, sp('2026-10-08T10:00'))).toMatchObject({ treino: 4, dataTreino: '2026-10-11' })
  })

  it('sem dias: semana concluída adianta a próxima, na data planejada; meso todo feito = descanso', () => {
    expect(treinoDeHoje(base, [feito(1, 1), feito(1, 2), feito(1, 3)], sp('2026-10-08T10:00'))).toEqual({ semana: 2, treino: 1, dataTreino: '2026-10-14', feito: false })
    const tudo = [1, 2, 3, 4].flatMap((w) => [1, 2, 3].map((t) => feito(w, t)))
    expect(treinoDeHoje(base, tudo, sp('2026-11-02T10:00'))).toEqual({ semana: 4, descanso: true })
  })

  it('sem dias: atrasado, abre a semana pela data (semanaParaAbrir)', () => {
    expect(treinoDeHoje(base, [], sp('2026-10-15T10:00'))).toEqual({ semana: 2, treino: 1, dataTreino: '2026-10-14', feito: false })
  })
})

describe('travado', () => {
  const hoje = sp('2026-10-22T10:00') // semana 3
  const regs = [feito(1, 1)]

  it('semana atual e futura nunca travam', () => {
    expect(travado(base, [], hoje, 3)).toBe(false)
    expect(travado(base, [], hoje, 3, 2)).toBe(false)
    expect(travado(base, [], hoje, 4)).toBe(false)
    expect(travado(base, [], hoje, 4, 1)).toBe(false)
  })

  it('semana passada: treino feito abre, treino não feito trava', () => {
    expect(travado(base, regs, hoje, 1, 1)).toBe(false)
    expect(travado(base, regs, hoje, 1, 2)).toBe(true)
  })

  it('semana passada sem nenhum treino feito trava inteira', () => {
    expect(travado(base, regs, hoje, 2)).toBe(true)
    expect(travado(base, regs, hoje, 2, 1)).toBe(true)
  })

  it('semana passada com algum treino feito não trava como um todo', () => {
    expect(travado(base, regs, hoje, 1)).toBe(false)
  })

  it('treino sem "realizado" não conta como feito', () => {
    expect(travado(base, [{ semana: 1, treino: 1 }, { semana: 1, treino: 2, realizado: false }], hoje, 1)).toBe(true)
  })

  it('antes do início nada trava', () => {
    expect(travado(base, [], sp('2026-10-01T10:00'), 1)).toBe(false)
  })

  it('vale igual com dias', () => {
    expect(travado(comDias, regs, hoje, 1, 2)).toBe(true)
  })
})

describe('semanaDeVolta', () => {
  it('semana 1 nunca é de volta', () => {
    expect(semanaDeVolta(base, [], sp('2026-10-08T10:00'), 1)).toBe(false)
    expect(semanaDeVolta(base, [], sp('2026-10-01T10:00'), 1)).toBe(false)
  })

  it('semana atual sem nenhum treino feito na anterior', () => {
    expect(semanaDeVolta(base, [], sp('2026-10-15T10:00'), 2)).toBe(true)
  })

  it('semana anterior parcial (1 treino feito) não é volta', () => {
    expect(semanaDeVolta(base, [feito(1, 2)], sp('2026-10-15T10:00'), 2)).toBe(false)
  })

  it('treino sem "realizado" não conta', () => {
    expect(semanaDeVolta(base, [{ semana: 1, treino: 1 }], sp('2026-10-15T10:00'), 2)).toBe(true)
  })

  it('semana futura pela data nunca é de volta', () => {
    expect(semanaDeVolta(base, [], sp('2026-10-15T10:00'), 3)).toBe(false)
  })

  it('duas semanas perdidas seguidas: cada uma conta como volta', () => {
    const hoje = sp('2026-10-22T10:00') // semana 3
    expect(semanaDeVolta(base, [], hoje, 2)).toBe(true)
    expect(semanaDeVolta(base, [], hoje, 3)).toBe(true)
  })

  it('semana depois da volta não é volta se a de volta teve treino', () => {
    expect(semanaDeVolta(base, [feito(2, 1)], sp('2026-10-22T10:00'), 3)).toBe(false)
  })

  it('semana fora do meso não é volta', () => {
    expect(semanaDeVolta(base, [], sp('2027-03-01T10:00'), 5)).toBe(false)
  })
})

describe('comVolta', () => {
  it('sem semana de volta devolve o mesmo objeto', () => {
    expect(comVolta(base, [], sp('2026-10-08T10:00'))).toBe(base)
    expect(comVolta(base, [feito(1, 3)], sp('2026-10-15T10:00'))).toBe(base)
  })

  it('reduz 5% só na semana de volta (ajustarSeries)', () => {
    const m = comVolta(base, [], sp('2026-10-15T10:00')) // semana 2, semana 1 vazia
    expect(m).not.toBe(base)
    expect(reps(m, 2, 1, 1)).toEqual([10, 9, 9]) // 30 * 0,95 = 28,5 -> 28
    expect(reps(m, 2, 2, 1)).toEqual([10, 9, 9])
    expect(reps(m, 1, 1, 1)).toEqual([10, 10, 10])
    expect(reps(m, 3, 1, 1)).toEqual([11, 11, 11])
    expect(reps(m, 4, 3, 1)).toEqual([12, 12, 12])
  })

  it('duas semanas perdidas seguidas: cada uma só −5% da própria linha (não acumula)', () => {
    const m = comVolta(base, [], sp('2026-10-22T10:00')) // semana 3, semanas 1 e 2 vazias
    expect(reps(m, 2, 1, 1)).toEqual([10, 9, 9])
    expect(reps(m, 3, 1, 1)).toEqual([11, 10, 10]) // 33 * 0,95 = 31,35 -> 31
    expect(reps(m, 4, 1, 1)).toEqual([12, 12, 12])
  })

  it('só a semana atual quando pedido (janela curta de registros)', () => {
    const m = comVolta(base, [], sp('2026-10-22T10:00'), true)
    expect(reps(m, 2, 1, 1)).toEqual([10, 10, 10])
    expect(reps(m, 3, 1, 1)).toEqual([11, 10, 10])
  })

  it('respeita trocas: o exercício trocado também é reduzido', () => {
    const m = comVolta({ ...base, trocas: { '2-1-1': { slotId: 'x', nome: 'Supino inclinado' } } }, [], sp('2026-10-15T10:00'))
    const e = prescreverSessao(m, 2, 1)!.exercicios[0]
    expect(e.slot.nome).toBe('Supino inclinado')
    expect(e.reps).toEqual([10, 9, 9])
    expect(m.trocas).toEqual({ '2-1-1': { slotId: 'x', nome: 'Supino inclinado' } })
  })

  it('exercício com linha própria: reduz a própria linha, sem mexer no meso original', () => {
    const original: Meso = { ...base, progressaoExercicio: { a: [L(8, 8, 8), L(8, 8, 8), L(9, 9, 9), L(9, 9, 9)] } }
    const m = comVolta(original, [], sp('2026-10-15T10:00'))
    expect(reps(m, 2, 1, 1)).toEqual([8, 7, 7]) // 24 * 0,95 = 22,8 -> 22
    expect(reps(m, 3, 1, 1)).toEqual([9, 9, 9])
    expect(reps(m, 2, 1, 2)).toEqual([10, 9, 9]) // padrão
    expect(original.progressaoExercicio!.a[1]).toEqual(L(8, 8, 8))
    expect(reps(original, 2, 1, 1)).toEqual([8, 8, 8])
  })

  it('respeita o limite de reps do meso (sobe séries em vez de passar do limite)', () => {
    const m = comVolta({ ...base, limiteReps: 9 }, [], sp('2026-10-15T10:00'))
    expect(reps(m, 2, 1, 1)).toEqual([7, 7, 7, 7]) // 28 reps não cabem em 3 séries de até 9
  })
})

describe('cargaVolta', () => {
  it('kg × 0,95 arredondado a 0,5', () => {
    expect(cargaVolta(100)).toBe(95)
    expect(cargaVolta(20)).toBe(19)
    expect(cargaVolta(15)).toBe(14.5) // 14,25 sobe
    expect(cargaVolta(22.5)).toBe(21.5) // 21,375
    expect(cargaVolta(10.5)).toBe(10) // 9,975
    expect(cargaVolta(0)).toBe(0)
  })
})
