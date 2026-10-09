import { readFileSync } from 'node:fs'
import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.aluno-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Ana Aluna', email: 'ana.aluno-e2e@teste.com', senha: 'senha123' }

test.describe.configure({ mode: 'serial' })
test.use({ ...devices['Pixel 7'] })

let mesoId: string
let alunoId: string

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)

  const progressaoSemana = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  mesoId = await criarMeso({
    alunoId,
    nome: 'Mesociclo E2E',
    frequencia: 3,
    semanas: 4,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: {
      t1: [
        { slotId: 'a', nome: 'Agachamento Livre Halter' },
        { slotId: 'b', nome: 'Supino Reto Barra' },
      ],
      t2: [
        { slotId: 'a', nome: 'Levantamento Terra Barra' },
        { slotId: 'b', nome: 'Remada Curvada Barra' },
      ],
      t3: [
        { slotId: 'a', nome: 'Desenvolvimento Militar Barra' },
        { slotId: 'b', nome: 'Rosca Direta Barra' },
      ],
    },
    progressao: { principais: progressaoSemana, auxiliares: progressaoSemana },
  })
})

test('fluxo completo do aluno, incluindo offline', async ({ page, context }) => {
  await test.step('login mostra a semana 1 com 3 treinos', async () => {
    await page.goto('/')
    await page.getByLabel('E-mail').fill(ALUNO.email)
    await page.getByLabel('Senha').fill(ALUNO.senha)
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()
    await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()

    await expect(page.getByText('Mesociclo E2E')).toBeVisible()
    await expect(page.getByText('Semana 1 de 4')).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 1/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 2/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 3/ })).toBeVisible()

    await page.screenshot({ path: 'test-results/prints/10-aluno-hoje.png' })
    await page.waitForTimeout(500)
    await page.screenshot({ path: 'test-results/prints/50-hoje-animado.png' })
  })

  await test.step('registra carga e vê o timer de descanso', async () => {
    await page.getByRole('button', { name: /Treino 1/ }).click()
    await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()

    const cartaoExercicio1 = page.locator('.rounded-xl.border').filter({ hasText: 'Agachamento Livre Halter' })
    const kgInputs = cartaoExercicio1.locator('input[type="number"]')
    // Duas colunas por série (kg, reps): a de kg é a de índice par (0, 2, 4...).
    await kgInputs.nth(0).fill('40')
    await kgInputs.nth(0).blur()

    // Gravar carga não liga o cronômetro sozinho.
    await expect(page.getByText('Pular')).toBeHidden()
    await expect(cartaoExercicio1.getByRole('button', { name: /▶ 60 s/ })).toBeVisible()

    // ▶ liga o descanso; pausa e reinicia.
    await cartaoExercicio1.getByRole('button', { name: /▶ 60 s/ }).click()
    await expect(page.getByText('Pular')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/^\d:\d\d$/)).toBeVisible()
    await expect(cartaoExercicio1.getByRole('button', { name: /⏸/ })).toBeVisible()
    await page.screenshot({ path: 'test-results/prints/11-aluno-treino.png' })
    await page.screenshot({ path: 'test-results/prints/50-treino-animado.png' })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.screenshot({ path: 'test-results/prints/70-treino.png' })
    await cartaoExercicio1.getByRole('button', { name: /⏸/ }).click()
    await expect(cartaoExercicio1.getByRole('button', { name: /▶ \d:\d\d/ })).toBeVisible()
    await cartaoExercicio1.getByRole('button', { name: 'Reiniciar' }).click()
    await expect(cartaoExercicio1.getByRole('button', { name: /⏸/ })).toBeVisible()
    await page.getByRole('button', { name: 'Pular' }).click()

    // Reps feitas da série 1 (segundo input do par).
    await kgInputs.nth(1).fill('6')
    await kgInputs.nth(1).blur()
  })

  await test.step('offline: grava a série 2 e mostra o aviso de pendente', async () => {
    await context.setOffline(true)

    const cartaoExercicio1 = page.locator('.rounded-xl.border').filter({ hasText: 'Agachamento Livre Halter' })
    const kgInputs = cartaoExercicio1.locator('input[type="number"]')
    // Série 2: par de inputs seguinte (kg = índice 2).
    await kgInputs.nth(2).fill('42')
    await kgInputs.nth(2).blur()

    await expect(page.getByText('salvo no celular')).toBeVisible()
  })

  await test.step('volta a internet: sincroniza e confirma no servidor', async () => {
    await context.setOffline(false)
    await expect(page.getByText('salvo no celular')).toBeHidden({ timeout: 15_000 })

    const regId = `${mesoId}_s01_t1`
    await expect
      .poll(
        async () => {
          const doc = await lerDoc(`registros/${regId}`)
          const fields = (doc?.fields ?? {}) as Record<string, any>
          const cargas = fields.cargas?.mapValue?.fields?.a?.mapValue?.fields ?? {}
          const reps = fields.reps?.mapValue?.fields?.a?.mapValue?.fields ?? {}
          return {
            s1: cargas.s1 ? Number(cargas.s1.integerValue ?? cargas.s1.doubleValue) : null,
            s2: cargas.s2 ? Number(cargas.s2.integerValue ?? cargas.s2.doubleValue) : null,
            reps1: reps.s1 ? Number(reps.s1.integerValue ?? reps.s1.doubleValue) : null,
          }
        },
        { timeout: 15_000 },
      )
      .toEqual({ s1: 40, s2: 42, reps1: 6 })

    // 1ª ação do treino gravou inicioEm (e só uma vez: o valor não some nas gravações seguintes).
    const reg = ((await lerDoc(`registros/${regId}`))?.fields ?? {}) as Record<string, any>
    expect(reg.inicioEm?.timestampValue).toBeTruthy()
  })

  await test.step('anotação do exercício sobrevive ao recarregar', async () => {
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Agachamento Livre Halter' })
    await cartao.getByRole('button', { name: /Anotação/ }).click()
    await cartao.getByRole('textbox').fill('banco na posição 3')
    await cartao.getByRole('button', { name: 'Salvar' }).click()
    // Só recarrega depois que a nota chegou ao servidor: recarregar no meio da gravação perde a nota (corrida do teste, lenta no CI).
    await expect
      .poll(async () => JSON.stringify(await lerDoc(`notas/${alunoId}`)), { timeout: 15_000 })
      .toContain('banco na posição 3')
    await page.reload()
    await expect(page.getByText('banco na posição 3')).toBeVisible()
    await cartao.scrollIntoViewIfNeeded()
    await page.screenshot({ path: 'test-results/prints/40-anotacao.png' })
  })

  await test.step('conclui o treino e vê o ✓ na tela Hoje', async () => {
    await page.getByRole('button', { name: 'Concluir treino' }).click()
    await expect(page.getByRole('heading', { name: /Treino concluído/ })).toBeVisible()
    await expect(page.getByText('Semana 1: 1 de')).toBeVisible()
    await expect(page.getByText('Volume', { exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Voltar para Hoje' }).click()
    await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
    await expect(page.getByText('Mesociclo E2E')).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 1.*Feito/ })).toBeVisible()
  })

  await test.step('destaca o próximo treino da semana', async () => {
    await expect(page.getByRole('button', { name: /Treino 2.*Hoje/ })).toBeVisible()
  })

  await test.step('PC: liga com peso, digita o extra e grava o total', async () => {
    await page.getByRole('button', { name: /Treino 2/ }).click()
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Remada Curvada Barra' })
    page.once('dialog', (d) => d.accept('80'))
    await cartao.getByRole('checkbox', { name: /Feito com o peso do corpo/ }).check()
    await expect(cartao.getByText('Peso do corpo contado: 80 kg (100% de 80 kg)')).toBeVisible()

    const kg = cartao.locator('input[type="number"]').first()
    await kg.fill('10')
    await kg.blur()

    const regId = `${mesoId}_s01_t2`
    await expect
      .poll(async () => {
        const f = ((await lerDoc(`registros/${regId}`))?.fields ?? {}) as Record<string, any>
        const v = f.cargas?.mapValue?.fields?.b?.mapValue?.fields?.s1
        return v ? Number(v.integerValue ?? v.doubleValue) : null
      }, { timeout: 15_000 })
      .toBe(90)
  })
})

