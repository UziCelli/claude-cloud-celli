import { expect, test } from '@playwright/test'

// Entrada: boas-vindas na 1ª visita (forçadas, pois o e2e roda com webdriver) e login limpo.
const UA_IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'

test.use({ serviceWorkers: 'block', userAgent: UA_IPHONE, viewport: { width: 390, height: 844 }, hasTouch: true })

const forcar = (page: import('@playwright/test').Page) => page.addInitScript(() => localStorage.setItem('forca-boas-vindas-forcar', '1'))

test('1ª visita: boas-vindas, folha do iPhone e "Já tenho conta" grava a marca', async ({ page }) => {
  await forcar(page)
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Seu treino na palma da mão' })).toBeVisible()
  await page.getByRole('button', { name: 'Como instalar' }).click()
  const folha = page.getByRole('dialog', { name: 'Instalar no iPhone' })
  await expect(folha).toBeVisible()
  await expect(folha.getByText('Adicionar à Tela de Início')).toBeVisible()
  await folha.getByRole('button', { name: 'Agora não' }).click()
  await expect(folha).toHaveCount(0)

  await page.getByRole('button', { name: 'Já tenho conta' }).click()
  await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible()
  expect(await page.evaluate(() => localStorage.getItem('forca-boas-vindas-visto'))).toBe('1')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible() // já viu: direto no login
})

test('"Criar minha conta" abre o cadastro; senha com autocomplete certo e mostrar/ocultar', async ({ page }) => {
  await forcar(page)
  await page.goto('/')
  await page.getByRole('button', { name: 'Criar minha conta' }).click()
  await expect(page.getByRole('heading', { name: 'Criar conta' })).toBeVisible()
  const senha = page.getByLabel('Senha')
  await expect(senha).toHaveAttribute('autocomplete', 'new-password')
  await expect(senha).toHaveAttribute('type', 'password')
  await page.getByRole('button', { name: 'Mostrar' }).click()
  await expect(senha).toHaveAttribute('type', 'text')
  await page.getByRole('button', { name: 'Já tenho conta' }).click()
  await expect(senha).toHaveAttribute('autocomplete', 'current-password')
  await expect(page.getByLabel('E-mail')).toHaveAttribute('autocomplete', 'username')
})
