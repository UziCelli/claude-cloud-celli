import { expect, test } from '@playwright/test'
import { criarCoach, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Aluno Teste', email: 'aluno.e2e@teste.com', senha: 'senha123' }

const NOMES = ['Agachamento Livre Halter', 'Agachamento Frontal Halter', 'Agachamento Sumô Barra']

test.describe.configure({ mode: 'serial' })

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
})

test('fluxo completo do painel do coach', async ({ page }) => {
  await test.step('aluno se cadastra e vê a tela de espera', async () => {
    await page.goto('/')
    await page.getByText('Não tenho conta — Criar conta').click()
    await page.getByLabel('Nome').fill(ALUNO.nome)
    await page.getByLabel('E-mail').fill(ALUNO.email)
    await page.getByLabel('Senha').fill(ALUNO.senha)
    await page.getByRole('button', { name: 'Criar conta', exact: true }).click()

    await expect(page.getByRole('heading', { name: 'Cadastro recebido!' })).toBeVisible()
    // Sair logo em seguida (como um aluno real faria) não pode perder o cadastro:
    // sair() espera as gravações pendentes chegarem ao servidor.
    await page.getByRole('button', { name: 'Sair' }).click()
  })

  await test.step('coach entra e libera o aluno', async () => {
    await expect(page.getByLabel('E-mail')).toBeVisible()
    await page.getByLabel('E-mail').fill(COACH.email)
    await page.getByLabel('Senha').fill(COACH.senha)
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()

    await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
    const aguardando = page.locator('div').filter({ has: page.getByRole('heading', { name: /Aguardando aprovação/ }) }).last()
    await expect(aguardando.getByRole('link', { name: ALUNO.nome })).toBeVisible({ timeout: 10_000 })
    await page.getByRole('link', { name: 'Alunos', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Alunos' })).toBeVisible()
    const linha = page.locator('tbody tr').filter({ hasText: ALUNO.nome })
    await expect(linha.getByText('Aguardando')).toBeVisible({ timeout: 10_000 })

    await linha.getByRole('button', { name: 'Liberar' }).click()
    await linha.getByRole('button', { name: 'Confirmar' }).click()
    await expect(linha.getByText('Ativo')).toBeVisible()

    await page.screenshot({ path: 'test-results/prints/01-alunos.png' })
  })

  await test.step('coach cria o mesociclo e preenche a divisão', async () => {
    await page.locator('tbody tr').filter({ hasText: ALUNO.nome }).locator('td').first().locator('button').click()
    await expect(page.getByRole('heading', { name: `Mesociclos de ${ALUNO.nome}` })).toBeVisible()

    await page.getByRole('button', { name: 'Novo mesociclo' }).click()
    await page.waitForURL(/#\/meso\//)

    await page.getByRole('button', { name: 'Divisão', exact: true }).click()
    const tabela = page.locator('table').filter({ hasText: 'Posição' })
    for (let t = 1; t <= 3; t++) {
      for (let p = 1; p <= 3; p++) {
        const linha = tabela.locator('tbody tr').nth(p - 1)
        const input = linha.locator('input[list="catalogo"]').nth(t - 1)
        await input.fill(NOMES[p - 1])
        await input.press('Tab')
      }
    }

    await page.screenshot({ path: 'test-results/prints/02-editor-divisao.png' })

    await page.getByRole('button', { name: 'Salvar' }).click()
    await expect(page.getByText('Salvo', { exact: true })).toBeVisible({ timeout: 10_000 })
  })

  await test.step('semana 1 mostra o tempo estimado do treino 1', async () => {
    await page.getByRole('button', { name: 'Ver semanas' }).click()
    await page.waitForURL(/#\/meso\/.+\/semana\/1/)

    await expect(page.getByText(/~29,2 min/).first()).toBeVisible()

    await page.screenshot({ path: 'test-results/prints/03-semana.png' })
  })

  await test.step('carga registrada sobrevive a um reload', async () => {
    const tabelaTreino1 = page.locator('table').first()
    const linhaExercicio1 = tabelaTreino1.locator('tbody tr').first()
    const inputSerie1 = linhaExercicio1.locator('input[type="number"]').first()

    await inputSerie1.fill('20')
    await inputSerie1.press('Enter')

    await expect(linhaExercicio1.locator('td:nth-last-child(2)')).toHaveText('20', { timeout: 10_000 })

    await page.reload()
    await page.waitForURL(/#\/meso\/.+\/semana\/1/)

    const tabelaTreino1Depois = page.locator('table').first()
    const linhaExercicio1Depois = tabelaTreino1Depois.locator('tbody tr').first()
    await expect(linhaExercicio1Depois.locator('input[type="number"]').first()).toHaveValue('20')
    await expect(linhaExercicio1Depois.locator('td:nth-last-child(2)')).toHaveText('20')
  })
})

test('aluno presencial vira aluno com app sem perder o meso; e cria aluno com app', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()

  await page.getByRole('button', { name: 'Novo aluno' }).click()
  await page.getByRole('button', { name: 'Presencial (sem app)' }).click()
  await page.getByLabel('Nome').fill('Pres Teste')
  await page.getByRole('button', { name: 'Cadastrar' }).click()
  await expect(page.getByRole('heading', { name: 'Mesociclos de Pres Teste' })).toBeVisible()
  await expect(page.getByText('Aluno presencial: você anota as cargas em Ver semanas.')).toBeVisible()
  const urlPres = page.url()

  await page.getByRole('button', { name: 'Novo mesociclo' }).click()
  await page.waitForURL(/#\/meso\//)
  const mesoId = page.url().split('#/meso/')[1]
  await page.getByRole('button', { name: 'Divisão', exact: true }).click()
  const tabela = page.locator('table').filter({ hasText: 'Posição' })
  for (let t = 1; t <= 3; t++) {
    const input = tabela.locator('tbody tr').first().locator('input[list="catalogo"]').nth(t - 1)
    await input.fill(NOMES[0])
    await input.press('Tab')
  }
  await page.getByRole('button', { name: 'Salvar' }).click()
  await expect(page.getByText('Salvo', { exact: true })).toBeVisible({ timeout: 10_000 })
  await page.getByRole('button', { name: 'Ver semanas' }).click()
  await page.waitForURL(/#\/meso\/.+\/semana\/1/)
  const linha = page.locator('table').first().locator('tbody tr').first()
  const serie1 = linha.locator('input[type="number"]').first()
  await serie1.fill('30')
  await serie1.press('Enter')
  await expect(linha.locator('td:nth-last-child(2)')).toHaveText('30', { timeout: 10_000 })

  await page.goto(urlPres)
  await page.getByRole('button', { name: 'Dar acesso ao app' }).click()
  await page.getByLabel('E-mail').fill('pres.e2e@teste.com')
  await page.getByRole('button', { name: 'Criar acesso' }).click()
  await expect(page).not.toHaveURL(urlPres, { timeout: 20_000 })
  await expect(page.getByRole('heading', { name: 'Mesociclos de Pres Teste' })).toBeVisible()
  await expect(page.getByText('Mesociclo 1')).toBeVisible({ timeout: 10_000 })
  await expect(page.getByText('Aluno presencial')).toHaveCount(0)

  // Excluir mesociclo: Cancelar mantém; "Sim, excluir" apaga o meso e as cargas dele.
  expect(await lerDoc(`registros/${mesoId}_s01_t1`)).not.toBeNull()
  await page.getByRole('button', { name: 'Excluir' }).click()
  await expect(page.getByText('O aluno já registrou 1 treino neste mesociclo.', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Cancelar' }).click()
  await expect(page.getByRole('button', { name: 'Sim, excluir' })).toHaveCount(0)
  await page.getByRole('button', { name: 'Excluir' }).click()
  await page.getByRole('button', { name: 'Sim, excluir' }).click()
  await expect(page.getByText('Nenhum mesociclo ainda.')).toBeVisible({ timeout: 10_000 })
  // A tela atualiza pelo cache local antes de o servidor confirmar: espera o servidor.
  await expect.poll(() => lerDoc(`mesos/${mesoId}`), { timeout: 10_000 }).toBeNull()
  expect(await lerDoc(`registros/${mesoId}_s01_t1`)).toBeNull()

  await page.getByRole('link', { name: 'Início' }).click()
  await page.getByRole('button', { name: 'Novo aluno' }).click()
  await page.getByLabel('Nome').fill('App Teste')
  await page.getByLabel('E-mail').fill('app.e2e@teste.com')
  await page.getByRole('button', { name: 'Cadastrar' }).click()
  await expect(page.getByRole('heading', { name: 'Mesociclos de App Teste' })).toBeVisible({ timeout: 20_000 })
  await expect(page.getByText('Conta criada. O aluno recebeu um e-mail para criar a senha.')).toBeVisible()
  const r = await fetch('http://127.0.0.1:9099/emulator/v1/projects/demo-forca/oobCodes')
  const codes = (await r.json()).oobCodes as { email: string; requestType: string }[]
  expect(codes.some((c) => c.email === 'app.e2e@teste.com' && c.requestType === 'PASSWORD_RESET')).toBe(true)
})
