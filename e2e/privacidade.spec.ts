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

test('aluno sem aceite vê a tela, aceita e não vê de novo', async ({ page }) => {
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, undefined, false)
  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  const aceitar = page.getByRole('button', { name: 'Aceitar e continuar' })
  await expect(aceitar).toBeDisabled()
  await page.getByLabel(/Li e aceito/).check()
  await page.getByLabel('Senha atual').fill('senha-errada1')
  await aceitar.click()
  await expect(page.getByText('Senha atual incorreta.', { exact: false })).toBeVisible()
  await page.getByLabel('Senha atual').fill(ALUNO.senha)
  await expect(page.getByLabel('Nova senha')).toHaveCount(0) // senha forte: não precisa trocar
  await aceitar.click()
  await expect(aceitar).toBeHidden()
  await expect(page.getByText('Olá, Bia')).toBeVisible()
  await expect.poll(async () => JSON.stringify(await lerDoc(`usuarios/${uid}`))).toContain('privacidadeVersao')
  await page.reload()
  await expect(page.getByText('Olá, Bia')).toBeVisible()
  await expect(page.getByText('Sua privacidade')).toBeHidden()
})

test('cadastro: senha fraca não cria a conta', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Criar minha conta' }).click()
  await expect(page.getByText('Mínimo 8 caracteres, com letra e número.')).toBeVisible()
  await page.getByLabel('Nome').fill('Caio Fraco')
  await page.getByLabel('E-mail').fill('caio.fraca-e2e@teste.com')
  await page.getByLabel(/Li e aceito/).check()
  const criar = page.getByRole('button', { name: 'Criar conta', exact: true })
  await page.getByLabel('Senha').fill('abc12')
  await criar.click()
  await expect(page.getByText('A senha precisa ter pelo menos 8 caracteres.')).toBeVisible()
  await page.getByLabel('Senha').fill('senhalonga')
  await criar.click()
  await expect(page.getByText('A senha precisa ter pelo menos um número.')).toBeVisible()
  await expect(page.getByText('Cadastro recebido!')).toHaveCount(0)
})

test('aceite com senha fraca: obriga a criar uma nova e ela passa a valer', async ({ page }) => {
  const u = { nome: 'Rui Fraco', email: 'rui.fraca-e2e@teste.com', senha: 'abc123' }
  await criarAluno(u.nome, u.email, u.senha, undefined, false)
  await page.goto('/')
  await page.getByLabel('E-mail').fill(u.email)
  await page.getByLabel('Senha').fill(u.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByText('Sem isso, o acesso fica bloqueado.', { exact: false })).toBeVisible()
  await page.getByLabel(/Li e aceito/).check()
  await page.getByLabel('Senha atual').fill(u.senha)
  await expect(page.getByText('Sua senha atual é fraca.', { exact: false })).toBeVisible()
  const aceitar = page.getByRole('button', { name: 'Aceitar e continuar' })
  await page.getByLabel('Nova senha', { exact: true }).fill('curta1')
  await page.getByLabel('Repetir nova senha').fill('curta1')
  await aceitar.click()
  await expect(page.getByText('A senha precisa ter pelo menos 8 caracteres.')).toBeVisible()
  await page.getByLabel('Nova senha', { exact: true }).fill('treino2026')
  await page.getByLabel('Repetir nova senha').fill('treino2026')
  await aceitar.click()
  await expect(aceitar).toBeHidden()
  await expect(page.getByText('Olá, Rui')).toBeVisible()
  // A senha antiga parou de valer; a nova entra.
  const r = await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: u.email, password: 'treino2026', returnSecureToken: true }),
  })
  expect(r.ok).toBe(true)
})

test('aceite sem internet: quem já aceitou a versão antiga treina agora e confirma depois', async ({ page, context }) => {
  const u = { nome: 'Lia Offline', email: 'lia.offline-e2e@teste.com', senha: 'senha123' }
  const uid = await criarAluno(u.nome, u.email, u.senha)
  // Só o campo da versão (aceitou a política antiga).
  const r = await fetch(`http://127.0.0.1:8080/v1/projects/demo-forca/databases/(default)/documents/usuarios/${uid}?updateMask.fieldPaths=privacidadeVersao`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
    body: JSON.stringify({ fields: { privacidadeVersao: { stringValue: '2026-10-13' } } }),
  })
  expect(r.ok).toBe(true)
  await page.goto('/')
  await page.getByLabel('E-mail').fill(u.email)
  await page.getByLabel('Senha').fill(u.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByText('Sem isso, o acesso fica bloqueado.', { exact: false })).toBeVisible()
  const adiar = page.getByRole('button', { name: /Sem internet/ })
  await expect(adiar).toHaveCount(0) // com internet: não dá para pular
  await context.setOffline(true)
  await page.getByLabel(/Li e aceito/).check()
  await page.getByLabel('Senha atual').fill(u.senha)
  await page.getByRole('button', { name: 'Aceitar e continuar' }).click()
  await adiar.click()
  await expect(page.getByText('Olá, Lia')).toBeVisible()
  await context.setOffline(false)
})
