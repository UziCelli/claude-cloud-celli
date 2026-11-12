import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.met@teste.com', senha: 'senha123' }

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
})

test('adicionar, juntar, editar e tirar métodos por exercício', async ({ page }) => {
  const alunoId = await criarAluno('Bia Met', 'bia.met@teste.com', 'senha123')
  const linha = { w1: [10, 10, 10, null, null, null], w2: [10, 10, 10, null, null, null], w3: [10, 10, 10, null, null, null] }
  const slots = ['Supino Reto Barra', 'Remada Curvada com Barra', 'Agachamento Livre'].map((nome, i) => ({ slotId: `a${i}`, nome }))
  const id = await criarMeso({
    alunoId, nome: 'Meso Met', frequencia: 2, semanas: 3, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: slots, t2: slots }, progressao: { principais: linha, auxiliares: linha },
    metodos: [],
  })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Métodos', exact: true }).click()
  const folha = page.getByRole('dialog')

  // 1. Dropset no exercício 2, semanas 1-2, série S3
  await page.getByRole('button', { name: 'Adicionar método em Remada Curvada com Barra' }).click()
  await folha.getByRole('button', { name: 'Dropset', exact: true }).click()
  await folha.getByRole('button', { name: '3', exact: true }).first().click()
  await folha.getByRole('button', { name: 'S3', exact: true }).click()
  await folha.getByRole('button', { name: 'Pronto' }).click()
  await expect(page.getByRole('button', { name: /^Dropset · S3 · semanas 1–2$/ })).toBeVisible()

  // 2. Biset do 1 com o 3: a linha aparece nos dois
  await page.getByRole('button', { name: 'Adicionar método em Supino Reto Barra' }).click()
  await folha.getByRole('button', { name: 'Biset', exact: true }).click()
  await folha.getByRole('checkbox', { name: /3\. Agachamento/ }).check()
  await folha.getByRole('button', { name: 'Pronto' }).click()
  await expect(page.getByRole('button', { name: /^Biset com 3\. Agachamento Livre/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /^Biset com 1\. Supino Reto Barra/ })).toBeVisible()

  // 3. Mudar as semanas do Dropset
  await page.getByRole('button', { name: /^Dropset/ }).click()
  await folha.getByRole('button', { name: 'Todas', exact: true }).click()
  await folha.getByRole('button', { name: 'Pronto' }).click()
  await expect(page.getByRole('button', { name: /^Dropset.*todas as semanas$/ })).toBeVisible()

  // 4. Tirar o Biset pelo X (pede confirmação)
  page.once('dialog', (d) => d.accept())
  await page.getByRole('button', { name: 'Tirar Biset de Supino Reto Barra' }).click()
  await expect(page.getByRole('button', { name: /^Biset/ })).toHaveCount(0)

  // 5. Salvar, recarregar e conferir
  await page.getByRole('button', { name: 'Salvar', exact: true }).click()
  await page.waitForTimeout(1500)
  await page.reload()
  await page.getByRole('button', { name: 'Métodos', exact: true }).click()
  await expect(page.getByRole('button', { name: /^Dropset.*todas as semanas$/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /^Biset/ })).toHaveCount(0)
})

test('coach abre o guia de fisioterapia; aluno não vê o link', async ({ page, browser }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto('/#/metodos')
  await page.getByText('Métodos Fisioterapia').click()
  await expect(page.getByText('25 métodos')).toBeVisible()
  await page.getByRole('button', { name: 'Ombro', exact: true }).click()
  await expect(page.getByRole('heading', { name: /^M04 ·/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: /^M0[1-35-9] ·/ })).toHaveCount(0)
  await page.getByText('Regras para todos os métodos').click()
  await expect(page.getByText('Monitoramento de dor')).toBeVisible()

  const ctx = await browser.newContext()
  const aluno = await ctx.newPage()
  await aluno.goto('/')
  await aluno.getByLabel('E-mail').fill('bia.met@teste.com')
  await aluno.getByLabel('Senha').fill('senha123')
  await aluno.getByRole('button', { name: 'Entrar', exact: true }).click()
  await aluno.goto('/#/metodos')
  await expect(aluno.getByRole('heading', { name: 'Guia de métodos' })).toBeVisible()
  await expect(aluno.getByText('Métodos Fisioterapia')).toHaveCount(0)
  await ctx.close()
})
