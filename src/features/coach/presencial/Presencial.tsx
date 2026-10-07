import { doc } from 'firebase/firestore'
import type { ReactNode } from 'react'
import type { Usuario } from '../../../lib/acesso'
import { db } from '../../../lib/firebase'
import { useDoc } from '../../../lib/hooks'
import Hoje from '../../aluno/Hoje'
import Treino from '../../aluno/Treino'

// Coach no celular, com o aluno: as mesmas telas do aluno, gravando no registro do ALUNO.
function Moldura({ uid, children }: { uid: string; children: ReactNode }) {
  const { dados } = useDoc<Usuario>(doc(db, 'usuarios', uid))
  return (
    <>
      <div className="sticky top-0 z-20 flex items-center justify-between gap-3 bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">
        <span className="min-w-0 truncate">Presencial: {dados?.nome ?? '…'}</span>
        <a href={`#/aluno/${uid}`} className="shrink-0 underline">Sair do presencial</a>
      </div>
      {children}
    </>
  )
}

export const PresencialHoje = ({ uid }: { uid: string }) => (
  <Moldura uid={uid}><Hoje uid={uid} base={`/aluno/${uid}/presencial`} /></Moldura>
)

export const PresencialTreino = ({ uid, mesoId, semana, treino }: { uid: string; mesoId: string; semana: number; treino: number }) => (
  <Moldura uid={uid}><Treino uid={uid} mesoId={mesoId} semana={semana} treino={treino} base={`/aluno/${uid}/presencial`} /></Moldura>
)
