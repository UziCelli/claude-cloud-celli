import { useState } from 'react'
import { criarAlunoComApp, criarAlunoPresencial } from '../../../lib/acoes'
import { ir } from '../../../rota'
import { Aviso, Botao, Campo, Cartao, Pagina } from '../../../ui'

// YYYY-MM-DD no calendário de São Paulo (toISOString seria UTC: +1 dia depois das 21h).
export const hojeMaisDias = (dias: number) =>
  new Date(Date.now() + dias * 864e5).toLocaleDateString('sv', { timeZone: 'America/Sao_Paulo' })

// Mensagem mostrada uma vez na página do aluno depois de criar.
export const flash = { texto: '' }

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
      gravado.catch(() => alert('Não foi possível salvar o aluno. Tente de novo.'))
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

  const aba = (ativo: boolean) => `flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${ativo ? 'bg-orange-500 text-slate-950' : 'bg-slate-800'}`
  return (
    <Pagina titulo="Novo aluno">
      <Cartao className="max-w-md">
        <form onSubmit={enviar} className="space-y-3">
          <div className="flex gap-2">
            <button type="button" className={aba(app)} onClick={() => setApp(true)}>
              Usa o app
            </button>
            <button type="button" className={aba(!app)} onClick={() => setApp(false)}>
              Presencial (sem app)
            </button>
          </div>
          <Campo rotulo="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
          {app && (
            <>
              <Campo rotulo="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <Campo rotulo="Pago até" type="date" required value={pagoAte} onChange={(e) => setPagoAte(e.target.value)} />
            </>
          )}
          {erro && <Aviso>{erro}</Aviso>}
          <Botao tipo="primario" type="submit" className="w-full" disabled={enviando}>
            {enviando ? 'Criando…' : 'Cadastrar'}
          </Botao>
        </form>
      </Cartao>
    </Pagina>
  )
}
