// Avisos do robô diário, mandados ao Worker (push/). Roda no workflow "Avisos de mensalidade".
// MODO=mensalidade (padrão): quem vence em 3 dias ou hoje. MODO=lembrete: lembrete do treino do dia (seg a sáb);
// com AGENDAR=1 o lembrete é entregue ao Worker para disparar nas próximas 6h47 (sem isso, sai na hora).
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

// Sem "Dias de treino" no meso: dias do bloco em que cada treino cai, por frequência (igual a DIAS_AUTO em src/lib/agenda.ts).
const DIAS_AUTO = [[0], [0, 3], [0, 2, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6]]
const diaDaSemana = (n) => (((n + 4) % 7) + 7) % 7 // nº do dia (desde 1970, uma quinta) → 0 = domingo

// O meso pede treino no dia `hoje` (nº do dia)? `feitos` = treinos concluídos na semana atual do meso.
// Com "Dias de treino": só nos dias marcados (o k-ésimo dia marcado do bloco é o Treino k) e enquanto faltar treino na semana.
// Sem eles: calendário automático; lembra no dia planejado e enquanto o aluno estiver atrasado na semana.
// Meso antigo sem frequência válida: lembra (como antes).
function pedeTreino(m, hoje, feitos) {
  const inicio = numeroDoDia(m.inicio)
  const diaBloco = (hoje - inicio) % 7
  const freq = Number.isInteger(m.frequencia) && m.frequencia >= 1 ? Math.min(m.frequencia, 7) : null
  const dias = Array.isArray(m.dias) ? m.dias.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6) : []
  if (dias.length) {
    if (!dias.includes(diaDaSemana(hoje))) return false
    const k = Array.from({ length: diaBloco + 1 }, (_, i) => diaDaSemana(hoje - diaBloco + i)).filter((d) => dias.includes(d)).length
    return freq == null || (k <= freq && feitos < freq)
  }
  return freq == null || feitos < DIAS_AUTO[freq - 1].filter((d) => d <= diaBloco).length
}

// Lembrete do treino do dia: de segunda a sábado (Brasília), para o aluno do app ativo e em dia, com meso em
// andamento (início <= hoje < início + semanas*7) que pede treino hoje (pedeTreino) e que ainda não concluiu treino hoje.
// mesos: [{ id, alunoId, inicio: 'AAAA-MM-DD', semanas, frequencia?, dias? }];
// registros (dos últimos dias): [{ alunoId, mesoId, semana, realizado, realizadoEm }].
// `agora` = hora em que o aviso chega (no agendado, as 6h47 do dia do lembrete).
export function quaisLembrar(alunos, mesos, registros, agora) {
  const chave = diaBrasilia(agora)
  const hoje = numeroDoDia(chave)
  if (diaDaSemana(hoje) === 0) return []
  const feitos = registros.filter((r) => r.realizado === true)
  const treinaramHoje = new Set(feitos.filter((r) => Number.isFinite(emMillis(r.realizadoEm)) && diaBrasilia(emMillis(r.realizadoEm)) === chave).map((r) => r.alunoId))
  const comTreino = new Set()
  for (const m of mesos) {
    if (typeof m.inicio !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(m.inicio) || !(m.semanas > 0)) continue
    const inicio = numeroDoDia(m.inicio)
    if (inicio > hoje || hoje >= inicio + m.semanas * 7) continue
    const semana = Math.floor((hoje - inicio) / 7) + 1
    if (pedeTreino(m, hoje, feitos.filter((r) => r.mesoId === m.id && r.semana === semana).length)) comTreino.add(m.alunoId)
  }
  const avisos = []
  for (const a of alunos) {
    if (a.papel !== 'aluno' || a.status !== 'ativo' || a.presencial || !comTreino.has(a.uid) || treinaramHoje.has(a.uid)) continue
    const ms = emMillis(a.pagoAte)
    if (!Number.isFinite(ms) || ms <= agora) continue
    avisos.push({ uid: a.uid, tipo: 'treino-hoje' })
  }
  return avisos
}

// Próximas 6h47 de Brasília com pelo menos 10 min de folga: é para quando o robô agendado entrega o lembrete
// ao Worker (o agendador do GitHub atrasa horas; o Worker dispara na hora certa).
export function proximoLembrete(agora) {
  const hoje = Date.parse(`${diaBrasilia(agora)}T06:47:00-03:00`)
  return hoje - agora >= 10 * 60_000 ? hoje : hoje + 86400_000
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
  const lembrete = process.env.MODO === 'lembrete'
  const snap = await db.collection('usuarios').select('papel', 'status', 'pagoAte', 'presencial').get()
  const alunos = snap.docs.map((d) => ({ uid: d.id, papel: d.get('papel'), status: d.get('status'), pagoAte: d.get('pagoAte'), presencial: d.get('presencial') }))
  // Lembrete agendado (AGENDAR=1): calcula para as próximas 6h47 e o Worker guarda até lá.
  const quando = lembrete && process.env.AGENDAR === '1' ? proximoLembrete(agora) : undefined
  let avisos
  if (lembrete) {
    const mesos = (await db.collection('mesos').select('alunoId', 'inicio', 'semanas', 'frequencia', 'dias').get()).docs.map((d) => ({ id: d.id, ...d.data() }))
    // Treinos da semana atual de cada meso: mexidos nos últimos 8 dias (filtro de um campo só, sem índice composto).
    const recentes = await db.collection('registros').where('atualizadoEm', '>=', new Date(agora - 8 * 86400_000)).select('alunoId', 'mesoId', 'semana', 'realizado', 'realizadoEm').get()
    avisos = quaisLembrar(alunos, mesos, recentes.docs.map((d) => d.data()), quando ?? agora)
  } else avisos = quaisAvisar(alunos, agora)
  const tres = avisos.filter((a) => a.tipo === 'vence-3d').length

  // Agendado: manda pelo menos um lote (mesmo vazio), para trocar a lista guardada de uma rodada anterior.
  let enviados = 0
  for (let i = 0; i < Math.max(avisos.length, quando ? 1 : 0); i += LOTE) {
    const lote = avisos.slice(i, i + LOTE)
    const jwt = assinarJwt(sa, Math.floor(Date.now() / 1000))
    const res = await fetch(`${PUSH_URL}/aviso-pagamento`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ projeto, avisos: lote, ...(quando ? { quando, inicio: i === 0 } : {}) }),
    })
    if (!res.ok) throw new Error(`Worker respondeu HTTP ${res.status} (${marca}).`)
    const r = await res.json()
    enviados += r.enviados ?? r.agendados ?? 0
  }

  const saida = lembrete
    ? `## Lembrete do treino do dia (${marca})\n\n- Alunos a lembrar: ${avisos.length}\n- ${quando ? `Agendados para ${new Date(quando).toLocaleString('pt-BR', { timeZone: FUSO })}` : 'Enviados'}: ${enviados}\n`
    : `## Avisos de mensalidade (${marca})\n\n- Vencem em 3 dias: ${tres}\n- Vencem hoje: ${avisos.length - tres}\n- Enviados: ${enviados}\n`
  console.log(saida)
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, saida)
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  executar().catch((e) => {
    console.error(`Falha nos avisos: ${e?.message ?? 'erro desconhecido'}`)
    process.exit(1)
  })
}
