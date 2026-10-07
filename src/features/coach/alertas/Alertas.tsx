import { useMemo, useState, type ReactNode } from 'react'
import { collection, query, where } from 'firebase/firestore'
import type { Usuario } from '../../../lib/acesso'
import { consultaRegistrosRecentes, marcarAdaptado, salvarMeso } from '../../../lib/acoes'
import { repsAbaixo, treinosDemorados, type RegistroAlerta } from '../../../lib/alertas'
import { docParaMeso, type MesoSalvo } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { useLista } from '../../../lib/hooks'
import { inicioJanela, type RegistroResumo } from '../../../lib/resumo'
import { semanaAtual } from '../../../lib/treino'
import { Botao, Painel, Pagina } from '../../../ui'
import { LinhaAcima, treinosAcima } from '../meso/SugestaoTempo'

type Reg = RegistroAlerta & RegistroResumo

// Carrega tudo o que os alertas precisam (mesos em andamento, alunos não arquivados, registros de 14 dias).
export function useAlertasCoach() {
  const alunos = useLista<Usuario & { id: string }>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const mesos = useLista<MesoSalvo & { id: string }>(useMemo(() => query(collection(db, 'mesos')), []))
  const agora = new Date()
  const chave = inicioJanela(agora, 14)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registros = useLista<Reg>(useMemo(() => consultaRegistrosRecentes(agora), [chave]))
  const abaixo: { id: string; aluno: string; mesoId: string; alerta: NonNullable<ReturnType<typeof repsAbaixo>> }[] = []
  const acima: { d: MesoSalvo & { id: string }; meso: ReturnType<typeof docParaMeso>; a: ReturnType<typeof treinosAcima>[number]; aluno: string }[] = []
  const demorados: { id: string; aluno: string; mesoId: string; semana: number; treino: number; minutos: number; previsto: number }[] = []
  for (const d of mesos.dados) {
    const aluno = alunos.dados.find((x) => x.id === d.alunoId)
    if (!aluno || aluno.status === 'arquivado') continue
    const meso = docParaMeso(d)
    if (semanaAtual(meso, agora).estado !== 'durante') continue
    const regs = registros.dados.filter((r) => r.mesoId === d.id)
    const alerta = repsAbaixo(meso, regs, agora)
    if (alerta) abaixo.push({ id: d.id, aluno: aluno.nome, mesoId: d.id, alerta })
    for (const t of treinosDemorados(meso, regs, agora)) demorados.push({ id: `${d.id}-${t.semana}-${t.treino}`, aluno: aluno.nome, mesoId: d.id, ...t })
    if (d.tempoLimiteMin) for (const a of treinosAcima(meso)) acima.push({ d, meso, a, aluno: aluno.nome })
  }
  return {
    abaixo, acima, demorados,
    total: abaixo.length + acima.length + demorados.length,
    carregando: alunos.carregando || mesos.carregando || registros.carregando,
  }
}

const Grupo = ({ titulo, n, cor, children }: { titulo: string; n: number; cor: string; children: ReactNode }) =>
  n > 0 ? (
    <section className="space-y-2">
      <h2 className="font-semibold">
        {titulo} <span className={`font-display text-lg font-bold ${cor}`}>{n}</span>
      </h2>
      {children}
    </section>
  ) : null

function CartaoAbaixo({ aluno, mesoId, alerta }: { aluno: string; mesoId: string; alerta: NonNullable<ReturnType<typeof repsAbaixo>> }) {
  const [aberto, setAberto] = useState(false)
  return (
    <div className="space-y-2 rounded-xl border-2 border-rose-500 bg-rose-950 p-4">
      <p className="font-semibold text-rose-100">
        {aluno} — {alerta.abaixo} de {alerta.feitas} séries abaixo da meta (−{alerta.faltaram} reps)
      </p>
      <p className="text-sm text-rose-200">
        {alerta.exercicios.slice(0, 3).map((e) => `${e.nome} (${e.abaixo})`).join(' · ')}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a href={`#/meso/${mesoId}/semana/${alerta.semana}`} className="text-sm font-semibold text-rose-100 underline">Ver semana</a>
        <Botao onClick={() => setAberto((a) => !a)}>{aberto ? 'Fechar' : 'Ver sugestão'}</Botao>
      </div>
      <Painel aberto={aberto}>
        <p className="pt-1 text-sm text-rose-100">
          Reduzir a carga 5–10% nesses exercícios e conversar sobre descanso entre séries, sono e alimentação.
        </p>
      </Painel>
    </div>
  )
}

export default function Alertas() {
  const a = useAlertasCoach()
  return (
    <Pagina titulo="Alertas">
      {a.carregando ? (
        <p className="text-slate-400">Carregando…</p>
      ) : a.total === 0 ? (
        <p className="text-slate-400">Nenhum alerta. Tudo em dia ✓</p>
      ) : (
        <div className="space-y-6">
          <Grupo titulo="Reps abaixo da meta (7 dias)" n={a.abaixo.length} cor="text-rose-300">
            {a.abaixo.map((x) => <CartaoAbaixo key={x.id} aluno={x.aluno} mesoId={x.mesoId} alerta={x.alerta} />)}
          </Grupo>
          <Grupo titulo="Treinos acima do tempo" n={a.acima.length} cor="text-amber-300">
            <div className="space-y-3 rounded-xl border-2 border-amber-500 bg-amber-950 p-4">
              {a.acima.map(({ d, meso, a: t, aluno }) => (
                <LinhaAcima
                  key={`${d.id}-${t.treino}`}
                  meso={meso}
                  acima={t}
                  prefixo={aluno}
                  onAplicar={(novo) => {
                    salvarMeso(d.id, d.alunoId, d.nome, novo).gravado.then(() => marcarAdaptado(d.id)).catch(() => {})
                  }}
                />
              ))}
            </div>
          </Grupo>
          <Grupo titulo="Treinos que demoraram" n={a.demorados.length} cor="text-sky-300">
            {a.demorados.map((x) => (
              <div key={x.id} className="rounded-xl border-2 border-sky-500 bg-sky-950 p-4 text-sky-100">
                <a href={`#/meso/${x.mesoId}/semana/${x.semana}`} className="font-semibold underline">
                  {x.aluno} — Treino {x.treino} (semana {x.semana})
                </a>
                : {x.minutos} min, previsto {x.previsto} min
              </div>
            ))}
          </Grupo>
        </div>
      )}
    </Pagina>
  )
}
