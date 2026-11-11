import { describe, expect, it } from 'vitest'
import { assinaturaMarca, filtrar, montarFeedback, podeConvidar, resumoNotas, textoDepoimento, type Entrada } from './feedback'

const base: Entrada = { nota: 5, assunto: 'app', texto: '', anonimo: false, depoimento: false }

describe('montarFeedback', () => {
  it('anônimo não leva alunoId', () => {
    expect(montarFeedback({ ...base, anonimo: true }, 'u1')).toEqual({ nota: 5, assunto: 'app' })
  })
  it('com nome leva alunoId e não tem campo undefined', () => {
    const f = montarFeedback(base, 'u1')
    expect(f).toEqual({ nota: 5, assunto: 'app', alunoId: 'u1' })
    expect(Object.values(f).some((v) => v === undefined)).toBe(false)
  })
  it('apara e corta o texto em 1000', () => {
    expect(montarFeedback({ ...base, texto: '  oi  ' }, 'u1').texto).toBe('oi')
    expect(montarFeedback({ ...base, texto: 'x'.repeat(1500) }, 'u1').texto).toHaveLength(1000)
  })
  it('tipo só se vier', () => {
    expect(montarFeedback({ ...base, tipo: 'elogio' }, 'u1').tipo).toBe('elogio')
  })
  it('depoimento só se pode: nome, nota 5 e texto', () => {
    const ok = { ...base, texto: 'ótimo', depoimento: true }
    expect(montarFeedback(ok, 'u1').depoimento).toBe(true)
    expect(montarFeedback({ ...ok, anonimo: true }, 'u1').depoimento).toBeUndefined()
    expect(montarFeedback({ ...ok, nota: 4 }, 'u1').depoimento).toBeUndefined()
    expect(montarFeedback({ ...ok, texto: '  ' }, 'u1').depoimento).toBeUndefined()
  })
})

describe('podeConvidar', () => {
  const DIA = 86_400_000
  it('nunca convidado: pode', () => expect(podeConvidar(1e12, null)).toBe(true))
  it('6 dias: não; 7 dias: sim', () => {
    expect(podeConvidar(1e12, 1e12 - 6 * DIA)).toBe(false)
    expect(podeConvidar(1e12, 1e12 - 7 * DIA)).toBe(true)
  })
})

describe('resumoNotas', () => {
  it('vazio: média 0', () => expect(resumoNotas([])).toMatchObject({ media: 0, total: 0 }))
  it('conta por nota e tira a média', () => {
    const r = resumoNotas([{ nota: 5 }, { nota: 5 }, { nota: 2 }])
    expect(r.total).toBe(3)
    expect(r.porNota[5]).toBe(2)
    expect(r.porNota[2]).toBe(1)
    expect(r.media).toBeCloseTo(4)
  })
})

describe('filtrar', () => {
  const l = [
    { id: 1, tipo: 'sugestao' as const, lido: true },
    { id: 2, tipo: 'critica' as const },
    { id: 3, tipo: 'problema' as const, lido: false },
    { id: 4, tipo: 'elogio' as const, depoimento: true as const },
  ]
  const ids = (f: Parameters<typeof filtrar>[1]) => filtrar(l, f).map((x) => x.id)
  it('todos', () => expect(ids('todos')).toEqual([1, 2, 3, 4]))
  it('novos (não lidos)', () => expect(ids('novos')).toEqual([2, 3, 4]))
  it('sugestões', () => expect(ids('sugestoes')).toEqual([1]))
  it('críticas inclui problemas', () => expect(ids('criticas')).toEqual([2, 3]))
  it('depoimentos', () => expect(ids('depoimentos')).toEqual([4]))
})

describe('depoimento pronto', () => {
  it('assinatura da marca', () => {
    expect(assinaturaMarca('do Studio Alfa')).toBe('treina com o Studio Alfa')
    expect(assinaturaMarca('da Gislane')).toBe('treina com a Gislane')
  })
  it('texto com primeiro nome', () => {
    expect(textoDepoimento(' Amei ', 'Maria Souza', 'da Gislane')).toBe('“Amei” — Maria, treina com a Gislane')
  })
})
