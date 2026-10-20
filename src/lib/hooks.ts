import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import {
  doc,
  onSnapshot,
  queryEqual,
  refEqual,
  type DocumentReference,
  type FirestoreError,
  type Query,
} from 'firebase/firestore'
import type { Usuario } from './acesso'
import { auth, db } from './firebase'

interface Estado<T> {
  dados: T
  carregando: boolean
  erro: FirestoreError | null
  pendente: boolean // há gravação local ainda não confirmada pelo servidor
  cache: boolean // dados só do aparelho (o servidor ainda não confirmou)
}

// Mantém a mesma referência enquanto o alvo for igual: evita reinscrever a cada render
// quando a tela cria doc()/query() sem useMemo.
function useEstavel<T>(v: T | null, igual: (a: T, b: T) => boolean) {
  const r = useRef(v)
  if (v !== r.current && !(v && r.current && igual(v, r.current))) r.current = v
  return r.current
}

export function useDoc<T>(ref: DocumentReference | null): Estado<T | null> {
  const alvo = useEstavel(ref, refEqual)
  const [e, setE] = useState<Estado<T | null>>({ dados: null, carregando: !!alvo, erro: null, pendente: false, cache: false })
  useEffect(() => {
    if (!alvo) return setE({ dados: null, carregando: false, erro: null, pendente: false, cache: false })
    setE((x) => ({ ...x, carregando: true }))
    return onSnapshot(
      alvo,
      { includeMetadataChanges: true },
      (s) => setE({ dados: s.exists() ? (s.data() as T) : null, carregando: false, erro: null, pendente: s.metadata.hasPendingWrites, cache: s.metadata.fromCache }),
      (erro) => setE({ dados: null, carregando: false, erro, pendente: false, cache: false }),
    )
  }, [alvo])
  return e
}

export function useLista<T>(q: Query | null): Estado<(T & { id: string })[]> {
  const alvo = useEstavel<Query>(q, (a, b) => queryEqual(a, b))
  const [e, setE] = useState<Estado<(T & { id: string })[]>>({ dados: [], carregando: !!alvo, erro: null, pendente: false, cache: false })
  useEffect(() => {
    if (!alvo) return setE({ dados: [], carregando: false, erro: null, pendente: false, cache: false })
    setE((x) => ({ ...x, carregando: true }))
    return onSnapshot(
      alvo,
      { includeMetadataChanges: true },
      (s) =>
        setE({
          dados: s.docs.map((d) => ({ ...(d.data() as T), id: d.id })),
          carregando: false,
          erro: null,
          pendente: s.metadata.hasPendingWrites,
          cache: s.metadata.fromCache,
        }),
      (erro) => setE({ dados: [], carregando: false, erro, pendente: false, cache: false }),
    )
  }, [alvo])
  return e
}

// Aparelho sem conexão (modo avião, sem sinal): tela vazia diz "sem internet" em vez de "nada aqui".
export const TEXTO_SEM_INTERNET = 'Sem internet. Conecte-se para carregar.'
const assinarRede = (cb: () => void) => {
  addEventListener('online', cb)
  addEventListener('offline', cb)
  return () => {
    removeEventListener('online', cb)
    removeEventListener('offline', cb)
  }
}
export const useSemInternet = () => useSyncExternalStore(assinarRede, () => !navigator.onLine)

export function useUsuarioAtual() {
  const [user, setUser] = useState<User | null | undefined>(undefined) // undefined = ainda verificando
  useEffect(() => onAuthStateChanged(auth, setUser), [])
  const perfil = useDoc<Usuario>(user ? doc(db, 'usuarios', user.uid) : null)
  return { user: user ?? null, perfil: perfil.dados, carregando: user === undefined || perfil.carregando }
}

// Data de agora; renderiza de novo quando o app volta a ficar visível (PWA aberto depois da meia-noite).
export function useHoje(): Date {
  const [, atualizar] = useState(0)
  useEffect(() => {
    const f = () => document.visibilityState === 'visible' && atualizar((n) => n + 1)
    document.addEventListener('visibilitychange', f)
    return () => document.removeEventListener('visibilitychange', f)
  }, [])
  return new Date()
}
