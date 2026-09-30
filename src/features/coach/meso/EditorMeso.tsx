import { useEffect, useMemo, useRef, useState } from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import type { Meso } from '../../../engine'
import { salvarMeso } from '../../../lib/acoes'
import { docParaMeso, type MesoSalvo, type RegistroDoc, docsParaRegistros } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { useDoc, useLista } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { Aviso, Botao, Campo, Pagina } from '../../../ui'
import Preview from './Preview'
import TabDivisao from './TabDivisao'
import TabMetodos from './TabMetodos'
import TabProgressao from './TabProgressao'
import { redimensionar } from './util'

const ABAS = ['config', 'divisao', 'progressao', 'metodos'] as const
type Aba = (typeof ABAS)[number]
const TITULO_ABA: Record<Aba, string> = { config: 'Config', divisao: 'Divisão', progressao: 'Progressão', metodos: 'Métodos' }

// JSON com chaves ordenadas: o servidor pode devolver os mapas em outra ordem.
const estavel = (v: unknown) =>
  JSON.stringify(v, (_, x) =>
    x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => (a < b ? -1 : 1))) : x,
  )

export default function EditorMeso({ id }: { id: string }) {
  const ref = useMemo(() => doc(db, 'mesos', id), [id])
  const mesoDoc = useDoc<MesoSalvo>(ref)
  const registrosQ = useMemo(() => query(collection(db, 'registros'), where('mesoId', '==', id)), [id])
  const registrosDocs = useLista<RegistroDoc>(registrosQ)
  const registros = useMemo(() => docsParaRegistros(registrosDocs.dados), [registrosDocs.dados])

  const base = useRef('') // versão remota que o editor carregou (sem carimbos de data)
  const [conflito, setConflito] = useState(false)
  const [meso, setMeso] = useState<Meso | null>(null)
  const [nome, setNome] = useState('')
  const [alunoId, setAlunoId] = useState('')
  const [dirty, setDirty] = useState(false)
  const [aba, setAba] = useState<Aba>('config')
  const [semana, setSemana] = useState(1)
  const [erro, setErro] = useState<string | null>(null)

  // Acompanha o documento remoto: sem edições locais, recarrega; com edições, avisa do conflito
  // (evita que uma aba antiga sobrescreva mudanças feitas em outra aba/aparelho).
  useEffect(() => {
    const d = mesoDoc.dados
    if (!d) return
    const { atualizadoEm: _a, criadoEm: _c, ...resto } = d as MesoSalvo & { atualizadoEm?: unknown; criadoEm?: unknown }
    const json = estavel(resto)
    if (json === base.current) return
    if (dirty) return setConflito(true)
    base.current = json
    setMeso(docParaMeso(d))
    setNome(d.nome)
    setAlunoId(d.alunoId)
    setConflito(false)
  }, [mesoDoc.dados, dirty])

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

  // Há carga registrada em algum treino/semana que satisfaz o filtro?
  const temCargas = (filtro: (w: number, t: number) => boolean) =>
    Object.entries(registros).some(([k, c]) => {
      const [w, t] = k.split('-').map(Number)
      return filtro(w, t) && Object.values(c).some((a) => a.some((x) => x != null))
    })
  const AVISO_CORTE = 'já têm cargas registradas. Elas ficam guardadas, mas deixam de aparecer. Continuar?'

  function setFrequencia(n: number) {
    if (n < meso!.frequencia && temCargas((_, t) => t > n) && !confirm(`Os treinos removidos ${AVISO_CORTE}`)) return
    atualizar({ frequencia: n, divisao: redimensionar(meso!.divisao, n, () => []) })
  }

  function setSemanas(n: number) {
    if (n < meso!.semanas && temCargas((w) => w > n) && !confirm(`As semanas removidas ${AVISO_CORTE}`)) return
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
          className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-2xl font-bold text-slate-100 outline-none focus:border-marca-500"
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
      {conflito && (
        <div className="mb-3">
          <Aviso>
            Este mesociclo foi alterado em outra aba ou aparelho. Salvar agora substitui aquela versão.{' '}
            <button className="underline" onClick={() => setDirty(false)}>
              Descartar minhas mudanças e carregar a versão atual
            </button>
          </Aviso>
        </div>
      )}
      <div className="mb-4 flex gap-2 overflow-x-auto border-b border-slate-800 pb-2">
        {ABAS.map((a) => (
          <button
            key={a}
            onClick={() => setAba(a)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold ${aba === a ? 'bg-marca-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
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
          <Campo
            rotulo="Progressão por semana (%)"
            type="number"
            min={0}
            value={meso.progressaoPct ?? 5}
            onChange={(e) => atualizar({ progressaoPct: Math.max(0, Number(e.target.value) || 0) })}
          />
          <Campo
            rotulo="Limite de reps por série"
            type="number"
            min={1}
            value={meso.limiteReps ?? 15}
            onChange={(e) => atualizar({ limiteReps: Math.max(1, Number(e.target.value) || 1) })}
          />
          <Campo
            rotulo="Tempo limite do aluno (min) — vazio = sem aviso"
            type="number"
            min={1}
            value={meso.tempoLimiteMin ?? ''}
            onChange={(e) => atualizar({ tempoLimiteMin: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </div>
      )}

      {aba === 'divisao' && <TabDivisao meso={meso} registros={registros} onAtualizar={atualizar} />}
      {aba === 'progressao' && <TabProgressao meso={meso} onAtualizar={atualizar} />}
      {aba === 'metodos' && <TabMetodos meso={meso} onAtualizar={atualizar} />}
    </Pagina>
  )
}
