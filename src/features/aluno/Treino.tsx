import { collection, doc, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { prescreverSessao } from '../../engine'
import { marcarRealizado, registrarCarga, registrarPc, registrarReps, salvarNota, salvarPeso } from '../../lib/acoes'
import type { Usuario } from '../../lib/acesso'
import { fracaoPC } from '../../lib/pesoCorporal'
import { docParaMeso, docsParaRegistros, docsParaRegistrosReps, type MesoSalvo, type NotasDoc, type RegistroDoc } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useDoc, useLista } from '../../lib/hooks'
import { cargaAnterior } from '../../lib/treino'
import { ir } from '../../rota'
import { Botao, Centro } from '../../ui'
import { fmt, fmtData } from '../coach/semana/format'
import LoadInput from '../coach/semana/LoadInput'

type RegistroFlag = RegistroDoc & { realizado?: boolean; pc?: Record<string, number> }

// Cartão "Novidades": só nas 2 primeiras aberturas (contador no localStorage; sem ele, aparece sempre).
const CHAVE_NOVIDADES = 'forca-novidades-pc'
function Novidades() {
  const [ver, setVer] = useState(() => {
    try {
      const n = Number(localStorage.getItem(CHAVE_NOVIDADES) ?? 0)
      if (n >= 2) return false
      localStorage.setItem(CHAVE_NOVIDADES, String(n + 1))
    } catch {
      /* sem armazenamento: mostra */
    }
    return true
  })
  if (!ver) return null
  const fechar = () => {
    try {
      localStorage.setItem(CHAVE_NOVIDADES, '2')
    } catch {
      /* ignora */
    }
    setVer(false)
  }
  return (
    <div className="mb-4 rounded-xl border border-marca-500 bg-slate-900 p-4 text-sm">
      <div className="mb-1 font-semibold">Novidades</div>
      <ul className="mb-3 space-y-1 text-slate-300">
        <li>📝 Anotação em cada exercício</li>
        <li>PC: marque nos exercícios com peso do corpo</li>
        <li>Número cinza = carga da semana passada</li>
        <li>▶ Treino do dia em destaque na tela Hoje</li>
      </ul>
      <Botao onClick={fechar}>Entendi</Botao>
    </div>
  )
}

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


function Nota({ uid, nome, texto }: { uid: string; nome: string; texto: string }) {
  const [editando, setEditando] = useState(false)
  const [rascunho, setRascunho] = useState('')
  if (editando)
    return (
      <div className="mb-2">
        <textarea
          autoFocus
          maxLength={300}
          rows={3}
          value={rascunho}
          onChange={(ev) => setRascunho(ev.target.value)}
          placeholder="Ex.: banco na posição 3, aparelho Life"
          aria-label={`Anotação de ${nome}`}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm"
        />
        <div className="mt-1 flex gap-2">
          <Botao
            tipo="primario"
            onClick={() => {
              salvarNota(uid, nome, rascunho)
              setEditando(false)
            }}
          >
            Salvar
          </Botao>
          <Botao onClick={() => setEditando(false)}>Cancelar</Botao>
        </div>
      </div>
    )
  const abrir = () => {
    setRascunho(texto)
    setEditando(true)
  }
  return texto ? (
    <p className="mb-2 break-words text-xs italic text-slate-400">
      {texto}{' '}
      <button onClick={abrir} className="not-italic text-slate-300 underline">
        editar
      </button>
    </p>
  ) : (
    <button onClick={abrir} className="mb-2 text-xs text-slate-500">
      📝 Anotação
    </button>
  )
}

