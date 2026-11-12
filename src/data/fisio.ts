// Métodos Fisioterapia: reabilitação pelo exercício, no escopo da Educação Física (docs/plano-fisio.md).
// Fonte: docs/fisio-pesquisa.md (pesquisa PubMed de 12/11/2026; PMIDs conferidos). Não inventar método,
// número nem referência fora dela. Linguagem: "ajuda na reabilitação", nunca "trata" ou "cura".
// Sem carga em kg: só intensidade relativa (%1RM, RM, esforço); a carga é do aluno (o teste barra "kg").

export type Nivel = 'ALTO' | 'MODERADO' | 'LIMITROFE'

// Ids iguais às articulações da anamnese quando existe (lombar, ombro, joelho, quadril, tornozelo, cervical).
export const QUEIXAS = [
  { id: 'lombar', rotulo: 'Lombar' },
  { id: 'ombro', rotulo: 'Ombro' },
  { id: 'joelho', rotulo: 'Joelho' },
  { id: 'quadril', rotulo: 'Quadril' },
  { id: 'tendoes', rotulo: 'Tendões' },
  { id: 'coxa', rotulo: 'Coxa e virilha' },
  { id: 'tornozelo', rotulo: 'Tornozelo e pé' },
  { id: 'cervical', rotulo: 'Pescoço' },
  { id: 'idosos', rotulo: 'Idosos e crônicas' },
] as const
export type QueixaId = (typeof QUEIXAS)[number]['id']

export type Ref = { autor: string; pmid: string }
export type MetodoFisio = {
  id: string
  nome: string
  queixas: QueixaId[]
  nivel: Nivel
  nivelNota?: string // ex.: "para força de adutores": o nível vale só para isso
  protocolo: string[]
  ressalva?: string
  liberacao?: string // quando exige liberação de médico/fisioterapeuta registrada
  encaminharSe: string[] // sinais de perigo: parar e procurar médico/fisioterapeuta
  alertaGeral?: boolean // true = a pesquisa não trouxe sinais próprios; usa ALERTA_GERAL (decisão do Victor, 12/11/2026)
  refs: Ref[]
}

