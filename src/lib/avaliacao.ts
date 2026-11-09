// Avaliação física (Fase 3): avaliacoes/{id automático}. Funções puras (plano: docs/plano-avaliacao.md).
// Só as medidas são gravadas; IMC, % de gordura, massas e o texto de evolução saem na hora.
// As listas de chaves abaixo existem também em firestore.rules (o teste compara as duas).
import type { Meso } from '../engine'
import { diaSP } from './acesso'
import { cicloTerminou, diasDesdeFim, fimISO, RELATORIO_DIAS, type RelatorioCiclo } from './relatorio'

export const PERIMETROS = [
  { id: 'ombro', rotulo: 'Ombro' },
  { id: 'torax', rotulo: 'Tórax' },
  { id: 'cintura', rotulo: 'Cintura' },
  { id: 'abdomen', rotulo: 'Abdômen' },
  { id: 'quadril', rotulo: 'Quadril' },
  { id: 'bracoD', rotulo: 'Braço direito' },
  { id: 'bracoE', rotulo: 'Braço esquerdo' },
  { id: 'antebracoD', rotulo: 'Antebraço direito' },
  { id: 'antebracoE', rotulo: 'Antebraço esquerdo' },
  { id: 'coxaD', rotulo: 'Coxa direita' },
  { id: 'coxaE', rotulo: 'Coxa esquerda' },
  { id: 'panturrilhaD', rotulo: 'Panturrilha direita' },
  { id: 'panturrilhaE', rotulo: 'Panturrilha esquerda' },
] as const

// As 7 dobras do protocolo de Jackson & Pollock.
export const DOBRAS = [
  { id: 'peitoral', rotulo: 'Peitoral' },
  { id: 'axilar', rotulo: 'Axilar média' },
  { id: 'triceps', rotulo: 'Tríceps' },
  { id: 'subescapular', rotulo: 'Subescapular' },
  { id: 'abdominal', rotulo: 'Abdominal' },
  { id: 'suprailiaca', rotulo: 'Supra-ilíaca' },
  { id: 'coxa', rotulo: 'Coxa' },
] as const

export const BIO = [
  { id: 'gorduraPct', rotulo: 'Gordura', un: '%', max: 70 },
  { id: 'massaMuscularKg', rotulo: 'Massa muscular', un: 'kg', max: 200 },
  { id: 'visceral', rotulo: 'Gordura visceral', un: '', max: 60 },
] as const

type Ids<T extends readonly { id: string }[]> = T[number]['id']
export type Sexo = 'M' | 'F'
export type Avaliacao = {
  id: string
  alunoId: string
  data: string // AAAA-MM-DD
  pesoKg: number
  alturaCm?: number
  sexo?: Sexo
  idade?: number // anos na data da avaliação (nunca a data de nascimento)
  perimetros: Partial<Record<Ids<typeof PERIMETROS>, number>> // cm
  dobras: Partial<Record<Ids<typeof DOBRAS>, number>> // mm
  bio: Partial<Record<Ids<typeof BIO>, number>>
  comentario: string
  liberado: boolean
}
export type AvaliacaoForm = Omit<Avaliacao, 'id' | 'liberado'>

// Faixas aceitas na leitura e no formulário (peso, altura e idade repetem as de firestore.rules).
export const FAIXA = { peso: [20, 300], altura: [100, 250], idade: [10, 100], perimetro: [1, 300], dobra: [0.5, 150] } as const

