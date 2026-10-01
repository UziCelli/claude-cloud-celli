import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.pc-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Aluna', email: 'bia.pc-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'] })

const num = (v: any) => (v ? Number(v.integerValue ?? v.doubleValue) : null)

test('peso do corpo: marcar depois de digitar mantém o extra; concluir preenche séries em branco', async ({ page, browser }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso PC',
    frequencia: 2,
    semanas: 2,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }, { slotId: 'b', nome: 'Barra Fixa Aberta' }], t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  const regId = `${mesoId}_s01_t1`
  const campos = async () => ((await lerDoc(`registros/${regId}`))?.fields ?? {}) as Record<string, any>
  const cargaDe = async (slot: string, s: string) => num((await campos()).cargas?.mapValue?.fields?.[slot]?.mapValue?.fields?.[s])

  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.getByRole('button', { name: /Treino 1/ }).click()

  await test.step('(a) digita o extra e depois marca "Somar meu peso corporal"', async () => {
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Desenvolvimento Militar Barra' })
    const kg = cartao.locator('input[type="number"]').first()
    await kg.fill('20')
    await kg.blur()
    await expect.poll(() => cargaDe('a', 's1'), { timeout: 15_000 }).toBe(20)
    await cartao.getByRole('checkbox', { name: /Somar meu peso corporal/ }).check()
    await expect(cartao.getByText('Peso do corpo contado: 80 kg')).toBeVisible()
    await expect(kg).toHaveValue('20')
    await expect.poll(() => cargaDe('a', 's1'), { timeout: 15_000 }).toBe(100)
    // desmarcar volta ao extra
    await cartao.getByRole('checkbox', { name: /Somar meu peso corporal/ }).uncheck()
    await expect(kg).toHaveValue('20')
    await expect.poll(() => cargaDe('a', 's1'), { timeout: 15_000 }).toBe(20)
  })

  await test.step('(b) concluir grava o corpo nas séries em branco do exercício automático', async () => {
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Barra Fixa Aberta' })
    await expect(cartao.getByText('Séries em branco contam só o peso do corpo ao concluir.')).toBeVisible()
    await page.getByRole('button', { name: 'Concluir treino' }).click()
    await expect(page.getByRole('button', { name: /Treino 1.*✓/ })).toBeVisible()
    for (const s of ['s1', 's2', 's3']) await expect.poll(() => cargaDe('b', s), { timeout: 15_000 }).toBe(76)
    expect(num((await campos()).pc?.mapValue?.fields?.b)).toBe(76)
    expect(await cargaDe('b', 's4')).toBeNull()
    expect(await cargaDe('a', 's2')).toBeNull() // exercício sem corpo continua em branco
  })

  await test.step('coach vê "Inclui peso do corpo"', async () => {
    const ctx = await browser.newContext()
    const pc = await ctx.newPage()
    await pc.goto('/')
    await pc.getByLabel('E-mail').fill(COACH.email)
    await pc.getByLabel('Senha').fill(COACH.senha)
    await pc.getByRole('button', { name: 'Entrar', exact: true }).click()
    await expect(pc.getByRole('heading', { name: 'Início' })).toBeVisible()
    await pc.goto(`/#/meso/${mesoId}/semana/1`)
    await expect(pc.getByText('Inclui peso do corpo: 76 kg')).toBeVisible()
    await ctx.close()
  })
})
