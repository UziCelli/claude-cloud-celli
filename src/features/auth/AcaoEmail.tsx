import { useEffect, useRef, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { aplicarCodigo, definirSenhaNova, emailDoCodigo } from '../../lib/acoes'
import { registrarErro } from '../../lib/log'
import { Aviso, Msg } from '../../ui'
import { Brilho } from '../../vidro'
import Logo from '@marca/Logo'
import { campo, rotulo } from './EsqueciSenha'
import { SENHA_FRACA } from './Entrar'

const VENCIDO = "Este link venceu ou já foi usado. Peça um novo em 'Esqueci minha senha'."
const ACOES: Record<string, string> = {
  verifyAndChangeEmail: 'E-mail confirmado. Entre com o e-mail novo.',
  verifyEmail: 'E-mail confirmado.',
  recoverEmail: 'E-mail restaurado.',
}
const botao = 'h-14 w-full rounded-2xl border border-marca-400 bg-marca-500 text-[17px] font-bold text-white shadow-lg disabled:opacity-50'

// O código é de uso único: o StrictMode do dev roda o efeito duas vezes, então a 2ª chamada reaproveita a 1ª.
const aplicados = new Map<string, Promise<void>>()
const aplicarUmaVez = (codigo: string) => aplicados.get(codigo) ?? (aplicados.set(codigo, aplicarCodigo(codigo)), aplicados.get(codigo)!)

// Só o código do erro vai para o registro: nunca o oobCode.
const mensagem = (e: unknown) => {
  const code = e instanceof FirebaseError ? e.code : ''
  if (code === 'auth/expired-action-code' || code === 'auth/invalid-action-code') return VENCIDO
  if (code === 'auth/network-request-failed') return 'Sem internet. Verifique sua conexão e tente de novo.'
  if (code === 'auth/weak-password') return SENHA_FRACA
  registrarErro('erro', `acao: ${code || 'desconhecido'}`)
  return 'Não deu para concluir agora. Tente de novo em instantes.'
}

// Página pública /acao: destino dos links dos e-mails do Firebase Auth (URL de ação do console).
export default function AcaoEmail() {
  const q = new URLSearchParams(location.search)
  const modo = q.get('mode') ?? ''
  const codigo = q.get('oobCode') ?? ''
  const senhaReset = modo === 'resetPassword'
  const valido = !!codigo && (senhaReset || modo in ACOES)
  const [email, setEmail] = useState('') // resetPassword: e-mail do código (vazio = ainda conferindo)
  const [pronto, setPronto] = useState(false)
  const [erro, setErro] = useState('')
  const [senha, setSenha] = useState('')
  const [repete, setRepete] = useState('')
  const [enviando, setEnviando] = useState(false)
  const ocupado = useRef(false)

  useEffect(() => {
    if (!valido) return
    let vivo = true
    ;(senhaReset ? emailDoCodigo(codigo).then(setEmail) : aplicarUmaVez(codigo).then(() => setPronto(true))).catch(
      (e) => vivo && setErro(mensagem(e)),
    )
    return () => { vivo = false }
  }, [valido, senhaReset, codigo])

  async function salvar() {
    if (ocupado.current) return
    if (senha !== repete) return setErro('As senhas não são iguais.')
    ocupado.current = true
    setEnviando(true)
    setErro('')
    try {
      await definirSenhaNova(codigo, senha)
      setPronto(true)
    } catch (e) {
      setErro(mensagem(e))
    } finally {
      ocupado.current = false
      setEnviando(false)
    }
  }

  const irApp = () => location.assign('/')
  const form = senhaReset && email && !pronto
  const aguardando = valido && !erro && !pronto && !form
  const titulo = !valido ? 'Link inválido' : senhaReset ? (pronto ? 'Senha criada' : 'Nova senha') : modo === 'recoverEmail' ? 'Restaurar e-mail' : 'Confirmar e-mail'

  return (
    <div className="min-h-dvh">
      <Brilho />
      <main className="mx-auto flex min-h-dvh max-w-sm flex-col px-5 pb-6 pt-topo text-left">
        <Logo className="h-9 self-start text-white" />
        <h1 className="mt-8 text-[30px] leading-tight">{titulo}</h1>
        {!valido && <p className="mt-3 text-[16px] text-slate-200">Este endereço não funciona. Abra o link do e-mail de novo ou entre no app.</p>}
        {aguardando && <p className="mt-3 text-[16px] text-slate-200">Conferindo o link…</p>}
        {pronto && <p className="mt-3 text-[16px] text-slate-200">{senhaReset ? 'Senha criada. Agora é só entrar.' : ACOES[modo]}</p>}
        {form && (
          <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); salvar() }}>
            <p className="text-[16px] text-slate-200">Nova senha para {email}</p>
            <input type="email" name="username" autoComplete="username" value={email} readOnly hidden />
            <div>
              <label htmlFor="senha" className={rotulo}>Nova senha</label>
              <input id="senha" name="password" type="password" autoComplete="new-password" className={`${campo} mt-1.5`} value={senha} onChange={(e) => { setSenha(e.target.value); setErro('') }} required />
            </div>
            <div>
              <label htmlFor="repete" className={rotulo}>Repetir senha</label>
              <input id="repete" type="password" autoComplete="new-password" className={`${campo} mt-1.5`} value={repete} onChange={(e) => { setRepete(e.target.value); setErro('') }} required />
            </div>
            <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
            <button type="submit" className={botao} disabled={enviando}>{enviando ? 'Salvando…' : 'Salvar senha'}</button>
          </form>
        )}
        {!form && <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>}
        {!form && !aguardando && (
          <button type="button" className={`${botao} mt-6`} onClick={irApp}>
            {pronto ? 'Entrar' : 'Ir para o app'}
          </button>
        )}
      </main>
    </div>
  )
}
