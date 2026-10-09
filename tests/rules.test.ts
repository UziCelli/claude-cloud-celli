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
  writeBatch,
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
  arq: { papel: 'aluno', nome: 'Arq', email: 'q@x.com', status: 'arquivado', pagoAte: futuro },
};
const ALUNOS = ['ana', 'bia', 'exp', 'blq', 'agu', 'arq'];

const registro = (aluno: string, semana = 1, treino = 1) => ({
  alunoId: aluno,
  mesoId: `m_${aluno}`,
  semana,
  treino,
  realizado: false,
  cargas: { sup: { s1: 40 } },
});

// Token de quem entrou com o 2º fator (TOTP). O coach só tem poder de coach assim.
// O tipo do pacote não conhece sign_in_second_factor, por isso o cast.
const COM_FATOR = { firebase: { sign_in_provider: 'password', sign_in_second_factor: 'totp' } };
const SEM_FATOR = { firebase: { sign_in_provider: 'password' } };
const fator = (uid: string) => (uid === 'coach' ? COM_FATOR : {});
const contexto = (uid: string, token: object = {}) => env.authenticatedContext(uid, token as never);

// O contexto devolve o tipo "compat"; as funções modulares aceitam em tempo de execução.
// O uid 'coach' já entra com o 2º fator.
const db = (uid?: string) =>
  (uid ? contexto(uid, fator(uid)) : env.unauthenticatedContext()).firestore() as unknown as Firestore;

const reg = (uid: string | undefined, id: string) => doc(db(uid), 'registros', id);

// Login com e-mail no token (como no app: o Auth guarda o e-mail em minúsculas).
const dbEmail = (uid: string, email: string) =>
  contexto(uid, { email, ...fator(uid) }).firestore() as unknown as Firestore;

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
      ...ALUNOS.map((a) => setDoc(doc(admin, 'mesos', `m_${a}`), { alunoId: a, nome: 'Meso 1', semanas: 8, frequencia: 3 })),
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

