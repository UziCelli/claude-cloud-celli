import { devices, expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores, listarDocs } from './seed'

test.use({ ...devices['Pixel 7'] })
const senha = 'senha123'
const coach = 'coach.dor@exemplo.com'
let ana = ''
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
  ana = await criarAluno('Ana Exemplo', 'ana.dor@exemplo.com', senha)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  mesoId = await criarMeso({
    alunoId: ana, nome: 'Meso Dor', frequencia: 3, semanas: 4, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }, { slotId: 'b', nome: 'Supino Reto Barra' }], t2: [{ slotId: 'a', nome: 'Levantamento Terra Barra' }], t3: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
})

test('aluno relata dor (online e offline), coach vê no Início, responde e aluno lê a resposta', async ({ page, browser }) => {
  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, 'ana.dor@exemplo.com', /Olá, Ana/)
  await aluno.goto(`/#/treino/${mesoId}/1/1`)
  await expect(aluno.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
  await aluno.getByRole('button', { name: 'Senti dor' }).first().click()
  const pop = aluno.getByRole('dialog', { name: 'Senti dor' })
  await expect(pop.getByRole('button', { name: 'Enviar' })).toBeDisabled()
  await pop.getByRole('button', { name: 'Joelho' }).click()
  await pop.getByRole('button', { name: 'Intensidade 7', exact: true }).click()
  await pop.getByRole('button', { name: 'Enviar' }).click()
  await expect(pop.getByText('Pare esse exercício hoje.')).toBeVisible()
  await expect(pop.getByRole('alert')).toContainText('procure um médico ou fisioterapeuta')
  await pop.getByRole('button', { name: 'Fechar' }).click()

  await ctx.setOffline(true)
  await aluno.getByRole('button', { name: 'Senti dor' }).first().click()
  await pop.getByRole('button', { name: 'Outro' }).click()
  await pop.getByRole('button', { name: 'Intensidade 2', exact: true }).click()
  await expect(pop.getByRole('button', { name: 'Enviar' })).toBeDisabled() // "Outro" exige texto
  await pop.getByLabel('Conte onde sentiu').fill('Dedo do pé')
  await pop.getByRole('button', { name: 'Enviar' }).click()
  await expect(pop.getByText('Pode seguir com atenção', { exact: false })).toBeVisible()
  await pop.getByRole('button', { name: 'Fechar' }).click()
  await ctx.setOffline(false)
  await expect.poll(async () => (await listarDocs('fisioDores')).length).toBe(2)

  await entrar(page, coach, /Início/)
  await expect(page.getByRole('heading', { name: 'Físio · relatos de dor novos' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Ana Exemplo · 7\/10/ })).toBeVisible()
  await page.getByRole('link', { name: /Ana Exemplo · 7\/10/ }).click()
  await expect(page.getByRole('heading', { name: 'Relatos de dor' })).toBeVisible()
  await page.getByLabel('Responder').first().fill('Troque por leg press leve.')
  await page.getByRole('button', { name: 'Enviar resposta' }).first().click()
  await expect(page.getByText('Resposta enviada.')).toBeVisible()
  const docs = await listarDocs('fisioDores')
  expect(docs.some((d) => d.fields.resposta?.stringValue === 'Troque por leg press leve.' && d.fields.vistoEm)).toBe(true)

  await aluno.goto('/#/fisio')
  await expect(aluno.getByRole('heading', { name: 'Meus relatos de dor' })).toBeVisible()
  await expect(aluno.getByText('Seu coach: Troque por leg press leve.')).toBeVisible()
  await ctx.close()
})
