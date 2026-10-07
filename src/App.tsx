import { useEffect, useRef, useState, type ReactNode } from 'react'
import { aceitouPrivacidade } from './lib/privacidade'
import { faltaSegundoFator, liberado, type Usuario } from './lib/acesso'
import { auth } from './lib/firebase'
import { sair } from './lib/acoes'
import { useUsuarioAtual } from './lib/hooks'
import { etapaCarregando, telaPronta } from './lib/log'
import { useInatividade } from './lib/inatividade'
import { casar, useRota } from './rota'
import { Abertura, Aviso, Botao, Centro, Tela } from './ui'
import Logo from '@marca/Logo'
import Entrar from './features/auth/Entrar'
import Inicio from './features/coach/inicio/Inicio'
import Alertas from './features/coach/alertas/Alertas'
import NovoAluno from './features/coach/alunos/NovoAluno'
import Alunos from './features/coach/alunos/Alunos'
import MesosDoAluno from './features/coach/meso/MesosDoAluno'
import EditorMeso from './features/coach/meso/EditorMeso'
import VisaoSemana from './features/coach/semana/VisaoSemana'
import RankingAlunos from './features/coach/RankingAlunos'
import { PresencialHoje, PresencialTreino } from './features/coach/presencial/Presencial'
import { EvolucaoCoach } from './features/evolucao/PainelEvolucao'
import AlunoApp from './features/aluno/AlunoApp'
import Instalar from './features/instalar/Instalar'
import GuiaMetodos from './features/metodos/GuiaMetodos'
import MinhaConta from './features/conta/MinhaConta'
import Politica from './features/privacidade/Politica'
import Aceite from './features/privacidade/Aceite'
import marca from '@marca/marca.json'

// /instalar e /privacidade são públicas (link enviado pelo WhatsApp): não depende de login.
export default function App() {
  if (location.pathname === '/privacidade') return <Tela chave="privacidade"><Politica /></Tela>
  return location.pathname === '/instalar' ? <Tela chave="instalar"><Instalar /></Tela> : <Principal />
}

function Principal() {
  const { user, perfil, carregando } = useUsuarioAtual()
  let estagio = 'app'
  let tela: ReactNode
  if (carregando) [estagio, tela] = ['abertura', <Abertura />]
  else if (!user) [estagio, tela] = ['entrar', <Entrar />]
  else if (!perfil) [estagio, tela] = ['abertura', <Abertura texto="Preparando sua conta…" />]
  else if (perfil.papel === 'coach') tela = <Coach uid={user.uid} email={perfil.email} />
  else if (!liberado(perfil, new Date())) [estagio, tela] = ['sem-acesso', <SemAcesso perfil={perfil} />]
  else if (!aceitouPrivacidade(perfil)) [estagio, tela] = ['privacidade', <Aceite uid={user.uid} />]
  else tela = <AlunoApp uid={user.uid} nome={perfil.nome} />
  useEffect(() => {
    if (estagio === 'abertura') etapaCarregando(carregando && !user ? 'auth' : 'perfil')
    else telaPronta()
  }, [estagio, carregando, user])
  return (
    <>
      {user && perfil && <Vigia papel={perfil.papel === 'coach' ? 'coach' : 'aluno'} />}
      <Tela chave={estagio}>{tela}</Tela>
    </>
  )
}

// Desconecta por inatividade; avisa se há cargas esperando internet.
function Vigia({ papel }: { papel: 'coach' | 'aluno' }) {
  const aviso = useInatividade(papel)
  return aviso ? (
    <div role="alert" className="fixed inset-x-0 top-0 z-50 bg-amber-950 px-4 pb-2 pt-[calc(0.5rem+env(safe-area-inset-top))] text-center text-sm text-amber-200">
      Conecte-se à internet para salvar suas cargas antes de sair.
    </div>
  ) : null
}

