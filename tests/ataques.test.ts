// Teste de segurança do back-end, do ponto de vista de um ATACANTE: um ataque por caso.
// Todo caso precisa ser NEGADO, salvo quando o comentário diz "PERMITIDO DE PROPÓSITO"
// (ou "ACHADO": comportamento atual que o teste só documenta).
// Rodam só com o emulador: flock /tmp/claude-emulador.lock npm run test:rules
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
  collectionGroup,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  limit,
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

// Contadores: quantos ataques foram tentados e negados (impresso no fim).
let negados = 0;
const negar = (p: Promise<unknown>) => {
  negados++;
  return assertFails(p);
};

// ana e bia: alunas liberadas. exp: vencida. blq: bloqueada. agu: aguardando. arq: arquivada.
// sempago: ativa mas sem pagoAte. corr: ativa com pagoAte corrompido (texto).
const usuarios: Record<string, object> = {
  coach: { papel: 'coach', nome: 'Victor', email: 'c@x.com', status: 'ativo' },
  ana: { papel: 'aluno', nome: 'Ana', email: 'a@x.com', status: 'ativo', pagoAte: futuro },
  bia: { papel: 'aluno', nome: 'Bia', email: 'b@x.com', status: 'ativo', pagoAte: futuro },
  exp: { papel: 'aluno', nome: 'Exp', email: 'e@x.com', status: 'ativo', pagoAte: passado },
  blq: { papel: 'aluno', nome: 'Blq', email: 'l@x.com', status: 'bloqueado', pagoAte: futuro },
  agu: { papel: 'aluno', nome: 'Agu', email: 'g@x.com', status: 'aguardando' },
  arq: { papel: 'aluno', nome: 'Arq', email: 'q@x.com', status: 'arquivado', pagoAte: futuro },
  sempago: { papel: 'aluno', nome: 'Sem', email: 's@x.com', status: 'ativo' },
  corr: { papel: 'aluno', nome: 'Corr', email: 'k@x.com', status: 'ativo', pagoAte: 'amanhã' },
};
const ALUNOS = ['ana', 'bia', 'exp', 'blq', 'agu', 'arq', 'sempago', 'corr'];
const NAO_LIBERADOS = ['exp', 'blq', 'agu', 'arq', 'sempago', 'corr'];

const registro = (aluno: string, semana = 1, treino = 1) => ({
  alunoId: aluno,
  mesoId: `m_${aluno}`,
  semana,
  treino,
  realizado: false,
  cargas: { sup: { s1: 40 } },
});
const idReg = (aluno: string, semana = 1, treino = 1) =>
  `m_${aluno}_s${semana < 10 ? '0' : ''}${semana}_t${treino}`;

const COM_FATOR = { firebase: { sign_in_provider: 'password', sign_in_second_factor: 'totp' } };
const SEM_FATOR = { firebase: { sign_in_provider: 'password' } };
const fator = (uid: string) => (uid === 'coach' ? COM_FATOR : {});
const contexto = (uid: string, token: object = {}) => env.authenticatedContext(uid, token as never);
const comoFirestore = (uid: string, token: object) => contexto(uid, token).firestore() as unknown as Firestore;

// uid 'coach' já entra com o 2º fator; sem uid = anônimo (sem login).
const db = (uid?: string) =>
  (uid ? contexto(uid, fator(uid)) : env.unauthenticatedContext()).firestore() as unknown as Firestore;
const dbEmail = (uid: string, email: string) =>
  contexto(uid, { email, ...fator(uid) }).firestore() as unknown as Firestore;

const reg = (uid: string | undefined, id: string) => doc(db(uid), 'registros', id);
const agora = () => ({ atualizadoEm: serverTimestamp() });
// Hora do relógio do cliente, 1 s atrás: Timestamp.now() logo antes do pedido pode cair no mesmo milissegundo
// do request.time do emulador (a regra aceita, e o teste falhava de vez em quando no CI).
const quaseAgora = () => Timestamp.fromMillis(Date.now() - 1000);
// Cria registro como o app faz (setDoc merge com atualizadoEm do servidor).
const criarReg = (uid: string, id: string, dados: object) =>
  setDoc(reg(uid, id), { ...agora(), ...dados }, { merge: true });

const admin = (fn: (a: Firestore) => Promise<unknown>) =>
  env.withSecurityRulesDisabled(async (ctx) => {
    await fn(ctx.firestore() as unknown as Firestore);
  });

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-forca',
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
  });
});

afterAll(async () => {
  await env.cleanup();
  console.info(`[ataques] ${negados} ataques negados (fora os casos "permitido de propósito")`);
});

beforeEach(async () => {
  await env.clearFirestore();
  await admin(async (a) => {
    await Promise.all([
      ...Object.entries(usuarios).map(([uid, u]) => setDoc(doc(a, 'usuarios', uid), u)),
      ...ALUNOS.map((x) => setDoc(doc(a, 'mesos', `m_${x}`), { alunoId: x, nome: 'Meso 1', semanas: 8, frequencia: 3 })),
      ...ALUNOS.map((x) => setDoc(doc(a, 'registros', idReg(x)), registro(x))),
      ...ALUNOS.map((x) => setDoc(doc(a, 'notas', x), { alunoId: x, exercicios: { Supino: 'banco 3' }, atualizadoEm: passado })),
      setDoc(doc(a, 'logs', 'l_bia'), { tipo: 'erro', mensagem: 'x', uid: 'bia' }),
      setDoc(doc(a, 'exclusoes', 'bia'), { em: Timestamp.now() }),
    ]);
  });
});

