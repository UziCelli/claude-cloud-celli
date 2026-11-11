import { describe, expect, it } from 'vitest'
import { SEGMENTOS } from '../../lib/segmentos'
import { REGIOES, rotuloCorpo, SILHUETA, TAMANHO } from './corpoPaths'

const SO_FRENTE = ['peito', 'abdomen']
const SO_COSTAS = ['costas']

const pontos = (d: string) => [...d.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((m) => [+m[1], +m[2]])

describe('corpoPaths', () => {
  it('todo segmento tem região na vista certa', () => {
    for (const { id } of SEGMENTOS) {
      expect(!!REGIOES[id].frente, `${id} frente`).toBe(!SO_COSTAS.includes(id))
      expect(!!REGIOES[id].costas, `${id} costas`).toBe(!SO_FRENTE.includes(id))
    }
  })
  it('polígonos e silhueta ficam dentro do PNG, com 3+ pontos', () => {
    const caminhos = [...Object.values(SILHUETA), ...Object.values(REGIOES).flatMap((r) => [r.frente, r.costas])].filter(Boolean) as string[]
    for (const d of caminhos) {
      for (const sub of d.split('M').filter(Boolean)) expect(pontos(sub).length).toBeGreaterThanOrEqual(3)
      for (const [x, y] of pontos(d)) {
        expect(x).toBeGreaterThanOrEqual(0)
        expect(x).toBeLessThanOrEqual(TAMANHO.w)
        expect(y).toBeGreaterThanOrEqual(0)
        expect(y).toBeLessThanOrEqual(TAMANHO.h)
      }
    }
  })
  it('lado esquerdo é o espelho do direito e o centro de cada polígono cai na silhueta', () => {
    const dentro = (x: number, y: number, v: number[][]) =>
      v.reduce((In, [xi, yi], i) => {
        const [xj, yj] = v[(i + v.length - 1) % v.length]
        return yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi ? !In : In
      }, false)
    for (const vista of ['frente', 'costas'] as const) {
      const sil = pontos(SILHUETA[vista])
      for (const [id, r] of Object.entries(REGIOES)) {
        const d = r[vista]
        if (!d) continue
        const [a, b, ...resto] = d.split('M').filter(Boolean).map(pontos)
        expect(resto, `${id} ${vista}`).toHaveLength(0)
        const esp = (p: number[][]) => p.map(([x, y]) => `${TAMANHO.w - x},${y}`).sort()
        expect(esp(a), `${id} ${vista} espelho`).toEqual(b.map(([x, y]) => `${x},${y}`).sort())
        for (const p of [a, b]) expect(dentro(p.reduce((t, q) => t + q[0], 0) / p.length, p.reduce((t, q) => t + q[1], 0) / p.length, sil), `${id} ${vista} centro`).toBe(true)
      }
    }
  })
  it('aria-label em português', () => {
    const p = (id: 'coxas' | 'bracos' | 'ombros' | 'peito', rotulo: string, veredito: 'melhorou' | 'observar' | 'estavel') => ({ id, rotulo, veredito })
    expect(rotuloCorpo([p('coxas', 'Coxas', 'melhorou'), p('bracos', 'Braços', 'melhorou'), p('ombros', 'Ombros', 'observar')])).toBe('Melhoraram: coxas e braços. A observar: ombros.')
    expect(rotuloCorpo([p('peito', 'Peito', 'estavel')])).toBe('Sem partes em destaque')
    expect(rotuloCorpo([p('coxas', 'Coxas', 'observar')])).toBe('A observar: coxas.')
    expect(rotuloCorpo([p('coxas', 'Coxas', 'melhorou')])).toBe('Melhorou: coxas.')
  })
})
