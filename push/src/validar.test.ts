import { describe, expect, it } from 'vitest'
import { b64u } from './b64'
import { validarFimEm, validarInscricao } from './validar'

const p256dh = b64u(new Uint8Array([4, ...new Array(64).fill(7)]))
const auth = b64u(new Uint8Array(16).fill(9))
const boa = { endpoint: 'https://fcm.googleapis.com/fcm/send/abc', keys: { p256dh, auth } }

describe('validarInscricao', () => {
  it('aceita inscrição de serviços de push conhecidos', () => {
    expect(validarInscricao(boa)).not.toBeNull()
    for (const e of [
      'https://web.push.apple.com/QAbc',
      'https://updates.push.services.mozilla.com/wpush/v2/xyz',
      'https://wns2-par02p.notify.windows.com/w/?token=1',
    ])
      expect(validarInscricao({ ...boa, endpoint: e })).not.toBeNull()
  })
  it('rejeita endpoint que não é https ou não é de serviço de push', () => {
    for (const e of [
      'http://fcm.googleapis.com/x',
      'https://exemplo.com/x',
      'https://evil.com/fcm.googleapis.com',
      'https://fcm.googleapis.com.evil.com/x',
      'https://user:pw@fcm.googleapis.com/x',
      'lixo',
      '',
    ])
      expect(validarInscricao({ ...boa, endpoint: e })).toBeNull()
  })
  it('rejeita chaves com tamanho errado', () => {
    expect(validarInscricao({ ...boa, keys: { p256dh: b64u(new Uint8Array(65)), auth } })).toBeNull() // não começa com 0x04
    expect(validarInscricao({ ...boa, keys: { p256dh, auth: b64u(new Uint8Array(8)) } })).toBeNull()
    expect(validarInscricao({ ...boa, keys: { p256dh: 'não-base64!', auth } })).toBeNull()
  })
  it('rejeita formato inválido', () => {
    for (const s of [null, undefined, 1, 'x', {}, { endpoint: boa.endpoint }, { endpoint: 1, keys: boa.keys }]) expect(validarInscricao(s)).toBeNull()
  })
  it('devolve só os campos necessários', () => {
    expect(validarInscricao({ ...boa, extra: 'x' })).toEqual({ endpoint: boa.endpoint, keys: { p256dh, auth } })
  })
})

describe('validarFimEm', () => {
  const agora = 1_800_000_000_000
  it('aceita entre agora+1 s e agora+15 min', () => {
    expect(validarFimEm(agora + 1000, agora)).toBe(true)
    expect(validarFimEm(agora + 15 * 60_000, agora)).toBe(true)
  })
  it('rejeita fora da janela ou não numérico', () => {
    expect(validarFimEm(agora + 999, agora)).toBe(false)
    expect(validarFimEm(agora + 15 * 60_000 + 1, agora)).toBe(false)
    expect(validarFimEm(agora - 5000, agora)).toBe(false)
    for (const v of ['1', null, undefined, NaN, Infinity]) expect(validarFimEm(v, agora)).toBe(false)
  })
})
