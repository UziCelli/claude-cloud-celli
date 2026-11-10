// Testa tools/avisos-pagamento.mjs: regra de datas (fuso de Brasília) e o JWT. Roda com `npm test`.
import { generateKeyPairSync, verify } from 'node:crypto'
import { describe, expect, it } from 'vitest'
// O módulo é .mjs sem tipos (roda também no workflow, sem TypeScript).
// @ts-expect-error sem declaração de tipos
import { assinarJwt, proximoLembrete, quaisAvisar, quaisLembrar } from '../tools/avisos-pagamento.mjs'

// Brasília = UTC-3 (sem horário de verão desde 2019).
const brasilia = (dia: string, hora = '12:00') => Date.parse(`${dia}T${hora}:00-03:00`)
const aluno = (uid: string, pagoAte: unknown, extra: Record<string, unknown> = {}) => ({
  uid,
  papel: 'aluno',
  status: 'ativo',
  pagoAte,
  ...extra,
})

describe('quaisAvisar', () => {
  const agora = brasilia('2026-10-13')

  it('avisa vence-3d quando o vencimento é daqui a 3 dias', () => {
    expect(quaisAvisar([aluno('a', brasilia('2026-10-16'))], agora)).toEqual([{ uid: 'a', tipo: 'vence-3d' }])
  })

  it('avisa vence-hoje quando vence hoje', () => {
    expect(quaisAvisar([aluno('a', brasilia('2026-10-13', '23:59'))], agora)).toEqual([{ uid: 'a', tipo: 'vence-hoje' }])
  })

  it('não avisa com 2 dias de folga nem com 4', () => {
    expect(quaisAvisar([aluno('a', brasilia('2026-10-15')), aluno('b', brasilia('2026-10-17'))], agora)).toEqual([])
  })

  it('não avisa mensalidade já vencida', () => {
    expect(quaisAvisar([aluno('a', brasilia('2026-10-12'))], agora)).toEqual([])
  })

  it('ignora aluno inativo e coach, mesmo com vencimento na data', () => {
    const alunos = [
      aluno('inativo', brasilia('2026-10-16'), { status: 'bloqueado' }),
      aluno('coach', brasilia('2026-10-16'), { papel: 'coach' }),
    ]
    expect(quaisAvisar(alunos, agora)).toEqual([])
  })

  it('ignora aluno sem pagoAte', () => {
    expect(quaisAvisar([aluno('a', null)], agora)).toEqual([])
  })

  it('aceita pagoAte como Timestamp do Firestore', () => {
    const ts = { toMillis: () => brasilia('2026-10-13', '08:00') }
    expect(quaisAvisar([aluno('a', ts)], agora)).toEqual([{ uid: 'a', tipo: 'vence-hoje' }])
  })

  it('vira o dia no fuso de Brasília, não em UTC', () => {
    // 23:30 de 12/10 em Brasília = 02:30 de 13/10 em UTC. Com "hoje" = 13/10 em Brasília, o vencimento de 16/10 é vence-3d.
    const pertoDaMeia = brasilia('2026-10-13', '00:10')
    expect(quaisAvisar([aluno('a', brasilia('2026-10-16', '00:05'))], pertoDaMeia)).toEqual([{ uid: 'a', tipo: 'vence-3d' }])
    // 23:50 de 12/10 em Brasília ainda é 12/10: o vencimento de 15/10 é vence-3d; o de 16/10 não.
    const antes = brasilia('2026-10-12', '23:50')
    expect(quaisAvisar([aluno('a', brasilia('2026-10-15'))], antes)).toEqual([{ uid: 'a', tipo: 'vence-3d' }])
    expect(quaisAvisar([aluno('a', brasilia('2026-10-16'))], antes)).toEqual([])
  })
})

