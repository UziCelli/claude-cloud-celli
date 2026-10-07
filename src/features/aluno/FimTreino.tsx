import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { comparacaoToneladas, type resumoTreino } from '../../lib/evolucao'
import { fmt } from '../coach/semana/format'
import { Barra, Botao, cascata, item } from '../../ui'

const CONFETE = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#facc15', '#a78bfa']

const dur = (ms: number) => {
  const s = Math.max(0, Math.round(ms / 1000))
  const [h, mi, se] = [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
  const p = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${p(mi)}:${p(se)}` : `${p(mi)}:${p(se)}`
}

const Cartao = ({ titulo, children }: { titulo: string; children: ReactNode }) => (
  <m.div variants={item} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
    <p className="text-xs text-slate-400">{titulo}</p>
    {children}
  </m.div>
)

export default function FimTreino({
  nome,
  duracaoMs,
  resumo,
  semana,
  feitosSemana,
  frequencia,
  quieto,
  voltar,
  verTreino,
}: {
  nome: string | undefined
  duracaoMs: number | null
  resumo: ReturnType<typeof resumoTreino>
  semana: number
  feitosSemana: number
  frequencia: number
  quieto: boolean | null
  voltar: () => void
  verTreino: () => void
}) {
  const { volumeKg, recordes, subiram } = resumo
  const comp = volumeKg > 0 ? comparacaoToneladas(volumeKg) : null
  const completa = feitosSemana >= frequencia
  return (
    <main className="mx-auto max-w-md px-4 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <m.h1
        initial={{ opacity: 0, y: quieto ? 0 : 16, scale: quieto ? 1 : 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={quieto ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 18 }}
        className="relative mt-6 mb-5 text-center text-2xl font-bold"
      >
        {!quieto &&
          recordes.length > 0 &&
          CONFETE.map((cor, i) => (
            <m.span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-sm"
              style={{ backgroundColor: cor }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: (i - 2.5) * 44, y: i % 2 ? 56 : -40, rotate: i * 120, opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          ))}
        {nome ? `Treino concluído, ${nome}! 💪` : 'Treino concluído! 💪'}
      </m.h1>

      <m.div variants={cascata} initial="hidden" animate="show" className="space-y-3">
        {(duracaoMs != null || volumeKg > 0) && (
          <div className="grid grid-cols-2 gap-3">
            {duracaoMs != null && (
              <Cartao titulo="Duração">
                <p className="text-xl font-bold tabular-nums">{dur(duracaoMs)}</p>
              </Cartao>
            )}
            {volumeKg > 0 && (
              <Cartao titulo="Volume">
                <p className="text-xl font-bold tabular-nums">{fmt(Math.round(volumeKg))} kg</p>
                {comp && (
                  <p className="text-xs text-slate-400">
                    ≈ {comp.qtd} {comp.qtd === 1 ? comp.objeto : comp.plural}
                  </p>
                )}
              </Cartao>
            )}
          </div>
        )}

        {recordes.length > 0 && (
          <m.section variants={item} className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
            <h2 className="mb-1 text-sm font-bold text-amber-300">🏆 Recordes</h2>
            <ul className="space-y-1 text-sm text-amber-200">
              {recordes.map((r) => (
                <li key={r.nome}>
                  {r.nome}: {fmt(r.kg)} kg (antes {fmt(r.antes)} kg)
                </li>
              ))}
            </ul>
          </m.section>
        )}

        {subiram.length > 0 && (
          <m.section variants={item} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
            <h2 className="mb-1 text-sm font-bold text-emerald-400">↑ Subiu a carga</h2>
            <ul className="space-y-1 text-sm text-emerald-300">
              {subiram.map((s) => (
                <li key={s.nome}>
                  {s.nome}: {fmt(s.antes)} → {fmt(s.agora)} kg
                </li>
              ))}
            </ul>
          </m.section>
        )}

        {recordes.length === 0 && subiram.length === 0 && volumeKg > 0 && (
          <m.p variants={item} className="text-center text-sm text-slate-300">
            Constância é o que dá resultado. Até o próximo!
          </m.p>
        )}

        <Cartao titulo={`Semana ${semana}: ${feitosSemana} de ${frequencia} treinos`}>
          <Barra frac={frequencia > 0 ? Math.min(1, feitosSemana / frequencia) : 0} />
          {completa && <p className="mt-2 text-sm font-bold text-marca-500">Semana completa! 🎯</p>}
        </Cartao>
      </m.div>

      <div className="mt-6 space-y-2">
        <Botao tipo="primario" className="w-full" onClick={voltar}>
          Voltar para Hoje
        </Botao>
        <Botao className="w-full" onClick={verTreino}>
          Ver treino
        </Botao>
      </div>
    </main>
  )
}
