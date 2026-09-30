import { describe, expect, it } from 'vitest'
import { seriesDestacadas, seriesDoRotulo } from './metodoSeries'

describe('seriesDoRotulo', () => {
  it('todas', () => expect(seriesDoRotulo('Biset [todas]', 3)).toEqual([1, 2, 3]))
  it('últimas k', () => expect(seriesDoRotulo('Dropset [últimas 2]', 3)).toEqual([2, 3]))
  it('últimas k maior que n', () => expect(seriesDoRotulo('Dropset [últimas 5]', 3)).toEqual([1, 2, 3]))
  it('primeiras k', () => expect(seriesDoRotulo('Rest-pause [primeiras 2]', 4)).toEqual([1, 2]))
  it('série específica', () => {
    expect(seriesDoRotulo('Dropset [S4]', 4)).toEqual([4])
    expect(seriesDoRotulo('Dropset [S5]', 4)).toEqual([])
  })
  it('desconhecido', () => {
    expect(seriesDoRotulo('Dropset [xyz]', 3)).toEqual([])
    expect(seriesDoRotulo('Dropset', 3)).toEqual([])
  })
  it('junta várias partes', () => expect([...seriesDestacadas('Dropset [S1]; Biset [últimas 2]', 3)]).toEqual([1, 2, 3]))
})
