import { initializeApp, type FirebaseApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider, type AppCheck } from 'firebase/app-check'
import { connectAuthEmulator, getAuth, inMemoryPersistence, initializeAuth, type Auth } from 'firebase/auth'
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  terminate,
  clearIndexedDbPersistence,
  waitForPendingWrites,
} from 'firebase/firestore'
import { sincronizarAntesDeSair } from './saidaSegura'

const env = import.meta.env
// Sem chave (ou VITE_USE_EMULATOR=1): usa os emuladores locais (npm run emuladores).
const emulador = env.VITE_USE_EMULATOR === '1' || !env.VITE_FIREBASE_API_KEY

const config = emulador
  ? { apiKey: 'demo-key', projectId: 'demo-forca' }
  : {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    }
const app = initializeApp(config)

// App Check (reCAPTCHA v3): só liga com a chave em .env.production e fora do emulador (docs/seguranca.md).
const protegerApp = (a: FirebaseApp): AppCheck | undefined =>
  !emulador && env.VITE_RECAPTCHA_KEY
    ? initializeAppCheck(a, { provider: new ReCaptchaEnterpriseProvider(env.VITE_RECAPTCHA_KEY), isTokenAutoRefreshEnabled: true })
    : undefined
// Exportado para o push mandar o token ao Worker (ele lê o Firestore em nome do usuário). Sem chave = undefined.
export const appCheck = protegerApp(app)

export const auth = getAuth(app)
auth.languageCode = 'pt-BR' // e-mails do Firebase (ex.: recuperar senha) em português
// Cache persistente (IndexedDB) = funciona offline, em várias abas.
// ignoreUndefinedProperties: campos opcionais do motor (ex.: metodos[].serie) podem vir undefined.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  ignoreUndefinedProperties: true,
})

// As outras abas precisam fechar o Firestore antes de apagar o cache compartilhado.
const canalSaida = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('forca-saida-segura') : null
function bloquearDuranteSaida() {
  const aviso = document.createElement('div')
  aviso.textContent = 'Encerrando a sessão com segurança…'
  aviso.setAttribute('role', 'alert')
  aviso.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#0f172a;color:white;padding:3rem'
  document.body.append(aviso)
  document.activeElement instanceof HTMLElement && document.activeElement.blur()
  document.body.inert = true
}
canalSaida?.addEventListener('message', async ({ data }) => {
  if (data === 'preparar') {
    // Impede novos toques enquanto a aba principal encerra a sessão.
    bloquearDuranteSaida()
    try {
      await sincronizarAntesDeSair(() => waitForPendingWrites(db))
      await terminate(db)
    } catch {
      // Não termina com gravações pendentes: a instância aberta impede a limpeza
      // e a aba principal aborta a saída. Nunca descartar a fila de outra aba.
    }
  }
  if (data === 'concluido' || data === 'reabrir') location.reload()
})

export async function apagarCacheAoSair() {
  bloquearDuranteSaida()
  canalSaida?.postMessage('preparar')
  // Dá às abas ativas a oportunidade de terminar suas instâncias. Aba suspensa/antiga
  // pode impedir a limpeza; nesse caso o Firebase rejeita e não anuncia saída segura.
  await new Promise(r => setTimeout(r, 500))
  await sincronizarAntesDeSair(() => waitForPendingWrites(db))
  await terminate(db)
  await clearIndexedDbPersistence(db)
}
export function concluirSaida() {
  canalSaida?.postMessage('concluido')
  location.reload()
}
export function reabrirAposFalha() {
  canalSaida?.postMessage('reabrir')
  location.reload()
}

if (emulador) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
}

// Segunda instância só para o coach criar contas de aluno: criar conta entra nela como o
// aluno, e assim o login do coach (auth) não muda. Em memória: nada fica salvo no aparelho.
let cadastro: Auth | undefined
export function authCadastro() {
  if (!cadastro) {
    const segunda = initializeApp(config, 'cadastro')
    protegerApp(segunda) // a criação de conta também passa pelo App Check
    cadastro = initializeAuth(segunda, { persistence: inMemoryPersistence })
    if (emulador) connectAuthEmulator(cadastro, 'http://127.0.0.1:9099', { disableWarnings: true })
  }
  return cadastro
}