// ---------------------------------------------------------------------------------------------
describe('troca de ID: aluno A contra os dados do aluno B', () => {
  describe('usuarios', () => {
    it('get direto (adivinhando o id) do aluno B, do coach e de quem não existe', async () => {
      await negar(getDoc(doc(db('ana'), 'usuarios', 'bia')));
      await negar(getDoc(doc(db('ana'), 'usuarios', 'coach')));
      await negar(getDoc(doc(db('ana'), 'usuarios', 'inexistente')));
    });

    it('list/query sem filtro ou procurando B por e-mail, papel, status ou id', async () => {
      const c = db('ana');
      await negar(getDocs(collection(c, 'usuarios')));
      await negar(getDocs(query(collection(c, 'usuarios'), limit(1))));
      await negar(getDocs(query(collection(c, 'usuarios'), where('email', '==', 'b@x.com'))));
      await negar(getDocs(query(collection(c, 'usuarios'), where('papel', '==', 'coach'))));
      await negar(getDocs(query(collection(c, 'usuarios'), where('status', '==', 'ativo'))));
      await negar(getDocs(collectionGroup(c, 'usuarios')));
    });

    it('escrever no perfil de B: update, merge, setDoc, apagar, criar com id de outro', async () => {
      const c = db('ana');
      await negar(updateDoc(doc(c, 'usuarios', 'bia'), { nome: 'Hack' }));
      await negar(updateDoc(doc(c, 'usuarios', 'bia'), { status: 'bloqueado' }));
      await negar(setDoc(doc(c, 'usuarios', 'bia'), { nome: 'Hack' }, { merge: true }));
      await negar(setDoc(doc(c, 'usuarios', 'bia'), usuarios.bia));
      await negar(deleteDoc(doc(c, 'usuarios', 'bia')));
      await negar(deleteDoc(doc(c, 'usuarios', 'coach')));
      await negar(setDoc(doc(dbEmail('ana', 'n@x.com'), 'usuarios', 'novo'),
        { papel: 'aluno', status: 'aguardando', nome: 'N', email: 'n@x.com' })); // id diferente do uid
    });
  });

  describe('mesos', () => {
    it('get direto do meso de B e de meso inexistente', async () => {
      await negar(getDoc(doc(db('ana'), 'mesos', 'm_bia')));
      await negar(getDoc(doc(db('ana'), 'mesos', 'm_nada')));
    });

    it('list/query sem filtro ou com o alunoId de B', async () => {
      const c = db('ana');
      await negar(getDocs(collection(c, 'mesos')));
      await negar(getDocs(query(collection(c, 'mesos'), limit(5))));
      await negar(getDocs(query(collection(c, 'mesos'), where('alunoId', '==', 'bia'))));
      await negar(getDocs(query(collection(c, 'mesos'), where('alunoId', 'in', ['ana', 'bia']))));
      await negar(getDocs(query(collection(c, 'mesos'), where('alunoId', '!=', 'ana'))));
      await negar(getDocs(collectionGroup(c, 'mesos')));
    });

    it('escrever: alterar, criar, apagar (de B e o próprio) e passar o próprio meso para B', async () => {
      const c = db('ana');
      await negar(updateDoc(doc(c, 'mesos', 'm_bia'), { semanas: 1 }));
      await negar(setDoc(doc(c, 'mesos', 'm_bia'), { alunoId: 'ana', nome: 'Roubado', semanas: 8, frequencia: 3 }));
      await negar(deleteDoc(doc(c, 'mesos', 'm_bia')));
      await negar(updateDoc(doc(c, 'mesos', 'm_ana'), { alunoId: 'bia' }));
      await negar(updateDoc(doc(c, 'mesos', 'm_ana'), { semanas: 99, frequencia: 99 })); // abriria semanas/treinos falsos
      await negar(setDoc(doc(c, 'mesos', 'm_ana2'), { alunoId: 'ana', nome: 'Meu', semanas: 99, frequencia: 99 }));
      await negar(setDoc(doc(c, 'mesos', 'm_ana', 'extra', 'x'), { a: 1 })); // subcoleção
    });
  });

  describe('registros', () => {
    it('get direto do registro de B, de id que não existe e do próprio com id de B', async () => {
      await negar(getDoc(reg('ana', idReg('bia'))));
      await negar(getDoc(reg('ana', idReg('bia', 2, 1))));
    });

    it('list/query sem filtro, com alunoId de B, mesoId de B, in ou collectionGroup', async () => {
      const c = db('ana');
      await negar(getDocs(collection(c, 'registros')));
      await negar(getDocs(query(collection(c, 'registros'), where('alunoId', '==', 'bia'))));
      await negar(getDocs(query(collection(c, 'registros'), where('mesoId', '==', 'm_bia'))));
      await negar(getDocs(query(collection(c, 'registros'), where('alunoId', 'in', ['ana', 'bia']))));
      await negar(getDocs(query(collection(c, 'registros'), where('semana', '==', 1))));
      await negar(getDocs(collectionGroup(c, 'registros')));
    });

    it('escrever no registro de B: carga, "roubar" mudando alunoId para si, merge, apagar', async () => {
      const c = db('ana');
      const alvo = doc(c, 'registros', idReg('bia'));
      await negar(updateDoc(alvo, { 'cargas.sup.s2': 1, ...agora() }));
      await negar(updateDoc(alvo, { alunoId: 'ana' })); // vira dono do registro de B
      await negar(setDoc(alvo, { alunoId: 'ana', 'cargas': { sup: { s1: 1 } }, ...agora() }, { merge: true }));
      await negar(setDoc(alvo, { ...registro('ana'), mesoId: 'm_bia', ...agora() })); // sobrescrever inteiro
      await negar(deleteDoc(alvo));
    });

    it('criar registro no meso de B: com alunoId de A, de B, ou com meso de B e id coerente', async () => {
      await negar(criarReg('ana', idReg('bia', 2, 1), { ...registro('ana', 2, 1), mesoId: 'm_bia' }));
      await negar(criarReg('ana', idReg('bia', 2, 1), { ...registro('bia', 2, 1) }));
      await negar(criarReg('ana', idReg('ana', 2, 1), { ...registro('bia', 2, 1), mesoId: 'm_ana' })); // meso meu, dono B
      await negar(criarReg('ana', idReg('ana', 2, 1), { ...registro('ana', 2, 1), mesoId: 'm_bia' })); // id não bate
      await negar(criarReg('ana', idReg('bia', 3, 2), { ...registro('ana', 3, 2), mesoId: 'm_bia' }));
    });

    it('mudar alunoId ou mesoId do próprio registro (update, merge, setDoc, deleteField)', async () => {
      const r = reg('ana', idReg('ana'));
      await negar(updateDoc(r, { alunoId: 'bia' }));
      await negar(updateDoc(r, { mesoId: 'm_bia' }));
      await negar(updateDoc(r, { alunoId: 'bia', mesoId: 'm_bia', ...agora() }));
      await negar(updateDoc(r, { alunoId: deleteField() })); // registro "órfão"
      await negar(updateDoc(r, { mesoId: deleteField() }));
      await negar(setDoc(r, { alunoId: 'bia', ...agora() }, { merge: true }));
      await negar(setDoc(r, { ...registro('ana'), mesoId: 'm_bia', ...agora() })); // setDoc inteiro
      await negar(updateDoc(r, { semana: 2 }));
      await negar(updateDoc(r, { treino: 2 }));
    });

    it('id fora do padrão (registro duplicado da mesma semana/treino)', async () => {
      await negar(criarReg('ana', 'm_ana_s2_t1', registro('ana', 2, 1))); // sem o zero
      await negar(criarReg('ana', 'qualquer_coisa', registro('ana', 2, 1)));
      await negar(criarReg('ana', 'm_ana_s02_t1_dup', registro('ana', 2, 1)));
    });

    it('lote misto (uma gravação legítima + uma no registro de B) falha inteiro, sem gravar nada', async () => {
      const c = db('ana');
      const b = writeBatch(c);
      b.update(doc(c, 'registros', idReg('ana')), { 'cargas.sup.s9': 99, ...agora() });
      b.update(doc(c, 'registros', idReg('bia')), { 'cargas.sup.s9': 99, ...agora() });
      await negar(b.commit());
      await admin(async (a) => {
        const s = await getDoc(doc(a, 'registros', idReg('ana')));
        if (s.data()?.cargas?.sup?.s9 !== undefined) throw new Error('o lote parcial gravou a carga');
      });
    });
  });

  describe('notas', () => {
    const nota = (uid: string | undefined, id: string) => doc(db(uid), 'notas', id);
    const dados = (id: string, extra: object = {}) => ({ alunoId: id, exercicios: { Supino: 'x' }, ...agora(), ...extra });

    it('get direto, list, query e collectionGroup das notas de B', async () => {
      const c = db('ana');
      await negar(getDoc(nota('ana', 'bia')));
      await negar(getDocs(collection(c, 'notas')));
      await negar(getDocs(query(collection(c, 'notas'), where('alunoId', '==', 'bia'))));
      await negar(getDocs(collectionGroup(c, 'notas')));
    });

    it('escrever na nota de B (alunoId dele ou meu), apagar, e criar nota com id solto', async () => {
      await negar(setDoc(nota('ana', 'bia'), dados('bia'), { merge: true }));
      await negar(setDoc(nota('ana', 'bia'), dados('ana'), { merge: true }));
      await negar(updateDoc(nota('ana', 'bia'), { 'exercicios.Supino': 'Hack', ...agora() }));
      await negar(deleteDoc(nota('ana', 'bia')));
      await negar(setDoc(nota('ana', 'lixo'), dados('ana'))); // id diferente do uid
      await negar(setDoc(nota('ana', 'lixo'), dados('lixo')));
    });
  });
});

