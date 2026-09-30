// Conversão entre os tipos do motor (src/engine) e os documentos do Firestore. Funções puras.
import type { Cargas, Meso, Registros, Slot } from '../engine'

// O Firestore proíbe array dentro de array. Por isso, no documento:
//   divisao:    Slot[][]            -> { t1: Slot[], t2: Slot[], … }       (t = treino, 1-based)
//   progressao: (number|null)[][]   -> { principais: { w1: […], w2: […] }, auxiliares: { w1: … } } (w = semana)
// Array dentro de mapa dentro de array (metodos[].cargaEtapa) é permitido e fica como está.
type Linhas<T> = Record<string, T[]>
//   progressaoExercicio: Record<'t-p', (number|null)[][]> -> { 't1-3': { w1: […], w2: … } }
export type MesoDoc = Omit<Meso, 'divisao' | 'progressao' | 'progressaoExercicio'> & {
  divisao: Linhas<Slot>
  progressaoExercicio?: Record<string, Linhas<number | null>>
  progressao: { principais: Linhas<number | null>; auxiliares: Linhas<number | null> }
}

// Documento completo em mesos/{id}, como gravado por salvarMeso.
export type MesoSalvo = MesoDoc & { alunoId: string; nome: string }

const paraMapa =<T>(linhas: T[][], p: string): Linhas<T> =>
  Object.fromEntries(linhas.map((l, i) => [`${p}${i + 1}`, l]))
// Pelo índice (não pela ordem das chaves): w10 vem depois de w9.
const deMapa = <T>(m: Linhas<T>, p: string): T[][] => Object.keys(m).map((_, i) => m[`${p}${i + 1}`])

export function mesoParaDoc(meso: Meso): MesoDoc {
  return {
    ...meso,
    // Sempre presente: ao editar (updateDoc), trocas removidas não podem sobrar no documento.
    trocas: meso.trocas ?? {},
    // Idem: "Voltar ao padrão" precisa apagar o override do documento.
    progressaoExercicio: Object.fromEntries(
      Object.entries(meso.progressaoExercicio ?? {}).map(([k, l]) => [k, paraMapa(l, 'w')]),
    ),
    divisao: paraMapa(meso.divisao, 't'),
    progressao: {
      principais: paraMapa(meso.progressao.principais, 'w'),
      auxiliares: paraMapa(meso.progressao.auxiliares, 'w'),
    },
  }
}

export function docParaMeso(d: MesoDoc): Meso {
  return {
    frequencia: d.frequencia,
    semanas: d.semanas,
    inicio: d.inicio,
    pausaS: d.pausaS,
    divisao: deMapa(d.divisao, 't'),
    trocas: d.trocas,
    progressao: {
      principais: deMapa(d.progressao.principais, 'w'),
      auxiliares: deMapa(d.progressao.auxiliares, 'w'),
    },
    metodos: d.metodos,
    ...(d.progressaoPct != null && { progressaoPct: d.progressaoPct }),
    ...(d.limiteReps != null && { limiteReps: d.limiteReps }),
    ...(d.tempoLimiteMin != null && { tempoLimiteMin: d.tempoLimiteMin }),
    ...(Object.keys(d.progressaoExercicio ?? {}).length > 0 && {
      progressaoExercicio: Object.fromEntries(
        Object.entries(d.progressaoExercicio!).map(([k, m]) => [k, deMapa(m, 'w')]),
      ),
    }),
  }
}

// Mesmo formato exigido por firestore.rules: {mesoId}_s{WW}_t{T}.
export const registroId = (mesoId: string, semana: number, treino: number) =>
  `${mesoId}_s${String(semana).padStart(2, '0')}_t${treino}`

// Coluna do motor (0-based) -> campo do documento (s1, s2, …).
export const caminhoCarga = (slotId: string, coluna: number) => `cargas.${slotId}.s${coluna + 1}`

type CargasDoc = Record<string, Record<string, number | null>>
export interface RegistroDoc {
  semana: number
  treino: number
  cargas?: CargasDoc
  reps?: CargasDoc // reps feitas (opcional), mesmo formato das cargas
}

export function docParaCargas(cargas: CargasDoc | undefined): Cargas {
  const r: Cargas = {}
  for (const [slotId, cols] of Object.entries(cargas ?? {})) {
    const arr: (number | null)[] = []
    for (const [k, kg] of Object.entries(cols)) {
      const n = /^s(\d+)$/.exec(k)?.[1]
      if (n) arr[Number(n) - 1] = kg
    }
    r[slotId] = Array.from(arr, (kg) => kg ?? null) // buracos viram null
  }
  return r
}

export const docParaReps = docParaCargas

export const docsParaRegistros = (docs: RegistroDoc[]): Registros =>
  Object.fromEntries(docs.map((d) => [`${d.semana}-${d.treino}`, docParaCargas(d.cargas)]))

export const docsParaRegistrosReps = (docs: RegistroDoc[]): Registros =>
  Object.fromEntries(docs.map((d) => [`${d.semana}-${d.treino}`, docParaReps(d.reps)]))

// notas/{alunoId}: anotação do aluno por exercício (chave = nome do exercício; '' = sem nota).
export type NotasDoc = { exercicios?: Record<string, string> }
