import { describe, expect, it } from 'vitest'
import { b64u, deb64u } from './b64'
import { criptografar, enviarPush, gerarParVapid, jwtVapid } from './webpush'

const te = new TextEncoder()

// Vetor de teste do RFC 8291, Apêndice A.
const RFC = {
  plaintext: 'When I grow up, I want to be a watermelon',
  asPrivate: 'yfWPiYE-n46HLnH0KqZOF1fJJU3MYrct3AELtAQ-oRw',
  asPublic: 'BP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6TlzAC8wEqKK6PBru3jl7A8',
  uaPublic: 'BCVxsr7N_eNgVRqvHtD0zTZsEc6-VV-JvLexhqUzORcxaOzi6-AYWXvTBHm4bjyPjs7Vd8pZGH6SRpkNtoIAiw4',
  auth: 'BTBZMqHH6r4Tts7J_aSIgg',
  salt: 'DGv6ra1nlYgDCS1FRnbzlw',
  corpo:
    'DGv6ra1nlYgDCS1FRnbzlwAAEABBBP4z9KsN6nGRTbVYI_c7VJSPQTBtkgcy27mlmlMoZIIgDll6e3vCYLocInmYWAmS6TlzAC8wEqKK6PBru3jl7A_yl95bQpu6cVPTpK4Mqgkf1CXztLVBSt2Ks3oZwbuwXPXLWyouBWLVWGNWQexSgSxsj_Qulcy4a-fN',
}

async function efemeraDoRfc() {
  const pub = deb64u(RFC.asPublic)
  const jwk = { kty: 'EC', crv: 'P-256', d: RFC.asPrivate, x: b64u(pub.slice(1, 33)), y: b64u(pub.slice(33, 65)) }
  const privada = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveBits'])
  return { privada, publica: pub }
}

describe('criptografar (aes128gcm, RFC 8291)', () => {
  it('bate com o vetor de teste do Apêndice A', async () => {
    const corpo = await criptografar(te.encode(RFC.plaintext), deb64u(RFC.uaPublic), deb64u(RFC.auth), { efemera: await efemeraDoRfc(), salt: deb64u(RFC.salt) })
    expect(b64u(corpo)).toBe(RFC.corpo)
  })
  it('sem parâmetros de teste, gera chave e sal novos a cada mensagem', async () => {
    const ua = (await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])) as CryptoKeyPair
    const uaPub = new Uint8Array((await crypto.subtle.exportKey('raw', ua.publicKey)) as ArrayBuffer)
    const a = await criptografar(te.encode('oi'), uaPub, new Uint8Array(16))
    const b = await criptografar(te.encode('oi'), uaPub, new Uint8Array(16))
    expect(b64u(a)).not.toBe(b64u(b))
    expect(a[20]).toBe(65) // idlen
  })
})

describe('VAPID (RFC 8292)', () => {
  it('monta um JWT ES256 verificável com a chave pública', async () => {
    const par = await gerarParVapid()
    expect(deb64u(par.publicKey)).toHaveLength(65)
    const agora = 1_800_000_000
    const jwt = await jwtVapid(par.privateJwk, 'https://fcm.googleapis.com/fcm/send/abc', agora)
    const [h, p, s] = jwt.split('.')
    expect(JSON.parse(new TextDecoder().decode(deb64u(h)))).toEqual({ typ: 'JWT', alg: 'ES256' })
    const pl = JSON.parse(new TextDecoder().decode(deb64u(p)))
    expect(pl.aud).toBe('https://fcm.googleapis.com') // só a origem
    expect(pl.sub).toBe('mailto:victorcelli3@gmail.com')
    expect(pl.exp).toBeGreaterThan(agora)
    expect(pl.exp).toBeLessThanOrEqual(agora + 12 * 3600)
    const pub = deb64u(par.publicKey)
    const chave = await crypto.subtle.importKey('raw', pub, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify'])
    const sig = deb64u(s)
    expect(sig).toHaveLength(64) // r||s cru, como o JWS pede
    expect(await crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, chave, sig, te.encode(`${h}.${p}`))).toBe(true)
  })
})

describe('enviarPush', () => {
  it('manda o POST com os cabeçalhos certos e devolve o status', async () => {
    const par = await gerarParVapid()
    const ua = (await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])) as CryptoKeyPair
    const uaPub = new Uint8Array((await crypto.subtle.exportKey('raw', ua.publicKey)) as ArrayBuffer)
    const inscricao = { endpoint: 'https://fcm.googleapis.com/fcm/send/abc', keys: { p256dh: b64u(uaPub), auth: b64u(new Uint8Array(16)) } }
    let visto: { url: string; init: RequestInit } | undefined
    const falso = (async (url: string, init: RequestInit) => {
      visto = { url, init }
      return new Response(null, { status: 201 })
    }) as unknown as typeof fetch
    const status = await enviarPush(inscricao, { title: 'Descanso acabou', body: 'Volte para o treino 💪' }, par, 1_800_000_000, falso)
    expect(status).toBe(201)
    expect(visto!.url).toBe(inscricao.endpoint)
    expect(visto!.init.method).toBe('POST')
    const h = visto!.init.headers as Record<string, string>
    expect(h['Content-Encoding']).toBe('aes128gcm')
    expect(h.TTL).toBe('60')
    expect(h.Urgency).toBe('high')
    expect(h.Authorization).toMatch(new RegExp(`^vapid t=[\\w-]+\\.[\\w-]+\\.[\\w-]+, k=${par.publicKey}$`))
  })
})
