import { describe, expect, it } from 'vitest'
import { deveRecarregar } from './atualizar'

describe('atualizar na tela de login', () => {
  it('recarrega só quando há versão diferente da que está rodando', () => {
    expect(deveRecarregar('2026-10-02 10:00', '2026-10-01 03:38', null)).toBe(true)
    expect(deveRecarregar('2026-10-01 03:38', '2026-10-01 03:38', null)).toBe(false)
    expect(deveRecarregar(null, '2026-10-01 03:38', null)).toBe(false)
  })
  it('não entra em laço: tenta cada versão uma vez só', () => {
    expect(deveRecarregar('2026-10-02 10:00', '2026-10-01 03:38', '2026-10-02 10:00')).toBe(false)
  })
})
