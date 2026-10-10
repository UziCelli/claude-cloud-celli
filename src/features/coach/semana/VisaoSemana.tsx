import { useEffect, useRef } from 'react'
import { collection, doc, query, where, type Timestamp } from 'firebase/firestore'
import { prescreverSessao } from '../../../engine'
import { marcarRealizado } from '../../../lib/acoes'
import { docParaMeso, docsParaRegistros, docsParaRegistrosReps, type MesoSalvo, type RegistroDoc } from '../../../lib/conversores'
import { diaSP } from '../../../lib/acesso'
import { treinoValido } from '../../../lib/resumo'
import { comVolta } from '../../../lib/agenda'
import { db } from '../../../lib/firebase'
import { useDoc, useLista } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { Botao, Centro, Deslizar, Msg, Pagina } from '../../../ui'
import EvolucaoCoach from './EvolucaoCoach'
import { fmtData } from './format'
import Monitoramento from './Monitoramento'
import SessaoCard from './SessaoCard'

type RegistroDocCompleto = RegistroDoc & { realizado?: boolean; pc?: Record<string, number>; inicioEm?: Timestamp | null; realizadoEm?: Timestamp | null; atualizadoEm?: Timestamp | null }

export default function VisaoSemana({ id, semana }: { id: string; semana: number }) {
  const { dados, carregando } = useDoc<MesoSalvo>(doc(db, 'mesos', id))
  const { dados: docsRegistros, pendente } = useLista<RegistroDocCompleto>(
    query(collection(db, 'registros'), where('mesoId', '==', id)),
  )

  // Treinos de hoje (dia de São Paulo) desta semana: feito ou em andamento.
  const hoje = diaSP(Date.now())
  const deHoje: Record<number, 'feito' | 'andamento'> = {}
  for (const d of docsRegistros)
    if (d.semana === semana && treinoValido(d) && [d.realizadoEm, d.atualizadoEm].some((t) => t && diaSP(t.toMillis()) === hoje))
      deHoje[d.treino] = d.realizado ? 'feito' : 'andamento'
  const primeiro = Math.min(...Object.keys(deHoje).map(Number))
  // Rola uma vez por semana até o primeiro cartão destacado (os registros chegam depois da montagem).
  const rolou = useRef<number | null>(null)
  useEffect(() => {
    if (!Number.isFinite(primeiro) || rolou.current === semana) return
    const el = document.querySelector(`[data-treino="${primeiro}"]`)
    if (!el) return
    rolou.current = semana
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [semana, primeiro, carregando])

  if (carregando) return <Centro>Carregando…</Centro>
  if (!dados) return <Centro>Meso não encontrado.</Centro>

  const meso = comVolta(docParaMeso(dados), docsRegistros, new Date()) // prescrito = o que o aluno viu (semana de volta −5%)
  const registros = docsParaRegistros(docsRegistros, meso)
  const reps = docsParaRegistrosReps(docsRegistros)
  const realizados = Object.fromEntries(docsRegistros.map((d) => [`${d.semana}-${d.treino}`, !!d.realizado]))

  const tempos = Object.fromEntries(docsRegistros.map((d) => [`${d.semana}-${d.treino}`, d]))
  const semanaAtual = Math.min(Math.max(1, semana), meso.semanas)
  const primeiraSessao = prescreverSessao(meso, semanaAtual, 1)

  return (
    <Pagina
      titulo={
        <div>
          <div>{dados.nome}</div>
          {primeiraSessao && <div className="text-sm font-normal text-slate-400">Início {fmtData(primeiraSessao.inicioSemana)}</div>}
        </div>
      }
      acoes={
        <>
          <Botao onClick={() => ir('/meso/' + id)}>Editar meso</Botao>
          <Botao onClick={() => ir('/aluno/' + dados.alunoId)}>Ver aluno</Botao>
        </>
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        <Botao disabled={semanaAtual <= 1} onClick={() => ir(`/meso/${id}/semana/${semanaAtual - 1}`)}>
          ← Semana
        </Botao>
        <span className="font-semibold">
          Semana {semanaAtual} de {meso.semanas}
        </span>
        <Botao disabled={semanaAtual >= meso.semanas} onClick={() => ir(`/meso/${id}/semana/${semanaAtual + 1}`)}>
          Semana →
        </Botao>
        <Msg className="ml-2">{pendente && <span className="text-xs text-amber-400">sincronizando…</span>}</Msg>
      </div>

      <Deslizar chave={semanaAtual}>
      <div className="space-y-4">
        {Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((treino) => {
          const sessao = prescreverSessao(meso, semanaAtual, treino)
          if (!sessao) return null
          const chave = `${semanaAtual}-${treino}`
          return (
            <div key={treino} data-treino={treino}>
            <SessaoCard
              mesoId={id}
              alunoId={dados.alunoId}
              sessao={sessao}
              cargas={registros[chave] ?? {}}
              reps={reps[chave] ?? {}}
              pc={tempos[chave]?.pc}
              realizado={!!realizados[chave]}
              inicioEm={tempos[chave]?.inicioEm}
              realizadoEm={tempos[chave]?.realizadoEm}
              limite={meso.tempoLimiteMin}
              hoje={deHoje[treino]}
              onRealizado={(v) => marcarRealizado(id, dados.alunoId, semanaAtual, treino, v)}
            />
            </div>
          )
        })}
      </div>
      </Deslizar>

      <div className="mt-6 space-y-4">
        <Monitoramento meso={meso} registros={registros} reps={reps} />
        <EvolucaoCoach meso={meso} registros={registros} reps={reps} />
      </div>
    </Pagina>
  )
}