describe('assinarJwt', () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  })
  const sa = {
    private_key_id: 'kid-teste',
    private_key: privateKey,
    client_email: 'robo@forca--app.iam.gserviceaccount.com',
  }
  const agoraSeg = 1_800_000_000

  it('gera JWT RS256 com cabeçalho e campos certos', () => {
    const [h, p, s] = assinarJwt(sa, agoraSeg).split('.')
    expect(JSON.parse(Buffer.from(h, 'base64url').toString())).toEqual({ alg: 'RS256', typ: 'JWT', kid: 'kid-teste' })
    expect(JSON.parse(Buffer.from(p, 'base64url').toString())).toEqual({
      iss: 'robo@forca--app.iam.gserviceaccount.com',
      aud: 'vfit-push-avisos',
      iat: agoraSeg,
      exp: agoraSeg + 300,
    })
    expect(s.length).toBeGreaterThan(0)
  })

  it('assinatura confere com a chave pública e muda se o conteúdo mudar', () => {
    const token = assinarJwt(sa, agoraSeg)
    const [h, p, s] = token.split('.')
    const assinado = Buffer.from(`${h}.${p}`)
    expect(verify('RSA-SHA256', assinado, publicKey, Buffer.from(s, 'base64url'))).toBe(true)
    expect(verify('RSA-SHA256', Buffer.from(`${h}.${p}x`), publicKey, Buffer.from(s, 'base64url'))).toBe(false)
  })
})

describe('quaisLembrar (lembrete do treino do dia)', () => {
  // 13/10/2026 é uma terça-feira.
  const agora = brasilia('2026-10-13', '06:47')
  const emDia = brasilia('2026-10-30')
  const meso = (alunoId: string, inicio: string, semanas = 4) => ({ alunoId, inicio, semanas })
  it('lembra o aluno ativo, em dia, com meso em andamento e sem treino hoje', () => {
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-10-05')], [], agora)).toEqual([{ uid: 'a', tipo: 'treino-hoje' }])
  })
  it('não lembra no domingo', () => {
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-10-05')], [], brasilia('2026-10-18', '06:47'))).toEqual([])
  })
  it('lembra no sábado', () => {
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-10-05')], [], brasilia('2026-10-17', '06:47'))).toHaveLength(1)
  })
  it('não lembra quem já treinou hoje', () => {
    const feitoHoje = { alunoId: 'a', mesoId: 'x', semana: 2, realizado: true, realizadoEm: { toMillis: () => brasilia('2026-10-13', '05:30') } }
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-10-05')], [feitoHoje], agora)).toEqual([])
    // concluído ontem, desfeito ou sem hora: continua lembrando
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-10-05')], [{ ...feitoHoje, realizadoEm: brasilia('2026-10-12', '20:00') }], agora)).toHaveLength(1)
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-10-05')], [{ ...feitoHoje, realizado: false }], agora)).toHaveLength(1)
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-10-05')], [{ ...feitoHoje, realizadoEm: null }], agora)).toHaveLength(1)
  })
  it('não lembra sem meso, com meso que ainda não começou ou que já acabou', () => {
    expect(quaisLembrar([aluno('a', emDia)], [], [], agora)).toEqual([])
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-10-14')], [], agora)).toEqual([])
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-09-15', 4)], [], agora)).toEqual([]) // acabou em 12/10
    expect(quaisLembrar([aluno('a', emDia)], [meso('a', '2026-09-16', 4)], [], agora)).toHaveLength(1) // último dia
    expect(quaisLembrar([aluno('a', emDia)], [meso('b', '2026-10-05')], [], agora)).toEqual([])
  })
  it('não lembra coach, bloqueado, presencial, vencido nem meso com dados estranhos', () => {
    const m = [meso('a', '2026-10-05')]
    expect(quaisLembrar([aluno('a', emDia, { papel: 'coach' })], m, [], agora)).toEqual([])
    expect(quaisLembrar([aluno('a', emDia, { status: 'bloqueado' })], m, [], agora)).toEqual([])
    expect(quaisLembrar([aluno('a', emDia, { presencial: true })], m, [], agora)).toEqual([])
    expect(quaisLembrar([aluno('a', brasilia('2026-10-12'))], m, [], agora)).toEqual([])
    expect(quaisLembrar([aluno('a', emDia)], [{ alunoId: 'a', inicio: 'x', semanas: 4 }, { alunoId: 'a', inicio: '2026-10-05' }], [], agora)).toEqual([])
  })

  // Meso que começou na segunda 05/10: 13/10 (terça) é o 2º dia do bloco da semana 2.
  const m = (extra: Record<string, unknown>) => [{ id: 'm1', alunoId: 'a', inicio: '2026-10-05', semanas: 4, ...extra }]
  const feito = (semana: number, n: number) => Array.from({ length: n }, (_, i) => ({ alunoId: 'a', mesoId: 'm1', semana, treino: i + 1, realizado: true, realizadoEm: brasilia('2026-10-12', '19:00') }))
  const lembra = (mesos: unknown[], registros: unknown[] = [], quando = agora) => quaisLembrar([aluno('a', emDia)], mesos, registros, quando).length === 1

  it('com Dias de treino: só lembra nos dias marcados', () => {
    const segQuaSex = m({ frequencia: 3, dias: [1, 3, 5] })
    expect(lembra(segQuaSex)).toBe(false) // terça
    expect(lembra(segQuaSex, [], brasilia('2026-10-14', '06:47'))).toBe(true) // quarta
    expect(lembra(m({ frequencia: 3, dias: [2, 4, 6] }))).toBe(true) // terça marcada
  })
  it('com Dias de treino: não lembra quem já fez todos os treinos da semana (só contam os da semana atual do meso)', () => {
    const terQui = m({ frequencia: 2, dias: [2, 4] })
    expect(lembra(terQui, feito(2, 2), brasilia('2026-10-15', '06:47'))).toBe(false)
    expect(lembra(terQui, feito(1, 2), brasilia('2026-10-15', '06:47'))).toBe(true)
    expect(lembra(terQui, [{ ...feito(2, 2)[0], mesoId: 'outro' }, feito(2, 1)[0]], brasilia('2026-10-15', '06:47'))).toBe(true)
  })
  it('sem Dias de treino: segue o calendário automático (3x = dias 0, 2 e 4 do bloco)', () => {
    const auto = m({ frequencia: 3, dias: [] })
    expect(lembra(auto, [], brasilia('2026-10-12', '06:47'))).toBe(true) // dia 0: treino 1
    expect(lembra(auto, feito(2, 1))).toBe(false) // dia 1, em dia: descanso
    expect(lembra(auto)).toBe(true) // dia 1, atrasado: ainda deve o treino 1
    expect(lembra(auto, feito(2, 1), brasilia('2026-10-14', '06:47'))).toBe(true) // dia 2: treino 2
    expect(lembra(auto, feito(2, 3), brasilia('2026-10-16', '06:47'))).toBe(false) // semana completa
  })
  it('um meso que pede treino basta, mesmo com outro em descanso', () => {
    const dois = [...m({ frequencia: 3, dias: [1, 3, 5] }), { id: 'm2', alunoId: 'a', inicio: '2026-10-12', semanas: 4, frequencia: 1, dias: [2] }]
    expect(lembra(dois)).toBe(true)
  })
})

