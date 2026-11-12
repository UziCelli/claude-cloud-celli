import { expect, test, devices, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.prox-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Cida Proxima', email: 'cida.prox-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'], viewport: { width: 390, height: 844 } })

const dia = (n: number) => new Date(Date.parse(`${hojeSaoPaulo()}T12:00Z`) + n * 86400_000).toISOString().slice(0, 10)
const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
const meso = (alunoId: string, nome: string, inicio: string) =>
  criarMeso({
    alunoId, nome, frequencia: 2, semanas: 2, inicio, pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }], t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })

async function entrar(page: Page, email: string, senha: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

async function semear(atualInicio: string, proxInicio?: string) {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  await meso(alunoId, 'Meso Atual', atualInicio)
  if (proxInicio) await meso(alunoId, 'Meso Proximo', proxInicio)
  return alunoId
}

test('coach monta o próximo meso e o aluno continua vendo só o atual', async ({ page, browser }) => {
  const alunoId = await semear(hojeSaoPaulo())
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}`)
  await expect(page.getByText('Semana 1 de 2')).toBeVisible()
  await page.getByRole('button', { name: 'Montar próximo meso' }).click()
  await expect(page.getByText('Próximo meso: o aluno ainda não vê.')).toBeVisible()
  await expect(page.getByText(/Termina em ~/)).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}`)
  await expect(page.getByText(/O aluno ainda não vê · começa/)).toBeVisible()

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, ALUNO.email, ALUNO.senha)
  await aluno.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
  await expect(aluno.getByText('Semana 1 de 2')).toBeVisible()
  await expect(aluno.getByText('Meso Atual')).toBeVisible()
  await expect(aluno.getByText('Mesociclo 2')).toHaveCount(0)
  await expect(aluno.getByText(/próximo ciclo começa/)).toHaveCount(0)
  await ctx.close()
})

test('com o atual terminado, o aluno vê só o aviso do próximo ciclo', async ({ page }) => {
  await semear(dia(-30), dia(5))
  await entrar(page, ALUNO.email, ALUNO.senha)
  await expect(page.getByText(`Seu próximo ciclo começa em ${dia(5).slice(8)}/${dia(5).slice(5, 7)}.`)).toBeVisible()
  await expect(page.getByText('Desenvolvimento Militar')).toHaveCount(0)
})

test('"Começar hoje" faz o aluno ver o novo ciclo', async ({ page, browser }) => {
  const alunoId = await semear(dia(-3), dia(5))
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}`)
  page.once('dialog', (d) => d.accept())
  await page.getByRole('button', { name: 'Começar hoje' }).click()
  await expect(page.getByText(/O aluno ainda não vê/)).toHaveCount(0)

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, ALUNO.email, ALUNO.senha)
  await aluno.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
  await expect(aluno.getByText('Meso Proximo')).toBeVisible()
  await ctx.close()
})

test('próximo que sobrepõe o atual: "Ajustar para dd/mm"', async ({ page }) => {
  const alunoId = await semear(dia(-3), dia(2)) // atual 2 semanas: termina em dia(10)
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}`)
  await expect(page.getByText('Começa antes do fim do ciclo atual.')).toBeVisible()
  const d = dia(11)
  await page.getByRole('button', { name: `Ajustar para ${d.slice(8)}/${d.slice(5, 7)}` }).click()
  await expect(page.getByText('Começa antes do fim do ciclo atual.')).toHaveCount(0)
  await expect(page.getByText(`O aluno ainda não vê · começa ${d.slice(8)}/${d.slice(5, 7)}`)).toBeVisible()
})

test('só há meso futuro: o cartão PRÓXIMO continua na tela', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  await meso(alunoId, 'Meso Proximo', dia(5))
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}`)
  await expect(page.getByText(/O aluno ainda não vê · começa/)).toBeVisible()
  await expect(page.getByRole('button', { name: 'Começar hoje' })).toBeVisible()
})
