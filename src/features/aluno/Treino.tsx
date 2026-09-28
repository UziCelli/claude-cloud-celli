import { collection, doc, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { prescreverSessao } from '../../engine'
import { marcarRealizado, registrarCarga, registrarReps } from '../../lib/acoes'
import { docParaMeso, docsParaRegistros, docsParaRegistrosReps, type MesoSalvo, type RegistroDoc } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useDoc, useLista } from '../../lib/hooks'
import { cargaAnterior } from '../../lib/treino'
import { ir } from '../../rota'
import { Botao, Centro } from '../../ui'
import { fmt, fmtData } from '../coach/semana/format'
import LoadInput from '../coach/semana/LoadInput'

type RegistroFlag = RegistroDoc & { realizado?: boolean }

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

// Contagem de descanso: Date.now() a cada tick, então funciona mesmo se o setInterval atrasar.
function useDescanso() {
  const [fimEm, setFimEm] = useState<number | null>(null)
  const [restante, setRestante] = useState(0)
  useEffect(() => {
    if (fimEm == null) return
    const tick = () => {
      const r = Math.max(0, Math.round((fimEm - Date.now()) / 1000))
      setRestante(r)
      if (r === 0) {
        navigator.vibrate?.([300, 150, 300])
        setFimEm(null)
      }
    }
    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [fimEm])
  return { ativo: fimEm != null, restante, iniciar: (segundos: number) => setFimEm(Date.now() + segundos * 1000), parar: () => setFimEm(null) }
}

export default function Treino({ uid, mesoId, semana, treino }: { uid: string; mesoId: string; semana: number; treino: number }) {
  const { dados, carregando } = useDoc<MesoSalvo>(doc(db, 'mesos', mesoId))
  const { dados: docsRegistros, pendente } = useLista<RegistroFlag>(
    query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', mesoId)),
  )
  const descanso = useDescanso()

  if (carregando) return <Centro>Carregando…</Centro>
  if (!dados) return <Centro>Treino não encontrado.</Centro>

  const meso = docParaMeso(dados)
  const sessao = prescreverSessao(meso, semana, treino)
  if (!sessao) return <Centro>Treino não encontrado.</Centro>

  const cargas = docsParaRegistros(docsRegistros)
  const repsFeitas = docsParaRegistrosReps(docsRegistros)
  const chave = `${semana}-${treino}`
  const cs = cargas[chave] ?? {}
  const rs = repsFeitas[chave] ?? {}
  const realizado = docsRegistros.some((r) => r.semana === semana && r.treino === treino && r.realizado)

  return (
    <main className="mx-auto max-w-md px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-4">
      <button onClick={() => ir('/')} className="mb-2 text-sm text-slate-400">
        ← Hoje
      </button>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg font-bold">Treino {treino}</h1>
          <p className="text-xs text-slate-400">
            Semana {semana} · ~{fmt(sessao.tempoMin)} min · pausa {sessao.pausaS}s · início {fmtData(sessao.inicioSemana)}
          </p>
        </div>
        {pendente && <span className="max-w-[40%] text-right text-xs text-amber-400">salvo no celular · envia quando tiver internet</span>}
      </div>

      <div className="space-y-4">
        {sessao.exercicios.map((e) => {
          const colunasCargas = cs[e.slot.slotId] ?? []
          const colunasReps = rs[e.slot.slotId] ?? []
          const anterior = cargaAnterior(meso, cargas, semana, treino, e.pos)
          return (
            <div key={e.slot.slotId} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="mb-2">
                <div className="font-semibold">{e.slot.nome}</div>
                {e.rotulo && <div className="mt-1 text-[11px] text-slate-400">{e.rotulo}</div>}
              </div>
              <div className="space-y-2">
                {e.reps.map((repAlvo, k) => {
                  const dropStage = k >= e.n
                  const rotuloCol = dropStage ? `D${k - e.n + 1}` : `S${k + 1}`
                  const placeholderKg = dropStage
                    ? (e.cargaSugerida[k] ?? null)
                    : anterior?.[k] != null
                      ? `sem. passada: ${fmt(anterior[k])} kg`
                      : null
                  return (
                    <div key={k} className="grid grid-cols-[1.75rem_3.25rem_minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-1.5">
                      <span className="text-xs text-slate-400">{rotuloCol}</span>
                      <span className="truncate text-xs text-slate-400">{repAlvo} reps</span>
                      <LoadInput
                        className="w-full min-w-0"
                        valor={colunasCargas[k] ?? null}
                        placeholder={placeholderKg}
                        onSalvar={(v) => {
                          registrarCarga(mesoId, uid, semana, treino, e.slot.slotId, k, v)
                          if (v != null && !dropStage) descanso.iniciar(meso.pausaS)
                        }}
                      />
                      <span className="text-xs text-slate-600">kg</span>
                      <LoadInput
                        className="w-full min-w-0"
                        valor={colunasReps[k] ?? null}
                        placeholder={repAlvo}
                        onSalvar={(v) => registrarReps(mesoId, uid, semana, treino, e.slot.slotId, k, v)}
                      />
                      <span className="text-xs text-slate-600">feitas</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        {realizado ? (
          <div className="space-y-2 text-center">
            <p className="font-semibold text-emerald-400">Treino concluído ✓</p>
            <Botao onClick={() => marcarRealizado(mesoId, uid, semana, treino, false)}>Desfazer</Botao>
          </div>
        ) : (
          <Botao
            tipo="primario"
            className="w-full py-4 text-base"
            onClick={() => {
              marcarRealizado(mesoId, uid, semana, treino, true)
              ir('/')
            }}
          >
            Concluir treino
          </Botao>
        )}
      </div>

      {descanso.ativo && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-800 bg-slate-900 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
          <div className="mx-auto flex max-w-md items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">Descanso</div>
              <div className="text-2xl font-bold tabular-nums">{mmss(descanso.restante)}</div>
            </div>
            <Botao onClick={descanso.parar}>Pular</Botao>
          </div>
        </div>
      )}
    </main>
  )
}
