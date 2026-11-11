import marca from '@marca/marca.json'
import { useEffect, useState } from 'react'
import { IcEstrela } from '../../icones'
import { enviarFeedback } from '../../lib/acoes'
import { ASSUNTOS, TEXTO_MAX, TIPOS, marcarConvite, montarFeedback, podeDepoimento, primeiroNome, type Assunto, type TipoFeedback } from '../../lib/feedback'
import { registrarErro } from '../../lib/log'
import { voltar } from '../../rota'
import { Botao, classesBotao, Pagina } from '../../ui'
import { Quadro } from '../../vidro'
import { BotaoVoltar } from '../../voltar'

const TRAVA_MS = 60_000
let travaAte = 0 // freio no app: depois de enviar, o botão fica travado por 60 s

const chip = (on: boolean) =>
  `min-h-11 rounded-full border px-4 text-sm font-semibold ${on ? 'border-marca-400 bg-marca-500 text-white' : 'border-white/20 bg-white/5 text-slate-200'}`

function Opcao({ marcada, onChange, children }: { marcada: boolean; onChange: (v: boolean) => void; children: string }) {
  return (
    <label className="flex min-h-11 items-start gap-3 text-sm text-slate-200">
      <input type="checkbox" checked={marcada} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-marca-500" />
      <span>{children}</span>
    </label>
  )
}

export default function EnviarFeedback({ uid, nome }: { uid: string; nome: string }) {
  const [nota, setNota] = useState(0)
  const [assunto, setAssunto] = useState<Assunto>('app')
  const [tipo, setTipo] = useState<TipoFeedback>()
  const [texto, setTexto] = useState('')
  const [anonimo, setAnonimo] = useState(false)
  const [depoimento, setDepoimento] = useState(false)
  const [enviado, setEnviado] = useState<number>()
  const [, atualizar] = useState(0)
  const faltaTrava = travaAte - Date.now()
  // A tela de origem (Conta, fim do treino) costuma estar rolada até embaixo, e a troca de rota mantém a rolagem:
  // sem isto a tela abre já na caixa de texto e as estrelas ficam escondidas lá em cima.
  // Chaves no corpo: o efeito não pode devolver nada (o React chamaria o retorno ao sair da tela).
  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => {
    if (faltaTrava <= 0) return
    const t = setTimeout(() => atualizar((n) => n + 1), faltaTrava)
    return () => clearTimeout(t)
  }, [faltaTrava])

  const entrada = { nota, assunto, tipo, texto, anonimo, depoimento }
  const mostrarDepoimento = podeDepoimento(entrada)

  function enviar() {
    // Sem await: offline a gravação só termina quando voltar a internet.
    // No anônimo, nem o erro vai para os logs (o log guarda o uid e ligaria o aluno ao envio).
    enviarFeedback(montarFeedback(entrada, uid)).catch((e) => { if (!anonimo) registrarErro('gravacao', `feedback: ${e?.code ?? e}`, e) })
    marcarConvite()
    travaAte = Date.now() + TRAVA_MS
    setEnviado(nota)
  }

  if (enviado != null) {
    const primeiro = primeiroNome(nome)
    return (
      <Pagina titulo={enviado === 5 ? (anonimo || !primeiro ? 'Valeu!' : `Valeu, ${primeiro}!`) : 'Obrigado!'}>
        <Quadro className="space-y-4">
          <p className="text-slate-200">
            {enviado === 5
              ? 'Que bom que você está curtindo.'
              : enviado <= 3
                ? `Obrigado pela sinceridade. ${primeiroNome(marca.responsavel.nome)} lê pessoalmente.`
                : 'Obrigado pela sua opinião. Ela ajuda o app a crescer.'}
          </p>
          {enviado === 5 && marca.avaliarGoogle && (
            <a href={marca.avaliarGoogle} target="_blank" rel="noopener noreferrer" className={classesBotao('primario', 'lg', 'flex items-center justify-center')}>
              Avaliar no Google
            </a>
          )}
          <Botao tipo={enviado === 5 && marca.avaliarGoogle ? 'fantasma' : 'primario'} tamanho={enviado === 5 && marca.avaliarGoogle ? 'md' : 'lg'} className="w-full" onClick={() => voltar('/')}>{enviado === 5 && marca.avaliarGoogle ? 'Agora não' : 'Fechar'}</Botao>
        </Quadro>
      </Pagina>
    )
  }

  return (
    <Pagina titulo="Sua opinião sobre o app" voltar={<BotaoVoltar para="/conta" />}>
      <form
        className="mx-auto max-w-md space-y-5"
        onSubmit={(e) => {
          e.preventDefault()
          if (nota && faltaTrava <= 0) enviar()
        }}
      >
        <p className="-mt-3 text-slate-400">Conte o que falta, o que atrapalha ou o que você adoraria ter no app. Leva 1 minuto.</p>
        <p aria-live="polite" className="text-center font-semibold text-slate-100">{nota ? `Sua nota: ${nota} de 5` : 'Quantas estrelas o app merece? Toque para escolher.'}</p>
        <div role="group" aria-label="Nota" className="-mt-3 flex justify-between">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" aria-label={`${n} ${n === 1 ? 'estrela' : 'estrelas'}`} aria-pressed={n === nota} onClick={() => setNota(n)} className={`grid size-14 place-items-center ${n <= nota ? 'text-amber-400' : 'text-slate-500'}`}>
              <IcEstrela cheia={n <= nota} className="size-10" />
            </button>
          ))}
        </div>

        <div>
          <p className="mb-2 text-sm text-slate-400">Sobre o quê?</p>
          <div className="flex flex-wrap gap-2">
            {ASSUNTOS.map((a) => (
              <button key={a.id} type="button" aria-pressed={assunto === a.id} onClick={() => setAssunto(a.id)} className={chip(assunto === a.id)}>{a.rotulo}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-slate-400">É uma… (opcional)</p>
          <div className="flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <button key={t.id} type="button" aria-pressed={tipo === t.id} onClick={() => setTipo(tipo === t.id ? undefined : t.id)} className={chip(tipo === t.id)}>{t.rotulo}</button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="sr-only">Sua mensagem</span>
          <textarea
            value={texto}
            maxLength={TEXTO_MAX}
            rows={5}
            placeholder="Conte com suas palavras…"
            onChange={(e) => setTexto(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-100 outline-none focus:border-marca-500"
          />
          <span className="block text-right text-xs text-slate-500">{texto.length}/{TEXTO_MAX}</span>
        </label>

        <div className="space-y-1">
          <Opcao marcada={anonimo} onChange={setAnonimo}>Enviar sem meu nome</Opcao>
          {mostrarDepoimento && (
            <Opcao marcada={depoimento} onChange={setDepoimento}>{`Autorizo usar meu depoimento (só o primeiro nome) na divulgação ${marca.doNome}`}</Opcao>
          )}
        </div>

        <Botao tipo="primario" type="submit" tamanho="lg" className="w-full" disabled={!nota || faltaTrava > 0}>
          {faltaTrava > 0 ? 'Enviado. Aguarde um minuto' : nota ? 'Enviar' : 'Escolha as estrelas lá em cima'}
        </Botao>
      </form>
    </Pagina>
  )
}
