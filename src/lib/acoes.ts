// Gravações no Firestore. Offline, a promessa só resolve quando o servidor confirma:
// a tela não deve esperar (await) para mostrar o valor — o cache local já tem.
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getMultiFactorResolver,
  multiFactor,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  TotpMultiFactorGenerator,
  type MultiFactorResolver,
  type TotpSecret,
  verifyBeforeUpdateEmail,
  sendEmailVerification,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { registrarErro } from './log'
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocFromServer,
  getDocs,
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
import { fimDoDiaSaoPaulo, proximoVencimento, type Usuario } from './acesso'
import { arquivadosVencidos } from './alertas'
import { idCardio, type TipoCardio } from './cardio'
import { docParaMeso, mesoParaDoc, registroId, type MesoDoc } from './conversores'
import { auth, authCadastro, db } from './firebase'
import type { Importado } from './planilha'
import { inicioJanela } from './resumo'
import { VERSAO_PRIVACIDADE } from './privacidade'
import marca from '@marca/marca.json'

// ---------- coach ----------

export const definirAcesso = (uid: string, a: { status: Usuario['status']; pagoAte?: string /* YYYY-MM-DD */ }) =>
  updateDoc(doc(db, 'usuarios', uid), {
    status: a.status,
    ...(a.pagoAte && { pagoAte: Timestamp.fromDate(fimDoDiaSaoPaulo(a.pagoAte)) }),
  })

// Pix simples: o coach define a mensalidade; o aluno toca "Já paguei"; o coach confirma (+1 mês).
// Sempre campo a campo (updateDoc), nunca o documento inteiro.
export const salvarMensalidade = (uid: string, valor: number | null) =>
  updateDoc(doc(db, 'usuarios', uid), { mensalidade: valor === null ? deleteField() : valor })

export const informarPagamento = (uid: string) =>
  updateDoc(doc(db, 'usuarios', uid), { pagamentoInformadoEm: serverTimestamp() })

