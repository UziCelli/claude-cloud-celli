import { LOGO_PARTES } from './logoPaths'
// Logo Gislane vetorizado do PNG oficial (docs/marca/gislane-logo.svg). Sempre vermelho; `faixa` muda a cor.
export default function Logo({ className = 'h-6', faixa = '#E21E27' }: { className?: string; faixa?: string }) {
  return (
    <svg className={className} viewBox="0 0 3360 720" role="img" aria-label="Gislane">
      <path fill={faixa} fillRule="evenodd" d={LOGO_PARTES[0].d} />
    </svg>
  )
}
