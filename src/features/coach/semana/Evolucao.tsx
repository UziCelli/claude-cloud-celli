import { useState } from 'react'
import { evolucaoExercicio, type Meso, type Registros } from '../../../engine'
import { Cartao } from '../../../ui'
import { fmt } from './format'

export default function Evolucao({ meso, registros, reps = {} }: { meso: Meso; registros: Registros; reps?: Registros }) {
  const nomes = new Set<string>()
  meso.divisao.flat().forEach((s) => nomes.add(s.nome))
  Object.values(meso.trocas ?? {}).forEach((s) => nomes.add(s.nome))
  const lista = [...nomes].sort((a, b) => a.localeCompare(b))
  const [nome, setNome] = useState(lista[0] ?? '')

  const pontos = nome ? evolucaoExercicio(meso, registros, nome, reps) : []

  return (
    <Cartao className="overflow-x-auto">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold">Evolução</h2>
        <select
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-100 outline-none focus:border-marca-500"
        >
          {lista.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      {pontos.length === 0 ? (
        <p className="text-sm text-slate-400">Sem ocorrências ainda.</p>
      ) : (
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 text-slate-400">
            <tr>
              <th className="p-2">Ocorrência</th>
              <th className="p-2">Semana</th>
              <th className="p-2">Treino</th>
              <th className="p-2 text-right">Carga máx</th>
              <th className="p-2 text-right">Carga média</th>
              <th className="p-2 text-right">Volume</th>
            </tr>
          </thead>
          <tbody>
            {pontos.map((p) => (
              <tr key={p.ocorrencia} className="border-b border-slate-800 last:border-0">
                <td className="p-2">{p.ocorrencia}</td>
                <td className="p-2">{p.semana}</td>
                <td className="p-2">{p.treino}</td>
                <td className="p-2 text-right">{fmt(p.cargaMax)}</td>
                <td className="p-2 text-right">{fmt(p.cargaMedia)}</td>
                <td className="p-2 text-right">{fmt(p.volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Cartao>
  )
}
