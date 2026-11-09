import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, limparEmuladores } from './seed'

// Notificações por tipo (docs/plano-notificacoes.md). O Worker de push é simulado: nenhum pedido sai para a internet.
const COACH = { nome: 'Victor', email: 'victor.notif-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Nina Avisos', email: 'nina.notif-e2e@teste.com', senha: 'senha123' }
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }

test.describe.configure({ mode: 'serial' })
// O Chromium sem janela do CI responde 'denied' mesmo com a permissão concedida: fixamos 'granted' na página.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try { Object.defineProperty(Notification, 'permission', { get: () => 'granted' }) } catch { /* sem Notification: o teste falha adiante */ }
  })
})

let alunoId = ''
test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
})

const entrar = async (page: import('@playwright/test').Page, email: string, senha: string) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

test('aluno liga e desliga cada tipo de aviso na Conta', async ({ page }) => {
  await page.route(/workers\.dev\//, (r) => r.fulfill({ status: 200, headers: CORS, json: { ok: true } }))
  await entrar(page, ALUNO.email, ALUNO.senha)
  await page.goto('/#/conta')
  for (const nome of ['Treino novo pronto', 'Lembrete do treino do dia', 'Avisos do coach', 'Vencimento da mensalidade'])
    await expect(page.getByRole('switch', { name: nome })).toHaveAttribute('aria-checked', 'true')
  await page.getByRole('switch', { name: 'Lembrete do treino do dia' }).click()
  await expect(page.getByRole('switch', { name: 'Lembrete do treino do dia' })).toHaveAttribute('aria-checked', 'false')
  await page.reload()
  await expect(page.getByRole('switch', { name: 'Lembrete do treino do dia' })).toHaveAttribute('aria-checked', 'false')
  await expect(page.getByRole('switch', { name: 'Avisos do coach' })).toHaveAttribute('aria-checked', 'true')
})

test('coach tem os avisos dos alunos na conta e escreve aviso para todos e para um aluno', async ({ page }) => {
  const recados: { alunoIds: string[]; texto: string }[] = []
  await page.route(/workers\.dev\//, (r) => {
    const req = r.request()
    if (req.method() === 'POST' && req.url().endsWith('/recado')) {
      recados.push(req.postDataJSON())
      return r.fulfill({ status: 200, headers: CORS, json: { ok: true, enviados: 1 } })
    }
    return r.fulfill({ status: 200, headers: CORS, json: { ok: true } })
  })
  await entrar(page, COACH.email, COACH.senha)
  await page.goto('/#/conta')
  for (const nome of ['Aluno concluiu o treino', 'Aluno escreveu uma anotação', 'Aluno tocou em "Já paguei"'])
    await expect(page.getByRole('switch', { name: nome })).toHaveAttribute('aria-checked', 'true')

  await page.goto('/#/alunos')
  await page.getByRole('button', { name: 'Aviso para todos' }).click()
  await page.getByLabel(/Aviso para todos os alunos ativos \(1\)/).fill('Amanhã não haverá atendimento.')
  await page.getByRole('button', { name: 'Enviar aviso' }).click()
  await expect(page.getByText('Aviso enviado.')).toBeVisible()
  expect(recados[0]).toEqual({ alunoIds: [alunoId], texto: 'Amanhã não haverá atendimento.' })
  await page.getByRole('button', { name: 'Fechar' }).click()

  // Tela larga: a lista visível é a tabela (os cartões do celular ficam escondidos).
  const tabela = page.getByRole('table')
  await tabela.getByRole('button', { name: `Configurações de ${ALUNO.nome}` }).click()
  await tabela.getByRole('button', { name: 'Enviar aviso' }).click()
  await tabela.getByLabel(`Aviso para ${ALUNO.nome}`).fill('Seu horário mudou para as 8h.')
  await tabela.getByRole('button', { name: 'Enviar aviso' }).click()
  await expect(tabela.getByText('Aviso enviado.')).toBeVisible()
  expect(recados[1]).toEqual({ alunoIds: [alunoId], texto: 'Seu horário mudou para as 8h.' })
})
