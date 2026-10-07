// Alertas do coach e do aluno, calculados no aparelho a partir dos registros (sem dado novo). Funções puras.
import { prescreverSessao, type Meso } from '../engine'
import { diaSP } from './acesso'
import { docParaReps, normalizarCargas, type RegistroDoc } from './conversores'

export const JANELA_DIAS = 7
export const MIN_ABAIXO = 3 // séries abaixo da meta para alertar
export const PROPORCAO_ABAIXO = 0.25 // e pelo menos 25% das séries feitas
export const DEMORA_FATOR = 1.3
export const DEMORA_MIN = 15
export const DEMORA_MAX = 180 // acima disso o aluno esqueceu de concluir

type Ts = { toMillis(): number } | null
export type RegistroAlerta = RegistroDoc & { realizadoEm?: Ts; atualizadoEm?: Ts; inicioEm?: Ts }

const dentro = (ms: number | undefined, agora: Date): ms is number =>
  ms != null && diaSP(agora.getTime()) - diaSP(ms) < JANELA_DIAS

export function repsAbaixo(meso: Meso, registros: RegistroAlerta[], agora: Date) {
  let feitas = 0, abaixo = 0, faltaram = 0, ultimo = { ms: -1, dia: 0, semana: 0 }
  const porNome = new Map<string, { abaixo: number; faltaram: number }>()
  for (const r of registros) {
    const ms = (r.realizadoEm ?? r.atualizadoEm)?.toMillis()
    const sessao = dentro(ms, agora) ? prescreverSessao(meso, r.semana, r.treino) : null
    if (!sessao) continue
    const cargas = normalizarCargas(r, Object.fromEntries(sessao.exercicios.map((e) => [e.slot.slotId, e.n])))
    const reps = docParaReps(r.reps)
    let achou = false
    for (const e of sessao.exercicios) {
      const id = e.slot.slotId
      e.reps.forEach((meta, k) => {
        const feito = reps[id]?.[k] ?? null
        if (!((cargas[id]?.[k] ?? 0) > 0 || feito != null)) return
        feitas++
        if (feito == null || !(meta > 0) || feito >= meta) return
        abaixo++
        faltaram += meta - feito
        achou = true
        const x = porNome.get(e.slot.nome) ?? { abaixo: 0, faltaram: 0 }
        porNome.set(e.slot.nome, { abaixo: x.abaixo + 1, faltaram: x.faltaram + meta - feito })
      })
    }
    if (achou && ms! > ultimo.ms) ultimo = { ms: ms!, dia: diaSP(ms!), semana: r.semana }
  }
  if (abaixo < MIN_ABAIXO || abaixo / feitas < PROPORCAO_ABAIXO) return null
  const exercicios = [...porNome].map(([nome, v]) => ({ nome, ...v })).sort((a, b) => b.abaixo - a.abaixo || b.faltaram - a.faltaram)
  return { feitas, abaixo, faltaram, exercicios, ultimoDia: ultimo.dia, semana: ultimo.semana }
}

export function treinosDemorados(meso: Meso, registros: RegistroAlerta[], agora: Date) {
  const lista: { semana: number; treino: number; minutos: number; previsto: number }[] = []
  for (const r of registros) {
    const fim = r.realizadoEm?.toMillis(), ini = r.inicioEm?.toMillis()
    if (!r.realizado || ini == null || !dentro(fim, agora)) continue
    const previsto = prescreverSessao(meso, r.semana, r.treino)?.tempoMin
    if (previsto == null) continue
    const min = (fim - ini) / 60_000
    if (min > DEMORA_MAX || min < previsto * DEMORA_FATOR || min - previsto < DEMORA_MIN) continue
    lista.push({ semana: r.semana, treino: r.treino, minutos: Math.round(min), previsto: Math.round(previsto) })
  }
  return lista
}
