// Segmentos do corpo: cruza a medida (perímetro x dobra) com a evolução da carga dos exercícios do segmento.
// Só descreve; nunca diz "piorou". Funções puras.
import catalogo from '../data/exercicios.json'
import { diaSP } from './acesso'
import { DESCE, fmtDelta, fmtNum, lerSegmento, PAR_DOBRA, PERIMETROS, REGIAO, type Avaliacao, type Leitura, type Tom } from './avaliacao'
import { norm } from './busca'
import type { Ocorrencia } from './evolucao'

type PerimetroId = (typeof PERIMETROS)[number]['id']
export type SegmentoId = 'ombros' | 'peito' | 'costas' | 'bracos' | 'antebracos' | 'abdomen' | 'quadril' | 'coxas' | 'panturrilhas'

// `perimetros`: os que medem o segmento (vazio = só carga). A dobra par é a do 1º perímetro (PAR_DOBRA).
// O esperado "descer" (cintura/abdômen) vem de DESCE; o lipedema marcado também inverte, via REGIAO.
export const SEGMENTOS: { id: SegmentoId; rotulo: string; perimetros: PerimetroId[] }[] = [
  { id: 'ombros', rotulo: 'Ombros', perimetros: ['ombro'] },
  { id: 'peito', rotulo: 'Peito', perimetros: ['torax'] },
  { id: 'costas', rotulo: 'Costas', perimetros: [] },
  { id: 'bracos', rotulo: 'Braços', perimetros: ['bracoD', 'bracoE'] },
  { id: 'antebracos', rotulo: 'Antebraços', perimetros: ['antebracoD', 'antebracoE'] },
  { id: 'abdomen', rotulo: 'Abdômen', perimetros: ['abdomen', 'cintura'] },
  { id: 'quadril', rotulo: 'Quadril e glúteos', perimetros: ['quadril'] },
  { id: 'coxas', rotulo: 'Coxas', perimetros: ['coxaD', 'coxaE'] },
  { id: 'panturrilhas', rotulo: 'Panturrilhas', perimetros: ['panturrilhaD', 'panturrilhaE'] },
]

const POR_GRUPO: Record<string, SegmentoId | null> = {
  Peitorais: 'peito', Dorsais: 'costas', Ombros: 'ombros', 'Bíceps': 'bracos', 'Tríceps': 'bracos', 'Antebraço': 'antebracos',
  'Posterior de Coxa': 'coxas', Panturrilha: 'panturrilhas', 'Power Exercises': null,
}
// Grupos que se dividem pelo nome (texto normalizado): [palavras do 2º segmento, 1º segmento, 2º segmento].
const DIVIDE: Record<string, [RegExp, SegmentoId, SegmentoId]> = {
  'Quadríceps e Glúteos': [/pelvica|gluteo|coice/, 'quadril', 'coxas'],
  'Adutores e Abdutores': [/abdu|monster/, 'quadril', 'coxas'],
  'Abdome e Lombar': [/lombar|extensao|hiper|superman|perdigueiro/, 'costas', 'abdomen'],
}

const DO_CATALOGO = new Map<string, SegmentoId | null>(
  catalogo.flatMap((g) =>
    g.exercicios.map((e): [string, SegmentoId | null] => {
      const d = DIVIDE[g.grupo]
      return [norm(e.nome), d ? (d[0].test(norm(e.nome)) ? d[1] : d[2]) : (POR_GRUPO[g.grupo] ?? null)]
    }),
  ),
)

// Nome fora do catálogo (texto livre) ou de Power Exercises: null. Nunca adivinha.
export const segmentoDoExercicio = (nome: string): SegmentoId | null => DO_CATALOGO.get(norm(nome)) ?? null

export type ClasseCarga = 'sobe' | 'cai' | 'estavel'
export type CargaSegmento = { pct: number; n: number; classe: ClasseCarga; melhor: { nome: string; de: number; ate: number } }

const LIMIAR_CARGA = 2 // %
const diaISO = (iso: string) => diaSP(Date.parse(`${iso}T12:00Z`))
const mediana = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  const m = s.length >> 1
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

