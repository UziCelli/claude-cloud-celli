import marca from '@marca/marca.json'
import type { RelatorioCiclo } from '../../lib/relatorio'
import { primeiroNome } from '../../lib/contato'
import { ajustar, C, caixa, fundoELogo, H, pngDe, rgba, W } from '../evolucao/cartaoStory'

// Só estes dados entram na imagem (LGPD: primeiro nome e números, sem e-mail nem sobrenome).
export type DadosRelatorio = {
  nome: string
  ciclo: string
  periodo: string
  aderenciaPct: number
  feitos: number
  previstos: number
  volume: string
  recordes: number
  destaque?: { nome: string; de: number; ate: number; pct: number }
}

const num = (n: number) => n.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
export const dataBr = (iso: string) => iso.split('-').reverse().join('/')
export const periodoTexto = (r: RelatorioCiclo) => `${dataBr(r.inicio)} a ${dataBr(r.fim)}`
export const volumeTexto = (kg: number) => (kg >= 1000 ? `${num(kg / 1000)} t` : `${num(kg)} kg`)

export const dadosCartaoRelatorio = (r: RelatorioCiclo, nomeAluno: string): DadosRelatorio => {
  const top = r.evolucoes[0]
  return {
    nome: primeiroNome(nomeAluno),
    ciclo: r.nome,
    periodo: periodoTexto(r),
    aderenciaPct: r.aderenciaPct,
    feitos: r.feitos,
    previstos: r.previstos,
    volume: volumeTexto(r.volumeKg),
    recordes: r.recordes.length,
    destaque: top && { nome: top.nome, de: top.de, ate: top.ate, pct: top.pct },
  }
}

export function textosRelatorio(d: DadosRelatorio) {
  return {
    titulo: 'Ciclo concluído',
    nome: d.nome,
    subtitulo: [d.ciclo, d.periodo].filter(Boolean).join(' · '),
    numeros: [
      { valor: `${d.aderenciaPct}%`, rotulo: `${d.feitos} de ${d.previstos} treinos feitos` },
      { valor: d.volume, rotulo: 'levantadas no ciclo' },
      { valor: String(d.recordes), rotulo: d.recordes === 1 ? 'recorde batido' : 'recordes batidos' },
    ],
    destaque: d.destaque
      ? {
          nome: d.destaque.nome,
          linha: `${num(d.destaque.de)} → ${num(d.destaque.ate)} kg`,
          pct: `+${Math.round(d.destaque.pct).toLocaleString('pt-BR')}%`,
        }
      : undefined,
    rodape: marca.nome.toUpperCase(),
  }
}

function desenhar(ctx: CanvasRenderingContext2D, d: DadosRelatorio) {
  const t = textosRelatorio(d)
  const disp = (px: number, peso = 800) => `${peso} ${px}px Montserrat, 'Arial Black', sans-serif`
  const sans = (px: number, peso = 500) => `${peso} ${px}px Inter, system-ui, sans-serif`
  ctx.textBaseline = 'alphabetic'
  fundoELogo(ctx, 130, 560)
  ctx.textAlign = 'center'
  ctx.fillStyle = C.m300
  ctx.font = disp(40, 700)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '8px'
  ctx.fillText(t.titulo.toUpperCase(), W / 2, 400)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.fillStyle = '#fff'
  ajustar(ctx, t.nome, (p) => disp(p, 900), 150, W - 160)
  ctx.fillText(t.nome, W / 2, 545)
  ctx.fillStyle = C.s300
  ajustar(ctx, t.subtitulo, (p) => sans(p, 600), 40, W - 160)
  ctx.fillText(t.subtitulo, W / 2, 610)

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

  ctx.fillStyle = C.m300
  ctx.font = disp(34, 700)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '10px'
  ctx.fillText(t.rodape, W / 2, H - 70)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
}

export const gerarCartaoRelatorio = (d: DadosRelatorio) => pngDe((ctx) => desenhar(ctx, d))
