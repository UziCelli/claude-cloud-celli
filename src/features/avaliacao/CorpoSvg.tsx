import type { ResultadoSegmento } from '../../lib/avaliacao'
import { SEGMENTOS } from '../../lib/segmentos'
import { BASE_TELA, CONTORNO, COR_CORPO, corParte, formaDe, LEGENDA, LEGENDA_FRACA, rotuloCorpo, VIEWBOX } from './corpoPaths'

type Parte = Pick<ResultadoSegmento, 'id' | 'rotulo' | 'veredito' | 'fraca'>

// Corpo de frente e de costas com as partes coloridas pelo veredito. A legenda em texto vem junto: a cor não fala sozinha.
export default function CorpoSvg({ segmentos }: { segmentos: Parte[] }) {
  return (
    <div>
      <svg viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} role="img" aria-label={rotuloCorpo(segmentos)} className="mx-auto w-full max-w-xs">
        {(['frente', 'costas'] as const).map((v) => (
          <g key={v}>
            <path d={CONTORNO[v]} fill={BASE_TELA} />
            {SEGMENTOS.map(({ id }) => formaDe(id, v) && <path key={id} d={formaDe(id, v)} fill={BASE_TELA} />)}
            {SEGMENTOS.map(({ id }) => {
              const d = formaDe(id, v)
              const s = segmentos.find((x) => x.id === id)
              return d && s && <path key={id} d={d} fill={corParte(s.veredito, !!s.fraca)} />
            })}
            <text x={v === 'frente' ? 50 : 150} y={211} textAnchor="middle" fontSize={7} fill="#94a3b8" aria-hidden="true">{v === 'frente' ? 'Frente' : 'Costas'}</text>
          </g>
        ))}
      </svg>
      <ul className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-300">
        {LEGENDA.map((l) => (
          <li key={l.veredito} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: COR_CORPO[l.veredito] }} />
            {l.texto}
          </li>
        ))}
        {segmentos.some((s) => s.fraca) && <li>{LEGENDA_FRACA}</li>}
      </ul>
    </div>
  )
}
