import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.foto-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Ana Foto', email: 'ana.foto-e2e@teste.com', senha: 'senha123' }
// PNG 1x1 vermelho
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==', 'base64')

test.use({ ...devices['Pixel 7'] })

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const prog = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  await criarMeso({
    alunoId,
    nome: 'Mesociclo Foto',
    frequencia: 3,
    semanas: 4,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }], t2: [{ slotId: 'a', nome: 'Levantamento Terra Barra' }], t3: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: prog, auxiliares: prog },
  })
})

test('foto no fim do treino: prévia, trocar e tirar', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
  await page.getByRole('button', { name: /Treino 1/ }).click()
  await page.getByRole('button', { name: 'Iniciar treino' }).click()
  await page.getByRole('button', { name: 'Concluir treino' }).click()
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible()

  await page.locator('input[type="file"]').setInputFiles({ name: 'foto.png', mimeType: 'image/png', buffer: PNG })
  const previa = page.getByRole('img', { name: 'Prévia do story com a sua foto' })
  await expect(previa).toBeVisible()
  await expect(page.getByRole('button', { name: 'Compartilhar no story' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Trocar foto' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

  await page.getByRole('button', { name: 'Tirar foto' }).click()
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible()
  await expect(previa).toBeHidden()
  await expect(page.getByRole('button', { name: 'Adicionar foto' })).toBeVisible()
})
