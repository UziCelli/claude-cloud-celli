import { collection, query, where } from 'firebase/firestore'
import { m, useAnimationControls, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { prescreverSessao, type Meso } from '../../engine'
import { comVolta, diasDaSemana, semanaDeVolta, travado, treinoDeHoje } from '../../lib/agenda'
import { repsAbaixo, type RegistroAlerta } from '../../lib/alertas'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'
import { IcCadeado, IcCheck, IcRaio, IcRelogio } from '../../icones'
import { ir } from '../../rota'
import { Botao, cascata, Centro, Deslizar, item } from '../../ui'
import { Chip, Quadro } from '../../vidro'
import { fmtData } from '../coach/semana/format'
import { semanaParaAbrir } from '../../lib/semana'
import { semanaAtual } from '../../lib/treino'
import { acimaDoLimite, fmtMin } from '../../lib/tempo'
import { dataSP, diaCurto, mesoAtual } from './mesoAtual'
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
      {estado.estado === 'antes' && <Msg>Começa em {fmtData(meso.inicio)}.</Msg>}
      {estado.estado === 'depois' && <Msg>Mesociclo concluído — fale com seu coach.</Msg>}
      {estado.estado === 'durante' && <Semana uid={uid} base={base} mesoId={doc.id} nome={doc.nome} meso={meso} hoje={new Date()} />}
    </main>
  )
}

type RegistroFlag = RegistroAlerta

function Semana({ uid, base, mesoId, nome, meso, hoje }: { uid: string; base: string; mesoId: string; nome: string; meso: Meso; hoje: Date }) {
  const { dados: registros, carregando } = useLista<RegistroFlag>(
    query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', mesoId)),
  )
  if (carregando) return <Centro>Carregando…</Centro>
  return <SemanaCarregada base={base} mesoId={mesoId} nome={nome} meso={meso} registros={registros} hoje={hoje} semanaInicial={semanaParaAbrir(meso, registros, hoje)} />
}

// Aviso de reps abaixo da meta nos últimos 7 dias; "Entendi" guarda no aparelho (sem armazenamento, volta no próximo acesso).
function AvisoReps({ meso, mesoId, registros }: { meso: Meso; mesoId: string; registros: RegistroFlag[] }) {
  const a = repsAbaixo(meso, registros, new Date())
  const chave = `alerta-reps-${mesoId}-${a?.ultimoDia}`
  const [fechou, setFechou] = useState('') // chave dispensada nesta tela (vale mesmo sem localStorage)
  let visto = fechou === chave
  try { visto ||= localStorage.getItem(chave) === '1' } catch { /* sem armazenamento */ }
  if (!a || visto) return null
  const entendi = () => {
    setFechou(chave)
    try { localStorage.setItem(chave, '1') } catch { /* sem armazenamento */ }
  }
  return (
    <div role="alert" className="mb-4 space-y-3 rounded-3xl border-2 border-amber-500 bg-amber-950 p-4 text-sm text-amber-100">
      <p>
        <b>Reps abaixo da meta:</b> nos últimos 7 dias você fez menos reps que o previsto em {a.abaixo} séries (ex.: {a.exercicios[0].nome}).
        Pode ser descanso curto, sono ou alimentação. No próximo treino, diminua um pouco o peso para completar as reps.
      </p>
      <Botao onClick={entendi}>Entendi</Botao>
    </div>
  )
}

