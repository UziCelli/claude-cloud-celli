import { describe, expect, it } from 'vitest'
import { linkEmail } from './contato'

describe('linkEmail', () => {
  it('codifica ?, & e + do e-mail', () => {
    const l = linkEmail('a+b&c?d@x.com', 'Oi', 'Texto')
    expect(l).toBe('mailto:a%2Bb%26c%3Fd%40x.com?subject=Oi&body=Texto')
  })
})
