import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { articulacoesDo } from '../../lib/anatomia'
import { ALERTA_DOR, dicaDaDor, validarDor, type DorForm, type LocalDor } from '../../lib/dor'
import { IcFisio } from '../../icones'
import { Aviso, Botao, Modal, campoBase } from '../../ui'
import { relatarDor } from './acoesFisio'

export const ROTULO_LOCAL: Record<LocalDor, string> = { ombro: 'Ombro', cotovelo: 'Cotovelo', punho: 'Punho', cervical: 'Cervical', lombar: 'Lombar', quadril: 'Quadril', joelho: 'Joelho', tornozelo: 'Tornozelo', outro: 'Outro' }
const chip = (on: boolean) => `min-h-11 rounded-xl border px-3 text-sm ${on ? 'border-marca-400 bg-marca-600 text-white' : 'border-slate-700 bg-slate-950'}`
const vazio = (exercicio: string): DorForm => ({ exercicio, articulacao: '' as LocalDor, tipo: 'dor', intensidade: -1, momento: 'durante', texto: '' })

// "Senti dor" no treino. Grava sem esperar a internet e nunca toca nas cargas.
// Fim do treino: `exercicios` deixa escolher o exercício; `semBotao` abre direto (quem chama controla); `momentoInicial` pré-marca o "Quando?".
export default function RelatarDor({ uid, exercicio = '', exercicios, momentoInicial, semBotao, aoFechar }: { uid: string; exercicio?: string; exercicios?: string[]; momentoInicial?: DorForm['momento']; semBotao?: boolean; aoFechar?: () => void }) {
  const inicial = () => ({ ...vazio(exercicio), ...(momentoInicial ? { momento: momentoInicial } : {}) })
  const [aberto, setAberto] = useState(!!semBotao)
  const [f, setF] = useState(inicial)
  const [enviado, setEnviado] = useState<DorForm | null>(null)
  const [erro, setErro] = useState(false)
  const erroForm = validarDor(f)
  const set = (p: Partial<DorForm>) => setF((x) => ({ ...x, ...p }))
  const fechar = () => { setAberto(false); aoFechar?.() }
  const abrir = () => { setF(inicial()); setEnviado(null); setErro(false); setAberto(true) }
  const enviar = () => {
    if (erroForm) return
    const dado = { ...f }
    setEnviado(dado)
    relatarDor(uid, dado).catch(() => setErro(true)) // sem await: offline fica na fila e o treino segue
  }
  const dica = enviado ? dicaDaDor(enviado.intensidade) : null
  return <>
    {!semBotao && <Botao tipo="fantasma" onClick={abrir} className="mb-3 inline-flex min-h-11 items-center gap-1.5 !border !border-amber-400 !px-3 !text-amber-300"><IcFisio className="size-5" />Senti dor</Botao>}
    <AnimatePresence>
      {aberto && <Modal rotulo="Senti dor" aoFechar={fechar}>
        <h2 className="mb-1 text-lg font-bold">Senti dor</h2>
        {exercicios ? !dica && <fieldset className="mb-3"><legend className="mb-1 text-sm">Qual exercício?</legend>
          <div className="flex flex-wrap gap-2">{exercicios.map((x) => <button key={x} type="button" aria-pressed={f.exercicio === x} className={chip(f.exercicio === x)} onClick={() => set({ exercicio: x })}>{x}</button>)}</div>
        </fieldset> : <p className="mb-3 text-sm text-slate-400">{exercicio}</p>}
        {dica ? <div className="space-y-3">
          <p className="text-lg font-semibold">{dica.texto}</p>
          <p className="text-sm text-slate-300">{dica.coach}</p>
          <div role="alert" className="rounded-xl border border-red-600 bg-red-950/60 p-3 text-sm font-semibold text-red-100">{ALERTA_DOR}</div>
          {erro && <Aviso>Não conseguimos enviar o relato. Fale diretamente com seu coach.</Aviso>}
          <Botao tipo="primario" tamanho="lg" className="w-full" onClick={fechar}>Fechar</Botao>
        </div> : <div className="space-y-4">
          <fieldset><legend className="mb-1 text-sm">Onde?</legend>
            <div className="flex flex-wrap gap-2">
              {[...articulacoesDo(f.exercicio), 'outro' as const].map((a) => <button key={a} type="button" aria-pressed={f.articulacao === a} className={chip(f.articulacao === a)} onClick={() => set({ articulacao: a })}>{ROTULO_LOCAL[a]}</button>)}
            </div>
          </fieldset>
          <fieldset><legend className="mb-1 text-sm">O que sentiu?</legend>
            <div className="flex gap-2">
              {([['dor', 'Dor'], ['sensacao', 'Outra sensação']] as const).map(([v, r]) => <button key={v} type="button" aria-pressed={f.tipo === v} className={chip(f.tipo === v)} onClick={() => set({ tipo: v })}>{r}</button>)}
            </div>
          </fieldset>
          <fieldset><legend className="mb-1 text-sm">Intensidade (0 a 10)</legend>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 11 }, (_, i) => <button key={i} type="button" aria-pressed={f.intensidade === i} aria-label={`Intensidade ${i}`} className={`${chip(f.intensidade === i)} min-h-12 px-0 text-base font-semibold`} onClick={() => set({ intensidade: i })}>{i}</button>)}
            </div>
          </fieldset>
          <fieldset><legend className="mb-1 text-sm">Quando?</legend>
            <div className="flex gap-2">
              {([['durante', 'Durante o treino'], ['fim', 'No fim do treino']] as const).map(([v, r]) => <button key={v} type="button" aria-pressed={f.momento === v} className={chip(f.momento === v)} onClick={() => set({ momento: v })}>{r}</button>)}
            </div>
          </fieldset>
          <label className="block text-sm">{f.articulacao === 'outro' ? 'Conte onde sentiu' : 'Quer contar mais? (opcional)'}
            <textarea maxLength={300} rows={3} required={f.articulacao === 'outro'} value={f.texto} onChange={(e) => set({ texto: e.target.value })} className={`${campoBase} mt-1 w-full p-3`} />
          </label>
          <div className="flex gap-2">
            <Botao tipo="primario" tamanho="lg" className="flex-1" disabled={!!erroForm} onClick={enviar}>Enviar</Botao>
            <Botao tipo="fantasma" tamanho="lg" onClick={fechar}>Cancelar</Botao>
          </div>
        </div>}
      </Modal>}
    </AnimatePresence>
  </>
}