function SemanaCarregada({ base, meso, mesoId, nome, registros, hoje, semanaInicial }: { base: string; mesoId: string; nome: string; meso: Meso; registros: RegistroFlag[]; hoje: Date; semanaInicial: number }) {
  const [semana, setSemana] = useState(semanaInicial)
  const [aviso, setAviso] = useState<number | null>(null) // semana travada tocada
  const tremer = useAnimationControls()
  const quieto = useReducedMotion()
  useEffect(() => {
    if (aviso == null) return
    const t = setTimeout(() => setAviso(null), 3500)
    return () => clearTimeout(t)
  }, [aviso])
  const bloqueado = (w: number) => {
    setAviso(w)
    if (!quieto) tremer.start({ x: [0, -10, 10, -8, 8, -4, 0], transition: { duration: 0.4 } })
  }

  const feitos = new Set(registros.filter((r) => r.realizado).map((r) => `${r.semana}-${r.treino}`))
  const todos = Array.from({ length: meso.frequencia }, (_, i) => i + 1)
  const mc = comVolta(meso, registros, hoje) // prescrição e tempo já com a semana de volta
  const treinos = todos.filter((t) => prescreverSessao(mc, semana, t))
  const agora = treinoDeHoje(meso, registros, hoje)
  const hojeTreino = agora && 'treino' in agora && agora.semana === semana ? agora.treino : null
  const semanaData = semanaAtual(meso, hoje).semana
  const hojeISO = dataSP(hoje)
  const datas = Object.fromEntries(meso.dias?.length ? diasDaSemana(meso, semana).filter((d) => d.treino).map((d) => [d.treino, d.data]) : [])
  const travada = (w: number, t?: number) => !base && travado(meso, registros, hoje, w, t)

  return (
    <m.div animate={tremer}>
      {aviso != null && (
        <div role="alert" className="vidro !bg-slate-900/95 fixed inset-x-4 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[60] mx-auto flex max-w-[398px] items-center gap-3 rounded-3xl p-2.5 shadow-2xl">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-rose-500/20 text-rose-400"><IcCadeado className="size-6" /></span>
          <p className="text-[15px] leading-snug text-slate-100">Semana {aviso} já passou. Faça o treino desta semana 💪</p>
        </div>
      )}
      <header className="pt-2">
        <h1 className="text-[30px] leading-tight">Semana {semana} de {meso.semanas}</h1>
        <p className="text-[15px] text-slate-300">{nome} · {diaCurto(hojeISO)}, {Number(hojeISO.slice(8))}</p>
      </header>
      <div className="my-3 flex flex-wrap gap-2" role="group" aria-label="Semanas">
        {Array.from({ length: meso.semanas }, (_, i) => i + 1).map((w) => {
          const feita = todos.every((t) => feitos.has(`${w}-${t}`))
          const trava = !feita && travada(w)
          const sel = w === semana
          return (
            <button
              key={w}
              type="button"
              aria-label={`Semana ${w}${feita ? ', feita' : trava ? ', travada' : ''}`}
              aria-current={sel ? 'true' : undefined}
              onClick={() => (trava ? bloqueado(w) : setSemana(w))}
              className={`grid h-12 min-w-12 flex-1 place-items-center rounded-full text-base font-bold ${
                sel ? 'bg-marca-500 text-white ring-4 ring-marca-500/30'
                : feita ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40'
                : trava ? 'bg-white/5 text-slate-500'
                : 'text-slate-200 ring-1 ring-white/25'
              }`}
            >
              {feita ? <IcCheck className="size-5" /> : trava ? <IcCadeado className="size-5" /> : w}
            </button>
          )
        })}
      </div>

      {semanaDeVolta(meso, registros, hoje, semana) && (
        <Quadro className="mb-3 flex items-center gap-2.5 !rounded-2xl !p-3">
          <IcRaio className="size-5 shrink-0 text-amber-300" />
          <p className="text-[15px] leading-snug text-slate-100">Semana ajustada para sua volta: volume e carga −5%</p>
        </Quadro>
      )}

      <Deslizar chave={semana}>
        <m.div className="space-y-2.5" variants={cascata} initial="hidden" animate="show">
          {treinos.map((treino) => {
            const sessao = prescreverSessao(mc, semana, treino)
            if (!sessao) return null
            const feito = feitos.has(`${semana}-${treino}`)
            const trava = !feito && travada(semana, treino)
            const destaque = !feito && treino === hojeTreino
            const naoFeito = !feito && (semana < semanaData || (datas[treino] != null && datas[treino] < hojeISO))
            const borda = feito ? 'ring-1 ring-emerald-400/60'
              : trava ? 'opacity-60'
              : naoFeito ? 'bg-amber-400/10 ring-1 ring-amber-300/40'
              : destaque ? 'ring-2 ring-marca-400 shadow-[0_0_32px_-4px] shadow-marca-500/60' : ''
            return (
              <m.button
                key={treino}
                type="button"
                variants={item}
                whileTap={{ scale: 0.98 }}
                onClick={() => (trava ? bloqueado(semana) : ir(`${base}/treino/${mesoId}/${semana}/${treino}`))}
                className="block w-full text-left"
              >
                <Quadro className={`!rounded-[22px] !p-3.5 ${borda}`}>
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl font-bold text-white">Treino {treino}</span>
                        {destaque && <Chip cor="bg-marca-500 text-white">Hoje</Chip>}
                        {feito && <span className="flex items-center gap-1 text-[15px] font-bold text-emerald-300"><IcCheck className="size-4" /> Feito</span>}
                        {naoFeito && <span className="text-[15px] font-bold text-amber-300">Não feito</span>}
                      </div>
                      <p className="text-[15px] text-slate-300">{datas[treino] ? `${diaCurto(datas[treino])}, ${Number(datas[treino].slice(8))} · ` : ''}{sessao.exercicios.length} exercícios</p>
                      {naoFeito && !trava && <p className="text-[15px] font-semibold text-amber-200">Ainda dá tempo nesta semana</p>}
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-display text-base font-extrabold ${acimaDoLimite(sessao.tempoMin, meso.tempoLimiteMin) ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'}`}>
                      <IcRelogio className="size-4" /> {fmtMin(sessao.tempoMin)}
                    </span>
                    {trava ? <IcCadeado className="size-5 text-slate-400" /> : <span className="text-2xl text-slate-400" aria-hidden>›</span>}
                  </div>
                  {!trava && !feito && (
                    <span className={`mt-3 flex h-12 w-full items-center justify-center rounded-2xl text-base font-bold ${destaque ? 'bg-marca-500 text-white shadow-lg' : 'bg-white/10 text-slate-100'}`}>Abrir treino</span>
                  )}
                </Quadro>
              </m.button>
            )
          })}
        </m.div>
      </Deslizar>
      {!base && <div className="mt-4"><AvisoReps meso={meso} mesoId={mesoId} registros={registros} /></div>}
    </m.div>
  )
}