// LIMITROFE = opcional, com ressalva visível (pode ser ocultado se o Victor quiser rigor máximo).
export const opcional = (m: MetodoFisio) => m.nivel === 'LIMITROFE'
export const linkPubmed = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`

const ALERTA_LOMBAR = [
  'Dor noturna ou em repouso que piora',
  'Febre ou perda de peso sem explicação',
  'Trauma',
  'Fraqueza ou dormência progressiva na perna',
  'Alteração para urinar ou evacuar',
  'Dormência na região genital',
]
const LIBERACAO_LOMBAR = 'Dor irradiada (ciática/hérnia)'
// Sinais gerais de perigo (texto de segurança do app, não evidência da pesquisa) para os métodos
// sem sinais próprios. Decisão do Victor (12/11/2026).
export const ALERTA_GERAL = [
  'Dor forte que não passa',
  'Inchaço',
  'Travamento',
  'Formigamento ou dormência',
  'Febre',
  'Dor no peito, falta de ar ou tontura',
]
const ALERTA_TENDAO = [
  'Dor noturna ou em repouso crescente',
  'Piora após 2 semanas',
  'Inchaço marcado',
  'Estalo com perda súbita de força',
  'Estagnação por 6–8 semanas',
]

export const METODOS_FISIO: MetodoFisio[] = [
  // Coluna lombar — dor lombar crônica inespecífica
  {
    id: 'M01', nome: 'Exercício geral progressivo supervisionado', queixas: ['lombar'], nivel: 'ALTO',
    protocolo: [
      '2–4x/sem, sessões de 25–30 min de trabalho específico, 8–13 semanas. Doses baixas a moderadas já funcionam (dose semanal verificada no artigo; séries e reps são sugestão).',
      'Exercícios: agachamento/leg press, remada, dobradiça de quadril (hinge) com carga leve a moderada, 2–3 séries de 8–15 reps.',
    ],
    ressalva: 'Nenhuma modalidade é claramente superior. Deixar o aluno escolher a que adere melhor.',
    liberacao: LIBERACAO_LOMBAR, encaminharSe: ALERTA_LOMBAR,
    refs: [{ autor: 'Hayden 2021 (Cochrane)', pmid: '34580864' }, { autor: 'Arora 2026 (BJSM)', pmid: '42785965' }],
  },
  {
    id: 'M02', nome: 'Treino resistido progressivo para lombar', queixas: ['lombar'], nivel: 'MODERADO',
    protocolo: [
      '2–4 semanas de adaptação com carga leve.',
      'Depois 2–3x/sem, 2–4 séries de 6–12 reps a ~65–80% 1RM; subir 2–5% quando completar as reps sem aumento de dor.',
      'Idosos: 3x/sem ou mais, por mais de 12 semanas.',
    ],
    ressalva: 'Carga externa não é superior a exercício sem carga; o ganho parece vir da exposição e da aderência.',
    liberacao: LIBERACAO_LOMBAR, encaminharSe: ALERTA_LOMBAR,
    refs: [{ autor: 'Rodríguez-Domínguez 2025', pmid: '41065407' }, { autor: 'Ranzani 2025', pmid: '41356326' }],
  },
  {
    id: 'M03', nome: 'Core: estabilização, controle motor e Pilates', queixas: ['lombar'], nivel: 'MODERADO',
    protocolo: [
      'Core resistido: 3–4x/sem, 30–45 min.',
      'Estabilização: 3–4x/sem, 40–60 min, 6–8 semanas.',
      'Pilates: 2–3x/sem, ~50 min, 8–12 semanas.',
      'Progressão: ativação de baixa carga (prancha com apoio, bird dog) → tarefas funcionais (hinge, carregadas, anti-rotação) → carga.',
    ],
    ressalva: 'Não é superior ao resistido geral. Individualizar melhora o resultado.',
    liberacao: LIBERACAO_LOMBAR, encaminharSe: ALERTA_LOMBAR,
    refs: [{ autor: 'Guo 2025', pmid: '41178988' }, { autor: 'Capel-Alcaraz 2023', pmid: '37432388' }, { autor: 'Fleckenstein 2022', pmid: '35914641' }],
  },
  // Ombro — dor relacionada ao manguito rotador / subacromial
  {
    id: 'M04', nome: 'Exercício resistido progressivo de manguito e escápula', queixas: ['ombro'], nivel: 'MODERADO',
    protocolo: [
      'Exercícios: rotação externa/interna com elástico, elevação no plano da escápula, remada, desenvolvimento leve.',
      '2–3x/sem, 2–3 séries de 8–12 reps, 12 semanas ou mais; progredir a cada 1–2 semanas pela regra R1.',
      'A literatura usa de 2–7x/sem, 1–3 séries, 4–30 reps: não há receita única.',
    ],
    ressalva: 'Nenhum tipo (excêntrico, escapular, controle motor) é comprovadamente melhor. Exercícios proprioceptivos adicionais não acrescentaram benefício.',
    encaminharSe: [
      'Trauma com perda súbita da elevação do braço',
      'Dor noturna intensa e progressiva',
      'Formigamento ou fraqueza',
      'Perda global de movimento (suspeita de ombro congelado)',
      'Dor no ombro com sintoma no peito',
    ],
    refs: [{ autor: 'Lafrance 2024 (JOSPT)', pmid: '38848304' }, { autor: 'Lazzarini 2026 (BJSM)', pmid: '42135016' }, { autor: 'Dubé 2023', pmid: '36796859' }],
  },
  // Joelho
  {
    id: 'M05', nome: 'Treino resistido progressivo na artrose de joelho e quadril', queixas: ['joelho', 'quadril'], nivel: 'ALTO',
    protocolo: [
      'Exercícios: cadeira extensora, leg press, agachamento parcial, flexora, abdução de quadril, panturrilha.',
      '2–3x/sem, intensidade moderada (~40–60% 1RM funciona bem para dor e função; mais alto para força), 12 semanas ou mais.',
      'Supervisionado rende mais que em casa. Combinar com aeróbico melhora o resultado no curto prazo.',
    ],
    ressalva: 'A dose exata tem certeza baixa; mais volume nem sempre é melhor (curva em U invertido).',
    encaminharSe: ['Joelho inchado que piora', 'Travamento', 'Falseio', 'Dor noturna', 'Vermelhidão ou febre', 'Dor pior por mais de 24–48 h'],
    refs: [{ autor: 'Brown 2026 (120 ensaios)', pmid: '42030701' }, { autor: 'Núñez-Cortés 2026 (JOSPT)', pmid: '42676087' }],
  },
  {
    id: 'M06', nome: 'Dor patelofemoral (frente do joelho): fortalecimento de quadril + joelho', queixas: ['joelho'], nivel: 'MODERADO',
    protocolo: [
      'Exercícios: abdução e rotação externa de quadril (ostra, abdução com miniband), ponte, stiff; leg press, agachamento e extensora em amplitude sem dor.',
      '2–3x/sem, 6–12 semanas; aumentar carga e amplitude conforme a dor permitir.',
    ],
    ressalva: 'Quadril + joelho combinados dão o resultado mais consistente.',
    encaminharSe: ['Sem melhora em 6–8 semanas', 'Travamento', 'Falseio', 'Inchaço', 'Luxação de patela'],
    refs: [{ autor: 'Contreras-Mora 2026', pmid: '42784051' }],
  },
  {
    id: 'M07', nome: 'Lesão degenerativa de menisco (meia-idade): programa de força', queixas: ['joelho'], nivel: 'ALTO',
    protocolo: [
      '12 semanas, 2–3x/sem: força de quadril e joelho (agachamento, leg press, avanço, step) + controle neuromuscular.',
      'Fundamento: resultado equivalente à cirurgia (meniscectomia parcial) em 2 e 10 anos.',
    ],
    liberacao: 'Sempre',
    encaminharSe: ['Joelho que trava e não estende', 'Lesão traumática', 'Aluno jovem', 'Inchaço importante'],
    refs: [{ autor: 'Kise 2016 (BMJ)', pmid: '27440192' }, { autor: 'Berg 2025 (BJSM)', pmid: '39326908' }, { autor: 'Meng 2024', pmid: '38531745' }],
  },
  {
    id: 'M08', nome: 'Pós-reconstrução de LCA: fase de academia', queixas: ['joelho'], nivel: 'MODERADO',
    protocolo: [
      'Fortalecimento de quadríceps (leg press, agachamento, extensora) e posteriores.',
      'Trabalho unilateral para corrigir assimetria; cadeia aberta e fechada são ambas aceitáveis; excêntrico ajuda a força do quadríceps.',
      'Meta de referência: força do lado operado ≥90% do lado sadio (simetria sozinha não garante boa mecânica de aterrissagem).',
    ],
    ressalva: 'Dose e critérios de progressão têm evidência fraca; saltos e retorno ao esporte dependem do cirurgião/fisioterapeuta.',
    liberacao: 'Sempre', encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Kotsifaki 2023 (guia Aspetar)', pmid: '36731908' }, { autor: 'Perriman 2018', pmid: '29685058' }],
  },
  {
    id: 'M09', nome: 'Aquecimento neuromuscular para prevenir lesão de LCA e membros inferiores', queixas: ['joelho'], nivel: 'ALTO',
    protocolo: [
      '15–20 min antes do treino, 2–3x/sem, contínuo.',
      'Corrida com mudança de direção, Nordic, avanço, panturrilha, prancha, equilíbrio unipodal, saltos com aterrissagem controlada (sem joelho para dentro).',
      'Fundamento: cerca de metade das lesões de LCA a menos, principalmente em mulheres jovens.',
    ],
    encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Webster 2018 (J Orthop Res)', pmid: '29737024' }, { autor: 'Watson 2026 (Am J Sports Med)', pmid: '41486737' }],
  },
  // Tendões (tendinopatias)
  {
    id: 'M10', nome: 'Heavy Slow Resistance (HSR): tendão patelar e de Aquiles', queixas: ['tendoes', 'joelho', 'tornozelo'], nivel: 'MODERADO',
    protocolo: [
      '3 exercícios. Patelar: agachamento, leg press, hack. Aquiles: panturrilha em pé, sentado e no leg press.',
      '3x/sem, cadência ~3 s subida + 3 s descida.',
      '4 séries, progredindo de 15RM → 12 → 10 → 8 → 6RM ao longo de ~12 semanas.',
    ],
    ressalva: 'Tendão muito irritado começa pela isometria (M12). Não usar no cotovelo lateral (aderência de 32% por piora da dor).',
    encaminharSe: ALERTA_TENDAO,
    refs: [{ autor: 'Liu 2026', pmid: '42192475' }, { autor: 'Bruna-Mejias 2026', pmid: '42783641' }],
  },
  {
    id: 'M11', nome: 'Sobrecarga excêntrica (protocolo Alfredson): tendão de Aquiles', queixas: ['tendoes', 'tornozelo', 'joelho'], nivel: 'MODERADO',
    protocolo: [
      'Descida lenta unilateral no degrau, joelho estendido e depois flexionado, 3x15 de cada, até 2x/dia, 12 semanas.',
      'Subida com a perna boa; adicionar carga quando ficar indolor. Ajustar o volume à tolerância.',
      'Variação patelar (nível LIMÍTROFE para patelar): agachamento unilateral em prancha inclinada 25°, 3x15.',
    ],
    ressalva: 'Dor no ponto de inserção no calcanhar: não descer abaixo da linha do degrau.',
    encaminharSe: ALERTA_TENDAO,
    refs: [{ autor: 'Sivrika 2023', pmid: '37628466' }, { autor: 'Rhim 2020', pmid: '32728589' }],
  },
  {
    id: 'M12', nome: 'Isometria sustentada', queixas: ['tendoes', 'joelho', 'tornozelo'], nivel: 'LIMITROFE',
    protocolo: [
      '4–5 séries de 30–45 s a ~70% do esforço máximo, 2 min de intervalo, no ângulo tolerável (ex.: extensora a 60° para patelar; panturrilha isométrica para Aquiles).',
      'Uso correto: porta de entrada quando o exercício dinâmico ainda não é tolerado; depois migrar para o HSR (M10).',
    ],
    ressalva: 'Não prometer alívio da dor. Os estudos recentes mostram efeito igual ao exercício dinâmico, não superior, e curto.',
    encaminharSe: ALERTA_TENDAO,
    refs: [{ autor: 'Soliman 2026', pmid: '42203537' }, { autor: 'Holden 2019', pmid: '31735531' }, { autor: 'Challoumas 2021', pmid: '34900334' }],
  },
  {
    id: 'M13', nome: 'Carga tendínea em estágios', queixas: ['tendoes'], nivel: 'LIMITROFE', nivelNota: 'como sequência',
    protocolo: ['Estágio 1 isometria (M12) → Estágio 2 HSR (M10) → Estágio 3 armazenamento de energia (saltos, M20) → Estágio 4 gesto do esporte.'],
    ressalva: 'As peças têm ensaios clínicos; o encadeamento é consenso de especialistas.',
    encaminharSe: ALERTA_TENDAO, refs: [],
  },
  {
    id: 'M14', nome: 'Tendinopatia glútea (dor lateral do quadril): educação de carga + exercício', queixas: ['tendoes', 'quadril'], nivel: 'MODERADO',
    protocolo: [
      'Educação: evitar ficar apoiado em uma perna com o quadril "caído", cruzar as pernas e sentar muito baixo.',
      'Exercício: fortalecimento de abdutores e carga funcional (ponte, agachamento, step), ~8 semanas, progressivo.',
      'Fundamento: melhor que infiltração de corticoide em 8 semanas e em 1 ano.',
    ],
    encaminharSe: ALERTA_TENDAO,
    refs: [{ autor: 'Mellor 2018 (BMJ, LEAP)', pmid: '29720374' }, { autor: 'Wang 2025', pmid: '39891188' }],
  },
  // Coxa e virilha
  {
    id: 'M15', nome: 'Nordic (flexão nórdica)', queixas: ['coxa'], nivel: 'MODERADO', nivelNota: 'para força e arquitetura muscular',
    protocolo: [
      'Volume alto (muda força e estrutura do músculo): 2–3 séries de 8–12 reps, 2–3x/sem.',
      'Manutenção de força: 1–2 séries de 3–5 reps, 1–2x/sem.',
      'Começar com volume baixo.',
    ],
    ressalva: 'Como prevenção isolada de lesão a evidência é mais fraca; funciona melhor dentro do aquecimento neuromuscular (M09).',
    encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Cholp 2025', pmid: '41178985' }, { autor: 'Pecci 2025', pmid: '40230340' }],
  },
  {
    id: 'M16', nome: 'Alongamento sob carga para posteriores (Askling, protocolo L)', queixas: ['coxa'], nivel: 'MODERADO',
    protocolo: [
      'Uso: fase de retorno após estiramento de posterior de coxa.',
      'Exercícios excêntricos em posição alongada ("extender", "diver", "glider").',
      'Fundamento: retorno em média em 49 vs 86 dias em atletas de elite (um ensaio, 56 atletas).',
    ],
    liberacao: 'Sempre', encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Askling 2014', pmid: '24620041' }],
  },
  {
    id: 'M17', nome: 'Copenhagen (adução em prancha lateral)', queixas: ['coxa'], nivel: 'MODERADO', nivelNota: 'para força de adutores',
    protocolo: ['2x/sem por 8 semanas; começar com alavanca curta (apoio no joelho) e evoluir para longa (apoio no tornozelo).'],
    ressalva: 'Não vender como prevenção de lesão na virilha (evidência baixa; uma meta-análise do tema foi retratada).',
    encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Quintana-Cepedal 2024', pmid: '39551738' }, { autor: 'Wang 2025', pmid: '41217257' }],
  },
  // Tornozelo e pé
  {
    id: 'M18', nome: 'Equilíbrio/propriocepção + fortalecimento com elástico (pós-entorse já liberada e instabilidade crônica)', queixas: ['tornozelo'], nivel: 'MODERADO',
    protocolo: [
      'Equilíbrio: apoio unipodal 3x30–45 s, olhos abertos → fechados → disco/bosu → tarefa dupla → alcances multidirecionais.',
      'Força: eversão, inversão e dorsiflexão com elástico 3x12–15; panturrilha bi → unipodal 3x10–15.',
      '2–3x/sem, mínimo 6–8 semanas, depois manutenção.',
    ],
    liberacao: 'Pós-entorse recente (lesão aguda)',
    encaminharSe: ['Entorse recente sem conseguir apoiar o pé', 'Inchaço grande', 'Travamento'],
    refs: [{ autor: 'Martin 2021 (diretriz JOSPT)', pmid: '33789434' }, { autor: 'Chen 2026 (EFORT Open Rev)', pmid: '42227253' }],
  },
  {
    id: 'M19', nome: 'Fascite plantar: panturrilha de alta carga com dedos elevados', queixas: ['tornozelo'], nivel: 'LIMITROFE',
    protocolo: [
      'Elevação de calcanhar unilateral com toalha enrolada sob os dedos, dias alternados.',
      'Cadência lenta com pausa no topo, carga progressiva (12RM → 8RM em ~3 meses).',
    ],
    ressalva: 'Acelera a melhora aos 3 meses; sem diferença aos 6 e 12 meses.',
    encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Rathleff 2015', pmid: '25145882' }],
  },
  {
    id: 'M20', nome: 'Pliometria progressiva', queixas: ['tornozelo'], nivel: 'MODERADO', nivelNota: 'para desempenho',
    protocolo: [
      'Estágios: aterrissagem bipodal controlada 3x5 → saltos curtos 3x8–10 → unipodal e laterais → profundidade e mudança de direção.',
      '2x/sem, 48 h entre sessões.',
      'Critério para avançar: sem dor, sem joelho para dentro, aterrissagem consistente.',
    ],
    liberacao: 'Após lesão', encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Ramirez-Campillo 2020 (Sports Med)', pmid: '32915430' }, { autor: 'Oliver 2023 (Sports Med)', pmid: '37897637' }],
  },
  // Pescoço
  {
    id: 'M21', nome: 'Fortalecimento de pescoço, ombros e escápula', queixas: ['cervical'], nivel: 'LIMITROFE',
    protocolo: [
      'Exercícios: elevação lateral, remada, encolhimento, face pull, extensão cervical isométrica/elástico.',
      '~1 h por semana no total (1x60, 3x20 ou blocos curtos diários), 2–3 séries de 8–12 reps difíceis nas últimas repetições, 10 semanas ou mais.',
    ],
    ressalva: 'Ensaios grandes em trabalhadores mostram ~50% menos dor, mas as meta-análises dão certeza baixa; nenhum tipo é superior.',
    encaminharSe: ['Dor que desce para o braço com fraqueza ou dormência', 'Tontura ou desmaio', 'Dor de cabeça súbita e forte', 'Trauma recente'],
    refs: [{ autor: 'Dalager 2015', pmid: '25816746' }, { autor: 'Jones 2024', pmid: '38219373' }, { autor: 'de Zoete 2020', pmid: '33139256' }],
  },
  // Idosos e condições crônicas
  {
    id: 'M22', nome: 'Prevenção de quedas: equilíbrio + funcional + força', queixas: ['idosos'], nivel: 'ALTO',
    protocolo: [
      'Equilíbrio desafiador: tandem, unipodal, marcha em linha, passos laterais.',
      'Força: sentar-levantar, agachamento com apoio, panturrilha, step.',
      '3x/sem, somando ~3 h semanais, contínuo. Progressão: menos apoio das mãos, base menor, superfície macia.',
      'Fundamento: −23% na taxa de quedas; equilíbrio + funcional + resistido chega a −34%. Força isolada não basta.',
    ],
    liberacao: 'Queda recente com lesão, tontura, desmaio ou osteoporose grave', encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Sherrington 2019 (Cochrane)', pmid: '30703272' }],
  },
  {
    id: 'M23', nome: 'Treino de potência / excêntrico em idosos', queixas: ['idosos'], nivel: 'MODERADO',
    protocolo: ['2–3x/sem, 2–3 séries de 6–10 reps, subida rápida e descida controlada, ~40–60% 1RM, 8–12 semanas.'],
    encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Lan 2026 (Exp Gerontol)', pmid: '42660338' }],
  },
  {
    id: 'M24', nome: 'Treino resistido na fibromialgia', queixas: ['idosos'], nivel: 'MODERADO',
    protocolo: ['2–3x/sem, intensidade moderada, 2–3 séries de 8–12 reps, progressão gradual, ~12 semanas, evitando picos de dor.'],
    liberacao: 'Sempre', encaminharSe: ALERTA_GERAL, alertaGeral: true,
    refs: [{ autor: 'Rech 2026 (J Bodyw Mov Ther)', pmid: '42264849' }, { autor: 'Casanova-Rodríguez 2026 (Ann Phys Rehabil Med)', pmid: '42551246' }],
  },
  {
    id: 'M25', nome: 'Treino resistido para massa óssea e sarcopenia', queixas: ['idosos'], nivel: 'MODERADO',
    protocolo: [
      'Osso: 2–3x/sem, ≥70% 1RM quando liberado, 8–12 reps, longa duração; versão de alta intensidade com impacto (modelo LIFTMOR: 2x/sem, 30 min, 8 meses, sempre supervisionado).',
      'Sarcopenia: 2–3x/sem, 2–3 séries de 8–12 reps, grandes grupos musculares.',
      'Cuidados: evitar flexão de coluna com carga e torções.',
    ],
    liberacao: 'Osteoporose', encaminharSe: ['Dor lombar súbita após esforço: parar e encaminhar'],
    refs: [
      { autor: 'Zhao 2025 (J Orthop Surg Res)', pmid: '40420105' }, { autor: 'Watson 2019', pmid: '30612163' },
      { autor: 'Harding 2020', pmid: '32176813' }, { autor: 'Alsubaie 2026 (BMC Geriatr)', pmid: '42947012' },
    ],
  },
]

// Regras globais do grupo (valem para todos os métodos).
export const REGRAS_FISIO: { id: string; titulo: string; texto: string; evidencia: string; refs: Ref[] }[] = [
  {
    id: 'R1', titulo: 'Monitoramento de dor',
    texto: 'Escala 0–10. Dor durante o exercício é aceitável se for tolerável (referência prática: até ~5/10 em tendão; ≤3–4/10 nas demais queixas), voltar ao nível basal em até 24 h e não piorar a rigidez matinal. Se passar disso: reduzir carga/volume na próxima sessão. Estável ou menor por 2–3 sessões: progredir.',
    evidencia: 'MODERADO (ensaio clínico em tendão de Aquiles com seguimento de 5 anos; o número exato do limiar é convenção prática)',
    refs: [{ autor: 'Silbernagel 2007', pmid: '17307888' }, { autor: 'Silbernagel 2010', pmid: '21084657' }],
  },
  {
    id: 'R2', titulo: 'Progressão por critério',
    texto: 'Avançar por dor, função e força, nunca só por calendário. Mudar 1 variável por vez. Reavaliar a cada 4 semanas.',
    evidencia: 'Consenso', refs: [],
  },
  {
    id: 'R3', titulo: 'Exercício como 1ª linha',
    texto: 'Exercício progressivo por pelo menos ~12 semanas antes de qualquer conclusão. Nenhum tipo de exercício é universalmente superior; aderência e progressão importam mais que a modalidade.',
    evidencia: 'ALTO', refs: [{ autor: 'Hayden 2021 (Cochrane)', pmid: '34580864' }, { autor: 'Challoumas 2023', pmid: '37553459' }],
  },
  {
    id: 'R4', titulo: 'Elástico equivale a peso',
    texto: 'Resistência elástica gera ganhos de força semelhantes a halteres/máquinas quando o esforço é equiparado. Pode substituir carga em qualquer método.',
    evidencia: 'MODERADO', refs: [{ autor: 'Lopes 2019', pmid: '30815258' }],
  },
  {
    id: 'R5', titulo: 'Superfície instável (bosu, disco)',
    texto: 'Usar como progressão de equilíbrio, com carga leve. Nunca para força máxima/hipertrofia nem com carga alta.',
    evidencia: 'MODERADO para equilíbrio; sem vantagem para força',
    refs: [{ autor: 'Doan 2026', pmid: '42468010' }, { autor: 'Gao 2025', pmid: '39839523' }],
  },
  {
    id: 'R6', titulo: 'Educação em dor junto com o treino',
    texto: 'Mensagens simples durante a sessão: dor não é igual a dano; o corpo se adapta à carga gradual. Sem abordagem psicoterápica.',
    evidencia: 'MODERADO', refs: [{ autor: 'Siddall 2022 (Pain)', pmid: '33863860' }],
  },
  {
    id: 'R7', titulo: 'Força previne lesão',
    texto: 'Treino de força regular reduz lesões esportivas a cerca de um terço; alongamento isolado não reduz.',
    evidencia: 'ALTO', refs: [{ autor: 'Lauersen 2014', pmid: '24100287' }, { autor: 'Lauersen 2018', pmid: '30131332' }],
  },
  {
    id: 'R8', titulo: 'Amplitude total para mobilidade',
    texto: 'Treino resistido em amplitude completa com excêntrica controlada ganha amplitude de forma semelhante ao alongamento.',
    evidencia: 'MODERADO', refs: [{ autor: 'Afonso 2021', pmid: '33917036' }],
  },
]

// Aviso fixo do grupo (escopo: só prescrição de exercício; o app nunca diagnostica).
export const AVISO_FISIO =
  'Ajuda na reabilitação; não substitui médico ou fisioterapeuta. A queixa é a informada pelo aluno ou já diagnosticada por um profissional.'
