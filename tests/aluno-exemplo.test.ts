// Testa tools/aluno-exemplo.mjs contra o emulador do Firestore: `npm run test:rules`.
import { execFileSync } from 'node:child_process'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { beforeEach, describe, expect, it } from 'vitest'
import { prescreverSessao } from '../src/engine'
import { mesoAtual } from '../src/features/aluno/mesoAtual'
import { registroId } from '../src/lib/conversores'
import { fracaoPC } from '../src/lib/pesoCorporal'

const HOST = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080'
process.env.FIRESTORE_EMULATOR_HOST = HOST
const db = getFirestore(initializeApp({ projectId: 'demo-forca' }, 'aluno-exemplo-teste'))

const HOJE = '2026-10-01' // quinta-feira: semana passada começou na segunda 2026-09-21
const AGORA = new Date(`${HOJE}T15:00:00Z`)
const EXEMPLO = 'exemplo-victor'
const COLECOES = ['usuarios', 'mesos', 'registros']

const rodar = (modo: string) => {
  try {
    const out = execFileSync('node', ['tools/aluno-exemplo.mjs'], {
      env: { ...process.env, MODO: modo, HOJE, PROJETO: 'demo-forca', FIRESTORE_EMULATOR_HOST: HOST },
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    return { ok: true, out }
  } catch (e) {
    return { ok: false, out: String((e as { stderr?: string }).stderr) }
  }
}

const plano = (v: unknown): unknown =>
  v instanceof Timestamp ? { ts: v.toMillis() }
  : Array.isArray(v) ? v.map(plano)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, plano(x)]))
  : v

async function tudo() {
  const r: Record<string, unknown> = {}
  for (const c of COLECOES) for (const d of (await db.collection(c).get()).docs) r[`${c}/${d.id}`] = plano(d.data())
  return r
}
// atualizadoEm do meso vem da hora do servidor: muda a cada execução, o resto não.
const semHora = (s: Record<string, unknown>) => {
  const c = structuredClone(s)
  delete (c[`mesos/${EXEMPLO}`] as Record<string, unknown>)?.atualizadoEm
  return c
}

const FUTURO = Timestamp.fromMillis(Date.parse('2027-01-01T00:00:00Z'))
const SEMANA2 = { alunoId: 'victor', mesoId: EXEMPLO, semana: 2, treino: 1, cargas: { 'ex-t1-01': { s1: 61 } }, realizado: false }

beforeEach(async () => {
  for (const c of COLECOES) for (const d of (await db.collection(c).get()).docs) await d.ref.delete()
  await db.doc('usuarios/coach').set({ papel: 'coach', nome: 'Victor Celli', email: 'c@x.com', status: 'ativo' })
  // Aluno de exemplo bloqueado, vencido e sem peso; outro aluno que não pode ser tocado.
  await db.doc('usuarios/victor').set({ papel: 'aluno', nome: 'Victor Aluno', email: 'v@x.com', status: 'bloqueado', pagoAte: Timestamp.fromMillis(1e12) })
  await db.doc('usuarios/ana').set({ papel: 'aluno', nome: 'Ana', email: 'a@x.com', status: 'ativo', pagoAte: FUTURO, pesoKg: 60 })
  // Mesos antigos dele: um em andamento hoje (atrapalharia), um concluído. Mais um da Ana.
  const m = { frequencia: 3, semanas: 4, divisao: {}, progressao: { principais: {}, auxiliares: {} }, pausaS: 60, metodos: [] }
  await db.doc('mesos/velho-andamento').set({ ...m, alunoId: 'victor', nome: 'Meso 5', inicio: '2026-09-28' })
  await db.doc('mesos/velho-concluido').set({ ...m, alunoId: 'victor', nome: 'Meso 4', inicio: '2026-06-01' })
  await db.doc('mesos/da-ana').set({ ...m, alunoId: 'ana', nome: 'Meso Ana', inicio: '2026-09-28' })
  await db.doc('registros/velho-andamento_s01_t1').set({ alunoId: 'victor', mesoId: 'velho-andamento', semana: 1, treino: 1, cargas: { x: { s1: 50 } } })
  await db.doc('registros/da-ana_s01_t1').set({ alunoId: 'ana', mesoId: 'da-ana', semana: 1, treino: 1, cargas: { x: { s1: 20 } } })
  // Registro da semana 2 já existente: a ferramenta não pode mexer.
  await db.doc(`registros/${registroId(EXEMPLO, 2, 1)}`).set(SEMANA2)
})

