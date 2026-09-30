# Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

Proposta aprovada em linhas gerais pelo Victor. **Pendente de confirmação:** os 2 primeiros exercícios de cada treino ficam fora do biset automático (padrão sugerido). Vai tudo num PR separado, e só se junta com o "pode juntar" do Victor.

## 1. Progressão por exercício (acaba principal/auxiliar)
- **Ideia:** as reps "andam junto" com o exercício (por `slotId`), não com a posição. Assim trocar a ordem ou montar biset nunca bagunça a progressão. Limite de 10 exercícios por treino.
- **Modelo:**
  - `progressao.padrao` (linhas [semana][série]) é a progressão que exercício novo copia.
  - `progressaoExercicio[slotId]` é a própria de cada exercício.
- **Motor:** as reps de um exercício vêm de `progressaoExercicio[slotId]`; se não houver, de `progressao.padrao`; se não houver, do legado (posições 1–2 = principais, 3–10 = auxiliares).
  - Sem os campos novos, o resultado é idêntico (golden da planilha passa).
  - Numa troca, vale a progressão do exercício da divisão naquela posição.
- **Conversão de meso antigo** (ao abrir no editor; ao salvar, grava o formato novo):
  - `padrao = auxiliares`;
  - posições 1–2 com principais diferente de auxiliares ganham `progressaoExercicio[slotId] = principais`;
  - overrides antigos com chave `'t-p'` passam para a chave `slotId`.
  - O aluno não vê diferença nenhuma.
- **Tela (aba Progressão):**
  - tabela "Progressão padrão";
  - por treino, a lista de exercícios; só os que diferem do padrão aparecem abertos;
  - botões "Personalizar" (copia do padrão) e "Voltar ao padrão".
- **Ajustar volume:** alvos todos, treino ou exercício (por `slotId`).
- O importador da planilha pode continuar gravando o formato legado.

## 2. Sugestão de biset/triset para caber no tempo
- **Quando aparece:** alguma sessão (semana × treino) passa de `meso.tempoLimiteMin`.
  - O Início do coach mostra o cartão "Treinos acima do tempo": aluno, semana, treino, tempo previsto e limite, com o botão "Ver sugestão".
  - O editor do meso mostra o mesmo aviso.
- **Algoritmo** (puro, `src/engine/sugestao.ts`, TDD):
  - **Quem entra:** exercícios fora das posições 1–2 (padrão, a confirmar) que ainda não estão em método.
  - **Equipamento**, por palavra-chave no nome:
    - `duasPolias`: crossover, crucifixo/voador na polia ou cabo;
    - `polia`: polia, cabo, pulley, corda, puxada;
    - `halter`, `barra`, `maquina` (cadeira, máquina, leg press, smith);
    - `pesoCorporal`.
  - **Grupo muscular:** o `grupo` de `src/data/exercicios.json`. Nome fora do catálogo fica fora da sugestão.
  - **Regras de par:**
    - grupos diferentes;
    - nenhum dos dois é `duasPolias`;
    - preferência: antagonistas (bíceps×tríceps, peito×costas, quadríceps×posterior), depois polia+halter, depois polia+polia simples, depois o resto.
  - **Guloso:** forma pares até o tempo previsto ficar ≤ limite; só usa triset se os bisets não bastarem. O tempo é calculado pelo motor (economia de pausa do método já existe).
  - **Saída:** propostas `{treino, semanas, posições, método, tempoAntes, tempoDepois}`.
- **Aplicar:** cria linhas de método (Biset/Triset, "Todas as séries", `grupo` n) nas semanas escolhidas. O coach pode tirar pares ou trocar o parceiro antes de aplicar.
- **Aluno:**
  - os exercícios do mesmo grupo de método aparecem juntos (só a ordem de exibição muda), com o rótulo "Biset A1/A2" e um conector visual;
  - uma vez, a mensagem "Seu coach adaptou seu treino para você progredir dentro do seu tempo." (usar `meso.adaptadoEm` + `localStorage`).

## Divisão (agentes Sonnet)
- **Arquiteto:**
  - motor (progressão por exercício e conversão)
  - `sugestao.ts` com testes
- **Dev coach:**
  - aba Progressão, cartão no Início, painel de sugestão
- **Dev aluno:**
  - agrupamento na exibição e mensagem
- **Auxiliar (Haiku):** PR e CI.
