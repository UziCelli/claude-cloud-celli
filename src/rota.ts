import { useSyncExternalStore } from 'react'

// Roteador mínimo por hash (#/aluno/123). Funciona offline e no Firebase Hosting sem configuração.
const assinar = (cb: () => void) => {
  addEventListener('hashchange', cb)
  return () => removeEventListener('hashchange', cb)
}

export const useRota = () => useSyncExternalStore(assinar, () => location.hash.slice(1) || '/')

// Aviso de saída: com `aviso`, trocar de endereço pede confirmação; recusar volta ao endereço anterior.
// Listener registrado antes dos outros para rodar primeiro e barrar os demais (stopImmediatePropagation).
let aviso: string | null = null
let atual = location.hash
let anterior = '' // endereço da tela anterior (sem o #)
let trocando = false // trocarRota em curso: a tela trocada não vira a "anterior"

// Posição na pilha do app (0 = tela em que o app abriu), guardada no history.state: sobrevive a recarregar a página.
// Sem posição > 0, history.back() sairia do app (ou não faria nada no iPhone instalado).
const posicao = () => (history.state as { i?: number } | null)?.i
if (posicao() == null) history.replaceState({ ...history.state, i: 0 }, '')
let indice = posicao() ?? 0
export const protegerSaida = (msg: string | null) => {
  aviso = msg
}
addEventListener('hashchange', (e) => {
  if (aviso && location.hash !== atual) {
    if (!confirm(aviso)) {
      // Desfaz o passo (tela nova: posição vazia = 1 à frente; voltar/avançar: a posição de destino) sem reescrever entradas.
      history.go(indice - (posicao() ?? indice + 1))
      return e.stopImmediatePropagation()
    }
    aviso = null
  }
  if (posicao() == null) history.replaceState({ i: indice + 1 }, '') // tela nova; voltar/avançar já trazem a posição
  indice = posicao()!
  if (!trocando) anterior = atual.slice(1) || '/'
  atual = location.hash
})
addEventListener('beforeunload', (e) => {
  if (!aviso) return
  e.preventDefault()
  e.returnValue = ''
})

export const ir = (rota: string) => {
  location.hash = rota
}

// Troca a tela sem criar entrada nova na pilha (o "Voltar" pula a tela trocada).
export const trocarRota = (rota: string) => {
  history.replaceState(history.state, '', '#' + rota)
  trocando = true
  dispatchEvent(new HashChangeEvent('hashchange'))
  trocando = false
}

// Tela de onde o usuário veio (sem o #); '' se o app abriu nesta tela.
export const rotaAnterior = () => anterior

export const posicaoNaPilha = () => indice
// Volta até a posição `alvo` da pilha (as telas do meio saem do caminho do Voltar); fora da pilha, vai para `fallback`.
export const voltarAte = (alvo: number, fallback: string) => (alvo >= 0 && alvo < indice ? history.go(alvo - indice) : ir(fallback))

// casar('/meso/:id/semana/:n', '/meso/abc/semana/2') → { id: 'abc', n: '2' }
export function casar(padrao: string, rota: string): Record<string, string> | null {
  const p = padrao.split('/')
  const r = rota.split('/')
  if (p.length !== r.length) return null
  const params: Record<string, string> = {}
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(r[i])
    else if (p[i] !== r[i]) return null
  }
  return params
}

// Volta uma tela; se o app abriu direto nesta tela, vai para `fallback`.
export const voltar = (fallback: string) => (indice > 0 ? history.back() : ir(fallback))
