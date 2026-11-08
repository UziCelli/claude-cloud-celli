import { describe, expect, it } from 'vitest'
import { linhasDoExercicio, removerLinha, salvarLinha, semanasTexto, seriesDoExercicio, seriesTexto } from './planoMetodos'
import type { AplicacaoMetodo, Meso } from './tipos'

const m = (p: Partial<AplicacaoMetodo>): AplicacaoMetodo => ({
  ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Série específica', serie: 3, ...p,
})
const semanas = (ws: number[], p: Partial<AplicacaoMetodo>) => ws.map((semana) => m({ ...p, semana }))

describe('linhasDoExercicio', () => {
  it('junta numa linha só as semanas com o mesmo método igual', () => {
    const linhas = linhasDoExercicio(semanas([1, 2, 3, 4], { exercicio: 2, etapas: 1 }), 1, 2)
    expect(linhas).toHaveLength(1)
    expect(linhas[0]).toMatchObject({ metodo: 'Dropset', semanas: [1, 2, 3, 4], parceiros: [] })
    expect(linhas[0].modelo).toHaveLength(1)
  })

  it('semanas com ajuste diferente viram outra linha (em blocos), na ordem da primeira semana', () => {
    const lista = [...semanas([3, 4], { etapas: 2 }), ...semanas([1, 2], { etapas: 1 })]
    expect(linhasDoExercicio(lista, 1, 1).map((l) => [l.semanas, l.modelo[0].etapas])).toEqual([[[1, 2], 1], [[3, 4], 2]])
  })

  it('a ordem dos campos na entrada não importa', () => {
    const a = m({ semana: 1 })
    const { escopo, serie, ...resto } = m({ semana: 2 })
    const b = { serie, ...resto, escopo } as AplicacaoMetodo
    expect(linhasDoExercicio([a, b], 1, 1).map((l) => l.semanas)).toEqual([[1, 2]])
  })

  it('dropset em várias séries da mesma semana é uma linha só', () => {
    const lista = [...semanas([1, 2], { serie: 3 }), ...semanas([1, 2], { serie: 2 })]
    const [linha, ...resto] = linhasDoExercicio(lista, 1, 1)
    expect(resto).toEqual([])
    expect(linha.semanas).toEqual([1, 2])
    expect(linha.modelo.map((x) => x.serie)).toEqual([2, 3])
  })

  it('Biset: um grupo é uma linha, com os parceiros, mesmo com número de grupo diferente por semana', () => {
    const lista = [
      m({ semana: 1, exercicio: 2, metodo: 'Biset', escopo: 'Todas as séries', serie: undefined, grupo: 1 }),
      m({ semana: 1, exercicio: 3, metodo: 'Biset', escopo: 'Todas as séries', serie: undefined, grupo: 1 }),
      m({ semana: 2, exercicio: 2, metodo: 'Biset', escopo: 'Todas as séries', serie: undefined, grupo: 2 }),
      m({ semana: 2, exercicio: 3, metodo: 'Biset', escopo: 'Todas as séries', serie: undefined, grupo: 2 }),
      m({ semana: 2, exercicio: 5, metodo: 'Biset', escopo: 'Todas as séries', serie: undefined, grupo: 1 }),
      m({ semana: 2, exercicio: 6, metodo: 'Biset', escopo: 'Todas as séries', serie: undefined, grupo: 1 }),
    ]
    expect(linhasDoExercicio(lista, 1, 2).map((l) => [l.semanas, l.parceiros])).toEqual([[[1, 2], [3]]])
    expect(linhasDoExercicio(lista, 1, 3).map((l) => [l.semanas, l.parceiros])).toEqual([[[1, 2], [2]]])
    expect(linhasDoExercicio(lista, 1, 5).map((l) => [l.semanas, l.parceiros])).toEqual([[[2], [6]]])
  })

  it('parceiro diferente é outra linha', () => {
    const b = { metodo: 'Biset' as const, escopo: 'Todas as séries' as const, serie: undefined, grupo: 1 }
    const lista = [m({ ...b, semana: 1, exercicio: 1 }), m({ ...b, semana: 1, exercicio: 2 }), m({ ...b, semana: 2, exercicio: 1 }), m({ ...b, semana: 2, exercicio: 4 })]
    expect(linhasDoExercicio(lista, 1, 1).map((l) => [l.semanas, l.parceiros])).toEqual([[[1], [2]], [[2], [4]]])
  })

  it('ignora outros treinos e exercícios; métodos na ordem da lista de métodos', () => {
    const lista = [
      m({ metodo: 'Rest-pause', serie: 2 }),
      m({ treino: 2 }),
      m({ exercicio: 2 }),
      m({ metodo: 'Dropset' }),
    ]
    expect(linhasDoExercicio(lista, 1, 1).map((l) => l.metodo)).toEqual(['Dropset', 'Rest-pause'])
  })
})

