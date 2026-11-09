import { describe, expect, it } from 'vitest'
import type { Meso } from '../../../engine'
import { agruparTrocas, aplicarAdicao, aplicarProposta, aplicarTroca, copiarTreino, grupoTemCarga, nomeImportado, removerGrupo } from './util'

const meso = {
  frequencia: 3,
  semanas: 4,
  inicio: '2026-01-05',
  pausaS: 90,
  divisao: [
    [{ slotId: 'a1', nome: 'Agachamento', pausaS: 60 }, { slotId: 'a2', nome: 'Leg Press' }],
    [{ slotId: 'b1', nome: 'Supino' }],
    [],
  ],
  trocas: { '1-1-1': { slotId: 'x', nome: 'Troca' } },
  progressao: { principais: [], auxiliares: [] },
  metodos: [
    { treino: 1, id: 'm1' },
    { treino: 2, id: 'm2' },
  ],
  progressaoExercicio: { a1: [[10, 8]], b1: [[5]] },
} as unknown as Meso

describe('copiarTreino', () => {
  it('copia slots com ids novos, métodos e progressão; não mexe na origem nem nas trocas', () => {
    const r = copiarTreino(meso, 1, 2)
    expect(r.divisao[0]).toBe(meso.divisao[0])
    expect(r.divisao[1].map((s) => [s.nome, s.pausaS])).toEqual([['Agachamento', 60], ['Leg Press', undefined]])
    const ids = r.divisao[1].map((s) => s.slotId)
    expect(ids).not.toContain('a1')
    expect(new Set(ids).size).toBe(2)
    expect(r.metodos.filter((m) => m.treino === 2)).toEqual([{ treino: 2, id: 'm1' }])
    expect(r.metodos.filter((m) => m.treino === 1)).toHaveLength(1)
    expect(r.progressaoExercicio[ids[0]]).toEqual([[10, 8]])
    expect(r.progressaoExercicio[ids[0]]).not.toBe(meso.progressaoExercicio!.a1)
    expect(r.progressaoExercicio.a1).toEqual([[10, 8]])
    expect(r.progressaoExercicio.b1).toBeUndefined()
    expect(r.progressaoExercicio[ids[1]]).toBeUndefined()
  })
})

describe('nomeImportado', () => {
  it('usa o número da aba ou o próximo', () => {
    expect(nomeImportado('M7', 2)).toBe('Mesociclo 7')
    expect(nomeImportado('M (6)', 2)).toBe('Mesociclo 6')
    expect(nomeImportado('M 3', 2)).toBe('Mesociclo 3')
    expect(nomeImportado('Treino', 2)).toBe('Mesociclo 3')
  })
})

