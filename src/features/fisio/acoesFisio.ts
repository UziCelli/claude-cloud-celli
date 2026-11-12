import { collection, doc, getDocFromServer, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { COLECAO_FISIO, validarOrientacao, type OrientacaoForm } from '../../lib/fisio'

// Confirma rede antes de pôr uma publicação na fila. Nunca grava por cima de uma orientação existente.
export async function enviarOrientacao(uid: string, f: OrientacaoForm) {
  const erro = validarOrientacao(f, new Date().toISOString().slice(0, 10))
  if (erro) throw new Error(erro)
  await getDocFromServer(doc(db, 'usuarios', uid))
  const ref = doc(collection(db, COLECAO_FISIO))
  await setDoc(ref, { ...f, condicao: f.condicao.trim(), recado: f.recado.trim(), alunoId: uid, recolhida: false, sinalRelatado: false, em: serverTimestamp(), atualizadoEm: serverTimestamp() })
}
export const recolherOrientacao = (id: string) => updateDoc(doc(db, COLECAO_FISIO, id), { recolhida: true, atualizadoEm: serverTimestamp() })
// O sinal permanece no histórico. Edição campo a campo preserva conteúdo e recolhimento concorrente.
export const relatarSinalFisio = (id: string) => updateDoc(doc(db, COLECAO_FISIO, id), { sinalRelatado: true, sinalEm: serverTimestamp(), atualizadoEm: serverTimestamp() })