// pagoAte = vencimento atual do aluno (quem paga adiantado não perde dias). Devolve o novo vencimento
// (YYYY-MM-DD) na hora e a gravação à parte: offline a promessa só resolve ao reconectar.
export function confirmarPagamento(uid: string, pagoAte: Timestamp | undefined) {
  const data = proximoVencimento(pagoAte, new Date())
  const gravando = updateDoc(doc(db, 'usuarios', uid), {
    pagoAte: Timestamp.fromDate(fimDoDiaSaoPaulo(data)),
    pagamentoInformadoEm: deleteField(),
  })
  return { data, gravando }
}

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
// 2. cria o perfil novo; 3. troca alunoId de mesos, registros e relatórios (lotes de 400; os ids dos
// registros só têm o mesoId, continuam válidos; relatórios depois dos mesos, que a regra confere o dono
// do meso); 4. apaga o perfil antigo; 5. e-mail de senha.
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
  for (const col of ['mesos', 'registros', 'relatorios']) {
    // Do servidor (nunca do cache): offline dá erro antes de apagar o perfil antigo.
    const docs = (await getDocsFromServer(query(collection(db, col), where('alunoId', '==', idPresencial)))).docs
    // A regra do relatório exige atualizadoEm da hora do servidor; registros não (atualizadoEm deles é a janela de 14 dias).
    const campos = col === 'relatorios' ? { alunoId: uid, atualizadoEm: serverTimestamp() } : { alunoId: uid }
    for (let i = 0; i < docs.length; i += 400) {
      const b = writeBatch(db)
      for (const d of docs.slice(i, i + 400)) b.update(d.ref, campos)
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

// Importa um meso da planilha com as cargas já registradas, tudo num lote só (tudo ou nada).
// Sem a data real do treino: meio-dia (SP) do dia estimado = início + semana + treino, nunca no futuro.
// Offline: o id sai na hora e `gravado` resolve quando o servidor confirmar (como salvarMeso).
export async function importarMeso(alunoId: string, nome: string, { meso, registros }: Importado) {
  const iguais = await getDocs(query(collection(db, 'mesos'), where('alunoId', '==', alunoId), where('nome', '==', nome)))
  if (!iguais.empty) throw new Error(`Este aluno já tem um mesociclo chamado "${nome}".`)
  const b = writeBatch(db)
  const ref = doc(collection(db, 'mesos'))
  b.set(ref, { nome, ...mesoParaDoc(meso), atualizadoEm: serverTimestamp(), alunoId, criadoEm: serverTimestamp() })
  for (const r of registros) {
    const ms = Date.parse(`${meso.inicio}T15:00:00Z`) + ((r.semana - 1) * 7 + (r.treino - 1)) * 864e5
    const quando = Timestamp.fromMillis(Math.min(ms, Date.now()))
    b.set(doc(db, 'registros', registroId(ref.id, r.semana, r.treino)), {
      alunoId, mesoId: ref.id, semana: r.semana, treino: r.treino,
      realizado: r.realizado, realizadoEm: r.realizado ? quando : null, cargas: r.cargas, atualizadoEm: quando,
    })
  }
  return { id: ref.id, gravado: b.commit() }
}

// Marca que o coach adaptou o treino (o aluno vê o aviso uma vez).
export const marcarAdaptado = (mesoId: string) => updateDoc(doc(db, 'mesos', mesoId), { adaptadoEm: serverTimestamp() })

// Apaga o meso, os registros (cargas) e o relatório dele. Meso por último: se cair no meio, ele continua
// na lista e é só excluir de novo. Lê do servidor (nunca do cache): offline dá erro sem apagar nada.
export async function excluirMeso(mesoId: string) {
  const regs = (await getDocsFromServer(query(collection(db, 'registros'), where('mesoId', '==', mesoId)))).docs
  for (let i = 0; i < regs.length; i += 400) {
    const b = writeBatch(db)
    for (const d of regs.slice(i, i + 400)) b.delete(d.ref)
    await b.commit()
  }
  await deleteDoc(doc(db, 'relatorios', mesoId))
  await deleteDoc(doc(db, 'mesos', mesoId))
}

// Apaga o aluno de vez: registros, relatórios, mesos, notas e, por último, o perfil (se cair no meio, o
// perfil arquivado continua na lista e é só apagar de novo). Do servidor: offline dá erro sem apagar.
// Antes de tudo grava o pedido exclusoes/{uid}: se cair no meio, o workflow diário "Limpeza LGPD"
// (tools/limpeza-lgpd.mjs) termina o serviço. É ele que apaga o login (Auth), os erros (logs) e os
// backups do aluno, e por fim o pedido.
export async function apagarAluno(uid: string) {
  await getDocFromServer(doc(db, 'usuarios', uid)) // offline: erro na hora (senão o pedido ficaria na fila e a tela esperando)
  await setDoc(doc(db, 'exclusoes', uid), { em: serverTimestamp() })
  for (const col of ['registros', 'relatorios', 'mesos', 'cardios']) {
    const docs = (await getDocsFromServer(query(collection(db, col), where('alunoId', '==', uid)))).docs
    for (let i = 0; i < docs.length; i += 400) {
      const b = writeBatch(db)
      for (const d of docs.slice(i, i + 400)) b.delete(d.ref)
      await b.commit()
    }
  }
  await deleteDoc(doc(db, 'notas', uid))
  await deleteDoc(doc(db, 'fotos', uid))
  await deleteDoc(doc(db, 'usuarios', uid))
}

// Copia só a prescrição; registros (cargas) e relatório nunca são copiados.
export async function duplicarMeso(mesoId: string, novoAlunoId: string, novoNome: string) {
  const s = await getDoc(doc(db, 'mesos', mesoId))
  if (!s.exists()) throw new Error('Meso não encontrado')
  return salvarMeso(null, novoAlunoId, novoNome, docParaMeso(s.data() as MesoDoc))
}

// Alertas arquivados (arquivados/{chave} = { em }; chave = chaveAlerta em alertas.ts). Sem await (offline).
export const arquivarAlerta = (chave: string) => setDoc(doc(db, 'arquivados', chave), { em: serverTimestamp() })
export const desarquivarAlerta = (chave: string) => deleteDoc(doc(db, 'arquivados', chave))

// Cardio do dia (cardios/{uid}_{dia}). Substitui o doc inteiro; sem await (offline) e sem campos undefined.
export const registrarCardio = (uid: string, dia: string, c: { tipo?: TipoCardio; min?: number }) =>
  setDoc(doc(db, 'cardios', idCardio(uid, dia)), { alunoId: uid, dia, em: serverTimestamp(), ...(c.tipo ? { tipo: c.tipo } : {}), ...(c.min ? { min: c.min } : {}) })
export const desfazerCardio = (uid: string, dia: string) => deleteDoc(doc(db, 'cardios', idCardio(uid, dia)))

// Apaga os arquivados com mais de 14 dias que não batem com nenhum alerta atual (chavesAtuais em
// calcularAlertas.ts). Chamar só com tudo carregado. Erro vai para o log; ninguém espera a promessa.
export function limparArquivadosAntigos(docs: { id: string; em?: Timestamp | null }[], chavesAtuais: Set<string>, agora: Date) {
  const ids = arquivadosVencidos(docs, chavesAtuais, agora)
  if (ids.length === 0) return Promise.resolve()
  const b = writeBatch(db)
  for (const id of ids.slice(0, 400)) b.delete(doc(db, 'arquivados', id))
  return b.commit().catch((e) => registrarErro('gravacao', `arquivados: ${e?.code ?? e}`, e))
}

// Relatório do fim do ciclo: relatorios/{mesoId}. Só o comentário e se está liberado; os números são
// calculados na hora (relatorio.ts). Sempre setDoc com merge e todos os campos (a regra exige todos).
// Rascunho: o aluno não vê. Liberar: o aluno vê (liberar de novo atualiza o texto e liberadoEm).
const relatorio = (mesoId: string, alunoId: string, comentario: string, liberado: boolean) =>
  setDoc(
    doc(db, 'relatorios', mesoId),
    {
      alunoId,
      mesoId,
      comentario: comentario.trim().slice(0, 3000),
      liberado,
      liberadoEm: liberado ? serverTimestamp() : null,
      atualizadoEm: serverTimestamp(),
    },
    { merge: true },
  )
export const salvarRelatorio = (mesoId: string, alunoId: string, comentario: string) => relatorio(mesoId, alunoId, comentario, false)
export const liberarRelatorio = (mesoId: string, alunoId: string, comentario: string) => relatorio(mesoId, alunoId, comentario, true)
// Volta a rascunho sem mexer no comentário.
export const recolherRelatorio = (mesoId: string) =>
  setDoc(doc(db, 'relatorios', mesoId), { liberado: false, liberadoEm: null, atualizadoEm: serverTimestamp() }, { merge: true })

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
  ).catch((e) => {
    registrarErro('gravacao', `registro: ${e?.code ?? e}`, e)
    throw e
  })

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
// `cargas` (de `rebasear`) vai na MESMA gravação: pc e cargas nunca ficam meio trocados, nem num snapshot no meio.
export const registrarPc = (
  mesoId: string,
  alunoId: string,
  semana: number,
  treino: number,
  slotId: string,
  kg: number,
  cargas: { coluna: number; kg: number }[] = [],
) =>
  registro(mesoId, alunoId, semana, treino, {
    pc: { [slotId]: kg },
    ...(cargas.length > 0 && { cargas: { [slotId]: Object.fromEntries(cargas.map((c) => [`s${c.coluna + 1}`, c.kg])) } }),
  })

export const salvarPeso = (uid: string, kg: number) => updateDoc(doc(db, 'usuarios', uid), { pesoKg: kg })

// Perfil do aluno (aba Conta). Nome: 1..80 caracteres (nomeValido nas regras).
export const salvarNome = (uid: string, nome: string) => updateDoc(doc(db, 'usuarios', uid), { nome: nome.trim().slice(0, 80) })
export const salvarSelo = (uid: string, selo: boolean) => updateDoc(doc(db, 'usuarios', uid), { selo })
// img: data URL JPEG já reduzida (reduzirFoto em src/lib/foto.ts).
export const salvarFoto = (uid: string, img: string) => setDoc(doc(db, 'fotos', uid), { img, atualizadoEm: serverTimestamp() })
export const apagarFoto = (uid: string) => deleteDoc(doc(db, 'fotos', uid))

// Aceite da Política de Privacidade (consentimento da LGPD, inclusive para dados de saúde).
export const aceitarPrivacidade = (uid: string) =>
  updateDoc(doc(db, 'usuarios', uid), { privacidadeEm: serverTimestamp(), privacidadeVersao: VERSAO_PRIVACIDADE })

export const marcarRealizado = (mesoId: string, alunoId: string, semana: number, treino: number, realizado: boolean) =>
  registro(mesoId, alunoId, semana, treino, { realizado, realizadoEm: realizado ? serverTimestamp() : null })

// Primeira ação do aluno no treino: o chamador só chama se o registro ainda não tem inicioEm.
export const marcarInicio = (mesoId: string, alunoId: string, semana: number, treino: number) =>
  registro(mesoId, alunoId, semana, treino, { inicioEm: serverTimestamp() })

// Cancelar treino iniciado: UM updateDoc que apaga inicioEm e cada campo já gravado (campo a campo, como
// registrarCarga/Reps/Pc), para uma carga que chegar depois de outro aparelho não ser apagada. Sem registro, não faz nada.
export const cancelarTreino = (
  mesoId: string,
  semana: number,
  treino: number,
  atual: { cargas?: Record<string, object>; reps?: Record<string, object>; pc?: Record<string, unknown> } | undefined,
) => {
  if (!atual) return
  const apagar: Record<string, unknown> = { inicioEm: deleteField(), atualizadoEm: serverTimestamp() }
  for (const mapa of ['cargas', 'reps'] as const)
    for (const [slot, cols] of Object.entries(atual[mapa] ?? {}))
      for (const k of Object.keys(cols)) apagar[`${mapa}.${slot}.${k}`] = deleteField()
  for (const slot of Object.keys(atual.pc ?? {})) apagar[`pc.${slot}`] = deleteField()
  updateDoc(doc(db, 'registros', registroId(mesoId, semana, treino)), apagar).catch((e) =>
    registrarErro('gravacao', `registro: ${e?.code ?? e}`, e), // ninguém espera esta promessa: não relança
  )
}

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
export async function reautenticar(senhaAtual: string) {
  const user = auth.currentUser
  if (!user?.email) throw new Error('Sem login')
  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, senhaAtual))
  return user
}

