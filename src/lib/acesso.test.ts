import { afterEach, describe, expect, it, vi } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import { diasParaVencer, fimDoDiaSaoPaulo, hojeMaisDias, liberado, type Usuario } from './acesso'

const sp = (iso: string) => new Date(`${iso}-03:00`)
const ts = (d: Date) => Timestamp.fromDate(d)

describe('fimDoDiaSaoPaulo', () => {
  it('23:59:59.999 em São Paulo (UTC−3)', () => {
    expect(fimDoDiaSaoPaulo('2026-10-10').toISOString()).toBe('2026-10-11T02:59:59.999Z')
  })
})

describe('liberado', () => {
  const aluno: Usuario = { papel: 'aluno', nome: 'Ana', email: 'a@x.com', status: 'ativo', pagoAte: ts(fimDoDiaSaoPaulo('2026-10-10')) }
  const agora = sp('2026-10-10T12:00')

  it('aluno ativo com pagamento em dia', () => expect(liberado(aluno, agora)).toBe(true))
  it('vencido (igual à regra: agora < pagoAte)', () => {
    expect(liberado(aluno, sp('2026-10-11T00:00'))).toBe(false)
    expect(liberado(aluno, aluno.pagoAte!.toDate())).toBe(false)
  })
  it('sem pagoAte, bloqueado ou aguardando', () => {
    expect(liberado({ ...aluno, pagoAte: undefined }, agora)).toBe(false)
    expect(liberado({ ...aluno, status: 'bloqueado' }, agora)).toBe(false)
    expect(liberado({ ...aluno, status: 'aguardando' }, agora)).toBe(false)
  })
  it('coach sempre', () => expect(liberado({ ...aluno, papel: 'coach', pagoAte: undefined }, agora)).toBe(true))
  it('sem perfil', () => expect(liberado(null, agora)).toBe(false))
})

describe('diasParaVencer (dias de calendário em São Paulo)', () => {
  const pagoAte = ts(fimDoDiaSaoPaulo('2026-10-10'))
  it('0 no dia do vencimento', () => {
    expect(diasParaVencer(pagoAte, sp('2026-10-10T00:00'))).toBe(0)
    expect(diasParaVencer(pagoAte, sp('2026-10-10T23:59'))).toBe(0)
  })
  it('conta pelo dia de São Paulo, não UTC', () => {
    expect(diasParaVencer(pagoAte, sp('2026-10-09T23:30'))).toBe(1) // já é dia 10 em UTC
  })
  it('positivo antes, negativo depois', () => {
    expect(diasParaVencer(pagoAte, sp('2026-09-28T10:00'))).toBe(12)
    expect(diasParaVencer(pagoAte, sp('2026-10-11T00:10'))).toBe(-1)
  })
})

describe('hojeMaisDias', () => {
  afterEach(() => vi.useRealTimers())
  it('23h em São Paulo ainda é o mesmo dia (UTC já é o dia seguinte)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(sp('2026-10-10T23:00'))
    expect(hojeMaisDias(0)).toBe('2026-10-10')
    expect(hojeMaisDias(30)).toBe('2026-11-09')
  })
})
