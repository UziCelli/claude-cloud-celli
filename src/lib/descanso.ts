import { useEffect, useRef, useState } from 'react'
import { agendarPush, cancelarPush } from './push'

export const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

const CHAVE = 'forca-descanso'
const CHAVE_SOM = 'forca-descanso-som'

export type EstadoSalvo = { slot: string; fimEm: number | null; total: number; pausadoRestante: number | null }
export type Bipe = { em: number; tons: { freq: number; dur: number; vol: number; atraso: number }[] }

// Bipes que ainda faltam, com o atraso (s) a partir de agora. Marcos: 5,4 médio; 3,2,1 agudo; 0 fim.
export function marcosBipes(restante: number): Bipe[] {
  const out: Bipe[] = []
  for (let m = 5; m >= 0; m--) {
    if (m > restante) continue
    const em = restante - m
    if (m >= 4) out.push({ em, tons: [{ freq: 880, dur: 0.12, vol: 0.3, atraso: 0 }] })
    else if (m >= 1) out.push({ em, tons: [{ freq: 1320, dur: 0.15, vol: 0.6, atraso: 0 }] })
    else
      out.push({
        em,
        tons: [
          { freq: 990, dur: 0.18, vol: 0.6, atraso: 0 },
          { freq: 1480, dur: 0.18, vol: 0.6, atraso: 0.2 },
        ],
      })
  }
  return out
}

// Vibração de cada marco (3,2,1 curto; 0 longo), ou null.
export const vibracaoDoMarco = (m: number): number | number[] | null => (m === 0 ? [400, 150, 400] : m >= 1 && m <= 3 ? 120 : null)

type Armazem = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export function lerEstado(agora: number, arm?: Armazem): EstadoSalvo | null {
  try {
    const s = JSON.parse((arm ?? localStorage).getItem(CHAVE) ?? 'null') as EstadoSalvo | null
    if (!s || typeof s.slot !== 'string' || !(s.total > 0)) return null
    if (s.pausadoRestante != null) return s.pausadoRestante > 0 ? s : null
    return s.fimEm != null && s.fimEm > agora ? s : null
  } catch {
    return null
  }
}

export function gravarEstado(s: EstadoSalvo | null, arm?: Armazem) {
  try {
    const a = arm ?? localStorage
    if (s) a.setItem(CHAVE, JSON.stringify(s))
    else a.removeItem(CHAVE)
  } catch {
    /* sem armazenamento */
  }
}

const lerSom = () => {
  try {
    return localStorage.getItem(CHAVE_SOM) !== '0'
  } catch {
    return true
  }
}

type Oscs = { o: OscillatorNode; g: GainNode }

