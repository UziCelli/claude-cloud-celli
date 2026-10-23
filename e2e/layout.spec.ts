import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarAlunoAguardando, criarCoach, criarMeso, criarRegistro, hojeSaoPaulo, limparEmuladores } from './seed'

const ALUNO = { nome: 'Bia Layout', email: 'bia.layout-e2e@teste.com', senha: 'senha123' }
const COACH = { email: 'victor.layout-e2e@teste.com', senha: 'senha123' }
let alunoId = ''
let mesoId = ''
const UA_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor Celli com nome bem comprido para testar', COACH.email, COACH.senha)
  await criarAlunoAguardando('Maria Aparecida dos Santos Albuquerque Ferreira', 'maria.longa-e2e@teste.com', 'senha123')
  alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const w = [8, 8, 8, null, null, null]
  mesoId = await criarMeso({
    alunoId,
    nome: 'Mesociclo Layout',
    frequencia: 3,
    semanas: 4,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: {
      t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }],
      t2: [{ slotId: 'a', nome: 'Levantamento Terra Barra' }],
      t3: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }],
    },
    metodos: [
      { ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Série específica', serie: 3, pausaInternaS: 10, blocos: 1, etapas: 2, reducaoCarga: 20 },
    ],
    progressao: { principais: { w1: w, w2: w, w3: w, w4: w }, auxiliares: { w1: w, w2: w, w3: w, w4: w } },
  })
  // Um treino concluído: o painel de Evolução precisa de dados (treino só iniciado não conta como feito).
  await criarRegistro(mesoId, alunoId, 1, 3, { realizado: true, realizadoEm: new Date(), cargas: { a: { s1: 50 } } })
})

async function confere(page: Page) {
  const r = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
    fontes: [...document.querySelectorAll('input:not([type=checkbox]), select, textarea')]
      .filter((e) => (e as HTMLElement).offsetParent !== null)
      .map((e) => parseFloat(getComputedStyle(e).fontSize)),
  }))
  expect(r.sw).toBeLessThanOrEqual(r.iw)
  for (const f of r.fontes) expect(f).toBeGreaterThanOrEqual(16)
  await semTransbordar(page)
  return r.fontes.length
}

// Nada visível (tabela, linha, campo) pode ser mais largo que o cartão que o contém.
async function semTransbordar(page: Page) {
  const ruins = await page.evaluate(() =>
    [...document.querySelectorAll('main table, main input, main select, main li, main .overflow-x-auto')]
      .filter((e) => (e as HTMLElement).offsetParent !== null)
      .filter((e) => {
        if (!e.matches('.overflow-x-auto') && e.closest('.overflow-x-auto')) return false // rolagem interna é permitida
        const cartao = e.closest('.rounded-xl')
        if (!cartao || cartao === e) return false
        const a = e.getBoundingClientRect()
        const b = cartao.getBoundingClientRect()
        return a.right > b.right + 0.5 || a.left < b.left - 0.5
      })
      .map((e) => e.tagName + ':' + (e.textContent ?? '').slice(0, 20)),
  )
  expect(ruins).toEqual([])
}

