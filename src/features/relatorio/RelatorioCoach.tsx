import { doc } from 'firebase/firestore'
import { useMemo, useState } from 'react'
import type { Usuario } from '../../lib/acesso'
import { liberarRelatorio, recolherRelatorio, salvarRelatorio } from '../../lib/acoes'
import { linkEmail, linkWhatsApp, primeiroNome } from '../../lib/contato'
import type { MesoSalvo } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useDoc } from '../../lib/hooks'
import { relatorioCiclo, type RelatorioCiclo } from '../../lib/relatorio'
import { Botao, Centro } from '../../ui'
import type { RelatorioDoc } from './RelatorioAluno'
import Relatorio, { BotaoPdf } from './Relatorio'
import { useDadosAluno } from './useDadosAluno'

const botaoLink = 'grid min-h-11 flex-1 place-items-center rounded-lg bg-slate-800 px-3 py-2 text-center text-sm font-semibold text-slate-100 hover:bg-slate-700'

export default function RelatorioCoach({ mesoId }: { mesoId: string }) {
  const meso = useDoc<MesoSalvo>(useMemo(() => doc(db, 'mesos', mesoId), [mesoId]))
  const aluno = useDoc<Usuario>(useMemo(() => (meso.dados ? doc(db, 'usuarios', meso.dados.alunoId) : null), [meso.dados]))
  const rel = useDoc<RelatorioDoc>(useMemo(() => doc(db, 'relatorios', mesoId), [mesoId]))
  const dados = useDadosAluno(meso.dados?.alunoId)
  const voltar = meso.dados ? `#/aluno/${meso.dados.alunoId}` : '#/alunos'
  const r = dados.carregando ? null : relatorioCiclo(dados.mesos, dados.registros, mesoId, new Date())
  return (
    <main className="mx-auto max-w-md px-4 py-4 lg:max-w-3xl">
      <a href={voltar} className="mb-3 inline-block text-sm text-slate-400">← Mesociclos do aluno</a>
      {meso.carregando || aluno.carregando || rel.carregando || dados.carregando ? (
        <Centro>Carregando…</Centro>
      ) : !r || !meso.dados || !aluno.dados ? (
        <p className="py-6 text-center text-slate-400">Ciclo não encontrado.</p>
      ) : (
        <Editor r={r} mesoId={mesoId} alunoId={meso.dados.alunoId} aluno={aluno.dados} rel={rel.dados} />
      )}
    </main>
  )
}

function Editor({ r, mesoId, alunoId, aluno, rel }: { r: RelatorioCiclo; mesoId: string; alunoId: string; aluno: Usuario; rel: RelatorioDoc | null }) {
  const [texto, setTexto] = useState(rel?.comentario ?? '')
  const [msg, setMsg] = useState('')
  const liberado = !!rel?.liberado
  // Não espera o servidor (offline a promessa só resolve na volta da internet): o estado vem do snapshot local.
  const rodar = (p: Promise<void>, ok: string) => {
    setMsg(ok)
    p.catch(() => setMsg('Não foi possível salvar. Confira a internet e tente de novo.'))
  }
  const aviso = `Oi, ${primeiroNome(aluno.nome)}! Seu relatório do ciclo ${r.nome} está pronto no app. Abra o Início para ver.`
  return (
    <div className="space-y-4">
      <Relatorio r={r} aluno={aluno.nome} comentario={texto} />
      <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <label className="block text-sm font-semibold" htmlFor="comentario-relatorio">Seu comentário para o aluno</label>
        <textarea
          id="comentario-relatorio"
          value={texto}
          maxLength={3000}
          rows={5}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ex.: Ciclo muito bom! Você subiu a carga no supino…"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-slate-100 outline-none focus:border-marca-500"
        />
        <p className="text-sm text-slate-400">{liberado ? 'O aluno já está vendo este relatório.' : 'O aluno só vê depois que você liberar.'}</p>
        <div className="flex flex-wrap gap-2">
          {liberado ? (
            <>
              <Botao tipo="primario" className="min-h-11 flex-1" onClick={() => rodar(liberarRelatorio(mesoId, alunoId, texto), 'Comentário atualizado.')}>Atualizar comentário</Botao>
              <Botao className="min-h-11 flex-1" onClick={() => rodar(recolherRelatorio(mesoId), 'Relatório recolhido: o aluno não vê mais.')}>Recolher</Botao>
            </>
          ) : (
            <>
              <Botao className="min-h-11 flex-1" onClick={() => rodar(salvarRelatorio(mesoId, alunoId, texto), 'Rascunho salvo.')}>Salvar rascunho</Botao>
              <Botao tipo="primario" className="min-h-11 flex-1" onClick={() => rodar(liberarRelatorio(mesoId, alunoId, texto), 'Liberado para o aluno.')}>Liberar para o aluno</Botao>
            </>
          )}
        </div>
        {msg && <p role="status" className="text-sm text-green-400">{msg}</p>}
        {liberado && (
          <div className="flex flex-wrap gap-2">
            <a href={linkWhatsApp(aviso)} target="_blank" rel="noreferrer" className={botaoLink}>Avisar no WhatsApp</a>
            {aluno.email && <a href={linkEmail(aluno.email, `Seu relatório do ciclo ${r.nome}`, aviso)} className={botaoLink}>Avisar por e-mail</a>}
          </div>
        )}
        <BotaoPdf r={r} aluno={aluno.nome} comentario={rel?.comentario} />
      </section>
    </div>
  )
}
