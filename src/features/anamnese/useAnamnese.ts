import { collection, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { lerAnamnese, maisRecente, motivoAnamnese, pausadoSaude, ultimaAnotacao, type Anamnese } from '../../lib/anamnese'
import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'

// Situação da anamnese do aluno: a versão que vale, se precisa responder e se trava o "Iniciar treino".
// Trava só a primeira resposta (quem nunca respondeu); `pausado` = sim grave sem liberação do coach; sem leitura confiável (erro/carregando) nunca trava.
export function useAnamnese(uid: string) {
  const a = useLista<object>(useMemo(() => query(collection(db, 'anamneses'), where('alunoId', '==', uid)), [uid]))
  const m = useLista<MesoSalvo>(useMemo(() => query(collection(db, 'mesos'), where('alunoId', '==', uid)), [uid]))
  const docs = useMemo(() => a.dados.map((d) => lerAnamnese(d.id, d)).filter((x): x is Anamnese => !!x), [a.dados])
  const carregando = a.carregando || m.carregando
  const ok = !carregando && !a.erro
  const motivo = useMemo(() => (ok ? motivoAnamnese(docs, m.dados.map((x) => docParaMeso(x)), new Date()) : null), [ok, docs, m.dados])
  return { carregando, ultima: maisRecente(docs), anotacao: ultimaAnotacao(docs), motivo, travar: motivo === 'primeira', pausado: !a.erro && pausadoSaude(docs) }
}
