import { describe, expect, it } from 'vitest'
import { isometrico } from './isometria'
import { linhaPrescrita, prescreverSessao } from './sessao'
import { metricasSessao, metricasSemana } from './metricas'
import { progressaoAutomatica, reduzirVolume, polimento } from './volume'
import type { Meso } from './tipos'
const prancha = { slotId: 'p', nome: 'Prancha Frontal Isométrica (cotovelos)' }
const base = (): Meso => ({ frequencia: 1, semanas: 3, inicio: '2026-11-13', pausaS: 60,
  divisao: [[{slotId:'a',nome:'Supino Reto Barra'},prancha]],
  progressao: {principais:[[8,8,8],[8,8,8],[8,8,8]],auxiliares:[[8,8,8],[8,8,8],[8,8,8]]},metodos:[] })
describe('isometria', () => {
  it('identifica por nome do catálogo, sem transformar exercícios comuns', () => {
    expect(isometrico(prancha)).toBe(true)
    expect(isometrico({nome:'Prancha inventada'})).toBe(false)
  })
  it('prescreve 3 × 30 s sem herdar as reps do treino e respeita linha própria', () => {
    expect(linhaPrescrita(base(),1,1,2).filter(x=>x!=null)).toEqual([30,30,30])
    const m=base(); m.progressaoExercicio={p:[[40,40]]}
    expect(prescreverSessao(m,1,1)!.exercicios[1].reps).toEqual([40,40])
  })
  it('segundos feitos substituem os prescritos, fora de movimentos e kg×reps', () => {
    const s=prescreverSessao(base(),1,1)!
    const m=metricasSessao(s,{a:[10,10,10],p:[20,20,20]},{p:[25,0,35]})
    expect(m.movimentos).toBe(24); expect(m.volume).toBe(240)
    expect(m.tempoSobTensaoS).toBe(60)
    expect(metricasSemana([{sessao:s,cargas:{a:[10,10,10],p:[20]},reps:{p:[25,0,35]}}]).tempoSobTensaoS).toBe(60)
  })
  it('progressão de todos mantém isometria em segundos com teto 60, abrindo outra série', () => {
    const m=base(); m.progressaoExercicio={p:[[60,60,60],[60,60,60],[60,60,60]]}
    const novo=progressaoAutomatica(m,{pct:10,de:2,ate:3,alvo:{tipo:'todos'}})
    expect(prescreverSessao(novo,2,1)!.exercicios[1].reps).toEqual([50,50,49,49])
    expect(prescreverSessao(novo,2,1)!.exercicios[0].reps).toEqual([9,9,9])
  })
  it('aplica progressão à isometria mesmo sem override salvo', () => {
    const m=progressaoAutomatica(base(),{pct:10,de:2,ate:2,alvo:{tipo:'todos'}})
    expect(prescreverSessao(m,2,1)!.exercicios[1].reps).toEqual([33,33,33])
  })
  it('redução e polimento usam limite por exercício; 6 séries nunca ultrapassam 60 s', () => {
    const m=base(); m.progressaoExercicio={p:[[60,60,60,60,60,60]]}
    for(const novo of [progressaoAutomatica(m,{pct:100,de:2,ate:3,alvo:{tipo:'todos'}}),reduzirVolume(m,{pct:10,de:2,ate:2,alvo:{tipo:'todos'}}),polimento(m,{pct:10,semanas:[2],alvo:{tipo:'todos'}})]) {
      expect(prescreverSessao(novo,2,1)!.exercicios[1].reps.every(s=>s<=60)).toBe(true)
    }
  })
  it('isometria em adição, troca e edição do dia não herda número de repetições', () => {
    const m=base(); m.adicoes={'1-1':[{...prancha,slotId:'extra'}]}
    expect(prescreverSessao(m,1,1)!.exercicios[2].reps).toEqual([30,30,30])
    m.sessoes={'1-1':{semana:1,treino:1,exercicios:[{...prancha,de:1}],metodos:[]}}
    expect(prescreverSessao(m,1,1)!.exercicios[0].reps).toEqual([30,30,30])
  })
})

it('troca e adição isométrica progridem sem misturar a progressão dinâmica da posição', () => {
  const m=base()
  m.trocas={'2-1-1':{...prancha,slotId:'troca'}}
  m.adicoes={'2-1':[{...prancha,slotId:'adicao'}]}
  const novo=progressaoAutomatica(m,{pct:10,de:2,ate:3,alvo:{tipo:'todos'}})
  expect(prescreverSessao(novo,2,1)!.exercicios[0].reps).toEqual([33,33,33])
  expect(prescreverSessao(novo,2,1)!.exercicios[2].reps).toEqual([33,33,33])
  expect(prescreverSessao(novo,3,1)!.exercicios[0].reps).toEqual([10,10,10])
})
