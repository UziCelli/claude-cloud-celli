// Registro de erros do app (coleção `logs`). Só grava com login; antes disso guarda no aparelho.
// Nunca pode quebrar o app: tudo em try/catch e falha ao logar não gera novo log.
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'

export type TipoLog = 'erro' | 'promessa' | 'gravacao' | 'carregando'
type Item = { tipo: TipoLog; mensagem: string; tela: string; versao: string; aparelho: string; online: boolean }
type Contador = { dia: string; n: number }

const FILA = 'forca-logs-fila'
const DIA = 'forca-logs-dia'
export const MAX_DIA = 20
export const MAX_FILA = 20

export const cortar = (s: unknown, n: number) => String(s ?? '').slice(0, n)

export const montarItem = (tipo: TipoLog, mensagem: unknown, c: { tela: string; versao: string; aparelho: string; online: boolean }): Item => ({
  tipo,
  mensagem: cortar(mensagem, 500),
  tela: cortar(c.tela, 100),
  versao: cortar(c.versao, 40),
  aparelho: cortar(c.aparelho, 200),
  online: c.online,
})

// Devolve o contador atualizado, ou null se o limite do dia já foi atingido.
export const contarDia = (c: Contador | null, hoje: string, max = MAX_DIA): Contador | null => {
  const n = c && c.dia === hoje ? c.n : 0
  return n >= max ? null : { dia: hoje, n: n + 1 }
}

// Fila com no máximo `max` itens: descarta os mais antigos.
export const empilhar = <T>(fila: T[], item: T, max = MAX_FILA): T[] => [...fila, item].slice(-max)

const ler = <T>(chave: string, vazio: T): T => {
  try {
    return JSON.parse(localStorage.getItem(chave) ?? '') ?? vazio
  } catch {
    return vazio
  }
}
const gravar = (chave: string, v: unknown) => {
  try {
    localStorage.setItem(chave, JSON.stringify(v))
  } catch {
    /* sem armazenamento */
  }
}

// Erros já registrados como 'gravacao': o 'promessa' automático não repete.
const jaLogados = new WeakSet<object>()

function enviar(i: Item, uid: string) {
  try {
    addDoc(collection(db, 'logs'), { ...i, uid, em: serverTimestamp() }).catch(() => {})
  } catch {
    /* ignora */
  }
}

export function registrarErro(tipo: TipoLog, mensagem: unknown, origem?: unknown) {
  try {
    if (origem && typeof origem === 'object') jaLogados.add(origem)
    const c = contarDia(ler<Contador | null>(DIA, null), new Date().toISOString().slice(0, 10))
    if (!c) return
    gravar(DIA, c)
    const item = montarItem(tipo, mensagem, {
      tela: location.hash,
      versao: __VERSAO__,
      aparelho: navigator.userAgent,
      online: navigator.onLine,
    })
    const uid = auth.currentUser?.uid
    if (uid) enviar(item, uid)
    else gravar(FILA, empilhar(ler<Item[]>(FILA, []), item))
  } catch {
    /* nunca quebra o app */
  }
}

const texto = (e: unknown) => (e instanceof Error ? `${e.name}: ${e.message}` : String(e))

// ---- vigia de carregamento ----
let pronta = false
let etapa = 'auth'
export const telaPronta = () => (pronta = true)
export const etapaCarregando = (e: string) => (etapa = e)

export function iniciarLog() {
  try {
    window.onerror = (msg, _src, lin, col) => {
      registrarErro('erro', `${msg} (${lin}:${col})`)
    }
    window.addEventListener('unhandledrejection', (ev) => {
      if (ev.reason && typeof ev.reason === 'object' && jaLogados.has(ev.reason)) return
      registrarErro('promessa', texto(ev.reason))
    })
    onAuthStateChanged(auth, (u) => {
      try {
        const fila = ler<Item[]>(FILA, [])
        if (!u || !fila.length) return
        gravar(FILA, [])
        fila.forEach((i) => enviar(i, u.uid))
      } catch {
        /* ignora */
      }
    })
    setTimeout(() => {
      if (!pronta) registrarErro('carregando', `Ainda carregando após 15 s. Etapa: ${etapa}`)
    }, 15000)
  } catch {
    /* ignora */
  }
}
