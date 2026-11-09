import { useState } from 'react'
import { enviarRecado } from '../../../lib/push'
import { Botao, campoBase, Msg } from '../../../ui'

// Aviso escrito pelo coach: vira só uma notificação no celular do aluno (nada é gravado no banco).
export default function EnviarAviso({ ids, para, onFechar }: { ids: string[]; para: string; onFechar: () => void }) {
  const [texto, setTexto] = useState('')
  const [estado, setEstado] = useState('')
  const enviando = estado === 'Enviando…'
  async function enviar() {
    setEstado('Enviando…')
    const n = await enviarRecado(ids, texto)
    if (n === null) setEstado('Não foi possível enviar. Confira a internet ou espere alguns minutos e tente de novo.')
    else if (n === 0) setEstado('Ninguém recebeu: notificações não ativadas, aviso desligado ou muitos avisos em poucos minutos.')
    else {
      setTexto('')
      setEstado(ids.length === 1 ? 'Aviso enviado.' : `Aviso enviado para ${n} de ${ids.length} alunos.`)
    }
  }
  return (
    <form
      className="w-full space-y-2"
      onSubmit={(e) => {
        e.preventDefault()
        void enviar()
      }}
    >
      <label className="block text-sm font-semibold">
        Aviso para {para}
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={200}
          rows={3}
          required
          placeholder="Ex.: amanhã não haverá atendimento."
          className={`${campoBase} mt-1 block w-full px-3 py-2 font-normal`}
        />
      </label>
      <p className="text-xs text-slate-400">{texto.length}/200. Chega como notificação no celular de quem ativou os avisos.</p>
      <Msg>{estado && <p className="text-sm text-slate-300" role="status">{estado}</p>}</Msg>
      <div className="flex flex-wrap gap-2">
        <Botao tipo="primario" disabled={enviando || !texto.trim() || ids.length === 0}>Enviar aviso</Botao>
        <Botao type="button" onClick={onFechar}>Fechar</Botao>
      </div>
    </form>
  )
}
