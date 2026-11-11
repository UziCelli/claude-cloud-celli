import { collection, query, where } from 'firebase/firestore'
import { useState } from 'react'
import { CARENCIA_DIAS, type Usuario } from '../../lib/acesso'
import { treinoDeHoje } from '../../lib/agenda'
import type { RegistroAlerta } from '../../lib/alertas'
import type { MesoSalvo } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useHoje, useLista } from '../../lib/hooks'
import { ir } from '../../rota'
import { Botao } from '../../ui'
import { Quadro } from '../../vidro'
import { dataSP, mesoAtual } from './mesoAtual'
import PagarPix, { contaDoDia, PIX, reais } from './PagarPix'

const chave = (hoje: Date) => `aviso-atraso-${dataSP(hoje)}`
const jaViu = (hoje: Date) => {
  try { return localStorage.getItem(chave(hoje)) === '1' } catch { return false }
}

// Tela cheia, 1x por dia, enquanto a mensalidade está vencida mas o acesso ainda não pausou (tolerância de 7 dias).
export default function AvisoAtraso({ uid, perfil, dias }: { uid: string; perfil: Usuario; dias: number }) {
  const hoje = useHoje()
  const [ciente, setCiente] = useState(false)
  const [pix, setPix] = useState(false)
  const oculto = ciente || jaViu(hoje)
  const { dados: mesos, carregando } = useLista<MesoSalvo>(oculto ? null : query(collection(db, 'mesos'), where('alunoId', '==', uid)))
  const atual = mesoAtual(mesos, hoje)
  const { dados: registros, carregando: carregandoReg } = useLista<RegistroAlerta>(
    atual ? query(collection(db, 'registros'), where('alunoId', '==', uid), where('mesoId', '==', atual.doc.id)) : null,
  )
  if (oculto) return null

  const faltam = CARENCIA_DIAS - dias // 0 = último dia (pausa à meia-noite)
  const conta = contaDoDia(perfil, hoje)
  const h = atual?.estado.estado === 'durante' ? treinoDeHoje(atual.meso, registros, hoje) : null
  const rota = atual && h && 'treino' in h && !h.feito && h.dataTreino <= dataSP(hoje) ? `/treino/${atual.doc.id}/${h.semana}/${h.treino}` : '/'

  const entendi = () => {
    try { localStorage.setItem(chave(hoje), '1') } catch { /* sem armazenamento */ }
    setCiente(true)
    ir(rota)
  }

  return (
    <div role="dialog" aria-label="Mensalidade vencida" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-slate-950">
      <main className="mx-auto w-full max-w-md flex-1 space-y-4 px-4 pb-4 pt-topo">
        <h1 className="text-[28px] leading-tight">Mensalidade vencida há {dias} {dias === 1 ? 'dia' : 'dias'}</h1>
        <p className="rounded-2xl bg-amber-900/30 p-3 text-amber-200">{faltam <= 0 ? 'Seu acesso pausa hoje à meia-noite.' : `Seu acesso pausa em ${faltam} ${faltam === 1 ? 'dia' : 'dias'}.`}</p>
        {conta && <p className="text-base font-semibold">Valor de hoje: {reais(conta.total)}</p>}
        {PIX && (
          <Quadro className="space-y-3 p-4">
            <Botao type="button" tipo="vidro" className="w-full" aria-expanded={pix} onClick={() => setPix(!pix)}>Pagar agora com Pix</Botao>
            {pix && <PagarPix uid={uid} perfil={perfil} />}
          </Quadro>
        )}
      </main>
      <div className="mx-auto w-full max-w-md px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
        <Botao type="button" tipo="primario" tamanho="lg" className="w-full" disabled={carregando || carregandoReg} onClick={entendi}>{rota === '/' ? 'Ciente, ir para o app' : 'Ciente, ir para o treino'}</Botao>
      </div>
    </div>
  )
}
