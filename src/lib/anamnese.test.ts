import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { Meso } from '../engine'
import {
  anamnesesNovas,
  anamnesesPendentes,
  avisoMedico,
  lerAnamnese,
  contaNovaParaAnamnese,
  maisRecente,
  motivoAnamnese,
  PERGUNTAS,
  precisaAtualizar,
  resumoAnamnese,
  sinaisAtencao,
  TODAS,
  validarRespostas,
  VERSAO_ANAMNESE,
  type Anamnese,
} from './anamnese'

const ts = (ms: number) => ({ toMillis: () => ms })

// Respostas mínimas que as regras aceitam: o PAR-Q inteiro e a declaração.
const minima = () => ({
  coracao: false,
  dorPeito: false,
  tontura: false,
  doencaCronica: false,
  remedio: false,
  ossoArticulacao: false,
  supervisaoMedica: false,
  declaracao: true,
})
const completa = () => ({
  ...minima(),
  coracao: true,
  parqQual: 'Pressão alta, tomo losartana',
  gestante: 'naoSeAplica',
  cirurgia12m: false,
  fuma: false,
  dores: ['ombro', 'lombar'],
  lesoes: 'Entorse no tornozelo em 2020',
  sono: '7a8',
  trabalho: 'sentado',
  estresse: 'medio',
  objetivo: 'hipertrofia',
  experiencia: 'mais2a',
  tempoParado: 'treinando',
  diasSemana: 4,
  minutos: '45a60',
  outrasAtividades: 'Futebol no sábado',
  algoMais: '',
  responsavelConfirmou: true,
})

describe('PERGUNTAS', () => {
  it('5 etapas, chaves únicas, e toda resposta de exemplo é de uma pergunta', () => {
    expect(PERGUNTAS).toHaveLength(5)
    const ids = TODAS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const k of Object.keys(completa())) expect(ids).toContain(k)
  })

  it('versão é inteiro positivo', () => {
    expect(Number.isInteger(VERSAO_ANAMNESE) && VERSAO_ANAMNESE >= 1).toBe(true)
  })
})

describe('validarRespostas', () => {
  it('aceita a mínima e a completa', () => {
    expect(validarRespostas(minima())).toEqual([])
    expect(validarRespostas(completa())).toEqual([])
  })

  it('aponta o PAR-Q que falta e a declaração', () => {
    const { coracao: _, declaracao: __, ...r } = minima()
    expect(validarRespostas(r)).toEqual(['coracao', 'declaracao'])
  })

  it('declaração tem de ser verdadeira; confirmação do responsável, se vier, também', () => {
    expect(validarRespostas({ ...minima(), declaracao: false })).toEqual(['declaracao'])
    expect(validarRespostas({ ...minima(), responsavelConfirmou: false })).toEqual(['responsavelConfirmou'])
  })

  it('tipo errado, opção fora da lista, texto longo, número fora da faixa', () => {
    const casos: [string, unknown][] = [
      ['fuma', 'sim'],
      ['coracao', 1],
      ['gestante', 'talvez'],
      ['dores', ['ombro', 'nariz']],
      ['dores', 'ombro'],
      ['dores', Array(10).fill('ombro')],
      ['parqQual', 'x'.repeat(501)],
      ['algoMais', 5],
      ['diasSemana', 0],
      ['diasSemana', 8],
      ['diasSemana', 3.5],
      ['diasSemana', '3'],
    ]
    for (const [k, v] of casos) expect(validarRespostas({ ...minima(), [k]: v }), `${k}=${JSON.stringify(v)}`).toEqual([k])
  })

  it('chave desconhecida é apontada', () => {
    expect(validarRespostas({ ...minima(), obsCoach: 'x' })).toEqual(['obsCoach'])
  })

  it('aceita os limites', () => {
    expect(validarRespostas({ ...minima(), parqQual: 'x'.repeat(500), diasSemana: 7, dores: [] })).toEqual([])
  })
})

describe('lerAnamnese (leitura com desconfiança)', () => {
  const doc = (extra: object = {}) => ({ alunoId: 'ana', versao: 1, origem: 'aluno', r: completa(), em: ts(1000), atualizadoEm: ts(1000), ...extra })

  it('lê o documento certo', () => {
    expect(lerAnamnese('a1', doc({ obsCoach: 'ok', vistaEm: ts(2000) }))).toEqual({
      id: 'a1',
      alunoId: 'ana',
      versao: 1,
      origem: 'aluno',
      r: completa(),
      em: 1000,
      obsCoach: 'ok',
      vistaEm: 2000,
    })
  })

  it('gravação pendente (em null) continua na lista', () => {
    expect(lerAnamnese('a1', doc({ em: null }))?.em).toBeNull()
  })

  it('descarta sem dono ou sem respostas', () => {
    expect(lerAnamnese('a1', null)).toBeNull()
    expect(lerAnamnese('a1', doc({ alunoId: 5 }))).toBeNull()
    expect(lerAnamnese('a1', doc({ r: 'x' }))).toBeNull()
  })

  it('ignora resposta inválida ou desconhecida e normaliza o resto', () => {
    const a = lerAnamnese('a1', doc({ r: { ...minima(), fuma: 'sim', dores: ['ombro', 'nariz'], hack: 1, diasSemana: 9 }, origem: 'x', versao: 'v', obsCoach: 3, vistaEm: 'ontem' }))!
    expect(a.r).toEqual(minima())
    expect(a).toMatchObject({ origem: 'aluno', versao: 0, obsCoach: '', vistaEm: null })
    expect(lerAnamnese('a1', doc({ origem: 'coach' }))?.origem).toBe('coach')
  })
})

