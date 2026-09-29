import { useEffect, useState } from 'react'
import Logo from '../../Logo'
import { Botao, Cartao, Centro } from '../../ui'

type EventoInstalar = Event & { prompt: () => Promise<void> }

const ua = () => navigator.userAgent
const eAndroid = () => /Android/.test(ua())
const eIOS = () => /iPhone|iPad|iPod/.test(ua()) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua()))
const navegadorEmbutido = () => /CriOS|FxiOS|FBAN|FBAV|Instagram|WhatsApp/.test(ua())
const jaInstalado = () =>
  matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true

const IconeCompartilhar = () => (
  <svg viewBox="0 0 24 24" className="inline h-5 w-5 -translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0-4 4m4-4 4 4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 10H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1" />
  </svg>
)

const Passo = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <li className="flex gap-3">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-marca-500 text-sm font-bold text-slate-950">
      {n}
    </span>
    <span className="min-w-0">{children}</span>
  </li>
)

export default function Instalar() {
  const [promptEvento, setPromptEvento] = useState<EventoInstalar | null>(null)
  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    const ouvir = (e: Event) => {
      e.preventDefault()
      setPromptEvento(e as EventoInstalar)
    }
    addEventListener('beforeinstallprompt', ouvir)
    return () => removeEventListener('beforeinstallprompt', ouvir)
  }, [])

  if (jaInstalado()) {
    return (
      <Centro>
        <h1 className="text-2xl font-bold">O app já está instalado ✓</h1>
        <Botao tipo="primario" className="w-full" onClick={() => (location.href = '/')}>
          Abrir o VFITCOACH
        </Botao>
      </Centro>
    )
  }

  return (
    <main className="mx-auto max-w-md space-y-4 px-4 pb-8 pt-[calc(2rem+env(safe-area-inset-top))]">
      <h1 className="flex flex-col items-center gap-3 text-center text-2xl font-bold">
        <Logo className="h-10 text-white" faixa="#3F72A6" />
        Instalar o app
      </h1>

      {eAndroid() && <PassosAndroid promptEvento={promptEvento} />}
      {eIOS() && <PassosIOS copiado={copiado} onCopiar={() => copiarLink(setCopiado)} />}
      {!eAndroid() && !eIOS() && <PassosDesktop />}
    </main>
  )
}

function copiarLink(setCopiado: (v: boolean) => void) {
  navigator.clipboard?.writeText(location.href).then(() => {
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  })
}

function PassosAndroid({ promptEvento }: { promptEvento: EventoInstalar | null }) {
  return (
    <>
      <Cartao>
        <ol className="space-y-3 text-sm">
          <Passo n={1}>Abra o arquivo <strong>forca.apk</strong> que seu coach enviou no WhatsApp.</Passo>
          <Passo n={2}>Se o celular pedir, permita "instalar apps desconhecidos" para o app que abriu o arquivo (WhatsApp ou Arquivos).</Passo>
          <Passo n={3}>Toque em <strong>Instalar</strong> e depois abra o <strong>VFITCOACH</strong>.</Passo>
          <Passo n={4}>Entre com seu e-mail e senha.</Passo>
        </ol>
        <p className="mt-3 text-xs text-slate-500">Não recebeu o arquivo? Peça ao seu coach.</p>
        <p className="text-xs text-slate-500">Precisa do Google Chrome instalado (já vem na maioria dos celulares).</p>
      </Cartao>

      <Cartao>
        <p className="mb-3 text-sm font-semibold">Ou instale direto pelo Chrome</p>
        {promptEvento ? (
          <Botao tipo="secundario" className="w-full" onClick={() => promptEvento.prompt()}>
            Instalar pelo Chrome
          </Botao>
        ) : (
          <p className="text-sm text-slate-400">
            No Chrome, toque no menu <strong>⋮</strong> (três pontinhos) e escolha <strong>"Instalar app"</strong> ou{' '}
            <strong>"Adicionar à tela inicial"</strong>.
          </p>
        )}
      </Cartao>
    </>
  )
}

function PassosIOS({ copiado, onCopiar }: { copiado: boolean; onCopiar: () => void }) {
  return (
    <>
      <Cartao className="space-y-3 border-l-4 border-marca-500 bg-marca-900/60">
        <p className="text-sm font-semibold text-marca-300">
          Abriu pelo WhatsApp ou Instagram? Toque na bússola do Safari 🧭 (canto de baixo) para abrir no Safari — ou copie o link e cole no Safari.
        </p>
        <Botao tipo="primario" className="w-full" onClick={onCopiar}>
          {copiado ? 'Link copiado ✓' : 'Copiar link'}
        </Botao>
      </Cartao>

      <Cartao>
        <ol className="space-y-3 text-sm">
          <Passo n={1}>
            Toque em Compartilhar: o quadrado com a seta ⬆️ na barra de baixo — ou, nos iPhones mais novos, toque nos três pontinhos ⋯ ao lado do endereço e depois em Compartilhar. <IconeCompartilhar />
          </Passo>
          <Passo n={2}>
            Role a lista para baixo e toque em "Adicionar à Tela de Início". Não apareceu? Toque em "Ver mais" ou "Editar ações" e procure lá.
          </Passo>
          <Passo n={3}>Toque em "Adicionar"</Passo>
          <Passo n={4}>Sempre abra o VFITCOACH pela tela inicial — assim seus treinos ficam guardados no celular</Passo>
        </ol>
        <p className="mt-3 text-xs text-slate-500">Precisa do iOS 16.4 ou mais novo.</p>
      </Cartao>
    </>
  )
}

function PassosDesktop() {
  return (
    <Cartao className="space-y-3 text-center">
      <p className="text-sm">Abra este link no celular para instalar o app:</p>
      <p className="break-all text-lg font-bold text-marca-300">forca--app.web.app/instalar</p>
    </Cartao>
  )
}
