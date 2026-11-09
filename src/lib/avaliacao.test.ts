import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import type { Meso } from '../engine'
import {
  avaliacoesParaFazer,
  BIO,
  cicloDaAvaliacao,
  corteAvaliacoes,
  DOBRAS,
  lerAvaliacao,
  paraDoc,
  PERIMETROS,
  relatorioAvaliacao,
  resultado,
  type Avaliacao,
} from './avaliacao'
import type { RelatorioCiclo } from './relatorio'

const sp = (iso: string) => new Date(`${iso}-03:00`)

const dobras = (mm: number) => Object.fromEntries(DOBRAS.map((d) => [d.id, mm]))
const av = (over: Partial<Avaliacao> = {}): Avaliacao => ({
  id: 'a1',
  alunoId: 'ana',
  data: '2026-11-09',
  pesoKg: 80,
  perimetros: {},
  dobras: {},
  bio: {},
  comentario: '',
  liberado: false,
  ...over,
})

describe('resultado', () => {
  it('IMC = peso / altura²', () => {
    expect(resultado(av({ pesoKg: 80, alturaCm: 180 })).imc).toBe(24.7)
    expect(resultado(av()).imc).toBeNull()
  })

  it('homem: % de gordura pelas 7 dobras (Jackson & Pollock + Siri)', () => {
    // S = 100, 30 anos: D = 1,112 − 0,043499 + 0,0055 − 0,0086478 = 1,0653532; % = (4,95/D − 4,5)·100 = 14,63
    const r = resultado(av({ sexo: 'M', idade: 30, dobras: dobras(100 / 7) }))
    expect(r.somaDobras).toBe(100)
    expect(r.gorduraPct).toBe(14.6)
    expect(r.fonte).toBe('dobras')
    expect(r.massaGordaKg).toBe(11.7) // 80 × 14,6%
    expect(r.massaMagraKg).toBe(68.3)
  })

  it('mulher: fórmula própria', () => {
    // S = 120, 30 anos: D = 1,097 − 0,0563652 + 0,008064 − 0,0038484 = 1,0448504; % = 23,75
    const r = resultado(av({ sexo: 'F', idade: 30, pesoKg: 60, dobras: dobras(120 / 7) }))
    expect(r.gorduraPct).toBe(23.8)
    expect(r.massaGordaKg).toBe(14.3)
    expect(r.massaMagraKg).toBe(45.7)
  })

  it('sem as 7 dobras, sexo ou idade: usa a bioimpedância', () => {
    const seis = { ...dobras(10), coxa: undefined }
    expect(resultado(av({ sexo: 'M', idade: 30, dobras: seis, bio: { gorduraPct: 18 } }))).toMatchObject({ gorduraPct: 18, fonte: 'bio', somaDobras: null })
    expect(resultado(av({ idade: 30, dobras: dobras(10), bio: { gorduraPct: 18 } })).fonte).toBe('bio')
    expect(resultado(av({ sexo: 'M', dobras: dobras(10) }))).toMatchObject({ gorduraPct: null, fonte: null, massaMagraKg: null })
  })

  it('cintura/quadril', () => {
    expect(resultado(av({ perimetros: { cintura: 80, quadril: 100 } })).rcq).toBe(0.8)
    expect(resultado(av({ perimetros: { cintura: 80 } })).rcq).toBeNull()
  })
})

describe('lerAvaliacao', () => {
  const doc = { alunoId: 'ana', data: '2026-11-09', pesoKg: 80, comentario: 'Boa!', liberado: true }

  it('lê o documento e preenche os vazios', () => {
    expect(lerAvaliacao('x', doc)).toEqual({ id: 'x', alunoId: 'ana', data: '2026-11-09', pesoKg: 80, perimetros: {}, dobras: {}, bio: {}, comentario: 'Boa!', liberado: true })
  })

  it('ignora número que não é finito, fora da faixa ou em chave desconhecida', () => {
    const a = lerAvaliacao('x', {
      ...doc,
      alturaCm: 9999,
      idade: 'trinta',
      sexo: 'X',
      perimetros: { cintura: 80, quadril: -1, bracoD: Infinity, outro: 30, coxaD: '50' },
      dobras: { triceps: 12, coxa: 1000 },
      bio: { gorduraPct: 150, visceral: 9 },
    })!
    expect(a.alturaCm).toBeUndefined()
    expect(a.idade).toBeUndefined()
    expect(a.sexo).toBeUndefined()
    expect(a.perimetros).toEqual({ cintura: 80 })
    expect(a.dobras).toEqual({ triceps: 12 })
    expect(a.bio).toEqual({ visceral: 9 })
  })

  it('sem dono, data ou peso válido: null', () => {
    expect(lerAvaliacao('x', { ...doc, pesoKg: 0 })).toBeNull()
    expect(lerAvaliacao('x', { ...doc, data: '09/11/2026' })).toBeNull()
    expect(lerAvaliacao('x', { ...doc, alunoId: 5 })).toBeNull()
    expect(lerAvaliacao('x', null)).toBeNull()
  })
})

