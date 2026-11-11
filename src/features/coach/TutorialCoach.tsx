import type { ReactNode } from 'react'
import { AnimatePresence, m } from 'motion/react'
import marca from '@marca/marca.json'
import { agil, suave } from '../../movimento'
import { Contar } from '../../ui'
import { Bolha } from '../../vidro'
import { PIX } from '../aluno/PagarPix'
import { IcGrupo, IcHaltere, IcMais, IcSino, IcTrofeu } from '../../icones'
import Onboarding, { naoVisto, Palco, useTique, type Passo } from '../onboarding/Onboarding'

const CHAVE = 'forca-tutorial-coach-visto'
export const tutorialCoachNaoVisto = () => naoVisto(CHAVE)

const Pilula = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold ${className}`}>{children}</span>
)

function Numeros() {
  const kpis: [number, string, string][] = [
    [12, 'Alunos ativos', 'text-white'],
    [5, 'Treinaram hoje', 'text-emerald-400'],
    [2, 'Alertas', 'text-rose-400'],
    [1, 'Vencem em 7 dias', 'text-amber-300'],
  ]
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {kpis.map(([n, rotulo, cor]) => (
        <div key={rotulo} className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
          <p className={`font-display text-3xl font-extrabold leading-none ${cor}`}><Contar n={n} /></p>
          <p className="mt-1 text-[13px] leading-tight text-slate-300">{rotulo}</p>
        </div>
      ))}
    </div>
  )
}

// Abas que trocam sozinhas, como no app (a bolha desliza até a aba da vez).
function Abas({ nomes, id }: { nomes: string[]; id: string }) {
  const at = useTique(1600) % nomes.length
  return (
    <div className="flex gap-1 rounded-xl bg-slate-800 p-1">
      {nomes.map((n, k) => (
        <span key={n} className={`relative flex-1 rounded-lg px-2 py-2 text-center text-[13px] font-semibold ${k === at ? 'text-white' : 'text-slate-400'}`}>
          {k === at && <m.span layoutId={id} transition={agil} className="absolute inset-0 rounded-lg bg-marca-500" />}
          <span className="relative">{n}</span>
        </span>
      ))}
    </div>
  )
}

function NovoAluno() {
  return (
    <div className="space-y-3">
      <Pilula className="w-full border-marca-400 bg-marca-500 py-3 text-base text-white"><IcMais className="size-5" /> Novo aluno</Pilula>
      <Abas id="tut-novo" nomes={['Usa o app', 'Presencial (sem app)']} />
      <div className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10">
        <span className="truncate text-slate-200">Ana · Aguardando aprovação</span>
        <Pilula className="shrink-0 border-marca-400 bg-marca-500 py-1.5 text-white">Liberar</Pilula>
      </div>
    </div>
  )
}

function Acesso() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-white">Ana Souza</span>
          <span className="rounded-full bg-emerald-900/60 px-2 py-0.5 text-xs font-semibold text-emerald-300">Ativo</span>
        </div>
        <p className="mt-1 text-xs text-slate-400">Pago até 05/12</p>
        <div className="mt-2.5 flex gap-2">
          <Pilula className="border-slate-500 bg-slate-700 py-1.5 text-white">Renovar</Pilula>
          <Pilula className="border-slate-600 bg-slate-800 py-1.5 text-slate-300">Bloquear</Pilula>
        </div>
      </div>
      {PIX && (
        <div className="flex items-center justify-between gap-2 rounded-xl bg-amber-950/70 px-3 py-2 text-sm ring-1 ring-amber-500/50">
          <span className="text-amber-200">Informou pagamento</span>
          <Pilula className="border-amber-400 bg-amber-500/20 py-1.5 text-amber-100">Confirmar</Pilula>
        </div>
      )}
    </div>
  )
}

function Meso() {
  const exercicios = ['Supino Reto Barra', 'Crucifixo Halter', 'Tríceps Corda']
  const n = useTique(900) % (exercicios.length + 2)
  return (
    <div className="space-y-2.5">
      <Abas id="tut-meso" nomes={['Divisão', 'Métodos', 'Progressão', 'Config']} />
      <p className="pt-1 text-xs font-bold uppercase tracking-wider text-slate-400">Treino A</p>
      {exercicios.map((e, k) => (
        <div key={e} className={`flex h-10 items-center justify-between rounded-xl bg-slate-950 px-3 text-sm ring-1 ${k === n ? 'ring-marca-400' : 'ring-white/10'}`}>
          <span className={k <= n ? 'text-white' : 'text-slate-600'}>{k + 1}. {e}</span>
          {k === n && <span className="rounded-md border border-white/25 px-1.5 text-[11px] font-bold text-slate-200">Enter</span>}
        </div>
      ))}
    </div>
  )
}

function Notificacao() {
  const mostra = useTique(2200) % 2 === 0
  return (
    <div className="space-y-3">
      <Pilula className="w-full border-slate-500 bg-slate-700 py-3 text-white">Avisar aluno: treino pronto</Pilula>
      <div className="h-16">
        <AnimatePresence>
          {mostra && (
            <m.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={suave}
              className="flex items-center gap-3 rounded-2xl bg-white/90 p-2.5 text-slate-900 shadow-lg"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-marca-500 text-white"><IcHaltere className="size-5" /></span>
              <span className="min-w-0 text-[13px] leading-tight">
                <b className="block">{marca.nomeCurto}</b>
                Seu treino novo está pronto!
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Acompanhar() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between rounded-2xl bg-rose-950/70 px-3.5 py-2.5 text-rose-100 ring-1 ring-rose-500/50">
        <span className="font-semibold"><span className="font-display text-2xl font-bold text-rose-300">2</span> alertas</span>
        <IcSino className="size-5" />
      </div>
      <ul className="space-y-1.5 text-sm">
        {['Reps abaixo da meta · Supino', 'Treino acima do tempo · Treino B', 'Sumido há 8 dias · João'].map((t, k) => (
          <m.li key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + k * 0.1 }} className="rounded-xl bg-white/5 px-3 py-2 text-slate-200 ring-1 ring-white/10">
            {t}
          </m.li>
        ))}
      </ul>
    </div>
  )
}

function Presencial() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10"><span className="size-2 rounded-full bg-amber-400" /><span className="leading-tight"><span className="block text-[11px] uppercase tracking-wider text-slate-400">Presencial</span><span className="text-sm font-semibold text-white">Ana Souza</span></span></div>
      <div className="flex items-center gap-2 rounded-xl bg-slate-800/80 py-1.5 pl-3 pr-2 text-sm">
        <span className="w-6 font-bold text-slate-300">S1</span>
        <span className="flex h-9 w-20 items-center justify-center rounded-lg bg-slate-950 font-semibold ring-2 ring-marca-400">50</span>
        <span className="text-slate-500">kg</span>
        <span className="flex h-9 w-12 items-center justify-center rounded-lg bg-slate-950 font-semibold">8</span>
        <span className="text-slate-500">reps</span>
      </div>
      <div className="flex gap-2">
        <Pilula className="flex-1 border-slate-500 bg-slate-700 text-white">Editar</Pilula>
        <Pilula className="flex-1 border-slate-600 bg-slate-800 text-white"><IcMais className="size-4" /> Exercício</Pilula>
      </div>
    </div>
  )
}

function Relatorio() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-2xl border border-marca-500/60 bg-marca-900/40 p-3">
        <p className="text-sm font-semibold text-white">Relatórios para revisar <span className="font-display text-marca-300">1</span></p>
        <p className="mt-1.5 inline-block rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-200 ring-1 ring-white/20">Ana Souza · Meso 3</p>
      </div>
      <div className="flex gap-2">
        <Pilula className="flex-1 border-marca-400 bg-marca-500 text-white">Liberar para o aluno</Pilula>
        <Pilula className="flex-1 border-slate-500 bg-slate-700 text-white">Baixar PDF</Pilula>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-sm text-slate-300"><IcTrofeu className="size-4 text-amber-300" /> Ranking: quem mais evoluiu</div>
    </div>
  )
}

const passos = (nome: string): Passo[] => [
  {
    rotulo: nome ? `Oi, ${nome}!` : 'Boas-vindas',
    titulo: `Seu painel ${marca.doNome}`,
    texto: 'Aqui você cadastra alunos, monta os treinos e acompanha tudo. Em 1 minuto você vê o caminho.',
    ilustracao: <Palco><Numeros /></Palco>,
  },
  {
    rotulo: 'Passo 1',
    titulo: 'Cadastre seus alunos',
    texto: 'Toque em "Novo aluno". Quem usa o app recebe um e-mail para criar a senha. Quem se cadastra sozinho aparece em "Aguardando aprovação": toque em Liberar.',
    ilustracao: <Palco><NovoAluno /></Palco>,
  },
  {
    rotulo: 'Passo 2',
    titulo: 'Acesso e pagamento',
    texto: PIX
      ? 'O acesso vale até a data de "Pago até" e mais 7 dias de tolerância; depois, trava sozinho. Quando o aluno avisar que pagou no Pix, toque em "Confirmar pagamento": o acesso ganha +1 mês.'
      : 'O acesso vale até a data de "Pago até" e mais 7 dias de tolerância; depois, trava sozinho. Use Renovar para estender ou Bloquear para pausar.',
    ilustracao: <Palco><Acesso /></Palco>,
  },
  {
    rotulo: 'Passo 3',
    titulo: 'Monte o mesociclo',
    texto: 'No aluno, toque em "Novo mesociclo" (ou "Importar da planilha"). Digite o exercício e aperte Enter para ir ao próximo. "Copiar de…" repete um treino inteiro.',
    ilustracao: <Palco><Meso /></Palco>,
  },
  {
    rotulo: 'Passo 4',
    titulo: 'Avise que o treino está pronto',
    texto: 'Salve e toque em "Avisar aluno: treino pronto". O aluno recebe uma notificação no celular.',
    ilustracao: <Palco><Notificacao /></Palco>,
  },
  {
    rotulo: 'Passo 5',
    titulo: 'Acompanhe sem esforço',
    texto: 'O Início mostra quem treinou hoje, quem sumiu e quem vence. Em Alertas: reps abaixo da meta e treinos longos. Em "Ver semanas", o feito contra o prescrito.',
    ilustracao: <Palco><Acompanhar /></Palco>,
  },
  {
    rotulo: 'Passo 6',
    titulo: 'Treino presencial',
    texto: 'Treinando junto? Toque em "Treino presencial" no aluno. Você anota as cargas no seu celular e pode mudar o treino do dia.',
    ilustracao: <Palco><Presencial /></Palco>,
  },
  {
    rotulo: 'Passo 7',
    titulo: 'Relatório do fim do ciclo',
    texto: 'Quando o ciclo acaba, o relatório aparece no Início. Escreva um recado, libere para o aluno e baixe o PDF. O Ranking mostra quem mais evoluiu.',
    ilustracao: <Palco><Relatorio /></Palco>,
  },
]

export default function TutorialCoach({ nome, fechar }: { nome: string; fechar: () => void }) {
  return (
    <Onboarding
      chave={CHAVE}
      passos={passos(nome.trim().split(' ')[0])}
      atalhos={[
        { Icone: IcMais, texto: 'Cadastrar um aluno', href: '#/alunos/novo' },
        { Icone: IcGrupo, texto: 'Ver meus alunos', href: '#/alunos' },
        { Icone: IcSino, texto: 'Ver alertas', href: '#/alertas' },
      ]}
      fechar={fechar}
    />
  )
}
