import { expect, test, devices } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { criarAluno, criarCoach, criarMeso, definirPagoAte, hojeSaoPaulo, gravarDoc, limparEmuladores } from './seed'
import { VERSAO_PRIVACIDADE } from '../src/lib/privacidade'

const marca = JSON.parse(readFileSync(`marcas/${process.env.MARCA ?? 'vfit'}/marca.json`, 'utf8'))
const COACH = { nome: 'Victor', email: 'victor.pix-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Aluna', email: 'bia.pix-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'] })
test.skip(!marca.pix, 'marca sem Pix')

const entrar = async (page: import('@playwright/test').Page, email: string, senha: string) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

test('Pix: coach define a mensalidade, aluno vencido paga e avisa, coach confirma e o aluno entra', async ({ page, browser }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  // Aluno vencido há 8 dias (além da tolerância de 7).
  await gravarDoc(`usuarios/${uid}`, {
    papel: 'aluno', status: 'ativo', nome: ALUNO.nome, email: ALUNO.email,
    pagoAte: new Date(Date.now() - 8 * 86_400_000), privacidadeVersao: VERSAO_PRIVACIDADE, privacidadeEm: new Date(),
  })

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const coach = await ctx.newPage()
  await entrar(coach, COACH.email, COACH.senha)
  await expect(coach.getByRole('heading', { name: 'Início' })).toBeVisible()

  await test.step('coach põe a mensalidade 150', async () => {
    await coach.goto('/#/alunos')
    await coach.getByRole('button', { name: `Configurações de ${ALUNO.nome}` }).filter({ visible: true }).click()
    await coach.getByRole('button', { name: 'Mudar data ou mensalidade' }).click()
    await coach.getByRole('spinbutton', { name: 'Mensalidade (R$)' }).fill('150')
    await coach.getByRole('button', { name: 'Salvar mensalidade' }).click()
    await expect(coach.getByRole('spinbutton', { name: 'Mensalidade (R$)' })).toHaveCount(0) // salvar fecha o formulário
    await expect(coach.getByText('R$ 150,00/mês').filter({ visible: true })).toBeVisible()
  })

  await test.step('aluno vencido vê o QR e o copia e cola e toca em "Já paguei"', async () => {
    await entrar(page, ALUNO.email, ALUNO.senha)
    await expect(page.getByRole('heading', { name: 'Acesso pausado' })).toBeVisible()
    await expect(page.getByText('a mensalidade venceu há mais de 7 dias')).toBeVisible()
    await expect(page.getByText('Mensalidade R$ 150,00')).toBeVisible()
    await expect(page.getByRole('img', { name: 'QR Code Pix' })).toBeVisible()
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.getByRole('button', { name: 'Copiar código Pix' }).click()
    await expect(page.getByText('Código copiado')).toBeVisible()
    const texto = await page.evaluate(() => navigator.clipboard.readText())
    expect(texto).toContain('br.gov.bcb.pix')
    expect(texto).toContain(marca.pix.atraso ? '5406153.40' : '5406150.00') // 8 dias vencido: multa 3,00 + juros 0,40
    await page.getByRole('button', { name: 'Já paguei' }).click()
    await expect(page.getByText(/Aviso enviado em \d{2}\/\d{2}/)).toBeVisible()
  })

  await test.step('coach vê "Informou pagamento" e confirma', async () => {
    await expect(coach.getByText('Informou pagamento').filter({ visible: true })).toBeVisible()
    await coach.getByRole('button', { name: 'Confirmar pagamento' }).click()
    await expect(coach.getByText(/Acesso até \d{2}\/\d{2}/)).toBeVisible()
  })

  await test.step('o aluno entra no app', async () => {
    await expect(page.getByRole('heading', { name: /Olá, Bia/ })).toBeVisible({ timeout: 15_000 })
  })
  await ctx.close()
})

test('Pix no Início: pop-up 5 dias antes (1x por dia), reabre pelo quadro Pagamento; longe do vencimento, não abre sozinho', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  await gravarDoc(`usuarios/${uid}`, {
    papel: 'aluno', status: 'ativo', nome: ALUNO.nome, email: ALUNO.email, mensalidade: 150,
    pagoAte: new Date(Date.now() + 3 * 86_400_000), privacidadeVersao: VERSAO_PRIVACIDADE, privacidadeEm: new Date(),
  })
  const popup = page.getByRole('dialog', { name: 'Pagar mensalidade' })

  await entrar(page, ALUNO.email, ALUNO.senha)
  await expect(page.getByRole('heading', { name: /Olá, Bia/ })).toBeVisible()
  await expect(popup.getByRole('heading', { name: 'Quer adiantar a mensalidade?' })).toBeVisible()
  await expect(popup.getByRole('img', { name: 'QR Code Pix' })).toBeVisible()
  await expect(popup.getByRole('button', { name: 'Copiar código Pix' })).toBeVisible()

  await test.step('"Agora não" fecha e, recarregando no mesmo dia, não reaparece', async () => {
    await popup.getByRole('button', { name: 'Agora não' }).click()
    await expect(popup).toHaveCount(0)
    await page.reload()
    await expect(page.getByRole('heading', { name: /Olá, Bia/ })).toBeVisible()
    await expect(popup).toHaveCount(0)
  })

  await test.step('o quadro Pagamento reabre o pop-up', async () => {
    await page.getByRole('button', { name: /Pagamento/ }).click()
    await expect(popup.getByRole('img', { name: 'QR Code Pix' })).toBeVisible()
    await popup.getByRole('button', { name: 'Agora não' }).click()
  })

  await test.step('na Conta, o Pix começa fechado', async () => {
    await page.goto('/#/conta')
    await expect(page.getByRole('button', { name: 'Pagar com Pix' })).toHaveAttribute('aria-expanded', 'false')
  })

  await test.step('com 20 dias, o Início não abre o pop-up sozinho', async () => {
    await definirPagoAte(uid, new Date(Date.now() + 20 * 86_400_000))
    await page.evaluate(() => localStorage.clear())
    await page.goto('/#/')
    await expect(page.getByRole('heading', { name: /Olá, Bia/ })).toBeVisible()
    await expect(popup).toHaveCount(0)
  })
})

