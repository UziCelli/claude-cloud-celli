// Manutenção: verificação em 2 etapas (TOTP) do coach. Roda no GitHub Actions (workflow "2 etapas do coach").
// - ativar-totp: liga o TOTP (app autenticador) no projeto. Exige antes o upgrade para o Identity Platform
//   (console do Firebase -> Authentication -> Configurações -> "Fazer upgrade").
// - desativar-coach: EMERGÊNCIA (o coach perdeu o celular e não consegue o código). Remove os fatores do coach
//   pelo e-mail e encerra todas as sessões dele; no próximo login ele entra só com a senha e ativa de novo em "Minha conta".
// - senha-minima: o servidor passa a recusar senha nova com menos de 8 caracteres ou sem número (o app pede também letra).
//   Senhas antigas continuam entrando (forceUpgradeOnSignin: false). Também exige o Identity Platform.
// Uso local: PROJETO=forca--app (ou gislane-personal-trainer) ACAO=ativar-totp GOOGLE_APPLICATION_CREDENTIALS=sa.json node mfa.mjs
//            ACAO=desativar-coach EMAIL=coach@x.com GOOGLE_APPLICATION_CREDENTIALS=sa.json node mfa.mjs
import { appendFileSync } from 'node:fs'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// Projeto SEMPRE explícito (env PROJETO): nunca vem do JSON da credencial nem de padrão. Sem ele, sai.
const PROJETOS = { 'forca--app': 'vfit', 'gislane-personal-trainer': 'gislane' }
const emulador = !!process.env.FIRESTORE_EMULATOR_HOST
const projeto = process.env.PROJETO?.trim()
if (!projeto || !(projeto in PROJETOS || (emulador && projeto.startsWith('demo-')))) {
  console.error(`Informe PROJETO: ${Object.keys(PROJETOS).join(' ou ')} (recebido: ${projeto || 'nada'}).`)
  process.exit(1)
}
const marca = PROJETOS[projeto] ?? projeto

const acao = process.env.ACAO?.trim()
const email = process.env.EMAIL?.trim().toLowerCase()

// Mostra no log e no resumo da execução do GitHub Actions.
const avisar = (texto) => {
  console.log(texto)
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${texto}\n\n`)
}

if (!['ativar-totp', 'desativar-coach', 'senha-minima'].includes(acao)) throw new Error('Informe ACAO: ativar-totp, desativar-coach ou senha-minima')

initializeApp({ ...(emulador ? {} : { credential: applicationDefault() }), projectId: projeto })

if (acao === 'ativar-totp') {
  try {
    await getAuth().projectConfigManager().updateProjectConfig({
      multiFactorConfig: {
        state: 'ENABLED',
        providerConfigs: [{ state: 'ENABLED', totpProviderConfig: { adjacentIntervals: 5 } }],
      },
    })
    avisar(`Verificação em 2 etapas (app autenticador) ligada no projeto ${marca}. Agora o coach ativa em "Minha conta".`)
  } catch (e) {
    avisar(
      'Não foi possível ligar as 2 etapas. Provavelmente falta o upgrade para o Identity Platform (é grátis no plano atual).\n' +
        'Passo no console: Firebase -> Authentication -> Configurações -> "Fazer upgrade". Depois rode este workflow de novo.\n' +
        `Detalhe técnico: ${e.code ?? ''} ${e.message}`,
    )
    process.exitCode = 1
  }
} else if (acao === 'senha-minima') {
  // Mesmo mínimo de src/lib/senha.ts (SENHA_MIN).
  await getAuth().projectConfigManager().updateProjectConfig({
    passwordPolicyConfig: {
      enforcementState: 'ENFORCE',
      forceUpgradeOnSignin: false,
      constraints: { minLength: 8, requireNumeric: true },
    },
  })
  avisar(`Senha mínima ligada no projeto ${marca}: 8 caracteres com número. Quem já tem senha continua entrando.`)
} else {
  if (!email) throw new Error('Informe EMAIL do coach')
  const user = await getAuth().getUserByEmail(email)
  const papel = (await getFirestore().doc(`usuarios/${user.uid}`).get()).get('papel')
  // Só coach: este atalho nunca pode tirar a proteção de um aluno.
  if (papel !== 'coach') throw new Error(`O e-mail informado não é coach (papel: ${papel ?? 'sem perfil'}). Nada foi alterado.`)
  const antes = user.multiFactor?.enrolledFactors?.length ?? 0
  await getAuth().updateUser(user.uid, { multiFactor: { enrolledFactors: null } })
  // Celular perdido/roubado: derruba também as sessões abertas (o app nele sai em até 1 hora).
  await getAuth().revokeRefreshTokens(user.uid)
  avisar(`2 etapas removidas e sessões encerradas do coach (${marca}) (${antes} fator(es)). No próximo login, só a senha; ative de novo em "Minha conta".`)
}
