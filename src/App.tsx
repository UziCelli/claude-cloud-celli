import { useEffect, useState, type ReactNode } from 'react'
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
import { IcCasa, IcGrupo, IcLivro, IcPessoa, IcSair, IcSino, IcTrofeu } from './icones'
import { BarraAbas, Brilho } from './vidro'

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
  else if (perfil.papel === 'coach') tela = <Coach uid={user.uid} email={perfil.email} nome={perfil.nome} />
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

const ativaAba = (rota: string) =>
  rota === '/' ? 'inicio'
  : rota === '/alertas' || rota === '/ranking' || rota === '/metodos' || rota === '/conta' ? rota.slice(1)
  : 'alunos' // /alunos, /aluno/..., /meso/...

// Menu do coach: abas embaixo no celular, menu lateral fixo no computador (≥ lg).
function Menu({ rota }: { rota: string }) {
  const at = ativaAba(rota)
  const itens = [
    { id: 'inicio', rotulo: 'Início', href: '#/', Icone: IcCasa },
    { id: 'alunos', rotulo: 'Alunos', href: '#/alunos', Icone: IcGrupo },
    { id: 'alertas', rotulo: 'Alertas', href: '#/alertas', Icone: IcSino },
    { id: 'ranking', rotulo: 'Ranking', href: '#/ranking', Icone: IcTrofeu },
    { id: 'metodos', rotulo: 'Métodos', href: '#/metodos', Icone: IcLivro },
    { id: 'conta', rotulo: 'Minha conta', href: '#/conta', Icone: IcPessoa },
  ]
  return (
    <>
      <aside className="vidro-escuro sticky top-0 hidden self-start h-dvh w-64 shrink-0 flex-col p-5 lg:flex">
        <a href="#/" className="mb-8 text-white" aria-label={marca.nome}>
          <Logo className="h-5" />
        </a>
        <nav aria-label="Menu lateral" className="flex-1 space-y-1">
          {itens.map(({ id, rotulo, href, Icone }) => (
            <a
              key={id}
              href={href}
              aria-current={at === id ? 'page' : undefined}
              className={`flex h-12 items-center gap-3 rounded-2xl px-4 text-base font-semibold ${at === id ? 'lente text-white' : 'text-slate-300 hover:text-white'}`}
            >
              <Icone className={`size-5 ${at === id ? 'text-marca-400' : ''}`} /> {rotulo}
            </a>
          ))}
        </nav>
        <button onClick={sair} className="flex h-12 items-center gap-3 px-4 text-base font-semibold text-slate-400 hover:text-white">
          <IcSair className="size-5" /> Sair
        </button>
      </aside>
      <BarraAbas
        className="lg:hidden"
        abas={itens
          .filter((i) => i.id !== 'ranking')
          .map((i) => ({ rotulo: i.id === 'conta' ? 'Conta' : i.rotulo, href: i.href, Icone: i.Icone, ativo: at === i.id }))}
      />
    </>
  )
}

function Coach({ uid, email, nome }: { uid: string; email: string; nome: string }) {
  const rota = useRota()
  const [semFator, setSemFator] = useState(false)
  useEffect(() => {
    // O token vale até o próximo login: quem acabou de ativar o 2º fator precisa sair e entrar de novo.
    auth.currentUser?.getIdTokenResult().then((t) => setSemFator(faltaSegundoFator(t.claims))).catch(() => {})
  }, [uid])
  let p: Record<string, string> | null
  let tela = <Inicio nome={nome} />
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
  // Treino presencial: sem barra, para não cobrir a tela do treino.
  const presencial = rota.startsWith('/aluno/') && rota.includes('/presencial')
  return (
    <div className="lg:flex">
      <Brilho />
      {!presencial && <Menu rota={rota} />}
      <div className={`min-w-0 flex-1 ${presencial ? '' : 'pb-barra lg:pb-0'}`}>
        <header className="pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <a href="#/" className="inline-block text-white" aria-label={marca.nome}>
              <Logo className="h-5" />
            </a>
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
      </div>
    </div>
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
