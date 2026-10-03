// Backup: lê TODAS as coleções do Firestore (incluindo subcoleções) e grava um JSON.
// Roda no GitHub Actions (workflow "Backup semanal"). Uso local: PROJETO=forca--app (ou gislane-personal-trainer) GOOGLE_APPLICATION_CREDENTIALS=sa.json node backup.mjs [arquivo.json]
import { writeFileSync } from 'node:fs'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

// Projeto SEMPRE explícito (env PROJETO): nunca vem do JSON da credencial nem de padrão. Sem ele, sai.
const PROJETOS = { 'forca--app': 'vfit', 'gislane-personal-trainer': 'gislane' }
const emulador = !!process.env.FIRESTORE_EMULATOR_HOST
const projeto = process.env.PROJETO?.trim()
if (!projeto || !(projeto in PROJETOS || (emulador && projeto.startsWith('demo-')))) {
  console.error(`Informe PROJETO: ${Object.keys(PROJETOS).join(' ou ')} (recebido: ${projeto || 'nada'}).`)
  process.exit(1)
}
const marca = PROJETOS[projeto] ?? projeto
initializeApp({ ...(emulador ? {} : { credential: applicationDefault() }), projectId: projeto })
const db = getFirestore()

const limpa = (v) =>
  v instanceof Timestamp ? v.toDate().toISOString()
  : Array.isArray(v) ? v.map(limpa)
  : v && typeof v === 'object' && v.constructor === Object ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, limpa(x)]))
  : v

const lerColecao = async (col) => {
  const out = {}
  for (const d of (await col.get()).docs) {
    out[d.id] = limpa(d.data())
    for (const sub of await d.ref.listCollections()) (out[d.id].__sub ??= {})[sub.id] = await lerColecao(sub)
  }
  return out
}

const backup = {}
for (const col of await db.listCollections()) backup[col.id] = await lerColecao(col)

const arquivo = process.argv[2] ?? 'backup.json'
writeFileSync(arquivo, JSON.stringify(backup, null, 2))
console.log(`Backup ${marca} (${projeto})`)
console.log(Object.entries(backup).map(([c, d]) => `${c}: ${Object.keys(d).length}`).join(' | '))
