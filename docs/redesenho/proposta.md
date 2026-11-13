# Proposta de direção — app do aluno (RASCUNHO, não aprovado)

Prévia desenhada: `previa/previa-vfit.jpg`, `previa/previa-gislane.jpg`, `previa/previa-saas.jpg` (5 telas cada).
É uma direção para o Victor reagir, não um plano fechado. Diagnóstico que sustenta cada ponto: `estado-atual.md`.

## Ideia central
**Separar por frequência de uso.**
- O que o aluno faz **toda série** (carga, reps, descanso) fica grande, no polegar, com um toque.
- O que faz **às vezes** (anotar, senti dor) fica a um toque, pequeno.
- O que faz **raramente** (peso do corpo, lados diferentes, som, explicação do método, físio) sai do cartão e vai para um painel "Mais".

Assim, função nova entra no painel ou troca o miolo da série (como a isometria), sem aumentar a tela.

## Fluxo novo até o treino
| Passo | Hoje | Proposta |
|---|---|---|
| Abrir o treino | "Ver treino de hoje" → tela → "Iniciar treino" | **"Começar treino"** no Início já abre no 1º exercício e liga o relógio (1 toque a menos) |
| Avisos antes de começar | vários, um por função | uma tela só de "antes de começar" quando houver algo (métodos do dia, treino adaptado, anamnese) |
| Anotar a série | toca no campo kg, digita, toca em reps, digita | carga e reps já vêm com o valor da semana passada; **− / +** ajusta; tocar no número abre o teclado |
| Descansar | sobe até o topo do cartão, toca em ▶ 90 s | **"Série feita · descansar 90 s"**: marca e liga o descanso no mesmo toque |
| Saber onde estou | rolar | "3 de 6" + barrinha de progresso no topo; "Ver todos" mostra o mapa |
| Próximo exercício | rolar | botão fixo embaixo: "Próximo: Remada Curvada" |
| Concluir | rolar até o fim | no último exercício, o botão de baixo vira **"Concluir"** (com a confirmação de hoje) |

## Tela do treino: um exercício por vez (prévia, telas 2 a 5)
- **Topo fino:** voltar, "3 de 6", relógio do treino. Barrinha com um traço por exercício (feito, atual, falta).
- **Nome do exercício grande** + selo do método + "Semana passada: 38 kg × 10".
- **Séries:**
  - feitas: uma linha com ✓ e o que foi anotado (tocar reabre para corrigir);
  - **a série da vez: cartão aberto** com carga e reps grandes, − e +, e o botão "Série feita · descansar";
  - as próximas: uma linha, em cinza.
  - Drop: aparece dentro da série a que pertence ("+ 2 drops"), abrindo quando chega a vez.
- **Três atalhos:** Anotar · Senti dor · Mais.
- **Painel "Mais"** (tela 3): peso do corpo, lados diferentes, som do descanso, como fazer o método, orientação do físio (só se houver), cancelar treino.
- **Descanso:** barra embaixo, como hoje, com "Pular". Ao terminar, a próxima série já está aberta.
- **"Ver todos"** (tela 5): lista compacta de todos os exercícios, com bolinhas das séries feitas e os grupos (Biset) ligados. Tocar pula para o exercício. Serve também para quem prefere ver tudo antes de começar.
- **Grupos (Biset, Triset, Circuito):** o botão de baixo alterna entre os exercícios do grupo ("Agora: A2 · Tríceps Pulley") e o descanso só liga depois do último do grupo, como já é hoje.

### Isometria (tela 4)
Mesmo esqueleto. No lugar de "reps − +", um **cronômetro grande** com a meta (0:30). "Parar e anotar 18 s" grava os segundos no mesmo campo de reps (`reps.<slotId>.s<n>`, como o plano da isometria já define). Carga extra continua opcional, no painel "Mais" ou num campo pequeno.

