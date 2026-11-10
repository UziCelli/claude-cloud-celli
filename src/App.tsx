import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { aceitouPrivacidade } from './lib/privacidade'
import { faltaSegundoFator, liberado, type Usuario } from './lib/acesso'
import { collection, doc, getDocFromServer, query, where } from 'firebase/firestore'
import { auth, db } from './lib/firebase'
import { consultaRegistrosRecentes, pedirAcesso, temTotp } from './lib/acoes'
import { CaixaAceite } from './features/privacidade/Politica'
import { useLista, useUsuarioAtual } from './lib/hooks'
import { inscreverAvisos } from './lib/push'
import { inicioJanela, type AlunoComId } from './lib/resumo'
import type { MesoSalvo } from './lib/conversores'
import { calcularAlertas, useArquivados, type Reg } from './features/coach/alertas/Alertas'
import { etapaCarregando, telaPronta } from './lib/log'
import { useInatividade } from './lib/inatividade'
import { casar, useRota } from './rota'
import { emLinkCadastro } from './lib/cadastro'
import { Abertura, Aviso, Botao, Centro, Tela } from './ui'
import Logo from '@marca/Logo'
import Entrar from './features/auth/Entrar'
import BotaoSair, { useSair } from './features/auth/BotaoSair'
import Inicio from './features/coach/inicio/Inicio'
import Alertas from './features/coach/alertas/Alertas'
import NovoAluno from './features/coach/alunos/NovoAluno'
import Alunos from './features/coach/alunos/Alunos'
import MesosDoAluno from './features/coach/meso/MesosDoAluno'
import EditorMeso from './features/coach/meso/EditorMeso'
import VisaoSemana from './features/coach/semana/VisaoSemana'
import RankingAlunos from './features/coach/RankingAlunos'
import Feedbacks from './features/coach/feedbacks/Feedbacks'
import Grupo from './features/coach/presencial/Presencial'
import RelatorioCoach from './features/relatorio/RelatorioCoach'
import AvaliacoesCoach from './features/avaliacao/AvaliacoesCoach'
import AvaliacaoCoach from './features/avaliacao/AvaliacaoCoach'
import AnamneseCoach from './features/anamnese/AnamneseCoach'
import { EvolucaoCoach } from './features/evolucao/PainelEvolucao'
import AlunoApp from './features/aluno/AlunoApp'
import TutorialCoach, { tutorialCoachNaoVisto } from './features/coach/TutorialCoach'
import { AnimatePresence } from 'motion/react'
import Instalar from './features/instalar/Instalar'
import GuiaMetodos from './features/metodos/GuiaMetodos'
import MinhaConta from './features/conta/MinhaConta'
import AcaoEmail from './features/auth/AcaoEmail'
import Politica from './features/privacidade/Politica'
import PagarPix, { PIX } from './features/aluno/PagarPix'
import Aceite from './features/privacidade/Aceite'
import marca from '@marca/marca.json'
import { IcBalao, IcCasa, IcGrupo, IcLivro, IcPessoa, IcSair, IcSino, IcTrofeu } from './icones'
import { BarraAbas, Bolha, Brilho } from './vidro'

// /instalar, /privacidade e /acao (links dos e-mails do Firebase) são públicas (link enviado pelo WhatsApp): não depende de login.
export default function App() {
  if (location.pathname === '/acao') return <Tela chave="acao"><AcaoEmail /></Tela>
  if (location.pathname === '/privacidade') return <Tela chave="privacidade"><Politica /></Tela>
  return location.pathname === '/instalar' ? <Tela chave="instalar"><Instalar /></Tela> : <Principal />
}

