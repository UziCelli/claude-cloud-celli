import { describe, expect, it } from 'vitest'
import { dataDaNota, msDaNota } from './notas'

const DIA = 86_400_000
// 12/11/2026 15:00 em São Paulo
const AGORA = Date.UTC(2026, 10, 12, 18, 0)

describe('dataDaNota', () => {
  it('sem data (anotação antiga)', () => {
    expect(dataDaNota(undefined, AGORA)).toBe('sem data')
  })

  it('hoje, ontem e dias', () => {
    expect(dataDaNota(AGORA - 3_600_000, AGORA)).toBe('12/11 · hoje')
    expect(dataDaNota(AGORA - DIA, AGORA)).toBe('11/11 · ontem')
    expect(dataDaNota(AGORA - 5 * DIA, AGORA)).toBe('07/11 · há 5 dias')
  })

  it('semanas e meses', () => {
    expect(dataDaNota(AGORA - 14 * DIA, AGORA)).toBe('29/10 · há 2 semanas')
    expect(dataDaNota(AGORA - 7 * DIA, AGORA)).toBe('05/11 · há 1 semana')
    expect(dataDaNota(AGORA - 40 * DIA, AGORA)).toBe('03/10 · há 1 mês')
    expect(dataDaNota(AGORA - 100 * DIA, AGORA)).toBe('04/08 · há 3 meses')
  })

  it('mais de um ano mostra o ano', () => {
    expect(dataDaNota(AGORA - 400 * DIA, AGORA)).toBe('08/10/2025 · há 13 meses')
  })

  it('vira o dia pelo horário de São Paulo (23h de ontem é ontem)', () => {
    const ontem23h = Date.UTC(2026, 10, 12, 2, 0) // 11/11 23:00 em SP
    expect(dataDaNota(ontem23h, AGORA)).toBe('11/11 · ontem')
  })
})

describe('msDaNota', () => {
  it('antiga, pendente (offline) e gravada', () => {
    expect(msDaNota(undefined, AGORA)).toBeUndefined()
    expect(msDaNota(null, AGORA)).toBe(AGORA)
    expect(msDaNota({ toMillis: () => 5 }, AGORA)).toBe(5)
  })
})
