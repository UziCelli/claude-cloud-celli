import { describe, expect, it } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import { fimDoDiaSaoPaulo, type Usuario } from './acesso'
import { mesoParaDoc } from './conversores'
import { duracaoTreino, fimDaSessao, inicioJanela, resumoCoach, TETO_TREINO_MS, type AlunoComId } from './resumo'
import type { Meso } from '../engine'

const sp = (iso: string) => new Date(`${iso}-03:00`)
const ts = (iso: string) => Timestamp.fromDate(sp(iso))
const paga = (data: string) => Timestamp.fromDate(fimDoDiaSaoPaulo(data))
const agora = sp('2026-10-10T08:00')

const aluno = (id: string, u: Partial<Usuario> = {}): AlunoComId => ({
  id,
  papel: 'aluno',
  nome: id,
  email: `${id}@x.com`,
  status: 'ativo',
  pagoAte: paga('2026-12-31'),
  criadoEm: ts('2026-01-01T10:00'),
  ...u,
})
const ids = (l: AlunoComId[]) => l.map((a) => a.id)

describe('resumoCoach', () => {
  it('aguardando', () => {
    const r = resumoCoach([aluno('a', { status: 'aguardando', pagoAte: undefined }), aluno('b')], [], agora)
    expect(ids(r.aguardando)).toEqual(['a'])
  })

  it('arquivado fica fora de tudo', () => {
    const a = aluno('a', { status: 'arquivado', pagoAte: paga('2026-10-12') })
    const reg = [{ alunoId: 'a', mesoId: 'm', semana: 1, treino: 1, atualizadoEm: ts('2026-10-10T07:00') }]
    const r = resumoCoach([a], reg, agora)
    const { treinosHoje, ...listas } = r
    expect(Object.values(listas).flat()).toEqual([])
    expect(treinosHoje).toEqual({})
  })

  it('vencendo: ativo, de 0 a 7 dias (dia de São Paulo), sem presencial', () => {
    const r = resumoCoach(
      [
        aluno('hoje', { pagoAte: paga('2026-10-10') }),
        aluno('sete', { pagoAte: paga('2026-10-17') }),
        aluno('oito', { pagoAte: paga('2026-10-18') }),
        aluno('ontem', { pagoAte: paga('2026-10-09') }),
        aluno('blq', { status: 'bloqueado', pagoAte: paga('2026-10-12') }),
        aluno('pres', { presencial: true, pagoAte: undefined }),
      ],
      [],
      agora,
    )
    expect(ids(r.vencendo)).toEqual(['hoje', 'sete'])
  })

  it('vencidos: ativo sem acesso (pagoAte passado ou ausente), sem presencial', () => {
    const r = resumoCoach(
      [
        aluno('ontem', { pagoAte: paga('2026-10-09') }),
        aluno('sem', { pagoAte: undefined }),
        aluno('ok'),
        aluno('blq', { status: 'bloqueado', pagoAte: paga('2026-10-01') }),
        aluno('pres', { presencial: true, pagoAte: undefined }),
      ],
      [],
      agora,
    )
    expect(ids(r.vencidos)).toEqual(['ontem', 'sem'])
  })

  it('treinaramHoje: sessão de hoje em São Paulo (concluída em realizadoEm ou iniciada em inicioEm; inclui presencial)', () => {
    const inicioEm = ts('2026-10-10T06:30')
    const r = resumoCoach(
      [aluno('a'), aluno('b'), aluno('c'), aluno('pres', { presencial: true, pagoAte: undefined }), aluno('d')],
      [
        { alunoId: 'a', realizado: true, realizadoEm: ts('2026-10-10T00:10') },
        { alunoId: 'b', atualizadoEm: ts('2026-10-10T07:00'), inicioEm, realizadoEm: null },
        { alunoId: 'c', inicioEm: ts('2026-10-09T23:59') }, // ontem em SP (já dia 10 em UTC)
        { alunoId: 'pres', atualizadoEm: ts('2026-10-10T06:00'), cargas: { A: { s1: 20 } } }, // carga lançada sem Iniciar: correção
        { alunoId: 'd', atualizadoEm: null, inicioEm: null }, // início com gravação pendente = agora
      ],
      agora,
    )
    expect(ids(r.treinaramHoje)).toEqual(['a', 'b', 'd'])
  })

  it('treino concluído ontem e corrigido hoje não é de hoje; registro antigo sem realizadoEm usa atualizadoEm', () => {
    const r = resumoCoach(
      [aluno('a'), aluno('b')],
      [
        { alunoId: 'a', mesoId: 'm', semana: 1, treino: 1, realizado: true, realizadoEm: ts('2026-10-09T10:00'), atualizadoEm: ts('2026-10-10T07:00'), inicioEm: ts('2026-10-09T09:00'), cargas: { A: { s1: 30 } } },
        { alunoId: 'b', mesoId: 'm', semana: 1, treino: 1, realizado: true, atualizadoEm: ts('2026-10-10T07:00') }, // dado antigo
      ],
      agora,
    )
    expect(ids(r.treinaramHoje)).toEqual(['b'])
    expect(Object.keys(r.treinosHoje)).toEqual(['b'])
  })

  it('treinosHoje: por aluno, sem repetir, ordenado, feito x em andamento', () => {
    const base = { mesoId: 'm1', realizado: false }
    const r = resumoCoach(
      [aluno('a'), aluno('b')],
      [
        { ...base, alunoId: 'a', semana: 2, treino: 2, atualizadoEm: ts('2026-10-10T07:00'), inicioEm: null }, // início pendente
        { ...base, alunoId: 'a', semana: 2, treino: 1, realizado: true, realizadoEm: ts('2026-10-10T01:00') },
        { ...base, alunoId: 'a', semana: 2, treino: 2, realizado: true, atualizadoEm: ts('2026-10-10T07:30') }, // repetido
        { ...base, alunoId: 'a', semana: 1, treino: 3, atualizadoEm: ts('2026-10-09T23:59') }, // ontem
        { ...base, alunoId: 'b', semana: 1, treino: 1 }, // sem datas
      ],
      agora,
    )
    expect(r.treinosHoje).toEqual({
      a: [
        { mesoId: 'm1', semana: 2, treino: 1, feito: true },
        { mesoId: 'm1', semana: 2, treino: 2, feito: true }, // um dos registros repetidos está feito
      ],
    })
  })

  it('treino cancelado hoje (sem inicioEm, cargas apagadas) não conta como treinou nem em andamento', () => {
    const cancelado = { mesoId: 'm1', semana: 1, treino: 1, realizado: false, atualizadoEm: ts('2026-10-10T07:00') }
    const r = resumoCoach(
      [aluno('a'), aluno('b')],
      [
        { ...cancelado, alunoId: 'a', cargas: { A: {} } },
        { ...cancelado, alunoId: 'b' },
      ],
      agora,
    )
    expect(ids(r.treinaramHoje)).toEqual([])
    expect(r.treinosHoje).toEqual({})
  })

  it('sumidos: liberado, de app, sem sessão (concluída ou iniciada) nos últimos 7 dias', () => {
    const r = resumoCoach(
      [
        aluno('recente'),
        aluno('seis'),
        aluno('sete'),
        aluno('nada'),
        aluno('correcao'),
        aluno('novo', { criadoEm: ts('2026-10-05T10:00') }), // cadastrado há menos de 7 dias
        aluno('vencido', { pagoAte: paga('2026-10-01') }), // já aparece em vencidos
        aluno('pres', { presencial: true, pagoAte: undefined }),
        aluno('agu', { status: 'aguardando', pagoAte: undefined }),
      ],
      [
        { alunoId: 'recente', inicioEm: ts('2026-10-10T07:00') },
        { alunoId: 'seis', realizado: true, realizadoEm: ts('2026-10-04T00:01') }, // 6 dias atrás
        { alunoId: 'sete', realizado: true, realizadoEm: ts('2026-10-03T23:00') }, // 7 dias atrás
        { alunoId: 'sete', realizadoEm: ts('2026-10-09T10:00') }, // sem realizado não é sessão
        { alunoId: 'correcao', atualizadoEm: ts('2026-10-10T07:00'), cargas: { A: { s1: 20 } } }, // carga sem Iniciar
      ],
      agora,
    )
    expect(ids(r.sumidos)).toEqual(['sete', 'nada', 'correcao'])
  })
})

