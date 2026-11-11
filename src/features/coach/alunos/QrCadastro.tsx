import { useState } from 'react'
import { linkCadastro } from '../../../lib/cadastro'
import { qrDataUrl } from '../../../lib/qr'
import { Botao, Folha, Msg } from '../../../ui'

// QR Code que o coach mostra ao aluno: a câmera do celular abre direto o cadastro do app.
export default function QrCadastro({ onFechar }: { onFechar: () => void }) {
  const [msg, setMsg] = useState('')
  async function copiar() {
    try {
      await navigator.clipboard.writeText(linkCadastro)
      setMsg('Link copiado')
    } catch {
      setMsg('Não deu para copiar. Selecione o link.')
    }
  }
  return (
    <Folha titulo="QR Code de cadastro" onFechar={onFechar}>
      <p className="text-sm text-slate-300">O aluno abre a câmera do celular, aponta para o QR Code e toca no aviso. Ele cai direto no cadastro.</p>
      <img src={qrDataUrl(linkCadastro)} alt="QR Code para o aluno se cadastrar" width={240} height={240} className="mx-auto size-[240px] rounded-xl bg-white p-3" />
      <p className="select-all break-all text-center text-sm text-slate-300">{linkCadastro}</p>
      <div className="grid grid-cols-2 gap-3">
        <Botao type="button" onClick={copiar}>Copiar link</Botao>
        <Botao type="button" tipo="primario" onClick={onFechar}>Fechar</Botao>
      </div>
      <Msg>{msg && <p className="text-center text-sm text-emerald-400">{msg}</p>}</Msg>
    </Folha>
  )
}
