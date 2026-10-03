// Testa tools/vigia.mjs contra os emuladores de Firestore e Auth: `npm run test:rules`.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { beforeEach, describe, expect, it } from 'vitest'

const HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080'
const AUTH = process.env.FIREBASE_AUTH_EMULATOR_HOST ?? '127.0.0.1:9099'
process.env.FIRESTORE_EMULATOR_HOST = HOST
process.env.FIREBASE_AUTH_EMULATOR_HOST = AUTH
process.env.GCLOUD_PROJECT = 'demo-forca'
const app = initializeApp({ projectId: 'demo-forca' }, 'vigia-teste')
const db = getFirestore(app)
const auth = getAuth(app)

const rodar = () => {
  const arq = join(tmpdir(), `vigia-${process.pid}.json`)
  execFileSync('node', ['tools/vigia.mjs', arq], {
    env: { ...process.env, PROJETO: 'demo-forca', FIRESTORE_EMULATOR_HOST: HOST, FIREBASE_AUTH_EMULATOR_HOST: AUTH, GITHUB_STEP_SUMMARY: '' },
    stdio: 'ignore',
  })
  return readFileSync(arq, 'utf8')
}
const ids = (json: string) => JSON.parse(json).map((a: { id: string }) => a.id).sort()

const COLECOES = ['usuarios', 'logs', 'exclusoes']
const antes = (dias: number) => Timestamp.fromMillis(Date.now() - dias * 86400_000)

beforeEach(async () => {
  for (const c of COLECOES) for (const d of (await db.collection(c).get()).docs) await d.ref.delete()
  for (const u of (await auth.listUsers()).users) await auth.deleteUser(u.uid)
  await auth.createUser({ uid: 'coachC', email: 'coachC@x.com', emailVerified: true })
  await db.doc('usuarios/coachC').set({ papel: 'coach', status: 'ativo' })
  await auth.updateUser('coachC', {
    multiFactor: { enrolledFactors: [{ uid: 'f1', phoneNumber: '+5511999999999', displayName: 'x', factorId: 'phone' }] },
  })
})

describe('vigia', () => {
  it('cenário limpo: nenhum alerta', () => {
    expect(JSON.parse(rodar())).toEqual([])
  })

  it('dispara cada alerta e não expõe e-mail nem uid', async () => {
    await auth.updateUser('coachC', { multiFactor: { enrolledFactors: null } })
    await db.doc('usuarios/coachD').set({ papel: 'coach' })
    for (let i = 0; i < 11; i++) await auth.createUser({ uid: `robo${i}`, email: `robo${i}@x.com` })
    for (let i = 0; i < 21; i++) await db.doc(`usuarios/ag${i}`).set({ papel: 'aluno', status: 'aguardando' })
    const batch = db.batch()
    for (let i = 0; i < 101; i++) batch.set(db.doc(`logs/l${i}`), { uid: 'robo0', mensagem: i < 21 ? 'permission-denied' : 'x', em: Timestamp.now() })
    for (let i = 0; i < 4900; i += 400) {
      const b = db.batch()
      for (let j = i; j < Math.min(i + 400, 4900); j++) b.set(db.doc(`logs/v${j}`), { uid: 'u', mensagem: 'x', em: antes(5) })
      await b.commit()
    }
    await batch.commit()
    await db.doc('exclusoes/alunoX').set({ em: antes(3) })
    await db.doc('exclusoes/coachC').set({ em: antes(3) })

    const json = rodar()
    expect(ids(json)).toEqual(
      ['aguardando', 'cadastros-24h', 'coach-quantidade', 'coach-sem-2fa', 'erros-24h', 'limpeza-atrasada', 'logs-total', 'negados-24h'],
    )
    expect(json).not.toMatch(/coachC|coachD|robo|alunoX|@x\.com/)
  })
})
