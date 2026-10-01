// Manutenção: verificação em 2 etapas (TOTP) do coach. Roda no GitHub Actions (workflow "2 etapas do coach").
// - ativar-totp: liga o TOTP (app autenticador) no projeto. Exige antes o upgrade para o Identity Platform
//   (console do Firebase -> Authentication -> Configurações -> "Fazer upgrade").
// - desativar-coach: EMERGÊNCIA (o coach perdeu o celular e não consegue o código). Remove os fatores do coach
//   pelo e-mail; no próximo login ele entra só com a senha e ativa de novo em "Minha conta".
// Uso local: ACAO=ativar-totp GOOGLE_APPLICATION_CREDENTIALS=sa.json node mfa.mjs
//            ACAO=desativar-coach EMAIL=coach@x.com GOOGLE_APPLICATION_CREDENTIALS=sa.json node mfa.mjs
import { appendFileSync } from 'node:fs'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const acao = process.env.ACAO?.trim()
const email = process.env.EMAIL?.trim().toLowerCase()

// Mostra no log e no resumo da execução do GitHub Actions.
const avisar = (texto) => {
  console.log(texto)
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${texto}\n\n`)
}

if (acao !== 'ativar-totp' && acao !== 'desativar-coach') throw new Error('Informe ACAO: ativar-totp ou desativar-coach')

initializeApp({ credential: applicationDefault(), projectId: 'forca--app' })

if (acao === 'ativar-totp') {
  try {
    await getAuth().projectConfigManager().updateProjectConfig({
      multiFactorConfig: {
        state: 'ENABLED',
        providerConfigs: [{ state: 'ENABLED', totpProviderConfig: { adjacentIntervals: 5 } }],
      },
    })
    avisar('Verificação em 2 etapas (app autenticador) ligada no projeto. Agora o coach ativa em "Minha conta".')
  } catch (e) {
    avisar(
      'Não foi possível ligar as 2 etapas. Provavelmente falta o upgrade para o Identity Platform (é grátis no plano atual).\n' +
        'Passo no console: Firebase -> Authentication -> Configurações -> "Fazer upgrade". Depois rode este workflow de novo.\n' +
        `Detalhe técnico: ${e.code ?? ''} ${e.message}`,
    )
    process.exitCode = 1
  }
} else {
  if (!email) throw new Error('Informe EMAIL do coach')
  const user = await getAuth().getUserByEmail(email)
  const papel = (await getFirestore().doc(`usuarios/${user.uid}`).get()).get('papel')
  // Só coach: este atalho nunca pode tirar a proteção de um aluno.
  if (papel !== 'coach') throw new Error(`${email} não é coach (papel: ${papel ?? 'sem perfil'}). Nada foi alterado.`)
  const antes = user.multiFactor?.enrolledFactors?.length ?? 0
  await getAuth().updateUser(user.uid, { multiFactor: { enrolledFactors: null } })
  avisar(`2 etapas removidas do coach ${email} (${antes} fator(es)). No próximo login, só a senha; ative de novo em "Minha conta".`)
}
