import { useEffect, useRef, useState } from 'react'
import { Botao } from '../../ui'
import { ESPERA_ENTRADA_MS } from '../../movimento'
import { compartilharArquivo, gerarCartao, type DadosCartao } from './cartaoStory'

// Safari (iPhone, iPad, Mac) só compartilha direto no toque: lá o arquivo é gerado antes, depois da entrada da tela.
// Nos outros (Android), o toque vale por alguns segundos: gerar no toque não pesa ao abrir a tela.
const ua = typeof navigator === 'undefined' ? '' : navigator.userAgent
const PRECISA_ANTES = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && !/Chrome|Chromium|Edg|Firefox/.test(ua))

export default function BotaoCompartilhar<T = DadosCartao>({ dados, gerar = gerarCartao as unknown as (d: T) => Promise<Blob>, className, rotulo = 'Compartilhar no story', arquivo = 'minha-evolucao.png', titulo = 'Minha evolução', aoGerar, aoErro, antecipar = PRECISA_ANTES }: { dados: T; gerar?: (d: T) => Promise<Blob>; className?: string; rotulo?: string; arquivo?: string; titulo?: string; aoGerar?: (blob: Blob) => void; aoErro?: () => void; antecipar?: boolean }) {
  const [gerando, setGerando] = useState(false)
  const [msg, setMsg] = useState('')
  const [pronta, setPronta] = useState<{ chave: string; blob: Blob } | null>(null)
  const dadosRef = useRef(dados)
  dadosRef.current = dados
  // Texto longo (foto em data URL, até 1,5 MB) entra na chave só pelo tamanho e pelo final: não reserializa a foto a cada render.
  const chave = JSON.stringify(dados, (_, v) => (typeof v === 'string' && v.length > 1000 ? `${v.length}:${v.slice(-64)}` : v))

  // Gera a imagem antes do toque: no clique o share sai na hora (exigência do Safari).
  // Espera a tela parar de deslizar: gerar PNG/PDF durante a animação travava a troca de tela no iPhone.
  // A espera também evita gerar de novo a cada letra digitada (comentário do relatório).
  useEffect(() => {
    if (!antecipar) return
    let vivo = true
    const t = setTimeout(() => {
      gerar(dadosRef.current)
        .then((blob) => {
          if (!vivo) return
          setPronta({ chave, blob })
          aoGerar?.(blob)
        })
        .catch(() => {
          if (vivo) aoErro?.()
        })
    }, ESPERA_ENTRADA_MS)
    return () => {
      vivo = false
      clearTimeout(t)
    }
  }, [chave, gerar, antecipar])

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
      <Botao tipo="vidro" onClick={clicar} disabled={gerando} carregando={gerando}>
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
