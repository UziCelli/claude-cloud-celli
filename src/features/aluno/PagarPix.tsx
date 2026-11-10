import { useEffect, useState } from 'react'
import marca from '@marca/marca.json'
import { diaSP, inicioDoDiaSP, type Usuario } from '../../lib/acesso'
import { informarPagamento } from '../../lib/acoes'
import { avisarCoach } from '../../lib/push'
import { codigoPix, valorComAtraso } from '../../lib/pix'
import { qrDataUrl } from '../../lib/qr'
import { Aviso, Botao, Msg } from '../../ui'

// Pix da marca (marca.json). Marca sem `pix`: a interface do Pix não aparece.
// `atraso` (em %): multa + juros ao mês por dia de atraso; sem ele, nunca cobra a mais.
export const PIX = (marca as { pix?: { chave: string; nome: string; cidade: string; atraso?: { multa: number; jurosMes: number } } }).pix

// Valor do dia (mensalidade + multa + juros). Coach usa com `pagamentoInformadoEm` para ver o que o aluno pagou.
export const contaDoDia = (perfil: Usuario, agora: Date) =>
  perfil.mensalidade != null && perfil.pagoAte ? valorComAtraso(perfil.mensalidade, perfil.pagoAte.toDate(), agora, PIX?.atraso) : null

// Data que muda à meia-noite de São Paulo: o valor e o QR se atualizam sozinhos com o app aberto.
function useHoje() {
  const [agora, setAgora] = useState(() => new Date())
  useEffect(() => {
    const t = setTimeout(() => setAgora(new Date()), inicioDoDiaSP(diaSP(agora.getTime()) + 1) - agora.getTime())
    // Celular dormindo atrasa o timer: ao voltar para o app, confere o dia de novo.
    const voltou = () => document.visibilityState === 'visible' && diaSP(Date.now()) !== diaSP(agora.getTime()) && setAgora(new Date())
    document.addEventListener('visibilitychange', voltou)
    return () => {
      clearTimeout(t)
      document.removeEventListener('visibilitychange', voltou)
    }
  }, [agora])
  return agora
}

export const dataCurta = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' })
export const reais = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// QR + copia e cola + "Já paguei". O "Já paguei" só avisa o coach: o acesso avança quando ele confirma.
export default function PagarPix({ uid, perfil }: { uid: string; perfil: Usuario }) {
  const [msg, setMsg] = useState('')
  const [erro, setErro] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [enviado, setEnviado] = useState<Date | null>(null)
  const agora = useHoje()
  if (!PIX) return null
  const conta = contaDoDia(perfil, agora)
  const codigo = codigoPix({ ...PIX, valor: conta?.total ?? perfil.mensalidade })
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
      {conta && conta.total > perfil.mensalidade! ? (
        <div className="space-y-1 rounded-lg bg-amber-900/30 p-3 text-sm text-amber-200">
          {conta.multa > 0 && <p>Multa por atraso ({PIX.atraso!.multa}%): {reais(conta.multa)}</p>}
          {conta.juros > 0 && <p>Juros ({conta.dias} {conta.dias === 1 ? 'dia' : 'dias'}): {reais(conta.juros)}</p>}
          <p className="text-base font-semibold text-white">Total hoje {reais(conta.total)}</p>
          <p className="text-xs text-amber-300">O valor sobe um pouco a cada dia. O QR abaixo já está com o total de hoje.</p>
        </div>
      ) : (
        PIX.atraso && conta && <p className="text-xs text-slate-400">Após o vencimento: multa de {PIX.atraso.multa}% e juros de {PIX.atraso.jurosMes}% ao mês.</p>
      )}
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
            avisarCoach('pagou')
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
