import marca from '@marca/marca.json'
import { dataBR, fmtDelta, fmtNum, NOME_FONTE, type RelatorioAvaliacao } from '../../lib/avaliacao'
import BotaoCompartilhar from '../evolucao/BotaoCompartilhar'
import { gerarPdfAvaliacao } from './pdfAvaliacao'

// Avaliação física: a mesma tela para o coach (prévia), para o aluno e (com os mesmos dados) para o PDF.
// Diferença em cor neutra de propósito: o app não sabe se o objetivo é ganhar ou perder.
export default function Avaliacao({ r, aluno, comentario }: { r: RelatorioAvaliacao; aluno: string; comentario?: string }) {
  const comp = !!r.anterior
  return (
    <article className="relatorio space-y-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-marca-300">{marca.nome} · Avaliação física</p>
        <h1 className="mt-1 text-2xl leading-tight">Avaliação de {dataBR(r.atual.data)}</h1>
        <p className="text-sm text-slate-400">
          {aluno}
          {r.anterior && ` · comparada com ${dataBR(r.anterior.data)}`}
        </p>
      </div>

      {comentario?.trim() && (
        <section className="rounded-2xl bg-gradient-to-br from-marca-600 to-marca-900 p-4 ring-1 ring-white/15">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/70">Recado do seu coach</h2>
          <p className="mt-2 whitespace-pre-wrap text-base leading-snug text-white">{comentario.trim()}</p>
        </section>
      )}

      <div className="grid grid-cols-2 gap-2">
        {r.destaques.map((d) => (
          <div key={d.rotulo} className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 px-2 py-3 text-center">
            <p className="truncate font-display text-2xl font-extrabold text-marca-400">{d.valor}</p>
            <p className="text-xs text-slate-400">{d.rotulo}</p>
          </div>
        ))}
      </div>

      <section className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="font-semibold">Sua evolução</h2>
        {r.texto.map((t) => (
          <p key={t} className="text-sm text-slate-300">{t}</p>
        ))}
      </section>

      {r.grupos.map((g) => (
        <section key={g.titulo} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="mb-2 font-semibold">{g.titulo}</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400">
                <th className="py-1 font-normal">Medida</th>
                {comp && <th className="py-1 pl-2 text-right font-normal">Anterior</th>}
                <th className="py-1 pl-2 text-right font-normal">Atual</th>
                {comp && <th className="py-1 pl-2 text-right font-normal">Diferença</th>}
              </tr>
            </thead>
            <tbody>
              {g.linhas.map((l) => (
                <tr key={l.rotulo} className="border-t border-slate-800">
                  <td className="min-w-0 break-words py-1.5">{l.rotulo}{l.un && <span className="text-slate-400"> ({l.un})</span>}</td>
                  {comp && <td className="whitespace-nowrap py-1.5 pl-2 text-right tabular-nums text-slate-400">{l.anterior == null ? '—' : fmtNum(l.anterior)}</td>}
                  <td className="whitespace-nowrap py-1.5 pl-2 text-right font-semibold tabular-nums">{fmtNum(l.atual)}</td>
                  {comp && <td className="whitespace-nowrap py-1.5 pl-2 text-right tabular-nums text-slate-300">{l.delta == null ? '—' : fmtDelta(l.delta)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      <p className="text-xs text-slate-400">
        {r.res.fonte && `% de gordura calculado por ${NOME_FONTE[r.res.fonte]}. `}Estimativa; não substitui avaliação médica.
      </p>
    </article>
  )
}

export const BotaoPdfAvaliacao = ({ r, aluno, comentario }: { r: RelatorioAvaliacao; aluno: string; comentario?: string }) => (
  <BotaoCompartilhar dados={{ r, aluno, comentario }} gerar={gerarPdfAvaliacao} rotulo="Baixar PDF" arquivo="avaliacao-fisica.pdf" titulo="Avaliação física" />
)
