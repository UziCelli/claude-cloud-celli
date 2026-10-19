import { useSyncExternalStore } from 'react'

// Roteador mínimo por hash (#/aluno/123). Funciona offline e no Firebase Hosting sem configuração.
const assinar = (cb: () => void) => {
  addEventListener('hashchange', cb)
  return () => removeEventListener('hashchange', cb)
}

export const useRota = () => useSyncExternalStore(assinar, () => location.hash.slice(1) || '/')

// Navegações dentro do app desde que abriu: sem elas (link direto) history.back() não leva a lugar nenhum.
let navegou = 0
addEventListener('hashchange', () => navegou++)

export const ir = (rota: string) => {
  location.hash = rota
}

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
export const voltar = (fallback: string) => (navegou > 0 ? history.back() : ir(fallback))
