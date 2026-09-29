// Manutenção: grava no Firestore um mesociclo convertido da planilha (tools/planilha_para_meso.py),
// com as cargas já registradas. Roda no GitHub Actions (workflow "Importar mesociclo").
// Uso local: ALUNO=<e-mail ou nome> NOME="Mesociclo 6" MESO="$(cat meso.json)" GOOGLE_APPLICATION_CREDENTIALS=sa.json node importar-meso.mjs
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore'

const aluno = process.env.ALUNO?.trim()
const nome = process.env.NOME?.trim()
const { meso, registros } = JSON.parse(process.env.MESO ?? '{}')
if (!aluno || !nome || !meso?.divisao) throw new Error('Informe ALUNO, NOME e MESO (JSON de planilha_para_meso.py)')

initializeApp({ credential: applicationDefault(), projectId: 'forca--app' })
const db = getFirestore()
const norm = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()

// Tudo num lote só (aluno novo, meso e registros): ou grava tudo, ou nada.
const b = db.batch()

// Aluno por e-mail (conta do app) ou pelo nome exato. Nome parecido com outro para (evita gravar
// na pessoa errada); nome sem nenhum parecido vira aluno presencial.
let alunoId
if (aluno.includes('@')) {
  alunoId = (await getAuth().getUserByEmail(aluno.toLowerCase())).uid
} else {
  const alunos = (await db.collection('usuarios').where('papel', '==', 'aluno').get()).docs
  const exatos = alunos.filter((d) => norm(d.get('nome') ?? '') === norm(aluno))
  const parecidos = alunos.filter((d) => norm(d.get('nome') ?? '').includes(norm(aluno)))
  if (exatos.length > 1) throw new Error(`Mais de um aluno chamado "${aluno}": use o e-mail`)
  if (exatos.length === 1) alunoId = exatos[0].id
  else if (parecidos.length) throw new Error(`Nenhum aluno chamado exatamente "${aluno}". Parecidos: ${parecidos.map((d) => d.get('nome')).join(', ')}`)
  else {
    const ref = db.collection('usuarios').doc()
    b.set(ref, { papel: 'aluno', status: 'ativo', presencial: true, nome: aluno, email: '', criadoEm: FieldValue.serverTimestamp() })
    alunoId = ref.id
    console.log(`Aluno "${aluno}" não existia: será criado como presencial.`)
  }
}

// Rodar duas vezes não duplica.
const existe = await db.collection('mesos').where('alunoId', '==', alunoId).where('nome', '==', nome).get()
if (!existe.empty) throw new Error(`O aluno já tem um mesociclo "${nome}" (${existe.docs[0].id})`)

const mesoRef = db.collection('mesos').doc()
b.set(mesoRef, { ...meso, nome, alunoId, criadoEm: FieldValue.serverTimestamp(), atualizadoEm: FieldValue.serverTimestamp() })

// Sem a data real do treino: meio-dia (São Paulo) do dia estimado = início + semana + treino.
const dataDoTreino = (w, t) => {
  const ms = Date.parse(`${meso.inicio}T15:00:00Z`) + ((w - 1) * 7 + (t - 1)) * 864e5
  return Timestamp.fromMillis(Math.min(ms, Date.now()))
}
for (const r of registros ?? []) {
  const id = `${mesoRef.id}_s${String(r.semana).padStart(2, '0')}_t${r.treino}`
  const quando = dataDoTreino(r.semana, r.treino)
  b.set(db.doc(`registros/${id}`), {
    alunoId, mesoId: mesoRef.id, semana: r.semana, treino: r.treino,
    realizado: r.realizado, realizadoEm: r.realizado ? quando : null, cargas: r.cargas, atualizadoEm: quando,
  })
}
await b.commit()
console.log(`Mesociclo "${nome}" criado (${mesoRef.id}) para o aluno ${alunoId}, com ${registros?.length ?? 0} treino(s) registrado(s).`)
