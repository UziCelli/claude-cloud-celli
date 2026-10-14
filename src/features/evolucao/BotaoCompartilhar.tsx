import { useEffect, useState } from 'react'
import { Botao } from '../../ui'
import { compartilharArquivo, gerarCartao, type DadosCartao } from './cartaoStory'

export default function BotaoCompartilhar<T = DadosCartao>({ dados, gerar = gerarCartao as unknown as (d: T) => Promise<Blob>, className, rotulo = 'Compartilhar no story', arquivo = 'minha-evolucao.png', titulo = 'Minha evolução', aoGerar }: { dados: T; gerar?: (d: T) => Promise<Blob>; className?: string; rotulo?: string; arquivo?: string; titulo?: string; aoGerar?: (blob: Blob) => void }) {
  const [gerando, setGerando] = useState(false)
  const [msg, setMsg] = useState('')
  const [pronta, setPronta] = useState<{ chave: string; blob: Blob } | null>(null)
  const chave = JSON.stringify(dados)

  // Gera a imagem antes do toque: no clique o share sai na hora (exigência do Safari).
  useEffect(() => {
    let vivo = true
    gerar(JSON.parse(chave) as T)
      .then((blob) => {
        if (!vivo) return
        setPronta({ chave, blob })
        aoGerar?.(blob)
      })
      .catch(() => {})
    return () => {
      vivo = false
    }
  }, [chave, gerar])

  async function clicar() {
    setGerando(true)
    setMsg('')
    try {
      const blob = pronta?.chave === chave ? pronta.blob : await gerar(dados)
      if ((await compartilharArquivo(blob, arquivo, titulo)) === 'baixado') setMsg('Arquivo salvo no aparelho.')
    } catch {
      setMsg('Não deu para gerar o arquivo. Tente de novo.')
    } finally {
      setGerando(false)
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`}>
      <Botao tipo="primario" onClick={clicar} disabled={gerando} carregando={gerando}>
        {gerando ? 'Gerando…' : rotulo}
      </Botao>
      {msg && (
        <p role="status" className="text-sm text-slate-400">
          {msg}
        </p>
      )}
    </div>
  )
}
