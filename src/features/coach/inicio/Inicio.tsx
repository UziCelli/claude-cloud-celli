import { useMemo } from 'react'
import { collection, query, where } from 'firebase/firestore'
import type { Usuario } from '../../../lib/acesso'
import { consultaRegistrosRecentes } from '../../../lib/acoes'
import { db } from '../../../lib/firebase'
import { useLista } from '../../../lib/hooks'
import { inicioJanela, resumoCoach, type AlunoComId, type RegistroResumo } from '../../../lib/resumo'
import { ir } from '../../../rota'
import { m } from 'motion/react'
import { Botao, Cartao, cascata, Contar, item, Pagina } from '../../../ui'

export default function Inicio() {
  const alunos = useLista<Usuario>(useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), []))
  const agora = new Date()
  const chave = inicioJanela(agora, 14)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registros = useLista<RegistroResumo>(useMemo(() => consultaRegistrosRecentes(agora), [chave]))
  const r = resumoCoach(alunos.dados as AlunoComId[], registros.dados, agora)
  const novo = (
    <Botao tipo="primario" onClick={() => ir('/alunos/novo')}>
      Novo aluno
    </Botao>
  )

  if (!alunos.carregando && alunos.dados.length === 0)
    return (
      <Pagina titulo="Início">
        <Cartao className="space-y-4 text-center">
          <p className="text-slate-400">Nenhum aluno ainda.</p>
          <Botao tipo="primario" className="w-full py-4 text-base" onClick={() => ir('/alunos/novo')}>
            Cadastrar primeiro aluno
          </Botao>
        </Cartao>
      </Pagina>
    )

  const blocos: [string, AlunoComId[], string][] = [
    ['Aguardando aprovação', r.aguardando, 'Ninguém aguardando.'],
    ['Vencendo em 7 dias', r.vencendo, 'Ninguém vencendo.'],
    ['Vencidos', r.vencidos, 'Nenhum vencido.'],
    ['Treinaram hoje', r.treinaramHoje, 'Ninguém treinou hoje ainda.'],
    ['Sumidos (7+ dias sem treinar)', r.sumidos, 'Ninguém sumido.'],
  ]
  return (
    <Pagina titulo="Início" acoes={novo}>
      <m.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" variants={cascata} initial="hidden" animate="show">
        {blocos.map(([titulo, lista, vazio]) => (
          <m.div key={titulo} variants={item}>
          <Cartao className="h-full space-y-2">
            <h2 className="font-semibold">
              {titulo} <span className="font-display text-lg font-bold text-marca-300"><Contar n={lista.length} /></span>
            </h2>
            {lista.length === 0 ? (
              <p className="text-sm text-slate-500">{vazio}</p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {lista.map((a) => (
                  <li key={a.id} className="min-w-0">
                    <a
                      href={`#/aluno/${a.id}`}
                      className="block max-w-full truncate rounded-lg bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                    >
                      {a.nome}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Cartao>
          </m.div>
        ))}
      </m.div>
    </Pagina>
  )
}
