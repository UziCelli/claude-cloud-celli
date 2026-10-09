import { useState } from 'react'
import marca from '@marca/marca.json'
import type { Usuario } from '../../lib/acesso'
import { informarPagamento } from '../../lib/acoes'
import { codigoPix } from '../../lib/pix'
import { qrDataUrl } from '../../lib/qr'
import { Aviso, Botao, Msg } from '../../ui'

// Pix da marca (marca.json). Marca sem `pix`: a interface do Pix não aparece.
export const PIX = (marca as { pix?: { chave: string; nome: string; cidade: string } }).pix

export const dataCurta = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' })
export const reais = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// QR + copia e cola + "Já paguei". O "Já paguei" só avisa o coach: o acesso avança quando ele confirma.
export default function PagarPix({ uid, perfil }: { uid: string; perfil: Usuario }) {
  const [msg, setMsg] = useState('')
  const [erro, setErro] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [enviado, setEnviado] = useState<Date | null>(null)
  if (!PIX) return null
  const codigo = codigoPix({ ...PIX, valor: perfil.mensalidade })
  // A hora do servidor chega nula enquanto a gravação está pendente (offline): mostra a hora do toque.
  const aviso = perfil.pagamentoInformadoEm?.toDate() ?? enviado

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo)
      setMsg('Código copiado')
      setMostrar(false)
    } catch {
      setMsg('')
      setMostrar(true)
    }
  }

  return (
    <div className="space-y-3 text-center">
      {perfil.mensalidade != null && <p className="text-base font-semibold">Mensalidade {reais(perfil.mensalidade)}</p>}
      <img src={qrDataUrl(codigo)} alt="QR Code Pix" width={200} height={200} className="mx-auto size-[200px] rounded-xl bg-white p-3" />
      <Botao type="button" className="w-full" onClick={copiar}>Copiar código Pix</Botao>
      {mostrar && (
        <textarea readOnly rows={4} value={codigo} aria-label="Código Pix" onFocus={(e) => e.currentTarget.select()} className="w-full break-all rounded-lg bg-white/10 p-2 text-xs" />
      )}
      <Msg>{msg && <p className="text-sm text-emerald-400">{msg}</p>}</Msg>
      {aviso ? (
        <p className="text-sm text-slate-300">
          Aviso enviado em {dataCurta(aviso)}. Seu acesso é renovado quando {marca.responsavel.nome} confirmar.
        </p>
      ) : (
        <Botao
          type="button"
          tipo="primario"
          className="w-full"
          onClick={() => {
            setErro('')
            setEnviado(new Date())
            informarPagamento(uid).catch(() => {
              setEnviado(null)
              setErro('Não deu para enviar o aviso. Tente de novo.')
            })
          }}
        >
          Já paguei
        </Botao>
      )}
      <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
    </div>
  )
}
