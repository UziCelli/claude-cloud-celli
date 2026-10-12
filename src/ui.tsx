import { AnimatePresence, m, useIsPresent, useReducedMotion, type Variants } from 'motion/react'
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import Logo from '@marca/Logo'
import { agil, saida, suave } from './movimento'

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
  destaque: 'bg-amber-400 text-slate-950 hover:bg-amber-300',
  alerta: 'bg-red-500/15 text-red-300 ring-1 ring-inset ring-red-400/50 hover:bg-red-500/25',
}

export const Botao = ({
  tipo = 'secundario',
  className = '',
  carregando = false,
  children,
  ...p
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> & {
  tipo?: keyof typeof estilos
  carregando?: boolean
}) => (
  <m.button
    data-m
    whileTap={{ scale: 0.96 }}
    transition={agil}
    {...p}
    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${estilos[tipo]} ${className}`}
  >
    {carregando ? (
      <span className="inline-flex items-center justify-center gap-2">
        <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        {children}
      </span>
    ) : (
      children
    )}
  </m.button>
)

export const Campo = ({ rotulo, className = '', ...p }: InputHTMLAttributes<HTMLInputElement> & { rotulo: string }) => (
  <label className={`group flex min-w-0 flex-col gap-1 text-sm ${className}`}>
    <span className="text-slate-400 transition-colors group-focus-within:text-marca-300">{rotulo}</span>
    <input
      {...p}
      className={`${campoBase} px-3 py-2 outline-none transition-[border-color,box-shadow] focus:border-marca-500 focus:shadow-[0_0_0_3px_rgba(63,114,166,0.3)]`}
    />
  </label>
)

export const Aviso = ({ children }: { children: ReactNode }) => (
  <m.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={agil}
    className="rounded-lg border border-amber-700 bg-amber-950/50 px-3 py-2 text-sm text-amber-200"
  >
    {children}
  </m.div>
)

// Mensagem que aparece e some suave (erro, sucesso, aviso). `chave` muda = anima de novo.
export const Msg = ({ children, className = '' }: { children?: ReactNode; className?: string }) => (
  <AnimatePresence initial={false}>
    {children ? (
      <m.div
        key={typeof children === 'string' ? children : 'msg'}
        initial={{ opacity: 0, height: 0, y: -4 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0, transition: saida }}
        transition={agil}
        className={`overflow-hidden ${className}`}
      >
        {children}
      </m.div>
    ) : null}
  </AnimatePresence>
)

// Tela de abertura: logo entra, pulsa de leve enquanto carrega.
export const Abertura = ({ texto }: { texto?: string }) => (
  <div className="flex min-h-dvh flex-col items-center justify-center gap-5 px-4">
    <m.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={suave}
    >
      <m.div
        animate={{ opacity: [1, 0.55, 1], scale: [1, 1.04, 1] }}
        transition={{ duration: 1.6, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Logo className="h-10 text-white" />
      </m.div>
    </m.div>
    <m.div
      aria-hidden
      className="h-0.5 w-24 origin-left rounded bg-marca-500"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ ...suave, delay: 0.2 }}
    />
    <m.p
      className="h-5 text-sm text-slate-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: texto ? 1 : 0 }}
      transition={{ ...suave, delay: 0.4 }}
    >
      {texto}
    </m.p>
  </div>
)

export const Centro = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-dvh items-center justify-center px-4 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))] text-center">
    <m.div className="w-full max-w-sm min-w-0 space-y-4" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={suave}>
      {children}
    </m.div>
  </div>
)

// Navegação estilo iOS. `chave` = rota; `abrir` = tela de detalhe.
// abrir false→true = push (nova entra da direita; a anterior sai recuando); true→false = pop (inverso).
// Mesmo nível (troca de aba) = só fade, sem deslize.
// Modo "wait" (saída curta, depois a entrada): com as duas telas sobrepostas (popLayout) o texto da tela que
// sai repete na página e quebra o e2e (getByText estrito), então a sobreposição ficou de fora.
const camada: Variants = {
  entra: (d: number) => (d ? { x: d > 0 ? '100%' : '-25%', opacity: d > 0 ? 1 : 0.5 } : { opacity: 0 }),
  fica: (d: number) => ({ x: 0, opacity: 1, transition: d ? suave : saida }),
  sai: (d: number) => ({ opacity: 0, x: d > 0 ? '-25%' : d < 0 ? '25%' : 0, transition: saida }),
}
const reduzida: Variants = { entra: { opacity: 0 }, fica: { opacity: 1, transition: saida }, sai: { opacity: 0, transition: saida } }

// A tela que está saindo fica `inert` e escondida dos leitores de tela.
const Camada = ({ children, ...p }: { children: ReactNode; custom?: number; variants: Variants; initial: string; animate: string; exit: string }) => {
  const presente = useIsPresent()
  return (
    <m.div {...p} inert={!presente} aria-hidden={presente ? undefined : true}>
      {children}
    </m.div>
  )
}

export const Tela = ({ chave, abrir = false, children }: { chave: string; abrir?: boolean; children: ReactNode }) => {
  const quieto = useReducedMotion()
  // Chave nova a cada troca: voltar à mesma rota durante a saída cria uma tela nova (não "ressuscita" a que estava saindo).
  // A direção é fixada na troca: outro render (ex.: snapshot do Firestore) antes da entrada não vira fade.
  const visita = useRef({ chave, n: 0, abrir, dir: 0 })
  const v = visita.current
  if (v.chave !== chave) visita.current = { chave, n: v.n + 1, abrir, dir: abrir === v.abrir ? 0 : abrir ? 1 : -1 }
  const dir = quieto ? 0 : visita.current.dir
  return (
    <div className="relative overflow-x-clip">
      <AnimatePresence mode="wait" custom={dir}>
        <Camada key={`${chave}#${visita.current.n}`} custom={dir} variants={quieto ? reduzida : camada} initial="entra" animate="fica" exit="sai">
          {children}
        </Camada>
      </AnimatePresence>
    </div>
  )
}