// ---------------------------------------------------------------------------------------------
describe('escalada de privilégio', () => {
  const ana = () => doc(db('ana'), 'usuarios', 'ana');
  const umAno = Timestamp.fromMillis(Date.now() + 365 * DIA);

  it('aluno muda o próprio papel, status, pagoAte ou e-mail (sozinho e junto com o nome)', async () => {
    await negar(updateDoc(ana(), { papel: 'coach' }));
    await negar(updateDoc(ana(), { papel: 'coach', nome: 'Ana' }));
    await negar(updateDoc(ana(), { status: 'arquivado', nome: 'Ana' }));
    await negar(updateDoc(ana(), { pagoAte: umAno }));
    await negar(updateDoc(ana(), { pagoAte: umAno, pesoKg: 70 }));
    await negar(updateDoc(ana(), { email: 'novo@x.com' }));
    await negar(updateDoc(ana(), { email: 'b@x.com' })); // e-mail de outro aluno
    await negar(updateDoc(ana(), { presencial: true }));
    await negar(updateDoc(ana(), { admin: true, mfaDispensado: true }));
    await negar(updateDoc(ana(), { migradoPara: 'bia' }));
  });

  it('bloqueado, vencido, aguardando e arquivado tentam se religar sozinhos', async () => {
    await negar(updateDoc(doc(db('blq'), 'usuarios', 'blq'), { status: 'ativo' }));
    await negar(updateDoc(doc(db('exp'), 'usuarios', 'exp'), { pagoAte: umAno }));
    await negar(updateDoc(doc(db('agu'), 'usuarios', 'agu'), { status: 'ativo', pagoAte: umAno }));
    await negar(updateDoc(doc(db('arq'), 'usuarios', 'arq'), { status: 'ativo' }));
    await negar(updateDoc(doc(db('sempago'), 'usuarios', 'sempago'), { pagoAte: umAno }));
  });

  it('apagar campos travados (deleteField) ou trocar o documento inteiro por um com papel de coach', async () => {
    await negar(updateDoc(ana(), { pagoAte: deleteField() }));
    await negar(updateDoc(ana(), { papel: deleteField() }));
    await negar(updateDoc(ana(), { status: deleteField() }));
    await negar(setDoc(ana(), { papel: 'coach', status: 'ativo', nome: 'Ana', email: 'a@x.com' })); // sem pagoAte e papel novo
    await negar(setDoc(ana(), { ...usuarios.ana, papel: 'coach' }));
    await negar(setDoc(ana(), { papel: 'coach' }, { merge: true }));
    await negar(setDoc(ana(), { status: 'ativo', pagoAte: umAno }, { merge: true }));
  });

  it('atualização dentro de lote ou junto de gravação legítima não carrega o campo travado', async () => {
    const c = db('ana');
    const b = writeBatch(c);
    b.update(doc(c, 'usuarios', 'ana'), { nome: 'Ana M' });
    b.update(doc(c, 'usuarios', 'ana'), { papel: 'coach' });
    await negar(b.commit());
  });

  describe('cadastro próprio como coach, ativo ou com pagoAte', () => {
    const novo = { papel: 'aluno', status: 'aguardando', nome: 'Novo', email: 'n@x.com', criadoEm: serverTimestamp() };
    const criar = (dados: object, id = 'novo') => setDoc(doc(dbEmail('novo', 'n@x.com'), 'usuarios', id), dados);

    it('papel coach, status ativo, pagoAte, tudo junto', async () => {
      await negar(criar({ ...novo, papel: 'coach' }));
      await negar(criar({ ...novo, status: 'ativo' }));
      await negar(criar({ ...novo, status: 'bloqueado' }));
      await negar(criar({ ...novo, pagoAte: futuro }));
      await negar(criar({ ...novo, papel: 'coach', status: 'ativo', pagoAte: futuro }));
      await negar(criar({ ...novo, papel: 'COACH' }));
      await negar(criar({ ...novo, papel: ['coach'] }));
      const { papel: _p, ...semPapel } = novo;
      await negar(criar(semPapel));
    });

    it('campos de poder escondidos: admin, presencial, migradoPara, pesoKg', async () => {
      await negar(criar({ ...novo, admin: true }));
      await negar(criar({ ...novo, presencial: true }));
      await negar(criar({ ...novo, migradoPara: 'ana' }));
      await negar(criar({ ...novo, pesoKg: 70 }));
    });

    it('e-mail de outra pessoa (do coach, de aluno) ou sem e-mail no login', async () => {
      await negar(criar({ ...novo, email: 'c@x.com' }));
      await negar(criar({ ...novo, email: 'a@x.com' }));
      await negar(setDoc(doc(db('novo'), 'usuarios', 'novo'), novo));
    });

    it('criar o perfil no id de outro (inclusive o do coach) ou apagar-e-recriar', async () => {
      await negar(criar(novo, 'coach'));
      await negar(criar(novo, 'ana'));
      await negar(criar({ ...novo, papel: 'coach', status: 'ativo' }, 'coach'));
      // ana não consegue apagar o perfil para recriá-lo "aguardando" e depois trocar de papel
      await negar(deleteDoc(ana()));
    });
  });

  describe('coach sem 2º fator usando poderes de coach', () => {
    const c = () => comoFirestore('coach', SEM_FATOR);

    it('lê alunos, mesos, registros, notas, exclusões e logs', async () => {
      await negar(getDoc(doc(c(), 'usuarios', 'ana')));
      await negar(getDocs(collection(c(), 'usuarios')));
      await negar(getDoc(doc(c(), 'mesos', 'm_ana')));
      await negar(getDocs(collection(c(), 'mesos')));
      await negar(getDoc(doc(c(), 'registros', idReg('ana'))));
      await negar(getDocs(collection(c(), 'registros')));
      await negar(getDoc(doc(c(), 'notas', 'ana')));
      await negar(getDoc(doc(c(), 'exclusoes', 'bia')));
      await negar(getDocs(collection(c(), 'logs')));
    });

    it('escreve meso, registro, nota, exclusão e apaga log', async () => {
      await negar(setDoc(doc(c(), 'mesos', 'm_novo'), { alunoId: 'ana', nome: 'M', semanas: 1, frequencia: 1 }));
      await negar(updateDoc(doc(c(), 'mesos', 'm_ana'), { semanas: 1 }));
      await negar(deleteDoc(doc(c(), 'mesos', 'm_ana')));
      await negar(updateDoc(doc(c(), 'registros', idReg('ana')), { semana: 2 }));
      await negar(deleteDoc(doc(c(), 'registros', idReg('ana'))));
      await negar(setDoc(doc(c(), 'notas', 'ana'), { alunoId: 'ana', exercicios: {} }));
      await negar(setDoc(doc(c(), 'exclusoes', 'ana'), { em: serverTimestamp() }));
      await negar(deleteDoc(doc(c(), 'logs', 'l_bia')));
    });

    it('mexe em outros usuários: libera aluno, cria aluno ativo, apaga', async () => {
      await negar(updateDoc(doc(c(), 'usuarios', 'agu'), { status: 'ativo', pagoAte: futuro }));
      await negar(setDoc(doc(c(), 'usuarios', 'x'), { papel: 'aluno', status: 'ativo', pagoAte: futuro, nome: 'X', email: '' }));
      await negar(deleteDoc(doc(c(), 'usuarios', 'ana')));
    });

    it('muda o próprio e-mail ou status (poder só do coach com 2º fator)', async () => {
      const eu = doc(comoFirestore('coach', { ...SEM_FATOR, email: 'novo@x.com' }), 'usuarios', 'coach');
      await negar(updateDoc(eu, { email: 'novo@x.com' }));
      await negar(updateDoc(eu, { status: 'ativo', pagoAte: futuro }));
    });

    it('PERMITIDO DE PROPÓSITO: lê o próprio perfil (o app precisa saber o papel e avisar do 2º fator)', () =>
      assertSucceeds(getDoc(doc(c(), 'usuarios', 'coach'))));
  });

  // Só a Admin SDK (servidor, com a chave de serviço) consegue criar claims num token: setCustomUserClaims.
  // O token é assinado pelo Google; o aluno não consegue acrescentar `mfaDispensado` nem
  // `sign_in_second_factor` ao dele. O emulador deixa o teste "forjar" porque ele faz o papel da
  // Admin SDK. Por isso o que se testa aqui é o que a regra faz COM o claim: ele nunca basta
  // sozinho, porque o papel de coach vem do documento usuarios/{uid}, não do token.
  describe('claims forjados (só a Admin SDK cria claims; aqui o teste simula)', () => {
    const FORJADOS = [
      { ...SEM_FATOR, mfaDispensado: true },
      { firebase: { sign_in_provider: 'password', sign_in_second_factor: 'totp' }, mfaDispensado: true },
      { papel: 'coach', admin: true, coach: true, role: 'coach', mfaDispensado: true },
    ];

    it('aluno com claims forjados continua aluno: nada de coach', async () => {
      for (const token of FORJADOS) {
        const c = comoFirestore('ana', token);
        await negar(getDoc(doc(c, 'usuarios', 'bia')));
        await negar(getDocs(collection(c, 'usuarios')));
        await negar(getDoc(doc(c, 'mesos', 'm_bia')));
        await negar(getDocs(collection(c, 'logs')));
        await negar(getDoc(doc(c, 'exclusoes', 'bia')));
        await negar(setDoc(doc(c, 'mesos', 'm_hack'), { alunoId: 'ana', nome: 'M' }));
        await negar(setDoc(doc(c, 'exclusoes', 'bia'), { em: serverTimestamp() }));
        await negar(updateDoc(doc(c, 'usuarios', 'ana'), { papel: 'coach' }));
        await negar(updateDoc(doc(c, 'usuarios', 'bia'), { status: 'bloqueado' }));
      }
    });

    it('claim com valor que não é o booleano true não vale nem para o coach', async () => {
      for (const mfaDispensado of ['true', 1, 'sim', null, {}, [true], false]) {
        const c = comoFirestore('coach', { ...SEM_FATOR, mfaDispensado });
        await negar(getDoc(doc(c, 'usuarios', 'ana')));
        await negar(setDoc(doc(c, 'mesos', 'm_novo'), { alunoId: 'ana', nome: 'M' }));
      }
    });

    it('claim no lugar errado (dentro de firebase, outro nome, maiúsculas) não vale', async () => {
      const lugares = [
        { firebase: { sign_in_provider: 'password', mfaDispensado: true } },
        { ...SEM_FATOR, mfa_dispensado: true },
        { ...SEM_FATOR, MfaDispensado: true },
        { firebase: { sign_in_provider: 'password', sign_in_second_factor: null } },
        { firebase: { sign_in_provider: 'password', second_factor_identifier: 'x' } },
      ];
      for (const token of lugares) await negar(getDoc(doc(comoFirestore('coach', token), 'usuarios', 'ana')));
    });

    it('PERMITIDO DE PROPÓSITO: coach com o claim true (seed do emulador, e2e/seed.ts) tem poder de coach', () =>
      assertSucceeds(getDoc(doc(comoFirestore('coach', { ...SEM_FATOR, mfaDispensado: true }), 'usuarios', 'ana'))));
  });
});

