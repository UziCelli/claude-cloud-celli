import { expect, test, devices } from '@playwright/test'
import { criarAluno, criarCoach, criarMeso, hojeSaoPaulo, lerDoc, limparEmuladores } from './seed'
const COACH = {nome:'Victor',email:'coach.iso@teste.com',senha:'senha123'}
const ALUNO = {nome:'Bia Iso',email:'aluno.iso@teste.com',senha:'senha123'}
const NOME = 'Prancha Frontal Isométrica (cotovelos)'
test.use({...devices['Pixel 7']})

test('isometria: 3×30 s, cronômetro por série, segundos persistem offline e coach vê tensão separada do volume', async ({page,browser,context}) => {
  test.setTimeout(90_000)
  await limparEmuladores()
  await criarCoach(COACH.nome,COACH.email,COACH.senha)
  const alunoId = await criarAluno(ALUNO.nome,ALUNO.email,ALUNO.senha,80)
  const mesoId = await criarMeso({alunoId,nome:'Meso isometria',frequencia:1,semanas:2,inicio:hojeSaoPaulo(),pausaS:60,
    divisao:{t1:[{slotId:'supino',nome:'Supino Reto Barra'},{slotId:'prancha',nome:NOME}]},
    progressao:{principais:{w1:[8,8,8],w2:[8,8,8]},auxiliares:{w1:[8,8,8],w2:[8,8,8]}}})
  await page.goto('/')
  await page.getByLabel('E-mail').fill(ALUNO.email); await page.getByLabel('Senha').fill(ALUNO.senha)
  await page.getByRole('button',{name:'Entrar',exact:true}).click()
  await page.getByRole('navigation',{name:'Menu'}).getByRole('link',{name:'Treino',exact:true}).click()
  await page.getByRole('button',{name:/Treino 1/}).click()
  const iso = page.locator('.rounded-xl.border').filter({hasText:NOME})
  await expect(iso.getByText('30 s',{exact:true})).toHaveCount(3)
  await expect(iso.getByRole('button',{name:`Cronometrar ${NOME}, S1, 30 segundos`})).toBeDisabled()
  await page.getByRole('button',{name:'Iniciar treino',exact:true}).click()
  const supino=page.locator('.rounded-xl.border').filter({hasText:'Supino Reto Barra'})
  for(let k=0;k<3;k++) { const kg=supino.locator('input[inputmode="decimal"]').nth(k*2); await kg.fill('10');await kg.blur() }
  await iso.getByRole('button',{name:`Cronometrar ${NOME}, S1, 30 segundos`}).click()
  await expect(page.getByText('Isometria · série em andamento',{exact:true})).toBeVisible()
  await expect(page.getByText('Isometria · série em andamento',{exact:true})).toHaveCount(0,{timeout:35_000})
  for(let k=0;k<3;k++) { const kg=iso.locator('input[inputmode="decimal"]').nth(k*2);await kg.fill('5');await kg.blur() }
  await context.setOffline(true)
  for(const [k,s] of [25,30,35].entries()) {
    const campo = iso.getByLabel(`${NOME}, S${k+1}, segundos feitos`)
    await campo.fill(String(s));await campo.blur()
  }
  await expect(page.getByRole('status').filter({hasText:'Tempo sob tensão: 90 s'})).toBeVisible()
  await page.setViewportSize({width:360,height:800})
  await iso.screenshot({path:test.info().outputPath('isometria-360.png'),animations:'disabled'})
  await context.setOffline(false)
  const regId=`${mesoId}_s01_t1`
  await expect.poll(async()=> {
    const d=await lerDoc(`registros/${regId}`) as any
    return Number(d?.fields?.reps?.mapValue?.fields?.prancha?.mapValue?.fields?.s3?.integerValue)
  }).toBe(35)
  const ctx=await browser.newContext(); const pc=await ctx.newPage()
  await pc.goto('/');await pc.getByLabel('E-mail').fill(COACH.email);await pc.getByLabel('Senha').fill(COACH.senha)
  await pc.getByRole('button',{name:'Entrar',exact:true}).click()
  await expect(pc.getByRole('heading',{name:/^Início/})).toBeVisible()
  await pc.goto(`/#/meso/${mesoId}/semana/1`)
  const linha=pc.locator('tr').filter({hasText:NOME}).first()
  await expect(linha.getByText('30→25 s',{exact:true})).toBeVisible()
  await expect(linha.getByText('90 s',{exact:true})).toBeVisible()
  await expect(linha.locator('td').last()).toHaveText('—')
  const dinamico=pc.locator('tr').filter({hasText:'Supino Reto Barra'}).first()
  await expect(dinamico.locator('td').last()).toHaveText('240')
  await ctx.close()
})
