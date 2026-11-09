// Assistente de voz (IA): guarda a chave da Anthropic no Firestore (segredos/ia, só o coach lê — ver firestore.rules)
// e chama o Haiku direto do aparelho do coach. A chave nunca vai no código do app nem para o aluno.
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { corpoPedido, lerResposta, type Proposta } from './iaTreino'

const refChave = () => doc(db, 'segredos', 'ia')

export const chaveValida = (c: string) => /^sk-ant-[A-Za-z0-9_-]{15,290}$/.test(c.trim())
export const salvarChaveIA = (chave: string) => setDoc(refChave(), { chave: chave.trim(), atualizadoEm: serverTimestamp() })
export const apagarChaveIA = () => deleteDoc(refChave())
export const refChaveIA = refChave
// Mostra só o fim da chave (a chave inteira nunca volta para a tela).
export const chaveMascarada = (c: string) => `sk-ant-…${c.slice(-4)}`

const ERROS_HTTP: Record<number, string> = {
  400: 'A Anthropic recusou o pedido (pode ser falta de crédito na conta). Confira em console.anthropic.com.',
  401: 'A Anthropic recusou a chave. Cadastre uma chave nova em Minha conta.',
  403: 'A chave não tem permissão para isso. Cadastre uma chave nova em Minha conta.',
  429: 'Muitos pedidos seguidos. Espere um pouco e tente de novo.',
  529: 'A IA está sobrecarregada agora. Tente de novo em instantes.',
}

// Manda a fala (e a lista atual de exercícios de cada treino) ao Haiku e devolve as ações pedidas. Erros viram texto em português para a tela.
export async function montarTreinosPorFala(chave: string, fala: string, divisao: string[][]): Promise<Proposta> {
  let resp: Response
  try {
    resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: AbortSignal.timeout(30_000),
      headers: {
        'content-type': 'application/json',
        'x-api-key': chave,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify(corpoPedido(fala, divisao)),
    })
  } catch {
    throw new Error('Sem conexão com a IA. Confira a internet e tente de novo.')
  }
  if (!resp.ok) throw new Error(ERROS_HTTP[resp.status] ?? `A IA não respondeu (erro ${resp.status}).`)
  return lerResposta(await resp.json().catch(() => null), divisao)
}
