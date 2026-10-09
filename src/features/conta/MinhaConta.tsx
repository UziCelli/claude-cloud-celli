import { useEffect, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { doc } from 'firebase/firestore'
import type { TotpSecret } from 'firebase/auth'
import { alterarEmail, ativarTotp, iniciarTotp, reautenticar, recuperarSenha, sair, sincronizarEmail, temTotp } from '../../lib/acoes'
import { chaveManual, codigoCompleto, limparCodigo, mensagemMfa } from '../../lib/mfa'
import { qrDataUrl } from '../../lib/qr'
import type { Usuario } from '../../lib/acesso'
import { db } from '../../lib/firebase'
import { useDoc } from '../../lib/hooks'
import { Aviso, Botao, Campo, Cartao, Msg, Pagina } from '../../ui'

const SEM_INTERNET = 'Sem internet. Verifique sua conexão e tente de novo.'
const erros: Record<string, string> = {
  'auth/wrong-password': 'Senha atual incorreta',
  'auth/invalid-credential': 'Senha atual incorreta',
  'auth/email-already-in-use': 'Já existe uma conta com esse e-mail',
  'auth/invalid-email': 'E-mail inválido',
  'auth/too-many-requests': 'Muitas tentativas. Espere alguns minutos e tente de novo.',
  'auth/network-request-failed': SEM_INTERNET,
}
const mensagemErro = (e: unknown) =>
  (e instanceof FirebaseError && erros[e.code]) || 'Não deu para trocar o e-mail. Tente de novo.'

// Só coach: ativa o 2º fator (Google Authenticator) escaneando um QR code e confirmando com um código.
function DuasEtapas() {
  const [ativa, setAtiva] = useState(temTotp)
  const [chave, setChave] = useState<{ secret: TotpSecret; uri: string } | null>(null)
  const [codigo, setCodigo] = useState('')
  const [senha, setSenha] = useState('')
  const [pedeSenha, setPedeSenha] = useState(false)
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState('')

  // Tenta a ação; se o Firebase pedir login recente, pede a senha e tenta de novo.
  async function tentar(acao: () => Promise<void>) {
    setErro('')
    setOcupado(true)
    try {
      await acao()
    } catch (e) {
      const code = e instanceof FirebaseError ? e.code : undefined
      if (code === 'auth/requires-recent-login') {
        setPedeSenha(true)
        setErro('Por segurança, confirme sua senha para continuar.')
      } else setErro(mensagemMfa(code))
    } finally {
      setOcupado(false)
    }
  }

  const comecar = () => tentar(async () => setChave(await iniciarTotp()))
  const confirmar = () =>
    tentar(async () => {
      if (!chave) return
      await ativarTotp(chave.secret, codigo)
      setAtiva(true)
      setChave(null)
    })
  // Depois de reautenticar, a pessoa toca de novo em Ativar/Confirmar.
  const confirmarSenha = () =>
    tentar(async () => {
      await reautenticar(senha)
      setPedeSenha(false)
      setSenha('')
      setErro('Senha confirmada. Toque de novo para continuar.')
    })

  return (
    <Cartao className="space-y-3">
      <h2 className="font-semibold">Verificação em 2 etapas</h2>
      {ativa ? (
        <p className="text-sm text-emerald-400">Ativada ✓</p>
      ) : (
        <>
          <p className="text-sm text-slate-400">
            Além da senha, o login pede um código de 6 dígitos do app Google Authenticator.
          </p>
          {chave && !pedeSenha && (
            <div className="space-y-3">
              <p className="text-sm">Abra o Google Authenticator, toque em + e escaneie o QR code:</p>
              <img src={qrDataUrl(chave.uri)} alt="QR code para o Google Authenticator" className="mx-auto h-48 w-48 rounded bg-white p-2" />
              <p className="text-sm text-slate-400">
                Ou digite esta chave no app: <span className="break-all font-mono text-slate-200">{chaveManual(chave.secret.secretKey)}</span>
              </p>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (codigoCompleto(codigo)) confirmar()
                }}
              >
                <Campo
                  rotulo="Código de 6 dígitos do Google Authenticator"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={codigo}
                  onChange={(e) => setCodigo(limparCodigo(e.target.value))}
                  required
                />
                <Botao tipo="primario" className="w-full" disabled={ocupado || !codigoCompleto(codigo)}>
                  {ocupado ? 'Confirmando…' : 'Confirmar e ativar'}
                </Botao>
              </form>
            </div>
          )}
          {pedeSenha && (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                confirmarSenha()
              }}
            >
              <Campo rotulo="Senha atual" type="password" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
              <Botao tipo="primario" className="w-full" disabled={ocupado}>
                Confirmar senha
              </Botao>
            </form>
          )}
          {!chave && !pedeSenha && (
            <Botao type="button" tipo="primario" className="w-full" disabled={ocupado} onClick={comecar}>
              {ocupado ? 'Gerando…' : 'Ativar'}
            </Botao>
          )}
        </>
      )}
      <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
    </Cartao>
  )
}

// Só do coach (o aluno usa a ContaAluno). email = e-mail do perfil (usuarios/{uid}.email).
export default function MinhaConta({ uid, email }: { uid: string; email: string }) {
  const [novo, setNovo] = useState('')
  const [senha, setSenha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const { dados: perfil, carregando } = useDoc<Usuario>(doc(db, 'usuarios', uid))

  // Depois de confirmar o link e entrar de novo, o perfil alcança o e-mail do login.
  useEffect(() => sincronizarEmail(uid, email), [uid, email])

  async function trocarEmail() {
    setErro('')
    setOk('')
    setEnviando(true)
    try {
      const destino = novo.trim()
      await alterarEmail(senha, destino)
      setOk(
        `Enviamos um link para ${destino}. Abra seu e-mail (confira o spam) e clique no link para confirmar. Depois, entre de novo com o e-mail novo.`,
      )
      setNovo('')
      setSenha('')
    } catch (e) {
      setErro(mensagemErro(e))
    } finally {
      setEnviando(false)
    }
  }

  async function trocarSenha() {
    setErro('')
    setOk('')
    try {
      await recuperarSenha(email)
      setOk(`Enviamos um link para ${email} para criar uma senha nova (confira o spam).`)
    } catch (e) {
      setErro(e instanceof FirebaseError && e.code === 'auth/network-request-failed' ? SEM_INTERNET : mensagemErro(e))
    }
  }

  return (
    <Pagina titulo="Minha conta">
      <div className="mx-auto max-w-md space-y-4">
        <Cartao>
          <p className="text-sm text-slate-400">E-mail atual</p>
          <p className="break-all font-semibold">{email}</p>
        </Cartao>
        <Cartao>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              trocarEmail()
            }}
          >
            <h2 className="font-semibold">Trocar e-mail</h2>
            <Campo rotulo="Novo e-mail" type="email" autoComplete="email" value={novo} onChange={(e) => setNovo(e.target.value)} required />
            <Campo
              rotulo="Senha atual"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <Botao tipo="primario" className="w-full" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Trocar e-mail'}
            </Botao>
          </form>
        </Cartao>
        {perfil?.papel === 'coach' && !carregando && <DuasEtapas />}
        <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
        <Msg>{ok && <Aviso>{ok}</Aviso>}</Msg>
        <Botao type="button" className="w-full" onClick={trocarSenha}>
          Trocar senha
        </Botao>
        <Botao type="button" className="w-full lg:hidden" onClick={sair}>
          Sair
        </Botao>
        <a href="/privacidade" className="block text-center text-sm text-slate-400 underline hover:text-slate-200">Política de Privacidade</a>
      </div>
    </Pagina>
  )
}