// As chaves e limites existem em dois lugares: aqui e em firestore.rules. Mudou um, mude o outro.
describe('firestore.rules (anamneses)', () => {
  const regras = readFileSync('firestore.rules', 'utf8')
  const ini = regras.indexOf('function respostasValidas')
  const bloco = regras.slice(ini, regras.indexOf('match /anamneses'))
  const lista = (xs: readonly string[]) => `[${xs.map((x) => `'${x}'`).join(', ')}]`

  it('existe a função de validação antes da coleção', () => expect(ini).toBeGreaterThan(0))

  it('hasOnly com todas as chaves e hasAll com as obrigatórias', () => {
    expect(bloco).toContain(`r.keys().hasOnly(${lista(TODAS.map((p) => p.id))})`)
    expect(bloco).toContain(`r.keys().hasAll(${lista(TODAS.filter((p) => 'obrigatoria' in p && p.obrigatoria).map((p) => p.id))})`)
  })

  it.each(TODAS.map((p) => [p.id, p] as const))('%s: mesmo tipo, opções e limites', (id, p) => {
    const esperado =
      p.tipo === 'simnao' ? `simNao(r, '${id}')`
      : p.tipo === 'aceite' ? `aceite(r, '${id}')`
      : p.tipo === 'texto' ? `texto(r, '${id}', ${p.max})`
      : p.tipo === 'inteiro' ? `inteiro(r, '${id}', ${p.min}, ${p.max})`
      : `${p.tipo}(r, '${id}', ${lista(p.opcoes.map((o) => o.id))})`
    expect(bloco).toContain(esperado)
  })
})

const sp = (iso: string) => new Date(`${iso}-03:00`)
const meso = (inicio: string, semanas = 4): Meso => ({ frequencia: 2, semanas, inicio, pausaS: 60, divisao: [[], []], progressao: { principais: [], auxiliares: [] }, metodos: [] })
const doc = (id: string, alunoId: string, r: Record<string, unknown> = {}, extra: Partial<Anamnese> = {}): Anamnese => ({
  id, alunoId, versao: 1, origem: 'aluno', r: { ...minima(), ...r } as Anamnese['r'], em: 1000, obsCoach: '', vistaEm: null, ...extra,
})

describe('sono', () => {
  it('opções sem buraco entre 6 e 7 h', () => {
    const p = TODAS.find((x) => x.id === 'sono')
    expect(p && 'opcoes' in p && p.opcoes.map((o) => o.id)).toEqual(['ate5', '5a7', '7a8', 'mais8'])
  })
})

describe('sinaisAtencao / avisoMedico', () => {
  it('sem sinal: vazio e sem aviso', () => {
    expect(sinaisAtencao(minima())).toEqual([])
    expect(avisoMedico(minima())).toBe(false)
  })
  it('PAR-Q 1, 2, 3 e 7 vêm primeiro', () => {
    const s = sinaisAtencao({ ...minima(), ossoArticulacao: true, supervisaoMedica: true, coracao: true, remedio: true })
    expect(s).toHaveLength(4)
    expect(s.slice(0, 2).join(' ')).toMatch(/coração/i)
    expect(s[1]).toMatch(/supervisão/i)
  })
  it('gestante, cirurgia e dor entram; "nao" e lista vazia não', () => {
    expect(sinaisAtencao({ ...minima(), gestante: 'sim', cirurgia12m: true, dores: ['joelho'] })).toHaveLength(3)
    expect(sinaisAtencao({ ...minima(), gestante: 'nao', cirurgia12m: false, dores: [] })).toEqual([])
  })
  it('dor lista as regiões escolhidas', () => {
    expect(sinaisAtencao({ ...minima(), dores: ['ombro', 'joelho'] })).toEqual(['Dor: ombro, joelho'])
  })
  it('avisoMedico só para "sim" no PAR-Q', () => {
    expect(avisoMedico({ ...minima(), tontura: true })).toBe(true)
    expect(avisoMedico({ ...minima(), gestante: 'sim', dores: ['ombro'] })).toBe(false)
  })
})

describe('resumoAnamnese', () => {
  it('uma linha por resposta dada, com rótulo legível', () => {
    const l = resumoAnamnese(completa())
    expect(l.some((x) => x.includes('Lombar') && x.includes('Ombro'))).toBe(true)
    expect(l.some((x) => x.includes('7 a 8 h'))).toBe(true)
    expect(l.every((x) => x.length > 0)).toBe(true)
  })
  it('usa "pergunta: resposta"', () => {
    expect(resumoAnamnese({ ...minima(), coracao: true, parqQual: 'Pressão alta' })).toContain('Conte qual: Pressão alta')
  })
  it('rótulo que termina em "?" não leva ":"', () => {
    const l = resumoAnamnese({ ...minima(), coracao: true })
    expect(l).toContain('Algum médico já disse que você tem problema no coração ou pressão alta? Sim')
  })
  it('mínima não quebra', () => expect(resumoAnamnese(minima()).length).toBeGreaterThan(0))
})

