import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import type { Usuario } from '../../lib/acesso'
import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import { rankingAlunos, type LinhaRanking, type RegistroEvolucao } from '../../lib/evolucao'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'
import { Cartao, Pagina } from '../../ui'
import { IcMedalha } from '../../icones'

type Aba = 'evoluiu' | 'frequentes' | 'risco'
const ABAS: [Aba, string][] = [
  ['evoluiu', 'Mais evoluíram'],
  ['frequentes', 'Mais frequentes'],
  ['risco', 'Em risco'],
]
const freq = (l: LinhaRanking) => (l.previstos4s ? l.feitos4s / l.previstos4s : 0)
const MEDALHA = ['text-amber-400', 'text-slate-300', 'text-orange-400']

export default function RankingAlunos() {
  const alunos = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const mesos = useLista<MesoSalvo & { id: string }>(useMemo(() => query(collection(db, 'mesos')), []))
  const [aba, setAba] = useState<Aba>('evoluiu')
  const [registros, setRegistros] = useState<RegistroEvolucao[]>([])
  const agora = new Date()
  const hoje = new Date(agora.getTime() - 3 * 3600_000).toISOString().slice(0, 10)

  const ativos = useMemo(() => alunos.dados.filter((a) => a.status !== 'arquivado'), [alunos.dados])
  // Meso atual de cada aluno: o mais recente que já começou.
  const atuais = useMemo(() => {
    const por = new Map<string, MesoSalvo & { id: string }>()
    for (const d of mesos.dados) {
      if (d.inicio.slice(0, 10) > hoje) continue
      const o = por.get(d.alunoId)
      if (!o || d.inicio > o.inicio) por.set(d.alunoId, d)
    }
    return [...por.values()]
  }, [mesos.dados, hoje])
  const chave = atuais.map((d) => d.id).sort().join(',')

  useEffect(() => {
    const ids = chave ? chave.split(',') : []
    const partes: RegistroEvolucao[][] = []
    setRegistros([])
    const fins = Array.from({ length: Math.ceil(ids.length / 30) }, (_, i) =>
      onSnapshot(query(collection(db, 'registros'), where('mesoId', 'in', ids.slice(i * 30, i * 30 + 30))), (s) => {
        partes[i] = s.docs.map((d) => d.data() as RegistroEvolucao)
        setRegistros(partes.flat())
      }),
    )
    return () => fins.forEach((f) => f())
  }, [chave])

  const linhas = useMemo(() => {
    const ids = new Set(ativos.map((a) => a.id))
    return rankingAlunos(
      ativos.map((a) => ({ id: a.id, nome: a.nome })),
      mesos.dados.filter((d) => ids.has(d.alunoId)).map((d) => ({ id: d.id, alunoId: d.alunoId, nome: d.nome, meso: docParaMeso(d) })),
      registros,
      new Date(),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ativos, mesos.dados, registros, hoje])

  const lista = useMemo(() => {
    if (aba === 'evoluiu') return [...linhas].sort((a, b) => (b.evolucaoPct ?? -Infinity) - (a.evolucaoPct ?? -Infinity))
    if (aba === 'frequentes') return [...linhas].sort((a, b) => freq(b) - freq(a))
    return linhas.filter((l) => l.previstos4s > 0).sort((a, b) => freq(a) - freq(b))
  }, [aba, linhas])

  const vazio = aba === 'risco' ? 'Nenhum aluno com treino previsto.' : 'Nenhum aluno ainda.'
  return (
    <Pagina titulo="Ranking de evolução">
      <div role="tablist" className="mb-3 flex gap-2 overflow-x-auto">
        {ABAS.map(([k, t]) => (
          <button
            key={k}
            role="tab"
            aria-selected={aba === k}
            onClick={() => setAba(k)}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm ${aba === k ? 'bg-marca-600 text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <Cartao>
        {lista.length === 0 ? (
          <p className="text-sm text-slate-500">{alunos.carregando ? 'Carregando…' : vazio}</p>
        ) : (
          <ol className="divide-y divide-slate-800">
            {lista.map((l, i) => (
              <li key={l.id} className="flex min-w-0 gap-3 py-3">
                <span className="w-8 shrink-0 text-center text-lg">{aba !== 'risco' && i < 3 ? <IcMedalha className={`inline size-5 align-[-3px] ${MEDALHA[i]}`} /> : `${i + 1}º`}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <a href={`#/aluno/${l.id}/evolucao`} className="truncate font-semibold hover:underline">
                      {l.nome}
                    </a>
                    <span className="shrink-0 font-display font-bold text-marca-300">
                      {l.evolucaoPct == null ? '—' : `${l.evolucaoPct > 0 ? '+' : ''}${Math.round(l.evolucaoPct)}%`}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    {l.previstos4s ? `${l.feitos4s}/${l.previstos4s} treinos (4 sem.)` : 'Sem treinos previstos'} · {l.semanasSeguidas} sem. seguidas · {l.recordes30}{' '}
                    {l.recordes30 === 1 ? 'recorde' : 'recordes'} em 30 dias
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Cartao>
    </Pagina>
  )
}