// Cronômetro de descanso: persistente, com sons (Web Audio), vibração e tela acesa.
export function useDescanso() {
  const inicial = useRef<EstadoSalvo | null | undefined>(undefined)
  if (inicial.current === undefined) inicial.current = lerEstado(Date.now())
  const ini = inicial.current
  const [slot, setSlot] = useState<string | null>(ini?.slot ?? null)
  const [fimEm, setFimEm] = useState<number | null>(ini?.fimEm ?? null)
  const [pausado, setPausado] = useState<number | null>(ini?.pausadoRestante ?? null)
  const [restante, setRestante] = useState(ini?.fimEm ? Math.max(0, Math.round((ini.fimEm - Date.now()) / 1000)) : 0)
  const [total, setTotal] = useState(ini?.total ?? 1)
  const [ciclo, setCiclo] = useState(0)
  const [som, setSom] = useState(lerSom)
  const ctx = useRef<AudioContext | null>(null)
  const agendados = useRef<Oscs[]>([])
  const feitos = useRef(new Set<number>())
  const lock = useRef<WakeLockLike | null>(null)

  const cancelarSons = () => {
    for (const { o, g } of agendados.current)
      try {
        o.stop()
        o.disconnect()
        g.disconnect()
      } catch {
        /* já parou */
      }
    agendados.current = []
  }
  const agendarSons = (segundos: number) => {
    cancelarSons()
    if (!som) return
    try {
      const as = (navigator as unknown as { audioSession?: { type: string } }).audioSession
      if (as) as.type = 'transient'
      const C = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctx.current ??= new C()
      const c = ctx.current
      void c.resume()
      for (const b of marcosBipes(segundos))
        for (const t of b.tons) {
          const ini = c.currentTime + b.em + t.atraso + 0.02
          const o = c.createOscillator()
          const g = c.createGain()
          o.frequency.value = t.freq
          g.gain.setValueAtTime(0, ini)
          g.gain.linearRampToValueAtTime(t.vol, ini + 0.01)
          g.gain.linearRampToValueAtTime(0, ini + t.dur)
          o.connect(g).connect(c.destination)
          o.start(ini)
          o.stop(ini + t.dur + 0.02)
          agendados.current.push({ o, g })
        }
    } catch {
      /* sem áudio */
    }
  }

  useEffect(() => {
    if (fimEm == null) return
    const r0 = Math.max(0, Math.round((fimEm - Date.now()) / 1000))
    feitos.current = new Set([0, 1, 2, 3].filter((m) => m >= r0 && m > 0))
    const tick = () => {
      const r = Math.max(0, Math.round((fimEm - Date.now()) / 1000))
      setRestante(r)
      for (const m of [3, 2, 1, 0])
        if (r <= m && !feitos.current.has(m)) {
          feitos.current.add(m)
          const v = vibracaoDoMarco(m)
          if (v) navigator.vibrate?.(v)
        }
      if (r === 0) {
        setFimEm(null)
        setSlot(null)
      }
    }
    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [fimEm])

  // Persistência
  useEffect(() => {
    gravarEstado(slot ? { slot, fimEm, total, pausadoRestante: pausado } : null)
  }, [slot, fimEm, total, pausado])

  // Tela acesa enquanto roda
  const rodando = fimEm != null
  useEffect(() => {
    if (!rodando) return
    const pedir = async () => {
      try {
        lock.current = (await navigator.wakeLock?.request('screen')) ?? null
      } catch {
        /* sem wake lock */
      }
    }
    const volta = () => {
      if (document.visibilityState === 'visible') void pedir()
    }
    void pedir()
    document.addEventListener('visibilitychange', volta)
    return () => {
      document.removeEventListener('visibilitychange', volta)
      void lock.current?.release().catch(() => {})
      lock.current = null
    }
  }, [rodando])

  const iniciar = (segundos: number, s: string) => {
    setSlot(s)
    setPausado(null)
    setTotal(Math.max(1, segundos))
    setCiclo((c) => c + 1)
    setRestante(segundos)
    const fim = Date.now() + segundos * 1000
    setFimEm(fim)
    agendarSons(segundos)
    agendarPush(fim)
  }
  const parar = () => {
    cancelarSons()
    cancelarPush()
    setFimEm(null)
    setPausado(null)
    setSlot(null)
  }
  // Um toque: inicia; rodando pausa; pausado continua.
  const alternar = (segundos: number, s: string) => {
    if (slot !== s) return iniciar(segundos, s)
    if (fimEm != null) {
      cancelarSons()
      cancelarPush()
      setPausado(restante)
      setFimEm(null)
    } else if (pausado != null) {
      const fim = Date.now() + pausado * 1000
      setFimEm(fim)
      agendarSons(pausado)
      agendarPush(fim)
      setPausado(null)
    } else iniciar(segundos, s)
  }
  const alternarSom = () => {
    const novo = !som
    setSom(novo)
    if (!novo) cancelarSons()
    try {
      localStorage.setItem(CHAVE_SOM, novo ? '1' : '0')
    } catch {
      /* ignora */
    }
  }
  return { slot, rodando, pausado: pausado != null, visivel: slot != null, restante: pausado ?? restante, total, ciclo, som, iniciar, alternar, alternarSom, parar }
}

type WakeLockLike = { release(): Promise<void> }
