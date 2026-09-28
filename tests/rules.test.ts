// Testes das regras do Firestore. Rodam só com o emulador: `npm run test:rules`.
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type Firestore,
} from 'firebase/firestore';

let env: RulesTestEnvironment;

const DIA = 24 * 60 * 60 * 1000;
const futuro = Timestamp.fromMillis(Date.now() + 30 * DIA);
const passado = Timestamp.fromMillis(Date.now() - DIA);

// ana e bia: alunas liberadas. exp: pagamento vencido. blq: bloqueada. agu: aguardando.
const usuarios: Record<string, object> = {
  coach: { papel: 'coach', nome: 'Victor', email: 'c@x.com', status: 'ativo' },
  ana: { papel: 'aluno', nome: 'Ana', email: 'a@x.com', status: 'ativo', pagoAte: futuro },
  bia: { papel: 'aluno', nome: 'Bia', email: 'b@x.com', status: 'ativo', pagoAte: futuro },
  exp: { papel: 'aluno', nome: 'Exp', email: 'e@x.com', status: 'ativo', pagoAte: passado },
  blq: { papel: 'aluno', nome: 'Blq', email: 'l@x.com', status: 'bloqueado', pagoAte: futuro },
  agu: { papel: 'aluno', nome: 'Agu', email: 'g@x.com', status: 'aguardando' },
};
const ALUNOS = ['ana', 'bia', 'exp', 'blq', 'agu'];

const registro = (aluno: string, semana = 1, treino = 1) => ({
  alunoId: aluno,
  mesoId: `m_${aluno}`,
  semana,
  treino,
  realizado: false,
  cargas: { sup: { s1: 40 } },
});

// O contexto devolve o tipo "compat"; as funções modulares aceitam em tempo de execução.
const db = (uid?: string) =>
  (uid ? env.authenticatedContext(uid) : env.unauthenticatedContext()).firestore() as unknown as Firestore;

const reg = (uid: string | undefined, id: string) => doc(db(uid), 'registros', id);

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-forca',
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
  });
});

afterAll(() => env.cleanup());

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    const admin = ctx.firestore() as unknown as Firestore;
    await Promise.all([
      ...Object.entries(usuarios).map(([uid, u]) => setDoc(doc(admin, 'usuarios', uid), u)),
      ...ALUNOS.map((a) => setDoc(doc(admin, 'mesos', `m_${a}`), { alunoId: a, nome: 'Meso 1', semanas: 8 })),
      ...ALUNOS.map((a) => setDoc(doc(admin, 'registros', `m_${a}_s01_t1`), registro(a))),
    ]);
  });
});

describe('sem login', () => {
  it('não lê nem escreve nada', async () => {
    await assertFails(getDoc(doc(db(), 'usuarios', 'ana')));
    await assertFails(getDoc(doc(db(), 'mesos', 'm_ana')));
    await assertFails(getDoc(reg(undefined, 'm_ana_s01_t1')));
    await assertFails(setDoc(doc(db(), 'usuarios', 'x'), { papel: 'aluno', status: 'aguardando' }));
    await assertFails(setDoc(reg(undefined, 'm_ana_s01_t2'), registro('ana', 1, 2)));
  });
});

