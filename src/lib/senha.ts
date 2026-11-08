// Senha nova (cadastro e redefinição): mínimo 8 caracteres, com letra e número. Vale para as duas marcas.
// O servidor (Identity Platform) também exige 8 + número: ver ACAO=senha-minima em tools/mfa.mjs.
// Senhas antigas mais curtas continuam entrando; a regra só vale ao criar ou trocar a senha.
export const SENHA_MIN = 8
export const REGRA_SENHA = `Mínimo ${SENHA_MIN} caracteres, com letra e número.`

export function problemaSenha(s: string): string {
  if (s.length < SENHA_MIN) return `A senha precisa ter pelo menos ${SENHA_MIN} caracteres.`
  if (!/\p{L}/u.test(s)) return 'A senha precisa ter pelo menos uma letra.'
  if (!/\d/.test(s)) return 'A senha precisa ter pelo menos um número.'
  return ''
}
