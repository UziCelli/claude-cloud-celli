import { describe, expect, it } from 'vitest'
import { prescreverSessao, type Meso } from '../engine'
import { comVolta } from './agenda'
import { arquivadosVencidos, chaveAlerta, MIN_ABAIXO, PROPORCAO_ABAIXO, repsAbaixo, treinosDemorados, type RegistroAlerta } from './alertas'

const agora = new Date('2026-10-07T15:00:00Z')
const DIA = 86400_000
const ts = (ms: number) => ({ toMillis: () => ms }) as never
const ha = (dias: number) => ts(agora.getTime() - dias * DIA)

const linha = [8, 8, 8, null, null, null]
const meso: Meso = {
  frequencia: 2,
  semanas: 4,
  inicio: '2026-10-05',
  pausaS: 60,
  divisao: [[{ slotId: 'a', nome: 'Supino' }, { slotId: 'b', nome: 'Remada' }], [{ slotId: 'c', nome: 'Rosca' }]],
  progressao: { principais: [linha, linha, linha, linha], auxiliares: [linha, linha, linha, linha] },
  metodos: [],
}
const reg = (campos: Partial<RegistroAlerta>): RegistroAlerta => ({ semana: 1, treino: 1, realizado: true, realizadoEm: ha(1), ...campos })
// 6 séries: 3 em a, 3 em b
const abaixoDe3 = reg({ cargas: { a: { s1: 50, s2: 50, s3: 50 }, b: { s1: 40, s2: 40, s3: 40 } }, reps: { a: { s1: 6, s2: 6, s3: 8 }, b: { s1: 8, s2: 8, s3: 8 } } })

