// Edição de um treino do dia (presencial), sem mexer no planejamento. Funções puras: devolvem uma SessaoEditada
// nova, gravada em `meso.sessoes[`${semana}-${treino}`]`. Cargas nunca são apagadas: ficam no slotId antigo.
import { metodosDaSessao, slotsDaSessao } from './sessao'
import type { AplicacaoMetodo, Escopo, Meso, Metodo, SessaoEditada } from './tipos'

const SEQUENCIA: Metodo[] = ['Biset', 'Triset', 'Superset', 'Circuito']

// Séries que um método cobre (mesma lista do editor de métodos).
export const ESCOPOS: Escopo[] = [
  'Todas as séries',
  'Série específica',
  'Primeiras 2 séries',
  'Últimas 2 séries',
  'Primeiras 3 séries',
  'Últimas 3 séries',
  'Primeiras 4 séries',
  'Últimas 4 séries',
]
// Só as que fazem sentido para `n` séries ("Primeiras 3" com 3 séries = todas).
export const escoposPara = (n: number) => ESCOPOS.filter((e) => !/\d/.test(e) || Number(e.split(' ')[1]) < n)

// Valores iniciais de cada método (os mesmos do editor de métodos). `n` = séries do exercício.
export function padraoMetodo(metodo: Metodo, semana: number, treino: number, exercicio: number, n: number): AplicacaoMetodo {
  const base = { ativo: true, semana, treino, exercicio, metodo }
  switch (metodo) {
    case 'Dropset':
      return { ...base, escopo: 'Série específica', serie: n || 1, pausaInternaS: 10, blocos: 1, etapas: 1, reducaoCarga: 20 }
    case 'Rest-pause':
      return { ...base, escopo: 'Série específica', serie: n || 1, pausaInternaS: 20, blocos: 2 }
    case 'Clusterset':
      return { ...base, escopo: 'Todas as séries', pausaInternaS: 30, blocos: 3 }
    case 'Circuito':
      return { ...base, escopo: 'Todas as séries', pausaInternaS: 20, blocos: 3, grupo: 1 }
    default: // Biset, Triset, Superset
      return { ...base, escopo: 'Todas as séries', pausaInternaS: 15, blocos: 1, grupo: 1 }
  }
}

// Ponto de partida: a edição já salva, senão uma cópia do que o plano prescreve para o dia.
export function iniciarEdicao(meso: Meso, semana: number, treino: number): SessaoEditada {
  return (
    meso.sessoes?.[`${semana}-${treino}`] ?? {
      semana,
      treino,
      exercicios: slotsDaSessao(meso, semana, treino),
      metodos: metodosDaSessao(meso, semana, treino),
    }
  )
}

// Troca o exercício da posição por outro (id novo): progressão, pausa e métodos da posição continuam.
export function trocarExercicio(s: SessaoEditada, pos: number, nome: string, slotId: string): SessaoEditada {
  const atual = s.exercicios[pos - 1]
  if (!atual || !nome.trim() || nome.trim() === atual.nome.trim()) return s
  return { ...s, exercicios: s.exercicios.map((e, i) => (i === pos - 1 ? { ...e, slotId, nome: nome.trim() } : e)) }
}

export function adicionarExercicio(s: SessaoEditada, nome: string, slotId: string): SessaoEditada {
  if (!nome.trim()) return s
  return { ...s, exercicios: [...s.exercicios, { slotId, nome: nome.trim() }] }
}

// Grupo de sequência (Biset…) com menos de 2 exercícios deixa de existir.
const semGruposSozinhos = (metodos: AplicacaoMetodo[]) =>
  metodos.filter(
    (m) => !SEQUENCIA.includes(m.metodo) || metodos.filter((x) => x.metodo === m.metodo && x.grupo === m.grupo).length >= 2,
  )

// Tira o exercício do dia: os métodos dele saem e os das posições seguintes descem uma posição.
export function removerExercicio(s: SessaoEditada, pos: number): SessaoEditada {
  if (!s.exercicios[pos - 1]) return s
  const metodos = s.metodos
    .filter((m) => m.exercicio !== pos)
    .map((m) => (m.exercicio > pos ? { ...m, exercicio: m.exercicio - 1 } : m))
  return { ...s, exercicios: s.exercicios.filter((_, i) => i !== pos - 1), metodos: semGruposSozinhos(metodos) }
}

