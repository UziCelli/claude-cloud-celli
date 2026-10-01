import { describe, expect, it, vi } from 'vitest'
import { acessoComCache, lerPermissao, registrarAgendamento } from './acesso'

const AGORA = Date.parse('2026-10-01T12:00:00Z')
const perfil = (campos: Record<string, string>) => ({
  fields: Object.fromEntries(
    Object.entries(campos).map(([k, v]) => [k, k === 'pagoAte' ? { timestampValue: v } : { stringValue: v }]),
  ),
})
const resp = (corpo: unknown, status = 200) => Promise.resolve(Response.json(corpo, { status }))
const buscaCom = (corpo: unknown, status = 200) => vi.fn(() => resp(corpo, status)) as unknown as typeof fetch

describe('lerPermissao', () => {
  it('lê o perfil do aluno com o token dele', async () => {
    const buscar = buscaCom(perfil({ papel: 'aluno', status: 'ativo', pagoAte: '2026-10-10T00:00:00Z' }))
    expect(await lerPermissao('u1', 'tok', AGORA, buscar)).toBe(true)
    const [url, init] = (buscar as unknown as { mock: { calls: [string, RequestInit][] } }).mock.calls[0]
    expect(url).toBe('https://firestore.googleapis.com/v1/projects/forca--app/databases/(default)/documents/usuarios/u1')
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer tok')
  })
  it('aluno ativo e em dia: permitido', async () => {
    const b = buscaCom(perfil({ papel: 'aluno', status: 'ativo', pagoAte: '2026-10-02T00:00:00Z' }))
    expect(await lerPermissao('u', 't', AGORA, b)).toBe(true)
  })
  it('coach: permitido, mesmo sem status nem pagoAte', async () => {
    expect(await lerPermissao('u', 't', AGORA, buscaCom(perfil({ papel: 'coach' })))).toBe(true)
  })
  it('pagamento vencido: bloqueado', async () => {
    const b = buscaCom(perfil({ papel: 'aluno', status: 'ativo', pagoAte: '2026-09-30T00:00:00Z' }))
    expect(await lerPermissao('u', 't', AGORA, b)).toBe(false)
  })
  it('aluno inativo, sem pagoAte ou aguardando: bloqueado', async () => {
    const casos: Record<string, string>[] = [
      { papel: 'aluno', status: 'inativo', pagoAte: '2026-12-01T00:00:00Z' },
      { papel: 'aluno', status: 'aguardando' },
      { papel: 'aluno', status: 'ativo' },
      { papel: 'aluno', status: 'ativo', pagoAte: 'lixo' },
    ]
    for (const c of casos) expect(await lerPermissao('u', 't', AGORA, buscaCom(perfil(c)))).toBe(false)
  })
  it('perfil inexistente ou negado pelas regras: bloqueado', async () => {
    expect(await lerPermissao('u', 't', AGORA, buscaCom({ error: {} }, 404))).toBe(false)
    expect(await lerPermissao('u', 't', AGORA, buscaCom({ error: {} }, 403))).toBe(false)
  })
  it('falha de rede ou erro do Firestore: null (não agenda)', async () => {
    const cai = (() => Promise.reject(new TypeError('rede'))) as unknown as typeof fetch
    expect(await lerPermissao('u', 't', AGORA, cai)).toBeNull()
    expect(await lerPermissao('u', 't', AGORA, buscaCom({}, 503))).toBeNull()
    expect(await lerPermissao('u', 't', AGORA, buscaCom({}, 429))).toBeNull()
  })
  it('uid com caracteres estranhos não muda o caminho', async () => {
    const buscar = buscaCom(perfil({ papel: 'coach' }))
    await lerPermissao('a/../b?x', 't', AGORA, buscar)
    expect((buscar as unknown as { mock: { calls: string[][] } }).mock.calls[0][0]).toMatch(/usuarios\/a%2F\.\.%2Fb%3Fx$/)
  })
})

describe('acessoComCache', () => {
  it('guarda a decisão por 10 min e não lê de novo', async () => {
    const ler = vi.fn(async () => true as boolean | null)
    const a = await acessoComCache(undefined, AGORA, ler)
    expect(a.ok).toBe(true)
    const b = await acessoComCache(a.cache, AGORA + 9 * 60_000, ler)
    expect(b.ok).toBe(true)
    expect(ler).toHaveBeenCalledTimes(1)
    await acessoComCache(b.cache, AGORA + 10 * 60_000 + 1, ler)
    expect(ler).toHaveBeenCalledTimes(2)
  })
  it('também guarda o bloqueio', async () => {
    const ler = vi.fn(async () => false as boolean | null)
    const a = await acessoComCache(undefined, AGORA, ler)
    await acessoComCache(a.cache, AGORA + 1000, ler)
    expect(a.ok).toBe(false)
    expect(ler).toHaveBeenCalledTimes(1)
  })
  it('falha de leitura (null) não vai para o cache', async () => {
    const ler = vi.fn(async () => null as boolean | null)
    const a = await acessoComCache(undefined, AGORA, ler)
    expect(a).toEqual({ ok: null, cache: undefined })
    await acessoComCache(a.cache, AGORA + 1000, ler)
    expect(ler).toHaveBeenCalledTimes(2)
  })
})

describe('registrarAgendamento (limite)', () => {
  it('aceita 30 por minuto e barra o 31º', () => {
    let marcas: number[] = []
    for (let i = 0; i < 30; i++) {
      const r = registrarAgendamento(marcas, AGORA + i)
      expect(r).not.toBeNull()
      marcas = r!
    }
    expect(registrarAgendamento(marcas, AGORA + 30)).toBeNull()
  })
  it('libera de novo quando as marcas saem da janela de 1 min', () => {
    const marcas = Array.from({ length: 30 }, () => AGORA)
    expect(registrarAgendamento(marcas, AGORA + 59_999)).toBeNull()
    expect(registrarAgendamento(marcas, AGORA + 60_000)).toHaveLength(1)
  })
})