describe('salvarLinha', () => {
  const linha = (p: Partial<Parameters<typeof salvarLinha>[1]> = {}) => ({
    treino: 1, pos: 2, metodo: 'Dropset' as const, semanas: [1, 2], modelo: [m({ serie: 3, etapas: 1 })], parceiros: [], ...p,
  })

  it('grava uma entrada por semana, no exercício e treino da linha', () => {
    const r = salvarLinha([], linha())
    expect(r.map((x) => [x.semana, x.treino, x.exercicio, x.metodo, x.serie])).toEqual([[1, 1, 2, 'Dropset', 3], [2, 1, 2, 'Dropset', 3]])
  })

  it('substitui o que já existia nas semanas da linha, nunca duplica', () => {
    const antes = semanas([1, 2, 3, 4], { exercicio: 2, serie: 3 })
    const r = salvarLinha(antes, linha({ semanas: [1, 2, 3, 4], modelo: [m({ serie: 2 })] }))
    expect(r).toHaveLength(4)
    expect(r.every((x) => x.serie === 2)).toBe(true)
  })

  it('semanas tiradas da linha (semanasAntes) perdem o método', () => {
    const antes = semanas([1, 2, 3, 4], { exercicio: 2 })
    const r = salvarLinha(antes, linha({ semanas: [1, 2] }), [1, 2, 3, 4])
    expect(r.map((x) => x.semana)).toEqual([1, 2])
  })

  it('não mexe em outros treinos, exercícios, métodos ou semanas', () => {
    const outros = [m({ treino: 2, exercicio: 2 }), m({ exercicio: 3 }), m({ exercicio: 2, metodo: 'Rest-pause' }), m({ exercicio: 2, semana: 5 })]
    const r = salvarLinha(outros, linha())
    for (const o of outros) expect(r).toContain(o)
    expect(r).toHaveLength(outros.length + 2)
  })

  it('"Série específica" sempre com série; os outros escopos sem série; grupo só nos de sequência', () => {
    const r = salvarLinha([], linha({ semanas: [1], modelo: [m({ serie: undefined, grupo: 4 })] }))
    expect(r[0].serie).toBe(1)
    expect(r[0].grupo).toBeUndefined()
    const t = salvarLinha([], linha({ semanas: [1], metodo: 'Clusterset', modelo: [m({ metodo: 'Clusterset', escopo: 'Todas as séries', serie: 3 })] }))
    expect('serie' in t[0]).toBe(false)
  })

  it('séries repetidas do dropset entram uma vez só', () => {
    const r = salvarLinha([], linha({ semanas: [1], modelo: [m({ serie: 3 }), m({ serie: 3 }), m({ serie: 1 })] }))
    expect(r.map((x) => x.serie)).toEqual([3, 1])
  })

  it('fica no lugar da entrada antiga (a ordem dos rótulos não muda)', () => {
    const lista = [m({ exercicio: 2, metodo: 'Rest-pause', serie: 1 }), m({ exercicio: 2, serie: 3 }), m({ exercicio: 2, metodo: 'Clusterset', escopo: 'Todas as séries' })]
    const r = salvarLinha(lista, linha({ semanas: [1], modelo: [m({ serie: 2 })] }))
    expect(r.map((x) => x.metodo)).toEqual(['Rest-pause', 'Dropset', 'Clusterset'])
  })

  describe('Biset, Triset, Superset, Circuito', () => {
    const b = { metodo: 'Biset' as const, escopo: 'Todas as séries' as const, serie: undefined }
    const bis = (p: Partial<Parameters<typeof salvarLinha>[1]> = {}) => linha({ metodo: 'Biset', modelo: [m({ ...b, pausaInternaS: 15 })], parceiros: [3], ...p })

    it('grava todos os membros com o próximo número de grupo da semana', () => {
      const existente = [m({ ...b, exercicio: 5, grupo: 1 }), m({ ...b, exercicio: 6, grupo: 1 })]
      const r = salvarLinha(existente, bis())
      const novos = r.filter((x) => x.exercicio === 2 || x.exercicio === 3)
      expect(novos.map((x) => [x.semana, x.exercicio, x.grupo, x.pausaInternaS])).toEqual([[1, 2, 2, 15], [1, 3, 2, 15], [2, 2, 1, 15], [2, 3, 1, 15]])
    })

    it('trocar o parceiro desfaz o grupo antigo; grupo que tinha o parceiro novo também sai', () => {
      const antes = [m({ ...b, exercicio: 2, grupo: 1 }), m({ ...b, exercicio: 3, grupo: 1 }), m({ ...b, exercicio: 4, grupo: 2 }), m({ ...b, exercicio: 5, grupo: 2 })]
      const r = salvarLinha(antes, bis({ semanas: [1], parceiros: [4] }), [1])
      expect(r.map((x) => [x.exercicio, x.grupo])).toEqual([[2, 1], [4, 1]])
    })

    it('tirar semanas desfaz o grupo inteiro nelas', () => {
      const antes = [1, 2].flatMap((semana) => [m({ ...b, semana, exercicio: 2, grupo: 1 }), m({ ...b, semana, exercicio: 3, grupo: 1 })])
      const r = salvarLinha(antes, bis({ semanas: [1] }), [1, 2])
      expect(r.map((x) => [x.semana, x.exercicio])).toEqual([[1, 2], [1, 3]])
    })

    it('dado antigo sem número de grupo: só sai o do exercício e dos parceiros, nunca o de outros exercícios', () => {
      const antes = [m({ ...b, exercicio: 2 }), m({ ...b, exercicio: 3 }), m({ ...b, exercicio: 5 }), m({ ...b, exercicio: 6 })]
      const r = salvarLinha(antes, bis({ semanas: [1] }), [1])
      expect(r.map((x) => [x.exercicio, x.grupo])).toEqual([[2, 1], [3, 1], [5, undefined], [6, undefined]])
    })
  })

  it('removerLinha tira só as semanas da linha (e o grupo inteiro)', () => {
    const b = { metodo: 'Biset' as const, escopo: 'Todas as séries' as const, serie: undefined, grupo: 1 }
    const lista = [...semanas([1, 2], { exercicio: 2 }), m({ ...b, exercicio: 2 }), m({ ...b, exercicio: 3 }), m({ semana: 3, exercicio: 2, etapas: 2 })]
    const [drop, outro] = linhasDoExercicio(lista, 1, 2).filter((l) => l.metodo === 'Dropset')
    expect(removerLinha(lista, 1, 2, drop)).toHaveLength(3)
    expect(removerLinha(lista, 1, 2, drop)).toContain(outro.modelo[0])
    const [biset] = linhasDoExercicio(lista, 1, 2).filter((l) => l.metodo === 'Biset')
    expect(removerLinha(lista, 1, 2, biset).some((x) => x.metodo === 'Biset')).toBe(false)
  })
})