// Painel que abre/fecha com altura + opacidade (use no lugar de `{aberto && <X/>}`).
export const Painel = ({ aberto, children, className }: { aberto: boolean; children: ReactNode; className?: string }) => (
  <AnimatePresence initial={false}>
    {aberto && (
      <m.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0, transition: saida }}
        transition={suave}
        className={`overflow-hidden ${className ?? ''}`}
      >
        {children}
      </m.div>
    )}
  </AnimatePresence>
)

// Cascata: <Cascata> (container) + <Item> (filhos diretos). Sem delay em campos de digitação.
export const cascata = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }
export const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: suave } }

// Barra que cresce da esquerda até `frac` (0–1) ao aparecer.
export const Barra = ({ frac }: { frac: number }) => (
  <m.div
    className="mt-1 h-1 origin-left rounded bg-marca-500"
    style={{ width: `${Math.max(2, Math.round(frac * 100))}%` }}
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={suave}
  />
)

// Troca com deslize na direção da seta: `chave` numérica (ex.: semana). Maior = desliza para a esquerda.
const desliza = {
  entra: (d: number) => ({ opacity: 0, x: d * 20 }),
  fica: { opacity: 1, x: 0, transition: suave },
  sai: (d: number) => ({ opacity: 0, x: -d * 20, transition: saida }),
}
export const Deslizar = ({ chave, children }: { chave: number; children: ReactNode }) => {
  const ant = useRef(chave)
  const dir = chave >= ant.current ? 1 : -1
  useEffect(() => {
    ant.current = chave
  })
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <m.div key={chave} custom={dir} variants={desliza} initial="entra" animate="fica" exit="sai">
          {children}
        </m.div>
      </AnimatePresence>
    </div>
  )
}

// Número que conta de 0 até `n` ao aparecer (sem animar se o usuário pede menos movimento).
export const Contar = ({ n }: { n: number }) => {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || n === 0) return setV(n)
    const t0 = performance.now()
    let id = requestAnimationFrame(function passo(t) {
      const k = Math.min(1, (t - t0) / 500)
      setV(Math.round(n * (1 - (1 - k) ** 3)))
      if (k < 1) id = requestAnimationFrame(passo)
    })
    return () => cancelAnimationFrame(id)
  }, [n])
  return <>{v}</>
}
