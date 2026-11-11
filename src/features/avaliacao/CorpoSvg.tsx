import { useId } from 'react'
import type { ResultadoSegmento } from '../../lib/avaliacao'
import { ARTE, corParte, LEGENDA, LEGENDA_FRACA, REGIOES, rotuloCorpo, SILHUETA, TAMANHO, VISTAS } from './corpoPaths'

type Parte = Pick<ResultadoSegmento, 'id' | 'rotulo' | 'veredito' | 'fraca'>

// Corpo de frente e de costas: regiões coloridas pelo veredito por baixo, arte-linha por cima.
// Painel claro: as linhas escuras somem no fundo escuro do app. A legenda em texto vem junto: a cor não fala sozinha.
export default function CorpoSvg({ segmentos }: { segmentos: Parte[] }) {
  const uid = useId()
  return (
    <div>
      <div role="img" aria-label={rotuloCorpo(segmentos)} className="mx-auto grid max-w-sm grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-3">
        {VISTAS.map((v) => (
          <figure key={v} className="min-w-0">
            <svg viewBox={`0 0 ${TAMANHO.w} ${TAMANHO.h}`} aria-hidden="true" className="w-full">
              <clipPath id={`${uid}${v}`}><path d={SILHUETA[v]} /></clipPath>
              <g clipPath={`url(#${uid}${v})`} opacity={0.7}>
                {segmentos.map((s) => {
                  const d = REGIOES[s.id][v]
                  return d && <path key={s.id} d={d} fill={corParte(s.veredito, !!s.fraca)} />
                })}
              </g>
              <image href={ARTE[v]} width={TAMANHO.w} height={TAMANHO.h} />
            </svg>
            <figcaption className="text-center text-xs text-slate-600">{v === 'frente' ? 'Frente' : 'Costas'}</figcaption>
          </figure>
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-300">
        {LEGENDA.map((l) => (
          <li key={l.veredito} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: corParte(l.veredito, false) }} />
            {l.texto}
          </li>
        ))}
        {segmentos.some((s) => s.fraca) && <li>{LEGENDA_FRACA}</li>}
      </ul>
    </div>
  )
}
