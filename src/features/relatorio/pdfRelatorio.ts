import marca from '@marca/marca.json'
import { D_TROFEU } from '../../icones'
import { primeiroNome } from '../../lib/contato'
import { montarPdf } from '../../lib/pdf'
import type { RelatorioCiclo } from '../../lib/relatorio'
import { fmt } from '../coach/semana/format'
import { C, icone, prepararFontes } from '../evolucao/cartaoStory'
import { periodoTexto, volumeTexto } from './cartaoRelatorio'

const PW = 1240
const PH = 1754
const M = 90
const LARG = PW - 2 * M
const FIM = PH - 130
const disp = (px: number, peso = 800) => `${peso} ${px}px Montserrat, 'Arial Black', sans-serif`
const sans = (px: number, peso = 500) => `${peso} ${px}px Inter, system-ui, sans-serif`
const TEXTO = '#111827'
const MUDO = '#6b7280'
const TRILHA = '#e5e7eb'

export type EntradaPdf = { r: RelatorioCiclo; aluno: string; comentario?: string }

function quebrar(ctx: CanvasRenderingContext2D, texto: string, max: number) {
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

export async function gerarPdfRelatorio({ r, aluno, comentario }: EntradaPdf): Promise<Blob> {
  await prepararFontes()
  const paginas: HTMLCanvasElement[] = []
  let ctx!: CanvasRenderingContext2D
  let y = 0
  const nova = () => {
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
    ctx = x
    y = M
  }
  const espaco = (h: number) => {
    if (y + h > FIM) nova()
  }
  const texto = (t: string, x: number, fonte: string, cor: string, align: CanvasTextAlign = 'left') => {
    ctx.font = fonte
    ctx.fillStyle = cor
    ctx.textAlign = align
    ctx.fillText(t, x, y)
  }
  const barra = (frac: number, cor: string) => {
    ctx.fillStyle = TRILHA
    ctx.beginPath()
    ctx.roundRect(M, y, LARG, 18, 9)
    ctx.fill()
    ctx.fillStyle = cor
    ctx.beginPath()
    ctx.roundRect(M, y, Math.max(18, LARG * Math.min(1, frac)), 18, 9)
    ctx.fill()
    y += 18
  }
  const titulo = (t: string) => {
    espaco(120)
    y += 40
    texto(t.toUpperCase(), M, disp(30, 800), C.m600)
    y += 36
  }

  nova()
  // Cabeçalho
  y += 20
  ctx.save()
  if ('letterSpacing' in ctx) ctx.letterSpacing = '6px'
  texto(`${marca.nome.toUpperCase()} · RELATÓRIO DO CICLO`, M, disp(28, 700), C.m600)
  ctx.restore()
  y += 80
  texto(r.nome || 'Ciclo', M, disp(64, 900), TEXTO)
  y += 52
  texto(`${primeiroNome(aluno)} · ${periodoTexto(r)}`, M, sans(34), MUDO)
  y += 30

  // Recado do coach
  if (comentario?.trim()) {
    ctx.font = sans(34)
    const linhas = quebrar(ctx, comentario.trim(), LARG - 80)
    const h = 110 + linhas.length * 48
    espaco(h)
    y += 30
    ctx.fillStyle = '#f3f4f6'
    ctx.beginPath()
    ctx.roundRect(M, y, LARG, h, 28)
    ctx.fill()
    y += 56
    texto('RECADO DO SEU COACH', M + 40, disp(26, 800), C.m600)
    y += 58
    for (const l of linhas) {
      texto(l, M + 40, sans(34), TEXTO)
      y += 48
    }
    y += h - 110 - linhas.length * 48 - 10
  }

  // Aderência
  titulo('Aderência')
  y += 56
  texto(`${r.aderenciaPct}%`, M, disp(84, 900), C.m600)
  texto(`${r.feitos} de ${r.previstos} treinos`, M + 270, sans(36), TEXTO)
  y += 34
  barra(r.aderenciaPct / 100, C.m500)
  y += 46
  texto(`${r.semanasCompletas} de ${r.semanas} ${r.semanas === 1 ? 'semana completa' : 'semanas completas'}`, M, sans(30), MUDO)
  y += 20

  // Números
  espaco(200)
  y += 50
  const col = LARG / 3
  ;[
    [volumeTexto(r.volumeKg), 'volume total'],
    [String(r.movimentos), 'movimentos'],
    [r.tempoMedioMin == null ? '—' : `${r.tempoMedioMin} min`, 'tempo médio'],
  ].forEach(([v, rot], i) => {
    const cx = M + col * i + col / 2
    ctx.fillStyle = '#f3f4f6'
    ctx.beginPath()
    ctx.roundRect(M + col * i + 8, y, col - 16, 150, 24)
    ctx.fill()
    y += 70
    texto(v, cx, disp(46, 900), C.m600, 'center')
    y += 50
    texto(rot, cx, sans(28), MUDO, 'center')
    y -= 120
  })
  y += 150

  if (r.porSemana.length) {
    titulo('Semana a semana')
    for (const s of r.porSemana) {
      espaco(130)
      y += 44
      texto(`Semana ${s.semana}`, M, sans(32, 700), TEXTO)
      texto(`${s.feitos}/${s.previstos} treinos`, PW - M, sans(32), MUDO, 'right')
      y += 20
      barra(s.previstos ? s.feitos / s.previstos : 0, C.m500)
      y += 38
      texto(`${volumeTexto(s.volumeKg)} · ${s.movimentos} movimentos`, M, sans(26), MUDO)
      y += 10
    }
  }

  if (r.evolucoes.length) {
    titulo('Maiores evoluções')
    for (const e of r.evolucoes) {
      espaco(110)
      y += 44
      texto(`${e.nome}: ${fmt(e.de)} → ${fmt(e.ate)} kg (+${Math.round(e.pct).toLocaleString('pt-BR')}%)`, M, sans(32), TEXTO)
      y += 20
      barra(e.pct / r.evolucoes[0].pct, '#22c55e')
      y += 14
    }
  }

  if (r.recordes.length) {
    titulo(`Recordes (${r.recordes.length})`)
    for (const x of r.recordes) {
      espaco(70)
      y += 52
      icone(ctx, D_TROFEU, M, y, 40, '#d97706')
      texto(x.nome, M + 60, sans(32), TEXTO)
      texto(`${fmt(x.kg)} kg · sem. ${x.semana}`, PW - M, sans(30), MUDO, 'right')
    }
  }

  // Rodapé e JPEG
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
}
