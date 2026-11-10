import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { lerAnamnese, PERGUNTAS, TODAS, validarRespostas, VERSAO_ANAMNESE } from './anamnese'

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
