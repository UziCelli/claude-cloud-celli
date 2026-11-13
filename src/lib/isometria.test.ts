import { describe, expect, it } from 'vitest'
import catalogo from '../data/exercicios.json'
import ids from '../data/isometricos.json'
import { isometrico, NOMES_ISOMETRICOS } from '../engine/isometria'
import { metricasSessao, prescreverSessao, type Meso } from '../engine'
import { comProgressaoIsometrica } from '../features/coach/meso/util'
const todos = catalogo.flatMap(g => g.exercicios)
describe('catálogo de isometria', () => {
  it('ids, nomes e classificador coincidem exatamente; fora do catálogo não é inferido', () => {
    expect(new Set(ids).size).toBe(ids.length)
    expect(todos.filter(e => isometrico(e)).map(e => e.id).sort()).toEqual([...ids].sort())
    expect(todos.filter(e => ids.includes(e.id)).map(e => e.nome).sort()).toEqual([...NOMES_ISOMETRICOS].sort())
  })
  it.each(ids)('%s: 3×30 s não acrescenta movimentos nem volume, mesmo com carga', id => {
    const e = todos.find(e => e.id === id)!
    const m: Meso = { frequencia:1,semanas:1,inicio:'2026-11-13',pausaS:60,divisao:[[{slotId:'x',nome:e.nome}]],progressao:{principais:[[8,8]],auxiliares:[[8,8]]},metodos:[] }
    const s = prescreverSessao(m,1,1)!
    const metricas = metricasSessao(s,{x:[10,10,10]})
    expect(metricas.movimentos).toBe(0); expect(metricas.volume).toBeNull(); expect(metricas.tempoSobTensaoS).toBe(90)
    expect(comProgressaoIsometrica(m).x[0]).toEqual([30,30,30,null,null,null])
  })
})

it('histórico e relatório mantêm segundos separados de movimentos e carga', async () => {
  const { Timestamp } = await import('firebase/firestore')
  const { historicoExercicios, resumoTreino } = await import('./evolucao')
  const { relatorioCiclo } = await import('./relatorio')
  const meso:Meso={frequencia:1,semanas:1,inicio:'2026-11-13',pausaS:60,divisao:[[{slotId:'x',nome:'Prancha Frontal Isométrica (cotovelos)'}]],progressao:{principais:[[8,8,8]],auxiliares:[[8,8,8]]},metodos:[]}
  const mesos=[{id:'m',nome:'Isometria',meso}]
  const registros=[{mesoId:'m',semana:1,treino:1,realizado:true,realizadoEm:Timestamp.fromDate(new Date('2026-11-13T18:00Z')),reps:{x:{s1:25,s2:0,s3:35}},cargas:{x:{s1:10,s2:10,s3:10}}}]
  const hist=historicoExercicios(mesos,registros)
  expect(hist['Prancha Frontal Isométrica (cotovelos)'][0]).toMatchObject({tempoSobTensaoS:60,movimentos:0,volume:null})
  expect(resumoTreino(hist,{mesoId:'m',semana:1,treino:1})).toMatchObject({tempoSobTensaoS:60,volumeKg:0})
  expect(relatorioCiclo(mesos,registros,'m',new Date('2026-11-20T18:00Z'))).toMatchObject({tempoSobTensaoS:60,movimentos:0,volumeKg:0})
})