describe('usuarios', () => {
  it('cada um lê o próprio documento, mesmo bloqueado, vencido ou aguardando', async () => {
    for (const uid of ALUNOS) await assertSucceeds(getDoc(doc(db(uid), 'usuarios', uid)));
  });

  it('aluno não lê outro usuário nem lista a coleção', async () => {
    await assertFails(getDoc(doc(db('ana'), 'usuarios', 'bia')));
    await assertFails(getDocs(collection(db('ana'), 'usuarios')));
  });

  it('coach lê e lista todos', async () => {
    await assertSucceeds(getDoc(doc(db('coach'), 'usuarios', 'bia')));
    await assertSucceeds(getDocs(collection(db('coach'), 'usuarios')));
  });

  describe('cadastro próprio', () => {
    const novo = { papel: 'aluno', status: 'aguardando', nome: 'Novo', email: 'n@x.com', criadoEm: serverTimestamp() };
    const criar = (dados: object, id = 'novo') => setDoc(doc(db('novo'), 'usuarios', id), dados);

    it('permite aluno aguardando', () => assertSucceeds(criar(novo)));
    it('nega papel coach', () => assertFails(criar({ ...novo, papel: 'coach' })));
    it('nega status ativo', () => assertFails(criar({ ...novo, status: 'ativo' })));
    it('nega pagoAte', () => assertFails(criar({ ...novo, pagoAte: futuro })));
    it('nega campo extra', () => assertFails(criar({ ...novo, admin: true })));
    it('nega id diferente do uid', () => assertFails(criar(novo, 'outro')));
  });

  it('usuário altera só o próprio nome', async () => {
    await assertSucceeds(updateDoc(doc(db('ana'), 'usuarios', 'ana'), { nome: 'Ana Maria' }));
    await assertFails(updateDoc(doc(db('ana'), 'usuarios', 'bia'), { nome: 'Hack' }));
  });

  it('usuário não altera papel, status ou pagoAte', async () => {
    const ana = doc(db('ana'), 'usuarios', 'ana');
    await assertFails(updateDoc(ana, { papel: 'coach' }));
    await assertFails(updateDoc(ana, { pagoAte: Timestamp.fromMillis(Date.now() + 365 * DIA) }));
    await assertFails(updateDoc(ana, { nome: 'Ana', status: 'bloqueado' }));
    await assertFails(updateDoc(doc(db('blq'), 'usuarios', 'blq'), { status: 'ativo' }));
    await assertFails(updateDoc(doc(db('exp'), 'usuarios', 'exp'), { pagoAte: futuro }));
    await assertFails(updateDoc(doc(db('agu'), 'usuarios', 'agu'), { status: 'ativo' }));
  });

  it('coach libera aluno e só ele apaga', async () => {
    await assertSucceeds(updateDoc(doc(db('coach'), 'usuarios', 'agu'), { status: 'ativo', pagoAte: futuro }));
    await assertFails(deleteDoc(doc(db('ana'), 'usuarios', 'ana')));
    await assertSucceeds(deleteDoc(doc(db('coach'), 'usuarios', 'ana')));
  });
});

describe('mesos', () => {
  it('aluno liberado lê o próprio meso (doc e consulta)', async () => {
    await assertSucceeds(getDoc(doc(db('ana'), 'mesos', 'm_ana')));
    await assertSucceeds(getDocs(query(collection(db('ana'), 'mesos'), where('alunoId', '==', 'ana'))));
  });

  it('aluno não lê meso de outro aluno nem lista tudo', async () => {
    await assertFails(getDoc(doc(db('ana'), 'mesos', 'm_bia')));
    await assertFails(getDocs(collection(db('ana'), 'mesos')));
  });

  it('vencido, bloqueado, aguardando ou sem cadastro não lê', async () => {
    for (const uid of ['exp', 'blq', 'agu']) await assertFails(getDoc(doc(db(uid), 'mesos', `m_${uid}`)));
    await assertFails(getDocs(query(collection(db('novo'), 'mesos'), where('alunoId', '==', 'novo'))));
  });

  it('só o coach escreve', async () => {
    await assertFails(updateDoc(doc(db('ana'), 'mesos', 'm_ana'), { semanas: 12 }));
    await assertFails(setDoc(doc(db('ana'), 'mesos', 'm_novo'), { alunoId: 'ana', nome: 'Meu' }));
    await assertFails(deleteDoc(doc(db('ana'), 'mesos', 'm_ana')));
    await assertSucceeds(setDoc(doc(db('coach'), 'mesos', 'm_novo'), { alunoId: 'bia', nome: 'Meso 2' }));
    await assertSucceeds(updateDoc(doc(db('coach'), 'mesos', 'm_ana'), { semanas: 12 }));
    await assertSucceeds(deleteDoc(doc(db('coach'), 'mesos', 'm_bia')));
  });
});

