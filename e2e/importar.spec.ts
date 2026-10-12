import { expect, test } from '@playwright/test'
import { abaMesoFalsa, criarXlsx } from '../src/lib/__fixtures__/xlsxFalso'
import { criarAluno, criarCoach, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.imp-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Aluna Importada', email: 'aluna.imp-e2e@teste.com', senha: 'senha123' }
const TIPO = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

test('coach importa um mesociclo da planilha', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  // M7 = modelo atual (2 semanas, 2 treinos, cargas e 1 realizado); M1 = aba antiga sem configuração.
  const buffer = Buffer.from(await criarXlsx({ M1: {}, M7: abaMesoFalsa(true) }))

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}`)

  async function importar() {
    await page.getByRole('button', { name: 'Importar da planilha' }).click()
    await page.getByLabel('Planilha (.xlsx)').setInputFiles({ name: 'treino.xlsx', mimeType: TIPO, buffer })
  }

  await importar()
  await expect(page.getByLabel('Aba')).toHaveValue('M7')
  await expect(page.getByLabel('Nome do mesociclo')).toHaveValue('Mesociclo 7')
  const previa = page.getByTestId('previa')
  await expect(previa).toContainText('01/01/2024')
  await expect(previa).toContainText('2 semanas · 2 treinos por semana')
  await expect(previa).toContainText('Treino 1: Supino, Crucifixo')
  await expect(previa).toContainText('Treino 2: Agachamento')
  await expect(previa).toContainText('1 treino realizado com carga')
  await expect(previa).toContainText('1 treino com carga marcado como Não realizado fica de fora')
  await page.waitForTimeout(2000) // fim da animação do painel (só para o print)
  await page.screenshot({ path: '/tmp/claude-0/-home-user-claude-cloud-celli/7bb1957b-62c0-5c39-98cc-434448e8e65a/scratchpad/importar-previa.png' })

  await page.getByLabel('Aba').selectOption('M1')
  await expect(page.getByRole('alert')).toContainText('não tem a Configuração do Meso')
  await expect(page.getByRole('button', { name: 'Importar', exact: true })).toBeDisabled()
  await page.getByLabel('Aba').selectOption('M7')
  await expect(previa).toBeVisible()

  await page.getByRole('button', { name: 'Importar', exact: true }).click()
  await page.waitForURL(/#\/meso\//)
  const mesoId = page.url().split('/meso/')[1]
  await page.getByRole('button', { name: 'Divisão', exact: true }).click()
  await expect(page.getByTestId('treino-1').locator('input[role="combobox"]').first()).toHaveValue('Supino')
  await expect(page.getByTestId('treino-2').locator('input[role="combobox"]').first()).toHaveValue('Agachamento')

  await page.getByRole('button', { name: 'Ver semanas' }).click()
  await page.waitForURL(/#\/meso\/.+\/semana\/1/)
  await expect(page.getByRole('spinbutton').first()).toHaveValue('20')
  expect((await lerDoc(`registros/${mesoId}_s01_t1`))?.fields).toMatchObject({ alunoId: { stringValue: alunoId }, realizado: { booleanValue: true } })

  await page.goto(`/#/aluno/${alunoId}`)
  await importar()
  await page.getByLabel('Nome do mesociclo').fill('Mesociclo 7')
  await expect(previa).toBeVisible()
  await page.getByRole('button', { name: 'Importar', exact: true }).click()
  await expect(page.getByText('Este aluno já tem um mesociclo chamado "Mesociclo 7".')).toBeVisible()
})
