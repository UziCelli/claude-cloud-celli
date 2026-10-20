import { useRef, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { recuperarSenha } from '../../lib/acoes'
import { voltar } from '../../rota'
import { registrarErro } from '../../lib/log'
import { Aviso, Msg } from '../../ui'
import { Brilho } from '../../vidro'
import Logo from '@marca/Logo'

export const rotulo = 'block text-[15px] font-semibold text-slate-300'
export const campo = 'h-14 w-full rounded-2xl bg-white/10 px-4 text-[17px] text-white ring-1 ring-white/25 placeholder:text-slate-400'

const SUCESSO = 'Enviamos um link para seu e-mail (confira o spam). O link vale por 1 hora.'

const mensagemRecuperar = (e: unknown) => {
  if (e instanceof FirebaseError && e.code === 'auth/invalid-email') return 'E-mail inválido'
  if (e instanceof FirebaseError && e.code === 'auth/network-request-failed')
    return 'Sem internet. Verifique sua conexão e tente de novo.'
  if (e instanceof FirebaseError && e.code === 'auth/too-many-requests') return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.'
  // user-not-found mostra a mesma mensagem de sucesso, para não revelar contas.
  if (e instanceof FirebaseError && e.code === 'auth/user-not-found') return ''
  registrarErro('erro', `recuperar: ${e instanceof FirebaseError ? e.code : String(e).slice(0, 80)}`)
  return 'Não deu para enviar agora. Tente de novo em instantes.'
}

export default function EsqueciSenha({ email, setEmail }: { email: string; setEmail: (v: string) => void }) {
  const [enviando, setEnviando] = useState(false)
  const [ok, setOk] = useState(false)
  const [erro, setErro] = useState('')
  const [vazioAoAbrir] = useState(() => !email)
  const ocupado = useRef(false)

  async function enviar() {
    if (ocupado.current) return
    ocupado.current = true
    setEnviando(true)
    setOk(false)
    setErro('')
    try {
      await recuperarSenha(email)
      setOk(true)
    } catch (e) {
      const especifico = mensagemRecuperar(e)
      if (especifico) setErro(especifico)
      else setOk(true)
    } finally {
      ocupado.current = false
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-dvh">
      <Brilho />
      <main className="mx-auto flex min-h-dvh max-w-sm flex-col px-5 pb-6 pt-[calc(1rem+env(safe-area-inset-top))] text-left">
        <Logo className="h-9 self-start text-white" />
        <h1 className="mt-8 text-[30px] leading-tight">Esqueci minha senha</h1>
        <p className="mt-3 text-[16px] text-slate-200">Digite seu e-mail. Vamos enviar um link para você criar uma senha nova.</p>
        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            enviar()
          }}
        >
          <div>
            <label htmlFor="email" className={rotulo}>E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="voce@email.com"
              className={`${campo} mt-1.5`}
              autoFocus={vazioAoAbrir}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setOk(false)
                setErro('')
              }}
              required
            />
          </div>
          <Msg>{ok && <Aviso>{SUCESSO}</Aviso>}</Msg>
          <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
          <button
            className="h-14 w-full rounded-2xl border border-marca-400 bg-marca-500 text-[17px] font-bold text-white shadow-lg disabled:opacity-50"
            disabled={enviando}
          >
            {enviando ? 'Enviando…' : 'Enviar link'}
          </button>
        </form>
        <button type="button" className="vidro-escuro border border-white/20 mt-6 h-14 w-full rounded-2xl text-[17px] font-bold text-white" onClick={() => voltar('/')}>
          Voltar para entrar
        </button>
      </main>
    </div>
  )
}
