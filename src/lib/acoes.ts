// Gravações no Firestore. Offline, a promessa só resolve quando o servidor confirma:
// a tela não deve esperar (await) para mostrar o valor — o cache local já tem.
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, doc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc, waitForPendingWrites } from 'firebase/firestore'
import type { Meso } from '../engine'
import { fimDoDiaSaoPaulo, type Usuario } from './acesso'
import { docParaMeso, mesoParaDoc, registroId, type MesoDoc } from './conversores'
import { auth, db } from './firebase'

// ---------- coach ----------

export const definirAcesso = (uid: string, a: { status: Usuario['status']; pagoAte?: string /* YYYY-MM-DD */ }) =>
  updateDoc(doc(db, 'usuarios', uid), {
    status: a.status,
    ...(a.pagoAte && { pagoAte: Timestamp.fromDate(fimDoDiaSaoPaulo(a.pagoAte)) }),
  })

// Cria (mesoId null) ou substitui a prescrição. updateDoc troca cada campo de topo inteiro
// (sem mesclar mapas), então treinos/semanas/trocas removidos não sobram.
// O id sai na hora (gerado no aparelho); `gravado` só resolve quando o servidor confirma —
// offline, não espere por ele para navegar.
export function salvarMeso(mesoId: string | null, alunoId: string, nome: string, meso: Meso) {
  const dados = { alunoId, nome, ...mesoParaDoc(meso), atualizadoEm: serverTimestamp() }
  if (mesoId) return { id: mesoId, gravado: updateDoc(doc(db, 'mesos', mesoId), dados) }
  const ref = doc(collection(db, 'mesos'))
  return { id: ref.id, gravado: setDoc(ref, { ...dados, criadoEm: serverTimestamp() }) }
}

// Copia só a prescrição; registros (cargas) nunca são copiados.
export async function duplicarMeso(mesoId: string, novoAlunoId: string, novoNome: string) {
  const s = await getDoc(doc(db, 'mesos', mesoId))
  if (!s.exists()) throw new Error('Meso não encontrado')
  return salvarMeso(null, novoAlunoId, novoNome, docParaMeso(s.data() as MesoDoc))
}

// ---------- aluno ----------

// Estratégia de gravação do registro: setDoc com { merge: true } e identidade sempre junto.
// - 1ª gravação cria o documento; as seguintes mesclam campo a campo (cargas.<slotId>.sN),
//   sem apagar outras cargas nem outros campos.
// - A regra de update aceita: diff() só conta chaves cujo valor mudou, e alunoId/mesoId/
//   semana/treino vão com o mesmo valor (coberto em tests/rules.test.ts).
// - Funciona offline: não depende de o app já ter visto o documento. Já updateDoc em um
//   documento que só existe no servidor (ex.: criado em outro aparelho) ou que ainda não
//   existe falharia só na sincronização com not-found — e a carga se perderia.
const registro = (mesoId: string, alunoId: string, semana: number, treino: number, campos: object) =>
  setDoc(
    doc(db, 'registros', registroId(mesoId, semana, treino)),
    { alunoId, mesoId, semana, treino, ...campos, atualizadoEm: serverTimestamp() },
    { merge: true },
  )

export const registrarCarga = (
  mesoId: string,
  alunoId: string,
  semana: number,
  treino: number,
  slotId: string,
  coluna: number, // 0-based, como no motor
  kg: number | null,
) => registro(mesoId, alunoId, semana, treino, { cargas: { [slotId]: { [`s${coluna + 1}`]: kg } } })

export const marcarRealizado = (mesoId: string, alunoId: string, semana: number, treino: number, realizado: boolean) =>
  registro(mesoId, alunoId, semana, treino, { realizado, realizadoEm: realizado ? serverTimestamp() : null })

// ---------- login ----------

export const entrar = (email: string, senha: string) => signInWithEmailAndPassword(auth, email, senha)

// Cria o perfil exatamente como a regra exige: aluno aguardando, sem pagoAte.
export async function cadastrar(nome: string, email: string, senha: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, senha)
  await setDoc(doc(db, 'usuarios', user.uid), {
    papel: 'aluno',
    status: 'aguardando',
    nome,
    email,
    criadoEm: serverTimestamp(),
  })
  return user
}

// Antes de sair, espera as gravações pendentes chegarem ao servidor (ex.: o cadastro recém-feito);
// trocar de usuário com escrita na fila a deixaria presa. Offline, desiste em 5 s: o que ficou na
// fila continua salvo no aparelho e sobe quando essa pessoa entrar de novo.
export async function sair() {
  await Promise.race([waitForPendingWrites(db), new Promise((r) => setTimeout(r, 5000))])
  await signOut(auth)
}
