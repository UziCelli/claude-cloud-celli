import marca from '@marca/marca.json'
import { D_TROFEU } from '../../icones'
import { primeiroNome } from '../../lib/contato'
import type { RelatorioCiclo } from '../../lib/relatorio'
import { fmt } from '../coach/semana/format'
import { C, icone } from '../evolucao/cartaoStory'
import { periodoTexto, volumeTexto } from './cartaoRelatorio'
import { criarFolhas, disp, M, MUDO, PW, sans, TEXTO } from './folhasPdf'

export type EntradaPdf = { r: RelatorioCiclo; aluno: string; comentario?: string }

export async function gerarPdfRelatorio({ r, aluno, comentario }: EntradaPdf): Promise<Blob> {
  const f = await criarFolhas()
  f.cabecalho(`${marca.nome} · Relatório do ciclo`, r.nome || 'Ciclo', `${primeiroNome(aluno)} · ${periodoTexto(r)}`)
  f.recado(comentario)

  f.titulo('Aderência')
  f.y += 56
  f.texto(`${r.aderenciaPct}%`, M, disp(84, 900), C.m600)
  f.texto(`${r.feitos} de ${r.previstos} treinos`, M + 270, sans(36), TEXTO)
  f.y += 34
  f.barra(r.aderenciaPct / 100, C.m500)
  f.y += 46
  f.texto(`${r.semanasCompletas} de ${r.semanas} ${r.semanas === 1 ? 'semana completa' : 'semanas completas'}`, M, sans(30), MUDO)
  f.y += 20

  f.numeros([
    { valor: volumeTexto(r.volumeKg), rotulo: 'volume total' },
    { valor: String(r.movimentos), rotulo: 'movimentos' },
    { valor: r.tempoMedioMin == null ? '—' : `${r.tempoMedioMin} min`, rotulo: 'tempo médio' },
  ])

  if (r.porSemana.length) {
    f.titulo('Semana a semana')
    for (const s of r.porSemana) {
      f.espaco(130)
      f.y += 44
      f.texto(`Semana ${s.semana}`, M, sans(32, 700), TEXTO)
      f.texto(`${s.feitos}/${s.previstos} treinos`, PW - M, sans(32), MUDO, 'right')
      f.y += 20
      f.barra(s.previstos ? s.feitos / s.previstos : 0, C.m500)
      f.y += 38
      f.texto(`${volumeTexto(s.volumeKg)} · ${s.movimentos} movimentos`, M, sans(26), MUDO)
      f.y += 10
    }
  }

  if (r.evolucoes.length) {
    f.titulo('Maiores evoluções')
    for (const e of r.evolucoes) {
      f.espaco(110)
      f.y += 44
      f.texto(`${e.nome}: ${fmt(e.de)} → ${fmt(e.ate)} kg (+${Math.round(e.pct).toLocaleString('pt-BR')}%)`, M, sans(32), TEXTO)
      f.y += 20
      f.barra(e.pct / r.evolucoes[0].pct, '#22c55e')
      f.y += 14
    }
  }

  if (r.recordes.length) {
    f.titulo(`Recordes (${r.recordes.length})`)
    for (const x of r.recordes) {
      f.espaco(70)
      f.y += 52
      icone(f.ctx, D_TROFEU, M, f.y, 40, '#d97706')
      f.texto(x.nome, M + 60, sans(32), TEXTO)
      f.texto(`${fmt(x.kg)} kg · sem. ${x.semana}`, PW - M, sans(30), MUDO, 'right')
    }
  }

  return f.fechar()
}
