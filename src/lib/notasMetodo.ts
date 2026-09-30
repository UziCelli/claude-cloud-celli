import type { Metodo } from '../engine'

const PREFIXO = 'forca-nota-'
const ANTIGA = 'forca-aviso-biset'
const SEQUENCIA: Metodo[] = ['Biset', 'Triset', 'Superset', 'Circuito']

export function notaDispensada(m: Metodo): boolean {
  try {
    return localStorage.getItem(PREFIXO + m) === '1' || (SEQUENCIA.includes(m) && localStorage.getItem(ANTIGA) === '1')
  } catch {
    return false
  }
}

export function dispensarNota(m: Metodo): void {
  try {
    localStorage.setItem(PREFIXO + m, '1')
  } catch {
    /* sem storage: a nota volta */
  }
}

export function mostrarNotasDeNovo(): void {
  try {
    Object.keys(localStorage).filter((k) => k.startsWith(PREFIXO) || k === ANTIGA).forEach((k) => localStorage.removeItem(k))
  } catch {
    /* sem storage: nada a apagar */
  }
}
