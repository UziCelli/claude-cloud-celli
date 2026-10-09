import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

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
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
  await page.getByRole('button', { name: /Treino 1/ }).click()

  await test.step('(a) digita o extra e depois marca "Feito com o peso do corpo"', async () => {
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Desenvolvimento Militar Barra' })
    const kg = cartao.locator('input[type="number"]').first()
    await kg.fill('20')
    await kg.blur()
    await expect.poll(() => cargaDe('a', 's1'), { timeout: 15_000 }).toBe(20)
    await cartao.getByRole('checkbox', { name: /Feito com o peso do corpo/ }).check()
    await expect(cartao.getByText('Peso do corpo contado: 80 kg')).toBeVisible()
    await expect(kg).toHaveValue('20')
    await expect.poll(() => cargaDe('a', 's1'), { timeout: 15_000 }).toBe(100)
    // desmarcar volta ao extra
    await cartao.getByRole('checkbox', { name: /Feito com o peso do corpo/ }).uncheck()
    await expect(kg).toHaveValue('20')
    await expect.poll(() => cargaDe('a', 's1'), { timeout: 15_000 }).toBe(20)
  })

  await test.step('(b) concluir grava o corpo nas séries em branco do exercício automático', async () => {
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Barra Fixa Aberta' })
    await expect(cartao.getByText('Séries em branco contam só o peso do corpo ao concluir.')).toBeVisible()
    await page.getByRole('button', { name: 'Concluir treino' }).click()
    await expect(page.getByRole('heading', { name: /Treino concluído/ })).toBeVisible()
    await page.getByRole('button', { name: 'Voltar para Hoje' }).click()
    await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
    await expect(page.getByRole('button', { name: /Treino 1.*Feito/ })).toBeVisible()
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

// Registro no FORMATO ANTIGO (versões sem `rebasear`/`preencherCorpo`): a leitura normaliza (normalizarCargas).
async function semearFormatoAntigo(realizado: boolean) {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  const w = { w1: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso formato antigo',
    frequencia: 1,
    semanas: 1,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  // Só o extra (2) na S1 (pc marcado depois de digitar); S2 e S3 em branco; pc 80.
  const regId = await criarRegistro(mesoId, alunoId, 1, 1, { cargas: { a: { s1: 2 } }, pc: { a: 80 }, realizado })
  return { mesoId, regId }
}

const entrar = async (page: import('@playwright/test').Page, email: string, senha: string, esperar: string | RegExp) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  if (esperar instanceof RegExp) await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click() // aluno: abre a aba Treino
  await expect(page.getByRole('heading', { name: esperar }).or(page.getByRole('button', { name: esperar }))).toBeVisible()
}

test('formato antigo concluído: coach soma o corpo (80 + extra) e o aluno vê "2" e o resto como corpo', async ({ page, browser }) => {
  const { mesoId, regId } = await semearFormatoAntigo(true)

  await test.step('coach: volume e carga média com o corpo; digitar grava o TOTAL', async () => {
    const ctx = await browser.newContext()
    const pc = await ctx.newPage()
    await entrar(pc, COACH.email, COACH.senha, 'Início')
    await pc.goto(`/#/meso/${mesoId}/semana/1`)
    const linha = pc.locator('tr').filter({ hasText: 'Desenvolvimento Militar Barra' }).first()
    await expect(linha.getByText('Inclui peso do corpo: 80 kg')).toBeVisible()
    await expect(linha).toContainText('1.936') // 8 × (82 + 80 + 80)
    await expect(linha).toContainText('80,7') // (82 + 80 + 80) / 3
    const campos = linha.locator('input[type="number"]')
    await expect(campos.nth(0)).toHaveValue('2')
    await expect(campos.nth(1)).toHaveValue('0')
    // o coach digita o extra (5); grava extra + corpo, como a tela do aluno
    await campos.nth(1).fill('5')
    await campos.nth(1).blur()
    await expect
      .poll(async () => num((((await lerDoc(`registros/${regId}`))?.fields ?? {}) as any).cargas?.mapValue?.fields?.a?.mapValue?.fields?.s2), { timeout: 15_000 })
      .toBe(85)
    await expect(linha).toContainText('1.976') // 8 × (82 + 85 + 80)
    await ctx.close()
  })

  await test.step('aluno: célula antiga mostra o extra (2), as outras só o corpo (extra 0)', async () => {
    await entrar(page, ALUNO.email, ALUNO.senha, /Treino 1/)
    await page.getByRole('button', { name: /Treino 1/ }).click()
    const cartao = page.locator('.rounded-xl.border').filter({ hasText: 'Desenvolvimento Militar Barra' })
    await expect(cartao.getByText('Peso do corpo contado: 80 kg')).toBeVisible()
    const kg = cartao.locator('input[type="number"]')
    await expect(kg.nth(0)).toHaveValue('2')
    await expect(kg.nth(2)).toHaveValue('5')
    await expect(kg.nth(4)).toHaveValue('0')
    // desmarcar grava o extra de volta (2), sem perder nada
    await cartao.getByRole('checkbox', { name: /Feito com o peso do corpo/ }).uncheck()
    await expect
      .poll(async () => num((((await lerDoc(`registros/${regId}`))?.fields ?? {}) as any).cargas?.mapValue?.fields?.a?.mapValue?.fields?.s1), { timeout: 15_000 })
      .toBe(2)
  })
})

test('formato antigo NÃO concluído: série em branco e sem reps não conta o corpo', async ({ browser }) => {
  const { mesoId } = await semearFormatoAntigo(false)
  const ctx = await browser.newContext()
  const pc = await ctx.newPage()
  await entrar(pc, COACH.email, COACH.senha, 'Início')
  await pc.goto(`/#/meso/${mesoId}/semana/1`)
  const linha = pc.locator('tr').filter({ hasText: 'Desenvolvimento Militar Barra' }).first()
  await expect(linha.getByText('Inclui peso do corpo: 80 kg')).toBeVisible()
  await expect(linha).toContainText('656') // só a S1: 8 × 82
  await expect(linha).not.toContainText('1.936')
  const campos = linha.locator('input[type="number"]')
  await expect(campos.nth(0)).toHaveValue('2')
  await expect(campos.nth(1)).toHaveValue('')
  await ctx.close()
})
