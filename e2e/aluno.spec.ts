import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.aluno-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Ana Aluna', email: 'ana.aluno-e2e@teste.com', senha: 'senha123' }

test.describe.configure({ mode: 'serial' })
test.use({ ...devices['Pixel 7'] })

let mesoId: string

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)

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

    await expect(page.getByText('Mesociclo E2E')).toBeVisible()
    await expect(page.getByText('Semana 1 de 4')).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 1/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 2/ })).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 3/ })).toBeVisible()

    await page.screenshot({ path: 'test-results/prints/10-aluno-hoje.png' })
  })

  await test.step('registra carga e vê o timer de descanso', async () => {
    await page.getByRole('button', { name: /Treino 1/ }).click()
    await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()

    const cartaoExercicio1 = page.locator('.rounded-xl.border').filter({ hasText: 'Agachamento Livre Halter' })
    const kgInputs = cartaoExercicio1.locator('input[type="number"]')
    // Duas colunas por série (kg, reps): a de kg é a de índice par (0, 2, 4...).
    await kgInputs.nth(0).fill('40')
    await kgInputs.nth(0).blur()

    await expect(page.getByText('Pular')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/^\d:\d\d$/)).toBeVisible()
    await page.screenshot({ path: 'test-results/prints/11-aluno-treino.png' })
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
  })

  await test.step('anotação do exercício sobrevive ao recarregar', async () => {
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Agachamento Livre Halter' })
    await cartao.getByRole('button', { name: /Anotação/ }).click()
    await cartao.getByRole('textbox').fill('banco na posição 3')
    await cartao.getByRole('button', { name: 'Salvar' }).click()
    await page.reload()
    await expect(page.getByText('banco na posição 3')).toBeVisible()
    await cartao.scrollIntoViewIfNeeded()
    await page.screenshot({ path: 'test-results/prints/40-anotacao.png' })
  })

  await test.step('conclui o treino e vê o ✓ na tela Hoje', async () => {
    await page.getByRole('button', { name: 'Concluir treino' }).click()
    await expect(page.getByText('Mesociclo E2E')).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 1.*✓/ })).toBeVisible()
  })

  await test.step('destaca o próximo treino da semana', async () => {
    await expect(page.getByText('▶ Faça hoje: Treino 2')).toBeVisible()
  })

  await test.step('PC: liga com peso, digita o extra e grava o total', async () => {
    await page.getByRole('button', { name: /Treino 2/ }).click()
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Remada Curvada Barra' })
    page.once('dialog', (d) => d.accept('80'))
    await cartao.getByRole('checkbox').check()
    await expect(cartao.getByText('PC: 80 kg (100% de 80 kg)')).toBeVisible()

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
    await expect(page.getByText('forca.apk')).toBeVisible()
    await expect(page.getByText(/WhatsApp ou Arquivos/)).toBeVisible()
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
