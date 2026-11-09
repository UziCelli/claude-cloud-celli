import { expect, test, type Browser, type Page } from '@playwright/test'
import { criarAluno, criarCoach, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.feedback-e2e@teste.com', senha: 'senha123' }
const ANA = { nome: 'Ana Souza', email: 'ana.feedback-e2e@teste.com', senha: 'senha123' }
const BIA = { nome: 'Bia Lima', email: 'bia.feedback-e2e@teste.com', senha: 'senha123' }

async function entrar(page: Page, email: string, senha: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

async function comoAluno(browser: Browser, a: typeof ANA) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await ctx.newPage()
  await entrar(page, a.email, a.senha)
  await page.goto('/#/feedback')
  return { ctx, page }
}

test('aluno envia feedback e o coach vê, marca lido e copia o depoimento', async ({ browser }) => {
  test.setTimeout(120_000)
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  await criarAluno(ANA.nome, ANA.email, ANA.senha)
  await criarAluno(BIA.nome, BIA.email, BIA.senha)

  const ana = await comoAluno(browser, ANA)
  await ana.page.getByRole('button', { name: '5 estrelas' }).click()
  await ana.page.getByPlaceholder('Conte com suas palavras…').fill('Nunca mais perdi uma carga.')
  await ana.page.getByLabel(/Autorizo usar meu depoimento/).check()
  await ana.page.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(ana.page.getByRole('heading', { name: 'Valeu, Ana!' })).toBeVisible()
  // A gravação segue em segundo plano (sem await): as abas dos alunos ficam abertas até o coach ver os dois.

  const bia = await comoAluno(browser, BIA)
  await bia.page.getByRole('button', { name: '3 estrelas' }).click()
  await bia.page.getByRole('button', { name: 'Crítica' }).click()
  await bia.page.getByPlaceholder('Conte com suas palavras…').fill('Treino B está longo demais.')
  await bia.page.getByLabel('Enviar sem meu nome').check()
  await expect(bia.page.getByLabel(/Autorizo usar meu depoimento/)).toHaveCount(0)
  await bia.page.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(bia.page.getByText('lê pessoalmente')).toBeVisible()

  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['clipboard-read', 'clipboard-write'] })
  const page = await ctx.newPage()
  await entrar(page, COACH.email, COACH.senha)
  await page.goto('/#/feedbacks')
  await expect(page.getByText('média · 2 respostas')).toBeVisible({ timeout: 20_000 })
  await expect(page.getByText('4,0')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Novos 2' })).toBeVisible()

  const cartaoAna = page.locator('div', { hasText: 'Nunca mais perdi uma carga.' }).last()
  await expect(cartaoAna.getByText(/Ana Souza/)).toBeVisible()
  await expect(cartaoAna.getByRole('button', { name: 'Copiar depoimento' })).toBeVisible()
  await cartaoAna.getByRole('button', { name: 'Copiar depoimento' }).click()
  await expect(page.getByText('Copiado')).toBeVisible()
  await cartaoAna.getByRole('button', { name: 'Lido', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Novos 1' })).toBeVisible()

  const cartaoBia = page.locator('div', { hasText: 'Treino B está longo demais.' }).last()
  await expect(cartaoBia.getByText(/Anônimo/)).toBeVisible()
  await expect(cartaoBia.getByRole('button', { name: 'Copiar depoimento' })).toHaveCount(0)
  await expect(cartaoBia.getByRole('button', { name: 'Story' })).toHaveCount(0)
  await Promise.all([ctx.close(), ana.ctx.close(), bia.ctx.close()])
})
