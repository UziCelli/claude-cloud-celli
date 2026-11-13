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

test('pausar a progressão e polimento: seletor de semanas', async ({ page }) => {
  const alunoId = await criarAluno('Caio Pol', 'caio.pol@teste.com', 'senha123')
  const l = [10, 10, 10, null, null, null]
  const linha = { w1: l, w2: l, w3: l, w4: l }
  const slots = ['Supino Reto Barra', 'Remada Curvada com Barra'].map((nome, i) => ({ slotId: `p${i}`, nome }))
  const id = await criarMeso({
    alunoId, nome: 'Meso Pol', frequencia: 1, semanas: 4, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: slots }, progressao: { principais: linha, auxiliares: linha },
  })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Progressão', exact: true }).click()

  const linhaSem = (w: number) => page.locator('table', { hasText: 'Variação' }).locator('tbody tr').nth(w - 1)
  // Progressão: 60 -> 64 -> (pausa) 64 -> 68
  await page.getByRole('button', { name: 'S3', exact: true }).click()
  await expect(page.getByRole('button', { name: 'S3', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(linhaSem(3).locator('td').nth(1)).toHaveText('64')
  await expect(linhaSem(3).locator('td').nth(2)).toHaveText('0,0%')
  await expect(linhaSem(4).locator('td').nth(1)).toHaveText('68')

  // Polimento: a última semana já vem marcada; -40% sobre a semana 3 (60 -> 36).
  await page.getByLabel('Modo').selectOption('pol')
  await expect(page.getByRole('button', { name: 'S4', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(linhaSem(4).locator('td').nth(1)).toHaveText('36')
  await page.getByRole('button', { name: 'Aplicar alterações' }).click()
  await expect(page.getByRole('button', { name: 'Aplicar alterações' })).toBeDisabled()
})

test('gráfico do volume: forma da subida e tipos de polimento', async ({ page }) => {
  const alunoId = await criarAluno('Duda Graf', 'duda.graf@teste.com', 'senha123')
  const l = [10, 10, 10, null, null, null]
  const linha = Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`w${i + 1}`, l]))
  const slots = ['Supino Reto Barra', 'Remada Curvada com Barra'].map((nome, i) => ({ slotId: `g${i}`, nome }))
  const id = await criarMeso({
    alunoId, nome: 'Meso Graf', frequencia: 1, semanas: 6, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: slots }, progressao: { principais: linha, auxiliares: linha },
  })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Progressão', exact: true }).click()

  const analise = page.getByTestId('analise-progressao')
  // Hoje tudo igual: sem progressão. A prévia (+5%/semana) já mostra a subida linear.
  await expect(analise).toContainText('Linear')
  await expect(analise).toContainText('Adequado')
  await page.getByRole('button', { name: 'Aplicar alterações' }).click()

  // Polimento linear em S5–S6, -40% na última: 72 -> 56 -> 42.
  const linhaSem = (w: number) => page.locator('table', { hasText: 'Variação' }).locator('tbody tr').nth(w - 1)
  await page.getByLabel('Modo').selectOption('pol')
  await page.getByLabel('Tipo de polimento').selectOption('linear')
  await page.getByRole('button', { name: 'S5', exact: true }).click()
  await expect(linhaSem(5).locator('td').nth(1)).toHaveText('56')
  await expect(linhaSem(6).locator('td').nth(1)).toHaveText('42')
  await expect(analise).toContainText('Polimento: −41,7% do pico (S4) até a S6.')
  await page.getByLabel('Tipo de polimento').selectOption('degrau')
  await expect(linhaSem(5).locator('td').nth(1)).toHaveText('42')

  // Tocar numa semana mostra os números; "% da S1" troca a escala.
  await page.getByTestId('semana-grafico-4').click()
  await expect(page.getByTestId('grafico-volume')).toContainText('S4: 72 movimentos')
  await page.getByRole('button', { name: '% da S1' }).click()
  await expect(page.getByRole('button', { name: '% da S1' })).toHaveAttribute('aria-pressed', 'true')
  if (process.env.FOTO_GRAFICO) await page.getByTestId('grafico-volume').screenshot({ path: process.env.FOTO_GRAFICO })
})
