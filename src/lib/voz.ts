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

// Começa a ouvir. `aoTexto` recebe a fala inteira desta sessão a cada pedaço (refeita do zero a cada evento,
// porque o Chrome do Android repete palavras se juntarmos só os pedaços novos). Devolve a função que para.
export function ouvir(aoTexto: (fala: string) => void, aoFim: (erro?: string) => void): () => void {
  const R = construtor()
  if (!R) {
    aoFim('unsupported')
    return () => {}
  }
  const r = new R()
  r.lang = 'pt-BR'
  r.continuous = true
  r.interimResults = true
  let erro: string | undefined
  r.onresult = (e) => aoTexto(Array.from(e.results, (x) => x[0].transcript).join(' ').replace(/\s+/g, ' ').trim())
  r.onerror = (e) => {
    if (e.error !== 'aborted') erro = e.error
  }
  r.onend = () => aoFim(erro)
  try {
    r.start()
  } catch {
    aoFim('start')
  }
  return () => r.stop()
}
