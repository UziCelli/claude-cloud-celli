import { collection, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import type { RegistroEvolucao } from '../../lib/evolucao'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'

// Todos os mesos e registros do aluno (os recordes comparam com os ciclos anteriores).
export function useDadosAluno(uid: string | undefined) {
  const mesosL = useLista<MesoSalvo & { id: string }>(useMemo(() => (uid ? query(collection(db, 'mesos'), where('alunoId', '==', uid)) : null), [uid]))
  const regsL = useLista<RegistroEvolucao>(useMemo(() => (uid ? query(collection(db, 'registros'), where('alunoId', '==', uid)) : null), [uid]))
  const mesos = useMemo(() => mesosL.dados.map((d) => ({ id: d.id, meso: docParaMeso(d), nome: d.nome })), [mesosL.dados])
  return { mesos, registros: regsL.dados, carregando: !uid || mesosL.carregando || regsL.carregando }
}