describe('repsAbaixo', () => {
  it('limites exatos: 3 séries abaixo de 12 feitas (25%) alerta', () => {
    expect(MIN_ABAIXO).toBe(3)
    expect(PROPORCAO_ABAIXO).toBe(0.25)
    const r = reg({
      cargas: { a: { s1: 1, s2: 1, s3: 1 }, b: { s1: 1, s2: 1, s3: 1 } },
      reps: { a: { s1: 7, s2: 7, s3: 7 }, b: { s1: 8, s2: 8, s3: 8 } },
    })
    const base = repsAbaixo(meso, [r, reg({ treino: 2, cargas: { c: { s1: 1, s2: 1, s3: 1 } }, reps: { c: { s1: 8, s2: 8, s3: 8 } } }), reg({ semana: 2, cargas: { a: { s1: 1, s2: 1, s3: 1 }, b: { s1: 1, s2: 1, s3: 1 } }, reps: { a: { s1: 8, s2: 8, s3: 8 }, b: { s1: 8, s2: 8, s3: 8 } } })], agora)
    // feitas = 6 + 3 + 6 = 15; abaixo 3 -> 20% -> null
    expect(base).toBeNull()
    const exato = repsAbaixo(meso, [r, reg({ treino: 2, cargas: { c: { s1: 1, s2: 1, s3: 1 } }, reps: { c: { s1: 8, s2: 8, s3: 8 } } })], agora)
    // feitas 9, abaixo 3 -> 33%
    expect(exato).toMatchObject({ feitas: 9, abaixo: 3, faltaram: 3 })
    const limite = repsAbaixo(meso, [r, reg({ semana: 2, cargas: { a: { s1: 1, s2: 1 } }, reps: { a: { s1: 8, s2: 8 } } })], agora)
    // 8 feitas, 3 abaixo = 37%; ok. Agora 12 feitas exatas:
    expect(limite).not.toBeNull()
    const doze = repsAbaixo(meso, [r, reg({ semana: 2, cargas: { a: { s1: 1, s2: 1, s3: 1 }, b: { s1: 1, s2: 1, s3: 1 } }, reps: {} })], agora)
    expect(doze).toMatchObject({ feitas: 12, abaixo: 3 })
  })

  it('2 séries abaixo não alerta', () => {
    const duas = reg({ cargas: { a: { s1: 50, s2: 50 } }, reps: { a: { s1: 6, s2: 6 } } })
    expect(repsAbaixo(meso, [duas], agora)).toBeNull()
    expect(repsAbaixo(meso, [abaixoDe3], agora)).toBeNull()
  })

  it('devolve exercícios ordenados, último dia e semana mais recente', () => {
    const a = reg({ cargas: { a: { s1: 1, s2: 1, s3: 1 }, b: { s1: 1, s2: 1, s3: 1 } }, reps: { a: { s1: 6, s2: 6, s3: 6 }, b: { s1: 7, s2: 8, s3: 8 } }, realizadoEm: ha(3) })
    const b = reg({ semana: 2, cargas: { a: { s1: 1 } }, reps: { a: { s1: 5 } }, realizadoEm: ha(1) })
    const r = repsAbaixo(meso, [a, b], agora)!
    expect(r.abaixo).toBe(5)
    expect(r.faltaram).toBe(2 * 3 + 1 + 3)
    expect(r.exercicios[0]).toEqual({ nome: 'Supino', abaixo: 4, faltaram: 9 })
    expect(r.exercicios[1].nome).toBe('Remada')
    expect(r.semana).toBe(2)
    expect(r.ultimoDia).toBe(Math.floor((agora.getTime() - DIA - 3 * 3600_000) / DIA))
  })

  it('sem reps registradas: nada abaixo', () => {
    expect(repsAbaixo(meso, [reg({ cargas: { a: { s1: 50, s2: 50, s3: 50 }, b: { s1: 1, s2: 1, s3: 1 } } })], agora)).toBeNull()
  })

  it('registros fora da janela de 7 dias são ignorados (6 dias entra, 7 não)', () => {
    const r = (d: number) => ({ ...abaixoDe3, reps: { a: { s1: 1, s2: 1, s3: 1 } }, realizadoEm: ha(d) })
    expect(repsAbaixo(meso, [r(6)], agora)).not.toBeNull()
    expect(repsAbaixo(meso, [r(7)], agora)).toBeNull()
  })

  it('usa atualizadoEm quando não há realizadoEm', () => {
    const r = reg({ cargas: { a: { s1: 1, s2: 1, s3: 1 } }, reps: { a: { s1: 1, s2: 1, s3: 1 } }, realizadoEm: undefined, atualizadoEm: ha(2) })
    expect(repsAbaixo(meso, [r], agora)).not.toBeNull()
    expect(repsAbaixo(meso, [{ ...r, atualizadoEm: ha(9) }], agora)).toBeNull()
  })

  it('correção (carga sem Iniciar nem Concluir) não alerta; treino em andamento conta pelo início', () => {
    const baixo = { cargas: { a: { s1: 1, s2: 1, s3: 1 } }, reps: { a: { s1: 1, s2: 1, s3: 1 } } }
    const correcao = reg({ ...baixo, realizado: false, realizadoEm: undefined, atualizadoEm: ha(1) })
    expect(repsAbaixo(meso, [correcao], agora)).toBeNull()
    expect(repsAbaixo(meso, [{ ...correcao, inicioEm: ha(1) }], agora)).not.toBeNull()
  })

  it('drop: etapa de drop abaixo da meta conta como série', () => {
    const comDrop: Meso = {
      ...meso,
      metodos: [{ ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Todas as séries', etapas: 2, repsPadrao: 8, cargaEtapa: [30, 20] }],
    }
    const r = reg({ cargas: { a: { s1: 50, s2: 50, s3: 50, s4: 30, s5: 20 } }, reps: { a: { s1: 8, s2: 8, s3: 7, s4: 6, s5: 5 } } })
    const out = repsAbaixo(comDrop, [r], agora)!
    expect(out).toMatchObject({ feitas: 5, abaixo: 3 }) // s3 (7) + 2 etapas de drop (6 e 5), meta 8
  })

  it('peso do corpo: série só com pc conta como feita', () => {
    const r = reg({ pc: { a: 70 }, realizado: true, reps: { a: { s1: 5, s2: 5, s3: 5 } } })
    expect(repsAbaixo(meso, [r], agora)).toMatchObject({ feitas: 3, abaixo: 3, faltaram: 9 })
  })
})

// Semana de volta (agora = semana 2 deste meso): a meta do aluno é a prescrição com −5%, não a original.
describe('semana de volta nos alertas', () => {
  const m2: Meso = { ...meso, inicio: '2026-09-28' } // 07/10 cai na semana 2
  const sem2 = reg({ semana: 2, realizado: true, cargas: { a: { s1: 1, s2: 1, s3: 1 }, b: { s1: 1, s2: 1, s3: 1 } }, reps: { a: { s1: 7, s2: 7, s3: 7 }, b: { s1: 7, s2: 7, s3: 7 } } })
  const sem1 = reg({ semana: 1, realizado: true, realizadoEm: ha(9) })

  it('reps abaixo comparam com a meta reduzida (8,7,7), então 7,7,7 quase não alerta', () => {
    expect(repsAbaixo(m2, [sem2], agora)).toBeNull() // só s1 de cada exercício fica abaixo: 2 séries
  })
  it('sem volta (semana 1 treinada) a meta é a original e alerta', () => {
    expect(repsAbaixo(m2, [sem1, sem2], agora)).toMatchObject({ abaixo: 6 })
  })
  it('tempo previsto usa a prescrição da volta', () => {
    const normal = prescreverSessao(m2, 2, 1)!.tempoMin
    const volta = prescreverSessao(comVolta(m2, [], agora), 2, 1)!.tempoMin
    expect(volta).toBeLessThan(normal)
    const lim = (p: number) => Math.max(p * 1.3, p + 15)
    const min = (lim(normal) + lim(volta)) / 2 // acima do limite da volta, abaixo do original
    const fim = agora.getTime() - DIA
    const r = reg({ semana: 2, realizado: true, realizadoEm: ts(fim), inicioEm: ts(fim - min * 60_000) })
    expect(treinosDemorados(m2, [r], agora)).toHaveLength(1)
    expect(treinosDemorados(m2, [sem1, r], agora)).toHaveLength(0)
  })
  it('a janela curta só reduz a semana atual (a w−2 pode estar fora dos 14 dias)', () => {
    const m3: Meso = { ...meso, inicio: '2026-09-21' } // 07/10 cai na semana 3; semanas 1 e 2 sem registros
    const r = reg({ semana: 2, realizado: true, cargas: sem2.cargas, reps: sem2.reps })
    expect(repsAbaixo(m3, [r], agora)).toMatchObject({ abaixo: 6 }) // semana 2 mantém a meta original
  })
})

describe('treinosDemorados', () => {
  const previsto = prescreverSessao(meso, 1, 1)!.tempoMin
  const lim = Math.max(previsto * 1.3, previsto + 15)
  const dur = (min: number) => {
    const fim = agora.getTime() - DIA
    return reg({ realizado: true, realizadoEm: ts(fim), inicioEm: ts(fim - min * 60_000) })
  }
  it('alerta no limite e não logo abaixo', () => {
    const ok = Math.ceil(lim)
    const r = treinosDemorados(meso, [dur(ok)], agora)
    expect(r).toHaveLength(1)
    expect(r[0]).toMatchObject({ semana: 1, treino: 1, minutos: ok })
    expect(treinosDemorados(meso, [dur(ok - 1)], agora)).toHaveLength(0)
  })
  it('ignora mais de 180 min, treino fora da janela e sem início', () => {
    expect(treinosDemorados(meso, [dur(181)], agora)).toHaveLength(0)
    const velho = { ...dur(Math.ceil(lim)), realizadoEm: ha(8), inicioEm: ts(agora.getTime() - 8 * DIA - 100 * 60_000) }
    expect(treinosDemorados(meso, [velho], agora)).toHaveLength(0)
    expect(treinosDemorados(meso, [reg({ realizado: true })], agora)).toHaveLength(0)
    expect(treinosDemorados(meso, [{ ...dur(Math.ceil(lim)), realizado: false }], agora)).toHaveLength(0)
  })
})

describe('chaveAlerta', () => {
  it('abaixo: muda com o último dia com reps abaixo', () => {
    expect(chaveAlerta.abaixo('m1', 20000)).toBe('abaixo_m1_20000')
    expect(chaveAlerta.abaixo('m1', 20001)).not.toBe(chaveAlerta.abaixo('m1', 20000))
  })
  it('demorado: um por semana e treino', () => {
    expect(chaveAlerta.demorado('m1', 2, 3)).toBe('demorado_m1_2_3')
  })
  it('acima: muda quando a prescrição (tempo arredondado, pior semana) ou o limite mudam', () => {
    const a = { treino: 2, semana: 3, tempo: 71.4 }
    expect(chaveAlerta.acima('m1', a, 60)).toBe('acima_m1_t2_s3_71_60')
    expect(chaveAlerta.acima('m1', { ...a, tempo: 71.2 }, 60)).toBe(chaveAlerta.acima('m1', a, 60))
    expect(chaveAlerta.acima('m1', { ...a, tempo: 75 }, 60)).not.toBe(chaveAlerta.acima('m1', a, 60))
    expect(chaveAlerta.acima('m1', { ...a, semana: 4 }, 60)).not.toBe(chaveAlerta.acima('m1', a, 60))
    expect(chaveAlerta.acima('m1', a, 65)).not.toBe(chaveAlerta.acima('m1', a, 60))
  })
})

describe('arquivadosVencidos', () => {
  const docs = [
    { id: 'velho', em: ha(15) },
    { id: 'velhoAtual', em: ha(30) },
    { id: 'novo', em: ha(13) },
    { id: 'pendente', em: null }, // hora do servidor ainda não chegou (offline)
    { id: 'semEm' },
  ]
  it('só os com mais de 14 dias que não batem com nenhum alerta atual', () => {
    expect(arquivadosVencidos(docs, new Set(['velhoAtual']), agora)).toEqual(['velho'])
  })
  it('exatamente 14 dias ainda fica', () => {
    expect(arquivadosVencidos([{ id: 'x', em: ha(14) }], new Set(), agora)).toEqual([])
  })
})