// ---------------------------------------------------------------------------------------------
describe('pagamento: aluno bloqueado, vencido, aguardando, arquivado, sem pagoAte ou com pagoAte corrompido', () => {
  const nota = (uid: string) => doc(db(uid), 'notas', uid);

  it('não lê o meso, os registros nem as notas (doc e consulta)', async () => {
    for (const uid of NAO_LIBERADOS) {
      const c = db(uid);
      await negar(getDoc(doc(c, 'mesos', `m_${uid}`)));
      await negar(getDocs(query(collection(c, 'mesos'), where('alunoId', '==', uid))));
      await negar(getDoc(reg(uid, idReg(uid))));
      await negar(getDocs(query(collection(c, 'registros'), where('alunoId', '==', uid))));
      await negar(getDoc(nota(uid)));
    }
  });

  it('não grava carga, não cria registro novo e não marca realizado', async () => {
    for (const uid of NAO_LIBERADOS) {
      await negar(updateDoc(reg(uid, idReg(uid)), { 'cargas.sup.s2': 50, ...agora() }));
      await negar(updateDoc(reg(uid, idReg(uid)), { realizado: true, realizadoEm: serverTimestamp(), ...agora() }));
      await negar(setDoc(reg(uid, idReg(uid)), { ...registro(uid), cargas: { sup: { s1: 1 } }, ...agora() }, { merge: true }));
      await negar(criarReg(uid, idReg(uid, 1, 2), registro(uid, 1, 2)));
      await negar(criarReg(uid, idReg(uid, 2, 1), registro(uid, 2, 1)));
    }
  });

  it('não grava anotações (notas), nem nova nem existente', async () => {
    for (const uid of NAO_LIBERADOS) {
      await negar(setDoc(nota(uid), { alunoId: uid, exercicios: { A: 'x' }, ...agora() }, { merge: true }));
      await negar(updateDoc(nota(uid), { 'exercicios.A': 'x', ...agora() }));
    }
  });

  it('PERMITIDO DE PROPÓSITO: lê o próprio perfil e troca o próprio nome (a tela "bloqueado" precisa disso)', async () => {
    for (const uid of NAO_LIBERADOS) {
      await assertSucceeds(getDoc(doc(db(uid), 'usuarios', uid)));
      await assertSucceeds(updateDoc(doc(db(uid), 'usuarios', uid), { nome: 'Novo Nome' }));
    }
  });

  it('o status muda no meio da sessão: depois de bloqueada, a mesma ana perde o acesso na hora', async () => {
    const c = db('ana');
    await assertSucceeds(getDoc(reg('ana', idReg('ana'))));
    await admin((a) => updateDoc(doc(a, 'usuarios', 'ana'), { status: 'bloqueado' }));
    await negar(getDoc(reg('ana', idReg('ana'))));
    await negar(updateDoc(doc(c, 'registros', idReg('ana')), { 'cargas.sup.s2': 1, ...agora() }));
  });

  it('o pagamento vence no meio da sessão: pagoAte no passado bloqueia leitura e gravação', async () => {
    await admin((a) => updateDoc(doc(a, 'usuarios', 'ana'), { pagoAte: passado }));
    await negar(getDoc(doc(db('ana'), 'mesos', 'm_ana')));
    await negar(updateDoc(reg('ana', idReg('ana')), { 'cargas.sup.s2': 1, ...agora() }));
  });
});

