// Painel de evolução do aluno e ranking do coach. Funções puras: tudo sai de mesos e registros
// (definições em docs/plano-evolucao.md). Cargas sempre via docsParaRegistros (peso do corpo).
import type { Timestamp } from 'firebase/firestore'
import { metricasExercicio, prescreverSessao, repsEfetivas, type Meso, type Registros } from '../engine'
import { diaSP } from './acesso'
import { docsParaRegistros, docsParaRegistrosReps, type RegistroDoc } from './conversores'

export type RegistroEvolucao = RegistroDoc & {
  mesoId: string
  alunoId?: string
  realizadoEm?: Timestamp | null
  inicioEm?: Timestamp | null
  atualizadoEm?: Timestamp | null
}
export type MesoEvolucao = { id: string; meso: Meso; nome?: string }
export type TreinoFeito = { mesoId: string; semana: number; treino: number; dia: number | null }
export type Ocorrencia = TreinoFeito & { cargaMax: number | null; volume: number | null }
export type Evolucao = { nome: string; de: number; ate: number; kg: number; pct: number }
export type Conquista = {
  id: string
  categoria: 'treinos' | 'sequencia' | 'recordes' | 'toneladas' | 'semanasCompletas'
  titulo: string
  meta: number
  ganha: boolean
  progresso: number // 0..1
  falta: number
}
export type Painel = {
  totalTreinos: number
  semanasSeguidas: number
  melhorSequencia: number
  mediaSemanal: number // treinos por semana nas últimas 8 semanas de calendário
  porSemana: { inicio: number; feitos: number }[] // últimas 12 (inicio = diaSP da segunda), mais antiga primeiro
  meta: number | null // frequência do meso mais recente
  dias: number[] // diaSP com treino nos últimos 84 dias
  topEvolucao: Evolucao[]
  maisConstante: { nome: string; sequencia: number } | null
  recordes: { total: number; ultimos30: number }
  volumeKg: number
  conquistas: Conquista[]
  semanasCompletas: number
}
export type LinhaRanking = {
  id: string
  nome: string
  evolucaoPct: number | null
  feitos4s: number
  previstos4s: number
  semanasSeguidas: number
  recordes30: number
}

const arred = (x: number) => Math.round(x * 100) / 100
const soma = (xs: number[]) => xs.reduce((s, x) => s + x, 0)
// 01/01/1970 foi quinta-feira: segunda = dia − (dia da semana, segunda = 0).
const segunda = (dia: number) => dia - ((dia + 3) % 7)
const diaInicio = (m: Meso) => diaSP(Date.parse(`${m.inicio.slice(0, 10)}T00:00-03:00`))
const porInicio = (a: MesoEvolucao, b: MesoEvolucao) => a.meso.inicio.localeCompare(b.meso.inicio)
const positiva = (c: number | null): c is number => c != null && c > 0
const cargasPositivas = (os: Ocorrencia[]) => os.map((o) => o.cargaMax).filter(positiva)

const temDado = (c: RegistroDoc['cargas']) => Object.values(c ?? {}).some((cols) => Object.values(cols).some((v) => (v ?? 0) > 0))

type Feito = TreinoFeito & { doc: RegistroDoc }

// Treinos feitos (realizado, ou alguma carga/rep > 0), um por meso/semana/treino, em ordem cronológica.
function coletar(mesos: MesoEvolucao[], registros: RegistroEvolucao[]): Feito[] {
  const ordem = new Map([...mesos].sort(porInicio).map((m, i) => [m.id, i]))
  const vistos = new Set<string>()
  const feitos: Feito[] = []
  for (const r of registros) {
    const chave = `${r.mesoId}|${r.semana}|${r.treino}`
    if (!ordem.has(r.mesoId) || vistos.has(chave) || !(r.realizado || temDado(r.cargas) || temDado(r.reps))) continue
    vistos.add(chave)
    const t = r.realizadoEm ?? r.inicioEm ?? r.atualizadoEm
    feitos.push({ mesoId: r.mesoId, semana: r.semana, treino: r.treino, dia: t ? diaSP(t.toMillis()) : null, doc: r })
  }
  return feitos.sort((a, b) => ordem.get(a.mesoId)! - ordem.get(b.mesoId)! || a.semana - b.semana || a.treino - b.treino)
}

export const treinosFeitos = (mesos: MesoEvolucao[], registros: RegistroEvolucao[]): TreinoFeito[] =>
  coletar(mesos, registros).map(({ mesoId, semana, treino, dia }) => ({ mesoId, semana, treino, dia }))

