// Limpeza LGPD: para cada pedido em `exclusoes/{uid}` apaga o que o app não alcança
// (registros, mesos, notas, perfil, logs e o login do Auth). Roda no workflow "Limpeza LGPD".
// O resumo só tem contagens: nunca nome, e-mail ou uid (o log do Actions não guarda dado pessoal).
// Uso local: GOOGLE_APPLICATION_CREDENTIALS=sa.json node limpeza-lgpd.mjs
import { appendFileSync } from 'node:fs'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

const emulador = !!process.env.FIRESTORE_EMULATOR_HOST
initializeApp({ ...(emulador ? {} : { credential: applicationDefault() }), projectId: process.env.PROJETO ?? 'forca--app' })
const db = getFirestore()
const auth = getAuth()

const apagarLotes = async (refs) => {
  for (let i = 0; i < refs.length; i += 400) {
    const lote = db.batch()
    refs.slice(i, i + 400).forEach((r) => lote.delete(r))
    await lote.commit()
  }
}
const refsDe = async (col, campo, uid) => (await db.collection(col).where(campo, '==', uid).get()).docs.map((d) => d.ref)

let apagados = 0
let mantidos = 0
let docs = 0
let logins = 0
for (const pedido of (await db.collection('exclusoes').get()).docs) {
  const uid = pedido.id
  const perfil = await db.doc(`usuarios/${uid}`).get()
  if (perfil.exists && perfil.data().papel === 'coach') {
    mantidos++
    continue
  }
  const refs = [
    ...(await refsDe('registros', 'alunoId', uid)),
    ...(await refsDe('mesos', 'alunoId', uid)),
    ...(await refsDe('usuarios', 'migradoPara', uid)),
    ...(await refsDe('logs', 'uid', uid)),
    db.doc(`notas/${uid}`),
    db.doc(`usuarios/${uid}`),
  ]
  await apagarLotes(refs)
  docs += refs.length
  try {
    await auth.deleteUser(uid)
    logins++
  } catch (e) {
    if (e?.code !== 'auth/user-not-found') throw e
  }
  await pedido.ref.delete() // por último: se cair antes, roda de novo amanhã
  apagados++
}

const corte = Timestamp.fromMillis(Date.now() - 30 * 86400_000)
let logsVelhos = 0
for (;;) {
  const velhos = await db.collection('logs').where('em', '<', corte).limit(400).get()
  if (velhos.empty) break
  await apagarLotes(velhos.docs.map((d) => d.ref))
  logsVelhos += velhos.size
}

const saida = `## Limpeza LGPD\n\n- Pedidos atendidos: ${apagados}\n- Pedidos mantidos (coach): ${mantidos}\n- Documentos apagados: ${docs}\n- Logins apagados: ${logins}\n- Logs com mais de 30 dias apagados: ${logsVelhos}\n`
console.log(saida)
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, saida)
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `apagados=${apagados}\n`)
