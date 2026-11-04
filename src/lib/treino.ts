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

// Cargas da semana anterior mais recente em que o mesmo treino tinha o mesmo exercício (pelo nome, já com
// trocas e sessões editadas; de preferência na mesma posição) e alguma carga anotada. Lida pelo slotId daquela semana.
// Devolve `series` (S1..Sn daquela semana) e `drops` separados: o n muda entre semanas. `drops[j]` segue os drops
// de hoje: a mesma etapa da mesma série naquela semana, senão a mesma etapa de outra série (o drop mudou de série).
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
  const hoje = prescreverSessao(meso, semana, treino)?.exercicios[pos - 1]
  const alvo = hoje?.slot
  if (!hoje || !alvo) return null
  for (let w = semana - 1; w >= 1; w--) {
    const exs = prescreverSessao(meso, w, treino)?.exercicios ?? []
    const comCarga = (e: (typeof exs)[number]) => e.slot.nome === alvo.nome && registros[`${w}-${treino}`]?.[e.slot.slotId]?.some((c) => c != null)
    const e = [exs[pos - 1], ...exs].find((x) => x && comCarga(x))
    if (!e) continue
    const cargas = registros[`${w}-${treino}`][e.slot.slotId]
    const corpo = pcs?.[`${w}-${treino}`]?.[e.slot.slotId] ?? 0
    const extra = corpo > 0 ? cargas.map((c) => (c == null ? null : Math.max(0, Math.round((c - corpo) * 100) / 100))) : cargas
    const drops = hoje.drops.map(({ serie, etapa }) => {
      const j = e.drops.findIndex((d) => d.serie === serie && d.etapa === etapa)
      const k = j >= 0 ? j : e.drops.findIndex((d) => d.etapa === etapa)
      return k >= 0 ? (extra[e.n + k] ?? null) : null
    })
    return { series: extra.slice(0, e.n), drops }
  }
  return null
}