export default function Treino({ uid, mesoId, semana, treino }: { uid: string; mesoId: string; semana: number; treino: number }) {
  const { dados, carregando } = useDoc<MesoSalvo>(doc(db, 'mesos', mesoId))
  const { dados: docsRegistros, pendente } = useLista<RegistroFlag>(
    query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', mesoId)),
  )
  const { dados: notas } = useDoc<NotasDoc>(doc(db, 'notas', uid))
  const [pcLocal, setPcLocal] = useState<Record<string, number>>({}) // vale até o Firestore confirmar
  const { dados: perfil } = useDoc<Usuario>(doc(db, 'usuarios', uid))
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
  const pcs = docsRegistros.find((r) => r.semana === semana && r.treino === treino)?.pc ?? {}
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
            Semana {semana} · <b className="font-display text-slate-200">~{fmt(sessao.tempoMin)} min</b> · pausa {sessao.pausaS}s · início {fmtData(sessao.inicioSemana)}
          </p>
        </div>
        {pendente && <span className="max-w-[40%] text-right text-xs text-amber-400">salvo no celular · envia quando tiver internet</span>}
      </div>

      <Novidades />
      <div className="space-y-4">
        {sessao.exercicios.map((e) => {
          const colunasCargas = cs[e.slot.slotId] ?? []
          const colunasReps = rs[e.slot.slotId] ?? []
          const anterior = cargaAnterior(meso, cargas, semana, treino, e.pos)
          const slot = e.slot.slotId
          const corpo = pcLocal[slot] ?? (pcs[slot] || 0)
          const frac = fracaoPC(e.slot.nome)
          const alternarPc = () => {
            const grava = (kg: number) => {
              setPcLocal((p) => ({ ...p, [slot]: kg }))
              registrarPc(mesoId, uid, semana, treino, slot, kg)
            }
            if (corpo) return grava(0)
            let peso = perfil?.pesoKg
            if (!peso) {
              const n = Number((window.prompt('Qual é o seu peso (kg)?') ?? '').replace(',', '.'))
              if (!(n >= 20 && n <= 300)) return
              salvarPeso(uid, n)
              peso = n
            }
            grava(Math.round(peso * frac * 10) / 10)
          }
          return (
            <div key={e.slot.slotId} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="mb-2">
                <div className="font-semibold">{e.slot.nome}</div>
                {e.rotulo && <div className="mt-1 text-[11px] text-slate-400">{e.rotulo}</div>}
              </div>
              <label className="mb-2 flex items-center gap-2 text-xs text-slate-300">
                <input type="checkbox" checked={!!corpo} onChange={alternarPc} className="h-5 w-5" />
                PC (peso do corpo)
              </label>
              {corpo > 0 && perfil?.pesoKg && (
                <p className="mb-2 text-xs text-slate-400">
                  PC: {fmt(corpo)} kg ({Math.round(frac * 100)}% de {fmt(perfil.pesoKg)} kg)
                </p>
              )}
              <Nota key={notas?.exercicios?.[e.slot.nome.trim()] ?? ''} uid={uid} nome={e.slot.nome.trim()} texto={notas?.exercicios?.[e.slot.nome.trim()] ?? ''} />
              <div className="space-y-2">
                {e.reps.map((repAlvo, k) => {
                  const dropStage = k >= e.n
                  const rotuloCol = dropStage ? `D${k - e.n + 1}` : `S${k + 1}`
                  const placeholderKg = dropStage
                    ? (e.cargaSugerida[k] ?? null)
                    : anterior?.[k] != null
                      ? fmt(Math.max(0, anterior[k]! - corpo))
                      : null
                  return (
                    <div key={k} className="grid grid-cols-[1.75rem_3.25rem_minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-center gap-1.5">
                      <span className="text-xs text-slate-400">{rotuloCol}</span>
                      <span className="truncate text-xs text-slate-400">{repAlvo} reps</span>
                      <LoadInput
                        className="w-full min-w-0"
                        valor={colunasCargas[k] != null ? Math.max(0, Math.round((colunasCargas[k]! - corpo) * 100) / 100) : null}
                        placeholder={placeholderKg}
                        onSalvar={(v) => {
                          registrarCarga(mesoId, uid, semana, treino, e.slot.slotId, k, v == null ? null : Math.round((v + corpo) * 100) / 100)
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
              <div className="font-display text-2xl font-bold tabular-nums">{mmss(descanso.restante)}</div>
            </div>
            <Botao onClick={descanso.parar}>Pular</Botao>
          </div>
        </div>
      )}
    </main>
  )
}