describe('aluno de exemplo', () => {
  it('simular não grava nada', async () => {
    const antes = await tudo()
    const r = rodar('simular')
    expect(r.ok, r.out).toBe(true)
    expect(r.out).toContain('SIMULAÇÃO')
    expect(await tudo()).toEqual(antes)
  })

  it('grava o perfil, o meso e só a semana 1; não toca em mais ninguém', async () => {
    const antes = await tudo()
    const r = rodar('gravar')
    expect(r.ok, r.out).toBe(true)
    const depois = await tudo()

    const v = depois['usuarios/victor'] as Record<string, any>
    expect(v.nome).toBe('Victor C.L. Silva')
    expect(v.status).toBe('ativo')
    expect(v.pesoKg).toBe(80)
    expect(v.email).toBe('v@x.com')
    // 2027-10-01 23:59:59 em São Paulo
    expect(v.pagoAte.ts).toBe(Date.parse('2027-10-01T23:59:59.999-03:00'))

    // Só mudaram: o perfil dele, o meso de exemplo, os registros da semana 1 e o início do meso antigo em andamento.
    const mudou = Object.keys(depois).filter((k) => JSON.stringify(depois[k]) !== JSON.stringify(antes[k])).sort()
    expect(mudou).toEqual([
      `mesos/${EXEMPLO}`,
      'mesos/velho-andamento',
      `registros/${EXEMPLO}_s01_t1`,
      `registros/${EXEMPLO}_s01_t2`,
      'usuarios/victor',
    ])
    expect(depois['usuarios/ana']).toEqual(antes['usuarios/ana'])
    expect(depois['usuarios/coach']).toEqual(antes['usuarios/coach'])
    expect(depois['mesos/da-ana']).toEqual(antes['mesos/da-ana'])
    expect(depois[`registros/${EXEMPLO}_s02_t1`]).toEqual(SEMANA2)
    expect(Object.keys(depois).filter((k) => k.startsWith('registros/') && /_s0[2-9]/.test(k))).toEqual([`registros/${EXEMPLO}_s02_t1`])
    // Meso antigo: só o início mudou (original guardado); cargas e registros intactos.
    expect(depois['registros/velho-andamento_s01_t1']).toEqual(antes['registros/velho-andamento_s01_t1'])
    expect(depois['mesos/velho-concluido']).toEqual(antes['mesos/velho-concluido'])
    expect((depois['mesos/velho-andamento'] as any).inicioOriginal).toBe('2026-09-28')
  })

  it('o meso de exemplo é o que o app mostra, na semana 2, com tudo prescrito e a semana 1 registrada', async () => {
    expect(rodar('gravar').ok).toBe(true)
    const mesos = (await db.collection('mesos').where('alunoId', '==', 'victor').get()).docs.map((d) => ({ id: d.id, ...d.data() }))
    const atual = mesoAtual(mesos as never, AGORA)!
    expect(atual.doc.id).toBe(EXEMPLO)
    expect(atual.meso.inicio).toBe('2026-09-21')
    expect(atual.estado).toEqual({ estado: 'durante', semana: 2 })

    const metodos = new Set<string>()
    for (const semana of [1, 2]) {
      for (const treino of [1, 2]) {
        const s = prescreverSessao(atual.meso, semana, treino)!
        expect(s.exercicios.length).toBeLessThanOrEqual(10)
        s.exercicios.forEach((e) => e.rotulo.split('; ').filter(Boolean).forEach((p) => metodos.add(p.split(' ')[0])))
      }
    }
    expect([...metodos].sort()).toEqual(['Biset', 'Circuito', 'Clusterset', 'Dropset', 'Rest-pause', 'Superset', 'Triset'])
    for (const semana of [1, 2]) {
      const sup = prescreverSessao(atual.meso, semana, 1)!.exercicios.filter((e) => e.rotulo.startsWith('Superset'))
      expect(sup.length).toBeGreaterThanOrEqual(4)
    }
    // Progressão entre as semanas.
    const reps = (w: number) => prescreverSessao(atual.meso, w, 1)!.exercicios[0].reps
    expect(reps(2)[0]).toBeGreaterThan(reps(1)[0])

    // Peso do corpo e registros: colunas batem com a prescrição; pc = peso × fração.
    const nomes = new Set(atual.meso.divisao.flat().map((x) => x.nome))
    for (const n of ['Barra Fixa Aberta', 'Flexão de Braços', 'Abdominal Infra no Solo', 'Agachamento com Peso do Corpo']) expect(nomes.has(n)).toBe(true)
    for (const treino of [1, 2]) {
      const reg = (await db.doc(`registros/${registroId(EXEMPLO, 1, treino)}`).get()).data()!
      const s = prescreverSessao(atual.meso, 1, treino)!
      expect(reg).toMatchObject({ alunoId: 'victor', mesoId: EXEMPLO, semana: 1, treino, realizado: true })
      expect(reg.realizadoEm).toBeInstanceOf(Timestamp)
      expect(reg.atualizadoEm).toBeInstanceOf(Timestamp)
      for (const e of s.exercicios) {
        expect(Object.keys(reg.cargas[e.slot.slotId]).length, e.slot.nome).toBe(e.reps.length)
        expect(Object.keys(reg.reps[e.slot.slotId]).length, e.slot.nome).toBe(e.reps.length)
      }
      for (const [slot, kg] of Object.entries(reg.pc as Record<string, number>)) {
        const nome = s.exercicios.find((e) => e.slot.slotId === slot)!.slot.nome
        expect(kg).toBeCloseTo(80 * fracaoPC(nome), 1)
      }
    }
    // Os 4 de peso do corpo estão marcados.
    const pcs = Object.keys(((await db.doc(`registros/${registroId(EXEMPLO, 1, 1)}`).get()).data()!.pc))
    const pcs2 = Object.keys(((await db.doc(`registros/${registroId(EXEMPLO, 1, 2)}`).get()).data()!.pc))
    expect(pcs.length + pcs2.length).toBe(4)
  })

  it('rodar duas vezes dá o mesmo resultado', async () => {
    expect(rodar('gravar').ok).toBe(true)
    const um = semHora(await tudo())
    expect(rodar('gravar').ok).toBe(true)
    expect(semHora(await tudo())).toEqual(um)
  })

  it('mantém o peso já cadastrado e calcula o peso do corpo com ele', async () => {
    await db.doc('usuarios/victor').update({ pesoKg: 90 })
    expect(rodar('gravar').ok).toBe(true)
    expect(((await db.doc('usuarios/victor').get()).data() as any).pesoKg).toBe(90)
    const pc = (await db.doc(`registros/${registroId(EXEMPLO, 1, 1)}`).get()).data()!.pc as Record<string, number>
    expect(pc['ex-t1-02']).toBeCloseTo(90 * 0.95, 1)
  })

  it('falha sem gravar quando não há aluno com o nome', async () => {
    await db.doc('usuarios/victor').update({ nome: 'Outro' })
    const antes = await tudo()
    const r = rodar('gravar')
    expect(r.ok).toBe(false)
    expect(r.out).toContain('achei 0')
    expect(await tudo()).toEqual(antes)
  })

  it('falha sem gravar quando há 2 alunos com o nome (inclusive um já renomeado)', async () => {
    await db.doc('usuarios/ana').update({ nome: 'Victor C.L. Silva' })
    const antes = await tudo()
    const r = rodar('gravar')
    expect(r.ok).toBe(false)
    expect(r.out).toContain('achei 2')
    expect(await tudo()).toEqual(antes)
  })
})
