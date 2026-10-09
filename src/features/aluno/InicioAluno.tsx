import { collection, doc, query, where } from 'firebase/firestore'
import { prescreverSessao, type Meso } from '../../engine'
import type { Usuario } from '../../lib/acesso'
import { comVolta, diasDaSemana, treinoDeHoje } from '../../lib/agenda'
import type { RegistroAlerta } from '../../lib/alertas'
import type { MesoSalvo } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useDoc, useLista } from '../../lib/hooks'
import { fmtMin } from '../../lib/tempo'
import { IcCartao, IcCheck, IcFogo, IcGrafico, IcLivro, IcPrancheta, IcRelogio, IcSeta } from '../../icones'
import { ir } from '../../rota'
import { Chip, IconeQuadrado, Quadro } from '../../vidro'
import { fmtData } from '../coach/semana/format'
import { dataSP, diaCurto, mesoAtual } from './mesoAtual'
import { Centro } from '../../ui'

const Msg = ({ children }: { children: string }) => <p className="py-6 text-center text-slate-400">{children}</p>

const cartaoGrande = 'relative overflow-hidden rounded-[28px] bg-gradient-to-br from-marca-600 via-marca-700 to-marca-900 p-5 ring-1 ring-white/15 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.7)]'

export default function InicioAluno({ uid, nome }: { uid: string; nome: string }) {
  const { dados: mesos, carregando } = useLista<MesoSalvo>(query(collection(db, 'mesos'), where('alunoId', '==', uid)))
  const atual = mesoAtual(mesos)
  const { dados: registros, carregando: carregandoReg } = useLista<RegistroAlerta>(
    atual ? query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', atual.doc.id)) : null,
  )
  const { dados: perfil } = useDoc<Usuario>(doc(db, 'usuarios', uid))
  if (carregando || carregandoReg) return <Centro>Carregando…</Centro>

  const hoje = new Date()
  const data = hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Sao_Paulo' })
  return (
    <main className="mx-auto max-w-md space-y-4 px-4 py-4">
      <div className="pt-2">
        <p className="text-sm text-slate-400">{data[0].toUpperCase() + data.slice(1)}</p>
        <h1 className="text-[28px] leading-tight">Olá, {nome.split(' ')[0]} 👋</h1>
      </div>
      {!atual && <Msg>Seu coach ainda não montou seu treino.</Msg>}
      {atual?.estado.estado === 'antes' && <Msg>{`Começa em ${fmtData(atual.meso.inicio)}.`}</Msg>}
      {atual?.estado.estado === 'depois' && <Msg>Mesociclo concluído — fale com seu coach.</Msg>}
      {atual?.estado.estado === 'durante' && <Treinos mesoId={atual.doc.id} meso={atual.meso} registros={registros} hoje={hoje} />}
      <Quadros pagoAte={perfil?.pagoAte?.toMillis()} />
    </main>
  )
}

