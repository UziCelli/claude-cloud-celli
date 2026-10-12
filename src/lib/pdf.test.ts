import { describe, expect, it } from 'vitest'
import { montarPdf } from './pdf'

const latin1 = (u: Uint8Array) => Array.from(u, (b) => String.fromCharCode(b)).join('')

describe('montarPdf', () => {
  const jpegs = [new Uint8Array([0xff, 0xd8, 1, 2, 3, 0xff, 0xd9]), new Uint8Array([0xff, 0xd8, 9, 0xff, 0xd9])]
  it('gera cabeçalho, xref com offsets exatos e /Length do JPEG', async () => {
    const buf = new Uint8Array(await montarPdf(jpegs, 1240, 1754).arrayBuffer())
    const t = latin1(buf)
    expect(t.startsWith('%PDF-1.4\n%')).toBe(true)
    expect(t.endsWith('%%EOF\n')).toBe(true)
    const sx = Number(/startxref\n(\d+)\n/.exec(t)![1])
    expect(t.slice(sx, sx + 4)).toBe('xref')
    const linhas = t.slice(sx).split('\n')
    const total = Number(linhas[1].split(' ')[1])
    expect(total).toBe(3 + 3 * jpegs.length)
    for (let k = 1; k < total; k++) {
      const l = linhas[2 + k] + '\n'
      expect(l.length).toBe(20)
      const off = Number(l.slice(0, 10))
      expect(t.slice(off).startsWith(`${k} 0 obj`)).toBe(true)
    }
    expect(t.match(/\/Type \/Page /g)).toHaveLength(2)
    expect(t).toContain('/Count 2')
    const cont = 'q 595.28 0 0 841.89 0 0 cm /Im0 Do Q'.length
    expect([...t.matchAll(/\/Length (\d+) >>\nstream/g)].map((m) => Number(m[1]))).toEqual([cont, jpegs[0].length, cont, jpegs[1].length])
  })
})
