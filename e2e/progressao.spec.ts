import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.prog@teste.com', senha: 'senha123' }

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
})

test('ajustar volume: prévia automática, Total e pausa dos principais muda o tempo', async ({ page }) => {
  const alunoId = await criarAluno('Bia Prog', 'bia.prog@teste.com', 'senha123')
  const linha = { w1: [10, 10, 10, null, null, null], w2: [10, 10, 10, null, null, null] }
  const slots = ['Supino Reto Barra', 'Remada Curvada com Barra'].map((nome, i) => ({ slotId: `a${i}`, nome }))
  const id = await criarMeso({
    alunoId, nome: 'Meso Prog', frequencia: 1, semanas: 2, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: slots }, progressao: { principais: linha, auxiliares: linha },
  })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()

  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Progressão', exact: true }).click()
  await expect(page.getByLabel('% por semana')).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Total' })).toBeVisible()
  await expect(page.getByText(/^[+-]?\d+,\d%$/)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Calcular prévia' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Aplicar alterações' })).toBeEnabled()
  await page.getByRole('button', { name: 'Aplicar alterações' }).click()
  await expect(page.getByRole('button', { name: 'Aplicar alterações' })).toBeDisabled()

  // Pausa dos principais maior: o tempo da semana sobe.
  const tempo = () => page.locator('table', { hasText: 'Variação' }).locator('tbody tr').first().locator('td').last().innerText()
  const antes = await tempo()
  await page.getByRole('button', { name: 'Config', exact: true }).click()
  await page.getByLabel('Pausa dos principais (exercícios 1 e 2), s').fill('240')
  await page.getByRole('button', { name: 'Progressão', exact: true }).click()
  expect(await tempo()).not.toBe(antes)
})
