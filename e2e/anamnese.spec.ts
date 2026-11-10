import { expect, test, devices, type Page } from '@playwright/test'
import { criarAluno, criarAnamnese, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores, listarDocs } from './seed'

const senha = 'senha123'
const email = (n: string) => `${n}.anam-e2e@teste.com`
const NOVA = new Date('2026-12-01T12:00:00-03:00') // conta criada depois do lançamento da anamnese

test.describe.configure({ mode: 'serial' })
test.use({ ...devices['Pixel 7'] })

// Não importa PERGUNTAS (puxa o motor, que o Playwright não carrega): textos copiados de src/lib/anamnese.ts.
const ETAPAS = 5
const PARQ = [
  { id: 'coracao', rotulo: 'Algum médico já disse que você tem problema no coração ou pressão alta?' },
  { id: 'dorPeito', rotulo: 'Sente dor no peito em repouso, no dia a dia ou ao fazer exercício?' },
  { id: 'tontura', rotulo: 'Já perdeu o equilíbrio por tontura ou desmaiou nos últimos 12 meses?' },
  { id: 'doencaCronica', rotulo: 'Tem alguma doença crônica (diabetes, asma, outra)?' },
  { id: 'remedio', rotulo: 'Toma algum remédio de uso contínuo?' },
  { id: 'ossoArticulacao', rotulo: 'Tem problema de osso, articulação ou coluna que piora com exercício?' },
  { id: 'supervisaoMedica', rotulo: 'Algum médico disse que você só deve treinar com supervisão médica?' },
]
const ANTIGA = (dias: number) => new Date(Date.now() - dias * 86_400_000)

async function entrar(page: Page, e: string, titulo = /Olá/) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(e)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: titulo })).toBeVisible()
}

const proximo = (page: Page) => page.getByRole('button', { name: 'Próximo', exact: true })
const marcar = (page: Page, pergunta: string, resposta: 'Sim' | 'Não') =>
  page.locator('section').filter({ hasText: pergunta }).getByRole('button', { name: resposta, exact: true }).click()

// Responde o formulário inteiro (PAR-Q todo "não", menos `sim`) e envia.
async function responder(page: Page, sim: string[] = []) {
  for (const p of PARQ) await marcar(page, p.rotulo, sim.includes(p.id) ? 'Sim' : 'Não')
  for (let i = 0; i < ETAPAS - 1; i++) await proximo(page).click()
  await page.getByRole('checkbox', { name: /Respondi com verdade/ }).click()
  await page.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Anamnese enviada' })).toBeVisible()
}

async function mesoDe(alunoId: string) {
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null] }
  return criarMeso({
    alunoId,
    nome: 'Meso Anamnese',
    frequencia: 2,
    semanas: 3,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }], t2: [{ slotId: 'a', nome: 'Supino Reto Barra' }] },
    progressao: { principais: w, auxiliares: w },
  })
}

test.beforeAll(limparEmuladores)

test('aluno novo: trava o treino, responde com aviso médico e libera', async ({ page }) => {
  const id = await criarAluno('Nina Nova', email('nina'), senha, undefined, true, { anamnese: false, criadoEm: NOVA })
  const mesoId = await mesoDe(id)
  await entrar(page, email('nina'))
  await expect(page.getByRole('link', { name: /Responda a anamnese \(3 min\)/ })).toBeVisible() // cartão do Início

  await page.goto(`/#/treino/${mesoId}/1/1`)
  await expect(page.getByRole('button', { name: 'Iniciar treino' })).toHaveCount(0)
  await page.getByRole('link', { name: 'Responda a anamnese (3 min)' }).click()

  await expect(page.getByText('Etapa 1 de 5')).toBeVisible()
  await expect(proximo(page)).toBeDisabled() // PAR-Q sem resposta
  await responder(page, ['coracao'])
  await expect(page.getByText('Procure seu médico antes de treinar forte.')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)

  await page.goto(`/#/treino/${mesoId}/1/1`)
  await expect(page.getByRole('button', { name: 'Iniciar treino' })).toBeVisible()
  await expect.poll(async () => (await listarDocs('anamneses')).filter((d) => d.fields.alunoId.stringValue === id && d.fields.origem.stringValue === 'aluno').length).toBe(1)
  const doc = (await listarDocs('anamneses')).find((d) => d.fields.alunoId.stringValue === id)!
  expect(doc.fields.r.mapValue.fields.coracao.booleanValue).toBe(true)
  expect(doc.fields.r.mapValue.fields.responsavelConfirmou).toBeUndefined() // não é menor: o campo não vai
})

test('aluno atual sem anamnese: só o cartão, o treino não trava', async ({ page }) => {
  const id = await criarAluno('Ari Atual', email('ari'), senha, undefined, true, { anamnese: false })
  const mesoId = await mesoDe(id)
  await entrar(page, email('ari'))
  await expect(page.getByRole('link', { name: /Responda a anamnese \(3 min\)/ })).toBeVisible()
  await page.goto(`/#/treino/${mesoId}/1/1`)
  await expect(page.getByRole('button', { name: 'Iniciar treino' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Responda a anamnese/ })).toHaveCount(0)
})