// `hist`: historicoExercicios. Janela: de `desdeISO` a `ateISO` (inclusive). Segmento sem exercício válido fica de fora.
export function cargaPorSegmento(hist: Record<string, Ocorrencia[]>, desdeISO: string, ateISO: string) {
  const de = diaISO(desdeISO)
  const ate = diaISO(ateISO)
  const out: Partial<Record<SegmentoId, CargaSegmento>> = {}
  if (ate <= de) return out
  const porSeg = new Map<SegmentoId, { nome: string; de: number; ate: number; pct: number }[]>()
  for (const [nome, os] of Object.entries(hist)) {
    const seg = segmentoDoExercicio(nome)
    if (!seg) continue
    const cargas = os.filter((o) => o.conta && o.dia != null && o.dia >= de && o.dia <= ate && o.cargaMax != null && o.cargaMax > 0).sort((a, b) => a.dia! - b.dia!).map((o) => o.cargaMax!)
    if (cargas.length < 2) continue
    // A maior carga só vale se passar do limiar sobre a primeira; senão vale a última (assim a queda aparece).
    const maior = Math.max(...cargas)
    const fim = maior >= cargas[0] * (1 + LIMIAR_CARGA / 100) ? maior : cargas.at(-1)!
    porSeg.set(seg, [...(porSeg.get(seg) ?? []), { nome, de: cargas[0], ate: fim, pct: ((fim - cargas[0]) / cargas[0]) * 100 }])
  }
  for (const [seg, xs] of porSeg) {
    const pct = mediana(xs.map((x) => x.pct))
    const { pct: _, ...melhor } = xs.reduce((a, b) => (b.pct > a.pct ? b : a))
    out[seg] = { pct, n: xs.length, classe: pct >= LIMIAR_CARGA ? 'sobe' : pct <= -LIMIAR_CARGA ? 'cai' : 'estavel', melhor }
  }
  return out
}

export type Veredito = 'melhorou' | 'observar' | 'estavel'
export type Cruzamento = { veredito: Veredito; tom: Tom; texto: string; fraca?: boolean }
const TOM: Record<Veredito, Tom> = { melhorou: 'bom', observar: 'atencao', estavel: 'neutro' }

// Medida (lerSegmento) x classe da carga. Sem nenhum dos dois: null (segmento omitido).
export function cruzar(medida: Leitura | null, carga: ClasseCarga | null): Cruzamento | null {
  const r = (veredito: Veredito, texto: string): Cruzamento => ({ veredito, tom: TOM[veredito], texto, ...(medida?.fraca ? { fraca: true } : {}) })
  if (!medida) return carga === 'sobe' ? r('melhorou', 'mais forte (só pela carga)') : carga === 'cai' ? r('observar', 'carga caiu') : carga === 'estavel' ? r('estavel', 'carga estável') : null
  const parado = medida.tom === 'neutro' && medida.texto.startsWith('estável')
  if (medida.tom === 'bom') {
    const gordura = /gordura|diminuiu/.test(medida.texto)
    if (carga === 'cai') return r('observar', 'medida melhorou, mas a carga caiu')
    if (carga === 'sobe') return r('melhorou', gordura ? `${medida.texto}, e a carga subiu` : 'ganho de massa, confirmado pela carga')
    return r('melhorou', gordura ? medida.texto : 'provável ganho, sem confirmar pela carga')
  }
  if (medida.tom === 'atencao') return r('observar', carga === 'sobe' ? 'mais forte, mas a medida pede atenção' : medida.texto)
  if (carga === 'sobe') return r('melhorou', parado ? 'mais forte, medida estável' : 'mais forte')
  if (carga === 'cai') return r('observar', 'carga caiu')
  return r('estavel', parado ? 'sem mudança' : medida.texto)
}

// Medida do segmento entre duas avaliações: média dos deltas dos perímetros medidos nas duas.
export function medidaSegmento(seg: (typeof SEGMENTOS)[number], atual: Avaliacao, ant: Avaliacao) {
  const ps = seg.perimetros.filter((p) => atual.perimetros[p] != null && ant.perimetros[p] != null)
  if (!ps.length) return null
  const delta = Math.round((ps.reduce((s, p) => s + atual.perimetros[p]! - ant.perimetros[p]!, 0) / ps.length) * 10) / 10
  const par = PAR_DOBRA[seg.perimetros[0]]
  const dDobra = par && atual.dobras[par] != null && ant.dobras[par] != null ? Math.round((atual.dobras[par]! - ant.dobras[par]!) * 10) / 10 : null
  const lip = REGIAO[seg.perimetros[0]].lipedema
  const comLip = !!lip && !!atual.lipedema?.includes(lip)
  const desce = comLip || seg.perimetros.some((p) => DESCE.has(p))
  return { rotulo: 'Medida', delta: `${fmtDelta(delta)} cm`, leitura: lerSegmento(desce ? 'descer' : 'subir', delta, dDobra, comLip) }
}

// "Leg Press 45: 200 → 230 kg (+15%)" do melhor exercício.
export const textoCarga = ({ nome, de, ate }: CargaSegmento['melhor']) => `${nome}: ${fmtNum(de)} → ${fmtNum(ate)} kg (${fmtDelta(Math.round((ate / de - 1) * 100))}%)`
