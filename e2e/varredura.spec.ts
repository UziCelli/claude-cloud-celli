// Varredura: visita cada tela (coach, aluno, públicas) em 1280px e 390px e falha com erro de página,
// console.error, rolagem horizontal ou texto "undefined"/"NaN" visível. Tira print de cada tela.
import { expect, test, type Page } from '@playwright/test'
import { criarAluno, criarAlunoArquivado, criarCoach, criarMeso, criarRegistro, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { nome: 'Victor Varredura', email: 'victor.varr-e2e@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Ana Varredura', email: 'ana.varr-e2e@teste.com', senha: 'senha123' }
let alunoId = ''
let mesoId = ''

// Ruído ignorado: reCAPTCHA/App Check (gstatic, recaptcha) e erros de rede de recursos externos
// bloqueados no ambiente de teste (ERR_NAME_NOT_RESOLVED etc.). Nada do código do app é ignorado.
const RUIDO = /recaptcha|gstatic|google\.com\/recaptcha|app check|appcheck|ERR_(NAME_NOT_RESOLVED|INTERNET_DISCONNECTED|CONNECTION|PROXY|TUNNEL)/i

test.beforeAll(async () => {
  await limparEmuladores()
  await criarCoach(COACH.nome, COACH.email, COACH.senha)
  alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  await criarAlunoArquivado('Caio Arquivado', 'caio.varr-e2e@teste.com', 'senha123')
  const w = { w1: [8, 8, 8, null, null, null], w2: [8, 8, 8, null, null, null], w3: [8, 8, 8, null, null, null] }
  mesoId = await criarMeso({
    alunoId,
    nome: 'Meso Varredura',
    frequencia: 2,
    semanas: 3,
    inicio: hojeSaoPaulo(),
    pausaS: 60,
    divisao: {
      t1: [{ slotId: 'a', nome: 'Desenvolvimento Militar Barra' }, { slotId: 'b', nome: 'Supino Reto Barra' }],
      t2: [{ slotId: 'a', nome: 'Rosca Direta Barra' }, { slotId: 'b', nome: 'Agachamento Livre Halter' }],
    },
    metodos: [
      { ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Dropset', escopo: 'Série específica', serie: 3, pausaInternaS: 10, blocos: 1, etapas: 2, reducaoCarga: 20 },
    ],
    progressao: { principais: w, auxiliares: w },
  })
  await criarRegistro(mesoId, alunoId, 1, 1, { cargas: { a: { s1: 20 } }, realizado: true, realizadoEm: new Date() })
})

async function entrar(page: Page, email: string, senha: string, esperado: string) {
  await page.goto('/')
  await page.getByLabel('E-mail').fill(email)
  await page.getByLabel('Senha').fill(senha)
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(page.getByText(esperado).first()).toBeVisible()
}

for (const largura of [1280, 390]) {
  test(`varredura ${largura}px`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: largura, height: largura > 500 ? 800 : 844 }, locale: 'pt-BR' })
    let page = await ctx.newPage()
    const erros: string[] = []
    const ouvir = (p: Page) => {
      p.on('pageerror', (e) => erros.push(`pageerror: ${e.message}`))
      p.on('console', (m) => {
        if (m.type() === 'error' && !RUIDO.test(m.text() + ' ' + (m.location().url ?? ''))) erros.push(`console.error: ${m.text()} (${m.location().url})`)
      })
    }
    ouvir(page)

    // Confere a tela atual e tira o print. Acumula as falhas em vez de parar na primeira.
    const falhas: string[] = []
    async function confere(tela: string) {
      await page.waitForTimeout(500) // deixa a transição de tela terminar
      const r = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        iw: window.innerWidth,
        ruim: (document.body.innerText.match(/\b(undefined|NaN)\b/g) ?? []).length,
      }))
      if (r.sw > r.iw) falhas.push(`${tela}: rolagem horizontal (${r.sw} > ${r.iw})`)
      if (r.ruim) falhas.push(`${tela}: texto "undefined"/"NaN" visível`)
      for (const e of erros.splice(0)) falhas.push(`${tela}: ${e}`)
      await page.screenshot({ path: `test-results/prints/varredura-${tela}-${largura}.png`, fullPage: true })
    }
    const ir = async (hash: string, visivel: string | RegExp) => {
      await page.goto(hash)
      await expect(page.getByText(visivel).locator('visible=true').first()).toBeVisible()
    }

    // Públicas
    await page.goto('/instalar')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await confere('instalar')
    await page.goto('/privacidade')
    await expect(page.getByRole('heading').first()).toBeVisible()
    await confere('privacidade')

    // Coach
    await entrar(page, COACH.email, COACH.senha, 'Início')
    await expect(page.getByText(ALUNO.nome).first()).toBeVisible()
    await confere('coach-inicio')

    await ir('/#/alunos', ALUNO.email)
    await confere('coach-alunos')
    await page.getByRole('button', { name: /^Arquivados/ }).click()
    await expect(page.getByText('Caio Arquivado').locator('visible=true').first()).toBeVisible()
    await confere('coach-alunos-arquivados')

    await page.goto('/#/alunos/novo')
    await expect(page.getByRole('heading', { name: 'Novo aluno' })).toBeVisible()
    await confere('coach-novo-aluno')

    await ir(`/#/aluno/${alunoId}`, 'Meso Varredura')
    await confere('coach-aluno')
    await ir(`/#/aluno/${alunoId}/evolucao`, 'Evolução')
    await confere('coach-evolucao')
    await ir(`/#/aluno/${alunoId}/presencial`, 'Presencial:')
    await confere('coach-presencial-hoje')
    await ir(`/#/aluno/${alunoId}/presencial/treino/${mesoId}/1/2`, 'Presencial:')
    await expect(page.getByRole('heading', { name: 'Treino 2' })).toBeVisible()
    await confere('coach-presencial-treino')
    await ir('/#/ranking', 'Ranking de evolução')
    await confere('coach-ranking')

    await page.goto(`/#/meso/${mesoId}`)
    await expect(page.getByRole('button', { name: 'Divisão', exact: true })).toBeVisible()
    for (const aba of ['Config', 'Divisão', 'Progressão', 'Métodos']) {
      await page.getByRole('button', { name: aba, exact: true }).click()
      if (aba === 'Progressão') await page.getByRole('button', { name: 'Calcular prévia' }).click()
      await confere(`coach-meso-${aba.toLowerCase().replace('ç', 'c').replace('ã', 'a').replace('é', 'e')}`)
    }

    await ir(`/#/meso/${mesoId}/semana/1`, 'Semana 1 de 3')
    await confere('coach-semana')
    await page.goto('/#/conta')
    await expect(page.getByRole('heading', { name: 'Minha conta' })).toBeVisible()
    await confere('coach-conta')
    await page.goto('/#/metodos')
    await expect(page.getByRole('heading').first()).toBeVisible()
    await confere('coach-metodos')

    // Aluno (contexto limpo, para não herdar a sessão do coach)
    const ctx2 = await browser.newContext({ viewport: { width: largura, height: largura > 500 ? 800 : 844 }, locale: 'pt-BR' })
    page = await ctx2.newPage()
    ouvir(page)
    await entrar(page, ALUNO.email, ALUNO.senha, 'Semana 1 de 3')
    await confere('aluno-inicio')
    await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Treino', exact: true }).click()
    await expect(page.getByText('Semana 1 de 3').first()).toBeVisible()
    await confere('aluno-hoje')
    await page.getByRole('button', { name: /Treino 1/ }).click()
    await expect(page.getByRole('heading', { name: 'Treino 1' })).toBeVisible()
    await page.getByRole('dialog', { name: 'Métodos deste treino' }).getByRole('button', { name: 'Entendi', exact: true }).click()
    await confere('aluno-treino')
    await ir('/#/evolucao', 'Evolução')
    await confere('aluno-evolucao')
    await ir('/#/conta', 'Como usar')
    await confere('aluno-conta')
    await page.goto('/#/metodos')
    await expect(page.getByRole('heading').first()).toBeVisible()
    await confere('aluno-metodos')

    await ctx2.close()
    await ctx.close()
    expect(falhas, falhas.join('\n')).toEqual([])
  })
}
