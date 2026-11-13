import { expect, test, type Page } from '@playwright/test'
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

async function entrar(page: Page, email: string, senha: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

// Percorre o onboarding: Próximo até o fim, Voltar, Começar; depois Pular, Esc e um atalho do "Tudo pronto".
async function percorrer(page: Page, titulo: string, total: number, atalho: { texto: string; url: RegExp }) {
  const dialogo = page.getByRole('dialog')
  await page.getByRole('button', { name: 'Como usar' }).click()
  await expect(dialogo).toBeVisible()
  await expect(dialogo.getByText(titulo)).toBeVisible()
  for (let n = 1; n < total; n++) {
    await expect(dialogo.getByText(`${n} de ${total}`)).toBeVisible()
    await dialogo.getByRole('button', { name: 'Próximo' }).click()
  }
  await expect(dialogo.getByText(`${total} de ${total}`)).toBeVisible()
  await expect(dialogo.getByRole('heading', { name: 'Agora é com você!' })).toBeVisible()
  await dialogo.getByRole('button', { name: 'Voltar' }).click()
  await expect(dialogo.getByText(`${total - 1} de ${total}`)).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await dialogo.getByRole('button', { name: 'Começar' }).click()
  await expect(dialogo).toBeHidden()

  await page.getByRole('button', { name: 'Como usar' }).click()
  await dialogo.getByRole('button', { name: 'Pular' }).click()
  await expect(dialogo).toBeHidden()

  await page.getByRole('button', { name: 'Como usar' }).click()
  // O app atrás fica inerte: o Tab nunca para num botão do app (só no onboarding ou fora da página).
  for (let n = 0; n < 6; n++) {
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => !!document.getElementById('root')?.contains(document.activeElement))).toBe(false)
  }
  await page.keyboard.press('Escape')
  await expect(dialogo).toBeHidden()
  await expect(page.getByRole('button', { name: 'Como usar' })).toBeFocused()

  await page.getByRole('button', { name: 'Como usar' }).click()
  for (let n = 1; n < total; n++) await page.keyboard.press('ArrowRight')
  await dialogo.getByRole('link', { name: atalho.texto }).click()
  await expect(dialogo).toBeHidden()
  await expect(page).toHaveURL(atalho.url)
}

test('onboarding do aluno', async ({ page }) => {
  await entrar(page, ALUNO.email, ALUNO.senha)
  await expect(page.getByText('Olá, Tati')).toBeVisible()
  await expect(page.getByRole('dialog')).toBeHidden() // no e2e (webdriver) não abre sozinho
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Conta' }).click()
  await percorrer(page, marca.boasVindas, 8, { texto: 'Ver o treino de hoje', url: /#\/treino$/ })
})

test('onboarding do coach', async ({ page }) => {
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await expect(page.getByRole('dialog')).toBeHidden()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Conta' }).click()
  await percorrer(page, `Seu painel ${marca.doNome}`, 9, { texto: 'Cadastrar um aluno', url: /#\/alunos\/novo$/ })
})

test('novidades do aluno: termina pedindo a avaliação do app', async ({ page }) => {
  await entrar(page, ALUNO.email, ALUNO.senha)
  await expect(page.getByText('Olá, Tati')).toBeVisible()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Conta' }).click()
  const dialogo = page.getByRole('dialog')
  await page.getByRole('button', { name: 'Novidades do app' }).click()
  await expect(dialogo.getByRole('heading', { name: 'O app ficou maior' })).toBeVisible()
  for (let n = 1; n < 7; n++) await dialogo.getByRole('button', { name: 'Próximo' }).click()
  await expect(dialogo.getByRole('heading', { name: 'Contamos com a sua ajuda' })).toBeVisible()
  if (marca.avaliarGoogle) await expect(dialogo.getByRole('link', { name: 'Avaliar o atendimento no Google' })).toHaveAttribute('target', '_blank')
  await dialogo.getByRole('link', { name: /Avaliar o app/ }).click()
  await expect(dialogo).toBeHidden()
  await expect(page).toHaveURL(/#\/feedback$/)
})