// Põe o método no exercício. Biset/Triset/Superset/Circuito: `juntos` = posições que entram no mesmo grupo (novo).
export function adicionarMetodo(s: SessaoEditada, pos: number, metodo: Metodo, n: number, juntos: number[] = []): SessaoEditada {
  if (s.metodos.some((m) => m.exercicio === pos && m.metodo === metodo)) return s
  if (!SEQUENCIA.includes(metodo)) return { ...s, metodos: [...s.metodos, padraoMetodo(metodo, s.semana, s.treino, pos, n)] }
  const grupo = Math.max(0, ...s.metodos.filter((m) => m.metodo === metodo).map((m) => m.grupo ?? 0)) + 1
  const novas = [pos, ...juntos.filter((p) => p !== pos)].map((p) => ({ ...padraoMetodo(metodo, s.semana, s.treino, p, n), grupo }))
  return { ...s, metodos: [...s.metodos, ...novas] }
}

// Tira o método do exercício. Se for de grupo (Biset…), tira do grupo inteiro.
export function removerMetodo(s: SessaoEditada, pos: number, metodo: Metodo): SessaoEditada {
  const alvo = s.metodos.filter((m) => m.exercicio === pos && m.metodo === metodo)
  if (!alvo.length) return s
  const sai = (m: AplicacaoMetodo) =>
    alvo.includes(m) || (SEQUENCIA.includes(metodo) && m.metodo === metodo && alvo.some((a) => a.grupo === m.grupo))
  return { ...s, metodos: s.metodos.filter((m) => !sai(m)) }
}

// Troca as séries que o método cobre no exercício (no grupo inteiro, se for Biset…). `serie` só em "Série específica".
export function mudarSeries(s: SessaoEditada, pos: number, metodo: Metodo, escopo: Escopo, serie?: number): SessaoEditada {
  const alvo = s.metodos.filter((m) => m.exercicio === pos && m.metodo === metodo)
  const muda = (m: AplicacaoMetodo) =>
    alvo.includes(m) || (SEQUENCIA.includes(metodo) && m.metodo === metodo && alvo.some((a) => a.grupo === m.grupo))
  const nova = escopo === 'Série específica' ? serie : undefined
  if (!alvo.length || s.metodos.every((m) => !muda(m) || (m.escopo === escopo && m.serie === nova))) return s
  return {
    ...s,
    metodos: s.metodos.map((m) => {
      if (!muda(m)) return m
      const { serie: _s, ...resto } = m
      return nova != null ? { ...resto, escopo, serie: nova } : { ...resto, escopo }
    }),
  }
}

// Série onde o drop cai (como no motor): a específica (até n), senão a última que o escopo cobre.
export function serieDoDrop(m: AplicacaoMetodo, n: number): number {
  if (m.escopo === 'Série específica') return Math.min(m.serie || n, n)
  if (m.escopo.startsWith('Primeiras')) return Math.min(Number(m.escopo.split(' ')[1]), n)
  return n
}

// Liga/desliga o drop numa série do exercício (drop em várias séries). A série nova copia os ajustes do
// primeiro drop (etapas, redução, pausa). Drops em outros escopos viram "Série específica" onde já caíam.
// Nunca tira o último: para tirar o Dropset todo, removerMetodo.
export function alternarSerieDropset(s: SessaoEditada, pos: number, serie: number, n: number): SessaoEditada {
  const eDrop = (m: AplicacaoMetodo) => m.exercicio === pos && m.metodo === 'Dropset'
  const drops = s.metodos.filter(eDrop)
  if (!drops.length) return s
  const normal = s.metodos.map((m) => (eDrop(m) && m.escopo !== 'Série específica' ? { ...m, escopo: 'Série específica' as Escopo, serie: serieDoDrop(m, n) } : m))
  const naSerie = normal.filter((m) => eDrop(m) && serieDoDrop(m, n) === serie)
  if (naSerie.length) {
    if (naSerie.length === normal.filter(eDrop).length) return s
    return { ...s, metodos: normal.filter((m) => !naSerie.includes(m)) }
  }
  return { ...s, metodos: [...normal, { ...normal.find(eDrop)!, serie }] }
}
