// Sugestões ao coach a partir de relatos de dor, check-ins e sinais de perigo (rodada 4 do Físio).
// Só SUGERE: nunca aplica polimento, nunca mexe no meso, nunca sugere método nem diagnóstico, nunca aparece ao aluno.
// Números conservadores (consulta ao Fable, 13/11/2026; docs/plano-fisio.md). Função pura.
import { somaRecuperacao, type Checkin } from './checkin'
import type { RelatoDor } from './dor'

export type TipoSugestao = 'polimento' | 'conversar'
export type SugestaoFisio = { alunoId: string; tipo: TipoSugestao; motivo: string; chave: string }

const DIA = 86400_000
const ms = (t: { toMillis(): number } | null) => (t ? t.toMillis() : null)
const diaDe = (m: number) => new Date(m - 3 * 3600_000).toISOString().slice(0, 10) // dia de São Paulo (UTC−3)

type Entrada = {
  dores: RelatoDor[]
  checkins: Checkin[]
  sinais: { alunoId: string; id: string }[] // orientações com sinal de perigo relatado e não recolhidas
  agora: Date
}

// Uma sugestão por (aluno, tipo): a primeira regra que bate dá o motivo. A chave muda com o último dado,
// então uma sugestão dispensada (arquivados) só volta quando chegar dado novo.
export function sugestoesFisio({ dores, checkins, sinais, agora }: Entrada): SugestaoFisio[] {
  const fim = agora.getTime()
  const alunos = new Set([...dores.map((d) => d.alunoId), ...checkins.map((c) => c.alunoId), ...sinais.map((s) => s.alunoId)])
  const saida: SugestaoFisio[] = []
  for (const aluno of alunos) {
    const ds = dores
      .filter((d) => d.alunoId === aluno && d.tipo === 'dor' && ms(d.em) !== null)
      .sort((a, b) => ms(a.em)! - ms(b.em)!)
    const cs = checkins.filter((c) => c.alunoId === aluno && ms(c.em) !== null).sort((a, b) => ms(a.em)! - ms(b.em)!)
    const sinal = sinais.find((s) => s.alunoId === aluno)
    const conversar = motivoConversar(ds, sinal, fim)
    if (conversar) saida.push({ alunoId: aluno, tipo: 'conversar', ...conversar })
    const polimento = motivoPolimento(ds, cs, fim)
    if (polimento) saida.push({ alunoId: aluno, tipo: 'polimento', ...polimento })
  }
  return saida
}

const chave = (tipo: TipoSugestao, aluno: string, ultimoId: string) => `fisio_${tipo}_${aluno}_${ultimoId}`

function motivoConversar(ds: RelatoDor[], sinal: { id: string } | undefined, fim: number) {
  const aluno = ds[0]?.alunoId
  if (sinal) return { motivo: 'Marcou um sinal de perigo numa orientação Físio.', chave: chave('conversar', aluno ?? 'x', sinal.id) }
  const recentes = ds.filter((d) => fim - ms(d.em)! <= 14 * DIA)
  const forte = [...recentes].reverse().find((d) => d.intensidade >= 7)
  if (forte) return { motivo: `Dor ${forte.intensidade}/10 em ${forte.articulacao === 'outro' ? 'outro local' : forte.articulacao} (${forte.exercicio}).`, chave: chave('conversar', forte.alunoId, forte.id) }
  // Mesma articulação com dor ≥4 em 3 dias diferentes, ou persistindo por mais de 14 dias.
  for (const art of new Set(ds.map((d) => d.articulacao))) {
    if (art === 'outro') continue
    const m = ds.filter((d) => d.articulacao === art && d.intensidade >= 4)
    if (!m.length) continue
    const ultimo = m[m.length - 1]
    if (fim - ms(ultimo.em)! > 14 * DIA) continue // sem dor recente nessa articulação
    const dias = new Set(m.map((d) => diaDe(ms(d.em)!)))
    if (dias.size >= 3) return { motivo: `Dor ≥4/10 em ${art} em ${dias.size} dias diferentes.`, chave: chave('conversar', ultimo.alunoId, ultimo.id) }
    if (ms(ultimo.em)! - ms(m[0].em)! > 14 * DIA) return { motivo: `Dor ≥4/10 em ${art} há mais de 14 dias.`, chave: chave('conversar', ultimo.alunoId, ultimo.id) }
  }
  // 3 relatos seguidos (últimos 14 dias) com intensidade subindo.
  const u = recentes.slice(-3)
  if (u.length === 3 && u[0].intensidade < u[1].intensidade && u[1].intensidade < u[2].intensidade)
    return { motivo: `Dor subindo nos últimos 3 relatos (${u.map((d) => d.intensidade).join(' → ')}/10).`, chave: chave('conversar', u[2].alunoId, u[2].id) }
  return null
}

function motivoPolimento(ds: RelatoDor[], cs: Checkin[], fim: number) {
  // ≥2 relatos de dor 4–6 na mesma articulação em 14 dias.
  const recentes = ds.filter((d) => fim - ms(d.em)! <= 14 * DIA && d.intensidade >= 4 && d.intensidade <= 6 && d.articulacao !== 'outro')
  for (const art of new Set(recentes.map((d) => d.articulacao))) {
    const m = recentes.filter((d) => d.articulacao === art)
    if (m.length >= 2) return { motivo: `${m.length} relatos de dor 4–6/10 em ${art} nos últimos 14 dias.`, chave: chave('polimento', m[0].alunoId, m[m.length - 1].id) }
  }
  // Últimos 3 check-ins (todos nos últimos 14 dias) com recuperação ruim.
  const u = cs.slice(-3)
  if (u.length === 3 && fim - ms(u[0].em)! <= 14 * DIA) {
    const somas = u.map(somaRecuperacao)
    if (somas.every((x) => x <= 7)) return { motivo: `Recuperação baixa em 3 check-ins seguidos (sono + estresse + cansaço: ${somas.join(', ')} de 15).`, chave: chave('polimento', u[2].alunoId, u[2].id) }
    // Queda ≥30% sobre a média do próprio aluno (precisa de ≥6 check-ins nos 28 dias antes deles).
    const ini = ms(u[0].em)!
    const base = cs.filter((c) => ms(c.em)! < ini && ini - ms(c.em)! <= 28 * DIA).map(somaRecuperacao)
    if (base.length >= 6) {
      const media = base.reduce((a, b) => a + b, 0) / base.length
      if (somas.every((x) => x <= media * 0.7)) return { motivo: `Recuperação 30% abaixo da média do aluno em 3 check-ins seguidos (média ${media.toFixed(1)}; agora ${somas.join(', ')}).`, chave: chave('polimento', u[2].alunoId, u[2].id) }
    }
  }
  return null
}
