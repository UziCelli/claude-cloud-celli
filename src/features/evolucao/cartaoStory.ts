import { LOGO_COACH, LOGO_VFIT, LOGO_VIEWBOX } from '../../logoPaths'

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
    rodape: 'VFITCOACH',
  }
}

// Cores do @theme (src/index.css).
const C = { s950: '#0a1424', s800: '#1e2c46', s300: '#c3cee0', m300: '#7faedd', m400: '#5c93cc', m500: '#3f72a6', m700: '#0f2a52', m900: '#0b1e3d' }
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

function desenhar(ctx: CanvasRenderingContext2D, d: DadosCartao) {
  const t = textosCartao(d)
  const disp = (px: number, peso = 800) => `${peso} ${px}px Montserrat, 'Arial Black', sans-serif`
  const sans = (px: number, peso = 500) => `${peso} ${px}px Inter, system-ui, sans-serif`
  ctx.textBaseline = 'alphabetic'

  // Fundo
  const g = ctx.createLinearGradient(0, 0, W * 0.6, H)
  g.addColorStop(0, C.m700)
  g.addColorStop(0.45, C.m900)
  g.addColorStop(1, C.s950)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  for (const [x, y, r, a] of [[1000, 260, 520, 0.22], [60, 1500, 600, 0.16]] as const) {
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r)
    rg.addColorStop(0, `rgba(92,147,204,${a})`)
    rg.addColorStop(1, 'rgba(92,147,204,0)')
    ctx.fillStyle = rg
    ctx.fillRect(0, 0, W, H)
  }

  // Logo (o "COACH" é vazado: aparece o fundo)
  const lw = 560
  const k = lw / LOGO_VIEWBOX.w
  ctx.save()
  ctx.translate((W - lw) / 2, 130)
  ctx.scale(k, k)
  ctx.fillStyle = '#fff'
  ctx.fill(new Path2D(LOGO_VFIT), 'evenodd')
  ctx.fillStyle = C.m400
  ctx.fill(new Path2D(LOGO_COACH), 'evenodd')
  ctx.restore()

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
    ctx.fillStyle = 'rgba(30,44,70,0.72)'
    caixa(ctx, 70, y, W - 140, alt, 40)
    ctx.fill()
    ctx.strokeStyle = 'rgba(127,174,221,0.25)'
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
    gd.addColorStop(1, '#2c5c8f')
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
