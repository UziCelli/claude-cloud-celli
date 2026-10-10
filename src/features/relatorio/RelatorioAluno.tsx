import { collection, query, where, type Timestamp } from 'firebase/firestore'
import { useMemo } from 'react'
import { primeiroNome } from '../../lib/contato'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'
import { relatorioCiclo } from '../../lib/relatorio'
import { Centro } from '../../ui'
import Relatorio, { BotaoPdf } from './Relatorio'
import { useDadosAluno } from './useDadosAluno'

export type RelatorioDoc = { alunoId: string; mesoId: string; comentario: string; liberado: boolean; liberadoEm: Timestamp | null }

// O aluno só lê pela consulta (abrir pelo id é negado pelas regras): liberado == true.
export const useRelatoriosLiberados = (uid: string) =>
  useLista<RelatorioDoc>(useMemo(() => query(collection(db, 'relatorios'), where('alunoId', '==', uid), where('liberado', '==', true)), [uid]))

export default function RelatorioAluno({ uid, nome, mesoId }: { uid: string; nome: string; mesoId: string }) {
  const rels = useRelatoriosLiberados(uid)
  const dados = useDadosAluno(uid)
  const doc = rels.dados.find((x) => x.mesoId === mesoId)
  const r = doc ? relatorioCiclo(dados.mesos, dados.registros, mesoId, new Date()) : null
  return (
    <main className="mx-auto max-w-md px-4 py-4">
      <a href="#/" className="nao-imprimir mb-3 inline-block text-sm text-slate-400">← Início</a>
      {rels.carregando || dados.carregando ? (
        <Centro>Carregando…</Centro>
      ) : !doc || !r ? (
        <p className="py-6 text-center text-slate-400">Este relatório ainda não está disponível.</p>
      ) : (
        <div className="space-y-3">
          <Relatorio r={r} aluno={primeiroNome(nome)} comentario={doc.comentario} compartilhar />
          <BotaoPdf />
        </div>
      )}
    </main>
  )
}