test('Coach: um toque em Renovar soma 1 mês', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  await gravarDoc(`usuarios/${uid}`, {
    papel: 'aluno', status: 'ativo', nome: ALUNO.nome, email: ALUNO.email, mensalidade: 150,
    pagoAte: new Date(Date.now() + 3 * 86_400_000), privacidadeVersao: VERSAO_PRIVACIDADE, privacidadeEm: new Date(),
  })
  await entrar(page, COACH.email, COACH.senha)
  await page.goto('/#/alunos')
  await page.getByRole('button', { name: `Configurações de ${ALUNO.nome}` }).filter({ visible: true }).click()
  await page.getByRole('button', { name: 'Renovar' }).click()
  await expect(page.getByText(/Acesso até \d{2}\/\d{2}/)).toBeVisible()
})

test('Pix vencido: QR com multa e juros do dia; o coach vê o valor com atraso', async ({ page, browser }) => {
  test.skip(!marca.pix?.atraso, 'marca sem multa/juros')
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  // 10 dias de atraso, R$ 150: multa 2% = 3,00; juros 1%/30 × 10 = 0,50; total 153,50.
  await gravarDoc(`usuarios/${uid}`, {
    papel: 'aluno', status: 'ativo', nome: ALUNO.nome, email: ALUNO.email, mensalidade: 150,
    pagoAte: new Date(Date.now() - 10 * 86_400_000), privacidadeVersao: VERSAO_PRIVACIDADE, privacidadeEm: new Date(),
  })

  await entrar(page, ALUNO.email, ALUNO.senha)
  await expect(page.getByRole('heading', { name: 'Acesso pausado' })).toBeVisible()
  await expect(page.getByText('Multa por atraso (2%): R$ 3,00')).toBeVisible()
  await expect(page.getByText('Juros (10 dias): R$ 0,50')).toBeVisible()
  await expect(page.getByText('Total hoje R$ 153,50')).toBeVisible()

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const coach = await ctx.newPage()
  await entrar(coach, COACH.email, COACH.senha)
  await coach.goto('/#/alunos')
  await expect(coach.getByText('Com atraso: R$ 153,50').filter({ visible: true })).toBeVisible()
  await ctx.close()
})

test('Tolerância: vencido há 3 dias vê o aviso 1x por dia e "Ciente" leva ao treino; há 8 dias cai em Acesso pausado', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const perfil = (dias: number) => ({
    papel: 'aluno', status: 'ativo', nome: ALUNO.nome, email: ALUNO.email, mensalidade: 150,
    pagoAte: new Date(Date.now() - dias * 86_400_000), privacidadeVersao: VERSAO_PRIVACIDADE, privacidadeEm: new Date(),
  })
  await gravarDoc(`usuarios/${uid}`, perfil(3))
  const prog = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null], w4: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId: uid, nome: 'Meso Atraso', frequencia: 7, semanas: 4, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: Object.fromEntries([1, 2, 3, 4, 5, 6, 7].map((n) => [`t${n}`, [{ slotId: 'a', nome: 'Agachamento Livre Halter' }]])),
    progressao: { principais: prog, auxiliares: prog },
  })

  await entrar(page, ALUNO.email, ALUNO.senha)
  const aviso = page.getByRole('dialog', { name: 'Mensalidade vencida' })
  await expect(aviso.getByRole('heading', { name: 'Mensalidade vencida há 3 dias' })).toBeVisible()
  await expect(aviso.getByText('Seu acesso pausa em 4 dias')).toBeVisible()
  await aviso.getByRole('button', { name: 'Ciente, ir para o treino' }).click()
  await expect(aviso).toHaveCount(0)
  await expect(page).toHaveURL(new RegExp(`#/treino/${mesoId}/1/1$`)) // frequência 7: tem treino todo dia

  await page.reload()
  await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
  await expect(aviso).toHaveCount(0) // já viu hoje

  await definirPagoAte(uid, new Date(Date.now() - 8 * 86_400_000))
  await expect(page.getByRole('heading', { name: 'Acesso pausado' })).toBeVisible({ timeout: 15_000 })
})
