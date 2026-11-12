import { describe, expect, it } from 'vitest'
import { mesoParaDoc } from '../../lib/conversores'
import type { MesoSalvo } from '../../lib/conversores'
import { mesoPadrao } from '../coach/meso/mesoPadrao'
import { mesoAtual, proximoMeso, quando } from './mesoAtual'

const hoje = new Date('2026-11-12T15:00:00Z')
// Meso de 4 semanas começando em `inicio`.
const mk = (id: string, inicio: string) => ({ id, nome: id, alunoId: 'a', ...mesoParaDoc({ ...mesoPadrao(), inicio }) }) as MesoSalvo & { id: string }

describe('mesoAtual', () => {
  it('atual durante + próximo futuro → atual', () => {
    const r = mesoAtual([mk('prox', '2026-12-01'), mk('atual', '2026-11-02')], hoje)
    expect(r?.doc.id).toBe('atual')
    expect(r?.estado.estado).toBe('durante')
  })
  it('atual terminado + próximo futuro → próximo (antes)', () => {
    const r = mesoAtual([mk('velho', '2026-09-01'), mk('prox', '2026-12-01')], hoje)
    expect(r?.doc.id).toBe('prox')
    expect(r?.estado.estado).toBe('antes')
  })
  it('dois durante → inicio mais recente', () => {
    const r = mesoAtual([mk('a', '2026-11-02'), mk('b', '2026-11-10')], hoje)
    expect(r?.doc.id).toBe('b')
  })
})

describe('proximoMeso', () => {
  it('o futuro mais próximo', () => {
    const r = proximoMeso([mk('longe', '2027-01-01'), mk('perto', '2026-12-01'), mk('atual', '2026-11-02')], hoje)
    expect(r?.id).toBe('perto')
  })
  it('sem futuro → null', () => expect(proximoMeso([mk('atual', '2026-11-02')], hoje)).toBeNull())
})

describe('quando', () => {
  it('dia seguinte = Amanhã', () => expect(quando('2026-10-10', '2026-10-09')).toBe('Amanhã'))
  it('virada de mês também é Amanhã', () => expect(quando('2026-11-01', '2026-10-31')).toBe('Amanhã'))
  it('mais longe: dia da semana e número', () => expect(quando('2026-10-14', '2026-10-09')).toBe('Qua, 14'))
})