export async function alterarEmail(senhaAtual: string, novoEmail: string) {
  const user = await reautenticar(senhaAtual)
  await verifyBeforeUpdateEmail(user, novoEmail)
}

// ---------- verificação em 2 etapas (TOTP) ----------

// Login: o Firebase lança auth/multi-factor-auth-required; o resolver guarda o fator do coach.
export const resolverMfa = (e: FirebaseError) => getMultiFactorResolver(auth, e as never)

export function confirmarLoginTotp(resolver: MultiFactorResolver, codigo: string) {
  const hint = resolver.hints.find((h) => h.factorId === TotpMultiFactorGenerator.FACTOR_ID)
  if (!hint) throw new Error('Sem fator TOTP')
  return resolver.resolveSignIn(TotpMultiFactorGenerator.assertionForSignIn(hint.uid, codigo))
}

export const temTotp = () =>
  !!auth.currentUser &&
  multiFactor(auth.currentUser).enrolledFactors.some((f) => f.factorId === TotpMultiFactorGenerator.FACTOR_ID)

export async function iniciarTotp() {
  const user = auth.currentUser
  if (!user) throw new Error('Sem login')
  // O Firebase exige e-mail confirmado; recarrega para pegar a confirmação feita pelo link.
  await user.reload()
  if (!user.emailVerified) {
    await sendEmailVerification(user)
    throw new FirebaseError('auth/unverified-email', 'E-mail não confirmado')
  }
  await user.getIdToken(true)
  const secret = await TotpMultiFactorGenerator.generateSecret(await multiFactor(user).getSession())
  return { secret, uri: secret.generateQrCodeUrl(user.email ?? '', marca.nome) }
}

export async function ativarTotp(secret: TotpSecret, codigo: string) {
  const user = auth.currentUser
  if (!user) throw new Error('Sem login')
  await multiFactor(user).enroll(TotpMultiFactorGenerator.assertionForEnrollment(secret, codigo), 'Google Authenticator')
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
    privacidadeEm: serverTimestamp(), // a tela só chama depois do aceite
    privacidadeVersao: VERSAO_PRIVACIDADE,
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
