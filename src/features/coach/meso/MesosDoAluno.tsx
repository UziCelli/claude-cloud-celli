import { useMemo, useState } from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import type { Usuario } from '../../../lib/acesso'
import { darAcessoAoApp, duplicarMeso, salvarMeso } from '../../../lib/acoes'
import { type MesoSalvo } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { useDoc, useLista } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { Aviso, Botao, Campo, Cartao, Pagina } from '../../../ui'
import { flash, hojeMaisDias } from '../alunos/NovoAluno'
import { mesoPadrao } from './mesoPadrao'

const dataBr = (iso: string) => {
  const [a, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}/${a}`
}

export default function MesosDoAluno({ uid }: { uid: string }) {
  const aluno = useDoc<Usuario>(doc(db, 'usuarios', uid))
  const mesosQ = useMemo(() => query(collection(db, 'mesos'), where('alunoId', '==', uid)), [uid])
  const mesos = useLista<MesoSalvo>(mesosQ)
  const [erro, setErro] = useState<string | null>(null)
  const [aviso] = useState(() => {
    const t = flash.texto
    flash.texto = ''
    return t
  })

  function novoMeso() {
    setErro(null)
    const { id, gravado } = salvarMeso(null, uid, `Mesociclo ${mesos.dados.length + 1}`, mesoPadrao())
    ir(`/meso/${id}`)
    gravado.catch(() => setErro('Não foi possível salvar o novo mesociclo.'))
  }

  return (
    <Pagina
      titulo={`Mesociclos de ${aluno.dados?.nome ?? '…'}`}
      acoes={<Botao tipo="primario" onClick={novoMeso}>Novo mesociclo</Botao>}
    >
      {aviso && <p className="mb-3 text-sm text-green-400">{aviso}</p>}
      {aluno.dados?.presencial && <DarAcesso id={uid} />}
      {erro && <p className="mb-3 text-sm text-red-400">{erro}</p>}
      {mesos.carregando && <p className="text-slate-400">Carregando…</p>}
      {!mesos.carregando && mesos.dados.length === 0 && <p className="text-slate-400">Nenhum mesociclo ainda.</p>}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mesos.dados.map((m) => (
          <CartaoMeso key={m.id} meso={m} />
        ))}
      </div>
    </Pagina>
  )
}

function CartaoMeso({ meso }: { meso: MesoSalvo & { id: string } }) {
  const [duplicando, setDuplicando] = useState(false)
  return (
    <Cartao>
      <h2 className="font-semibold">{meso.nome}</h2>
      <p className="mt-1 text-sm text-slate-400">
        {meso.frequencia}x/semana · {meso.semanas} semanas · início {dataBr(meso.inicio)}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Botao onClick={() => ir(`/meso/${meso.id}`)}>Editar</Botao>
        <Botao onClick={() => ir(`/meso/${meso.id}/semana/1`)}>Ver semanas</Botao>
        <Botao onClick={() => setDuplicando((v) => !v)}>Duplicar</Botao>
      </div>
      {duplicando && <FormDuplicar mesoId={meso.id} onFechar={() => setDuplicando(false)} />}
    </Cartao>
  )
}

function FormDuplicar({ mesoId, onFechar }: { mesoId: string; onFechar: () => void }) {
  const alunosQ = useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), [])
  const alunos = useLista<Usuario>(alunosQ)
  const [alunoId, setAlunoId] = useState('')
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  async function confirmar() {
    if (!alunoId || !nome.trim()) return
    setEnviando(true)
    setErro(null)
    try {
      const { id, gravado } = await duplicarMeso(mesoId, alunoId, nome.trim())
      ir(`/meso/${id}`)
      gravado.catch(() => setErro('Não foi possível duplicar o mesociclo.'))
    } catch {
      setErro('Não foi possível duplicar o mesociclo.')
      setEnviando(false)
    }
  }

  return (
    <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-slate-400">Aluno</span>
        <select
          value={alunoId}
          onChange={(e) => setAlunoId(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-100"
        >
          <option value="">Selecione…</option>
          {alunos.dados.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          ))}
        </select>
      </label>
      <Campo rotulo="Nome do novo mesociclo" value={nome} onChange={(e) => setNome(e.target.value)} />
      {erro && <p className="text-sm text-red-400">{erro}</p>}
      <div className="flex flex-wrap gap-2">
        <Botao tipo="primario" disabled={!alunoId || !nome.trim() || enviando} onClick={confirmar}>
          Confirmar
        </Botao>
        <Botao onClick={onFechar}>Cancelar</Botao>
      </div>
    </div>
  )
}

function DarAcesso({ id }: { id: string }) {
  const [aberto, setAberto] = useState(false)
  const [email, setEmail] = useState('')
  const [pagoAte, setPagoAte] = useState(hojeMaisDias(30))
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)
    setErro('')
    try {
      flash.texto = 'Acesso criado. O aluno recebeu um e-mail para criar a senha.'
      ir('/aluno/' + (await darAcessoAoApp(id, { email: email.trim(), pagoAte })))
    } catch (err) {
      flash.texto = ''
      setErro(err instanceof Error ? err.message : 'Não foi possível dar acesso.')
      setEnviando(false)
    }
  }

  return (
    <div className="mb-4 space-y-3">
      <Aviso>Aluno presencial: você anota as cargas em Ver semanas.</Aviso>
      {aberto ? (
        <Cartao className="max-w-md">
          <form onSubmit={enviar} className="space-y-3">
            <Campo rotulo="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Campo rotulo="Pago até" type="date" required value={pagoAte} onChange={(e) => setPagoAte(e.target.value)} />
            {erro && <Aviso>{erro}</Aviso>}
            <div className="flex gap-2">
              <Botao tipo="primario" type="submit" disabled={enviando}>{enviando ? 'Criando…' : 'Criar acesso'}</Botao>
              <Botao type="button" onClick={() => setAberto(false)}>Cancelar</Botao>
            </div>
          </form>
        </Cartao>
      ) : (
        <Botao onClick={() => setAberto(true)}>Dar acesso ao app</Botao>
      )}
    </div>
  )
}
