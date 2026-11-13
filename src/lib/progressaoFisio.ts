// A1 do Físio (docs/fisio-a1-proposta.md): sinais de progressão acima do planejado, por exercício e por região.
// Números aprovados pelo Victor em 13/11/2026 (heurísticas, sem calibração científica; docs/fisio-pesquisa-volume.md).
// Só DESCREVE: o cruzamento com dor e a decisão ficam em sugestoesFisio e com o coach. Função pura.
import { prescreverSessao, type Meso } from '../engine'
import { diaSP } from './acesso'
import { anatomiaDo } from './anatomia'
import { docParaReps, normalizarCargas, type RegistroDoc } from './conversores'
import { msSessao } from './resumo'

export const SALTO_FATOR = 1.3 // volume da região na última semana ≥ 1,3× a média das 3 anteriores
export const DIF_REPS = 2 // reps 2 ou mais acima/abaixo do alvo
export const PROPORCAO_SERIES = 0.5 // em metade das séries ou mais
export const SESSOES_SEGUIDAS = 2

export type TipoProgressao = 'repsAcima' | 'cargaEgo' | 'salto'
export type SinalProgressao = {
  alunoId: string
  tipo: TipoProgressao
  articulacoes: string[] // região (ids de lib/anatomia)
  exercicio: string | null // null no salto (é da região)
  texto: string // descrição para o coach e o aluno, sem diagnóstico
  id: string // evento mais recente que sustenta o sinal (para a chave de dispensa)
  em: number
}

type Ts = { toMillis(): number } | null
export type RegistroProgressao = RegistroDoc & { alunoId: string; mesoId: string; realizadoEm?: Ts; atualizadoEm?: Ts; inicioEm?: Ts }
type Serie = { carga: number; feito: number | null; meta: number }
type SessaoEx = { ms: number; id: string; series: Serie[] }

const proporcao = (ss: Serie[], ok: (s: Serie) => boolean) => {
  const feitas = ss.filter((s) => s.feito != null && s.meta > 0)
  return feitas.length ? feitas.filter(ok).length / feitas.length : 0
}
const cargaMax = (ss: Serie[]) => Math.max(0, ...ss.map((s) => s.carga))

// Sessões por exercício (nome) do aluno, com carga, reps feitas e alvo de cada série.
function sessoesPorExercicio(mesos: Map<string, Meso>, registros: RegistroProgressao[], agora: Date) {
  const porNome = new Map<string, SessaoEx[]>()
  const volume: { ms: number; nome: string; kgReps: number }[] = []
  for (const r of registros) {
    const meso = mesos.get(r.mesoId)
    const ms = r.realizado ? msSessao(r, agora) : null // só treino concluído conta
    const sessao = meso && ms != null ? prescreverSessao(meso, r.semana, r.treino) : null
    if (!sessao || ms == null) continue
    const cargas = normalizarCargas(r, Object.fromEntries(sessao.exercicios.map((e) => [e.slot.slotId, e.n])))
    const reps = docParaReps(r.reps)
    for (const e of sessao.exercicios) {
      const series: Serie[] = e.reps.map((meta, k) => ({ carga: cargas[e.slot.slotId]?.[k] ?? 0, feito: reps[e.slot.slotId]?.[k] ?? null, meta }))
        .filter((s) => s.carga > 0 || s.feito != null)
      if (!series.length) continue
      const nome = e.slot.nome.trim()
      porNome.set(nome, [...(porNome.get(nome) ?? []), { ms, id: `${r.mesoId}_s${r.semana}_t${r.treino}`, series }])
      volume.push({ ms, nome, kgReps: series.reduce((a, s) => a + s.carga * (s.feito ?? s.meta), 0) })
    }
  }
  for (const l of porNome.values()) l.sort((a, b) => a.ms - b.ms)
  return { porNome, volume }
}

export function sinaisProgressao(alunoId: string, mesos: Map<string, Meso>, registros: RegistroProgressao[], agora: Date): SinalProgressao[] {
  const { porNome, volume } = sessoesPorExercicio(mesos, registros.filter((r) => r.alunoId === alunoId), agora)
  const sinais: SinalProgressao[] = []
  for (const [nome, ss] of porNome) {
    const arts = anatomiaDo(nome)?.articulacoes ?? []
    if (!arts.length) continue // fora do catálogo: sem região, sem sinal
    const ult = ss.slice(-SESSOES_SEGUIDAS)
    if (ult.length < SESSOES_SEGUIDAS) continue
    const fim = ult[ult.length - 1]
    // 1. Reps acima do planejado (achou leve e não ajustou a carga).
    if (ult.every((s) => proporcao(s.series, (x) => x.feito! >= x.meta + DIF_REPS) >= PROPORCAO_SERIES))
      sinais.push({ alunoId, tipo: 'repsAcima', articulacoes: arts, exercicio: nome, id: fim.id, em: fim.ms,
        texto: `${nome}: reps 2 ou mais acima do planejado nas ${SESSOES_SEGUIDAS} últimas sessões. Carga provavelmente leve: ajustar a carga, não somar reps.` })
    // 2. Carga subindo com reps abaixo do planejado (carga acima do que dá para completar).
    const ant = ss.slice(-SESSOES_SEGUIDAS - 1)
    if (ant.length === SESSOES_SEGUIDAS + 1 && ult.every((s, i) =>
      cargaMax(s.series) > cargaMax(ant[i].series) && proporcao(s.series, (x) => x.feito! <= x.meta - DIF_REPS) >= PROPORCAO_SERIES))
      sinais.push({ alunoId, tipo: 'cargaEgo', articulacoes: arts, exercicio: nome, id: fim.id, em: fim.ms,
        texto: `${nome}: carga subiu e as reps ficaram 2 ou mais abaixo do planejado nas ${SESSOES_SEGUIDAS} últimas sessões. Carga acima do que dá para completar.` })
  }
  // 3. Salto de volume da região: última semana ≥ 1,3× a média das 3 anteriores (comparado com o próprio aluno).
  const hoje = diaSP(agora.getTime())
  const semanaDe = (ms: number) => Math.floor((hoje - diaSP(ms)) / 7) // 0 = últimos 7 dias
  const regioes = new Set(volume.flatMap((v) => anatomiaDo(v.nome)?.articulacoes ?? []))
  for (const art of regioes) {
    const sem = [0, 0, 0, 0]
    let ultimo = { ms: -1, id: '' }
    for (const v of volume) {
      const w = semanaDe(v.ms)
      if (w < 0 || w > 3 || !anatomiaDo(v.nome)?.articulacoes.includes(art)) continue
      sem[w] += v.kgReps
      if (w === 0 && v.ms > ultimo.ms) ultimo = { ms: v.ms, id: `${art}_${v.ms}` }
    }
    const base = (sem[1] + sem[2] + sem[3]) / 3
    if (base > 0 && sem[0] >= SALTO_FATOR * base)
      sinais.push({ alunoId, tipo: 'salto', articulacoes: [art], exercicio: null, id: ultimo.id, em: ultimo.ms,
        texto: `${art}: volume da última semana ${Math.round((sem[0] / base - 1) * 100)}% acima da média das 3 anteriores.` })
  }
  return sinais
}
