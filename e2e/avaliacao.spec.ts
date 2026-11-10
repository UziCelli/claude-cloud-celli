import { readFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.av-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Carla Aluna', email: 'carla.av-e2e@teste.com', senha: 'senha123' }
const DOBRAS = ['Peitoral', 'Axilar média', 'Tríceps', 'Subescapular', 'Abdominal', 'Supra-ilíaca', 'Coxa']

const dataBR = (iso: string) => iso.split('-').reverse().join('/')
const amanha = () => new Date(Date.parse(`${hojeSaoPaulo()}T12:00Z`) + 86_400_000).toISOString().slice(0, 10)

async function entrar(page: Page, email: string, senha: string) {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
}

const cabeNaTela = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)
const campo = (page: Page, rotulo: string) => page.getByLabel(rotulo, { exact: true })

test('coach lança, libera e recolhe; o aluno vê a evolução', async ({ browser }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 75)
  const aluno = await (await browser.newContext()).newPage()
  const coach = await (await browser.newContext()).newPage()
  const cartao = aluno.getByRole('link', { name: /Sua avaliação física está pronta/ })

  await entrar(aluno, ALUNO.email, ALUNO.senha)
  await expect(aluno.getByRole('heading', { name: /Olá, Carla/ })).toBeVisible()
  await entrar(coach, COACH.email, COACH.senha)

  // 1ª avaliação: rascunho.
  await coach.goto(`/#/aluno/${alunoId}`)
  await coach.getByRole('button', { name: 'Avaliação física' }).click()
  await coach.getByRole('button', { name: 'Nova avaliação' }).click()
  await expect(campo(coach, 'Peso (kg)')).toHaveValue('75') // vem do perfil
  await campo(coach, 'Peso (kg)').fill('80')
  await campo(coach, 'Altura (cm)').fill('180')
  await coach.getByLabel('Sexo').selectOption('M')
  await campo(coach, 'Idade').fill('30')
  for (const d of DOBRAS) await campo(coach, d).fill('16')
  await campo(coach, 'Cintura').fill('87')
  await campo(coach, 'Braço direito').fill('30')
  await expect(coach.getByLabel('Lipedema nos braços')).toBeVisible()
  await coach.getByLabel('Lipedema nas pernas').check()
  await expect(coach.getByText('16,3%', { exact: true }).first()).toBeVisible()
  expect(await cabeNaTela(coach)).toBe(true)
  await coach.getByRole('button', { name: 'Salvar rascunho' }).click()
  await expect(coach.getByRole('status')).toHaveText('Rascunho salvo.')
  await aluno.waitForTimeout(500)
  await expect(cartao).toHaveCount(0) // rascunho continua escondido

  // Libera: o aluno vê o cartão e a avaliação.
  await coach.getByRole('button', { name: 'Liberar para o aluno' }).click()
  await expect(coach.getByRole('status')).toHaveText('Liberada para o aluno.')
  await expect(coach.getByRole('link', { name: 'Avisar no WhatsApp' })).toBeVisible()
  await cartao.click()
  await expect(aluno.getByRole('heading', { name: `Avaliação de ${dataBR(hojeSaoPaulo())}` })).toBeVisible()
  await expect(aluno.getByText('16,3%', { exact: true }).first()).toBeVisible()
  await expect(aluno.getByText(/primeira avaliação/)).toBeVisible()
  expect(await cabeNaTela(aluno)).toBe(true)

  // 2ª avaliação (dia seguinte, peso 78): compara com a 1ª.
  await coach.goto(`/#/aluno/${alunoId}/avaliacoes`)
  await expect(coach.getByText('Liberada')).toBeVisible()
  await coach.getByRole('button', { name: 'Nova avaliação' }).click()
  await expect(campo(coach, 'Altura (cm)')).toHaveValue('180') // vem da avaliação anterior
  await campo(coach, 'Data').fill(amanha())
  await campo(coach, 'Peso (kg)').fill('78')
  await expect(coach.getByLabel('Lipedema nas pernas')).toBeChecked() // vem da avaliação anterior
  for (const d of DOBRAS) await campo(coach, d).fill('16')
  await campo(coach, 'Braço direito').fill('32')
  await coach.getByRole('button', { name: 'Liberar para o aluno' }).click()
  await expect(coach.getByRole('status')).toHaveText('Liberada para o aluno.')
  await aluno.goto('/#/')
  await expect(aluno.getByRole('link', { name: /Avaliações/ })).toBeVisible()
  await expect(aluno.getByText('Em breve')).toHaveCount(0)
  await cartao.click()
  await expect(aluno.getByRole('heading', { name: `Avaliação de ${dataBR(amanha())}` })).toBeVisible()
  await aluno.getByRole('button', { name: 'Ler o relatório escrito' }).click()
  await expect(aluno.getByText('Peso: 80 kg → 78 kg (−2 kg)')).toBeVisible()
  await aluno.getByRole('button', { name: /^Braços/ }).click()
  await expect(aluno.getByText(/provável ganho de massa/).first()).toBeVisible()
  await expect(aluno.getByText('+2 cm').first()).toBeVisible()
  await expect(aluno.getByRole('link', { name: `Avaliação de ${dataBR(hojeSaoPaulo())}` })).toBeVisible()
  expect(await cabeNaTela(aluno)).toBe(true)
  await aluno.waitForTimeout(900) // termina as animações antes do print
  await aluno.screenshot({ path: `${process.env.PRINTS_DIR ?? 'test-results'}/avaliacao-aluno-390.png`, fullPage: true })

  // PDF da avaliação (com comparação): baixa e é um PDF de verdade.
  const [download] = await Promise.all([aluno.waitForEvent('download'), aluno.getByRole('button', { name: 'Baixar PDF' }).click()])
  expect(download.suggestedFilename()).toBe('avaliacao-fisica.pdf')
  expect((await readFile((await download.path())!)).subarray(0, 5).toString()).toBe('%PDF-')

  // Coach recolhe a 2ª: o aluno volta a ver só a 1ª.
  await coach.getByRole('button', { name: 'Recolher' }).click()
  await expect(coach.getByRole('status')).toHaveText('Avaliação recolhida: o aluno não vê mais.')
  await aluno.goto('/#/')
  await expect(aluno.getByText('Em breve')).toHaveCount(0)
  await cartao.click()
  await expect(aluno.getByRole('heading', { name: `Avaliação de ${dataBR(hojeSaoPaulo())}` })).toBeVisible()
  await expect(aluno.getByText(/78 kg/)).toHaveCount(0)
})
