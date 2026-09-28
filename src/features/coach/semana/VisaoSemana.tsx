import { collection, doc, query, where } from 'firebase/firestore'
import { prescreverSessao } from '../../../engine'
import { marcarRealizado } from '../../../lib/acoes'
import { docParaMeso, docsParaRegistros, type MesoSalvo, type RegistroDoc } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { useDoc, useLista } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { Botao, Centro, Pagina } from '../../../ui'
import Evolucao from './Evolucao'
import { fmtData } from './format'
import Monitoramento from './Monitoramento'
import SessaoCard from './SessaoCard'

type RegistroDocCompleto = RegistroDoc & { realizado?: boolean }

export default function VisaoSemana({ id, semana }: { id: string; semana: number }) {
  const { dados, carregando } = useDoc<MesoSalvo>(doc(db, 'mesos', id))
  const { dados: docsRegistros, pendente } = useLista<RegistroDocCompleto>(
    query(collection(db, 'registros'), where('mesoId', '==', id)),
  )

  if (carregando) return <Centro>Carregando…</Centro>
  if (!dados) return <Centro>Meso não encontrado.</Centro>

  const meso = docParaMeso(dados)
  const registros = docsParaRegistros(docsRegistros)
  const realizados = Object.fromEntries(docsRegistros.map((d) => [`${d.semana}-${d.treino}`, !!d.realizado]))

  const semanaAtual = Math.min(Math.max(1, semana), meso.semanas)
  const primeiraSessao = prescreverSessao(meso, semanaAtual, 1)

  return (
    <Pagina
      titulo={
        <div>
          <div>{dados.nome}</div>
          {primeiraSessao && <div className="text-sm font-normal text-slate-400">Início {fmtData(primeiraSessao.inicioSemana)}</div>}
        </div>
      }
      acoes={
        <>
          <Botao onClick={() => ir('/meso/' + id)}>Editar meso</Botao>
          <Botao onClick={() => ir('/aluno/' + dados.alunoId)}>Ver aluno</Botao>
        </>
      }
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <Botao disabled={semanaAtual <= 1} onClick={() => ir(`/meso/${id}/semana/${semanaAtual - 1}`)}>
          ← Semana
        </Botao>
        <span className="font-semibold">
          Semana {semanaAtual} de {meso.semanas}
        </span>
        <Botao disabled={semanaAtual >= meso.semanas} onClick={() => ir(`/meso/${id}/semana/${semanaAtual + 1}`)}>
          Semana →
        </Botao>
        {pendente && <span className="ml-2 text-xs text-amber-400">sincronizando…</span>}
      </div>

      <div className="space-y-4">
        {Array.from({ length: meso.frequencia }, (_, i) => i + 1).map((treino) => {
          const sessao = prescreverSessao(meso, semanaAtual, treino)
          if (!sessao) return null
          const chave = `${semanaAtual}-${treino}`
          return (
            <SessaoCard
              key={treino}
              mesoId={id}
              alunoId={dados.alunoId}
              sessao={sessao}
              cargas={registros[chave] ?? {}}
              realizado={!!realizados[chave]}
              onRealizado={(v) => marcarRealizado(id, dados.alunoId, semanaAtual, treino, v)}
            />
          )
        })}
      </div>

      <div className="mt-6 space-y-4">
        <Monitoramento meso={meso} registros={registros} />
        <Evolucao meso={meso} registros={registros} />
      </div>
    </Pagina>
  )
}
