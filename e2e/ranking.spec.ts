import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, limparEmuladores } from './seed'

const COACH = { email: 'victor.ranking-e2e@teste.com', senha: 'senha123' }
const CAINDO = { nome: 'Caio Caindo', email: 'caio.ranking-e2e@teste.com', senha: 'senha123' }

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor', COACH.email, COACH.senha)
  const id = await criarAluno(CAINDO.nome, CAINDO.email, CAINDO.senha)
  const inicio = new Date(Date.now() - 3 * 3600_000 - 14 * 86_400_000).toISOString().slice(0, 10)
  const w = [8, 8, 8, null, null, null]
  const mesoId = await criarMeso({
    alunoId: id,
    nome: 'Mesociclo Ranking',
    frequencia: 3,
    semanas: 4,
    inicio,
    pausaS: 60,
    divisao: {
      t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }],
      t2: [{ slotId: 'a', nome: 'Levantamento Terra Barra' }],
      t3: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }],
    },
    progressao: { principais: { w1: w, w2: w, w3: w, w4: w }, auxiliares: { w1: w, w2: w, w3: w, w4: w } },
  })
  // Mexeu hoje (não é "sumido"), mas nenhum treino concluído em 14 dias.
  await criarRegistro(mesoId, id, 3, 1, { realizado: false })
})

async function entrar(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
}

test('Início mostra o aluno com frequência caindo', async ({ page }) => {
  await entrar(page)
  const bloco = page.locator('div').filter({ has: page.getByRole('heading', { name: /Frequência caindo/ }) }).last()
  await expect(bloco.getByRole('link', { name: CAINDO.nome })).toBeVisible({ timeout: 10_000 })
})

test('página Ranking lista o aluno em risco, sem rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await entrar(page)
  await page.getByRole('link', { name: /Ranking de evolução/ }).click()
  await expect(page.getByRole('heading', { name: 'Ranking de evolução' })).toBeVisible()
  await page.getByRole('tab', { name: 'Em risco' }).click()
  const linha = page.getByRole('listitem').filter({ hasText: CAINDO.nome })
  await expect(linha).toContainText('0/')
  await expect(linha.getByRole('link', { name: CAINDO.nome })).toHaveAttribute('href', /#\/aluno\/.+\/evolucao/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
