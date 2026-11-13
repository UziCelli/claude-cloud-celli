import { addDoc, collection, doc, getDocFromServer, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { registroId } from '../../lib/conversores'
import { COLECAO_CHECKINS, type CheckinForm, type SessaoCheckin } from '../../lib/checkin'
import { COLECAO_DORES, validarDor, type DorForm } from '../../lib/dor'
import { COLECAO_FISIO, validarOrientacao, type OrientacaoForm } from '../../lib/fisio'

// Confirma rede antes de pôr uma publicação na fila. Nunca grava por cima de uma orientação existente.
export async function enviarOrientacao(uid: string, f: OrientacaoForm, exercicios: string[] = []) {
  const erro = validarOrientacao(f, new Date().toISOString().slice(0, 10))
  if (erro) throw new Error(erro)
  await getDocFromServer(doc(db, 'usuarios', uid))
  const ref = doc(collection(db, COLECAO_FISIO))
  await setDoc(ref, { ...f, condicao: f.condicao.trim(), recado: f.recado.trim(), alunoId: uid, recolhida: false, sinalRelatado: false, ...(exercicios.length ? { exercicios } : {}), em: serverTimestamp(), atualizadoEm: serverTimestamp() })
}
export const recolherOrientacao = (id: string) => updateDoc(doc(db, COLECAO_FISIO, id), { recolhida: true, atualizadoEm: serverTimestamp() })
// Lista de exercícios do selo no treino: só estes campos (a regra confere cada nome).
export const salvarExerciciosFisio = (id: string, exercicios: string[]) => updateDoc(doc(db, COLECAO_FISIO, id), { exercicios, atualizadoEm: serverTimestamp() })
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

// Check-in de recuperação do fim do treino: sem await (offline fica na fila). Só cria; nunca edita.
// Id = o da sessão: reenviar a mesma sessão escreve no mesmo documento (não duplica) e a regra nega o segundo.
export const registrarCheckin = (uid: string, s: SessaoCheckin, f: CheckinForm, dor24h: boolean | null = null) =>
  setDoc(doc(db, COLECAO_CHECKINS, registroId(s.mesoId, s.semana, s.treino)), { alunoId: uid, mesoId: s.mesoId, semana: s.semana, treino: s.treino, sono: f.sono, estresse: f.estresse, cansaco: f.cansaco, alimentacao: f.alimentacao, ...(dor24h === null ? {} : { dor24h }), em: serverTimestamp(), atualizadoEm: serverTimestamp() })
// O servidor já tem o check-in desta sessão? (a regra nega o segundo envio)
export const checkinJaExiste = async (s: SessaoCheckin) => (await getDocFromServer(doc(db, COLECAO_CHECKINS, registroId(s.mesoId, s.semana, s.treino)))).exists()