describe('trocas e adições em intervalo', () => {
  const base = { ...meso, trocas: {}, adicoes: {} } as unknown as Meso
  const s1 = { slotId: 'n1', nome: 'Hack' }
  const s2 = { slotId: 'n2', nome: 'Panturrilha' }

  it('troca em intervalo grava o mesmo slot em cada semana', () => {
    const trocas = aplicarTroca(base, 2, 1, 2, 4, s1)
    expect(Object.keys(trocas)).toEqual(['2-2-1', '3-2-1', '4-2-1'])
    expect(trocas['3-2-1']).toBe(s1)
    expect(base.trocas).toEqual({})
  })

  it('adição em intervalo mantém a ordem na mesma semana', () => {
    const a = aplicarAdicao(base, 1, 2, 3, s1)
    const b = aplicarAdicao({ ...base, adicoes: a } as Meso, 1, 3, 3, s2)
    expect(b['2-1']).toEqual([s1])
    expect(b['3-1']).toEqual([s1, s2])
    expect(a['3-1']).toEqual([s1])
  })

  it('agrupa semanas consecutivas e separa lacunas e slots diferentes', () => {
    const trocas = { ...aplicarTroca(base, 1, 2, 1, 2, s1), ...aplicarTroca(base, 1, 2, 4, 4, s1), '3-1-2': s2 }
    const adicoes = aplicarAdicao(base, 1, 2, 3, s2)
    const g = agruparTrocas({ ...base, trocas, adicoes } as Meso)
    expect(g.map((x) => [x.tipo, x.p, x.slot.slotId, x.de, x.ate])).toEqual([
      ['troca', 2, 'n1', 1, 2],
      ['troca', 2, 'n2', 3, 3],
      ['troca', 2, 'n1', 4, 4],
      ['adicao', 0, 'n2', 2, 3],
    ])
  })

  it('remover grupo limpa chaves vazias e preserva outras adições', () => {
    let adicoes = aplicarAdicao(base, 1, 1, 2, s1)
    adicoes = aplicarAdicao({ ...base, adicoes } as Meso, 1, 2, 2, s2)
    const m = { ...base, adicoes } as Meso
    const g = agruparTrocas(m).find((x) => x.slot.slotId === 'n1')!
    expect(removerGrupo(m, g).adicoes).toEqual({ '2-1': [s2] })
    const t = aplicarTroca(base, 1, 1, 1, 3, s1)
    const gt = agruparTrocas({ ...base, trocas: t } as Meso)[0]
    expect(removerGrupo({ ...base, trocas: t } as Meso, gt).trocas).toEqual({})
  })

  it('detecta carga registrada no grupo', () => {
    const g = { tipo: 'adicao' as const, t: 1, p: 0, slot: s1, de: 2, ate: 3 }
    expect(grupoTemCarga(g, { '3-1': { n1: [null, 50] } })).toBe(true)
    expect(grupoTemCarga(g, { '1-1': { n1: [50] }, '2-1': { n1: [null] } })).toBe(false)
  })
})

describe('aplicarProposta', () => {
  const prop = (treino: number, ...nomes: string[]) => ({ treino, exercicios: nomes.map((nome) => ({ nome })) })

  it('preenche treino vazio e substitui treino com exercícios (tirando métodos e progressão dele)', () => {
    const r = aplicarProposta(meso, {}, [prop(3, 'Remada', 'Rosca'), prop(2, 'Crucifixo')])
    expect(r.aplicados).toEqual([3, 2])
    expect(r.substituidos).toEqual([2])
    expect(r.patch.divisao![2].map((s) => s.nome)).toEqual(['Remada', 'Rosca'])
    expect(r.patch.divisao![1].map((s) => s.nome)).toEqual(['Crucifixo'])
    expect(r.patch.divisao![0]).toBe(meso.divisao[0])
    expect(new Set(r.patch.divisao![2].map((s) => s.slotId)).size).toBe(2)
    expect(r.patch.metodos!.map((m) => m.treino)).toEqual([1])
    expect(r.patch.progressaoExercicio).toEqual({ a1: [[10, 8]] })
  })

  it('não toca treino com carga registrada nem treino fora da frequência', () => {
    const registros = { '1-1': { a2: [50, null] } }
    const r = aplicarProposta(meso, registros, [prop(1, 'Novo'), prop(9, 'Fora'), prop(3, 'Ok')])
    expect(r.bloqueados).toEqual([1])
    expect(r.aplicados).toEqual([3])
    expect(r.patch.divisao![0]).toBe(meso.divisao[0])
    expect(r.patch.metodos!.map((m) => m.treino)).toEqual([1, 2])
  })

  it('apaga trocas e adições do treino aplicado (elas mandam mais que a divisão) e bloqueia adição com carga', () => {
    const m = {
      ...meso,
      trocas: { '1-3-1': { slotId: 'x', nome: 'Troca' }, '1-2-1': { slotId: 'y', nome: 'Outra' } },
      adicoes: { '2-3': [{ slotId: 'ad', nome: 'Extra' }], '2-2': [{ slotId: 'ad2', nome: 'Extra 2' }] },
    } as unknown as Meso
    const r = aplicarProposta(m, {}, [prop(3, 'Remada')])
    expect(Object.keys(r.patch.trocas!)).toEqual(['1-2-1'])
    expect(Object.keys(r.patch.adicoes!)).toEqual(['2-2'])
    const b = aplicarProposta(m, { '2-3': { ad: [20] } }, [prop(3, 'Remada')])
    expect(b.bloqueados).toEqual([3])
    expect(b.aplicados).toEqual([])
  })
})
