import { m } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import type { Usuario } from '../../../lib/acesso'
import { darAcessoAoApp, duplicarMeso, excluirMeso, salvarMeso } from '../../../lib/acoes'
import { registrarErro } from '../../../lib/log'
import { docParaMeso, type MesoSalvo } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { TEXTO_SEM_INTERNET, useDoc, useLista, useSemInternet } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { IcPlay } from '../../../icones'
import { Aviso, Botao, Campo, campoBase, Cartao, cascata, flash, item, Msg, Pagina, Painel } from '../../../ui'
import { hojeMaisDias } from '../../../lib/acesso'
import { cicloTerminou } from '../../../lib/relatorio'
import ImportarPlanilha from './ImportarPlanilha'
import { mesoPadrao } from './mesoPadrao'

const dataBr = (iso: string) => {
  const [a, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}/${a}`
}

export default function MesosDoAluno({ uid }: { uid: string }) {
  const aluno = useDoc<Usuario>(doc(db, 'usuarios', uid))
  const mesosQ = useMemo(() => query(collection(db, 'mesos'), where('alunoId', '==', uid)), [uid])
  const mesos = useLista<MesoSalvo>(mesosQ)
  const semInternet = useSemInternet()
  const [erro, setErro] = useState<string | null>(null)
  const [importando, setImportando] = useState(false)
  const [aviso] = useState(() => {
    const t = flash.texto
    flash.texto = ''
    return t
  })

  const criando = useRef(false)

  function novoMeso() {
    if (criando.current) return
    criando.current = true
    setErro(null)
    const { id, gravado } = salvarMeso(null, uid, `Mesociclo ${mesos.dados.length + 1}`, mesoPadrao())
    ir(`/meso/${id}`)
    gravado.catch((e) => {
      registrarErro('gravacao', `novo meso: ${e?.code ?? e}`, e)
      setErro('Não foi possível salvar o novo mesociclo.')
      criando.current = false
    })
  }

  if (!aluno.carregando && !aluno.dados && !aluno.cache) // só com a resposta do servidor: offline sem cache não é "não encontrado"
    return (
      <Pagina titulo="Aluno não encontrado.">
        <a href="#/alunos" className="text-marca-500 underline">Voltar para os alunos</a>
      </Pagina>
    )

  return (
    <Pagina
      titulo={`Mesociclos de ${aluno.dados?.nome ?? '…'}`}
      acoes={
        <>
          <Botao onClick={() => ir(`/aluno/${uid}/evolucao`)}>Evolução</Botao>
          <Botao tipo="destaque" className="inline-flex items-center gap-1.5" onClick={() => ir(`/aluno/${uid}/presencial`)}>
            <IcPlay className="size-4" />
            Treino presencial
          </Botao>
          <Botao onClick={() => setImportando((v) => !v)}>Importar da planilha</Botao>
          <Botao tipo="primario" onClick={novoMeso}>Novo mesociclo</Botao>
        </>
      }
    >
      <Msg>{aviso && <p className="mb-3 text-sm text-green-400">{aviso}</p>}</Msg>
      {aluno.dados?.presencial && <DarAcesso id={uid} />}
      <Painel aberto={importando}>
        {importando && <ImportarPlanilha uid={uid} qtdMesos={mesos.dados.length} onFechar={() => setImportando(false)} />}
      </Painel>
      <Msg>{erro && <p className="mb-3 text-sm text-red-400">{erro}</p>}</Msg>
      {mesos.carregando && <p className="text-slate-400">Carregando…</p>}
      {!mesos.carregando && mesos.dados.length === 0 && <p className="text-slate-400">{semInternet ? TEXTO_SEM_INTERNET : 'Nenhum mesociclo ainda.'}</p>}
      <m.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" variants={cascata} initial="hidden" animate="show">
        {mesos.dados.map((d) => (
          <m.div key={d.id} variants={item}>
            <CartaoMeso meso={d} />
          </m.div>
        ))}
      </m.div>
    </Pagina>
  )
}

function CartaoMeso({ meso }: { meso: MesoSalvo & { id: string } }) {
  const [aberto, setAberto] = useState<'duplicar' | 'excluir' | null>(null)
  const alternar = (q: 'duplicar' | 'excluir') => setAberto((v) => (v === q ? null : q))
  return (
    <Cartao>
      <h2 className="font-semibold">{meso.nome}</h2>
      <p className="mt-1 text-sm text-slate-400">
        {meso.frequencia}x/semana · {meso.semanas} semanas · início {dataBr(meso.inicio)}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Botao onClick={() => ir(`/meso/${meso.id}`)}>Editar</Botao>
        <Botao onClick={() => ir(`/meso/${meso.id}/semana/1`)}>Ver semanas</Botao>
        {cicloTerminou(docParaMeso(meso), new Date()) && <Botao onClick={() => ir(`/meso/${meso.id}/relatorio`)}>Relatório</Botao>}
        <Botao onClick={() => alternar('duplicar')}>Duplicar</Botao>
        <Botao tipo="perigo" onClick={() => alternar('excluir')}>Excluir</Botao>
      </div>
      <Painel aberto={aberto === 'duplicar'}>
        <FormDuplicar mesoId={meso.id} onFechar={() => setAberto(null)} />
      </Painel>
      <Painel aberto={aberto === 'excluir'}>
        <ConfirmarExclusao meso={meso} onFechar={() => setAberto(null)} />
      </Painel>
    </Cartao>
  )
}

function ConfirmarExclusao({ meso, onFechar }: { meso: MesoSalvo & { id: string }; onFechar: () => void }) {
  const regsQ = useMemo(() => query(collection(db, 'registros'), where('mesoId', '==', meso.id)), [meso.id])
  const treinos = useLista(regsQ).dados.length
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  function excluir() {
    setEnviando(true)
    setErro(null)
    // Sucesso: o cartão some da lista sozinho.
    excluirMeso(meso.id).catch(() => {
      setErro('Não foi possível excluir. Confira a internet e tente de novo.')
      setEnviando(false)
    })
  }

  return (
    <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">
      <p className="text-sm">Tem certeza que quer excluir “{meso.nome}”? Não dá para desfazer.</p>
      {treinos > 0 && (
        <Aviso>
          O aluno já registrou {treinos} treino{treinos === 1 ? '' : 's'} neste mesociclo. As cargas também serão apagadas.
        </Aviso>
      )}
      <Msg>{erro && <p className="text-sm text-red-400">{erro}</p>}</Msg>
      <div className="flex flex-wrap gap-2">
        <Botao tipo="perigo" disabled={enviando} carregando={enviando} onClick={excluir}>
          {enviando ? 'Excluindo…' : 'Sim, excluir'}
        </Botao>
        <Botao onClick={onFechar}>Cancelar</Botao>
      </div>
    </div>
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
      gravado.catch((e) => {
        registrarErro('gravacao', `duplicar meso: ${e?.code ?? e}`, e)
        setErro('Não foi possível duplicar o mesociclo.')
      })
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
          className={`${campoBase} px-3 py-2`}
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
      <Msg>{erro && <p className="text-sm text-red-400">{erro}</p>}</Msg>
      <div className="flex flex-wrap gap-2">
        <Botao tipo="primario" disabled={!alunoId || !nome.trim() || enviando} carregando={enviando} onClick={confirmar}>
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
      <Painel aberto={aberto}>
        <Cartao className="max-w-md">
          <form onSubmit={enviar} className="space-y-3">
            <Campo rotulo="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Campo rotulo="Pago até" type="date" required value={pagoAte} onChange={(e) => setPagoAte(e.target.value)} />
            <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
            <div className="flex gap-2">
              <Botao tipo="primario" type="submit" disabled={enviando} carregando={enviando}>{enviando ? 'Criando…' : 'Criar acesso'}</Botao>
              <Botao type="button" onClick={() => setAberto(false)}>Cancelar</Botao>
            </div>
          </form>
        </Cartao>
      </Painel>
      <Painel aberto={!aberto}>
        <Botao onClick={() => setAberto(true)}>Dar acesso ao app</Botao>
      </Painel>
    </div>
  )
}
