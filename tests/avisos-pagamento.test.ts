// Testa tools/avisos-pagamento.mjs: regra de datas (fuso de Brasília) e o JWT. Roda com `npm test`.
import { generateKeyPairSync, verify } from 'node:crypto'
import { describe, expect, it } from 'vitest'
// O módulo é .mjs sem tipos (roda também no workflow, sem TypeScript).
// @ts-expect-error sem declaração de tipos
import { assinarJwt, quaisAvisar } from '../tools/avisos-pagamento.mjs'

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
