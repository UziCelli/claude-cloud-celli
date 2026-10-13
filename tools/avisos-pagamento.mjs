// Avisos de mensalidade: manda ao Worker (push/) quem vence em 3 dias ou hoje. Roda no workflow "Avisos de mensalidade".
// Só contagens no log: nunca nome, e-mail ou uid. Sem dependência nova: o JWT é assinado com node:crypto.
// Uso local: PROJETO=forca--app GOOGLE_APPLICATION_CREDENTIALS=sa.json node avisos-pagamento.mjs
import { appendFileSync, readFileSync } from 'node:fs'
import { createSign } from 'node:crypto'
import { pathToFileURL } from 'node:url'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const FUSO = 'America/Sao_Paulo'
const LOTE = 20 // plano grátis da Cloudflare: até 50 subpedidos por chamada ao Worker
const PUSH_URL = process.env.PUSH_URL || 'https://vfit-descanso.vfitcoach-site.workers.dev'
const PROJETOS = { 'forca--app': 'vfit', 'gislane-personal-trainer': 'gislane' }

// Data do calendário de Brasília (AAAA-MM-DD). Compara dias, não horas: a virada é à meia-noite de Brasília.
const diaBrasilia = (ms) => new Intl.DateTimeFormat('en-CA', { timeZone: FUSO, year: 'numeric', month: '2-digit', day: '2-digit' }).format(ms)
const numeroDoDia = (chave) => {
  const [a, m, d] = chave.split('-').map(Number)
  return Date.UTC(a, m - 1, d) / 86400_000
}
// pagoAte pode vir como Timestamp do Firestore (toMillis), Date, número (ms) ou texto de data.
const emMillis = (v) => (typeof v?.toMillis === 'function' ? v.toMillis() : v instanceof Date ? v.getTime() : typeof v === 'string' ? Date.parse(v) : v)

export function quaisAvisar(alunos, agora) {
  const hoje = numeroDoDia(diaBrasilia(agora))
  const avisos = []
  for (const a of alunos) {
    if (a.papel !== 'aluno' || a.status !== 'ativo' || a.pagoAte == null) continue
    const ms = emMillis(a.pagoAte)
    if (!Number.isFinite(ms)) continue
    const faltam = numeroDoDia(diaBrasilia(ms)) - hoje
    if (faltam === 3) avisos.push({ uid: a.uid, tipo: 'vence-3d' })
    else if (faltam === 0) avisos.push({ uid: a.uid, tipo: 'vence-hoje' })
  }
  return avisos
}

const base64url = (buf) => Buffer.from(buf).toString('base64url')

export function assinarJwt(sa, agoraSeg) {
  const header = { alg: 'RS256', typ: 'JWT', kid: sa.private_key_id }
  const payload = { iss: sa.client_email, aud: 'vfit-push-avisos', iat: agoraSeg, exp: agoraSeg + 300 }
  const entrada = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`
  const assinatura = createSign('RSA-SHA256').update(entrada).sign(sa.private_key)
  return `${entrada}.${base64url(assinatura)}`
}

async function executar() {
  const projeto = process.env.PROJETO?.trim()
  if (!projeto || !(projeto in PROJETOS)) {
    console.error(`Informe PROJETO: ${Object.keys(PROJETOS).join(' ou ')} (recebido: ${projeto || 'nada'}).`)
    process.exit(1)
  }
  const marca = PROJETOS[projeto]
  const credencial = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (!credencial) throw new Error('GOOGLE_APPLICATION_CREDENTIALS não definido.')
  const sa = JSON.parse(readFileSync(credencial, 'utf8'))

  initializeApp({ credential: applicationDefault(), projectId: projeto })
  const db = getFirestore()
  const agora = Date.now()
  const snap = await db.collection('usuarios').select('papel', 'status', 'pagoAte').get()
  const alunos = snap.docs.map((d) => ({ uid: d.id, papel: d.get('papel'), status: d.get('status'), pagoAte: d.get('pagoAte') }))
  const avisos = quaisAvisar(alunos, agora)
  const tres = avisos.filter((a) => a.tipo === 'vence-3d').length

  let enviados = 0
  for (let i = 0; i < avisos.length; i += LOTE) {
    const lote = avisos.slice(i, i + LOTE)
    const jwt = assinarJwt(sa, Math.floor(Date.now() / 1000))
    const res = await fetch(`${PUSH_URL}/aviso-pagamento`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ projeto, avisos: lote }),
    })
    if (!res.ok) throw new Error(`Worker respondeu HTTP ${res.status} (${marca}).`)
    enviados += (await res.json()).enviados ?? 0
  }

  const saida = `## Avisos de mensalidade (${marca})\n\n- Vencem em 3 dias: ${tres}\n- Vencem hoje: ${avisos.length - tres}\n- Enviados: ${enviados}\n`
  console.log(saida)
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, saida)
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  executar().catch((e) => {
    console.error(`Falha nos avisos de mensalidade: ${e?.message ?? 'erro desconhecido'}`)
    process.exit(1)
  })
}
