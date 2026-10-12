import { readFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.rel-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Carla Aluna', email: 'carla.rel-e2e@teste.com', senha: 'senha123' }
const PRINTS = 'test-results/prints'
const COMENTARIO = 'Ciclo excelente, Carla! Continue assim.'

const diasAtras = (n: number) => new Date(Date.now() - n * 86_400_000)
const diaISO = (n: number) => new Date(Date.now() - 3 * 3600_000 - n * 86_400_000).toISOString().slice(0, 10)

async function semear() {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso Fim',
    frequencia: 2,
    semanas: 2,
    inicio: diaISO(21), // terminou há 8 dias
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }], t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  const feito = (semana: number, treino: number, carga: number, dias: number) =>
    criarRegistro(mesoId, alunoId, semana, treino, { cargas: { a: { s1: carga, s2: carga, s3: carga } }, realizado: true, realizadoEm: diasAtras(dias) })
  await feito(1, 1, 20, 20)
  await feito(1, 2, 15, 19)
  await feito(2, 1, 30, 13)
}

async function entrar(page: Page, email: string, senha: string) {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

test('coach revisa e libera; o aluno só vê depois', async ({ browser }) => {
  await semear()
  const ctxAluno = await browser.newContext()
  await ctxAluno.addInitScript(() => {
    delete (navigator as { share?: unknown }).share
    delete (navigator as { canShare?: unknown }).canShare
  })
  const aluno = await ctxAluno.newPage()
  const coach = await (await browser.newContext()).newPage()

  // Antes de liberar: o aluno não vê nada.
  await entrar(aluno, ALUNO.email, ALUNO.senha)
  await expect(aluno.getByRole('heading', { name: /Olá, Carla/ })).toBeVisible()
  await expect(aluno.getByText(/Seu relatório/)).toHaveCount(0)

  // Coach: o ciclo aparece em "Relatórios para revisar".
  await entrar(coach, COACH.email, COACH.senha)
  await expect(coach.getByText('Relatórios para revisar')).toBeVisible()
  await coach.getByRole('link', { name: 'Carla Aluna · Meso Fim' }).click()
  await expect(coach.getByText('Aderência')).toBeVisible()
  await expect(coach.getByText(/Desenvolvimento Militar Barra: 20 → 30 kg/)).toBeVisible()
  await coach.getByLabel('Seu comentário para o aluno').fill(COMENTARIO)
  await coach.getByRole('button', { name: 'Salvar rascunho' }).click()
  await expect(coach.getByText('Rascunho salvo.')).toBeVisible()
  await aluno.waitForTimeout(500)
  await expect(aluno.getByText(/Seu relatório/)).toHaveCount(0) // rascunho continua escondido
  await coach.getByRole('button', { name: 'Liberar para o aluno' }).click()
  await expect(coach.getByText('Liberado para o aluno.')).toBeVisible()
  await expect(coach.getByRole('link', { name: 'Avisar no WhatsApp' })).toBeVisible()
  await expect(coach.getByRole('button', { name: 'Recolher' })).toBeVisible()
  await coach.waitForTimeout(500)
  await coach.screenshot({ path: `${PRINTS}/relatorio-coach-390.png`, fullPage: true })

  // Aluno: cartão no Início e relatório com o comentário.
  await aluno.getByRole('link', { name: /Seu relatório do ciclo Meso Fim está pronto/ }).click()
  await expect(aluno.getByText(COMENTARIO)).toBeVisible()
  await expect(aluno.getByText('Aderência')).toBeVisible()
  await expect(aluno.getByRole('button', { name: 'Baixar PDF' })).toBeVisible()
  const [download] = await Promise.all([aluno.waitForEvent('download'), aluno.getByRole('button', { name: 'Baixar PDF' }).click()])
  expect(download.suggestedFilename()).toMatch(/\.pdf$/)
  expect((await readFile((await download.path())!)).subarray(0, 5).toString()).toBe('%PDF-')
  expect(await aluno.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await aluno.waitForTimeout(800)
  await aluno.screenshot({ path: `${PRINTS}/relatorio-aluno-390.png`, fullPage: true })

  // Coach recolhe: o aluno deixa de ver.
  await coach.getByRole('button', { name: 'Recolher' }).click()
  await aluno.goto('/#/')
  await expect(aluno.getByText(/Seu relatório/)).toHaveCount(0)
})
