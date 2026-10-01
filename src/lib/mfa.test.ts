import { describe, expect, it } from 'vitest'
import { chaveManual, codigoCompleto, limparCodigo, mensagemMfa, qrDataUrl } from './mfa'

describe('2 etapas: partes puras', () => {
  it('limparCodigo deixa só dígitos, no máximo 6', () => {
    expect(limparCodigo('12a 34-56789')).toBe('123456')
    expect(limparCodigo('')).toBe('')
  })
  it('codigoCompleto exige 6 dígitos', () => {
    expect(codigoCompleto('123456')).toBe(true)
    expect(codigoCompleto('12345')).toBe(false)
  })
  it('mensagemMfa: códigos conhecidos e padrão', () => {
    expect(mensagemMfa('auth/invalid-verification-code')).toMatch(/incorreto/i)
    expect(mensagemMfa('auth/code-expired')).toMatch(/expirou|tente/i)
    expect(mensagemMfa('auth/operation-not-allowed')).toContain("workflow '2 etapas do coach'")
    expect(mensagemMfa('auth/network-request-failed')).toMatch(/internet/i)
    expect(mensagemMfa('outro')).toMatch(/tente de novo/i)
    expect(mensagemMfa(undefined)).toMatch(/tente de novo/i)
    expect(mensagemMfa('outro')).toContain('(outro)')
    expect(mensagemMfa('auth/unverified-email')).toMatch(/confirme seu e-mail/i)
    expect(mensagemMfa('auth/quota-exceeded')).toMatch(/entre de novo/i)
  })
  it('qrDataUrl gera um SVG em data URL', () => {
    const url = qrDataUrl('otpauth://totp/VFITCOACH:a@b.com?secret=ABC&issuer=VFITCOACH')
    expect(url.startsWith('data:image/svg+xml')).toBe(true)
    expect(decodeURIComponent(url)).toContain('<svg')
  })
  it('chaveManual agrupa a chave de 4 em 4', () => {
    expect(chaveManual('ABCDEFGHIJ')).toBe('ABCD EFGH IJ')
  })
})
