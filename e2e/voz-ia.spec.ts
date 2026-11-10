import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'

const COACH = { nome: 'Victor', email: 'victor.voz@teste.com', senha: 'senha123' }
const CHAVE = 'sk-ant-api03-chave-de-teste-123456'

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
})

test('cadastra a chave, dita sem o texto voltar, mexe na divisão, progressão e métodos (API simulada)', async ({ page }) => {
  const alunoId = await criarAluno('Voz Teste', 'voz.e2e@teste.com', 'senha123')
  const linha = { w1: [10, 10, 10, null, null, null] }
  const id = await criarMeso({
    alunoId, nome: 'Meso Voz', frequencia: 2, semanas: 1, inicio: hojeSaoPaulo(), pausaS: 60,
    divisao: { t1: [{ slotId: 'a1', nome: 'Agachamento Livre Halter' }] }, progressao: { principais: linha, auxiliares: linha },
  })

  // Microfone de mentira: window.__falar(texto) entrega a fala à escuta que estiver ligada.
  await page.addInitScript(() => {
    class Falso {
      lang = ''
      continuous = false
      interimResults = false
      onresult: ((e: unknown) => void) | null = null
      onerror: ((e: unknown) => void) | null = null
      onend: (() => void) | null = null
      start() {
        ;(window as unknown as { __mic: Falso[] }).__mic.push(this)
      }
      stop() {
        setTimeout(() => this.onend?.(), 0)
      }
      abort() {}
    }
    ;(window as unknown as { __mic: Falso[] }).__mic = []
    for (const nome of ['SpeechRecognition', 'webkitSpeechRecognition']) Object.defineProperty(window, nome, { value: Falso, configurable: true, writable: true })
    ;(window as unknown as { __falar: (t: string, i?: number) => void }).__falar = (t, i = -1) => {
      const lista = (window as unknown as { __mic: Falso[] }).__mic
      const m = lista.at(i)
      m?.onresult?.({ results: [{ 0: { transcript: t }, isFinal: true }] })
    }
  })

  let cabecalhos: Record<string, string> = {}
  let corpoEnviado = ''
  let acoes: unknown = []
  let avisos: unknown = []
  await page.route('https://api.anthropic.com/v1/messages', async (rota) => {
    cabecalhos = rota.request().headers()
    corpoEnviado = rota.request().postData() ?? ''
    await rota.fulfill({ json: { content: [{ type: 'tool_use', name: 'montar_treinos', input: { acoes, avisos } }] } })
  })

  await page.goto('/')
  await page.getByLabel('E-mail').fill(COACH.email)
  await page.getByLabel('Senha').fill(COACH.senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Início' })).toBeVisible()

  // Sem chave, o editor avisa onde cadastrar.
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Divisão', exact: true }).click()
  await page.getByRole('button', { name: 'Montar o meso por voz' }).click()
  await expect(page.getByText('Falta cadastrar a chave da IA')).toBeVisible()

  // Chave torta é recusada; a certa é gravada e só o fim aparece na tela.
  await page.goto('/#/conta')
  await page.getByLabel('Chave da API (sk-ant-…)').fill('abc')
  await page.getByRole('button', { name: 'Salvar chave' }).click()
  await expect(page.getByText('Essa chave não parece certa')).toBeVisible()
  await page.getByLabel('Chave da API (sk-ant-…)').fill(CHAVE)
  await page.getByRole('button', { name: 'Salvar chave' }).click()
  await expect(page.getByText('Chave salva.')).toBeVisible()
  await expect(page.getByText('sk-ant-…3456')).toBeVisible()
  await expect(page.getByText(CHAVE)).toHaveCount(0)
  expect(JSON.stringify(await lerDoc('segredos/ia'))).toContain(CHAVE)

  // O ditado não reescreve o que foi apagado: mexer no texto desliga o microfone e a fala atrasada é ignorada.
  await page.goto(`/#/meso/${id}`)
  await page.getByRole('button', { name: 'Divisão', exact: true }).click()
  await page.getByRole('button', { name: 'Montar o meso por voz' }).click()
  const campo = page.getByLabel('O que você falou')
  await page.getByRole('button', { name: 'Falar' }).click()
  await page.evaluate(() => (window as any).__falar('adiciona rosca no treino um'))
  await expect(campo).toHaveValue('adiciona rosca no treino um')
  await campo.fill('')
  await expect(page.getByRole('button', { name: 'Falar' })).toBeVisible() // microfone desligou
  await page.evaluate(() => (window as any).__falar('palavra antiga')) // fala atrasada da escuta cancelada
  await expect(campo).toHaveValue('')
  await page.getByRole('button', { name: 'Falar' }).click()
  await page.evaluate(() => (window as any).__falar('so isto'))
  await expect(campo).toHaveValue('so isto')
  await page.getByRole('button', { name: 'Parar' }).click()
  await page.getByRole('button', { name: 'Limpar' }).click()
  await expect(campo).toHaveValue('')

  // Adicionar: entra no fim, o exercício que já estava fica; treino vazio é montado; aviso da IA aparece.
  acoes = [
    { acao: 'adicionar', treino: 1, exercicios: ['Rosca Inventada'] },
    { acao: 'definir', treino: 2, exercicios: ['agachamento livre barra'] },
    { acao: 'adicionar', treino: 9, exercicios: ['Fora'] },
  ]
  avisos = ['Remover exercício não dá para fazer aqui.']
  await campo.fill('rosca no treino um e agachamento no dois')
  await page.getByRole('button', { name: 'Montar', exact: true }).click()
  const proposta = page.getByTestId('proposta-ia')
  await expect(proposta.getByText('Treino 1 · Adicionar')).toBeVisible()
  await expect(proposta.getByText('Treino 2 · Refazer a lista')).toBeVisible()
  await expect(proposta.getByText('Rosca Inventada')).toBeVisible()
  await expect(proposta.getByText('fora do catálogo')).toHaveCount(1)
  await expect(proposta.getByText('Treino 9')).toHaveCount(0)
  await expect(proposta.getByText('Remover exercício não dá para fazer aqui.')).toBeVisible()
  expect(cabecalhos['x-api-key']).toBe(CHAVE)
  expect(cabecalhos['anthropic-dangerous-direct-browser-access']).toBe('true')
  expect(corpoEnviado).toContain('Treino 1: 1. Agachamento Livre Halter')
  expect(corpoEnviado).toContain('Treino 2: (vazio)')

  await page.getByRole('button', { name: 'Aplicar no editor' }).click()
  await expect(page.getByText('Pronto: Treino 1: +1')).toBeVisible()
  const t1 = page.getByTestId('treino-1').getByRole('combobox')
  await expect(t1.nth(0)).toHaveValue('Agachamento Livre Halter')
  await expect(t1.nth(1)).toHaveValue('Rosca Inventada')
  await expect(page.getByTestId('treino-2').getByRole('combobox').first()).toHaveValue('Agachamento Livre Barra')
  await expect(campo).toHaveValue('')

  // Substituir: troca só aquele exercício, na mesma posição.
  acoes = [{ acao: 'substituir', treino: 1, de: 'rosca', por: 'Leg Press 45' }]
  avisos = []
  await campo.fill('troca a rosca por leg press no treino um')
  await page.getByRole('button', { name: 'Montar', exact: true }).click()
  await expect(page.getByTestId('proposta-ia').getByText('Treino 1 · Trocar')).toBeVisible()
  expect(corpoEnviado).toContain('2. Rosca Inventada')
  await page.getByRole('button', { name: 'Aplicar no editor' }).click()
  await expect(t1.nth(0)).toHaveValue('Agachamento Livre Halter')
  await expect(t1.nth(1)).toHaveValue('Leg Press 45')

  // Progressão e método no mesmo pedido: prévia em texto e aplicados no exercício certo.
  acoes = [
    { acao: 'metodo', treino: 1, exercicio: 'leg press', metodo: 'Dropset' },
    { acao: 'progressao', treino: 1, exercicio: 'leg press', reps: [15, 15] },
  ]
  await campo.fill('leg press do treino um 2x15 com dropset')
  await page.getByRole('button', { name: 'Montar', exact: true }).click()
  const p2 = page.getByTestId('proposta-ia')
  await expect(p2.getByText('Treino 1 · Séries e reps')).toBeVisible()
  await expect(p2.getByText('leg press (Treino 1) · todas as semanas · 2 séries: 15, 15')).toBeVisible()
  await expect(p2.getByText('Dropset · leg press · todas as semanas')).toBeVisible()
  expect(corpoEnviado).toContain('O meso tem 1 semana.')
  await page.getByRole('button', { name: 'Aplicar no editor' }).click()
  await expect(page.getByText('Pronto: Treino 1, Leg Press 45: 15, 15 · Treino 1, Leg Press 45: Dropset')).toBeVisible()
})
