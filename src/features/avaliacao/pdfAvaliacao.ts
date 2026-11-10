import marca from '@marca/marca.json'
import { dataBR, fmtDeltaUn, fmtMedida, NOME_FONTE, type RelatorioAvaliacao, type Seta, type Tom } from '../../lib/avaliacao'
import { primeiroNome } from '../../lib/contato'
import { criarFolhas, LARG, M, MUDO, PW, sans, TEXTO, TRILHA } from '../relatorio/folhasPdf'

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

export type EntradaPdfAvaliacao = { r: RelatorioAvaliacao; aluno: string; comentario?: string }

// PDF da avaliação física: as mesmas folhas do relatório do ciclo (folhasPdf.ts), montado no aparelho.
// Dado de saúde: nada sai para a rede; o arquivo só existe quando a pessoa baixa ou compartilha.
export async function gerarPdfAvaliacao({ r, aluno, comentario }: EntradaPdfAvaliacao): Promise<Blob> {
  const f = await criarFolhas()
  const sub = `${primeiroNome(aluno)}${r.anterior ? ` · comparada com ${dataBR(r.anterior.data)}` : ''}`
  f.cabecalho(`${marca.nome} · Avaliação física`, `Avaliação de ${dataBR(r.atual.data)}`, sub)
  f.recado(comentario)
  f.numeros(r.destaques)

  f.titulo('Resumo')
  f.paragrafo(r.resumo.frase)
  const mudou = [...r.resumo.ganhos.map((i) => ['Ganho', i] as const), ...r.resumo.observar.map((i) => ['A observar', i] as const)]
  if (mudou.length) {
    f.titulo('O que mais mudou')
    for (const [tipo, i] of mudou) f.paragrafo(`${tipo}: ${i.rotulo} ${i.delta}. ${i.texto}`, sans(28), TEXTO, 40)
  }

  f.titulo('Sua evolução')
  for (const p of r.texto) {
    f.paragrafo(p)
    f.y += 14
  }

  // Colunas da tabela: medida à esquerda; anterior, atual e diferença alinhadas à direita.
  const xAnt = M + LARG * 0.62
  const xAtual = M + LARG * 0.81
  for (const g of r.grupos) {
    f.espaco(120 + 34 + 58) // título, rótulos das colunas e a 1ª linha ficam na mesma folha
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

  f.y += 30
  f.paragrafo(`${r.res.fonte ? `Percentual de gordura: ${NOME_FONTE[r.res.fonte]}. ` : ''}Estimativa; não substitui avaliação médica.`, sans(24), MUDO, 36)
  return f.fechar()
}