describe('textos', () => {
  it('semanasTexto: todas, uma, faixas', () => {
    expect(semanasTexto([1, 2, 3, 4, 5, 6], 6)).toBe('todas as semanas')
    expect(semanasTexto([4], 6)).toBe('semana 4')
    expect(semanasTexto([5, 1, 2, 3], 6)).toBe('semanas 1–3, 5')
    expect(semanasTexto([1, 3], 6)).toBe('semanas 1, 3')
  })

  it('seriesTexto: dropset pelas séries em que o drop cai; os outros pelo escopo', () => {
    expect(seriesTexto([m({ serie: 3 }), m({ serie: 1 }), m({ serie: 2 })], 4)).toBe('S1, S2 e S3')
    expect(seriesTexto([m({ escopo: 'Todas as séries', serie: undefined })], 4)).toBe('S4')
    expect(seriesTexto([m({ metodo: 'Rest-pause', serie: 2 })], 4)).toBe('S2')
    expect(seriesTexto([m({ metodo: 'Biset', escopo: 'Últimas 2 séries', serie: undefined })], 4)).toBe('últimas 2 séries')
  })

  it('seriesDoExercicio: o maior número de séries nas semanas escolhidas (progressão própria vale)', () => {
    const meso = {
      divisao: [[{ slotId: 'a', nome: 'A' }, { slotId: 'b', nome: 'B' }]],
      progressao: { principais: [[10, 10, 10], [10, 10]], auxiliares: [] },
      progressaoExercicio: { b: [[8], [8, 8, 8, 8]] },
    } as unknown as Meso
    expect(seriesDoExercicio(meso, 1, 1, [1, 2])).toBe(3)
    expect(seriesDoExercicio(meso, 1, 1, [2])).toBe(2)
    expect(seriesDoExercicio(meso, 1, 2, [1, 2])).toBe(4)
  })
})
