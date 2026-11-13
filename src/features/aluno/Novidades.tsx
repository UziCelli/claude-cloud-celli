import type { ReactNode } from 'react'
import { m } from 'motion/react'
import marca from '@marca/marca.json'
import { IcBalao, IcCartao, IcEstrela, IcFisio, IcHaltere, IcNota, IcPlay, IcPrancheta, IcRelogio, IcSino, IcSubir, type Icone } from '../../icones'
import { PIX } from './PagarPix'
import Onboarding, { naoVisto, Palco, type Atalho, type Passo } from '../onboarding/Onboarding'

// Novidades de novembro/2026 para quem já usa o app. Abre 1x por aparelho.
// Na próxima leva de novidades: troque os passos e a CHAVE (ex.: 'forca-novidades-2026-12').
export const CHAVE_NOVIDADES = 'forca-novidades-2026-11'
export const novidadesNaoVistas = () => naoVisto(CHAVE_NOVIDADES)

const Chip = ({ Icone, texto, n }: { Icone: Icone; texto: string; n: number }) => (
  <m.span
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + n * 0.07 }}
    className="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2.5 text-sm font-semibold text-white"
  >
    <Icone className="size-5 shrink-0 text-marca-400" /> {texto}
  </m.span>
)

const Campo = ({ children, destaque }: { children: ReactNode; destaque?: boolean }) => (
  <span className={`flex h-10 flex-1 items-center justify-center rounded-lg bg-slate-950 font-semibold text-white ${destaque ? 'ring-2 ring-marca-400' : ''}`}>{children}</span>
)

const Cartao = ({ parte, valor, n }: { parte: string; valor: string; n: number }) => (
  <m.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.15 + n * 0.1 }}
    className="rounded-xl bg-slate-800/80 p-3 text-left"
  >
    <p className="text-xs text-slate-400">{parte}</p>
    <p className="flex items-center gap-1 font-display text-lg font-extrabold text-emerald-300">
      <IcSubir className="size-4" /> {valor}
    </p>
  </m.div>
)

