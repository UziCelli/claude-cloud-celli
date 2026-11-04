import type { ReactNode } from 'react'
import { m } from 'motion/react'
import marca from '@marca/marca.json'
import Logo from '@marca/Logo'
import { COR_METODO } from '../../data/metodos'
import { IcCasa, IcCheck, IcGrafico, IcHaltere, IcInfo, IcLivro, IcNota, IcPausa, IcPessoa, IcPlay, IcSino, IcTrofeu } from '../../icones'
import Onboarding, { naoVisto, Palco, useTique, type Passo } from '../onboarding/Onboarding'

const CHAVE = 'forca-tutorial-visto'
export const tutorialNaoVisto = () => naoVisto(CHAVE)

const Linha = ({ s, kg, reps, cinza, faixa, destaque }: { s: string; kg: string; reps: string; cinza?: string; faixa?: string; destaque?: boolean }) => (
  <div className="relative flex items-center gap-2 overflow-hidden rounded-xl bg-slate-800/80 py-1.5 pl-3 pr-2 text-sm">
    {faixa && <span className={`absolute inset-y-0 left-0 w-1 ${faixa}`} />}
    <span className="w-6 font-bold text-slate-300">{s}</span>
    <span className={`flex h-9 w-20 items-center justify-center rounded-lg bg-slate-950 font-semibold ${destaque ? 'ring-2 ring-marca-400' : ''}`}>
      {kg}
      {cinza && <span className="ml-1 text-xs font-normal text-slate-500">{cinza}</span>}
    </span>
    <span className="text-slate-500">kg</span>
    <span className="flex h-9 w-12 items-center justify-center rounded-lg bg-slate-950 font-semibold">{reps}</span>
    <span className="text-slate-500">reps</span>
  </div>
)
const Botaozinho = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`inline-flex items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold ${className}`}>{children}</span>
)
const Selo = ({ nome, cor }: { nome: string; cor: keyof typeof COR_METODO }) => (
  <span className={`rounded-full px-2.5 py-1 text-sm font-bold ring-1 ${COR_METODO[cor].selo}`}>{nome} <IcInfo className="inline size-3 align-[-1px]" /></span>
)
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

function Abas() {
  const abas = [['Início', IcCasa], ['Treino', IcHaltere], ['Evolução', IcGrafico], ['Conta', IcPessoa]] as const
  return (
    <div className="space-y-6 text-center">
      <Logo className="mx-auto h-10 text-white" />
      <div className="vidro mx-auto flex h-14 max-w-[300px] items-center rounded-full px-1.5">
        {abas.map(([rotulo, Icone], n) => (
          <m.span
            key={rotulo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + n * 0.08 }}
            className="flex flex-1 flex-col items-center gap-0.5 text-[10.5px] font-semibold text-slate-200"
          >
            <Icone className={`size-5 ${n === 1 ? 'text-marca-400' : ''}`} />
            {rotulo}
          </m.span>
        ))}
      </div>
    </div>
  )
}

function Cronometro() {
  const s = 750 + useTique(1000)
  return (
    <div className="space-y-3 text-center">
      <Botaozinho className="w-full border-marca-400 bg-marca-500 py-3 text-base text-white"><IcPlay className="mr-1.5 size-4" /> Iniciar treino</Botaozinho>
      <p className="text-sm text-slate-300">Treino em andamento</p>
      <p className="font-display text-4xl font-extrabold tabular-nums text-white">00:{mmss(s).padStart(5, '0')}</p>
      <p className="text-xs text-slate-400">Previsto: 55 min</p>
    </div>
  )
}

function Descanso() {
  const resta = 60 - (useTique(1000) % 61)
  return (
    <div className="flex items-center justify-center gap-3">
      <Botaozinho className="border-slate-500 bg-slate-700"><IcPlay className="mr-1.5 size-4" /> 60 s</Botaozinho>
      <span className="text-slate-500">→</span>
      <Botaozinho className="min-w-24 border-marca-400 bg-marca-500 text-lg tabular-nums text-white"><IcPausa className="mr-1.5 size-4" /> {mmss(resta)}</Botaozinho>
      <Botaozinho className="border-slate-500 bg-slate-700"><IcSino className="size-5" /></Botaozinho>
    </div>
  )
}

