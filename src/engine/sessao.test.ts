import { describe, expect, it } from 'vitest'
import { prescreverSessao } from './sessao'
import type { AplicacaoMetodo, Escopo, Meso, Slot } from './tipos'

const slot = (slotId: string, nome = slotId): Slot => ({ slotId, nome })

// Semana 1: principais [10,9,8,7] (n=4), auxiliares [15,14,13,12] (n=4)
// Semana 2: principais [12,10,8] (n=3), auxiliares [20,18,16] (n=3)
const base: Meso = {
  frequencia: 2,
  semanas: 2,
  inicio: '2026-12-28',
  pausaS: 60,
  divisao: [[slot('A'), slot('B'), slot('C')], [slot('D')]],
  progressao: {
    principais: [
      [10, 9, 8, 7, null, null],
      [12, 10, 8, null, null, null],
    ],
    auxiliares: [
      [15, 14, 13, 12, null, null],
      [20, 18, 16, null, null, null],
    ],
  },
  metodos: [],
}

const met = (m: Partial<AplicacaoMetodo>): AplicacaoMetodo => ({
  ativo: true,
  semana: 1,
  treino: 1,
  exercicio: 1,
  metodo: 'Biset',
  escopo: 'Todas as séries',
  ...m,
})
const com = (metodos: AplicacaoMetodo[], extra: Partial<Meso> = {}): Meso => ({ ...base, ...extra, metodos })
const ex1 = (meso: Meso, semana = 1, treino = 1) => prescreverSessao(meso, semana, treino)!.exercicios[0]

describe('prescreverSessao — estrutura', () => {
  it('retorna null fora do intervalo de semanas/treinos', () => {
    expect(prescreverSessao(base, 0, 1)).toBeNull()
    expect(prescreverSessao(base, 3, 1)).toBeNull() // semanas = 2
    expect(prescreverSessao(base, 1, 0)).toBeNull()
    expect(prescreverSessao(base, 1, 3)).toBeNull() // frequencia = 2
  })

  it('início da semana = inicio + 7·(w−1), sem fuso (vira o ano)', () => {
    expect(prescreverSessao(base, 1, 1)!.inicioSemana).toBe('2026-12-28')
    expect(prescreverSessao(base, 2, 1)!.inicioSemana).toBe('2027-01-04') // 28/12 + 7 dias
  })

  it('posições 1–2 usam Principais, 3–10 Auxiliares; sem método o rótulo é vazio', () => {
    const s = prescreverSessao(base, 1, 1)!
    expect(s.exercicios.map((e) => [e.pos, e.slot.slotId, e.n, e.reps, e.rotulo])).toEqual([
      [1, 'A', 4, [10, 9, 8, 7], ''],
      [2, 'B', 4, [10, 9, 8, 7], ''],
      [3, 'C', 4, [15, 14, 13, 12], ''],
    ])
    expect(s.exercicios[0].cargaSugerida).toEqual([null, null, null, null])
    expect(s.pausaS).toBe(60)
    expect(prescreverSessao(base, 2, 1)!.exercicios[2].reps).toEqual([20, 18, 16])
  })

  it('troca pontual substitui o slot só naquela semana/treino/posição', () => {
    const meso = { ...base, trocas: { '1-1-3': slot('X', 'Remada') } }
    expect(prescreverSessao(meso, 1, 1)!.exercicios[2].slot).toEqual({ slotId: 'X', nome: 'Remada' })
    expect(prescreverSessao(meso, 1, 1)!.exercicios[2].reps).toEqual([15, 14, 13, 12]) // posição 3 segue Auxiliares
    expect(prescreverSessao(meso, 2, 1)!.exercicios[2].slot.slotId).toBe('C')
  })

  it('series = maior n entre os exercícios (não só o 1º)', () => {
    // principais s1 com 3 séries, auxiliares s1 com 5 → series = 5
    const meso = com([], {
      progressao: { principais: [[10, 10, 10]], auxiliares: [[12, 12, 12, 12, 12]] },
    })
    const s = prescreverSessao(meso, 1, 1)!
    expect(s.series).toBe(5)
    // Σreps = 30+30+60 = 120; pausa = 5·60·3 = 900 → 10 + 1020/60 = 27
    expect(s.tempoMin).toBeCloseTo(27, 6)
  })
})

