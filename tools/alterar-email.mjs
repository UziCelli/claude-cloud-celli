// Manutenção: troca o e-mail de login de um aluno sem perder a conta (mesmo uid = mesmo histórico).
// Roda no GitHub Actions (workflow "Alterar e-mail de aluno") com a conta de serviço do Firebase.
// Uso local: EMAIL_ATUAL=a@x.com EMAIL_NOVO=b@x.com GOOGLE_APPLICATION_CREDENTIALS=sa.json node alterar-email.mjs
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const atual = process.env.EMAIL_ATUAL?.trim().toLowerCase()
const novo = process.env.EMAIL_NOVO?.trim().toLowerCase()
if (!atual || !novo || !novo.includes('@')) throw new Error('Informe EMAIL_ATUAL e EMAIL_NOVO válidos')

initializeApp({ credential: applicationDefault(), projectId: 'forca--app' })
const { uid } = await getAuth().getUserByEmail(atual)
await getAuth().updateUser(uid, { email: novo, emailVerified: false })
await getFirestore().doc(`usuarios/${uid}`).update({ email: novo })
console.log(`E-mail alterado: ${atual} -> ${novo} (uid ${uid}). A senha continua a mesma.`)
