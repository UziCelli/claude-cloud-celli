import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

// Peças visuais compartilhadas (tema escuro). Use estas em vez de reinventar estilos.

// Sempre abaixo do cabeçalho do coach, que já tem a margem de segurança do topo (notch).
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
}: ButtonHTMLAttributes<HTMLButtonElement> & { tipo?: keyof typeof estilos }) => (
  <button
    {...p}
    className={`rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-50 ${estilos[tipo]} ${className}`}
  />
)

export const Campo = ({ rotulo, className = '', ...p }: InputHTMLAttributes<HTMLInputElement> & { rotulo: string }) => (
  <label className={`flex min-w-0 flex-col gap-1 text-sm ${className}`}>
    <span className="text-slate-400">{rotulo}</span>
    <input
      {...p}
      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-100 outline-none focus:border-marca-500"
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
