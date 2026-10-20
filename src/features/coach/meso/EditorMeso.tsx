import { AnimatePresence, m } from 'motion/react'
import { agil, saida, suave } from '../../../movimento'
import { useEffect, useMemo, useRef, useState } from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import { migrarProgressao } from '../../../engine'
import type { Meso } from '../../../engine'
import { marcarAdaptado, salvarMeso } from '../../../lib/acoes'
import { registrarErro } from '../../../lib/log'
import { avisarTreinoPronto } from '../../../lib/push'
import { docParaMeso, type MesoSalvo, type RegistroDoc, docsParaRegistros } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { TEXTO_SEM_INTERNET, useDoc, useLista, useSemInternet } from '../../../lib/hooks'
import { ir, protegerSaida } from '../../../rota'
import { Aviso, Botao, Campo, Msg, Pagina } from '../../../ui'
import Preview from './Preview'
import { LinhaAcima, treinosAcima } from './SugestaoTempo'
import TabDivisao from './TabDivisao'
import TabMetodos from './TabMetodos'
import TabProgressao from './TabProgressao'
import { redimensionar } from './util'

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

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
  const semInternet = useSemInternet()
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
  const [aviso, setAviso] = useState('')

  // Acompanha o documento remoto: sem edições locais, recarrega; com edições, avisa do conflito
  // (evita que uma aba antiga sobrescreva mudanças feitas em outra aba/aparelho).
  useEffect(() => {
    const d = mesoDoc.dados
    if (!d) return
    const { atualizadoEm: _a, criadoEm: _c, adaptadoEm: _d, ...resto } = d as MesoSalvo & { atualizadoEm?: unknown; criadoEm?: unknown }
    const json = estavel(resto)
    if (json === base.current) {
      setConflito(false)
      return
    }
    if (dirty) return setConflito(true)
    base.current = json
    setMeso(migrarProgressao(docParaMeso(d)))
    setNome(d.nome)
    setAlunoId(d.alunoId)
    setConflito(false)
  }, [mesoDoc.dados, dirty])

  // Avisa ao sair da tela (menu, abas, voltar, fechar a aba) com mudanças não salvas.
  useEffect(() => {
    protegerSaida(dirty ? 'Sair sem salvar as mudanças?' : null)
    return () => protegerSaida(null)
  }, [dirty])

  if (!mesoDoc.carregando && !mesoDoc.dados && !meso)
    return (
      <Pagina titulo={semInternet ? TEXTO_SEM_INTERNET : 'Mesociclo não encontrado.'}>
        <a href="#/alunos" className="text-marca-500 underline">Voltar para os alunos</a>
      </Pagina>
    )
  if (mesoDoc.carregando || !meso) return <Pagina titulo="Carregando…">{null}</Pagina>

  function atualizar(patch: Partial<Meso>) {
    setMeso((m) => (m ? { ...m, ...patch } : m))
    setDirty(true)
  }

  function salvar(novo = meso, adaptou = false) {
    if (!novo || diasInvalidos(novo)) return
    if (novo !== meso) setMeso(novo)
    setDirty(false)
    setErro(null)
    const g = salvarMeso(id, alunoId, nome, novo).gravado
    if (adaptou) g.then(() => marcarAdaptado(id)).catch(() => {})
    g.catch((e) => {
      registrarErro('gravacao', `salvar meso: ${e?.code ?? e}`, e)
      // Gravação recusada: o snapshot volta à versão do servidor; devolve a edição para tentar de novo.
      setMeso(novo)
      setDirty(true)
      setErro('Não foi possível salvar. Confira a internet e tente de novo.')
    })
  }

  // Há carga registrada em algum treino/semana que satisfaz o filtro?
  const temCargas = (filtro: (w: number, t: number) => boolean) =>
    Object.entries(registros).some(([k, c]) => {
      const [w, t] = k.split('-').map(Number)
      return filtro(w, t) && Object.values(c).some((a) => a.some((x) => x != null))
    })
  const AVISO_CORTE = 'já têm cargas registradas. Elas ficam guardadas, mas deixam de aparecer. Continuar?'

  // "Dias de treino" é opcional; se usado, tem de ter exatamente `frequencia` dias.
  const diasInvalidos = (x: Meso) => !!x.dias?.length && x.dias.length !== x.frequencia
  const alternarDia = (d: number) => {
    const atual = meso!.dias ?? []
    const novo = (atual.includes(d) ? atual.filter((x) => x !== d) : [...atual, d]).sort((a, b) => a - b)
    atualizar({ dias: novo.length ? novo : undefined })
  }

  function setFrequencia(n: number) {
    if (n < meso!.frequencia && temCargas((_, t) => t > n) && !confirm(`Os treinos removidos ${AVISO_CORTE}`)) return
    atualizar({ frequencia: n, dias: undefined, divisao: redimensionar(meso!.divisao, n, () => []) })
  }

  const linhas = (l: (number | null)[][], n: number) => redimensionar(l, n, () => Array(6).fill(null))

  function setSemanas(n: number) {
    if (n < meso!.semanas && temCargas((w) => w > n) && !confirm(`As semanas removidas ${AVISO_CORTE}`)) return
    atualizar({
      semanas: n,
      progressao: {
        principais: linhas(meso!.progressao.principais, n),
        auxiliares: linhas(meso!.progressao.auxiliares, n),
        ...(meso!.progressao.padrao && { padrao: linhas(meso!.progressao.padrao, n) }),
      },
      ...(meso!.progressaoExercicio && {
        progressaoExercicio: Object.fromEntries(Object.entries(meso!.progressaoExercicio).map(([k, v]) => [k, linhas(v, n)])),
      }),
    })
    if (semana > n) setSemana(n)
  }

  const acima = treinosAcima(meso)
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
          <Botao tipo="primario" disabled={!dirty || diasInvalidos(meso) || !nome.trim() || !meso.inicio} onClick={() => salvar()}>
            Salvar
          </Botao>
          <Botao onClick={() => ir(`/meso/${id}/semana/1`)}>Ver semanas</Botao>
          <Botao
            disabled={dirty || mesoDoc.pendente || !alunoId || aviso === 'Enviando…'}
            onClick={async () => {
              setAviso('Enviando…')
              const r = await avisarTreinoPronto(alunoId)
              setAviso(r === 'enviado' ? 'Aviso enviado' : r === 'sem-notificacoes' ? 'O aluno ainda não ativou as notificações' : 'Não foi possível enviar')
            }}
          >
            Avisar aluno: treino pronto
          </Botao>
        </>
      }
    >
      <Msg>{erro && <p className="mb-3 text-sm text-red-400">{erro}</p>}</Msg>
      <Msg>{aviso && <p className="mb-3 text-sm text-slate-300" role="status">{aviso}</p>}</Msg>
      <Msg>
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
      </Msg>
      <Msg>
        {acima.length > 0 && (
          <div className="mb-3">
            <Aviso>
              <p className="mb-2 font-semibold">Treinos acima do tempo</p>
              <div className="space-y-3">
                {acima.map((a) => (
                  <LinhaAcima key={a.treino} meso={meso} acima={a} onAplicar={(novo) => salvar(novo, true)} />
                ))}
              </div>
            </Aviso>
          </div>
        )}
      </Msg>
      <div className="mb-4 flex gap-2 overflow-x-auto border-b border-slate-800 pb-2">
        {ABAS.map((a) => (
          <button
            key={a}
            onClick={() => setAba(a)}
            className={`relative shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold ${aba === a ? 'text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            {aba === a && (
              <m.span
                layoutId="aba-ativa"
                className="absolute inset-0 rounded-lg bg-marca-500"
                transition={agil}
              />
            )}
            <span className="relative">{TITULO_ABA[a]}</span>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <Preview meso={meso} semana={semana} onSemana={setSemana} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={aba}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0, transition: suave }}
          exit={{ opacity: 0, transition: saida }}
        >
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
          <fieldset>
            <legend className="mb-1 text-sm text-slate-300">Dias de treino (opcional)</legend>
            <div className="grid grid-cols-7 gap-1.5">
              {DIAS_SEMANA.map((n, d) => {
                const on = !!meso.dias?.includes(d)
                return (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={on}
                    onClick={() => alternarDia(d)}
                    className={`h-11 rounded-lg border text-sm font-semibold ${on ? 'border-marca-400 bg-marca-500 text-white' : 'border-slate-600 bg-slate-800 text-slate-300'}`}
                  >
                    {n}
                  </button>
                )
              })}
            </div>
            {diasInvalidos(meso) && (
              <p className="mt-1 text-sm text-red-400">
                Escolha exatamente {meso.frequencia} dias (um por treino). Hoje: {meso.dias!.length}.
              </p>
            )}
          </fieldset>
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
            rotulo="Pausa dos principais (exercícios 1 e 2), s"
            type="number"
            min={0}
            value={meso.pausaPrincipaisS ?? meso.pausaS}
            onChange={(e) => atualizar({ pausaPrincipaisS: Math.max(0, Number(e.target.value) || 0) })}
          />
          <Campo
            rotulo="Pausa dos auxiliares (exercício 3 em diante), s"
            type="number"
            min={0}
            value={meso.pausaS}
            onChange={(e) =>
              atualizar({
                pausaS: Math.max(0, Number(e.target.value) || 0),
                ...(meso.pausaPrincipaisS === undefined && { pausaPrincipaisS: meso.pausaS }),
              })
            }
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
        </m.div>
      </AnimatePresence>
    </Pagina>
  )
}
