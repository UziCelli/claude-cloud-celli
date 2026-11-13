import { collection, query, Timestamp, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { db } from '../../lib/firebase'
import { COLECAO_DORES, lerDor, type RelatoDor } from '../../lib/dor'
import { useLista } from '../../lib/hooks'

// Início do dia de 30 dias atrás: Menu, Início e Alertas fazem a MESMA consulta (o Firestore junta, sem leitura extra).
export const corte30dias = () => Math.floor(Date.now() / 86400_000) * 86400_000 - 30 * 86400_000

// Do aluno (uid) ou, sem uid, os da coleção inteira dos últimos 30 dias (cartão do Início do coach).
// Filtra e ordena aqui: evita índice composto no Firestore. Gravação pendente (em nulo) conta como agora.
export function useDores(uid: string | null, recentes = false) {
  const q = useMemo(() => {
    const c = collection(db, COLECAO_DORES)
    if (uid) return query(c, where('alunoId', '==', uid))
    return recentes ? query(c, where('em', '>=', Timestamp.fromMillis(corte30dias()))) : null
  }, [uid, recentes])
  const lista = useLista<object>(q)
  const dados = useMemo(() => lista.dados.map((d) => lerDor(d.id, d)).filter((d): d is RelatoDor => !!d)
    .sort((a, b) => (b.em?.toMillis() ?? Infinity) - (a.em?.toMillis() ?? Infinity) || b.id.localeCompare(a.id)).slice(0, uid ? 30 : 200), [lista.dados, uid])
  return { ...lista, dados }
}