// ---------------------------------------------------------------------------------------------
describe('anônimo: sem login nada é lido nem escrito, em nenhuma coleção', () => {
  const COLECOES = ['usuarios', 'mesos', 'registros', 'notas', 'exclusoes', 'logs',
    // coleções que não existem: nada de "porta dos fundos" por padrão
    'config', 'admin', 'pagamentos', 'segredos', 'usuarios_backup', 'coach'];
  const existentes: Record<string, string> = {
    usuarios: 'ana', mesos: 'm_ana', registros: idReg('ana'), notas: 'ana', exclusoes: 'bia', logs: 'l_bia',
  };

  it('get, list, query e collectionGroup em todas as coleções', async () => {
    const c = db();
    for (const col of COLECOES) {
      await negar(getDoc(doc(c, col, existentes[col] ?? 'x')));
      await negar(getDocs(collection(c, col)));
      await negar(getDocs(query(collection(c, col), limit(1))));
      await negar(getDocs(collectionGroup(c, col)));
    }
    await negar(getDocs(query(collection(c, 'registros'), where('alunoId', '==', 'ana'))));
    await negar(getDocs(query(collection(c, 'mesos'), where('alunoId', '==', 'ana'))));
  });

  it('create, update, merge e delete em todas as coleções (existentes e inexistentes)', async () => {
    const c = db();
    for (const col of COLECOES) {
      const id = existentes[col] ?? 'x';
      await negar(setDoc(doc(c, col, 'novo-anonimo'), { a: 1 }));
      await negar(setDoc(doc(c, col, id), { a: 1 }, { merge: true }));
      await negar(updateDoc(doc(c, col, id), { a: 1 }));
      await negar(deleteDoc(doc(c, col, id)));
    }
  });

  it('com o formato exato que cada regra aceita de um logado: log, cadastro, registro, nota, exclusão', async () => {
    const c = db();
    await negar(setDoc(doc(c, 'logs', 'a'), {
      tipo: 'erro', mensagem: 'x', tela: '/', versao: '1', aparelho: 'x', online: true, uid: 'ana', em: serverTimestamp(),
    }));
    await negar(setDoc(doc(c, 'usuarios', 'novo'), { papel: 'aluno', status: 'aguardando', nome: 'N', email: 'n@x.com' }));
    await negar(setDoc(doc(c, 'registros', idReg('ana', 2, 1)), { ...registro('ana', 2, 1), ...agora() }));
    await negar(updateDoc(doc(c, 'registros', idReg('ana')), { 'cargas.sup.s2': 1, ...agora() }));
    await negar(setDoc(doc(c, 'notas', 'ana'), { alunoId: 'ana', exercicios: {}, ...agora() }));
    await negar(setDoc(doc(c, 'exclusoes', 'ana'), { em: serverTimestamp() }));
  });

  it('subcoleções de documentos que existem', async () => {
    const c = db();
    await negar(getDoc(doc(c, 'usuarios', 'ana', 'notas', 'n1')));
    await negar(setDoc(doc(c, 'usuarios', 'ana', 'notas', 'n1'), { a: 1 }));
    await negar(getDocs(collection(c, 'mesos', 'm_ana', 'semanas')));
  });

  // Login ANÔNIMO do Firebase (provider 'anonymous'): o app não usa. `signedIn()` nas regras não o
  // conta como logado (fechado em 03/10/2026), então mesmo com "Anônimo" ligado no console por engano
  // ele não grava nada, nem `logs`.
  describe('login anônimo do Firebase (provider anonymous)', () => {
    const anon = () => comoFirestore('anon1', { firebase: { sign_in_provider: 'anonymous' } });

    it('não cria log (anônimo não conta como logado)', () =>
      negar(setDoc(doc(anon(), 'logs', 'a1'), {
        tipo: 'erro', mensagem: 'x', tela: '/', versao: '1', aparelho: 'x', online: true, uid: 'anon1', em: serverTimestamp(),
      })));

    it('mas não lê nada, não se cadastra, não cria registro, nota nem exclusão', async () => {
      const c = anon();
      await negar(getDoc(doc(c, 'usuarios', 'ana')));
      // (ler o próprio uid, mesmo sem documento, é permitido e devolve vazio: não expõe dado de ninguém)
      await negar(getDocs(collection(c, 'logs')));
      await negar(getDocs(collection(c, 'mesos')));
      await negar(setDoc(doc(c, 'usuarios', 'anon1'), { papel: 'aluno', status: 'aguardando', nome: 'N', email: 'n@x.com' }));
      await negar(setDoc(doc(c, 'usuarios', 'anon1'), { papel: 'aluno', status: 'aguardando', nome: 'N', email: '' }));
      await negar(setDoc(doc(c, 'notas', 'anon1'), { alunoId: 'anon1', exercicios: {}, ...agora() }));
      await negar(setDoc(doc(c, 'exclusoes', 'ana'), { em: serverTimestamp() }));
      await negar(setDoc(doc(c, 'registros', 'm_ana_s02_t1'), { ...registro('ana', 2, 1), ...agora() }));
    });
  });
});