test('/instalar mostra o passo certo por sistema', async ({ browser }) => {
  await test.step('Android: instruções com WhatsApp', async () => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent:
        'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    })
    const page = await context.newPage()
    await page.goto('/instalar')
    // Marca sem APK (Gislane): só o caminho pelo Chrome.
    const { apk } = JSON.parse(readFileSync(`marcas/${process.env.MARCA ?? 'vfit'}/marca.json`, 'utf8'))
    if (apk) {
      await expect(page.getByText(apk)).toBeVisible()
      await expect(page.getByText(/WhatsApp ou Arquivos/)).toBeVisible()
    } else await expect(page.getByText('Instale pelo Chrome')).toBeVisible()
    const apkLink = page.locator('a[href="/forca.apk"]')
    await expect(apkLink).toHaveCount(0)
    await page.screenshot({ path: 'test-results/prints/12-instalar-android.png' })
    await context.close()
  })

  await test.step('iPhone: passo Adicionar à Tela de Início', async () => {
    const context = await browser.newContext({
      ...devices['iPhone 13'],
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    })
    const page = await context.newPage()
    await page.goto('/instalar')
    await expect(page.getByText('Adicionar à Tela de Início')).toBeVisible()
    await page.screenshot({ path: 'test-results/prints/13-instalar-iphone.png' })
    await context.close()
  })
})

