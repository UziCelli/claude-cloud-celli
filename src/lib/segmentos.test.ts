import { describe, expect, it } from 'vitest'
import catalogo from '../data/exercicios.json'
import { cargaPorSegmento, cruzar, segmentoDoExercicio } from './segmentos'
import type { Ocorrencia } from './evolucao'
import { diaSP } from './acesso'

describe('segmentoDoExercicio', () => {
  it('todo exercício do catálogo cai em um segmento (só Power Exercises é ignorado)', () => {
    for (const g of catalogo) for (const e of g.exercicios) expect(segmentoDoExercicio(e.nome) === null, `${g.grupo}: ${e.nome}`).toBe(g.grupo === 'Power Exercises')
  })
  it('grupos simples', () => {
    expect(segmentoDoExercicio('Leg Press 45')).toBe('coxas')
    expect(segmentoDoExercicio('Mesa Flexora')).toBe('coxas')
    expect(segmentoDoExercicio('Panturrilha em Pé Máquina')).toBe('panturrilhas')
    expect(segmentoDoExercicio('Rosca Punho Barra Reta')).toBe('antebracos')
  })
  it('divisões por nome', () => {
    expect(segmentoDoExercicio('Elevação Pélvica Barra')).toBe('quadril')
    expect(segmentoDoExercicio('Glúteo Coice Máquina')).toBe('quadril')
    expect(segmentoDoExercicio('Cadeira Abdutora')).toBe('quadril')
    expect(segmentoDoExercicio('Monster Walk Elástico no Pé')).toBe('quadril')
    expect(segmentoDoExercicio('Cadeira Adutora')).toBe('coxas')
    expect(segmentoDoExercicio('Lombar Máquina')).toBe('costas')
    expect(segmentoDoExercicio('Abdominal Paralela')).toBe('abdomen')
  })
  it('nome fora do catálogo ou de Power Exercises: null; acento e caixa não importam', () => {
    expect(segmentoDoExercicio('Exercício inventado')).toBeNull()
    expect(segmentoDoExercicio('Snatch')).toBeNull()
    expect(segmentoDoExercicio('elevacao pelvica barra')).toBe('quadril')
  })
})

const dia = (iso: string) => diaSP(Date.parse(`${iso}T12:00Z`))
const oc = (iso: string | null, cargaMax: number | null): Ocorrencia => ({ mesoId: 'm', semana: 1, treino: 1, dia: iso ? dia(iso) : null, conta: true, cargaMax, volume: null, movimentos: 0 })

describe('cargaPorSegmento', () => {
  const hist = {
    'Leg Press 45': [oc('2026-10-01', 100), oc('2026-10-10', 200), oc('2026-10-20', 230), oc('2026-12-01', 400)],
    'Mesa Flexora': [oc('2026-10-10', 40), oc('2026-10-25', 44)],
    'Cadeira Extensora Tradicional': [oc('2026-10-12', 50), oc('2026-10-22', 50)],
    'Supino Reto Barra': [oc('2026-10-12', 60), oc(null, 90)],
    Snatch: [oc('2026-10-12', 20), oc('2026-10-20', 40)],
  } as Record<string, Ocorrencia[]>
  const r = cargaPorSegmento(hist, '2026-10-05', '2026-11-09')

  it('janela entre as avaliações; mediana dos exercícios; melhor exercício', () => {
    expect(r.coxas).toMatchObject({ n: 3, classe: 'sobe', melhor: { nome: 'Leg Press 45', de: 200, ate: 230 } })
    expect(r.coxas!.pct).toBeCloseTo(10) // variações 15%, 10%, 0% → mediana 10%
  })
  it('exige 2 cargas positivas na janela; sem dia fica fora; Power ignorado', () => {
    expect(r.peito).toBeUndefined() // a 2ª ocorrência não tem dia
    expect(Object.keys(r)).toEqual(['coxas'])
  })
  it('classes: ±2% e janela de 0 dias', () => {
    const h = (a: number, b: number) => ({ 'Leg Press 45': [oc('2026-10-10', a), oc('2026-10-20', b)] })
    expect(cargaPorSegmento(h(100, 101), '2026-10-05', '2026-11-09').coxas!.classe).toBe('estavel')
    expect(cargaPorSegmento(h(100, 98), '2026-10-05', '2026-11-09').coxas!.classe).toBe('cai')
    expect(cargaPorSegmento(h(100, 102), '2026-10-05', '2026-11-09').coxas!.classe).toBe('sobe')
    expect(cargaPorSegmento(h(100, 150), '2026-10-10', '2026-10-10')).toEqual({})
    const tres = (a: number, b: number, c: number) => ({ 'Leg Press 45': [oc('2026-10-10', a), oc('2026-10-15', b), oc('2026-10-20', c)] })
    expect(cargaPorSegmento(tres(100, 120, 90), '2026-10-05', '2026-11-09').coxas!.classe).toBe('sobe')
    expect(cargaPorSegmento(tres(100, 101, 80), '2026-10-05', '2026-11-09').coxas!.classe).toBe('cai')
    const corr = { 'Leg Press 45': [oc('2026-10-10', 100), { ...oc('2026-10-15', 200), conta: false }] }
    expect(cargaPorSegmento(corr, '2026-10-05', '2026-11-09')).toEqual({}) // correção fica fora
  })
})

