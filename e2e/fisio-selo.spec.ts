import { devices, expect, test, type Page } from '@playwright/test'
import { ANAMNESE_MINIMA, criarAluno, criarAnamnese, criarCoach, criarMeso, gravarDoc, hojeSaoPaulo, limparEmuladores } from './seed'

test.use({ ...devices['Pixel 7'] })
const senha = 'senha123'
const coach = 'coach.selo@exemplo.com'
let ana = ''
let bia = ''
let mesoId = ''

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

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor', coach, senha)
  ana = await criarAluno('Ana Exemplo', 'ana.selo@exemplo.com', senha)
  bia = await criarAluno('Bia Exemplo', 'bia.selo@exemplo.com', senha, undefined, true, { anamnese: false })
  await criarAnamnese(bia, { ...ANAMNESE_MINIMA, cirurgia12m: true, dores: ['ombro'], sono: '5a7' })
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  mesoId = await criarMeso({
    alunoId: ana, nome: 'Meso Selo', frequencia: 3, semanas: 4, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }, { slotId: 'b', nome: 'Supino Reto Barra' }], t2: [{ slotId: 'a', nome: 'Levantamento Terra Barra' }], t3: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
})

test('selo Físio aparece só no exercício marcado e some quando o coach tira', async ({ page, browser }) => {
  await entrar(page, coach, /Início/)
  await page.goto(`/#/aluno/${ana}/fisio`)
  await expect(page.getByText('Sem anamnese respondida.', { exact: false })).toHaveCount(0) // Ana tem a anamnese mínima
  await page.getByLabel('Método', { exact: true }).selectOption('M04')
  await page.getByRole('button', { name: '+ Supino Reto Barra' }).click()
  await page.getByLabel('Condição informada pelo aluno').fill('Queixa informada de ombro')
  await page.getByLabel('Há algum destes contextos?').selectOption('nao')
  await page.getByLabel('Revisei os sinais de alerta').check()
  await page.getByRole('button', { name: 'Enviar orientação ao aluno' }).click()
  await expect(page.getByText('Orientação enviada ao aluno.', { exact: true })).toBeVisible()

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, 'ana.selo@exemplo.com', /Olá, Ana/)
  await aluno.goto(`/#/treino/${mesoId}/1/1`)
  await expect(aluno.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
  const selo = aluno.getByRole('button', { name: 'Físio · M04' })
  await expect(selo).toHaveCount(1)
  await selo.click()
  await expect(aluno.getByText('Sugestão inicial — ajustar individualmente', { exact: true })).toBeVisible()
  await aluno.getByRole('button', { name: 'Fechar' }).click()

  await page.getByRole('button', { name: 'Tirar Supino Reto Barra' }).click()
  await expect(aluno.getByRole('button', { name: 'Físio · M04' })).toHaveCount(0)
  await ctx.close()
})

test('anamnese com cirurgia recente trava o contexto de liberação em "sim"', async ({ page }) => {
  await entrar(page, coach, /Início/)
  await page.goto(`/#/aluno/${bia}/fisio`)
  await expect(page.getByText('Dores: Ombro')).toBeVisible()
  await page.getByLabel('Método', { exact: true }).selectOption('M04')
  const ctx = page.getByLabel('Há algum destes contextos?')
  await expect(ctx).toBeDisabled()
  await expect(ctx).toHaveValue('sim')
  await expect(page.getByText('cirurgia nos últimos 12 meses')).toBeVisible()
})

const orientacao = (extra: Record<string, unknown> = {}) => ({
  alunoId: ana, metodoId: 'M04', condicao: 'Queixa informada de ombro', recado: 'Vá com calma', contextoLiberacao: false, liberacao: null, alertasRevisados: true,
  recolhida: false, sinalRelatado: false, exercicios: ['Supino Reto Barra'], em: new Date(), atualizadoEm: new Date(), ...extra,
})

test('modal aberto fecha sozinho quando o coach recolhe (sem recarregar)', async ({ browser }) => {
  await gravarDoc('fisioOrientacoes/regressaoF1', orientacao())
  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, 'ana.selo@exemplo.com', /Olá, Ana/)
  await aluno.goto(`/#/treino/${mesoId}/1/1`)
  await aluno.getByRole('button', { name: 'Físio · M04' }).click()
  await expect(aluno.getByText('Sugestão inicial — ajustar individualmente', { exact: true })).toBeVisible()
  await gravarDoc('fisioOrientacoes/regressaoF1', orientacao({ recolhida: true }))
  await expect(aluno.getByRole('dialog', { name: 'Físio M04' })).toHaveCount(0)
  await expect(aluno.getByText('Sugestão inicial — ajustar individualmente', { exact: true })).toHaveCount(0)
  await ctx.close()
})

test('sinal de alerta pelo modal do treino esconde o protocolo na hora', async ({ browser }) => {
  await gravarDoc('fisioOrientacoes/regressaoF8', orientacao({ exercicios: ['Agachamento Livre Halter'] }))
  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, 'ana.selo@exemplo.com', /Olá, Ana/)
  await aluno.goto(`/#/treino/${mesoId}/1/1`)
  await aluno.getByRole('button', { name: 'Físio · M04' }).click()
  const modal = aluno.getByRole('dialog', { name: 'Físio M04' })
  await expect(modal.getByText('Sugestão inicial — ajustar individualmente', { exact: true })).toBeVisible()
  await modal.getByRole('button', { name: 'Estou com um desses sinais de alerta' }).click()
  await expect(modal.getByRole('alert')).toContainText('Pare este exercício')
  await expect(modal.getByText('Sugestão inicial — ajustar individualmente', { exact: true })).toHaveCount(0)
  await expect(modal.getByText('Vá com calma')).toHaveCount(0)
  await ctx.close()
})