test('coach abrindo o treino de aluno novo não trava', async ({ page }) => {
  await criarCoach('Victor', email('victor'), senha)
  const id = await criarAluno('Rui Recente', email('rui'), senha, undefined, true, { anamnese: false, criadoEm: NOVA })
  await mesoDe(id)
  await entrar(page, email('victor'), /Início/)
  await page.goto(`/#/aluno/${id}`)
  await page.getByRole('button', { name: 'Treino presencial' }).click()
  await expect(page.getByRole('button', { name: 'Iniciar treino' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Responda a anamnese/ })).toHaveCount(0)
})

test('"tempo parado" some quando a experiência é "nunca"', async ({ page }) => {
  await criarAluno('Teo Tempo', email('teo'), senha, undefined, true, { anamnese: false })
  await entrar(page, email('teo'))
  await page.goto('/#/anamnese')
  for (const p of PARQ) await marcar(page, p.rotulo, 'Não')
  for (let i = 0; i < ETAPAS - 1; i++) await proximo(page).click()
  const tempo = page.getByText('Está parado há quanto tempo?')
  await expect(tempo).toBeVisible()
  await page.getByRole('button', { name: 'Nunca treinei' }).click()
  await expect(tempo).toHaveCount(0)
})

test('fim de ciclo: "Nada mudou" reenvia as respostas como versão nova', async ({ page }) => {
  const id = await criarAluno('Cida Ciclo', email('cida'), senha, undefined, true, { anamnese: false })
  await criarAnamnese(id, { coracao: false, dorPeito: false, tontura: false, doencaCronica: false, remedio: false, ossoArticulacao: false, supervisaoMedica: false, declaracao: true, dores: ['joelho'] }, ANTIGA(60))
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  await criarMeso({
    alunoId: id, nome: 'Meso Velho', frequencia: 1, semanas: 2, pausaS: 60,
    inicio: new Date(Date.now() - 20 * 86_400_000 - 3 * 3600_000).toISOString().slice(0, 10), // terminou há ~6 dias
    divisao: { t1: [{ slotId: 'a', nome: 'Supino Reto Barra' }] }, progressao: { principais: w, auxiliares: w },
  })
  await entrar(page, email('cida'))
  await page.getByRole('link', { name: /Confirme sua anamnese/ }).click()
  await expect(page.getByText(/joelho/i)).toBeVisible() // resumo da última resposta
  await page.getByRole('button', { name: 'Nada mudou' }).click()
  await expect(page.getByRole('heading', { name: 'Anamnese enviada' })).toBeVisible()
  await page.getByRole('button', { name: 'Ir para o início' }).click()
  await expect(page.getByRole('link', { name: /Confirme sua anamnese/ })).toHaveCount(0)
  await expect.poll(async () => (await listarDocs('anamneses')).filter((d) => d.fields.alunoId.stringValue === id).length).toBe(2)
})

test('menor de 18 precisa da autorização do responsável', async ({ page }) => {
  const id = await criarAluno('Davi Menor', email('davi'), senha, undefined, true, { anamnese: false })
  await entrar(page, email('davi'))
  await page.goto('/#/anamnese')
  for (const p of PARQ) await marcar(page, p.rotulo, 'Não')
  await expect(proximo(page)).toBeEnabled()
  await page.getByRole('checkbox', { name: 'Tenho menos de 18 anos' }).click()
  await expect(proximo(page)).toBeDisabled()
  await page.getByRole('checkbox', { name: 'Meu responsável legal leu e concorda.' }).click()
  await expect(proximo(page)).toBeEnabled()
  for (let i = 0; i < ETAPAS - 1; i++) await proximo(page).click()
  await page.getByRole('checkbox', { name: /Respondi com verdade/ }).click()
  await page.getByRole('button', { name: 'Enviar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Anamnese enviada' })).toBeVisible()
  await expect.poll(async () => (await listarDocs('anamneses')).filter((d) => d.fields.alunoId.stringValue === id).length).toBe(1)
  const doc = (await listarDocs('anamneses')).find((d) => d.fields.alunoId.stringValue === id)!
  expect(doc.fields.r.mapValue.fields.responsavelConfirmou.booleanValue).toBe(true)
})

test('envio offline sincroniza ao voltar a internet', async ({ page, context }) => {
  const id = await criarAluno('Eva Offline', email('eva'), senha, undefined, true, { anamnese: false })
  await entrar(page, email('eva'))
  await page.goto('/#/anamnese')
  await expect(page.getByText('Etapa 1 de 5')).toBeVisible()
  await context.setOffline(true)
  await responder(page)
  expect((await listarDocs('anamneses')).filter((d) => d.fields.alunoId.stringValue === id)).toHaveLength(0)
  await context.setOffline(false)
  await expect.poll(async () => (await listarDocs('anamneses')).filter((d) => d.fields.alunoId.stringValue === id).length, { timeout: 20_000 }).toBe(1)
  await expect.poll(() => page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('anamnese-rascunho-')).length), { timeout: 20_000 }).toBe(0) // rascunho apagado ao sincronizar
})
