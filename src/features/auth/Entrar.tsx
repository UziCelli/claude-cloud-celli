import { m } from 'motion/react'
import { useEffect, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import type { MultiFactorResolver } from 'firebase/auth'
import { cadastrar, confirmarLoginTotp, entrar, recuperarSenha, resolverMfa } from '../../lib/acoes'
import { codigoCompleto, limparCodigo, mensagemMfa } from '../../lib/mfa'
import { Aviso, Msg, Painel } from '../../ui'
import { Brilho } from '../../vidro'
import BoasVindas, { deveMostrarBoasVindas } from './BoasVindas'
import { jaInstalado } from '../instalar/Instalar'
import Logo from '@marca/Logo'
import { CaixaAceite } from '../privacidade/Politica'
import { registrarFalha, restanteSeg, zerarFalhas } from '../../lib/tentativas'
import { AVISO_SAIU, marcar } from '../../lib/inatividade'
import { registrarErro } from '../../lib/log'
import { atualizarNaEntrada } from '../../lib/atualizar'
import marca from '@marca/marca.json'

const rotulo = 'block text-[15px] font-semibold text-slate-300'
const campo = 'h-14 w-full rounded-2xl bg-white/10 px-4 text-[17px] text-white ring-1 ring-white/25 placeholder:text-slate-400'

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
  const [boasVindas, setBoasVindas] = useState(() => deveMostrarBoasVindas(jaInstalado()))
  const [verSenha, setVerSenha] = useState(false)
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

  function trocarModo(paraCadastro: boolean) {
    setErro('')
    setMsgRecuperar('')
    setResolver(null)
    setCadastro(paraCadastro)
  }

  if (boasVindas)
    return (
      <BoasVindas
        onCriar={() => {
          trocarModo(true)
          setBoasVindas(false)
        }}
        onEntrar={() => {
          trocarModo(false)
          setBoasVindas(false)
        }}
      />
    )

  return (
    <div className="min-h-dvh">
      <Brilho />
      <m.div
        variants={{ a: { x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } }, b: { x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } }, quieto: { x: 0 } }}
        animate={tremor ? (tremor % 2 ? 'a' : 'b') : 'quieto'}
      >
        <main className="mx-auto flex min-h-dvh max-w-sm flex-col px-5 pb-6 pt-[calc(1rem+env(safe-area-inset-top))] text-left">
          <Logo className="h-9 self-start text-white" />
          <h1 className="mt-8 text-[30px] leading-tight">{cadastro ? 'Criar conta' : 'Entrar'}</h1>

          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              enviar()
            }}
          >
            {resolver ? (
              <div className="space-y-2">
                <label htmlFor="codigo" className={rotulo}>Código de 6 dígitos do Google Authenticator</label>
                <input
                  id="codigo"
                  name="codigo"
                  className={`${campo} mt-1.5`}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  autoFocus
                  value={codigo}
                  onChange={(e) => setCodigo(limparCodigo(e.target.value))}
                  required
                />
                <button type="button" className="text-[15px] text-slate-200" onClick={() => voltar()}>
                  Voltar
                </button>
              </div>
            ) : (
              <>
                <Painel aberto={cadastro} className="-mx-1 px-1">
                  <label htmlFor="nome" className={rotulo}>Nome</label>
                  <input id="nome" name="name" autoComplete="name" className={`${campo} mt-1.5`} value={nome} onChange={(e) => setNome(e.target.value)} required={cadastro} />
                </Painel>
                <div>
                  <label htmlFor="email" className={rotulo}>E-mail</label>
                  <input id="email" name="email" type="email" autoComplete="username" placeholder="voce@email.com" className={`${campo} mt-1.5`} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="senha" className={rotulo}>Senha</label>
                  <span className="relative mt-1.5 block">
                    <input
                      id="senha"
                      name="password"
                      type={verSenha ? 'text' : 'password'}
                      autoComplete={cadastro ? 'new-password' : 'current-password'}
                      className={`${campo} pr-14`}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      aria-label={verSenha ? 'Ocultar' : 'Mostrar'}
                      aria-pressed={verSenha}
                      className="absolute right-0 top-0 grid size-14 place-items-center text-slate-200"
                      onClick={() => setVerSenha((v) => !v)}
                    >
                      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                        <circle cx="12" cy="12" r="3" />
                        {verSenha && <path d="M4 4l16 16" />}
                      </svg>
                    </button>
                  </span>
                </div>
              </>
            )}
            <Painel aberto={cadastro && !resolver}>
              <CaixaAceite marcada={aceito} onChange={setAceito} />
            </Painel>
            <Msg>{saiu && <Aviso>Você saiu por inatividade.</Aviso>}</Msg>
            <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
            <Msg>{!cadastro && espera > 0 && <Aviso>Aguarde {espera} s para tentar de novo.</Aviso>}</Msg>
            <Msg>{msgRecuperar && <Aviso>{msgRecuperar}</Aviso>}</Msg>
            <button
              className="h-14 w-full rounded-2xl bg-marca-500 text-[17px] font-bold text-white shadow-lg disabled:opacity-50"
              disabled={enviando || (cadastro && !aceito) || (!cadastro && espera > 0) || (!!resolver && !codigoCompleto(codigo))}
            >
              {enviando ? 'Enviando…' : !cadastro && espera > 0 ? `Aguarde ${espera} s` : cadastro ? 'Criar conta' : resolver ? 'Confirmar' : 'Entrar'}
            </button>
          </form>

          <Painel aberto={!cadastro && !resolver}>
            <p className="mt-4 text-center">
              <button type="button" className="text-[15px] font-semibold text-marca-300" onClick={esqueciSenha}>
                Esqueci minha senha
              </button>
            </p>
          </Painel>

          <div className="mt-6 flex items-center gap-3 text-[15px] text-slate-200">
            <span className="h-px flex-1 bg-white/20" />
            {cadastro ? 'Já tem conta?' : 'Primeira vez aqui?'}
            <span className="h-px flex-1 bg-white/20" />
          </div>
          <button type="button" className="vidro-escuro mt-4 h-14 w-full rounded-2xl text-[17px] font-bold text-white" onClick={() => trocarModo(!cadastro)}>
            {cadastro ? 'Já tenho conta' : 'Criar minha conta'}
          </button>

          <footer className="mt-auto pt-6 text-center text-xs leading-relaxed text-slate-300">
            <p>
              <a href="/privacidade" className="underline">Política de Privacidade</a> {marca.doNome}. Protegido pelo reCAPTCHA. Valem a{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="underline">Política de Privacidade</a> e os{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener" className="underline">Termos de Serviço</a> do Google.
            </p>
            <p className="mt-1">Versão {__VERSAO__}</p>
          </footer>
        </main>
      </m.div>
    </div>
  )
}
