// Busca no catálogo de exercícios (combobox do coach). Função pura.
import catalogo from '../data/exercicios.json'

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const itens = catalogo.flatMap((g) => g.exercicios.map((e) => ({ nome: e.nome, grupo: g.grupo, n: norm(e.nome) })))

export function buscarExercicios(texto: string, limite = 8): { nome: string; grupo: string }[] {
  const t = norm(texto).trim()
  const termos = t.split(/\s+/).filter(Boolean)
  if (!termos.length) return []
  const palavras = (n: string) => n.split(/\s+/)
  // 0 = nome começa com o texto · 1 = palavra começa com o termo (todos) · 2 = contém
  const nota = (n: string) => (n.startsWith(t) ? 0 : termos.every((x) => palavras(n).some((p) => p.startsWith(x))) ? 1 : 2)
  return itens
    .filter((i) => termos.every((x) => i.n.includes(x)))
    .map((i) => ({ i, k: nota(i.n) }))
    .sort((a, b) => a.k - b.k) // estável: mantém a ordem do catálogo dentro da mesma nota
    .slice(0, limite)
    .map(({ i }) => ({ nome: i.nome, grupo: i.grupo }))
}
