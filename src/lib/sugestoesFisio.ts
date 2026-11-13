// Sugestões ao coach a partir de relatos de dor, check-ins e sinais de perigo (rodada 4 do Físio).
// Só SUGERE: nunca aplica polimento, nunca mexe no meso, nunca sugere método nem diagnóstico, nunca aparece ao aluno.
// Números conservadores (consulta ao Fable, 13/11/2026; docs/plano-fisio.md). Função pura.
import { somaRecuperacao, type Checkin } from './checkin'
import type { RelatoDor } from './dor'

export type TipoSugestao = 'polimento' | 'conversar'
export type SugestaoFisio = { alunoId: string; tipo: TipoSugestao; motivo: string; chave: string }
export type SinalFisio = { alunoId: string; id: string; em: number | null } // orientação com sinal de perigo (em = sinalEm)

const DIA = 86400_000
// Janela que as regras usam (a maior: 3 check-ins nos últimos 14 dias + base de 28 dias antes deles, com folga).
// As consultas precisam trazer pelo menos isto; a função corta aqui para dar o mesmo resultado em qualquer tela.
export const JANELA_CALCULO_DIAS = 45
const ms = (t: { toMillis(): number } | null) => (t ? t.toMillis() : null)
const diaDe = (m: number) => new Date(m - 3 * 3600_000).toISOString().slice(0, 10) // dia de São Paulo (UTC−3)

type Entrada = { dores: RelatoDor[]; checkins: Checkin[]; sinais: SinalFisio[]; agora: Date }

// Sinais a partir das orientações (só não recolhidas e com sinal). Hora = quando o aluno marcou (sinalEm).
type OrientacaoComSinal = { id: string; alunoId: string; sinalRelatado: boolean; recolhida: boolean; sinalEm: { toMillis(): number } | null; em: { toMillis(): number } | null }
export const sinaisDasOrientacoes = (os: OrientacaoComSinal[]): SinalFisio[] =>
  os.filter((o) => o.sinalRelatado && !o.recolhida).map((o) => ({ alunoId: o.alunoId, id: o.id, em: ms(o.sinalEm ?? o.em) }))
type Gatilho = { motivo: string; id: string; em: number } // motivo + evento que o disparou

// Uma sugestão por (aluno, tipo). O motivo é o da regra mais importante; a chave é a do evento MAIS RECENTE entre
// todos os gatilhos, então uma sugestão dispensada (arquivados) volta com qualquer evento novo que também dispare.
export function sugestoesFisio({ dores, checkins, sinais, agora }: Entrada): SugestaoFisio[] {
  const fim = agora.getTime()
  const naJanela = (m: number | null): m is number => m !== null && fim - m <= JANELA_CALCULO_DIAS * DIA
  const alunos = new Set([...dores.map((d) => d.alunoId), ...checkins.map((c) => c.alunoId), ...sinais.map((s) => s.alunoId)])
  const saida: SugestaoFisio[] = []
  for (const aluno of alunos) {
    const ds = dores.filter((d) => d.alunoId === aluno && d.tipo === 'dor' && naJanela(ms(d.em))).sort((a, b) => ms(a.em)! - ms(b.em)!)
    const cs = checkins.filter((c) => c.alunoId === aluno && naJanela(ms(c.em))).sort((a, b) => ms(a.em)! - ms(b.em)!)
    const ss = sinais.filter((s) => s.alunoId === aluno)
    for (const [tipo, gatilhos] of [['conversar', gatilhosConversar(ds, ss, fim)], ['polimento', gatilhosPolimento(ds, cs, fim)]] as const) {
      if (!gatilhos.length) continue
      const ultimo = gatilhos.reduce((a, b) => (b.em > a.em ? b : a))
      saida.push({ alunoId: aluno, tipo, motivo: gatilhos[0].motivo, chave: `fisio_${tipo}_${aluno}_${ultimo.id}` })
    }
  }
  return saida
}

const ev = (d: RelatoDor) => ({ id: d.id, em: ms(d.em)! })
const local = (a: string) => (a === 'outro' ? 'outro local' : a)

