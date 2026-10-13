import { beforeAll, describe, expect, it } from 'vitest'
import { b64u } from './b64'
import { chaveDaConta, maxAgeDe, verificarAviso, verificarIdToken } from './jwt'

const te = new TextEncoder()
const AGORA = 1_800_000_000 // segundos
const BASE = { aud: 'forca--app', iss: 'https://securetoken.google.com/forca--app', sub: 'aluno123', iat: AGORA - 60, exp: AGORA + 3000 }

let par: CryptoKeyPair
let outro: CryptoKeyPair
const gerar = () =>
  crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']) as Promise<CryptoKeyPair>

beforeAll(async () => {
  par = await gerar()
  outro = await gerar()
})

async function assinar(payload: object, opts: { chave?: CryptoKey; alg?: string; kid?: string } = {}) {
  const h = b64u(te.encode(JSON.stringify({ alg: opts.alg ?? 'RS256', kid: opts.kid ?? 'k1', typ: 'JWT' })))
  const p = b64u(te.encode(JSON.stringify(payload)))
  const s = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', opts.chave ?? par.privateKey, te.encode(`${h}.${p}`))
  return `${h}.${p}.${b64u(new Uint8Array(s))}`
}
const obter = async (kid: string) => (kid === 'k1' ? par.publicKey : null)
const ver = (t: string) => verificarIdToken(t, obter, AGORA)

describe('verificarIdToken', () => {
  it('aceita um token válido e devolve o uid e o projeto', async () => {
    expect(await ver(await assinar(BASE))).toEqual({ uid: 'aluno123', projeto: 'forca--app' })
  })
  it('aceita token do projeto da Gislane', async () => {
    const g = { ...BASE, aud: 'gislane-personal-trainer', iss: 'https://securetoken.google.com/gislane-personal-trainer' }
    expect(await ver(await assinar(g))).toEqual({ uid: 'aluno123', projeto: 'gislane-personal-trainer' })
  })
  it('rejeita projeto desconhecido, mesmo com aud e iss coerentes', async () => {
    const x = { ...BASE, aud: 'outro-projeto', iss: 'https://securetoken.google.com/outro-projeto' }
    expect(await ver(await assinar(x))).toBeNull()
  })
  it('rejeita aud de um projeto e iss de outro', async () => {
    expect(await ver(await assinar({ ...BASE, iss: 'https://securetoken.google.com/gislane-personal-trainer' }))).toBeNull()
  })
  it('rejeita audiência errada', async () => {
    expect(await ver(await assinar({ ...BASE, aud: 'outro-projeto' }))).toBeNull()
  })
  it('rejeita emissor errado', async () => {
    expect(await ver(await assinar({ ...BASE, iss: 'https://securetoken.google.com/outro' }))).toBeNull()
  })
  it('rejeita token expirado', async () => {
    expect(await ver(await assinar({ ...BASE, exp: AGORA - 1 }))).toBeNull()
  })
  it('rejeita token emitido no futuro', async () => {
    expect(await ver(await assinar({ ...BASE, iat: AGORA + 3600 }))).toBeNull()
  })
  it('rejeita sub vazio ou ausente', async () => {
    expect(await ver(await assinar({ ...BASE, sub: '' }))).toBeNull()
    const { sub: _, ...semSub } = BASE
    expect(await ver(await assinar(semSub))).toBeNull()
  })
  it('rejeita assinatura de outra chave', async () => {
    expect(await ver(await assinar(BASE, { chave: outro.privateKey }))).toBeNull()
  })
  it('rejeita payload adulterado', async () => {
    const [h, , s] = (await assinar(BASE)).split('.')
    const p = b64u(te.encode(JSON.stringify({ ...BASE, sub: 'outro-aluno' })))
    expect(await ver(`${h}.${p}.${s}`)).toBeNull()
  })
  it('rejeita alg diferente de RS256 (inclusive "none")', async () => {
    expect(await ver(await assinar(BASE, { alg: 'HS256' }))).toBeNull()
    const h = b64u(te.encode(JSON.stringify({ alg: 'none', kid: 'k1' })))
    expect(await ver(`${h}.${b64u(te.encode(JSON.stringify(BASE)))}.`)).toBeNull()
  })
  it('rejeita kid desconhecido', async () => {
    expect(await ver(await assinar(BASE, { kid: 'k2' }))).toBeNull()
  })
  it('rejeita lixo sem lançar erro', async () => {
    for (const t of ['', 'a.b', 'a.b.c', '...', 'não é jwt']) expect(await ver(t)).toBeNull()
  })
})

describe('maxAgeDe', () => {
  it('lê o max-age do Cache-Control', () => {
    expect(maxAgeDe('public, max-age=19500, must-revalidate, no-transform')).toBe(19500)
  })
  it('sem max-age, usa 1 hora', () => {
    expect(maxAgeDe(null)).toBe(3600)
    expect(maxAgeDe('no-store')).toBe(3600)
  })
})


