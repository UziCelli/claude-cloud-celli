// Desconectar por falta de uso: coach 20 min, aluno 30 min.
import { useEffect, useRef, useState } from 'react'
import { waitForPendingWrites } from 'firebase/firestore'
import { db } from './firebase'
import { sair } from './acoes'

export const LIMITE_MIN = { coach: 20, aluno: 30 } as const
const ATIVIDADE = 'forca-ultima-atividade'
export const AVISO_SAIU = 'forca-saiu-inatividade'

export const expirou = (ultima: number, agora: number, papel: keyof typeof LIMITE_MIN) =>
  agora - ultima >= LIMITE_MIN[papel] * 60_000

const lerUltima = () => {
  try {
    return Number(localStorage.getItem(ATIVIDADE)) || 0
  } catch {
    return 0
  }
}
const marcar = (t = Date.now()) => {
  try {
    localStorage.setItem(ATIVIDADE, String(t))
  } catch {
    /* sem armazenamento */
  }
}

// Cronômetro de descanso rodando (fimEm no futuro) conta como uso.
const cronometroRodando = () => {
  try {
    const s = JSON.parse(localStorage.getItem('forca-descanso') ?? 'null')
    return typeof s?.fimEm === 'number' && s.fimEm > Date.now()
  } catch {
    return false
  }
}

// Devolve true se há aviso "conecte-se" na tela.
export function useInatividade(papel: keyof typeof LIMITE_MIN) {
  const [aviso, setAviso] = useState(false)
  const saindo = useRef(false)
  useEffect(() => {
    if (!lerUltima() || !expirou(lerUltima(), Date.now(), papel)) marcar() // 1ª vez ou ainda válido
    const atividade = () => marcar()
    const volta = () => {
      if (document.visibilityState === 'visible') conferir(true)
    }
    async function conferir(voltou = false) {
      if (cronometroRodando()) marcar()
      if (saindo.current) return
      if (!expirou(lerUltima(), Date.now(), papel)) {
        if (voltou) marcar() // voltar ao app conta como uso (só se ainda não expirou)
        setAviso(false)
        return
      }
      saindo.current = true
      // Só sai com tudo enviado; sem internet, avisa e tenta de novo na próxima conferência.
      const ok = await Promise.race([
        waitForPendingWrites(db).then(() => true, () => false),
        new Promise<boolean>((r) => setTimeout(() => r(false), 5000)),
      ])
      if (!ok) {
        saindo.current = false
        setAviso(true)
        return
      }
      try {
        localStorage.setItem(AVISO_SAIU, '1')
      } catch {
        /* ignora */
      }
      sair()
    }
    const ev = ['pointerdown', 'keydown', 'scroll'] as const
    ev.forEach((e) => addEventListener(e, atividade, { passive: true, capture: true }))
    document.addEventListener('visibilitychange', volta)
    const t = setInterval(() => conferir(), 30_000)
    conferir()
    return () => {
      ev.forEach((e) => removeEventListener(e, atividade, true))
      document.removeEventListener('visibilitychange', volta)
      clearInterval(t)
    }
  }, [papel])
  return aviso
}
