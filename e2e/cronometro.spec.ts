import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarMeso, criarRegistro, lerDoc, limparEmuladores } from './seed'

// Cronômetro fantasma: treino antigo reaberto ("Desfazer") ou esquecido aberto não pode mostrar horas falsas.
test.use({ ...devices['Pixel 7'] })
test.describe.configure({ mode: 'serial' })

const ALUNO = { nome: 'Teo Cronometro', email: 'teo.cronometro-e2e@teste.com', senha: 'senha123' }
const H = 3600_000
const prog = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
const dia = (msAtras: number) => new Date(Date.now() - 3 * H - msAtras).toISOString().slice(0, 10)

let alunoId: string
test.beforeAll(async () => {
  await limparEmuladores()
  alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
})

const meso = (nome: string, inicio: string) =>
  criarMeso({
    alunoId, nome, frequencia: 2, semanas: 2, inicio, pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Agachamento Livre Halter' }], t2: [{ slotId: 'a', nome: 'Supino Reto Barra' }] },
    progressao: { principais: prog, auxiliares: prog },
  })

async function entrar(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email)
  await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('navigation', { name: 'Menu' })).toBeVisible()
}

test('Desfazer num treino antigo mantém a duração, não revive o relógio e não muda a hora do fim', async ({ page }) => {
  const id = await meso('Meso Fechado', dia(8 * 24 * H)) // semana 1 já passou
  const inicio = Date.now() - 80 * H
  const fim = inicio + 50 * 60_000
  const regId = await criarRegistro(id, alunoId, 1, 1, { cargas: { a: { s1: 20, s2: 20, s3: 20 } }, realizado: true, inicioEm: new Date(inicio), realizadoEm: new Date(fim) })
  await entrar(page)
  await page.goto(`/#/treino/${id}/1/1`)
  await expect(page.getByText('Duração do treino')).toBeVisible()
  await expect(page.getByText('50:00')).toBeVisible()

  await page.getByRole('button', { name: 'Desfazer', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Concluir treino' })).toBeVisible()
  await expect(page.getByText('Semana 1 já passou.')).toHaveCount(0) // não tranca a semana antiga
  await expect(page.getByRole('timer')).toHaveCount(0) // sem relógio contando de 80 h atrás
  await expect(page.getByRole('button', { name: 'Cancelar treino' })).toHaveCount(0) // e sem apagar as cargas por engano
  await expect(page.getByText('50:00')).toBeVisible()

  await page.getByRole('button', { name: 'Concluir treino' }).click()
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible()
  await expect(page.getByText('50:00')).toBeVisible()
  await expect.poll(async () => ((await lerDoc(`registros/${regId}`))?.fields as any)?.realizado?.booleanValue).toBe(true)
  const f = ((await lerDoc(`registros/${regId}`))?.fields ?? {}) as Record<string, any>
  expect(Date.parse(f.realizadoEm.timestampValue)).toBe(fim) // continua feito no dia original, não hoje
})

test('treino esquecido aberto há 80 h não mostra horas falsas', async ({ page }) => {
  const id = await meso('Meso Atual', dia(0))
  await criarRegistro(id, alunoId, 1, 1, { inicioEm: new Date(Date.now() - 80 * H) })
  await entrar(page)
  await page.goto(`/#/treino/${id}/1/1`)
  await expect(page.getByTestId('relogio-treino')).toHaveText('mais de 3 h')

  await page.getByRole('button', { name: 'Concluir treino' }).click()
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible()
  await expect(page.getByText('Duração', { exact: true })).toHaveCount(0) // sem duração falsa no story
})

test('treino importado da planilha (fim sem início): Desfazer mostra Iniciar e concluir grava a hora nova', async ({ page }) => {
  const id = await meso('Meso Importado', dia(8 * 24 * H)) // semana 1 já passou
  const antes = Date.now() - 5 * 24 * H
  const regId = await criarRegistro(id, alunoId, 1, 1, { cargas: { a: { s1: 20, s2: 20, s3: 20 } }, realizado: true, realizadoEm: new Date(antes) })
  await entrar(page)
  await page.goto(`/#/treino/${id}/1/1`)
  await expect(page.getByText('Treino concluído')).toBeVisible()

  await page.getByRole('button', { name: 'Desfazer', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Iniciar treino' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Concluir treino' })).toHaveCount(0)
  await expect(page.getByText('Semana 1 já passou.')).toHaveCount(0)

  await page.getByRole('button', { name: 'Iniciar treino' }).click()
  await page.getByRole('button', { name: 'Concluir treino' }).click()
  await expect(page.getByRole('heading', { name: 'Treino concluído' })).toBeVisible()
  await expect(page.getByText('Duração', { exact: true })).toBeVisible()
  await expect
    .poll(async () => Date.parse(((await lerDoc(`registros/${regId}`))?.fields as any)?.realizadoEm?.timestampValue ?? 0))
    .toBeGreaterThan(antes)
})
