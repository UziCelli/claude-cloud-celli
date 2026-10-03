// Os scripts de manutenção (tools/*.mjs) só atuam no projeto pedido de forma explícita (env PROJETO): `npm run test:rules`.
import { spawnSync } from 'node:child_process'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { describe, expect, it } from 'vitest'

const HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080'
const AUTH = process.env.FIREBASE_AUTH_EMULATOR_HOST ?? '127.0.0.1:9099'
process.env.FIRESTORE_EMULATOR_HOST = HOST
process.env.FIREBASE_AUTH_EMULATOR_HOST = AUTH

const SCRIPTS = ['mfa', 'backup', 'limpeza-lgpd', 'vigia', 'erros']
const rodar = (script: string, env: Record<string, string | undefined>) => {
  const e: Record<string, string | undefined> = { ...process.env, GITHUB_STEP_SUMMARY: '', GITHUB_OUTPUT: '', ACAO: 'ativar-totp', ...env }
  for (const k of Object.keys(e)) if (e[k] === undefined) delete e[k]
  return spawnSync('node', [`tools/${script}.mjs`, '/tmp/projeto-explicito-saida.json'], { env: e as NodeJS.ProcessEnv, encoding: 'utf8' })
}

describe('projeto explícito', () => {
  for (const s of SCRIPTS) {
    it(`${s}: sem PROJETO falha, mesmo no emulador`, () => {
      const r = rodar(s, { PROJETO: undefined })
      expect(r.status).toBe(1)
      expect(r.stderr).toContain('Informe PROJETO')
    })
    it(`${s}: projeto desconhecido fora do emulador falha`, () => {
      const r = rodar(s, { PROJETO: 'demo-forca', FIRESTORE_EMULATOR_HOST: undefined })
      expect(r.status).toBe(1)
      expect(r.stderr).toContain('Informe PROJETO')
    })
  }

  it('limpeza do projeto X nunca toca o projeto Y (Firestore e Auth)', async () => {
    const y = initializeApp({ projectId: 'demo-y' }, 'projeto-y')
    const x = initializeApp({ projectId: 'demo-x' }, 'projeto-x')
    const dbY = getFirestore(y)
    const authY = getAuth(y)
    await authY.createUser({ uid: 'alunoY', email: 'y@x.com' })
    await dbY.doc('usuarios/alunoY').set({ papel: 'aluno' })
    await dbY.doc('registros/rY').set({ alunoId: 'alunoY' })
    await dbY.doc('exclusoes/alunoY').set({ em: Timestamp.now() })
    const dbX = getFirestore(x)
    await dbX.doc('usuarios/alunoX').set({ papel: 'aluno' })
    await dbX.doc('exclusoes/alunoX').set({ em: Timestamp.now() })

    const r = rodar('limpeza-lgpd', { PROJETO: 'demo-x' })
    expect(r.status).toBe(0)
    expect((await dbX.doc('exclusoes/alunoX').get()).exists).toBe(false)
    expect((await dbX.doc('usuarios/alunoX').get()).exists).toBe(false)
    for (const p of ['usuarios/alunoY', 'registros/rY', 'exclusoes/alunoY']) expect((await dbY.doc(p).get()).exists, p).toBe(true)
    expect((await authY.getUser('alunoY')).uid).toBe('alunoY')
  })
})
