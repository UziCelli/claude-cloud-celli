import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.adic@teste.com', senha: 'senha123' }

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
})

test('adiciona um exercício nas semanas 2 a 3 e remove', async ({ page }) => {
  const alunoId = await criarAluno('Adicao Teste', 'adicao.e2e@teste.com', 'senha123')
  const linha = { w1: [10, 10, 10, null, null, null], w2: [10, 10, 10, null, null, null], w3: [10, 10, 10, null, null, null] }
  const id = await criarMeso({
    alunoId, nome: 'Meso Adicao', frequencia: 1, semanas: 3, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a1', nome: 'Agachamento Livre Halter' }] }, progressao: { principais: linha, auxiliares: linha },
  })
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Divisão', exact: true }).click()

  await page.getByRole('button', { name: 'Adicionar exercício' }).click()
  await page.getByLabel('Semana de').selectOption('2')
  await page.getByRole('combobox', { name: 'até', exact: true }).selectOption('3')
  await page.getByLabel('Exercício', { exact: true }).fill('Agachamento Frontal Halter')
  await page.getByRole('option', { name: /Agachamento Frontal Halter/ }).click()
  await page.getByRole('button', { name: 'Adicionar', exact: true }).click()
  await expect(page.getByText('Treino 1 · +')).toBeVisible()
  await expect(page.getByText('Semanas 2–3')).toBeVisible()

  await page.getByRole('button', { name: 'Remover' }).click()
  await expect(page.getByText('Nenhuma troca ou adição.')).toBeVisible()
})
