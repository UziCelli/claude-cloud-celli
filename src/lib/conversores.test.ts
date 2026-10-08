import { describe, expect, it } from 'vitest'
import type { Meso, Slot } from '../engine'
import {
  caminhoCarga,
  docParaCargas,
  docParaMeso,
  docParaReps,
  docsParaRegistros,
  docsParaRegistrosReps,
  mesoParaDoc,
  normalizarCargas,
  registroId,
} from './conversores'

const slot = (slotId: string): Slot => ({ slotId, nome: `Ex ${slotId}` })
const linha = (n: number) => Array.from({ length: n }, (_, i) => (i === 1 ? null : 8 + i))

const meso: Meso = {
  frequencia: 3,
  semanas: 11, // > 9 para pegar ordenação w10/w11 vs w2
  inicio: '2026-10-05',
  pausaS: 90,
  divisao: [[slot('a'), slot('b')], [], [slot('c')]],
  trocas: { '2-1-1': slot('x') },
  progressao: {
    principais: Array.from({ length: 11 }, (_, s) => linha(3 + (s % 2))),
    auxiliares: Array.from({ length: 11 }, () => [null, 12]),
  },
  metodos: [
    { ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Todas as séries', etapas: 2, cargaEtapa: [20, null] },
  ],
}

const temArrayDeArray = (v: unknown): boolean =>
  Array.isArray(v)
    ? v.some((x) => Array.isArray(x) || temArrayDeArray(x))
    : v !== null && typeof v === 'object' && Object.values(v).some(temArrayDeArray)

describe('meso <-> documento', () => {
  it('o documento não tem array dentro de array (Firestore proíbe)', () => {
    expect(temArrayDeArray(meso)).toBe(true)
    expect(temArrayDeArray(mesoParaDoc(meso))).toBe(false)
  })

  it('ida e volta sem perda', () => {
    expect(docParaMeso(mesoParaDoc(meso))).toEqual(meso)
  })

  it('config e progressaoExercicio: ida e volta, sem array dentro de array', () => {
    const m: Meso = {
      ...meso,
      progressaoPct: 5,
      limiteReps: 15,
      tempoLimiteMin: 75,
      progressaoExercicio: { '1-3': [[8, 8, 8, null, null, null], [9, 9, 8, null, null, null]] },
    }
    const doc = mesoParaDoc(m)
    expect(doc.progressaoExercicio).toEqual({ '1-3': { w1: [8, 8, 8, null, null, null], w2: [9, 9, 8, null, null, null] } })
    expect(temArrayDeArray(doc)).toBe(false)
    expect(docParaMeso(doc)).toEqual(m)
  })

  it('formato novo: padrao e progressaoExercicio por slotId, ida e volta, sem array dentro de array', () => {
    const l = (...r: number[]) => [...r, ...Array(6 - r.length).fill(null)]
    const m: Meso = {
      ...meso,
      progressao: { ...meso.progressao, padrao: [l(8, 8, 8), l(9, 9, 8)] },
      progressaoExercicio: { 'slot-abc': [l(5, 5), l(6, 6, 6)] },
    }
    const doc = mesoParaDoc(m)
    expect(doc.progressao.padrao).toEqual({ w1: l(8, 8, 8), w2: l(9, 9, 8) })
    expect(doc.progressaoExercicio).toEqual({ 'slot-abc': { w1: l(5, 5), w2: l(6, 6, 6) } })
    expect(temArrayDeArray(doc)).toBe(false)
    expect(docParaMeso(doc)).toEqual(m)
  })

  it('sem padrao: o documento não leva o campo (Firestore recusa undefined) e o meso volta sem ele', () => {
    const doc = mesoParaDoc(meso)
    expect('padrao' in doc.progressao).toBe(false)
    expect(docParaMeso(doc).progressao).not.toHaveProperty('padrao')
  })

  it('sem overrides: o documento leva {} (para limpar no updateDoc) e o meso volta sem o campo', () => {
    expect(mesoParaDoc(meso).progressaoExercicio).toEqual({})
    expect(docParaMeso(mesoParaDoc(meso)).progressaoExercicio).toBeUndefined()
  })

  it('dias de treino: ida e volta; sem dias o documento leva [] (limpa no updateDoc, nunca undefined) e o meso volta sem o campo', () => {
    const doc = mesoParaDoc({ ...meso, dias: [1, 3, 5] })
    expect(doc.dias).toEqual([1, 3, 5])
    expect(docParaMeso(doc)).toEqual({ ...meso, dias: [1, 3, 5] })
    expect(mesoParaDoc(meso).dias).toEqual([])
    expect(mesoParaDoc({ ...meso, dias: undefined }).dias).toEqual([])
    expect(docParaMeso(mesoParaDoc(meso))).not.toHaveProperty('dias')
    const antigo = mesoParaDoc(meso)
    delete antigo.dias // documento gravado antes de existir o campo
    expect(docParaMeso(antigo)).not.toHaveProperty('dias')
  })

  it('ignora campos do documento que não são do motor', () => {
    const doc = { ...mesoParaDoc(meso), alunoId: 'ana', nome: 'Meso 1', criadoEm: 1, atualizadoEm: 2 }
    expect(docParaMeso(doc)).toEqual(meso)
  })
})

describe('registros', () => {
  it('id igual ao da regra: {mesoId}_s{WW}_t{T}', () => {
    expect(registroId('abc', 1, 1)).toBe('abc_s01_t1')
    expect(registroId('abc', 12, 3)).toBe('abc_s12_t3')
  })

  it('caminho da carga: coluna 0 é s1', () => {
    expect(caminhoCarga('t1p2', 0)).toBe('cargas.t1p2.s1')
    expect(caminhoCarga('t1p2', 4)).toBe('cargas.t1p2.s5')
  })

  it('mapa de cargas vira array do motor, buracos = null', () => {
    expect(docParaCargas({ a: { s1: 40, s3: 50 }, b: { s2: null } })).toEqual({ a: [40, null, 50], b: [null, null] })
    expect(docParaCargas(undefined)).toEqual({})
  })

  it('documentos viram Registros do motor por `${semana}-${treino}`', () => {
    expect(
      docsParaRegistros([
        { semana: 1, treino: 2, cargas: { a: { s2: 30 } } },
        { semana: 10, treino: 1 },
      ]),
    ).toEqual({ '1-2': { a: [null, 30] }, '10-1': {} })
  })
})

describe('reps feitas', () => {
  it('mesmo formato das cargas', () => {
    expect(docParaReps({ a: { s1: 12, s3: 8 } })).toEqual({ a: [12, null, 8] })
    expect(docParaReps(undefined)).toEqual({})
  })

  it('documentos viram Registros de reps por `${semana}-${treino}`', () => {
    expect(
      docsParaRegistrosReps([
        { semana: 1, treino: 2, cargas: { a: { s1: 30 } }, reps: { a: { s2: 9 } } },
        { semana: 3, treino: 1 },
      ]),
    ).toEqual({ '1-2': { a: [null, 9] }, '3-1': {} })
  })
})

// Peso do corpo: a célula guarda o TOTAL (extra + pc). Dados de versões antigas são lidos de forma robusta.
describe('normalizarCargas (peso do corpo)', () => {
  const pc = { a: 80 }

  it('(i) célula só com o extra (c < pc) conta c + pc; (iii) c >= pc fica como está', () => {
    expect(normalizarCargas({ cargas: { a: { s1: 2, s2: 82, s3: 80 } }, pc })).toEqual({ a: [82, 82, 80] })
    expect(normalizarCargas({ cargas: { a: { s1: 0 } }, pc })).toEqual({ a: [80] }) // extra 0 = só o corpo
    expect(normalizarCargas({ cargas: { a: { s1: 2.5 } }, pc: { a: 76.4 } })).toEqual({ a: [78.9] })
  })

  it('(ii) célula vazia conta o corpo se o treino foi concluído (só as séries prescritas)', () => {
    expect(normalizarCargas({ cargas: { a: { s1: 2 } }, pc, realizado: true }, { a: 3 })).toEqual({ a: [82, 80, 80] })
    expect(normalizarCargas({ cargas: { a: { s1: null } }, pc, realizado: true }, { a: 2 })).toEqual({ a: [80, 80] })
  })

  it('(ii) célula vazia conta o corpo se a série tem reps feitas, mesmo sem concluir', () => {
    expect(normalizarCargas({ cargas: { a: { s1: 90 } }, reps: { a: { s2: 8 } }, pc }, { a: 3 })).toEqual({ a: [90, 80, null] })
    expect(normalizarCargas({ reps: { a: { s1: 0 } }, pc }, { a: 2 })).toEqual({ a: [null, null] }) // 0 reps não é série feita
  })

  it('não concluído e sem reps: célula vazia continua vazia', () => {
    expect(normalizarCargas({ cargas: { a: { s1: 2 } }, pc }, { a: 3 })).toEqual({ a: [82, null, null] })
    expect(normalizarCargas({ pc }, { a: 3 })).toEqual({ a: [null, null, null] })
  })

  it('drop (coluna >= n): vazia não é preenchida; com extra antigo ganha o corpo', () => {
    expect(normalizarCargas({ cargas: { a: { s4: 10 } }, pc, realizado: true }, { a: 3 })).toEqual({ a: [80, 80, 80, 90] })
    expect(normalizarCargas({ cargas: { a: { s1: 5 } }, reps: { a: { s5: 6 } }, pc, realizado: true }, { a: 3 })).toEqual({ a: [85, 80, 80, null, null] })
  })

  it('sem n: usa o maior índice entre cargas e reps do slot (séries sem nenhum dado não são conhecidas)', () => {
    expect(normalizarCargas({ cargas: { a: { s1: 2 } }, reps: { a: { s3: 8 } }, pc, realizado: true })).toEqual({ a: [82, 80, 80] })
    expect(normalizarCargas({ cargas: { a: { s1: 2 } }, pc, realizado: true })).toEqual({ a: [82] })
  })

  it('slot sem pc (ou pc = 0): nada muda', () => {
    const cargas = { a: { s1: 2, s3: 40 }, b: { s1: 5 } }
    expect(normalizarCargas({ cargas, realizado: true }, { a: 3 })).toEqual(docParaCargas(cargas))
    expect(normalizarCargas({ cargas, pc: { a: 0 }, realizado: true }, { a: 3 })).toEqual(docParaCargas(cargas))
    expect(normalizarCargas({ cargas, pc: { c: 80 } })).toEqual({ ...docParaCargas(cargas), c: [] }) // pc de outro slot não afeta a e b
  })

  it('só os slots com pc mudam', () => {
    expect(normalizarCargas({ cargas: { a: { s1: 2 }, b: { s1: 2 } }, pc: { a: 80 }, realizado: true }, { a: 2, b: 2 })).toEqual({ a: [82, 80], b: [2] })
  })

  it('docsParaRegistros normaliza com o meso (séries prescritas) e com o pc/realizado do documento', () => {
    const w = { principais: [[8, 8, 8, null, null, null]], auxiliares: [[8, 8, 8, null, null, null]] }
    const m: Meso = { ...meso, frequencia: 1, semanas: 1, divisao: [[slot('a')]], progressao: w, metodos: [], trocas: {} }
    const docs = [{ semana: 1, treino: 1, cargas: { a: { s1: 2 } }, pc: { a: 80 }, realizado: true }]
    expect(docsParaRegistros(docs, m)).toEqual({ '1-1': { a: [82, 80, 80] } })
    expect(docsParaRegistros(docs)).toEqual({ '1-1': { a: [82] } }) // sem meso: maior índice
    expect(docsParaRegistrosReps(docs)).toEqual({ '1-1': {} }) // reps nunca mudam
  })
})
