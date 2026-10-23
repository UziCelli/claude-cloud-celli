import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, hojeSaoPaulo, criarMeso, limparEmuladores } from './seed'

const COACH = { email: 'victor.sair-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Sair', email: 'bia.sair-e2e@teste.com', senha: 'senha123' }

test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' })

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor Celli', COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  await criarMeso({
    alunoId, nome: 'Mesociclo Sair', frequencia: 1, semanas: 4, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }] },
    metodos: [], progressao: { principais: {}, auxiliares: {} },
  })
})

async function entrar(page: Page, email: string, senha: string, pronto: () => Promise<void>) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await pronto()
}

async function testaSair(page: Page) {
  const sair = page.getByRole('button', { name: 'Sair' })
  page.once('dialog', (d) => d.dismiss())
  await sair.click()
  await expect(sair).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Entrar' })).toHaveCount(0)
  page.once('dialog', (d) => d.accept())
  await sair.click()
  await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible()
}

test('coach: Sair no topo pede confirmação', async ({ page }) => {
  await entrar(page, COACH.email, COACH.senha, () => expect(page.getByRole('heading', { name: 'Início' })).toBeVisible())
  await testaSair(page)
})

test('aluno: Sair no início pede confirmação', async ({ page }) => {
  await entrar(page, ALUNO.email, ALUNO.senha, () => expect(page.getByText('Semana 1 de 4')).toBeVisible())
  await testaSair(page)
})
