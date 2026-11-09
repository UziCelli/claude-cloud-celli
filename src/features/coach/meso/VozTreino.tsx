import { useEffect, useRef, useState } from 'react'
import type { Meso, Registros } from '../../../engine'
import { IcMicrofone } from '../../../icones'
import { montarTreinosPorFala, refChaveIA } from '../../../lib/ia'
import { MAX_TEXTO, type TreinoProposto } from '../../../lib/iaTreino'
import { useDoc } from '../../../lib/hooks'
import { mensagemVoz, ouvir, vozDisponivel } from '../../../lib/voz'
import { Aviso, Botao, campoBase, Cartao, Msg } from '../../../ui'
import { aplicarProposta } from './util'

// Montar a divisão falando: o coach dita (ou digita), a IA devolve os exercícios por treino, ele confere e aplica.
// Nada é salvo aqui: aplicar só muda o editor; vale quando o coach tocar em Salvar.
export default function VozTreino({
  meso,
  registros,
  onAtualizar,
}: {
  meso: Meso
  registros: Registros
  onAtualizar: (patch: Partial<Meso>) => void
}) {
  const { dados, carregando, erro: erroLeitura } = useDoc<{ chave: string }>(refChaveIA())
  const [aberto, setAberto] = useState(false)
  const [texto, setTexto] = useState('')
  const [ouvindo, setOuvindo] = useState(false)
  const [pensando, setPensando] = useState(false)
  const [proposta, setProposta] = useState<TreinoProposto[] | null>(null)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const parar = useRef<() => void>(() => {})
  useEffect(() => () => parar.current(), [])

  if (carregando) return null

  function falar() {
    if (ouvindo) return parar.current()
    setErro('')
    setOk('')
    const base = texto.trim()
    setOuvindo(true)
    parar.current = ouvir(
      (fala) => setTexto((base ? `${base} ${fala}` : fala).slice(0, MAX_TEXTO)),
      (cod) => {
        setOuvindo(false)
        if (cod && cod !== 'unsupported') setErro(mensagemVoz(cod))
      },
    )
  }

  async function montar() {
    if (!dados?.chave) return
    parar.current()
    setErro('')
    setOk('')
    setProposta(null)
    setPensando(true)
    try {
      const r = await montarTreinosPorFala(dados.chave, texto, meso.frequencia)
      if (r.length) setProposta(r)
      else setErro(`A IA não achou exercícios. Diga o treino e os exercícios, por exemplo: "treino 1, supino reto, crucifixo". Este mesociclo tem ${meso.frequencia} treinos.`)
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não deu para falar com a IA.')
    } finally {
      setPensando(false)
    }
  }

  function aplicar() {
    if (!proposta) return
    const { patch, aplicados, bloqueados, substituidos } = aplicarProposta(meso, registros, proposta)
    if (
      substituidos.length &&
      !window.confirm(`O Treino ${substituidos.join(', ')} já tem exercícios. Trocar pelos da IA? Os métodos e a progressão própria desse treino saem junto.`)
    )
      return
    if (aplicados.length) onAtualizar(patch)
    setProposta(null)
    if (aplicados.length) setTexto('')
    setOk(aplicados.length ? `Treino ${aplicados.join(', ')} montado. Confira e toque em Salvar.` : '')
    if (bloqueados.length)
      setErro(`O Treino ${bloqueados.join(', ')} já tem cargas registradas e não foi mexido. Para não perder nada, troque os exercícios um a um.`)
  }

  if (!aberto)
    return (
      <Botao type="button" className="flex w-full items-center justify-center gap-2" onClick={() => setAberto(true)}>
        <IcMicrofone className="size-5" /> Montar treinos por voz
      </Botao>
    )

  return (
    <Cartao>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Montar treinos por voz</h2>
          <button type="button" className="min-h-11 px-2 text-sm text-slate-400 hover:text-slate-200" onClick={() => {
              parar.current()
              setAberto(false)
            }}>
            Fechar
          </button>
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
              Fale ou escreva: "Treino 1: supino reto, supino inclinado com halter, tríceps corda. Treino 2: agachamento livre, leg press…"
            </p>
            {!vozDisponivel() && <p className="text-xs text-amber-300">Este aparelho não tem ditado no app. Use o microfone do teclado do celular.</p>}
            <textarea
              aria-label="O que você falou"
              rows={5}
              maxLength={MAX_TEXTO}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className={`${campoBase} w-full p-3 outline-none focus:border-marca-500`}
            />
            <div className="flex gap-2">
              {vozDisponivel() && (
                <Botao
                  type="button"
                  tipo={ouvindo ? 'alerta' : 'secundario'}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2"
                  onClick={falar}
                >
                  <IcMicrofone className="size-5" /> {ouvindo ? 'Parar' : 'Falar'}
                </Botao>
              )}
              <Botao type="button" tipo="primario" className="min-h-11 flex-1" disabled={pensando || !texto.trim()} carregando={pensando} onClick={montar}>
                {pensando ? 'Montando…' : 'Montar treino'}
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
              {proposta.map((t) => (
                <div key={t.treino} className="rounded-lg border border-slate-800 bg-slate-950 text-sm">
                  <p className="border-b border-slate-800 px-3 py-2 font-semibold">Treino {t.treino}</p>
                  <ol className="divide-y divide-slate-800">
                    {t.exercicios.map((e, i) => (
                      <li key={i} className="flex items-center gap-2 px-3 py-2">
                        <span className="w-4 shrink-0 text-slate-500">{i + 1}</span>
                        <span className="flex-1">{e.nome}</span>
                        {!e.noCatalogo && <span className="shrink-0 text-xs text-amber-300">fora do catálogo</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Botao type="button" className="min-h-11 flex-1" onClick={() => setProposta(null)}>
                Descartar
              </Botao>
              <Botao type="button" tipo="primario" className="min-h-11 flex-1" onClick={aplicar}>
                Aplicar no editor
              </Botao>
            </div>
          </div>
        )}
      </div>
    </Cartao>
  )
}
