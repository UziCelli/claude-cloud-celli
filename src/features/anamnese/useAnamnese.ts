import { collection, doc, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import type { Usuario } from '../../lib/acesso'
import { contaNovaParaAnamnese, lerAnamnese, maisRecente, motivoAnamnese, ultimaAnotacao, type Anamnese } from '../../lib/anamnese'
import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import { db } from '../../lib/firebase'
import { useDoc, useLista } from '../../lib/hooks'

// Situação da anamnese do aluno: a versão que vale, se precisa responder e se trava o "Iniciar treino".
// Trava só conta nova e só a primeira resposta; sem leitura confiável (erro/carregando) nunca trava.
export function useAnamnese(uid: string) {
  const a = useLista<object>(useMemo(() => query(collection(db, 'anamneses'), where('alunoId', '==', uid)), [uid]))
  const m = useLista<MesoSalvo>(useMemo(() => query(collection(db, 'mesos'), where('alunoId', '==', uid)), [uid]))
  const p = useDoc<Usuario>(doc(db, 'usuarios', uid))
  const docs = useMemo(() => a.dados.map((d) => lerAnamnese(d.id, d)).filter((x): x is Anamnese => !!x), [a.dados])
  const carregando = a.carregando || m.carregando || p.carregando
  const ok = !carregando && !a.erro
  const motivo = useMemo(() => (ok ? motivoAnamnese(docs, m.dados.map((x) => docParaMeso(x)), new Date()) : null), [ok, docs, m.dados])
  return { carregando, ultima: maisRecente(docs), anotacao: ultimaAnotacao(docs), motivo, travar: motivo === 'primeira' && contaNovaParaAnamnese(p.dados?.criadoEm?.toMillis()) }
}
