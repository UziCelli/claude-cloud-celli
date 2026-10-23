import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.mon-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Ana Aluna', email: 'ana.mon-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'] })

test('treino de hoje em destaque: Início com link certo e selo na semana', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso Monitoramento',
    frequencia: 2,
    semanas: 2,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }], t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  await criarRegistro(mesoId, alunoId, 1, 2, { cargas: { a: { s1: 20 } }, realizado: true, realizadoEm: new Date() })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()

  const link = page.getByRole('link', { name: 'Ana Aluna · Treino 2 (feito)' })
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('href', `#/meso/${mesoId}/semana/1`)
  await link.click()

  const cartao2 = page.locator('.rounded-xl.border').filter({ has: page.getByRole('heading', { name: /Treino 2/ }) })
  await expect(cartao2.getByText('Feito hoje', { exact: true })).toBeVisible()
  await expect(page.getByText('Feito hoje', { exact: true })).toHaveCount(1)
  await expect(page.getByText('Treinando hoje')).toHaveCount(0)

  // Carga digitada pelo coach num treino não iniciado é correção: grava, mas não vira "Treinando hoje".
  const cartao1 = page.locator('.rounded-xl.border').filter({ has: page.getByRole('heading', { name: /Treino 1/ }) })
  const linha = cartao1.locator('table tbody tr').first()
  const serie1 = linha.locator('input[inputmode="decimal"]').first()
  await serie1.fill('30')
  await serie1.press('Enter')
  await expect(linha.locator('td:nth-last-child(2)')).toHaveText('30', { timeout: 10_000 })
  await expect(page.getByText('Treinando hoje')).toHaveCount(0)

  await page.goto('/#/')
  await expect(page.getByRole('link', { name: 'Ana Aluna · Treino 2 (feito)' })).toBeVisible()
  await expect(page.getByText(/Treino 1 \(em andamento\)/)).toHaveCount(0)
})
