import type { ReactNode } from 'react'
import type { Icone } from './icones'

// Peças do visual "vidro" (aluno e coach): barra de abas embaixo, fundo com brilho e cartão.

export type Aba = { rotulo: string; href: string; Icone: Icone; ativo: boolean; selo?: number }

// Barra de abas fixa embaixo, ao alcance do polegar: um <nav> com links (aba atual com aria-current).
// Quem usa deixa espaço embaixo do conteúdo com a classe `pb-barra` (index.css).
export function BarraAbas({ abas, className = '' }: { abas: Aba[]; className?: string }) {
  return (
    <nav aria-label="Menu" className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] ${className}`}>
      <div className="vidro mx-auto flex h-[66px] max-w-[400px] items-center gap-1 rounded-full px-1.5">
        {abas.map(({ rotulo, href, Icone, ativo, selo }) => (
          <a
            key={href}
            href={href}
            aria-current={ativo ? 'page' : undefined}
            className={`relative flex h-[56px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[10.5px] font-semibold tracking-wide ${ativo ? 'lente text-white' : 'text-slate-300/85'}`}
          >
            <Icone className={`size-[22px] ${ativo ? 'text-marca-400' : ''}`} />
            <span className="truncate">{rotulo}</span>
            {selo ? (
              <span className="absolute right-[18%] top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-slate-900/60">
                {selo > 9 ? '9+' : selo}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </nav>
  )
}

// Fundo escuro com dois brilhos da cor da marca (dá profundidade ao vidro). Fica atrás de tudo.
export const Brilho = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -left-28 -top-24 size-[26rem] rounded-full bg-marca-500/25 blur-3xl" />
    <div className="absolute -right-36 top-[22rem] size-[24rem] rounded-full bg-marca-700/45 blur-3xl" />
  </div>
)

// Cartão de vidro escuro.
export const Quadro = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`vidro-escuro rounded-3xl p-4 ${className}`}>{children}</div>
)

export const Chip = ({ children, cor = 'bg-white/10 text-slate-200' }: { children: ReactNode; cor?: string }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${cor}`}>{children}</span>
)

export const IconeQuadrado = ({ children, cor = 'bg-marca-500/15 text-marca-400' }: { children: ReactNode; cor?: string }) => (
  <span className={`grid size-10 shrink-0 place-items-center rounded-2xl ${cor}`}>{children}</span>
)
