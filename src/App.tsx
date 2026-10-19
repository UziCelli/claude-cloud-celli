import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { aceitouPrivacidade } from './lib/privacidade'
import { faltaSegundoFator, liberado, type Usuario } from './lib/acesso'
import { collection, query, where } from 'firebase/firestore'
import { auth, db } from './lib/firebase'
import { consultaRegistrosRecentes, sair } from './lib/acoes'
import { useLista, useUsuarioAtual } from './lib/hooks'
import { inicioJanela, type AlunoComId } from './lib/resumo'
import type { MesoSalvo } from './lib/conversores'
import { calcularAlertas, useArquivados, type Reg } from './features/coach/alertas/Alertas'
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
import Grupo from './features/coach/presencial/Presencial'
import RelatorioCoach from './features/relatorio/RelatorioCoach'
import { EvolucaoCoach } from './features/evolucao/PainelEvolucao'
import AlunoApp from './features/aluno/AlunoApp'
import Instalar from './features/instalar/Instalar'
import GuiaMetodos from './features/metodos/GuiaMetodos'
import MinhaConta from './features/conta/MinhaConta'
import Politica from './features/privacidade/Politica'
import PagarPix, { PIX } from './features/aluno/PagarPix'
import Aceite from './features/privacidade/Aceite'
import marca from '@marca/marca.json'
import { IcCasa, IcGrupo, IcLivro, IcPessoa, IcSair, IcSino, IcTrofeu } from './icones'
import { BarraAbas, Bolha, Brilho } from './vidro'

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
  else if (!liberado(perfil, new Date())) [estagio, tela] = ['sem-acesso', <SemAcesso uid={user.uid} perfil={perfil} />]
  else if (!aceitouPrivacidade(perfil)) [estagio, tela] = ['privacidade', <Aceite uid={user.uid} />]
  else tela = <AlunoApp uid={user.uid} perfil={perfil} />
  useEffect(() => {
    if (estagio === 'abertura') etapaCarregando(carregando && !user ? 'auth' : 'perfil')
    else telaPronta()
  }, [estagio, carregando, user])
  // Aluno aberto além do vencimento: força nova avaliação em pagoAte, senão ele ainda vê o treino e o servidor recusa as gravações.
  const venceEm = perfil?.papel === 'coach' ? 0 : perfil?.pagoAte?.toMillis() ?? 0
  const [tique, atualizar] = useState(0)
  useEffect(() => {
    const falta = venceEm - Date.now()
    if (falta <= 0) return
    const t = setTimeout(() => atualizar((n) => n + 1), Math.min(falta, 2 ** 31 - 1))
    return () => clearTimeout(t)
  }, [venceEm, tique])
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
  // Mesmas 4 consultas do Início (com os arquivados): o Firestore junta as iguais (sem leitura extra). Menu não existe no presencial.
  const alunos = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const mesos = useLista<MesoSalvo & { id: string }>(useMemo(() => query(collection(db, 'mesos')), []))
  const agora = new Date()
  const chave = inicioJanela(agora, 14)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registros = useLista<Reg>(useMemo(() => consultaRegistrosRecentes(agora), [chave]))
  const arquivados = useArquivados()
  const selo = calcularAlertas(alunos.dados as AlunoComId[], mesos.dados, registros.dados, agora, arquivados.chaves).total
  const itens = [
    { id: 'inicio', rotulo: 'Início', href: '#/', Icone: IcCasa },
    { id: 'alunos', rotulo: 'Alunos', href: '#/alunos', Icone: IcGrupo },
    { id: 'alertas', rotulo: 'Alertas', href: '#/alertas', Icone: IcSino, selo },
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
          {itens.map(({ id, rotulo, href, Icone, selo }) => (
            <a
              key={id}
              href={href}
              aria-current={at === id ? 'page' : undefined}
              className={`relative flex h-12 items-center gap-3 rounded-2xl px-4 text-base font-semibold ${at === id ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              {at === id && <Bolha id="bolha-lateral" className="rounded-2xl" />}
              <Icone className={`size-5 ${at === id ? 'text-marca-400' : ''}`} /> <span className="flex-1">{rotulo}</span>
              {selo ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white">{selo}</span> : null}
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
          .map((i) => ({ rotulo: i.id === 'conta' ? 'Conta' : i.rotulo, href: i.href, Icone: i.Icone, ativo: at === i.id, selo: i.selo }))}
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
  // Treino presencial: sem menu nem logo (a barra do presencial cobre a área segura); o Grupo fica montado entre as telas.
  const presencial = rota.startsWith('/aluno/') && rota.includes('/presencial')
  let p: Record<string, string> | null
  let tela = <Inicio nome={nome} />
  if (presencial) tela = <Grupo rota={rota} />
  else if (rota === '/alertas') tela = <Alertas />
  else if (rota === '/alunos') tela = <Alunos />
  else if (rota === '/alunos/novo') tela = <NovoAluno />
  else if ((p = casar('/aluno/:uid', rota))) tela = <MesosDoAluno key={p.uid} uid={p.uid} />
  else if ((p = casar('/aluno/:uid/evolucao', rota))) tela = <EvolucaoCoach key={p.uid} uid={p.uid} />
  else if (rota === '/ranking') tela = <RankingAlunos />
  else if ((p = casar('/meso/:id', rota))) tela = <EditorMeso id={p.id} />
  else if ((p = casar('/meso/:id/relatorio', rota))) tela = <RelatorioCoach key={p.id} mesoId={p.id} />
  else if ((p = casar('/meso/:id/semana/:n', rota))) tela = <VisaoSemana id={p.id} semana={Number(p.n)} />
  else if (rota === '/metodos') tela = <GuiaMetodos />
  else if (rota === '/conta') tela = <MinhaConta uid={uid} email={email} />
  return (
    <div className="lg:flex">
      <Brilho />
      {!presencial && <Menu rota={rota} />}
      <div className={`min-w-0 flex-1 min-h-lvh ${presencial ? '' : 'pb-barra lg:pb-0'}`}>
        <header hidden={presencial} className="pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-topo lg:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-3">
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
        <Tela chave={presencial ? 'presencial' : rota} abrir={/^\/(aluno|meso)\/|^\/alunos\/novo/.test(rota)}>{tela}</Tela>
      </div>
    </div>
  )
}

function SemAcesso({ uid, perfil }: { uid: string; perfil: Usuario }) {
  const aguardando = perfil.status === 'aguardando'
  const vencido = perfil.status === 'ativo' && !!PIX
  return (
    <Centro>
      <h1 className="text-2xl font-bold">{aguardando ? 'Cadastro recebido!' : 'Acesso pausado'}</h1>
      <p className="text-slate-400">
        {aguardando
          ? 'Seu coach vai liberar seu acesso em breve.'
          : 'Seu acesso está pausado. Fale com seu coach para reativar.'}
      </p>
      {vencido && <PagarPix uid={uid} perfil={perfil} />}
      <Botao onClick={sair}>Sair</Botao>
    </Centro>
  )
}
