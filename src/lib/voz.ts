// Ditado por voz do navegador (Web Speech): grátis, não usa a API paga. Chrome/Android sim; iPhone instalado
// na Tela de Início pode não ter — nesse caso a tela mostra o aviso e o teclado do celular (ícone de microfone) resolve.
interface Resultado { 0: { transcript: string }; isFinal: boolean }
interface Evento { results: ArrayLike<Resultado> }
interface Reconhecedor {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: Evento) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
  abort(): void
}
type Construtor = new () => Reconhecedor

const construtor = (): Construtor | undefined => {
  const w = window as unknown as { SpeechRecognition?: Construtor; webkitSpeechRecognition?: Construtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}

export const vozDisponivel = () => typeof window !== 'undefined' && !!construtor()

const ERROS: Record<string, string> = {
  'not-allowed': 'O microfone está bloqueado. Libere o microfone para este app nas configurações do celular.',
  'service-not-allowed': 'O microfone está bloqueado. Libere o microfone para este app nas configurações do celular.',
  'audio-capture': 'Não achei o microfone neste aparelho.',
  network: 'O ditado precisa de internet.',
  'no-speech': 'Não ouvi nada. Toque no microfone e fale de novo.',
}
export const mensagemVoz = (codigo: string) => ERROS[codigo] ?? 'O ditado falhou. Tente de novo ou use o teclado.'

export interface Escuta {
  parar(): void // termina e ainda entrega o que estava sendo falado
  cancelar(): void // descarta: nada mais chega depois (usar quando o texto foi editado ou apagado)
}

// Começa a ouvir. `aoTexto` recebe a fala inteira desta escuta a cada pedaço (refeita do zero a cada evento,
// porque o Chrome do Android repete palavras se juntarmos só os pedaços novos). `aoFim(erro)` roda uma vez, quando
// a escuta acaba sozinha (silêncio, erro) ou depois de parar(); depois de cancelar() nada mais é chamado.
export function ouvir(aoTexto: (fala: string) => void, aoFim: (erro?: string) => void): Escuta {
  const R = construtor()
  if (!R) {
    aoFim('unsupported')
    return { parar() {}, cancelar() {} }
  }
  const r = new R()
  let viva = true
  let erro: string | undefined
  r.lang = 'pt-BR'
  r.continuous = true
  r.interimResults = true
  r.onresult = (e) => {
    if (viva) aoTexto(Array.from(e.results, (x) => x[0].transcript).join(' ').replace(/\s+/g, ' ').trim())
  }
  r.onerror = (e) => {
    if (e.error !== 'aborted') erro = e.error
  }
  r.onend = () => {
    if (!viva) return
    viva = false
    aoFim(erro)
  }
  try {
    r.start()
  } catch {
    viva = false
    aoFim('start')
  }
  return {
    parar: () => r.stop(),
    cancelar() {
      viva = false
      try {
        r.abort()
      } catch {
        /* já parou */
      }
    },
  }
}