// ---------------------------------------------------------------------------------------------
describe('abuso', () => {
  describe('logs', () => {
    const log = (uid: string, id = 'l1') => doc(db(uid), 'logs', id);
    const valido = (uid: string, extra: object = {}) => ({
      tipo: 'erro', mensagem: 'falhou', tela: '/treino', versao: '1.0.0', aparelho: 'Mozilla/5.0',
      online: true, uid, em: serverTimestamp(), ...extra,
    });

    it('uid de outro aluno, do coach, vazio, nulo ou não texto (forjar autoria)', async () => {
      await negar(setDoc(log('ana'), valido('bia')));
      await negar(setDoc(log('ana'), valido('coach')));
      await negar(setDoc(log('ana'), valido('')));
      await negar(setDoc(log('ana'), valido(null as never)));
      await negar(setDoc(log('ana'), valido(123 as never)));
    });

    it('tipo inválido: desconhecido, vazio, maiúsculas, número, nulo, lista, mapa', async () => {
      for (const tipo of ['outro', '', 'ERRO', 'erro ', 1, null, ['erro'], { a: 'erro' }]) {
        await negar(setDoc(log('ana'), valido('ana', { tipo })));
      }
    });

    it('mensagem gigante (501, 100 mil e 900 mil caracteres) ou que não é texto', async () => {
      await negar(setDoc(log('ana'), valido('ana', { mensagem: 'x'.repeat(501) })));
      await negar(setDoc(log('ana'), valido('ana', { mensagem: 'x'.repeat(100_000) })));
      await negar(setDoc(log('ana'), valido('ana', { mensagem: 'x'.repeat(900_000) })));
      await negar(setDoc(log('ana'), valido('ana', { mensagem: { a: 'x' } })));
      await negar(setDoc(log('ana'), valido('ana', { mensagem: ['x'] })));
      await negar(setDoc(log('ana'), valido('ana', { mensagem: null })));
    });

    it('outros campos gigantes: tela, versao e aparelho', async () => {
      await negar(setDoc(log('ana'), valido('ana', { tela: 'x'.repeat(100_000) })));
      await negar(setDoc(log('ana'), valido('ana', { versao: 'x'.repeat(100_000) })));
      await negar(setDoc(log('ana'), valido('ana', { aparelho: 'x'.repeat(100_000) })));
    });

    it('campos extras: simples, mapa aninhado, lista, e campos que imitam os de outras coleções', async () => {
      await negar(setDoc(log('ana'), valido('ana', { extra: 1 })));
      await negar(setDoc(log('ana'), valido('ana', { extra: { a: { b: 'x'.repeat(10_000) } } })));
      await negar(setDoc(log('ana'), valido('ana', { lixo: Array.from({ length: 1000 }, (_, i) => i) })));
      await negar(setDoc(log('ana'), valido('ana', { papel: 'coach' })));
      await negar(setDoc(log('ana'), valido('ana', { alunoId: 'bia' })));
    });

    it('hora forjada em em, e hora do servidor trocada por texto ou número', async () => {
      await negar(setDoc(log('ana'), valido('ana', { em: passado })));
      await negar(setDoc(log('ana'), valido('ana', { em: futuro })));
      await negar(setDoc(log('ana'), valido('ana', { em: quaseAgora() })));
      await negar(setDoc(log('ana'), valido('ana', { em: 'agora' })));
      await negar(setDoc(log('ana'), valido('ana', { em: 0 })));
    });

    it('sobrescrever ou editar log que já existe (de outro ou o próprio)', async () => {
      await negar(setDoc(log('ana', 'l_bia'), valido('ana'))); // mesmo id de um log da bia
      await negar(setDoc(log('ana', 'l_bia'), valido('bia')));
      await setDoc(log('ana', 'meu'), valido('ana'));
      await negar(setDoc(log('ana', 'meu'), valido('ana', { mensagem: 'reescrito' })));
      await negar(updateDoc(log('ana', 'meu'), { mensagem: 'reescrito' }));
    });

    it('aluno lendo logs: get, list, query pelo próprio uid, collectionGroup, apagar', async () => {
      const c = db('ana');
      await negar(getDoc(log('ana', 'l_bia')));
      await negar(getDocs(collection(c, 'logs')));
      await negar(getDocs(query(collection(c, 'logs'), where('uid', '==', 'ana'))));
      await negar(getDocs(query(collection(c, 'logs'), where('uid', '==', 'bia'))));
      await negar(getDocs(collectionGroup(c, 'logs')));
      await negar(deleteDoc(log('ana', 'l_bia')));
      await setDoc(log('ana', 'meu'), valido('ana'));
      await negar(getDoc(log('ana', 'meu'))); // nem o próprio log
      await negar(deleteDoc(log('ana', 'meu')));
    });

    it('PERMITIDO DE PROPÓSITO: qualquer logado cria log válido, mesmo bloqueado (o app precisa avisar erros)', async () => {
      await assertSucceeds(setDoc(log('blq', 'ok1'), valido('blq')));
      await assertSucceeds(setDoc(log('agu', 'ok2'), valido('agu')));
    });
  });

  describe('exclusoes (pedido de apagar conta, LGPD)', () => {
    const ex = (uid: string, id: string) => doc(db(uid), 'exclusoes', id);

    it('aluno cria pedido de exclusão para si ou para outro (derrubaria a conta de B)', async () => {
      await negar(setDoc(ex('ana', 'ana'), { em: serverTimestamp() }));
      await negar(setDoc(ex('ana', 'bia'), { em: serverTimestamp() }));
      await negar(setDoc(ex('ana', 'coach'), { em: serverTimestamp() })); // tentaria apagar o coach
      await negar(setDoc(ex('ana', 'ana'), { em: serverTimestamp() }, { merge: true }));
    });

    it('aluno lê, lista, edita e apaga pedidos', async () => {
      await negar(getDoc(ex('ana', 'bia')));
      await negar(getDoc(ex('ana', 'ana')));
      await negar(getDocs(collection(db('ana'), 'exclusoes')));
      await negar(getDocs(collectionGroup(db('ana'), 'exclusoes')));
      await negar(updateDoc(ex('ana', 'bia'), { em: serverTimestamp() }));
      await negar(deleteDoc(ex('ana', 'bia'))); // cancelaria o pedido da bia
    });

    it('aluno já em exclusão (o próprio pedido existe) continua sem poder apagá-lo', async () => {
      await admin((a) => setDoc(doc(a, 'exclusoes', 'ana'), { em: Timestamp.now() }));
      await negar(deleteDoc(ex('ana', 'ana')));
      await negar(getDoc(ex('ana', 'ana')));
    });
  });

  describe('notas com mais de 300 exercícios', () => {
    const mapa = (n: number) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`ex${i}`, 't']));
    const gravar = (n: number, uid = 'ana') =>
      setDoc(doc(db(uid), 'notas', uid), { alunoId: uid, exercicios: mapa(n), ...agora() }, { merge: true });

    it('301, 1000 e 5000 exercícios, em nota nova e existente', async () => {
      await negar(gravar(301));
      await negar(gravar(1000));
      await negar(gravar(5000));
      await admin((a) => deleteDoc(doc(a, 'notas', 'bia')));
      await negar(gravar(301, 'bia')); // nota nova
    });

    it('chegar a mais de 300 em duas gravações (merge acumula) não passa o teto', async () => {
      const r = doc(db('ana'), 'notas', 'ana');
      await assertSucceeds(setDoc(r, { alunoId: 'ana', exercicios: mapa(200), ...agora() }, { merge: true }));
      await negar(setDoc(r, { alunoId: 'ana', exercicios: Object.fromEntries(Array.from({ length: 200 }, (_, i) => [`outro${i}`, 't'])), ...agora() }, { merge: true }));
    });

    it('exercicios como lista, texto ou nulo (para escapar da contagem)', async () => {
      const r = doc(db('ana'), 'notas', 'ana');
      await negar(setDoc(r, { alunoId: 'ana', exercicios: Array.from({ length: 5000 }, () => 't'), ...agora() }, { merge: true }));
      await negar(setDoc(r, { alunoId: 'ana', exercicios: 'x'.repeat(100_000), ...agora() }, { merge: true }));
      await negar(setDoc(r, { alunoId: 'ana', exercicios: null, ...agora() }, { merge: true }));
    });
  });

  describe('registro com semana ou treino fora do meso (8 semanas, 3 treinos por semana)', () => {
    const tenta = (semana: number | string, treino: number | string) => {
      const s = typeof semana === 'number' && semana < 10 && semana >= 0 ? `0${semana}` : `${semana}`;
      return criarReg('ana', `m_ana_s${s}_t${treino}`, { ...registro('ana', 1, 1), semana, treino });
    };

    it('limite exato é aceito (sem isso os negados abaixo não provam nada)', async () => {
      await assertSucceeds(tenta(8, 3));
      await assertSucceeds(tenta(1, 1));
    });

    it('uma acima, zero, negativos e valores enormes', async () => {
      for (const [s, t] of [[9, 1], [1, 4], [0, 1], [1, 0], [-1, 1], [1, -1], [999, 1], [1, 999], [1_000_000_000, 1], [2 ** 53, 1]] as const) {
        await negar(tenta(s, t));
      }
    });

    it('não inteiros, texto, nulo, ausentes', async () => {
      await negar(tenta(1.5, 1));
      await negar(tenta('2', 1));
      await negar(tenta(2, '1'));
      await negar(criarReg('ana', 'm_ana_s02_t1', { ...registro('ana', 2, 1), semana: null }));
      const { semana: _s, ...semSemana } = registro('ana', 2, 1);
      await negar(criarReg('ana', 'm_ana_s02_t1', semSemana));
      const { treino: _t, ...semTreino } = registro('ana', 2, 1);
      await negar(criarReg('ana', 'm_ana_s02_t1', semTreino));
    });

    it('meso de outro, inexistente ou com o mesmo prefixo, para esticar os limites', async () => {
      await negar(criarReg('ana', idReg('bia', 2, 1), { ...registro('ana', 2, 1), mesoId: 'm_bia' }));
      await negar(criarReg('ana', 'm_nada_s02_t1', { ...registro('ana', 2, 1), mesoId: 'm_nada' }));
      await negar(criarReg('ana', 'm_ana_x_s02_t1', { ...registro('ana', 2, 1), mesoId: 'm_ana_x' }));
    });

    it('depois de criado, não dá para empurrar o registro para fora do meso por update', async () => {
      const r = reg('ana', idReg('ana'));
      await negar(updateDoc(r, { semana: 99 }));
      await negar(updateDoc(r, { treino: 99 }));
      await negar(setDoc(r, { semana: 99, treino: 99, ...agora() }, { merge: true }));
    });
  });

  describe('realizadoEm, inicioEm e atualizadoEm com data forjada', () => {
    const forjadas = (): unknown[] => [passado, futuro, Timestamp.now(), Timestamp.fromMillis(0), 'ontem', 1700000000000, true, {}];

    it('criação: realizadoEm, inicioEm e atualizadoEm forjados', async () => {
      for (const v of forjadas()) {
        await negar(criarReg('ana', idReg('ana', 2, 1), { ...registro('ana', 2, 1), realizadoEm: v }));
        await negar(criarReg('ana', idReg('ana', 2, 1), { ...registro('ana', 2, 1), inicioEm: v }));
        await negar(criarReg('ana', idReg('ana', 2, 1), { ...registro('ana', 2, 1), atualizadoEm: v }));
      }
    });

    it('atualização: realizadoEm, inicioEm e atualizadoEm forjados', async () => {
      const r = reg('ana', idReg('ana'));
      for (const v of forjadas()) {
        await negar(updateDoc(r, { realizado: true, realizadoEm: v, ...agora() }));
        await negar(updateDoc(r, { inicioEm: v, ...agora() }));
        await negar(updateDoc(r, { 'cargas.sup.s2': 1, atualizadoEm: v }));
        await negar(setDoc(r, { ...registro('ana'), realizadoEm: v, ...agora() }, { merge: true }));
      }
    });

    it('depois de gravados, não dá para reescrever a data (nem copiar a de outro registro)', async () => {
      await admin((a) => updateDoc(doc(a, 'registros', idReg('ana')), { realizadoEm: passado, inicioEm: passado }));
      const r = reg('ana', idReg('ana'));
      await negar(updateDoc(r, { realizadoEm: futuro, ...agora() }));
      await negar(updateDoc(r, { inicioEm: futuro, ...agora() }));
      await assertSucceeds(updateDoc(r, { inicioEm: deleteField(), ...agora() })); // "Cancelar treino" remove o início
      await negar(updateDoc(r, { realizadoEm: quaseAgora(), ...agora() }));
    });

    it('sem atualizadoEm (para gravar sem deixar rastro) em criação e atualização', async () => {
      await negar(setDoc(reg('ana', idReg('ana', 2, 1)), registro('ana', 2, 1)));
      await negar(updateDoc(reg('ana', idReg('ana')), { 'cargas.sup.s2': 1 }));
      await negar(updateDoc(reg('ana', idReg('ana')), { atualizadoEm: deleteField() }));
    });
  });

  describe('apagar o próprio registro (e o resto dos próprios dados)', () => {
    it('deleteDoc do registro, do meso, da nota, do perfil e de log', async () => {
      await negar(deleteDoc(reg('ana', idReg('ana'))));
      await negar(deleteDoc(doc(db('ana'), 'mesos', 'm_ana')));
      await negar(deleteDoc(doc(db('ana'), 'notas', 'ana')));
      await negar(deleteDoc(doc(db('ana'), 'usuarios', 'ana')));
    });

    it('em lote, e esvaziando o registro com deleteField (identidade) ou apagando só a gravação', async () => {
      const c = db('ana');
      const b = writeBatch(c);
      b.delete(doc(c, 'registros', idReg('ana')));
      await negar(b.commit());
      await negar(updateDoc(reg('ana', idReg('ana')), { alunoId: deleteField(), mesoId: deleteField(), semana: deleteField(), treino: deleteField() }));
    });

    it('bloqueado, vencido e arquivado também não apagam', async () => {
      for (const uid of NAO_LIBERADOS) await negar(deleteDoc(reg(uid, idReg(uid))));
    });
  });
});

