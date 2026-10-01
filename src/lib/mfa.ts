// Verificação em 2 etapas (TOTP): partes puras, sem Firebase (as chamadas ficam em acoes.ts).
import { renderSVG } from 'uqr'

export const limparCodigo = (s: string) => s.replace(/\D/g, '').slice(0, 6)
export const codigoCompleto = (s: string) => /^\d{6}$/.test(s)

// Chave para digitar à mão, de 4 em 4 letras.
export const chaveManual = (chave: string) => chave.replace(/(.{4})(?=.)/g, '$1 ')

export const qrDataUrl = (uri: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderSVG(uri))}`

const SEM_INTERNET = 'Sem internet. Verifique sua conexão e tente de novo.'
const msgs: Record<string, string> = {
  'auth/invalid-verification-code': 'Código incorreto. Confira o código atual no Google Authenticator.',
  'auth/code-expired': 'O código expirou. Digite o código novo que aparece no Google Authenticator.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
  'auth/network-request-failed': SEM_INTERNET,
  'auth/operation-not-allowed':
    "A verificação em 2 etapas ainda não foi ligada no Firebase. Peça para rodar o workflow '2 etapas do coach' (ativar-totp).",
  'auth/invalid-multi-factor-session': 'A sessão expirou. Entre de novo com e-mail e senha.',
  'auth/wrong-password': 'Senha incorreta',
  'auth/invalid-credential': 'Senha incorreta',
  'auth/unverified-email':
    'Antes de ativar, confirme seu e-mail: enviamos um link agora. Abra o e-mail, clique no link e toque em Ativar de novo.',
}
// Código desconhecido aparece na mensagem para dar para diagnosticar (não tem dado pessoal).
export const mensagemMfa = (code?: string) => (code && msgs[code]) || `Não deu certo (${code ?? 'erro desconhecido'}). Tente de novo.`
