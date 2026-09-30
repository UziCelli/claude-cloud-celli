import { useEffect, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { doc } from 'firebase/firestore'
import { alterarEmail, recuperarSenha, salvarPeso, sincronizarEmail } from '../../lib/acoes'
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

function Peso({ uid, atual }: { uid: string; atual?: number }) {
  const [kg, setKg] = useState(atual != null ? String(atual) : '')
  const n = Number(kg.replace(',', '.'))
  const valido = n >= 20 && n <= 300
  return (
    <Cartao>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (valido) salvarPeso(uid, n)
        }}
      >
        <h2 className="font-semibold">Peso (kg)</h2>
        <Campo rotulo="Usado nos exercícios com peso do corpo" type="number" inputMode="decimal" step={0.5} min={20} max={300} value={kg} onChange={(e) => setKg(e.target.value)} />
        <Botao tipo="primario" className="w-full" disabled={!valido}>
          Salvar peso
        </Botao>
      </form>
    </Cartao>
  )
}

// email = e-mail do perfil (usuarios/{uid}.email).
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
        {perfil?.papel === 'aluno' && !carregando && <Peso uid={uid} atual={perfil.pesoKg} />}
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
        <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
        <Msg>{ok && <Aviso>{ok}</Aviso>}</Msg>
        <Botao type="button" className="w-full" onClick={trocarSenha}>
          Trocar senha
        </Botao>
      </div>
    </Pagina>
  )
}
