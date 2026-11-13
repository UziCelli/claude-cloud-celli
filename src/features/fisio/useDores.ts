import { collection, query, Timestamp, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { db } from '../../lib/firebase'
import { COLECAO_DORES, lerDor, type RelatoDor } from '../../lib/dor'
import { useLista } from '../../lib/hooks'
import { JANELA_CALCULO_DIAS } from '../../lib/sugestoesFisio'

// Início do dia de JANELA_CALCULO_DIAS atrás: Menu, Início e Alertas fazem a MESMA consulta (o Firestore junta, sem leitura extra).
const DIA = 86400_000
export const corteCalculo = () => Math.floor(Date.now() / DIA) * DIA - JANELA_CALCULO_DIAS * DIA
export const MES = 30 * DIA

// Do aluno (uid) ou, sem uid, os da coleção inteira da janela de cálculo (cartão do Início do coach).
// Filtra e ordena aqui: evita índice composto no Firestore. Gravação pendente (em nulo) conta como agora.
export function useDores(uid: string | null, recentes = false) {
  const q = useMemo(() => {
    const c = collection(db, COLECAO_DORES)
    if (uid) return query(c, where('alunoId', '==', uid))
    return recentes ? query(c, where('em', '>=', Timestamp.fromMillis(corteCalculo()))) : null
  }, [uid, recentes])
  const lista = useLista<object>(q)
  // todos = tudo que a consulta trouxe (entrada do motor); dados = o que a tela exibe (aluno: 30 mais recentes; coach: 30 dias, até 200).
  const todos = useMemo(() => lista.dados.map((d) => lerDor(d.id, d)).filter((d): d is RelatoDor => !!d)
    .sort((a, b) => (b.em?.toMillis() ?? Infinity) - (a.em?.toMillis() ?? Infinity) || b.id.localeCompare(a.id)), [lista.dados])
  const dados = useMemo(() => uid ? todos.slice(0, 30) : todos.filter((d) => (d.em?.toMillis() ?? Date.now()) >= Date.now() - MES).slice(0, 200), [todos, uid])
  return { ...lista, dados, todos }
}
