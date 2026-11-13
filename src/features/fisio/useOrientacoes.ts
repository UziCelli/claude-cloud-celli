import { collection, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { db } from '../../lib/firebase'
import { COLECAO_FISIO, lerOrientacao, type OrientacaoFisio } from '../../lib/fisio'
import { useLista } from '../../lib/hooks'

export function useOrientacoes(uid: string | null, coach = false) {
  const q = useMemo(() => {
    const c = collection(db, COLECAO_FISIO)
    return uid ? query(c, where('alunoId', '==', uid), ...(!coach ? [where('recolhida', '==', false)] : [])) : coach ? query(c, where('sinalRelatado', '==', true), where('recolhida', '==', false)) : null
  }, [uid, coach])
  const lista = useLista<object>(q)
  const dados = useMemo(() => lista.dados.map((d) => lerOrientacao(d.id, d)).filter((d): d is OrientacaoFisio => !!d)
    .sort((a, b) => (b.em?.toMillis() ?? 0) - (a.em?.toMillis() ?? 0) || b.id.localeCompare(a.id)), [lista.dados])
  return { ...lista, dados }
}
