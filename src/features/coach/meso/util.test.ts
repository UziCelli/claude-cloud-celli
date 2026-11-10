import { describe, expect, it } from 'vitest'
import type { Meso } from '../../../engine'
import { agruparTrocas, aplicarAcoes, aplicarAdicao, aplicarTroca, copiarTreino, grupoTemCarga, nomeImportado, posicoesAdicionadas, removerGrupo, trocarExercicio } from './util'

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

describe('aplicarAcoes', () => {
  const ex = (...nomes: string[]) => nomes.map((nome) => ({ nome, noCatalogo: true }))
  const reg = { '1-1': { a2: [50, null] } } // carga no 2º exercício do treino 1, semana 1

  it('adicionar vai para o fim, mantém slotId, métodos e progressão, e não repete exercício', () => {
    const r = aplicarAcoes(meso, {}, [{ tipo: 'adicionar', treino: 1, exercicios: ex('Remada', 'leg press') }])
    expect(r.patch.divisao![0].map((s) => s.nome)).toEqual(['Agachamento', 'Leg Press', 'Remada'])
    expect(r.patch.divisao![0].slice(0, 2)).toEqual(meso.divisao[0])
    expect(r.patch.metodos).toBe(meso.metodos)
    expect(r.patch.progressaoExercicio).toEqual(meso.progressaoExercicio)
    expect(r.aplicados).toEqual(['Treino 1: +1'])
  })

  it('adicionar funciona mesmo com carga registrada (nada muda de posição) e para no limite de 10', () => {
    expect(aplicarAcoes(meso, reg, [{ tipo: 'adicionar', treino: 1, exercicios: ex('Remada') }]).aplicados).toEqual(['Treino 1: +1'])
    const cheio = { ...meso, divisao: [Array.from({ length: 10 }, (_, i) => ({ slotId: `s${i}`, nome: `E${i}` })), [], []] } as unknown as Meso
    const r = aplicarAcoes(cheio, {}, [{ tipo: 'adicionar', treino: 1, exercicios: ex('Novo') }])
    expect(r.aplicados).toEqual([])
    expect(r.bloqueios).toHaveLength(1)
  })

  it('substituir troca só aquela posição e as semanas com carga continuam com o exercício antigo', () => {
    const r = aplicarAcoes(meso, reg, [{ tipo: 'substituir', treino: 1, pos: 2, de: 'Leg Press', por: { nome: 'Hack', noCatalogo: true } }])
    expect(r.patch.divisao![0].map((s) => s.nome)).toEqual(['Agachamento', 'Hack'])
    expect(r.patch.divisao![0][0]).toBe(meso.divisao[0][0])
    expect(r.patch.trocas!['1-1-2']).toEqual({ slotId: 'a2', nome: 'Leg Press' })
    expect(r.patch.trocas!['1-1-1']).toEqual(meso.trocas!['1-1-1'])
  })

  it('substituir cuja posição já não tem aquele exercício não faz nada', () => {
    const r = aplicarAcoes(meso, {}, [{ tipo: 'substituir', treino: 1, pos: 2, de: 'Outro', por: { nome: 'Hack', noCatalogo: true } }])
    expect(r.aplicados).toEqual([])
    expect(r.bloqueios).toHaveLength(1)
  })

  it('definir refaz treino vazio ou sem carga (tirando métodos, progressão, trocas e adições dele)', () => {
    const m = {
      ...meso,
      trocas: { '1-3-1': { slotId: 'x', nome: 'Troca' }, '1-2-1': { slotId: 'y', nome: 'Outra' }, '1-1-2': { slotId: 'z', nome: 'Fica' } },
      adicoes: { '2-3': [{ slotId: 'ad', nome: 'Extra' }], '2-1': [{ slotId: 'ad2', nome: 'Extra 2' }] },
    } as unknown as Meso
    const r = aplicarAcoes(m, {}, [
      { tipo: 'definir', treino: 3, exercicios: ex('Remada', 'Rosca') },
      { tipo: 'definir', treino: 2, exercicios: ex('Crucifixo') },
    ])
    expect(r.aplicados).toHaveLength(2)
    expect(r.refeitos).toEqual([2])
    expect(r.patch.divisao![2].map((s) => s.nome)).toEqual(['Remada', 'Rosca'])
    expect(r.patch.divisao![1].map((s) => s.nome)).toEqual(['Crucifixo'])
    expect(r.patch.divisao![0]).toBe(meso.divisao[0])
    expect(r.patch.metodos!.map((x) => x.treino)).toEqual([1])
    expect(r.patch.progressaoExercicio).toEqual({ a1: [[10, 8]] })
    expect(Object.keys(r.patch.trocas!)).toEqual(['1-1-2'])
    expect(Object.keys(r.patch.adicoes!)).toEqual(['2-1'])
  })

  it('definir nunca refaz treino com carga registrada (na divisão ou em adição)', () => {
    const r = aplicarAcoes(meso, reg, [{ tipo: 'definir', treino: 1, exercicios: ex('Novo') }])
    expect(r.bloqueios).toHaveLength(1)
    expect(r.patch.divisao![0]).toBe(meso.divisao[0])
    const m = { ...meso, adicoes: { '2-3': [{ slotId: 'ad', nome: 'Extra' }] } } as unknown as Meso
    expect(aplicarAcoes(m, { '2-3': { ad: [20] } }, [{ tipo: 'definir', treino: 3, exercicios: ex('Novo') }]).aplicados).toEqual([])
  })

  it('definir também respeita carga em troca guardada e em exercício adicionado', () => {
    const comTroca = { ...meso, trocas: { '2-3-1': { slotId: 'velho', nome: 'Velho' } } } as unknown as Meso
    expect(aplicarAcoes(comTroca, { '2-3': { velho: [30] } }, [{ tipo: 'definir', treino: 3, exercicios: ex('Novo') }]).bloqueios).toHaveLength(1)
    const comAdicao = { ...meso, adicoes: { '2-3': [{ slotId: 'ad', nome: 'Extra' }] } } as unknown as Meso
    expect(aplicarAcoes(comAdicao, { '2-3': { ad: [20] } }, [{ tipo: 'definir', treino: 3, exercicios: ex('Novo') }]).bloqueios).toHaveLength(1)
  })

  it('substituir por exercício que já está no treino não faz nada', () => {
    const r = aplicarAcoes(meso, {}, [{ tipo: 'substituir', treino: 1, pos: 2, de: 'Leg Press', por: { nome: 'agachamento', noCatalogo: true } }])
    expect(r.aplicados).toEqual([])
    expect(r.bloqueios).toHaveLength(1)
  })

  it('ignora treino fora da frequência', () => {
    expect(aplicarAcoes(meso, {}, [{ tipo: 'adicionar', treino: 9, exercicios: ex('X') }]).aplicados).toEqual([])
  })
})

