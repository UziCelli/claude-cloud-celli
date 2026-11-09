import { useState } from 'react'
import { m } from 'motion/react'
import { avisosDesligados, trocarAviso, type TipoAviso } from '../../lib/push'
import { agil } from '../../movimento'

// Chave liga/desliga (role="switch"). A bolinha anda por `x`, não por `layout`: com `layout` ela animava
// também quando a tela mudava de lugar (entrada da aba, foto carregando) e chegava atrasada, vindo de baixo.
export function Chave({ ligada, rotulo, onChange }: { ligada: boolean; rotulo: string; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligada}
      aria-label={rotulo}
      onClick={() => onChange(!ligada)}
      className={`relative flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors after:absolute after:-inset-2 ${ligada ? 'bg-marca-500' : 'bg-white/15'}`}
    >
      <m.span initial={false} animate={{ x: ligada ? 24 : 0 }} transition={agil} className="size-6 rounded-full bg-white shadow" />
    </button>
  )
}

// Uma chave por tipo de aviso (aluno ou coach). Vale para este aparelho; o Worker de push recebe a lista.
export default function ChavesAvisos({ tipos, coach = false }: { tipos: readonly (readonly [TipoAviso, string])[]; coach?: boolean }) {
  const [desligados, setDesligados] = useState(avisosDesligados)
  return (
    <>
      {tipos.map(([tipo, rotulo]) => (
        <div key={tipo} className="flex min-h-12 items-center gap-3">
          <span className="flex-1 text-base font-semibold">{rotulo}</span>
          <Chave
            ligada={!desligados.includes(tipo)}
            rotulo={rotulo}
            onChange={(v) => {
              trocarAviso(tipo, v, coach)
              setDesligados(avisosDesligados())
            }}
          />
        </div>
      ))}
    </>
  )
}