function Principal() {
  const { user, perfil, carregando } = useUsuarioAtual()
  const [adiouAceite, setAdiouAceite] = useState(false) // sem internet no aceite: vale até fechar o app
  let estagio = 'app'
  let tela: ReactNode
  if (carregando) [estagio, tela] = ['abertura', <Abertura />]
  else if (!user) [estagio, tela] = ['entrar', <Entrar />]
  else if (!perfil) [estagio, tela] = ['abertura', <PerfilDemora />]
  else if (perfil.papel === 'coach') tela = <Coach uid={user.uid} email={perfil.email} nome={perfil.nome} />
  else if (!liberado(perfil, new Date())) [estagio, tela] = ['sem-acesso', <SemAcesso uid={user.uid} perfil={perfil} />]
  else if (!aceitouPrivacidade(perfil) && !adiouAceite)
    [estagio, tela] = ['privacidade', <Aceite uid={user.uid} adiar={perfil.privacidadeVersao ? () => setAdiouAceite(true) : undefined} />]
  else tela = <AlunoApp uid={user.uid} perfil={perfil} />
  // Cadastro pelo QR Code concluído (ou aluno já logado que abriu o link): tira /cadastro do endereço.
  useEffect(() => {
    if (user && emLinkCadastro()) history.replaceState(history.state, '', '/' + location.hash)
  }, [user])
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

// Perfil que não chega: depois de 10 s confere no servidor. Existe: segue esperando.
// Não existe: deixa pedir acesso. Erro (offline/negado): oferece tentar de novo ou sair.
function PerfilDemora() {
  const [saindo, sairAgora] = useSair()
  const [demora, setDemora] = useState(false)
  const [estado, setEstado] = useState<'conferindo' | 'existe' | 'falta' | 'erro'>('conferindo')
  const [tentativa, setTentativa] = useState(0)
  const [nome, setNome] = useState(auth.currentUser?.displayName?.slice(0, 80) ?? '')
  const [aceito, setAceito] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setDemora(true), 10_000)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const u = auth.currentUser
    if (!demora || !u) return
    setEstado('conferindo')
    getDocFromServer(doc(db, 'usuarios', u.uid)).then((d) => setEstado(d.exists() ? 'existe' : 'falta'), () => setEstado('erro'))
  }, [demora, tentativa])
  const pode = estado === 'falta' && !!auth.currentUser?.email && !temTotp()
  function pedir() {
    setErro('')
    setEnviando(true)
    pedirAcesso(nome.trim()).catch((e) => {
      setEnviando(false)
      setErro(
        e?.message === 'ja-existe' ? 'Sua conta já existe. Feche e abra o app.'
        : e?.code === 'unavailable' || e?.code === 'failed-precondition' || e?.code === 'aborted' || !navigator.onLine ? 'Sem internet. Conecte-se e tente de novo.'
        : 'Não deu para pedir acesso. Fale com seu coach.',
      )
    })
  }
  return (
    <Abertura texto="Preparando sua conta…">
      {demora && (
        <div className="max-w-xs space-y-3 text-center text-sm text-slate-300">
          {pode ? (
            <>
              <p>Não encontramos seu cadastro. Peça acesso ao seu coach.</p>
              <input
                aria-label="Seu nome"
                placeholder="Seu nome"
                maxLength={80}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="h-14 w-full rounded-2xl bg-white/10 px-4 text-base text-white"
              />
              <CaixaAceite marcada={aceito} onChange={setAceito} />
              {erro && <Aviso>{erro}</Aviso>}
              <Botao disabled={enviando || !aceito || !nome.trim()} onClick={pedir}>{enviando ? 'Enviando…' : 'Pedir acesso'}</Botao>
            </>
          ) : (
            <p>Não conseguimos abrir sua conta. Confira a internet ou fale com seu coach.</p>
          )}
          {estado === 'erro' && <Botao onClick={() => setTentativa((n) => n + 1)}>Tentar de novo</Botao>}
          <Botao disabled={saindo} onClick={sairAgora}>{saindo ? 'Saindo…' : 'Sair'}</Botao>
        </div>
      )}
    </Abertura>
  )
}

// Desconecta por inatividade; avisa se há cargas esperando internet.
function Vigia({ papel }: { papel: 'coach' | 'aluno' }) {
  const aviso = useInatividade(papel)
  return aviso ? (
    <div role="alert" className="fixed inset-x-0 top-0 z-50 bg-amber-950 px-4 pb-2 pt-topo text-center text-sm text-amber-200">
      Conecte-se à internet para salvar suas cargas antes de sair.
    </div>
  ) : null
}

const ativaAba = (rota: string) =>
  rota === '/alertas' || rota === '/ranking' || rota === '/feedbacks' || rota === '/metodos' || rota === '/conta' ? rota.slice(1)
  : rota === '/alunos' || rota.startsWith('/alunos/') || rota.startsWith('/aluno/') || rota.startsWith('/meso/') ? 'alunos'
  : 'inicio' // '/' e rotas desconhecidas (a tela padrão é o Início)

