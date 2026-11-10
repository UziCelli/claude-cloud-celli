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
// Lipedema marcado pelo coach (dado de saúde): inverte a expectativa da região (aumento de medida deixa de ser "esperado").
export const LIPEDEMA = [
  { id: 'bracos', rotulo: 'Lipedema nos braços' },
  { id: 'pernas', rotulo: 'Lipedema nas pernas' },
] as const
export type Lipedema = (typeof LIPEDEMA)[number]['id']
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
  lipedema?: Lipedema[]
  comentario: string
  liberado: boolean
  liberadoEmMs?: number // hora da liberação (selo "nova" no Início do aluno)
}
export type AvaliacaoForm = Omit<Avaliacao, 'id' | 'liberado' | 'liberadoEmMs'>

// Faixas aceitas na leitura e no formulário (peso, altura e idade repetem as de firestore.rules).
export const FAIXA = { peso: [20, 300], altura: [100, 250], idade: [10, 100], perimetro: [1, 300], dobra: [0.5, 150] } as const

const DIA = 86400_000
const r1 = (x: number) => Math.round(x * 10) / 10
const r2 = (x: number) => Math.round(x * 100) / 100
export const somarDias = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00Z`) + n * DIA).toISOString().slice(0, 10)
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
  const lip = Array.isArray(x.lipedema) ? LIPEDEMA.map((l) => l.id).filter((id) => (x.lipedema as unknown[]).includes(id)) : []
  const le = x.liberadoEm as { toMillis?: () => number } | number | null | undefined
  const liberadoEmMs = typeof le === 'number' ? le : le && typeof le.toMillis === 'function' ? le.toMillis() : undefined
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
    lipedema: lip.length ? lip : undefined,
    comentario: typeof x.comentario === 'string' ? x.comentario : '',
    liberado: x.liberado === true,
    liberadoEmMs,
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
    ...(f.lipedema?.length ? { lipedema: LIPEDEMA.map((l) => l.id).filter((id) => f.lipedema!.includes(id)) } : {}),
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

export type Tom = 'bom' | 'atencao' | 'neutro'
export type Seta = 'sobe' | 'desce' | 'igual'
// `fraca`: leitura sem a dobra para confirmar (a cor sai mais clara).
export type Leitura = { tom: Tom; texto: string; fraca?: boolean }
export type Linha = { rotulo: string; un: string; atual: number; anterior: number | null; delta: number | null; seta: Seta | null; leitura: Leitura | null }
export type Grupo = { titulo: string; linhas: Linha[]; resumo?: { tom: Tom; texto: string } }
export type ItemResumo = { rotulo: string; delta: string; texto: string }
export type Destaque = { rotulo: string; valor: string; delta?: string; seta?: Seta; tom?: Tom }
export type RelatorioAvaliacao = {
  atual: Avaliacao
  res: Resultado
  anterior: { data: string; dias: number } | null
  destaques: Destaque[]
  resumo: { frase: string; ganhos: ItemResumo[]; observar: ItemResumo[] }
  grupos: Grupo[]
  texto: string[] // parágrafos do relatório escrito
}
type Ciclo = Pick<RelatorioCiclo, 'nome' | 'feitos' | 'previstos' | 'aderenciaPct' | 'recordes' | 'evolucoes'>

// Limiares: abaixo disso a variação é erro de medida e a seta fica "igual". Perímetro 0,5 cm; dobra 1 mm (adipômetro).
const LIMIAR: Record<string, number> = { cm: 0.5, mm: 1, kg: 0.1, '%': 0.1, '': 0.01 }
const limiarDe = (un: string) => LIMIAR[un] ?? 0.1

type PerimetroId = Ids<typeof PERIMETROS>
type DobraId = Ids<typeof DOBRAS>
// Dobra que acompanha cada perímetro (sem dobra: ombro, antebraços e panturrilhas). Quadril e coxas dividem a dobra da coxa.
export const PAR_DOBRA: Partial<Record<PerimetroId, DobraId>> = {
  torax: 'peitoral', cintura: 'suprailiaca', abdomen: 'abdominal', quadril: 'coxa', coxaD: 'coxa', coxaE: 'coxa', bracoD: 'triceps', bracoE: 'triceps',
}
// Região de exibição e, quando houver, o lipedema que a atinge.
const REGIAO: Record<PerimetroId, { grupo: 'Tronco' | 'Braços' | 'Pernas'; lipedema?: Lipedema }> = {
  ombro: { grupo: 'Tronco' }, torax: { grupo: 'Tronco' }, cintura: { grupo: 'Tronco' }, abdomen: { grupo: 'Tronco' },
  bracoD: { grupo: 'Braços', lipedema: 'bracos' }, bracoE: { grupo: 'Braços', lipedema: 'bracos' },
  antebracoD: { grupo: 'Braços', lipedema: 'bracos' }, antebracoE: { grupo: 'Braços', lipedema: 'bracos' },
  quadril: { grupo: 'Pernas', lipedema: 'pernas' }, coxaD: { grupo: 'Pernas', lipedema: 'pernas' }, coxaE: { grupo: 'Pernas', lipedema: 'pernas' },
  panturrilhaD: { grupo: 'Pernas', lipedema: 'pernas' }, panturrilhaE: { grupo: 'Pernas', lipedema: 'pernas' },
}
const DESCE = new Set<PerimetroId>(['cintura', 'abdomen']) // esperado cair; os demais, subir

// Medida x dobra do mesmo segmento. `dPerim` em cm, `dDobra` em mm (null = sem dobra para confirmar).
// Esperado "subir": medida maior sem dobra maior = massa; com dobra maior = gordura. Esperado "descer" (cintura,
// abdômen, região com lipedema): medida menor é bom; maior com dobra maior é a observar. Só descreve; nunca "piorou".
export function lerSegmento(esperado: 'subir' | 'descer', dPerim: number, dDobra: number | null, lipedema: boolean): Leitura {
  if (Math.abs(dPerim) < limiarDe('cm')) return { tom: 'neutro', texto: 'estável' }
  const subiu = dPerim > 0
  const dobraSobe = dDobra != null && dDobra >= limiarDe('mm')
  const dobraCai = dDobra != null && dDobra <= -limiarDe('mm')
  const lip = lipedema ? ' (considerando lipedema)' : ''
  const l = (tom: Tom, texto: string, fraca?: boolean): Leitura => ({ tom, texto: texto + lip, ...(fraca ? { fraca } : {}) })
  if (esperado === 'subir') {
    if (subiu) return dDobra == null ? l('bom', 'subiu, sem dobra para confirmar', true) : dobraSobe ? l('atencao', 'medida e dobra subiram: provável gordura') : l('bom', 'provável ganho de massa')
    return dobraCai ? l('bom', 'provável perda de gordura') : dDobra == null ? l('atencao', 'diminuiu, sem dobra para confirmar') : l('atencao', 'possível perda de massa')
  }
  if (!subiu) return dobraCai ? l('bom', 'perda de gordura') : l('bom', 'diminuiu')
  if (dobraSobe) return l('atencao', 'medida e dobra subiram: provável ganho de gordura')
  return dDobra == null ? l('atencao', 'subiu, sem dobra para confirmar') : l('neutro', 'subiu sem aumento de dobra (pode ser massa ou líquido)')
}

type Pref = 'subir' | 'cair' | null
const leituraSimples = (pref: Pref, delta: number): Leitura | null =>
  pref == null ? null : { tom: (pref === 'subir') === delta > 0 ? 'bom' : 'atencao', texto: delta > 0 ? 'aumentou' : 'diminuiu' }

type OpcoesLinha = { pref?: Pref; comparar?: boolean; arred?: (x: number) => number; leitura?: (delta: number) => Leitura }
// `pref`: o que é bom (null = neutro, só a seta). Abaixo do limiar a seta é "igual" e não há leitura.
const linha = (rotulo: string, un: string, atual: number | null | undefined, ant: number | null | undefined, o: OpcoesLinha = {}): Linha[] => {
  if (atual == null) return []
  const { pref = null, comparar = true, arred = r1, leitura } = o
  const delta = comparar && ant != null ? arred(atual - ant) : null
  const seta: Seta | null = delta == null ? null : Math.abs(delta) < limiarDe(un) ? 'igual' : delta > 0 ? 'sobe' : 'desce'
  const l = delta == null || seta === 'igual' ? null : leitura ? leitura(delta) : leituraSimples(pref, delta)
  return [{ rotulo, un, atual, anterior: ant ?? null, delta, seta, leitura: l }]
}

export const fmtDeltaUn = (l: Linha) => `${fmtDelta(l.delta!)}${l.un === '%' ? '%' : l.un ? ` ${l.un}` : ''}`
const forca = (l: Linha) => Math.abs(l.delta!) / limiarDe(l.un)

// Resumo de uma região: o tom mais forte (a observar > bom > neutro) e a medida que mais mexeu nesse tom.
function resumoGrupo(linhas: Linha[]): Grupo['resumo'] {
  const com = linhas.filter((l) => l.leitura)
  if (!com.length) return undefined
  const tom: Tom = com.some((l) => l.leitura!.tom === 'atencao') ? 'atencao' : com.some((l) => l.leitura!.tom === 'bom') ? 'bom' : 'neutro'
  const l = com.filter((x) => x.leitura!.tom === tom).sort((a, b) => forca(b) - forca(a))[0]
  return { tom, texto: `${l.rotulo} ${fmtDeltaUn(l)}: ${l.leitura!.texto}` }
}

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

  const fonte = mesmaFonte(rAnt)
  const lip = new Set(atual.lipedema ?? [])
  const perim = (grupo: 'Tronco' | 'Braços' | 'Pernas') =>
    PERIMETROS.filter((p) => REGIAO[p.id].grupo === grupo).flatMap((p) => {
      const par = PAR_DOBRA[p.id]
      const dDobra = par && atual.dobras[par] != null && ant?.dobras[par] != null ? r1(atual.dobras[par]! - ant.dobras[par]!) : null
      const comLip = !!REGIAO[p.id].lipedema && lip.has(REGIAO[p.id].lipedema!)
      const esperado = comLip || DESCE.has(p.id) ? 'descer' : 'subir'
      return linha(p.rotulo, 'cm', atual.perimetros[p.id], ant?.perimetros[p.id], { leitura: (d) => lerSegmento(esperado, d, dDobra, comLip) })
    })
  const composicao = [
    ...linha('Peso', 'kg', atual.pesoKg, ant?.pesoKg),
    ...linha('Altura', 'cm', atual.alturaCm, ant?.alturaCm),
    ...linha('IMC', '', res.imc, rAnt?.imc),
    ...linha('Gordura', '%', res.gorduraPct, rAnt?.gorduraPct, { pref: 'cair', comparar: fonte }),
    ...linha('Massa gorda', 'kg', res.massaGordaKg, rAnt?.massaGordaKg, { pref: 'cair', comparar: fonte }),
    ...linha('Massa magra', 'kg', res.massaMagraKg, rAnt?.massaMagraKg, { pref: 'subir', comparar: fonte }),
    ...linha('Cintura/quadril', '', res.rcq, rAnt?.rcq, { pref: 'cair', arred: r2 }),
  ]
  const grupos: Grupo[] = (
    [
      ['Composição corporal', composicao],
      ['Tronco', perim('Tronco')],
      ['Braços', perim('Braços')],
      ['Pernas', perim('Pernas')],
      [
        'Dobras cutâneas',
        [...DOBRAS.flatMap((d) => linha(d.rotulo, 'mm', atual.dobras[d.id], ant?.dobras[d.id], { pref: 'cair' })), ...linha('Soma das 7 dobras', 'mm', res.somaDobras, rAnt?.somaDobras, { pref: 'cair' })],
      ],
      [
        'Bioimpedância',
        BIO.flatMap((b) => linha(b.rotulo, b.un, atual.bio[b.id], ant?.bio[b.id], { pref: b.id === 'massaMuscularKg' ? 'subir' : 'cair' })),
      ],
    ] as [string, Linha[]][]
  )
    .filter(([, linhas]) => linhas.length > 0)
    .map(([titulo, linhas]) => ({ titulo, linhas, resumo: resumoGrupo(linhas) }))

  // Resumo do topo: composição primeiro (massa magra, gordura), depois as medidas que mais mexeram. Até 3 de cada.
  const doGrupo = (t: string) => grupos.find((g) => g.titulo === t)?.linhas ?? []
  const candidatas = [
    ...['Massa magra', 'Gordura'].flatMap((r) => doGrupo('Composição corporal').filter((l) => l.rotulo === r)),
    ...['Tronco', 'Braços', 'Pernas'].flatMap(doGrupo).sort((a, b) => (b.delta == null ? 0 : forca(b)) - (a.delta == null ? 0 : forca(a))),
  ].filter((l) => l.leitura && l.leitura.tom !== 'neutro')
  const item = (l: Linha): ItemResumo => ({ rotulo: l.rotulo, delta: fmtDeltaUn(l), texto: l.leitura!.texto })
  const magra = doGrupo('Composição corporal').find((l) => l.rotulo === 'Massa magra')
  const gorda = doGrupo('Composição corporal').find((l) => l.rotulo === 'Massa gorda')
  const partesFrase = [
    magra?.delta != null && magra.delta > 0 && `ganhou ${fmtNum(magra.delta)} kg de massa magra`,
    gorda?.delta != null && gorda.delta < 0 && `perdeu ${fmtNum(-gorda.delta)} kg de gordura`,
  ].filter(Boolean)
  const resumo: RelatorioAvaliacao['resumo'] = {
    frase: !ant ? 'Esta é a sua primeira avaliação: o ponto de partida.' : partesFrase.length ? `Você ${partesFrase.join(' e ')}.` : `Veja o que mudou desde ${dataBR(ant.data)}.`,
    ganhos: ant ? candidatas.filter((l) => l.leitura!.tom === 'bom').slice(0, 3).map(item) : [],
    observar: ant ? candidatas.filter((l) => l.leitura!.tom === 'atencao').slice(0, 3).map(item) : [],
  }

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
    const perimetros = ['Tronco', 'Braços', 'Pernas'].flatMap(doGrupo).filter((l) => l.delta != null)
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
    destaques: ([
      ['peso', `${fmtNum(atual.pesoKg)} kg`, 'Peso'],
      ...(res.gorduraPct != null ? [['gordura', `${fmtNum(res.gorduraPct)}%`, 'Gordura']] : []),
      ...(res.massaMagraKg != null ? [['massa magra', `${fmtNum(res.massaMagraKg)} kg`, 'Massa magra']] : []),
      ...(res.imc != null ? [['IMC', fmtNum(res.imc), 'IMC']] : []),
    ] as [string, string, string][]).map(([rotulo, valor, chave]): Destaque => {
      const l = doGrupo('Composição corporal').find((x) => x.rotulo === chave)
      return l?.delta == null ? { rotulo, valor } : { rotulo, valor, delta: fmtDelta(l.delta), seta: l.seta ?? 'igual', tom: l.leitura?.tom ?? 'neutro' }
    }),
    resumo,
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
