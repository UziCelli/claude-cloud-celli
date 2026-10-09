import { expect, test, devices } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { criarAluno, criarCoach, lerDoc, limparEmuladores } from './seed'

const marca = JSON.parse(readFileSync(`marcas/${process.env.MARCA ?? 'vfit'}/marca.json`, 'utf8'))
const COACH = { nome: 'Victor', email: 'victor.conta-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Aluna', email: 'bia.conta-e2e@teste.com', senha: 'senha123' }
const NOVO_NOME = 'Carla Souza'

test.use({ ...devices['Pixel 7'] })

const entrar = async (page: import('@playwright/test').Page, email: string, senha: string) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

test('aluno personaliza a conta (nome, foto, selo, peso, senha) e o coach vê a foto', async ({ page, browser }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const uid = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const campos = async (caminho: string) => ((await lerDoc(caminho))?.fields ?? {}) as Record<string, any>
  const menu = page.getByRole('navigation', { name: 'Menu' })

  await entrar(page, ALUNO.email, ALUNO.senha)
  await menu.getByRole('link', { name: 'Conta', exact: true }).click()
  await expect(page.getByRole('heading', { name: ALUNO.nome })).toBeVisible()
  await expect(page.getByText(ALUNO.email)).toBeVisible()
  await expect(page.getByText('Sua foto aparece só para você e seu coach. Remova quando quiser.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Remover foto' })).toHaveCount(0)

  await test.step('edita o nome e o Início mostra o nome novo', async () => {
    await page.getByRole('button', { name: 'Editar' }).click()
    await page.getByLabel('Nome').fill(NOVO_NOME)
    await page.getByRole('button', { name: 'Salvar', exact: true }).click()
    await expect(page.getByRole('heading', { name: NOVO_NOME })).toBeVisible()
    await menu.getByRole('link', { name: 'Início' }).click()
    await expect(page.getByRole('heading', { name: /Olá, Carla/ })).toBeVisible()
    await page.getByRole('link', { name: 'Minha conta' }).click()
    await expect.poll(async () => (await campos(`usuarios/${uid}`)).nome?.stringValue, { timeout: 15_000 }).toBe(NOVO_NOME)
  })

  await test.step('envia a foto e ela aparece', async () => {
    // JPEG pequeno gerado no navegador (retângulo 80x40: testa o recorte quadrado).
    const base64 = await page.evaluate(() => {
      const c = document.createElement('canvas')
      c.width = 80
      c.height = 40
      const x = c.getContext('2d')!
      x.fillStyle = '#c0392b'
      x.fillRect(0, 0, 80, 40)
      return c.toDataURL('image/jpeg', 0.9).split(',')[1]
    })
    await page.locator('input[type="file"]').setInputFiles({ name: 'foto.jpg', mimeType: 'image/jpeg', buffer: Buffer.from(base64, 'base64') })
    await expect(page.getByRole('img', { name: `Foto de ${NOVO_NOME}` })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Remover foto' })).toBeVisible()
    await expect.poll(async () => (await campos(`fotos/${uid}`)).img?.stringValue, { timeout: 15_000 }).toMatch(/^data:image\/jpeg;base64,/)
  })

  await test.step('liga o selo e ele aparece', async () => {
    const chave = page.getByRole('switch', { name: `Selo ${marca.nome} na foto` })
    await expect(chave).toHaveAttribute('aria-checked', 'false')
    await chave.click()
    await expect(chave).toHaveAttribute('aria-checked', 'true')
    await expect(page.getByRole('img', { name: `Selo ${marca.nome}` })).toBeVisible()
    await expect.poll(async () => (await campos(`usuarios/${uid}`)).selo?.booleanValue, { timeout: 15_000 }).toBe(true)
  })

  await test.step('salva o peso', async () => {
    await page.getByLabel('Usado nos exercícios com peso do corpo').fill('72.5')
    await page.getByRole('button', { name: 'Salvar peso' }).click()
    await expect(page.getByText('Peso salvo')).toBeVisible()
    await expect.poll(async () => Number((await campos(`usuarios/${uid}`)).pesoKg?.doubleValue), { timeout: 15_000 }).toBe(72.5)
  })

  await test.step('"Trocar senha" mostra a mensagem', async () => {
    await page.getByRole('button', { name: 'Trocar senha' }).click()
    await expect(page.getByText(`Enviamos um link para ${ALUNO.email}`)).toBeVisible()
  })

  await test.step('o coach vê a foto do aluno na lista', async () => {
    const ctx = await browser.newContext()
    const pc = await ctx.newPage()
    await entrar(pc, COACH.email, COACH.senha)
    await expect(pc.getByRole('heading', { name: 'Início' })).toBeVisible()
    await pc.goto('/#/alunos')
    await expect(pc.getByRole('img', { name: `Foto de ${NOVO_NOME}` })).toBeVisible()
    await expect(pc.getByRole('img', { name: `Selo ${marca.nome}` })).toBeVisible()
    await ctx.close()
  })

  await test.step('remove a foto e voltam as iniciais', async () => {
    await page.getByRole('button', { name: 'Remover foto' }).click()
    await expect(page.getByRole('img', { name: `Foto de ${NOVO_NOME}` })).toHaveCount(0)
    await expect(page.getByText('CS', { exact: true })).toBeVisible()
    await expect.poll(async () => await lerDoc(`fotos/${uid}`), { timeout: 15_000 }).toBeNull()
  })
})
