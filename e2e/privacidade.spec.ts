import { expect, test, devices } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { criarAluno, limparEmuladores, lerDoc } from './seed'

const marca = JSON.parse(readFileSync(`marcas/${process.env.MARCA ?? 'vfit'}/marca.json`, 'utf8'))
const ALUNO = { nome: 'Bia Aluna', email: 'bia.privacidade-e2e@teste.com', senha: 'senha123' }

test.use({ ...devices['Pixel 7'] })
test.beforeAll(limparEmuladores)

test('política abre sem login', async ({ page }) => {
  await page.goto('/privacidade')
  await expect(page.getByRole('heading', { name: 'Política de Privacidade' })).toBeVisible()
  await expect(page.getByText(`CREF ${marca.responsavel.cref}`)).toBeVisible()
})

test('cadastro: botão só habilita com a caixa marcada', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Criar minha conta' }).click()
  await page.getByLabel('Nome').fill('Caio Novo')
  await page.getByLabel('E-mail').fill('caio.privacidade-e2e@teste.com')
  await page.getByLabel('Senha').fill('senha123')
  const criar = page.getByRole('button', { name: 'Criar conta', exact: true })
  await expect(criar).toBeDisabled()
  await page.getByLabel(/Li e aceito/).check()
  await expect(criar).toBeEnabled()
  await criar.click()
  await expect(page.getByText('Cadastro recebido!')).toBeVisible()
})

// Grava só a versão do aceite (como se tivesse aceitado uma política antiga).
async function versao(uid: string, v: string) {
  const r = await fetch(`http://127.0.0.1:8080/v1/projects/demo-forca/databases/(default)/documents/usuarios/${uid}?updateMask.fieldPaths=privacidadeVersao`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
    body: JSON.stringify({ fields: { privacidadeVersao: { stringValue: v } } }),
  })
  expect(r.ok).toBe(true)
}

async function entrar(page: import('@playwright/test').Page, email: string, senha: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

test('aluno sem aceite e senha forte: só o pop-up, sem pedir senha', async ({ page }) => {
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, undefined, false)
  await entrar(page, ALUNO.email, ALUNO.senha)
  const popup = page.getByRole('dialog', { name: 'Termos de uso e privacidade' })
  await expect(popup).toBeVisible()
  await expect(page.getByLabel('Senha atual')).toHaveCount(0)
  const aceitar = page.getByRole('button', { name: 'Aceitar e continuar' })
  await expect(aceitar).toBeDisabled()
  await page.getByLabel(/Li e aceito/).check()
  await aceitar.click()
  await expect(popup).toBeHidden()
  await expect(page.getByText('Olá, Bia')).toBeVisible()
  await expect.poll(async () => JSON.stringify(await lerDoc(`usuarios/${uid}`))).toContain('privacidadeVersao')
  await page.reload()
  await expect(page.getByText('Olá, Bia')).toBeVisible()
  await expect(popup).toBeHidden()
})

test('termos atualizados: quem já conferiu a senha só vê o pop-up, mesmo sem entrar de novo', async ({ page }) => {
  const u = { nome: 'Gil Antigo', email: 'gil.termos-e2e@teste.com', senha: 'senha123' }
  const uid = await criarAluno(u.nome, u.email, u.senha)
  await entrar(page, u.email, u.senha)
  await expect(page.getByText('Olá, Gil')).toBeVisible()
  // Sessão aberta, aparelho sem o resultado do login (como quem entrou antes desta versão) e termos novos.
  await page.evaluate(() => localStorage.removeItem('forca-senha'))
  await versao(uid, '2026-11-09')
  await page.reload()
  await expect(page.getByRole('dialog', { name: 'Atualizamos os termos' })).toBeVisible()
  await expect(page.getByLabel('Senha atual')).toHaveCount(0)
  await page.getByLabel(/Li e aceito/).check()
  await page.getByRole('button', { name: 'Aceitar e continuar' }).click()
  await expect(page.getByText('Olá, Gil')).toBeVisible()
})

