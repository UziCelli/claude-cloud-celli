import { collection, doc, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import type { Usuario } from '../../lib/acesso'
import { dataBR, fmtNum, lerAvaliacao, resultado, type Avaliacao } from '../../lib/avaliacao'
import { db } from '../../lib/firebase'
import { TEXTO_SEM_INTERNET, useDoc, useLista, useSemInternet } from '../../lib/hooks'
import { Botao, Centro } from '../../ui'
import { BotaoVoltar } from '../../voltar'
import { ir } from '../../rota'

// Todas as avaliações do aluno (rascunhos também: só o coach lê assim), da mais recente para a mais antiga.
export function useAvaliacoesDoAluno(uid: string) {
  const l = useLista<object>(useMemo(() => query(collection(db, 'avaliacoes'), where('alunoId', '==', uid)), [uid]))
  const dados = useMemo(
    () => l.dados.map((d) => lerAvaliacao(d.id, d)).filter((a): a is Avaliacao => !!a).sort((a, b) => b.data.localeCompare(a.data) || b.id.localeCompare(a.id)),
    [l.dados],
  )
  return { dados, carregando: l.carregando }
}

export default function AvaliacoesCoach({ uid }: { uid: string }) {
  const aluno = useDoc<Usuario>(useMemo(() => doc(db, 'usuarios', uid), [uid]))
  const avs = useAvaliacoesDoAluno(uid)
  const semInternet = useSemInternet()
  return (
    <main className="mx-auto max-w-md px-4 py-4 lg:max-w-3xl">
      <BotaoVoltar para={`/aluno/${uid}`} />
      <h1 className="mb-4 break-words text-2xl">Avaliação física de {aluno.dados?.nome ?? '…'}</h1>
      <Botao tipo="primario" className="mb-4 min-h-11 w-full" onClick={() => ir(`/aluno/${uid}/avaliacao/nova`)}>Nova avaliação</Botao>
      {avs.carregando ? (
        <Centro>Carregando…</Centro>
      ) : avs.dados.length === 0 ? (
        <p className="py-6 text-center text-slate-400">{semInternet ? TEXTO_SEM_INTERNET : 'Nenhuma avaliação ainda.'}</p>
      ) : (
        <ul className="space-y-2">
          {avs.dados.map((a) => {
            const g = resultado(a).gorduraPct
            return (
              <li key={a.id}>
                <a href={`#/aluno/${uid}/avaliacao/${a.id}`} className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <span className="min-w-0">
                    <span className="block font-semibold">{dataBR(a.data)}</span>
                    <span className="block truncate text-sm text-slate-400">
                      {fmtNum(a.pesoKg)} kg{g != null && ` · ${fmtNum(g)}% de gordura`}
                    </span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${a.liberado ? 'bg-green-500/15 text-green-300' : 'bg-slate-800 text-slate-300'}`}>
                    {a.liberado ? 'Liberada' : 'Rascunho'}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
