// Painel do coach: quem precisa de atenção. Funções puras.
import type { Timestamp } from 'firebase/firestore'
import { diaSP, diasParaVencer, inicioDoDiaSP, liberado, type Usuario } from './acesso'
import { docParaMeso, type MesoSalvo } from './conversores'
import { semanaAtual } from './treino'

export type AlunoComId = Usuario & { id: string }

export interface RegistroResumo {
  alunoId: string
  mesoId?: string
  semana?: number
  treino?: number
  realizado?: boolean
  realizadoEm?: Timestamp | null // null = gravação ainda pendente
  atualizadoEm?: Timestamp | null
  inicioEm?: Timestamp | null // null = gravação ainda pendente; sem o campo = não iniciado ou cancelado
  cargas?: Record<string, Record<string, number | null>>
}

type Ts = { toMillis(): number } | null // null = gravação ainda pendente
type Sessao = { realizado?: boolean; realizadoEm?: Ts; atualizadoEm?: Ts; inicioEm?: Ts }

// Hora (ms) da sessão de treino: concluída = realizadoEm (dado antigo sem ele: atualizadoEm); senão o
// início (inicioEm = em andamento). Sem Iniciar nem Concluir é só correção de carga: null (não é treino).
// Hora pendente (null) vale como agora. "Cancelar treino" apaga inicioEm: deixa de ser sessão.
export function msSessao(r: Sessao, agora: Date): number | null {
  const t = r.realizado ? (r.realizadoEm === undefined ? r.atualizadoEm : r.realizadoEm) : r.inicioEm
  return t === undefined ? null : t === null ? agora.getTime() : t.toMillis()
}

// Teto de um treino plausível: acima de 3 h o aluno esqueceu de concluir (ou reabriu um treino antigo) e o tempo é falso.
export const TETO_TREINO_MS = 3 * 60 * 60_000
// Duração (ms) entre o início e o fim, ou null se faltar dado, vier negativa ou passar do teto: nunca mostrar "80 h".
export const duracaoTreino = (ini: number | null | undefined, fim: number | null | undefined): number | null =>
  ini == null || fim == null || fim <= ini || fim - ini > TETO_TREINO_MS ? null : fim - ini

// Início (ms) do dia em São Paulo, `dias` dias antes de hoje. Muda só uma vez por dia:
// a consulta montada com ele fica igual entre renders (useLista não reinscreve).
export const inicioJanela = (agora: Date, dias: number) => inicioDoDiaSP(diaSP(agora.getTime()) - dias)

export function resumoCoach(todos: AlunoComId[], registros: RegistroResumo[], agora: Date, mesos?: (MesoSalvo & { id: string })[]) {
  const alunos = todos.filter((a) => a.status !== 'arquivado')
  const hoje = diaSP(agora.getTime())
  const treinouHoje = new Set<string>()
  const ativos = new Set(alunos.map((a) => a.id))
  const treinosHoje: Record<string, { mesoId: string; semana: number; treino: number; feito: boolean }[]> = {}
  const ultimo = new Map<string, number>() // alunoId -> dia (SP) da sessão mais recente
  for (const r of registros) {
    const ms = msSessao(r, agora)
    if (ms == null) continue
    const d = diaSP(ms)
    if (d === hoje) {
      treinouHoje.add(r.alunoId)
      if (ativos.has(r.alunoId) && r.mesoId && r.semana != null && r.treino != null) {
        const l = (treinosHoje[r.alunoId] ??= [])
        const t = l.find((x) => x.mesoId === r.mesoId && x.semana === r.semana && x.treino === r.treino)
        if (t) t.feito ||= !!r.realizado
        else l.push({ mesoId: r.mesoId, semana: r.semana, treino: r.treino, feito: !!r.realizado })
      }
    }
    if (d > (ultimo.get(r.alunoId) ?? -Infinity)) ultimo.set(r.alunoId, d)
  }
  for (const l of Object.values(treinosHoje)) l.sort((a, b) => a.semana - b.semana || a.treino - b.treino)
  const deApp = (a: AlunoComId) => a.status === 'ativo' && !a.presencial
  const recente = (d: number | undefined) => d != null && hoje - d < 7

  // Só quem pode treinar no app; cadastrado há menos de 7 dias ainda não conta.
  const sumidos = alunos.filter(
    (a) => deApp(a) && liberado(a, agora) && !recente(ultimo.get(a.id)) && !recente(a.criadoEm && diaSP(a.criadoEm.toMillis())),
  )

  // Treinos feitos (realizado, no dia de realizadoEm) nos últimos 14 dias; o mesmo treino conta 1 vez.
  const feitos14 = new Map<string, Set<string>>()
  registros.forEach((r, i) => {
    if (!r.realizado || !r.realizadoEm || hoje - diaSP(r.realizadoEm.toMillis()) >= 14) return
    const chave = r.mesoId && r.semana != null && r.treino != null ? `${r.mesoId}|${r.semana}|${r.treino}` : `#${i}`
    feitos14.set(r.alunoId, (feitos14.get(r.alunoId) ?? new Set()).add(chave))
  })
  // Treinos previstos nos últimos 14 dias pelo meso em andamento (o de início mais recente, se houver
  // mais de um): frequência × dias do meso na janela / 7. Meso com menos de 7 dias ainda não conta.
  const previsto = (alunoId: string) => {
    const m = (mesos ?? [])
      .filter((m) => m.alunoId === alunoId && semanaAtual(docParaMeso(m), agora).estado === 'durante')
      .sort((a, b) => b.inicio.localeCompare(a.inicio))[0]
    if (!m) return null
    const dias = Math.min(14, hoje - diaSP(Date.parse(`${m.inicio.slice(0, 10)}T00:00-03:00`)) + 1)
    return dias >= 7 ? (m.frequencia * dias) / 7 : null
  }
  const semSumir = new Set(sumidos.map((a) => a.id))
  const frequenciaCaindo = alunos.filter((a) => {
    const p = previsto(a.id)
    return deApp(a) && liberado(a, agora) && !semSumir.has(a.id) && p != null && (feitos14.get(a.id)?.size ?? 0) < p / 2
  })

  return {
    aguardando: alunos.filter((a) => a.status === 'aguardando'),
    vencendo: alunos.filter((a) => deApp(a) && a.pagoAte && diasParaVencer(a.pagoAte, agora) >= 0 && diasParaVencer(a.pagoAte, agora) <= 7),
    vencidos: alunos.filter((a) => deApp(a) && !liberado(a, agora)),
    treinaramHoje: alunos.filter((a) => treinouHoje.has(a.id)),
    treinosHoje,
    sumidos,
    frequenciaCaindo,
  }
}
