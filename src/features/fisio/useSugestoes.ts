import { useMemo } from 'react'
import { sinaisDasOrientacoes, sugestoesFisio } from '../../lib/sugestoesFisio'
import { useCheckins } from './useCheckins'
import { useDores } from './useDores'
import { useOrientacoes } from './useOrientacoes'

// Sugestões Físio ao coach (só de alunos que existem e não estão arquivados). `todas` inclui as dispensadas
// (arquivados/{chave}); `visiveis`, não. Sem consulta nova além de dores, check-ins e sinais.
export function useSugestoesFisio(alunos: { id: string; status?: string }[], arquivados: Set<string>) {
  const dores = useDores(null, true)
  const checkins = useCheckins(null, true)
  const sinais = useOrientacoes(null, true)
  const carregando = dores.carregando || checkins.carregando || sinais.carregando
  const todas = useMemo(() => {
    const ativos = new Set(alunos.filter((a) => a.status !== 'arquivado').map((a) => a.id))
    return sugestoesFisio({ dores: dores.todos, checkins: checkins.todos, sinais: sinaisDasOrientacoes(sinais.dados), agora: new Date() }).filter((s) => ativos.has(s.alunoId))
  }, [alunos, dores.todos, checkins.todos, sinais.dados])
  const visiveis = useMemo(() => todas.filter((s) => !arquivados.has(s.chave)), [todas, arquivados])
  // Algum dado só do cache do aparelho (pode estar incompleto): Alertas não limpa dispensas antigas.
  const cache = dores.cache || checkins.cache || sinais.cache
  const erro = !!(dores.erro || checkins.erro || sinais.erro)
  return { todas, visiveis, carregando, cache, erro }
}
