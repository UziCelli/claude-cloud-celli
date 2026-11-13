import type { Meso } from '../../../engine'
import { isometrico, prescreverSessao } from '../../../engine'
import { acimaDoLimite, fmtMin } from '../../../lib/tempo'
import { IcSeta } from '../../../icones'
import { campoBase, Cartao, Deslizar } from '../../../ui'

// Painel de pré-visualização: mostra o que o aluno vai ver numa semana, em todos os treinos.
export default function Preview({
  meso,
  semana,
  onSemana,
  aberta,
  onAlternar,
}: {
  meso: Meso
  semana: number
  onSemana: (w: number) => void
  aberta: boolean
  onAlternar: () => void
}) {
  return (
    <Cartao className="space-y-3">
      <button type="button" aria-expanded={aberta} onClick={onAlternar} className="flex min-h-11 w-full items-center gap-2 text-left font-semibold">
        <IcSeta className={`size-4 transition-transform ${aberta ? 'rotate-90' : ''}`} />
        Pré-visualização
      </button>
      {aberta && (
        <>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-400">Semana</span>
        <select
          value={semana}
          onChange={(e) => onSemana(Number(e.target.value))}
          className={`${campoBase} px-2 py-1`}
        >
          {Array.from({ length: meso.semanas }, (_, i) => i + 1).map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>
      <Deslizar chave={semana}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((t) => {
          const sessao = prescreverSessao(meso, semana, t)
          return (
            <div key={t} className="rounded-lg border border-slate-800 bg-slate-950 text-sm">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 px-3 py-2">
                <p className="font-semibold">Treino {t}</p>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${acimaDoLimite(sessao?.tempoMin ?? 0, meso.tempoLimiteMin) ? 'bg-red-900/50 text-red-300' : 'bg-slate-800 text-slate-100'}`}>
                  {fmtMin(sessao?.tempoMin ?? 0)}
                </span>
              </div>
              <ul className="divide-y divide-slate-800">
                {sessao?.exercicios.map((e) => (
                  <li key={e.pos} className="flex gap-3 px-3 py-2">
                    <span className="w-4 shrink-0 text-slate-500">{e.pos}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{e.slot.nome || <span className="text-slate-500">(vazio)</span>}</p>
                      <p className="text-slate-400">{e.reps.join('/')} {isometrico(e.slot) ? 's' : 'reps'}</p>
                      {e.rotulo && (
                        <span className="mt-1 inline-block rounded-full bg-marca-500/20 px-2 py-0.5 text-xs text-marca-300">{e.rotulo}</span>
                      )}
                    </div>
                  </li>
                ))}
                {!sessao?.exercicios.length && <li className="px-3 py-2 text-xs text-slate-500">Nenhum exercício</li>}
              </ul>
            </div>
          )
        })}
      </div>
      </Deslizar>
        </>
      )}
    </Cartao>
  )
}