// 2º fator do coach: poder de coach só com login que passou pelo TOTP (ou o claim de teste
// mfaDispensado, que só a Admin SDK define e só o seed do emulador usa).
describe('2º fator do coach', () => {
  const como = (token: object) =>
    contexto('coach', token).firestore() as unknown as Firestore;
  const coachSem = () => como(SEM_FATOR);

  it('com TOTP: tudo continua permitido', async () => {
    const c = como(COM_FATOR);
    await assertSucceeds(getDoc(doc(c, 'usuarios', 'ana')));
    await assertSucceeds(setDoc(doc(c, 'mesos', 'm_novo'), { alunoId: 'ana', nome: 'M' }));
    await assertSucceeds(getDocs(collection(c, 'logs')));
  });

  it('sem 2º fator: nega ler aluno, escrever meso e ler logs', async () => {
    const c = coachSem();
    await assertFails(getDoc(doc(c, 'usuarios', 'ana')));
    await assertFails(getDocs(collection(c, 'usuarios')));
    await assertFails(setDoc(doc(c, 'mesos', 'm_novo'), { alunoId: 'ana', nome: 'M' }));
    await assertFails(getDoc(doc(c, 'mesos', 'm_ana')));
    await assertFails(getDocs(collection(c, 'logs')));
    await assertFails(getDoc(doc(c, 'registros', 'm_ana_s01_t1')));
  });

  it('sem 2º fator: ainda lê o próprio perfil (o app precisa saber o papel)', () =>
    assertSucceeds(getDoc(doc(coachSem(), 'usuarios', 'coach'))));

  it('só com mfaDispensado: permitido', async () => {
    const c = como({ ...SEM_FATOR, mfaDispensado: true });
    await assertSucceeds(getDoc(doc(c, 'usuarios', 'ana')));
    await assertSucceeds(setDoc(doc(c, 'mesos', 'm_novo'), { alunoId: 'ana', nome: 'M' }));
  });

  it('mfaDispensado diferente de true não vale', async () => {
    await assertFails(getDoc(doc(como({ ...SEM_FATOR, mfaDispensado: 'true' }), 'usuarios', 'ana')));
    await assertFails(getDoc(doc(como({ ...SEM_FATOR, mfaDispensado: false }), 'usuarios', 'ana')));
  });

  it('aluno não muda: lê o próprio treino, não lê outro aluno', async () => {
    await assertSucceeds(getDoc(doc(db('ana'), 'mesos', 'm_ana')));
    await assertFails(getDoc(doc(db('ana'), 'usuarios', 'bia')));
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

  it('coach consulta registros por atualizadoEm (painel)', () =>
    assertSucceeds(
      getDocs(query(collection(db('coach'), 'registros'), where('atualizadoEm', '>=', Timestamp.fromMillis(Date.now() - 14 * DIA)))),
    ));

  it('coach lê e lista todos', async () => {
    await assertSucceeds(getDoc(doc(db('coach'), 'usuarios', 'bia')));
    await assertSucceeds(getDocs(collection(db('coach'), 'usuarios')));
  });

  describe('cadastro próprio', () => {
    const novo = { papel: 'aluno', status: 'aguardando', nome: 'Novo', email: 'n@x.com', criadoEm: serverTimestamp() };
    const criar = (dados: object, id = 'novo') => setDoc(doc(dbEmail('novo', 'n@x.com'), 'usuarios', id), dados);

    it('permite aluno aguardando', () => assertSucceeds(criar(novo)));
    it('nega papel coach', () => assertFails(criar({ ...novo, papel: 'coach' })));
    it('nega status ativo', () => assertFails(criar({ ...novo, status: 'ativo' })));
    it('nega pagoAte', () => assertFails(criar({ ...novo, pagoAte: futuro })));
    it('nega campo extra', () => assertFails(criar({ ...novo, admin: true })));
    it('nega id diferente do uid', () => assertFails(criar(novo, 'outro')));
    it('nega sem nome ou sem e-mail', async () => {
      const { nome: _n, ...semNome } = novo;
      const { email: _e, ...semEmail } = novo;
      await assertFails(criar(semNome));
      await assertFails(criar(semEmail));
    });
    it('nega nome vazio, longo demais ou não texto', async () => {
      await assertFails(criar({ ...novo, nome: '' }));
      await assertFails(criar({ ...novo, nome: 'x'.repeat(81) }));
      await assertFails(criar({ ...novo, nome: 123 }));
      await assertSucceeds(criar({ ...novo, nome: 'x'.repeat(80) }));
    });
    it('nega e-mail diferente do login', async () => {
      await assertFails(criar({ ...novo, email: 'outro@x.com' }));
      await assertFails(setDoc(doc(db('novo'), 'usuarios', 'novo'), novo)); // login sem e-mail
    });
    it('aceita privacidade (hora do servidor e versão)', () =>
      assertSucceeds(criar({ ...novo, privacidadeEm: serverTimestamp(), privacidadeVersao: '2026-10-02' })));
    it('aceita versão de privacidade com 20 caracteres', () =>
      assertSucceeds(criar({ ...novo, privacidadeEm: serverTimestamp(), privacidadeVersao: 'x'.repeat(20) })));
    it('nega privacidadeEm com data qualquer', async () => {
      await assertFails(criar({ ...novo, privacidadeEm: futuro, privacidadeVersao: '1' }));
      await assertFails(criar({ ...novo, privacidadeEm: passado, privacidadeVersao: '1' }));
    });
    it('nega versão de privacidade vazia, longa ou não texto', async () => {
      await assertFails(criar({ ...novo, privacidadeEm: serverTimestamp(), privacidadeVersao: '' }));
      await assertFails(criar({ ...novo, privacidadeEm: serverTimestamp(), privacidadeVersao: 'x'.repeat(21) }));
      await assertFails(criar({ ...novo, privacidadeEm: serverTimestamp(), privacidadeVersao: 1 }));
    });
    it('nega criadoEm com data qualquer', async () => {
      await assertFails(criar({ ...novo, criadoEm: passado }));
      await assertFails(criar({ ...novo, criadoEm: futuro }));
    });
  });

  it('nome próprio continua texto de 1 a 80 caracteres', async () => {
    const ana = doc(db('ana'), 'usuarios', 'ana');
    await assertFails(updateDoc(ana, { nome: '' }));
    await assertFails(updateDoc(ana, { nome: 'x'.repeat(81) }));
    await assertFails(updateDoc(ana, { nome: 42 }));
  });

  describe('coach e outros usuários', () => {
    it('não promove ninguém a coach', async () => {
      const c = db('coach');
      await assertFails(updateDoc(doc(c, 'usuarios', 'ana'), { papel: 'coach' }));
      await assertFails(setDoc(doc(c, 'usuarios', 'x'), { papel: 'coach', status: 'ativo', nome: 'X', email: 'x@x.com' }));
      await assertFails(setDoc(doc(c, 'usuarios', 'y'), { status: 'ativo', nome: 'Y', email: '' }));
    });
    it('continua editando aluno e o próprio perfil', async () => {
      await assertSucceeds(updateDoc(doc(db('coach'), 'usuarios', 'ana'), { status: 'bloqueado', nome: 'Ana B' }));
      await assertSucceeds(updateDoc(doc(db('coach'), 'usuarios', 'coach'), { nome: 'Victor Celli' }));
    });
    it('fora de usuarios, mesos e registros, nem o coach lê ou escreve', async () => {
      const c = db('coach');
      await assertFails(setDoc(doc(c, 'config', 'x'), { a: 1 }));
      await assertFails(getDoc(doc(c, 'config', 'x')));
      await assertFails(setDoc(doc(c, 'usuarios', 'ana', 'notas', 'n1'), { a: 1 }));
    });
  });

  it('aluno grava o próprio pesoKg (20 a 300, int ou float), sozinho ou com o nome', async () => {
    const ana = doc(db('ana'), 'usuarios', 'ana');
    await assertSucceeds(updateDoc(ana, { pesoKg: 70 }));
    await assertSucceeds(updateDoc(ana, { pesoKg: 70.5 }));
    await assertSucceeds(updateDoc(ana, { pesoKg: 20 }));
    await assertSucceeds(updateDoc(ana, { pesoKg: 300 }));
    await assertSucceeds(updateDoc(ana, { nome: 'Ana M', pesoKg: 65 }));
  });

  it('pesoKg fora da faixa ou não numérico é negado; nome segue validado junto', async () => {
    const ana = doc(db('ana'), 'usuarios', 'ana');
    await assertFails(updateDoc(ana, { pesoKg: 19.9 }));
    await assertFails(updateDoc(ana, { pesoKg: 301 }));
    await assertFails(updateDoc(ana, { pesoKg: '70' }));
    await assertFails(updateDoc(ana, { pesoKg: null }));
    await assertFails(updateDoc(ana, { nome: '', pesoKg: 70 }));
    await assertFails(updateDoc(doc(db('ana'), 'usuarios', 'bia'), { pesoKg: 70 }));
    await assertFails(updateDoc(ana, { pesoKg: 70, status: 'bloqueado', pagoAte: Timestamp.fromMillis(Date.now() + 365 * DIA) }));
  });

  it('aluno grava o aceite da privacidade (hora do servidor + versão), sozinho ou com o nome', async () => {
    for (const uid of ['ana', 'agu', 'blq', 'exp']) {
      await assertSucceeds(updateDoc(doc(db(uid), 'usuarios', uid), { privacidadeEm: serverTimestamp(), privacidadeVersao: '2026-10' }));
    }
    await assertSucceeds(
      updateDoc(doc(db('bia'), 'usuarios', 'bia'), { nome: 'Bia M', privacidadeEm: serverTimestamp(), privacidadeVersao: 'v1' }),
    );
  });

  it('privacidade: negada com papel/status, hora forjada, versão inválida ou em outro usuário', async () => {
    const ana = doc(db('ana'), 'usuarios', 'ana');
    await assertFails(updateDoc(ana, { privacidadeEm: serverTimestamp(), privacidadeVersao: '1', papel: 'coach' }));
    await assertFails(updateDoc(ana, { privacidadeEm: serverTimestamp(), privacidadeVersao: '1', status: 'bloqueado' }));
    await assertFails(updateDoc(ana, { privacidadeEm: passado, privacidadeVersao: '1' }));
    await assertFails(updateDoc(ana, { privacidadeEm: futuro }));
    await assertFails(updateDoc(ana, { privacidadeEm: serverTimestamp(), privacidadeVersao: '' }));
    await assertFails(updateDoc(ana, { privacidadeEm: serverTimestamp(), privacidadeVersao: 'x'.repeat(21) }));
    await assertFails(updateDoc(ana, { privacidadeVersao: 5 }));
    await assertFails(updateDoc(doc(db('ana'), 'usuarios', 'bia'), { privacidadeEm: serverTimestamp(), privacidadeVersao: '1' }));
  });

  it('aluno grava o próprio selo (só booleano), sozinho ou com o nome', async () => {
    const ana = doc(db('ana'), 'usuarios', 'ana');
    await assertSucceeds(updateDoc(ana, { selo: true }));
    await assertSucceeds(updateDoc(ana, { selo: false }));
    await assertSucceeds(updateDoc(ana, { nome: 'Ana M', selo: true }));
    await assertFails(updateDoc(ana, { selo: 'sim' }));
    await assertFails(updateDoc(ana, { selo: 1 }));
    await assertFails(updateDoc(ana, { selo: null }));
    await assertFails(updateDoc(ana, { selo: true, papel: 'coach' }));
    await assertFails(updateDoc(ana, { selo: true, status: 'bloqueado' }));
    await assertFails(updateDoc(ana, { selo: true, email: 'x@x.com' }));
    await assertFails(updateDoc(doc(db('ana'), 'usuarios', 'bia'), { selo: true }));
  });

  it('usuário altera só o próprio nome', async () => {
    await assertSucceeds(updateDoc(doc(db('ana'), 'usuarios', 'ana'), { nome: 'Ana Maria' }));
    await assertFails(updateDoc(doc(db('ana'), 'usuarios', 'bia'), { nome: 'Hack' }));
  });

  // Troca de e-mail: só coaches (tela Minha conta). Aluno troca por manutenção (Admin SDK).
  describe('e-mail', () => {
    const comToken = (uid: string, email: string) =>
      doc(contexto(uid, { email, ...fator(uid) }).firestore() as unknown as Firestore, 'usuarios', uid);

    it('aluno não altera o próprio e-mail, nem igual ao do login', async () => {
      await assertFails(updateDoc(comToken('ana', 'nova@x.com'), { email: 'nova@x.com' }));
      await assertFails(updateDoc(comToken('ana', 'nova@x.com'), { email: 'nova@x.com', nome: 'Ana M' }));
    });
    it('coach altera o próprio e-mail', () =>
      assertSucceeds(updateDoc(comToken('coach', 'novo@x.com'), { email: 'novo@x.com' })));
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

  it('coach arquiva, reativa e apaga aluno arquivado', async () => {
    const c = db('coach');
    await assertSucceeds(updateDoc(doc(c, 'usuarios', 'ana'), { status: 'arquivado' }));
    await assertSucceeds(updateDoc(doc(c, 'usuarios', 'ana'), { status: 'ativo' }));
    await assertSucceeds(deleteDoc(doc(c, 'usuarios', 'arq')));
    await assertSucceeds(deleteDoc(doc(c, 'notas', 'arq')));
  });

  it('coach libera aluno e só ele apaga', async () => {
    await assertSucceeds(updateDoc(doc(db('coach'), 'usuarios', 'agu'), { status: 'ativo', pagoAte: futuro }));
    await assertFails(deleteDoc(doc(db('ana'), 'usuarios', 'ana')));
    await assertSucceeds(deleteDoc(doc(db('coach'), 'usuarios', 'ana')));
  });
});

// Aluno presencial (sem login): criarAlunoPresencial / darAcessoAoApp em src/lib/acoes.ts.
describe('aluno presencial', () => {
  const pres = { papel: 'aluno', status: 'ativo', presencial: true, nome: 'Pres', email: '', criadoEm: serverTimestamp() };
  beforeEach(async () => {
    const c = db('coach');
    await setDoc(doc(c, 'usuarios', 'pres'), pres);
    await setDoc(doc(c, 'mesos', 'm_pres'), { alunoId: 'pres', nome: 'Meso 1', semanas: 8, frequencia: 3 });
    await setDoc(doc(c, 'registros', 'm_pres_s01_t1'), registro('pres'));
  });

  it('coach cria, lê e anota cargas', async () => {
    await assertSucceeds(getDoc(doc(db('coach'), 'usuarios', 'pres')));
    await assertSucceeds(updateDoc(reg('coach', 'm_pres_s01_t1'), { 'cargas.sup.s2': 50, atualizadoEm: serverTimestamp() }));
  });

  it('nenhum aluno lê o perfil, os mesos ou os registros do presencial', async () => {
    await assertFails(getDoc(doc(db('ana'), 'usuarios', 'pres')));
    await assertFails(getDoc(doc(db('ana'), 'mesos', 'm_pres')));
    await assertFails(getDoc(reg('ana', 'm_pres_s01_t1')));
    await assertFails(getDocs(query(collection(db('ana'), 'mesos'), where('alunoId', '==', 'pres'))));
    await assertFails(getDocs(query(collection(db('ana'), 'registros'), where('alunoId', '==', 'pres'))));
  });

  it('coach dá acesso ao app: perfil novo, troca alunoId em lote, apaga o antigo', async () => {
    const c = db('coach');
    await assertSucceeds(updateDoc(doc(c, 'usuarios', 'pres'), { migradoPara: 'nova' }));
    await assertSucceeds(
      setDoc(doc(c, 'usuarios', 'nova'), { papel: 'aluno', status: 'ativo', pagoAte: futuro, nome: 'Pres', email: 'p@x.com' }),
    );
    const b = writeBatch(c);
    b.update(doc(c, 'mesos', 'm_pres'), { alunoId: 'nova' });
    b.update(doc(c, 'registros', 'm_pres_s01_t1'), { alunoId: 'nova' });
    await assertSucceeds(b.commit());
    await assertSucceeds(deleteDoc(doc(c, 'usuarios', 'pres')));
    // A aluna nova vê o histórico e continua anotando no mesmo registro.
    await assertSucceeds(getDoc(doc(db('nova'), 'mesos', 'm_pres')));
    await assertSucceeds(updateDoc(reg('nova', 'm_pres_s01_t1'), { 'cargas.sup.s3': 55, atualizadoEm: serverTimestamp() }));
    await assertFails(getDoc(doc(db('ana'), 'mesos', 'm_pres')));
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

  it('arquivado não lê o próprio meso', () => assertFails(getDoc(doc(db('arq'), 'mesos', 'm_arq'))));

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
      await assertFails(setDoc(reg(uid, `m_${uid}_s01_t2`), { ...registro(uid, 1, 2), atualizadoEm: serverTimestamp() }));
      await assertFails(updateDoc(reg(uid, `m_${uid}_s01_t1`), { 'cargas.sup.s2': 50, atualizadoEm: serverTimestamp() }));
    }
  });

  describe('criação', () => {
    // Como o app (registro em src/lib/acoes.ts): sempre com atualizadoEm = serverTimestamp().
    const criar = (dados: object, id = 'm_ana_s02_t1') =>
      setDoc(reg('ana', id), { atualizadoEm: serverTimestamp(), ...dados }, { merge: true });

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
    it('permite reps feitas junto', () =>
      assertSucceeds(criar({ ...registro('ana', 2, 1), reps: { sup: { s1: 12 } } })));
    it('permite pc (kg do corpo por exercício) junto', () =>
      assertSucceeds(criar({ ...registro('ana', 2, 1), pc: { sup: 70, rem: 0 } })));
    it('nega pc que não é mapa', async () => {
      await assertFails(criar({ ...registro('ana', 2, 1), pc: 70 }));
      await assertFails(criar({ ...registro('ana', 2, 1), pc: 'x' }));
    });
    it('nega campo extra', () => assertFails(criar({ ...registro('ana', 2, 1), nota: 10 })));
    it('nega id que não bate com meso/semana/treino', async () => {
      await assertFails(criar(registro('ana', 2, 1), 'qualquer'));
      await assertFails(criar(registro('ana', 3, 1), 'm_ana_s02_t1'));
      await assertFails(criar(registro('ana', 2, 2), 'm_ana_s02_t1'));
    });
    it('nega semana ou treino fora do meso (8 semanas, 3 treinos)', async () => {
      await assertFails(criar(registro('ana', 0, 1), 'm_ana_s00_t1'));
      await assertFails(criar(registro('ana', 9, 1), 'm_ana_s09_t1'));
      await assertFails(criar(registro('ana', 2, 0), 'm_ana_s02_t0'));
      await assertFails(criar(registro('ana', 2, 4), 'm_ana_s02_t4'));
      await assertSucceeds(criar(registro('ana', 8, 3), 'm_ana_s08_t3'));
    });
    it('nega tipos errados em realizado, cargas e reps', async () => {
      await assertFails(criar({ ...registro('ana', 2, 1), realizado: 'sim' }));
      await assertFails(criar({ ...registro('ana', 2, 1), cargas: 40 }));
      await assertFails(criar({ ...registro('ana', 2, 1), reps: 'doze' }));
    });
    it('nega atualizadoEm ausente ou escolhido pelo aparelho', async () => {
      await assertFails(setDoc(reg('ana', 'm_ana_s02_t1'), registro('ana', 2, 1), { merge: true }));
      await assertFails(criar({ ...registro('ana', 2, 1), atualizadoEm: futuro }));
    });
    it('realizadoEm só pode ser a hora do servidor ou null', async () => {
      await assertFails(criar({ ...registro('ana', 2, 1), realizadoEm: passado }));
      await assertSucceeds(criar({ ...registro('ana', 2, 2), realizadoEm: null }, 'm_ana_s02_t2'));
    });
  });

  describe('inicioEm (tempo real do treino)', () => {
    const id = { alunoId: 'ana', mesoId: 'm_ana', semana: 1, treino: 1 }
    const agora = () => ({ atualizadoEm: serverTimestamp() })

    it('criação aceita inicioEm = hora do servidor; nega hora escolhida pelo aparelho', async () => {
      const criar = (dados: object, i: string) => setDoc(reg('ana', i), { ...registro('ana', 3, 1), ...agora(), ...dados }, { merge: true })
      await assertSucceeds(criar({ inicioEm: serverTimestamp() }, 'm_ana_s03_t1'));
      await assertFails(criar({ inicioEm: passado }, 'm_ana_s03_t1'));
    });
    it('atualização grava inicioEm = hora do servidor (updateDoc e setDoc merge)', async () => {
      await assertSucceeds(updateDoc(reg('ana', 'm_ana_s01_t1'), { inicioEm: serverTimestamp(), ...agora() }));
      await assertSucceeds(setDoc(reg('ana', 'm_ana_s01_t2'), { ...id, treino: 2, inicioEm: serverTimestamp(), ...agora() }, { merge: true }));
    });
    it('nega inicioEm inventado na atualização', async () => {
      await assertFails(updateDoc(reg('ana', 'm_ana_s01_t1'), { inicioEm: passado, ...agora() }));
      await assertFails(updateDoc(reg('ana', 'm_ana_s01_t1'), { inicioEm: futuro, ...agora() }));
    });
    it('depois de gravado, reenviar o mesmo valor não muda; editar carga não mexe nele', async () => {
      const r = reg('ana', 'm_ana_s01_t1');
      await assertSucceeds(updateDoc(r, { inicioEm: serverTimestamp(), ...agora() }));
      await assertSucceeds(updateDoc(r, { 'cargas.sup.s2': 50, ...agora() }));
      await assertFails(updateDoc(r, { inicioEm: passado, ...agora() }));
      await assertFails(updateDoc(r, { inicioEm: null, ...agora() }));
    });
    it('outro aluno não grava inicioEm no registro alheio', () =>
      assertFails(updateDoc(reg('bia', 'm_ana_s01_t1'), { inicioEm: serverTimestamp(), ...agora() })));
  });

  describe('atualização', () => {
    it('permite cargas por campo (updateDoc com caminho pontilhado)', () =>
      assertSucceeds(updateDoc(reg('ana', 'm_ana_s01_t1'), { 'cargas.sup.s2': 42.5, atualizadoEm: serverTimestamp() })));

    it('permite setDoc merge com cargas aninhadas e identidade repetida (offline)', () =>
      assertSucceeds(
        setDoc(
          reg('ana', 'm_ana_s01_t1'),
          { ...registro('ana'), cargas: { agach: { s1: 80 } }, atualizadoEm: serverTimestamp() },
          { merge: true },
        ),
      ));

    it('permite reps feitas por setDoc merge (como registrarReps)', async () => {
      const r = reg('ana', 'm_ana_s01_t1');
      const id = { alunoId: 'ana', mesoId: 'm_ana', semana: 1, treino: 1 };
      await assertSucceeds(setDoc(r, { ...id, reps: { sup: { s1: 12 } }, atualizadoEm: serverTimestamp() }, { merge: true }));
      await assertSucceeds(setDoc(r, { ...id, reps: { sup: { s2: null } }, atualizadoEm: serverTimestamp() }, { merge: true }));
    });

    it('reps não liberam mudar alunoId ou semana', async () => {
      const r = reg('ana', 'm_ana_s01_t1');
      await assertFails(setDoc(r, { alunoId: 'bia', reps: { sup: { s1: 12 } } }, { merge: true }));
      await assertFails(setDoc(r, { semana: 2, reps: { sup: { s1: 12 } } }, { merge: true }));
    });

    it('permite pc por campo e por setDoc merge; nega pc não-mapa', async () => {
      const r = reg('ana', 'm_ana_s01_t1');
      const id = { alunoId: 'ana', mesoId: 'm_ana', semana: 1, treino: 1 };
      await assertSucceeds(updateDoc(r, { 'pc.sup': 70, atualizadoEm: serverTimestamp() }));
      await assertSucceeds(updateDoc(r, { 'pc.sup': 0, atualizadoEm: serverTimestamp() }));
      await assertSucceeds(setDoc(r, { ...id, pc: { rem: 70 }, atualizadoEm: serverTimestamp() }, { merge: true }));
      await assertFails(updateDoc(r, { pc: 70, atualizadoEm: serverTimestamp() }));
      await assertFails(setDoc(r, { ...id, pc: 'x', atualizadoEm: serverTimestamp() }, { merge: true }));
    });

    it('permite marcar realizado', () =>
      assertSucceeds(
        updateDoc(reg('ana', 'm_ana_s01_t1'), { realizado: true, realizadoEm: serverTimestamp(), atualizadoEm: serverTimestamp() }),
      ));

    it('como marcarRealizado e registrarCarga: desmarca com null e edita carga sem reenviar realizadoEm', async () => {
      const r = reg('ana', 'm_ana_s01_t1');
      const id = { alunoId: 'ana', mesoId: 'm_ana', semana: 1, treino: 1 };
      const agora = () => ({ atualizadoEm: serverTimestamp() });
      await assertSucceeds(setDoc(r, { ...id, realizado: true, realizadoEm: serverTimestamp(), ...agora() }, { merge: true }));
      await assertSucceeds(setDoc(r, { ...id, cargas: { sup: { s2: 45 } }, ...agora() }, { merge: true }));
      await assertSucceeds(setDoc(r, { ...id, realizado: false, realizadoEm: null, ...agora() }, { merge: true }));
    });

    it('nega sem atualizadoEm, realizadoEm inventado ou tipos errados', async () => {
      const r = reg('ana', 'm_ana_s01_t1');
      await assertFails(updateDoc(r, { 'cargas.sup.s2': 50 }));
      await assertFails(updateDoc(r, { 'cargas.sup.s2': 50, atualizadoEm: futuro }));
      await assertFails(updateDoc(r, { realizado: true, realizadoEm: passado, atualizadoEm: serverTimestamp() }));
      await assertFails(updateDoc(r, { realizado: 1, atualizadoEm: serverTimestamp() }));
      await assertFails(updateDoc(r, { cargas: 'x', atualizadoEm: serverTimestamp() }));
      await assertFails(updateDoc(r, { reps: 3, atualizadoEm: serverTimestamp() }));
    });

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
      assertFails(updateDoc(reg('ana', 'm_bia_s01_t1'), { 'cargas.sup.s2': 1, atualizadoEm: serverTimestamp() })));
  });

  it('só o coach apaga; coach lê e escreve qualquer um', async () => {
    await assertFails(deleteDoc(reg('ana', 'm_ana_s01_t1')));
    await assertSucceeds(getDoc(reg('coach', 'm_bia_s01_t1')));
    await assertSucceeds(updateDoc(reg('coach', 'm_bia_s01_t1'), { semana: 2 }));
    await assertSucceeds(deleteDoc(reg('coach', 'm_bia_s01_t1')));
  });
});

describe('notas', () => {
  const nota = (uid: string | undefined, id: string) => doc(db(uid), 'notas', id);
  // Como o app: setDoc merge com serverTimestamp.
  const gravar = (uid: string, id: string, extra: object = {}) =>
    setDoc(
      nota(uid, id),
      { alunoId: id, exercicios: { Supino: 'banco 3' }, atualizadoEm: serverTimestamp(), ...extra },
      { merge: true },
    );

  beforeEach(() =>
    env.withSecurityRulesDisabled(async (ctx) => {
      const admin = ctx.firestore() as unknown as Firestore;
      await setDoc(doc(admin, 'notas', 'ana'), { alunoId: 'ana', exercicios: { Supino: 'antiga' }, atualizadoEm: passado });
      await setDoc(doc(admin, 'notas', 'bia'), { alunoId: 'bia', exercicios: {}, atualizadoEm: passado });
    }),
  );

  it('aluno liberado lê e grava a própria nota (nova e existente)', async () => {
    await assertSucceeds(getDoc(nota('ana', 'ana')));
    await assertSucceeds(gravar('ana', 'ana'));
    await assertSucceeds(getDoc(nota('bia', 'bia')));
    await env.withSecurityRulesDisabled(async (ctx) => {
      await deleteDoc(doc(ctx.firestore() as unknown as Firestore, 'notas', 'ana'));
    });
    await assertSucceeds(gravar('ana', 'ana'));
  });

  it('aluno não lê nem escreve nota de outro', async () => {
    await assertFails(getDoc(nota('ana', 'bia')));
    await assertFails(gravar('ana', 'bia'));
    await assertFails(gravar('ana', 'bia', { alunoId: 'ana' }));
    await assertFails(deleteDoc(nota('ana', 'bia')));
  });

  it('vencido, bloqueado, aguardando e anônimo não leem nem escrevem', async () => {
    for (const uid of ['exp', 'blq', 'agu']) {
      await assertFails(getDoc(nota(uid, uid)));
      await assertFails(gravar(uid, uid));
    }
    await assertFails(getDoc(nota(undefined, 'ana')));
    await assertFails(setDoc(nota(undefined, 'ana'), { alunoId: 'ana', exercicios: {}, atualizadoEm: serverTimestamp() }));
  });

  it('coach lê e escreve qualquer nota', async () => {
    await assertSucceeds(getDoc(nota('coach', 'ana')));
    await assertSucceeds(setDoc(nota('coach', 'bia'), { alunoId: 'bia', exercicios: { Remada: 'x' } }, { merge: true }));
    await assertSucceeds(deleteDoc(nota('coach', 'ana')));
  });

  it('nega campo extra, alunoId errado, exercicios não-mapa e atualizadoEm do aparelho', async () => {
    await assertFails(gravar('ana', 'ana', { extra: 1 }));
    await assertFails(gravar('ana', 'ana', { alunoId: 'bia' }));
    await assertFails(gravar('ana', 'ana', { exercicios: 'texto' }));
    await assertFails(gravar('ana', 'ana', { exercicios: ['a'] }));
    await assertFails(gravar('ana', 'ana', { atualizadoEm: futuro }));
    await assertFails(setDoc(nota('ana', 'ana'), { alunoId: 'ana', exercicios: {} }, { merge: true }));
  });

  it('limita exercicios a 300 chaves', async () => {
    const mapa = (n: number) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`ex${i}`, 't']));
    // 299 (e não 300): com 300 nomes o emulador falha ao avaliar get() em me() (limite do motor de regras), então o teto efetivo é 299.
    await assertSucceeds(gravar('ana', 'ana', { exercicios: mapa(299) }));
    await assertFails(gravar('bia', 'bia', { exercicios: mapa(301) }));
  });
});

