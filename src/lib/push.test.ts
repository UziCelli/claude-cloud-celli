import { describe, expect, it } from 'vitest'
import { b64uParaBytes, juntarUrl, mesmaChave, precisaInscrever } from './push'

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

describe('precisaInscrever', () => {
  const agora = 10 * 24 * 3600 * 1000
  it('envia na primeira vez ou com dado inválido', () => {
    expect(precisaInscrever(null, 'u', 'e', agora)).toBe(true)
    expect(precisaInscrever(['u', 'e'], 'u', 'e', agora)).toBe(true)
  })
  it('não repete dentro de 7 dias com mesmo uid e endpoint', () => {
    expect(precisaInscrever(['u', 'e', agora - 1000], 'u', 'e', agora)).toBe(false)
  })
  it('reenvia se mudou uid, endpoint ou passou 7 dias', () => {
    expect(precisaInscrever(['u', 'e', agora - 1000], 'v', 'e', agora)).toBe(true)
    expect(precisaInscrever(['u', 'e', agora - 1000], 'u', 'f', agora)).toBe(true)
    expect(precisaInscrever(['u', 'e', agora - 7 * 24 * 3600 * 1000], 'u', 'e', agora)).toBe(true)
  })
})
