import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const ALUNO = { nome: 'Bia Layout', email: 'bia.layout-e2e@teste.com', senha: 'senha123' }
const COACH = { email: 'victor.layout-e2e@teste.com', senha: 'senha123' }
let alunoId = ''
let mesoId = ''
const UA_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor Celli com nome bem comprido para testar', COACH.email, COACH.senha)
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
    if (prints) await page.screenshot({ path: 'test-results/prints/21-iphone14-hoje.png' })

    await page.getByRole('button', { name: /Treino 1/ }).click()
    await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
    expect(await confere(page)).toBeGreaterThan(0) // com a nota de métodos aberta
    await page.getByRole('dialog', { name: 'Métodos deste treino' }).getByRole('button', { name: 'Entendi', exact: true }).click()
    const kg = page.locator('input[type="number"]').first()
    await kg.fill('100.5')
    await kg.blur()
    await page.getByRole('button', { name: /^▶ \d+ s$/ }).first().click()
    await expect(page.getByText('Pular')).toBeVisible()
    await confere(page)
    if (prints) await page.screenshot({ path: 'test-results/prints/20-iphone14-treino.png' })

    await page.goto('/#/evolucao')
    await expect(page.getByRole('heading', { name: 'Evolução' })).toBeVisible()
    expect(await confere(page)).toBeGreaterThan(0)
    await ctx.close()
  })
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 375, height: 667 },
  { width: 360, height: 800 },
]) {
  test(`coach iPhone ${vp.width}x${vp.height}: sem overflow e inputs >= 16px`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: vp, userAgent: UA_IPHONE, hasTouch: true, isMobile: true, deviceScaleFactor: 3 })
    const page = await ctx.newPage()
    const prints = vp.width === 390
    const foto = (n: string) => prints && page.screenshot({ path: `test-results/prints/${n}.png`, fullPage: n.startsWith('3') && n > '33' })

    await page.goto('/')
    await page.getByLabel('E-mail').fill(COACH.email)
    await page.getByLabel('Senha').fill(COACH.senha)
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
    await expect(page.getByText(ALUNO.nome).first()).toBeVisible()
    await confere(page)
    await foto('32-coach-inicio-iphone')

    await page.goto('/#/alunos/novo')
    await expect(page.getByRole('heading', { name: 'Novo aluno' })).toBeVisible()
    expect(await confere(page)).toBeGreaterThan(0)
    await foto('33-coach-novo-aluno-iphone')
    await page.getByRole('button', { name: 'Presencial (sem app)' }).click()
    await confere(page)

    await page.goto('/#/alunos')
    await expect(page.getByRole('heading', { name: 'Alunos' })).toBeVisible()
    await expect(page.getByText(ALUNO.email).first()).toBeVisible()
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
    await ctx.close()
  })
}

test('print da tela de login (390px)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
  await page.waitForTimeout(900)
  await page.screenshot({ path: 'test-results/prints/60-login.png' })
})