### Onde foi parar cada função de hoje
| Função | Hoje | Proposta |
|---|---|---|
| kg e reps por série | 6 campos por cartão | série da vez, grande; as outras em linha |
| Carga da semana passada | cinza dentro do campo | já vem preenchida + texto "Semana passada" |
| Descanso (ligar, pausar, reiniciar) | topo do cartão | botão "Série feita" + barra embaixo |
| Som do descanso | sino em todo cartão | painel "Mais" (uma vez) e Conta |
| Anotação | linha no cartão | atalho "Anotar" (mostra a anotação existente logo abaixo do nome) |
| Senti dor | botão em todo cartão | atalho "Senti dor" |
| Peso do corpo | caixa + texto em todo cartão | painel "Mais"; **já vem ligado** onde o corpo é a carga, com uma linha discreta "inclui o peso do corpo" |
| Lados diferentes | botão no cartão | painel "Mais"; a série mostra "kg por lado" |
| Método (explicação) | selo no cartão | selo continua (é informação do treino) + item no "Mais" |
| Físio | selo no cartão | selo continua só quando há orientação + item no "Mais" |
| Cancelar treino | botão vermelho no topo | fim do painel "Mais" |
| Concluir treino | fim da rolagem | botão de baixo no último exercício + em "Ver todos" |
| Recorde | festa por cima | igual |
| Offline ("salvo no celular") | texto no topo | ícone pequeno ao lado do relógio, texto ao tocar |

### Conta rápida (mesmo treino de exemplo)
| | Hoje | Proposta |
|---|---|---|
| Pontos de toque à vista | ~70 na tela | ~10 por exercício |
| Rolagem | 3,7 telas | nenhuma (cabe em 1 tela com até ~5 séries) |
| Toques por série (carga igual à anterior) | 3 campos/botões + teclado 2 vezes | **1** |
| Toques por série (mudou a carga) | idem | 2 a 4 (− / +) ou teclado |

São estimativas do desenho. Só valem depois de testar com aluno de verdade.

## Início (prévia, tela 1)
- Logo da marca no topo (hoje não aparece para o aluno; no SaaS é importante).
- Cartão do treino com **"Começar treino"**.
- Sua semana.
- **"Para você": uma fila única**, um aviso por vez, em ordem de importância: saúde/anamnese → pagamento → avaliação/relatório pronto → cardio → feedback. Função nova entra na fila, não vira mais um cartão.
- Quatro quadros de baixo saem: Evolução já é aba; Pagamento, Avaliações e Guia vão para "Você".
- "Sair" vai para "Você".

## Barra de baixo: 4 abas
Início · Treino · Evolução · **Você** (era "Conta").
- Físio vira item dentro de "Você" e aparece no Início/Treino **só para quem tem orientação**. A maioria dos alunos não tem, e hoje a aba ocupa lugar para todos.
- "Você" organizado em grupos: Meu corpo (peso, avaliações, anamnese, físio) · Plano (mensalidade, Pix) · App (avisos, como usar, guia de métodos, opinião) · Privacidade e sair.

## Riscos e cuidados
- **Quem gosta de ver tudo de uma vez** (aluno antigo, treino curto): por isso existe o "Ver todos". Decidir se ele pode ser a tela inicial por preferência.
- **Coach no presencial usa a mesma `Treino.tsx`** (com `coach`), para vários alunos em sequência. O redesenho precisa de um modo dele, ou ele fica na lista atual. Decisão de arquiteto.
- **Nenhuma carga pode se perder:** "Série feita" com o valor sugerido grava carga e reps de verdade (não é só um ✓). Desfazer precisa apagar o que gravou. Regra do domínio, TDD.
- **Valor pré-preenchido pode virar "anotação preguiçosa"** (aluno confirma sem conferir). Mitigar: mostrar de onde veio o número; o coach já vê reps abaixo da meta.
- **Tela grande (tablet/PC):** aluno quase não usa, mas não pode quebrar.
- **e2e:** quase todos os testes do aluno passam pela tela do treino; trocar o layout exige reescrever seletores. Fazer atrás de uma chave e migrar aos poucos.
- **Acessibilidade:** botões de 44 px no mínimo, contraste AA nas duas marcas e em qualquer cor de contratante (ver `saas.md`).

## Como validar antes de construir
1. Protótipo navegável só da tela do treino.
2. Victor testa em 2 ou 3 treinos presenciais, com aluno de perfil diferente (novo, antigo, com método/drop).
3. Medir o que der: tempo entre o fim da série e o descanso ligado; quantas vezes o aluno "se perde" (pergunta onde está algo).
4. Só então escrever o plano de implementação (arquiteto).
