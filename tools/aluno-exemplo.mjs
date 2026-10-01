// Manutenção: prepara o "aluno de exemplo" para o Victor apresentar o app a novos clientes.
// Roda no GitHub Actions (workflow "Aluno de exemplo"). Rode antes de cada apresentação: as datas ficam atuais.
// Uso local: MODO=simular|gravar GOOGLE_APPLICATION_CREDENTIALS=sa.json node aluno-exemplo.mjs
// (HOJE=YYYY-MM-DD só para testes; FIRESTORE_EMULATOR_HOST aponta para o emulador.)
//
// Escreve em PRODUÇÃO, só neste aluno ("Victor Aluno" / "Victor C.L. Silva"):
//  - perfil: nome, status ativo, pagoAte daqui a 1 ano, pesoKg (se faltar);
//  - meso `exemplo-victor` (2 semanas, 2 treinos) com todos os métodos, pausa, progressão e peso do corpo;
//  - registros SÓ da semana 1 (a semana 2 o Victor registra ao vivo: nunca é criada, alterada nem apagada);
//  - outros mesos do aluno: só ajusta `inicio` dos que estariam "em andamento" (nada é apagado; cargas e registros intactos).
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore'

const modo = (process.env.MODO ?? 'simular').trim()
if (!['simular', 'gravar'].includes(modo)) throw new Error('MODO deve ser "simular" ou "gravar"')
const gravar = modo === 'gravar'

const emulador = !!process.env.FIRESTORE_EMULATOR_HOST
initializeApp({ ...(emulador ? {} : { credential: applicationDefault() }), projectId: process.env.PROJETO ?? 'forca--app' })
const db = getFirestore()

const MESO_ID = 'exemplo-victor'
const NOME_FINAL = 'Victor C.L. Silva'
const NOMES = ['Victor Aluno', NOME_FINAL]
const norm = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
const DIA = 864e5

// ---------- datas (calendário de São Paulo, sem horário de verão: -03:00) ----------
const hoje = process.env.HOJE ?? new Date().toLocaleDateString('sv', { timeZone: 'America/Sao_Paulo' })
const dia = (iso, soma = 0) => new Date(Date.parse(`${iso}T12:00:00Z`) + soma * DIA).toISOString().slice(0, 10)
const diaSemana = new Date(`${hoje}T12:00:00Z`).getUTCDay() // 0 = domingo
const inicio = dia(hoje, -((diaSemana + 6) % 7) - 7) // segunda-feira da semana passada
const [a, m, d] = hoje.split('-').map(Number)
const umAnoDepois = new Date(Date.UTC(a + 1, m - 1, d)).toISOString().slice(0, 10)
const pagoAte = Timestamp.fromDate(new Date(`${umAnoDepois}T23:59:59.999-03:00`)) // mesmo formato do app
const quando = (iso, hora) => Timestamp.fromDate(new Date(`${iso}T${hora}-03:00`))

