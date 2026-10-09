import { describe, expect, it } from 'vitest'
import { quando } from './mesoAtual'

describe('quando', () => {
  it('dia seguinte = Amanhã', () => expect(quando('2026-10-10', '2026-10-09')).toBe('Amanhã'))
  it('virada de mês também é Amanhã', () => expect(quando('2026-11-01', '2026-10-31')).toBe('Amanhã'))
  it('mais longe: dia da semana e número', () => expect(quando('2026-10-14', '2026-10-09')).toBe('Qua, 14'))
})
