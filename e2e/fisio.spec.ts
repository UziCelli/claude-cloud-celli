import { devices, expect, test, type Page } from '@playwright/test'
import { ANAMNESE_MINIMA, criarAluno, criarAnamnese, criarCoach, limparEmuladores, listarDocs } from './seed'

test.use({ ...devices['Pixel 7'] })
const senha = 'senha123'
const coach = 'coach.fisio@exemplo.com'
let ana = ''
let bia = ''

async function entrar(page: Page, email: string, titulo: RegExp) {
  await page.addInitScript(() => {
    localStorage.setItem('forca-boas-vindas-visto', '1')
    localStorage.setItem('forca-tutorial-coach-visto', '1')
    localStorage.setItem('forca-tutorial-v2-visto', '1')
  })
  await page.goto('/')
  await page.getByLabel('E-mail', { exact: true }).fill(email)
  await page.getByLabel('Senha', { exact: true }).fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: titulo })).toBeVisible()
}

async function dados(page: Page) {
  await page.getByLabel('Condição informada pelo aluno').fill('Queixa informada de ombro')
  await page.getByLabel('Recado individual').fill('Orientação individual de exemplo')
  await page.getByLabel('Há algum destes contextos?').selectOption('nao')
  await page.getByLabel('Revisei os sinais de alerta').check()
}

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor', coach, senha)
  ana = await criarAluno('Ana Exemplo', 'ana.fisio@exemplo.com', senha)
  bia = await criarAluno('Bia Exemplo', 'bia.fisio@exemplo.com', senha)
})

test('coach envia com revisão, aluno vê só a própria, relata offline e coach recolhe preservando o sinal', async ({ page, browser }) => {
  await entrar(page, coach, /Início/)
  await page.goto(`/#/aluno/${ana}`)
  await page.getByRole('button', { name: /Mais/ }).click()
  await page.getByRole('button', { name: 'Físio · orientações', exact: true }).click()
  await page.getByLabel('Método', { exact: true }).selectOption('M08')
  await expect(page.getByText('O envio ao aluno está indisponível.', { exact: false })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Enviar orientação ao aluno' })).toHaveCount(0)
  await page.getByLabel('Método', { exact: true }).selectOption('M04')
  await expect(page.getByRole('button', { name: 'Enviar orientação ao aluno' })).toBeDisabled()
  await dados(page)
  await page.getByRole('button', { name: 'Enviar orientação ao aluno' }).click()
  await expect(page.getByText('Orientação enviada ao aluno.', { exact: true })).toBeVisible()

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, 'ana.fisio@exemplo.com', /Olá, Ana/)
  await aluno.getByRole('link', { name: /Físio · 1 orientação/ }).click()
  await expect(aluno.getByRole('heading', { name: /M04/ })).toBeVisible()
  await expect(aluno.getByText('Sugestão inicial — ajustar individualmente', { exact: true })).toBeVisible()
  await expect(aluno.getByText('Seu coach: Orientação individual de exemplo', { exact: true })).toBeVisible()
  await ctx.setOffline(true)
  await aluno.getByRole('button', { name: 'Estou com um desses sinais de alerta' }).click()
  await expect(aluno.getByRole('alert')).toContainText('Pare este exercício')
  await expect(aluno.getByText('Sugestão inicial — ajustar individualmente', { exact: true })).toHaveCount(0)
  await expect(aluno.getByText(/Aguardando sincronização do relato/)).toBeVisible()
  await ctx.setOffline(false)
  await expect(aluno.getByText('Relato registrado para o coach.', { exact: true })).toBeVisible()
  await page.goto('/#/')
  await expect(page.getByRole('heading', { name: 'Físio · sinais de alerta relatados' })).toBeVisible()
  await page.getByRole('link', { name: 'Ana Exemplo · M04', exact: true }).click()
  await expect(page.getByText(/Aluno relatou um sinal de alerta/)).toBeVisible()
  page.once('dialog', (d) => d.accept())
  await page.getByRole('button', { name: 'Recolher orientação' }).click()
  await expect(page.getByText('Orientação recolhida.', { exact: true })).toBeVisible()
  await expect(aluno.getByRole('heading', { name: /M04/ })).toHaveCount(0)
  const docs = await listarDocs('fisioOrientacoes')
  expect(docs[0].fields.sinalRelatado.booleanValue).toBe(true)
  expect(docs[0].fields.recolhida.booleanValue).toBe(true)
  await ctx.close()

  const outroCtx = await browser.newContext({ ...devices['Pixel 7'] })
  const outra = await outroCtx.newPage()
  await entrar(outra, 'bia.fisio@exemplo.com', /Olá, Bia/)
  await outra.goto('/#/fisio')
  await expect(outra.getByText('Seu coach ainda não disponibilizou orientações aqui.')).toBeVisible()
  await outroCtx.close()
})

test('método com liberação exige profissional/data e pausa por saúde oculta o protocolo sem esconder alertas', async ({ page, browser }) => {
  await entrar(page, coach, /Início/)
  await page.goto(`/#/aluno/${bia}/fisio`)
  await page.getByLabel('Método', { exact: true }).selectOption('M07')
  await dados(page)
  await expect(page.getByRole('button', { name: 'Enviar orientação ao aluno' })).toBeDisabled()
  await page.getByLabel('Profissional que liberou').fill('Fisioterapeuta Exemplo')
  await page.getByLabel('Conselho/registro').fill('CREFITO exemplo')
  await page.getByLabel('Data da liberação').fill('2026-11-10')
  await page.getByRole('button', { name: 'Enviar orientação ao aluno' }).click()
  await expect(page.getByText('Orientação enviada ao aluno.', { exact: true })).toBeVisible()
  await criarAnamnese(bia, { ...ANAMNESE_MINIMA, coracao: true }, new Date(Date.now() + 1000))
  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, 'bia.fisio@exemplo.com', /Treino pausado pela sua saúde/)
  await aluno.goto('/#/fisio')
  await expect(aluno.getByText(/Seu treino está pausado por saúde/)).toBeVisible()
  await expect(aluno.getByText('Sugestão inicial — ajustar individualmente', { exact: true })).toHaveCount(0)
  await expect(aluno.getByRole('button', { name: 'Estou com um desses sinais de alerta' })).toBeVisible()
  await aluno.screenshot({ path: '/tmp/fisio-aluno-pausado.png', fullPage: true })
  await page.screenshot({ path: '/tmp/fisio-coach.png', fullPage: true })
  await ctx.close()
})
