import { describe, expect, it, vi } from 'vitest'
import { atenderIA, pedidoIA, MODELO_IA, type ArmazemIA, type EstadoIA } from './ia'

const CHAVE = 'sk-ant-' + 'a'.repeat(30)
const pedido = { model: 'outro-caro', max_tokens: 999999, stream: true, system: [{ type: 'text', text: 'Treinos' }], tools: [{ name: 'montar_treinos', input_schema: { type: 'object' } }], messages: [{ role: 'user', content: '3x12' }] }
function armazem(inicial?: EstadoIA) {
  let estado = inicial
  const arm: ArmazemIA = {
    get: async <T>() => structuredClone(estado) as T | undefined,
    put: async <T>(_k: string, v: T) => { estado = structuredClone(v) as EstadoIA },
  }
  return { arm, ler: () => estado }
}
const fetchMock = (fn: (...args: Parameters<typeof fetch>) => Promise<Response>) => vi.fn(fn) as typeof fetch & ReturnType<typeof vi.fn>

describe('IA no servidor', () => {
  it('força modelo, tokens e ferramenta; ignora streaming e opções extras', () => {
    const p = pedidoIA(pedido)!
    expect(p.model).toBe(MODELO_IA)
    expect(p.max_tokens).toBe(3000)
    expect(p.stream).toBeUndefined()
    expect(p.tool_choice).toEqual({ type: 'tool', name: 'montar_treinos' })
    expect(pedidoIA({ ...pedido, messages: [{ role: 'assistant', content: 'x' }] })).toBeNull()
    expect(pedidoIA({ ...pedido, messages: [{ role: 'user', content: 'x'.repeat(10001) }] })).toBeNull()
    expect(pedidoIA({ ...pedido, tools: [{ name: 'arbitraria', input_schema: {} }] })).toBeNull()
  })
  it('migra chave sem retorná-la e só apaga após persistir (com precondição de versão)', async () => {
    const { arm, ler } = armazem()
    const buscar = fetchMock(async (url, options) => {
      expect(String(url)).toContain('/projects/forca--app/')
      if (options?.method === 'DELETE') {
        expect(ler()?.chave).toBe(CHAVE)
        expect(String(url)).toContain('currentDocument.updateTime=')
        return new Response(null, { status: 204 })
      }
      expect((options?.headers as Record<string,string>)['X-Firebase-AppCheck']).toBe('appcheck')
      return Response.json({ fields: { chave: { stringValue: CHAVE } }, updateTime: '2026-11-12T00:00:00Z' })
    })
    const r = await atenderIA('/ia/status', {}, arm, 'forca--app', 'token', 'appcheck', buscar)
    expect(r).toEqual({ status: 200, corpo: { chave: 'sk-ant-…aaaa' } })
    expect(JSON.stringify(r)).not.toContain(CHAVE)
    expect(ler()?.legadoLimpo).toBe(true)
    expect(buscar).toHaveBeenCalledTimes(2)
  })
  it('falha ao apagar legado não perde chave nem declara migração pronta', async () => {
    const { arm, ler } = armazem()
    const buscar = fetchMock(async (_url, options) => options?.method === 'DELETE'
      ? new Response(null, { status: 403 })
      : Response.json({ fields: { chave: { stringValue: CHAVE } }, updateTime: '2026-11-12T00:00:00Z' }))
    expect((await atenderIA('/ia/status', {}, arm, 'forca--app', 't', undefined, buscar)).status).toBe(503)
    expect(ler()).toEqual({ chave: CHAVE, legadoLimpo: false })
  })
  it('salvar e apagar nunca retornam segredo e não ressuscitam legado removido', async () => {
    const { arm, ler } = armazem()
    const buscar = fetchMock(async () => new Response(null, { status: 404 }))
    const r = await atenderIA('/ia/salvar', { chave: CHAVE }, arm, 'gislane-personal-trainer', 't', undefined, buscar)
    expect(r.status).toBe(200)
    expect(JSON.stringify(r)).not.toContain(CHAVE)
    expect(ler()?.chave).toBe(CHAVE)
    expect(await atenderIA('/ia/apagar', {}, arm, 'gislane-personal-trainer', 't', undefined, buscar)).toEqual({ status: 200, corpo: { chave: null } })
    expect(ler()?.chave).toBeUndefined()
    await atenderIA('/ia/status', {}, arm, 'gislane-personal-trainer', 't', undefined, buscar)
    expect(buscar).toHaveBeenCalledTimes(1)
  })
  it('não chama provedor sem chave e limita chamadas persistidas entre instâncias', async () => {
    const { arm } = armazem({ legadoLimpo: true })
    const buscar = fetchMock(async () => Response.json({ content: [] }))
    expect((await atenderIA('/ia/montar', pedido, arm, 'forca--app', 't', undefined, buscar)).status).toBe(409)
    await arm.put('ia', { legadoLimpo: true, chave: CHAVE, chamadas: Array(5).fill(1000) })
    expect((await atenderIA('/ia/montar', pedido, arm, 'forca--app', 't', undefined, buscar, 1001)).status).toBe(429)
    await arm.put('ia', { legadoLimpo: true, chave: CHAVE, chamadas: Array(50).fill(1000) })
    expect((await atenderIA('/ia/montar', pedido, arm, 'forca--app', 't', undefined, buscar, 120000)).status).toBe(429)
    expect(buscar).not.toHaveBeenCalled()
  })
  it('só envia a chave para Anthropic e filtra metadados/erros da resposta', async () => {
    const { arm } = armazem({ legadoLimpo: true, chave: CHAVE })
    const buscar = fetchMock(async (url, options) => {
      expect(url).toBe('https://api.anthropic.com/v1/messages')
      expect((options?.headers as Record<string,string>)['x-api-key']).toBe(CHAVE)
      expect((options?.headers as Record<string,string>).Authorization).toBeUndefined()
      expect(JSON.parse(String(options?.body)).model).toBe(MODELO_IA)
      return Response.json({ id: 'privado', content: [{ type: 'text', text: 'nao-repassar' }, { type: 'tool_use', name: 'montar_treinos', input: { acoes: [] } }] })
    })
    const r = await atenderIA('/ia/montar', pedido, arm, 'forca--app', 'firebase-token', undefined, buscar, 0)
    expect(r).toEqual({ status: 200, corpo: { content: [{ type: 'tool_use', name: 'montar_treinos', input: { acoes: [] } }] } })
    const falha = fetchMock(async () => Response.json({ error: CHAVE }, { status: 401 }))
    const ruim = await atenderIA('/ia/montar', pedido, arm, 'forca--app', 't', undefined, falha, 1000)
    expect(ruim.status).toBe(502)
    expect(JSON.stringify(ruim)).not.toContain(CHAVE)
  })
})
