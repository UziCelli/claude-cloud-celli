import { expect, test } from '@playwright/test'
import { criarAluno } from './seed'

// /acao: destino dos links dos e-mails do Firebase (público, sem login).
test.use({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } })

const AUTH = 'http://127.0.0.1:9099'

async function codigoDeReset(email: string) {
  await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=fake`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestType: 'PASSWORD_RESET', email }),
  })
  const r = await fetch(`${AUTH}/emulator/v1/projects/demo-forca/oobCodes`)
  const lista = (await r.json()).oobCodes as { email: string; requestType: string; oobCode: string }[]
  return lista.filter((c) => c.email === email && c.requestType === 'PASSWORD_RESET').pop()!.oobCode
}

test('resetPassword: define a senha nova e consegue entrar com ela', async ({ page }) => {
  const email = 'acao.reset@teste.com'
  await criarAluno('Acao Reset', email, 'senha-antiga1')
  const oobCode = await codigoDeReset(email)
  await page.goto(`/acao?mode=resetPassword&oobCode=${oobCode}&lang=pt`)
  await expect(page.getByText(`Nova senha para ${email}`)).toBeVisible()
  await expect(page.getByLabel('Nova senha')).toHaveAttribute('autocomplete', 'new-password')
  await page.getByLabel('Nova senha').fill('senha-nova123')
  await page.getByLabel('Repetir senha').fill('senha-nova123')
  await page.getByRole('button', { name: 'Salvar senha' }).click()
  await expect(page.getByRole('heading', { name: 'Senha criada' })).toBeVisible()
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible()
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill('senha-nova123')
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByLabel('E-mail')).toHaveCount(0)
})

test('código inválido ou vencido mostra a mensagem de link vencido', async ({ page }) => {
  await page.goto('/acao?mode=resetPassword&oobCode=codigo-que-nao-existe')
  await expect(page.getByText('Este link venceu ou já foi usado.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Ir para o app' })).toBeVisible()
})

test('modo desconhecido ou sem código mostra "Link inválido"', async ({ page }) => {
  await page.goto('/acao?mode=qualquer&oobCode=abc')
  await expect(page.getByRole('heading', { name: 'Link inválido' })).toBeVisible()
  await page.goto('/acao?mode=resetPassword')
  await expect(page.getByRole('heading', { name: 'Link inválido' })).toBeVisible()
})

test('senhas diferentes bloqueiam o envio', async ({ page }) => {
  const email = 'acao.diferente@teste.com'
  await criarAluno('Acao Diferente', email, 'senha-antiga1')
  const oobCode = await codigoDeReset(email)
  await page.goto(`/acao?mode=resetPassword&oobCode=${oobCode}`)
  await page.getByLabel('Nova senha').fill('senha-nova123')
  await page.getByLabel('Repetir senha').fill('outra-senha123')
  await page.getByRole('button', { name: 'Salvar senha' }).click()
  await expect(page.getByText('As senhas não são iguais.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Senha criada' })).toHaveCount(0)
})
