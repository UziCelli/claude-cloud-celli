import { describe, expect, it } from 'vitest'
import { qrDataUrl } from './qr'

describe('qrDataUrl', () => {
  it('gera um SVG em data URL', () => {
    const url = qrDataUrl('otpauth://totp/VFITCOACH:a@b.com?secret=ABC&issuer=VFITCOACH')
    expect(url.startsWith('data:image/svg+xml')).toBe(true)
    expect(decodeURIComponent(url)).toContain('<svg')
  })
})
