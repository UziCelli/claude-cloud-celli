import { AnimatePresence, m } from 'motion/react'
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

// Peças visuais compartilhadas (tema escuro). Use estas em vez de reinventar estilos.

// Sempre abaixo do cabeçalho do coach, que já tem a margem de segurança do topo (notch).
// Mensagem mostrada uma vez na página do aluno depois de criar.
export const flash = { texto: '' }

// Parte comum dos campos de formulário; cada campo soma padding/largura/foco.
export const campoBase = 'rounded-lg border border-slate-700 bg-slate-950 text-base text-slate-100'

export const Pagina = ({ titulo, acoes, children }: { titulo: ReactNode; acoes?: ReactNode; children: ReactNode }) => (
  <main className="mx-auto max-w-6xl px-4 py-6">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-bold">{titulo}</h1>
      {acoes && <div className="flex flex-wrap gap-2">{acoes}</div>}
    </div>
    {children}
  </main>
)

export const Cartao = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-slate-800 bg-slate-900 p-4 ${className}`}>{children}</div>
)

const estilos = {
  primario: 'bg-marca-500 text-white hover:bg-marca-400',
  secundario: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
  perigo: 'bg-red-600 text-white hover:bg-red-500',
}

export const Botao = ({
  tipo = 'secundario',
  className = '',
  ...p
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> & {
  tipo?: keyof typeof estilos
}) => (
  <m.button
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.12 }}
    {...p}
    className={`rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-50 ${estilos[tipo]} ${className}`}
  />
)

export const Campo = ({ rotulo, className = '', ...p }: InputHTMLAttributes<HTMLInputElement> & { rotulo: string }) => (
  <label className={`flex min-w-0 flex-col gap-1 text-sm ${className}`}>
    <span className="text-slate-400">{rotulo}</span>
    <input
      {...p}
      className={`${campoBase} px-3 py-2 outline-none focus:border-marca-500`}
    />
  </label>
)

export const Aviso = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-amber-700 bg-amber-950/50 px-3 py-2 text-sm text-amber-200">{children}</div>
)

export const Centro = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-dvh items-center justify-center px-4 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))] text-center">
    <div className="w-full max-w-sm min-w-0 space-y-4">{children}</div>
  </div>
)

// Troca de tela: fade + leve deslocamento; `chave` = rota.
export const Tela = ({ chave, children }: { chave: string; children: ReactNode }) => (
  <AnimatePresence mode="wait" initial={false}>
    <m.div
      key={chave}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.08 } }}
    >
      {children}
    </m.div>
  </AnimatePresence>
)

// Painel que abre/fecha com altura + opacidade (use no lugar de `{aberto && <X/>}`).
export const Painel = ({ aberto, children, className }: { aberto: boolean; children: ReactNode; className?: string }) => (
  <AnimatePresence initial={false}>
    {aberto && (
      <m.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`overflow-hidden ${className ?? ''}`}
      >
        {children}
      </m.div>
    )}
  </AnimatePresence>
)

// Cascata: <Cascata> (container) + <Item> (filhos diretos). Sem delay em campos de digitação.
export const cascata = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
export const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } }

// Barra que cresce da esquerda até `frac` (0–1) ao aparecer.
export const Barra = ({ frac }: { frac: number }) => (
  <m.div
    className="mt-1 h-1 origin-left rounded bg-marca-500"
    style={{ width: `${Math.max(2, Math.round(frac * 100))}%` }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  />
)
