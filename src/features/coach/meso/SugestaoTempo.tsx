import { useMemo, useState } from 'react'
import { aplicarSugestao, prescreverSessao, sugerirMetodos } from '../../../engine'
import type { Meso } from '../../../engine'
import { fmtMin } from '../../../lib/tempo'
import { Botao, Painel } from '../../../ui'

export interface Acima {
  treino: number
  semanas: number[] // semanas em que este treino passa do limite
  semana: number // a pior
  tempo: number
}

// Um item por treino que passa do limite em alguma semana.
export function treinosAcima(meso: Meso): Acima[] {
  const limite = meso.tempoLimiteMin
  if (!limite) return []
  const lista: Acima[] = []
  for (let treino = 1; treino <= meso.frequencia; treino++) {
    const semanas: number[] = []
    let pior = { semana: 1, tempo: 0 }
    for (let semana = 1; semana <= meso.semanas; semana++) {
      const tempo = prescreverSessao(meso, semana, treino)?.tempoMin ?? 0
      if (tempo <= limite) continue
      semanas.push(semana)
      if (tempo > pior.tempo) pior = { semana, tempo }
    }
    if (semanas.length) lista.push({ treino, semanas, ...pior })
  }
  return lista
}

// Linha do aviso com o botão "Ver sugestão" e o painel de propostas logo abaixo.
export function LinhaAcima({ meso, acima, prefixo, onAplicar }: { meso: Meso; acima: Acima; prefixo?: string; onAplicar: (novo: Meso) => void }) {
  const [aberto, setAberto] = useState(false)
  const limite = meso.tempoLimiteMin!
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="min-w-0 text-sm">
          {prefixo && <b>{prefixo} · </b>}Semana {acima.semana} · Treino {acima.treino} · <b>{fmtMin(acima.tempo)}</b> (limite {limite})
        </span>
        <Botao onClick={() => setAberto((a) => !a)}>{aberto ? 'Fechar' : 'Ver sugestão'}</Botao>
      </div>
      <Painel aberto={aberto}>
        <PainelSugestao meso={meso} acima={acima} onAplicar={onAplicar} />
      </Painel>
    </div>
  )
}

function PainelSugestao({ meso, acima, onAplicar }: { meso: Meso; acima: Acima; onAplicar: (novo: Meso) => void }) {
  const limite = meso.tempoLimiteMin!
  const propostas = useMemo(() => sugerirMetodos(meso, acima.semana, acima.treino, limite), [meso, acima, limite])
  const [fora, setFora] = useState<number[]>([])
  const [semanas, setSemanas] = useState<number[]>(acima.semanas)
  const troca = (l: number[], n: number) => (l.includes(n) ? l.filter((x) => x !== n) : [...l, n].sort((a, b) => a - b))
  const nome = (pos: number) => meso.trocas?.[`${acima.semana}-${acima.treino}-${pos}`]?.nome ?? meso.divisao[acima.treino - 1]?.[pos - 1]?.nome ?? `Posição ${pos}`

  const escolhidas = propostas.filter((_, i) => !fora.includes(i))
  const aplicado = (semanasAlvo: number[]) => escolhidas.reduce((mm, p) => aplicarSugestao(mm, p, semanasAlvo), meso)
  const previsto = prescreverSessao(aplicado([acima.semana]), acima.semana, acima.treino)?.tempoMin ?? acima.tempo

  if (propostas.length === 0)
    return <p className="rounded-lg bg-slate-950 p-3 text-sm text-slate-400">Não achei pares automáticos. Ajuste a divisão ou o limite.</p>

  return (
    <div className="space-y-3 rounded-lg bg-slate-950 p-3 text-sm">
      <ul className="space-y-2">
        {propostas.map((p, i) => (
          <li key={i}>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 size-5 shrink-0" checked={!fora.includes(i)} onChange={() => setFora(troca(fora, i))} />
              <span className="min-w-0">
                <b className="block break-words">{p.posicoes.map(nome).join(' + ')}</b>
                <span className="text-slate-400">
                  {p.metodo} · {fmtMin(p.tempoAntes)} → {fmtMin(p.tempoDepois)}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div>
        <p className="mb-1 text-slate-400">Aplicar nas semanas</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: meso.semanas }, (_, i) => i + 1).map((w) => (
            <label key={w} className={`flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg px-2 font-semibold ${semanas.includes(w) ? 'bg-marca-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
              <input type="checkbox" className="sr-only" checked={semanas.includes(w)} onChange={() => setSemanas(troca(semanas, w))} />S{w}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={previsto > limite ? 'text-amber-300' : 'text-slate-300'}>Fica em {fmtMin(previsto)}</span>
        <Botao tipo="primario" disabled={escolhidas.length === 0 || semanas.length === 0} onClick={() => onAplicar(aplicado(semanas))}>
          Aplicar
        </Botao>
      </div>
    </div>
  )
}
