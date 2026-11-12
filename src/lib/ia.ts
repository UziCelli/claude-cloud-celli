// O navegador envia a chave apenas ao cadastrá-la. Leituras devolvem somente o final mascarado;
// a chamada à Anthropic e a migração da chave antiga são feitas pelo Worker autenticado.
import { useEffect, useState } from 'react'
import { getToken } from 'firebase/app-check'
import { appCheck, auth } from './firebase'
import { corpoPedido, lerResposta, type Proposta } from './iaTreino'
import { cabecalhosPush, juntarUrl } from './push'

const BASE = import.meta.env.VITE_PUSH_URL as string | undefined
const ATUALIZOU = 'forca-ia-configuracao'
type MetadadosIA = { chave: string | null }
export const chaveValida = (c: string) => /^sk-ant-[A-Za-z0-9_-]{15,290}$/.test(c.trim())

async function chamar(caminho: string, corpo: unknown): Promise<unknown> {
  if (!BASE) throw new Error('O assistente de IA ainda não está disponível neste ambiente.')
  const token = await auth.currentUser?.getIdToken()
  if (!token) throw new Error('Entre novamente com a verificação em 2 etapas.')
  const ac = appCheck ? (await getToken(appCheck, false)).token : undefined
  let r: Response
  try {
    r = await fetch(juntarUrl(BASE, caminho), {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(45000),
      headers: cabecalhosPush(token, ac), body: JSON.stringify(corpo),
    })
  } catch { throw new Error('Sem conexão com a IA. Confira a internet e tente de novo.') }
  const resposta = await r.json().catch(() => null)
  if (!r.ok) throw new Error(typeof resposta?.erro === 'string' ? resposta.erro : 'O assistente de IA está indisponível. Tente mais tarde.')
  return resposta
}

export async function salvarChaveIA(chave: string) {
  await chamar('/ia/salvar', { chave: chave.trim() })
  window.dispatchEvent(new Event(ATUALIZOU))
}
export async function apagarChaveIA() {
  await chamar('/ia/apagar', {})
  window.dispatchEvent(new Event(ATUALIZOU))
}

export function useChaveIA() {
  const [dados, setDados] = useState<MetadadosIA | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [versao, setVersao] = useState(0)
  useEffect(() => {
    const atualizar = () => setVersao(v => v + 1)
    window.addEventListener(ATUALIZOU, atualizar)
    return () => window.removeEventListener(ATUALIZOU, atualizar)
  }, [])
  useEffect(() => {
    let vivo = true
    setCarregando(true)
    setErro('')
    chamar('/ia/status', {}).then(r => {
      if (!vivo) return
      const chave = (r as MetadadosIA | null)?.chave
      // Defesa adicional: mesmo um servidor antigo/errado nunca fornece chave bruta à UI.
      if (chave !== null && (typeof chave !== 'string' || !/^sk-ant-…[A-Za-z0-9_-]{4}$/.test(chave))) throw new Error('Resposta inválida do assistente de IA.')
      setDados({ chave })
    }).catch(e => { if (vivo) { setDados(null); setErro(e instanceof Error ? e.message : 'Não foi possível acessar a IA.') } })
      .finally(() => { if (vivo) setCarregando(false) })
    return () => { vivo = false }
  }, [versao])
  return { dados, carregando, erro }
}

export async function montarTreinosPorFala(fala: string, divisao: string[][], semanas?: number): Promise<Proposta> {
  return lerResposta(await chamar('/ia/montar', corpoPedido(fala, divisao, semanas)), divisao)
}