test('biset entre posições não vizinhas aparece junto', async ({ page }) => {
  const prog = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  const linha = (exercicio: number) => ({ ativo: true, semana: 1, treino: 1, exercicio, metodo: 'Biset', escopo: 'Todas as séries', grupo: 1 })
  const b = { email: 'bia.biset-e2e@teste.com', senha: 'senha123' }
  const biaId = await criarAluno('Bia Biset', b.email, b.senha)
  await criarMeso({
    alunoId: biaId,
    nome: 'Meso Biset',
    frequencia: 1,
    semanas: 4,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }, { slotId: 'b', nome: 'Supino Reto Barra' }, { slotId: 'c', nome: 'Remada Curvada Barra' }] },
    progressao: { principais: prog, auxiliares: prog },
    metodos: [linha(1), linha(3)],
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByLabel('E-mail').fill(b.email)
  await page.getByLabel('Senha').fill(b.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
  await page.getByRole('button', { name: /Treino 1/ }).click()
  await expect(page.getByRole('dialog', { name: 'Métodos deste treino' })).toBeVisible()
  await page.getByRole('dialog').getByRole('button', { name: 'Entendi', exact: true }).click()
  await expect(page.getByText('A1', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('A2', { exact: true }).first()).toBeVisible()
  const nomes = await page.locator('.rounded-xl.border .min-w-0 > .font-semibold').allTextContents()
  expect(nomes.slice(0, 3)).toEqual(['Agachamento Livre Halter', 'Remada Curvada Barra', 'Supino Reto Barra'])
  await page.screenshot({ path: 'test-results/prints/81-biset-aluno.png' })
})

test('selos de método, nota, guia e cronômetro que sobrevive ao reload', async ({ page }) => {
  const prog = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  const u = { email: 'caio.selo-e2e@teste.com', senha: 'senha123' }
  const id = await criarAluno('Caio Selo', u.email, u.senha)
  await criarMeso({
    alunoId: id,
    nome: 'Meso Selo',
    frequencia: 1,
    semanas: 4,
    inicio: hojeSaoPaulo(),
    pausaS: 90,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }, { slotId: 'b', nome: 'Supino Reto Barra' }] },
    progressao: { principais: prog, auxiliares: prog },
    metodos: [{ ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Últimas 2 séries', etapas: 1 }],
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByLabel('E-mail').fill(u.email)
  await page.getByLabel('Senha').fill(u.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
  await page.getByRole('button', { name: /Treino 1/ }).click()

  const nota = page.getByRole('dialog', { name: 'Métodos deste treino' })
  await expect(nota).toBeVisible()
  await expect(nota.getByText('Toque no selo colorido do exercício para ver esta explicação de novo.')).toBeVisible()
  await page.screenshot({ path: 'test-results/prints/91-nota.png' })
  await nota.getByRole('button', { name: 'Não mostrar de novo' }).click()
  await expect(nota).toBeHidden()

  const selo = page.getByRole('button', { name: /Dropset \[últimas 2\]/ })
  await expect(selo).toBeVisible()
  await page.screenshot({ path: 'test-results/prints/90-selos.png' })
  await selo.click()
  await expect(page.getByRole('dialog', { name: 'Como fazer Dropset' })).toBeVisible()
  await page.getByRole('button', { name: 'Fechar' }).click()

  await page.reload()
  await expect(selo).toBeVisible()
  await expect(nota).toBeHidden()

  await page.getByRole('button', { name: /▶ 90 s/ }).first().click()
  await page.reload()
  const tempo = page.locator('.font-display.tabular-nums')
  await expect(tempo).toBeVisible()
  const [mm, ss] = (await tempo.innerText()).split(':').map(Number)
  expect(mm * 60 + ss).toBeLessThanOrEqual(90)

  await page.goto('/#/metodos')
  for (const nome of ['Dropset', 'Biset', 'Triset', 'Superset', 'Circuito', 'Rest-pause', 'Clusterset'])
    await expect(page.getByText(nome, { exact: true }).first()).toBeVisible()
  await page.screenshot({ path: 'test-results/prints/92-guia.png' })
})
