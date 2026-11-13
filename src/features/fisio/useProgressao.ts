import { collection, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import type { Meso } from '../../engine'
import { lerAnamnese, maisRecente, type Anamnese } from '../../lib/anamnese'
import { docParaMeso, type MesoSalvo } from '../../lib/conversores'
import { doresDaAnamnese } from '../../lib/fisio'
import { db } from '../../lib/firebase'
import { useLista } from '../../lib/hooks'
import { sinaisProgressao, type RegistroProgressao } from '../../lib/progressaoFisio'

const DIA = 86400_000

// A1: sinais de progressão + região com dor na anamnese, só dos alunos com relato de dor nos últimos 14 dias
// (a sugestão de progressão só existe com dor na região). Uma consulta de registros com até 30 alunos;
// mesos e anamneses são as mesmas consultas do Início/Menu (o Firestore junta). `uid`: só aquele aluno (ficha).
export function useProgressao(comDor: string[], uid: string | null = null) {
  const ids = useMemo(() => [...new Set(comDor)].sort().slice(0, 30), [comDor])
  const chave = ids.join(',')
  const registros = useLista<RegistroProgressao>(useMemo(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    () => (ids.length ? query(collection(db, 'registros'), where('alunoId', 'in', ids)) : null), [chave]))
  const mesos = useLista<MesoSalvo>(useMemo(() => uid ? query(collection(db, 'mesos'), where('alunoId', '==', uid)) : query(collection(db, 'mesos')), [uid]))
  const anamneses = useLista<object>(useMemo(() => uid ? query(collection(db, 'anamneses'), where('alunoId', '==', uid)) : query(collection(db, 'anamneses')), [uid]))
  const progressao = useMemo(() => {
    const mapa = new Map<string, Meso>(mesos.dados.map((m) => [m.id, docParaMeso(m)]))
    const agora = new Date()
    return ids.flatMap((id) => sinaisProgressao(id, mapa, registros.dados, agora))
  }, [ids, mesos.dados, registros.dados])
  const anamnese = useMemo(() => {
    const porAluno = new Map<string, Anamnese[]>()
    for (const d of anamneses.dados) {
      const a = lerAnamnese(d.id, d)
      if (a) porAluno.set(a.alunoId, [...(porAluno.get(a.alunoId) ?? []), a])
    }
    return new Map([...porAluno].map(([id, l]) => [id, doresDaAnamnese(maisRecente(l)?.r)]))
  }, [anamneses.dados])
  const fontes = [registros, mesos, anamneses]
  return {
    progressao, anamnese,
    carregando: fontes.some((l) => l.carregando), cache: fontes.some((l) => l.cache), erro: fontes.some((l) => !!l.erro),
  }
}

// Alunos com relato de dor (tipo dor) nos últimos 14 dias.
export const alunosComDorRecente = (dores: { alunoId: string; tipo: string; em: { toMillis(): number } | null }[], agora = Date.now()) =>
  dores.filter((d) => d.tipo === 'dor' && d.em && agora - d.em.toMillis() <= 14 * DIA).map((d) => d.alunoId)
