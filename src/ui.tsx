import { AnimatePresence, m, useIsPresent, useReducedMotion, type Variants } from 'motion/react'
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import Logo from '@marca/Logo'
import { agil, ESPERA_ENTRADA_MS, saida, suave } from './movimento'

// Peças visuais compartilhadas (tema escuro). Use estas em vez de reinventar estilos.

// Sempre abaixo do cabeçalho do coach, que já tem a margem de segurança do topo (notch).
// Mensagem mostrada uma vez na página do aluno depois de criar.
export const flash = { texto: '' }

// Parte comum dos campos de formulário; cada campo soma padding/largura/foco.
export const campoBase = 'rounded-lg border border-slate-700 bg-slate-950 text-base text-slate-100'

// `voltar`: o <BotaoVoltar> da tela (src/voltar.tsx); aba não tem.
export const Pagina = ({ titulo, acoes, voltar, children }: { titulo: ReactNode; acoes?: ReactNode; voltar?: ReactNode; children: ReactNode }) => (
  <main className="mx-auto max-w-6xl px-4 py-6">
    {voltar && <div className="-mt-3">{voltar}</div>}
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
  primario: 'border-marca-400 bg-marca-500 text-white hover:bg-marca-400',
  secundario: 'border-slate-600 hover:border-slate-500 bg-slate-800 text-slate-100 hover:bg-slate-700',
  perigo: 'border-red-400 bg-red-600 text-white hover:bg-red-500',
  destaque: 'border-amber-300 bg-amber-400 text-slate-950 hover:bg-amber-300',
  alerta: 'bg-red-500/15 text-red-300 border-red-400/50 hover:bg-red-500/25',
  vidro: 'vidro-escuro border-white/20 text-white', // = "Voltar" do onboarding
  fantasma: 'border-transparent bg-transparent text-slate-400 hover:text-white', // = "Pular" do onboarding
}

// md: alvo de toque de 44px. lg: botão principal do onboarding (56px), para a ação principal da tela.
const tamanhos = {
  md: 'min-h-11 rounded-xl px-4 text-[15px] font-semibold',
  lg: 'h-14 rounded-2xl px-5 text-[17px] font-bold shadow-lg',
}

export const classesBotao = (tipo: keyof typeof estilos, tamanho: keyof typeof tamanhos, extra = '') =>
  `border transition-colors disabled:opacity-50 ${tamanhos[tamanho]} ${estilos[tipo]} ${extra}`

