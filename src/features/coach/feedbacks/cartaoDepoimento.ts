import marca from '@marca/marca.json'
import { assinaturaMarca, primeiroNome } from '../../../lib/feedback'
import { C, fundoELogo, H, pngDe, W } from '../../evolucao/cartaoStory'
import { D_ESTRELA } from '../../../icones'

// Só estes dados entram na imagem (LGPD: primeiro nome e o texto que o aluno autorizou).
export type DadosDepoimento = { texto: string; nome: string }

export function textosDepoimento(d: DadosDepoimento) {
  return {
    frase: `“${d.texto.trim()}”`,
    autor: `— ${primeiroNome(d.nome)}`,
    assinatura: `aluno(a) que ${assinaturaMarca(marca.doNome)}`,
  }
}

function quebrar(ctx: CanvasRenderingContext2D, texto: string, max: number) {
  const linhas: string[] = []
  let atual = ''
  for (const p of texto.split(/\s+/)) {
    const t = atual ? `${atual} ${p}` : p
    if (atual && ctx.measureText(t).width > max) {
      linhas.push(atual)
      atual = p
    } else atual = t
  }
  return atual ? [...linhas, atual] : linhas
}

function desenhar(ctx: CanvasRenderingContext2D, d: DadosDepoimento) {
  const t = textosDepoimento(d)
  const disp = (px: number, peso = 800) => `${peso} ${px}px Montserrat, 'Arial Black', sans-serif`
  const sans = (px: number, peso = 500) => `${peso} ${px}px Inter, system-ui, sans-serif`
  ctx.textBaseline = 'alphabetic'
  fundoELogo(ctx, 130, 560)
  ctx.textAlign = 'center'

  // 5 estrelas
  const tam = 110
  ctx.save()
  ctx.translate(W / 2 - (5 * tam + 4 * 24) / 2, 430)
  for (let i = 0; i < 5; i++) {
    ctx.save()
    ctx.translate(i * (tam + 24), 0)
    ctx.scale(tam / 24, tam / 24)
    ctx.fillStyle = '#fbbf24'
    ctx.fill(new Path2D(D_ESTRELA))
    ctx.restore()
  }
  ctx.restore()

  // Frase: o tamanho encolhe com o texto, para caber (limite do app: 1000 letras).
  const n = t.frase.length
  const px = n > 600 ? 40 : n > 300 ? 48 : n > 140 ? 58 : 70
  ctx.fillStyle = '#fff'
  ctx.font = sans(px, 600)
  const linhas = quebrar(ctx, t.frase, W - 200)
  const alt = px * 1.35
  const y0 = 640
  linhas.slice(0, Math.floor((H - 480 - y0) / alt)).forEach((l, i) => ctx.fillText(l, W / 2, y0 + px + i * alt))
  const fim = y0 + px + Math.min(linhas.length, Math.floor((H - 480 - y0) / alt)) * alt

  ctx.fillStyle = C.m300
  ctx.font = disp(60, 800)
  ctx.fillText(t.autor, W / 2, fim + 70)
  ctx.fillStyle = C.s300
  ctx.font = sans(38, 600)
  ctx.fillText(t.assinatura, W / 2, fim + 130)

  ctx.fillStyle = C.m300
  ctx.font = disp(34, 700)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '10px'
  ctx.fillText(marca.nome.toUpperCase(), W / 2, H - 70)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
}

export const gerarCartaoDepoimento = (d: DadosDepoimento) => pngDe((ctx) => desenhar(ctx, d))
