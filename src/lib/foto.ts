// Corte "cover" centralizado: a maior área da origem (w×h) com a proporção do destino (W×H).
export function recorteCover(w: number, h: number, W: number, H: number) {
  const k = Math.min(w / W, h / H)
  const sw = W * k
  const sh = H * k
  return { sx: (w - sw) / 2, sy: (h - sh) / 2, sw, sh }
}

// Recorte central em largura×altura (padrão: quadrado 192, foto de perfil), JPEG. Se passar de `max`, repete com qualidade menor.
// Lê por data URL (a CSP só libera `img-src data:`; blob: seria bloqueado). O <img> respeita a orientação EXIF.
export async function reduzirFoto(arquivo: File, largura = 192, altura = 192, max = 60000): Promise<string> {
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
  const c = document.createElement('canvas')
  c.width = largura
  c.height = altura
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('Sem canvas')
  const { sx, sy, sw, sh } = recorteCover(img.naturalWidth, img.naturalHeight, largura, altura)
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, largura, altura)
  let url = ''
  for (const q of [0.8, 0.65, 0.5, 0.35]) {
    url = c.toDataURL('image/jpeg', q)
    if (url.length <= max) break
  }
  return url
}