describe('prescreverSessao — escopo e reps (AvRep)', () => {
  // exercício 1, semana 1: base [10,9,8,7], n=4; repsPadrao=5 nas séries cobertas
  const casos: [Escopo, number | undefined, number[]][] = [
    ['Todas as séries', undefined, [5, 5, 5, 5]],
    ['Série específica', 2, [10, 5, 8, 7]],
    ['Primeiras 2 séries', undefined, [5, 5, 8, 7]],
    ['Últimas 2 séries', undefined, [10, 9, 5, 5]], // pos > max(0, 4−2) = 2
    ['Primeiras 3 séries', undefined, [5, 5, 5, 7]],
    ['Últimas 3 séries', undefined, [10, 5, 5, 5]], // pos > 1
    ['Primeiras 4 séries', undefined, [5, 5, 5, 5]],
    ['Últimas 4 séries', undefined, [5, 5, 5, 5]], // pos > 0
  ]
  it.each(casos)('%s (serie=%s)', (escopo, serie, esperado) => {
    expect(ex1(com([met({ escopo, serie, repsPadrao: 5 })])).reps).toEqual(esperado)
  })

  it('Últimas k com k > n cobre todas (max(0, n−k))', () => {
    // semana 2: n=3, Últimas 4 → pos > max(0, −1) = 0
    expect(ex1(com([met({ semana: 2, escopo: 'Últimas 4 séries', repsPadrao: 5 })]), 2).reps).toEqual([5, 5, 5])
  })

  it('precedência: repsPadrao > repsPorBloco > base', () => {
    expect(ex1(com([met({ repsPadrao: 6, repsPorBloco: 4 })])).reps).toEqual([6, 6, 6, 6])
    expect(ex1(com([met({ repsPorBloco: 4 })])).reps).toEqual([4, 4, 4, 4])
    expect(ex1(com([met({ repsPadrao: 0, repsPorBloco: 0 })])).reps).toEqual([10, 9, 8, 7])
  })

  it('várias linhas no mesmo exercício combinam com MAX só entre as que cobrem a série', () => {
    // Todas pad=5 + Últimas 2 pad=7 → s1–2: max(5)=5; s3–4: max(5,7)=7
    expect(ex1(com([met({ repsPadrao: 5 }), met({ escopo: 'Últimas 2 séries', repsPadrao: 7 })])).reps).toEqual([
      5, 5, 7, 7,
    ])
    // Todas bloco=3 + Primeiras 2 pad=6 → s1–2: pad 6; s3–4: pad 0 → bloco 3
    expect(
      ex1(com([met({ repsPorBloco: 3 }), met({ escopo: 'Primeiras 2 séries', repsPadrao: 6 })])).reps,
    ).toEqual([6, 6, 3, 3])
  })

  it('ignora linhas inativas e de outra semana/treino/exercício', () => {
    const fora = [
      met({ ativo: false, repsPadrao: 5, adicional: 100 }),
      met({ semana: 2, repsPadrao: 5, adicional: 100 }),
      met({ treino: 2, repsPadrao: 5, adicional: 100 }),
    ]
    const e = ex1(com([...fora, met({ exercicio: 2, repsPadrao: 5 })]))
    expect(e.reps).toEqual([10, 9, 8, 7])
    expect(e.rotulo).toBe('')
    // sessão 1-1 sem métodos: Σreps = 34+34+54 = 122; pausa = 4·60·3 = 720 → 10 + 842/60
    expect(prescreverSessao(base, 1, 1)!.tempoMin).toBeCloseTo(10 + 842 / 60, 6)
    expect(prescreverSessao(com(fora), 1, 1)!.tempoMin).toBeCloseTo(10 + 842 / 60, 6)
  })
})

