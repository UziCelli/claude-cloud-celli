// Leitor mínimo de .xlsx para o navegador (sem biblioteca): unzip nativo + regex nas células.
export type Valor = string | number | boolean | null
export interface Planilha {
  abas: string[]
  ler(aba: string): Promise<Map<string, Valor>>
}

const ERRO = 'Este arquivo não é uma planilha do Excel (.xlsx).'

interface Entrada {
  metodo: number
  tamanho: number
  local: number
}

function indice(b: Uint8Array): Map<string, Entrada> {
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength)
  let fim = -1
  for (let i = b.length - 22; i >= Math.max(0, b.length - 22 - 65535); i--) {
    if (v.getUint32(i, true) === 0x06054b50) {
      fim = i
      break
    }
  }
  if (fim < 0) throw new Error(ERRO)
  const total = v.getUint16(fim + 10, true)
  let p = v.getUint32(fim + 16, true)
  const mapa = new Map<string, Entrada>()
  for (let i = 0; i < total; i++) {
    if (v.getUint32(p, true) !== 0x02014b50) throw new Error(ERRO)
    const n = v.getUint16(p + 28, true)
    const nome = new TextDecoder().decode(b.subarray(p + 46, p + 46 + n))
    mapa.set(nome, { metodo: v.getUint16(p + 10, true), tamanho: v.getUint32(p + 20, true), local: v.getUint32(p + 42, true) })
    p += 46 + n + v.getUint16(p + 30, true) + v.getUint16(p + 32, true)
  }
  return mapa
}

async function extrair(b: Uint8Array, e: Entrada): Promise<string> {
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength)
  if (v.getUint32(e.local, true) !== 0x04034b50) throw new Error(ERRO)
  const ini = e.local + 30 + v.getUint16(e.local + 26, true) + v.getUint16(e.local + 28, true)
  const dados = b.subarray(ini, ini + e.tamanho)
  let bytes: Uint8Array = dados
  if (e.metodo === 8) {
    const fluxo = new Blob([dados as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
    bytes = new Uint8Array(await new Response(fluxo).arrayBuffer())
  } else if (e.metodo !== 0) throw new Error(ERRO)
  return new TextDecoder().decode(bytes)
}

function desescapar(s: string): string {
  return s.replace(/&(#x[0-9a-fA-F]+|#\d+|amp|lt|gt|quot|apos);/g, (m, c: string) => {
    if (c[0] !== '#') return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[c]!
    const n = c[1] === 'x' ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10)
    return n <= 0x10ffff ? String.fromCodePoint(n) : m
  })
}

const attr = (a: string, nome: string) => {
  const m = new RegExp(`(?:^|\\s)${nome}="([^"]*)"`).exec(a)
  return m ? desescapar(m[1]) : undefined
}

const textos = (xml: string) =>
  [...xml.replace(/<rPh\b[\s\S]*?<\/rPh>/g, '').matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((m) => desescapar(m[1])).join('')

function compartilhadas(xml: string): string[] {
  return [...xml.matchAll(/<si\s*\/>|<si\b[^>]*>([\s\S]*?)<\/si>/g)].map((m) => (m[1] === undefined ? '' : textos(m[1])))
}

function celulas(xml: string, comp: string[]): Map<string, Valor> {
  const mapa = new Map<string, Valor>()
  for (const m of xml.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const ref = attr(m[1], 'r')
    const corpo = m[2]
    if (!ref || corpo === undefined) continue
    const t = attr(m[1], 't')
    const v = /<v\b[^>]*>([\s\S]*?)<\/v>/.exec(corpo)?.[1]
    let valor: Valor
    if (t === 'inlineStr') valor = textos(/<is\b[^>]*>([\s\S]*?)<\/is>/.exec(corpo)?.[1] ?? '')
    else if (v === undefined) continue
    else if (t === 's') valor = comp[Number(v)] ?? null
    else if (t === 'str') valor = desescapar(v)
    else if (t === 'b') valor = v.trim() === '1'
    else if (t === 'e' || t === 'd') valor = null // erro; data ISO (o Excel grava datas como serial)
    else {
      const n = parseFloat(v)
      valor = Number.isNaN(n) ? null : n
    }
    mapa.set(ref, valor)
  }
  return mapa
}

export async function abrirPlanilha(dados: ArrayBuffer | Uint8Array): Promise<Planilha> {
  const b = dados instanceof Uint8Array ? dados : new Uint8Array(dados)
  let arquivos: Map<string, Entrada>
  let abas: { nome: string; rid: string }[]
  let rels: Map<string, string>
  try {
    arquivos = indice(b)
    const lerTxt = async (n: string) => {
      const e = arquivos.get(n)
      if (!e) throw new Error(ERRO)
      return extrair(b, e)
    }
    const wb = await lerTxt('xl/workbook.xml')
    abas = [...wb.matchAll(/<sheet\b([^>]*?)\/?>/g)].map((m) => ({ nome: attr(m[1], 'name') ?? '', rid: attr(m[1], 'r:id') ?? '' }))
    const xr = await lerTxt('xl/_rels/workbook.xml.rels')
    rels = new Map([...xr.matchAll(/<Relationship\b([^>]*?)\/?>/g)].map((m) => [attr(m[1], 'Id') ?? '', attr(m[1], 'Target') ?? '']))
  } catch {
    throw new Error(ERRO)
  }
  let comp: Promise<string[]> | undefined
  return {
    abas: abas.map((a) => a.nome),
    async ler(aba) {
      const a = abas.find((x) => x.nome === aba)
      const alvo = a && rels.get(a.rid)
      if (!alvo) throw new Error(`Aba "${aba}" não encontrada na planilha.`)
      const caminho = alvo.startsWith('/') ? alvo.slice(1) : `xl/${alvo}`
      const e = arquivos.get(caminho)
      if (!e) throw new Error(`Aba "${aba}" não encontrada na planilha.`)
      comp ??= arquivos.has('xl/sharedStrings.xml') ? extrair(b, arquivos.get('xl/sharedStrings.xml')!).then(compartilhadas) : Promise.resolve([])
      return celulas(await extrair(b, e), await comp)
    },
  }
}