function ocorrencias(mesos: MesoEvolucao[], feitos: Feito[]): Record<string, Ocorrencia[]> {
  const lidos = new Map<string, { cargas: Registros; reps: Registros; meso: Meso }>()
  const out: Record<string, Ocorrencia[]> = {}
  for (const { mesoId, semana, treino, dia } of feitos) {
    let l = lidos.get(mesoId)
    if (!l) {
      const meso = mesos.find((m) => m.id === mesoId)!.meso
      const docs = feitos.filter((f) => f.mesoId === mesoId).map((f) => f.doc)
      l = { meso, cargas: docsParaRegistros(docs, meso), reps: docsParaRegistrosReps(docs) }
      lidos.set(mesoId, l)
    }
    const k = `${semana}-${treino}`
    for (const e of prescreverSessao(l.meso, semana, treino)?.exercicios ?? []) {
      const { cargaMax, volume } = metricasExercicio(repsEfetivas(e.reps, l.reps[k]?.[e.slot.slotId]), l.cargas[k]?.[e.slot.slotId] ?? [])
      ;(out[e.slot.nome] ??= []).push({ mesoId, semana, treino, dia, cargaMax, volume })
    }
  }
  return out
}

// Cada aparição de um exercício (pelo nome, já com trocas) em treino feito, em ordem cronológica.
export const historicoExercicios = (mesos: MesoEvolucao[], registros: RegistroEvolucao[]) =>
  ocorrencias(mesos, coletar(mesos, registros))

function calcular(mesos: MesoEvolucao[], registros: RegistroEvolucao[], hoje: number): Omit<Painel, 'conquistas'> {
  const feitos = coletar(mesos, registros)
  const hist = ocorrencias(mesos, feitos)
  const lista = Object.entries(hist)

  const semanas = new Set(feitos.flatMap((f) => (f.dia == null ? [] : [segunda(f.dia)])))
  const atual = segunda(hoje)
  let semanasSeguidas = 0
  for (let s = semanas.has(atual) ? atual : atual - 7; semanas.has(s); s -= 7) semanasSeguidas++
  let melhorSequencia = 0
  let corrente = 0
  for (const s of [...semanas].sort((a, b) => a - b)) {
    corrente = semanas.has(s - 7) ? corrente + 1 : 1
    melhorSequencia = Math.max(melhorSequencia, corrente)
  }
  const porSemana = Array.from({ length: 12 }, (_, i) => {
    const inicio = atual - 7 * (11 - i)
    return { inicio, feitos: feitos.filter((f) => f.dia != null && segunda(f.dia) === inicio).length }
  })

  const topEvolucao = lista
    .flatMap(([nome, os]) => {
      const cs = cargasPositivas(os)
      const de = cs[0]
      const ate = Math.max(...cs)
      return cs.length >= 2 && ate > de ? [{ nome, de, ate, kg: arred(ate - de), pct: arred(((ate - de) / de) * 100) }] : []
    })
    .sort((a, b) => b.pct - a.pct || b.kg - a.kg)
    .slice(0, 5)

  let maisConstante: Painel['maisConstante'] = null
  const recordes: Ocorrencia[] = []
  for (const [nome, os] of lista) {
    let seq = 0
    let anterior = 0
    for (const c of cargasPositivas(os)) {
      seq = c >= anterior ? seq + 1 : 1
      anterior = c
      if (seq >= 3 && seq > (maisConstante?.sequencia ?? 0)) maisConstante = { nome, sequencia: seq }
    }
    let max = 0
    for (const o of os) {
      if (!positiva(o.cargaMax) || o.cargaMax <= max) continue
      if (max > 0) recordes.push(o) // a 1ª carga do exercício não é recorde
      max = o.cargaMax
    }
  }

  const chaves = new Set(feitos.map((f) => `${f.mesoId}|${f.semana}|${f.treino}`))
  let semanasCompletas = 0
  for (const { id, meso } of mesos)
    for (let s = 1; s <= meso.semanas; s++)
      if (meso.frequencia > 0 && Array.from({ length: meso.frequencia }, (_, t) => chaves.has(`${id}|${s}|${t + 1}`)).every(Boolean)) semanasCompletas++

  return {
    totalTreinos: feitos.length,
    semanasSeguidas,
    melhorSequencia,
    mediaSemanal: arred(soma(porSemana.slice(-8).map((s) => s.feitos)) / 8),
    porSemana,
    meta: [...mesos].sort(porInicio).at(-1)?.meso.frequencia ?? null,
    dias: [...new Set(feitos.flatMap((f) => (f.dia != null && hoje - f.dia < 84 ? [f.dia] : [])))].sort((a, b) => a - b),
    topEvolucao,
    maisConstante,
    recordes: { total: recordes.length, ultimos30: recordes.filter((o) => o.dia != null && hoje - o.dia < 30).length },
    volumeKg: arred(soma(lista.flatMap(([, os]) => os.map((o) => o.volume ?? 0)))),
    semanasCompletas,
  }
}

const METAS = {
  treinos: [1, 10, 25, 50, 100, 200],
  sequencia: [2, 4, 8, 12, 26, 52],
  recordes: [1, 10, 25, 50],
  toneladas: [1, 10, 50, 100, 500],
  semanasCompletas: [1, 4, 12],
} as const

const titulo = (c: Conquista['categoria'], n: number) =>
  ({
    treinos: n === 1 ? 'Primeiro treino' : `${n} treinos`,
    sequencia: `${n} semanas seguidas`,
    recordes: n === 1 ? 'Primeiro recorde' : `${n} recordes`,
    toneladas: n === 1 ? '1 tonelada levantada' : `${n} toneladas levantadas`,
    semanasCompletas: n === 1 ? 'Primeira semana completa' : `${n} semanas completas`,
  })[c]

