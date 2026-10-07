import { collection, query, where } from 'firebase/firestore'
import { m, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { prescreverSessao, type Meso } from '../../engine'
import { repsAbaixo, type RegistroAlerta } from '../../lib/alertas'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'
import { ir } from '../../rota'
import { Botao, cascata, Centro, Deslizar, item } from '../../ui'
import { fmtData } from '../coach/semana/format'
import { semanaParaAbrir } from '../../lib/semana'
import { acimaDoLimite, fmtMin } from '../../lib/tempo'
import { mesoAtual } from './mesoAtual'
import AvisoNotificacoes from './AvisoNotificacoes'
import type { MesoSalvo } from '../../lib/conversores'

const Msg = ({ children }: { children: ReactNode }) => <p className="mt-10 text-center text-slate-400">{children}</p>

export default function Hoje({ uid, base = '' }: { uid: string; base?: string }) {
  const { dados: mesos, carregando } = useLista<MesoSalvo>(query(collection(db, 'mesos'), where('alunoId', '==', uid)))
  if (carregando) return <Centro>Carregando…</Centro>

  const atual = mesoAtual(mesos)
  if (!atual) return <Msg>Seu coach ainda não montou seu treino.</Msg>
  const { doc, meso, estado } = atual

  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <AvisoNotificacoes />
      <h1 className="mb-1 text-lg font-bold">{doc.nome}</h1>
      {estado.estado === 'antes' && <Msg>Começa em {fmtData(meso.inicio)}.</Msg>}
      {estado.estado === 'depois' && <Msg>Mesociclo concluído — fale com seu coach.</Msg>}
      {estado.estado === 'durante' && <Semana uid={uid} base={base} mesoId={doc.id} meso={meso} hoje={new Date()} />}
    </main>
  )
}

type RegistroFlag = RegistroAlerta

function Semana({ uid, base, mesoId, meso, hoje }: { uid: string; base: string; mesoId: string; meso: Meso; hoje: Date }) {
  const { dados: registros, carregando } = useLista<RegistroFlag>(
    query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', mesoId)),
  )
  if (carregando) return <Centro>Carregando…</Centro>
  return <SemanaCarregada base={base} mesoId={mesoId} meso={meso} registros={registros} semanaInicial={semanaParaAbrir(meso, registros, hoje)} />
}

// Aviso de reps abaixo da meta nos últimos 7 dias; "Entendi" guarda no aparelho (sem armazenamento, volta no próximo acesso).
function AvisoReps({ meso, mesoId, registros }: { meso: Meso; mesoId: string; registros: RegistroFlag[] }) {
  const a = repsAbaixo(meso, registros, new Date())
  const chave = `alerta-reps-${mesoId}-${a?.ultimoDia}`
  const [visto, setVisto] = useState(() => {
    try { return localStorage.getItem(chave) === '1' } catch { return false }
  })
  if (!a || visto) return null
  const entendi = () => {
    setVisto(true)
    try { localStorage.setItem(chave, '1') } catch { /* sem armazenamento */ }
  }
  return (
    <div role="alert" className="mb-4 space-y-3 rounded-xl border-2 border-amber-500 bg-amber-950 p-4 text-sm text-amber-100">
      <p>
        <b>Reps abaixo da meta:</b> nos últimos 7 dias você fez menos reps que o previsto em {a.abaixo} séries (ex.: {a.exercicios[0].nome}).
        Pode ser descanso curto, sono ou alimentação. No próximo treino, diminua um pouco o peso para completar as reps.
      </p>
      <Botao onClick={entendi}>Entendi</Botao>
    </div>
  )
}

function SemanaCarregada({ base, meso, mesoId, registros, semanaInicial }: { base: string; mesoId: string; meso: Meso; registros: RegistroFlag[]; semanaInicial: number }) {
  const [semana, setSemana] = useState(semanaInicial)
  const feitos = new Set(registros.filter((r) => r.realizado).map((r) => `${r.semana}-${r.treino}`))
  const treinos = Array.from({ length: meso.frequencia }, (_, i) => i + 1).filter((t) => prescreverSessao(meso, semana, t))
  const proximo = treinos.find((t) => !feitos.has(`${semana}-${t}`))
  const atual = semana === semanaInicial
  const quieto = useReducedMotion()

  return (
    <>
      <AvisoReps meso={meso} mesoId={mesoId} registros={registros} />
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
      <Deslizar chave={semana}>
      {atual && (
        <p className="mb-3 text-center font-semibold text-emerald-400">
          {proximo ? `▶ Faça hoje: Treino ${proximo}` : 'Semana concluída ✓'}
        </p>
      )}
      <m.div className="space-y-3" variants={cascata} initial="hidden" animate="show">
        {treinos.map((treino) => {
          const sessao = prescreverSessao(meso, semana, treino)
          if (!sessao) return null
          const destaque = atual && treino === proximo
          const feito = feitos.has(`${semana}-${treino}`)
          return (
            <m.button
              key={treino}
              variants={item}
              whileTap={{ scale: 0.98 }}
              onClick={() => ir(`${base}/treino/${mesoId}/${semana}/${treino}`)}
              className={`relative flex w-full min-h-[64px] items-center justify-between rounded-xl border p-4 text-left active:bg-slate-800 ${destaque ? 'border-emerald-500 bg-slate-800' : feito ? 'border-emerald-700 bg-slate-900' : 'border-slate-800 bg-slate-900'}`}
            >
              {destaque && !quieto && (
                <m.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_0_18px_rgba(52,211,153,0.55)]"
                  animate={{ opacity: [0.15, 0.9, 0.15] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              {feito && (
                <m.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl bg-emerald-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <div className="min-w-0">
                <div className="font-semibold">
                  Treino {treino}{' '}
                  {feito && (
                    <m.span
                      className="inline-block text-emerald-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                    >
                      ✓
                    </m.span>
                  )}
                </div>
                <div className="text-xs text-slate-400">{sessao.exercicios.length} exercícios</div>
              </div>
              <span className={`mr-2 ml-auto shrink-0 rounded-full px-3 py-1 font-display text-lg font-bold ${acimaDoLimite(sessao.tempoMin, meso.tempoLimiteMin) ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-100'}`}>{fmtMin(sessao.tempoMin)}</span>
              <span className="text-slate-600">›</span>
            </m.button>
          )
        })}
      </m.div>
      </Deslizar>
      <a href="#/metodos" className="mt-5 block text-center text-sm text-slate-400 underline">
        Guia de métodos
      </a>
      {/* O aluno não tem "Minha conta": a política fica acessível daqui (LGPD). */}
      <a href="/privacidade" className="mt-2 block text-center text-xs text-slate-500 underline">
        Política de Privacidade
      </a>
    </>
  )
}
