import { afterEach, describe, expect, it, vi } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import { diasParaVencer, faltaSegundoFator, fimDoDiaSaoPaulo, hojeMaisDias, liberado, proximoVencimento, type Usuario } from './acesso'

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

describe('faltaSegundoFator (espelha segundoFator() de firestore.rules)', () => {
  it('login com TOTP: não falta', () => expect(faltaSegundoFator({ firebase: { sign_in_second_factor: 'totp' } })).toBe(false))
  it('só e-mail e senha: falta', () => expect(faltaSegundoFator({ firebase: { sign_in_provider: 'password' } })).toBe(true))
  it('sem claims: falta', () => expect(faltaSegundoFator({})).toBe(true))
  it('mfaDispensado true (só emulador): não falta', () => expect(faltaSegundoFator({ mfaDispensado: true })).toBe(false))
  it('mfaDispensado que não é true: falta', () => expect(faltaSegundoFator({ mfaDispensado: 'true' })).toBe(true))
})

describe('proximoVencimento (+1 mês, calendário de São Paulo)', () => {
  const pago = (data: string) => ts(fimDoDiaSaoPaulo(data))
  it('ainda em dia: soma 1 mês ao dia do pagoAte', () => {
    expect(proximoVencimento(pago('2026-10-20'), sp('2026-10-09T12:00'))).toBe('2026-11-20')
  })
  it('vence hoje ainda conta como em dia', () => {
    expect(proximoVencimento(pago('2026-10-10'), sp('2026-10-10T23:00'))).toBe('2026-11-10')
  })
  it('vencido ou sem pagoAte: soma 1 mês a hoje', () => {
    expect(proximoVencimento(pago('2026-09-01'), sp('2026-10-09T12:00'))).toBe('2026-11-09')
    expect(proximoVencimento(undefined, sp('2026-10-09T12:00'))).toBe('2026-11-09')
  })
  it('hoje é o dia de São Paulo, não o de UTC (23h = já é o dia seguinte em UTC)', () => {
    expect(proximoVencimento(undefined, sp('2026-10-09T23:30'))).toBe('2026-11-09')
  })
  it('prende ao último dia do mês', () => {
    expect(proximoVencimento(pago('2026-01-31'), sp('2026-01-10T12:00'))).toBe('2026-02-28')
    expect(proximoVencimento(pago('2028-01-31'), sp('2028-01-10T12:00'))).toBe('2028-02-29')
    expect(proximoVencimento(pago('2026-03-31'), sp('2026-03-10T12:00'))).toBe('2026-04-30')
  })
  it('vira o ano', () => {
    expect(proximoVencimento(pago('2026-12-15'), sp('2026-12-01T12:00'))).toBe('2027-01-15')
  })
})
