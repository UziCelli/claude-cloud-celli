import { useEffect, useMemo, useRef, useState } from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import type { Meso } from '../../../engine'
import { salvarMeso } from '../../../lib/acoes'
import { docParaMeso, type MesoSalvo, type RegistroDoc, docsParaRegistros } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { useDoc, useLista } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { Botao, Campo, Pagina } from '../../../ui'
import Preview from './Preview'
import TabDivisao from './TabDivisao'
import TabMetodos from './TabMetodos'
import TabProgressao from './TabProgressao'
import { redimensionar } from './util'

const ABAS = ['config', 'divisao', 'progressao', 'metodos'] as const
type Aba = (typeof ABAS)[number]
const TITULO_ABA: Record<Aba, string> = { config: 'Config', divisao: 'Divisão', progressao: 'Progressão', metodos: 'Métodos' }

export default function EditorMeso({ id }: { id: string }) {
  const ref = useMemo(() => doc(db, 'mesos', id), [id])
  const mesoDoc = useDoc<MesoSalvo>(ref)
  const registrosQ = useMemo(() => query(collection(db, 'registros'), where('mesoId', '==', id)), [id])
  const registrosDocs = useLista<RegistroDoc>(registrosQ)
  const registros = useMemo(() => docsParaRegistros(registrosDocs.dados), [registrosDocs.dados])

  const carregado = useRef(false)
  const [meso, setMeso] = useState<Meso | null>(null)
  const [nome, setNome] = useState('')
  const [alunoId, setAlunoId] = useState('')
  const [dirty, setDirty] = useState(false)
  const [aba, setAba] = useState<Aba>('config')
  const [semana, setSemana] = useState(1)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    if (carregado.current || !mesoDoc.dados) return
    carregado.current = true
    setMeso(docParaMeso(mesoDoc.dados))
    setNome(mesoDoc.dados.nome)
    setAlunoId(mesoDoc.dados.alunoId)
  }, [mesoDoc.dados])

  if (mesoDoc.carregando || !meso) return <Pagina titulo="Carregando…">{null}</Pagina>

  function atualizar(patch: Partial<Meso>) {
    setMeso((m) => (m ? { ...m, ...patch } : m))
    setDirty(true)
  }

  function salvar() {
    if (!meso) return
    setDirty(false)
    setErro(null)
    salvarMeso(id, alunoId, nome, meso).gravado.catch(() => setErro('Não foi possível salvar. Tentando de novo quando houver internet.'))
  }

  function setFrequencia(n: number) {
    atualizar({ frequencia: n, divisao: redimensionar(meso!.divisao, n, () => []) })
  }

  function setSemanas(n: number) {
    atualizar({
      semanas: n,
      progressao: {
        principais: redimensionar(meso!.progressao.principais, n, () => Array(6).fill(null)),
        auxiliares: redimensionar(meso!.progressao.auxiliares, n, () => Array(6).fill(null)),
      },
    })
    if (semana > n) setSemana(n)
  }

  const status = dirty ? 'Alterações não salvas' : mesoDoc.pendente ? 'Salvando… será enviado quando houver internet' : 'Salvo'

  return (
    <Pagina
      titulo={
        <input
          value={nome}
          onChange={(e) => {
            setNome(e.target.value)
            setDirty(true)
          }}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-2xl font-bold text-slate-100 outline-none focus:border-orange-500"
        />
      }
      acoes={
        <>
          <span className="self-center text-sm text-slate-400">{status}</span>
          <Botao tipo="primario" disabled={!dirty} onClick={salvar}>
            Salvar
          </Botao>
          <Botao onClick={() => ir(`/meso/${id}/semana/1`)}>Ver semanas</Botao>
        </>
      }
    >
      {erro && <p className="mb-3 text-sm text-red-400">{erro}</p>}
      <div className="mb-4 flex gap-2 border-b border-slate-800 pb-2">
        {ABAS.map((a) => (
          <button
            key={a}
            onClick={() => setAba(a)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${aba === a ? 'bg-orange-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            {TITULO_ABA[a]}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <Preview meso={meso} semana={semana} onSemana={setSemana} />
      </div>

      {aba === 'config' && (
        <div className="grid max-w-md gap-3">
          <Campo
            rotulo="Frequência (treinos/semana)"
            type="number"
            min={2}
            max={7}
            value={meso.frequencia}
            onChange={(e) => setFrequencia(Math.min(7, Math.max(2, Number(e.target.value) || 2)))}
          />
          <Campo
            rotulo="Semanas"
            type="number"
            min={1}
            max={12}
            value={meso.semanas}
            onChange={(e) => setSemanas(Math.min(12, Math.max(1, Number(e.target.value) || 1)))}
          />
          <Campo rotulo="Início" type="date" value={meso.inicio} onChange={(e) => atualizar({ inicio: e.target.value })} />
          <Campo
            rotulo="Pausa entre séries (s)"
            type="number"
            min={0}
            value={meso.pausaS}
            onChange={(e) => atualizar({ pausaS: Number(e.target.value) || 0 })}
          />
        </div>
      )}

      {aba === 'divisao' && <TabDivisao meso={meso} registros={registros} onAtualizar={atualizar} />}
      {aba === 'progressao' && <TabProgressao meso={meso} onAtualizar={atualizar} />}
      {aba === 'metodos' && <TabMetodos meso={meso} onAtualizar={atualizar} />}
    </Pagina>
  )
}
