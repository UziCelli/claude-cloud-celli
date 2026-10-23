// Ajudas da tela do aluno. Funções puras.
import { prescreverSessao, type Meso, type Registros } from '../engine'
import { diaSP } from './acesso'

// Semana w cobre os dias [inicio + 7(w−1), inicio + 7w), contados no calendário de São Paulo.
export function semanaAtual(meso: Meso, hoje: Date) {
  const d = diaSP(hoje.getTime()) - diaSP(Date.parse(`${meso.inicio.slice(0, 10)}T00:00-03:00`))
  if (d < 0) return { estado: 'antes' as const, semana: 1, diasParaComecar: -d }
  const semana = Math.floor(d / 7) + 1
  if (semana > meso.semanas) return { estado: 'depois' as const, semana: meso.semanas }
  return { estado: 'durante' as const, semana }
}

// Cargas da semana anterior mais recente em que a mesma posição do treino tinha o mesmo
// exercício (pelo nome, já com trocas) e alguma carga anotada. Lida pelo slotId daquela semana.
// Devolve `series` (S1..Sn daquela semana) e `drops` (D1.. daquela semana) separados: o n muda entre semanas.
// Sem `pcs`, devolve o total gravado. Com `pcs` (`${semana}-${treino}` -> { slotId: kg do corpo }),
// devolve só o extra: total menos o corpo DAQUELE registro (o de hoje pode ser outro), nunca negativo.
export function cargaAnterior(
  meso: Meso,
  registros: Registros,
  semana: number,
  treino: number,
  pos: number,
  pcs?: Record<string, Record<string, number> | undefined>,
) {
  const slot = (w: number) => meso.trocas?.[`${w}-${treino}-${pos}`] ?? meso.divisao[treino - 1]?.[pos - 1]
  const alvo = slot(semana)
  if (!alvo) return null
  for (let w = semana - 1; w >= 1; w--) {
    const s = slot(w)
    if (s?.nome !== alvo.nome) continue
    const cargas = registros[`${w}-${treino}`]?.[s.slotId]
    if (!cargas?.some((c) => c != null)) continue
    const corpo = pcs?.[`${w}-${treino}`]?.[s.slotId] ?? 0
    const extra = corpo > 0 ? cargas.map((c) => (c == null ? null : Math.max(0, Math.round((c - corpo) * 100) / 100))) : cargas
    const n = prescreverSessao(meso, w, treino)?.exercicios[pos - 1]?.n ?? extra.length
    return { series: extra.slice(0, n), drops: extra.slice(n) }
  }
  return null
}
