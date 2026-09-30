import { beforeAll, describe, expect, it } from 'vitest'
import { b64u } from './b64'
import { maxAgeDe, verificarIdToken } from './jwt'

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
  it('aceita um token válido e devolve o uid', async () => {
    expect(await ver(await assinar(BASE))).toBe('aluno123')
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
