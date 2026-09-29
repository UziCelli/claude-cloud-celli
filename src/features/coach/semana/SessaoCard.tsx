import { metricasSessao, type Cargas, type Sessao } from '../../../engine'
import { registrarCarga } from '../../../lib/acoes'
import { Cartao } from '../../../ui'
import { fmt } from './format'
import LoadInput from './LoadInput'

const CORES: Record<string, string> = {
  Dropset: 'bg-purple-900/50 text-purple-300',
  Biset: 'bg-blue-900/50 text-blue-300',
  Triset: 'bg-cyan-900/50 text-cyan-300',
  Superset: 'bg-teal-900/50 text-teal-300',
  Circuito: 'bg-green-900/50 text-green-300',
  'Rest-pause': 'bg-amber-900/50 text-amber-300',
  Clusterset: 'bg-pink-900/50 text-pink-300',
}

function Chips({ rotulo }: { rotulo: string }) {
  if (!rotulo) return null
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {rotulo.split('; ').map((parte, i) => {
        const metodo = parte.split(' [')[0]
        return (
          <span key={i} className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${CORES[metodo] ?? 'bg-slate-800 text-slate-300'}`}>
            {parte}
          </span>
        )
      })}
    </div>
  )
}

// Reps feitas ≠ prescritas: mostra "alvo→feita" em destaque.
function RepsFeitas({ alvo, feita }: { alvo: number; feita: number | null | undefined }) {
  if (feita == null || feita === alvo) return <div className="mb-1 text-slate-400">{alvo}</div>
  return (
    <div className="mb-1 font-semibold text-amber-400">
      {alvo}→{feita}
    </div>
  )
}

export default function SessaoCard({
  mesoId,
  alunoId,
  sessao,
  cargas,
  reps = {},
  realizado,
  onRealizado,
}: {
  mesoId: string
  alunoId: string
  sessao: Sessao
  cargas: Cargas
  reps?: Cargas
  realizado: boolean
  onRealizado: (v: boolean) => void
}) {
  const m = metricasSessao(sessao, cargas, reps)
  const nEtapas = Math.max(0, ...sessao.exercicios.map((e) => e.reps.length - e.n))

  return (
    <Cartao>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold">Treino {sessao.treino}</h3>
          <p className="text-xs text-slate-400">
            ~{fmt(sessao.tempoMin)} min · pausa {sessao.pausaS}s
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={realizado} onChange={(e) => onRealizado(e.target.checked)} className="h-4 w-4" />
          Realizado
        </label>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-slate-800 text-slate-400">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Exercício</th>
            {Array.from({ length: sessao.series }, (_, i) => (
              <th key={`s${i}`} className="p-2 text-center">
                S{i + 1}
              </th>
            ))}
            {Array.from({ length: nEtapas }, (_, i) => (
              <th key={`d${i}`} className="p-2 text-center">
                D{i + 1}
              </th>
            ))}
            <th className="p-2 text-right">Movimentos</th>
            <th className="p-2 text-right">Carga média</th>
            <th className="p-2 text-right">Volume</th>
          </tr>
        </thead>
        <tbody>
          {sessao.exercicios.map((e, i) => {
            const cs = cargas[e.slot.slotId] ?? []
            const rs = reps[e.slot.slotId] ?? []
            return (
              <tr key={e.slot.slotId} className="border-b border-slate-800 last:border-0 align-top">
                <td className="p-2">{e.pos}</td>
                <td className="p-2">
                  {e.slot.nome}
                  <Chips rotulo={e.rotulo} />
                </td>
                {Array.from({ length: sessao.series }, (_, k) =>
                  k < e.n ? (
                    <td key={k} className="p-2 text-center">
                      <RepsFeitas alvo={e.reps[k]} feita={rs[k]} />
                      <LoadInput
                        valor={cs[k] ?? null}
                        onSalvar={(v) => registrarCarga(mesoId, alunoId, sessao.semana, sessao.treino, e.slot.slotId, k, v)}
                      />
                    </td>
                  ) : (
                    <td key={k} className="p-2 text-center text-slate-700">
                      —
                    </td>
                  ),
                )}
                {Array.from({ length: nEtapas }, (_, j) => {
                  const coluna = e.n + j
                  const tem = coluna < e.reps.length
                  return (
                    <td key={j} className="p-2 text-center">
                      {tem ? (
                        <>
                          <RepsFeitas alvo={e.reps[coluna]} feita={rs[coluna]} />
                          <LoadInput
                            valor={cs[coluna] ?? null}
                            placeholder={e.cargaSugerida[coluna] ?? null}
                            onSalvar={(v) => registrarCarga(mesoId, alunoId, sessao.semana, sessao.treino, e.slot.slotId, coluna, v)}
                          />
                        </>
                      ) : (
                        <span className="text-slate-700">—</span>
                      )}
                    </td>
                  )
                })}
                <td className="p-2 text-right">{fmt(m.exercicios[i].movimentos)}</td>
                <td className="p-2 text-right">{fmt(m.exercicios[i].cargaMedia)}</td>
                <td className="p-2 text-right">{fmt(m.exercicios[i].volume)}</td>
              </tr>
            )
          })}
          <tr className="font-semibold text-slate-200">
            <td className="p-2" colSpan={2 + sessao.series + nEtapas}>
              Sessão
            </td>
            <td className="p-2 text-right">{fmt(m.movimentos)}</td>
            <td className="p-2 text-right">{fmt(m.cargaMedia)}</td>
            <td className="p-2 text-right">{fmt(m.volume)}</td>
          </tr>
        </tbody>
      </table>
</div>
    </Cartao>
  )
}
