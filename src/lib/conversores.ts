// Conversão entre os tipos do motor (src/engine) e os documentos do Firestore. Funções puras.
import { prescreverSessao, type Cargas, type Meso, type Registros, type Slot } from '../engine'

// O Firestore proíbe array dentro de array. Por isso, no documento:
//   divisao:    Slot[][]            -> { t1: Slot[], t2: Slot[], … }       (t = treino, 1-based)
//   progressao: (number|null)[][]   -> { principais: { w1: […], w2: […] }, auxiliares: { w1: … } } (w = semana)
// Array dentro de mapa dentro de array (metodos[].cargaEtapa) é permitido e fica como está.
type Linhas<T> = Record<string, T[]>
//   progressao.padrao (opcional): igual a principais/auxiliares -> { w1: […], w2: … }
//   progressaoExercicio: Record<slotId, (number|null)[][]> -> { [slotId]: { w1: […], w2: … } }
export type MesoDoc = Omit<Meso, 'divisao' | 'progressao' | 'progressaoExercicio'> & {
  divisao: Linhas<Slot>
  progressaoExercicio?: Record<string, Linhas<number | null>>
  progressao: { principais: Linhas<number | null>; auxiliares: Linhas<number | null>; padrao?: Linhas<number | null> }
}

// Documento completo em mesos/{id}, como gravado por salvarMeso.
export type MesoSalvo = MesoDoc & { alunoId: string; nome: string; adaptadoEm?: unknown }

const paraMapa =<T>(linhas: T[][], p: string): Linhas<T> =>
  Object.fromEntries(linhas.map((l, i) => [`${p}${i + 1}`, l]))
// Pelo índice (não pela ordem das chaves): w10 vem depois de w9.
const deMapa = <T>(m: Linhas<T>, p: string): T[][] => Object.keys(m).map((_, i) => m[`${p}${i + 1}`])

export function mesoParaDoc(meso: Meso): MesoDoc {
  return {
    ...meso,
    // Sempre presente: ao editar (updateDoc), trocas removidas não podem sobrar no documento.
    trocas: meso.trocas ?? {},
    // Idem: sem agenda grava [] (nunca undefined); docParaMeso lê [] como "sem dias".
    dias: meso.dias ?? [],
    // Idem: "Voltar ao padrão" precisa apagar o override do documento.
    progressaoExercicio: Object.fromEntries(
      Object.entries(meso.progressaoExercicio ?? {}).map(([k, l]) => [k, paraMapa(l, 'w')]),
    ),
    divisao: paraMapa(meso.divisao, 't'),
    progressao: {
      principais: paraMapa(meso.progressao.principais, 'w'),
      auxiliares: paraMapa(meso.progressao.auxiliares, 'w'),
      // Sem `padrao` o campo não existe (o Firestore recusa undefined).
      ...(meso.progressao.padrao && { padrao: paraMapa(meso.progressao.padrao, 'w') }),
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
      ...(d.progressao.padrao && { padrao: deMapa(d.progressao.padrao, 'w') }),
    },
    metodos: d.metodos,
    ...(d.progressaoPct != null && { progressaoPct: d.progressaoPct }),
    ...(d.limiteReps != null && { limiteReps: d.limiteReps }),
    ...(d.tempoLimiteMin != null && { tempoLimiteMin: d.tempoLimiteMin }),
    ...((d.dias?.length ?? 0) > 0 && { dias: d.dias }),
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
  pc?: Record<string, number> // peso do corpo somado por exercício (slotId -> kg; 0 = desligado)
  realizado?: boolean
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

const arred = (x: number) => Math.round(x * 100) / 100

// ÚNICA leitura de cargas de um registro (use sempre esta; nunca docParaCargas direto em tela ou cálculo).
// Convenção atual: a célula guarda o TOTAL (extra digitado + pc.<slot>). Versões antigas do app ainda
// rodam em abas e celulares abertos e gravaram de outro jeito; os dados não são reescritos, só lidos assim.
// Com pc[slot] > 0:
//  (i)   célula com c < pc: formato antigo (só o extra, pc marcado depois de digitar) -> conta c + pc.
//        No formato novo c >= pc sempre. Vale para todas as colunas, inclusive drop.
//  (ii)  célula vazia de série prescrita (coluna < n): conta pc se o registro foi concluído OU se há reps
//        feitas naquela série (versão sem `preencherCorpo`). Colunas de drop (>= n) nunca são preenchidas.
//  (iii) célula com c >= pc: fica como está.
// Sem pc (ou pc = 0) nada muda. `n` = séries prescritas por slotId; sem ele, n = maior índice com dado
// em cargas ou reps do slot (série vazia depois da última com dado não é conhecida, e uma coluna de
// drop com dado passaria por série). Por isso as telas passam o meso (ver docsParaRegistros).
export function normalizarCargas(
  doc: Pick<RegistroDoc, 'cargas' | 'reps' | 'pc' | 'realizado'>,
  n: Record<string, number> = {},
): Cargas {
  const r = docParaCargas(doc.cargas)
  const reps = docParaReps(doc.reps)
  for (const [slot, pc] of Object.entries(doc.pc ?? {})) {
    if (!(pc > 0)) continue
    const cs = r[slot] ?? []
    const rs = reps[slot] ?? []
    const prescritas = n[slot] ?? Math.max(cs.length, rs.length)
    r[slot] = Array.from({ length: Math.max(cs.length, rs.length, prescritas) }, (_, k) => {
      const c = cs[k] ?? null
      if (c != null) return c < pc ? arred(c + pc) : c
      return k < prescritas && (doc.realizado || (rs[k] ?? 0) > 0) ? pc : null
    })
  }
  return r
}

// Séries prescritas (sem drop) de cada exercício do treino; só calculado quando o registro tem pc.
const seriesDe = (meso: Meso | undefined, d: RegistroDoc): Record<string, number> =>
  meso && Object.values(d.pc ?? {}).some((p) => p > 0)
    ? Object.fromEntries((prescreverSessao(meso, d.semana, d.treino)?.exercicios ?? []).map((e) => [e.slot.slotId, e.n]))
    : {}

export const docsParaRegistros = (docs: RegistroDoc[], meso?: Meso): Registros =>
  Object.fromEntries(docs.map((d) => [`${d.semana}-${d.treino}`, normalizarCargas(d, seriesDe(meso, d))]))

export const docsParaRegistrosReps = (docs: RegistroDoc[]): Registros =>
  Object.fromEntries(docs.map((d) => [`${d.semana}-${d.treino}`, docParaReps(d.reps)]))

// notas/{alunoId}: anotação do aluno por exercício (chave = nome do exercício; '' = sem nota).
export type NotasDoc = { exercicios?: Record<string, string> }
