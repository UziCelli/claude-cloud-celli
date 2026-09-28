import { describe, expect, it } from 'vitest'
import { metaCiclo, metaRobusta } from './meta'

describe('metaRobusta', () => {
  it('valores constantes → o próprio valor', () => {
    // med 216, mad 0, avg 216, sl 0 → raw 216
    expect(metaRobusta([216, 216, 216, 216])).toBeCloseTo(216, 9)
  })

  it('tendência sem outlier nem clamp', () => {
    // med 106; |y−med| = [6,2,2,6] → mad 4; [96,116] não corta nada
    // avg 106; sl = Σ(x−2.5)(w−106)/5 = (9+1+1+9)/5 = 4; raw = 112 + 4 = 116 ∈ [90.1, 121.9]
    expect(metaRobusta([100, 104, 108, 112])).toBeCloseTo(116, 9)
  })

  it('winsoriza outlier baixo', () => {
    // med 99; |y−med| = [1,3,1,89] → mad 2; lo 94, hi 104 → w = [100,102,98,94]
    // avg 98.5; sl = (−2.25 −1.75 −0.25 −6.75)/5 = −2.2; raw = 94 − 2.2 = 91.8 ∈ [83.725, 113.275]
    expect(metaRobusta([100, 102, 98, 10])).toBeCloseTo(91.8, 9)
  })

  it('winsoriza outlier alto e limita a +15% da média', () => {
    // med 107.5; |y−med| = [7.5,2.5,2.5,292.5] → mad 5; lo 95, hi 120 → w = [100,110,105,120]
    // avg 108.75; sl = 27.5/5 = 5.5; raw = 125.5 > 108.75·1.15 = 125.0625
    expect(metaRobusta([100, 110, 105, 400])).toBeCloseTo(125.0625, 9)
  })

  it('MAD = 0 não winsoriza; limita a −15% da média', () => {
    // med 100; |y−med| = [0,0,40] → mad 0 → w = y; avg 260/3
    // sl = (−1·13.33 + 0 + 1·(−26.67))/2 = −20; raw = 60 − 20 = 40 < avg·0.85
    expect(metaRobusta([100, 100, 60])).toBeCloseTo((260 / 3) * 0.85, 9)
  })

  it('n < 3 não usa inclinação', () => {
    // med 110, mad 10 → [85,135]; avg 110; sl 0 → raw 120 (com inclinação 20 daria 126.5)
    expect(metaRobusta([100, 120])).toBeCloseTo(120, 9)
    expect(metaRobusta([50])).toBeCloseTo(50, 9)
  })

  it('usa só valores numéricos; sem dados → null', () => {
    expect(metaRobusta([100, null, 120])).toBeCloseTo(120, 9)
    expect(metaRobusta([])).toBeNull()
    expect(metaRobusta([null, null])).toBeNull()
  })
})

describe('metaCiclo', () => {
  it('[CORRIGIDO] multiplica pelas semanas do meso (não por 12)', () => {
    expect(metaCiclo(216, 4)).toBe(864)
    expect(metaCiclo(10, 6)).toBe(60)
    expect(metaCiclo(null, 4)).toBeNull()
  })
})
