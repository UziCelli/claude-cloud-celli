import marca from '@marca/marca.json'
import { LOGO_PARTES, LOGO_VIEWBOX } from '@marca/logoPaths'

// Cartão 1080×1920 para o story do Instagram. Só estes dados entram na imagem (LGPD: sem e-mail, sem sobrenome).
export type DadosCartao = {
  nome: string
  treinos: number
  semanasSeguidas: number
  toneladas: string
  comparacao?: string
  destaque?: { nome: string; de: number; ate: number; pct: number }
}

const num = (n: number) => n.toLocaleString('pt-BR', { maximumFractionDigits: 1 })

export function textosCartao(d: DadosCartao) {
  const plural = (n: number, um: string, varios: string) => (n === 1 ? um : varios)
  return {
    titulo: 'Minha evolução',
    nome: d.nome,
    numeros: [
      { valor: num(d.treinos), rotulo: plural(d.treinos, 'treino feito', 'treinos feitos') },
      { valor: num(d.semanasSeguidas), rotulo: plural(d.semanasSeguidas, 'semana seguida', 'semanas seguidas') },
      { valor: d.toneladas, rotulo: d.comparacao ?? 'levantadas no total' },
    ],
    destaque: d.destaque
      ? {
          nome: d.destaque.nome,
          linha: `${num(d.destaque.de)} → ${num(d.destaque.ate)} kg`,
          pct: `${d.destaque.pct > 0 ? '+' : ''}${Math.round(d.destaque.pct).toLocaleString('pt-BR')}%`,
        }
      : undefined,
    rodape: marca.nome.toUpperCase(),
  }
}

// Cores da marca (marcas/<id>/marca.json, iguais às do tema.css).
const C = marca.cores
const rgba = (hex: string, a: number) => `rgba(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(',')},${a})`
const W = 1080
const H = 1920

function ajustar(ctx: CanvasRenderingContext2D, texto: string, fonte: (px: number) => string, px: number, max: number) {
  ctx.font = fonte(px)
  const w = ctx.measureText(texto).width
  ctx.font = fonte(w > max ? Math.floor((px * max) / w) : px)
}

function caixa(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function fundoELogo(ctx: CanvasRenderingContext2D, y: number, lw: number) {
  // Fundo
  const g = ctx.createLinearGradient(0, 0, W * 0.6, H)
  g.addColorStop(0, C.m700)
  g.addColorStop(0.45, C.m900)
  g.addColorStop(1, C.s950)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  for (const [x, y, r, a] of [[1000, 260, 520, 0.22], [60, 1500, 600, 0.16]] as const) {
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r)
    rg.addColorStop(0, rgba(C.m400, a))
    rg.addColorStop(1, rgba(C.m400, 0))
    ctx.fillStyle = rg
    ctx.fillRect(0, 0, W, H)
  }

  // Logo (o "COACH" é vazado: aparece o fundo)
  const k = lw / LOGO_VIEWBOX.w
  ctx.save()
  ctx.translate((W - lw) / 2, y)
  ctx.scale(k, k)
  for (const p of LOGO_PARTES) {
    ctx.fillStyle = p.cor
    ctx.fill(new Path2D(p.d), 'evenodd')
  }
  ctx.restore()
}

function desenhar(ctx: CanvasRenderingContext2D, d: DadosCartao) {
  const t = textosCartao(d)
  const disp = (px: number, peso = 800) => `${peso} ${px}px Montserrat, 'Arial Black', sans-serif`
  const sans = (px: number, peso = 500) => `${peso} ${px}px Inter, system-ui, sans-serif`
  ctx.textBaseline = 'alphabetic'

  fundoELogo(ctx, 130, 560)

  // Título e nome
  ctx.textAlign = 'center'
  ctx.fillStyle = C.m300
  ctx.font = disp(40, 700)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '8px'
  ctx.fillText(t.titulo.toUpperCase(), W / 2, 400)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.fillStyle = '#fff'
  ajustar(ctx, t.nome, (p) => disp(p, 900), 150, W - 160)
  ctx.fillText(t.nome, W / 2, 545)
  ctx.fillStyle = C.m500
  caixa(ctx, W / 2 - 60, 585, 120, 8, 4)
  ctx.fill()

  // Três números
  const y0 = 660
  const alt = 245
  t.numeros.forEach((n, i) => {
    const y = y0 + i * (alt + 28)
    ctx.fillStyle = rgba(C.s800, 0.72)
    caixa(ctx, 70, y, W - 140, alt, 40)
    ctx.fill()
    ctx.strokeStyle = rgba(C.m300, 0.25)
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ajustar(ctx, n.valor, (p) => disp(p, 900), 150, W - 260)
    ctx.fillText(n.valor, W / 2, y + 155)
    ctx.fillStyle = C.s300
    ajustar(ctx, n.rotulo, (p) => sans(p, 600), 44, W - 260)
    ctx.fillText(n.rotulo, W / 2, y + 215)
  })

  // Destaque
  if (t.destaque) {
    const y = y0 + 3 * (alt + 28) + 10
    const gd = ctx.createLinearGradient(70, y, W - 70, y + 230)
    gd.addColorStop(0, C.m500)
    gd.addColorStop(1, C.m600)
    ctx.fillStyle = gd
    caixa(ctx, 70, y, W - 140, 230, 40)
    ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ajustar(ctx, t.destaque.nome.toUpperCase(), (p) => disp(p, 700), 38, W - 260)
    ctx.fillText(t.destaque.nome.toUpperCase(), W / 2, y + 66)
    ctx.fillStyle = '#fff'
    const linha = `${t.destaque.linha}  (${t.destaque.pct})`
    ajustar(ctx, linha, (p) => disp(p, 900), 74, W - 200)
    ctx.fillText(linha, W / 2, y + 160)
  }

  // Rodapé
  ctx.fillStyle = C.m300
  ctx.font = disp(34, 700)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '10px'
  ctx.fillText(t.rodape, W / 2, H - 70)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
}

