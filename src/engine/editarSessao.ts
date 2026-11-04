// Edição de um treino do dia (presencial), sem mexer no planejamento. Funções puras: devolvem uma SessaoEditada
// nova, gravada em `meso.sessoes[`${semana}-${treino}`]`. Cargas nunca são apagadas: ficam no slotId antigo.
import { metodosDaSessao, slotsDaSessao } from './sessao'
import type { AplicacaoMetodo, Meso, Metodo, SessaoEditada } from './tipos'

const SEQUENCIA: Metodo[] = ['Biset', 'Triset', 'Superset', 'Circuito']

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
