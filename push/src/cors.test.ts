import { describe, expect, it } from 'vitest'
import { ORIGENS, cors } from './cors'

describe('cors', () => {
  it('só as origens de produção das duas marcas, sem localhost', () => {
    expect(ORIGENS).toEqual([
      'https://app.vfitcoachapp.com',
      'https://forca--app.web.app',
      'https://app.gislanepersonaltrainer.com',
      'https://gislane-personal-trainer.web.app',
    ])
    expect(ORIGENS.join(' ')).not.toMatch(/localhost|127\.0\.0\.1/)
  })
  it('libera origem de produção', () => {
    expect(cors('https://app.vfitcoachapp.com')['Access-Control-Allow-Origin']).toBe('https://app.vfitcoachapp.com')
  })
  it('libera as origens da Gislane', () => {
    for (const o of ['https://app.gislanepersonaltrainer.com', 'https://gislane-personal-trainer.web.app'])
      expect(cors(o)['Access-Control-Allow-Origin']).toBe(o)
  })
  it('não libera localhost nem origem ausente', () => {
    expect(cors('http://localhost:5173')['Access-Control-Allow-Origin']).toBeUndefined()
    expect(cors('http://localhost:4173')['Access-Control-Allow-Origin']).toBeUndefined()
    expect(cors(null)['Access-Control-Allow-Origin']).toBeUndefined()
  })
})
