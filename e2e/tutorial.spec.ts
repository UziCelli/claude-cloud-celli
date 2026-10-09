import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { criarAluno, criarCoach, limparEmuladores } from './seed'

const marca = JSON.parse(readFileSync(`marcas/${process.env.MARCA ?? 'vfit'}/marca.json`, 'utf8'))

const COACH = { nome: 'Victor', email: 'victor.tutorial-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Tati Aluna', email: 'tati.tutorial-e2e@teste.com', senha: 'senha123' }

test.use({ viewport: { width: 390, height: 844 } })

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
})

test('tutorial do aluno: Próximo até Começar e Pular', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  const dialogo = page.getByRole('dialog')
  await expect(page.getByText('Olá, Tati')).toBeVisible()
  await expect(dialogo).toBeHidden() // no e2e (webdriver) não abre sozinho

  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Conta' }).click()
  await page.getByRole('button', { name: 'Como usar' }).click()
  await expect(dialogo).toBeVisible()
  await expect(dialogo.getByRole('heading', { name: marca.boasVindas })).toBeVisible()
  for (let n = 1; n <= 10; n++) {
    await expect(dialogo.getByText(`${n} de 11`)).toBeVisible()
    await dialogo.getByRole('button', { name: 'Próximo' }).click()
  }
  await expect(dialogo.getByText('11 de 11')).toBeVisible()
  await dialogo.getByRole('button', { name: 'Voltar' }).click()
  await expect(dialogo.getByText('10 de 11')).toBeVisible()
  await dialogo.getByRole('button', { name: 'Próximo' }).click()
  await dialogo.getByRole('button', { name: 'Começar' }).click()
  await expect(dialogo).toBeHidden()

  await page.getByRole('button', { name: 'Como usar' }).click()
  await dialogo.getByRole('button', { name: 'Pular' }).click()
  await expect(dialogo).toBeHidden()

  await page.getByRole('button', { name: 'Como usar' }).click()
  await page.keyboard.press('Escape')
  await expect(dialogo).toBeHidden()
})