export const Botao = ({
  tipo = 'secundario',
  tamanho = 'md',
  className = '',
  carregando = false,
  children,
  ...p
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> & {
  tipo?: keyof typeof estilos
  tamanho?: keyof typeof tamanhos
  carregando?: boolean
}) => (
  <button {...p} className={classesBotao(tipo, tamanho, className)}>
    {carregando ? (
      <span className="inline-flex items-center justify-center gap-2">
        <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        {children}
      </span>
    ) : (
      children
    )}
  </button>
)

export const Campo = ({ rotulo, className = '', ...p }: InputHTMLAttributes<HTMLInputElement> & { rotulo: string }) => (
  <label className={`group flex min-w-0 flex-col gap-1 text-sm ${className}`}>
    <span className="text-slate-400 transition-colors group-focus-within:text-marca-300">{rotulo}</span>
    <input
      {...p}
      onClick={(e) => {
        p.onClick?.(e)
        if (p.type === 'date')
          try {
            e.currentTarget.showPicker?.()
          } catch {
            /* navegador sem showPicker */
          }
      }}
      className={`${campoBase} px-3 py-2 outline-none transition-[border-color,box-shadow] focus:border-marca-500 focus:shadow-[0_0_0_3px_rgba(63,114,166,0.3)]`}
    />
  </label>
)

// Texto digitado -> número dentro de [min, max]. Vazio: undefined se `vazio`, senão `anterior`.
export function confirmarNumero(texto: string, min: number, max: number | undefined, vazio: boolean, anterior: number | undefined) {
  const t = texto.trim()
  if (t === '') return vazio ? undefined : anterior
  const n = Number(t.replace(',', '.'))
  if (!Number.isFinite(n)) return anterior
  return Math.min(max ?? Infinity, Math.max(min, Math.round(n)))
}

// Número que só vale ao sair do campo (ou Enter): dá para apagar tudo e digitar de novo.
export function CampoNumero({
  rotulo,
  valor,
  min,
  max,
  vazio,
  onConfirmar,
}: {
  rotulo: string
  valor: number | undefined
  min: number
  max?: number
  vazio?: 'undefined'
  onConfirmar: (n: number) => boolean | void // com `vazio`, pode chegar undefined; false = recusou (o texto volta)
}) {
  const [texto, setTexto] = useState(valor === undefined ? '' : String(valor))
  useEffect(() => setTexto(valor === undefined ? '' : String(valor)), [valor])
  const confirmar = () => {
    const n = confirmarNumero(texto, min, max, vazio === 'undefined', valor)
    const recusou = n !== valor && onConfirmar(n as number) === false
    const fica = recusou ? valor : n
    setTexto(fica === undefined ? '' : String(fica))
  }
  return (
    <label className="group flex min-w-0 flex-col gap-1 text-sm">
      <span className="text-slate-400 transition-colors group-focus-within:text-marca-300">{rotulo}</span>
      <input
        type="text"
        inputMode="numeric"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={confirmar}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className={`${campoBase} px-3 py-2 outline-none transition-[border-color,box-shadow] focus:border-marca-500 focus:shadow-[0_0_0_3px_rgba(63,114,166,0.3)]`}
      />
    </label>
  )
}

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

// Leve de propósito: só `transform` (string) e `opacity`, que o Motion passa para a GPU (WAAPI). `x`/`y`/`scale`
// soltos rodam quadro a quadro na linha principal e engasgam no Android ao abrir as telas (11/11/2026).
// Termina em `none`: transform parado vira bloco de contenção para `fixed` de dentro.
export const sobe = { opacity: 1, transform: 'translateY(0px)', transitionEnd: { transform: 'none' } }

// Mensagem que aparece e some suave (erro, sucesso, aviso). `chave` muda = anima de novo.
export const Msg = ({ children, className = '' }: { children?: ReactNode; className?: string }) => {
  const montou = useMontou()
  return children ? (
    <m.div
      key={typeof children === 'string' ? children : 'msg'}
      // sem animar altura (travava no iPhone) e sem saída (como o Painel): só opacidade + deslize ao entrar
      initial={montou ? { opacity: 0, transform: 'translateY(-4px)' } : false}
      animate={sobe}
      transition={agil}
      className={className}
    >
      {children}
    </m.div>
  ) : null
}

// Tela de abertura: logo entra, pulsa de leve enquanto carrega.
export const Abertura = ({ texto, children }: { texto?: string; children?: ReactNode }) => {
  const parado = useReducedMotion() // pulso em loop (opacidade) não é coberto pelo MotionConfig
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 px-4">
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={suave}>
        <m.div
          animate={parado ? undefined : { opacity: [1, 0.55, 1] }}
          transition={{ duration: 1.6, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Logo className="h-10 text-white" />
        </m.div>
      </m.div>
      <m.div
        aria-hidden
        className="h-0.5 w-24 origin-left rounded bg-marca-500"
        initial={{ transform: 'scaleX(0)', opacity: 0 }}
        animate={{ transform: 'scaleX(1)', opacity: 1 }}
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
      {children}
    </div>
  )
}

export const Centro = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-dvh items-center justify-center px-4 pb-6 pt-[calc(1.5rem+env(safe-area-inset-top))] text-center">
    <m.div className="w-full max-w-sm min-w-0 space-y-4" initial={{ opacity: 0, transform: 'translateY(6px)' }} animate={sobe} transition={suave}>
      {children}
    </m.div>
  </div>
)

// Navegação estilo iOS. `chave` = rota; `abrir` = tela de detalhe.
// abrir false→true = push (nova entra da direita; a anterior sai recuando); true→false = pop (inverso).
// Mesmo nível (troca de aba) = só fade, sem deslize.
// Modo "wait" (saída curta, depois a entrada): com as duas telas sobrepostas (popLayout) o texto da tela que
// sai repete na página e quebra o e2e (getByText estrito), então a sobreposição ficou de fora.
// `transform` (e não `x`): o Motion só passa para a GPU (WAAPI) opacity/transform. Com `x` o deslize rodava quadro a
// quadro na linha principal, junto com a montagem da tela nova, e engasgava sempre no Android (11/11/2026).
// Termina em `none`: transform parado vira bloco de contenção e desloca os `fixed` de dentro da tela (folhas, descanso).
const desloca = (pct: number) => `translateX(${pct}%)`
const camada: Variants = {
  entra: (d: number) => (d ? { transform: desloca(d > 0 ? 100 : -25), opacity: d > 0 ? 1 : 0.5 } : { opacity: 0 }),
  fica: (d: number) => ({ transform: desloca(0), opacity: 1, transition: d ? suave : saida, transitionEnd: { transform: 'none' } }),
  sai: (d: number) => ({ opacity: 0, transform: d ? desloca(d > 0 ? -25 : 25) : 'none', transition: saida }),
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

// Painel que abre com opacidade + deslize e fecha na hora (use no lugar de `{aberto && <X/>}`).
// Sem animar altura: altura recalcula a página a cada quadro e, sob o vidro (backdrop-filter), travava no iPhone.
// Sem animação de saída: o que está embaixo sobe no toque; com saída, subia 0,15 s depois e o próximo toque errava o botão.
export const Painel = ({ aberto, children, className }: { aberto: boolean; children: ReactNode; className?: string }) => {
  const montou = useMontou()
  return aberto ? (
    <m.div initial={montou ? { opacity: 0, transform: 'translateY(-8px)' } : false} animate={sobe} transition={suave} className={className}>
      {children}
    </m.div>
  ) : null
}

// Vira true depois que a tela terminou de entrar (ESPERA_ENTRADA_MS): para adiar o que é pesado e não é urgente.
export const useDepoisDaEntrada = () => {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOk(true), ESPERA_ENTRADA_MS)
    return () => clearTimeout(t)
  }, [])
  return ok
}

