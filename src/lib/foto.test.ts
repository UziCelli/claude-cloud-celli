import { describe, expect, it } from 'vitest'
import { recorteCover } from './foto'

describe('recorteCover', () => {
  it('horizontal para 9:16 corta dos lados', () => {
    expect(recorteCover(4000, 3000, 1080, 1920)).toEqual({ sx: 1156.25, sy: 0, sw: 1687.5, sh: 3000 })
  })
  it('vertical para 9:16 corta em cima e embaixo', () => {
    expect(recorteCover(900, 2000, 1080, 1920)).toEqual({ sx: 0, sy: 200, sw: 900, sh: 1600 })
  })
  it('quadrada para 1:1 usa tudo', () => {
    expect(recorteCover(500, 500, 192, 192)).toEqual({ sx: 0, sy: 0, sw: 500, sh: 500 })
  })
  it('horizontal para 1:1 é o quadrado central', () => {
    expect(recorteCover(400, 300, 192, 192)).toEqual({ sx: 50, sy: 0, sw: 300, sh: 300 })
  })
  it('vertical para 1:1 é o quadrado central', () => {
    expect(recorteCover(300, 400, 192, 192)).toEqual({ sx: 0, sy: 50, sw: 300, sh: 300 })
  })
})
