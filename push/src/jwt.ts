import { deb64u } from './b64'

export const PROJETOS = ['forca--app', 'gislane-personal-trainer'] as const
export type Projeto = (typeof PROJETOS)[number]
const URL_JWK = 'https://www.googleapis.com/service_accounts/v1/jwk/'
const URL_CHAVES = `${URL_JWK}securetoken@system.gserviceaccount.com`
const AUD_AVISOS = 'vfit-push-avisos'
const ISS_ROBO = /^[a-z0-9-]+@(forca--app|gislane-personal-trainer)\.iam\.gserviceaccount\.com$/
const td = new TextDecoder()
const te = new TextEncoder()

type ObterChave = (kid: string) => Promise<CryptoKey | null>
type Claims = Record<string, unknown>

// Confere formato, alg RS256 e assinatura. `obterChave` vê as claims (ainda não confiáveis) para escolher a chave.
// Devolve as claims; as checagens de aud/iss/exp ficam com quem chama. Nunca lança.
async function abrir(token: string, obterChave: (kid: string, c: Claims) => Promise<CryptoKey | null>): Promise<Claims | null> {
  try {
    const partes = token.split('.')
    if (partes.length !== 3) return null
    const [h, p, s] = partes
    const cab = JSON.parse(td.decode(deb64u(h)))
    if (cab.alg !== 'RS256' || typeof cab.kid !== 'string') return null
    const c = JSON.parse(td.decode(deb64u(p)))
    if (!c || typeof c !== 'object') return null
    const chave = await obterChave(cab.kid, c)
    if (!chave) return null
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', chave, deb64u(s), te.encode(`${h}.${p}`))
    return ok ? c : null
  } catch {
    return null
  }
}

// `agora` em segundos; iat até 60 s no futuro passa (relógios).
const agoraOk = (c: Claims, agora: number) => typeof c.exp === 'number' && c.exp > agora && typeof c.iat === 'number' && c.iat <= agora + 60

// Confere um ID token do Firebase (RS256) de um dos projetos. Devolve uid e projeto, ou null se qualquer checagem falhar.
export async function verificarIdToken(token: string, obterChave: ObterChave, agora: number): Promise<{ uid: string; projeto: Projeto } | null> {
  const c = await abrir(token, (kid) => obterChave(kid))
  if (!c) return null
  const projeto = PROJETOS.find((p) => p === c.aud)
  if (!projeto || c.iss !== `https://securetoken.google.com/${projeto}`) return null
  if (!agoraOk(c, agora)) return null
  if (typeof c.sub !== 'string' || c.sub === '') return null
  return { uid: c.sub, projeto }
}

// JWT do robô de avisos, assinado pela conta de serviço (iss = e-mail dela). Devolve o iss, ou null.
export async function verificarAviso(token: string, obterChave: (iss: string, kid: string) => Promise<CryptoKey | null>, agora: number): Promise<string | null> {
  const c = await abrir(token, (kid, c) => (typeof c.iss === 'string' && ISS_ROBO.test(c.iss) ? obterChave(c.iss, kid) : Promise.resolve(null)))
  if (!c || typeof c.iss !== 'string' || c.aud !== AUD_AVISOS) return null
  if (!agoraOk(c, agora) || (c.exp as number) > (c.iat as number) + 600) return null
  return c.iss
}

export const maxAgeDe = (cacheControl: string | null): number => {
  const m = /max-age=(\d+)/.exec(cacheControl ?? '')
  return m ? Number(m[1]) : 3600
}

// Chaves públicas do Google por endereço. Valem pelo Cache-Control, limitado a `maxMs`.
const caches = new Map<string, { em: number; ate: number; chaves: Map<string, CryptoKey> }>()

async function chaveDe(url: string, kid: string, maxMs: number, agoraMs: number, buscar: typeof fetch): Promise<CryptoKey | null> {
  let cache = caches.get(url)
  // Kid desconhecido recarrega (o Google troca as chaves), mas no máximo 1 vez por minuto.
  if (!cache || cache.ate <= agoraMs || (!cache.chaves.has(kid) && agoraMs - cache.em > 60_000)) {
    const r = await buscar(url)
    if (!r.ok) return cache?.chaves.get(kid) ?? null
    const { keys } = (await r.json()) as { keys: (JsonWebKey & { kid: string })[] }
    const chaves = new Map<string, CryptoKey>()
    for (const k of keys)
      chaves.set(k.kid, await crypto.subtle.importKey('jwk', k, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']))
    cache = { em: agoraMs, ate: agoraMs + Math.min(maxAgeDe(r.headers.get('Cache-Control')) * 1000, maxMs), chaves }
    if (caches.size >= 20) caches.clear() // iss vem de fora: não deixa o mapa crescer sem limite
    caches.set(url, cache)
  }
  return cache.chaves.get(kid) ?? null
}

export const chaveDoGoogle = (kid: string, agoraMs = Date.now(), buscar: typeof fetch = fetch) => chaveDe(URL_CHAVES, kid, Infinity, agoraMs, buscar)
// Chave da conta de serviço: cache curto (5 min) para uma chave revogada sair logo.
export const chaveDaConta = (iss: string, kid: string, agoraMs = Date.now(), buscar: typeof fetch = fetch) => chaveDe(`${URL_JWK}${iss}`, kid, 5 * 60_000, agoraMs, buscar)
