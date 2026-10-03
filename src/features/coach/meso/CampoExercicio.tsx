import { useState } from 'react'
import { buscarExercicios } from '../../../lib/busca'
import { campoBase } from '../../../ui'

// Campo de exercício com sugestões do catálogo. Aceita texto livre.
// onConfirmar: ao escolher uma sugestão, apertar Enter ou sair do campo.
export default function CampoExercicio({
  inicial = '',
  placeholder,
  onTexto,
  onConfirmar,
  onAvancar,
  className = '',
}: {
  inicial?: string
  placeholder?: string
  onTexto?: (t: string) => void
  onConfirmar?: (t: string) => void
  onAvancar?: (para: 'exercicio' | 'treino') => void
  className?: string
}) {
  const [texto, setTexto] = useState(inicial)
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState(-1)
  const sugestoes = aberto ? buscarExercicios(texto, 8) : []

  const escolher = (nome: string) => {
    setTexto(nome)
    onTexto?.(nome)
    setAberto(false)
    onConfirmar?.(nome)
    onAvancar?.('exercicio')
  }

  function tecla(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setAberto(true)
      const n = sugestoes.length
      if (n) setAtivo((a) => (e.key === 'ArrowDown' ? (a + 1) % n : (a - 1 + n) % n))
    } else if (e.key === 'Enter') {
      if (sugestoes[ativo]) {
        e.preventDefault()
        escolher(sugestoes[ativo].nome)
      } else {
        setAberto(false)
        onConfirmar?.(texto)
        onAvancar?.(texto.trim() ? 'exercicio' : 'treino')
      }
    } else if (e.key === 'Tab' && onAvancar && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault()
      if (sugestoes[ativo]) escolher(sugestoes[ativo].nome)
      else {
        setAberto(false)
        onConfirmar?.(texto)
        onAvancar('exercicio')
      }
    } else if (e.key === 'Escape') setAberto(false)
  }

  return (
    <div className={`relative min-w-0 ${className}`}>
      <input
        role="combobox"
        aria-expanded={sugestoes.length > 0}
        aria-autocomplete="list"
        autoComplete="off"
        value={texto}
        placeholder={placeholder}
        onChange={(e) => {
          setTexto(e.target.value)
          onTexto?.(e.target.value)
          setAberto(true)
          setAtivo(-1)
        }}
        onKeyDown={tecla}
        onBlur={() => {
          setAberto(false)
          onConfirmar?.(texto)
        }}
        className={`${campoBase} w-full px-2 py-2 outline-none focus:border-marca-500`}
      />
      {sugestoes.length > 0 && (
        <ul role="listbox" className="absolute left-0 right-0 z-20 mt-1 max-h-72 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
          {sugestoes.map((s, i) => (
            <li
              key={s.nome}
              role="option"
              aria-selected={i === ativo}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => escolher(s.nome)}
              className={`cursor-pointer px-3 py-2 text-base ${i === ativo ? 'bg-slate-800' : 'hover:bg-slate-800'}`}
            >
              {s.nome}
              <span className="ml-2 text-xs text-slate-400">{s.grupo}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
