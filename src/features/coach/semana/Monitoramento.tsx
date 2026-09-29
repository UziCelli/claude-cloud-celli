import { metaCiclo, metaRobusta, metricasSemana, prescreverSessao, type Cargas, type Meso, type Registros } from '../../../engine'
import { Cartao } from '../../../ui'
import { fmt } from './format'

export default function Monitoramento({ meso, registros, reps = {} }: { meso: Meso; registros: Registros; reps?: Registros }) {
  const semanas = Array.from({ length: meso.semanas }, (_, i) => i + 1).map((semana) => {
    const sessoes = Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((treino) => ({
      sessao: prescreverSessao(meso, semana, treino)!,
      cargas: (registros[`${semana}-${treino}`] ?? {}) as Cargas,
      reps: (reps[`${semana}-${treino}`] ?? {}) as Cargas,
    }))
    return { semana, ...metricasSemana(sessoes) }
  })

  const somaOuNull = (xs: (number | null)[]) => (xs.some((x) => x != null) ? xs.reduce((s: number, x) => s + (x ?? 0), 0) : null)
  const mediaOuNull = (xs: (number | null)[]) => {
    const n = xs.filter((x): x is number => x != null)
    return n.length ? n.reduce((s, x) => s + x, 0) / n.length : null
  }

  const movimentos = semanas.map((s) => s.movimentos)
  const cargasMedias = semanas.map((s) => s.cargaMedia)
  const volumes = semanas.map((s) => s.volume)

  const resumo = {
    movimentos: somaOuNull(movimentos),
    cargaMedia: mediaOuNull(cargasMedias),
    volume: somaOuNull(volumes),
    sessoesAtivas: semanas.reduce((s, x) => s + x.sessoesAtivas, 0),
  }
  const metaMovimentos = metaRobusta(movimentos)
  const metaCarga = metaRobusta(cargasMedias)
  const metaVolume = metaRobusta(volumes)

  return (
    <Cartao>
      <h2 className="mb-3 font-semibold">Monitoramento</h2>
      <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-slate-800 text-slate-400">
          <tr>
            <th className="p-2">Semana</th>
            <th className="p-2 text-right">Movimentos</th>
            <th className="p-2 text-right">Carga média</th>
            <th className="p-2 text-right">Volume</th>
            <th className="p-2 text-right">Sessões ativas</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {semanas.map((s) => (
            <tr key={s.semana} className="border-b border-slate-800 last:border-0">
              <td className="p-2">{s.semana}</td>
              <td className="p-2 text-right">{fmt(s.movimentos)}</td>
              <td className="p-2 text-right">{fmt(s.cargaMedia)}</td>
              <td className="p-2 text-right">{fmt(s.volume)}</td>
              <td className="p-2 text-right">{s.sessoesAtivas}</td>
              <td className="p-2">{s.status || '—'}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-slate-700 font-semibold text-slate-200">
            <td className="p-2">Resumo do ciclo</td>
            <td className="p-2 text-right">{fmt(resumo.movimentos)}</td>
            <td className="p-2 text-right">{fmt(resumo.cargaMedia)}</td>
            <td className="p-2 text-right">{fmt(resumo.volume)}</td>
            <td className="p-2 text-right">{resumo.sessoesAtivas}</td>
            <td className="p-2">—</td>
          </tr>
          <tr className="text-marca-300">
            <td className="p-2">Meta semanal (robusta)</td>
            <td className="p-2 text-right">{fmt(metaMovimentos)}</td>
            <td className="p-2 text-right">{fmt(metaCarga)}</td>
            <td className="p-2 text-right">{fmt(metaVolume)}</td>
            <td className="p-2 text-right">—</td>
            <td className="p-2">—</td>
          </tr>
          <tr className="text-marca-300">
            <td className="p-2">Meta do ciclo</td>
            <td className="p-2 text-right">{fmt(metaCiclo(metaMovimentos, meso.semanas))}</td>
            <td className="p-2 text-right">{fmt(metaCiclo(metaCarga, meso.semanas))}</td>
            <td className="p-2 text-right">{fmt(metaCiclo(metaVolume, meso.semanas))}</td>
            <td className="p-2 text-right">—</td>
            <td className="p-2">—</td>
          </tr>
        </tbody>
      </table>
</div>
    </Cartao>
  )
}
