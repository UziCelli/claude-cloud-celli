import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.met@teste.com', senha: 'senha123' }

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
})

test('filtro de métodos por semana, treino e exercício', async ({ page }) => {
  const alunoId = await criarAluno('Bia Met', 'bia.met@teste.com', 'senha123')
  const linha = { w1: [10, 10, 10, null, null, null], w2: [10, 10, 10, null, null, null] }
  const slots = ['Supino Reto Barra', 'Remada Curvada com Barra', 'Agachamento Livre'].map((nome, i) => ({ slotId: `a${i}`, nome }))
  const m = (semana: number, treino: number, exercicio: number) => ({ ativo: true, semana, treino, exercicio, metodo: 'Dropset', escopo: 'Todas as séries', etapas: 1 })
  const id = await criarMeso({
    alunoId, nome: 'Meso Met', frequencia: 2, semanas: 2, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: slots, t2: slots }, progressao: { principais: linha, auxiliares: linha },
    metodos: [m(1, 1, 1), m(2, 1, 3), m(2, 2, 3)],
  })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Métodos', exact: true }).click()

  await expect(page.getByText('Mostrando 3 de 3 métodos')).toBeVisible()
  await page.getByLabel('Filtrar por semana').selectOption('2')
  await expect(page.getByText('Mostrando 2 de 3 métodos')).toBeVisible()
  await page.getByLabel('Filtrar por treino').selectOption('2')
  await expect(page.getByText('Mostrando 1 de 3 métodos')).toBeVisible()
  await page.getByLabel('Filtrar por exercício').selectOption('1')
  await expect(page.getByText('Nenhum método neste filtro.')).toBeVisible()
  await page.getByRole('button', { name: 'Limpar filtro' }).click()
  await expect(page.getByText('Mostrando 3 de 3 métodos')).toBeVisible()
})
