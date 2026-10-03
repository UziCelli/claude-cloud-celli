import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.rec-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Aluna', email: 'bia.rec-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'] })

test('recorde: carga maior que a anterior festeja; menor não', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const w = { w1: [8, 8, null, null, null, null], w2: [8, 8, null, null, null, null] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso Recorde',
    frequencia: 1,
    semanas: 2,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }, { slotId: 'b', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  await criarRegistro(mesoId, alunoId, 1, 1, { realizado: true, cargas: { a: { s1: 40 }, b: { s1: 40 } } })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('button', { name: /Treino 1/ })).toBeVisible()
  await page.goto(`/#/treino/${mesoId}/2/1`)

  const digitar = async (exercicio: string, kg: string) => {
    const campo = page.locator('.rounded-xl.border').filter({ hasText: exercicio }).locator('input[type="number"]').first()
    await campo.fill(kg)
    await campo.blur()
  }
  await digitar('Rosca Direta Barra', '30')
  await page.waitForTimeout(1000)
  await expect(page.getByText('Novo recorde')).toHaveCount(0)
  await digitar('Desenvolvimento Militar Barra', '45')
  await expect(page.getByRole('status').filter({ hasText: 'Novo recorde! 🎉 Desenvolvimento Militar Barra: 45 kg' })).toBeVisible()
  await expect(page.getByText('Novo recorde')).toHaveCount(0, { timeout: 8000 })
})
