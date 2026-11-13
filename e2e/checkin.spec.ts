import { devices, expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, gravarDoc, hojeSaoPaulo, limparEmuladores, listarDocs } from './seed'

test.use({ ...devices['Pixel 7'] })
test.describe.configure({ mode: 'serial' })
const senha = 'senha123'
const coach = 'coach.checkin@exemplo.com'
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

async function concluir(page: Page, treino: number) {
  await page.goto(`/#/treino/${mesoId}/1/${treino}`)
  await expect(page.getByRole('heading', { name: `Treino ${treino}` })).toBeVisible()
  await page.getByRole('button', { name: 'Iniciar treino' }).click()
  const kg = page.locator('input[inputmode="decimal"]').first()
  await kg.fill('40')
  await kg.blur()
  await page.getByRole('button', { name: 'Concluir treino' }).click()
  await page.getByRole('button', { name: 'Sim, concluir' }).click()
  await expect(page.getByRole('heading', { name: /Treino concluído/ })).toBeVisible()
}

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor', coach, senha)
  ana = await criarAluno('Ana Exemplo', 'ana.checkin@exemplo.com', senha)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  mesoId = await criarMeso({
    alunoId: ana, nome: 'Meso Checkin', frequencia: 3, semanas: 4, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }, { slotId: 'b', nome: 'Supino Reto Barra' }], t2: [{ slotId: 'a', nome: 'Levantamento Terra Barra' }], t3: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
})

test('"Pular" não grava nada e o cartão some', async ({ page }) => {
  await entrar(page, 'ana.checkin@exemplo.com', /Olá, Ana/)
  await concluir(page, 2)
  await expect(page.getByText('Vai só para o seu coach.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Enviar' })).toBeDisabled()
  await page.getByRole('button', { name: 'Pular' }).click()
  await expect(page.getByRole('heading', { name: 'Como você está?' })).toHaveCount(0)
  expect((await listarDocs('fisioCheckins')).length).toBe(0)
  expect((await listarDocs('fisioDores')).length).toBe(0)
})

test('"Sentiu dor hoje? Sim" grava relato com momento "fim"', async ({ page }) => {
  await entrar(page, 'ana.checkin@exemplo.com', /Olá, Ana/)
  await concluir(page, 3)
  await page.getByRole('button', { name: 'Sim', exact: true }).click()
  const pop = page.getByRole('dialog', { name: 'Senti dor' })
  await expect(pop.getByRole('button', { name: 'No fim do treino' })).toHaveAttribute('aria-pressed', 'true')
  await expect(pop.getByRole('button', { name: 'Enviar' })).toBeDisabled()
  await pop.getByRole('button', { name: 'Rosca Direta Barra' }).click()
  await pop.getByRole('button', { name: 'Cotovelo' }).click()
  await pop.getByRole('button', { name: 'Intensidade 2', exact: true }).click()
  await pop.getByRole('button', { name: 'Enviar' }).click()
  await pop.getByRole('button', { name: 'Fechar' }).click()
  await expect.poll(async () => (await listarDocs('fisioDores')).length).toBe(1)
  const d = (await listarDocs('fisioDores'))[0].fields
  expect(d.momento.stringValue).toBe('fim')
  expect(d.exercicio.stringValue).toBe('Rosca Direta Barra')
  await page.getByRole('button', { name: 'Pular' }).click()
  expect((await listarDocs('fisioCheckins')).length).toBe(0)
})

test('aluno envia o check-in; 3 ruins seguidos viram sugestão de polimento para o coach', async ({ page, browser }) => {
  const dia = 86_400_000
  for (const [i, atras] of [2 * dia, dia].entries()) {
    const em = new Date(Date.now() - atras)
    await gravarDoc(`fisioCheckins/semeado${i}`, { alunoId: ana, sono: 2, estresse: 2, cansaco: 2, alimentacao: 3, em, atualizadoEm: em })
  }
  await entrar(page, 'ana.checkin@exemplo.com', /Olá, Ana/)
  await concluir(page, 1)
  for (const p of ['Como você dormiu esta noite?', 'Como está o seu estresse?', 'Cansaço ou dor muscular no corpo', 'Como você se alimentou hoje?'])
    await page.getByRole('button', { name: `${p} 2`, exact: true }).click()
  await page.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(page.getByText('Recebido pelo seu coach.')).toBeVisible()
  await expect.poll(async () => (await listarDocs('fisioCheckins')).length).toBe(3)
  // F3: reabrir o resumo não pergunta de novo e continua 1 documento da sessão.
  await page.getByRole('button', { name: 'Ver treino' }).click()
  await page.getByRole('button', { name: 'Ver resumo' }).click()
  await expect(page.getByRole('heading', { name: /Treino concluído/ })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Como você está?' })).toHaveCount(0)
  expect((await listarDocs('fisioCheckins')).filter((d) => d.fields.mesoId?.stringValue === mesoId).length).toBe(1)

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const c = await ctx.newPage()
  await entrar(c, coach, /Início/)
  await c.goto('/#/alertas')
  await expect(c.getByRole('heading', { name: /Físio · sugestões/ })).toBeVisible()
  await expect(c.getByText('Ana Exemplo — Considere semana de polimento / reduzir volume')).toBeVisible()
  await expect(c.getByText(/Recuperação baixa em 3 check-ins seguidos/)).toBeVisible()
  await c.getByRole('link', { name: 'Abrir ficha' }).click()
  await expect(c.getByRole('heading', { name: 'Recuperação (check-ins)' })).toBeVisible()
  await expect(c.getByText('Recuperação 6/15').first()).toBeVisible()
  await expect(c.getByText('Sono 2 · Estresse 2 · Cansaço 2 · Alimentação 2')).toBeVisible()
  await expect(c.getByText(/Considere semana de polimento/)).toBeVisible()
  await c.goto('/#/alertas')
  await c.getByRole('button', { name: 'Dispensar' }).click()
  await expect(c.getByRole('heading', { name: /Físio · sugestões/ })).toHaveCount(0)
  await ctx.close()
})

test('envio offline mostra pendente e, online, "Recebido pelo seu coach"', async ({ page, context }) => {
  const bia = await criarAluno('Bia Exemplo', 'bia.checkin@exemplo.com', senha)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  mesoId = await criarMeso({ alunoId: bia, nome: 'Meso Bia', frequencia: 3, semanas: 4, inicio: hojeSaoPaulo(), pausaS: 60, divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }], t2: [{ slotId: 'a', nome: 'Levantamento Terra Barra' }], t3: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] }, progressao: { principais: w, auxiliares: w } })
  await entrar(page, 'bia.checkin@exemplo.com', /Olá, Bia/)
  await concluir(page, 1)
  await context.setOffline(true)
  for (const p of ['Como você dormiu esta noite?', 'Como está o seu estresse?', 'Cansaço ou dor muscular no corpo', 'Como você se alimentou hoje?'])
    await page.getByRole('button', { name: `${p} 4`, exact: true }).click()
  await page.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(page.getByText('Salvo no aparelho; vai para o seu coach quando houver internet.')).toBeVisible()
  await context.setOffline(false)
  await expect(page.getByText('Recebido pelo seu coach.')).toBeVisible()
  await expect.poll(async () => (await listarDocs('fisioCheckins')).filter((d) => d.fields.mesoId?.stringValue === mesoId).length).toBe(1)
})
