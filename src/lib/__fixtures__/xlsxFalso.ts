// Só para testes: gera um .xlsx mínimo válido para o leitor de src/lib/xlsx.ts.
import type { Valor } from '../xlsx'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const enc = new TextEncoder()

async function deflate(b: Uint8Array): Promise<Uint8Array> {
  const f = new Blob([b as BlobPart]).stream().pipeThrough(new CompressionStream('deflate-raw'))
  return new Uint8Array(await new Response(f).arrayBuffer())
}

function colNum(ref: string): [number, number] {
  const m = /^([A-Z]+)(\d+)$/.exec(ref)!
  return [Number(m[2]), [...m[1]].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0)]
}

export async function criarXlsx(abas: Record<string, Record<string, Valor>>): Promise<Uint8Array> {
  const comp: string[] = []
  const xmls: Record<string, string> = {}
  Object.keys(abas).forEach((nome) => {
    const abaXml = abas[nome]
    const linhas = new Map<number, [number, string][]>()
    for (const [ref, v] of Object.entries(abaXml)) {
      if (v === null) continue
      const [r, c] = colNum(ref)
      let x: string
      if (typeof v === 'number') x = `<c r="${ref}"><v>${v}</v></c>`
      else if (typeof v === 'boolean') x = `<c r="${ref}" t="b"><v>${v ? 1 : 0}</v></c>`
      else {
        comp.push(v)
        x = `<c r="${ref}" t="s"><v>${comp.length - 1}</v></c>`
      }
      linhas.set(r, [...(linhas.get(r) ?? []), [c, x]])
    }
    const dados = [...linhas].sort((a, b) => a[0] - b[0]).map(([r, cs]) => `<row r="${r}">${cs.sort((a, b) => a[0] - b[0]).map((c) => c[1]).join('')}</row>`)
    xmls[nome] = `<sheetData>${dados.join('')}</sheetData>`
  })
  return criarXlsxBruto(xmls, `<sst>${comp.map((s) => `<si><t xml:space="preserve">${esc(s)}</t></si>`).join('')}</sst>`)
}

// XML cru por aba (conteúdo de <worksheet>) e <sst> pronto: para testar tipos de célula e entidades.
export async function criarXlsxBruto(abas: Record<string, string>, sst = '<sst/>'): Promise<Uint8Array> {
  const nomes = Object.keys(abas)
  const arq: [string, string][] = nomes.map((n, i) => [`xl/worksheets/sheet${i + 1}.xml`, `<?xml version="1.0"?><worksheet>${abas[n]}</worksheet>`])
  arq.unshift(
    ['xl/workbook.xml', `<?xml version="1.0"?><workbook xmlns:r="x"><sheets>${nomes.map((n, i) => `<sheet name="${esc(n)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>`],
    ['xl/_rels/workbook.xml.rels', `<?xml version="1.0"?><Relationships>${nomes.map((_, i) => `<Relationship Id="rId${i + 1}" Type="x" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}</Relationships>`],
    ['xl/sharedStrings.xml', `<?xml version="1.0"?>${sst}`],
  )
  const partes: Uint8Array[] = []
  const central: Uint8Array[] = []
  let pos = 0
  for (const [nome, txt] of arq) {
    const n = enc.encode(nome)
    const cru = enc.encode(txt)
    const z = await deflate(cru)
    const h = new DataView(new ArrayBuffer(30))
    h.setUint32(0, 0x04034b50, true)
    h.setUint16(4, 20, true)
    h.setUint16(8, 8, true)
    h.setUint32(18, z.length, true)
    h.setUint32(22, cru.length, true)
    h.setUint16(26, n.length, true)
    const d = new DataView(new ArrayBuffer(46))
    d.setUint32(0, 0x02014b50, true)
    d.setUint16(4, 20, true)
    d.setUint16(6, 20, true)
    d.setUint16(10, 8, true)
    d.setUint32(20, z.length, true)
    d.setUint32(24, cru.length, true)
    d.setUint16(28, n.length, true)
    d.setUint32(42, pos, true)
    partes.push(new Uint8Array(h.buffer), n, z)
    central.push(new Uint8Array(d.buffer), n)
    pos += 30 + n.length + z.length
  }
  const tamC = central.reduce((s, p) => s + p.length, 0)
  const e = new DataView(new ArrayBuffer(22))
  e.setUint32(0, 0x06054b50, true)
  e.setUint16(8, arq.length, true)
  e.setUint16(10, arq.length, true)
  e.setUint32(12, tamC, true)
  e.setUint32(16, pos, true)
  const todos = [...partes, ...central, new Uint8Array(e.buffer)]
  const saida = new Uint8Array(pos + tamC + 22)
  let o = 0
  for (const p of todos) {
    saida.set(p, o)
    o += p.length
  }
  return saida
}

type Cel = Record<string, Valor>

// Aba falsa: 2 semanas, 2 treinos. `novo` = layout novo (config em BN5, tabela em BN12).
export function abaMesoFalsa(novo = false, extra: Cel = {}): Cel {
  const [lr, col] = novo ? [5, 'BN'] : [3, 'AY'] // rótulo; coluna do rótulo
  const prox = (c: string) => (c === 'AY' ? 'AZ' : 'BO')
  const v = prox(col)
  const c: Cel = {
    [`${col}${lr}`]: 'Semana [n]', [`${v}${lr}`]: 2,
    [`${v}${lr + 1}`]: 45292, // 2024-01-01
    [`${v}${lr + 2}`]: 2,
    T4: 'Supino', T5: 'Crucifixo', U4: 'Agachamento',
    T18: 4, U18: 3, T19: 5.9, T33: 2, U33: 2, Z33: 90,
    // semana 1: topo na linha 3; semana 2 começa no "Semana" da linha 81 (bloco = 79)
    B3: true, C3: 'Realizado', C5: 'Supino', J5: 20, K5: 0, L5: 22.5, C6: 'Crucifixo',
    B16: false, C16: 'Não realizado', C18: 'Agachamento',
    B81: 'Semana',
    C82: 'Não realizado', C84: 'Voador', J84: 10,
    C95: 'Não realizado', C97: 'Agachamento',
    ...extra,
  }
  return c
}