describe('paraDoc', () => {
  it('tira vazios e mapas sem medida; nunca undefined', () => {
    const d = paraDoc({ alunoId: 'ana', data: '2026-11-09', pesoKg: 80, alturaCm: undefined, sexo: 'F', idade: 30, perimetros: { cintura: 70, quadril: undefined }, dobras: {}, bio: {}, comentario: '  oi  ' })
    expect(d).toEqual({ alunoId: 'ana', data: '2026-11-09', pesoKg: 80, sexo: 'F', idade: 30, perimetros: { cintura: 70 }, comentario: 'oi' })
    expect(JSON.stringify(d)).not.toContain('undefined')
  })

  it('corta o comentário em 3000', () => {
    expect(paraDoc({ alunoId: 'a', data: '2026-11-09', pesoKg: 80, perimetros: {}, dobras: {}, bio: {}, comentario: 'x'.repeat(4000) }).comentario).toHaveLength(3000)
  })
})

describe('relatorioAvaliacao', () => {
  const primeira = av({ id: 'a0', data: '2026-05-04', pesoKg: 85, alturaCm: 180, bio: { gorduraPct: 25 } })
  const anterior = av({ id: 'a1', data: '2026-08-10', pesoKg: 82, alturaCm: 180, sexo: 'M', idade: 30, dobras: dobras(20), perimetros: { cintura: 90, quadril: 100, bracoD: 35, coxaD: 55 } })
  const atual = av({ id: 'a2', data: '2026-11-09', pesoKg: 80.5, alturaCm: 180, sexo: 'M', idade: 30, dobras: dobras(16), perimetros: { cintura: 87, quadril: 100, bracoD: 36, coxaD: 55.2 } })

  it('id desconhecido: null', () => {
    expect(relatorioAvaliacao([atual], 'nada')).toBeNull()
  })

  it('primeira avaliação: ponto de partida, sem comparação', () => {
    const r = relatorioAvaliacao([primeira], 'a0')!
    expect(r.anterior).toBeNull()
    expect(r.texto[0]).toMatch(/primeira avaliação/)
    expect(r.texto.join(' ')).toContain('Peso: 85 kg')
    expect(r.texto.join(' ')).toContain('25% (bioimpedância)')
    expect(r.grupos[0].linhas.find((l) => l.rotulo === 'Peso')).toEqual({ rotulo: 'Peso', un: 'kg', atual: 85, anterior: null, delta: null })
  })

  it('compara com a anterior por data, não pela ordem da lista', () => {
    const r = relatorioAvaliacao([atual, primeira, anterior], 'a2')!
    expect(r.anterior).toEqual({ data: '2026-08-10', dias: 91 })
    expect(r.grupos[0].linhas.find((l) => l.rotulo === 'Peso')).toEqual({ rotulo: 'Peso', un: 'kg', atual: 80.5, anterior: 82, delta: -1.5 })
    const cintura = r.grupos.find((g) => g.titulo === 'Perímetros')!.linhas.find((l) => l.rotulo === 'Cintura')
    expect(cintura).toEqual({ rotulo: 'Cintura', un: 'cm', atual: 87, anterior: 90, delta: -3 })
  })

  it('texto: peso, gordura, massas, medidas que mais mudaram e total desde a primeira', () => {
    const t = relatorioAvaliacao([primeira, anterior, atual], 'a2')!.texto.join('\n')
    expect(t).toContain('Desde a avaliação de 10/08/2026 (91 dias)')
    expect(t).toContain('Peso: 82 kg → 80,5 kg (−1,5 kg)')
    expect(t).toMatch(/Gordura corporal: [\d,]+% → [\d,]+% \(−[\d,]+ pontos?\)/)
    expect(t).toMatch(/Massa magra: [\d,]+ kg → [\d,]+ kg/)
    expect(t).toContain('cintura −3 cm')
    expect(t).toContain('braço direito +1 cm')
    expect(t).not.toContain('coxa direita') // 0,2 cm: não é mudança
    expect(t).toContain('Desde a primeira avaliação (04/05/2026): peso −4,5 kg')
  })

  it('métodos diferentes de gordura não são comparados', () => {
    const r = relatorioAvaliacao([primeira, anterior], 'a1')!
    const t = r.texto.join('\n')
    expect(t).toContain('outro método')
    expect(t).not.toMatch(/Gordura corporal: .*→/)
    expect(r.grupos[0].linhas.find((l) => l.rotulo === 'Gordura')!.delta).toBeNull()
  })

  it('sem mudança de peso: diz que manteve', () => {
    const t = relatorioAvaliacao([anterior, { ...atual, pesoKg: 82 }], 'a2')!.texto.join('\n')
    expect(t).toContain('Peso: 82 kg (igual à avaliação anterior)')
  })

  it('nunca julga (sem "piorou") e resume o ciclo', () => {
    const ciclo = { nome: 'M7', feitos: 34, previstos: 36, aderenciaPct: 94, recordes: [{}, {}], evolucoes: [{ nome: 'Supino', de: 60, ate: 70, kg: 10, pct: 16.7 }] } as unknown as RelatorioCiclo
    const pior = av({ id: 'a3', data: '2026-12-09', pesoKg: 90, sexo: 'M', idade: 30, dobras: dobras(30) })
    const t = relatorioAvaliacao([atual, pior], 'a3', ciclo)!.texto.join('\n')
    expect(t).not.toMatch(/piorou|pior|ruim/i)
    expect(t).toContain('No ciclo M7 você fez 34 de 36 treinos (94%) e bateu 2 recordes.')
    expect(t).toContain('Maior evolução: Supino, de 60 para 70 kg (+17%).')
  })

  it('só mostra linhas com medida e a soma das dobras', () => {
    const r = relatorioAvaliacao([atual], 'a2')!
    expect(r.grupos.map((g) => g.titulo)).toEqual(['Composição corporal', 'Perímetros', 'Dobras cutâneas'])
    expect(r.grupos[1].linhas.map((l) => l.rotulo)).toEqual(['Cintura', 'Quadril', 'Braço direito', 'Coxa direita'])
    expect(r.grupos[2].linhas.at(-1)).toMatchObject({ rotulo: 'Soma das 7 dobras', atual: 112 })
  })
})

