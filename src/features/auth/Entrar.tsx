import { AnimatePresence, m } from 'motion/react'
import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { cadastrar, entrar, recuperarSenha } from '../../lib/acoes'
import { Aviso, Botao, Campo, Cartao, Centro, Msg, Painel, cascata, item } from '../../ui'
import Logo from '../../Logo'

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
  const [tremor, setTremor] = useState(0)
  const falhou = (msg: string) => {
    setErro(msg)
    setTremor((n) => n + 1)
  }

  async function enviar() {
    setErro('')
    setEnviando(true)
    try {
      if (cadastro) await cadastrar(nome, email, senha)
      else await entrar(email, senha)
    } catch (e) {
      falhou(mensagemErro(e))
    } finally {
      setEnviando(false)
    }
  }

  async function esqueciSenha() {
    setErro('')
    setMsgRecuperar('')
    if (!email) return falhou('Digite seu e-mail para recuperar a senha')
    try {
      await recuperarSenha(email)
      setMsgRecuperar('Enviamos um link para seu e-mail (confira o spam)')
    } catch (e) {
      const erroEspecifico = mensagemRecuperar(e)
      setMsgRecuperar(erroEspecifico ? '' : 'Enviamos um link para seu e-mail (confira o spam)')
      if (erroEspecifico) falhou(erroEspecifico)
    }
  }

  return (
    <Centro>
      <m.div
        variants={{ a: { x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } }, b: { x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } }, quieto: { x: 0 } }}
        animate={tremor ? (tremor % 2 ? 'a' : 'b') : 'quieto'}
      >
      <m.div variants={cascata} initial="hidden" animate="show">
      <Cartao className="text-left">
        <m.h1 variants={item} className="mb-4 flex flex-col items-center gap-3 text-center">
          <Logo className="h-10 text-white" faixa="#3F72A6" />
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={cadastro ? 'c' : 'l'}
              className="text-sm font-semibold text-slate-400"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.1 } }}
            >
              {cadastro ? 'Criar conta' : 'Área do aluno e do coach'}
            </m.span>
          </AnimatePresence>
        </m.h1>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            enviar()
          }}
        >
          <Painel aberto={cadastro} className="-mx-1 px-1">
            <Campo rotulo="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required={cadastro} />
          </Painel>
          <m.div variants={item}>
            <Campo rotulo="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </m.div>
          <m.div variants={item}>
            <Campo rotulo="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </m.div>
          <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
          <Msg>{msgRecuperar && <Aviso>{msgRecuperar}</Aviso>}</Msg>
          <m.div variants={item}>
            <Botao tipo="primario" className="w-full" disabled={enviando} carregando={enviando}>
              {enviando ? 'Enviando…' : cadastro ? 'Criar conta' : 'Entrar'}
            </Botao>
          </m.div>
        </form>
        <Painel aberto={!cadastro}>
          <button
            type="button"
            className="mt-3 w-full text-center text-sm text-slate-400 hover:text-slate-200"
            onClick={esqueciSenha}
          >
            Esqueci minha senha
          </button>
        </Painel>
        <m.button
          variants={item}
          type="button"
          className="mt-2 w-full text-center text-sm text-slate-400 hover:text-slate-200"
          onClick={() => {
            setErro('')
            setMsgRecuperar('')
            setCadastro((c) => !c)
          }}
        >
          {cadastro ? 'Já tenho conta — Entrar' : 'Não tenho conta — Criar conta'}
        </m.button>
        <a href="/instalar" className="mt-4 block text-center text-xs text-slate-500 hover:text-slate-300">
          Como instalar o app
        </a>
      </Cartao>
      </m.div>
      </m.div>
    </Centro>
  )
}
