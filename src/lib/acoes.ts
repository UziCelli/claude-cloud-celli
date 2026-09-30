// Gravações no Firestore. Offline, a promessa só resolve quando o servidor confirma:
// a tela não deve esperar (await) para mostrar o valor — o cache local já tem.
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  verifyBeforeUpdateEmail,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocsFromServer,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  waitForPendingWrites,
  where,
  writeBatch,
} from 'firebase/firestore'
import type { Meso } from '../engine'
import { fimDoDiaSaoPaulo, type Usuario } from './acesso'
import { docParaMeso, mesoParaDoc, registroId, type MesoDoc } from './conversores'
import { auth, authCadastro, db } from './firebase'
import { inicioJanela } from './resumo'

// ---------- coach ----------

export const definirAcesso = (uid: string, a: { status: Usuario['status']; pagoAte?: string /* YYYY-MM-DD */ }) =>
  updateDoc(doc(db, 'usuarios', uid), {
    status: a.status,
    ...(a.pagoAte && { pagoAte: Timestamp.fromDate(fimDoDiaSaoPaulo(a.pagoAte)) }),
  })

const ERRO_EMAIL_EM_USO = 'Esse e-mail já tem conta — peça para o aluno entrar ou usar Esqueci minha senha'

// Cria a conta do aluno na instância secundária (o coach continua logado) com senha aleatória.
// O aluno cria a própria senha pelo link de sendPasswordResetEmail. Precisa de internet.
async function criarConta(email: string) {
  const a = authCadastro()
  try {
    const { user } = await createUserWithEmailAndPassword(a, email, `${crypto.randomUUID()}Aa1!`)
    return user.uid
  } catch (e) {
    if (e instanceof FirebaseError && e.code === 'auth/email-already-in-use') throw new Error(ERRO_EMAIL_EM_USO)
    throw e
  } finally {
    await signOut(a)
  }
}

const perfilApp = (nome: string, email: string, pagoAte: string) => ({
  papel: 'aluno',
  status: 'ativo',
  pagoAte: Timestamp.fromDate(fimDoDiaSaoPaulo(pagoAte)),
  nome,
  email,
})

// Aluno que usa o app. Devolve o uid.
export async function criarAlunoComApp(a: { nome: string; email: string; pagoAte: string /* YYYY-MM-DD */ }) {
  const uid = await criarConta(a.email)
  await setDoc(doc(db, 'usuarios', uid), { ...perfilApp(a.nome, a.email, a.pagoAte), criadoEm: serverTimestamp() })
  await sendPasswordResetEmail(auth, a.email)
  return uid
}

// Aluno presencial: sem login, o coach anota as cargas. email '' (a lista de alunos busca por e-mail).
// Funciona offline: o id sai na hora; `gravado` só resolve quando o servidor confirma (como salvarMeso).
export function criarAlunoPresencial(a: { nome: string }) {
  const ref = doc(collection(db, 'usuarios'))
  const gravado = setDoc(ref, { papel: 'aluno', status: 'ativo', presencial: true, nome: a.nome, email: '', criadoEm: serverTimestamp() })
  return { id: ref.id, gravado }
}

// Presencial -> aluno com app, mantendo o histórico. Ordem pensada para nunca perder dados;
// se falhar no meio, chamar de novo continua de onde parou:
// 1. cria a conta (ou reaproveita a anotada em migradoPara) e anota migradoPara no perfil antigo;
// 2. cria o perfil novo; 3. troca alunoId de mesos e registros (lotes de 400; os ids dos
// registros só têm o mesoId, continuam válidos); 4. apaga o perfil antigo; 5. e-mail de senha.
export async function darAcessoAoApp(idPresencial: string, a: { email: string; pagoAte: string /* YYYY-MM-DD */ }) {
  const antigo = doc(db, 'usuarios', idPresencial)
  const s = await getDoc(antigo)
  if (!s.exists()) throw new Error('Aluno não encontrado')
  const p = s.data() as Usuario & { migradoPara?: string }
  if (!p.presencial) throw new Error('Esse aluno já usa o app')
  let uid = p.migradoPara
  if (!uid) {
    uid = await criarConta(a.email)
    await updateDoc(antigo, { migradoPara: uid })
  }
  await setDoc(doc(db, 'usuarios', uid), { ...perfilApp(p.nome, a.email, a.pagoAte), criadoEm: p.criadoEm ?? serverTimestamp() })
  for (const col of ['mesos', 'registros']) {
    // Do servidor (nunca do cache): offline dá erro antes de apagar o perfil antigo.
    const docs = (await getDocsFromServer(query(collection(db, col), where('alunoId', '==', idPresencial)))).docs
    for (let i = 0; i < docs.length; i += 400) {
      const b = writeBatch(db)
      for (const d of docs.slice(i, i + 400)) b.update(d.ref, { alunoId: uid })
      await b.commit()
    }
  }
  await deleteDoc(antigo)
  await sendPasswordResetEmail(auth, a.email)
  return uid
}

// Painel: registros atualizados nos últimos 14 dias (desde o início do dia em São Paulo).
// Filtro de um campo só: usa o índice automático, sem índice composto. Estável durante o dia.
export const consultaRegistrosRecentes = (agora: Date) =>
  query(collection(db, 'registros'), where('atualizadoEm', '>=', Timestamp.fromMillis(inicioJanela(agora, 14))))

