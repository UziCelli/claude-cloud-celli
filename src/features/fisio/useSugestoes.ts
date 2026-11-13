import { useMemo } from 'react'
import { sugestoesFisio } from '../../lib/sugestoesFisio'
import { useCheckins } from './useCheckins'
import { useDores } from './useDores'
import { useOrientacoes } from './useOrientacoes'

// Sugestões Físio ao coach (só de alunos que existem e não estão arquivados). `todas` inclui as dispensadas
// (arquivados/{chave}); `visiveis`, não. Sem consulta nova além de dores, check-ins e sinais dos últimos 30 dias.
export function useSugestoesFisio(alunos: { id: string; status?: string }[], arquivados: Set<string>) {
  const dores = useDores(null, true)
  const checkins = useCheckins(null, true)
  const sinais = useOrientacoes(null, true)
  const carregando = dores.carregando || checkins.carregando || sinais.carregando
  const todas = useMemo(() => {
    const ativos = new Set(alunos.filter((a) => a.status !== 'arquivado').map((a) => a.id))
    return sugestoesFisio({ dores: dores.dados, checkins: checkins.dados, sinais: sinais.dados, agora: new Date() }).filter((s) => ativos.has(s.alunoId))
  }, [alunos, dores.dados, checkins.dados, sinais.dados])
  const visiveis = useMemo(() => todas.filter((s) => !arquivados.has(s.chave)), [todas, arquivados])
  // Algum dado só do cache do aparelho (pode estar incompleto): Alertas não limpa dispensas antigas.
  const cache = dores.cache || checkins.cache || sinais.cache
  return { todas, visiveis, carregando, cache }
}
