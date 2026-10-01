import { expect, test } from '@playwright/test'

// Bug de 01/10/2026: aba aberta antes de publicar seguia com o código antigo e o login caía.
// Com versão nova disponível, a tela de login recarrega sozinha, uma vez só (sem laço).
test.use({ serviceWorkers: 'block' })

test('tela de login recarrega aba com versão antiga, uma vez só', async ({ page }) => {
  await page.route('**/versao.json', (r) => r.fulfill({ json: { versao: '2999-01-01 00:00' } }))
  let cargas = 0
  page.on('load', () => cargas++)
  await page.goto('/')
  await expect.poll(() => cargas).toBe(2)
  await expect(page.getByLabel('E-mail')).toBeVisible()
  await page.waitForTimeout(1500)
  expect(cargas).toBe(2)
  await expect(page.getByText(/^Versão \d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)).toBeVisible()
})

test('mesma versão: não recarrega', async ({ page }) => {
  let cargas = 0
  page.on('load', () => cargas++)
  await page.goto('/')
  await expect(page.getByLabel('E-mail')).toBeVisible()
  await page.waitForTimeout(1500)
  expect(cargas).toBe(1)
})
