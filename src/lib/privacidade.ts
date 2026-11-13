// Versão da Política de Privacidade (src/features/privacidade). Mudou o texto? Troque a data: o app pede o aceite de novo.
// 2026-11-09: senha mínima. O aceite desta versão conferia a senha: quem tinha senha fraca trocou na hora (ver senhaJaConferida).
// Esta mesma versão também cobre o item "Sua opinião e depoimentos" (feedbacks), para ninguém aceitar duas vezes no mesmo dia.
// 2026-11-09b: avaliação física (Fase 3), dado de saúde novo. O sufixo "b" é a 2ª versão do mesmo dia.
// 2026-11-10: anamnese (histórico de saúde, inclusive de menores de 18 com autorização do responsável).
// 2026-11-10b: a avaliação física passa a registrar condição de saúde (lipedema), marcada só pelo coach.
// (A 2026-11-10 da anamnese já foi aceita pelos alunos: por isso o sufixo "b", para pedir o aceite de novo.)
// 2026-11-11: o PAR-Q com "sim" grave confirmado pausa o treino até o coach liberar.
// 2026-11-12: orientações Físio, liberação profissional registrada e relato de sinais de alerta.
export const VERSAO_PRIVACIDADE = '2026-11-12'

export const aceitouPrivacidade = (p: { privacidadeVersao?: string }) => p.privacidadeVersao === VERSAO_PRIVACIDADE

// Desde a 2026-11-09 o aceite conferia a senha e obrigava trocar a fraca: quem aceitou essa versão ou uma mais nova
// já tem senha forte. Trocar VERSAO_PRIVACIDADE agora só pede o "Li e aceito" (pop-up do Aceite.tsx), nunca a senha de novo.
// Comparação de texto vale porque as versões são datas AAAA-MM-DD (com sufixo b, c… no mesmo dia).
export const SENHA_CONFERIDA_DESDE = '2026-11-09'
export const senhaJaConferida = (p: { privacidadeVersao?: string }) => (p.privacidadeVersao ?? '') >= SENHA_CONFERIDA_DESDE
