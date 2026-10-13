import { collection, doc, query, where } from 'firebase/firestore'
import { m, useReducedMotion } from 'motion/react'
import { suave } from '../../movimento'
import { useMemo, useState } from 'react'
import { evolucaoExercicio } from '../../engine'
import type { Usuario } from '../../lib/acesso'
import { diaSP } from '../../lib/acesso'
import { docParaMeso, docsParaRegistros, docsParaRegistrosReps, type MesoSalvo, type RegistroDoc } from '../../lib/conversores'
import { comparacaoToneladas, historicoExercicios, painelEvolucao, type Conquista, type RegistroEvolucao } from '../../lib/evolucao'
import { db } from '../../lib/firebase'
import { useDoc, useLista } from '../../lib/hooks'
import { ir } from '../../rota'
import { campoBase, Cartao, cascata, Centro, Contar, item } from '../../ui'
import { mesoAtual } from '../aluno/mesoAtual'
import { fmt } from '../coach/semana/format'
import BotaoCompartilhar from './BotaoCompartilhar'
import { IcMedalha } from '../../icones'

type Voltar = { href: string; texto: string }

const segunda = (dia: number) => dia - ((dia + 3) % 7)
const dataCurta = (dia: number) => new Date(dia * 86_400_000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' })
const plural = (n: number, um: string, varios: string) => (n === 1 ? um : varios)

function Faixa({ frac, className = 'bg-marca-500' }: { frac: number; className?: string }) {
  const quieto = useReducedMotion()
  return (
    <div className="h-2 overflow-hidden rounded bg-slate-800">
      <m.div
        className={`h-full origin-left rounded ${className}`}
        style={{ width: `${Math.max(3, Math.round(Math.min(1, frac) * 100))}%` }}
        initial={{ scaleX: quieto ? 1 : 0 }}
        animate={{ scaleX: 1 }}
        transition={suave}
      />
    </div>
  )
}

const Titulo = ({ children }: { children: string }) => <h2 className="mb-3 font-semibold">{children}</h2>

export function Painel({ uid, nome, voltar, compartilhar = false }: { uid: string; nome: string; voltar: Voltar; compartilhar?: boolean }) {
  const mesosL = useLista<MesoSalvo & { id: string }>(useMemo(() => query(collection(db, 'mesos'), where('alunoId', '==', uid)), [uid]))
  const regsL = useLista<RegistroEvolucao>(useMemo(() => query(collection(db, 'registros'), where('alunoId', '==', uid)), [uid]))
  const [soMeso, setSoMeso] = useState(false)
  const [exercicio, setExercicio] = useState('')

  const mesos = useMemo(() => mesosL.dados.map((d) => ({ id: d.id, meso: docParaMeso(d), nome: d.nome })), [mesosL.dados])
  const atual = useMemo(() => mesoAtual(mesosL.dados), [mesosL.dados])
  const mesoId = soMeso ? atual?.doc.id : undefined
  const agora = new Date()
  const p = painelEvolucao(mesos, regsL.dados, agora, mesoId)
  const historico = historicoExercicios(mesoId ? mesos.filter((x) => x.id === mesoId) : mesos, regsL.dados)

  const cabeca = (
    <>
      <a href={voltar.href} className="mb-2 inline-block text-sm text-slate-400">
        {voltar.texto}
      </a>
      <h1 className="mb-3 text-lg font-bold">Evolução</h1>
    </>
  )
  const base = 'mx-auto max-w-md px-4 py-4 lg:max-w-3xl'
  if (mesosL.carregando || regsL.carregando)
    return (
      <main className={base}>
        {cabeca}
        <Centro>Carregando…</Centro>
      </main>
    )
  if (p.totalTreinos === 0)
    return (
      <main className={base}>
        {cabeca}
        <Cartao className="py-8 text-center">
          <p className="text-lg font-semibold">Seu primeiro treino vai aparecer aqui</p>
          <p className="mt-1 text-sm text-slate-400">Cada treino feito entra na sua evolução.</p>
        </Cartao>
      </main>
    )

  const toneladas = p.volumeKg / 1000
  const comp = comparacaoToneladas(p.volumeKg)
  const compTexto = comp ? `≈ ${comp.qtd} ${comp.qtd === 1 ? comp.objeto : comp.plural}` : undefined
  const top = p.topEvolucao[0]
  const hoje = diaSP(agora.getTime())
  const inicioGrade = segunda(hoje) - 77
  const treinou = new Set(p.dias)
  const maxSemana = Math.max(1, p.meta ?? 0, ...p.porSemana.map((s) => s.feitos))
  const nomes = Object.keys(historico).sort((a, b) => a.localeCompare(b))
  const nomeSel = nomes.includes(exercicio) ? exercicio : (nomes[0] ?? '')
  const pontos = (mesoId ? mesos.filter((x) => x.id === mesoId) : mesos)
    .sort((a, b) => a.meso.inicio.localeCompare(b.meso.inicio))
    .flatMap(({ id, meso, nome: nm }) => {
      const docs = regsL.dados.filter((r) => r.mesoId === id) as RegistroDoc[]
      return evolucaoExercicio(meso, docsParaRegistros(docs, meso), nomeSel, docsParaRegistrosReps(docs))
        .filter((x) => x.cargaMax != null)
        .map((x) => ({ ...x, id: `${id}-${x.ocorrencia}`, meso: nm }))
    })
  const maxCarga = Math.max(1, ...pontos.map((x) => x.cargaMax ?? 0))
  const grupos = (Object.keys({ treinos: 0, sequencia: 0, recordes: 0, toneladas: 0, semanasCompletas: 0 }) as Conquista['categoria'][]).map((c) => {
    const lista = p.conquistas.filter((q) => q.categoria === c)
    return { ganhas: lista.filter((q) => q.ganha), proxima: lista.find((q) => !q.ganha) }
  })

  const numero = 'text-3xl font-extrabold text-marca-400'
  return (
    <main className={base}>
      {cabeca}
      {atual && mesos.length > 1 && (
        <div className="mb-4 inline-flex rounded-lg border border-slate-600 bg-slate-800 p-1 text-sm" role="group" aria-label="Período">
          {[false, true].map((v) => (
            <button
              key={String(v)}
              aria-pressed={soMeso === v}
              onClick={() => setSoMeso(v)}
              className={`rounded-md px-3 py-1 ${soMeso === v ? 'bg-marca-500 text-white' : 'text-slate-300'}`}
            >
              {v ? 'Este meso' : 'Tudo'}
            </button>
          ))}
        </div>
      )}
      <m.div className="space-y-4" variants={cascata} initial="hidden" animate="show">
        <m.div variants={item} className="grid grid-cols-3 gap-2 text-center">
          <Cartao className="px-2">
            <p className={numero}>
              <Contar n={p.totalTreinos} />
            </p>
            <p className="text-xs text-slate-400">{plural(p.totalTreinos, 'treino feito', 'treinos feitos')}</p>
          </Cartao>
          <Cartao className="px-2">
            <p className={numero}>
              <Contar n={p.semanasSeguidas} />
            </p>
            <p className="text-xs text-slate-400">{plural(p.semanasSeguidas, 'semana seguida', 'semanas seguidas')}</p>
            <p className="text-xs text-slate-500">melhor: {p.melhorSequencia}</p>
          </Cartao>
          <Cartao className="px-2">
            <p className={numero}>{toneladas >= 10 ? <><Contar n={Math.round(toneladas)} /> t</> : `${fmt(toneladas)} t`}</p>
            <p className="text-xs text-slate-400">levantadas</p>
            {compTexto && <p className="text-xs text-slate-500">{compTexto}</p>}
          </Cartao>
        </m.div>

        <m.div variants={item}>
          <Cartao>
            <Titulo>Seus últimos 3 meses</Titulo>
            <div className="grid grid-flow-col grid-cols-12 grid-rows-7 gap-1" role="img" aria-label={`${p.dias.length} dias treinados nos últimos 84 dias`}>
              {Array.from({ length: 84 }, (_, i) => {
                const dia = inicioGrade + Math.floor(i / 7) * 7 + (i % 7)
                const cor = dia > hoje ? 'bg-transparent' : treinou.has(dia) ? 'bg-marca-400' : 'bg-slate-800'
                return <div key={dia} title={dataCurta(dia)} className={`aspect-square rounded-sm ${cor}`} />
              })}
            </div>
            <div className="relative mt-4 flex h-24 items-end gap-1">
              {p.porSemana.map((s) => (
                <div key={s.inicio} className="flex h-full flex-1 flex-col justify-end" title={`Semana de ${dataCurta(s.inicio)}: ${s.feitos}`}>
                  <div className={`rounded-t ${s.feitos ? 'bg-marca-500' : 'bg-slate-800'}`} style={{ height: `${Math.max(4, (s.feitos / maxSemana) * 100)}%` }} />
                </div>
              ))}
              {p.meta != null && (
                <div className="pointer-events-none absolute inset-x-0 border-t border-dashed border-amber-300" style={{ bottom: `${(p.meta / maxSemana) * 100}%` }} />
              )}
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Média de {fmt(p.mediaSemanal)} por semana{p.meta != null && ` · meta ${p.meta} por semana`}
            </p>
          </Cartao>
        </m.div>

        {p.topEvolucao.length > 0 && (
          <m.div variants={item}>
            <Cartao>
              <Titulo>Maiores evoluções</Titulo>
              <ul className="space-y-3">
                {p.topEvolucao.map((e) => (
                  <li key={e.nome}>
                    <p className="mb-1 text-sm">
                      {e.nome}: {fmt(e.de)} → {fmt(e.ate)} kg <span className="font-semibold text-green-400">(+{Math.round(e.pct).toLocaleString('pt-BR')}%)</span>
                    </p>
                    <Faixa frac={e.pct / p.topEvolucao[0].pct} className="bg-green-500" />
                  </li>
                ))}
              </ul>
            </Cartao>
          </m.div>
        )}

        <m.div variants={item} className="grid gap-4 sm:grid-cols-2">
          <Cartao>
            <Titulo>Mais constante</Titulo>
            <p className="text-sm text-slate-300">
              {p.maisConstante ? `${p.maisConstante.nome}: ${p.maisConstante.sequencia} treinos seguidos sem baixar a carga` : 'Mantenha a carga por 3 treinos seguidos e ele aparece aqui.'}
            </p>
          </Cartao>
          <Cartao>
            <Titulo>Recordes</Titulo>
            <p className="text-sm text-slate-300">
              <span className="text-2xl font-bold text-marca-400">{p.recordes.total}</span> no total ·{' '}
              <span className="font-semibold">{p.recordes.ultimos30}</span> nos últimos 30 dias
            </p>
          </Cartao>
        </m.div>

        <m.div variants={item}>
          <Cartao>
            <Titulo>Conquistas</Titulo>
            <div className="mb-4 flex flex-wrap gap-2">
              {grupos.flatMap((g) => g.ganhas).map((q) => (
                <span key={q.id} className="rounded-full bg-amber-400/20 px-3 py-1 text-sm font-medium text-amber-300">
                  <IcMedalha className="inline size-4 align-[-2px]" /> {q.titulo}
                </span>
              ))}
            </div>
            <ul className="space-y-3">
              {grupos.flatMap((g) => (g.proxima ? [g.proxima] : [])).map((q) => (
                <li key={q.id}>
                  <p className="mb-1 flex justify-between gap-2 text-sm">
                    <span>{q.titulo}</span>
                    <span className="text-slate-400">faltam {fmt(q.falta)}{q.categoria === 'toneladas' && ' t'}</span>
                  </p>
                  <Faixa frac={q.progresso} />
                </li>
              ))}
            </ul>
          </Cartao>
        </m.div>

        {compartilhar && (
          <m.div variants={item}>
            <BotaoCompartilhar
              dados={{
                nome: nome.split(' ')[0],
                treinos: p.totalTreinos,
                semanasSeguidas: p.semanasSeguidas,
                toneladas: `${fmt(toneladas)} t`,
                comparacao: compTexto,
                destaque: top && { nome: top.nome, de: top.de, ate: top.ate, pct: top.pct },
              }}
            />
          </m.div>
        )}

        <m.div variants={item}>
          <Cartao>
            <Titulo>Por exercício</Titulo>
            <select value={nomeSel} onChange={(e) => setExercicio(e.target.value)} className={`${campoBase} mb-3 w-full px-3 py-2 outline-none focus:border-marca-500`}>
              {nomes.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {pontos.length === 0 ? (
              <p className="text-sm text-slate-400">Sem registros ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-2">Sem.</th>
                      <th className="p-2 text-right">Carga máx</th>
                      <th className="p-2 text-right">Carga média</th>
                      <th className="p-2 text-right">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pontos.map((x) => (
                      <tr key={x.id} className="border-b border-slate-800 last:border-0">
                        <td className="p-2">{x.semana}</td>
                        <td className="p-2 text-right">
                          {fmt(x.cargaMax)}
                          <Faixa frac={(x.cargaMax ?? 0) / maxCarga} />
                        </td>
                        <td className="p-2 text-right">{fmt(x.cargaMedia)}</td>
                        <td className="p-2 text-right">{fmt(x.volume)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Cartao>
        </m.div>
      </m.div>
    </main>
  )
}

export default function EvolucaoAluno({ uid, nome }: { uid: string; nome: string }) {
  return <Painel uid={uid} nome={nome} voltar={{ href: '#/', texto: '← Hoje' }} compartilhar />
}

export function EvolucaoCoach({ uid }: { uid: string }) {
  const aluno = useDoc<Usuario>(useMemo(() => doc(db, 'usuarios', uid), [uid]))
  return <Painel uid={uid} nome={aluno.dados?.nome ?? ''} voltar={{ href: `#/aluno/${uid}`, texto: '← Voltar ao aluno' }} />
}