describe('frequenciaCaindo', () => {
  const slot = { slotId: 'A', nome: 'Supino' }
  const meso = (inicio: string, semanas: number, frequencia: number): Meso => ({
    frequencia,
    semanas,
    inicio,
    pausaS: 60,
    divisao: [[slot]],
    progressao: { principais: [[10]], auxiliares: [[10]] },
    metodos: [],
  })
  // Meso em andamento (semana 2 de 6), 3 por semana: caindo = menos de 3 treinos feitos em 14 dias.
  const mesoDe = (alunoId: string, m = meso('2026-09-28', 6, 3)) => ({ ...mesoParaDoc(m), alunoId, nome: 'Meso', id: `m-${alunoId}` })
  const feito = (alunoId: string, treino: number, iso: string, extra = {}) => ({
    alunoId,
    mesoId: `m-${alunoId}`,
    semana: 1,
    treino,
    realizado: true,
    realizadoEm: ts(iso),
    atualizadoEm: ts(iso),
    ...extra,
  })
  // Treino iniciado ontem (tira o aluno de "sumidos" sem contar como treino feito).
  const vivo = (alunoId: string) => ({ alunoId, inicioEm: ts('2026-10-09T10:00') })
  const caindo = (alunos: AlunoComId[], registros: Parameters<typeof resumoCoach>[1], mesos = alunos.map((a) => mesoDe(a.id))) =>
    ids(resumoCoach(alunos, registros, agora, mesos).frequenciaCaindo)

  it('fez menos da metade de frequência × 2 nos últimos 14 dias (3 × 2 / 2 = 3)', () => {
    const r = [
      feito('pouco', 1, '2026-10-05T10:00'),
      feito('pouco', 2, '2026-10-07T10:00'),
      feito('ok', 1, '2026-10-01T10:00'),
      feito('ok', 2, '2026-10-05T10:00'),
      feito('ok', 3, '2026-10-07T10:00'),
    ]
    expect(caindo([aluno('pouco'), aluno('ok')], r)).toEqual(['pouco'])
  })

  it('meso com menos de 7 dias não conta; com menos de 14, o previsto é proporcional aos dias', () => {
    const novo = [mesoDe('novo', meso('2026-10-05', 6, 3))] // 6 dias: cedo demais
    expect(caindo([aluno('novo')], [vivo('novo')], novo)).toEqual([])
    // 9 dias (10 com hoje): previsto 3 × 10/7 ≈ 4,3; metade ≈ 2,1 → 2 feitos ainda é pouco, 3 não.
    const m = (id: string) => mesoDe(id, meso('2026-10-01', 6, 3))
    const r = [feito('dois', 1, '2026-10-02T10:00'), feito('dois', 2, '2026-10-06T10:00'), ...[1, 2, 3].map((t) => feito('tres', t, `2026-10-0${t + 1}T10:00`))]
    expect(caindo([aluno('dois'), aluno('tres')], r, [m('dois'), m('tres')])).toEqual(['dois'])
  })

  it('treino feito = realizado true, no dia de realizadoEm; só atualizadoEm ou realizado false não contam', () => {
    const r = [
      feito('a', 1, '2026-10-05T10:00'),
      feito('a', 2, '2026-10-06T10:00', { realizado: false }),
      { alunoId: 'a', mesoId: 'm-a', semana: 1, treino: 3, realizado: true, realizadoEm: null, atualizadoEm: ts('2026-10-07T10:00') },
    ]
    expect(caindo([aluno('a')], r)).toEqual(['a']) // só 1 treino feito de verdade
  })

  it('janela de 14 dias de São Paulo: 27/09 ainda conta (13 dias), 26/09 não (14 dias)', () => {
    const base = [feito('dentro', 1, '2026-10-05T10:00'), feito('dentro', 2, '2026-10-06T10:00'), feito('fora', 1, '2026-10-05T10:00'), feito('fora', 2, '2026-10-06T10:00')]
    const r = [...base, feito('dentro', 3, '2026-09-27T00:30'), feito('fora', 3, '2026-09-26T23:30'), vivo('dentro'), vivo('fora')]
    expect(caindo([aluno('dentro'), aluno('fora')], r)).toEqual(['fora'])
  })

  it('o mesmo treino registrado 2× conta 1 vez', () => {
    const r = [feito('a', 1, '2026-10-05T10:00'), feito('a', 1, '2026-10-05T11:00'), feito('a', 2, '2026-10-06T10:00')]
    expect(caindo([aluno('a')], r)).toEqual(['a'])
  })

  it('só meso em andamento: sem meso, meso que acabou ou ainda não começou ficam de fora', () => {
    const alunos = [aluno('sem'), aluno('acabou'), aluno('futuro'), aluno('durante')]
    const mesos = [
      mesoDe('acabou', meso('2026-08-03', 4, 3)),
      mesoDe('futuro', meso('2026-10-12', 4, 3)),
      mesoDe('durante'),
    ]
    expect(caindo(alunos, alunos.map((a) => vivo(a.id)), mesos)).toEqual(['durante'])
  })

  it('usa a frequência do meso do aluno: 2 por semana = menos de 2 treinos', () => {
    const r = [feito('a', 1, '2026-10-05T10:00'), feito('b', 1, '2026-10-05T10:00'), feito('b', 2, '2026-10-06T10:00')]
    const mesos = [mesoDe('a', meso('2026-09-28', 6, 2)), mesoDe('b', meso('2026-09-28', 6, 2))]
    expect(caindo([aluno('a'), aluno('b')], r, mesos)).toEqual(['a'])
  })

  it('exclui sumidos, presencial, vencido, aguardando e arquivado', () => {
    const alunos = [
      aluno('sumido'), // 0 treinos e nada recente: já está em "Sumidos"
      aluno('pres', { presencial: true, pagoAte: undefined }),
      aluno('vencido', { pagoAte: paga('2026-10-01') }),
      aluno('agu', { status: 'aguardando', pagoAte: undefined }),
      aluno('arq', { status: 'arquivado' }),
      aluno('caindo'),
    ]
    const r = ['pres', 'vencido', 'agu', 'arq', 'caindo'].map(vivo)
    const res = resumoCoach(alunos, r, agora, alunos.map((a) => mesoDe(a.id)))
    expect(ids(res.sumidos)).toEqual(['sumido'])
    expect(ids(res.frequenciaCaindo)).toEqual(['caindo'])
  })

  it('sem `mesos`, a lista é vazia e o resto não muda', () => {
    const r = resumoCoach([aluno('a')], [vivo('a')], agora)
    expect(r.frequenciaCaindo).toEqual([])
    expect(ids(r.treinaramHoje)).toEqual([])
  })
})

