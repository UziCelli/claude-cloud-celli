// Teste "golden": valores extraídos da planilha real (aba Meso 3x, sem métodos ativos).
import { describe, expect, it } from 'vitest'
import fx from './__fixtures__/meso3x.json'
import { metaCiclo, metaRobusta, metricasSemana, metricasSessao, prescreverSessao } from './index'
import type { Meso } from './index'

const divisao = fx.divisao as Record<string, string[]>
const meso: Meso = {
  frequencia: fx.config.frequencia,
  semanas: fx.config.semanas,
  inicio: fx.config.inicio.slice(0, 10),
  pausaS: fx.config.pausaS,
  divisao: Array.from({ length: fx.config.frequencia }, (_, t) =>
    divisao[`treino${t + 1}`].map((nome, p) => ({ slotId: `t${t + 1}p${p + 1}`, nome })),
  ),
  progressao: {
    principais: fx.progressao.principais.map((l) => l.series),
    auxiliares: fx.progressao.auxiliares.map((l) => l.series),
  },
  metodos: [],
}

describe('golden: Meso 3x da planilha', () => {
  for (const sem of fx.semanas)
    for (const tr of sem.treinos)
      it(`semana ${sem.semana} treino ${tr.treino}`, () => {
        const s = prescreverSessao(meso, sem.semana, tr.treino)!
        expect(s.pausaS).toBe(tr.pausaS)
        expect(s.tempoMin).toBeCloseTo(tr.tempoSessaoMin, 6) // 10 + (72 + 3·120·3)/60 = 29.2
        expect(s.exercicios.map((e) => [e.pos, e.slot.nome, e.reps, e.rotulo])).toEqual(
          tr.exercicios.map((e) => [e.pos, e.exercicio, e.reps.filter((r) => r !== null), e.rotulo ?? '']),
        )
        const m = metricasSessao(s, {})
        expect(m.exercicios.map((e) => e.movimentos)).toEqual(tr.exercicios.map((e) => e.movimentos))
        expect(m.movimentos).toBe(tr.movimentosSessao) // 72
      })

  it('monitoramento semanal e meta robusta', () => {
    const semanas = fx.monitoramento.semanas.map((w) => {
      const sessoes = Array.from({ length: meso.frequencia }, (_, t) => ({
        sessao: prescreverSessao(meso, w.semana, t + 1)!,
        cargas: {},
      }))
      expect(sessoes[0].sessao.inicioSemana).toBe(w.dataInicial.slice(0, 10))
      const m = metricasSemana(sessoes)
      expect(m).toEqual({
        movimentos: w.movimentos, // 216
        cargaMedia: w.cargaMedia,
        volume: w.volume,
        sessoesAtivas: w.sessoesAtivas,
        status: w.status,
      })
      return m.movimentos
    })
    const meta = metaRobusta(semanas)
    expect(meta).toBeCloseTo(fx.monitoramento.resumo.as66, 9) // 216
    expect(metaCiclo(meta, meso.semanas)).toBeCloseTo(fx.monitoramento.resumo.metaRobustaMovimentos, 9) // 216·4 = 864
  })
})
