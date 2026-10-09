// Agenda e regras da semana do aluno (docs/plano-redesenho.md, seção 1). Funções puras:
// datas no calendário de São Paulo, o relógio vem sempre de `hoje`.
import { ajustarSeries, limiteDe, linhaPrescrita, type Meso } from '../engine'
import { diaSP } from './acesso'
import { semanaParaAbrir } from './semana'
import { semanaAtual } from './treino'

type Reg = { semana: number; treino: number; realizado?: boolean; realizadoEm?: { toMillis(): number } | null }
type Dia = { data: string; diaSemana: number; treino: number | null }
type Proximo = { semana: number; treino: number; dataTreino: string }

const DIA_MS = 86400_000
const PCT_VOLTA = -5
// Sem `dias`: dias do bloco (contados do início dele) em que cada treino cai, por frequência (índice = frequência − 1).
const DIAS_AUTO = [[0], [0, 3], [0, 2, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5, 6]]

// `dia` = número de diaSP: à meia-noite UTC do número cai a data do calendário de São Paulo.
const dataDe = (dia: number) => new Date(dia * DIA_MS).toISOString().slice(0, 10)
const feitoEm = (registros: Reg[], semana: number, treino: number) =>
  registros.some((r) => r.realizado && r.semana === semana && r.treino === treino)

// 7 dias do bloco da semana (a partir de `inicio`, como semanaAtual). Com `dias`, o k-ésimo dia de treino
// em ordem de calendário é o Treino k (o bloco pode começar no meio da semana civil).
export function diasDaSemana(meso: Meso, semana: number): Dia[] {
  const primeiro = diaSP(Date.parse(`${meso.inicio.slice(0, 10)}T00:00-03:00`)) + 7 * (semana - 1)
  let k = 0
  return Array.from({ length: 7 }, (_, i) => {
    const diaSemana = new Date((primeiro + i) * DIA_MS).getUTCDay()
    const treina = !!meso.dias?.includes(diaSemana) && k < meso.frequencia
    return { data: dataDe(primeiro + i), diaSemana, treino: treina ? ++k : null }
  })
}

// Com `dias`: o treino marcado para hoje (feito diz se já foi concluído); em dia de descanso, o próximo treino.
// Sem `dias`: o próximo treino não feito da semana que Hoje abre (semanaParaAbrir), com a data do calendário automático:
// max(planejada, dia seguinte ao último feito), até o último dia do bloco. "Hoje" é quem chama: dataTreino <= hoje. Fora do meso: null.
export function treinoDeHoje(
  meso: Meso,
  registros: Reg[],
  hoje: Date,
): { semana: number; treino: number; dataTreino: string; feito: boolean } | { semana: number; descanso: true; proximo?: Proximo } | null {
  const atual = semanaAtual(meso, hoje)
  if (atual.estado !== 'durante') return null

  if (!meso.dias?.length) {
    const semana = semanaParaAbrir(meso, registros, hoje)
    const treino = Array.from({ length: meso.frequencia }, (_, i) => i + 1).find((t) => !feitoEm(registros, semana, t))
    if (!treino) return { semana, descanso: true }
    const primeiro = diaSP(Date.parse(`${meso.inicio.slice(0, 10)}T00:00-03:00`)) + 7 * (semana - 1)
    const planejado = primeiro + DIAS_AUTO[Math.min(meso.frequencia, 7) - 1][treino - 1]
    // null = gravação pendente offline = feito agora; campo ausente (registro antigo) fica fora da conta.
    const feitos = registros.filter((r) => r.realizado && r.realizadoEm !== undefined).map((r) => diaSP(r.realizadoEm?.toMillis() ?? hoje.getTime()))
    const dia = Math.min(Math.max(planejado, ...feitos.map((d) => d + 1)), primeiro + 6)
    return { semana, treino, dataTreino: dataDe(dia), feito: false }
  }

  const { semana } = atual
  const data = dataDe(diaSP(hoje.getTime()))
  const dias = [semana, ...(semana < meso.semanas ? [semana + 1] : [])].flatMap((s) =>
    diasDaSemana(meso, s).map((d) => ({ ...d, semana: s })),
  )
  const hojeDia = dias.find((d) => d.data === data)
  if (hojeDia?.treino) return { semana, treino: hojeDia.treino, dataTreino: data, feito: feitoEm(registros, semana, hojeDia.treino) }
  const prox = dias.find((d) => d.data > data && d.treino)
  return prox ? { semana, descanso: true, proximo: { semana: prox.semana, treino: prox.treino!, dataTreino: prox.data } } : { semana, descanso: true }
}

// Só para o aluno. Semana atual ou futura nunca trava. Semana passada: com `treino`, trava o não feito;
// sem `treino`, trava a semana inteira se nenhum treino foi feito nela.
export function travado(meso: Meso, registros: Reg[], hoje: Date, semana: number, treino?: number): boolean {
  if (semana >= semanaAtual(meso, hoje).semana) return false
  return treino == null ? !registros.some((r) => r.realizado && r.semana === semana) : !feitoEm(registros, semana, treino)
}

// Semana w >= 2, já começada pela data, e nenhum treino feito na w−1.
export const semanaDeVolta = (meso: Meso, registros: Reg[], hoje: Date, semana: number): boolean =>
  semana >= 2 &&
  semana <= Math.min(meso.semanas, semanaAtual(meso, hoje).semana) &&
  !registros.some((r) => r.realizado && r.semana === semana - 1)

// Meso com o volume das semanas de volta reduzido 5% (ajustarSeries sobre a linha da própria semana, sem acumular).
// Vira override por slotId em progressaoExercicio (como volume.ts); trocas não mudam. Sem volta: o mesmo objeto.
// `soAtual`: só a semana atual (para quem tem só uma janela curta de registros, onde a semana anterior à passada falta).
export function comVolta(meso: Meso, registros: Reg[], hoje: Date, soAtual = false): Meso {
  const atual = semanaAtual(meso, hoje).semana
  const voltas = Array.from({ length: meso.semanas }, (_, i) => i + 1).filter(
    (w) => (!soAtual || w === atual) && semanaDeVolta(meso, registros, hoje, w),
  )
  if (!voltas.length) return meso
  const limite = limiteDe(meso)
  const overrides = { ...meso.progressaoExercicio }
  meso.divisao.forEach((slots, i) =>
    slots.forEach((s, j) => {
      overrides[s.slotId] = Array.from({ length: meso.semanas }, (_, w) => {
        const linha = linhaPrescrita(meso, w + 1, i + 1, j + 1)
        return voltas.includes(w + 1) ? ajustarSeries(linha, PCT_VOLTA, limite) : [...linha]
      })
    }),
  )
  return { ...meso, progressaoExercicio: overrides }
}

// Carga sugerida da semana de volta: kg × 0,95 em passos de 0,5 (kg×19/10 = o dobro, em inteiros exatos).
export const cargaVolta = (kg: number): number => Math.round((kg * 19) / 10) / 2
