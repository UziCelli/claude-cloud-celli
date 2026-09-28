import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const ALUNO = { nome: 'Bia Layout', email: 'bia.layout-e2e@teste.com', senha: 'senha123' }
const UA_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor', 'victor.layout-e2e@teste.com', 'senha123')
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const w = [8, 8, 8, null, null, null]
  await criarMeso({
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
    progressao: { principais: { w1: w, w2: w, w3: w, w4: w }, auxiliares: { w1: w, w2: w, w3: w, w4: w } },
  })
})

async function confere(page: Page) {
  const r = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
    fontes: [...document.querySelectorAll('input, select, textarea')]
      .filter((e) => (e as HTMLElement).offsetParent !== null)
      .map((e) => parseFloat(getComputedStyle(e).fontSize)),
  }))
  expect(r.sw).toBeLessThanOrEqual(r.iw)
  for (const f of r.fontes) expect(f).toBeGreaterThanOrEqual(16)
  return r.fontes.length
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 375, height: 667 },
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
    expect(await confere(page)).toBeGreaterThan(0)
    const kg = page.locator('input[type="number"]').first()
    await kg.fill('100.5')
    await kg.blur()
    await expect(page.getByText('Pular')).toBeVisible()
    await confere(page)
    if (prints) await page.screenshot({ path: 'test-results/prints/20-iphone14-treino.png' })

    await page.goto('/#/evolucao')
    await expect(page.getByRole('heading', { name: 'Evolução' })).toBeVisible()
    expect(await confere(page)).toBeGreaterThan(0)
    await ctx.close()
  })
}
