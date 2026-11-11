import { expect, test, devices, type Page } from '@playwright/test'
import { criarAluno, criarAnamnese, criarCoach, limparEmuladores, listarDocs } from './seed'

const senha = 'senha123'
const email = (n: string) => `${n}.anamc-e2e@teste.com`

test.describe.configure({ mode: 'serial' })
test.use({ ...devices['Pixel 7'] })

const PARQ_NAO = { coracao: false, dorPeito: false, tontura: false, doencaCronica: false, remedio: false, ossoArticulacao: false, supervisaoMedica: false, declaracao: true }
let alunoId = ''
const doAluno = async () => (await listarDocs('anamneses')).filter((d) => d.fields.alunoId.stringValue === alunoId)

async function entrar(page: Page, e: string, esperado: RegExp) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(e)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: esperado })).toBeVisible()
}

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach('Victor', email('victor'), senha)
  alunoId = await criarAluno('Lia Atenção', email('lia'), senha, undefined, true, { anamnese: false })
  await criarAnamnese(alunoId, { ...PARQ_NAO, coracao: true, dores: ['joelho'] })
  await criarAluno('Sem Resposta', email('sem'), senha, undefined, true, { anamnese: false })
})

test('coach vê selo e cartão, marca vista, anota e o aluno lê', async ({ page, browser }) => {
  await entrar(page, email('victor'), /Início|Bom dia|Boa tarde|Boa noite/)
  const cartao = page.getByRole('link', { name: /Lia Atenção · nova · Atenção/ })
  await expect(cartao).toBeVisible()
  await expect(page.getByRole('link', { name: /Sem Resposta · não respondeu/ })).toBeVisible()

  await page.goto(`/#/aluno/${alunoId}`)
  await expect(page.getByRole('button', { name: /Anamnese\s*Atenção/ })).toBeVisible()
  await page.getByRole('button', { name: /Anamnese/ }).click()
  await expect(page.getByText('Problema no coração ou pressão alta', { exact: true })).toBeVisible() // sinal de atenção
  await expect(page.getByText('Dor: joelho')).toBeVisible()

  for (const n of ['Marcar como vista', 'Nova versão']) { // a barra de ações fica acima das abas, sem rolar
    const caixa = await page.getByRole('button', { name: n }).boundingBox()
    const aba = await page.getByRole('navigation', { name: 'Menu' }).locator('a').first().boundingBox()
    expect(caixa!.y + caixa!.height).toBeLessThanOrEqual(aba!.y)
  }
  await page.getByRole('button', { name: 'Marcar como vista' }).click()
  await expect(page.getByRole('button', { name: 'Marcar como vista' })).toHaveCount(0)
  await expect.poll(async () => (await doAluno())[0].fields.vistaEm?.timestampValue).toBeTruthy()

  await expect(page.getByText('O aluno vê esta anotação.')).toBeVisible()
  await page.getByLabel('Anotação do coach').fill('Procure um médico e me avise.')
  await page.getByRole('button', { name: 'Salvar anotação' }).click()
  await expect.poll(async () => (await doAluno())[0].fields.obsCoach?.stringValue).toBe('Procure um médico e me avise.')

  await page.goto('/#/')
  await expect(page.getByRole('link', { name: /Lia Atenção · nova/ })).toHaveCount(0)

  const ctx = await browser.newContext({ ...devices['Pixel 7'] })
  const aluno = await ctx.newPage()
  await entrar(aluno, email('lia'), /Treino pausado pela sua saúde/) // PAR-Q grave (coração): pausada, mas lê a anamnese
  await aluno.goto('/#/anamnese')
  await expect(aluno.getByText('Procure um médico e me avise.')).toBeVisible()
  await ctx.close()
})

test('coach cria nova versão (origem coach, já vista)', async ({ page }) => {
  await entrar(page, email('victor'), /Início|Bom dia|Boa tarde|Boa noite/)
  await page.goto(`/#/aluno/${alunoId}/anamnese`)
  await page.getByRole('button', { name: 'Nova versão' }).click()
  await expect(page.getByText('Etapa 1 de 5')).toBeVisible()
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Próximo', exact: true }).click()
  await page.getByRole('checkbox', { name: /Lancei conforme o aluno informou/ }).click()
  await page.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(page.getByRole('heading', { name: /Anamnese de/ })).toBeVisible()
  await expect.poll(async () => (await doAluno()).length).toBe(2)
  const nova = (await doAluno()).find((d) => d.fields.origem.stringValue === 'coach')!
  expect(nova.fields.vistaEm?.timestampValue).toBeTruthy()
  await expect(page.getByRole('heading', { name: 'Histórico' })).toBeVisible()
})

test('versão do coach tira a "nova" do aluno e aluno inexistente é avisado', async ({ page }) => {
  const outro = await criarAluno('Rui Novo', email('rui'), senha, undefined, true, { anamnese: false })
  await criarAnamnese(outro, PARQ_NAO)
  await entrar(page, email('victor'), /Início|Bom dia|Boa tarde|Boa noite/)
  await expect(page.getByRole('link', { name: /Rui Novo · nova/ })).toBeVisible()
  await page.goto(`/#/aluno/${outro}/anamnese`)
  await page.getByRole('button', { name: 'Nova versão' }).click() // sem marcar a do aluno como vista
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Próximo', exact: true }).click()
  await page.getByRole('checkbox', { name: /Lancei conforme o aluno informou/ }).click()
  await page.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(page.getByRole('heading', { name: /Anamnese de/ })).toBeVisible()
  await page.goto('/#/')
  await expect(page.getByRole('link', { name: /Rui Novo · nova/ })).toHaveCount(0)

  await page.goto('/#/aluno/inexistente123/anamnese')
  await expect(page.getByText('Aluno não encontrado.')).toBeVisible()
  await expect(page.getByRole('button', { name: /Lançar pelo aluno|Nova versão/ })).toHaveCount(0)
})
