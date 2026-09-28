import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'

const env = import.meta.env
// Sem chave (ou VITE_USE_EMULATOR=1): usa os emuladores locais (npm run emuladores).
const emulador = env.VITE_USE_EMULATOR === '1' || !env.VITE_FIREBASE_API_KEY

const app = initializeApp(
  emulador
    ? { apiKey: 'demo-key', projectId: 'demo-forca' }
    : {
        apiKey: env.VITE_FIREBASE_API_KEY,
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: env.VITE_FIREBASE_PROJECT_ID,
        appId: env.VITE_FIREBASE_APP_ID,
        storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      },
)

export const auth = getAuth(app)
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
