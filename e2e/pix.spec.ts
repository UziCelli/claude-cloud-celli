import { expect, test, devices } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { criarAluno, criarCoach, gravarDoc, limparEmuladores } from './seed'
import { VERSAO_PRIVACIDADE } from '../src/lib/privacidade'

const marca = JSON.parse(readFileSync(`marcas/${process.env.MARCA ?? 'vfit'}/marca.json`, 'utf8'))
const COACH = { nome: 'Victor', email: 'victor.pix-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Aluna', email: 'bia.pix-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'] })
test.skip(!marca.pix, 'marca sem Pix')

const entrar = async (page: import('@playwright/test').Page, email: string, senha: string) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

test('Pix: coach define a mensalidade, aluno vencido paga e avisa, coach confirma e o aluno entra', async ({ page, browser }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  // Aluno vencido ontem.
  await gravarDoc(`usuarios/${uid}`, {
    papel: 'aluno', status: 'ativo', nome: ALUNO.nome, email: ALUNO.email,
    pagoAte: new Date(Date.now() - 86_400_000), privacidadeVersao: VERSAO_PRIVACIDADE, privacidadeEm: new Date(),
  })

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const coach = await ctx.newPage()
  await entrar(coach, COACH.email, COACH.senha)
  await expect(coach.getByRole('heading', { name: 'Início' })).toBeVisible()

  await test.step('coach põe a mensalidade 150', async () => {
    await coach.goto('/#/alunos')
    await coach.getByRole('button', { name: `Configurações de ${ALUNO.nome}` }).filter({ visible: true }).click()
    await coach.getByRole('button', { name: 'Renovar' }).click()
    await coach.getByRole('spinbutton', { name: 'Mensalidade (R$)' }).fill('150')
    await coach.getByRole('button', { name: 'Salvar mensalidade' }).click()
    await expect(coach.getByRole('spinbutton', { name: 'Mensalidade (R$)' })).toHaveCount(0) // salvar fecha o formulário
    await expect(coach.getByText('R$ 150,00/mês').filter({ visible: true })).toBeVisible()
  })

  await test.step('aluno vencido vê o QR e o copia e cola e toca em "Já paguei"', async () => {
    await entrar(page, ALUNO.email, ALUNO.senha)
    await expect(page.getByRole('heading', { name: 'Acesso pausado' })).toBeVisible()
    await expect(page.getByText('Mensalidade R$ 150,00')).toBeVisible()
    await expect(page.getByRole('img', { name: 'QR Code Pix' })).toBeVisible()
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.getByRole('button', { name: 'Copiar código Pix' }).click()
    await expect(page.getByText('Código copiado')).toBeVisible()
    const texto = await page.evaluate(() => navigator.clipboard.readText())
    expect(texto).toContain('br.gov.bcb.pix')
    expect(texto).toContain('5406150.00')
    await page.getByRole('button', { name: 'Já paguei' }).click()
    await expect(page.getByText(/Aviso enviado em \d{2}\/\d{2}/)).toBeVisible()
  })

  await test.step('coach vê "Informou pagamento" e confirma', async () => {
    await expect(coach.getByText('Informou pagamento').filter({ visible: true })).toBeVisible()
    await coach.getByRole('button', { name: 'Confirmar pagamento' }).click()
    await expect(coach.getByText(/Acesso até \d{2}\/\d{2}/)).toBeVisible()
  })

  await test.step('o aluno entra no app', async () => {
    await expect(page.getByRole('heading', { name: /Olá, Bia/ })).toBeVisible({ timeout: 15_000 })
  })
  await ctx.close()
})
