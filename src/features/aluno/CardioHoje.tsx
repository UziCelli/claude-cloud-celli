import { doc } from 'firebase/firestore'
import { useState } from 'react'
import { desfazerCardio, registrarCardio } from '../../lib/acoes'
import { idCardio, rotuloCardio, TIPOS, type CardioDoc, type TipoCardio } from '../../lib/cardio'
import { db } from '../../lib/firebase'
import { useDoc } from '../../lib/hooks'
import { IcCardio } from '../../icones'
import { Botao, Campo, Painel } from '../../ui'
import { IconeQuadrado, Quadro } from '../../vidro'
import { dataSP } from './mesoAtual'

export default function CardioHoje({ uid, hoje }: { uid: string; hoje: Date }) {
  const dia = dataSP(hoje)
  const { dados: feito } = useDoc<CardioDoc>(doc(db, 'cardios', idCardio(uid, dia)))
  const [aberto, setAberto] = useState(false)
  const [tipo, setTipo] = useState<TipoCardio | undefined>()
  const [min, setMin] = useState('')
  const [erro, setErro] = useState(false)

  const alternar = () => {
    if (!aberto) {
      setTipo(feito?.tipo)
      setMin(feito?.min ? String(feito.min) : '')
      setErro(false)
    }
    setAberto(!aberto)
  }
  const salvar = () => {
    const n = min.trim() === '' ? undefined : Number(min)
    if (n !== undefined && (!Number.isInteger(n) || n < 1 || n > 600)) return setErro(true)
    registrarCardio(uid, dia, { tipo, min: n })
    setAberto(false)
  }
  const detalhe = [feito?.tipo && rotuloCardio(feito.tipo), feito?.min && `${feito.min} min`].filter(Boolean).join(' · ')

  return (
    <Quadro>
      <div className="flex items-center gap-3">
        <IconeQuadrado cor="bg-teal-500/15 text-teal-300"><IcCardio className="size-5" /></IconeQuadrado>
        <p className="min-w-0 flex-1 text-sm font-semibold">{feito ? `Hoje: ${detalhe || 'feito'}` : 'Fez cardio hoje? Marque aqui.'}</p>
        <Botao aria-label={feito ? 'Editar cardio' : 'Registrar cardio'} aria-expanded={aberto} onClick={alternar}>
          {feito ? 'Editar' : 'Registrar'}
        </Botao>
      </div>
      <Painel aberto={aberto}>
        <div className="space-y-3 pt-4">
          <div className="flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={tipo === t.id}
                onClick={() => setTipo(tipo === t.id ? undefined : t.id)}
                className={`rounded-full px-3 py-1.5 text-sm ${tipo === t.id ? 'bg-teal-500 text-white' : 'bg-white/10 text-slate-200'}`}
              >
                {t.rotulo}
              </button>
            ))}
          </div>
          <Campo rotulo="Minutos (opcional)" inputMode="numeric" value={min} onChange={(e) => { setMin(e.target.value); setErro(false) }} />
          {erro && <p role="alert" className="text-sm text-red-300">Minutos de 1 a 600.</p>}
          <div className="flex gap-2">
            <Botao tipo="primario" aria-label="Salvar cardio" onClick={salvar} className="flex-1">Salvar</Botao>
            {feito && (
              <Botao tipo="alerta" aria-label="Desfazer cardio" onClick={() => { desfazerCardio(uid, dia); setAberto(false) }}>Desfazer</Botao>
            )}
          </div>
        </div>
      </Painel>
    </Quadro>
  )
}