function Treinos({ mesoId, meso, registros, hoje }: { mesoId: string; meso: Meso; registros: RegistroAlerta[]; hoje: Date }) {
  const h = treinoDeHoje(meso, registros, hoje)
  if (!h) return null
  const feitos = new Set(registros.filter((r) => r.realizado).map((r) => `${r.semana}-${r.treino}`))
  const treinoHoje = 'treino' in h ? h.treino : null
  const sessao = treinoHoje ? prescreverSessao(comVolta(meso, registros, hoje), h.semana, treinoHoje) : null
  const abrir = () => ir(`/treino/${mesoId}/${h.semana}/${treinoHoje}`) // só abre a tela: o cronômetro liga no "Iniciar treino"

  // Sua semana: 7 dias do calendário (com "dias" no meso) ou só os treinos, sem datas.
  const hojeISO = dataSP(hoje)
  const itens = meso.dias?.length
    ? diasDaSemana(meso, h.semana).map((d) => ({ rot: diaCurto(d.data), n: Number(d.data.slice(8)), treino: d.treino, data: d.data as string | null }))
    : Array.from({ length: meso.frequencia }, (_, i) => ({ rot: `T${i + 1}`, n: i + 1, treino: i + 1, data: null as string | null }))
  const dias = itens.map((d) => {
    const feito = d.treino != null && feitos.has(`${h.semana}-${d.treino}`)
    const ehHoje = d.treino != null && (d.data ? d.data === hojeISO : d.treino === treinoHoje)
    const estado = feito ? 'feito' : !d.treino ? 'folga' : ehHoje ? 'hoje' : d.data && d.data < hojeISO ? 'perdido' : 'futuro'
    return { ...d, estado }
  })
  const total = dias.filter((d) => d.treino).length

  return (
    <>
      {sessao && treinoHoje ? (
        <section className={cartaoGrande}>
          <div aria-hidden className="absolute -right-16 -top-20 size-56 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <Chip cor="bg-white/15 text-white">Hoje</Chip>
              <span className="text-xs font-semibold text-white/70">Semana {h.semana} de {meso.semanas}</span>
            </div>
            <h2 className="mt-3 text-[34px] leading-none text-white">{'feito' in h && h.feito ? 'Treino de hoje concluído ✓' : `Treino ${treinoHoje}`}</h2>
            <p className="mt-2 flex items-center gap-3 text-sm text-white/80">
              <span>{sessao.exercicios.length} exercícios</span>
              <span className="flex items-center gap-1"><IcRelogio className="size-4" /> ≈ {fmtMin(sessao.tempoMin)}</span>
            </p>
            <p className="mt-3 text-[15px] leading-snug text-white/90">
              {sessao.exercicios.slice(0, 2).map((e) => e.slot.nome).join(' · ')}
              {sessao.exercicios.length > 2 && <span className="text-white/60"> +{sessao.exercicios.length - 2}</span>}
            </p>
            <button type="button" onClick={abrir} className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-base font-bold text-marca-900 shadow-lg">
              {'feito' in h && h.feito ? 'Ver treino' : 'Ver treino de hoje'} <IcSeta className="size-5" />
            </button>
          </div>
        </section>
      ) : (
        <section className={cartaoGrande}>
          <h2 className="text-[28px] leading-tight text-white">Hoje é descanso</h2>
          {'proximo' in h && h.proximo && (
            <p className="mt-2 text-[15px] text-white/85">Próximo: Treino {h.proximo.treino} · {diaCurto(h.proximo.dataTreino)}, {Number(h.proximo.dataTreino.slice(8))}</p>
          )}
        </section>
      )}

      <Quadro>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base">Sua semana</h3>
          <span className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
            <IcFogo className="size-4" /> {dias.filter((d) => d.estado === 'feito').length} de {total} feitos
          </span>
        </div>
        <div className="grid gap-1.5 text-center" style={{ gridTemplateColumns: `repeat(${dias.length}, minmax(0, 1fr))` }}>
          {dias.map(({ rot, n, estado, treino }) => (
            <div key={rot} className="flex flex-col items-center gap-1.5">
              <span className={`text-[11px] font-semibold ${estado === 'hoje' ? 'text-white' : 'text-slate-500'}`}>{rot}</span>
              <span
                className={`grid size-10 place-items-center rounded-full text-sm font-bold ${
                  estado === 'feito' ? 'bg-emerald-500/20 text-emerald-300'
                  : estado === 'hoje' ? 'bg-marca-500 text-white ring-4 ring-marca-500/30'
                  : estado === 'futuro' ? 'text-slate-200 ring-1 ring-white/20'
                  : estado === 'perdido' ? 'bg-white/5 text-slate-500 line-through decoration-2'
                  : 'text-slate-600'
                }`}
              >
                {estado === 'feito' ? <IcCheck className="size-5" /> : n}
              </span>
              <span className="h-3 text-[10px] font-semibold text-slate-500">{treino && itens.length === 7 ? `T${treino}` : ''}</span>
            </div>
          ))}
        </div>
      </Quadro>
    </>
  )
}

function Quadros({ pagoAte }: { pagoAte?: number }) {
  const emDia = pagoAte != null && pagoAte > Date.now()
  return (
    <div className="grid grid-cols-2 gap-3">
      <a href="#/evolucao" className="block">
        <Quadro className="h-full space-y-3">
          <IconeQuadrado><IcGrafico className="size-5" /></IconeQuadrado>
          <div>
            <p className="text-sm font-semibold">Evolução</p>
            <p className="text-xs text-slate-400">cargas, recordes e conquistas</p>
          </div>
        </Quadro>
      </a>
      <Quadro className="space-y-3">
        <IconeQuadrado cor={emDia ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}><IcCartao className="size-5" /></IconeQuadrado>
        <div>
          {!emDia && pagoAte != null && <Chip cor="bg-rose-500/15 text-rose-300">Vencido</Chip>}
          <p className="mt-2 text-sm font-semibold">Pagamento</p>
          <p className="text-xs text-slate-400">{pagoAte != null ? `${emDia ? 'Em dia · pago até' : 'Venceu em'} ${fmtData(new Date(pagoAte - 3 * 3600_000).toISOString())}` : '…'}</p>
        </div>
      </Quadro>
      <Quadro className="space-y-3 opacity-80">
        <IconeQuadrado cor="bg-white/8 text-slate-300"><IcPrancheta className="size-5" /></IconeQuadrado>
        <div>
          <Chip>Em breve</Chip>
          <p className="mt-2 text-sm font-semibold">Avaliações</p>
          <p className="text-xs text-slate-400">peso, medidas e % de gordura</p>
        </div>
      </Quadro>
      <a href="#/metodos" className="block">
        <Quadro className="h-full space-y-3">
          <IconeQuadrado cor="bg-fuchsia-500/15 text-fuchsia-300"><IcLivro className="size-5" /></IconeQuadrado>
          <div>
            <p className="text-sm font-semibold">Guia de métodos</p>
            <p className="text-xs text-slate-400">Dropset, Biset, Rest-pause…</p>
          </div>
        </Quadro>
      </a>
    </div>
  )
}