// ---------- prescrição ----------
// Frações do peso do corpo: as mesmas de src/lib/pesoCorporal.ts (o teste confere).
// carga = kg da semana 1 (peso EXTRA nos exercícios de peso do corpo); feitas = reps feitas.
// Colunas = séries (3) + etapas do dropset.
const T = [
  [ // Treino 1: superior
    { id: 'supino-reto-barra', nome: 'Supino Reto Barra', pausa: 120, reps: [6, 8], carga: [60, 60, 57.5], feitas: [6, 6, 6] },
    { id: 'barra-fixa-aberta', nome: 'Barra Fixa Aberta', pausa: 120, reps: [6, 8], pc: 0.95, carga: [0, 0, 0], feitas: [6, 6, 5] },
    { id: 'desenvolvimento-halter', nome: 'Desenvolvimento Halter', pausa: 90, reps: [10, 12], carga: [22, 22, 20, 14], feitas: [10, 10, 9, 10] },
    { id: 'rosca-direta-barra', nome: 'Rosca Direta Barra', pausa: 60, reps: [10, 12], carga: [30, 30, 27.5], feitas: [10, 10, 9] },
    { id: 'triceps-pulley-corda', nome: 'Tríceps Pulley Corda', pausa: 60, reps: [10, 12], carga: [35, 35, 32.5], feitas: [10, 10, 10] },
    { id: 'elevacao-lateral-halter', nome: 'Elevação Lateral Halter', pausa: 60, reps: [12, 15], carga: [8, 8, 8], feitas: [12, 12, 11] },
    { id: 'crucifixo-inverso-peck-deck', nome: 'Crucifixo Inverso Peck Deck', pausa: 60, reps: [12, 15], carga: [30, 30, 27.5], feitas: [12, 12, 12] },
    { id: 'flexao-de-bracos', nome: 'Flexão de Braços', pausa: 60, reps: [12, 15], pc: 0.64, carga: [0, 0, 0], feitas: [12, 11, 10] },
    { id: 'abdominal-infra-no-solo', nome: 'Abdominal Infra no Solo', pausa: 60, reps: [12, 15], pc: 0.3, carga: [0, 0, 0], feitas: [12, 12, 12] },
  ],
  [ // Treino 2: inferior
    { id: 'agachamento-com-peso-do-corpo', nome: 'Agachamento com Peso do Corpo', pausa: 90, reps: [5, 6], pc: 0.88, carga: [0, 0, 0], feitas: [5, 5, 5] },
    { id: 'leg-press-45', nome: 'Leg Press 45', pausa: 120, reps: [8, 10], carga: [200, 200, 200, 120], feitas: [8, 8, 7, 12] },
    { id: 'mesa-flexora', nome: 'Mesa Flexora', pausa: 60, reps: [10, 12], carga: [40, 40, 35], feitas: [10, 10, 10] },
    { id: 'cadeira-extensora-tradicional', nome: 'Cadeira Extensora Tradicional', pausa: 60, reps: [10, 12], carga: [55, 55, 50], feitas: [10, 10, 10] },
    { id: 'panturrilha-em-pe-maquina', nome: 'Panturrilha em Pé Máquina', pausa: 60, reps: [10, 12], carga: [70, 70, 70], feitas: [10, 10, 10] },
    { id: 'elevacao-pelvica-barra', nome: 'Elevação Pélvica Barra', pausa: 60, reps: [10, 12], carga: [80, 80, 80], feitas: [10, 10, 10] },
    { id: 'stiff-halter', nome: 'Stiff Halter', pausa: 60, reps: [10, 12], carga: [24, 24, 24], feitas: [10, 10, 9] },
    { id: 'afundo-halter', nome: 'Afundo Halter', pausa: 60, reps: [10, 12], carga: [14, 14, 14], feitas: [10, 10, 10] },
    { id: 'panturrilha-sentado-maquina', nome: 'Panturrilha Sentado Máquina', pausa: 60, reps: [10, 12], carga: [40, 40, 40], feitas: [10, 10, 10] },
  ],
]
const slotId = (t, i) => `ex-t${t + 1}-${String(i + 1).padStart(2, '0')}`

// Métodos (mesmo formato de AplicacaoMetodo). Iguais nas 2 semanas; só o Clusterset sobe reps por bloco.
const metodosDaSemana = (semana) => {
  const base = (treino, exercicio, metodo, resto) => ({ ativo: true, semana, treino, exercicio, metodo, ...resto })
  const todas = { escopo: 'Todas as séries' }
  const ultima = { escopo: 'Série específica', serie: 3 }
  return [
    base(1, 1, 'Rest-pause', { ...ultima, pausaInternaS: 20, blocos: 2 }),
    base(1, 3, 'Dropset', { ...ultima, pausaInternaS: 10, blocos: 1, etapas: 1, reducaoCarga: 30, cargaEtapa: [14], repsEtapa: [10] }),
    ...[4, 5].map((p) => base(1, p, 'Biset', { ...todas, grupo: 1, pausaInternaS: 15, blocos: 1 })),
    ...[6, 7, 8, 9].map((p) => base(1, p, 'Superset', { ...todas, grupo: 1, pausaInternaS: 15, blocos: 1 })),
    base(2, 1, 'Clusterset', { ...todas, pausaInternaS: 30, blocos: 3, repsPorBloco: semana === 1 ? 5 : 6 }),
    base(2, 2, 'Dropset', { ...ultima, pausaInternaS: 10, blocos: 1, etapas: 1, reducaoCarga: 40, cargaEtapa: [120], repsEtapa: [12] }),
    ...[3, 4, 5].map((p) => base(2, p, 'Triset', { ...todas, grupo: 1, pausaInternaS: 15, blocos: 1 })),
    ...[6, 7, 8, 9].map((p) => base(2, p, 'Circuito', { ...todas, grupo: 1, pausaInternaS: 20, blocos: 3 })),
  ]
}

const divisao = T.map((treino, t) => treino.map((e, i) => ({ slotId: slotId(t, i), nome: e.nome, pausaS: e.pausa })))
const meso = {
  frequencia: 2,
  semanas: 2,
  inicio,
  pausaS: 90,
  limiteReps: 20,
  divisao: Object.fromEntries(divisao.map((l, i) => [`t${i + 1}`, l])),
  trocas: {},
  progressao: {
    principais: { w1: [8, 8, 8], w2: [10, 10, 10] },
    auxiliares: { w1: [12, 12, 12], w2: [15, 15, 15] },
    padrao: { w1: [10, 10, 10], w2: [12, 12, 12] },
  },
  // Reps próprias de cada exercício (progressão entre as semanas).
  progressaoExercicio: Object.fromEntries(
    T.flatMap((treino, t) => treino.map((e, i) => [slotId(t, i), { w1: Array(3).fill(e.reps[0]), w2: Array(3).fill(e.reps[1]) }])),
  ),
  metodos: [...metodosDaSemana(1), ...metodosDaSemana(2)],
}

