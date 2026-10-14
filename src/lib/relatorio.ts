// Relatório do fim do ciclo (meso). Funções puras: os números saem na hora de mesos e registros
// (evolucao.ts, cargas via docsParaRegistros = peso do corpo); relatorios/{mesoId} guarda só o comentário.
import type { Meso } from '../engine'
import { diaSP } from './acesso'
import { historicoExercicios, painelEvolucao, recordesDe, treinosFeitos, type Evolucao, type MesoEvolucao, type RegistroEvolucao } from './evolucao'
import { duracaoTreino } from './resumo'
import { semanaAtual } from './treino'

export type RelatorioCiclo = {
  nome: string
  inicio: string // YYYY-MM-DD
  fim: string // YYYY-MM-DD, último dia do ciclo
  semanas: number
  frequencia: number
  feitos: number
  previstos: number // até a semana atual (ciclo terminado: todas)
  aderenciaPct: number // 0..100, inteiro
  semanasCompletas: number
  porSemana: { semana: number; feitos: number; previstos: number; volumeKg: number; movimentos: number }[]
  evolucoes: Evolucao[] // top 5 do ciclo
  recordes: { nome: string; kg: number; semana: number; treino: number }[] // contra todo o histórico do aluno
  volumeKg: number
  movimentos: number
  tempoMedioMin: number | null // realizadoEm − inicioEm; duração acima do teto (duracaoTreino: 3 h, esqueceu de concluir) não conta
}

const DIA = 86400_000
const arred = (x: number) => Math.round(x * 100) / 100
const soma = (xs: number[]) => xs.reduce((s, x) => s + x, 0)
const fimISO = (m: Meso) => new Date(Date.parse(`${m.inicio.slice(0, 10)}T12:00Z`) + (7 * m.semanas - 1) * DIA).toISOString().slice(0, 10)

// `mesos` e `registros`: todos os do aluno (os recordes comparam com os ciclos anteriores).
export function relatorioCiclo(mesos: MesoEvolucao[], registros: RegistroEvolucao[], mesoId: string, agora: Date): RelatorioCiclo | null {
  const m = mesos.find((x) => x.id === mesoId)
  if (!m) return null
  const { meso } = m
  const sa = semanaAtual(meso, agora)
  const decorridas = sa.estado === 'antes' ? 0 : sa.semana
  const feitos = treinosFeitos([m], registros)
  const hist = historicoExercicios(mesos, registros)
  const doCiclo = Object.values(hist).flat().filter((o) => o.mesoId === mesoId)
  const painel = painelEvolucao([m], registros, agora, mesoId)
  const tempos = registros.flatMap((r) => {
    if (r.mesoId !== mesoId || !r.realizado) return []
    const ms = duracaoTreino(r.inicioEm?.toMillis(), r.realizadoEm?.toMillis())
    return ms != null ? [ms / 60_000] : []
  })
  const previstos = meso.frequencia * decorridas
  return {
    nome: m.nome ?? '',
    inicio: meso.inicio.slice(0, 10),
    fim: fimISO(meso),
    semanas: meso.semanas,
    frequencia: meso.frequencia,
    feitos: feitos.length,
    previstos,
    aderenciaPct: previstos ? Math.round((feitos.length / previstos) * 100) : 0,
    semanasCompletas: painel.semanasCompletas,
    porSemana: Array.from({ length: decorridas }, (_, i) => {
      const os = doCiclo.filter((o) => o.semana === i + 1)
      return {
        semana: i + 1,
        feitos: feitos.filter((f) => f.semana === i + 1).length,
        previstos: meso.frequencia,
        volumeKg: arred(soma(os.map((o) => o.volume ?? 0))),
        movimentos: soma(os.map((o) => o.movimentos)),
      }
    }),
    evolucoes: painel.topEvolucao,
    recordes: recordesDe(hist)
      .filter((o) => o.mesoId === mesoId)
      .map((o) => ({ nome: o.nome, kg: o.cargaMax!, semana: o.semana, treino: o.treino })),
    volumeKg: painel.volumeKg,
    movimentos: soma(doCiclo.map((o) => o.movimentos)),
    tempoMedioMin: tempos.length ? Math.round(soma(tempos) / tempos.length) : null,
  }
}

export const cicloTerminou = (meso: Meso, agora: Date) => semanaAtual(meso, agora).estado === 'depois'

export const RELATORIO_DIAS = 30

// Dias desde o último dia do ciclo (1 = terminou ontem).
const diasDesdeFim = (m: Meso, agora: Date) => diaSP(agora.getTime()) - diaSP(Date.parse(`${fimISO(m)}T12:00-03:00`))

// Início do coach: ciclos terminados há até 30 dias sem relatório liberado, o mais recente primeiro.
// `liberados`: ids (mesoId) dos relatórios com liberado == true. Aluno arquivado: filtrar antes.
export const relatoriosParaRevisar = (mesos: MesoEvolucao[], liberados: Set<string>, agora: Date) =>
  mesos
    .filter((m) => cicloTerminou(m.meso, agora) && diasDesdeFim(m.meso, agora) <= RELATORIO_DIAS && !liberados.has(m.id))
    .sort((a, b) => diasDesdeFim(a.meso, agora) - diasDesdeFim(b.meso, agora))
