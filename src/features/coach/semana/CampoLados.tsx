import type { CelulaLados } from '../../../lib/lados'
import { fmt } from './format'
import LoadInput from './LoadInput'

// Carga de um exercício de 2 lados. Um campo ("kg cada lado": esq = dir) ou, com `ed`, dois campos E | D.
// Célula antiga (só o número inteiro, sem lados) nunca é reescrita: o campo fica vazio, o número aparece em
// "anotado antes", e apagar um campo vazio não faz nada.
export default function CampoLados({
  cel,
  ed,
  onGravar,
  placeholder,
  placeholderD,
  className = 'w-16',
  disabled,
}: {
  cel: CelulaLados
  ed: boolean
  onGravar: (esq: number | null, dir: number | null) => void
  placeholder?: number | string | null // "semana passada" (esquerdo, ou o único campo)
  placeholderD?: number | string | null
  className?: string
  disabled?: boolean
}) {
  const salvar = (esq: number | null, dir: number | null) => {
    if (esq == null && dir == null) {
      if (cel.esq == null && cel.antigo != null) return // vazio sobre célula antiga: não apaga
      return onGravar(null, null)
    }
    onGravar(esq ?? 0, dir ?? 0)
  }
  return (
    <div className={className}>
      {ed ? (
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-slate-400">E</span>
          <LoadInput className="min-w-0 flex-1" disabled={disabled} valor={cel.esq} placeholder={placeholder} onSalvar={(v) => salvar(v, cel.dir)} />
          <span className="text-xs font-bold text-slate-400">D</span>
          <LoadInput className="min-w-0 flex-1" disabled={disabled} valor={cel.dir} placeholder={placeholderD} onSalvar={(v) => salvar(cel.esq, v)} />
        </div>
      ) : (
        <LoadInput className="w-full" disabled={disabled} valor={cel.esq} placeholder={placeholder} onSalvar={(v) => salvar(v, v)} />
      )}
      {cel.antigo != null && <span className="block text-[10px] leading-tight text-slate-500">anotado antes: {fmt(cel.antigo)} kg</span>}
    </div>
  )
}

// Botão do exercício: abre/fecha os campos E | D. Fica escondido (aberto) quando já há lados diferentes gravados.
export function BotaoLadosDiferentes({ aberto, onAlternar }: { aberto: boolean; onAlternar: () => void }) {
  return (
    <button type="button" aria-pressed={aberto} onClick={onAlternar} className="min-h-11 rounded-lg px-3 text-xs font-semibold text-marca-400 ring-1 ring-slate-700">
      {aberto ? 'mesmo peso nos lados' : 'lados diferentes'}
    </button>
  )
}
