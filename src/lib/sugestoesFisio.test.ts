import { describe, expect, it } from 'vitest'
import { Timestamp } from 'firebase/firestore'
import type { Checkin } from './checkin'
import type { RelatoDor } from './dor'
import { JANELA_CALCULO_DIAS, sugestoesFisio, type SinalFisio } from './sugestoesFisio'

const agora = new Date('2026-11-13T15:00:00Z')
const diasAtras = (n: number) => Timestamp.fromMillis(agora.getTime() - n * 86400_000)
let seq = 0
const dor = (dias: number, intensidade: number, articulacao = 'joelho', extra: Partial<RelatoDor> = {}): RelatoDor => ({
  id: `d${++seq}`, alunoId: 'ana', exercicio: 'Agachamento Livre Barra', articulacao: articulacao as RelatoDor['articulacao'], tipo: 'dor',
  intensidade, momento: 'durante', texto: '', em: diasAtras(dias), resposta: null, respondidoEm: null, vistoEm: null, ...extra,
})
const ck = (dias: number, sono: number, estresse = sono, cansaco = sono): Checkin => ({ id: `c${++seq}`, alunoId: 'ana', sono, estresse, cansaco, alimentacao: 3, em: diasAtras(dias), sessao: null, dor24h: null })
const rodar = (e: { dores?: RelatoDor[]; checkins?: Checkin[]; sinais?: SinalFisio[] }) =>
  sugestoesFisio({ dores: e.dores ?? [], checkins: e.checkins ?? [], sinais: e.sinais ?? [], agora })
const tipos = (r: ReturnType<typeof rodar>) => r.map((s) => s.tipo).sort()

describe('sugestoesFisio: conversar / encaminhar', () => {
  it('1 relato ≥7 nos últimos 14 dias; sinal de perigo; nada com dor leve isolada', () => {
    expect(tipos(rodar({ dores: [dor(2, 7)] }))).toEqual(['conversar'])
    expect(rodar({ dores: [dor(20, 9)] })).toEqual([]) // antigo
    expect(tipos(rodar({ sinais: [{ alunoId: 'ana', id: 'o1', em: diasAtras(1).toMillis() }] }))).toEqual(['conversar'])
    expect(rodar({ dores: [dor(1, 3)] })).toEqual([])
  })
  it('dor ≥4 na mesma articulação em 3 dias diferentes, ou por mais de 14 dias', () => {
    expect(tipos(rodar({ dores: [dor(10, 4, 'ombro'), dor(6, 4, 'ombro'), dor(1, 4, 'ombro')] }))).toContain('conversar')
    expect(rodar({ dores: [dor(20, 4, 'lombar'), dor(1, 5, 'lombar')] }).find((s) => s.tipo === 'conversar')?.motivo).toMatch(/14 dias/)
  })
  it('3 relatos seguidos subindo', () => {
    expect(rodar({ dores: [dor(5, 1, 'quadril'), dor(3, 2, 'ombro'), dor(1, 3, 'joelho')] })[0].motivo).toMatch(/subindo/)
  })
  it('"outra sensação" não conta como dor', () => {
    expect(rodar({ dores: [dor(1, 9, 'joelho', { tipo: 'sensacao' })] })).toEqual([])
  })
})

describe('sugestoesFisio: polimento / reduzir volume', () => {
  it('2 relatos 4–6 na mesma articulação em 14 dias', () => {
    expect(tipos(rodar({ dores: [dor(9, 4), dor(2, 5)] }))).toEqual(['polimento'])
    expect(rodar({ dores: [dor(9, 4, 'ombro'), dor(2, 5, 'joelho')] })).toEqual([])
  })
  it('3 check-ins seguidos com recuperação ≤7/15; um bom no meio quebra', () => {
    expect(tipos(rodar({ checkins: [ck(5, 2), ck(3, 2), ck(1, 2)] }))).toEqual(['polimento'])
    expect(rodar({ checkins: [ck(5, 2), ck(3, 5), ck(1, 2)] })).toEqual([])
  })
  it('queda ≥30% sobre a média do próprio aluno só com histórico suficiente', () => {
    const base = [20, 18, 16, 14, 12, 10].map((d) => ck(d, 5, 5, 4)) // soma 14
    const ruins = [ck(5, 3, 3, 3), ck(3, 3, 3, 3), ck(1, 3, 3, 3)] // soma 9 (≤ 14 × 0,7)
    expect(rodar({ checkins: [...base, ...ruins] }).find((s) => s.tipo === 'polimento')?.motivo).toMatch(/30%/)
    expect(rodar({ checkins: [...base.slice(0, 5), ...ruins] })).toEqual([])
  })
})

describe('sugestoesFisio: chave para dispensar', () => {
  it('muda quando chega um dado novo e separa por aluno', () => {
    const a = rodar({ dores: [dor(2, 8)] })[0].chave
    const b = rodar({ dores: [dor(2, 8), dor(1, 8)] })[0].chave
    expect(a).not.toEqual(b)
    const bia = rodar({ dores: [dor(1, 8, 'joelho', { alunoId: 'bia' })] })
    expect(bia[0].alunoId).toBe('bia')
    expect(bia[0].chave).toMatch(/^fisio_conversar_bia_/)
  })
})

describe('revisão do PR (F2, F4)', () => {
  const sinal = (id: string, dias: number): SinalFisio => ({ alunoId: 'ana', id, em: diasAtras(dias).toMillis() })
  it('F2: novo sinal em orientação mais antiga gera chave nova (a dispensa da anterior não esconde)', () => {
    const antes = rodar({ sinais: [sinal('A', 3)] })[0].chave
    const depois = rodar({ sinais: [sinal('A', 3), sinal('B', 1)] })[0].chave
    expect(depois).not.toEqual(antes)
  })
  it('F2: dor forte nova depois de um sinal antigo também gera chave nova (motivo continua o mais importante)', () => {
    const antes = rodar({ sinais: [sinal('A', 5)] })[0]
    const depois = rodar({ sinais: [sinal('A', 5)], dores: [dor(1, 8)] })[0]
    expect(depois.chave).not.toEqual(antes.chave)
    expect(depois.motivo).toMatch(/sinal de perigo/)
  })
  it('F4: base de 29–39 dias atrás + 3 ruins recentes → queda de 30% (a janela cobre 42 dias)', () => {
    expect(JANELA_CALCULO_DIAS).toBeGreaterThanOrEqual(42)
    const base = [39, 37, 35, 33, 31, 29].map((d) => ck(d, 5, 5, 4))
    const ruins = [ck(12, 3, 3, 3), ck(8, 3, 3, 3), ck(2, 3, 3, 3)]
    expect(rodar({ checkins: [...base, ...ruins] }).find((s) => s.tipo === 'polimento')?.motivo).toMatch(/30%/)
  })
  it('a própria função ignora o que está fora da janela (mesmo resultado com consulta maior ou menor)', () => {
    const velho = dor(JANELA_CALCULO_DIAS + 5, 5)
    const recente = dor(1, 5)
    expect(rodar({ dores: [velho, recente] })).toEqual(rodar({ dores: [recente] }))
  })
})
