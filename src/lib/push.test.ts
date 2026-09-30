import { describe, expect, it } from 'vitest'
import { b64uParaBytes, juntarUrl, mesmaChave } from './push'

describe('b64uParaBytes', () => {
  it('converte base64url (com - e _, sem =) em bytes', () => {
    expect([...b64uParaBytes('-_8')]).toEqual([251, 255])
    expect([...b64uParaBytes('AQID')]).toEqual([1, 2, 3])
    expect(b64uParaBytes('')).toHaveLength(0)
  })
})

describe('juntarUrl', () => {
  it('não duplica a barra', () => {
    expect(juntarUrl('https://x.workers.dev/', '/agendar')).toBe('https://x.workers.dev/agendar')
    expect(juntarUrl('https://x.workers.dev', '/vapid')).toBe('https://x.workers.dev/vapid')
  })
})

describe('mesmaChave', () => {
  const chave = 'AQID'
  it('reconhece a inscrição feita com a mesma chave', () => {
    expect(mesmaChave(new Uint8Array([1, 2, 3]).buffer, chave)).toBe(true)
  })
  it('rejeita chave diferente ou ausente', () => {
    expect(mesmaChave(new Uint8Array([1, 2, 4]).buffer, chave)).toBe(false)
    expect(mesmaChave(new Uint8Array([1, 2]).buffer, chave)).toBe(false)
    expect(mesmaChave(null, chave)).toBe(false)
  })
})
