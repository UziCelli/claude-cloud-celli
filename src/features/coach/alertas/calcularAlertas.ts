// Alertas do coach (sem React nem Firebase, para testar). Arquivado = chave em `arquivados` (chaveAlerta).
import type { Usuario } from '../../../lib/acesso'
import { chaveAlerta, repsAbaixo, treinosDemorados, type RegistroAlerta } from '../../../lib/alertas'
import { docParaMeso, type MesoSalvo } from '../../../lib/conversores'
import type { RegistroResumo } from '../../../lib/resumo'
import { semanaAtual } from '../../../lib/treino'
import { treinosAcima } from '../meso/SugestaoTempo'

export type Reg = RegistroAlerta & RegistroResumo

export type AlertaAbaixo = { id: string; chave: string; aluno: string; email: string; mesoId: string; alerta: NonNullable<ReturnType<typeof repsAbaixo>> }
export type AlertaAcima = { chave: string; d: MesoSalvo & { id: string }; meso: ReturnType<typeof docParaMeso>; a: ReturnType<typeof treinosAcima>[number]; aluno: string; email: string }
export type AlertaDemorado = { id: string; chave: string; aluno: string; email: string; mesoId: string; semana: number; treino: number; minutos: number; previsto: number }
type Grupos = { abaixo: AlertaAbaixo[]; acima: AlertaAcima[]; demorados: AlertaDemorado[] }

// Mesos em andamento de alunos não arquivados. Os arquivados pelo coach saem dos grupos e do total
// e vão para `arquivados` (mesma forma).
export function calcularAlertas(
  alunos: (Usuario & { id: string })[],
  mesos: (MesoSalvo & { id: string })[],
  registros: Reg[],
  agora: Date,
  arquivados: Set<string> = new Set(),
) {
  const vis: Grupos = { abaixo: [], acima: [], demorados: [] }
  const arq: Grupos = { abaixo: [], acima: [], demorados: [] }
  const por = <K extends keyof Grupos>(g: K, x: Grupos[K][number]) => (arquivados.has(x.chave) ? arq : vis)[g].push(x as never)
  for (const d of mesos) {
    const aluno = alunos.find((x) => x.id === d.alunoId)
    if (!aluno || aluno.status === 'arquivado') continue
    const meso = docParaMeso(d)
    if (semanaAtual(meso, agora).estado !== 'durante') continue
    const regs = registros.filter((r) => r.mesoId === d.id)
    const alerta = repsAbaixo(meso, regs, agora)
    if (alerta) por('abaixo', { id: d.id, chave: chaveAlerta.abaixo(d.id, alerta.ultimoDia), aluno: aluno.nome, email: aluno.email, mesoId: d.id, alerta })
    for (const t of treinosDemorados(meso, regs, agora))
      por('demorados', { id: `${d.id}-${t.semana}-${t.treino}`, chave: chaveAlerta.demorado(d.id, t.semana, t.treino), aluno: aluno.nome, email: aluno.email, mesoId: d.id, ...t })
    if (d.tempoLimiteMin)
      for (const a of treinosAcima(meso)) por('acima', { chave: chaveAlerta.acima(d.id, a, d.tempoLimiteMin), d, meso, a, aluno: aluno.nome, email: aluno.email })
  }
  return { ...vis, total: vis.abaixo.length + vis.acima.length + vis.demorados.length, arquivados: arq }
}

// Todas as chaves dos alertas de agora (visíveis e arquivados), para limparArquivadosAntigos.
export const chavesAtuais = (r: ReturnType<typeof calcularAlertas>) =>
  new Set([r, r.arquivados].flatMap((g) => [...g.abaixo, ...g.acima, ...g.demorados].map((x) => x.chave)))
