// Versão da Política de Privacidade (src/features/privacidade). Mudou o texto? Troque a data: o app pede o aceite de novo.
// 2026-11-09: senha mínima. O aceite desta versão passa pela senha (Aceite.tsx): quem tinha senha fraca troca na hora.
// Esta mesma versão também cobre o item "Sua opinião e depoimentos" (feedbacks), para ninguém aceitar duas vezes no mesmo dia.
// 2026-11-09b: avaliação física (Fase 3), dado de saúde novo. O sufixo "b" é a 2ª versão do mesmo dia.
// 2026-11-10: a avaliação física passa a registrar condição de saúde (lipedema), marcada só pelo coach.
export const VERSAO_PRIVACIDADE = '2026-11-10'

export const aceitouPrivacidade = (p: { privacidadeVersao?: string }) => p.privacidadeVersao === VERSAO_PRIVACIDADE
