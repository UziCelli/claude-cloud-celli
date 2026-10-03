import { LOGO_COACH, LOGO_VFIT } from './logoPaths'

// Logo VFITCOACH vetorizado do PNG oficial (variações em docs/marca/). O "COACH" é vazado:
// mostra a cor de fundo. `faixa` muda a cor da faixa (ex.: mesclado branco + faixa azul).
export default function Logo({ className = 'h-6', faixa = 'currentColor' }: { className?: string; faixa?: string }) {
  return (
    <svg className={className} viewBox="0 0 3360 780" role="img" aria-label="VFITCOACH">
      <path fill="currentColor" fillRule="evenodd" d={LOGO_VFIT} />
      <path fill={faixa} fillRule="evenodd" d={LOGO_COACH} />
    </svg>
  )
}
