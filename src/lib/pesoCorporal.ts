// Fração do peso do corpo que o exercício move (plano-volume.md, seção 5).
// Fontes: Winter 2009 (massa dos segmentos); Ebben et al. 2011 (flexões).
const TABELA: [RegExp, number][] = [
  [/flexao.*joelho/, 0.49],
  [/flexao/, 0.64],
  [/barra fixa|pull-?up|chin-?up/, 0.95],
  [/paralela|mergulho/, 0.9],
  [/remada invertida|australiana/, 0.6],
  [/agachamento|afundo|passada|bulgaro|avanco|step|subida/, 0.88],
  [/panturrilha/, 0.95],
  [/lombar|hiperextensao|banco romano/, 0.55],
  [/elevacao pelvica|ponte|gluteo no solo/, 0.5],
  [/abdominal/, 0.3],
]

export function fracaoPC(nome: string) {
  const n = nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  return TABELA.find(([re]) => re.test(n))?.[1] ?? 1
}
