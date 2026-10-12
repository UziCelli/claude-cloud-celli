// PDF 1.4 escrito à mão: uma página A4 por JPEG (sem dependências).
const A4_W = 595.28
const A4_H = 841.89

export function montarPdf(jpegs: Uint8Array[], wPx: number, hPx: number): Blob {
  const enc = new TextEncoder()
  const n = jpegs.length
  // Objetos: 1 catálogo, 2 páginas; página i = 3+3i, conteúdo = 4+3i, imagem = 5+3i.
  const kids = jpegs.map((_, i) => `${3 + 3 * i} 0 R`).join(' ')
  const partes: Uint8Array[] = [enc.encode('%PDF-1.4\n'), new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a])]
  let pos = 9 + 6
  const offsets: number[] = []
  const obj = (num: number, cabeca: string, stream?: Uint8Array) => {
    offsets[num] = pos
    const b = stream
      ? [enc.encode(`${num} 0 obj\n${cabeca}\nstream\n`), stream, enc.encode('\nendstream\nendobj\n')]
      : [enc.encode(`${num} 0 obj\n${cabeca}\nendobj\n`)]
    for (const p of b) {
      partes.push(p)
      pos += p.length
    }
  }
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>')
  obj(2, `<< /Type /Pages /Kids [${kids}] /Count ${n} >>`)
  const cont = enc.encode(`q ${A4_W} 0 0 ${A4_H} 0 0 cm /Im0 Do Q`)
  jpegs.forEach((j, i) => {
    const p = 3 + 3 * i
    obj(p, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4_W} ${A4_H}] /Resources << /XObject << /Im0 ${p + 2} 0 R >> >> /Contents ${p + 1} 0 R >>`)
    obj(p + 1, `<< /Length ${cont.length} >>`, cont)
    obj(p + 2, `<< /Type /XObject /Subtype /Image /Width ${wPx} /Height ${hPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${j.length} >>`, j)
  })
  const total = 3 + 3 * n
  let xref = `xref\n0 ${total}\n0000000000 65535 f \n`
  for (let k = 1; k < total; k++) xref += `${String(offsets[k]).padStart(10, '0')} 00000 n \n`
  xref += `trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${pos}\n%%EOF\n`
  partes.push(enc.encode(xref))
  return new Blob(partes as BlobPart[], { type: 'application/pdf' })
}
