// Versão da Política de Privacidade (src/features/privacidade). Mudou o texto? Troque a data: o app pede o aceite de novo.
// 2026-11-09: senha mínima. O aceite desta versão passa pela senha (Aceite.tsx): quem tinha senha fraca troca na hora.
// Esta mesma versão também cobre o item "Sua opinião e depoimentos" (feedbacks), para ninguém aceitar duas vezes no mesmo dia.
export const VERSAO_PRIVACIDADE = '2026-11-09'

export const aceitouPrivacidade = (p: { privacidadeVersao?: string }) => p.privacidadeVersao === VERSAO_PRIVACIDADE
