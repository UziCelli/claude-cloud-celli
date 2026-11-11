// Senha nova (cadastro e redefinição): mínimo 8 caracteres, com letra e número. Vale para as duas marcas.
// O servidor (Identity Platform) também exige 8 + número: ver ACAO=senha-minima em tools/mfa.mjs.
// Senhas antigas mais curtas continuam entrando; o app pede a troca uma vez (SenhaSegura.tsx).
export const SENHA_MIN = 8
export const REGRA_SENHA = `Mínimo ${SENHA_MIN} caracteres, com letra e número.`

// Lista ao vivo debaixo do campo (RequisitosSenha.tsx). Mesma regra de problemaSenha.
export const requisitosSenha = (s: string) => [
  { texto: `${SENHA_MIN} caracteres ou mais`, ok: s.length >= SENHA_MIN },
  { texto: 'Uma letra', ok: /\p{L}/u.test(s) },
  { texto: 'Um número', ok: /\d/.test(s) },
]

export function problemaSenha(s: string): string {
  if (s.length < SENHA_MIN) return `A senha precisa ter pelo menos ${SENHA_MIN} caracteres.`
  if (!/\p{L}/u.test(s)) return 'A senha precisa ter pelo menos uma letra.'
  if (!/\d/.test(s)) return 'A senha precisa ter pelo menos um número.'
  return ''
}

// O que o app sabe da senha desta conta NESTE aparelho: conferida no login/cadastro/troca ('ok') ou fraca ('fraca').
// Guarda só o uid e o resultado, nunca a senha. Fraca fica até trocar (fechar o app não pula a troca).
const CHAVE = 'forca-senha'
export type EstadoSenha = 'ok' | 'fraca'

export function lembrarSenha(uid: string, estado: EstadoSenha) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ uid, estado }))
  } catch {
    // sem armazenamento: o app volta a conferir pela versão do aceite
  }
  globalThis.dispatchEvent?.(new Event(EVENTO_SENHA)) // App.tsx re-renderiza na hora
}
export const EVENTO_SENHA = CHAVE

export function estadoSenha(uid: string): EstadoSenha | null {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE) ?? 'null') as { uid?: unknown; estado?: unknown } | null
    return v?.uid === uid && (v.estado === 'ok' || v.estado === 'fraca') ? v.estado : null
  } catch {
    return null
  }
}
