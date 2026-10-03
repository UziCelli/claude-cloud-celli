# Plano — Painel de Evolução (03/10/2026)

Pedido do Victor: painel de evolução do aluno, "marqueteiro", para **manter o aluno motivado**. Vale para o aluno e para o coach.
Escolhas do Victor: conquistas/medalhas, cartão para o Instagram, festa no recorde, toneladas divertidas, e para o coach painel + ranking.
Avaliação física e relatórios escritos ficam para depois (Fase 3).

## Regras gerais
- **Sem mudança em `firestore.rules` e sem dado novo no Firestore.** Tudo é calculado no aparelho a partir de `mesos` e `registros`, que já existem.
  - Aluno: `registros where alunoId == uid` (todos os mesos dele).
  - Coach: lê tudo.
- Toda leitura de cargas passa por `docsParaRegistros(docs, meso)` (peso do corpo). Veja "Pontos sensíveis" em `docs/mapa.md`.
- Exercícios casam entre mesos pelo **nome** (`slot.nome`, já com trocas), igual a `evolucaoExercicio`.
- Textos em pt-BR, tom positivo (nunca "você piorou"). Respeitar `useReducedMotion`.
- Sem biblioteca nova: gráficos com divs/CSS, cartão com Canvas 2D.

## Definições (fonte da verdade do cálculo)
- **Treino feito:** registro com `realizado == true` OU com pelo menos uma carga/rep > 0.
  - Dia (São Paulo, `diaSP`) = `realizadoEm ?? inicioEm ?? atualizadoEm`. Sem nenhuma data, conta no total mas fica fora do calendário.
- **Semana de calendário:** segunda a domingo (São Paulo).
- **Semanas seguidas:** semanas consecutivas com ≥ 1 treino feito, contando para trás a partir da semana atual. A semana atual ainda vazia não quebra a sequência: começa da anterior. Também vale a **melhor sequência** de todos os tempos.
- **Ocorrência de um exercício:** cada vez que ele aparece num treino feito, com `cargaMax` e `volume` de `metricasExercicio` (reps efetivas). Ordem cronológica: `meso.inicio`, semana, treino, posição.
- **Maiores evoluções:** por exercício com ≥ 2 ocorrências com carga > 0. De = 1ª carga máx > 0; até = maior carga máx. Mostra kg e %. Top 5 por %, empate por kg.
- **Recorde:** ocorrência cuja carga máx é maior que todas as anteriores do mesmo exercício. A 1ª ocorrência não conta. Total e últimos 30 dias.
- **Mais constante:** exercício com a maior sequência de ocorrências seguidas sem baixar a carga máx (≥ 3).
- **Volume total (kg):** Σ carga × reps efetivas de todos os treinos feitos.
- **Toneladas divertidas:** maior objeto da tabela com qtd ≥ 5. Se nenhum chegar a 5, o maior com qtd ≥ 1.
  - Tabela: piano 0,4 t; carro popular 1 t; hipopótamo 1,5 t; elefante 6 t; ônibus 12 t; caminhão 20 t; avião 737 41 t; baleia-azul 150 t.
  - Exemplo: "48 t ≈ 8 elefantes".
- **Semana completa:** semana de um meso com todos os treinos 1..frequência feitos.
- **Conquistas** (lista fixa no código, ganhas para sempre):
  - treinos feitos: 1, 10, 25, 50, 100, 200;
  - melhor sequência de semanas: 2, 4, 8, 12, 26, 52;
  - recordes: 1, 10, 25, 50;
  - toneladas: 1, 10, 50, 100, 500;
  - semanas completas: 1, 4, 12.
  - Para cada categoria: as ganhas e a próxima, com progresso (0..1) e "faltam N".
- **Filtro:** "Tudo" (padrão) ou "Este meso". Conquistas sempre usam tudo.

## Peças
1. **`src/lib/evolucao.ts` + `evolucao.test.ts`** (TDD, puro). Funções:
   - `treinosFeitos`;
   - `historicoExercicios`;
   - `painelEvolucao(mesos, registros, agora, mesoId?)`;
   - `comparacaoToneladas(kg)`;
   - `recordeAnterior(historico, nome, excluir?)`;
   - `rankingAlunos(...)`.
2. **`src/features/evolucao/PainelEvolucao.tsx`**: tela única para o aluno (`#/evolucao`) e para o coach (`#/aluno/:uid/evolucao`).
   - Ordem: números grandes (treinos, semanas seguidas, toneladas) → calendário de dias treinados (12 semanas) e treinos por semana → maiores evoluções → mais constante e recordes → conquistas → tabela por exercício (o que existe hoje em `EvolucaoAluno.tsx`).
   - `EvolucaoAluno.tsx` passa a usar o painel.
3. **`src/features/evolucao/cartaoStory.ts`** + botão "Compartilhar":
   - imagem 1080×1920 em Canvas 2D com o logo (Path2D a partir dos `d` de `src/Logo.tsx`), primeiro nome e 3 a 4 números;
   - `navigator.share({ files })`; sem suporte, baixa o PNG;
   - CSP: `img-src 'self' data:` (prévia por data URL, não blob).
4. **Festa no recorde** (`Treino.tsx`):
   - ao gravar uma carga que passa `recordeAnterior` do exercício, aparece o aviso "Novo recorde! 🎉" (1× por exercício por treino) e o celular vibra;
   - **não mexer na gravação** (só leitura e aviso).
5. **Coach:**
   - botão "Evolução" em `MesosDoAluno`;
   - página `#/ranking` (`RankingAlunos.tsx`), com dados do meso atual de cada aluno: evolução %, frequência das últimas 4 semanas (feitos/previstos), semanas seguidas, recordes em 30 dias. Abas: Mais evoluíram / Mais frequentes / Em risco;
   - no Início, cartão "Frequência caindo", calculado em `resumoCoach` com os registros de 14 dias já carregados: fez menos da metade do previsto e ainda não está em "Sumidos". O cartão tem link para o ranking;
   - o Início não faz leitura extra.
6. **Testes e docs:**
   - e2e do painel (aluno e coach), do ranking e da festa no recorde;
   - `varredura.spec.ts` com as novas telas;
   - `docs/mapa.md` (arquivos e um ponto sensível), `docs/estado-sessao.md` e `docs/apresentacao.md`.

## Custo de leitura (plano grátis)
- O aluno lê todos os próprios registros (cerca de 100 a 300 documentos em 1 ano) ao abrir a Evolução e o Treino (por causa do recorde).
- O ranking lê só os mesos atuais.
- O Início continua igual.
