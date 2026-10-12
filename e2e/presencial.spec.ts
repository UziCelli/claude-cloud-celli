import { expect, test, devices, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.pres-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Presencial', email: 'bia.pres-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'], viewport: { width: 390, height: 844 } })

const num = (v: any) => (v ? Number(v.integerValue ?? v.doubleValue) : null)

async function semear(presencial: boolean) {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  if (presencial) {
    // Marca o perfil como presencial direto no emulador (sem editar o seed).
    const r = await fetch(`http://127.0.0.1:8080/v1/projects/demo-forca/databases/(default)/documents/usuarios/${alunoId}?updateMask.fieldPaths=presencial`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
      body: JSON.stringify({ fields: { presencial: { booleanValue: true } } }),
    })
    expect(r.ok).toBe(true)
  }
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId,
    nome: 'Meso Presencial',
    frequencia: 2,
    semanas: 2,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }, { slotId: 'b', nome: 'Barra Fixa Aberta' }], t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  return { alunoId, mesoId }
}

async function entrar(page: Page, email: string, senha: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

for (const presencial of [false, true]) {
  test(`treino presencial grava no registro do aluno${presencial ? ' (aluno presencial)' : ''}`, async ({ page, browser }) => {
    const { alunoId, mesoId } = await semear(presencial)
    const regId = `${mesoId}_s01_t1`
    const campos = async () => ((await lerDoc(`registros/${regId}`))?.fields ?? {}) as Record<string, any>

    await entrar(page, COACH.email, COACH.senha)
    await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
    await page.goto(`/#/aluno/${alunoId}`)
    await page.getByRole('button', { name: 'Treino presencial' }).click()
    await expect(page.getByRole('region', { name: 'Presencial' }).getByText(ALUNO.nome)).toBeVisible()
    await page.screenshot({ path: '/tmp/claude-0/-home-user-claude-cloud-celli/7bb1957b-62c0-5c39-98cc-434448e8e65a/scratchpad/presencial-hoje.png' })

    await page.getByRole('button', { name: /Treino 1/ }).click()
    await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Presencial' }).getByText(ALUNO.nome)).toBeVisible()

    const tela = page.getByRole('region', { name: `Treino de ${ALUNO.nome}` })
    await tela.getByRole('button', { name: 'Iniciar treino' }).click()
    const militar = tela.locator('.rounded-xl.border').filter({ hasText: 'Desenvolvimento Militar Barra' })
    const [kg, reps] = [militar.locator('input[type="number"]').nth(0), militar.locator('input[type="number"]').nth(1)]
    await kg.fill('30')
    await kg.blur()
    await reps.fill('7')
    await reps.blur()
    await page.screenshot({ path: '/tmp/claude-0/-home-user-claude-cloud-celli/7bb1957b-62c0-5c39-98cc-434448e8e65a/scratchpad/presencial-treino.png' })
    const fixa = tela.locator('.rounded-xl.border').filter({ hasText: 'Barra Fixa Aberta' })
    await fixa.getByRole('checkbox', { name: /Feito com o peso do corpo/ }).check()

    await page.getByRole('button', { name: 'Concluir treino' }).click()
    await expect(page.getByRole('heading', { name: /Treino concluído/ })).toBeVisible()
    await page.getByRole('button', { name: 'Voltar para Hoje' }).click()
    await expect(page.getByRole('button', { name: /Treino 1.*Feito/ })).toBeVisible() // voltou ao Hoje presencial
    await expect(page.getByRole('region', { name: 'Presencial' }).getByText(ALUNO.nome)).toBeVisible()
    await expect(page.getByRole('button', { name: /Treino 2.*Próximo ·/ })).toBeVisible() // não é "Hoje" no presencial
    await expect(page.getByText('Hoje', { exact: true })).toHaveCount(0)

    await expect.poll(async () => {
      const c = await campos()
      return [c.alunoId?.stringValue, num(c.cargas?.mapValue?.fields?.a?.mapValue?.fields?.s1), num(c.reps?.mapValue?.fields?.a?.mapValue?.fields?.s1), c.realizado?.booleanValue]
    }, { timeout: 15_000 }).toEqual([alunoId, 30, 7, true])

    if (!presencial) {
      const ctx = await browser.newContext(devices['Pixel 7'])
      const p2 = await ctx.newPage()
      await entrar(p2, ALUNO.email, ALUNO.senha)
      await p2.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
      await expect(p2.getByRole('button', { name: /Treino 1.*Feito/ })).toBeVisible()
      await ctx.close()
    }
  })
}

test('coach sem Iniciar: carga fica salva, treino não conta como feito', async ({ page }) => {
  const { alunoId, mesoId } = await semear(false)
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}/presencial/treino/${mesoId}/1/1`)
  const tela = page.getByRole('region', { name: `Treino de ${ALUNO.nome}` })
  const kg = tela.locator('.rounded-xl.border').filter({ hasText: 'Desenvolvimento Militar Barra' }).locator('input[type="number"]').first()
  await expect(kg).toBeEnabled()
  await kg.fill('25')
  await kg.blur()
  await expect.poll(async () => {
    const c = ((await lerDoc(`registros/${mesoId}_s01_t1`))?.fields ?? {}) as Record<string, any>
    return [num(c.cargas?.mapValue?.fields?.a?.mapValue?.fields?.s1), c.realizado?.booleanValue ?? null]
  }, { timeout: 15_000 }).toEqual([25, null])
})

test('grupo: troca de aluno mantém treino e carga do outro', async ({ page }) => {
  const { alunoId, mesoId } = await semear(false)
  const bId = await criarAluno('Caio Grupo', 'caio.pres-e2e@teste.com', 'senha123', 70)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  await criarMeso({
    alunoId: bId, nome: 'Meso Caio', frequencia: 2, semanas: 2, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Supino Reto Barra' }], t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}/presencial`)
  const bar = page.getByRole('region', { name: 'Presencial' })
  await expect(bar.getByText(ALUNO.nome)).toBeVisible()

  await bar.getByRole('button', { name: 'Adicionar aluno' }).click()
  await page.getByRole('dialog').getByRole('button', { name: /Caio Grupo/ }).click()
  await expect(bar.getByText('Caio Grupo')).toBeVisible()
  const b = page.getByRole('region', { name: 'Treino de Caio Grupo' })
  await b.getByRole('button', { name: /Treino 1/ }).click()
  await b.getByRole('button', { name: 'Iniciar treino' }).click()
  const kgB = b.locator('input[type="number"]').first()
  await kgB.fill('40')
  await kgB.blur()

  await page.getByRole('button', { name: 'Ir para Bia' }).click()
  await expect(bar.getByText(ALUNO.nome)).toBeVisible()
  const a = page.getByRole('region', { name: `Treino de ${ALUNO.nome}` })
  await a.getByRole('button', { name: /Treino 1/ }).click()
  await a.getByRole('button', { name: 'Iniciar treino' }).click()

  await page.getByRole('button', { name: 'Ir para Caio' }).click()
  await expect(bar.getByText('Caio Grupo')).toBeVisible()
  await expect(b.locator('input[type="number"]').first()).toHaveValue('40')
  await expect(b.getByText('Treino em andamento')).toBeVisible()
})
