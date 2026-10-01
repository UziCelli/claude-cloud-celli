// Lista os 100 erros mais recentes do app no resumo do GitHub Actions e apaga os com mais de 30 dias.
import { appendFileSync } from 'node:fs'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

initializeApp({ credential: applicationDefault(), projectId: 'forca--app' })
const db = getFirestore()

const snap = await db.collection('logs').orderBy('em', 'desc').limit(100).get()
const celula = (v) => String(v ?? '').replace(/\s+/g, ' ').replace(/\|/g, '\\|')
const data = (t) => (t ? t.toDate().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '')

const linhas = ['| Data (SP) | Tipo | Mensagem | Tela | Aparelho | uid |', '|---|---|---|---|---|---|']
for (const d of snap.docs) {
  const x = d.data()
  linhas.push(`| ${[data(x.em), x.tipo, x.mensagem, x.tela, x.aparelho, x.uid].map(celula).join(' | ')} |`)
}

const corte = Timestamp.fromMillis(Date.now() - 30 * 86400_000)
let apagados = 0
for (;;) {
  const velhos = await db.collection('logs').where('em', '<', corte).limit(400).get()
  if (velhos.empty) break
  const lote = db.batch()
  velhos.docs.forEach((d) => lote.delete(d.ref))
  await lote.commit()
  apagados += velhos.size
}

const saida = `## Erros do app (${snap.size} mais recentes)\n\n${snap.size ? linhas.join('\n') : 'Nenhum erro registrado.'}\n\nApagados (mais de 30 dias): ${apagados}\n`
console.log(saida)
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, saida)
