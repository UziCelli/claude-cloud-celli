import { readFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, criarRegistro, gravarDoc, hojeSaoPaulo, limparEmuladores } from './seed'

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
  await expect(aluno.getByText(/^Desde \d\d\/\d\d\/\d{4} \(1 dia\)\.$/)).toBeVisible()
  await expect(aluno.getByRole('heading', { name: 'Sua evolução' })).toBeVisible()
  await expect(aluno.getByRole('heading', { name: 'O que mais mudou' })).toHaveCount(0)
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

test('treinos entre duas avaliações viram um cartão do segmento com a carga', async ({ page }) => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha)
  const dia = (n: number) => new Date(Date.now() - 3 * 3600_000 - n * 86_400_000).toISOString().slice(0, 10)
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null] }
  const mesoId = await criarMeso({
    alunoId, nome: 'Meso', frequencia: 2, semanas: 2, inicio: dia(30), pausaS: 60,
    divisao: { t1: [{ slotId: 'a', nome: 'Leg Press 45' }], t2: [{ slotId: 'a', nome: 'Leg Press 45' }] },
    progressao: { principais: w, auxiliares: w },
  })
  const feito = (semana: number, treino: number, carga: number, dias: number) =>
    criarRegistro(mesoId, alunoId, semana, treino, { cargas: { a: { s1: carga, s2: carga, s3: carga } }, realizado: true, realizadoEm: new Date(Date.now() - dias * 86_400_000) })
  await feito(1, 1, 200, 20)
  await feito(1, 2, 230, 12)
  const av = (id: string, data: string, coxa: number) =>
    gravarDoc(`avaliacoes/${id}`, { alunoId, data, pesoKg: 70, perimetros: { coxaD: coxa }, dobras: { coxa: 15 }, comentario: '', liberado: true, liberadoEm: new Date() })
  await av('av-1', dia(25), 55)
  await av('av-2', dia(5), 57)

  await entrar(page, ALUNO.email, ALUNO.senha)
  await page.goto('/#/avaliacao/av-2')
  await expect(page.getByRole('heading', { name: 'Sua evolução' })).toBeVisible()
  const cartao = page.getByRole('listitem').filter({ has: page.getByRole('heading', { name: 'Coxas' }) })
  await expect(cartao).toContainText('Leg Press 45: 200 → 230 kg (+15%)')
  await expect(cartao).toContainText('ganho de massa, confirmado pela carga')
  await expect(page.getByRole('img', { name: 'Melhorou: coxas.' })).toBeVisible()
  expect(await cabeNaTela(page)).toBe(true)
  const [pdf] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Baixar PDF' }).click()])
  expect((await readFile((await pdf.path())!)).subarray(0, 5).toString()).toBe('%PDF-')
})