describe('proximoLembrete', () => {
  it('antes das 6h37: hoje às 6h47; depois: amanhã', () => {
    expect(proximoLembrete(brasilia('2026-10-13', '06:36'))).toBe(brasilia('2026-10-13', '06:47'))
    expect(proximoLembrete(brasilia('2026-10-12', '18:37'))).toBe(brasilia('2026-10-13', '06:47'))
    expect(proximoLembrete(brasilia('2026-10-13', '06:40'))).toBe(brasilia('2026-10-14', '06:47'))
    expect(proximoLembrete(brasilia('2026-10-13', '23:59'))).toBe(brasilia('2026-10-14', '06:47'))
  })
  it('agendado na véspera, o domingo continua sem lembrete e o vencido até lá fica de fora', () => {
    const sabadoNoite = brasilia('2026-10-17', '21:00')
    const m = [{ id: 'm', alunoId: 'a', inicio: '2026-10-05', semanas: 4 }]
    expect(quaisLembrar([aluno('a', brasilia('2026-10-30'))], m, [], proximoLembrete(sabadoNoite))).toEqual([])
    const segNoite = brasilia('2026-10-12', '21:00')
    expect(quaisLembrar([aluno('a', brasilia('2026-10-12', '23:59'))], m, [], proximoLembrete(segNoite))).toEqual([])
    expect(quaisLembrar([aluno('a', brasilia('2026-10-13', '23:59'))], m, [], proximoLembrete(segNoite))).toHaveLength(1)
  })
})
