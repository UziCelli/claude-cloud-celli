import { describe, expect, it } from 'vitest'
import { codigoPix, crc16 } from './pix'

// Lê o código como TLV (ID de 2 dígitos + tamanho de 2 dígitos + valor).
function tlv(s: string) {
  const campos: Record<string, string> = {}
  for (let i = 0; i < s.length; ) {
    const id = s.slice(i, i + 2)
    const n = Number(s.slice(i + 2, i + 4))
    expect(s.slice(i + 2, i + 4)).toMatch(/^\d{2}$/)
    campos[id] = s.slice(i + 4, i + 4 + n)
    i += 4 + n
  }
  return campos
}

const base = { chave: '123e4567-e89b-12d3-a456-426614174000', nome: 'Victor Celli', cidade: 'São Paulo' }

describe('crc16 (CCITT-FALSE)', () => {
  it('exemplo conhecido: "123456789" = 29B1', () => expect(crc16('123456789')).toBe('29B1'))
})

describe('codigoPix', () => {
  it('estrutura TLV com os campos do BR Code estático', () => {
    const c = tlv(codigoPix({ ...base, valor: 150 }))
    expect(c['00']).toBe('01')
    expect(tlv(c['26'])).toEqual({ '00': 'br.gov.bcb.pix', '01': base.chave })
    expect(c['52']).toBe('0000')
    expect(c['53']).toBe('986')
    expect(c['54']).toBe('150.00')
    expect(c['58']).toBe('BR')
    expect(c['59']).toBe('VICTOR CELLI')
    expect(c['60']).toBe('SAO PAULO')
    expect(tlv(c['62'])).toEqual({ '05': '***' })
    expect(c['63']).toMatch(/^[0-9A-F]{4}$/)
  })

  it('o CRC vale para tudo até o "6304"', () => {
    const s = codigoPix({ ...base, valor: 99.9 })
    expect(s.slice(-8, -4)).toBe('6304')
    expect(s.slice(-4)).toBe(crc16(s.slice(0, -4)))
  })

  it('valor com 2 casas e ponto; omitido se vazio, zero ou negativo', () => {
    expect(tlv(codigoPix({ ...base, valor: 99.9 }))['54']).toBe('99.90')
    expect(tlv(codigoPix({ ...base, valor: 1234.5 }))['54']).toBe('1234.50')
    for (const valor of [undefined, 0, -5]) expect('54' in tlv(codigoPix({ ...base, valor }))).toBe(false)
  })

  it('nome até 25 e cidade até 15, sem acento e em maiúsculas', () => {
    const c = tlv(codigoPix({ ...base, nome: 'José da Conceição Albuquerque Júnior', cidade: 'São José do Rio Preto' }))
    expect(c['59']).toBe('JOSE DA CONCEICAO ALBUQUE')
    expect(c['59']).toHaveLength(25)
    expect(c['60']).toBe('SAO JOSE DO RIO')
    expect(c['60']).toHaveLength(15)
  })

  it('chave: CNPJ e CPF com pontuação ficam só com dígitos', () => {
    expect(tlv(tlv(codigoPix({ ...base, chave: '12.345.678/0001-95' }))['26'])['01']).toBe('12345678000195')
    expect(tlv(tlv(codigoPix({ ...base, chave: '123.456.789-09' }))['26'])['01']).toBe('12345678909')
  })

  it('chave: e-mail, telefone (+55) e aleatória ficam como estão', () => {
    for (const chave of ['victor@exemplo.com', '+5511999998888', base.chave]) {
      expect(tlv(tlv(codigoPix({ ...base, chave }))['26'])['01']).toBe(chave)
    }
  })
})
