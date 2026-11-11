import { fichaAnamnese, type Respostas } from '../../lib/anamnese'

// Ficha por etapa: cada pergunta num cartão, resposta grande; sim grave em âmbar.
export default function FichaAnamnese({ r }: { r: Respostas }) {
  return (
    <div className="space-y-5">
      {fichaAnamnese(r).map((e) => (
        <section key={e.etapa} className="space-y-3">
          <h2 className="font-semibold text-slate-200">{e.etapa}</h2>
          {e.itens.map((i) => (
            <div key={i.pergunta} className={`rounded-2xl border p-3 ${i.alerta ? 'border-amber-400/60 bg-amber-500/10' : 'border-white/10 bg-white/5'}`}>
              <p className="break-words text-sm text-slate-400">{i.pergunta}</p>
              <p className={`mt-1 break-words text-lg font-bold ${i.alerta ? 'text-amber-200' : ''}`}>{i.resposta}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
