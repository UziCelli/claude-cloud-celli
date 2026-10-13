import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, gravarDoc, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.cardio-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Carla Aluna', email: 'carla.cardio-e2e@teste.com', senha: 'senha123' }

async function entrar(page: Page, email: string, senha: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

test('aluno sem meso registra, edita e desfaz o cardio de hoje', async ({ page }) => {
  await limparEmuladores()
  await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  await page.setViewportSize({ width: 390, height: 844 })
  await entrar(page, ALUNO.email, ALUNO.senha)

  await expect(page.getByText('Fez cardio hoje?')).toBeVisible()
  await page.getByRole('button', { name: 'Registrar cardio' }).click()
  await page.getByRole('button', { name: 'Esteira' }).click()
  await page.getByLabel('Minutos (opcional)').fill('30')
  await page.getByRole('button', { name: 'Salvar cardio' }).click()
  await expect(page.getByText('Hoje: Esteira · 30 min')).toBeVisible()

  await page.reload()
  await expect(page.getByText('Hoje: Esteira · 30 min')).toBeVisible()

  await page.getByRole('button', { name: 'Editar cardio' }).click()
  await page.getByRole('button', { name: 'Corrida' }).click()
  await page.getByLabel('Minutos (opcional)').fill('45')
  await page.getByRole('button', { name: 'Salvar cardio' }).click()
  await expect(page.getByText('Hoje: Corrida · 45 min')).toBeVisible()

  await page.getByRole('button', { name: 'Editar cardio' }).click()
  await page.getByRole('button', { name: 'Desfazer cardio' }).click()
  await expect(page.getByText('Fez cardio hoje?')).toBeVisible()
})

test('coach vê o cardio no calendário do aluno', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const w = { w1: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso Cardio',
    frequencia: 1,
    semanas: 1,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  await criarRegistro(mesoId, alunoId, 1, 1, { cargas: { a: { s1: 20, s2: 20, s3: 20 } }, realizado: true, realizadoEm: new Date() })
  await gravarDoc(`cardios/${alunoId}_${hojeSaoPaulo()}`, { alunoId, dia: hojeSaoPaulo(), em: new Date(), tipo: 'esteira', min: 30 })

  await entrar(page, COACH.email, COACH.senha)
  await page.goto(`/#/aluno/${alunoId}/evolucao`)
  await expect(page.getByRole('img', { name: /1 dia de cardio/ })).toBeVisible()
  await expect(page.getByText('Cardio: 1 dia nos últimos 3 meses')).toBeVisible()
})
