# Estado atual — app do aluno (13/11/2026)

Retrato tirado da `main` (commit `a489a61`, depois do PR #166), no emulador, celular 390 × 844. Prints em `atual/`.
A isometria (entrega B) **ainda não entrou**; o que ela vai acrescentar está no fim.

## Caminho do aluno até o treino
1. Abre o app → **Início** (`aluno/InicioAluno.tsx`).
2. Toca em "Ver treino de hoje" → **tela do treino** (`aluno/Treino.tsx`). Ou: aba Treino (`aluno/Hoje.tsx`) → escolhe a semana → "Abrir treino".
3. Toca em **"Iniciar treino"** (liga o relógio e destrava os campos). Pode aparecer antes: pop-up dos métodos, aviso de treino adaptado, novidades, aviso de notificações, anamnese pendente.
4. Para cada exercício: anota kg e reps de cada série, liga o descanso, repete.
5. Rola até o fim → "Concluir treino" → confirma → **resumo** (`aluno/FimTreino.tsx`) com duração, volume, recordes, foto, check-in de dor (`fisio/CheckinFim.tsx`).

Do app aberto até a primeira carga anotada: **3 toques** no melhor caso, mais 1 para cada aviso que aparecer.

## Barra de baixo (5 abas)
Início · Treino · Físio · Evolução · Conta (`aluno/AlunoApp.tsx`). Some na tela do treino.

## Início — 1,5 tela de rolagem (`atual/01-aluno-inicio.jpg`)
Blocos, na ordem em que aparecem (cada um entrou numa entrega diferente):
1. Data, "Olá, nome", **Sair**, foto.
2. Cartão do treino de hoje (botão grande).
3. Sua semana.
4. "O que melhorar no app?" (feedback).
5. "Fez cardio hoje?" (Registrar).
6. Relatório pronto.
7. (quando há) avaliação pronta, anamnese pendente, aviso de pagamento, próximo ciclo.
8. Quatro quadros: Evolução, Pagamento, Avaliações, Guia de métodos.

Onde pesa:
- Avisos empilhados entre o botão principal e os quadros: a cada função nova, a tela cresce para baixo.
- A barra de abas fica por cima do conteúdo no meio da rolagem.
- "Sair" no topo, do lado do nome: ação rara em lugar nobre.
- Evolução, Guia de métodos e Físio aparecem em dois lugares (quadro e aba/Conta).

## Tela do treino — 3,7 telas de rolagem com 6 exercícios (`atual/02-aluno-treino.jpg`)
É a tela mais usada e a mais carregada. O que existe nela hoje:

**Topo**
- Voltar; "Treino N", semana, pausa, início; tempo previsto.
- Relógio do treino: "Iniciar treino" → "em andamento" + **"Cancelar treino"** (vermelho, no topo).
- Avisos: salvo no celular (offline), métodos do treino, treino adaptado, novidades, notificações.

**Em cada exercício (cartão)**
| Controle | Frequência de uso | Observação |
|---|---|---|
| Campo kg, um por série | toda série | campo pequeno, abre o teclado |
| Campo "feitas" (reps), um por série | toda série | idem |
| Botão de descanso (▶ 90 s), pausar, reiniciar | toda série | fica **no topo do cartão**, longe da série que acabou de ser anotada |
| Sino (som do descanso) | quase nunca | vale para o treino todo, mas repete em todo cartão |
| + Anotação (com data e lixeira) | às vezes | |
| Senti dor | raro | botão amarelo grande em todo cartão |
| Caixa "Feito com o peso do corpo" + 2 linhas de texto | raro | em **todo** cartão, mesmo em exercício de barra/máquina |
| "lados diferentes" + frase "anote os kg de cada lado" | só exercício de 2 lados | |
| Selo do método (abre explicação) e "Drop da S3 · 2 etapas" | só com método | |
| Selo Físio (abre orientação) | só com orientação | |
| Faixa de grupo (Biset A1/A2) | só em grupo | |

**Fim**
- "Concluir treino" (só no fim da rolagem) → confirmação → resumo.
- Barra do descanso fixa embaixo, com "Pular".
- Festa de recorde, por cima.

**Contagem** (treino de exemplo, 6 exercícios × 3 séries):
- 11 pontos de toque por cartão, no mínimo (6 campos + descanso + sino + anotação + dor + peso do corpo). Com 2 lados, método e físio, chega a 15.
- Cerca de **70 pontos de toque** na tela inteira. O aluno usa 3 deles a cada série (kg, reps, descanso).
- 3 a 4 telas de rolagem para chegar ao "Concluir".

Onde pesa:
- **Tudo tem o mesmo peso visual.** O que se usa 18 vezes por treino (kg, reps, descanso) tem o mesmo destaque do que se usa 1 vez por mês (peso do corpo, dor).
- **Teclado.** Cada série abre o teclado duas vezes. Na maioria das séries a carga é igual à da série anterior ou à da semana passada (que já aparece em cinza): daria para confirmar com um toque.
- **Descanso separado da série.** Anotar e descansar são dois gestos em lugares diferentes do cartão.
- **Sem noção de onde estou.** Não há "exercício 3 de 6" nem o que falta; o aluno rola para descobrir.
- **Ações perigosas ou raras no topo** ("Cancelar treino"), e a ação final ("Concluir") escondida no fim.
- **Cresce sozinha.** Cada função nova vira mais uma linha em todos os cartões. A isometria vai somar um cronômetro por série.

## Aba Treino — 1 tela (`atual/06-aluno-aba-treino.jpg`)
Bolinhas das semanas (feita, travada, atual), cartões dos treinos com "Abrir treino", aviso de reps abaixo. Está enxuta. Ponto de atenção: repete o papel do cartão "treino de hoje" do Início.

## Conta — 2,1 telas (`atual/07-aluno-conta.jpg`)
Foto, peso corporal, mensalidade/Pix, avisos (notificações, fim do descanso), Minha anamnese, Físio, Como usar, Guia de métodos, Sua opinião, Política de Privacidade, Sair. Virou o "depósito" do que não coube em outro lugar; não tem grupos.

## Outras telas do aluno (fora deste retrato, mas entram no redesenho)
Evolução (`features/evolucao/`), Avaliação física (`features/avaliacao/`), Anamnese (`features/anamnese/`), Físio (`features/fisio/FisioAluno.tsx`), Relatório do ciclo (`features/relatorio/`), Guia de métodos (`features/metodos/`), Feedback (`features/feedback/`), Pix (`aluno/PagarPix.tsx`), Tutorial (`aluno/Tutorial.tsx`), entrada/cadastro/instalar (`features/auth/`, `features/instalar/`, `features/onboarding/`).

## O que a isometria (entrega B) vai trazer para a tela do treino
Plano em `docs/plano-lados-isometria.md`, fase 3:
- a coluna de reps vira **segundos** nos exercícios isométricos;
- **botão de cronômetro por série**;
- carga continua opcional (anilha na prancha);
- "tempo sob tensão" no resumo e nos relatórios.

No layout de hoje isso é mais um botão por série em cada cartão isométrico. É o melhor exemplo de por que o cartão precisa de um desenho que aguente função nova sem crescer.

## O que NÃO é problema (manter)
- Gravação campo a campo e o aviso "salvo no celular" (offline).
- Número cinza da semana passada no campo.
- Cores e ícones dos métodos; grupos (Biset) visualmente ligados.
- Confirmação antes de concluir (pedido de aluno).
- Festa de recorde.
- Marca por `marcas/<id>/` (cores, logo, nome): o mesmo código já serve VFITCOACH e Gislane.
