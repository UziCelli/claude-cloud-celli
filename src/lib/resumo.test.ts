import { describe, expect, it } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import { fimDoDiaSaoPaulo, type Usuario } from './acesso'
import { inicioJanela, resumoCoach, type AlunoComId } from './resumo'

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
    const reg = [{ alunoId: 'a', atualizadoEm: ts('2026-10-10T07:00') }]
    const r = resumoCoach([a], reg, agora)
    expect(Object.values(r).flat()).toEqual([])
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

  it('treinaramHoje: realizadoEm ou atualizadoEm no dia de hoje em São Paulo (inclui presencial)', () => {
    const r = resumoCoach(
      [aluno('a'), aluno('b'), aluno('c'), aluno('pres', { presencial: true, pagoAte: undefined }), aluno('d')],
      [
        { alunoId: 'a', realizado: true, realizadoEm: ts('2026-10-10T00:10') },
        { alunoId: 'b', atualizadoEm: ts('2026-10-10T07:00'), realizadoEm: null },
        { alunoId: 'c', atualizadoEm: ts('2026-10-09T23:59') }, // ontem em SP (já dia 10 em UTC)
        { alunoId: 'pres', atualizadoEm: ts('2026-10-10T06:00') },
        { alunoId: 'd', atualizadoEm: null }, // gravação pendente
      ],
      agora,
    )
    expect(ids(r.treinaramHoje)).toEqual(['a', 'b', 'pres'])
  })

  it('sumidos: liberado, de app, sem registro atualizado nos últimos 7 dias', () => {
    const r = resumoCoach(
      [
        aluno('recente'),
        aluno('seis'),
        aluno('sete'),
        aluno('nada'),
        aluno('novo', { criadoEm: ts('2026-10-05T10:00') }), // cadastrado há menos de 7 dias
        aluno('vencido', { pagoAte: paga('2026-10-01') }), // já aparece em vencidos
        aluno('pres', { presencial: true, pagoAte: undefined }),
        aluno('agu', { status: 'aguardando', pagoAte: undefined }),
      ],
      [
        { alunoId: 'recente', atualizadoEm: ts('2026-10-10T07:00') },
        { alunoId: 'seis', atualizadoEm: ts('2026-10-04T00:01') }, // 6 dias atrás
        { alunoId: 'sete', atualizadoEm: ts('2026-10-03T23:00') }, // 7 dias atrás
        { alunoId: 'sete', realizadoEm: ts('2026-10-09T10:00') }, // só atualizadoEm conta
      ],
      agora,
    )
    expect(ids(r.sumidos)).toEqual(['sete', 'nada'])
  })
})

describe('inicioJanela', () => {
  it('início do dia em São Paulo, N dias atrás (estável durante o dia)', () => {
    const esperado = sp('2026-09-26T00:00').getTime()
    expect(inicioJanela(sp('2026-10-10T00:00'), 14)).toBe(esperado)
    expect(inicioJanela(sp('2026-10-10T23:59'), 14)).toBe(esperado)
  })
})
