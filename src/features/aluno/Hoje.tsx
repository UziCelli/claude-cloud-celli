import { collection, query, where } from 'firebase/firestore'
import { useState, type ReactNode } from 'react'
import { prescreverSessao, type Meso } from '../../engine'
import type { RegistroDoc } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'
import { ir } from '../../rota'
import { Botao, Centro } from '../../ui'
import { fmt, fmtData } from '../coach/semana/format'
import { mesoAtual } from './mesoAtual'
import type { MesoSalvo } from '../../lib/conversores'

const Msg = ({ children }: { children: ReactNode }) => <p className="mt-10 text-center text-slate-400">{children}</p>

export default function Hoje({ uid }: { uid: string }) {
  const { dados: mesos, carregando } = useLista<MesoSalvo>(query(collection(db, 'mesos'), where('alunoId', '==', uid)))
  if (carregando) return <Centro>Carregando…</Centro>

  const atual = mesoAtual(mesos)
  if (!atual) return <Msg>Seu coach ainda não montou seu treino.</Msg>
  const { doc, meso, estado } = atual

  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <h1 className="mb-1 text-lg font-bold">{doc.nome}</h1>
      {estado.estado === 'antes' && <Msg>Começa em {fmtData(meso.inicio)}.</Msg>}
      {estado.estado === 'depois' && <Msg>Mesociclo concluído — fale com seu coach.</Msg>}
      {estado.estado === 'durante' && <Semana uid={uid} mesoId={doc.id} meso={meso} semanaInicial={estado.semana} />}
    </main>
  )
}

type RegistroFlag = RegistroDoc & { realizado?: boolean }

function Semana({ uid, mesoId, meso, semanaInicial }: { uid: string; mesoId: string; meso: Meso; semanaInicial: number }) {
  const [semana, setSemana] = useState(semanaInicial)
  const { dados: registros } = useLista<RegistroFlag>(
    query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', mesoId)),
  )
  const feitos = new Set(registros.filter((r) => r.realizado).map((r) => `${r.semana}-${r.treino}`))

  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-4">
        <Botao disabled={semana <= 1} onClick={() => setSemana((s) => s - 1)}>
          ←
        </Botao>
        <span className="font-semibold">
          Semana {semana} de {meso.semanas}
        </span>
        <Botao disabled={semana >= meso.semanas} onClick={() => setSemana((s) => s + 1)}>
          →
        </Botao>
      </div>
      <div className="space-y-3">
        {Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((treino) => {
          const sessao = prescreverSessao(meso, semana, treino)
          if (!sessao) return null
          return (
            <button
              key={treino}
              onClick={() => ir(`/treino/${mesoId}/${semana}/${treino}`)}
              className="flex w-full min-h-[64px] items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 text-left active:bg-slate-800"
            >
              <div className="min-w-0">
                <div className="font-semibold">
                  Treino {treino} {feitos.has(`${semana}-${treino}`) && <span className="text-emerald-400">✓</span>}
                </div>
                <div className="text-xs text-slate-400">
                  {sessao.exercicios.length} exercícios · ~{fmt(sessao.tempoMin)} min
                </div>
              </div>
              <span className="text-slate-600">›</span>
            </button>
          )
        })}
      </div>
    </>
  )
}
