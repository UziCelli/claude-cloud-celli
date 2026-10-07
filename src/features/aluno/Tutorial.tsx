import { useEffect, useRef, useState, type ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { COR_METODO } from '../../data/metodos'

const CHAVE = 'forca-tutorial-visto'

// Abre sozinho na 1ª visita. Sem armazenamento (ou no e2e) não abre sozinho, para não repetir em laço.
export function tutorialNaoVisto(): boolean {
  try {
    return !navigator.webdriver && localStorage.getItem(CHAVE) == null
  } catch {
    return false
  }
}
function marcarVisto() {
  try {
    localStorage.setItem(CHAVE, '1')
  } catch {
    /* sem armazenamento */
  }
}

const Linha = ({ s, kg, reps, cinza, faixa }: { s: string; kg: string; reps: string; cinza?: string; faixa?: string }) => (
  <div className="relative flex items-center gap-2 overflow-hidden rounded-lg bg-slate-800 py-1.5 pl-3 pr-2 text-sm">
    {faixa && <span className={`absolute inset-y-0 left-0 w-1 ${faixa}`} />}
    <span className="w-6 font-bold text-slate-300">{s}</span>
    <span className="flex h-8 w-20 items-center justify-center rounded bg-slate-900 font-semibold">{kg}{cinza && <span className="ml-1 text-xs font-normal text-slate-500">{cinza}</span>}</span>
    <span className="text-slate-500">kg</span>
    <span className="flex h-8 w-12 items-center justify-center rounded bg-slate-900 font-semibold">{reps}</span>
    <span className="text-slate-500">reps</span>
  </div>
)
const Botaozinho = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold ${className}`}>{children}</span>
)
const Selo = ({ nome, cor }: { nome: string; cor: keyof typeof COR_METODO }) => (
  <span className={`rounded-full px-2.5 py-1 text-sm font-bold ring-1 ${COR_METODO[cor].selo}`}>{nome} ⓘ</span>
)

const PASSOS: { titulo: string; texto: string; ilustracao: ReactNode }[] = [
  {
    titulo: 'Bem-vindo ao Força',
    texto: 'Em poucos passos você aprende a usar o app no treino. Dá menos de 1 minuto.',
    ilustracao: <div className="text-center text-5xl">💪</div>,
  },
  {
    titulo: 'Comece o treino',
    texto: 'Toque em "Iniciar treino". O tempo começa a correr, ao lado do tempo previsto do treino, para você comparar.',
    ilustracao: (
      <div className="space-y-2">
        <Botaozinho className="w-full justify-center bg-marca-500 text-white">▶ Iniciar treino</Botaozinho>
        <p className="text-sm text-slate-400">Treino em andamento · <b className="text-slate-100">00:12:30</b></p>
      </div>
    ),
  },
  {
    titulo: 'Anote sempre o peso',
    texto: 'Digite os kg de cada série. O número cinza é o peso da semana passada: tente igualar ou passar.',
    ilustracao: <Linha s="S1" kg="40" cinza="38" reps="10" />,
  },
  {
    titulo: 'As reps já vêm prontas',
    texto: 'A meta de repetições já aparece preenchida. Só mude se você fez diferente.',
    ilustracao: <Linha s="S1" kg="40" cinza="38" reps="10" />,
  },
  {
    titulo: 'S, D e faixas coloridas',
    texto: 'S1, S2… são as séries. D1, D2… são as etapas do dropset: sem descanso, com peso menor. A faixa colorida mostra as séries que usam um método.',
    ilustracao: (
      <div className="space-y-1.5">
        <Linha s="S1" kg="40" reps="10" />
        <Linha s="S2" kg="40" reps="10" faixa={COR_METODO.Dropset.faixa} />
        <Linha s="D1" kg="30" reps="8" faixa={COR_METODO.Dropset.faixa} />
        <div className="flex flex-wrap gap-2 pt-1">
          <Selo nome="Dropset" cor="Dropset" />
          <Selo nome="Biset" cor="Biset" />
          <Selo nome="Rest-pause" cor="Rest-pause" />
          <Selo nome="Clusterset" cor="Clusterset" />
        </div>
      </div>
    ),
  },
  {
    titulo: 'Toque no selo do método',
    texto: 'Não sabe como fazer um Biset, Rest-pause ou Cluster? Toque no selo colorido e leia o passo a passo.',
    ilustracao: (
      <div className="flex items-center gap-3">
        <Selo nome="Biset" cor="Biset" />
        <span className="text-2xl">👆</span>
      </div>
    ),
  },
  {
    titulo: 'Cronômetro de descanso',
    texto: 'Depois da série, toque em ▶ para contar o descanso. O app avisa quando acabar.',
    ilustracao: (
      <div className="flex items-center gap-2">
        <Botaozinho className="bg-slate-700">▶ 60 s</Botaozinho>
        <span className="text-slate-500">→</span>
        <Botaozinho className="bg-marca-500 text-white">⏸ 0:42</Botaozinho>
      </div>
    ),
  },
  {
    titulo: 'Sininho',
    texto: 'O sininho liga e desliga o aviso quando o descanso termina. 🔔 avisa, 🔕 fica em silêncio.',
    ilustracao: (
      <div className="flex items-center gap-3 text-2xl">
        <Botaozinho className="bg-slate-700">🔔</Botaozinho>
        <span className="text-slate-500">ou</span>
        <Botaozinho className="bg-slate-700">🔕</Botaozinho>
      </div>
    ),
  },
  {
    titulo: 'Exercício com o peso do corpo',
    texto: 'Barra fixa, flexão… Marque "Feito com o peso do corpo" e anote só o peso extra (sem carga, deixe vazio).',
    ilustracao: (
      <div className="flex items-center gap-2 text-sm">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-marca-500 font-bold text-white">✓</span>
        Feito com o peso do corpo
      </div>
    ),
  },
  {
    titulo: 'Anotações',
    texto: 'Toque em "📝 Anotação" para escrever lembretes: altura do banco, pegada, o que sentiu…',
    ilustracao: <Botaozinho className="w-full justify-center bg-slate-800 ring-1 ring-slate-600">📝 Anotação — toque para escrever</Botaozinho>,
  },
  {
    titulo: 'Concluir treino',
    texto: 'No fim da página, toque em "Concluir treino". Você recebe um resumo para postar no story.',
    ilustracao: <Botaozinho className="w-full justify-center bg-marca-500 py-3 text-white">Concluir treino</Botaozinho>,
  },
]

export default function Tutorial({ fechar }: { fechar: () => void }) {
  const [i, setI] = useState(0)
  const quieto = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const ultimo = i === PASSOS.length - 1
  const p = PASSOS[i]

  const sair = () => {
    marcarVisto()
    fechar()
  }
  const sairRef = useRef(sair)
  sairRef.current = sair
  useEffect(() => {
    ref.current?.focus()
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && sairRef.current()
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <m.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-titulo"
        key={i}
        initial={quieto ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-h-full w-full max-w-sm overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-5 outline-none"
      >
        <div aria-hidden className="mb-4 rounded-xl bg-slate-950 p-3">{p.ilustracao}</div>
        <p className="text-xs text-slate-400">{i + 1} de {PASSOS.length}</p>
        <h2 id="tutorial-titulo" className="mt-1 text-lg font-bold">{p.titulo}</h2>
        <p className="mt-1 text-sm text-slate-300">{p.texto}</p>
        <div aria-hidden className="mt-3 flex justify-center gap-1.5">
          {PASSOS.map((_, n) => (
            <span key={n} className={`h-1.5 w-1.5 rounded-full ${n === i ? 'bg-marca-400' : 'bg-slate-700'}`} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <button type="button" onClick={sair} className="min-h-11 px-2 text-sm text-slate-400 hover:text-slate-200">Pular</button>
          <div className="flex gap-2">
            {i > 0 && (
              <button type="button" onClick={() => setI(i - 1)} className="min-h-11 rounded-lg bg-slate-800 px-4 text-sm font-semibold">Voltar</button>
            )}
            <button type="button" onClick={ultimo ? sair : () => setI(i + 1)} className="min-h-11 rounded-lg bg-marca-500 px-5 text-sm font-semibold text-white">
              {ultimo ? 'Começar' : 'Próximo'}
            </button>
          </div>
        </div>
      </m.div>
    </div>
  )
}
