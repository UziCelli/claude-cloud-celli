import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { assertFails, assertSucceeds, initializeTestEnvironment, type RulesTestEnvironment } from '@firebase/rules-unit-testing'
import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, Timestamp, updateDoc, where, type Firestore } from 'firebase/firestore'
import { METODOS_FISIO } from '../src/data/fisio'
import { metodoLiberavel } from '../src/lib/fisio'

let env: RulesTestEnvironment
const MFA = { firebase: { sign_in_provider: 'password', sign_in_second_factor: 'totp' } }
const db = (uid?: string, mfa = true) => (uid ? env.authenticatedContext(uid, uid === 'coach' && mfa ? MFA as never : {}) : env.unauthenticatedContext()).firestore() as unknown as Firestore
const ref = (uid?: string, id = 'o') => doc(db(uid), 'fisioOrientacoes', id)
const form = (metodoId = 'M04') => ({ alunoId: 'ana', metodoId, condicao: 'Queixa informada pelo aluno', recado: 'Supervisionado', contextoLiberacao: false, liberacao: null, alertasRevisados: true, recolhida: false, sinalRelatado: false, em: serverTimestamp(), atualizadoEm: serverTimestamp() })
const liberacao = { profissional: 'Profissional de exemplo', registro: 'Conselho exemplo', data: '2026-11-10' }

beforeAll(async () => { env = await initializeTestEnvironment({ projectId: 'demo-forca', firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 } }) })
afterAll(() => env.cleanup())
beforeEach(async () => {
  await env.clearFirestore()
  await env.withSecurityRulesDisabled(async (c) => {
    const b = c.firestore() as unknown as Firestore
    for (const uid of ['ana', 'bia', 'coach', 'bloq', 'vencida', 'presencial']) await setDoc(doc(b, 'usuarios', uid), {
      papel: uid === 'coach' ? 'coach' : 'aluno', status: uid === 'bloq' ? 'bloqueado' : 'ativo',
      pagoAte: Timestamp.fromMillis(Date.now() + (uid === 'vencida' ? -10 : 30) * 86400_000),
      ...(uid === 'presencial' ? { presencial: true, migradoPara: 'ana' } : {}),
    })
  })
})

describe('orientações Físio: segurança', () => {
  it('só coach com segundo fator cria, só para aluno existente', async () => {
    await assertSucceeds(setDoc(ref('coach'), form()))
    for (const uid of [undefined, 'ana', 'bia']) await assertFails(setDoc(ref(uid, `o-${uid}`), form()))
    await assertFails(setDoc(doc(db('coach', false), 'fisioOrientacoes', 'sem-mfa'), form()))
    for (const alunoId of ['nao-existe', 'coach']) await assertFails(setDoc(ref('coach', alunoId), { ...form(), alunoId }))
  })
  it('bloqueia lacunas de alerta e exige liberação dos métodos/contextos corretos (catálogo completo)', async () => {
    for (const m of METODOS_FISIO) {
      const f = { ...form(m.id), liberacao }
      if (metodoLiberavel(m.id)) await assertSucceeds(setDoc(ref('coach', m.id), f))
      else await assertFails(setDoc(ref('coach', m.id), f))
      if (m.liberacao && metodoLiberavel(m.id)) await assertFails(setDoc(ref('coach', `${m.id}-sem`), form(m.id)))
    }
    await assertFails(setDoc(ref('coach', 'contexto'), { ...form(), contextoLiberacao: true }))
    await assertSucceeds(setDoc(ref('coach', 'contexto'), { ...form(), contextoLiberacao: true, liberacao }))
    await assertFails(setDoc(ref('coach', 'desconhecido'), form('M99')))
  })
  it('rejeita alertas não revisados, liberação incompleta, data futura, campo extra e criação já sinalizada', async () => {
    for (const extra of [{ alertasRevisados: false }, { condicao: '' }, { recado: 'a'.repeat(2001) }, { administrador: true }, { sinalRelatado: true }, { liberacao: { profissional: 'x' } }, { liberacao: { ...liberacao, data: '2099-01-01' } }]) {
      await assertFails(setDoc(ref('coach'), { ...form(), ...extra }))
    }
  })
  it('isola leitura por aluno e não permite ler recolhidas nem fazer consulta geral', async () => {
    await setDoc(ref('coach'), form())
    await assertSucceeds(getDoc(ref('ana')))
    await assertSucceeds(getDocs(query(collection(db('ana'), 'fisioOrientacoes'), where('alunoId', '==', 'ana'), where('recolhida', '==', false))))
    for (const uid of [undefined, 'bia', 'bloq', 'vencida']) await assertFails(getDoc(ref(uid)))
    await assertFails(getDocs(collection(db('ana'), 'fisioOrientacoes')))
    await updateDoc(ref('coach'), { recolhida: true, atualizadoEm: serverTimestamp() })
    await assertFails(getDoc(ref('ana')))
    await assertSucceeds(getDoc(ref('coach')))
  })
  it('aluno só acrescenta sinal; nem coach nem aluno podem apagá-lo ou reescrever conteúdo', async () => {
    await setDoc(ref('coach'), form())
    await assertFails(updateDoc(ref('bia'), { sinalRelatado: true, sinalEm: serverTimestamp(), atualizadoEm: serverTimestamp() }))
    await assertFails(updateDoc(ref('ana'), { recado: 'outro', atualizadoEm: serverTimestamp() }))
    await assertSucceeds(updateDoc(ref('ana'), { sinalRelatado: true, sinalEm: serverTimestamp(), atualizadoEm: serverTimestamp() }))
    for (const uid of ['ana', 'coach']) await assertFails(updateDoc(ref(uid), { sinalRelatado: false, atualizadoEm: serverTimestamp() }))
    await assertFails(updateDoc(ref('coach'), { metodoId: 'M10', atualizadoEm: serverTimestamp() }))
    await assertSucceeds(updateDoc(ref('coach'), { recolhida: true, atualizadoEm: serverTimestamp() }))
    expect((await getDoc(ref('coach'))).data()?.sinalRelatado).toBe(true)
    await assertFails(updateDoc(ref('coach'), { recolhida: false, atualizadoEm: serverTimestamp() }))
    await assertFails(deleteDoc(ref('ana')))
  })
  it('só permite transferência para o destino registrado do presencial, preservando conteúdo e sinal', async () => {
    await setDoc(ref('coach'), { ...form(), alunoId: 'presencial' })
    await assertFails(updateDoc(ref('coach'), { alunoId: 'bia', atualizadoEm: serverTimestamp() }))
    await assertSucceeds(updateDoc(ref('coach'), { alunoId: 'ana', atualizadoEm: serverTimestamp() }))
    await assertFails(updateDoc(ref('coach'), { alunoId: 'bia', atualizadoEm: serverTimestamp() }))
  })
})