describe('prescreverSessao — dropset (etapas extras e carga sugerida)', () => {
  it('Últimas 2, etapas=2: etapa 1 usa repsEtapa, etapa 2 cai para base(min(alvo,n))', () => {
    // séries: nenhuma linha tem pad/bloco → base [10,9,8,7]
    // etapa 1: repsEtapa[1]=6 → 6; etapa 2: repsEtapa vazio, repsPadrao vazio, alvo=n=4 → base(4)=7
    const e = ex1(
      com([met({ metodo: 'Dropset', escopo: 'Últimas 2 séries', etapas: 2, repsEtapa: [6, null], cargaEtapa: [40, 30] })]),
    )
    expect(e.reps).toEqual([10, 9, 8, 7, 6, 7])
    expect(e.cargaSugerida).toEqual([null, null, null, null, 40, 30])
    expect(e.n).toBe(4)
  })

  it('repsPadrao vale para as séries cobertas e é o fallback das etapas', () => {
    // s3–4 cobertas → 5; etapa 1 → repsEtapa 6; etapa 2 → padDrop 5
    const e = ex1(
      com([met({ metodo: 'Dropset', escopo: 'Últimas 2 séries', etapas: 2, repsEtapa: [6], repsPadrao: 5 })]),
    )
    expect(e.reps).toEqual([10, 9, 5, 5, 6, 5])
    expect(e.cargaSugerida).toEqual([null, null, null, null, null, null]) // sem cargaEtapa
  })

  it('alvo = serie do dropset (limitado a n)', () => {
    // Série específica 2 → etapa usa base(2)=9
    expect(ex1(com([met({ metodo: 'Dropset', escopo: 'Série específica', serie: 2, etapas: 1 })])).reps).toEqual([
      10, 9, 8, 7, 9,
    ])
    // serie 6 com n=4 → base(min(6,4)) = base(4) = 7
    expect(ex1(com([met({ metodo: 'Dropset', escopo: 'Série específica', serie: 6, etapas: 1 })])).reps).toEqual([
      10, 9, 8, 7, 7,
    ])
  })

  it('etapas = MAX entre linhas Dropset; carga sugerida vem da PRIMEIRA linha (0 = vazio)', () => {
    const e = ex1(
      com([
        met({ metodo: 'Dropset', escopo: 'Últimas 2 séries', etapas: 1, cargaEtapa: [0, 30] }),
        met({ metodo: 'Dropset', escopo: 'Série específica', serie: 4, etapas: 2, cargaEtapa: [50, 60] }),
      ]),
    )
    // et = max(1,2) = 2; alvo = max(serie) = 4 → base(4)=7 nas duas etapas
    expect(e.reps).toEqual([10, 9, 8, 7, 7, 7])
    expect(e.cargaSugerida).toEqual([null, null, null, null, null, 30])
  })

  it('etapas só contam em linhas Dropset', () => {
    expect(ex1(com([met({ metodo: 'Biset', etapas: 2 })])).reps).toEqual([10, 9, 8, 7])
  })
})

describe('prescreverSessao — rótulo (AvRotulo)', () => {
  it('une as linhas na ordem da tabela com "; "', () => {
    const meso = com([
      met({ metodo: 'Dropset', escopo: 'Últimas 2 séries' }),
      met({ metodo: 'Biset', escopo: 'Todas as séries' }),
      met({ exercicio: 2, metodo: 'Rest-pause', escopo: 'Série específica', serie: 2 }),
      met({ exercicio: 3, metodo: 'Clusterset', escopo: 'Primeiras 3 séries' }),
    ])
    const s = prescreverSessao(meso, 1, 1)!
    expect(s.exercicios.map((e) => e.rotulo)).toEqual([
      'Dropset [últimas 2]; Biset [todas]',
      'Rest-pause [S2]',
      'Clusterset [primeiras 3]',
    ])
  })
})