// `Tela` tem overflow-x-clip: o scrollWidth nunca acusa. Mede cada elemento visível contra a largura da tela.
async function nadaPassaDaTela(page: Page) {
  const ruins = await page.evaluate(() =>
    [...document.querySelectorAll('a, button, h1, h2, p, li')]
      .filter((e) => {
        const r = e.getBoundingClientRect()
        if (r.width === 0 || r.height === 0 || getComputedStyle(e).visibility === 'hidden') return false
        if (e.closest('[hidden], [aria-hidden="true"], .overflow-x-auto')) return false // rolagem interna é permitida
        return r.right > window.innerWidth + 1
      })
      .map((e) => e.tagName + ':' + (e.textContent ?? '').slice(0, 30)),
  )
  expect(ruins).toEqual([])
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 375, height: 667 },
  { width: 360, height: 800 },
]) {
  test(`iPhone ${vp.width}x${vp.height}: sem overflow e inputs >= 16px`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: vp, userAgent: UA_IPHONE, hasTouch: true, isMobile: true, deviceScaleFactor: 3 })
    const page = await ctx.newPage()
    const prints = vp.width === 390

    await page.goto('/instalar')
    await expect(page.getByText('Adicionar à Tela de Início')).toBeVisible()
    await confere(page)

    await page.goto('/')
    await expect(page.getByLabel('E-mail')).toBeVisible()
    expect(await confere(page)).toBeGreaterThan(0) // tela Entrar
    await page.getByLabel('E-mail').fill(ALUNO.email)
    await page.getByLabel('Senha').fill(ALUNO.senha)
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()
    await expect(page.getByText('Semana 1 de 4')).toBeVisible()
    await confere(page)
    if (prints) await page.screenshot({ path: 'test-results/prints/21-iphone14-inicio.png' })

    await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
    await expect(page.getByRole('button', { name: /Treino 1/ })).toBeVisible()
    await confere(page)
    if (prints) await page.screenshot({ path: 'test-results/prints/21-iphone14-hoje.png' })

    await page.getByRole('button', { name: /Treino 1/ }).click()
    await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
    expect(await confere(page)).toBeGreaterThan(0) // com a nota de métodos aberta
    await page.getByRole('dialog', { name: 'Métodos deste treino' }).getByRole('button', { name: 'Entendi', exact: true }).click()
    await expect(page.getByRole('dialog', { name: 'Métodos deste treino' })).toBeHidden()
    // Os viewports repetem o mesmo aluno: o treino pode já estar iniciado por um deles.
    await page.getByRole('button', { name: 'Iniciar treino' }).click({ timeout: 3000 }).catch(() => {})
    const kg = page.locator('input[inputmode="decimal"]').first()
    await kg.fill('100.5')
    await kg.blur()
    await page.getByRole('button', { name: /^Descansar \d+ s$/ }).first().click()
    await expect(page.getByText('Pular')).toBeVisible()
    await confere(page)
    if (prints) await page.screenshot({ path: 'test-results/prints/20-iphone14-treino.png' })

    await page.goto('/#/evolucao')
    await expect(page.getByRole('heading', { name: 'Evolução' })).toBeVisible()
    // O título aparece já no "Carregando…": espera o painel com dados (select "Por exercício").
    await expect(page.getByRole('combobox')).toBeVisible()
    expect(await confere(page)).toBeGreaterThan(0)
    await ctx.close()
  })
}

