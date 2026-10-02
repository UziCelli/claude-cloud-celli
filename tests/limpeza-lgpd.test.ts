// Testa tools/limpeza-lgpd.mjs contra os emuladores de Firestore e Auth: `npm run test:rules`.
import { execFileSync } from 'node:child_process'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { beforeEach, describe, expect, it } from 'vitest'

const HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080'
const AUTH = process.env.FIREBASE_AUTH_EMULATOR_HOST ?? '127.0.0.1:9099'
process.env.FIRESTORE_EMULATOR_HOST = HOST
process.env.FIREBASE_AUTH_EMULATOR_HOST = AUTH
process.env.GCLOUD_PROJECT = 'demo-forca'
const app = initializeApp({ projectId: 'demo-forca' }, 'limpeza-lgpd-teste')
const db = getFirestore(app)
const auth = getAuth(app)

const rodar = () =>
  execFileSync('node', ['tools/limpeza-lgpd.mjs'], {
    env: { ...process.env, PROJETO: 'demo-forca', FIRESTORE_EMULATOR_HOST: HOST, FIREBASE_AUTH_EMULATOR_HOST: AUTH, GITHUB_STEP_SUMMARY: '', GITHUB_OUTPUT: '' },
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })

const COLECOES = ['usuarios', 'mesos', 'registros', 'notas', 'logs', 'exclusoes']
const existe = async (p: string) => (await db.doc(p).get()).exists
const login = async (uid: string) => {
  try { await auth.getUser(uid); return true } catch { return false }
}

async function semear(uid: string, papel: string, pedido: boolean) {
  await auth.createUser({ uid, email: `${uid}@x.com` })
  await db.doc(`usuarios/${uid}`).set({ papel, nome: uid, email: `${uid}@x.com`, status: 'ativo' })
  await db.doc(`mesos/m-${uid}`).set({ alunoId: uid, nome: 'Meso' })
  await db.doc(`registros/r-${uid}`).set({ alunoId: uid, cargas: { x: { s1: 10 } } })
  await db.doc(`notas/${uid}`).set({ texto: 'n' })
  await db.doc(`logs/l-${uid}`).set({ uid, em: Timestamp.now() })
  if (pedido) await db.doc(`exclusoes/${uid}`).set({ em: Timestamp.now() })
}
const tudoDe = async (uid: string) =>
  [`usuarios/${uid}`, `mesos/m-${uid}`, `registros/r-${uid}`, `notas/${uid}`, `logs/l-${uid}`]

beforeEach(async () => {
  for (const c of COLECOES) for (const d of (await db.collection(c).get()).docs) await d.ref.delete()
  for (const u of (await auth.listUsers()).users) await auth.deleteUser(u.uid)
  await semear('alunoA', 'aluno', true)
  await semear('alunoB', 'aluno', false)
  await semear('coachC', 'coach', true)
  await db.doc('usuarios/migrado').set({ papel: 'aluno', migradoPara: 'alunoA' })
  await db.doc('logs/velho').set({ uid: 'alunoB', em: Timestamp.fromMillis(Date.now() - 40 * 86400_000) })
})

describe('limpeza LGPD', () => {
  it('apaga tudo do aluno com pedido, inclusive o login; não toca em B nem no coach; apaga log antigo', async () => {
    const out = rodar()
    for (const p of await tudoDe('alunoA')) expect(await existe(p), p).toBe(false)
    expect(await existe('usuarios/migrado')).toBe(false)
    expect(await existe('exclusoes/alunoA')).toBe(false)
    expect(await login('alunoA')).toBe(false)

    for (const u of ['alunoB', 'coachC']) {
      for (const p of await tudoDe(u)) expect(await existe(p), p).toBe(true)
      expect(await login(u)).toBe(true)
    }
    expect(await existe('exclusoes/coachC')).toBe(true)
    expect(await existe('logs/velho')).toBe(false)
    expect(out).not.toMatch(/alunoA|alunoB|coachC|@x\.com/)
  })

  it('rodar duas vezes não quebra', async () => {
    rodar()
    expect(() => rodar()).not.toThrow()
    expect(await existe('usuarios/alunoB')).toBe(true)
  })

  it('termina o que faltou quando o login já não existe', async () => {
    await auth.deleteUser('alunoA')
    rodar()
    expect(await existe('usuarios/alunoA')).toBe(false)
    expect(await existe('exclusoes/alunoA')).toBe(false)
  })
})
