import { prescreverSessao } from './sessao'
import type { Cargas, Meso, Registros, Sessao } from './tipos'

const soma = (xs: number[]) => xs.reduce((s, x) => s + x, 0)
const media = (xs: number[]) => (xs.length ? soma(xs) / xs.length : null)
const numeros = (xs: (number | null)[]) => xs.filter((x): x is number => typeof x === 'number')

// §10 — por exercício. Toda carga preenchida conta (inclui a série 1 [CORRIGIDO]).
export function metricasExercicio(reps: number[], cargas: (number | null)[]) {
  const preenchidas = numeros(cargas)
  return {
    movimentos: soma(reps),
    cargaMedia: media(preenchidas),
    cargaMax: preenchidas.length ? Math.max(...preenchidas) : null,
    volume: soma(cargas.map((c, i) => (c ?? 0) * (reps[i] ?? 0))) || null,
  }
}

// §9 — reps feitas (opcionais) substituem as prescritas onde foram anotadas.
export const repsEfetivas = (prescritas: number[], feitas?: (number | null)[]) =>
  prescritas.map((r, i) => feitas?.[i] ?? r)

// §10 — por sessão: cargaMedia = média das cargaMedia > 0 dos exercícios.
export function metricasSessao(sessao: Sessao, cargas: Cargas, reps: Cargas = {}) {
  const exercicios = sessao.exercicios.map((e) =>
    metricasExercicio(repsEfetivas(e.reps, reps[e.slot.slotId]), cargas[e.slot.slotId] ?? []),
  )
  return {
    exercicios,
    movimentos: soma(exercicios.map((e) => e.movimentos)),
    cargaMedia: media(numeros(exercicios.map((e) => e.cargaMedia)).filter((c) => c > 0)),
    volume: soma(exercicios.map((e) => e.volume ?? 0)) || null,
  }
}

// §10 — por semana (tblMonitoramento)
export function metricasSemana(sessoes: { sessao: Sessao; cargas: Cargas; reps?: Cargas }[]) {
  const ms = sessoes.map((s) => metricasSessao(s.sessao, s.cargas, s.reps))
  const movimentos = soma(ms.map((m) => m.movimentos))
  const cargaMedia = media(numeros(ms.map((m) => m.cargaMedia)))
  const volume = soma(ms.map((m) => m.volume ?? 0)) || null
  const status: 'Ativa' | '' = movimentos || cargaMedia !== null || volume ? 'Ativa' : ''
  return { movimentos, cargaMedia, volume, sessoesAtivas: ms.filter((m) => m.movimentos > 0).length, status }
}

// §12 — cada ocorrência do exercício (pelo nome, já com trocas) em ordem de semana/treino/posição
export function evolucaoExercicio(meso: Meso, registros: Registros, nome: string, reps: Registros = {}) {
  const pontos: {
    ocorrencia: number
    semana: number
    treino: number
    cargaMax: number | null
    cargaMedia: number | null
    volume: number | null
  }[] = []
  for (let semana = 1; semana <= meso.semanas; semana++)
    for (let treino = 1; treino <= meso.frequencia; treino++)
      for (const e of prescreverSessao(meso, semana, treino)!.exercicios)
        if (e.slot.nome === nome) {
          const cargas = registros[`${semana}-${treino}`]?.[e.slot.slotId] ?? []
          const feitas = reps[`${semana}-${treino}`]?.[e.slot.slotId]
          const { cargaMax, cargaMedia, volume } = metricasExercicio(repsEfetivas(e.reps, feitas), cargas)
          pontos.push({ ocorrencia: pontos.length + 1, semana, treino, cargaMax, cargaMedia, volume })
        }
  return pontos
}
