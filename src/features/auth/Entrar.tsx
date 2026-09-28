import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { cadastrar, entrar } from '../../lib/acoes'
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

export default function Entrar() {
  const [cadastro, setCadastro] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

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
          <Botao tipo="primario" className="w-full" disabled={enviando}>
            {enviando ? 'Enviando…' : cadastro ? 'Criar conta' : 'Entrar'}
          </Botao>
        </form>
        <button
          type="button"
          className="mt-4 w-full text-center text-sm text-slate-400 hover:text-slate-200"
          onClick={() => {
            setErro('')
            setCadastro((c) => !c)
          }}
        >
          {cadastro ? 'Já tenho conta — Entrar' : 'Não tenho conta — Criar conta'}
        </button>
      </Cartao>
    </Centro>
  )
}
