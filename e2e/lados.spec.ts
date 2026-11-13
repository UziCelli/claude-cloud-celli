import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.lados-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Aluna', email: 'bia.lados-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'] })

const num = (v: any) => (v ? Number(v.integerValue ?? v.doubleValue) : null)

test('2 lados: aluno anota 6 por lado, grava total 12 + esquerdo 6; coach vê volume com 12; célula antiga fica intacta', async ({ page, browser }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  const w = { w1: [8, 8, 8], w2: [8, 8, 8] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso lados',
    frequencia: 1,
    semanas: 2,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Rosca Direta Halter' }, { slotId: 'b', nome: 'Rosca Martelo Halter' }] },
    progressao: { principais: w, auxiliares: w },
  })
  // Rosca Martelo: célula no formato ANTIGO (número inteiro, sem lados).
  const regId = await criarRegistro(mesoId, alunoId, 1, 1, { cargas: { b: { s1: 12 } } })
  const mapa = async (nome: string, slot: string, s: string) =>
    num((((await lerDoc(`registros/${regId}`))?.fields ?? {}) as any)[nome]?.mapValue?.fields?.[slot]?.mapValue?.fields?.[s])

  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
  await page.getByRole('button', { name: /Treino 1/ }).click()
  await page.getByRole('button', { name: 'Iniciar treino' }).click()

  const rosca = page.locator('.rounded-xl.border').filter({ hasText: 'Rosca Direta Halter' })
  const martelo = page.locator('.rounded-xl.border').filter({ hasText: 'Rosca Martelo Halter' })

  await test.step('6 por lado grava total 12 e esquerdo 6 juntos', async () => {
    await expect(rosca.getByText(/kg de cada lado/)).toBeVisible()
    const kg = rosca.locator('input[inputmode="decimal"]').first()
    await kg.fill('6')
    await kg.blur()
    await expect.poll(() => mapa('cargas', 'a', 's1'), { timeout: 15_000 }).toBe(12)
    expect(await mapa('lados', 'a', 's1')).toBe(6)
  })

  await test.step('lados diferentes: E 6 | D 8 grava total 14', async () => {
    await rosca.getByRole('button', { name: 'lados diferentes' }).click()
    const campos = rosca.locator('input[inputmode="decimal"]')
    await campos.nth(1).fill('8')
    await campos.nth(1).blur()
    await expect.poll(() => mapa('cargas', 'a', 's1'), { timeout: 15_000 }).toBe(14)
    expect(await mapa('lados', 'a', 's1')).toBe(6)
    await campos.nth(1).fill('6') // volta a 6 | 6: total 12
    await campos.nth(1).blur()
    await expect.poll(() => mapa('cargas', 'a', 's1'), { timeout: 15_000 }).toBe(12)
  })

  await test.step('célula antiga: aparece "anotado antes" e não é reescrita', async () => {
    await expect(martelo.getByText('anotado antes: 12 kg')).toBeVisible()
    const kg = martelo.locator('input[inputmode="decimal"]').first()
    await kg.focus()
    await kg.blur() // campo vazio sobre célula antiga: não apaga
    await page.waitForTimeout(1500)
    expect(await mapa('cargas', 'b', 's1')).toBe(12)
    expect(await mapa('lados', 'b', 's1')).toBeNull()
  })

  await test.step('coach vê volume calculado com 12 (8 × 12 = 96)', async () => {
    const ctx = await browser.newContext()
    const pc = await ctx.newPage()
    await pc.goto('/')
    await pc.getByLabel('E-mail').fill(COACH.email)
    await pc.getByLabel('Senha').fill(COACH.senha)
    await pc.getByRole('button', { name: 'Entrar', exact: true }).click()
    await expect(pc.getByRole('heading', { name: 'Início' })).toBeVisible()
    await pc.goto(`/#/meso/${mesoId}/semana/1`)
    const linha = pc.locator('tr').filter({ hasText: 'Rosca Direta Halter' }).first()
    await expect(linha.locator('input[inputmode="decimal"]').first()).toHaveValue('6')
    await expect(linha.locator('td').last()).toHaveText('96')
    const antiga = pc.locator('tr').filter({ hasText: 'Rosca Martelo Halter' }).first()
    await expect(antiga.getByText('anotado antes: 12 kg')).toBeVisible()
    await ctx.close()
  })
})
