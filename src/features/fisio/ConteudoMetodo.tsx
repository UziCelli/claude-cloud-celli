import { AVISO_FISIO, REGRAS_FISIO, linkPubmed, type MetodoFisio } from '../../data/fisio'
import { Aviso } from '../../ui'

// Mesmo conteúdo da fonte para coach e aluno. Os alertas nunca ficam escondidos num acordeão.
export default function ConteudoMetodo({ metodo: m, protocolo = true }: { metodo: MetodoFisio; protocolo?: boolean }) {
  return <div className="space-y-3 text-sm">
    <Aviso>{AVISO_FISIO}</Aviso>
    <p>Evidência: {m.nivel === 'LIMITROFE' ? 'Limítrofe · opcional' : m.nivel === 'ALTO' ? 'Alta' : 'Moderada'}{m.nivelNota && ` (${m.nivelNota})`}</p>
    <section className="rounded-xl border border-red-700 bg-red-950/40 p-3">
      <h3 className="font-semibold text-red-200">Parar e procurar médico ou fisioterapeuta se:</h3>
      {m.alertaGeral && <p className="text-red-200">Sinais gerais de perigo (a pesquisa não trouxe sinais específicos).</p>}
      <ul className="list-disc pl-5">{m.encaminharSe.map((s) => <li key={s}>{s}</li>)}</ul>
    </section>
    {m.liberacao && <p className="text-amber-200">Exige liberação profissional registrada: {m.liberacao}.</p>}
    {m.ressalva && <p className="rounded-lg bg-amber-950/50 p-3 text-amber-200">{m.ressalva}</p>}
    {protocolo && <>
      <h3 className="font-semibold">Sugestão inicial — ajustar individualmente</h3>
      <ul className="list-disc pl-5">{m.protocolo.map((p) => <li key={p}>{p}</li>)}</ul>
      <details>
        <summary className="min-h-11 cursor-pointer py-3 font-semibold">Regras para todos os métodos (R1–R8)</summary>
        <div className="space-y-3">{REGRAS_FISIO.map((r) => <div key={r.id}><h4 className="font-semibold">{r.id} · {r.titulo}</h4><p>{r.texto}</p></div>)}</div>
      </details>
    </>}
    <p className="flex flex-wrap gap-3 text-xs">{m.refs.map((r) => <a className="min-h-11 py-3 text-sky-300 underline" key={r.pmid} href={linkPubmed(r.pmid)} target="_blank" rel="noopener noreferrer">{r.autor}</a>)}</p>
  </div>
}
