import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.voz@teste.com', senha: 'senha123' }
const CHAVE = 'sk-ant-api03-chave-de-teste-123456'

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
})

test('cadastra a chave e monta treinos por texto (API simulada)', async ({ page }) => {
  const alunoId = await criarAluno('Voz Teste', 'voz.e2e@teste.com', 'senha123')
  const linha = { w1: [10, 10, 10, null, null, null] }
  const id = await criarMeso({
    alunoId, nome: 'Meso Voz', frequencia: 2, semanas: 1, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a1', nome: 'Agachamento Livre Halter' }] }, progressao: { principais: linha, auxiliares: linha },
  })

  let cabecalhos: Record<string, string> = {}
  await page.route('https://api.anthropic.com/v1/messages', async (rota) => {
    cabecalhos = rota.request().headers()
    await rota.fulfill({
      json: {
        content: [
          {
            type: 'tool_use',
            name: 'montar_treinos',
            input: { treinos: [{ treino: 2, exercicios: ['agachamento livre barra', 'Rosca Inventada'] }, { treino: 9, exercicios: ['Fora'] }] },
          },
        ],
      },
    })
  })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()

  // Sem chave, o editor avisa onde cadastrar.
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Divisão', exact: true }).click()
  await page.getByRole('button', { name: 'Montar treinos por voz' }).click()
  await expect(page.getByText('Falta cadastrar a chave da IA')).toBeVisible()

  // Chave torta é recusada; a certa é gravada e só o fim aparece na tela.
  await page.goto('/#/conta')
  await page.getByLabel('Chave da API (sk-ant-…)').fill('abc')
  await page.getByRole('button', { name: 'Salvar chave' }).click()
  await expect(page.getByText('Essa chave não parece certa')).toBeVisible()
  await page.getByLabel('Chave da API (sk-ant-…)').fill(CHAVE)
  await page.getByRole('button', { name: 'Salvar chave' }).click()
  await expect(page.getByText('Chave salva.')).toBeVisible()
  await expect(page.getByText('sk-ant-…3456')).toBeVisible()
  await expect(page.getByText(CHAVE)).toHaveCount(0)
  expect(JSON.stringify(await lerDoc('segredos/ia'))).toContain(CHAVE)

  // Monta: confere a proposta, aplica e o treino 2 aparece no editor.
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Divisão', exact: true }).click()
  await page.getByRole('button', { name: 'Montar treinos por voz' }).click()
  await page.getByLabel('O que você falou').fill('treino dois, agachamento livre barra e rosca inventada')
  await page.getByRole('button', { name: 'Montar treino', exact: true }).click()
  const proposta = page.getByTestId('proposta-ia')
  await expect(proposta.getByText('Agachamento Livre Barra')).toBeVisible()
  await expect(proposta.getByText('Rosca Inventada')).toBeVisible()
  await expect(proposta.getByText('fora do catálogo')).toHaveCount(1)
  await expect(proposta.getByText('Treino 9')).toHaveCount(0)
  expect(cabecalhos['x-api-key']).toBe(CHAVE)
  expect(cabecalhos['anthropic-dangerous-direct-browser-access']).toBe('true')

  await page.getByRole('button', { name: 'Aplicar no editor' }).click()
  await expect(page.getByText('Treino 2 montado.')).toBeVisible()
  await expect(page.getByTestId('treino-2').getByRole('combobox').first()).toHaveValue('Agachamento Livre Barra')
})
