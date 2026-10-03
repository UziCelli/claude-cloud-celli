// Painel do coach: quem precisa de atenção. Funções puras.
import type { Timestamp } from 'firebase/firestore'
import { diaSP, diasParaVencer, inicioDoDiaSP, liberado, type Usuario } from './acesso'

export type AlunoComId = Usuario & { id: string }

export interface RegistroResumo {
  alunoId: string
  mesoId?: string
  semana?: number
  treino?: number
  realizado?: boolean
  realizadoEm?: Timestamp | null // null = gravação ainda pendente
  atualizadoEm?: Timestamp | null
}

// Início (ms) do dia em São Paulo, `dias` dias antes de hoje. Muda só uma vez por dia:
// a consulta montada com ele fica igual entre renders (useLista não reinscreve).
export const inicioJanela = (agora: Date, dias: number) => inicioDoDiaSP(diaSP(agora.getTime()) - dias)

export function resumoCoach(todos: AlunoComId[], registros: RegistroResumo[], agora: Date) {
  const alunos = todos.filter((a) => a.status !== 'arquivado')
  const hoje = diaSP(agora.getTime())
  const treinouHoje = new Set<string>()
  const ativos = new Set(alunos.map((a) => a.id))
  const treinosHoje: Record<string, { mesoId: string; semana: number; treino: number; feito: boolean }[]> = {}
  const ultimo = new Map<string, number>() // alunoId -> dia (SP) do registro atualizado mais recente
  for (const r of registros) {
    const dias = [r.realizadoEm, r.atualizadoEm].map((t) => t && diaSP(t.toMillis()))
    if (dias.includes(hoje)) {
      treinouHoje.add(r.alunoId)
      if (ativos.has(r.alunoId) && r.mesoId && r.semana != null && r.treino != null) {
        const l = (treinosHoje[r.alunoId] ??= [])
        const t = l.find((x) => x.mesoId === r.mesoId && x.semana === r.semana && x.treino === r.treino)
        if (t) t.feito ||= !!r.realizado
        else l.push({ mesoId: r.mesoId, semana: r.semana, treino: r.treino, feito: !!r.realizado })
      }
    }
    const d = dias[1]
    if (d != null && d > (ultimo.get(r.alunoId) ?? -Infinity)) ultimo.set(r.alunoId, d)
  }
  for (const l of Object.values(treinosHoje)) l.sort((a, b) => a.semana - b.semana || a.treino - b.treino)
  const deApp = (a: AlunoComId) => a.status === 'ativo' && !a.presencial
  const recente = (d: number | undefined) => d != null && hoje - d < 7

  return {
    aguardando: alunos.filter((a) => a.status === 'aguardando'),
    vencendo: alunos.filter((a) => deApp(a) && a.pagoAte && diasParaVencer(a.pagoAte, agora) >= 0 && diasParaVencer(a.pagoAte, agora) <= 7),
    vencidos: alunos.filter((a) => deApp(a) && !liberado(a, agora)),
    treinaramHoje: alunos.filter((a) => treinouHoje.has(a.id)),
    treinosHoje,
    // Só quem pode treinar no app; cadastrado há menos de 7 dias ainda não conta.
    sumidos: alunos.filter(
      (a) => deApp(a) && liberado(a, agora) && !recente(ultimo.get(a.id)) && !recente(a.criadoEm && diaSP(a.criadoEm.toMillis())),
    ),
  }
}