function Story({ nome }: { nome: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative aspect-[9/16] w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-marca-500 to-marca-900 p-2 text-white shadow-lg ring-1 ring-white/20">
        <Logo className="h-2.5" />
        <p className="mt-3 text-[11px] font-bold leading-tight">{nome}</p>
        <p className="font-display text-xl font-extrabold leading-none">4,2 t</p>
        <p className="text-[9px] opacity-80">levantadas hoje</p>
        <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }} className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1 rounded-full bg-white/20 py-1 text-[9px] font-bold">
          <IcTrofeu className="size-3" /> 2 recordes
        </m.span>
      </div>
      <Botaozinho className="flex-1 border-marca-400 bg-marca-500 py-3 text-white">Concluir treino</Botaozinho>
    </div>
  )
}

const passos = (nome: string): Passo[] => [
  {
    rotulo: nome ? `Oi, ${nome}!` : 'Boas-vindas',
    titulo: marca.boasVindas,
    texto: 'Em menos de 1 minuto você aprende a usar o app no treino. Embaixo ficam Início, Treino, Evolução e Conta.',
    ilustracao: <Palco><Abas /></Palco>,
  },
  {
    rotulo: 'Passo 1',
    titulo: 'Comece o treino',
    texto: 'Abra a aba Treino e toque em "Iniciar treino". O tempo corre ao lado do tempo previsto, para você comparar.',
    ilustracao: <Palco><Cronometro /></Palco>,
  },
  {
    rotulo: 'Passo 2',
    titulo: 'Anote o peso de cada série',
    texto: 'O número cinza é o peso da semana passada: tente igualar ou passar. As reps já vêm prontas; só mude se fez diferente.',
    ilustracao: (
      <Palco>
        <div className="space-y-1.5">
          <Linha s="S1" kg="40" cinza="38" reps="10" destaque />
          <Linha s="S2" kg="40" cinza="38" reps="10" />
          <Linha s="S3" kg="" cinza="38" reps="10" />
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'Passo 3',
    titulo: 'Cores mostram o método',
    texto: 'A faixa colorida marca as séries com método. D1, D2… são as etapas do dropset. Não sabe fazer? Toque no selo e veja o passo a passo.',
    ilustracao: (
      <Palco>
        <div className="space-y-1.5">
          <Linha s="S2" kg="40" reps="10" faixa={COR_METODO.Dropset.faixa} />
          <Linha s="D1" kg="30" reps="8" faixa={COR_METODO.Dropset.faixa} />
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Selo nome="Dropset" cor="Dropset" />
            <span className="relative">
              <Selo nome="Biset" cor="Biset" />
              <span aria-hidden className="absolute -right-1 -top-1 size-3 motion-safe:animate-ping rounded-full bg-marca-400" />
            </span>
            <Selo nome="Rest-pause" cor="Rest-pause" />
          </div>
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'Passo 4',
    titulo: 'Descanso no tempo certo',
    texto: 'Depois da série, toque em Play. O app avisa quando o descanso acabar. O sininho liga e desliga o aviso.',
    ilustracao: <Palco><Descanso /></Palco>,
  },
  {
    rotulo: 'Passo 5',
    titulo: 'Peso do corpo e anotações',
    texto: 'Barra fixa, flexão… Marque "Feito com o peso do corpo" e anote só o peso extra. Em "Anotação" você guarda lembretes: banco, pegada, o que sentiu.',
    ilustracao: (
      <Palco>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-white">
            <span className="grid size-6 place-items-center rounded bg-marca-500 font-bold"><IcCheck className="size-4" /></span>
            Feito com o peso do corpo
          </div>
          <Botaozinho className="w-full border-slate-600 bg-slate-800 text-white"><IcNota className="mr-1.5 size-4" /> Anotação: banco na altura 4</Botaozinho>
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'Passo 6',
    titulo: 'Conclua e comemore',
    texto: 'No fim da página, toque em "Concluir treino". Você ganha um resumo para postar no story, se quiser com a sua foto.',
    ilustracao: <Palco><Story nome={nome} /></Palco>,
  },
]

export default function Tutorial({ nome, fechar }: { nome: string; fechar: () => void }) {
  const primeiro = nome.trim().split(' ')[0]
  return (
    <Onboarding
      chave={CHAVE}
      passos={passos(primeiro)}
      atalhos={[
        { Icone: IcHaltere, texto: 'Ver o treino de hoje', href: '#/treino' },
        { Icone: IcGrafico, texto: 'Ver minha evolução', href: '#/evolucao' },
        { Icone: IcLivro, texto: 'Guia de métodos', href: '#/metodos' },
      ]}
      fechar={fechar}
    />
  )
}