describe('inicioJanela', () => {
  it('início do dia em São Paulo, N dias atrás (estável durante o dia)', () => {
    const esperado = sp('2026-09-26T00:00').getTime()
    expect(inicioJanela(sp('2026-10-10T00:00'), 14)).toBe(esperado)
    expect(inicioJanela(sp('2026-10-10T23:59'), 14)).toBe(esperado)
  })
})

describe('duracaoTreino', () => {
  const MIN = 60_000
  it('devolve a diferença quando é plausível', () => {
    expect(duracaoTreino(1000, 1000 + 50 * MIN)).toBe(50 * MIN)
    expect(duracaoTreino(0, TETO_TREINO_MS)).toBe(TETO_TREINO_MS) // o teto ainda vale
  })
  it('esquecido aberto (80 h) não vira duração', () => {
    expect(duracaoTreino(0, 80 * 60 * MIN)).toBeNull()
    expect(duracaoTreino(0, TETO_TREINO_MS + 1)).toBeNull()
  })
  it('sem dado ou fim antes do início: null', () => {
    expect(duracaoTreino(null, 5 * MIN)).toBeNull()
    expect(duracaoTreino(5 * MIN, undefined)).toBeNull()
    expect(duracaoTreino(5 * MIN, 5 * MIN)).toBeNull()
    expect(duracaoTreino(10 * MIN, 5 * MIN)).toBeNull()
  })
})

describe('fimDaSessao', () => {
  it('sem início: o fim não é desta sessão', () => {
    expect(fimDaSessao(null, 1000)).toBeNull()
  })
  it('fim antes do início: null', () => {
    expect(fimDaSessao(2000, 1000)).toBeNull()
  })
  it('fim igual ou depois do início: o próprio fim', () => {
    expect(fimDaSessao(1000, 1000)).toBe(1000)
    expect(fimDaSessao(1000, 5000)).toBe(5000)
  })
  it('sem fim: null', () => {
    expect(fimDaSessao(1000, null)).toBeNull()
    expect(fimDaSessao(null, null)).toBeNull()
  })
})
