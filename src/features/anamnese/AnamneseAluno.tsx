import { useEffect, useRef, useState } from 'react'
import { avisoMedico, CHAVE_RASCUNHO, parqGrave, PARQ_GRAVES, PERGUNTAS, TODAS, validarRespostas, type Pergunta, type Respostas } from '../../lib/anamnese'
import { enviarAnamnese, novaVersaoCoach } from '../../lib/acoes'
import { registrarErro } from '../../lib/log'
import { IcCheck } from '../../icones'
import { ir } from '../../rota'
import { Aviso, Botao, Centro } from '../../ui'
import { Quadro } from '../../vidro'
import { BotaoVoltar } from '../../voltar'
import FichaAnamnese from './FichaAnamnese'
import { useAnamnese } from './useAnamnese'

type Rascunho = { r: Respostas; menor: boolean; etapa: number; t: number }

const ler = (chave: string): Rascunho | null => {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_RASCUNHO + chave) ?? 'null')
  } catch {
    return null
  }
}
const apagar = (chave: string) => {
  try {
    localStorage.removeItem(CHAVE_RASCUNHO + chave)
  } catch {
    /* sem armazenamento: sem rascunho */
  }
}

const seleciona = (on: boolean) => `min-h-12 rounded-xl border px-4 text-[15px] font-semibold ${on ? 'border-marca-400 bg-marca-500 text-white' : 'border-white/15 bg-white/5 text-slate-200'}`

const Caixa = ({ rotulo, on, mudar }: { rotulo: string; on: boolean; mudar: (v: boolean) => void }) => (
  <button type="button" role="checkbox" aria-checked={on} onClick={() => mudar(!on)} className={`${seleciona(on)} flex w-full items-center gap-2 py-2 text-left`}>
    <span className={`grid size-6 shrink-0 place-items-center rounded-md border ${on ? 'border-white' : 'border-white/40'}`}>{on && <IcCheck className="size-5" />}</span>
    {rotulo}
  </button>
)

