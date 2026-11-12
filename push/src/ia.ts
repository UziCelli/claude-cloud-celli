// A chave de IA só existe no servidor. Nenhuma resposta contém a chave completa.
import type { Projeto } from './jwt'
import { appCheckOk } from './acesso'

export const MODELO_IA = 'claude-haiku-5-5'
export const ROTAS_IA = ['/ia/status', '/ia/salvar', '/ia/apagar', '/ia/montar'] as const
export const MAX_CORPO_IA = 64 * 1024
export type AcaoIA = (typeof ROTAS_IA)[number]
export type ResultadoIA = { status: number; corpo: unknown }
export type EstadoIA = { chave?: string; legadoLimpo: boolean; chamadas?: number[] }
export interface ArmazemIA {
  get<T>(chave: string): Promise<T | undefined>
  put<T>(chave: string, valor: T): Promise<unknown>
}
const erro = (status: number, mensagem: string): ResultadoIA => ({ status, corpo: { erro: mensagem } })
export const chaveIAValida = (v: unknown): v is string => typeof v === 'string' && /^sk-ant-[A-Za-z0-9_-]{15,290}$/.test(v)
const metadados = (e: EstadoIA): ResultadoIA => ({ status: 200, corpo: { chave: e.chave ? `sk-ant-…${e.chave.slice(-4)}` : null } })
const obj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)

// O cliente não escolhe modelo, limite de saída, URL, cabeçalhos nem modo de streaming.
export function pedidoIA(v: unknown): Record<string, unknown> | null {
  if (!obj(v) || !Array.isArray(v.system) || v.system.length !== 1 || !Array.isArray(v.tools) || v.tools.length !== 1 || !Array.isArray(v.messages) || v.messages.length !== 1) return null
  const s = v.system[0], t = v.tools[0], m = v.messages[0]
  if (!obj(s) || s.type !== 'text' || typeof s.text !== 'string' || s.text.length > 50000) return null
  if (!obj(t) || t.name !== 'montar_treinos' || !obj(t.input_schema) || JSON.stringify(t).length > 16000) return null
  if (!obj(m) || m.role !== 'user' || typeof m.content !== 'string' || !m.content.trim() || m.content.length > 10000) return null
  return {
    model: MODELO_IA, max_tokens: 3000,
    system: [{ type: 'text', text: s.text, cache_control: { type: 'ephemeral' } }],
    tools: [{ name: 'montar_treinos', description: typeof t.description === 'string' ? t.description.slice(0, 500) : '', input_schema: t.input_schema }],
    tool_choice: { type: 'tool', name: 'montar_treinos' },
    messages: [{ role: 'user', content: m.content }],
  }
}

// Migra por leitura servidor-servidor usando a autorização do coach. Só apaga o legado depois
// de salvar no Durable Object; falhas impedem sucesso e permitem repetir sem perder a chave.
async function migrar(e: EstadoIA, arm: ArmazemIA, projeto: Projeto, token: string, appCheck: string | undefined, buscar: typeof fetch): Promise<EstadoIA | null> {
  if (e.legadoLimpo) return e
  const url = `https://firestore.googleapis.com/v1/projects/${projeto}/databases/(default)/documents/segredos/ia`
  const headers = { Authorization: `Bearer ${token}`, ...(appCheckOk(appCheck) ? { 'X-Firebase-AppCheck': appCheck! } : {}) }
  const r = await buscar(url, { headers, signal: AbortSignal.timeout(10000) })
  if (r.status !== 404 && !r.ok) return null
  if (r.ok) {
    const json: unknown = await r.json()
    const fields = obj(json) && obj(json.fields) ? json.fields : {}
    const chave = obj(fields.chave) ? fields.chave.stringValue : undefined
    if (chaveIAValida(chave)) {
      e = { ...e, chave }
      await arm.put('ia', e)
    }
    // Não elimina um documento inesperado: pode precisar de recuperação manual.
    if (!chaveIAValida(chave) || !obj(json) || typeof json.updateTime !== 'string') return null
    const apagarUrl = `${url}?currentDocument.updateTime=${encodeURIComponent(json.updateTime)}`
    const apagado = await buscar(apagarUrl, { method: 'DELETE', headers, signal: AbortSignal.timeout(10000) })
    if (!apagado.ok && apagado.status !== 404) return null
  }
  e = { ...e, legadoLimpo: true }
  await arm.put('ia', e)
  return e
}

// Chamado só após JWT+MFA e papel coach, serializado dentro de um DO por projeto.
export async function atenderIA(acao: AcaoIA, corpo: unknown, arm: ArmazemIA, projeto: Projeto, token: string, appCheck?: string, buscar: typeof fetch = fetch, agora = Date.now()): Promise<ResultadoIA> {
  try {
    if (acao === '/ia/salvar' && (!obj(corpo) || !chaveIAValida(corpo.chave))) return erro(400, 'Chave de IA inválida.')
    const pedido = acao === '/ia/montar' ? pedidoIA(corpo) : null
    if (acao === '/ia/montar' && !pedido) return erro(400, 'Pedido de treino inválido.')
    let e = await migrar((await arm.get<EstadoIA>('ia')) ?? { legadoLimpo: false }, arm, projeto, token, appCheck, buscar)
    if (!e) return erro(503, 'Não foi possível transferir a configuração de IA com segurança. Tente de novo.')
    if (acao === '/ia/salvar') {
      e = { ...e, chave: (corpo as { chave: string }).chave }
      await arm.put('ia', e)
      return metadados(e)
    }
    if (acao === '/ia/apagar') {
      e = { ...e, chave: undefined }
      await arm.put('ia', e)
      return metadados(e)
    }
    if (acao === '/ia/status') return metadados(e)
    if (!e.chave) return erro(409, 'Cadastre a chave da IA em Minha conta.')
    const chamadas = (e.chamadas ?? []).filter(t => agora - t < 86400000)
    if (chamadas.length >= 50 || chamadas.filter(t => agora - t < 60000).length >= 5) return erro(429, 'Limite de pedidos de IA atingido. Tente mais tarde.')
    await arm.put('ia', { ...e, chamadas: [...chamadas, agora] }) // conta antes da rede; persistente mesmo após reiniciar
    const r = await buscar('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal: AbortSignal.timeout(30000),
      headers: { 'content-type': 'application/json', 'x-api-key': e.chave, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(pedido),
    })
    // Nunca repassa erros brutos do provedor (podem conter informações da conta).
    if (!r.ok) return erro(r.status === 429 ? 429 : 502, r.status === 401 || r.status === 403 ? 'A IA recusou a chave. Cadastre uma chave nova em Minha conta.' : 'A IA não respondeu. Confira o crédito da conta ou tente mais tarde.')
    const resposta: unknown = await r.json()
    const content = obj(resposta) && Array.isArray(resposta.content) ? resposta.content : []
    return { status: 200, corpo: { content: content.filter(b => obj(b) && b.type === 'tool_use' && b.name === 'montar_treinos').map(b => ({ type: 'tool_use', name: 'montar_treinos', input: b.input })) } }
  } catch {
    return erro(503, 'Não foi possível acessar a IA com segurança. Tente de novo.')
  }
}
