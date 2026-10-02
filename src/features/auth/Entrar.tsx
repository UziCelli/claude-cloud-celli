import { AnimatePresence, m } from 'motion/react'
import { useEffect, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import type { MultiFactorResolver } from 'firebase/auth'
import { cadastrar, confirmarLoginTotp, entrar, recuperarSenha, resolverMfa } from '../../lib/acoes'
import { codigoCompleto, limparCodigo, mensagemMfa } from '../../lib/mfa'
import { Aviso, Botao, Campo, Cartao, Centro, Msg, Painel, cascata, item } from '../../ui'
import Logo from '../../Logo'
import { CaixaAceite } from '../privacidade/Politica'
import { registrarFalha, restanteSeg, zerarFalhas } from '../../lib/tentativas'
import { AVISO_SAIU, marcar } from '../../lib/inatividade'
import { registrarErro } from '../../lib/log'
import { atualizarNaEntrada } from '../../lib/atualizar'

const erros: Record<string, string> = {
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos ou use Esqueci minha senha.',
  'auth/email-already-in-use': 'Já existe uma conta com esse e-mail',
  'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
  'auth/invalid-email': 'E-mail inválido',
  'auth/network-request-failed': 'Sem internet. Verifique sua conexão e tente de novo.',
}

// Erro desconhecido: mostra o código e guarda no registro de erros, para dar para investigar.
const mensagemErro = (e: unknown) => {
  if (e instanceof FirebaseError && erros[e.code]) return erros[e.code]
  const code = e instanceof FirebaseError ? e.code : String(e).slice(0, 80)
  registrarErro('erro', `login: ${code}`)
  return `Não deu para entrar (${code}). Tente de novo.`
}

// Código do autenticador errado: mensagem do 2º fator (e a tela volta ao e-mail/senha se a sessão venceu).
const SESSAO_MFA_VENCIDA = 'auth/invalid-multi-factor-session'

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
  const [aceito, setAceito] = useState(false)
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [msgRecuperar, setMsgRecuperar] = useState('')
  const [tremor, setTremor] = useState(0)
  const [resolver, setResolver] = useState<MultiFactorResolver | null>(null)
  const [codigo, setCodigo] = useState('')
  const [espera, setEspera] = useState(restanteSeg)
  const [saiu] = useState(() => {
    try {
      const v = localStorage.getItem(AVISO_SAIU)
      localStorage.removeItem(AVISO_SAIU)
      return !!v
    } catch {
      return false
    }
  })
  // Aba antiga (aberta antes de publicar) se atualiza sozinha aqui, antes de alguém tentar entrar.
  useEffect(() => atualizarNaEntrada(), [])
  useEffect(() => {
    if (espera <= 0) return
    const t = setTimeout(() => setEspera(restanteSeg()), 1000)
    return () => clearTimeout(t)
  }, [espera])
  const falhou = (msg: string) => {
    setErro(msg)
    setTremor((n) => n + 1)
  }

  async function enviar() {
    if (!cadastro && restanteSeg() > 0) return setEspera(restanteSeg())
    setErro('')
    setEnviando(true)
    marcar() // quem está entrando está usando o app
    try {
      if (resolver) {
        await confirmarLoginTotp(resolver, codigo)
        zerarFalhas()
      } else if (cadastro) await cadastrar(nome, email, senha)
      else {
        await entrar(email, senha)
        zerarFalhas()
      }
    } catch (e) {
      if (e instanceof FirebaseError && e.code === 'auth/multi-factor-auth-required') {
        // Senha certa: falta o código de 6 dígitos do autenticador.
        zerarFalhas()
        setResolver(resolverMfa(e))
        setCodigo('')
        return
      }
      if (resolver) {
        const code = e instanceof FirebaseError ? e.code : undefined
        if (code === SESSAO_MFA_VENCIDA || code === 'auth/quota-exceeded') return voltar(mensagemMfa(code))
        if (code !== 'auth/network-request-failed') {
          registrarFalha()
          setEspera(restanteSeg())
        }
        setCodigo('')
        return falhou(mensagemMfa(code))
      }
      if (!cadastro && !(e instanceof FirebaseError && e.code === 'auth/network-request-failed')) {
        registrarFalha()
        setEspera(restanteSeg())
      }
      falhou(mensagemErro(e))
    } finally {
      setEnviando(false)
    }
  }

  function voltar(msg = '') {
    setResolver(null)
    setCodigo('')
    setErro(msg)
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
          {resolver ? (
            <div className="space-y-2">
              <Campo
                rotulo="Código de 6 dígitos do Google Authenticator"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                autoFocus
                value={codigo}
                onChange={(e) => setCodigo(limparCodigo(e.target.value))}
                required
              />
              <button type="button" className="text-sm text-slate-400 hover:text-slate-200" onClick={() => voltar()}>
                Voltar
              </button>
            </div>
          ) : (
            <>
              <Painel aberto={cadastro} className="-mx-1 px-1">
                <Campo rotulo="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required={cadastro} />
              </Painel>
              <m.div variants={item}>
                <Campo rotulo="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </m.div>
              <m.div variants={item}>
                <Campo rotulo="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
              </m.div>
            </>
          )}
          <Painel aberto={cadastro && !resolver}>
            <CaixaAceite marcada={aceito} onChange={setAceito} />
          </Painel>
          <Msg>{saiu && <Aviso>Você saiu por inatividade.</Aviso>}</Msg>
          <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
          <Msg>{!cadastro && espera > 0 && <Aviso>Aguarde {espera} s para tentar de novo.</Aviso>}</Msg>
          <Msg>{msgRecuperar && <Aviso>{msgRecuperar}</Aviso>}</Msg>
          <m.div variants={item}>
            <Botao tipo="primario" className="w-full" disabled={enviando || (cadastro && !aceito) || (!cadastro && espera > 0) || (!!resolver && !codigoCompleto(codigo))} carregando={enviando}>
              {enviando ? 'Enviando…' : !cadastro && espera > 0 ? `Aguarde ${espera} s` : cadastro ? 'Criar conta' : resolver ? 'Confirmar' : 'Entrar'}
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
            setResolver(null)
            setCadastro((c) => !c)
          }}
        >
          {cadastro ? 'Já tenho conta — Entrar' : 'Não tenho conta — Criar conta'}
        </m.button>
        <a href="/instalar" className="mt-4 block text-center text-xs text-slate-500 hover:text-slate-300">
          Como instalar o app
        </a>
        <p className="mt-3 text-center text-xs text-slate-500">
          <a href="/privacidade" className="underline">Política de Privacidade</a> do VFITCOACH. Protegido pelo reCAPTCHA. Valem a{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="underline">Política de Privacidade</a> e os{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener" className="underline">Termos de Serviço</a> do Google.
        </p>
        <p className="mt-1 text-center text-xs text-slate-600">Versão {__VERSAO__}</p>
      </Cartao>
      </m.div>
      </m.div>
    </Centro>
  )
}