const passos = (nome: string): Passo[] => [
  {
    rotulo: nome ? `Oi, ${nome}!` : 'Novidades',
    titulo: 'O app ficou maior',
    texto: 'Nos últimos dias chegaram várias melhorias, muitas pedidas por vocês. Veja as principais em 1 minuto.',
    ilustracao: (
      <Palco>
        <div className="grid grid-cols-2 gap-2">
          <Chip n={0} Icone={IcFisio} texto="Físio" />
          <Chip n={1} Icone={IcHaltere} texto="Cada lado" />
          <Chip n={2} Icone={IcPrancheta} texto="Avaliação" />
          <Chip n={3} Icone={IcSino} texto="Lembretes" />
          <Chip n={4} Icone={IcRelogio} texto="Isometria" />
          {PIX && <Chip n={5} Icone={IcCartao} texto="Pix rápido" />}
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'Nova aba · Físio',
    titulo: 'Sentiu dor? Conte na hora',
    texto: 'No treino, toque em "Senti dor" e diga onde e quanto. No fim, um check-in rápido. Seu coach recebe, e as orientações dele ficam na aba Físio.',
    ilustracao: (
      <Palco>
        <div className="space-y-4 text-center">
          <span className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-amber-400 px-4 text-sm font-semibold text-amber-300">
            <IcFisio className="size-5" /> Senti dor
          </span>
          <div className="flex justify-center gap-1">
            {Array.from({ length: 11 }, (_, n) => (
              <span key={n} className={`grid size-6 place-items-center rounded-md text-[10px] font-bold ${n === 3 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>{n}</span>
            ))}
          </div>
          <p className="text-sm text-slate-300">Como você está? Vai só para o seu coach.</p>
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'No treino',
    titulo: 'Halteres: anote cada lado',
    texto: 'Em exercícios com dois halteres ou máquina de dois lados, anote os kg de um lado só: o app soma os dois. Um lado mais fraco? Toque em "lados diferentes" e anote esquerdo e direito.',
    ilustracao: (
      <Palco>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-6 font-bold text-slate-300">S1</span>
            <Campo destaque>12</Campo>
            <span className="text-slate-400">kg cada lado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 font-bold text-slate-300">S2</span>
            <Campo>E 12</Campo>
            <Campo>D 10</Campo>
          </div>
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'Novo · Isometria',
    titulo: 'Isometria agora conta tempo',
    texto: 'Prancha, cadeirinha e mais 28 exercícios isométricos agora são em segundos. Toque na série para cronometrar e anote os segundos feitos. O app soma seu tempo sob tensão, separado das cargas.',
    ilustracao: (
      <Palco>
        <div className="space-y-3 text-sm">
          {[['S1', '32', true], ['S2', '30', false]].map(([s, feito, destaque]) => (
            <div key={s as string} className="flex items-center gap-2">
              <span className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2.5 text-xs font-bold text-marca-300 ring-1 ring-slate-700">{s} <IcPlay className="size-3" /></span>
              <span className="text-xs text-slate-400">30 s</span>
              <Campo destaque={destaque as boolean}>{feito}</Campo>
              <span className="text-xs text-slate-400">s feitos</span>
            </div>
          ))}
          <p className="rounded-xl bg-slate-950 px-3 py-2 text-center font-semibold text-white">Tempo sob tensão: 62 s</p>
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'Avaliação física',
    titulo: 'Veja onde você evoluiu',
    texto: 'A avaliação mostra o corpo, de frente e de costas, com as partes que melhoraram, e vem com PDF. A anamnese é um questionário rápido para o coach te conhecer melhor.',
    ilustracao: (
      <Palco>
        <div className="grid grid-cols-2 gap-2">
          <Cartao n={0} parte="Braços" valor="melhorou" />
          <Cartao n={1} parte="Pernas" valor="melhorou" />
          <Cartao n={2} parte="Costas" valor="melhorou" />
          <Cartao n={3} parte="Peito" valor="melhorou" />
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'No dia a dia',
    titulo: 'Lembretes na hora certa',
    texto: 'Com as notificações ligadas, o lembrete do treino chega cedo e só nos seus dias de treino. Suas anotações agora mostram a data, e dá para apagar as antigas.',
    ilustracao: (
      <Palco>
        <div className="space-y-3">
          <div className="vidro flex items-start gap-3 rounded-2xl p-3 text-left">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-marca-500 text-white"><IcSino className="size-5" /></span>
            <span className="text-sm text-white">
              <b>Hoje tem treino</b>
              <span className="block text-slate-300">Seu treino de hoje está no app.</span>
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2.5 text-sm text-white">
            <IcNota className="size-4 text-marca-400" /> Banco na altura 4
            <span className="ml-auto text-xs text-slate-400">12/11 · hoje</span>
          </div>
        </div>
      </Palco>
    ),
  },
  {
    rotulo: 'Mais prático',
    titulo: 'Mais leve e mais rápido',
    texto: `As telas abrem sem travar${PIX ? ', o próximo ciclo aparece no dia certo, e dá para adiantar a mensalidade pelo Pix direto no Início' : ' e o próximo ciclo aparece no dia certo'}.`,
    ilustracao: (
      <Palco>
        <div className="space-y-2 text-sm">
          <Chip n={0} Icone={IcSubir} texto="Telas mais rápidas" />
          <Chip n={1} Icone={IcHaltere} texto="Próximo ciclo no dia certo" />
          {PIX && <Chip n={2} Icone={IcCartao} texto="Pix em 1 toque no Início" />}
        </div>
      </Palco>
    ),
  },
]

export default function Novidades({ nome, fechar }: { nome: string; fechar: () => void }) {
  const primeiro = nome.trim().split(' ')[0]
  // O prato principal é o app: avaliar o app vem primeiro. O Google (o atendimento) é extra, só se a marca tiver o link.
  const atalhos: Atalho[] = [{ Icone: IcEstrela, texto: 'Avaliar o app (30 segundos)', href: '#/feedback' }]
  if (marca.avaliarGoogle) atalhos.push({ Icone: IcBalao, texto: 'Avaliar o atendimento no Google', href: marca.avaliarGoogle })
  return (
    <Onboarding
      chave={CHAVE_NOVIDADES}
      passos={passos(primeiro)}
      atalhos={atalhos}
      fechar={fechar}
      fim={{
        rotulo: 'Vem muito mais',
        titulo: 'Contamos com a sua ajuda',
        texto: 'O app ganha melhorias toda semana. Sua avaliação mostra o que está bom e o que melhorar, e decide o que vem a seguir.',
        botao: 'Fechar',
      }}
    />
  )
}
