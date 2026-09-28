import { liberado, type Usuario } from './lib/acesso'
import { sair } from './lib/acoes'
import { useUsuarioAtual } from './lib/hooks'
import { casar, useRota } from './rota'
import { Botao, Centro } from './ui'
import Entrar from './features/auth/Entrar'
import Alunos from './features/coach/alunos/Alunos'
import MesosDoAluno from './features/coach/meso/MesosDoAluno'
import EditorMeso from './features/coach/meso/EditorMeso'
import VisaoSemana from './features/coach/semana/VisaoSemana'
import AlunoApp from './features/aluno/AlunoApp'
import Instalar from './features/instalar/Instalar'

// /instalar é pública (link enviado pelo WhatsApp): não depende de login.
export default function App() {
  return location.pathname === '/instalar' ? <Instalar /> : <Principal />
}

function Principal() {
  const { user, perfil, carregando } = useUsuarioAtual()
  if (carregando) return <Centro>Carregando…</Centro>
  if (!user) return <Entrar />
  if (!perfil) return <Centro>Preparando sua conta…</Centro>
  if (perfil.papel === 'coach') return <Coach nome={perfil.nome} />
  if (!liberado(perfil, new Date())) return <SemAcesso perfil={perfil} />
  return <AlunoApp uid={user.uid} nome={perfil.nome} />
}

function Coach({ nome }: { nome: string }) {
  const rota = useRota()
  let p: Record<string, string> | null
  let tela = <Alunos />
  if ((p = casar('/aluno/:uid', rota))) tela = <MesosDoAluno uid={p.uid} />
  else if ((p = casar('/meso/:id', rota))) tela = <EditorMeso id={p.id} />
  else if ((p = casar('/meso/:id/semana/:n', rota))) tela = <VisaoSemana id={p.id} semana={Number(p.n)} />
  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#/" className="text-lg font-bold">
            Força <span className="text-orange-500">coach</span>
          </a>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            {nome}
            <Botao onClick={sair}>Sair</Botao>
          </div>
        </div>
      </header>
      {tela}
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
