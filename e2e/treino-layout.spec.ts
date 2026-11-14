import { expect, test } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, limparEmuladores } from './seed'

const COACH = { email: 'coach.layout-treino@teste.com', senha: 'senha123' }
const ALUNO = { nome: 'Bia Layout Treino', email: 'aluno.layout-treino@teste.com', senha: 'senha123' }

test('treino: nomes, métodos e controles não se sobrepõem no aluno e no presencial', async ({ browser }) => {
  await limparEmuladores()
  await criarCoach('Victor', COACH.email, COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome, ALUNO.email, ALUNO.senha, 80)
  const w = { w1: [10, 10, 9, 9] }
  const mesoId = await criarMeso({
    alunoId, nome: 'Meso layout treino', frequencia: 1, semanas: 1, inicio: hojeSaoPaulo(), pausaS: 90,
    divisao: { t1: [{ slotId: 'a', nome: 'Stiff Barra' }, { slotId: 'b', nome: 'Elevação Pélvica Máquina Tradicional' }] },
    progressao: { principais: w, auxiliares: w },
    metodos: [
      { ativo: true, semana: 1, treino: 1, exercicio: 1, metodo: 'Clusterset', escopo: 'Últimas 2 séries', blocos: 2, pausaInternaS: 10 },
      { ativo: true, semana: 1, treino: 1, exercicio: 2, metodo: 'Rest-pause', escopo: 'Série específica', serie: 4, blocos: 2, pausaInternaS: 10 },
    ],
  })
  for (const coach of [false, true]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const page = await context.newPage()
    await page.goto('/')
    const conta = coach ? COACH : ALUNO
    await page.getByLabel('E-mail').fill(conta.email)
    await page.getByLabel('Senha').fill(conta.senha)
    await page.getByRole('button', { name: 'Entrar', exact: true }).click()
    await expect(page.getByRole('navigation', { name: coach ? 'Menu lateral' : 'Menu', exact: true })).toBeVisible()
    await page.goto(coach
      ? `/#/aluno/${alunoId}/presencial/treino/${mesoId}/1/1`
      : `/#/treino/${mesoId}/1/1`)
    const dialog = page.getByRole('dialog', { name: 'Métodos deste treino' })
    await dialog.getByRole('button', { name: 'Não mostrar de novo' }).click()
    await page.getByRole('button', { name: 'Iniciar treino', exact: true }).click()
    const cartoes = page.locator('[data-treino-cartao]')
    await expect(cartoes).toHaveCount(2)
    for (const width of [320, 360, 390, 430]) {
      await page.setViewportSize({ width, height: 844 })
      for (const cartao of await cartoes.all()) {
        const problemas = await cartao.evaluate((card) => {
          const bounds = card.getBoundingClientRect()
          const nodes = [...card.querySelectorAll('[data-treino-nome], [data-treino-controles] button, button.rounded-full')]
          const rects = nodes.map((el) => el.getBoundingClientRect())
          const erros: string[] = []
          nodes.forEach((el, i) => {
            const r = rects[i]
            if (r.left < bounds.left || r.right > bounds.right) erros.push(`fora: ${el.textContent}`)
            for (let j = i + 1; j < rects.length; j++) {
              const b = rects[j]
              if (r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top) erros.push(`sobreposição: ${el.textContent}`)
            }
            if (el.matches('button.rounded-full')) {
              const texto = el.querySelector('span')
              if (texto && texto.getBoundingClientRect().height > parseFloat(getComputedStyle(texto).lineHeight) + 1) erros.push(`método quebrado: ${texto.textContent}`)
            }
          })
          return erros
        })
        expect(problemas, `${coach ? 'presencial' : 'aluno'} ${width}px`).toEqual([])
      }
      if (width === 390) await page.screenshot({ path: test.info().outputPath(`${coach ? 'presencial' : 'aluno'}-390.png`), fullPage: true })
    }
    // Os controles continuam acessíveis e funcionais depois do ajuste de layout.
    await cartoes.first().getByRole('button', { name: 'Descansar 90 s' }).click()
    await expect(page.getByRole('button', { name: 'Pular', exact: true })).toBeVisible()
    if (coach) {
      await cartoes.last().getByRole('button', { name: 'Editar Elevação Pélvica Máquina Tradicional', exact: true }).click()
      await expect(page.getByRole('dialog')).toBeVisible()
    }
    await context.close()
  }
})
