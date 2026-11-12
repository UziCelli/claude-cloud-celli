// Valores vindos do Firestore são dados não confiáveis, mesmo com tipos TypeScript.
export function textoNota(valor: unknown): string {
  return typeof valor === 'string' ? valor.slice(0, 300) : ''
}
