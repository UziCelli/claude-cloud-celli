import { useEffect, useState } from 'react'
import { Botao } from '../../ui'
import { compartilharCartao, gerarCartao, type DadosCartao } from './cartaoStory'

export default function BotaoCompartilhar({ dados }: { dados: DadosCartao }) {
  const [gerando, setGerando] = useState(false)
  const [msg, setMsg] = useState('')
  const [pronta, setPronta] = useState<{ chave: string; blob: Blob } | null>(null)
  const chave = JSON.stringify(dados)

  // Gera a imagem antes do toque: no clique o share sai na hora (exigência do Safari).
  useEffect(() => {
    let vivo = true
    gerarCartao(JSON.parse(chave) as DadosCartao)
      .then((blob) => vivo && setPronta({ chave, blob }))
      .catch(() => {})
    return () => {
      vivo = false
    }
  }, [chave])

  async function clicar() {
    setGerando(true)
    setMsg('')
    try {
      const blob = pronta?.chave === chave ? pronta.blob : await gerarCartao(dados)
      if ((await compartilharCartao(blob)) === 'baixado') setMsg('Imagem salva no aparelho.')
    } catch {
      setMsg('Não deu para gerar a imagem. Tente de novo.')
    } finally {
      setGerando(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Botao tipo="primario" onClick={clicar} disabled={gerando} carregando={gerando}>
        {gerando ? 'Gerando…' : 'Compartilhar no story'}
      </Botao>
      {msg && (
        <p role="status" className="text-sm text-slate-400">
          {msg}
        </p>
      )}
    </div>
  )
}
