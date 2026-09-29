import { collection, query, where } from 'firebase/firestore'
import { useState } from 'react'
import { evolucaoExercicio, type Meso } from '../../engine'
import { docsParaRegistros, docsParaRegistrosReps, type MesoSalvo, type RegistroDoc } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'
import { Centro } from '../../ui'
import { fmt } from '../coach/semana/format'
import { mesoAtual } from './mesoAtual'

export default function Evolucao({ uid }: { uid: string }) {
  const { dados: mesos, carregando } = useLista<MesoSalvo>(query(collection(db, 'mesos'), where('alunoId', '==', uid)))
  if (carregando) return <Centro>Carregando…</Centro>

  const atual = mesoAtual(mesos)
  if (!atual) return <p className="mt-10 text-center text-slate-400">Seu coach ainda não montou seu treino.</p>

  return <Lista uid={uid} mesoId={atual.doc.id} meso={atual.meso} />
}

function Lista({ uid, mesoId, meso }: { uid: string; mesoId: string; meso: Meso }) {
  const { dados: docsRegistros } = useLista<RegistroDoc>(
    query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', mesoId)),
  )
  const cargas = docsParaRegistros(docsRegistros)
  const reps = docsParaRegistrosReps(docsRegistros)

  const nomes = new Set<string>()
  meso.divisao.flat().forEach((s) => nomes.add(s.nome))
  Object.values(meso.trocas ?? {}).forEach((s) => nomes.add(s.nome))
  const lista = [...nomes].sort((a, b) => a.localeCompare(b))
  const [nome, setNome] = useState(lista[0] ?? '')

  const pontos = nome ? evolucaoExercicio(meso, cargas, nome, reps) : []

  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <h1 className="mb-3 text-lg font-bold">Evolução</h1>
      <select
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-100 outline-none focus:border-marca-500"
      >
        {lista.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      {pontos.length === 0 ? (
        <p className="text-sm text-slate-400">Sem registros ainda.</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 text-slate-400">
            <tr>
              <th className="p-2">Sem.</th>
              <th className="p-2 text-right">Carga máx</th>
              <th className="p-2 text-right">Carga média</th>
              <th className="p-2 text-right">Volume</th>
            </tr>
          </thead>
          <tbody>
            {pontos.map((p) => (
              <tr key={p.ocorrencia} className="border-b border-slate-800 last:border-0">
                <td className="p-2">{p.semana}</td>
                <td className="p-2 text-right">{fmt(p.cargaMax)}</td>
                <td className="p-2 text-right">{fmt(p.cargaMedia)}</td>
                <td className="p-2 text-right">{fmt(p.volume)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </main>
  )
}