function conquistas(p: Omit<Painel, 'conquistas'>): Conquista[] {
  const valor = {
    treinos: p.totalTreinos,
    sequencia: p.melhorSequencia,
    recordes: p.recordes.total,
    toneladas: p.volumeKg / 1000,
    semanasCompletas: p.semanasCompletas,
  }
  return (Object.keys(METAS) as Conquista['categoria'][]).flatMap((categoria) =>
    METAS[categoria].map((meta): Conquista => {
      const v = valor[categoria]
      const ganha = v >= meta
      // Toneladas é fracionário: faltam X,Y t, arredondado para cima (toFixed tira o ruído do ponto flutuante).
      const falta = ganha ? 0 : categoria === 'toneladas' ? Math.ceil(Number(((meta - v) * 10).toFixed(6))) / 10 : meta - v
      return { id: `${categoria}-${meta}`, categoria, titulo: titulo(categoria, meta), meta, ganha, progresso: ganha ? 1 : v / meta, falta }
    }),
  )
}

// Com `mesoId` filtra tudo menos as conquistas, que usam sempre todos os dados.
export function painelEvolucao(mesos: MesoEvolucao[], registros: RegistroEvolucao[], agora: Date, mesoId?: string): Painel {
  const hoje = diaSP(agora.getTime())
  const tudo = calcular(mesos, registros, hoje)
  const mostrado = mesoId ? calcular(mesos.filter((m) => m.id === mesoId), registros, hoje) : tudo
  return { ...mostrado, conquistas: conquistas(tudo) }
}

// Do maior para o menor objeto (kg).
const OBJETOS = [
  { kg: 150_000, objeto: 'baleia-azul', plural: 'baleias-azuis' },
  { kg: 41_000, objeto: 'avião 737', plural: 'aviões 737' },
  { kg: 20_000, objeto: 'caminhão', plural: 'caminhões' },
  { kg: 12_000, objeto: 'ônibus', plural: 'ônibus' },
  { kg: 6_000, objeto: 'elefante', plural: 'elefantes' },
  { kg: 1_500, objeto: 'hipopótamo', plural: 'hipopótamos' },
  { kg: 1_000, objeto: 'carro popular', plural: 'carros populares' },
  { kg: 400, objeto: 'piano', plural: 'pianos' },
]

// "48 t ≈ 8 elefantes" diverte mais que "≈ 1 avião": prefere o maior objeto que dá 5 ou mais.
export function comparacaoToneladas(kg: number) {
  const o = OBJETOS.find((x) => kg >= 5 * x.kg) ?? OBJETOS.find((x) => kg >= x.kg)
  return o ? { qtd: Math.round(kg / o.kg), objeto: o.objeto, plural: o.plural } : null
}

// Maior carga máx já feita no exercício (ignorando o registro `excluir`); null se nunca teve carga > 0.
export function recordeAnterior(historico: Record<string, Ocorrencia[]>, nome: string, excluir?: { mesoId: string; semana: number; treino: number }) {
  const cs = cargasPositivas(
    (historico[nome] ?? []).filter((o) => !(o.mesoId === excluir?.mesoId && o.semana === excluir.semana && o.treino === excluir.treino)),
  )
  return cs.length ? Math.max(...cs) : null
}

// Meso atual de cada aluno = o mais recente que já começou. Evolução e frequência (4 últimas semanas de
// calendário, de segunda a domingo) são desse meso; sequência e recordes usam o que foi passado do aluno.
export function rankingAlunos(
  alunos: { id: string; nome: string }[],
  mesos: (MesoEvolucao & { alunoId: string })[],
  registros: RegistroEvolucao[],
  agora: Date,
): LinhaRanking[] {
  const hoje = diaSP(agora.getTime())
  const atual = segunda(hoje)
  return alunos.map(({ id, nome }) => {
    const meus = mesos.filter((m) => m.alunoId === id)
    const todos = calcular(meus, registros, hoje)
    const corrente = meus.filter((m) => diaInicio(m.meso) <= hoje).sort(porInicio).at(-1)
    const c = corrente && calcular([corrente], registros, hoje)
    const top = c?.topEvolucao.slice(0, 3) ?? []
    // Semanas de calendário (das 4 últimas) que o meso cobre.
    const ini = corrente ? diaInicio(corrente.meso) : 0
    const fim = corrente ? ini + 7 * corrente.meso.semanas - 1 : -1
    const cobertas = [0, 1, 2, 3].filter((k) => atual - 7 * k <= fim && atual - 7 * k + 6 >= ini).length
    return {
      id,
      nome,
      evolucaoPct: top.length ? arred(soma(top.map((e) => e.pct)) / top.length) : null,
      feitos4s: c ? soma(c.porSemana.slice(-4).map((s) => s.feitos)) : 0,
      previstos4s: corrente ? corrente.meso.frequencia * cobertas : 0,
      semanasSeguidas: todos.semanasSeguidas,
      recordes30: todos.recordes.ultimos30,
    }
  })
}
