import marca from '@marca/marca.json'
import { dataBR, fmtDelta, fmtMedida, NOME_FONTE, type RelatorioAvaliacao } from '../../lib/avaliacao'
import { primeiroNome } from '../../lib/contato'
import { criarFolhas, LARG, M, MUDO, PW, sans, TEXTO, TRILHA } from '../relatorio/folhasPdf'

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
      f.espaco(58)
      f.y += 14
      f.caixa(M, LARG, 2, 1, TRILHA)
      f.y += 44
      f.texto(l.rotulo, M, sans(30), TEXTO)
      if (r.anterior) f.texto(l.anterior == null ? '—' : fmtMedida(l.anterior, l.un), xAnt, sans(30), MUDO, 'right')
      f.texto(fmtMedida(l.atual, l.un), r.anterior ? xAtual : PW - M, sans(30, 700), TEXTO, 'right')
      if (r.anterior) f.texto(l.delta == null ? '—' : fmtDelta(l.delta), PW - M, sans(30), TEXTO, 'right')
    }
  }

  f.y += 30
  f.paragrafo(`${r.res.fonte ? `Percentual de gordura: ${NOME_FONTE[r.res.fonte]}. ` : ''}Estimativa; não substitui avaliação médica.`, sans(24), MUDO, 36)
  return f.fechar()
}
