import { deb64u } from './b64'

export const PROJETO = 'forca--app'
const URL_CHAVES = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
const td = new TextDecoder()
const te = new TextEncoder()

type ObterChave = (kid: string) => Promise<CryptoKey | null>

// Confere um ID token do Firebase (RS256). Devolve o uid, ou null se qualquer checagem falhar.
// `agora` em segundos. Nunca lança.
export async function verificarIdToken(token: string, obterChave: ObterChave, agora: number): Promise<string | null> {
  try {
    const partes = token.split('.')
    if (partes.length !== 3) return null
    const [h, p, s] = partes
    const cab = JSON.parse(td.decode(deb64u(h)))
    if (cab.alg !== 'RS256' || typeof cab.kid !== 'string') return null
    const chave = await obterChave(cab.kid)
    if (!chave) return null
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', chave, deb64u(s), te.encode(`${h}.${p}`))
    if (!ok) return null
    const c = JSON.parse(td.decode(deb64u(p)))
    if (c.aud !== PROJETO || c.iss !== `https://securetoken.google.com/${PROJETO}`) return null
    if (typeof c.exp !== 'number' || c.exp <= agora) return null
    if (typeof c.iat !== 'number' || c.iat > agora + 60) return null // 60 s de folga para relógios
    if (typeof c.sub !== 'string' || c.sub === '') return null
    return c.sub
  } catch {
    return null
  }
}

export const maxAgeDe = (cacheControl: string | null): number => {
  const m = /max-age=(\d+)/.exec(cacheControl ?? '')
  return m ? Number(m[1]) : 3600
}

// Chaves públicas do Google, guardadas pelo tempo que o Cache-Control manda.
let cache: { em: number; ate: number; chaves: Map<string, CryptoKey> } | null = null

export async function chaveDoGoogle(kid: string, agoraMs = Date.now(), buscar: typeof fetch = fetch): Promise<CryptoKey | null> {
  // Kid desconhecido recarrega (o Google troca as chaves), mas no máximo 1 vez por minuto.
  if (!cache || cache.ate <= agoraMs || (!cache.chaves.has(kid) && agoraMs - cache.em > 60_000)) {
    const r = await buscar(URL_CHAVES)
    if (!r.ok) return cache?.chaves.get(kid) ?? null
    const { keys } = (await r.json()) as { keys: (JsonWebKey & { kid: string })[] }
    const chaves = new Map<string, CryptoKey>()
    for (const k of keys)
      chaves.set(k.kid, await crypto.subtle.importKey('jwk', k, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']))
    cache = { em: agoraMs, ate:agoraMs + maxAgeDe(r.headers.get('Cache-Control')) * 1000, chaves }
  }
  return cache.chaves.get(kid) ?? null
}