// Cria (mesoId null) ou substitui a prescrição. updateDoc troca cada campo de topo inteiro
// (sem mesclar mapas), então treinos/semanas/trocas removidos não sobram.
// O id sai na hora (gerado no aparelho); `gravado` só resolve quando o servidor confirma —
// offline, não espere por ele para navegar.
// Edição não regrava alunoId: um editor aberto durante darAcessoAoApp devolveria o id antigo.
export function salvarMeso(mesoId: string | null, alunoId: string, nome: string, meso: Meso) {
  const dados = { nome, ...mesoParaDoc(meso), atualizadoEm: serverTimestamp() }
  if (mesoId) return { id: mesoId, gravado: updateDoc(doc(db, 'mesos', mesoId), dados) }
  const ref = doc(collection(db, 'mesos'))
  return { id: ref.id, gravado: setDoc(ref, { ...dados, alunoId, criadoEm: serverTimestamp() }) }
}

// Apaga o meso e os registros (cargas) dele. Registros primeiro: se cair no meio, o meso continua
// na lista e é só excluir de novo. Lê do servidor (nunca do cache): offline dá erro sem apagar nada.
export async function excluirMeso(mesoId: string) {
  const regs = (await getDocsFromServer(query(collection(db, 'registros'), where('mesoId', '==', mesoId)))).docs
  for (let i = 0; i < regs.length; i += 400) {
    const b = writeBatch(db)
    for (const d of regs.slice(i, i + 400)) b.delete(d.ref)
    await b.commit()
  }
  await deleteDoc(doc(db, 'mesos', mesoId))
}

// Apaga o aluno de vez: registros, mesos, notas e, por último, o perfil (se cair no meio, o
// perfil arquivado continua na lista e é só apagar de novo). Do servidor: offline dá erro sem apagar.
// O login (e-mail) no Firebase Auth continua existindo.
export async function apagarAluno(uid: string) {
  for (const col of ['registros', 'mesos']) {
    const docs = (await getDocsFromServer(query(collection(db, col), where('alunoId', '==', uid)))).docs
    for (let i = 0; i < docs.length; i += 400) {
      const b = writeBatch(db)
      for (const d of docs.slice(i, i + 400)) b.delete(d.ref)
      await b.commit()
    }
  }
  await deleteDoc(doc(db, 'notas', uid))
  await deleteDoc(doc(db, 'usuarios', uid))
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

// Reps feitas (opcional): mesmo caminho campo a campo das cargas (reps.<slotId>.sN).
export const registrarReps = (
  mesoId: string,
  alunoId: string,
  semana: number,
  treino: number,
  slotId: string,
  coluna: number, // 0-based, como no motor
  n: number | null,
) => registro(mesoId, alunoId, semana, treino, { reps: { [slotId]: { [`s${coluna + 1}`]: n } } })

// Peso do corpo usado no exercício com PC (0 = desligado): pc.<slotId>.
export const registrarPc = (mesoId: string, alunoId: string, semana: number, treino: number, slotId: string, kg: number) =>
  registro(mesoId, alunoId, semana, treino, { pc: { [slotId]: kg } })

export const salvarPeso = (uid: string, kg: number) => updateDoc(doc(db, 'usuarios', uid), { pesoKg: kg })

export const marcarRealizado = (mesoId: string, alunoId: string, semana: number, treino: number, realizado: boolean) =>
  registro(mesoId, alunoId, semana, treino, { realizado, realizadoEm: realizado ? serverTimestamp() : null })

// Primeira ação do aluno no treino: o chamador só chama se o registro ainda não tem inicioEm.
export const marcarInicio = (mesoId: string, alunoId: string, semana: number, treino: number) =>
  registro(mesoId, alunoId, semana, treino, { inicioEm: serverTimestamp() })

// Anotação do aluno por exercício (vale em todas as semanas/mesos). '' = sem nota.
export const salvarNota = (alunoId: string, exercicio: string, texto: string) =>
  setDoc(
    doc(db, 'notas', alunoId),
    { alunoId, exercicios: { [exercicio]: texto.trim().slice(0, 300) }, atualizadoEm: serverTimestamp() },
    { merge: true },
  )

// ---------- login ----------

export const entrar = (email: string, senha: string) => signInWithEmailAndPassword(auth, email, senha)

// E-mail em pt-BR (auth.languageCode em firebase.ts).
export const recuperarSenha = (email: string) => sendPasswordResetEmail(auth, email)

// Troca de e-mail: confirma a senha e manda o link para o e-mail NOVO. A troca só acontece
// quando a pessoa clica no link (até lá o login continua com o e-mail antigo).
export async function alterarEmail(senhaAtual: string, novoEmail: string) {
  const user = auth.currentUser
  if (!user?.email) throw new Error('Sem login')
  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, senhaAtual))
  await verifyBeforeUpdateEmail(user, novoEmail)
}

// Depois da confirmação (e de entrar de novo), copia o e-mail do login para o perfil.
// Só coaches (a regra reserva o e-mail ao coach). Não precisa de await: se falhar, tenta na próxima vez.
export function sincronizarEmail(uid: string, perfilEmail: string) {
  const email = auth.currentUser?.email
  if (email && email !== perfilEmail) updateDoc(doc(db, 'usuarios', uid), { email }).catch(() => {})
}

// Cria o perfil exatamente como a regra exige: aluno aguardando, sem pagoAte.
export async function cadastrar(nome: string, email: string, senha: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, senha)
  await setDoc(doc(db, 'usuarios', user.uid), {
    papel: 'aluno',
    status: 'aguardando',
    nome,
    email: (user.email ?? email).toLowerCase(), // o da regra: igual ao do login
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
