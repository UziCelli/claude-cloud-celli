import type { Meso } from '../../../engine'
import { prescreverSessao } from '../../../engine'
import { Cartao } from '../../../ui'

// Painel de pré-visualização: mostra o que o aluno vai ver numa semana, em todos os treinos.
export default function Preview({ meso, semana, onSemana }: { meso: Meso; semana: number; onSemana: (w: number) => void }) {
  return (
    <Cartao className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-400">Pré-visualização — semana</span>
        <select
          value={semana}
          onChange={(e) => onSemana(Number(e.target.value))}
          className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-base text-slate-100"
        >
          {Array.from({ length: meso.semanas }, (_, i) => i + 1).map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((t) => {
          const sessao = prescreverSessao(meso, semana, t)
          return (
            <div key={t} className="rounded-lg border border-slate-800 p-3 text-sm">
              <p className="font-semibold">
                Treino {t} <span className="font-normal text-slate-400">· {sessao ? sessao.tempoMin.toFixed(1) : '0.0'} min</span>
              </p>
              <ul className="mt-1 space-y-1 text-slate-300">
                {sessao?.exercicios.map((e) => (
                  <li key={e.pos}>
                    {e.pos}. {e.slot.nome || <span className="text-slate-500">(vazio)</span>} — {e.reps.join('/')} reps
                    {e.rotulo && <span className="text-marca-300"> · {e.rotulo}</span>}
                  </li>
                ))}
                {!sessao?.exercicios.length && <li className="text-slate-500">Nenhum exercício.</li>}
              </ul>
            </div>
          )
        })}
      </div>
    </Cartao>
  )
}
