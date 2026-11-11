// Desenho do corpo (frente e costas): fonte única das formas, usada na tela (SVG) e no PDF (Path2D).
// Só a metade direita é escrita à mão (frente, x de 50 a 100); a esquerda é o espelho e as costas são a frente deslocada.
import type { ResultadoSegmento } from '../../lib/avaliacao'
import type { SegmentoId, Veredito } from '../../lib/segmentos'

export const VIEWBOX = { w: 200, h: 214 }
export const CENTRO = { frente: 50, costas: 150 }
type Vista = 'frente' | 'costas'

const r1 = (n: number) => Math.round(n * 10) / 10
// Só comandos absolutos com pares de números (M, L, Q, C, Z): dá para mapear x e y par a par.
const mapear = (d: string, f: (x: number, y: number) => [number, number]) =>
  d.replace(/(-?[\d.]+) (-?[\d.]+)/g, (_, x, y) => f(+x, +y).map(r1).join(' '))
const elipse = (cx: number, cy: number, rx: number, ry: number) => {
  const k = 0.5523
  return `M${cx - rx} ${cy} C${cx - rx} ${cy - k * ry} ${cx - k * rx} ${cy - ry} ${cx} ${cy - ry} C${cx + k * rx} ${cy - ry} ${cx + rx} ${cy - k * ry} ${cx + rx} ${cy} C${cx + rx} ${cy + k * ry} ${cx + k * rx} ${cy + ry} ${cx} ${cy + ry} C${cx - k * rx} ${cy + ry} ${cx - rx} ${cy + k * ry} ${cx - rx} ${cy}Z`
}
const dobro = (d: string) => `${d}${mapear(d, (x, y) => [100 - x, y])}` // direita + espelho (esquerda)
const nasCostas = (d: string) => mapear(d, (x, y) => [x + 100, y])
const duas = (frente?: string, costas?: string) => ({ ...(frente && { frente: dobro(frente) }), ...(costas && { costas: dobro(costas) }) })

// Partes que se repetem nas duas vistas (metade direita).
const OMBRO = elipse(68.5, 37, 8, 9)
const BRACO = 'M64 46 Q70 43 77 46 Q80 58 78 71 Q73 74 68 72 Q65 58 64 46Z'
const ANTEBRACO = 'M68.5 75 Q73.5 76.5 78 74.5 Q80.5 88 81.5 101 Q77.5 104 74.5 102 Q70 90 68.5 75Z'
const COXA = 'M51.5 100 Q61 98 69 101 Q70 122 66 148 Q58 151 53 148 Q50 126 51.5 100Z'
const PANTURRILHA = 'M53 152 Q59.5 154 66 152 Q68.5 168 63.5 190 Q58.5 192 55.5 190 Q50.5 168 53 152Z'

export const FORMAS: Record<SegmentoId, { frente?: string; costas?: string }> = {
  ombros: duas(OMBRO, OMBRO),
  peito: duas('M51 32 Q58 31 62 33 Q64 44 61.5 52 Q56 54 51 53Z'),
  costas: duas(undefined, 'M51 31 Q58 30 62 32 Q65 44 62 58 Q61 68 60.5 76 Q56 78 51 78Z'),
  bracos: duas(BRACO, BRACO),
  antebracos: duas(ANTEBRACO, ANTEBRACO),
  abdomen: duas('M51 55 Q57 56 61 55 Q62 67 60.5 78 Q56 80 51 80Z'),
  quadril: duas('M51 81 Q58 82 61 81 Q65.5 90 63 100 Q57 101 51 100Z', elipse(59, 91, 7.5, 9.5)),
  coxas: duas(COXA, COXA),
  panturrilhas: duas(PANTURRILHA, PANTURRILHA),
}

// Silhueta de fundo (cabeça, pescoço, tronco, mãos e pés): aparece nas partes sem destaque e nos vãos.
const BASE_DIREITA = [elipse(78.5, 109, 3.8, 6.5), elipse(59, 197, 6.5, 4.5)].join('')
const BASE_CENTRO = `${elipse(50, 14, 9, 11)}M45.5 23 L54.5 23 L56 32 L44 32Z M37 31 Q50 28 63 31 Q66 60 62 100 Q50 103 38 100 Q34 60 37 31Z`
export const CONTORNO: Record<Vista, string> = {
  frente: BASE_CENTRO + dobro(BASE_DIREITA),
  costas: nasCostas(BASE_CENTRO) + nasCostas(dobro(BASE_DIREITA)),
}
// Forma de um segmento numa vista (costas já deslocadas para x 100 a 200).
export const formaDe = (id: SegmentoId, vista: Vista) => {
  const d = FORMAS[id][vista]
  return d && (vista === 'costas' ? nasCostas(d) : d)
}

// Cores por veredito (a cor nunca fala sozinha: a legenda tem texto). Leitura `fraca` = mesma cor misturada com branco.
export const COR_CORPO: Record<Veredito, string> = { melhorou: '#16a34a', observar: '#d97706', estavel: '#64748b' }
export const BASE_TELA = '#334155'
export const BASE_PDF = '#d1d5db'
export const LINHA_PDF = '#9ca3af'
export const ESTAVEL_PDF = '#6b7280'
const clarear = (hex: string) => `#${[1, 3, 5].map((i) => Math.round((parseInt(hex.slice(i, i + 2), 16) + 255) / 2).toString(16).padStart(2, '0')).join('')}`
export const corParte = (v: Veredito, fraca: boolean, pdf = false) => {
  const c = pdf && v === 'estavel' ? ESTAVEL_PDF : COR_CORPO[v]
  return fraca ? clarear(c) : c
}
export const LEGENDA: { veredito: Veredito; texto: string }[] = [
  { veredito: 'melhorou', texto: 'Melhorou' },
  { veredito: 'observar', texto: 'A observar' },
  { veredito: 'estavel', texto: 'Estável' },
]
export const LEGENDA_FRACA = 'Tom claro: sem dobra para confirmar'

type Parte = Pick<ResultadoSegmento, 'id' | 'rotulo' | 'veredito'>
const lista = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}` : xs[0])
// Texto para leitor de tela: "Melhoraram: coxas e braços. A observar: ombros."
export function rotuloCorpo(segmentos: Parte[]) {
  const de = (v: Veredito) => segmentos.filter((s) => s.veredito === v).map((s) => s.rotulo.toLowerCase())
  const [m, o] = [de('melhorou'), de('observar')]
  const partes = [m.length && `${m.length > 1 ? 'Melhoraram' : 'Melhorou'}: ${lista(m)}`, o.length && `A observar: ${lista(o)}`].filter(Boolean)
  return partes.length ? `${partes.join('. ')}.` : 'Sem partes em destaque'
}