const DIA = 86400_000
const r1 = (x: number) => Math.round(x * 10) / 10
const r2 = (x: number) => Math.round(x * 100) / 100
const somarDias = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00Z`) + n * DIA).toISOString().slice(0, 10)
const num = (v: unknown, [min, max]: readonly [number, number]) => (typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max ? v : undefined)

function mapa<K extends string>(v: unknown, defs: readonly { id: K }[], faixa: (d: { id: K }) => readonly [number, number]) {
  const origem = v && typeof v === 'object' ? (v as Record<string, unknown>) : {}
  const out: Partial<Record<K, number>> = {}
  for (const d of defs) {
    const x = num(origem[d.id], faixa(d))
    if (x != null) out[d.id] = x
  }
  return out
}

// Leitura com desconfiança: as regras não conferem os valores dentro dos mapas. Número que não é finito,
// fora da faixa ou em chave desconhecida é ignorado; sem dono, data ou peso válido o documento é descartado.
export function lerAvaliacao(id: string, d: unknown): Avaliacao | null {
  if (!d || typeof d !== 'object') return null
  const x = d as Record<string, unknown>
  const pesoKg = num(x.pesoKg, FAIXA.peso)
  if (typeof x.alunoId !== 'string' || typeof x.data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(x.data) || pesoKg == null) return null
  const idade = num(x.idade, FAIXA.idade)
  return {
    id,
    alunoId: x.alunoId,
    data: x.data,
    pesoKg,
    alturaCm: num(x.alturaCm, FAIXA.altura),
    sexo: x.sexo === 'M' || x.sexo === 'F' ? x.sexo : undefined,
    idade: idade != null && Number.isInteger(idade) ? idade : undefined,
    perimetros: mapa(x.perimetros, PERIMETROS, () => FAIXA.perimetro),
    dobras: mapa(x.dobras, DOBRAS, () => FAIXA.dobra),
    bio: mapa(x.bio, BIO, (b) => [0.1, BIO.find((y) => y.id === b.id)!.max]),
    comentario: typeof x.comentario === 'string' ? x.comentario : '',
    liberado: x.liberado === true,
  }
}

// Campos da avaliação para gravar: sem undefined e sem mapa vazio (liberado/horas entram em acoes.ts).
export function paraDoc(f: AvaliacaoForm) {
  const mapas = Object.fromEntries(
    (['perimetros', 'dobras', 'bio'] as const)
      .map((k) => [k, Object.fromEntries(Object.entries(f[k]).filter(([, v]) => v != null))] as const)
      .filter(([, m]) => Object.keys(m).length > 0),
  )
  return {
    alunoId: f.alunoId,
    data: f.data,
    pesoKg: f.pesoKg,
    ...(f.alturaCm != null ? { alturaCm: f.alturaCm } : {}),
    ...(f.sexo ? { sexo: f.sexo } : {}),
    ...(f.idade != null ? { idade: f.idade } : {}),
    ...mapas,
    comentario: f.comentario.trim().slice(0, 3000),
  }
}

export type Resultado = {
  imc: number | null
  somaDobras: number | null // mm, só com as 7
  gorduraPct: number | null
  fonte: 'dobras' | 'bio' | null // de onde veio o % de gordura
  massaGordaKg: number | null
  massaMagraKg: number | null
  rcq: number | null // cintura / quadril
}

// % de gordura: pelas 7 dobras (Jackson & Pollock 1978 para homens, Jackson, Pollock & Ward 1980 para
// mulheres; densidade → % pela equação de Siri), que precisam de sexo e idade. Sem isso, o da bioimpedância.
export function resultado(a: Avaliacao): Resultado {
  const mm = DOBRAS.map((d) => a.dobras[d.id])
  const soma = mm.every((v) => v != null) ? r1(mm.reduce((s: number, v) => s + v!, 0)) : null
  let gorduraPct: number | null = null
  let fonte: Resultado['fonte'] = null
  if (soma != null && a.sexo && a.idade != null) {
    const d = a.sexo === 'M' ? 1.112 - 0.00043499 * soma + 0.00000055 * soma * soma - 0.00028826 * a.idade : 1.097 - 0.00046971 * soma + 0.00000056 * soma * soma - 0.00012828 * a.idade
    const pct = r1((4.95 / d - 4.5) * 100)
    if (pct > 0 && pct < 70) {
      gorduraPct = pct
      fonte = 'dobras'
    }
  }
  if (gorduraPct == null && a.bio.gorduraPct != null) {
    gorduraPct = r1(a.bio.gorduraPct)
    fonte = 'bio'
  }
  const massaGordaKg = gorduraPct == null ? null : r1((a.pesoKg * gorduraPct) / 100)
  const { cintura, quadril } = a.perimetros
  return {
    imc: a.alturaCm ? r1(a.pesoKg / (a.alturaCm / 100) ** 2) : null,
    somaDobras: soma,
    gorduraPct,
    fonte,
    massaGordaKg,
    massaMagraKg: massaGordaKg == null ? null : r1(a.pesoKg - massaGordaKg),
    rcq: cintura && quadril ? r2(cintura / quadril) : null,
  }
}

export const NOME_FONTE = { dobras: 'dobras cutâneas', bio: 'bioimpedância' } as const
export const fmtNum = (v: number) => v.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
export const dataBR = (iso: string) => iso.slice(0, 10).split('-').reverse().join('/')
// Valor com a unidade: 16,3% · 80,5 kg · 0,87.
export const fmtMedida = (v: number, un: string) => (un === '%' ? `${fmtNum(v)}%` : un ? `${fmtNum(v)} ${un}` : fmtNum(v))
export const fmtDelta = (d: number) => `${d > 0 ? '+' : d < 0 ? '−' : ''}${fmtNum(Math.abs(d))}`

export type Linha = { rotulo: string; un: string; atual: number; anterior: number | null; delta: number | null }
export type RelatorioAvaliacao = {
  atual: Avaliacao
  res: Resultado
  anterior: { data: string; dias: number } | null
  destaques: { rotulo: string; valor: string }[]
  grupos: { titulo: string; linhas: Linha[] }[]
  texto: string[] // parágrafos do relatório escrito
}
type Ciclo = Pick<RelatorioCiclo, 'nome' | 'feitos' | 'previstos' | 'aderenciaPct' | 'recordes' | 'evolucoes'>

const linha = (rotulo: string, un: string, atual: number | null | undefined, ant: number | null | undefined, comparar = true, arred = r1): Linha[] =>
  atual == null ? [] : [{ rotulo, un, atual, anterior: ant ?? null, delta: comparar && ant != null ? arred(atual - ant) : null }]

const mudou = (rotulo: string, un: string, de: number, ate: number) =>
  de === ate ? `${rotulo}: ${fmtNum(ate)}${un} (igual à avaliação anterior).` : `${rotulo}: ${fmtNum(de)}${un} → ${fmtNum(ate)}${un} (${fmtDelta(r1(ate - de))}${un}).`

// Relatório de uma avaliação: números, tabelas e o texto de evolução. `avs`: todas as avaliações que
// quem está vendo pode ler (o aluno só tem as liberadas). Compara com a anterior por data e, havendo
// mais de duas, com a primeira. `ciclo`: relatorioCiclo do ciclo de referência (cicloDaAvaliacao).
// O texto só descreve: o app não sabe se o objetivo é ganhar ou perder peso.
export function relatorioAvaliacao(avs: Avaliacao[], id: string, ciclo?: Ciclo | null): RelatorioAvaliacao | null {
  const ordem = [...avs].sort((a, b) => a.data.localeCompare(b.data) || a.id.localeCompare(b.id))
  const i = ordem.findIndex((a) => a.id === id)
  if (i < 0) return null
  const atual = ordem[i]
  const ant = i > 0 ? ordem[i - 1] : null
  const res = resultado(atual)
  const rAnt = ant ? resultado(ant) : null
  const mesmaFonte = (r: Resultado | null) => !!r && r.fonte != null && r.fonte === res.fonte

  const grupos = [
    {
      titulo: 'Composição corporal',
      linhas: [
        ...linha('Peso', 'kg', atual.pesoKg, ant?.pesoKg),
        ...linha('Altura', 'cm', atual.alturaCm, ant?.alturaCm),
        ...linha('IMC', '', res.imc, rAnt?.imc),
        ...linha('Gordura', '%', res.gorduraPct, rAnt?.gorduraPct, mesmaFonte(rAnt)),
        ...linha('Massa gorda', 'kg', res.massaGordaKg, rAnt?.massaGordaKg, mesmaFonte(rAnt)),
        ...linha('Massa magra', 'kg', res.massaMagraKg, rAnt?.massaMagraKg, mesmaFonte(rAnt)),
        ...linha('Cintura/quadril', '', res.rcq, rAnt?.rcq, true, r2),
      ],
    },
    { titulo: 'Perímetros', linhas: PERIMETROS.flatMap((p) => linha(p.rotulo, 'cm', atual.perimetros[p.id], ant?.perimetros[p.id])) },
    {
      titulo: 'Dobras cutâneas',
      linhas: [...DOBRAS.flatMap((d) => linha(d.rotulo, 'mm', atual.dobras[d.id], ant?.dobras[d.id])), ...linha('Soma das 7 dobras', 'mm', res.somaDobras, rAnt?.somaDobras)],
    },
    { titulo: 'Bioimpedância', linhas: BIO.flatMap((b) => linha(b.rotulo, b.un, atual.bio[b.id], ant?.bio[b.id])) },
  ].filter((g) => g.linhas.length > 0)

  const gordura = res.gorduraPct != null && res.fonte ? `${fmtNum(res.gorduraPct)}% (${NOME_FONTE[res.fonte]})` : null
  const texto: string[] = []
  if (!ant || !rAnt) {
    texto.push('Esta é a sua primeira avaliação: o ponto de partida para acompanhar a sua evolução.')
    texto.push(
      [`Peso: ${fmtNum(atual.pesoKg)} kg.`, gordura && `Gordura corporal: ${gordura}.`, res.massaMagraKg != null && `Massa magra: ${fmtNum(res.massaMagraKg)} kg.`, res.imc != null && `IMC: ${fmtNum(res.imc)}.`]
        .filter(Boolean)
        .join(' '),
    )
  } else {
    const dias = Math.round((Date.parse(atual.data) - Date.parse(ant.data)) / DIA)
    texto.push(`Desde a avaliação de ${dataBR(ant.data)} (${dias} ${dias === 1 ? 'dia' : 'dias'}), veja o que mudou.`)
    texto.push(mudou('Peso', ' kg', ant.pesoKg, atual.pesoKg))
    if (res.gorduraPct != null && mesmaFonte(rAnt)) {
      const d = r1(res.gorduraPct - rAnt.gorduraPct!)
      texto.push(
        d === 0
          ? `Gordura corporal: ${fmtNum(res.gorduraPct)}% (igual à avaliação anterior).`
          : `Gordura corporal: ${fmtNum(rAnt.gorduraPct!)}% → ${fmtNum(res.gorduraPct)}% (${fmtDelta(d)} ${Math.abs(d) === 1 ? 'ponto' : 'pontos'}).`,
      )
      texto.push(`${mudou('Massa magra', ' kg', rAnt.massaMagraKg!, res.massaMagraKg!)} ${mudou('Massa gorda', ' kg', rAnt.massaGordaKg!, res.massaGordaKg!)}`)
    } else if (gordura) {
      texto.push(rAnt.fonte ? `O % de gordura desta avaliação, ${gordura}, veio de outro método; por isso não é comparado com o anterior.` : `Gordura corporal: ${gordura}.`)
    }
    const perimetros = grupos.find((g) => g.titulo === 'Perímetros')?.linhas.filter((l) => l.delta != null) ?? []
    const maiores = perimetros.filter((l) => Math.abs(l.delta!) >= 0.5).sort((a, b) => Math.abs(b.delta!) - Math.abs(a.delta!)).slice(0, 4)
    if (maiores.length) texto.push(`Medidas que mais mudaram: ${maiores.map((l) => `${l.rotulo.toLowerCase()} ${fmtDelta(l.delta!)} cm`).join(', ')}.`)
    else if (perimetros.length) texto.push('Perímetros: sem mudança relevante.')

    const prim = i > 1 ? ordem[0] : null
    if (prim) {
      const rPrim = resultado(prim)
      const partes = [
        prim.pesoKg !== atual.pesoKg && `peso ${fmtDelta(r1(atual.pesoKg - prim.pesoKg))} kg`,
        mesmaFonte(rPrim) && rPrim.gorduraPct !== res.gorduraPct && `gordura ${fmtDelta(r1(res.gorduraPct! - rPrim.gorduraPct!))} pontos`,
        mesmaFonte(rPrim) && rPrim.massaMagraKg !== res.massaMagraKg && `massa magra ${fmtDelta(r1(res.massaMagraKg! - rPrim.massaMagraKg!))} kg`,
      ].filter(Boolean)
      if (partes.length) texto.push(`Desde a primeira avaliação (${dataBR(prim.data)}): ${partes.join(', ')}.`)
    }
  }
  if (ciclo && ciclo.previstos > 0) {
    const k = ciclo.recordes.length
    const e = ciclo.evolucoes[0]
    texto.push(
      `No ciclo ${ciclo.nome || 'atual'} você fez ${ciclo.feitos} de ${ciclo.previstos} treinos (${ciclo.aderenciaPct}%)${k ? ` e bateu ${k} ${k === 1 ? 'recorde' : 'recordes'}` : ''}.` +
        (e ? ` Maior evolução: ${e.nome}, de ${fmtNum(e.de)} para ${fmtNum(e.ate)} kg (+${Math.round(e.pct)}%).` : ''),
    )
  }

  return {
    atual,
    res,
    anterior: ant ? { data: ant.data, dias: Math.round((Date.parse(atual.data) - Date.parse(ant.data)) / DIA) } : null,
    destaques: [
      { rotulo: 'peso', valor: `${fmtNum(atual.pesoKg)} kg` },
      ...(res.gorduraPct != null ? [{ rotulo: 'gordura', valor: `${fmtNum(res.gorduraPct)}%` }] : []),
      ...(res.massaMagraKg != null ? [{ rotulo: 'massa magra', valor: `${fmtNum(res.massaMagraKg)} kg` }] : []),
      ...(res.imc != null ? [{ rotulo: 'IMC', valor: fmtNum(res.imc) }] : []),
    ],
    grupos,
    texto,
  }
}

type MesoDoAluno = { id: string; alunoId: string; meso: Meso; nome?: string }

// Ciclo de referência do relatório: o que terminou mais perto da avaliação (de 45 dias antes até 7 dias
// depois dela); sem nenhum, o que estava em andamento na data.
export function cicloDaAvaliacao(mesos: { id: string; meso: Meso }[], data: string): string | null {
  const fim = (m: { meso: Meso }) => fimISO(m.meso)
  const terminados = mesos.filter((m) => fim(m) <= somarDias(data, 7) && fim(m) >= somarDias(data, -45)).sort((a, b) => fim(b).localeCompare(fim(a)))
  if (terminados[0]) return terminados[0].id
  return mesos.find((m) => m.meso.inicio.slice(0, 10) <= data && fim(m) >= data)?.id ?? null
}

// Lembrete do coach, a cada mesociclo: ciclo terminado há até 30 dias e nenhuma avaliação do aluno a
// partir de 7 dias antes do fim. Um por aluno (o ciclo que terminou por último), o mais recente primeiro.
// Aluno arquivado: filtrar antes. `avs`: basta as avaliações desde corteAvaliacoes(agora).
export function avaliacoesParaFazer(mesos: MesoDoAluno[], avs: { alunoId: string; data: string }[], agora: Date) {
  const ultimo = new Map<string, MesoDoAluno>()
  for (const m of mesos) {
    if (!cicloTerminou(m.meso, agora) || diasDesdeFim(m.meso, agora) > RELATORIO_DIAS) continue
    const u = ultimo.get(m.alunoId)
    if (!u || fimISO(m.meso) > fimISO(u.meso)) ultimo.set(m.alunoId, m)
  }
  return [...ultimo.values()]
    .filter((m) => !avs.some((a) => a.alunoId === m.alunoId && a.data >= somarDias(fimISO(m.meso), -7)))
    .sort((a, b) => fimISO(b.meso).localeCompare(fimISO(a.meso)))
    .map((m) => ({ alunoId: m.alunoId, mesoId: m.id, nome: m.nome ?? '' }))
}

// Dia (AAAA-MM-DD, São Paulo) a partir do qual o Início do coach precisa ler avaliações para o lembrete.
export const corteAvaliacoes = (agora: Date) => new Date((diaSP(agora.getTime()) - (RELATORIO_DIAS + 7)) * DIA).toISOString().slice(0, 10)