function gatilhosConversar(ds: RelatoDor[], ss: SinalFisio[], fim: number): Gatilho[] {
  const g: Gatilho[] = []
  for (const s of ss) g.push({ motivo: 'Marcou um sinal de perigo numa orientação Físio.', id: `${s.id}_${s.em ?? 0}`, em: s.em ?? 0 })
  const recentes = ds.filter((d) => fim - ms(d.em)! <= 14 * DIA)
  for (const d of [...recentes].reverse().filter((d) => d.intensidade >= 7))
    g.push({ motivo: `Dor ${d.intensidade}/10 em ${local(d.articulacao)} (${d.exercicio}).`, ...ev(d) })
  // Mesma articulação com dor ≥4 em 3 dias diferentes, ou persistindo por mais de 14 dias (dentro da janela).
  for (const art of new Set(ds.map((d) => d.articulacao))) {
    if (art === 'outro') continue
    const m = ds.filter((d) => d.articulacao === art && d.intensidade >= 4)
    if (!m.length) continue
    const ultimo = m[m.length - 1]
    if (fim - ms(ultimo.em)! > 14 * DIA) continue // sem dor recente nessa articulação
    const dias = new Set(m.map((d) => diaDe(ms(d.em)!)))
    if (dias.size >= 3) g.push({ motivo: `Dor ≥4/10 em ${art} em ${dias.size} dias diferentes.`, ...ev(ultimo) })
    else if (ms(ultimo.em)! - ms(m[0].em)! > 14 * DIA) g.push({ motivo: `Dor ≥4/10 em ${art} há mais de 14 dias.`, ...ev(ultimo) })
  }
  // 3 relatos seguidos (últimos 14 dias) com intensidade subindo.
  const u = recentes.slice(-3)
  if (u.length === 3 && u[0].intensidade < u[1].intensidade && u[1].intensidade < u[2].intensidade)
    g.push({ motivo: `Dor subindo nos últimos 3 relatos (${u.map((d) => d.intensidade).join(' → ')}/10).`, ...ev(u[2]) })
  return g
}

function gatilhosPolimento(ds: RelatoDor[], cs: Checkin[], fim: number): Gatilho[] {
  const g: Gatilho[] = []
  // ≥2 relatos de dor 4–6 na mesma articulação em 14 dias.
  const recentes = ds.filter((d) => fim - ms(d.em)! <= 14 * DIA && d.intensidade >= 4 && d.intensidade <= 6 && d.articulacao !== 'outro')
  for (const art of new Set(recentes.map((d) => d.articulacao))) {
    const m = recentes.filter((d) => d.articulacao === art)
    if (m.length >= 2) g.push({ motivo: `${m.length} relatos de dor 4–6/10 em ${art} nos últimos 14 dias.`, ...ev(m[m.length - 1]) })
  }
  // Últimos 3 check-ins (todos nos últimos 14 dias) com recuperação ruim.
  const u = cs.slice(-3)
  if (u.length === 3 && fim - ms(u[0].em)! <= 14 * DIA) {
    const somas = u.map(somaRecuperacao)
    const ultimo = { id: u[2].id, em: ms(u[2].em)! }
    if (somas.every((x) => x <= 7)) g.push({ motivo: `Recuperação baixa em 3 check-ins seguidos (sono + estresse + cansaço: ${somas.join(', ')} de 15).`, ...ultimo })
    else {
      // Queda ≥30% sobre a média do próprio aluno (precisa de ≥6 check-ins nos 28 dias antes deles).
      const ini = ms(u[0].em)!
      const base = cs.filter((c) => ms(c.em)! < ini && ini - ms(c.em)! <= 28 * DIA).map(somaRecuperacao)
      if (base.length >= 6) {
        const media = base.reduce((a, b) => a + b, 0) / base.length
        if (somas.every((x) => x <= media * 0.7)) g.push({ motivo: `Recuperação 30% abaixo da média do aluno em 3 check-ins seguidos (média ${media.toFixed(1)}; agora ${somas.join(', ')}).`, ...ultimo })
      }
    }
  }
  return g
}
