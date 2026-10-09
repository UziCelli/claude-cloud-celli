const LADO = 192
const MAX = 60000 // caracteres da data URL

// Recorte quadrado central em 192x192, JPEG. Se passar de MAX, repete com qualidade menor.
// Lê por data URL (a CSP só libera `img-src data:`; blob: seria bloqueado). O <img> respeita a orientação EXIF.
export async function reduzirFoto(arquivo: File): Promise<string> {
  const origem = await new Promise<string>((ok, erro) => {
    const r = new FileReader()
    r.onload = () => ok(r.result as string)
    r.onerror = () => erro(new Error('Não deu para ler a foto'))
    r.readAsDataURL(arquivo)
  })
  const img = await new Promise<HTMLImageElement>((ok, erro) => {
    const i = new Image()
    i.onload = () => ok(i)
    i.onerror = () => erro(new Error('Foto inválida'))
    i.src = origem
  })
  const lado = Math.min(img.naturalWidth, img.naturalHeight)
  const c = document.createElement('canvas')
  c.width = c.height = LADO
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('Sem canvas')
  ctx.drawImage(img, (img.naturalWidth - lado) / 2, (img.naturalHeight - lado) / 2, lado, lado, 0, 0, LADO, LADO)
  let url = ''
  for (const q of [0.8, 0.65, 0.5, 0.35]) {
    url = c.toDataURL('image/jpeg', q)
    if (url.length <= MAX) break
  }
  return url
}