// ---------------------------------------------------------------------------------------------
// ACHADO (documentado, regras NÃO alteradas): as regras validam o TIPO dos mapas (cargas, reps, pc
// precisam ser mapa), mas NÃO validam o tipo dos VALORES lá dentro. O aluno logado e em dia pode
// gravar texto, mapa aninhado ou lista no lugar de número, e valores grandes. O dano fica no
// PRÓPRIO registro/nota dele. O motor (src/engine) já descarta o que não é número (typeof ===
// 'number' em volume.ts, metricas.ts, sessao.ts, meta.ts). Estes testes documentam o comportamento
// atual: se um dia as regras passarem a validar, os `assertSucceeds` abaixo devem virar `negar`.
describe('conteúdo dos valores (ACHADO: o tipo dos valores NÃO é validado)', () => {
  const r = () => reg('ana', idReg('ana'));

  it('o próprio mapa continua obrigatório: cargas, reps e pc que não são mapa são negados', async () => {
    for (const campo of ['cargas', 'reps', 'pc']) {
      for (const v of ['texto', 5, true, null, [1, 2]]) {
        await negar(updateDoc(r(), { [campo]: v, ...agora() }));
        await negar(criarReg('ana', idReg('ana', 2, 1), { ...registro('ana', 2, 1), [campo]: v }));
      }
    }
    await negar(updateDoc(r(), { realizado: null, ...agora() }));
    await negar(updateDoc(r(), { realizado: 'sim', ...agora() }));
  });

  it('ACHADO: texto no lugar do número em cargas, reps e pc (criação e atualização)', async () => {
    await assertSucceeds(updateDoc(r(), { 'cargas.sup.s2': 'abc', ...agora() }));
    await assertSucceeds(updateDoc(r(), { 'reps.sup.s1': 'muitas', ...agora() }));
    await assertSucceeds(updateDoc(r(), { 'pc.sup': 'setenta', ...agora() }));
    await assertSucceeds(criarReg('ana', idReg('ana', 2, 1), {
      ...registro('ana', 2, 1), cargas: { sup: { s1: 'x' } }, reps: { sup: 'y' }, pc: { sup: 'z' },
    }));
  });

  it('ACHADO: mapa e lista aninhados fundo, e valores negativos/enormes, dentro de cargas, reps e pc', async () => {
    await assertSucceeds(updateDoc(r(), { 'cargas.sup.s3': { a: { b: { c: [1, { d: 'x' }] } } }, ...agora() }));
    await assertSucceeds(updateDoc(r(), { 'reps.sup': ['a', 'b'], ...agora() }));
    await assertSucceeds(updateDoc(r(), { 'pc.sup': { x: 1 }, ...agora() }));
    await assertSucceeds(updateDoc(r(), { 'cargas.sup.s4': -1e308, 'cargas.sup.s5': NaN, ...agora() }));
  });

  it('ACHADO: valores grandes (100 mil caracteres) cabem; o teto é o do Firestore (1 MiB por documento), só no próprio registro', async () => {
    await assertSucceeds(updateDoc(r(), { 'cargas.sup.s6': 'x'.repeat(100_000), ...agora() }));
  });

  it('ACHADO: chaves de cargas arbitrárias (slot que não existe no meso) também são aceitas', () =>
    assertSucceeds(updateDoc(r(), { 'cargas.nao_existe.s99': 1, 'cargas.qualquer coisa.s1': 1, ...agora() })));

  it('PERMITIDO DE PROPÓSITO: o aluno apaga as próprias cargas (cargas: deleteField) ou limpa uma com null', async () => {
    await assertSucceeds(updateDoc(r(), { 'cargas.sup.s1': null, ...agora() }));
    await assertSucceeds(updateDoc(r(), { cargas: deleteField(), ...agora() }));
  });

  it('ACHADO: nota com valores que não são texto (número, mapa, lista) e sem limite de tamanho do texto', async () => {
    const n = doc(db('ana'), 'notas', 'ana');
    await assertSucceeds(setDoc(n, { alunoId: 'ana', exercicios: { A: 5, B: { c: { d: 1 } }, C: [1, 2], D: 'x'.repeat(100_000) }, ...agora() }, { merge: true }));
  });

  it('o alcance do dano continua só no próprio documento: o mesmo conteúdo no registro/nota de B é negado', async () => {
    await negar(updateDoc(reg('ana', idReg('bia')), { 'cargas.sup.s2': 'abc', ...agora() }));
    await negar(setDoc(doc(db('ana'), 'notas', 'bia'), { alunoId: 'bia', exercicios: { A: { b: 1 } }, ...agora() }, { merge: true }));
  });
});