// Menu do coach: abas embaixo no celular, menu lateral fixo no computador (≥ lg).
function Menu({ rota }: { rota: string }) {
  const [saindo, sairAgora] = useSair()
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
    { id: 'feedbacks', rotulo: 'Feedbacks', href: '#/feedbacks', Icone: IcBalao },
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
        <button disabled={saindo} onClick={sairAgora} className="flex h-12 items-center gap-3 px-4 text-base font-semibold text-slate-400 hover:text-white disabled:opacity-50">
          <IcSair className="size-5" /> {saindo ? 'Saindo…' : 'Sair'}
        </button>
      </aside>
      <BarraAbas
        className="lg:hidden"
        abas={itens
          .filter((i) => i.id !== 'ranking' && i.id !== 'feedbacks')
          .map((i) => ({ rotulo: i.id === 'conta' ? 'Conta' : i.rotulo, href: i.href, Icone: i.Icone, ativo: (at === 'ranking' || at === 'feedbacks' ? 'inicio' : at) === i.id, selo: i.selo }))}
      />
    </>
  )
}

function Coach({ uid, email, nome }: { uid: string; email: string; nome: string }) {
  const rota = useRota()
  const [semFator, setSemFator] = useState(false)
  const [tutorial, setTutorial] = useState(tutorialCoachNaoVisto)
  useEffect(() => {
    // O token vale até o próximo login: quem acabou de ativar o 2º fator precisa sair e entrar de novo.
    auth.currentUser?.getIdTokenResult().then((t) => setSemFator(faltaSegundoFator(t.claims))).catch(() => {})
  }, [uid])
  // Treino presencial: sem menu nem logo (a barra do presencial cobre a área segura); o Grupo fica montado entre as telas.
  useEffect(() => {
    void inscreverAvisos(true) // avisos dos alunos (concluiu, anotou, "Já paguei"); só faz algo com a permissão já dada
  }, [uid])
  const presencial = rota.startsWith('/aluno/') && rota.includes('/presencial')
  let p: Record<string, string> | null
  let tela = <Inicio nome={nome} />
  if (presencial) tela = <Grupo rota={rota} />
  else if (rota === '/alertas') tela = <Alertas />
  else if (rota === '/alunos') tela = <Alunos />
  else if (rota === '/alunos/novo') tela = <NovoAluno />
  else if ((p = casar('/aluno/:uid', rota))) tela = <MesosDoAluno key={p.uid} uid={p.uid} />
  else if ((p = casar('/aluno/:uid/evolucao', rota))) tela = <EvolucaoCoach key={p.uid} uid={p.uid} />
  else if ((p = casar('/aluno/:uid/avaliacoes', rota))) tela = <AvaliacoesCoach key={p.uid} uid={p.uid} />
  else if ((p = casar('/aluno/:uid/avaliacao/:id', rota))) tela = <AvaliacaoCoach key={p.uid} uid={p.uid} id={p.id} />
  else if ((p = casar('/aluno/:uid/anamnese', rota))) tela = <AnamneseCoach key={p.uid} uid={p.uid} />
  else if (rota === '/ranking') tela = <RankingAlunos />
  else if (rota === '/feedbacks') tela = <Feedbacks />
  else if ((p = casar('/meso/:id', rota))) tela = <EditorMeso id={p.id} />
  else if ((p = casar('/meso/:id/relatorio', rota))) tela = <RelatorioCoach key={p.id} mesoId={p.id} />
  else if ((p = casar('/meso/:id/semana/:n', rota))) tela = <VisaoSemana id={p.id} semana={Number(p.n) || 1} />
  else if (rota === '/metodos') tela = <GuiaMetodos />
  else if (rota === '/conta') tela = <MinhaConta uid={uid} email={email} abrirTutorial={() => setTutorial(true)} />
  return (
    <div className="lg:flex">
      <Brilho />
      <AnimatePresence>{tutorial && <TutorialCoach nome={nome} fechar={() => setTutorial(false)} />}</AnimatePresence>
      {!presencial && <Menu rota={rota} />}
      <div className={`min-w-0 flex-1 min-h-lvh ${presencial ? '' : 'pb-barra lg:pb-0'}`}>
        <header hidden={presencial} className="pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-topo lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-3">
            <a href="#/" className="inline-block text-white" aria-label={marca.nome}>
              <Logo className="h-5" />
            </a>
            <BotaoSair />
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
  const [saindo, sairAgora] = useSair()
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
      <Botao disabled={saindo} onClick={sairAgora}>{saindo ? 'Saindo…' : 'Sair'}</Botao>
    </Centro>
  )
}