// Menu do coach: abas embaixo abaixo de 1024px; menu lateral fixo a partir daí. Nunca rolagem horizontal.
for (const vp of [
  { width: 320, height: 640 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
]) {
  const lateral = vp.width >= 1024
  test(`coach ${vp.width}x${vp.height}: menu ${lateral ? 'lateral' : 'embaixo'}, sem overflow e inputs >= 16px`, async ({ browser }) => {
    const ctx = await browser.newContext(
      vp.width <= 430
        ? { viewport: vp, userAgent: UA_IPHONE, hasTouch: true, isMobile: true, deviceScaleFactor: 3 }
        : { viewport: vp },
    )
    const page = await ctx.newPage()
    const prints = vp.width === 390
    const foto = (n: string) => prints && page.screenshot({ path: `test-results/prints/${n}.png`, fullPage: n.startsWith('3') && n > '33' })

    await page.goto('/')
    await page.getByLabel('E-mail').fill(COACH.email)
    await page.getByLabel('Senha').fill(COACH.senha)
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
    await expect(page.getByText(ALUNO.nome).first()).toBeVisible()
    // O menu certo aparece e o outro fica escondido.
    const abas = page.getByRole('navigation', { name: 'Menu', exact: true })
    const menuLateral = page.getByRole('navigation', { name: 'Menu lateral' })
    if (lateral) {
      await expect(menuLateral).toBeVisible()
      await expect(abas).toBeHidden()
      for (const n of ['Início', 'Alunos', 'Alertas', 'Ranking', 'Métodos', 'Minha conta']) await expect(menuLateral.getByRole('link', { name: n })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Sair' })).toBeVisible()
    } else {
      await expect(abas).toBeVisible()
      await expect(menuLateral).toBeHidden()
      for (const n of ['Início', 'Alunos', 'Alertas', 'Métodos', 'Conta']) await expect(abas.getByRole('link', { name: new RegExp(`^${n}`) })).toBeVisible()
      await expect(abas.getByRole('link', { name: 'Início' })).toHaveAttribute('aria-current', 'page')
    }
    await confere(page)
    await expect(page.getByText('Maria Aparecida dos Santos Albuquerque Ferreira').first()).toBeVisible()
    await nadaPassaDaTela(page)
    await foto('32-coach-inicio-iphone')

    // Aba ativa pela rota: editor de meso e página do aluno contam como Alunos.
    if (!lateral) {
      await page.goto(`/#/aluno/${alunoId}`)
      await expect(abas.getByRole('link', { name: 'Alunos' })).toHaveAttribute('aria-current', 'page')
      await page.goto('/#/')
    }

    await page.goto('/#/alunos/novo')
    await expect(page.getByRole('heading', { name: 'Novo aluno' })).toBeVisible()
    expect(await confere(page)).toBeGreaterThan(0)
    await foto('33-coach-novo-aluno-iphone')
    await page.getByRole('button', { name: 'Presencial (sem app)' }).click()
    await confere(page)

    await page.goto('/#/alunos')
    await expect(page.getByRole('heading', { name: 'Alunos' })).toBeVisible()
    await expect(page.getByText(ALUNO.email).locator('visible=true').first()).toBeVisible()
    await confere(page)
    await foto('30-coach-alunos-iphone')

    await page.goto(`/#/aluno/${alunoId}`)
    await expect(page.getByText('Mesociclo Layout')).toBeVisible()
    await confere(page)

    await page.goto(`/#/meso/${mesoId}`)
    await expect(page.getByRole('button', { name: 'Divisão' })).toBeVisible()
    await confere(page)
    for (const aba of ['Divisão', 'Progressão', 'Métodos', 'Config']) {
      await page.getByRole('button', { name: aba, exact: true }).click()
      await confere(page)
      await semTransbordar(page)
      if (aba === 'Métodos') await foto('32-coach-editor-iphone')
      if (aba === 'Divisão') await foto('34-meso-divisao-iphone')
      if (aba === 'Progressão') await foto('35-meso-progressao-iphone')
    }
    await page.getByText('Pré-visualização').scrollIntoViewIfNeeded()
    await semTransbordar(page)
    await foto('36-meso-preview-iphone')

    await page.goto(`/#/meso/${mesoId}/semana/1`)
    await expect(page.getByText('Semana 1 de 4')).toBeVisible()
    await expect(page.getByText('Monitoramento')).toBeVisible()
    await confere(page)
    await foto('31-coach-semana-iphone')

    await page.goto('/#/conta')
    await expect(page.getByRole('heading', { name: 'Minha conta' })).toBeVisible()
    await confere(page)
    // Celular: Sair no topo e em Minha conta; computador: só no menu lateral.
    await expect(page.getByRole('button', { name: 'Sair' })).toHaveCount(lateral ? 1 : 2)
    await ctx.close()
  })
}

// Barra de abas do coach no mesmo lugar em todas as telas (inclusive as curtas, como Alertas): a tela ocupa pelo menos a altura da tela.
test('coach iPhone 390x844: barra de abas na mesma altura em todas as telas', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: UA_IPHONE, hasTouch: true, isMobile: true, deviceScaleFactor: 3 })
  const page = await ctx.newPage()
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  const abas = page.locator('nav[aria-label="Menu"]')
  const telas: [string, RegExp][] = [
    ['Início', /^Início$/],
    ['Alunos', /^Alunos/],
    ['Alertas', /^Alertas/],
    ['Métodos', /^Métodos/],
    ['Conta', /^Conta/],
  ]
  const medidas: number[] = []
  for (const [nome, re] of telas) {
    await abas.getByRole('link', { name: re }).click()
    await expect(abas.getByRole('link', { name: re })).toHaveAttribute('aria-current', 'page')
    await page.waitForTimeout(400) // espera a troca de aba (fade) terminar
    const r = await page.evaluate(() => ({
      bottom: document.querySelector('nav[aria-label="Menu"]')?.getBoundingClientRect().bottom ?? -1,
      altura: document.documentElement.scrollHeight,
      tela: innerHeight,
    }))
    expect(r.altura, `${nome}: altura da página`).toBeGreaterThanOrEqual(r.tela)
    medidas.push(r.bottom)
  }
  for (const b of medidas) expect(b).toBeCloseTo(medidas[0], 0)
  await ctx.close()
})

