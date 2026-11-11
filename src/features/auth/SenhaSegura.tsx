import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { reautenticar, recuperarSenha, sair, trocarSenha } from '../../lib/acoes'
import { auth } from '../../lib/firebase'
import { lembrarSenha, problemaSenha } from '../../lib/senha'
import { Aviso, Botao, Campo, Cartao, Centro, Msg } from '../../ui'
import RequisitosSenha from './RequisitosSenha'

const erroSenha = (e: unknown) => {
  const c = e instanceof FirebaseError ? e.code : ''
  if (c === 'auth/wrong-password' || c === 'auth/invalid-credential') return 'Senha atual incorreta. Esqueceu? Toque em Esqueci minha senha.'
  if (c === 'auth/too-many-requests') return 'Muitas tentativas. Espere alguns minutos e tente de novo.'
  if (c === 'auth/network-request-failed') return 'Sem internet. Conecte-se para continuar.'
  if (c === 'auth/weak-password' || c === 'auth/password-does-not-meet-requirements') return 'Senha nova fraca. Siga os itens abaixo do campo.'
  return 'Não deu para salvar. Tente de novo.'
}

// Aluno que precisa de senha forte. Só aparece uma vez por conta:
// - `fraca`: o login deste aparelho mostrou que a senha não tem os requisitos → cria uma nova (sem pedir a atual,
//   salvo se o login for antigo: aí o Firebase exige conferir de novo);
// - senão (sessão antiga, de antes da regra): confere a senha atual uma vez; forte passa direto, fraca vai para a nova.
// `adiar`: só para quem já aceitou uma versão dos termos; sem internet ele treina e o app pede de novo na próxima abertura.
export default function SenhaSegura({ uid, fraca, adiar }: { uid: string; fraca: boolean; adiar?: () => void }) {
  const email = auth.currentUser?.email ?? ''
  const [etapa, setEtapa] = useState<'conferir' | 'nova'>(fraca ? 'nova' : 'conferir')
  const [pedirAtual, setPedirAtual] = useState(false)
  const [atual, setAtual] = useState('')
  const [nova, setNova] = useState('')
  const [repete, setRepete] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [saindo, setSaindo] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const [semRede, setSemRede] = useState(!navigator.onLine)
  const [enviandoLink, setEnviandoLink] = useState(false)

  const falhou = (e: unknown) => {
    setErro(erroSenha(e))
    setSemRede(e instanceof FirebaseError && e.code === 'auth/network-request-failed')
  }

  async function conferir() {
    setEnviando(true)
    setErro('')
    try {
      await reautenticar(atual)
      if (problemaSenha(atual)) {
        lembrarSenha(uid, 'fraca')
        setEtapa('nova') // acabou de conferir: a troca não pede a senha de novo
      } else {
        lembrarSenha(uid, 'ok') // App.tsx segue sozinho para os termos ou o app
      }
    } catch (e) {
      falhou(e)
    } finally {
      setEnviando(false)
    }
  }

  async function criarNova() {
    const problema = problemaSenha(nova) || (nova !== repete ? 'As senhas novas não são iguais.' : '')
    if (problema) return setErro(problema)
    setEnviando(true)
    setErro('')
    try {
      await trocarSenha(nova, pedirAtual ? atual : undefined)
      lembrarSenha(uid, 'ok')
    } catch (e) {
      if (e instanceof FirebaseError && e.code === 'auth/requires-recent-login') {
        setPedirAtual(true)
        setErro('Por segurança, digite também a sua senha atual.')
      } else falhou(e)
    } finally {
      setEnviando(false)
    }
  }

  function esqueci() {
    if (enviandoLink) return
    setErro('')
    setOk('')
    setEnviandoLink(true)
    recuperarSenha(email)
      .then(() => setOk(`Enviamos um link para ${email} para criar uma senha nova (confira o spam). Depois, entre com a senha nova.`))
      .catch(falhou)
      .finally(() => setEnviandoLink(false))
  }

  const campoAtual = (
    <Campo rotulo="Senha atual" type="password" autoComplete="current-password" value={atual} onChange={(e) => { setAtual(e.target.value); setErro('') }} required />
  )

  return (
    <Centro>
      <h1 className="text-2xl font-bold">{etapa === 'nova' ? 'Crie uma senha mais segura' : 'Confirme sua senha'}</h1>
      <p className="text-slate-300">
        {etapa === 'nova'
          ? 'Sua senha não tem o mínimo de segurança. Crie uma nova agora: é só desta vez.'
          : 'Para proteger sua conta, confirme sua senha. É só desta vez.'}
      </p>
      <form
        className="w-full space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (etapa === 'nova') criarNova()
          else conferir()
        }}
      >
        <Cartao className="space-y-3 text-left">
          <input type="email" name="username" autoComplete="username" value={email} readOnly hidden />
          {etapa === 'conferir' ? campoAtual : (
            <>
              {pedirAtual && campoAtual}
              <Campo rotulo="Nova senha" type="password" autoComplete="new-password" value={nova} onChange={(e) => { setNova(e.target.value); setErro('') }} required />
              <Campo rotulo="Repetir nova senha" type="password" autoComplete="new-password" value={repete} onChange={(e) => { setRepete(e.target.value); setErro('') }} required />
              <RequisitosSenha senha={nova} repete={repete} />
            </>
          )}
          {(etapa === 'conferir' || pedirAtual) && (
            <Botao type="button" tipo="fantasma" className="underline" disabled={enviandoLink} onClick={esqueci}>Esqueci minha senha</Botao>
          )}
        </Cartao>
        <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
        <Msg>{ok && <p className="text-sm text-emerald-400">{ok}</p>}</Msg>
        <Botao tipo="primario" className="w-full" disabled={enviando} carregando={enviando}>
          {etapa === 'nova' ? 'Salvar senha nova' : 'Continuar'}
        </Botao>
      </form>
      {adiar && semRede && (
        <Botao className="w-full" onClick={adiar}>Sem internet: treinar agora e confirmar depois</Botao>
      )}
      <Botao
        disabled={saindo}
        onClick={() => {
          setSaindo(true)
          sair().catch(() => setSaindo(false))
        }}
      >
        {saindo ? 'Saindo…' : 'Sair'}
      </Botao>
    </Centro>
  )
}
