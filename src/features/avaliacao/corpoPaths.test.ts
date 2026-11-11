import { describe, expect, it } from 'vitest'
import { SEGMENTOS } from '../../lib/segmentos'
import { FORMAS, formaDe, rotuloCorpo } from './corpoPaths'

const SO_FRENTE = ['peito', 'abdomen']
const SO_COSTAS = ['costas']

describe('corpoPaths', () => {
  it('todo segmento tem forma na vista certa', () => {
    for (const { id } of SEGMENTOS) {
      expect(!!FORMAS[id].frente, `${id} frente`).toBe(!SO_COSTAS.includes(id))
      expect(!!FORMAS[id].costas, `${id} costas`).toBe(!SO_FRENTE.includes(id))
    }
  })
  it('costas ficam na metade direita do desenho (x 100 a 200)', () => {
    const xs = [...(formaDe('coxas', 'costas') ?? '').matchAll(/(-?[\d.]+) -?[\d.]+/g)].map((m) => +m[1])
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(100)
    expect(Math.max(...xs)).toBeLessThanOrEqual(200)
  })
  it('aria-label em português', () => {
    const p = (id: 'coxas' | 'bracos' | 'ombros' | 'peito', rotulo: string, veredito: 'melhorou' | 'observar' | 'estavel') => ({ id, rotulo, veredito })
    expect(rotuloCorpo([p('coxas', 'Coxas', 'melhorou'), p('bracos', 'Braços', 'melhorou'), p('ombros', 'Ombros', 'observar')])).toBe('Melhoraram: coxas e braços. A observar: ombros.')
    expect(rotuloCorpo([p('peito', 'Peito', 'estavel')])).toBe('Sem partes em destaque')
    expect(rotuloCorpo([p('coxas', 'Coxas', 'observar')])).toBe('A observar: coxas.')
    expect(rotuloCorpo([p('coxas', 'Coxas', 'melhorou')])).toBe('Melhorou: coxas.')
  })
})