// Aviso de pagamento: JWT assinado pela conta de serviço.
const ISS = 'robo@forca--app.iam.gserviceaccount.com'
const AVISO = { iss: ISS, aud: 'vfit-push-avisos', iat: AGORA - 10, exp: AGORA + 300 }
const obterRobo = async (iss: string, kid: string) => (iss === ISS && kid === 'k1' ? par.publicKey : null)
const verAviso = (t: string) => verificarAviso(t, obterRobo, AGORA)

describe('verificarAviso', () => {
  it('aceita JWT da conta de serviço de cada projeto', async () => {
    expect(await verAviso(await assinar(AVISO))).toBe(ISS)
    const iss = 'a1-b@gislane-personal-trainer.iam.gserviceaccount.com'
    const r = await verificarAviso(await assinar({ ...AVISO, iss }), async () => par.publicKey, AGORA)
    expect(r).toBe(iss)
  })
  it('rejeita iss fora do padrão (sem consultar chave)', async () => {
    const ruins = [
      'robo@outro.iam.gserviceaccount.com',
      'robo@forca--app.iam.gserviceaccount.com.evil.com',
      'x@forca--app.gserviceaccount.com',
      'Robo@forca--app.iam.gserviceaccount.com',
      'https://securetoken.google.com/forca--app',
      '@forca--app.iam.gserviceaccount.com',
    ]
    for (const iss of ruins) {
      let consultou = false
      const r = await verificarAviso(await assinar({ ...AVISO, iss }), async () => ((consultou = true), par.publicKey), AGORA)
      expect(r).toBeNull()
      expect(consultou).toBe(false)
    }
  })
  it('rejeita aud errado ou ausente', async () => {
    expect(await verAviso(await assinar({ ...AVISO, aud: 'forca--app' }))).toBeNull()
    expect(await verAviso(await assinar({ ...AVISO, aud: ['vfit-push-avisos'] }))).toBeNull()
    const { aud: _, ...semAud } = AVISO
    expect(await verAviso(await assinar(semAud))).toBeNull()
  })
  it('rejeita expirado, exp > iat + 600 e iat no futuro', async () => {
    expect(await verAviso(await assinar({ ...AVISO, exp: AGORA - 1 }))).toBeNull()
    expect(await verAviso(await assinar({ ...AVISO, exp: AGORA }))).toBeNull()
    expect(await verAviso(await assinar({ ...AVISO, iat: AGORA - 10, exp: AGORA - 10 + 601 }))).toBeNull()
    expect(await verAviso(await assinar({ ...AVISO, iat: AGORA + 61, exp: AGORA + 100 }))).toBeNull()
  })
  it('aceita exp = iat + 600 e iat até 60 s no futuro', async () => {
    expect(await verAviso(await assinar({ ...AVISO, iat: AGORA - 10, exp: AGORA + 590 }))).toBe(ISS)
    expect(await verAviso(await assinar({ ...AVISO, iat: AGORA + 60, exp: AGORA + 100 }))).toBe(ISS)
  })
  it('rejeita exp/iat que não são números', async () => {
    expect(await verAviso(await assinar({ ...AVISO, exp: String(AGORA + 100) }))).toBeNull()
    expect(await verAviso(await assinar({ ...AVISO, iat: undefined }))).toBeNull()
  })
  it('rejeita assinatura de outra chave, alg errado, kid desconhecido e lixo', async () => {
    expect(await verAviso(await assinar(AVISO, { chave: outro.privateKey }))).toBeNull()
    expect(await verAviso(await assinar(AVISO, { alg: 'HS256' }))).toBeNull()
    expect(await verAviso(await assinar(AVISO, { kid: 'k2' }))).toBeNull()
    for (const t of ['', 'a.b.c', '...']) expect(await verAviso(t)).toBeNull()
  })
})

describe('chaveDaConta', () => {
  it('busca a chave pública da conta pelo kid e guarda por pouco tempo', async () => {
    const jwk = { ...((await crypto.subtle.exportKey('jwk', par.publicKey)) as JsonWebKey), kid: 'k1' }
    let chamadas = 0
    let url = ''
    const buscar = (async (u: string) => {
      chamadas++
      url = u
      return Response.json({ keys: [jwk] }, { headers: { 'Cache-Control': 'max-age=19500' } })
    }) as unknown as typeof fetch
    const iss = 'cache@forca--app.iam.gserviceaccount.com'
    const t0 = 1_000_000
    expect(await chaveDaConta(iss, 'k1', t0, buscar)).not.toBeNull()
    expect(url).toBe(`https://www.googleapis.com/service_accounts/v1/jwk/${iss}`)
    await chaveDaConta(iss, 'k1', t0 + 60_000, buscar)
    expect(chamadas).toBe(1)
    await chaveDaConta(iss, 'k1', t0 + 5 * 60_000 + 1, buscar) // mesmo com max-age longo, vence em 5 min
    expect(chamadas).toBe(2)
  })
  it('falha do Google: null', async () => {
    const buscar = (async () => new Response('x', { status: 500 })) as unknown as typeof fetch
    expect(await chaveDaConta('falha@forca--app.iam.gserviceaccount.com', 'k1', 1, buscar)).toBeNull()
  })
})
