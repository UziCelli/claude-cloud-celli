import { collection, query, Timestamp, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { db } from '../../lib/firebase'
import { COLECAO_CHECKINS, lerCheckin, type Checkin } from '../../lib/checkin'
import { useLista } from '../../lib/hooks'
import { corteCalculo, MES } from './useDores'

// Do aluno (uid: últimos 30) ou, sem uid, de todos da janela de cálculo (coach). Ordena aqui (sem índice composto).
export function useCheckins(uid: string | null, recentes = false) {
  const q = useMemo(() => {
    const c = collection(db, COLECAO_CHECKINS)
    if (uid) return query(c, where('alunoId', '==', uid))
    return recentes ? query(c, where('em', '>=', Timestamp.fromMillis(corteCalculo()))) : null
  }, [uid, recentes])
  const lista = useLista<object>(q)
  const todos = useMemo(() => lista.dados.map((d) => lerCheckin(d.id, d)).filter((d): d is Checkin => !!d)
    .sort((a, b) => (b.em?.toMillis() ?? Infinity) - (a.em?.toMillis() ?? Infinity) || b.id.localeCompare(a.id)), [lista.dados])
  const dados = useMemo(() => uid ? todos.slice(0, 30) : todos.filter((c) => (c.em?.toMillis() ?? Date.now()) >= Date.now() - MES).slice(0, 600), [todos, uid])
  return { ...lista, dados, todos }
}
