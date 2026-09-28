import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { cadastrar, entrar, recuperarSenha } from '../../lib/acoes'
import { Aviso, Botao, Campo, Cartao, Centro } from '../../ui'

const erros: Record<string, string> = {
  'auth/wrong-password': 'E-mail ou senha incorretos',
  'auth/user-not-found': 'E-mail ou senha incorretos',
  'auth/invalid-credential': 'E-mail ou senha incorretos',
  'auth/email-already-in-use': 'Já existe uma conta com esse e-mail',
  'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
  'auth/invalid-email': 'E-mail inválido',
  'auth/network-request-failed': 'Sem internet. Verifique sua conexão e tente de novo.',
}

const mensagemErro = (e: unknown) =>
  (e instanceof FirebaseError && erros[e.code]) || 'Não deu para entrar. Tente de novo.'

const mensagemRecuperar = (e: unknown) => {
  if (e instanceof FirebaseError && e.code === 'auth/invalid-email') return 'E-mail inválido'
  if (e instanceof FirebaseError && e.code === 'auth/network-request-failed')
    return 'Sem internet. Verifique sua conexão e tente de novo.'
  // user-not-found (e qualquer outro erro) mostra a mesma mensagem de sucesso, para não revelar contas.
  return ''
}

export default function Entrar() {
  const [cadastro, setCadastro] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [msgRecuperar, setMsgRecuperar] = useState('')

  async function enviar() {
    setErro('')
    setEnviando(true)
    try {
      if (cadastro) await cadastrar(nome, email, senha)
      else await entrar(email, senha)
    } catch (e) {
      setErro(mensagemErro(e))
    } finally {
      setEnviando(false)
    }
  }

  async function esqueciSenha() {
    setErro('')
    setMsgRecuperar('')
    if (!email) return setErro('Digite seu e-mail para recuperar a senha')
    try {
      await recuperarSenha(email)
      setMsgRecuperar('Enviamos um link para seu e-mail (confira o spam)')
    } catch (e) {
      const erroEspecifico = mensagemRecuperar(e)
      setMsgRecuperar(erroEspecifico ? '' : 'Enviamos um link para seu e-mail (confira o spam)')
      if (erroEspecifico) setErro(erroEspecifico)
    }
  }

  return (
    <Centro>
      <Cartao className="text-left">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Força <span className="text-orange-500">{cadastro ? 'criar conta' : 'coach'}</span>
        </h1>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            enviar()
          }}
        >
          {cadastro && <Campo rotulo="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />}
          <Campo rotulo="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Campo rotulo="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          {erro && <Aviso>{erro}</Aviso>}
          {msgRecuperar && <Aviso>{msgRecuperar}</Aviso>}
          <Botao tipo="primario" className="w-full" disabled={enviando}>
            {enviando ? 'Enviando…' : cadastro ? 'Criar conta' : 'Entrar'}
          </Botao>
        </form>
        {!cadastro && (
          <button
            type="button"
            className="mt-3 w-full text-center text-sm text-slate-400 hover:text-slate-200"
            onClick={esqueciSenha}
          >
            Esqueci minha senha
          </button>
        )}
        <button
          type="button"
          className="mt-2 w-full text-center text-sm text-slate-400 hover:text-slate-200"
          onClick={() => {
            setErro('')
            setMsgRecuperar('')
            setCadastro((c) => !c)
          }}
        >
          {cadastro ? 'Já tenho conta — Entrar' : 'Não tenho conta — Criar conta'}
        </button>
        <a href="/instalar" className="mt-4 block text-center text-xs text-slate-500 hover:text-slate-300">
          Como instalar o app
        </a>
      </Cartao>
    </Centro>
  )
}
