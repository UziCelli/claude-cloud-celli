// Folhas A4 em canvas para os PDFs do app (relatório do ciclo e avaliação física): quebra de página,
// cabeçalho, recado do coach, números, título, barra, rodapé e a montagem final (src/lib/pdf.ts).
import { montarPdf } from '../../lib/pdf'
import { C, prepararFontes } from '../evolucao/cartaoStory'

export const PW = 1240
export const PH = 1754
export const M = 90
export const LARG = PW - 2 * M
const FIM = PH - 130
export const disp = (px: number, peso = 800) => `${peso} ${px}px Montserrat, 'Arial Black', sans-serif`
export const sans = (px: number, peso = 500) => `${peso} ${px}px Inter, system-ui, sans-serif`
export const TEXTO = '#111827'
export const MUDO = '#6b7280'
export const TRILHA = '#e5e7eb'
const CAIXA = '#f3f4f6'

export function quebrar(ctx: CanvasRenderingContext2D, texto: string, max: number) {
  const linhas: string[] = []
  for (const par of texto.split('\n')) {
    let atual = ''
    for (const p of par.split(' ')) {
      const t = atual ? `${atual} ${p}` : p
      if (atual && ctx.measureText(t).width > max) {
        linhas.push(atual)
        atual = p
      } else atual = t
    }
    linhas.push(atual)
  }
  return linhas
}

// `f.y` é a linha de base atual; cada peça avança o `y` e abre folha nova quando não cabe.
export async function criarFolhas() {
  await prepararFontes()
  const paginas: HTMLCanvasElement[] = []
  const f = {
    ctx: null as unknown as CanvasRenderingContext2D,
    y: 0,
    nova() {
      const c = document.createElement('canvas')
      c.width = PW
      c.height = PH
      const x = c.getContext('2d')
      if (!x) throw new Error('Canvas indisponível')
      x.fillStyle = '#fff'
      x.fillRect(0, 0, PW, PH)
      x.textBaseline = 'alphabetic'
      x.textAlign = 'left'
      paginas.push(c)
      f.ctx = x
      f.y = M
    },
    espaco(h: number) {
      if (f.y + h > FIM) f.nova()
    },
    texto(t: string, x: number, fonte: string, cor: string, align: CanvasTextAlign = 'left') {
      f.ctx.font = fonte
      f.ctx.fillStyle = cor
      f.ctx.textAlign = align
      f.ctx.fillText(t, x, f.y)
    },
    caixa(x: number, largura: number, altura: number, raio: number, cor = CAIXA) {
      f.ctx.fillStyle = cor
      f.ctx.beginPath()
      f.ctx.roundRect(x, f.y, largura, altura, raio)
      f.ctx.fill()
    },
    barra(frac: number, cor: string) {
      f.caixa(M, LARG, 18, 9, TRILHA)
      f.caixa(M, Math.max(18, LARG * Math.min(1, frac)), 18, 9, cor)
      f.y += 18
    },
    titulo(t: string) {
      f.espaco(120)
      f.y += 40
      f.texto(t.toUpperCase(), M, disp(30, 800), C.m600)
      f.y += 36
    },
    cabecalho(rotulo: string, titulo: string, sub: string) {
      f.y += 20
      f.ctx.save()
      if ('letterSpacing' in f.ctx) f.ctx.letterSpacing = '6px'
      f.texto(rotulo.toUpperCase(), M, disp(28, 700), C.m600)
      f.ctx.restore()
      f.y += 80
      f.texto(titulo, M, disp(64, 900), TEXTO)
      f.y += 52
      f.texto(sub, M, sans(34), MUDO)
      f.y += 30
    },
    recado(comentario?: string) {
      if (!comentario?.trim()) return
      f.ctx.font = sans(34)
      const linhas = quebrar(f.ctx, comentario.trim(), LARG - 80)
      const h = 110 + linhas.length * 48
      f.espaco(h)
      f.y += 30
      f.caixa(M, LARG, h, 28)
      f.y += 56
      f.texto('RECADO DO SEU COACH', M + 40, disp(26, 800), C.m600)
      f.y += 58
      for (const l of linhas) {
        f.texto(l, M + 40, sans(34), TEXTO)
        f.y += 48
      }
      f.y -= 10
    },
    // Caixas lado a lado com um número grande e o rótulo embaixo.
    numeros(itens: { valor: string; rotulo: string }[]) {
      f.espaco(200)
      f.y += 50
      const col = LARG / itens.length
      itens.forEach(({ valor, rotulo }, i) => {
        const cx = M + col * i + col / 2
        f.caixa(M + col * i + 8, col - 16, 150, 24)
        f.y += 70
        f.texto(valor, cx, disp(46, 900), C.m600, 'center')
        f.y += 50
        f.texto(rotulo, cx, sans(28), MUDO, 'center')
        f.y -= 120
      })
      f.y += 150
    },
    paragrafo(t: string, fonte = sans(32), cor = TEXTO, altura = 46) {
      f.ctx.font = fonte
      for (const l of quebrar(f.ctx, t, LARG)) {
        f.espaco(altura)
        f.y += altura
        f.texto(l, M, fonte, cor)
      }
    },
    // Rodapé com a página, JPEG de cada folha e o PDF pronto.
    async fechar(): Promise<Blob> {
      const jpegs: Uint8Array[] = []
      try {
        for (let i = 0; i < paginas.length; i++) {
          const c = paginas[i]
          const x = c.getContext('2d')!
          x.fillStyle = MUDO
          x.font = sans(26)
          x.textAlign = 'center'
          x.fillText(`página ${i + 1} de ${paginas.length}`, PW / 2, PH - 60)
          const b = await new Promise<Blob | null>((ok) => c.toBlob(ok, 'image/jpeg', 0.9))
          if (!b) throw new Error('Falha ao gerar o PDF')
          jpegs.push(new Uint8Array(await b.arrayBuffer()))
        }
      } finally {
        for (const c of paginas) c.width = 0 // libera a memória do canvas (iPhone), mesmo se falhar no meio
      }
      return montarPdf(jpegs, PW, PH)
    },
  }
  f.nova()
  return f
}