// ---------- achar o aluno ----------
const alunos = (await db.collection('usuarios').where('papel', '==', 'aluno').get()).docs
const achados = alunos.filter((u) => NOMES.map(norm).includes(norm(u.get('nome') ?? '')))
if (achados.length !== 1) {
  throw new Error(`Esperava exatamente 1 aluno chamado ${NOMES.map((n) => `"${n}"`).join(' ou ')}, achei ${achados.length}. Nada foi gravado.`)
}
const alunoDoc = achados[0]
const alunoId = alunoDoc.id
const pesoKg = alunoDoc.get('pesoKg') || 80

console.log(`Modo: ${modo}. Hoje (São Paulo): ${hoje}. Aluno: ${alunoDoc.get('nome')} (${alunoId}).`)
const b = db.batch()

// ---------- perfil (só estes campos) ----------
const perfil = { nome: NOME_FINAL, status: 'ativo', pagoAte, ...(alunoDoc.get('pesoKg') ? {} : { pesoKg }) }
b.update(alunoDoc.ref, perfil)
console.log(`Perfil: nome "${NOME_FINAL}", status ativo, pagoAte ${umAnoDepois} 23:59:59 (São Paulo)${perfil.pesoKg ? `, pesoKg ${pesoKg}` : ''}.`)

// ---------- meso de exemplo (idempotente: id fixo) ----------
const mesoRef = db.doc(`mesos/${MESO_ID}`)
const mesoAntes = await mesoRef.get()
if (mesoAntes.exists && mesoAntes.get('alunoId') !== alunoId) throw new Error(`O meso ${MESO_ID} pertence a outro aluno. Nada foi gravado.`)
b.set(mesoRef, {
  ...meso,
  nome: 'Apresentação — Victor C.L. Silva',
  alunoId,
  criadoEm: mesoAntes.exists ? mesoAntes.get('criadoEm') : FieldValue.serverTimestamp(),
  atualizadoEm: FieldValue.serverTimestamp(),
})
console.log(`Meso ${MESO_ID}: início ${inicio} (semana 1 = passada, semana 2 = atual), ${meso.metodos.length} aplicações de método.`)

// ---------- registros da SEMANA 1 (merge, só estes campos) ----------
const fmtCol = (arr) => Object.fromEntries(arr.map((v, k) => [`s${k + 1}`, v]))
T.forEach((treino, t) => {
  const diaTreino = dia(inicio, t * 2) // segunda e quarta
  const realizadoEm = quando(diaTreino, '18:30:00')
  const cargas = {}, reps = {}, pc = {}
  treino.forEach((e, i) => {
    cargas[slotId(t, i)] = fmtCol(e.carga)
    reps[slotId(t, i)] = fmtCol(e.feitas)
    if (e.pc) pc[slotId(t, i)] = Math.round(pesoKg * e.pc * 10) / 10
  })
  const id = `${MESO_ID}_s01_t${t + 1}`
  b.set(
    db.doc(`registros/${id}`),
    { alunoId, mesoId: MESO_ID, semana: 1, treino: t + 1, cargas, reps, pc, realizado: true, realizadoEm, inicioEm: quando(diaTreino, '17:35:00'), atualizadoEm: realizadoEm },
    { merge: true },
  )
  console.log(`Registro ${id}: ${treino.length} exercícios, ${Object.keys(pc).length} com peso do corpo.`)
})
console.log('Semana 2: não é tocada.')

// ---------- outros mesos do aluno: o de exemplo precisa ser o que aparece ----------
// O app (mesoAtual) mostra o 1º meso "em andamento" hoje; sem nenhum, o de início mais recente.
// Quem estiver em andamento recebe `inicio` mais antigo (vira "concluído"); o original fica em `inicioOriginal`.
const outros = (await db.collection('mesos').where('alunoId', '==', alunoId).get()).docs.filter((x) => x.id !== MESO_ID)
for (const o of outros) {
  const ini = String(o.get('inicio')).slice(0, 10)
  const dias = Math.round((Date.parse(`${hoje}T12:00:00Z`) - Date.parse(`${ini}T12:00:00Z`)) / DIA)
  const durante = dias >= 0 && dias < o.get('semanas') * 7
  if (!durante) { console.log(`Meso antigo ${o.id} ("${o.get('nome')}", início ${ini}): não mexe.`); continue }
  const novo = dia(hoje, -o.get('semanas') * 7 - 7)
  b.update(o.ref, { inicio: novo, ...(o.get('inicioOriginal') ? {} : { inicioOriginal: ini }) })
  console.log(`Meso antigo ${o.id} ("${o.get('nome')}"): estava em andamento; início ${ini} -> ${novo} (concluído). Cargas e registros intactos.`)
}

if (!gravar) { console.log('SIMULAÇÃO: nada foi gravado. Rode com modo "gravar" para aplicar.'); process.exit(0) }
await b.commit()
console.log('Gravado.')