test('print da tela de login (390px)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
  await page.waitForTimeout(900)
  await page.screenshot({ path: 'test-results/prints/60-login.png' })
})

// Aba Métodos com nomes de exercício longos: nem a página nem nenhum select passa da largura da tela.
// Manter por último: semeia um meso a mais para o mesmo aluno (o arquivo só limpa no beforeAll).
for (const vp of [
  { width: 390, height: 844 },
  { width: 1280, height: 800 },
]) {
  test(`aba Métodos com nomes longos ${vp.width}x${vp.height}: sem rolagem horizontal`, async ({ browser }) => {
    const longos = ['Crucifixo Inverso com Halter (sentado(a))', 'Remada Tradicional Máquina (Pegada Neutra)']
    const id = await criarMeso({
      alunoId,
      nome: 'Meso nomes longos',
      frequencia: 1,
      semanas: 4,
      inicio: hojeSaoPaulo(),
      pausaS: 60,
      divisao: { t1: longos.map((nome, i) => ({ slotId: `s${i}`, nome })) },
      metodos: [
        { ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Série específica', serie: 3, pausaInternaS: 10, blocos: 1, etapas: 3, reducaoCarga: 20 },
        { ativo: true, semana: 2, treino: 1, exercicio: 2, metodo: 'Superset', escopo: 'Últimas 3 séries', pausaInternaS: 15, blocos: 1, grupo: 1 },
        { ativo: true, semana: 3, treino: 1, exercicio: 2, metodo: 'Rest-pause', escopo: 'Série específica', serie: 2, pausaInternaS: 20, blocos: 2 },
      ],
      progressao: { principais: {}, auxiliares: {} },
    })
    const ctx = await browser.newContext(vp.width <= 430 ? { viewport: vp, userAgent: UA_IPHONE, hasTouch: true, isMobile: true, deviceScaleFactor: 2 } : { viewport: vp })
    const page = await ctx.newPage()
    await page.goto('/')
    await page.getByLabel('E-mail').fill(COACH.email)
    await page.getByLabel('Senha').fill(COACH.senha)
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
    await page.goto(`/#/meso/${id}`)
    await page.getByRole('button', { name: 'Métodos', exact: true }).click()
    await expect(page.getByText('Mostrando 3 de 3 métodos')).toBeVisible()
    if (process.env.PRINT_PREFIX) await page.screenshot({ path: `${process.env.PRINT_PREFIX}-${vp.width}.png`, fullPage: true })
    const r = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      iw: window.innerWidth,
      fora: [...document.querySelectorAll('main select')].filter((e) => e.getBoundingClientRect().right > window.innerWidth + 0.5).length,
    }))
    expect(r.sw).toBeLessThanOrEqual(r.iw)
    expect(r.fora).toBe(0)
    await confere(page)
    await ctx.close()
  })
}
