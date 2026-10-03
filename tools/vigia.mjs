// Vigia de segurança: só lê (Firestore + Auth) e grava um JSON com alertas { id, titulo, texto }.
// Só contagens: nunca nome, e-mail ou uid. Roda no workflow "Vigia de segurança".
// Uso local: PROJETO=forca--app (ou gislane-personal-trainer) GOOGLE_APPLICATION_CREDENTIALS=sa.json node vigia.mjs alertas.json
import { appendFileSync, writeFileSync } from 'node:fs'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

const MAX_CADASTROS_24H = 10
const MAX_AGUARDANDO = 20
const MAX_ERROS_24H = 100
const MAX_NEGADOS_24H = 20
const MAX_LOGS_TOTAL = 5000
const DIAS_LIMPEZA_ATRASADA = 2

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
const auth = getAuth()
const agora = Date.now()
const h24 = Timestamp.fromMillis(agora - 86400_000)
const alertas = []
// O título leva a marca: a Issue de um projeto nunca se confunde (nem se repete) com a do outro. A vfit mantém o título de sempre.
const sufixo = marca === 'vfit' ? '' : ` (${marca})`
const alerta = (id, titulo, texto) => alertas.push({ id, titulo: titulo + sufixo, texto: `${texto} Chame o Claude para investigar.` })

const coaches = (await db.collection('usuarios').where('papel', '==', 'coach').get()).docs.map((d) => d.id)
if (coaches.length !== 1)
  alerta('coach-quantidade', 'Quantidade de coaches incorreta', `Há ${coaches.length} contas com papel de coach (o esperado é 1). Alguém pode ter virado coach, ou o coach sumiu.`)

let semDoisFatores = 0
for (const uid of coaches) {
  try {
    if (!(await auth.getUser(uid)).multiFactor?.enrolledFactors?.length) semDoisFatores++
  } catch (e) {
    if (e?.code !== 'auth/user-not-found') throw e
    semDoisFatores++
  }
}
if (semDoisFatores)
  alerta('coach-sem-2fa', 'Coach sem 2º fator', `${semDoisFatores} conta(s) de coach estão sem a verificação em duas etapas. Ative em Minha conta.`)

let cadastros = 0
let token
do {
  const r = await auth.listUsers(1000, token)
  cadastros += r.users.filter((u) => Date.parse(u.metadata.creationTime) > agora - 86400_000).length
  token = r.pageToken
} while (token)
if (cadastros > MAX_CADASTROS_24H)
  alerta('cadastros-24h', 'Muitos cadastros novos', `${cadastros} contas foram criadas nas últimas 24 horas (limite ${MAX_CADASTROS_24H}). Pode ser ataque de robôs.`)

const aguardando = (await db.collection('usuarios').where('status', '==', 'aguardando').count().get()).data().count
if (aguardando > MAX_AGUARDANDO)
  alerta('aguardando', 'Muitos aguardando aprovação', `${aguardando} pessoas aguardam aprovação (limite ${MAX_AGUARDANDO}). Pode ser cadastro em massa.`)

const recentes = (await db.collection('logs').where('em', '>=', h24).select('mensagem').get()).docs
const negados = recentes.filter((d) => String(d.get('mensagem') ?? '').includes('permission-denied')).length
if (recentes.length > MAX_ERROS_24H)
  alerta('erros-24h', 'Muitos erros no app', `${recentes.length} erros registrados nas últimas 24 horas (limite ${MAX_ERROS_24H}). Pode ser bug novo ou abuso.`)
if (negados > MAX_NEGADOS_24H)
  alerta('negados-24h', 'Muitos acessos negados', `${negados} acessos negados nas últimas 24 horas (limite ${MAX_NEGADOS_24H}). Pode ser tentativa de acesso indevido ou bug.`)

const logsTotal = (await db.collection('logs').count().get()).data().count
if (logsTotal > MAX_LOGS_TOTAL)
  alerta('logs-total', 'Coleção de logs muito grande', `Há ${logsTotal} logs guardados (limite ${MAX_LOGS_TOTAL}). Pode ser abuso da cota grátis.`)

const corte = Timestamp.fromMillis(agora - DIAS_LIMPEZA_ATRASADA * 86400_000)
let atrasados = 0
for (const p of (await db.collection('exclusoes').where('em', '<', corte).get()).docs) {
  const perfil = await db.doc(`usuarios/${p.id}`).get()
  if (!(perfil.exists && perfil.data().papel === 'coach')) atrasados++
}
if (atrasados)
  alerta('limpeza-atrasada', 'Limpeza LGPD atrasada', `${atrasados} pedido(s) de exclusão esperam há mais de ${DIAS_LIMPEZA_ATRASADA} dias. A Limpeza LGPD pode estar falhando.`)

writeFileSync(process.argv[2], JSON.stringify(alertas))
const saida = `## Vigia de segurança (${marca})\n\n- Alertas: ${alertas.length}\n`
console.log(saida)
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, saida)
