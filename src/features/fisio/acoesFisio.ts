import { addDoc, collection, doc, getDocFromServer, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { COLECAO_DORES, validarDor, type DorForm } from '../../lib/dor'
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

// Relato de dor: chamar SEM await (offline a promessa só resolve na sincronização; o treino nunca espera).
export function relatarDor(uid: string, f: DorForm) {
  const erro = validarDor(f)
  if (erro) return Promise.reject(new Error(erro))
  const texto = f.texto.trim()
  return addDoc(collection(db, COLECAO_DORES), { alunoId: uid, exercicio: f.exercicio, articulacao: f.articulacao, tipo: f.tipo, intensidade: f.intensidade, momento: f.momento, ...(texto ? { texto } : {}), em: serverTimestamp(), atualizadoEm: serverTimestamp() })
}
// Campo a campo (a regra só aceita estes). "Responder" também marca como visto.
export const responderDor = (id: string, resposta: string) => updateDoc(doc(db, COLECAO_DORES, id), { resposta: resposta.trim(), respondidoEm: serverTimestamp(), vistoEm: serverTimestamp(), atualizadoEm: serverTimestamp() })
export const marcarDorVista = (id: string) => updateDoc(doc(db, COLECAO_DORES, id), { vistoEm: serverTimestamp(), atualizadoEm: serverTimestamp() })
