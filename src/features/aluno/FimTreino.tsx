import { useRef, useState } from 'react'
import { m } from 'motion/react'
import { confete } from '../../movimento'
import type { ReactNode } from 'react'
import { comparacaoToneladas, type resumoTreino } from '../../lib/evolucao'
import { fmt } from '../coach/semana/format'
import Logo from '@marca/Logo'
import { Botao, cascata, item } from '../../ui'
import BotaoCompartilhar from '../evolucao/BotaoCompartilhar'
import { gerarCartaoTreino, limitar, type DadosTreino } from '../evolucao/cartaoStory'
import { reduzirFoto } from '../../lib/foto'
import { IcCamera, IcSubir, IcTrofeu } from '../../icones'

const CONFETE = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#facc15', '#a78bfa']

const dur = (ms: number) => {
  const s = Math.max(0, Math.round(ms / 1000))
  const [h, mi, se] = [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
  const p = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${p(mi)}:${p(se)}` : `${p(mi)}:${p(se)}`
}

const Lista = ({ titulo, cor, itens }: { titulo: ReactNode; cor: string; itens: string[] }) =>
  itens.length > 0 && (
    <m.section variants={item} className="rounded-2xl bg-black/30 p-3">
      <h2 className={`mb-1 text-sm font-extrabold uppercase tracking-wide ${cor}`}>{titulo}</h2>
      <ul className="space-y-0.5 text-sm font-semibold text-white">
        {limitar(itens).map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </m.section>
  )

export default function FimTreino({
  nome,
  duracaoMs,
  resumo,
  semana,
  feitosSemana,
  frequencia,
  quieto,
  voltar,
  verTreino,
}: {
  nome: string | undefined
  duracaoMs: number | null
  resumo: ReturnType<typeof resumoTreino>
  semana: number
  feitosSemana: number
  frequencia: number
  quieto: boolean | null
  voltar: () => void
  verTreino: () => void
}) {
  const { volumeKg, recordes, subiram } = resumo
  const comp = volumeKg > 0 ? comparacaoToneladas(volumeKg) : null
  const primeiro = nome?.trim().split(/\s+/)[0] ?? ''
  const data = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })
  const compTxt = comp ? `≈ ${comp.qtd} ${comp.qtd === 1 ? comp.objeto : comp.plural}` : undefined
  const volTxt = volumeKg > 0 ? `${fmt(Math.round(volumeKg))} kg` : null
  const recTxt = recordes.map((r) => `${r.nome}: ${fmt(r.kg)} kg (antes ${fmt(r.antes)})`)
  const subTxt = subiram.map((s) => `${s.nome}: ${fmt(s.antes)} → ${fmt(s.agora)} kg`)
  const [foto, setFoto] = useState<string>()
  const [previa, setPrevia] = useState<string>()
  const [erro, setErro] = useState(false)
  const entrada = useRef<HTMLInputElement>(null)
  const dados: DadosTreino = {
    nome: primeiro,
    data,
    duracao: duracaoMs != null ? dur(duracaoMs) : null,
    volume: volTxt,
    comparacao: compTxt,
    recordes: recTxt,
    subiram: subTxt,
    semana: { feitos: feitosSemana, total: frequencia },
    foto,
  }
  async function escolher(f?: File) {
    if (!f) return
    setErro(false)
    try {
      const url = await reduzirFoto(f, 1080, 1920, 1_500_000)
      setPrevia(undefined)
      setFoto(url)
    } catch {
      setErro(true)
    }
  }
  function pronta(blob: Blob) {
    const r = new FileReader()
    r.onload = () => setPrevia(r.result as string)
    r.onerror = () => {
      setErro(true)
      setFoto(undefined) // sem prévia, volta ao cartão em vez de ficar no esqueleto
    }
    r.readAsDataURL(blob) // blob: é barrado pela CSP em <img>
  }
  const segs = Math.min(Math.max(frequencia, 1), 7)
  return (
    <main className="mx-auto max-w-sm px-4 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
      {foto && previa && <img src={previa} alt="Prévia do story com a sua foto" className="w-full rounded-3xl shadow-xl" />}
      {foto && !previa && <div className="aspect-[9/16] w-full animate-pulse rounded-3xl bg-slate-800" />}
      {!foto && <m.div
        variants={cascata}
        initial="hidden"
        animate="show"
        className="relative space-y-3 overflow-hidden rounded-3xl bg-gradient-to-br from-marca-600 via-marca-700 to-slate-950 p-5 text-center text-white shadow-xl"
      >
        {!quieto &&
          recordes.length > 0 &&
          CONFETE.map((cor, i) => (
            <m.span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-24 h-2 w-2 rounded-sm"
              style={{ backgroundColor: cor }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: (i - 2.5) * 52, y: i % 2 ? 90 : -40, rotate: i * 120, opacity: 0 }}
              transition={confete}
            />
          ))}
        <m.div variants={item}>
          <Logo className="mx-auto h-8 text-white" />
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-marca-300">{data}</p>
        </m.div>
        <m.div variants={item}>
          <h1 className="text-3xl font-black uppercase leading-none">Treino concluído</h1>
          {primeiro && <p className="mt-1 text-xl font-bold text-marca-300">{primeiro}</p>}
        </m.div>

        {duracaoMs != null && (
          <m.div variants={item} className="rounded-2xl bg-black/30 p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Duração</p>
            <p className="text-5xl font-black tabular-nums">{dur(duracaoMs)}</p>
          </m.div>
        )}
        {volumeKg > 0 && (
          <m.div variants={item} className="rounded-2xl bg-black/30 p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Volume</p>
            <p className="text-5xl font-black tabular-nums">{volTxt}</p>
            {compTxt && <p className="text-sm font-semibold text-marca-300">{compTxt}</p>}
          </m.div>
        )}

        <Lista titulo={<><IcTrofeu className="inline size-4 align-[-2px]" /> Recordes</>} cor="text-amber-300" itens={recTxt} />
        <Lista titulo={<><IcSubir className="inline size-4 align-[-2px]" /> Subiu a carga</>} cor="text-emerald-300" itens={subTxt} />
        {recordes.length === 0 && subiram.length === 0 && volumeKg > 0 && (
          <m.p variants={item} className="text-sm text-slate-200">
            Constância é o que dá resultado. Até o próximo!
          </m.p>
        )}

        <m.div variants={item}>
          <div className="flex gap-1.5" aria-hidden>
            {Array.from({ length: segs }, (_, i) => (
              <span key={i} className={`h-2.5 flex-1 rounded-full ${i < feitosSemana ? 'bg-marca-300' : 'bg-white/20'}`} />
            ))}
          </div>
          <p className="mt-2 text-sm font-bold">{`Semana ${semana}: ${feitosSemana} de ${frequencia} treinos`}</p>
          {feitosSemana >= frequencia && <p className="text-sm font-bold text-marca-300">Semana completa!</p>}
        </m.div>
      </m.div>}

      <div className="mt-5 space-y-2">
        <input ref={entrada} type="file" accept="image/*" hidden onChange={(e) => { void escolher(e.target.files?.[0]); e.target.value = '' }} />
        {erro && <p role="status" className="text-sm text-red-400">Não deu para abrir essa foto. Tente outra.</p>}
        {!foto && (
          <Botao className="w-full" onClick={() => entrada.current?.click()}>
            <IcCamera className="mr-1.5 inline size-5 align-[-4px]" /> Adicionar foto
          </Botao>
        )}
        <BotaoCompartilhar dados={dados} gerar={gerarCartaoTreino} aoGerar={pronta} />
        {foto && (
          <div className="flex gap-2">
            <Botao className="flex-1" onClick={() => entrada.current?.click()}>
              Trocar foto
            </Botao>
            <Botao className="flex-1" onClick={() => { setFoto(undefined); setPrevia(undefined) }}>
              Tirar foto
            </Botao>
          </div>
        )}
        <Botao tipo="primario" className="w-full" onClick={voltar}>
          Voltar para Hoje
        </Botao>
        <Botao className="w-full" onClick={verTreino}>
          Ver treino
        </Botao>
      </div>
    </main>
  )
}
