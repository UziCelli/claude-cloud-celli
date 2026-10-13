import { b64u, deb64u, juntar } from './b64'
import type { Inscricao } from './validar'

const te = new TextEncoder()
const ASSUNTO = 'mailto:victorcelli3@gmail.com'

export type ParVapid = { publicKey: string; privateJwk: JsonWebKey }

// Par de chaves VAPID (ECDSA P-256). publicKey = ponto não comprimido em base64url.
export async function gerarParVapid(): Promise<ParVapid> {
  const par = (await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify'])) as CryptoKeyPair
  const pub = new Uint8Array((await crypto.subtle.exportKey('raw', par.publicKey)) as ArrayBuffer)
  return { publicKey: b64u(pub), privateJwk: (await crypto.subtle.exportKey('jwk', par.privateKey)) as JsonWebKey }
}

// JWT ES256 do VAPID (RFC 8292). `agora` em segundos; vale 12 h.
export async function jwtVapid(privateJwk: JsonWebKey, endpoint: string, agora: number): Promise<string> {
  const chave = await crypto.subtle.importKey('jwk', privateJwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign'])
  const h = b64u(te.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })))
  const p = b64u(te.encode(JSON.stringify({ aud: new URL(endpoint).origin, exp: agora + 12 * 3600, sub: ASSUNTO })))
  // O WebCrypto já devolve a assinatura como r||s (64 bytes), que é o formato do JWS.
  const s = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, chave, te.encode(`${h}.${p}`))
  return `${h}.${p}.${b64u(new Uint8Array(s))}`
}

type Efemera = { privada: CryptoKey; publica: Uint8Array }

const hkdf = async (sal: Uint8Array, ikm: Uint8Array, info: Uint8Array, bytes: number) =>
  new Uint8Array(
    await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: sal, info }, await crypto.subtle.importKey('raw', ikm, 'HKDF', false, ['deriveBits']), bytes * 8),
  )

// Mensagem criptografada no formato aes128gcm (RFC 8291 + RFC 8188), um único registro.
// `opcoes` existe só para os testes (chave efêmera e sal fixos).
export async function criptografar(
  texto: Uint8Array,
  uaPublica: Uint8Array,
  segredoAuth: Uint8Array,
  opcoes: { efemera?: Efemera; salt?: Uint8Array } = {},
): Promise<Uint8Array> {
  let efemera = opcoes.efemera
  if (!efemera) {
    const par = (await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])) as CryptoKeyPair
    efemera = { privada: par.privateKey, publica: new Uint8Array((await crypto.subtle.exportKey('raw', par.publicKey)) as ArrayBuffer) }
  }
  const salt = opcoes.salt ?? crypto.getRandomValues(new Uint8Array(16))
  const uaChave = await crypto.subtle.importKey('raw', uaPublica, { name: 'ECDH', namedCurve: 'P-256' }, false, [])
  const ecdh = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: uaChave } as unknown as SubtleCryptoDeriveKeyAlgorithm, efemera.privada, 256))
  const ikm = await hkdf(segredoAuth, ecdh, juntar(te.encode('WebPush: info\0'), uaPublica, efemera.publica), 32)
  const cek = await hkdf(salt, ikm, te.encode('Content-Encoding: aes128gcm\0'), 16)
  const nonce = await hkdf(salt, ikm, te.encode('Content-Encoding: nonce\0'), 12)
  // 0x02 marca o último (e único) registro.
  const cifrado = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']), juntar(texto, new Uint8Array([2])))
  const cab = new Uint8Array(4)
  new DataView(cab.buffer).setUint32(0, 4096)
  return juntar(salt, cab, new Uint8Array([efemera.publica.length]), efemera.publica, new Uint8Array(cifrado))
}

// Envia a notificação e devolve o status HTTP do serviço de push (201 = aceito; 404/410 = inscrição morta).
export async function enviarPush(
  inscricao: Inscricao,
  payload: { title: string; body: string; tag?: string; url?: string },
  vapid: ParVapid,
  agora: number,
  buscar: typeof fetch = fetch,
): Promise<number> {
  const corpo = await criptografar(te.encode(JSON.stringify(payload)), deb64u(inscricao.keys.p256dh), deb64u(inscricao.keys.auth))
  const jwt = await jwtVapid(vapid.privateJwk, inscricao.endpoint, agora)
  const r = await buscar(inscricao.endpoint, {
    method: 'POST',
    headers: {
      Authorization: `vapid t=${jwt}, k=${vapid.publicKey}`,
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      TTL: '60',
      Urgency: 'high',
    },
    body: corpo,
    redirect: 'manual',
    signal: AbortSignal.timeout(10_000),
  })
  return r.status
}
