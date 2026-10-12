import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.alr-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Lia Alerta', email: 'lia.alr-e2e@teste.com', senha: 'senha123' }
const PRINTS = '/tmp/claude-0/-home-user-claude-cloud-celli/7bb1957b-62c0-5c39-98cc-434448e8e65a/scratchpad'

test.use({ ...devices['Pixel 7'], viewport: { width: 390, height: 844 } })
test.describe.configure({ mode: 'serial' })

let mesoId = ''
test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  mesoId = await criarMeso({
    alunoId, nome: 'Meso Alertas', frequencia: 1, semanas: 2, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Supino Reto Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  await criarRegistro(mesoId, alunoId, 1, 1, {
    cargas: { a: { s1: 40, s2: 40, s3: 40 } }, reps: { a: { s1: 5, s2: 6, s3: 5 } }, realizado: true, realizadoEm: new Date(),
  })
})

test('coach vê o alerta em Alertas e o banner no Início', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  const banner = page.getByRole('link', { name: /1 alerta/ })
  await expect(banner).toBeVisible({ timeout: 10_000 })
  await banner.click()
  await expect(page.getByRole('heading', { name: 'Alertas' })).toBeVisible()
  await expect(page.getByText('Lia Alerta — 3 de 3 séries abaixo da meta (−8 reps)')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Ver semana' })).toHaveAttribute('href', `#/meso/${mesoId}/semana/1`)
  await page.getByRole('button', { name: 'Ver sugestão' }).click()
  await expect(page.getByText(/Reduzir a carga 5–10%/)).toBeVisible()
  await page.screenshot({ path: `${PRINTS}/alertas-coach.png` })
})

test('aluno vê o aviso e "Entendi" esconde', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
  const aviso = page.getByText(/Reps abaixo da meta:/)
  await expect(aviso).toBeVisible({ timeout: 10_000 })
  await expect(page.getByText(/ex\.: Supino Reto Barra/)).toBeVisible()
  await page.screenshot({ path: `${PRINTS}/alertas-aluno.png` })
  await page.getByRole('button', { name: 'Entendi' }).click()
  await expect(aviso).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('heading', { name: /^Semana \d de 2$/ })).toBeVisible()
  await expect(aviso).toHaveCount(0)
})

test('coach arquiva, desarquiva e envia por WhatsApp', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.getByRole('link', { name: /1 alerta/ }).click()
  const cartao = page.getByText('Lia Alerta — 3 de 3 séries abaixo da meta (−8 reps)')
  await expect(cartao).toBeVisible({ timeout: 10_000 })
  const wa = page.getByRole('link', { name: 'WhatsApp' })
  await expect(wa).toHaveAttribute('href', /^https:\/\/wa\.me\/\?text=.*Oi%2C%20Lia!/)
  await expect(wa).toHaveAttribute('rel', 'noopener')
  await expect(page.getByRole('link', { name: 'E-mail' })).toHaveAttribute('href', /^mailto:lia\.alr-e2e@teste\.com\?subject=/)
  await page.getByRole('button', { name: 'Arquivar' }).click()
  await expect(cartao).toHaveCount(0)
  await expect(page.getByText(/Nenhum alerta/)).toBeVisible()
  await page.getByRole('button', { name: /Arquivados \(1\)/ }).click()
  await expect(page.getByText(/Lia Alerta · Reps abaixo da meta/)).toBeVisible()
  await page.screenshot({ path: 'test-results/prints/alertas-arquivados.png' })
  await page.getByRole('button', { name: 'Desarquivar' }).click()
  await expect(cartao).toBeVisible()
  await expect(page.getByRole('button', { name: /Arquivados/ })).toHaveCount(0)
})
