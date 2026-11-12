import marca from '@marca/marca.json'
import { dataBR, fmtDeltaUn, fmtMedida, NOME_FONTE, type RelatorioAvaliacao, type Seta, type Tom } from '../../lib/avaliacao'
import { textoCarga } from '../../lib/segmentos'
import { primeiroNome } from '../../lib/contato'
import { ARTE, corParte, LEGENDA, LEGENDA_FRACA, REGIOES, SILHUETA, TAMANHO, VISTAS } from './corpoPaths'
import { criarFolhas, LARG, M, MUDO, PW, quebrar, sans, TEXTO, TRILHA } from '../relatorio/folhasPdf'
import { C } from '../evolucao/cartaoStory'

const COR_TOM: Record<Tom, string> = { bom: '#16a34a', atencao: '#d97706', neutro: '#6b7280' }

// Seta desenhada em traço (sem glifos): sobe, desce ou traço de "igual". `x` é a borda esquerda, `y` a linha de base.
function seta(ctx: CanvasRenderingContext2D, s: Seta, x: number, y: number, cor: string) {
  ctx.save()
  ctx.strokeStyle = cor
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  const cx = x + 11
  if (s === 'igual') {
    ctx.moveTo(x, y - 11)
    ctx.lineTo(x + 22, y - 11)
  } else {
    const [a, b] = s === 'sobe' ? [y - 2, y - 22] : [y - 22, y - 2]
    ctx.moveTo(cx, a)
    ctx.lineTo(cx, b)
    const d = s === 'sobe' ? 8 : -8
    ctx.moveTo(cx - 8, b + d)
    ctx.lineTo(cx, b)
    ctx.lineTo(cx + 8, b + d)
  }
  ctx.stroke()
  ctx.restore()
}

// Corpo de frente e de costas (mesma geometria da tela) e legenda em texto. `ESC` converte pixels do PNG em pixels da folha.
const ESC = 0.38
const carregar = (url: string) =>
  new Promise<HTMLImageElement>((ok, erro) => {
    const i = new Image()
    i.onload = () => ok(i)
    i.onerror = () => erro(new Error('corpo'))
    i.src = url
  })
async function corpo(f: Awaited<ReturnType<typeof criarFolhas>>, segmentos: RelatorioAvaliacao['segmentos']) {
  const artes = await Promise.all(VISTAS.map((v) => carregar(ARTE[v]))).catch(() => null) // sem a imagem, o PDF segue sem a figura
  const [w, h] = [TAMANHO.w * ESC, TAMANHO.h * ESC]
  const folga = 70
  const x0 = M + (LARG - 2 * w - folga) / 2
  f.espaco(artes ? h + 140 : 100)
  const ctx = f.ctx // depois do espaco(): se abriu folha nova, desenha nela
  if (artes) {
    VISTAS.forEach((v, i) => {
      ctx.save()
      ctx.translate(x0 + i * (w + folga), f.y + 10)
      ctx.scale(ESC, ESC)
      ctx.save()
      ctx.clip(new Path2D(SILHUETA[v]))
      ctx.globalAlpha = 0.7
      for (const s of segmentos) {
        const d = REGIOES[s.id][v]
        if (!d) continue
        ctx.fillStyle = corParte(s.veredito, !!s.fraca, true)
        ctx.fill(new Path2D(d))
      }
      ctx.restore()
      ctx.drawImage(artes[i], 0, 0, TAMANHO.w, TAMANHO.h)
      ctx.restore()
    })
    f.y += h + 50
    f.texto('Frente', x0 + w / 2, sans(24), MUDO, 'center')
    f.texto('Costas', x0 + w + folga + w / 2, sans(24), MUDO, 'center')
  }
  f.y += 46
  ctx.font = sans(26)
  const itens = LEGENDA.map((l) => ({ ...l, w: 36 + ctx.measureText(l.texto).width }))
  let x = M + (LARG - itens.reduce((t, i) => t + i.w + 40, -40)) / 2
  for (const i of itens) {
    ctx.fillStyle = corParte(i.veredito, false, true)
    ctx.beginPath()
    ctx.arc(x + 11, f.y - 9, 11, 0, Math.PI * 2)
    ctx.fill()
    f.texto(i.texto, x + 36, sans(26), TEXTO)
    x += i.w + 40
  }
  if (segmentos.some((s) => s.fraca)) {
    f.y += 38
    f.texto(LEGENDA_FRACA, PW / 2, sans(24), MUDO, 'center')
  }
  f.y += 40
}

type Folhas = Awaited<ReturnType<typeof criarFolhas>>

// Linha fina na cor da marca: separa um bloco do subtítulo seguinte (o subtítulo não "gruda" na tabela de cima).
function divisoria(f: Folhas) {
  f.espaco(40)
  f.y += 40
  f.caixa(M, LARG, 3, 1.5, C.m500)
}

