import { AnimatePresence, m } from 'motion/react'
import { agil, saida } from '../../../movimento'
import { useEffect, useRef, useState } from 'react'
import { IcCheck } from '../../../icones'

// Input de carga (kg): grava no blur/Enter, sem esperar confirmação do servidor (offline-first).
export default function LoadInput({
  valor,
  placeholder,
  onSalvar,
  className = 'w-16',
  disabled = false,
}: {
  disabled?: boolean
  valor: number | null
  placeholder?: number | string | null
  onSalvar: (v: number | null) => void
  className?: string
}) {
  const [salvo, setSalvo] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  function commit(campo: HTMLInputElement) {
    const t = campo.value.trim().replace(',', '.')
    const v = t === '' ? null : Number(t)
    // Só dígitos com um ponto: Number() aceitaria "1e3", "0x10" e "-0".
    if (v != null && !/^(\d+\.?\d*|\.\d+)$/.test(t)) {
      campo.value = valor == null ? '' : String(valor) // texto inválido nunca apaga nem grava
      return
    }
    onSalvar(v)
    if (v !== valor) {
      setSalvo(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setSalvo(false), 1000)
    }
  }
  return (
    <div className={`relative ${className}`}>
    <input
      type="text"
      inputMode="decimal"
      autoComplete="off"
      key={valor ?? 'vazio'}
      defaultValue={valor ?? ''}
      disabled={disabled}
      placeholder={placeholder == null ? undefined : String(placeholder)}
      onBlur={(e) => commit(e.target)}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
      className={`w-full rounded border border-slate-700 bg-slate-950 px-1 py-1 text-center font-display text-base font-bold text-slate-100 outline-none focus:border-marca-500 disabled:opacity-50`}
    />
    <AnimatePresence>
      {salvo && (
        <m.span
          aria-label="Salvo"
          role="status"
          className="pointer-events-none absolute -right-1 -top-2 text-xs font-bold text-emerald-400"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: saida }}
          transition={agil}
        >
          <IcCheck className="inline size-3 align-[-1px]" />
        </m.span>
      )}
    </AnimatePresence>
    </div>
  )
}