describe('ciclo e lembrete', () => {
  const meso = (inicio: string, semanas = 4): Meso => ({ frequencia: 2, semanas, inicio, pausaS: 60, divisao: [[], []], progressao: { principais: [], auxiliares: [] }, metodos: [] })
  // m1: 07/09 a 04/10; m2: 05/10 a 01/11.
  const m1 = { id: 'm1', alunoId: 'ana', meso: meso('2026-09-07'), nome: 'M1' }
  const m2 = { id: 'm2', alunoId: 'ana', meso: meso('2026-10-05'), nome: 'M2' }

  it('cicloDaAvaliacao: o terminado mais recente até 7 dias depois; senão o em andamento', () => {
    expect(cicloDaAvaliacao([m1, m2], '2026-11-03')).toBe('m2')
    expect(cicloDaAvaliacao([m1, m2], '2026-10-28')).toBe('m2') // 4 dias antes do fim
    expect(cicloDaAvaliacao([m1, m2], '2026-10-10')).toBe('m1') // m2 mal começou
    expect(cicloDaAvaliacao([m1], '2026-09-15')).toBe('m1') // 1º ciclo em andamento
    expect(cicloDaAvaliacao([m1], '2026-09-01')).toBeNull()
    expect(cicloDaAvaliacao([m1], '2027-03-01')).toBeNull() // ciclo antigo demais
  })

  it('avaliacoesParaFazer: ciclo terminado há até 30 dias sem avaliação nova', () => {
    const agora = sp('2026-11-09T08:00')
    expect(avaliacoesParaFazer([m1, m2], [], agora)).toEqual([{ alunoId: 'ana', mesoId: 'm2', nome: 'M2' }])
    expect(avaliacoesParaFazer([m1, m2], [{ alunoId: 'ana', data: '2026-10-26' }], agora)).toEqual([]) // 6 dias antes do fim
    expect(avaliacoesParaFazer([m1, m2], [{ alunoId: 'ana', data: '2026-10-20' }], agora)).toHaveLength(1) // velha demais
    expect(avaliacoesParaFazer([m1, m2], [{ alunoId: 'bia', data: '2026-11-05' }], agora)).toHaveLength(1) // de outra aluna
    expect(avaliacoesParaFazer([m1], [], agora)).toEqual([]) // terminou há 36 dias
    expect(avaliacoesParaFazer([m2], [], sp('2026-10-30T08:00'))).toEqual([]) // ainda em andamento
  })

  it('um lembrete por aluno, o ciclo que terminou por último primeiro', () => {
    const b = { id: 'b1', alunoId: 'bia', meso: meso('2026-10-12'), nome: 'B1' } // termina 08/11
    const r = avaliacoesParaFazer([{ ...m1, meso: meso('2026-09-21') }, m2, b], [], sp('2026-11-09T08:00'))
    expect(r.map((x) => x.mesoId)).toEqual(['b1', 'm2'])
  })

  it('corteAvaliacoes: 37 dias atrás (30 do lembrete + 7 de folga)', () => {
    expect(corteAvaliacoes(sp('2026-11-09T08:00'))).toBe('2026-10-03')
  })
})

// As chaves dos mapas existem em dois lugares: aqui e nas regras. Mudou uma, mude a outra.
describe('firestore.rules', () => {
  const regras = readFileSync('firestore.rules', 'utf8')
  const lista = (ids: readonly { id: string }[]) => `[${ids.map((x) => `'${x.id}'`).join(', ')}]`
  it.each([
    ['perimetros', PERIMETROS],
    ['dobras', DOBRAS],
    ['bio', BIO],
  ] as const)('as chaves de %s são as mesmas das regras', (campo, ids) => {
    expect(regras).toContain(`'${campo}', ${lista(ids)}`)
  })
})