// Links do topo: não cortam; se não couberem, rolam para o lado com degradê na borda direita.
function MenuRolavel() {
  const ref = useRef<HTMLElement>(null)
  const [mais, setMais] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ver = () => setMais(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    ver()
    el.addEventListener('scroll', ver, { passive: true })
    const ro = new ResizeObserver(ver)
    ro.observe(el)
    return () => (el.removeEventListener('scroll', ver), ro.disconnect())
  }, [])
  return (
    <div className="relative min-w-0 flex-1">
      <nav
        ref={ref}
        className="-m-1 flex gap-3 overflow-x-auto p-1 sm:gap-4 text-sm text-slate-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>:first-child]:ml-auto [&>a]:shrink-0 [&>a]:whitespace-nowrap [&>a]:py-2"
      >
        <a href="#/" className="hover:text-marca-400">Início</a>
        <a href="#/alertas" className="hover:text-marca-400">Alertas</a>
        <a href="#/alunos" className="hover:text-marca-400">Alunos</a>
        <a href="#/metodos" className="hover:text-marca-400">Métodos</a>
        <a href="#/conta" aria-label="Minha conta" title="Minha conta" className="hover:text-marca-400">
          <svg viewBox="0 0 24 24" className="size-5 sm:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <span className="hidden sm:inline">Minha conta</span>
        </a>
      </nav>
      {mais && <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-marca-900" />}
    </div>
  )
}

function Coach({ uid, email }: { uid: string; email: string }) {
  const rota = useRota()
  const [semFator, setSemFator] = useState(false)
  useEffect(() => {
    // O token vale até o próximo login: quem acabou de ativar o 2º fator precisa sair e entrar de novo.
    auth.currentUser?.getIdTokenResult().then((t) => setSemFator(faltaSegundoFator(t.claims))).catch(() => {})
  }, [uid])
  let p: Record<string, string> | null
  let tela = <Inicio />
  if (rota === '/alertas') tela = <Alertas />
  else if (rota === '/alunos') tela = <Alunos />
  else if (rota === '/alunos/novo') tela = <NovoAluno />
  else if ((p = casar('/aluno/:uid', rota))) tela = <MesosDoAluno key={p.uid} uid={p.uid} />
  else if ((p = casar('/aluno/:uid/evolucao', rota))) tela = <EvolucaoCoach key={p.uid} uid={p.uid} />
  else if ((p = casar('/aluno/:uid/presencial', rota))) tela = <PresencialHoje key={p.uid} uid={p.uid} />
  else if ((p = casar('/aluno/:uid/presencial/treino/:mesoId/:semana/:treino', rota)))
    tela = <PresencialTreino key={`${p.uid}${p.mesoId}${p.semana}${p.treino}`} uid={p.uid} mesoId={p.mesoId} semana={Number(p.semana)} treino={Number(p.treino)} />
  else if (rota === '/ranking') tela = <RankingAlunos />
  else if ((p = casar('/meso/:id', rota))) tela = <EditorMeso id={p.id} />
  else if ((p = casar('/meso/:id/semana/:n', rota))) tela = <VisaoSemana id={p.id} semana={Number(p.n)} />
  else if (rota === '/metodos') tela = <GuiaMetodos />
  else if (rota === '/conta') tela = <MinhaConta uid={uid} email={email} />
  return (
    <>
      <header className="border-b border-slate-800 bg-marca-900 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="#/" className="shrink-0 text-white" aria-label={marca.nome}>
            <Logo className="h-5" />
          </a>
          <MenuRolavel />
          <Botao className="shrink-0" onClick={sair}>Sair</Botao>
        </div>
      </header>
      {semFator && (
        <div className="mx-auto max-w-6xl px-4 pt-3">
          <Aviso>
            Por segurança, o painel exige a verificação em 2 etapas. Ative em Minha conta (se ainda não ativou) e depois
            saia e entre de novo com o código.
          </Aviso>
        </div>
      )}
      <Tela chave={rota}>{tela}</Tela>
    </>
  )
}

function SemAcesso({ perfil }: { perfil: Usuario }) {
  const aguardando = perfil.status === 'aguardando'
  return (
    <Centro>
      <h1 className="text-2xl font-bold">{aguardando ? 'Cadastro recebido!' : 'Acesso pausado'}</h1>
      <p className="text-slate-400">
        {aguardando
          ? 'Seu coach vai liberar seu acesso em breve.'
          : 'Seu acesso está pausado. Fale com seu coach para reativar.'}
      </p>
      <Botao onClick={sair}>Sair</Botao>
    </Centro>
  )
}