describe('registros', () => {
  it('aluno liberado lê os próprios (doc e consulta)', async () => {
    await assertSucceeds(getDoc(reg('ana', 'm_ana_s01_t1')));
    await assertSucceeds(getDocs(query(collection(db('ana'), 'registros'), where('alunoId', '==', 'ana'))));
  });

  it('aluno não lê registro de outro nem lista tudo', async () => {
    await assertFails(getDoc(reg('ana', 'm_bia_s01_t1')));
    await assertFails(getDocs(collection(db('ana'), 'registros')));
  });

  it('vencido, bloqueado ou aguardando não lê nem escreve', async () => {
    for (const uid of ['exp', 'blq', 'agu']) {
      await assertFails(getDoc(reg(uid, `m_${uid}_s01_t1`)));
      await assertFails(setDoc(reg(uid, `m_${uid}_s01_t2`), registro(uid, 1, 2)));
      await assertFails(updateDoc(reg(uid, `m_${uid}_s01_t1`), { 'cargas.sup.s2': 50 }));
    }
  });

  describe('criação', () => {
    const criar = (dados: object, id = 'm_ana_s02_t1') => setDoc(reg('ana', id), dados, { merge: true });

    it('permite registro próprio com merge', () =>
      assertSucceeds(criar({ ...registro('ana', 2, 1), realizadoEm: serverTimestamp(), atualizadoEm: serverTimestamp() })));
    it('nega alunoId de outro', () => assertFails(criar({ ...registro('ana', 2, 1), alunoId: 'bia' })));
    it('nega meso de outro aluno', () =>
      assertFails(criar({ ...registro('ana', 2, 1), mesoId: 'm_bia' }, 'm_bia_s02_t1')));
    it('nega meso inexistente', () =>
      assertFails(criar({ ...registro('ana', 2, 1), mesoId: 'm_nada' }, 'm_nada_s02_t1')));
    it('nega semana ou treino não inteiros', async () => {
      await assertFails(criar({ ...registro('ana', 2, 1), semana: '2' }));
      await assertFails(criar({ ...registro('ana', 2, 1), semana: 1.5 }, 'm_ana_s01.5_t1'));
      await assertFails(criar({ ...registro('ana', 2, 1), treino: 1.5 }, 'm_ana_s02_t1.5'));
    });
    it('nega campo extra', () => assertFails(criar({ ...registro('ana', 2, 1), nota: 10 })));
    it('nega id que não bate com meso/semana/treino', async () => {
      await assertFails(criar(registro('ana', 2, 1), 'qualquer'));
      await assertFails(criar(registro('ana', 3, 1), 'm_ana_s02_t1'));
      await assertFails(criar(registro('ana', 2, 2), 'm_ana_s02_t1'));
    });
  });

  describe('atualização', () => {
    it('permite cargas por campo (updateDoc com caminho pontilhado)', () =>
      assertSucceeds(updateDoc(reg('ana', 'm_ana_s01_t1'), { 'cargas.sup.s2': 42.5, atualizadoEm: serverTimestamp() })));

    it('permite setDoc merge com cargas aninhadas e identidade repetida (offline)', () =>
      assertSucceeds(
        setDoc(reg('ana', 'm_ana_s01_t1'), { ...registro('ana'), cargas: { agach: { s1: 80 } } }, { merge: true }),
      ));

    it('permite marcar realizado', () =>
      assertSucceeds(updateDoc(reg('ana', 'm_ana_s01_t1'), { realizado: true, realizadoEm: serverTimestamp() })));

    it('nega mudar alunoId, mesoId, semana, treino ou campo extra', async () => {
      const r = reg('ana', 'm_ana_s01_t1');
      await assertFails(updateDoc(r, { alunoId: 'bia' }));
      await assertFails(updateDoc(r, { mesoId: 'm_bia' }));
      await assertFails(updateDoc(r, { semana: 2 }));
      await assertFails(updateDoc(r, { treino: 2 }));
      await assertFails(updateDoc(r, { nota: 10 }));
      await assertFails(setDoc(r, { semana: 2, cargas: { sup: { s1: 1 } } }, { merge: true }));
    });

    it('nega alterar registro de outro aluno', () =>
      assertFails(updateDoc(reg('ana', 'm_bia_s01_t1'), { 'cargas.sup.s2': 1 })));
  });

  it('só o coach apaga; coach lê e escreve qualquer um', async () => {
    await assertFails(deleteDoc(reg('ana', 'm_ana_s01_t1')));
    await assertSucceeds(getDoc(reg('coach', 'm_bia_s01_t1')));
    await assertSucceeds(updateDoc(reg('coach', 'm_bia_s01_t1'), { semana: 2 }));
    await assertSucceeds(deleteDoc(reg('coach', 'm_bia_s01_t1')));
  });
});
