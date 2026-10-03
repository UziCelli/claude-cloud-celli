import { expect, test, devices } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { criarAluno, limparEmuladores, lerDoc } from './seed'

const marca = JSON.parse(readFileSync(`marcas/${process.env.MARCA ?? 'vfit'}/marca.json`, 'utf8'))
const ALUNO = { nome: 'Bia Aluna', email: 'bia.privacidade-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'] })
test.beforeAll(limparEmuladores)

test('política abre sem login', async ({ page }) => {
  await page.goto('/privacidade')
  await expect(page.getByRole('heading', { name: 'Política de Privacidade' })).toBeVisible()
  await expect(page.getByText(`CREF ${marca.responsavel.cref}`)).toBeVisible()
})

test('cadastro: botão só habilita com a caixa marcada', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Criar conta/ }).click()
  await page.getByLabel('Nome').fill('Caio Novo')
  await page.getByLabel('E-mail').fill('caio.privacidade-e2e@teste.com')
  await page.getByLabel('Senha').fill('senha123')
  const criar = page.getByRole('button', { name: 'Criar conta', exact: true })
  await expect(criar).toBeDisabled()
  await page.getByLabel(/Li e aceito/).check()
  await expect(criar).toBeEnabled()
  await criar.click()
  await expect(page.getByText('Cadastro recebido!')).toBeVisible()
})

test('aluno sem aceite vê a tela, aceita e não vê de novo', async ({ page }) => {
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, undefined, false)
  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  const aceitar = page.getByRole('button', { name: 'Aceitar e continuar' })
  await expect(aceitar).toBeDisabled()
  await page.getByLabel(/Li e aceito/).check()
  await aceitar.click()
  await expect(aceitar).toBeHidden()
  await expect(page.getByText('Olá, Bia Aluna')).toBeVisible()
  await expect.poll(async () => JSON.stringify(await lerDoc(`usuarios/${uid}`))).toContain('privacidadeVersao')
  await page.reload()
  await expect(page.getByText('Olá, Bia Aluna')).toBeVisible()
  await expect(page.getByText('Sua privacidade')).toBeHidden()
})
