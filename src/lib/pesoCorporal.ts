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

const semAcento = (nome: string) => nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function fracaoPC(nome: string) {
  const n = semAcento(nome)
  return TABELA.find(([re]) => re.test(n))?.[1] ?? 1
}

// Exercícios em que o corpo É a carga: já vêm com "somar peso corporal" marcado (se o slot ainda não tem carga).
// Barra fixa, flexão de braços, abdominal no solo sem carga extra e agachamento sem implemento.
// Fica de fora: flexão nórdica/de joelhos/palmar, agachamento com barra/halter/Smith/máquina, abdominal de máquina/polia/peso.
export function corpoEhCarga(nome: string) {
  const n = semAcento(nome).trim()
  if (/^barra fixa|^flexao de bracos|^agachamento com peso do corpo$/.test(n)) return true
  return /^abdominal (infra no solo|tesoura|recolhimento)/.test(n) && !/peso|caneleira|anilha|halter|maquina|polia|cabo/.test(n)
}
