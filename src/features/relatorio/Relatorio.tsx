import marca from '@marca/marca.json'
import type { ReactNode } from 'react'
import type { RelatorioCiclo } from '../../lib/relatorio'
import { fmt } from '../coach/semana/format'
import { IcTrofeu } from '../../icones'
import BotaoCompartilhar from '../evolucao/BotaoCompartilhar'
import { gerarPdfRelatorio } from './pdfRelatorio'
import { dadosCartaoRelatorio, gerarCartaoRelatorio, periodoTexto, volumeTexto } from './cartaoRelatorio'

const Bloco = ({ titulo, children }: { titulo: string; children: ReactNode }) => (
  <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
    <h2 className="mb-3 font-semibold">{titulo}</h2>
    {children}
  </section>
)

const Faixa = ({ frac, className = 'bg-marca-500' }: { frac: number; className?: string }) => (
  <div className="h-2 overflow-hidden rounded bg-slate-800">
    <div className={`h-full rounded ${className}`} style={{ width: `${Math.max(3, Math.round(Math.min(1, frac) * 100))}%` }} />
  </div>
)

const Numero = ({ valor, rotulo }: { valor: string; rotulo: string }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900 px-2 py-3 text-center">
    <p className="font-display text-2xl font-extrabold text-marca-400">{valor}</p>
    <p className="text-xs text-slate-400">{rotulo}</p>
  </div>
)

// Relatório do ciclo: a mesma tela para o coach, para o aluno e para o PDF (PDF montado no aparelho).
export default function Relatorio({ r, aluno, comentario, compartilhar = false }: { r: RelatorioCiclo; aluno: string; comentario?: string; compartilhar?: boolean }) {
  return (
    <article className="relatorio space-y-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-marca-300">{marca.nome} · Relatório do ciclo</p>
        <h1 className="mt-1 text-2xl leading-tight">{r.nome || 'Ciclo'}</h1>
        <p className="text-sm text-slate-400">
          {aluno} · {periodoTexto(r)}
        </p>
      </div>

      {comentario?.trim() && (
        <section className="rounded-2xl bg-gradient-to-br from-marca-600 to-marca-900 p-4 ring-1 ring-white/15">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/70">Recado do seu coach</h2>
          <p className="mt-2 whitespace-pre-wrap text-base leading-snug text-white">{comentario.trim()}</p>
        </section>
      )}

      <Bloco titulo="Aderência">
        <p className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-extrabold text-marca-400">{r.aderenciaPct}%</span>
          <span className="text-sm text-slate-300">
            {r.feitos} de {r.previstos} treinos
          </span>
        </p>
        <div className="my-2">
          <Faixa frac={r.aderenciaPct / 100} />
        </div>
        <p className="text-sm text-slate-400">
          {r.semanasCompletas} de {r.semanas} {r.semanas === 1 ? 'semana completa' : 'semanas completas'}
        </p>
      </Bloco>

      <div className="grid grid-cols-3 gap-2">
        <Numero valor={volumeTexto(r.volumeKg)} rotulo="volume total" />
        <Numero valor={String(r.movimentos)} rotulo="movimentos" />
        <Numero valor={r.tempoMedioMin == null ? '—' : `${r.tempoMedioMin} min`} rotulo="tempo médio" />
      </div>

      {r.porSemana.length > 0 && (
        <Bloco titulo="Semana a semana">
          <ul className="space-y-3">
            {r.porSemana.map((s) => (
              <li key={s.semana}>
                <p className="mb-1 flex justify-between gap-2 text-sm">
                  <span className="font-semibold">Semana {s.semana}</span>
                  <span className="text-slate-300">
                    {s.feitos}/{s.previstos} treinos
                  </span>
                </p>
                <Faixa frac={s.previstos ? s.feitos / s.previstos : 0} />
                <p className="mt-1 text-xs text-slate-400">
                  {volumeTexto(s.volumeKg)} · {s.movimentos} movimentos
                </p>
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {r.evolucoes.length > 0 && (
        <Bloco titulo="Maiores evoluções">
          <ul className="space-y-3">
            {r.evolucoes.map((e) => (
              <li key={e.nome}>
                <p className="mb-1 text-sm">
                  {e.nome}: {fmt(e.de)} → {fmt(e.ate)} kg <span className="font-semibold text-green-400">(+{Math.round(e.pct).toLocaleString('pt-BR')}%)</span>
                </p>
                <Faixa frac={e.pct / r.evolucoes[0].pct} className="bg-green-500" />
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {r.recordes.length > 0 && (
        <Bloco titulo={`Recordes (${r.recordes.length})`}>
          <ul className="space-y-1.5 text-sm">
            {r.recordes.map((x) => (
              <li key={x.nome} className="flex justify-between gap-2">
                <span><IcTrofeu className="inline size-3 align-[-1px]" /> {x.nome}</span>
                <span className="text-slate-300">
                  {fmt(x.kg)} kg · sem. {x.semana}
                </span>
              </li>
            ))}
          </ul>
        </Bloco>
      )}

      {compartilhar && (
        <BotaoCompartilhar dados={dadosCartaoRelatorio(r, aluno)} gerar={gerarCartaoRelatorio} />
      )}
    </article>
  )
}

const gerarPdf = (d: { r: RelatorioCiclo; aluno: string; comentario?: string }) => gerarPdfRelatorio(d)

export const BotaoPdf = ({ r, aluno, comentario }: { r: RelatorioCiclo; aluno: string; comentario?: string }) => (
  <BotaoCompartilhar dados={{ r, aluno, comentario }} gerar={gerarPdf} rotulo="Baixar PDF" arquivo="relatorio-do-ciclo.pdf" titulo="Relatório do ciclo" />
)
