import { m } from 'motion/react'
import { agil } from '../../../movimento'
import { useState } from 'react'
import { criarAlunoComApp, criarAlunoPresencial } from '../../../lib/acoes'
import { registrarErro } from '../../../lib/log'
import { hojeMaisDias } from '../../../lib/acesso'
import { ir } from '../../../rota'
import { Aviso, Botao, Campo, Cartao, flash, Msg, Pagina, Painel } from '../../../ui'

export default function NovoAluno() {
  const [app, setApp] = useState(true)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [pagoAte, setPagoAte] = useState(hojeMaisDias(30))
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    if (!app) {
      const { id, gravado } = criarAlunoPresencial({ nome: nome.trim() })
      ir('/aluno/' + id)
      gravado.catch((e) => {
        registrarErro('gravacao', `novo aluno: ${e?.code ?? e}`, e)
        alert('Não foi possível salvar o aluno. Tente de novo.')
      })
      return
    }
    setEnviando(true)
    try {
      const uid = await criarAlunoComApp({ nome: nome.trim(), email: email.trim(), pagoAte })
      flash.texto = 'Conta criada. O aluno recebeu um e-mail para criar a senha.'
      ir('/aluno/' + uid)
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível criar a conta.')
      setEnviando(false)
    }
  }

  const aba = (ativo: boolean) => `relative flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${ativo ? 'text-white' : ''}`
  const pilula = <m.span layoutId="novo-aba" className="absolute inset-0 z-0 rounded-lg bg-marca-500" transition={agil} />
  return (
    <Pagina titulo="Novo aluno">
      <Cartao className="max-w-md">
        <form onSubmit={enviar} className="space-y-3">
          <div className="flex gap-1 rounded-xl bg-slate-800 p-1">
            <button type="button" className={aba(app)} onClick={() => setApp(true)}>
              {app && pilula}
              <span className="relative z-10">Usa o app</span>
            </button>
            <button type="button" className={aba(!app)} onClick={() => setApp(false)}>
              {!app && pilula}
              <span className="relative z-10">Presencial (sem app)</span>
            </button>
          </div>
          <Campo rotulo="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
          <Painel aberto={app} className="-mx-1 px-1">
            <div className="space-y-3">
              <Campo rotulo="E-mail" type="email" required={app} value={email} onChange={(e) => setEmail(e.target.value)} />
              <Campo rotulo="Pago até" type="date" required={app} value={pagoAte} onChange={(e) => setPagoAte(e.target.value)} />
            </div>
          </Painel>
          <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
          <Botao tipo="primario" type="submit" className="w-full" disabled={enviando} carregando={enviando}>
            {enviando ? 'Criando…' : 'Cadastrar'}
          </Botao>
        </form>
      </Cartao>
    </Pagina>
  )
}
