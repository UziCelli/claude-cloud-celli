import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { aceitarPrivacidade, confirmarSenha, recuperarSenha, sair } from '../../lib/acoes'
import { auth } from '../../lib/firebase'
import { problemaSenha, REGRA_SENHA } from '../../lib/senha'
import { Aviso, Botao, Campo, Cartao, Centro, Msg } from '../../ui'
import { CaixaAceite } from './Politica'

const erroSenha = (e: unknown) => {
  const c = e instanceof FirebaseError ? e.code : ''
  if (c === 'auth/wrong-password' || c === 'auth/invalid-credential') return 'Senha atual incorreta. Esqueceu? Toque em Esqueci minha senha.'
  if (c === 'auth/too-many-requests') return 'Muitas tentativas. Espere alguns minutos e tente de novo.'
  if (c === 'auth/network-request-failed') return 'Sem internet. Conecte-se para continuar.'
  if (c === 'auth/weak-password' || c === 'auth/password-does-not-meet-requirements') return `Senha nova fraca. ${REGRA_SENHA}`
  return 'Não deu para salvar. Tente de novo.'
}

// Aluno liberado que ainda não aceitou a versão vigente. Desde 2026-11-09 o aceite exige senha forte:
// confere a senha atual (precisa de internet) e, se ela for fraca, pede uma nova antes de liberar o app.
// `adiar`: só para quem já aceitou uma versão anterior. Sem internet não dá para conferir a senha; ele treina e o app pede de novo
// na próxima abertura (nunca para quem nunca aceitou: aí falta o consentimento).
export default function Aceite({ uid, adiar }: { uid: string; adiar?: () => void }) {
  const email = auth.currentUser?.email ?? ''
  const [marcada, setMarcada] = useState(false)
  const [atual, setAtual] = useState('')
  const [nova, setNova] = useState('')
  const [repete, setRepete] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [saindo, setSaindo] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const [semRede, setSemRede] = useState(!navigator.onLine)
  const [enviandoLink, setEnviandoLink] = useState(false)
  const precisaNova = !!atual && !!problemaSenha(atual)

  async function continuar() {
    const problema = precisaNova && (problemaSenha(nova) || (nova !== repete ? 'As senhas novas não são iguais.' : ''))
    if (problema) return setErro(problema)
    setEnviando(true)
    setErro('')
    try {
      await confirmarSenha(atual, precisaNova ? nova : undefined)
      // A senha antiga já não vale: se o aceite abaixo falhar, a nova tentativa usa a nova.
      if (precisaNova) setAtual(nova)
      // Offline o updateDoc só resolve ao sincronizar: não esperamos; o perfil local muda na hora.
      aceitarPrivacidade(uid).catch(() => {
        setEnviando(false)
        setErro('Não deu para salvar o aceite. Tente de novo.')
      })
    } catch (e) {
      setEnviando(false)
      setErro(erroSenha(e))
      setSemRede(e instanceof FirebaseError && e.code === 'auth/network-request-failed')
    }
  }

  function esqueci() {
    if (enviandoLink) return
    setErro('')
    setOk('')
    setEnviandoLink(true)
    recuperarSenha(email)
      .then(() => setOk(`Enviamos um link para ${email} para criar uma senha nova (confira o spam). Depois, volte aqui e use a senha nova.`))
      .catch((e) => setErro(erroSenha(e)))
      .finally(() => setEnviandoLink(false))
  }

  return (
    <Centro>
      <h1 className="text-2xl font-bold">Atualizamos os termos</h1>
      <Aviso>Para continuar usando o app, confirme sua senha. Se ela for fraca, crie uma nova agora. Sem isso, o acesso fica bloqueado.</Aviso>
      <form
        className="w-full space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          continuar()
        }}
      >
        <Cartao className="space-y-3 text-left">
          <h2 className="font-semibold">Sua senha</h2>
          <input type="email" name="username" autoComplete="username" value={email} readOnly hidden />
          <Campo rotulo="Senha atual" type="password" autoComplete="current-password" value={atual} onChange={(e) => { setAtual(e.target.value); setErro('') }} required />
          {precisaNova && (
            <>
              <p className="text-sm text-amber-300">Sua senha atual é fraca. Crie uma nova: {REGRA_SENHA.toLowerCase()}</p>
              <Campo rotulo="Nova senha" type="password" autoComplete="new-password" value={nova} onChange={(e) => { setNova(e.target.value); setErro('') }} required />
              <Campo rotulo="Repetir nova senha" type="password" autoComplete="new-password" value={repete} onChange={(e) => { setRepete(e.target.value); setErro('') }} required />
            </>
          )}
          <button type="button" className="text-sm font-semibold underline disabled:opacity-50" disabled={enviandoLink} onClick={esqueci}>Esqueci minha senha</button>
        </Cartao>
        <Cartao className="space-y-3 text-left">
          <h2 className="font-semibold">Sua privacidade</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
            <li>Guardamos seu nome, e-mail, peso e treinos para montar e acompanhar seu treino.</li>
            <li>Peso e treinos podem ser dados de saúde: só usamos com o seu aceite.</li>
            <li>Não vendemos seus dados.</li>
            <li>Senha com no mínimo 8 caracteres, com letra e número. Ninguém consegue ler a sua senha, nem o coach.</li>
            <li>Você pode pedir cópia ou exclusão a qualquer momento pelo WhatsApp.</li>
          </ul>
          <a href="/privacidade" className="block text-sm underline">Ler a política completa</a>
          <CaixaAceite marcada={marcada} onChange={setMarcada} />
        </Cartao>
        <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
        <Msg>{ok && <p className="text-sm text-emerald-400">{ok}</p>}</Msg>
        <Botao tipo="primario" className="w-full" disabled={!marcada || enviando} carregando={enviando}>
          Aceitar e continuar
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
