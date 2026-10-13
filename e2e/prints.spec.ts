// Prints do app para a landing page. Só roda com PRINTS=1 (o CI não roda). Só emulador (demo-forca), dados fictícios.
// Saída: PRINTS_DIR (fora do repositório). Celular 390x844 @3x, só a viewport.
import { mkdirSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarAlunoAguardando, criarCoach, definirPagoAte, criarMeso, criarRegistro, gravarDoc, hojeSaoPaulo, limparEmuladores } from './seed'

test.skip(!process.env.PRINTS, 'só com PRINTS=1')

const MARCA = process.env.MARCA && process.env.MARCA !== 'vfit' ? process.env.MARCA : 'vfit'
const marca = JSON.parse(readFileSync(`marcas/${MARCA}/marca.json`, 'utf8'))
const SAIDA = process.env.PRINTS_DIR ?? join(tmpdir(), 'prints', MARCA)
const UA_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
// Dados reais da marca que nunca podem aparecer (Pix, CREF, CNPJ, razão social, nome do responsável) + a outra marca.
const esc = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const PROIBIDO = new RegExp(
  [marca.pix.chave, marca.pix.nome, marca.responsavel.nome, marca.responsavel.cref, marca.responsavel.nome.split(' ').pop()!].map(esc).join('|') +
    '|62\\.?539|CREF|CNPJ|gmail',
  'i',
)
const OUTRA = MARCA === 'gislane' ? /VFIT/i : /Gislane/i
const SENHA = 'senha123'
const COACH = MARCA === 'gislane' ? { nome: 'Gislane', email: 'gislane@exemplo.com' } : { nome: 'Victor', email: 'victor@exemplo.com' }
const NOMES = ['Ana P.', 'Bruno M.', 'Carla S.', 'Diego R.', 'Elisa T.']
const email = (n: string) => `${n.split(' ')[0].toLowerCase()}@exemplo.com`

const diaISO = (n: number) => new Date(Date.now() - 3 * 3600_000 - n * 86_400_000).toISOString().slice(0, 10)
const diasAtras = (n: number) => new Date(Date.now() - n * 86_400_000)

const prog = (semanas: number) => {
  const w: Record<string, (number | null)[]> = {}
  for (let i = 1; i <= semanas; i++) w[`w${i}`] = [10, 10, 10, null, null, null]
  return w
}
const slots = (nomes: string[]) => nomes.map((nome, i) => ({ slotId: String.fromCharCode(97 + i), nome }))

const T1 = ['Agachamento Livre Barra', 'Supino Reto Barra', 'Cadeira Extensora Tradicional', 'Remada Curvada Pronada', 'Elevação Lateral Halter', 'Tríceps Pulley Barra Reta']
const T2 = ['Stiff Barra', 'Puxada Frente Aberta', 'Leg Press 45', 'Desenvolvimento com Halter Sentado', 'Rosca Direta Barra', 'Panturrilha em Pé Máquina']
const T3 = ['Elevação Pélvica Barra', 'Supino Declinado Máquina', 'Mesa Flexora', 'Remada Baixa Barra Aberta', 'Rosca Martelo Halter', 'Abdominal Máquina com Alças']
const ANTES = ['Agachamento Livre Halter', 'Supino Reto Barra', 'Terra Romeno Barra', 'Remada Cavalinho', 'Elevação Frontal Halter', 'Rosca Direta Barra']

const metodos = (semanas: number) =>
  Array.from({ length: semanas }, (_, i) => i + 1).flatMap((semana) => [
    { ativo: true, semana, treino: 1, exercicio: 3, metodo: 'Dropset', escopo: 'Série específica', serie: 3, pausaInternaS: 10, blocos: 1, etapas: 2, reducaoCarga: 20 },
    { ativo: true, semana, treino: 1, exercicio: 5, metodo: 'Biset', escopo: 'Todas as séries', grupo: 1 },
    { ativo: true, semana, treino: 1, exercicio: 6, metodo: 'Biset', escopo: 'Todas as séries', grupo: 1 },
    { ativo: true, semana, treino: 2, exercicio: 4, metodo: 'Dropset', escopo: 'Série específica', serie: 3, pausaInternaS: 10, blocos: 1, etapas: 2, reducaoCarga: 20 },
  ])

const DIAS_AUTO = [0, 2, 4]
// Registros de um meso que começou há `inicioDias` dias, nas semanas de..até (3 treinos por semana). Cargas sobem aos poucos.
async function registros(mesoId: string, alunoId: string, inicioDias: number, de: number, ate: number, base: number, opc: { duracaoMin?: number; repsAbaixo?: boolean } = {}) {
  for (let s = de; s <= ate; s++)
    for (let t = 1; t <= 3; t++)
      {
        const dias = inicioDias - (7 * (s - 1) + DIAS_AUTO[t - 1])
        if (dias < 0) continue
        const cargas: Record<string, Record<string, number>> = {}
        for (let i = 0; i < 6; i++) {
          const b = base * (0.5 + i * 0.12) * (1 + 0.035 * (s - 1)) * (1 + 0.005 * t)
          const kg = Math.round(b * 2) / 2
          cargas[String.fromCharCode(97 + i)] = { s1: kg, s2: kg, s3: kg }
        }
        const fim = diasAtras(dias)
        const extra: Record<string, unknown> = {}
        if (opc.duracaoMin) extra.inicioEm = new Date(fim.getTime() - opc.duracaoMin * 60_000)
        if (opc.repsAbaixo && dias <= 5) // alerta "reps abaixo da meta" (meta = 10)
          extra.reps = Object.fromEntries(Object.keys(cargas).map((k) => [k, { s1: 7, s2: 6, s3: 6 }]))
        await criarRegistro(mesoId, alunoId, s, t, { cargas, realizado: true, realizadoEm: fim, ...extra })
      }
}

