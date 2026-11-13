import type { Slot } from './tipos'

// Nomes canônicos: domínio puro, sem dependência de React, Firebase ou JSON do aplicativo.
// O teste de catálogo garante correspondência exata com data/isometricos.json e exercicios.json.
export const NOMES_ISOMETRICOS: readonly string[] = [
  'Agachamento Isométrico na Parede (cadeirinha)',
  'Agachamento Isométrico Livre',
  'Afundo Isométrico',
  'Búlgaro Isométrico',
  'Elevação Pélvica Isométrica',
  'Elevação Pélvica Unilateral Isométrica',
  'Cadeira Extensora Isométrica',
  'Mesa Flexora Isométrica',
  'Ponte de Posteriores Isométrica (calcanhar no banco)',
  'Prancha Copenhagen Isométrica',
  'Adução Isométrica com Bola',
  'Flexão de Braços Isométrica (meio do movimento)',
  'Suspensão na Barra Isométrica (Dead Hang)',
  'Suspensão Ativa na Barra Isométrica (escápulas)',
  'Barra Fixa Isométrica (queixo acima da barra)',
  'Remada Isométrica',
  'Panturrilha em Pé Isométrica',
  'Prancha Frontal Isométrica (cotovelos)',
  'Prancha Frontal Isométrica (mãos)',
  'Prancha Lateral Isométrica',
  'Prancha Invertida Isométrica',
  'Canoa Isométrica (Hollow Hold)',
  'Superman Isométrico',
  'Perdigueiro Isométrico',
  'Pallof Press Isométrico na Polia',
  'Abdominal em L Isométrico (L-sit)',
  'Dead Bug Isométrico',
  'Elevação Lateral Isométrica',
  'Pegada Isométrica com Halteres (Farmer Hold)',
  'Rosca Isométrica a 90º'
]
const normalizar = (n: string) => n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()
const nomes = new Set(NOMES_ISOMETRICOS.map(normalizar))
export const isometrico = (slot: Pick<Slot, 'nome'>): boolean => nomes.has(normalizar(slot.nome))
export const LIMITE_ISOMETRIA_S = 60
export const linhaIsometrica = (): (number | null)[] => [30, 30, 30, null, null, null]
export const progressaoIsometrica = (semanas: number) => Array.from({ length: semanas }, linhaIsometrica)
