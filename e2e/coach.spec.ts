import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

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
    await page.getByRole('checkbox', { name: /Li e aceito/ }).check()
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
    for (let t = 1; t <= 3; t++) {
      for (let p = 1; p <= 3; p++) {
        const input = page.getByTestId(`treino-${t}`).getByRole('combobox').nth(p - 1)
        await input.fill(NOMES[p - 1])
        await input.press('Tab')
      }
    }

    const busca = page.getByTestId('treino-1').getByRole('combobox').nth(3)
    await busca.fill('halt bulg')
    await page.getByRole('option', { name: /Búlgaro com Halter/ }).click()
    await expect(busca).toHaveValue(/Búlgaro com Halter/)
    await page.getByTestId('treino-1').getByLabel('Pausa em segundos, posição 1').fill('75')
    await page.getByTestId('treino-1').getByLabel('Pausa em segundos, posição 1').press('Tab')
    await page.screenshot({ path: 'test-results/prints/71-divisao-pc.png' })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.screenshot({ path: 'test-results/prints/72-divisao-celular.png' })
    await page.setViewportSize({ width: 1280, height: 800 })

    await page.screenshot({ path: 'test-results/prints/02-editor-divisao.png' })

    await page.getByRole('button', { name: 'Salvar' }).click()
    await expect(page.getByText('Salvo', { exact: true })).toBeVisible({ timeout: 10_000 })
  })

  await test.step('ajustar volume: +10% na semana 2 para todos', async () => {
    await page.getByRole('button', { name: 'Progressão', exact: true }).click()
    await page.getByLabel('% por semana').fill('10')
    await page.getByLabel('Da semana').fill('2')
    await page.getByLabel('Até a semana').fill('2')
    await page.getByRole('button', { name: 'Calcular prévia' }).click()
    await expect(page.getByText('Movimentos')).toBeVisible()
    await page.screenshot({ path: 'test-results/prints/41-ajustar-volume.png', fullPage: true })
    await page.getByRole('button', { name: 'Aplicar', exact: true }).click()
    // 8 reps +10% = 8,8 -> arredonda para 9 em alguma série da semana 2 (prévia some após aplicar)
    await expect(page.getByText('Movimentos')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Progressão padrão' })).toBeVisible()
    expect(await page.locator('input[type="number"][value]').count()).toBeGreaterThan(0)
    await page.getByRole('button', { name: 'Salvar' }).click()
    await expect(page.getByText('Salvo', { exact: true })).toBeVisible({ timeout: 10_000 })
  })

  await test.step('semana 1 mostra o tempo estimado do treino 1', async () => {
    await page.getByRole('button', { name: 'Ver semanas' }).click()
    await page.waitForURL(/#\/meso\/.+\/semana\/1/)

    await expect(page.getByText(/^30 min$/).first()).toBeVisible()

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

test('coach arquiva, vê em Arquivados e reativa', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.getByRole('link', { name: 'Alunos', exact: true }).click()
  const linha = page.locator('tbody tr').filter({ hasText: ALUNO.nome })
  await linha.getByRole('button', { name: 'Arquivar' }).click()
  await linha.getByRole('button', { name: 'Sim, arquivar' }).click()
  await expect(linha).toHaveCount(0)
  await page.getByRole('button', { name: 'Arquivados (1)' }).click()
  await expect(linha.getByText('Arquivado')).toBeVisible()
  await linha.getByRole('button', { name: 'Reativar' }).click()
  await expect(linha).toHaveCount(0)
  await page.getByRole('button', { name: 'Voltar aos alunos' }).click()
  await expect(linha.getByText('Ativo')).toBeVisible()
})

// Bug de 01/10/2026: a marca de uso da sessão anterior (velha) derrubava o login novo na hora.
test('login novo não cai por inatividade antiga', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.setItem('forca-ultima-atividade', String(Date.now() - 2 * 60 * 60_000)))
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.waitForTimeout(3000)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await expect(page.getByText('Você saiu por inatividade.')).toHaveCount(0)
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
  for (let t = 1; t <= 3; t++) {
    const input = page.getByTestId(`treino-${t}`).getByRole('combobox').first()
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

test('treino acima do tempo: aviso, sugestão de biset e progressão por exercício', async ({ page }) => {
  const alunoId = await criarAluno('Bia Tempo', 'bia.e2e@teste.com', 'senha123')
  const linha = { w1: [10, 10, 10, null, null, null], w2: [10, 10, 10, null, null, null] }
  const treino = ['Supino Reto Barra', 'Remada Curvada com Barra', 'Rosca Direta Halter', 'Tríceps Pulley Corda', 'Cadeira Extensora Tradicional']
  const slots = (t: string, n = 5) => treino.slice(0, n).map((nome, i) => ({ slotId: `${t}${i}`, nome }))
  const id = await criarMeso({
    alunoId, nome: 'Meso Tempo', frequencia: 2, semanas: 2, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: slots('a'), t2: slots('b', 2) }, progressao: { principais: linha, auxiliares: linha },
  })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await expect(page.getByText('Treinos acima do tempo')).toHaveCount(0)

  await page.goto(`/#/meso/${id}`)
  await page.getByLabel(/Tempo limite do aluno/).fill('25')
  await expect(page.getByText('Treinos acima do tempo')).toBeVisible()
  await page.getByRole('button', { name: 'Salvar' }).click()
  await expect(page.getByText('Salvo', { exact: true })).toBeVisible({ timeout: 10_000 })

  await page.getByRole('button', { name: 'Progressão', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Progressão padrão' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Principais|Auxiliares/ })).toHaveCount(0)
  await page.getByRole('button', { name: 'Personalizar' }).first().click()
  await expect(page.getByRole('button', { name: 'Voltar ao padrão' })).toHaveCount(1)
  await page.getByRole('button', { name: 'Voltar ao padrão' }).click()
  await expect(page.getByRole('button', { name: 'Voltar ao padrão' })).toHaveCount(0)

  // Início: cartão com aluno, semana, treino e tempo
  await page.getByRole('link', { name: 'Início' }).click()
  const cartao = page.locator('div').filter({ has: page.getByRole('heading', { name: /Treinos acima do tempo/ }) }).last()
  await expect(cartao.getByText(/Bia Tempo/).first()).toBeVisible({ timeout: 10_000 })
  await cartao.getByRole('button', { name: 'Ver sugestão' }).first().click()
  await expect(cartao.getByText(/(Biset|Triset) · \d+ min → \d+ min/).first()).toBeVisible()
  await page.screenshot({ path: 'test-results/prints/80-sugestao.png' })
  await cartao.getByRole('button', { name: 'Aplicar', exact: true }).first().click()
  await expect(page.getByRole('heading', { name: /Treinos acima do tempo/ })).toHaveCount(0, { timeout: 10_000 })
  await expect.poll(async () => Boolean(((await lerDoc(`mesos/${id}`))?.fields as Record<string, unknown> | undefined)?.adaptadoEm), { timeout: 10_000 }).toBe(true)
})

test('divisão: navegação por teclado e copiar treino', async ({ page }) => {
  const alunoId = await criarAluno('Teclado Teste', 'teclado.e2e@teste.com', 'senha123')
  const linha = { w1: [10, 10, 10, null, null, null], w2: [10, 10, 10, null, null, null] }
  const id = await criarMeso({
    alunoId, nome: 'Meso Teclado', frequencia: 3, semanas: 2, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [], t2: [], t3: [] }, progressao: { principais: linha, auxiliares: linha },
  })
  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Divisão', exact: true }).click()

  const campo = (t: number, p: number) => page.getByTestId(`treino-${t}`).getByRole('combobox').nth(p - 1)
  await campo(1, 1).fill(NOMES[0])
  await campo(1, 1).press('Enter')
  await expect(campo(1, 2)).toBeFocused()
  await campo(1, 2).fill(NOMES[1])
  await campo(1, 2).press('Tab')
  await expect(campo(1, 3)).toBeFocused()
  await campo(1, 3).press('Enter')
  await expect(campo(2, 1)).toBeFocused()

  await page.getByTestId('treino-3').getByLabel('Copiar outro treino para o Treino 3').selectOption({ label: 'Treino 1' })
  await expect(campo(3, 1)).toHaveValue(NOMES[0])
  await expect(campo(3, 2)).toHaveValue(NOMES[1])
})