export async function gerarCartao(d: DadosCartao): Promise<Blob> {
  await document.fonts.ready
  await Promise.all([document.fonts.load("800 40px Montserrat"), document.fonts.load("600 40px Inter")]).catch(() => {})
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('Canvas indisponível')
  desenhar(ctx, d)
  return new Promise((ok, erro) => c.toBlob((b) => (b ? ok(b) : erro(new Error('Falha ao gerar a imagem'))), 'image/png'))
}

// O share precisa do toque recente (o Safari recusa se demorar): a imagem já deve vir pronta.
export async function compartilharCartao(blob: Blob): Promise<'compartilhado' | 'baixado' | 'cancelado'> {
  const file = new File([blob], 'minha-evolucao.png', { type: 'image/png' })
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Minha evolução' })
      return 'compartilhado'
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelado'
      if (!(e instanceof DOMException && e.name === 'NotAllowedError')) throw e
      // NotAllowedError (toque expirou): cai no download abaixo.
    }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
  return 'baixado'
}

// ---- Cartão do fim do treino (story 1080×1920) ----
export type DadosTreino = {
  nome: string // só o primeiro nome
  data: string
  duracao: string | null
  volume: string | null // ex.: "12.500 kg"
  comparacao?: string
  recordes: string[] // "Supino: 60 kg"
  subiram: string[] // "Remada: 40 → 45 kg"
  semana: { feitos: number; total: number }
}

const MAX_LISTA = 3
export const limitar = (l: string[], max = MAX_LISTA) => (l.length > max ? [...l.slice(0, max), `+${l.length - max}`] : l)

function desenharTreino(ctx: CanvasRenderingContext2D, d: DadosTreino) {
  const disp = (px: number, peso = 800) => `${peso} ${px}px Montserrat, 'Arial Black', sans-serif`
  const sans = (px: number, peso = 600) => `${peso} ${px}px Inter, system-ui, sans-serif`
  const texto = (t: string, y: number, cor: string, px: number, peso = 800, fam = disp) => {
    ctx.fillStyle = cor
    ajustar(ctx, t, (p) => fam(p, peso), px, W - 160)
    ctx.fillText(t, W / 2, y)
  }
  ctx.textBaseline = 'alphabetic'
  fundoELogo(ctx, 110, 420)
  ctx.textAlign = 'center'
  texto(d.data.toUpperCase(), 300, C.m300, 38, 700)
  texto('TREINO CONCLUÍDO', 410, '#fff', 92, 900)
  texto(d.nome, 510, C.m300, 76, 800)

  let y = 580
  for (const [valor, rotulo] of [[d.duracao, 'DURAÇÃO'], [d.volume, 'VOLUME']] as const) {
    if (!valor) continue
    ctx.fillStyle = rgba(C.s800, 0.72)
    caixa(ctx, 70, y, W - 140, 270, 40)
    ctx.fill()
    texto(rotulo, y + 60, C.s300, 34, 700, sans)
    texto(valor, y + 190, '#fff', 150, 900)
    if (rotulo === 'VOLUME' && d.comparacao) texto(d.comparacao, y + 244, C.m300, 36, 600, sans)
    y += 296
  }

  // Listas: só as linhas que cabem acima da barra da semana (recordes primeiro); o resto vira "+N".
  // Cada lista ocupa título + espaço (2 linhas) + itens.
  const LH = 54
  const yb = H - 240
  let linhas = Math.floor((yb - 40 - y) / LH)
  for (const [titulo, lista, cor] of [['🏆 RECORDES', d.recordes, '#fcd34d'], ['↑ SUBIU A CARGA', d.subiram, '#6ee7b7']] as const) {
    const max = Math.min(MAX_LISTA, linhas - 3)
    const l = lista.length <= Math.min(MAX_LISTA, linhas - 2) ? lista : max >= 1 ? limitar(lista, max) : []
    if (!l.length) continue
    texto(titulo, y + 46, cor, 40, 800)
    l.forEach((t, i) => texto(t, y + 100 + i * LH, '#fff', 40, 600, sans))
    y += (l.length + 2) * LH
    linhas -= l.length + 2
  }

  // Semana: um segmento por treino
  const { feitos, total } = d.semana
  const gap = 14
  const n = Math.min(Math.max(total, 1), 7)
  const sw = (W - 200 - gap * (n - 1)) / n
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = i < feitos ? C.m400 : rgba('#ffffff', 0.2)
    caixa(ctx, 100 + i * (sw + gap), yb, sw, 26, 13)
    ctx.fill()
  }
  texto(`Semana: ${feitos} de ${total} treinos`, yb + 85, '#fff', 40, 600, sans)
  ctx.fillStyle = C.m300
  ctx.font = disp(34, 700)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '10px'
  ctx.fillText(marca.nome.toUpperCase(), W / 2, H - 70)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
}

export async function gerarCartaoTreino(d: DadosTreino): Promise<Blob> {
  await document.fonts.ready
  await Promise.all([document.fonts.load("800 40px Montserrat"), document.fonts.load("600 40px Inter")]).catch(() => {})
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('Canvas indisponível')
  desenharTreino(ctx, d)
  return new Promise((ok, erro) => c.toBlob((b) => (b ? ok(b) : erro(new Error('Falha ao gerar a imagem'))), 'image/png'))
}
