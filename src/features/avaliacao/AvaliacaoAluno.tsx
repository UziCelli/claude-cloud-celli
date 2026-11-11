import { collection, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { cicloDaAvaliacao, dataBR, lerAvaliacao, relatorioAvaliacao, type Avaliacao as Av } from '../../lib/avaliacao'
import { primeiroNome } from '../../lib/contato'
import { db } from '../../lib/firebase'
import { TEXTO_SEM_INTERNET, useLista, useSemInternet } from '../../lib/hooks'
import { historicoExercicios } from '../../lib/evolucao'
import { relatorioCiclo } from '../../lib/relatorio'
import { Centro } from '../../ui'
import { BotaoVoltar } from '../../voltar'
import { useDadosAluno } from '../relatorio/useDadosAluno'
import Avaliacao, { BotaoPdfAvaliacao } from './Avaliacao'

// O aluno só lê pela consulta (abrir pelo id é negado pelas regras): alunoId == uid e liberado == true.
export function useAvaliacoesLiberadas(uid: string) {
  const l = useLista<object>(useMemo(() => query(collection(db, 'avaliacoes'), where('alunoId', '==', uid), where('liberado', '==', true)), [uid]))
  const dados = useMemo(
    () => l.dados.map((d) => lerAvaliacao(d.id, d)).filter((a): a is Av => !!a).sort((a, b) => b.data.localeCompare(a.data) || b.id.localeCompare(a.id)),
    [l.dados],
  )
  return { dados, carregando: l.carregando }
}

export default function AvaliacaoAluno({ uid, nome, id }: { uid: string; nome: string; id: string }) {
  const avs = useAvaliacoesLiberadas(uid)
  const dados = useDadosAluno(uid)
  const semInternet = useSemInternet()
  const a = avs.dados.find((x) => x.id === id)
  // Uma vez por mudança de dados (antes: a cada render, ~1 por lista que chegava, durante a entrada da tela).
  const r = useMemo(() => {
    if (!a) return null
    const cicloId = cicloDaAvaliacao(dados.mesos, a.data)
    const ciclo = cicloId ? relatorioCiclo(dados.mesos, dados.registros, cicloId, new Date()) : null
    return relatorioAvaliacao(avs.dados, id, ciclo, historicoExercicios(dados.mesos, dados.registros))
  }, [a, avs.dados, id, dados.mesos, dados.registros])
  const outras = avs.dados.filter((x) => x.id !== id)
  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <BotaoVoltar para="/" />
      {avs.carregando || dados.carregando ? (
        <Centro>Carregando…</Centro>
      ) : !a || !r ? (
        <p className="py-6 text-center text-slate-400">{semInternet ? TEXTO_SEM_INTERNET : 'Esta avaliação ainda não está disponível.'}</p>
      ) : (
        <div className="space-y-3">
          <Avaliacao r={r} aluno={primeiroNome(nome)} comentario={a.comentario} />
          <BotaoPdfAvaliacao r={r} aluno={nome} comentario={a.comentario} />
          {outras.length > 0 && (
            <section className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <h2 className="font-semibold">Outras avaliações</h2>
              <ul className="space-y-1">
                {outras.map((x) => (
                  <li key={x.id}>
                    <a href={`#/avaliacao/${x.id}`} className="flex min-h-11 items-center text-marca-300 underline">Avaliação de {dataBR(x.data)}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  )
}