describe('prescreverSessao — tempo da sessão', () => {
  // treino único com 1 exercício, 3 séries de 10, pausa 60 s:
  // base = 10 + (30 + 3·60·1)/60 = 10 + 210/60 = 13.5
  const umEx: Meso = {
    ...base,
    frequencia: 1,
    divisao: [[slot('A')]],
    progressao: { principais: [[10, 10, 10]], auxiliares: [[10, 10, 10]] },
  }
  const tempo = (...metodos: Partial<AplicacaoMetodo>[]) =>
    prescreverSessao({ ...umEx, metodos: metodos.map(met) }, 1, 1)!.tempoMin

  it('sem métodos', () => expect(tempo()).toBeCloseTo(13.5, 6))

  it('Dropset: p·et (+ reps das etapas)', () => {
    // etapas 2×base(3)=10 → +20 reps; extra = 10·2 = 20 → 10 + (50+180+20)/60 = 10 + 250/60
    expect(tempo({ metodo: 'Dropset', escopo: 'Últimas 2 séries', pausaInternaS: 10, etapas: 2 })).toBeCloseTo(
      10 + 250 / 60,
      6,
    )
  })

  it('Rest-pause: ad + p·1 quando b ≤ 1', () => {
    // 0 + 20·1 = 20 → 10 + 230/60
    expect(tempo({ metodo: 'Rest-pause', escopo: 'Últimas 2 séries', pausaInternaS: 20, blocos: 1 })).toBeCloseTo(
      10 + 230 / 60,
      6,
    )
  })

  it('Rest-pause: ad + p·(b−1) quando b > 1', () => {
    // 5 + 20·2 = 45 → 10 + 255/60 = 14.25
    expect(
      tempo({ metodo: 'Rest-pause', escopo: 'Últimas 2 séries', pausaInternaS: 20, blocos: 3, adicional: 5 }),
    ).toBeCloseTo(14.25, 6)
  })

  it('Clusterset [CORRIGIDO]: rp·(b−1) + p·(b−1)', () => {
    // repsPorBloco 4 em todas → reps 12; rp = 4; extra = 4·2 + 30·2 = 68 → 10 + (12+180+68)/60 = 10 + 260/60
    // (a regra genérica da planilha daria 0 + 30·2 = 60 → 10 + 252/60 = 14.2)
    expect(tempo({ metodo: 'Clusterset', pausaInternaS: 30, blocos: 3, repsPorBloco: 4 })).toBeCloseTo(10 + 260 / 60, 6)
  })

  it('Clusterset: rp prefere repsPadrao; b ≤ 1 não soma nada', () => {
    // reps 6×3 = 18; rp = 6; extra = 6·1 + 30·1 = 36 → 10 + (18+180+36)/60 = 13.9
    expect(tempo({ metodo: 'Clusterset', pausaInternaS: 30, blocos: 2, repsPadrao: 6, repsPorBloco: 4 })).toBeCloseTo(
      13.9,
      6,
    )
    expect(tempo({ metodo: 'Clusterset', pausaInternaS: 30, blocos: 1, adicional: 9 })).toBeCloseTo(13.5, 6)
  })

  it('Demais métodos: ad + p·(b−1) se b > 1, senão só ad', () => {
    // Circuito: 0 + 20·2 = 40 → 10 + 250/60
    expect(tempo({ metodo: 'Circuito', pausaInternaS: 20, blocos: 3 })).toBeCloseTo(10 + 250 / 60, 6)
    // Superset b=1: 12 + 0 = 12 → 10 + 222/60 = 13.7
    expect(tempo({ metodo: 'Superset', pausaInternaS: 15, blocos: 1, adicional: 12 })).toBeCloseTo(13.7, 6)
    // Triset b=2: 0 + 15·1 = 15 → 10 + 225/60 = 13.75
    expect(tempo({ metodo: 'Triset', pausaInternaS: 15, blocos: 2 })).toBeCloseTo(13.75, 6)
    // Biset b=3, ad=10: 10 + 15·2 = 40 (1 linha → 0 pares) → 10 + 250/60
    expect(tempo({ metodo: 'Biset', pausaInternaS: 15, blocos: 3, adicional: 10 })).toBeCloseTo(10 + 250 / 60, 6)
  })

  it('extras somam todas as linhas ativas do treino', () => {
    // Rest-pause 20 + Circuito 40 = 60 → 10 + 270/60 = 14.5
    expect(
      tempo(
        { metodo: 'Rest-pause', escopo: 'Últimas 2 séries', pausaInternaS: 20 },
        { exercicio: 2, metodo: 'Circuito', pausaInternaS: 20, blocos: 3 },
      ),
    ).toBeCloseTo(14.5, 6)
  })

  it('pares de Biset reduzem as pausas: 2 linhas → 1 par', () => {
    // 2 exercícios de 3×10, pausa 60: sem biset = 10 + (60 + 3·60·2)/60 = 17
    const dois: Meso = { ...umEx, divisao: [[slot('A'), slot('B')]] }
    expect(prescreverSessao(dois, 1, 1)!.tempoMin).toBeCloseTo(17, 6)
    // com 2 Biset (p=15, b=1, ad=0 → extra 0): pares = INT(2/2) = 1 → 10 + (60 + 3·60·1)/60 = 14
    const biset = { ...dois, metodos: [met({ grupo: 1, pausaInternaS: 15 }), met({ exercicio: 2, grupo: 1, pausaInternaS: 15 })] }
    expect(prescreverSessao(biset, 1, 1)!.tempoMin).toBeCloseTo(14, 6)
    // 3 linhas Biset → ainda 1 par; Biset inativo não conta
    const tres = { ...biset, metodos: [...biset.metodos, met({ exercicio: 2 }), met({ ativo: false })] }
    expect(prescreverSessao(tres, 1, 1)!.tempoMin).toBeCloseTo(14, 6)
  })

  describe('economia de pausa [DECIDIDO]: Biset/Superset/Triset/Circuito dividem uma pausa', () => {
    // 4 exercícios de 3×10, pausa 60, sem extras: tempo = 10 + (120 + 3·60·(4 − econ))/60 = 12 + 3·(4 − econ)
    const quatro: Meso = { ...umEx, divisao: [[slot('A'), slot('B'), slot('C'), slot('D')]] }
    const econ = (...metodos: Partial<AplicacaoMetodo>[]) =>
      (12 + 12 - prescreverSessao({ ...quatro, metodos: metodos.map(met) }, 1, 1)!.tempoMin) / 3
    const em = (metodo: AplicacaoMetodo['metodo'], pos: number[], extra: Partial<AplicacaoMetodo> = {}) =>
      pos.map((exercicio) => ({ metodo, exercicio, ...extra }))

    it('sem métodos não economiza', () => expect(econ()).toBeCloseTo(0, 6))
    it('Triset de 3 → 2', () => expect(econ(...em('Triset', [1, 2, 3]))).toBeCloseTo(2, 6))
    it('Superset de 2 → 1', () => expect(econ(...em('Superset', [1, 2]))).toBeCloseTo(1, 6))
    it('Circuito de 4 → 3', () => expect(econ(...em('Circuito', [1, 2, 3, 4]))).toBeCloseTo(3, 6))
    it('dois Bisets por grupo (1 e 2) → 2', () =>
      expect(econ(...em('Biset', [1, 2], { grupo: 1 }), ...em('Biset', [3, 4], { grupo: 2 }))).toBeCloseTo(2, 6))
    it('4 linhas Biset sem grupo → 2', () => expect(econ(...em('Biset', [1, 2, 3, 4]))).toBeCloseTo(2, 6))
    it('mesma posição listada duas vezes conta uma', () => {
      expect(econ(...em('Triset', [1, 2, 3, 3]))).toBeCloseTo(2, 6)
      expect(econ(...em('Biset', [1, 1]))).toBeCloseTo(0, 6)
      expect(econ(...em('Biset', [1, 1, 2], { grupo: 1 }))).toBeCloseTo(1, 6)
    })
    it('ignora linhas inativas', () =>
      expect(econ(...em('Triset', [1, 2]), { metodo: 'Triset', exercicio: 3, ativo: false })).toBeCloseTo(0, 6))
    it('ignora outra semana/treino', () =>
      expect(econ(...em('Superset', [1]), ...em('Superset', [2], { semana: 2 }), ...em('Superset', [3], { treino: 2 }))).toBeCloseTo(0, 6))
    it('métodos de outro tipo não economizam', () => expect(econ(...em('Dropset', [1, 2]))).toBeCloseTo(0, 6))
  })

  describe('override por exercício (progressaoExercicio)', () => {
    const over = { '1-2': [[5, 5, null, null, null, null], [6, 6, 6, 6, null, null]] }

    it('substitui a linha do grupo só daquele exercício', () => {
      const s = prescreverSessao({ ...base, progressaoExercicio: over }, 1, 1)!
      expect(s.exercicios[1].reps).toEqual([5, 5])
      expect(s.exercicios[1].n).toBe(2)
      expect(s.exercicios[0].reps).toEqual([10, 9, 8, 7]) // principal sem override
      expect(s.exercicios[2].reps).toEqual([15, 14, 13, 12]) // auxiliar sem override
    })

    it('vale por semana e por treino; semana sem linha cai no grupo', () => {
      const m = { ...base, progressaoExercicio: over }
      expect(prescreverSessao(m, 2, 1)!.exercicios[1].reps).toEqual([6, 6, 6, 6])
      expect(prescreverSessao(m, 1, 2)!.exercicios[0].reps).toEqual([10, 9, 8, 7]) // t2, não t1
      const curto = { ...base, progressaoExercicio: { '1-2': [[5, 5, null, null, null, null]] } }
      expect(prescreverSessao(curto, 2, 1)!.exercicios[1].reps).toEqual([12, 10, 8]) // grupo
    })

    it('vale também para auxiliar e se combina com método', () => {
      const m = com([met({ exercicio: 3, metodo: 'Dropset', etapas: 1, repsPadrao: 0 })], {
        progressaoExercicio: { '1-3': [[20, 20, null, null, null, null]] },
      })
      expect(prescreverSessao(m, 1, 1)!.exercicios[2].reps).toEqual([20, 20, 20]) // etapa usa a última série
    })

    it('sem override = comportamento idêntico', () => {
      expect(prescreverSessao({ ...base, progressaoExercicio: {} }, 1, 1)).toEqual(prescreverSessao(base, 1, 1))
    })
  })
})
