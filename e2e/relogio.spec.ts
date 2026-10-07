import { expect, test, devices, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.relogio-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Rita Relógio', email: 'rita.relogio-e2e@teste.com', senha: 'senha123' }
const PRINT = '/tmp/claude-0/-home-user-claude-cloud-celli/7bb1957b-62c0-5c39-98cc-434448e8e65a/scratchpad/treino-relogio.png'

test.use({ ...devices['Pixel 7'], viewport: { width: 390, height: 844 } })

let alunoId: string

async function semear() {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  await criarMeso({
    alunoId,
    nome: 'Meso Relógio',
    frequencia: 2,
    semanas: 2,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }], t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
}

async function entrar(page: Page, email: string, senha: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

const saiu = (page: Page) => page.evaluate(() => localStorage.getItem('forca-saiu-inatividade'))

const seg = async (page: Page) => {
  const t = (await page.getByTestId('relogio-treino').innerText()).split(':').map(Number)
  return t.reduce((a, n) => a * 60 + n, 0)
}

async function iniciarEConcluir(page: Page, print = false) {
  await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
  await expect(page.getByRole('timer')).toHaveCount(0)
  await page.getByRole('button', { name: '▶ Iniciar treino' }).click()
  await expect(page.getByRole('button', { name: '▶ Iniciar treino' })).toHaveCount(0)
  await expect(page.getByText('Treino em andamento')).toBeVisible()
  const a = await seg(page)
  await expect.poll(() => seg(page), { timeout: 8000 }).toBeGreaterThan(a)
  if (print) await page.screenshot({ path: PRINT })
  await page.getByRole('button', { name: 'Concluir treino' }).click()
  await expect(page.getByRole('heading', { name: /Treino concluído/ })).toBeVisible()
  await page.getByRole('button', { name: 'Voltar para Hoje' }).click()
  await expect(page.getByRole('button', { name: /Treino 1.*✓/ })).toBeVisible()
  await expect(page.getByText('Treino em andamento')).toHaveCount(0)
}

test('aluno: iniciar, relógio andando, concluir mostra duração parada', async ({ page }) => {
  await semear()
  await entrar(page, ALUNO.email, ALUNO.senha)
  await page.getByRole('button', { name: /Treino 1/ }).click()
  await iniciarEConcluir(page, true)
  await page.getByRole('button', { name: /Treino 1/ }).click()
  await expect(page.getByText('Duração do treino')).toBeVisible()
  await expect(page.getByRole('button', { name: '▶ Iniciar treino' })).toHaveCount(0)
  await expect(page.getByRole('timer')).toHaveCount(0)
})

test('coach presencial: iniciar, relógio andando, concluir', async ({ page }) => {
  await semear()
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}`)
  await page.getByRole('button', { name: 'Treino presencial' }).click()
  await page.getByRole('button', { name: /Treino 1/ }).click()
  await iniciarEConcluir(page)
})

// Treino iniciado neste aparelho conta como uso; sem treino, o coach cai em 20 min.
for (const comTreino of [true, false]) {
  test(`inatividade do coach ${comTreino ? 'não cai com treino iniciado' : 'cai sem treino iniciado'}`, async ({ page }) => {
    await semear()
    await page.clock.install()
    await entrar(page, COACH.email, COACH.senha)
    await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
    await page.goto(`/#/aluno/${alunoId}`)
    await page.getByRole('button', { name: 'Treino presencial' }).click()
    await page.getByRole('button', { name: /Treino 1/ }).click()
    await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
    if (comTreino) await page.getByRole('button', { name: '▶ Iniciar treino' }).click()
    else await page.getByRole('button', { name: '‹ Voltar' }).or(page.getByRole('button', { name: '← Hoje' })).first().click()
    await page.clock.fastForward('25:00')
    if (comTreino) {
      await page.waitForTimeout(1500)
      expect(await saiu(page)).toBeNull()
      await expect(page.getByText('Treino em andamento')).toBeVisible()
    } else {
      // O app marca "saiu por inatividade" e chama sair() (a tela de login não renderiza sob relógio falso).
      await expect.poll(() => saiu(page), { timeout: 15_000 }).toBe('1')
    }
  })
}
