import marca from '@marca/marca.json'
import { m, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { IcSeta } from '../../icones'
import { dataBR, fmtDeltaUn, fmtMedida, NOME_FONTE, type Grupo, type Linha, type RelatorioAvaliacao, type ResultadoSegmento, type Seta, type Tom } from '../../lib/avaliacao'
import { textoCarga } from '../../lib/segmentos'
import { cascata, item, Painel } from '../../ui'
import BotaoCompartilhar from '../evolucao/BotaoCompartilhar'
import { gerarPdfAvaliacao } from './pdfAvaliacao'

const COR: Record<Tom, string> = {
  bom: 'bg-emerald-500/15 text-emerald-300',
  atencao: 'bg-amber-500/15 text-amber-300',
  neutro: 'bg-slate-700/60 text-slate-300',
}
const SETA_VEREDITO: Record<ResultadoSegmento['veredito'], Seta> = { melhorou: 'sobe', observar: 'igual', estavel: 'igual' }

// Seta com texto ao lado: a cor nunca fala sozinha.
const SetaIc = ({ seta }: { seta?: Seta | null }) =>
  seta === 'igual' || !seta ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M6 12h12" /></svg>
  ) : (
    <IcSeta aria-hidden="true" className={`size-4 shrink-0 ${seta === 'sobe' ? '-rotate-90' : 'rotate-90'}`} />
  )

const Chipe = ({ tom, seta, fraca, children }: { tom: Tom; seta?: Seta | null; fraca?: boolean; children: string }) => (
  <span className={`inline-flex max-w-full items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold tabular-nums ${COR[tom]} ${fraca ? 'opacity-60' : ''}`}>
    <SetaIc seta={seta} />
    <span className="min-w-0 break-words">{children}</span>
  </span>
)

function LinhaMedida({ l }: { l: Linha }) {
  return (
    <m.li variants={item} className="border-t border-slate-800 py-2">
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 break-words text-sm">{l.rotulo}</span>
        <div className="flex min-w-0 shrink-0 flex-col items-end gap-1">
          <span className="font-semibold tabular-nums">{fmtMedida(l.atual, l.un)}</span>
          {l.anterior != null && <span className="text-xs tabular-nums text-slate-400">antes {fmtMedida(l.anterior, l.un)}</span>}
        </div>
      </div>
      {l.delta != null && l.seta !== 'igual' && (
        <div className="mt-1">
          <Chipe tom={l.leitura?.tom ?? 'neutro'} seta={l.seta} fraca={l.leitura?.fraca}>{fmtDeltaUn(l)}</Chipe>
        </div>
      )}
      {l.leitura && <p className="mt-1 break-words text-xs text-slate-400">{l.leitura.texto}</p>}
    </m.li>
  )
}

function GrupoCartao({ g, aberto: inicio, quieto }: { g: Grupo; aberto: boolean; quieto: boolean | null }) {
  const [aberto, setAberto] = useState(inicio)
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 px-4">
      <button type="button" aria-expanded={aberto} onClick={() => setAberto(!aberto)} className="flex min-h-11 w-full items-center gap-2 py-3 text-left">
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold">{g.titulo}</h2>
          {g.resumo && <p className="truncate text-xs text-slate-400">{g.resumo.texto}</p>}
        </div>
        {g.resumo && (
          <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${COR[g.resumo.tom]}`}>
            {g.resumo.tom === 'bom' ? 'Bom' : g.resumo.tom === 'atencao' ? 'A observar' : 'Estável'}
          </span>
        )}
        <IcSeta aria-hidden="true" className={`size-5 shrink-0 text-slate-400 transition-transform ${aberto ? '-rotate-90' : 'rotate-90'}`} />
      </button>
      <Painel aberto={aberto}>
        <m.ul variants={cascata} initial={quieto ? false : 'hidden'} animate="show" className="pb-2">
          {g.linhas.map((l) => <LinhaMedida key={l.rotulo} l={l} />)}
        </m.ul>
      </Painel>
    </section>
  )
}

// Avaliação física: a mesma tela para o coach (prévia), para o aluno e (com os mesmos dados) para o PDF.
export default function Avaliacao({ r, aluno, comentario }: { r: RelatorioAvaliacao; aluno: string; comentario?: string }) {
  const quieto = useReducedMotion()
  const [lendo, setLendo] = useState(false)
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

      <section className="space-y-3">
        <p className="break-words text-lg font-semibold leading-snug">{r.resumo.frase}</p>
        <m.div variants={cascata} initial={quieto ? false : 'hidden'} animate="show" className="grid grid-cols-2 gap-2">
          {r.destaques.map((d) => (
            <m.div key={d.rotulo} variants={item} className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 px-2 py-3 text-center">
              <p className="truncate font-display text-2xl font-extrabold text-white">{d.valor}</p>
              <p className="text-xs text-slate-400">{d.rotulo}</p>
              {d.delta && <div className="mt-1"><Chipe tom={d.tom ?? 'neutro'} seta={d.seta}>{d.delta}</Chipe></div>}
            </m.div>
          ))}
        </m.div>
      </section>

      {r.segmentos.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-semibold">Sua evolução</h2>
          {/* O desenho do corpo (PR 2) entra aqui, antes dos cartões. */}
          <ul className="space-y-2">
            {r.segmentos.map((s) => (
              <li key={s.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{s.rotulo}</h3>
                  <Chipe tom={s.tom} seta={SETA_VEREDITO[s.veredito]} fraca={s.fraca}>{s.texto}</Chipe>
                </div>
                {s.medida && <p className="mt-1 text-sm text-slate-300">{s.medida.rotulo} <span className="font-semibold tabular-nums">{s.medida.delta}</span></p>}
                {s.carga && <p className="mt-1 break-words text-sm text-slate-300">Carga: {textoCarga(s.carga.melhor)}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {r.grupos.map((g) => (
        <GrupoCartao key={g.titulo} g={g} aberto={g.titulo === 'Composição corporal'} quieto={quieto} />
      ))}

      <section className="rounded-2xl border border-slate-800 bg-slate-900 px-4">
        <button type="button" aria-expanded={lendo} onClick={() => setLendo(!lendo)} className="flex min-h-11 w-full items-center justify-between gap-2 py-3 text-left font-semibold">
          Ler o relatório escrito
          <IcSeta aria-hidden="true" className={`size-5 shrink-0 text-slate-400 transition-transform ${lendo ? '-rotate-90' : 'rotate-90'}`} />
        </button>
        <Painel aberto={lendo}>
          <div className="space-y-2 pb-4">
            {r.texto.map((t) => <p key={t} className="break-words text-sm text-slate-300">{t}</p>)}
          </div>
        </Painel>
      </section>

      <p className="text-xs text-slate-400">
        {r.res.fonte && `% de gordura calculado por ${NOME_FONTE[r.res.fonte]}. `}Estimativa; não substitui avaliação médica.
      </p>
    </article>
  )
}

export const BotaoPdfAvaliacao = ({ r, aluno, comentario }: { r: RelatorioAvaliacao; aluno: string; comentario?: string }) => (
  <BotaoCompartilhar dados={{ r, aluno, comentario }} gerar={gerarPdfAvaliacao} rotulo="Baixar PDF" arquivo="avaliacao-fisica.pdf" titulo="Avaliação física" />
)