function Campo({ p, v, mudar }: { p: Pergunta; v: unknown; mudar: (x: unknown) => void }) {
  const escolhas = (itens: { id: unknown; rotulo: string }[], on: (id: unknown) => boolean, pick: (id: unknown) => void) => (
    <div className="flex flex-wrap gap-2">
      {itens.map((o) => (
        <button key={String(o.id)} type="button" aria-pressed={on(o.id)} onClick={() => pick(o.id)} className={seleciona(on(o.id))}>{o.rotulo}</button>
      ))}
    </div>
  )
  switch (p.tipo) {
    case 'simnao':
      return escolhas([{ id: true, rotulo: 'Sim' }, { id: false, rotulo: 'Não' }], (id) => v === id, mudar)
    case 'opcao':
      return escolhas(p.opcoes.map((o) => ({ id: o.id, rotulo: o.rotulo })), (id) => v === id, mudar)
    case 'multi': {
      const l = Array.isArray(v) ? (v as string[]) : []
      return escolhas(p.opcoes.map((o) => ({ id: o.id, rotulo: o.rotulo })), (id) => l.includes(id as string), (id) => mudar(l.includes(id as string) ? l.filter((x) => x !== id) : [...l, id]))
    }
    case 'inteiro':
      return escolhas(Array.from({ length: p.max - p.min + 1 }, (_, i) => ({ id: p.min + i, rotulo: String(p.min + i) })), (id) => v === id, mudar)
    case 'texto':
      return (
        <textarea
          aria-label={p.rotulo}
          value={typeof v === 'string' ? v : ''}
          maxLength={p.max}
          rows={3}
          onChange={(e) => mudar(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 p-3 text-[15px]"
        />
      )
    case 'aceite':
      return <Caixa rotulo={p.rotulo} on={v === true} mudar={(x) => mudar(x ? true : undefined)} />
  }
}

// `coach`: o coach corrige ou lança pelo aluno (origem 'coach'); `aoFim` volta à ficha.
export type ModoCoach = { aoFim: () => void }

export default function AnamneseAluno({ uid }: { uid: string }) {
  const { carregando, ultima, anotacao, motivo } = useAnamnese(uid)
  if (carregando) return <Centro>Carregando…</Centro>
  return <Conteudo uid={uid} ultima={ultima} anotacao={anotacao} motivo={motivo} />
}

export function Conteudo({ uid, ultima, anotacao = '', motivo, coach }: { uid: string; ultima: ReturnType<typeof useAnamnese>['ultima']; anotacao?: string; motivo: 'primeira' | 'ciclo' | null; coach?: ModoCoach }) {
  const chave = (coach ? 'coach-' : '') + uid // rascunho do coach não se mistura com o do aluno
  // Rascunho do aparelho vale só se for mais novo que a última resposta enviada (pendente conta como mais nova).
  const [rasc] = useState(() => {
    const d = ler(chave)
    return d && (!ultima || (ultima.em != null && ultima.em < d.t)) ? d : null
  })
  const [editando, setEditando] = useState(!ultima || !!rasc || !!coach)
  const [enviado, setEnviado] = useState<Respostas | null>(null)
  const [etapa, setEtapa] = useState(rasc?.etapa ?? 0)
  const [menor, setMenor] = useState(rasc?.menor ?? ultima?.r.responsavelConfirmou === true)
  const [r, setR] = useState<Respostas>(() => rasc?.r ?? (({ declaracao: _d, ...resto }) => resto)(ultima?.r ?? {}))
  const [erro, setErro] = useState('')
  const [confirma, setConfirma] = useState<{ p: Pergunta; passo: 1 | 2 } | null>(null) // dupla confirmação do sim grave
  const [enviando, setEnviando] = useState(false)
  const topo = useRef<HTMLDivElement>(null)
  useEffect(() => {
    topo.current?.scrollIntoView?.({ block: 'start' })
  }, [etapa])

  const ativas = (e: number) =>
    PERGUNTAS[e].perguntas.filter(
      (p) => !('soMenor' in p) && !(p.id === 'parqQual' && !avisoMedico(r)) && !(p.id === 'tempoParado' && r.experiencia === 'nunca'),
    )
  // "Sim" numa pergunta grave (do aluno; o coach lança direto) só vale depois de 2 confirmações; mudar para "Não" é direto.
  const pedir = (p: Pergunta, v: unknown) => (!coach && v === true && PARQ_GRAVES.includes(p.id) && r[p.id] !== true ? setConfirma({ p, passo: 1 }) : mudar(p.id, v))
  const mudar = (id: string, v: unknown) => {
    const n = { ...r }
    if (v === undefined) delete n[id]
    else n[id] = v as Respostas[string]
    setR(n)
    guardar(n, menor, etapa)
  }
  const guardar = (rr: Respostas, m: boolean, e: number) => {
    try {
      localStorage.setItem(CHAVE_RASCUNHO + chave, JSON.stringify({ r: rr, menor: m, etapa: e, t: Date.now() } satisfies Rascunho))
    } catch {
      /* sem armazenamento: segue sem rascunho */
    }
  }
  const mudarMenor = (m: boolean) => {
    setMenor(m)
    guardar(r, m, etapa)
  }
  const irPara = (e: number) => {
    setEtapa(e)
    guardar(r, menor, e)
  }

  const respondida = (p: Pergunta) => (p.tipo === 'aceite' ? r[p.id] === true : p.id in r)
  const falta = (e: number) => ativas(e).some((p) => 'obrigatoria' in p && p.obrigatoria && !respondida(p)) || (e === 0 && menor && r.responsavelConfirmou !== true)

  // Envia sem esperar o servidor (offline vale): a regra recusaria em silêncio, então valida antes.
  function enviar(base: Respostas) {
    const final: Record<string, unknown> = {}
    const vis = PERGUNTAS.flatMap((_, i) => ativas(i)).map((p) => p.id)
    for (const [k, v] of Object.entries(base)) if ((vis.includes(k) || (k === 'responsavelConfirmou' && menor)) && v !== '') final[k] = v
    if (menor && final.responsavelConfirmou !== true) return setErro('O responsável precisa autorizar.')
    const erros = validarRespostas(final)
    if (erros.length) {
      const e = PERGUNTAS.findIndex((et) => et.perguntas.some((p) => p.id === erros[0]))
      setEditando(true)
      if (e >= 0) setEtapa(e)
      return setErro('Falta responder algo. Confira as perguntas.')
    }
    setErro('')
    setEnviando(true)
    ;(coach ? novaVersaoCoach : enviarAnamnese)(uid, final as Respostas)
      .then(() => { apagar(chave); coach?.aoFim() })
      .catch((e) => {
        registrarErro('gravacao', `anamnese: ${e?.code ?? e}`, e) // só o código, nunca a resposta
        setEnviando(false)
        if (coach) setErro('Não foi possível salvar. Tente de novo.')
      })
    if (!coach) setEnviado(final as Respostas)
  }

  if (enviado)
    return (
      <main className="mx-auto max-w-md space-y-4 px-4 py-4">
        <Quadro className="space-y-3 text-center">
          <h1 className="text-[24px] leading-tight">Anamnese enviada</h1>
          <p className="text-sm text-slate-400">Obrigado! Só você e seu coach veem estas respostas.</p>
        </Quadro>
        {parqGrave(enviado) ? (
          <Aviso>Seu treino está pausado pela sua saúde. Seu coach vai conversar com você e liberar o treino. Procure seu médico antes de treinar forte.</Aviso>
        ) : (
          avisoMedico(enviado) && <Aviso>Procure seu médico antes de treinar forte.</Aviso>
        )}
        <Botao tipo="primario" tamanho="lg" className="w-full" onClick={() => ir('/')}>Ir para o início</Botao>
      </main>
    )

  if (!editando && ultima)
    return (
      <main className="mx-auto max-w-md space-y-4 px-4 py-4 pb-8">
        <BotaoVoltar para="/conta" />
        <h1 className="text-[24px] leading-tight">{motivo === 'ciclo' ? 'Confirme sua anamnese' : 'Minha anamnese'}</h1>
        {motivo === 'ciclo' && <p className="text-sm text-slate-400">Um ciclo terminou. Se nada mudou na sua saúde, confirme. Se mudou, atualize.</p>}
        <FichaAnamnese r={ultima.r} />
        {anotacao && (
          <Quadro className="space-y-1">
            <h2 className="text-sm font-semibold text-slate-300">Anotação do seu coach</h2>
            <p className="whitespace-pre-line break-words text-sm">{anotacao}</p>
          </Quadro>
        )}
        {erro && <Aviso>{erro}</Aviso>}
        <div className="space-y-2">
          {motivo === 'ciclo' && <Botao tipo="primario" tamanho="lg" className="w-full" onClick={() => enviar({ ...ultima.r, declaracao: true })}>Nada mudou</Botao>}
          <Botao tipo={motivo === 'ciclo' ? 'vidro' : 'primario'} tamanho={motivo === 'ciclo' ? 'md' : 'lg'} className="w-full" onClick={() => setEditando(true)}>Atualizar minhas respostas</Botao>
        </div>
      </main>
    )

  const ultimaEtapa = etapa === PERGUNTAS.length - 1
  return (
    <main className={`mx-auto max-w-md px-4 py-4 ${coach ? "pb-6" : "pb-32"}`}>
      <div ref={topo} />
      <BotaoVoltar para={ultima ? '/conta' : '/'} aoVoltar={etapa > 0 ? () => irPara(etapa - 1) : coach ? coach.aoFim : undefined} />
      <p className="text-sm text-slate-400">Etapa {etapa + 1} de {PERGUNTAS.length}</p>
      <div role="progressbar" aria-valuemin={1} aria-valuemax={PERGUNTAS.length} aria-valuenow={etapa + 1} className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-marca-500 transition-all" style={{ width: `${((etapa + 1) / PERGUNTAS.length) * 100}%` }} />
      </div>
      <h1 className="mt-3 text-[24px] leading-tight">{PERGUNTAS[etapa].titulo}</h1>
      {etapa === 0 && (
        <Quadro className="mt-3 space-y-2">
          <Caixa rotulo="Tenho menos de 18 anos" on={menor} mudar={mudarMenor} />
          {menor && (
            <>
              <p className="text-sm text-slate-400">Um responsável legal precisa autorizar.</p>
              <Caixa rotulo={TODAS.find((p) => p.id === 'responsavelConfirmou')!.rotulo} on={r.responsavelConfirmou === true} mudar={(v) => mudar('responsavelConfirmou', v ? true : undefined)} />
            </>
          )}
        </Quadro>
      )}
      <div className="mt-4 space-y-5">
        {ativas(etapa).map((p) => (
          <section key={p.id} className="space-y-2">
            {p.tipo !== 'aceite' && <p className="text-[15px] font-semibold">{p.rotulo}</p>}
            <Campo p={coach && p.tipo === 'aceite' ? { ...p, rotulo: 'Lancei conforme o aluno informou.' } : p} v={r[p.id]} mudar={(v) => pedir(p, v)} />
          </section>
        ))}
      </div>
      {erro && <div className="mt-4"><Aviso>{erro}</Aviso></div>}
      {confirma && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-30 flex flex-col justify-end bg-slate-950/90 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="mx-auto w-full max-w-md space-y-4">
            {confirma.passo === 1 ? (
              <>
                <h2 className="text-[22px] leading-tight">Leia de novo com atenção</h2>
                <Quadro><p className="text-[15px] font-semibold">{confirma.p.rotulo}</p></Quadro>
                <div className="flex gap-2">
                  <Botao tamanho="lg" className="flex-1" onClick={() => setConfirma(null)}>Voltar</Botao>
                  <Botao tipo="primario" tamanho="lg" className="flex-[2]" onClick={() => setConfirma({ ...confirma, passo: 2 })}>Li, continuar</Botao>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-[22px] leading-tight">Tem certeza?</h2>
                <Aviso>Com esse "sim", seu treino fica pausado até seu coach conversar com você.</Aviso>
                <div className="flex gap-2">
                  <Botao tamanho="lg" className="flex-1" onClick={() => setConfirma(null)}>Não, corrigir</Botao>
                  <Botao tipo="primario" tamanho="lg" className="flex-[2]" onClick={() => { mudar(confirma.p.id, true); setConfirma(null) }}>Sim, tenho certeza</Botao>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className={coach ? 'sticky bottom-[calc(66px+1rem+env(safe-area-inset-bottom))] mt-6 rounded-2xl bg-slate-950/90 p-2 lg:bottom-2' : 'fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-slate-950/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3'}> {/* coach: o menu dele já ocupa o rodapé */}
        <div className="mx-auto flex max-w-md gap-2">
          {etapa > 0 && <Botao tamanho="lg" className="flex-1" onClick={() => irPara(etapa - 1)}>Voltar</Botao>}
          <Botao
            tipo="primario"
            tamanho="lg"
            className="flex-[2]"
            disabled={falta(etapa) || enviando}
            onClick={() => (ultimaEtapa ? enviar(r) : irPara(etapa + 1))}
          >
            {ultimaEtapa ? (enviando ? 'Enviando…' : 'Enviar') : 'Próximo'}
          </Botao>
        </div>
      </div>
    </main>
  )
}
