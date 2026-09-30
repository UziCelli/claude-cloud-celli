export const b64u = (b: Uint8Array): string =>
  btoa(String.fromCharCode(...b))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

// Lança erro se o texto não for base64url.
export function deb64u(s: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]*$/.test(s)) throw new Error('base64url inválido')
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

export const juntar = (...partes: Uint8Array[]): Uint8Array => {
  const out = new Uint8Array(partes.reduce((n, p) => n + p.length, 0))
  let i = 0
  for (const p of partes) {
    out.set(p, i)
    i += p.length
  }
  return out
}
