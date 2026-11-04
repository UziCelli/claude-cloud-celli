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
    const [kg, reps] = [militar.locator('input[inputmode="decimal"]').nth(0), militar.locator('input[inputmode="decimal"]').nth(1)]
    await kg.fill('30')
    await kg.blur()
    await reps.fill('7')
    await reps.blur()
    await page.screenshot({ path: '/tmp/claude-0/-home-user-claude-cloud-celli/7bb1957b-62c0-5c39-98cc-434448e8e65a/scratchpad/presencial-treino.png' })
    const fixa = tela.locator('.rounded-xl.border').filter({ hasText: 'Barra Fixa Aberta' })
    await fixa.getByRole('checkbox', { name: /Feito com o peso do corpo/ }).check()

    await page.getByRole('button', { name: 'Concluir treino' }).click()
    await page.getByRole('button', { name: 'Sim, concluir' }).click()
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
  const kg = tela.locator('.rounded-xl.border').filter({ hasText: 'Desenvolvimento Militar Barra' }).locator('input[inputmode="decimal"]').first()
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
  const kgB = b.locator('input[inputmode="decimal"]').first()
  await kgB.fill('40')
  await kgB.blur()

  const seletor = page.getByRole('navigation', { name: 'Alunos do grupo' })
  await seletor.getByRole('button', { name: 'Bia' }).click()
  await expect(bar.getByText(ALUNO.nome)).toBeVisible()
  await expect(seletor.getByRole('button', { name: 'Bia' })).toHaveAttribute('aria-current', 'true')
  const a = page.getByRole('region', { name: `Treino de ${ALUNO.nome}` })
  await a.getByRole('button', { name: /Treino 1/ }).click()
  await a.getByRole('button', { name: 'Iniciar treino' }).click()

  await seletor.getByRole('button', { name: 'Caio' }).click()
  await expect(bar.getByText('Caio Grupo')).toBeVisible()
  await expect(seletor.getByRole('button', { name: 'Caio' })).toHaveAttribute('aria-current', 'true')
  await expect(b.locator('input[inputmode="decimal"]').first()).toHaveValue('40')
  await expect(b.getByText('Treino em andamento')).toBeVisible()
})

test('grupo de 3: Sair no primeiro mantém os outros dois', async ({ page }) => {
  const { alunoId } = await semear(false)
  await criarAluno('Caio Grupo', 'caio.pres-e2e@teste.com', 'senha123', 70)
  await criarAluno('Dani Grupo', 'dani.pres-e2e@teste.com', 'senha123', 60)
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}/presencial`)
  const bar = page.getByRole('region', { name: 'Presencial' })
  await expect(bar.getByText(ALUNO.nome)).toBeVisible()
  for (const nome of ['Caio Grupo', 'Dani Grupo']) {
    await bar.getByRole('button', { name: 'Adicionar aluno' }).click()
    await page.getByRole('dialog').getByRole('button', { name: new RegExp(nome) }).click()
    await expect(bar.getByText(nome)).toBeVisible()
  }
  const seletor = page.getByRole('navigation', { name: 'Alunos do grupo' })
  await seletor.getByRole('button', { name: 'Bia' }).click()
  await expect(seletor.getByRole('button', { name: 'Bia' })).toHaveAttribute('aria-current', 'true')

  await bar.getByRole('button', { name: 'Sair' }).click()
  await expect(seletor.getByRole('button', { name: 'Bia' })).toHaveCount(0)
  await expect(seletor.getByRole('button', { name: 'Caio' })).toBeVisible()
  await expect(seletor.getByRole('button', { name: 'Dani' })).toBeVisible()
})

test('coach edita o treino do dia: troca, método, adiciona, tira e volta ao planejado', async ({ page }) => {
  const { alunoId, mesoId } = await semear(false)
  await entrar(page, COACH.email, COACH.senha)
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()
  await page.goto(`/#/aluno/${alunoId}/presencial/treino/${mesoId}/1/1`)
  const tela = page.getByRole('region', { name: `Treino de ${ALUNO.nome}` })
  const cartao = (nome: string) => tela.locator('.rounded-xl.border').filter({ hasText: nome })
  const dialogo = page.getByRole('dialog')
  const confirmar = async (nome: string) => {
    const campo = dialogo.getByRole('combobox')
    await campo.fill(nome)
    await campo.press('Enter')
  }
  page.on('dialog', (d) => d.accept())

  await tela.getByRole('button', { name: 'Editar Desenvolvimento Militar Barra', exact: true }).click()
  await confirmar('Supino Reto Barra')
  await expect(cartao('Supino Reto Barra')).toBeVisible()
  await expect(tela.getByText('Treino ajustado só hoje')).toBeVisible()

  await tela.getByRole('button', { name: 'Editar Barra Fixa Aberta', exact: true }).click()
  await dialogo.getByRole('button', { name: 'Adicionar Dropset' }).click()
  await expect(dialogo.getByRole('button', { name: 'Tirar Dropset' })).toBeVisible()
  await dialogo.getByRole('button', { name: 'Séries do Dropset' }).click()
  await dialogo.getByRole('button', { name: 'S1', exact: true }).click()
  await expect.poll(async () => {
    const d = ((await lerDoc(`mesos/${mesoId}`))?.fields ?? {}) as Record<string, any>
    const ms = (d.sessoes?.mapValue?.fields?.['1-1']?.mapValue?.fields?.metodos?.arrayValue?.values ?? []) as any[]
    const f = ms.map((m) => m.mapValue.fields).find((x) => x.metodo.stringValue === 'Dropset')
    return [f?.escopo?.stringValue, num(f?.serie)]
  }, { timeout: 15_000 }).toEqual(['Série específica', 1])
  await page.mouse.click(5, 5) // toque fora fecha
  await expect(cartao('Barra Fixa Aberta').getByText('Dropset [S1]')).toBeVisible()
  await expect(cartao('Barra Fixa Aberta').getByText('D1')).toBeVisible()

  await tela.getByRole('button', { name: '+ Adicionar exercício' }).click()
  await confirmar('Remada Curvada Barra')
  const novo = cartao('Remada Curvada Barra')
  await expect(novo).toBeVisible()
  const kg = novo.locator('input[inputmode="decimal"]').first()
  await kg.fill('30')
  await kg.blur()

  await tela.getByRole('button', { name: 'Editar Supino Reto Barra', exact: true }).click()
  await dialogo.getByRole('button', { name: 'Tirar do treino de hoje' }).click()
  await expect(cartao('Supino Reto Barra')).toHaveCount(0)

  await expect.poll(async () => {
    const d = ((await lerDoc(`mesos/${mesoId}`))?.fields ?? {}) as Record<string, any>
    const r = ((await lerDoc(`registros/${mesoId}_s01_t1`))?.fields ?? {}) as Record<string, any>
    const cargas = Object.values(r.cargas?.mapValue?.fields ?? {}) as any[]
    return [!!d.sessoes?.mapValue?.fields?.['1-1'], cargas.some((c) => num(c.mapValue?.fields?.s1) === 30)]
  }, { timeout: 15_000 }).toEqual([true, true])

  await tela.getByRole('button', { name: 'Voltar ao planejado' }).click()
  await expect(cartao('Desenvolvimento Militar Barra')).toBeVisible()
  await expect(cartao('Remada Curvada Barra')).toHaveCount(0)
  await expect(tela.getByText('Treino ajustado só hoje')).toHaveCount(0)
})