// Pedido de exclusão total (LGPD): só o coach cria/lê/apaga; o workflow diário usa a Admin SDK.
describe('exclusoes', () => {
  const ex = (uid: string | undefined, id = 'ana') => doc(db(uid), 'exclusoes', id);
  const semCoach = (token: object) => doc(contexto('coach', token).firestore() as unknown as Firestore, 'exclusoes', 'ana');
  const existente = () =>
    env.withSecurityRulesDisabled((ctx) =>
      setDoc(doc(ctx.firestore() as unknown as Firestore, 'exclusoes', 'ana'), { em: Timestamp.now() }),
    );

  it('coach com 2º fator cria, lê, atualiza e apaga', async () => {
    await assertSucceeds(setDoc(ex('coach'), { em: serverTimestamp() }));
    await assertSucceeds(getDoc(ex('coach')));
    await assertSucceeds(getDocs(collection(db('coach'), 'exclusoes')));
    await assertSucceeds(setDoc(ex('coach'), { em: serverTimestamp() }));
    await assertSucceeds(deleteDoc(ex('coach')));
  });

  it('coach sem 2º fator, aluno e anônimo: tudo negado', async () => {
    await existente();
    await assertFails(setDoc(semCoach(SEM_FATOR), { em: serverTimestamp() }));
    await assertFails(getDoc(semCoach(SEM_FATOR)));
    await assertFails(deleteDoc(semCoach(SEM_FATOR)));
    for (const uid of ['ana', 'bia', undefined]) {
      await assertFails(setDoc(ex(uid, 'ana'), { em: serverTimestamp() }));
      await assertFails(setDoc(ex(uid, 'novo'), { em: serverTimestamp() }));
      await assertFails(getDoc(ex(uid, 'ana')));
      await assertFails(deleteDoc(ex(uid, 'ana')));
    }
  });

  it('coach: nega chave extra, em diferente de serverTimestamp e sem em', async () => {
    await assertFails(setDoc(ex('coach'), { em: serverTimestamp(), motivo: 'x' }));
    await assertFails(setDoc(ex('coach'), { em: passado }));
    await assertFails(setDoc(ex('coach'), { em: futuro }));
    await assertFails(setDoc(ex('coach'), { em: 'agora' }));
    await assertFails(setDoc(ex('coach'), {}));
  });
});