async function marcarPresencial(uid: string) {
  const r = await fetch(`http://127.0.0.1:8080/v1/projects/demo-forca/databases/(default)/documents/usuarios/${uid}?updateMask.fieldPaths=presencial`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
    body: JSON.stringify({ fields: { presencial: { booleanValue: true } } }),
  })
  expect(r.ok).toBe(true)
}

const ids: Record<string, string> = {}
let mesoAna = ''
let mesoAntes = ''

test.beforeAll(async () => {
  mkdirSync(SAIDA, { recursive: true })
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, SENHA)
  for (const n of NOMES) ids[n] = await criarAluno(n, email(n), SENHA, 70)

  // Ana: meso ativo de 12 semanas, começou há 9 semanas (hoje abre a semana 10, Treino 1).
  const ana = ids['Ana P.']
  mesoAna = await criarMeso({
    alunoId: ana,
    nome: 'Hipertrofia 12 semanas',
    frequencia: 3,
    semanas: 12,
    inicio: diaISO(63),
    pausaS: 90,
    divisao: { t1: slots(T1), t2: slots(T2), t3: slots(T3) },
    metodos: metodos(12),
    progressao: { principais: prog(12), auxiliares: prog(12) },
  })
  await registros(mesoAna, ana, 63, 1, 9, 40)

  // Ciclo anterior, encerrado, com relatório liberado.
  mesoAntes = await criarMeso({
    alunoId: ana,
    nome: 'Base de força',
    frequencia: 3,
    semanas: 8,
    inicio: diaISO(122),
    pausaS: 90,
    divisao: { t1: slots(ANTES), t2: slots(T2), t3: slots(T3) },
    progressao: { principais: prog(8), auxiliares: prog(8) },
  })
  await registros(mesoAntes, ana, 122, 1, 8, 32, { duracaoMin: 48 })
  await gravarDoc(`relatorios/${mesoAntes}`, {
    alunoId: ana,
    mesoId: mesoAntes,
    comentario: 'Ciclo muito bom, Ana! Você não faltou nenhuma semana e subiu carga em quase todos os exercícios. Seguimos firmes no próximo.',
    liberado: true,
    liberadoEm: diasAtras(60),
    atualizadoEm: diasAtras(60),
  })

  // Cardio em 6 dos últimos 40 dias (direto no emulador, ignora as regras).
  const cardios: [number, string, number][] = [[1, 'esteira', 30], [4, 'corrida', 25], [9, 'bicicleta', 40], [15, 'caminhada', 45], [22, 'esteira', 30], [33, 'eliptico', 35]]
  for (const [n, tipo, min] of cardios) await gravarDoc(`cardios/${ana}_${diaISO(n)}`, { alunoId: ana, dia: diaISO(n), em: diasAtras(n), tipo, min })

  await criarAlunoAguardando('Fábio L.', 'fabio@exemplo.com', SENHA)

  // Os outros 4: meso ativo + alguns treinos. Carla e Elisa treinaram hoje; Bruno e Diego são presenciais.
  const outros: [string, number, number][] = [['Bruno M.', 24, 55], ['Carla S.', 17, 30], ['Diego R.', 31, 60], ['Elisa T.', 10, 25]]
  for (const [n, inicioDias, base] of outros) {
    const id = ids[n]
    if (n === 'Bruno M.' || n === 'Diego R.') await marcarPresencial(id)
    const m = await criarMeso({
      alunoId: id,
      nome: 'Mesociclo de força',
      frequencia: 3,
      semanas: 8,
      inicio: diaISO(inicioDias),
      pausaS: 90,
      divisao: { t1: slots(T1), t2: slots(T2), t3: slots(T3) },
      progressao: { principais: prog(8), auxiliares: prog(8) },
    })
    await registros(m, id, inicioDias, 1, Math.floor(inicioDias / 7) + 1, base, { repsAbaixo: n === 'Bruno M.' || n === 'Diego R.' })
    if (n === 'Carla S.') await definirPagoAte(id, new Date(Date.now() + 3 * 86_400_000))
    if (n === 'Elisa T.') await definirPagoAte(id, new Date(Date.now() + 6 * 86_400_000))
  }
  // Hoje: Carla e Elisa concluem um treino agora.
  for (const n of ['Carla S.', 'Elisa T.']) {
    const cargas: Record<string, Record<string, number>> = {}
    for (let i = 0; i < 6; i++) cargas[String.fromCharCode(97 + i)] = { s1: 20 + i * 5, s2: 20 + i * 5, s3: 20 + i * 5 }
    const meso = (await (await fetch('http://127.0.0.1:8080/v1/projects/demo-forca/databases/(default)/documents/mesos', { headers: { Authorization: 'Bearer owner' } })).json()).documents.find(
      (d: any) => d.fields.alunoId.stringValue === ids[n],
    )
    const mesoId = meso.name.split('/').pop()
    // Semana/treino ainda não feitos: último da lista + 1 não é garantido; usa a semana 8 (fora do intervalo já registrado).
    await criarRegistro(mesoId, ids[n], 8, 1, { cargas, realizado: true, realizadoEm: new Date() })
  }
})

