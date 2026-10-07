import { useMemo } from 'react'
import { collection, query, where } from 'firebase/firestore'
import type { Usuario } from '../../../lib/acesso'
import { consultaRegistrosRecentes } from '../../../lib/acoes'
import type { MesoSalvo } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { useLista } from '../../../lib/hooks'
import { inicioJanela, resumoCoach, type AlunoComId, type RegistroResumo } from '../../../lib/resumo'
import { ir } from '../../../rota'
import { m } from 'motion/react'
import { useAlertasCoach } from '../alertas/Alertas'
import { Botao, Cartao, cascata, Contar, item, Pagina } from '../../../ui'

export default function Inicio() {
  const alunos = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const mesos = useLista<MesoSalvo & { id: string }>(useMemo(() => query(collection(db, 'mesos')), []))
  const agora = new Date()
  const chave = inicioJanela(agora, 14)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registros = useLista<RegistroResumo>(useMemo(() => consultaRegistrosRecentes(agora), [chave]))
  const r = resumoCoach(alunos.dados as AlunoComId[], registros.dados, agora, mesos.dados)
  const alertas = useAlertasCoach()
  const novo = (
    <Botao tipo="primario" onClick={() => ir('/alunos/novo')}>
      Novo aluno
    </Botao>
  )

  if (!alunos.carregando && alunos.dados.length === 0)
    return (
      <Pagina titulo="Início">
        <Cartao className="space-y-4 text-center">
          <p className="text-slate-400">Nenhum aluno ainda.</p>
          <Botao tipo="primario" className="w-full py-4 text-base" onClick={() => ir('/alunos/novo')}>
            Cadastrar primeiro aluno
          </Botao>
        </Cartao>
      </Pagina>
    )

  const blocos: [string, AlunoComId[], string][] = [
    ['Aguardando aprovação', r.aguardando, 'Ninguém aguardando.'],
    ['Vencendo em 7 dias', r.vencendo, 'Ninguém vencendo.'],
    ['Vencidos', r.vencidos, 'Nenhum vencido.'],
    ['Treinaram hoje', r.treinaramHoje, 'Ninguém treinou hoje ainda.'],
    ['Sumidos (7+ dias sem treinar)', r.sumidos, 'Ninguém sumido.'],
    ['Frequência caindo (14 dias)', r.frequenciaCaindo, 'Ninguém com frequência caindo.'],
  ]
  return (
    <Pagina titulo="Início" acoes={novo}>
      <a href="#/ranking" className="mb-3 block text-sm text-marca-300 hover:underline">
        Ranking de evolução →
      </a>
      {alertas.total > 0 && (
        <a href="#/alertas" className="mb-3 flex items-center justify-between gap-3 rounded-xl border-2 border-rose-500 bg-rose-950 p-4 text-rose-100">
          <span className="font-semibold">
            ⚠️ <span className="font-display text-3xl font-bold text-rose-300">{alertas.total}</span> {alertas.total === 1 ? 'alerta' : 'alertas'}
          </span>
          <span className="font-semibold underline">Ver alertas</span>
        </a>
      )}
      <m.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" variants={cascata} initial="hidden" animate="show">
        {blocos.map(([titulo, lista, vazio]) => (
          <m.div key={titulo} variants={item}>
          <Cartao className="h-full space-y-2">
            <h2 className="font-semibold">
              {titulo} <span className="font-display text-lg font-bold text-marca-300"><Contar n={lista.length} /></span>
            </h2>
            {lista.length === 0 ? (
              <p className="text-sm text-slate-500">{vazio}</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {lista.flatMap((a) => {
                  const hoje = titulo === 'Treinaram hoje' ? r.treinosHoje[a.id] : undefined
                  const links = hoje?.length
                    ? hoje.map((t) => ({
                        k: `${t.mesoId}-${t.semana}-${t.treino}`,
                        href: `#/meso/${t.mesoId}/semana/${t.semana}`,
                        texto: `${a.nome} · Treino ${t.treino}${t.feito ? ' ✓' : ' (em andamento)'}`,
                      }))
                    : [{ k: a.id, href: `#/aluno/${a.id}`, texto: a.nome }]
                  return links.map((l) => (
                    <li key={`${a.id}-${l.k}`} className="min-w-0">
                      <a href={l.href} className="block max-w-full truncate rounded-lg bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700">
                        {l.texto}
                      </a>
                    </li>
                  ))
                })}
              </ul>
            )}
          </Cartao>
          </m.div>
        ))}
      </m.div>
    </Pagina>
  )
}
