# Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)

Aprovado pelo Victor em 08/10/2026 a partir dos prints do protótipo (protótipo local, fora do git).
Vale para as duas marcas (mesmo código; cores e nome vêm de `marcas/<id>/`).

## Regras que não mudam
- **Tela do treino (`Treino.tsx`) não muda de visual.** A única mudança nela é a carga sugerida de −5% na semana de volta (item 4), mostrada no mesmo lugar do número cinza de hoje.
- Nenhuma carga registrada pode se perder; nada de dado novo sensível (sem IP, sem telefone).
- Textos em pt-BR. Marca sempre por `@marca/...`, nunca "VFIT" fixo.

## Peças compartilhadas (já no código)
- `src/vidro.tsx`:
  - `BarraAbas` — barra de abas em vidro, fixa embaixo, `aria-current` na aba ativa;
  - `Brilho` — fundo com brilho da marca;
  - `Quadro`, `Chip`, `IconeQuadrado`.
- `src/icones.tsx` — ícones de traço.
- `src/index.css`:
  - `.vidro`, `.lente` e `.vidro-escuro` ficam em `@layer components`, então as classes do Tailwind podem sobrescrever;
  - `pb-barra` reserva o espaço da barra embaixo do conteúdo.

## 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`
- **Meso ganha `dias?: number[]`** (0 = dom … 6 = sáb), um dia por treino, marcado pelo coach na aba Config do editor.
  - Sem `dias`, o app segue como hoje: o "treino de hoje" é o próximo treino não feito da semana atual.
- **Ordem dos treinos com `dias`:** cada semana é um bloco de 7 dias a partir de `inicio` (como `semanaAtual`). Dentro do bloco, o k-ésimo dia de treino em ordem de calendário recebe o Treino k.
- **Treino de hoje:**
  - com `dias`: o treino marcado para a data de hoje (calendário de São Paulo); num dia de descanso, não há treino de hoje e aparece o próximo dia de treino;
  - "24 h" = virada do dia à meia-noite: o treino de ontem não feito deixa de ser o de hoje e fica "Não feito — ainda dá tempo nesta semana".
- **Semanas travadas (só para o aluno; o coach no presencial nunca trava):**
  - semana passada (número menor que a semana atual pela data);
  - dentro dela, treino feito pode ser aberto (para ver), treino não feito fica travado;
  - semana passada sem nenhum treino feito fica travada inteira.
  - Tocar em algo travado: a tela treme + aviso "Semana N já passou. Faça o treino desta semana 💪".
  - `Treino.tsx` não trava. Quem já está dentro do treino na virada da semana termina normalmente.
- **Semana de volta (−5%):**
  - Condição: semana `w` ≥ 2, `w` ≤ semana atual pela data, e nenhum treino feito na semana `w−1`.
  - Na semana `w`, o volume de cada exercício passa por `ajustarSeries(linha, −5, limite)`. Só nessa semana; as seguintes não mudam.
  - A carga sugerida (número cinza da semana anterior) × 0,95, arredondada a 0,5 kg.
  - Calculado na hora a partir dos registros, sem gravar nada. Usado em todos os lugares que comparam o prescrito com o feito do aluno: Hoje/Treino, monitoramento do coach e alerta de reps abaixo.

## 2. App do aluno
- **Barra de abas embaixo:** Início (`#/`), Treino (`#/treino`), Evolução (`#/evolucao`), Conta (`#/conta`).
  - Some na tela do treino e no fim do treino.
  - O cabeçalho do topo sai.
- **Início (novo):**
  - data;
  - "Olá, {primeiro nome} 👋";
  - cartão grande do treino de hoje (semana X de Y, nº de exercícios, minutos, 2 exercícios + "+N", botão "Ver treino de hoje", que abre a tela do treino **sem** ligar o cronômetro);
  - "Sua semana" com 7 dias (feito, não feito, hoje, próximo, descanso);
  - quadros:
    - Evolução;
    - Pagamento ("Em dia · pago até DD/MM", sem tela de Pix por enquanto);
    - Avaliações ("Em breve");
    - Guia de métodos.
  - Treino de hoje já feito: "Treino de hoje concluído ✓". Dia de descanso: "Hoje é descanso", com o próximo treino.
- **Treino (aba):** é a tela `Hoje.tsx` redesenhada.
  - Bolinhas das semanas: ✓ feita, cadeado travada, atual destacada.
  - Aviso da semana de volta.
  - Cartões dos treinos com dia ("Seg, 5"), estados Feito / Não feito / HOJE e botão "Abrir treino".
  - Mantém o aviso de reps abaixo e o de notificações.
- **Conta (nova, aluno):** nome, "Como usar" (tutorial), Guia de métodos, Política de Privacidade, Sair.

## 3. App do coach
- **Celular:** barra de abas embaixo — Início, Alunos, Alertas (selo com o número), Métodos, Conta. O topo fica só com o logo.
- **Computador (≥ lg):** menu lateral fixo com o logo, Início, Alunos, Alertas, Ranking, Métodos, Minha conta e Sair.
- **Início:**
  - "Bom dia/Boa tarde/Boa noite, {nome}";
  - 4 números: alunos ativos, treinaram hoje, alertas, vencem em 7 dias;
  - aguardando aprovação com "Liberar";
  - botões "Novo aluno" e "Ranking";
  - treinaram hoje;
  - sumidos e vencendo/vencidos.
  - Só com os dados que o Início já carrega; nenhuma consulta nova.
- **Editor do meso, aba Config:** "Dias de treino" (Dom–Sáb). É opcional; quando usado, exige exatamente `frequencia` dias.

## 4. Entrada
- **Navegador, 1ª visita** (marca `forca-boas-vindas-visto` no aparelho, sem IP):
  - boas-vindas com logo, título e 3 vantagens;
  - botão grande **Criar minha conta** e **Já tenho conta**;
  - cartão "Instale o app".
- **Instalar (só no navegador; some no app instalado):**
  - iPhone/Safari: folha guiada "Toque em ⋯ / Compartilhar" com seta animada, que mostra antes o caminho Compartilhar → Adicionar à Tela de Início → Adicionar (o menu do iPhone cobre o app).
  - Android/Chrome: o botão abre o "Instalar" do Chrome (`beforeinstallprompt`); sem ele, dica "⋮ → Instalar app".
- **App instalado:** abre direto no login.
  - `autocomplete` certo (`username`/`email`, `current-password`, `new-password`) para iPhone e Android preencherem a senha.
  - Aviso do reCAPTCHA pequeno no rodapé, com a versão.

## Ordem
1. Em paralelo: lógica (`agenda.ts`), coach (shell + Início + Config) e entrada.
2. App do aluno (usa a lógica).
3. e2e completo em um só lugar (porta 5173 e emuladores, sem rodar em paralelo), revisão, PR.
