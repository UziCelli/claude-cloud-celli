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

// Relato de dor do treino (Etapa 3): fisioDores/{id automático}. O aluno só cria o próprio; o coach responde.
describe('relatos de dor (fisioDores): segurança', () => {
  const dor = (uid?: string, id = 'd') => doc(db(uid), 'fisioDores', id)
  const relato = (extra: object = {}) => ({ alunoId: 'ana', exercicio: 'Agachamento Livre Barra', articulacao: 'joelho', tipo: 'dor', intensidade: 4, momento: 'durante', em: serverTimestamp(), atualizadoEm: serverTimestamp(), ...extra })
  const existente = (alunoId = 'ana') => env.withSecurityRulesDisabled((c) =>
    setDoc(doc(c.firestore() as unknown as Firestore, 'fisioDores', 'd'), { ...relato({ alunoId }), em: Timestamp.now(), atualizadoEm: Timestamp.now() }))
  const agora = { atualizadoEm: serverTimestamp() }

  it('aluno liberado cria o próprio (com e sem texto; "outro" exige texto) e lê pelo id e pela consulta', async () => {
    await assertSucceeds(setDoc(dor('ana', 'a1'), relato()))
    await assertSucceeds(setDoc(dor('ana', 'a2'), relato({ articulacao: 'outro', texto: 'Na canela', tipo: 'sensacao', intensidade: 0, momento: 'fim' })))
    await assertSucceeds(setDoc(dor('ana', 'a3'), relato({ intensidade: 10, texto: 'é'.repeat(300) })))
    await assertSucceeds(getDoc(dor('ana', 'a1')))
    await assertSucceeds(getDocs(query(collection(db('ana'), 'fisioDores'), where('alunoId', '==', 'ana'))))
  })
  it('nega relato malformado: valores fora da lista, número inválido, texto longo, campo extra, horas forjadas, resposta do aluno', async () => {
    for (const extra of [
      { articulacao: 'nariz' }, { articulacao: 'outro' }, { articulacao: 'outro', texto: '   ' }, { tipo: 'medo' }, { momento: 'ontem' },
      { intensidade: -1 }, { intensidade: 11 }, { intensidade: 3.5 }, { intensidade: '4' }, { exercicio: '' }, { exercicio: 'x'.repeat(121) },
      { texto: 'x'.repeat(301) }, { texto: 5 }, { hack: true }, { resposta: 'eu mesmo' }, { vistoEm: serverTimestamp() },
      { em: Timestamp.fromMillis(Date.now() - 86400_000) }, { atualizadoEm: Timestamp.fromMillis(Date.now() + 86400_000) },
    ]) await assertFails(setDoc(dor('ana', 'x'), relato(extra)))
    const { momento: _m, ...semMomento } = relato()
    await assertFails(setDoc(dor('ana', 'x'), semMomento))
  })
  it('ninguém cria em nome de outro; bloqueado, vencido e sem login não criam nem leem', async () => {
    await assertFails(setDoc(dor('bia', 'x'), relato()))
    await assertFails(setDoc(dor('coach', 'x'), relato()))
    for (const uid of ['bloq', 'vencida']) await assertFails(setDoc(dor(uid, 'x'), relato({ alunoId: uid })))
    await assertFails(setDoc(dor(undefined, 'x'), relato()))
    await existente()
    for (const uid of [undefined, 'bia', 'bloq', 'vencida']) await assertFails(getDoc(dor(uid)))
    await assertFails(getDocs(collection(db('ana'), 'fisioDores')))
  })
  it('aluno não altera nem apaga o próprio relato (nem a resposta)', async () => {
    await existente()
    await assertFails(updateDoc(dor('ana'), { intensidade: 1, ...agora }))
    await assertFails(updateDoc(dor('ana'), { resposta: 'ok', respondidoEm: serverTimestamp(), ...agora }))
    await assertFails(updateDoc(dor('ana'), { vistoEm: serverTimestamp(), ...agora }))
    await assertFails(setDoc(dor('ana'), relato()))
    await assertFails(deleteDoc(dor('ana')))
  })
  it('coach com 2º fator lê, lista, marca visto, responde e apaga; sem 2º fator, nada', async () => {
    await existente()
    await assertSucceeds(getDoc(dor('coach')))
    await assertSucceeds(getDocs(collection(db('coach'), 'fisioDores')))
    await assertSucceeds(updateDoc(dor('coach'), { vistoEm: serverTimestamp(), ...agora }))
    await assertSucceeds(updateDoc(dor('coach'), { resposta: 'x'.repeat(1000), respondidoEm: serverTimestamp(), ...agora }))
    await assertSucceeds(updateDoc(dor('coach'), { resposta: 'Reduza a amplitude', respondidoEm: serverTimestamp(), vistoEm: serverTimestamp(), ...agora }))
    const semFator = doc(db('coach', false), 'fisioDores', 'd')
    await assertFails(getDoc(semFator))
    await assertFails(updateDoc(semFator, { vistoEm: serverTimestamp(), ...agora }))
    await assertFails(deleteDoc(semFator))
    await assertSucceeds(deleteDoc(dor('coach')))
  })
  it('coach não mexe no relato do aluno nem forja horas; resposta vazia ou longa é negada', async () => {
    await existente()
    for (const mudanca of [
      { intensidade: 1 }, { articulacao: 'ombro' }, { exercicio: 'Outro' }, { em: serverTimestamp() },
      { resposta: '', respondidoEm: serverTimestamp() }, { resposta: 'x'.repeat(1001), respondidoEm: serverTimestamp() },
      { resposta: 'ok', respondidoEm: Timestamp.now() }, { resposta: 'ok' }, { vistoEm: Timestamp.now() }, { hack: 1 },
    ]) await assertFails(updateDoc(dor('coach'), { ...mudanca, ...agora }))
    await assertFails(updateDoc(dor('coach'), { vistoEm: serverTimestamp() }))
  })
  it('transferência só para o destino registrado do presencial', async () => {
    await existente('presencial')
    await assertFails(updateDoc(dor('coach'), { alunoId: 'bia', ...agora }))
    await assertSucceeds(updateDoc(dor('coach'), { alunoId: 'ana', ...agora }))
  })
})