async function contexto(browser: any) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: UA_IPHONE, hasTouch: true, isMobile: true, deviceScaleFactor: 3, locale: 'pt-BR' })
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, 'standalone', { value: true }) // sem o aviso "instale o app"
    try { Object.defineProperty(Notification, 'permission', { get: () => 'granted' }) } catch { /* ok */ }
    try { localStorage.setItem('forca-novidades-pc', '2') } catch { /* ok */ }
  })
  return ctx.newPage() as Promise<Page>
}

async function entrar(page: Page, em: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(em)
  await page.getByLabel('Senha').fill(SENHA)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

async function ir(page: Page, rota: string) {
  await page.evaluate((r) => { location.hash = r; scrollTo(0, 0) }, rota)
}

async function print(page: Page, nome: string) {
  await page.waitForTimeout(900)
  const texto = await page.locator('body').innerText()
  expect(texto).not.toMatch(PROIBIDO)
  expect(texto).not.toMatch(OUTRA)
  for (const e of texto.match(/[\w.+-]+@[\w.-]+/g) ?? []) expect(e).toMatch(/@exemplo\.com$/)
  await page.screenshot({ path: `${SAIDA}/${nome}.png` })
}

test('prints do aluno', async ({ browser }) => {
  const page = await contexto(browser)
  await entrar(page, email('Ana P.'))
  await expect(page.getByText('Ver treino de hoje')).toBeVisible()
  await expect(page.getByText('Fez cardio hoje?')).toBeVisible()
  await print(page, '01-aluno-inicio')

  await ir(page, `/treino/${mesoAna}/10/1`)
  await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
  const entendi = page.getByRole('dialog', { name: 'Métodos deste treino' }).getByRole('button', { name: 'Entendi', exact: true })
  if (await entendi.isVisible().catch(() => false)) await entendi.click()
  await page.getByRole('button', { name: 'Iniciar treino' }).click()
  const campos = page.locator('input[type="number"]')
  for (const [i, v] of ['25.5', '10', '25.5', '10'].entries()) {
    await campos.nth(i).fill(v)
    await campos.nth(i).blur()
  }
  await expect(page.getByText(/em andamento/i).first()).toBeVisible()
  await page.evaluate(() => scrollTo(0, 0))
  await print(page, '02-aluno-treino')

  await ir(page, '/evolucao')
  await expect(page.getByText('Maiores evoluções')).toBeVisible()
  await print(page, '03-aluno-evolucao')

  await ir(page, `/relatorio/${mesoAntes}`)
  await expect(page.getByText('Aderência')).toBeVisible()
  await print(page, '04-aluno-relatorio')

  await ir(page, '/metodos')
  await expect(page.getByText('Dropset').first()).toBeVisible()
  await print(page, '05-aluno-metodos')
})

test('prints do coach', async ({ browser }) => {
  const page = await contexto(browser)
  await entrar(page, COACH.email)
  await expect(page.getByText('Treinaram hoje').first()).toBeVisible()
  await expect(page.getByText('Carla').first()).toBeVisible()
  await print(page, '06-coach-inicio')

  await ir(page, '/alunos')
  await expect(page.getByText('Elisa T.').first()).toBeVisible()
  await print(page, '07-coach-alunos')

  await ir(page, `/meso/${mesoAna}`)
  await page.getByRole('button', { name: 'Divisão', exact: true }).or(page.getByRole('tab', { name: 'Divisão', exact: true })).first().click()
  await expect(page.getByText('Agachamento Livre Barra').first()).toBeVisible()
  await print(page, '08-coach-editor-divisao')

  await ir(page, `/meso/${mesoAna}/semana/9`)
  await expect(page.getByRole('button', { name: 'Editar meso' })).toBeVisible()
  await print(page, '09-coach-semana')

  await ir(page, `/aluno/${ids['Bruno M.']}/presencial`)
  await expect(page.getByRole('region', { name: 'Presencial' })).toBeVisible()
  await page.getByRole('button', { name: 'Adicionar aluno' }).click()
  await page.getByRole('dialog', { name: 'Escolher aluno' }).getByRole('button', { name: /Diego/ }).click()
  await expect(page.getByRole('navigation', { name: 'Alunos do grupo' })).toBeVisible()
  await print(page, '10-coach-presencial-grupo')
})