// ---------------------------------------------------------------------------------------------
// Cardio do dia: cardios/{uid}_{AAAA-MM-DD} (dia de São Paulo). Só o próprio aluno, liberado, grava.
describe('cardios (marcar que fez cardio)', () => {
  const diaSP = (desloc = 0) => new Date(Date.now() - 3 * 3600_000 + desloc * DIA).toISOString().slice(0, 10);
  const HOJE = diaSP();
  const card = (uid: string | undefined, id = `ana_${HOJE}`) => doc(db(uid), 'cardios', id);
  const marca = (extra: object = {}, aluno = 'ana', dia = HOJE) => ({ alunoId: aluno, dia, em: serverTimestamp(), ...extra });
  const semear = (aluno: string, dia = HOJE) =>
    admin((a) => setDoc(doc(a, 'cardios', `${aluno}_${dia}`), { alunoId: aluno, dia, em: Timestamp.now(), min: 30 }));

  it('a marcação válida passa (sem isso os negados abaixo não provam nada)', () =>
    assertSucceeds(setDoc(card('ana'), marca({ tipo: 'corrida', min: 30 }))));

  it('anônimo e login anônimo do Firebase: get, list, query, criar e apagar', async () => {
    await semear('ana');
    const anon = comoFirestore('anon1', { firebase: { sign_in_provider: 'anonymous' } });
    for (const c of [db(), anon]) {
      await negar(getDoc(doc(c, 'cardios', `ana_${HOJE}`)));
      await negar(getDocs(collection(c, 'cardios')));
      await negar(getDocs(query(collection(c, 'cardios'), where('alunoId', '==', 'ana'))));
      await negar(getDocs(collectionGroup(c, 'cardios')));
      await negar(setDoc(doc(c, 'cardios', `ana_${HOJE}`), marca()));
      await negar(setDoc(doc(c, 'cardios', `anon1_${HOJE}`), marca({}, 'anon1')));
      await negar(deleteDoc(doc(c, 'cardios', `ana_${HOJE}`)));
    }
  });

  it('aluno bloqueado, vencido, aguardando, arquivado, sem pagoAte ou corrompido: nada, nem o próprio', async () => {
    for (const uid of NAO_LIBERADOS) {
      await semear(uid);
      await negar(getDoc(card(uid, `${uid}_${HOJE}`)));
      await negar(getDoc(card(uid, `${uid}_${diaSP(-1)}`)));
      await negar(getDocs(query(collection(db(uid), 'cardios'), where('alunoId', '==', uid))));
      await negar(setDoc(card(uid, `${uid}_${diaSP(-1)}`), marca({}, uid, diaSP(-1))));
      await negar(setDoc(card(uid, `${uid}_${HOJE}`), marca({ min: 99 }, uid)));
      await negar(deleteDoc(card(uid, `${uid}_${HOJE}`)));
    }
  });

  it('aluno A contra B: ler, listar, criar, trocar e apagar o cardio de B', async () => {
    await semear('bia');
    await negar(getDoc(card('ana', `bia_${HOJE}`)));
    await negar(getDoc(card('ana', `bia_${diaSP(-5)}`))); // doc que ainda não existe
    await negar(getDocs(query(collection(db('ana'), 'cardios'), where('alunoId', '==', 'bia'))));
    await negar(getDocs(collection(db('ana'), 'cardios'))); // sem filtro
    await negar(getDocs(query(collection(db('ana'), 'cardios'), limit(1))));
    await negar(getDocs(collectionGroup(db('ana'), 'cardios')));
    await negar(setDoc(card('ana', `bia_${HOJE}`), marca({}, 'bia')));
    await negar(setDoc(card('ana', `bia_${diaSP(-1)}`), marca({}, 'bia', diaSP(-1))));
    await negar(updateDoc(card('ana', `bia_${HOJE}`), { min: 1, em: serverTimestamp() }));
    await negar(deleteDoc(card('ana', `bia_${HOJE}`)));
  });

  it('id errado: alunoId de outro no próprio id, id de outro com alunoId próprio, id sem dia, dia trocado', async () => {
    await negar(setDoc(card('ana'), marca({}, 'bia')));
    await negar(setDoc(card('ana', `bia_${HOJE}`), marca()));
    await negar(setDoc(card('ana', 'ana'), marca()));
    await negar(setDoc(card('ana', `ana_${HOJE}_x`), marca()));
    await negar(setDoc(card('ana', `ana_${diaSP(-1)}`), marca())); // id de ontem, dia de hoje
    await negar(setDoc(card('ana', `anab_${HOJE}`), marca()));
    await negar(setDoc(card('ana', `ana${HOJE}`), marca()));
  });

  it('campo extra e campo obrigatório faltando', async () => {
    await negar(setDoc(card('ana'), marca({ extra: 1 })));
    await negar(setDoc(card('ana'), marca({ papel: 'coach' })));
    await negar(setDoc(card('ana'), marca({ km: 5 })));
    await negar(setDoc(card('ana'), { dia: HOJE, em: serverTimestamp() }));
    await negar(setDoc(card('ana'), { alunoId: 'ana', em: serverTimestamp() }));
    await negar(setDoc(card('ana'), { alunoId: 'ana', dia: HOJE }));
  });

  it('min: 0, 601, negativo, decimal, texto, nulo, enorme', async () => {
    for (const min of [0, 601, -5, 30.5, 1.0000001, '30', null, true, 1e9, [30], { m: 30 }]) {
      await negar(setDoc(card('ana'), marca({ min })));
    }
  });

  it('tipo fora da lista: outro texto, maiúsculas, com acento, vazio, número, nulo, lista', async () => {
    for (const tipo of ['natacao', 'Corrida', 'elíptico', 'corrida ', '', 1, null, ['corrida'], { t: 'corrida' }]) {
      await negar(setDoc(card('ana'), marca({ tipo })));
    }
  });

  it('em forjado: passado, futuro, quase agora, texto, número', async () => {
    for (const em of [passado, futuro, quaseAgora(), 'agora', 0]) {
      await negar(setDoc(card('ana'), marca({ em })));
    }
  });

  it('dia 2 dias ou mais no futuro e com 15 dias ou mais', async () => {
    for (const d of [2, 3, 365, -15, -30, -3650]) {
      await negar(setDoc(card('ana', `ana_${diaSP(d)}`), marca({}, 'ana', diaSP(d))));
    }
  });

  it('dia em formato inválido (o id acompanha o dia)', async () => {
    const [a, m, d] = HOJE.split('-');
    const ruins: unknown[] = [`${d}-${m}-${a}`, `${a}-${m}-0${d}`, `0${a}-${m}-${d}`, `${a}${m}${d}`, `${HOJE}T00:00`, ` ${HOJE}`,
      `${a}-13-01`, `${a}-${m}-32`, `${a}-02-30`, 'aaaa-mm-dd', ''];
    for (const dia of ruins) {
      await negar(setDoc(card('ana', `ana_${dia}`), marca({}, 'ana', dia as string)));
    }
    await negar(setDoc(card('ana'), marca({}, 'ana', 20261013 as never)));
    await negar(setDoc(card('ana'), marca({}, 'ana', null as never)));
  });

  it('PERMITIDO DE PROPÓSITO: amanhã (relógio do aparelho adiantado na virada do dia)', () =>
    assertSucceeds(setDoc(card('ana', `ana_${diaSP(1)}`), marca({}, 'ana', diaSP(1)))));

  it('coach sem 2º fator: não lê, não lista e não apaga', async () => {
    await semear('ana');
    const c = comoFirestore('coach', SEM_FATOR);
    await negar(getDoc(doc(c, 'cardios', `ana_${HOJE}`)));
    await negar(getDocs(collection(c, 'cardios')));
    await negar(getDocs(query(collection(c, 'cardios'), where('alunoId', '==', 'ana'))));
    await negar(deleteDoc(doc(c, 'cardios', `ana_${HOJE}`)));
  });

  it('coach com 2º fator não cria nem altera (nem para si, nem por aluno)', async () => {
    await semear('ana');
    await negar(setDoc(card('coach'), marca()));
    await negar(setDoc(card('coach', `bia_${HOJE}`), marca({}, 'bia')));
    await negar(setDoc(card('coach', `coach_${HOJE}`), marca({}, 'coach')));
    await negar(updateDoc(card('coach'), { min: 600, em: serverTimestamp() }));
    await negar(setDoc(card('coach'), marca({ min: 10 }), { merge: true }));
  });

  it('PERMITIDO DE PROPÓSITO: coach com 2º fator lê e apaga (painel e "Apagar de vez")', async () => {
    await semear('ana');
    await assertSucceeds(getDocs(collection(db('coach'), 'cardios')));
    await assertSucceeds(deleteDoc(card('coach')));
  });
});
