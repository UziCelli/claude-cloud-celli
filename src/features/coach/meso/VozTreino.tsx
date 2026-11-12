import { useEffect, useRef, useState } from 'react'
import type { Meso, Registros } from '../../../engine'
import { IcMicrofone } from '../../../icones'
import { montarTreinosPorFala, useChaveIA } from '../../../lib/ia'
import { descreverAcao, MAX_TEXTO, type Acao, type Proposta } from '../../../lib/iaTreino'
import { mensagemVoz, ouvir, vozDisponivel, type Escuta } from '../../../lib/voz'
import { Aviso, Botao, campoBase, Cartao, Msg } from '../../../ui'
import { aplicarAcoes } from './util'

const ROTULO: Record<Acao['tipo'], string> = {
  adicionar: 'Adicionar',
  definir: 'Refazer a lista',
  substituir: 'Trocar',
  progressao: 'Séries e reps',
  volume: 'Volume',
  metodo: 'Método',
}

// Montar o meso falando: o coach dita (ou digita) divisão, séries e reps, volume e métodos; a IA devolve as ações,
// ele confere e aplica. Nada é salvo aqui: aplicar só muda o editor; vale quando o coach tocar em Salvar.
export default function VozTreino({
  meso,
  registros,
  onAtualizar,
}: {
  meso: Meso
  registros: Registros
  onAtualizar: (patch: Partial<Meso>) => void
}) {
  const { dados, carregando, erro: erroLeitura } = useChaveIA()
  const [aberto, setAberto] = useState(false)
  const [texto, setTexto] = useState('')
  const [ouvindo, setOuvindo] = useState(false)
  const [pensando, setPensando] = useState(false)
  const [proposta, setProposta] = useState<Proposta | null>(null)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const escuta = useRef<Escuta | null>(null)
  const querOuvir = useRef(false) // o coach ligou o microfone e ainda não desligou
  const textoAtual = useRef('') // sempre o texto da tela (a escuta lê daqui, nunca de um valor velho)
  useEffect(() => () => escuta.current?.cancelar(), [])

  if (carregando) return null

  function mudarTexto(t: string) {
    textoAtual.current = t
    setTexto(t)
  }

  // Desliga o microfone e esquece o que ele ainda ia entregar (senão as palavras apagadas voltavam).
  function silenciar() {
    querOuvir.current = false
    escuta.current?.cancelar()
    escuta.current = null
    setOuvindo(false)
  }

  function iniciar(reinicio = false) {
    const base = textoAtual.current.trim()
    const comecou = Date.now()
    escuta.current = ouvir(
      (fala) => mudarTexto((base ? `${base} ${fala}` : fala).slice(0, MAX_TEXTO)),
      (cod) => {
        // Parou de ouvir por silêncio (sem erro) e o coach não desligou: continua de onde parou.
        if (querOuvir.current && !cod && Date.now() - comecou > 1000) return iniciar(true)
        querOuvir.current = false
        escuta.current = null
        setOuvindo(false)
        // Reinício que não pegou (ex.: iPhone pede toque de novo): só desliga, o texto já está na tela.
        if (cod && cod !== 'unsupported' && !(reinicio && cod === 'start')) setErro(mensagemVoz(cod))
      },
    )
  }

  function falar() {
    if (ouvindo) {
      querOuvir.current = false
      escuta.current?.parar() // entrega o que faltava e termina sozinho
      return
    }
    setErro('')
    setOk('')
    querOuvir.current = true
    setOuvindo(true)
    iniciar()
  }

  function limpar() {
    silenciar()
    mudarTexto('')
    setProposta(null)
    setErro('')
    setOk('')
  }

  async function montar() {
    if (!dados?.chave) return
    silenciar()
    setErro('')
    setOk('')
    setProposta(null)
    setPensando(true)
    try {
      const divisao = Array.from({ length: meso.frequencia }, (_, i) => (meso.divisao[i] ?? []).map((s) => s.nome))
      const r = await montarTreinosPorFala(texto, divisao, meso.semanas)
      if (r.acoes.length || r.avisos.length) setProposta(r)
      else setErro(`A IA não entendeu. Diga o treino e o que fazer, por exemplo: "adiciona crucifixo no treino 1", "3x12 em todas as semanas" ou "dropset no supino do treino 2". Este mesociclo tem ${meso.frequencia} treinos.`)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não deu para falar com a IA.')
    } finally {
      setPensando(false)
    }
  }

  function aplicar() {
    if (!proposta) return
    const { patch, aplicados, bloqueios, refeitos } = aplicarAcoes(meso, registros, proposta.acoes)
    if (
      refeitos.length &&
      !window.confirm(`O Treino ${refeitos.join(', ')} já tem exercícios e vai ser refeito. Os métodos e a progressão própria dele saem junto. Continuar?`)
    )
      return
    if (aplicados.length) onAtualizar(patch)
    setProposta(null)
    if (aplicados.length) mudarTexto('')
    setOk(aplicados.length ? `Pronto: ${aplicados.join(' · ')}. Confira e toque em Salvar.` : '')
    setErro(bloqueios.join(' '))
  }

  if (!aberto)
    return (
      <Botao type="button" className="flex w-full items-center justify-center gap-2" onClick={() => setAberto(true)}>
        <IcMicrofone className="size-5" /> Montar o meso por voz
      </Botao>
    )

  return (
    <Cartao>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Montar o meso por voz</h2>
          <Botao
            type="button"
            tipo="fantasma"
            onClick={() => {
              limpar()
              setAberto(false)
            }}
          >
            Fechar
          </Botao>
        </div>
        {erroLeitura ? (
          <Aviso>Ative a verificação em 2 etapas em Minha conta para usar o assistente.</Aviso>
        ) : !dados?.chave ? (
          <Aviso>
            Falta cadastrar a chave da IA. <a href="#/conta" className="underline">Abrir Minha conta</a>
          </Aviso>
        ) : (
          <>
            <p className="text-sm text-slate-400">
              Fale ou escreva. Exemplos: "adiciona crucifixo e tríceps corda no treino 1" · "troca leg press por hack no treino 2" · "3 séries de 12 nas semanas 1 e 2, 4x10 depois" · "reduz 30% do volume na semana 4" · "biset de supino com crucifixo no treino 1". Sem pedir para trocar, os exercícios entram no fim do treino e nada é apagado.
            </p>
            {!vozDisponivel() && <p className="text-xs text-amber-300">Este aparelho não tem ditado no app. Use o microfone do teclado do celular.</p>}
            <textarea
              aria-label="O que você falou"
              rows={5}
              maxLength={MAX_TEXTO}
              value={texto}
              onChange={(e) => {
                silenciar() // mexeu no texto: o microfone para, senão ele reescrevia o que você apagou
                mudarTexto(e.target.value)
              }}
              className={`${campoBase} w-full p-3 outline-none focus:border-marca-500`}
            />
            <div className="flex gap-2">
              {vozDisponivel() && (
                <Botao
                  type="button"
                  tipo={ouvindo ? 'alerta' : 'secundario'}
                  className="flex flex-1 items-center justify-center gap-2"
                  onClick={falar}
                >
                  <IcMicrofone className="size-5" /> {ouvindo ? 'Parar' : 'Falar'}
                </Botao>
              )}
              <Botao type="button" disabled={!texto && !proposta} onClick={limpar}>
                Limpar
              </Botao>
              <Botao type="button" tipo="primario" className="flex-1" disabled={pensando || !texto.trim()} carregando={pensando} onClick={montar}>
                {pensando ? 'Montando…' : 'Montar'}
              </Botao>
            </div>
          </>
        )}
        <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
        <Msg>{ok && <Aviso>{ok}</Aviso>}</Msg>
        {proposta && (
          <div className="space-y-3" data-testid="proposta-ia">
            <p className="text-sm font-semibold">Confira antes de aplicar:</p>
            <div className="grid gap-3 md:grid-cols-2">
              {proposta.acoes.map((a, k) => (
                <div key={k} className="rounded-lg border border-slate-800 bg-slate-950 text-sm">
                  <p className="border-b border-slate-800 px-3 py-2 font-semibold">
                    {a.treino ? `Treino ${a.treino}` : 'Todos os treinos'} · {ROTULO[a.tipo]}
                  </p>
                  {a.tipo === 'progressao' || a.tipo === 'volume' || a.tipo === 'metodo' ? (
                    <p className="px-3 py-2">{descreverAcao(a, meso.semanas)}</p>
                  ) : a.tipo === 'substituir' ? (
                    <p className="px-3 py-2">
                      <span className="text-slate-400 line-through">{a.de}</span> por <span className="font-semibold">{a.por.nome}</span>
                      {!a.por.noCatalogo && <span className="ml-2 text-xs text-amber-300">fora do catálogo</span>}
                    </p>
                  ) : (
                    <>
                      {a.tipo === 'definir' && (meso.divisao[a.treino - 1]?.length ?? 0) > 0 && (
                        <p className="px-3 pt-2 text-xs text-amber-300">Troca os {meso.divisao[a.treino - 1].length} exercícios que já estão no treino.</p>
                      )}
                      <ol className="divide-y divide-slate-800">
                        {a.exercicios.map((e, i) => (
                          <li key={i} className="flex items-center gap-2 px-3 py-2">
                            <span className="w-4 shrink-0 text-slate-500">{a.tipo === 'adicionar' ? '+' : i + 1}</span>
                            <span className="flex-1">{e.nome}</span>
                            {!e.noCatalogo && <span className="shrink-0 text-xs text-amber-300">fora do catálogo</span>}
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              ))}
            </div>
            {proposta.avisos.map((a, i) => (
              <p key={i} className="text-xs text-amber-300">{a}</p>
            ))}
            <div className="flex gap-2">
              <Botao type="button" className="flex-1" onClick={() => setProposta(null)}>
                Descartar
              </Botao>
              <Botao type="button" tipo="primario" className="flex-1" disabled={!proposta.acoes.length} onClick={aplicar}>
                Aplicar no editor
              </Botao>
            </div>
          </div>
        )}
      </div>
    </Cartao>
  )
}
