import { useState } from 'react'
import { METODOS, ORDEM } from '../../data/metodos'
import { mostrarNotasDeNovo } from '../../lib/notasMetodo'
import { Botao, Cartao } from '../../ui'
import IconeMetodo from './IconeMetodo'

export default function GuiaMetodos() {
  const [feito, setFeito] = useState(false)
  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <button onClick={() => history.back()} className="mb-2 text-sm text-slate-400">
        ← Voltar
      </button>
      <h1 className="mb-3 text-lg font-bold">Guia de métodos</h1>
      <div className="space-y-3">
        {ORDEM.map((nome) => {
          const t = METODOS[nome]
          return (
            <Cartao key={nome}>
              <div className="mb-2 flex items-center gap-3 text-fuchsia-200">
                <IconeMetodo metodo={nome} tamanho={56} />
                <span className="rounded bg-fuchsia-500/20 px-2 py-1 text-base font-bold text-fuchsia-200">{nome}</span>
              </div>
              <h2 className="text-xs font-semibold uppercase text-slate-400">O que é</h2>
              <p className="mb-2 text-sm">{t.oQueE}</p>
              <h2 className="text-xs font-semibold uppercase text-slate-400">Como fazer</h2>
              <ol className="mb-2 list-decimal pl-5 text-sm">
                {t.comoFazer.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              {t.dica && (
                <>
                  <h2 className="text-xs font-semibold uppercase text-slate-400">Dica</h2>
                  <p className="text-sm">{t.dica}</p>
                </>
              )}
            </Cartao>
          )
        })}
      </div>
      <Botao
        className="mt-4 w-full"
        onClick={() => {
          mostrarNotasDeNovo()
          setFeito(true)
        }}
      >
        Mostrar as notas de novo
      </Botao>
      {feito && <p className="mt-2 text-center text-sm text-emerald-400">Pronto! As notas vão aparecer de novo nos treinos.</p>}
    </main>
  )
}