describe('trocarExercicio', () => {
  it('cria slot novo na posição e guarda o antigo nas semanas com carga', () => {
    const limpo = { ...meso, trocas: undefined } as unknown as Meso
    const r = trocarExercicio(limpo, { '1-1': { a1: [40] } }, 1, 1, 'Novo')
    expect(r.divisao[0][0].nome).toBe('Novo')
    expect(r.divisao[0][0].slotId).not.toBe('a1')
    expect(r.trocas['1-1-1']).toEqual(limpo.divisao[0][0])
    expect(r.preservou).toBe(true)
    expect(trocarExercicio(limpo, {}, 1, 1, 'Novo').preservou).toBe(false)
  })
})

describe('aplicarAcoes: progressão, volume e métodos', () => {
  const base = { ...meso, metodos: [], progressao: { principais: [[10, 10, 10]], auxiliares: [[12, 12, 12]] } } as unknown as Meso

  it('progressao sem treino grava a progressão padrão nas semanas pedidas', () => {
    const r = aplicarAcoes(base, {}, [{ tipo: 'progressao', semanas: [3, 4], reps: [8, 8] }])
    expect(r.patch.progressao!.padrao).toEqual([
      [12, 12, 12],
      [null, null, null, null, null, null],
      [8, 8, null, null, null, null],
      [8, 8, null, null, null, null],
    ])
    expect(r.patch.progressao!.auxiliares).toEqual([[12, 12, 12]])
    expect(r.aplicados).toEqual(['Progressão padrão: 8, 8'])
  })

  it('progressao de um exercício mexe só nele; semanas não pedidas ficam como estavam', () => {
    const r = aplicarAcoes(base, {}, [{ tipo: 'progressao', treino: 1, exercicio: 'leg press', semanas: [2], reps: [15, 15, 15] }])
    const linhas = r.patch.progressaoExercicio!.a2
    expect(linhas).toHaveLength(4)
    expect(linhas[1]).toEqual([15, 15, 15, null, null, null])
    expect(r.patch.progressaoExercicio!.a1).toEqual(base.progressaoExercicio!.a1)
    expect(r.patch.progressao).toBeUndefined()
  })

  it('exercício que não existe ou treino vazio vira bloqueio', () => {
    const r = aplicarAcoes(base, {}, [
      { tipo: 'progressao', treino: 1, exercicio: 'Remada', semanas: [], reps: [10] },
      { tipo: 'progressao', treino: 3, semanas: [], reps: [10] },
    ])
    expect(r.aplicados).toEqual([])
    expect(r.bloqueios).toHaveLength(2)
  })

  it('volume reduzir num treino usa a mesma conta da aba Progressão', () => {
    const r = aplicarAcoes(base, {}, [{ tipo: 'volume', modo: 'reduzir', pct: 50, de: 3, ate: 3, treino: 2 }])
    expect(r.aplicados).toEqual(['Treino 2: redução'])
    expect(r.patch.progressaoExercicio!.b1).toBeDefined()
    expect(r.patch.progressaoExercicio!.a1).toEqual(base.progressaoExercicio!.a1)
    expect(aplicarAcoes(base, {}, [{ tipo: 'volume', modo: 'reduzir', pct: 50, de: 9, ate: 9 }]).bloqueios).toHaveLength(1)
  })

  it('metodo Dropset em várias séries vira uma entrada por série e por semana', () => {
    const r = aplicarAcoes(base, {}, [{ tipo: 'metodo', treino: 1, exercicio: 'Agachamento', metodo: 'Dropset', semanas: [1, 2], parceiros: [], series: [1, 2], remover: false }])
    expect(r.patch.metodos!.map((x) => [x.semana, x.exercicio, x.escopo, x.serie])).toEqual([
      [1, 1, 'Série específica', 1],
      [1, 1, 'Série específica', 2],
      [2, 1, 'Série específica', 1],
      [2, 1, 'Série específica', 2],
    ])
    expect(r.aplicados).toEqual(['Treino 1, Agachamento: Dropset'])
  })

  it('metodo em série que o exercício não tem vira bloqueio (não cai em outra série)', () => {
    const r = aplicarAcoes(base, {}, [{ tipo: 'metodo', treino: 1, exercicio: 'Agachamento', metodo: 'Dropset', semanas: [], parceiros: [], series: [5], remover: false }])
    expect(r.aplicados).toEqual([])
    expect(r.patch.metodos).toEqual([])
    expect(r.bloqueios).toEqual(['Treino 1, Agachamento: tem só 2 séries; não pus o Dropset na S5.'])
  })

  it('metodo Biset junta o parceiro no mesmo grupo; contagem errada é bloqueada', () => {
    const r = aplicarAcoes(base, {}, [{ tipo: 'metodo', treino: 1, exercicio: '1', metodo: 'Biset', semanas: [1], parceiros: ['Leg Press'], series: [], remover: false }])
    expect(r.patch.metodos!.map((x) => [x.exercicio, x.metodo, x.grupo])).toEqual([
      [1, 'Biset', 1],
      [2, 'Biset', 1],
    ])
    const ruim = aplicarAcoes(base, {}, [{ tipo: 'metodo', treino: 1, exercicio: '1', metodo: 'Triset', semanas: [], parceiros: ['2'], series: [], remover: false }])
    expect(ruim.bloqueios).toHaveLength(1)
    expect(ruim.patch.metodos).toBe(base.metodos)
  })

  it('métodos acham o exercício que a divisão acabou de adicionar; remover tira o método', () => {
    const r = aplicarAcoes(base, {}, [
      { tipo: 'metodo', treino: 2, exercicio: 'Crucifixo', metodo: 'Rest-pause', semanas: [], parceiros: [], series: [], remover: false },
      { tipo: 'adicionar', treino: 2, exercicios: [{ nome: 'Crucifixo', noCatalogo: true }] },
    ])
    expect(r.patch.metodos).toHaveLength(4)
    expect(r.patch.metodos!.every((x) => x.exercicio === 2 && x.metodo === 'Rest-pause')).toBe(true)
    const sem = aplicarAcoes({ ...base, ...r.patch } as Meso, {}, [{ tipo: 'metodo', treino: 2, exercicio: 'Crucifixo', semanas: [], parceiros: [], series: [], remover: true }])
    expect(sem.patch.metodos).toEqual([])
    expect(aplicarAcoes(base, {}, [{ tipo: 'metodo', treino: 2, exercicio: 'Supino', semanas: [], parceiros: [], series: [], remover: true }]).bloqueios).toHaveLength(1)
  })
})

describe('posicoesAdicionadas (aba Métodos)', () => {
  const s = (slotId: string, nome: string) => ({ slotId, nome })
  it('posição depois da divisão, só nas semanas da adição; nomes diferentes na mesma posição saem juntos', () => {
    const adicoes = { '2-1': [s('n1', 'Rosca')], '3-1': [s('n1', 'Rosca'), s('n2', 'Tríceps')], '4-1': [s('n3', 'Prancha')], '2-2': [s('n4', 'Remada')] }
    const m = { ...meso, adicoes } as unknown as Meso
    expect(posicoesAdicionadas(m, 1)).toEqual([
      { pos: 3, nome: 'Rosca / Prancha', semanas: [2, 3, 4] },
      { pos: 4, nome: 'Tríceps', semanas: [3] },
    ])
    expect(posicoesAdicionadas(m, 2)).toEqual([{ pos: 2, nome: 'Remada', semanas: [2] }])
    expect(posicoesAdicionadas(m, 3)).toEqual([])
    expect(posicoesAdicionadas(meso, 1)).toEqual([])
  })
})
