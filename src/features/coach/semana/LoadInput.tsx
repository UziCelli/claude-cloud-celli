// Input de carga (kg): grava no blur/Enter, sem esperar confirmação do servidor (offline-first).
export default function LoadInput({
  valor,
  placeholder,
  onSalvar,
}: {
  valor: number | null
  placeholder?: number | string | null
  onSalvar: (v: number | null) => void
}) {
  function commit(texto: string) {
    const t = texto.trim().replace(',', '.')
    onSalvar(t === '' ? null : Number(t))
  }
  return (
    <input
      type="number"
      inputMode="decimal"
      step={0.5}
      key={valor ?? 'vazio'}
      defaultValue={valor ?? ''}
      placeholder={placeholder == null ? undefined : String(placeholder)}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
      className="w-16 rounded border border-slate-700 bg-slate-950 px-1 py-0.5 text-center text-xs text-slate-100 outline-none focus:border-orange-500"
    />
  )
}
