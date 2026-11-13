import { collection, query, Timestamp, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { db } from '../../lib/firebase'
import { COLECAO_CHECKINS, lerCheckin, type Checkin } from '../../lib/checkin'
import { useLista } from '../../lib/hooks'
import { corte30dias } from './useDores'

// Do aluno (uid: últimos 30) ou, sem uid, de todos os dos últimos 30 dias (coach). Ordena aqui (sem índice composto).
export function useCheckins(uid: string | null, todos = false) {
  const q = useMemo(() => {
    const c = collection(db, COLECAO_CHECKINS)
    if (uid) return query(c, where('alunoId', '==', uid))
    return todos ? query(c, where('em', '>=', Timestamp.fromMillis(corte30dias()))) : null
  }, [uid, todos])
  const lista = useLista<object>(q)
  const dados = useMemo(() => lista.dados.map((d) => lerCheckin(d.id, d)).filter((d): d is Checkin => !!d)
    .sort((a, b) => (b.em?.toMillis() ?? Infinity) - (a.em?.toMillis() ?? Infinity) || b.id.localeCompare(a.id)).slice(0, uid ? 30 : 600), [lista.dados, uid])
  return { ...lista, dados }
}