describe('maisRecente', () => {
  it('maior em; em nulo (pendente) conta como agora', () => {
    expect(maisRecente([doc('a', 'x', {}, { em: 5 }), doc('b', 'x', {}, { em: 9 })])?.id).toBe('b')
    expect(maisRecente([doc('a', 'x', {}, { em: 5 }), doc('b', 'x', {}, { em: null })])?.id).toBe('b')
    expect(maisRecente([])).toBeNull()
  })
})

describe('anamnesesNovas', () => {
  it('só não vistas; com atenção primeiro, depois a mais recente', () => {
    const r = anamnesesNovas([
      doc('vista', 'a', {}, { vistaEm: 5 }),
      doc('velha', 'a', {}, { em: 1 }),
      doc('nova', 'b', {}, { em: 2 }),
      doc('atencao', 'c', { coracao: true }, { em: 0 }),
    ])
    expect(r.map((d) => d.id)).toEqual(['atencao', 'nova', 'velha'])
  })
  it('ignora versões lançadas pelo coach', () => {
    expect(anamnesesNovas([doc('c', 'a', {}, { origem: 'coach' }), doc('x', 'a')]).map((d) => d.id)).toEqual(['x'])
  })
})

describe('precisaAtualizar', () => {
  const agora = sp('2026-11-09T08:00')
  const m2 = meso('2026-10-12') // termina 08/11
  it('primeira quando nunca respondeu', () => expect(precisaAtualizar(null, [], agora)).toBe('primeira'))
  it('ciclo terminou e a última resposta é antiga', () => expect(precisaAtualizar('2026-09-01', [m2], agora)).toBe('ciclo'))
  it('resposta a partir de 7 dias antes do fim vale', () => {
    expect(precisaAtualizar('2026-11-01', [m2], agora)).toBeNull()
    expect(precisaAtualizar('2026-10-31', [m2], agora)).toBe('ciclo')
  })
  it('ciclo em andamento ou terminado há mais de 30 dias: nada', () => {
    expect(precisaAtualizar('2026-09-01', [m2], sp('2026-10-30T08:00'))).toBeNull()
    expect(precisaAtualizar('2026-09-01', [meso('2026-09-01')], agora)).toBeNull()
  })
})

describe('anamnesesPendentes', () => {
  const agora = sp('2026-11-09T08:00')
  const mesos = [
    { id: 'm', alunoId: 'ana', meso: meso('2026-10-12') },
    { id: 'n', alunoId: 'bia', meso: meso('2026-10-12') },
    { id: 'o', alunoId: 'duda', meso: meso('2026-10-12') },
    { id: 'p', alunoId: 'eva', meso: meso('2026-10-12') },
  ]
  const alunos = [
    { id: 'ana', nome: 'Ana', status: 'ativo' },
    { id: 'bia', nome: 'Bia', status: 'ativo' },
    { id: 'cris', nome: 'Cris', status: 'ativo' },
    { id: 'duda', nome: 'Duda', status: 'ativo', presencial: true },
    { id: 'eva', nome: 'Eva', status: 'bloqueado' },
  ]
  const em = Date.parse('2026-11-05T12:00-03:00')
  it('ativo e não presencial; primeira e ciclo', () => {
    const r = anamnesesPendentes(alunos, [doc('d', 'bia', {}, { em })], mesos, agora)
    expect(r).toEqual([
      { alunoId: 'ana', nome: 'Ana', motivo: 'primeira' },
      { alunoId: 'cris', nome: 'Cris', motivo: 'primeira' },
    ])
  })
  it('resposta antiga gera ciclo', () => {
    const r = anamnesesPendentes(alunos, [doc('d', 'bia', {}, { em: Date.parse('2026-09-01T12:00-03:00') })], mesos, agora)
    expect(r.find((x) => x.alunoId === 'bia')?.motivo).toBe('ciclo')
  })
})

describe('motivoAnamnese / contaNovaParaAnamnese', () => {
  it('sem resposta: primeira; com resposta de hoje: nada', () => {
    const agora = sp('2026-11-09T08:00')
    expect(motivoAnamnese([], [], agora)).toBe('primeira')
    expect(motivoAnamnese([doc('a', 'x', {}, { em: agora.getTime() })], [], agora)).toBeNull()
  })
  it('conta nova = criada a partir de 11/11/2026; sem data = antiga', () => {
    expect(contaNovaParaAnamnese(sp('2026-11-11T00:30').getTime())).toBe(true)
    expect(contaNovaParaAnamnese(sp('2026-11-10T23:30').getTime())).toBe(false)
    expect(contaNovaParaAnamnese(undefined)).toBe(false)
  })
})