describe('cruzar', () => {
  const bom = { tom: 'bom', texto: 'provável ganho de massa' } as const
  const perda = { tom: 'bom', texto: 'perda de gordura' } as const
  const atencao = { tom: 'atencao', texto: 'medida e dobra subiram: provável gordura' } as const
  const estavel = { tom: 'neutro', texto: 'estável' } as const
  it('medida boa', () => {
    expect(cruzar(bom, 'sobe')).toMatchObject({ veredito: 'melhorou', tom: 'bom', texto: 'ganho de massa, confirmado pela carga' })
    expect(cruzar(bom, 'estavel')).toMatchObject({ veredito: 'melhorou', texto: 'provável ganho, sem confirmar pela carga' })
    expect(cruzar(bom, null)).toMatchObject({ veredito: 'melhorou', texto: 'provável ganho, sem confirmar pela carga' })
    expect(cruzar(perda, 'estavel')).toMatchObject({ veredito: 'melhorou', texto: 'perda de gordura' })
    expect(cruzar(bom, 'cai')).toMatchObject({ veredito: 'observar', tom: 'atencao', texto: 'medida melhorou, mas a carga caiu' })
  })
  it('medida estável', () => {
    expect(cruzar(estavel, 'sobe')).toMatchObject({ veredito: 'melhorou', texto: 'mais forte, medida estável' })
    expect(cruzar(estavel, 'estavel')).toMatchObject({ veredito: 'estavel', tom: 'neutro', texto: 'sem mudança' })
  })
  it('medida pede atenção', () => {
    expect(cruzar(atencao, 'sobe')).toMatchObject({ veredito: 'observar', texto: 'mais forte, mas a medida pede atenção' })
    expect(cruzar(atencao, 'estavel')).toMatchObject({ veredito: 'observar', texto: atencao.texto })
    expect(cruzar(atencao, 'cai')).toMatchObject({ veredito: 'observar', texto: atencao.texto })
  })
  it('medida neutra que não é "estável" só vira atenção se o tom for atenção', () => {
    expect(cruzar({ tom: 'neutro', texto: 'subiu sem aumento de dobra (pode ser massa ou líquido)' }, 'sobe')).toMatchObject({ veredito: 'melhorou', texto: 'mais forte' })
  })
  it('sem medida', () => {
    expect(cruzar(null, 'sobe')).toMatchObject({ veredito: 'melhorou', texto: 'mais forte (só pela carga)' })
    expect(cruzar(null, 'cai')).toMatchObject({ veredito: 'observar', texto: 'carga caiu' })
    expect(cruzar(null, 'estavel')).toMatchObject({ veredito: 'estavel' })
    expect(cruzar(null, null)).toBeNull()
  })
  it('leitura fraca é mantida; nunca "piorou"', () => {
    expect(cruzar({ tom: 'bom', texto: 'subiu, sem dobra para confirmar', fraca: true }, null)!.fraca).toBe(true)
    for (const m of [bom, atencao, estavel, null]) for (const c of ['sobe', 'cai', 'estavel', null] as const) expect(JSON.stringify(cruzar(m, c))).not.toMatch(/pior/i)
  })
})