// Registro de erros do app: qualquer usuário logado cria; só o coach lê e apaga; ninguém edita.
describe('logs', () => {
  const log = (uid: string | undefined, id = 'l1') => doc(db(uid), 'logs', id);
  const valido = (uid: string, extra: object = {}) => ({
    tipo: 'erro',
    mensagem: 'falhou ao salvar',
    tela: '/treino',
    versao: '1.0.0',
    aparelho: 'Mozilla/5.0',
    online: true,
    uid,
    em: serverTimestamp(),
    ...extra,
  });
  const semudar = () =>
    env.withSecurityRulesDisabled((ctx) =>
      setDoc(doc(ctx.firestore() as unknown as Firestore, 'logs', 'l1'), { tipo: 'erro', mensagem: 'x', uid: 'ana' }),
    );

  it('aluno logado cria registro válido, de qualquer status', async () => {
    await assertSucceeds(setDoc(log('ana'), valido('ana')));
    await assertSucceeds(setDoc(log('blq', 'l2'), valido('blq')));
    await assertSucceeds(setDoc(log('agu', 'l3'), valido('agu')));
  });

  it('aceita todos os tipos e nega tipo desconhecido', async () => {
    for (const tipo of ['erro', 'promessa', 'gravacao', 'carregando']) {
      await assertSucceeds(setDoc(log('ana', tipo), valido('ana', { tipo })));
    }
    await assertFails(setDoc(log('ana'), valido('ana', { tipo: 'outro' })));
  });

  it('nega sem login', () => assertFails(setDoc(log(undefined), valido('ana'))));

  it('nega campo extra e campo faltando', async () => {
    await assertFails(setDoc(log('ana'), valido('ana', { extra: 1 })));
    for (const campo of ['tipo', 'mensagem', 'tela', 'versao', 'aparelho', 'online', 'uid', 'em']) {
      const { [campo]: _fora, ...resto } = valido('ana') as Record<string, unknown>;
      await assertFails(setDoc(log('ana'), resto));
    }
  });

  it('limita tamanhos e tipos', async () => {
    await assertSucceeds(setDoc(log('ana', 'a'), valido('ana', { mensagem: 'x'.repeat(500) })));
    await assertFails(setDoc(log('ana'), valido('ana', { mensagem: 'x'.repeat(501) })));
    await assertFails(setDoc(log('ana'), valido('ana', { mensagem: 123 })));
    await assertFails(setDoc(log('ana'), valido('ana', { tela: 'x'.repeat(101) })));
    await assertFails(setDoc(log('ana'), valido('ana', { versao: 'x'.repeat(41) })));
    await assertFails(setDoc(log('ana'), valido('ana', { aparelho: 'x'.repeat(201) })));
    await assertFails(setDoc(log('ana'), valido('ana', { online: 'sim' })));
  });

  it('nega uid de outro e hora do aparelho', async () => {
    await assertFails(setDoc(log('ana'), valido('bia')));
    await assertFails(setDoc(log('ana'), valido('ana', { em: futuro })));
  });

  it('aluno não lê, não lista, não apaga e não edita', async () => {
    await semudar();
    await assertFails(getDoc(log('ana')));
    await assertFails(getDocs(collection(db('ana'), 'logs')));
    await assertFails(deleteDoc(log('ana')));
    await assertFails(updateDoc(log('ana'), { mensagem: 'y' }));
  });

  it('coach lê, lista e apaga, mas não edita', async () => {
    await semudar();
    await assertSucceeds(getDoc(log('coach')));
    await assertSucceeds(getDocs(collection(db('coach'), 'logs')));
    await assertFails(updateDoc(log('coach'), { mensagem: 'y' }));
    await assertSucceeds(deleteDoc(log('coach')));
    await assertSucceeds(setDoc(log('coach', 'c1'), valido('coach')));
  });
});