test('sessão antiga sem senha conferida: confirma a senha uma vez e depois só o pop-up', async ({ page }) => {
  const u = { nome: 'Ana Velha', email: 'ana.velha-e2e@teste.com', senha: 'senha123' }
  const uid = await criarAluno(u.nome, u.email, u.senha)
  await entrar(page, u.email, u.senha)
  await expect(page.getByText('Olá, Ana')).toBeVisible()
  await page.evaluate(() => localStorage.removeItem('forca-senha'))
  await versao(uid, '2026-10-13')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Confirme sua senha' })).toBeVisible()
  await page.getByLabel('Senha atual').fill('senha-errada1')
  await page.getByRole('button', { name: 'Continuar' }).click()
  await expect(page.getByText('Senha atual incorreta.', { exact: false })).toBeVisible()
  await page.getByLabel('Senha atual').fill(u.senha)
  await page.getByRole('button', { name: 'Continuar' }).click()
  await expect(page.getByRole('dialog', { name: 'Atualizamos os termos' })).toBeVisible()
  await page.getByLabel(/Li e aceito/).check()
  await page.getByRole('button', { name: 'Aceitar e continuar' }).click()
  await expect(page.getByText('Olá, Ana')).toBeVisible()
  await page.reload()
  await expect(page.getByText('Olá, Ana')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Confirme sua senha' })).toHaveCount(0)
})

test('cadastro: senha fraca não cria a conta e a lista mostra o que falta', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Criar minha conta' }).click()
  await expect(page.getByText('8 caracteres ou mais')).toBeVisible()
  await page.getByLabel('Nome').fill('Caio Fraco')
  await page.getByLabel('E-mail').fill('caio.fraca-e2e@teste.com')
  await page.getByLabel(/Li e aceito/).check()
  const criar = page.getByRole('button', { name: 'Criar conta', exact: true })
  await page.getByLabel('Senha').fill('123456')
  await expect(page.getByText('Senha forte')).toHaveCount(0)
  await criar.click()
  await expect(page.getByText('A senha precisa ter pelo menos 8 caracteres.')).toBeVisible()
  await page.getByLabel('Senha').fill('senhalonga')
  await criar.click()
  await expect(page.getByText('A senha precisa ter pelo menos um número.')).toBeVisible()
  await expect(page.getByText('Cadastro recebido!')).toHaveCount(0)
  await page.getByLabel('Senha').fill('senhalonga1')
  await expect(page.getByText('✓ Senha forte')).toBeVisible()
})

test('login com senha fraca: cria uma nova sem digitar a atual, aceita os termos e não pede de novo', async ({ page }) => {
  const u = { nome: 'Rui Fraco', email: 'rui.fraca-e2e@teste.com', senha: '123456' }
  await criarAluno(u.nome, u.email, u.senha, undefined, false)
  await entrar(page, u.email, u.senha)
  await expect(page.getByRole('heading', { name: 'Crie uma senha mais segura' })).toBeVisible()
  await expect(page.getByLabel('Senha atual')).toHaveCount(0)
  const salvar = page.getByRole('button', { name: 'Salvar senha nova' })
  await page.getByLabel('Nova senha', { exact: true }).fill('curta1')
  await page.getByLabel('Repetir nova senha').fill('curta1')
  await salvar.click()
  await expect(page.getByText('A senha precisa ter pelo menos 8 caracteres.')).toBeVisible()
  await page.getByLabel('Nova senha', { exact: true }).fill('treino2026')
  await page.getByLabel('Repetir nova senha').fill('treino2026')
  await expect(page.getByText('✓ Senha forte')).toBeVisible()
  await salvar.click()
  // Depois da senha, só o pop-up dos termos (sem pedir senha de novo).
  await expect(page.getByRole('dialog', { name: 'Termos de uso e privacidade' })).toBeVisible()
  await page.getByLabel(/Li e aceito/).check()
  await page.getByRole('button', { name: 'Aceitar e continuar' }).click()
  await expect(page.getByText('Olá, Rui')).toBeVisible()
  await page.reload()
  await expect(page.getByText('Olá, Rui')).toBeVisible()
  // A senha antiga parou de valer; a nova entra.
  const r = await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: u.email, password: 'treino2026', returnSecureToken: true }),
  })
  expect(r.ok).toBe(true)
})

test('termos atualizados não pedem senha a quem tem senha forte, e senha fraca já aceita pede a troca', async ({ page }) => {
  const u = { nome: 'Edu Fraco', email: 'edu.fraco-e2e@teste.com', senha: 'abc123' }
  await criarAluno(u.nome, u.email, u.senha) // já aceitou a versão atual
  await entrar(page, u.email, u.senha)
  await expect(page.getByRole('heading', { name: 'Crie uma senha mais segura' })).toBeVisible()
  // Fechar e abrir o app não pula a troca.
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Crie uma senha mais segura' })).toBeVisible()
  await page.getByLabel('Nova senha', { exact: true }).fill('treino2026')
  await page.getByLabel('Repetir nova senha').fill('treino2026')
  await page.getByRole('button', { name: 'Salvar senha nova' }).click()
  await expect(page.getByText('Olá, Edu')).toBeVisible()
})

test('sem internet na confirmação da senha: quem já aceitou a versão antiga treina agora e confirma depois', async ({ page, context }) => {
  const u = { nome: 'Lia Offline', email: 'lia.offline-e2e@teste.com', senha: 'senha123' }
  const uid = await criarAluno(u.nome, u.email, u.senha)
  await entrar(page, u.email, u.senha)
  await expect(page.getByText('Olá, Lia')).toBeVisible()
  await page.evaluate(() => localStorage.removeItem('forca-senha'))
  await versao(uid, '2026-10-13')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Confirme sua senha' })).toBeVisible()
  const adiar = page.getByRole('button', { name: /Sem internet/ })
  await expect(adiar).toHaveCount(0) // com internet: não dá para pular
  await context.setOffline(true)
  await page.getByLabel('Senha atual').fill(u.senha)
  await page.getByRole('button', { name: 'Continuar' }).click()
  await adiar.click()
  await expect(page.getByText('Olá, Lia')).toBeVisible()
  await context.setOffline(false)
})