// Falso só na 1ª renderização: o que já aparece ao montar não anima (como AnimatePresence initial={false}).
// Lê a ref no render de propósito: só importa na montagem do filho (initial), não precisa re-renderizar.
// Sem AnimatePresence onde não há saída: sem `exit`, ele não remontava o painel ao reabrir.
export const useMontou = () => {
  const r = useRef(false)
  useEffect(() => {
    r.current = true
  }, [])
  return r.current
}

// Cascata: <Cascata> (container) + <Item> (filhos diretos). Sem delay em campos de digitação.
export const cascata = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }
export const item = { hidden: { opacity: 0 }, show: { opacity: 1, transition: suave } } // só opacidade: leve na entrada da tela

// Barra que cresce da esquerda até `frac` (0–1) ao aparecer.
export const Barra = ({ frac }: { frac: number }) => (
  <m.div
    className="mt-1 h-1 origin-left rounded bg-marca-500"
    style={{ width: `${Math.max(2, Math.round(frac * 100))}%` }}
    initial={{ transform: 'scaleX(0)' }}
    animate={{ transform: 'scaleX(1)' }}
    transition={suave}
  />
)

// Troca com deslize na direção da seta: `chave` numérica (ex.: semana). Maior = desliza para a esquerda.
const desliza = {
  entra: (d: number) => ({ opacity: 0, transform: `translateX(${d * 20}px)` }),
  fica: { opacity: 1, transform: 'translateX(0px)', transition: suave, transitionEnd: { transform: 'none' } },
  sai: (d: number) => ({ opacity: 0, transform: `translateX(${-d * 20}px)`, transition: saida }),
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

// Número (antes contava de 0 até `n` com um render por quadro: pesava na entrada da Evolução; 11/11/2026).
export const Contar = ({ n }: { n: number }) => <>{n}</>

export function Folha({ titulo, onFechar, children }: { titulo: string; onFechar: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end bg-black/60" onClick={onFechar}>
      <div role="dialog" aria-label={titulo} className="mx-auto max-h-[80dvh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-3xl bg-slate-900 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-base font-bold">{titulo}</h2>
        {children}
      </div>
    </div>
  )
}