// Ganhos por região em cartões, 2 por linha: faixa na cor do resultado, nome, medida com seta e a leitura embaixo.
const GAP = 24
const COL = (LARG - GAP) / 2
function cartoes(f: Folhas, segmentos: RelatorioAvaliacao['segmentos']) {
  const textoMax = COL - 60
  const linhas = (t: string, fonte: string, max: number) => {
    f.ctx.font = fonte
    return quebrar(f.ctx, t, textoMax).slice(0, max)
  }
  const itens = segmentos.map((s) => {
    const leitura = linhas(s.texto.charAt(0).toUpperCase() + s.texto.slice(1), sans(24), 2)
    const carga = s.carga ? linhas(`Carga: ${textoCarga(s.carga.melhor)}`, sans(22), 2) : []
    return { s, leitura, carga, h: 84 + leitura.length * 32 + carga.length * 30 + 20 }
  })
  for (let i = 0; i < itens.length; i += 2) {
    const par = itens.slice(i, i + 2)
    const h = Math.max(...par.map((p) => p.h))
    f.espaco(GAP + h)
    f.y += GAP
    const topo = f.y
    par.forEach(({ s, leitura, carga }, j) => {
      const x = M + j * (COL + GAP)
      const cor = corParte(s.veredito, !!s.fraca, true)
      f.y = topo
      f.caixa(x, COL, h, 20)
      const ctx = f.ctx // folha atual (f.espaco pode ter aberto outra)
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(x, topo, COL, h, 20)
      ctx.clip() // a faixa colorida acompanha o canto arredondado do cartão
      f.caixa(x, 12, h, 0, cor)
      ctx.restore()
      f.y = topo + 56
      f.texto(s.rotulo, x + 34, sans(30, 700), TEXTO)
      if (s.medida) {
        const d = s.medida.delta
        f.ctx.font = sans(32, 800)
        const w = f.ctx.measureText(d).width
        const forte = corParte(s.veredito, false, true) // número sempre na cor cheia (tom claro só na faixa) para ler bem
        f.texto(d, x + COL - 26, sans(32, 800), forte, 'right')
        const sentido: Seta = d.startsWith('+') ? 'sobe' : /^[−-]/.test(d) ? 'desce' : 'igual'
        seta(f.ctx, sentido, x + COL - 26 - w - 34, f.y, forte)
      }
      f.y += 8
      for (const l of leitura) {
        f.y += 32
        f.texto(l, x + 34, sans(24), MUDO)
      }
      for (const l of carga) {
        f.y += 30
        f.texto(l, x + 34, sans(22), MUDO)
      }
    })
    f.y = topo + h
  }
  f.y += 20
}

export type EntradaPdfAvaliacao = { r: RelatorioAvaliacao; aluno: string; comentario?: string }

// PDF da avaliação física: as mesmas folhas do relatório do ciclo (folhasPdf.ts), montado no aparelho.
// Dado de saúde: nada sai para a rede; o arquivo só existe quando a pessoa baixa ou compartilha.
export async function gerarPdfAvaliacao({ r, aluno, comentario }: EntradaPdfAvaliacao): Promise<Blob> {
  const f = await criarFolhas()
  const sub = `${primeiroNome(aluno)}${r.anterior ? ` · comparada com ${dataBR(r.anterior.data)}` : ''}`
  f.cabecalho(`${marca.nome} · Avaliação física`, `Avaliação de ${dataBR(r.atual.data)}`, sub)
  f.recado(comentario)
  f.numeros(r.destaques)

  f.titulo('Sua evolução')
  f.paragrafo(r.resumo.frase)
  if (r.anterior && r.segmentos.length) await corpo(f, r.segmentos)
  cartoes(f, r.segmentos)

  // Colunas da tabela: medida à esquerda; anterior, atual e diferença alinhadas à direita.
  const xAnt = M + LARG * 0.62
  const xAtual = M + LARG * 0.81
  for (const g of r.grupos) {
    f.espaco(40 + 120 + 34 + 58) // divisória, título, rótulos das colunas e a 1ª linha ficam na mesma folha
    divisoria(f)
    f.titulo(g.titulo)
    f.y += 34
    if (r.anterior) f.texto('anterior', xAnt, sans(24), MUDO, 'right')
    f.texto('atual', r.anterior ? xAtual : PW - M, sans(24), MUDO, 'right')
    if (r.anterior) f.texto('diferença', PW - M, sans(24), MUDO, 'right')
    for (const l of g.linhas) {
      f.espaco(58 + 34)
      f.y += 14
      f.caixa(M, LARG, 2, 1, TRILHA)
      f.y += 44
      f.texto(l.rotulo, M, sans(30), TEXTO)
      if (r.anterior) f.texto(l.anterior == null ? '—' : fmtMedida(l.anterior, l.un), xAnt, sans(30), MUDO, 'right')
      f.texto(fmtMedida(l.atual, l.un), r.anterior ? xAtual : PW - M, sans(30, 700), TEXTO, 'right')
      if (r.anterior) {
        if (l.delta == null) f.texto('—', PW - M, sans(30), MUDO, 'right')
        else {
          const cor = COR_TOM[l.leitura?.tom ?? 'neutro']
          const t = fmtDeltaUn(l)
          f.ctx.font = sans(30, 700)
          const w = f.ctx.measureText(t).width
          f.texto(t, PW - M, sans(30, 700), cor, 'right')
          seta(f.ctx, l.seta ?? 'igual', PW - M - w - 34, f.y, cor)
        }
      }
      if (l.leitura) f.paragrafo(l.leitura.texto, sans(24), MUDO, 34)
    }
  }

  f.y += 40
  f.espaco(40 + 10 + 36 * 2) // a divisória não fica sozinha no pé da folha
  divisoria(f)
  f.y += 10
  for (const t of r.texto) f.paragrafo(t, sans(24), MUDO, 36)
  f.paragrafo(`${r.res.fonte ? `Percentual de gordura: ${NOME_FONTE[r.res.fonte]}. ` : ''}Estimativa; não substitui avaliação médica.`, sans(24), MUDO, 36)
  return f.fechar()
}