// Foto de perfil (fotos/{uid}): JPEG 192x192 em data URL. Só o dono grava; dono e coach leem e apagam.
describe('fotos', () => {
  const foto = (uid: string | undefined, id = 'ana') => doc(db(uid), 'fotos', id);
  const img = 'data:image/jpeg;base64,' + 'A'.repeat(20000);
  const valida = (extra: object = {}) => ({ img, atualizadoEm: serverTimestamp(), ...extra });
  const existente = () =>
    env.withSecurityRulesDisabled((ctx) =>
      setDoc(doc(ctx.firestore() as unknown as Firestore, 'fotos', 'ana'), { img, atualizadoEm: Timestamp.now() }),
    );

  it('aluno grava, troca, lê e apaga a própria foto (de qualquer status)', async () => {
    await assertSucceeds(setDoc(foto('ana'), valida()));
    await assertSucceeds(setDoc(foto('ana'), valida()));
    await assertSucceeds(getDoc(foto('ana')));
    await assertSucceeds(deleteDoc(foto('ana')));
    await assertSucceeds(setDoc(foto('blq', 'blq'), valida()));
    await assertSucceeds(setDoc(foto('exp', 'exp'), valida()));
  });

  it('aceita img com padding e no limite de 60000 caracteres', async () => {
    await assertSucceeds(setDoc(foto('ana'), valida({ img: 'data:image/jpeg;base64,QUJD/+==' })));
    const prefixo = 'data:image/jpeg;base64,';
    await assertSucceeds(setDoc(foto('ana'), valida({ img: prefixo + 'A'.repeat(60000 - prefixo.length) })));
  });

  it('coach lê e apaga, mas não cria nem altera foto de aluno', async () => {
    await existente();
    await assertSucceeds(getDoc(foto('coach')));
    await assertFails(setDoc(foto('coach'), valida()));
    await assertFails(setDoc(foto('coach', 'bia'), valida()));
    await assertFails(updateDoc(foto('coach'), { img: 'data:image/jpeg;base64,QUJD' }));
    await assertSucceeds(deleteDoc(foto('coach')));
  });

  it('coach sem 2º fator não lê nem apaga', async () => {
    await existente();
    const c = doc(contexto('coach', SEM_FATOR).firestore() as unknown as Firestore, 'fotos', 'ana');
    await assertFails(getDoc(c));
    await assertFails(deleteDoc(c));
  });

  it('aluno não lê, grava nem apaga foto de outro', async () => {
    await existente();
    await assertFails(getDoc(foto('bia', 'ana')));
    await assertFails(setDoc(foto('bia', 'ana'), valida()));
    await assertFails(setDoc(foto('bia', 'nova'), valida()));
    await assertFails(updateDoc(foto('bia', 'ana'), { img: 'data:image/jpeg;base64,QUJD' }));
    await assertFails(deleteDoc(foto('bia', 'ana')));
  });

  it('nega img grande demais, de outro formato, ou que não é texto', async () => {
    const prefixo = 'data:image/jpeg;base64,';
    await assertFails(setDoc(foto('ana'), valida({ img: prefixo + 'A'.repeat(60001 - prefixo.length) })));
    await assertFails(setDoc(foto('ana'), valida({ img: 'data:image/png;base64,AAAA' })));
    await assertFails(setDoc(foto('ana'), valida({ img: 'data:image/svg+xml;base64,AAAA' })));
    await assertFails(setDoc(foto('ana'), valida({ img: 'data:image/svg+xml,<svg onload=alert(1)/>' })));
    await assertFails(setDoc(foto('ana'), valida({ img: 'javascript:alert(1)' })));
    await assertFails(setDoc(foto('ana'), valida({ img: 'https://x.com/a.jpg' })));
    await assertFails(setDoc(foto('ana'), valida({ img: 'data:image/jpeg;base64,' })));
    await assertFails(setDoc(foto('ana'), valida({ img: 'data:image/jpeg;base64,AA"onerror="x' })));
    await assertFails(setDoc(foto('ana'), valida({ img: ' data:image/jpeg;base64,AAAA' })));
    await assertFails(setDoc(foto('ana'), valida({ img: 123 })));
    await assertFails(setDoc(foto('ana'), valida({ img: null })));
  });

  it('nega campo extra, campo faltando e atualizadoEm que não é a hora do servidor', async () => {
    await assertFails(setDoc(foto('ana'), valida({ extra: 1 })));
    await assertFails(setDoc(foto('ana'), valida({ alunoId: 'ana' })));
    await assertFails(setDoc(foto('ana'), { img }));
    await assertFails(setDoc(foto('ana'), { atualizadoEm: serverTimestamp() }));
    await assertFails(setDoc(foto('ana'), valida({ atualizadoEm: passado })));
    await assertFails(setDoc(foto('ana'), valida({ atualizadoEm: futuro })));
    await assertFails(setDoc(foto('ana'), valida({ atualizadoEm: 'agora' })));
  });

  it('sem login: nada', async () => {
    await existente();
    await assertFails(getDoc(foto(undefined)));
    await assertFails(setDoc(foto(undefined), valida()));
    await assertFails(deleteDoc(foto(undefined)));
  });
});
