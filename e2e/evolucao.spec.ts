import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.evo-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Carla Aluna', email: 'carla.evo-e2e@teste.com', senha: 'senha123' }
const PRINTS = '/tmp/claude-0/-home-user-claude-cloud-celli/7bb1957b-62c0-5c39-98cc-434448e8e65a/scratchpad'

const diasAtras = (n: number) => new Date(Date.now() - n * 86_400_000)

async function semear() {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso Evolução',
    frequencia: 2,
    semanas: 2,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }], t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  const feito = (semana: number, treino: number, carga: number, dias: number) =>
    criarRegistro(mesoId, alunoId, semana, treino, { cargas: { a: { s1: carga, s2: carga, s3: carga } }, realizado: true, realizadoEm: diasAtras(dias) })
  await feito(1, 1, 20, 2)
  await feito(1, 2, 15, 1)
  await feito(2, 1, 30, 0)
  return alunoId
}

async function entrar(page: Page, email: string, senha: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

test('aluno vê o painel de evolução', async ({ page }) => {
  await semear()
  await page.setViewportSize({ width: 390, height: 844 })
  await entrar(page, ALUNO.email, ALUNO.senha)
  await page.getByRole('link', { name: 'Evolução' }).click()

  await expect(page.getByText('treinos feitos')).toBeVisible()
  await expect(page.getByText(/Desenvolvimento Militar Barra: 20 → 30 kg/)).toBeVisible()
  await expect(page.getByText('🏅 Primeiro treino')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Compartilhar no story' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${PRINTS}/painel-390.png`, fullPage: true })

  await page.setViewportSize({ width: 1280, height: 900 })
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${PRINTS}/painel-1280.png`, fullPage: true })
})

test('coach vê o painel do aluno', async ({ page }) => {
  const alunoId = await semear()
  await entrar(page, COACH.email, COACH.senha)
  await page.goto(`/#/aluno/${alunoId}/evolucao`)
  await expect(page.getByText('treinos feitos')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Compartilhar no story' })).toHaveCount(0)
})
