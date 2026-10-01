// Tentativas de login no aparelho: 5 falhas seguidas, depois espera 30 s, 60, 120… (máx. 15 min).
const CHAVE = 'forca-login-falhas'
export const LIVRES = 5

// Segundos de espera depois de `falhas` falhas seguidas.
export const esperaSeg = (falhas: number) =>
  falhas < LIVRES ? 0 : Math.min(30 * 2 ** Math.min(falhas - LIVRES, 10), 900)

type Estado = { n: number; ate: number }
const ler = (): Estado => {
  try {
    const e = JSON.parse(localStorage.getItem(CHAVE) ?? '')
    return { n: Number(e.n) || 0, ate: Number(e.ate) || 0 }
  } catch {
    return { n: 0, ate: 0 }
  }
}
const gravar = (e: Estado) => {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(e))
  } catch {
    /* sem armazenamento */
  }
}

// Segundos que ainda faltam para poder tentar de novo.
export const restanteSeg = () => Math.max(0, Math.ceil((ler().ate - Date.now()) / 1000))
export const registrarFalha = () => {
  const n = ler().n + 1
  gravar({ n, ate: Date.now() + esperaSeg(n) * 1000 })
}
export const zerarFalhas = () => gravar({ n: 0, ate: 0 })
