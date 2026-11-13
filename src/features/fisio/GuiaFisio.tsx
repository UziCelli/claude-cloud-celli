import SeletorGuia from '../metodos/SeletorGuia'
import { useState } from 'react'
import { AVISO_FISIO, METODOS_FISIO, QUEIXAS, REGRAS_FISIO, linkPubmed, opcional, type Nivel, type QueixaId, type Ref } from '../../data/fisio'
import { Aviso, Cartao } from '../../ui'
import { BotaoVoltar } from '../../voltar'

const SELO: Record<Nivel, string> = {
  ALTO: 'bg-emerald-950 text-emerald-300 ring-emerald-700',
  MODERADO: 'bg-sky-950 text-sky-300 ring-sky-700',
  LIMITROFE: 'bg-amber-950 text-amber-300 ring-amber-700',
}
const TEXTO_NIVEL: Record<Nivel, string> = { ALTO: 'Alto', MODERADO: 'Moderado', LIMITROFE: 'Limítrofe · opcional' }

const Refs = ({ refs }: { refs: Ref[] }) =>
  refs.length > 0 && (
    <p className="mt-2 text-xs text-slate-400">
      {refs.map((r, i) => (
        <span key={r.pmid}>
          {i > 0 && ' · '}
          <a href={linkPubmed(r.pmid)} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">
            {r.autor}
          </a>
        </span>
      ))}
    </p>
  )

export default function GuiaFisio() {
  const [queixa, setQueixa] = useState<QueixaId | null>(null)
  const [semLimitrofe, setSemLimitrofe] = useState(false)
  const lista = METODOS_FISIO.filter((m) => (!queixa || m.queixas.includes(queixa)) && !(semLimitrofe && opcional(m)))
  const chip = (ativo: boolean) =>
    ativo ? 'border-marca-400 bg-marca-500 text-white' : 'border-slate-600 bg-slate-800 text-slate-200'
  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <BotaoVoltar para="/metodos" />
      <SeletorGuia ativo="fisio" />
      <h1 className="mb-3 text-lg font-bold">Métodos Fisioterapia</h1>
      <Aviso>{AVISO_FISIO}</Aviso>

      <div className="my-3 flex flex-wrap gap-2">
        <button type="button" aria-pressed={!queixa} onClick={() => setQueixa(null)} className={`min-h-11 rounded-full border px-4 text-sm ${chip(!queixa)}`}>
          Todas
        </button>
        {QUEIXAS.map((q) => (
          <button key={q.id} type="button" aria-pressed={queixa === q.id} onClick={() => setQueixa(q.id)} className={`min-h-11 rounded-full border px-4 text-sm ${chip(queixa === q.id)}`}>
            {q.rotulo}
          </button>
        ))}
      </div>

      <label className="mb-3 flex min-h-11 items-center gap-2 text-sm">
        <input type="checkbox" role="switch" checked={semLimitrofe} onChange={(e) => setSemLimitrofe(e.target.checked)} className="size-5" />
        Esconder evidência limítrofe
      </label>

      <details className="mb-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <summary className="min-h-11 cursor-pointer text-sm font-semibold">Regras para todos os métodos (R1–R8)</summary>
        <div className="mt-3 space-y-3">
          {REGRAS_FISIO.map((r) => (
            <div key={r.id}>
              <h3 className="text-sm font-semibold">{r.id} · {r.titulo}</h3>
              <p className="text-sm">{r.texto}</p>
              <p className="text-xs text-slate-400">Evidência: {r.evidencia}</p>
              <Refs refs={r.refs} />
            </div>
          ))}
        </div>
      </details>

      <p className="mb-2 text-sm text-slate-400">{lista.length} métodos</p>
      <div className="space-y-3">
        {lista.map((m) => (
          <Cartao key={m.id}>
            <h2 className="font-semibold">{m.id} · {m.nome}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${SELO[m.nivel]}`}>{TEXTO_NIVEL[m.nivel]}</span>
              {m.nivelNota && <span className="text-xs text-slate-400">{m.nivelNota}</span>}
            </div>
            <p className="mt-2 text-xs text-slate-400">{m.queixas.map((id) => QUEIXAS.find((q) => q.id === id)?.rotulo).join(' · ')}</p>
            <h3 className="mt-3 text-xs font-semibold uppercase text-slate-400">Protocolo</h3>
            <p className="text-xs italic text-slate-400">Sugestão inicial — ajustar individualmente</p>
            <ul className="mt-1 list-disc pl-5 text-sm">
              {m.protocolo.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {m.ressalva && <p className="mt-2 rounded-lg border border-amber-700 bg-amber-950/50 px-3 py-2 text-sm text-amber-200">{m.ressalva}</p>}
            {m.liberacao && (
              <p className="mt-2 text-sm">
                <span className="rounded-full bg-red-950 px-3 py-1 text-xs font-bold text-red-300 ring-1 ring-red-700">Exige liberação do médico ou fisioterapeuta</span>
                {m.liberacao !== 'Sempre' && <span className="text-red-300">: {m.liberacao}</span>}
              </p>
            )}
            <h3 className="mt-3 text-xs font-semibold uppercase text-slate-400">Parar e procurar médico ou fisioterapeuta se:</h3>
            {m.alertaGeral && <p className="text-xs text-slate-400">Sinais gerais de perigo (a pesquisa não trouxe sinais específicos).</p>}
            <ul className="list-disc pl-5 text-sm">
              {m.encaminharSe.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <Refs refs={m.refs} />
          </Cartao>
        ))}
      </div>
    </main>
  )
}
