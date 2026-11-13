# Físio — proposta A1: cruzar o treino real com as sugestões (para o Victor decidir)

Origem: revisão do PR #161 (13/11/2026), item A1. Hoje as sugestões ao coach (`src/lib/sugestoesFisio.ts`) usam só relatos de dor, check-ins e sinais de perigo. A anamnese, as cargas, as repetições feitas, o volume e a progressão **não** entram no cálculo. Nada abaixo foi implementado.

## O que mudaria para você (em linguagem simples)
- Hoje o app diz "considere polimento" e abre o editor. Com o A1, ele diria, por exemplo: "Joelho: 2 relatos de dor 5/10 nos treinos com agachamento e leg press; as reps ficaram abaixo da meta nas 2 últimas semanas. Proposta: −30% de séries nesses 2 exercícios na semana 6." Você confere e aplica no editor. **Nada muda sozinho.**

## Proposta em 3 passos (do mais seguro ao maior)
1. **Ligar o relato à sessão e ao exercício.** O check-in já guarda a sessão (meso, semana, treino). O relato de dor passa a guardar também `mesoId`, `semana`, `treino` e o exercício do treino (`slotId`). Os relatos antigos continuam valendo, sem vínculo. Exige mudar regra e teste.
2. **Montar um "contexto do aluno" único**, reaproveitando os cálculos que o app já tem (`repsAbaixo` e `treinosDemorados` em `src/lib/alertas.ts`; volume e tonelagem em `src/lib/evolucao.ts`; articulações de cada exercício em `src/lib/anatomia.ts`; anamnese). As sugestões passam a citar o que pesou: dor + reps abaixo da meta na mesma articulação = sugestão mais forte; dor sem queda de desempenho = "converse".
3. **Proposta revisável no editor.** "Considere polimento" abre o editor (aba Progressão) já com os exercícios da articulação afetada e um corte sugerido de séries. Você vê o antes e o depois e confirma. Sinal de perigo e pausa de saúde sempre vêm antes de qualquer proposta.

## O que o app continua NÃO fazendo
- Mexer no meso sozinho, sugerir método de reabilitação, diagnosticar, mostrar sugestão ao aluno.
- Transformar texto de protocolo em dose clínica.

## Decisões suas antes de começar
1. **Limiares.** A dica ao aluno manda parar em 6+, mas "converse com o aluno" só dispara em 7+. Alinhar os dois em 6? Os demais números (2 dores 4–6 em 14 dias; 3 check-ins com soma ≤ 7/15; queda de 30%) ficam?
2. **Gestação.** Mantém o contexto de liberação travado quando a anamnese diz gestação?
3. **Corte sugerido no passo 3.** Usar o mesmo % do polimento que você já usa no editor? Qual padrão (ex.: −30% de séries)?
4. **Ordem.** Fazer os 3 passos ou só o 1 e o 2 por enquanto?
