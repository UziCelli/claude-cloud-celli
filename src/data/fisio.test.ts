import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { METODOS_FISIO, QUEIXAS, REGRAS_FISIO } from './fisio'

const pesquisa = readFileSync('docs/fisio-pesquisa.md', 'utf8')
const todos = [...METODOS_FISIO, ...REGRAS_FISIO]

describe('métodos Fisioterapia', () => {
  it('25 métodos (M01–M25) e 8 regras (R1–R8), em ordem e sem repetir', () => {
    expect(METODOS_FISIO.map((m) => m.id)).toEqual(Array.from({ length: 25 }, (_, i) => `M${String(i + 1).padStart(2, '0')}`))
    expect(REGRAS_FISIO.map((r) => r.id)).toEqual(['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8'])
  })

  it('toda queixa existe e tem método; todo método tem queixa e protocolo', () => {
    const ids = QUEIXAS.map((q) => q.id) as string[]
    for (const m of METODOS_FISIO) {
      expect(m.queixas.length, m.id).toBeGreaterThan(0)
      expect(m.protocolo.length, m.id).toBeGreaterThan(0)
      for (const q of m.queixas) expect(ids, m.id).toContain(q)
    }
    for (const q of ids) expect(METODOS_FISIO.some((m) => (m.queixas as string[]).includes(q)), q).toBe(true)
  })

  it('toda referência é um PMID que está na pesquisa (nada inventado)', () => {
    for (const t of todos) for (const r of t.refs) {
      expect(r.pmid, t.id).toMatch(/^\d{7,9}$/)
      expect(pesquisa.includes(r.pmid), `${t.id}: ${r.pmid}`).toBe(true)
    }
  })

  it('sem carga absoluta (kg) e sem "trata"/"cura"', () => {
    const texto = JSON.stringify(todos)
    expect(texto).not.toMatch(/\d\s*kg\b|\bkg\b/i)
    expect(texto).not.toMatch(/\b(trata|tratar|cura|curar)\b/i)
  })
})
