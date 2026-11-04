import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { agil, saida, suave } from '../../movimento'
import { Brilho, IconeQuadrado } from '../../vidro'
import { IcSeta } from '../../icones'
import type { Icone } from '../../icones'

// Onboarding em tela cheia (aluno e coach, as duas marcas): passos curtos, barra de progresso estilo story,
// arrastar para os lados, setas do teclado e Esc. Abre 1x por aparelho (chave no localStorage).

export type Passo = { rotulo: string; titulo: ReactNode; texto: ReactNode; ilustracao: ReactNode }
export type Atalho = { Icone: Icone; texto: string; href: string }

// Sem armazenamento (ou no e2e) não abre sozinho, para não repetir em laço.
export function naoVisto(chave: string): boolean {
  try {
    return !navigator.webdriver && localStorage.getItem(chave) == null
  } catch {
    return false
  }
}
function marcarVisto(chave: string) {
  try {
    localStorage.setItem(chave, '1')
  } catch {
    /* sem armazenamento */
  }
}

// Contador que anda sozinho nos desenhos (cronômetro, descanso). Parado com "reduzir movimento".
export function useTique(ms: number): number {
  const quieto = useReducedMotion()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (quieto) return
    const t = setInterval(() => setN((x) => x + 1), ms)
    return () => clearInterval(t)
  }, [ms, quieto])
  return n
}

// Cartão de vidro onde mora o desenho de cada passo.
export const Palco = ({ children }: { children: ReactNode }) => (
  <div className="vidro-escuro grid min-h-64 place-items-center rounded-3xl p-5">
    <div className="w-full max-w-xs">{children}</div>
  </div>
)

export default function Onboarding({
  chave,
  passos,
  atalhos,
  fechar,
}: {
  chave: string
  passos: Passo[]
  atalhos: Atalho[]
  fechar: () => void
}) {
  // O último passo é o "Tudo pronto": os passos + 1.
  const total = passos.length + 1
  const [[i, dir], setPasso] = useState<[number, number]>([0, 0])
  const quieto = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const ultimo = i === total - 1

  const ir = (n: number) => setPasso(([a]) => (n < 0 || n >= total ? [a, 0] : [n, n > a ? 1 : -1]))
  const sair = () => {
    marcarVisto(chave)
    fechar()
  }
  const acoes = useRef({ sair, ir, i })
  acoes.current = { sair, ir, i }
  useEffect(() => {
    ref.current?.focus()
    const tecla = (e: KeyboardEvent) => {
      const a = acoes.current
      if (e.key === 'Escape') a.sair()
      else if (e.key === 'ArrowRight') a.ir(a.i + 1)
      else if (e.key === 'ArrowLeft') a.ir(a.i - 1)
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [])

  const p = passos[i]
  const desloca = quieto ? 0 : 60
  return (
    <m.div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`onboarding-titulo-${i}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: saida }}
      transition={suave}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-slate-950 outline-none"
    >
      <Brilho />
      {/* Progresso: só desenho (não clicável) no topo; os botões ficam embaixo, perto do polegar. */}
      <div aria-hidden className="mx-auto flex w-full max-w-md gap-1.5 px-5 pt-topo">
        {Array.from({ length: total }, (_, n) => (
          <span key={n} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
            <m.span className="block h-full origin-left rounded-full bg-marca-400" initial={false} animate={{ scaleX: n <= i ? 1 : 0 }} transition={agil} />
          </span>
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col overflow-y-auto px-5 pt-4">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <m.div
            key={i}
            custom={dir}
            initial={{ opacity: 0, x: dir * desloca }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * desloca, transition: saida }}
            transition={suave}
            drag={quieto ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) ir(i + 1)
              else if (info.offset.x > 60) ir(i - 1)
            }}
            className="flex flex-1 touch-pan-y flex-col justify-center pb-4"
          >
            {ultimo ? (
              <Pronto id={`onboarding-titulo-${i}`} atalhos={atalhos} sair={sair} />
            ) : (
              <>
                <div aria-hidden>{p.ilustracao}</div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-marca-300">{p.rotulo}</p>
                <h2 id={`onboarding-titulo-${i}`} className="mt-1.5 font-display text-[28px] font-extrabold leading-[1.1] text-white">{p.titulo}</h2>
                <p className="mt-2.5 text-base leading-snug text-slate-200">{p.texto}</p>
              </>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto w-full max-w-md px-5 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <p className="mb-2 text-center text-xs text-slate-400">{i + 1} de {total}</p>
        <div className="flex items-center gap-2">
          {i > 0 && (
            <button type="button" onClick={() => ir(i - 1)} className="vidro-escuro h-14 rounded-2xl border border-white/20 px-5 text-[15px] font-bold text-white">Voltar</button>
          )}
          <button
            type="button"
            onClick={ultimo ? sair : () => ir(i + 1)}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-marca-400 bg-marca-500 text-[17px] font-bold text-white shadow-lg"
          >
            {ultimo ? 'Começar' : 'Próximo'} {!ultimo && <IcSeta className="size-5" />}
          </button>
        </div>
        {/* Sempre o mesmo lugar (o botão principal não pula de posição); no último passo fica só o espaço. */}
        <button type="button" onClick={sair} className={`mt-1 h-11 w-full text-[15px] font-semibold text-slate-400 hover:text-white ${ultimo ? 'invisible' : ''}`}>Pular</button>
      </div>
    </m.div>
  )
}

// Último passo: comemoração + atalhos para a primeira ação (cada atalho fecha e já leva para a tela).
function Pronto({ id, atalhos, sair }: { id: string; atalhos: Atalho[]; sair: () => void }) {
  return (
    <>
      <div aria-hidden className="grid place-items-center">
        <m.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', visualDuration: 0.5, bounce: 0.4 }}
          className="grid size-24 place-items-center rounded-full bg-marca-500 text-white shadow-[0_0_60px_var(--color-marca-500)]"
        >
          <svg viewBox="0 0 24 24" className="size-12" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <m.path d="m5 12.5 4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.4 }} />
          </svg>
        </m.span>
      </div>
      <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-marca-300">Tudo pronto</p>
      <h2 id={id} className="mt-1.5 text-center font-display text-[28px] font-extrabold leading-[1.1] text-white">Agora é com você!</h2>
      <p className="mt-2 text-center text-base text-slate-200">Por onde quer começar?</p>
      <ul className="mt-5 space-y-2.5">
        {atalhos.map(({ Icone, texto, href }) => (
          <li key={href}>
            <a href={href} onClick={sair} className="vidro-escuro flex min-h-14 items-center gap-3 rounded-2xl px-3.5 py-2 text-base font-semibold text-white ring-1 ring-white/10">
              <IconeQuadrado><Icone className="size-5" /></IconeQuadrado>
              <span className="flex-1">{texto}</span>
              <IcSeta className="size-5 text-slate-400" />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
