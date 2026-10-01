import { initializeApp, type FirebaseApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { connectAuthEmulator, getAuth, inMemoryPersistence, initializeAuth, type Auth } from 'firebase/auth'
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'

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
const protegerApp = (a: FirebaseApp) => {
  if (!emulador && env.VITE_RECAPTCHA_KEY)
    initializeAppCheck(a, { provider: new ReCaptchaV3Provider(env.VITE_RECAPTCHA_KEY), isTokenAutoRefreshEnabled: true })
}
protegerApp(app)

export const auth = getAuth(app)
auth.languageCode = 'pt-BR' // e-mails do Firebase (ex.: recuperar senha) em português
// Cache persistente (IndexedDB) = funciona offline, em várias abas.
// ignoreUndefinedProperties: campos opcionais do motor (ex.: metodos[].serie) podem vir undefined.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  ignoreUndefinedProperties: true,
})

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
