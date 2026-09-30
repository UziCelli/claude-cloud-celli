# Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

Status: **rascunho, aguardando o Victor**. Todos os textos da interface em pt-BR. Ponytail: o mínimo que funciona.

## 1. Método em destaque no treino do aluno
- O rótulo "Dropset [últimas 2]" hoje é pequeno e cinza. Passa a ser um **selo grande e rosa**, o mesmo rosa do painel do coach:
  - letra maior e em negrito;
  - **ícone animado** do método (ver §3) à esquerda;
  - um "ⓘ" indicando que dá para tocar.
- Com mais de um método no exercício, cada um ganha o seu selo.
- **Tocar no selo** abre a nota daquele método (§2). A nota pode ser vista quantas vezes a pessoa quiser.
- **Séries do método com borda rosa:**
  - Exemplo: "Dropset [últimas 2]" destaca as caixas S2 e S3; "[S4]" destaca só a S4; "[todas]" destaca todas.
  - As caixas de drop (D1, D2…) também ficam rosa.
  - O cálculo sai do próprio rótulo, em `src/lib/metodoSeries.ts`, com teste. O motor não muda.

## 2. Nota de cada método (substitui o aviso atual do biset)
- Ao abrir um treino com método, aparece **uma nota só**, com todos os métodos daquele treino que a pessoa ainda não dispensou.
- Cada método da nota mostra:
  - o ícone animado;
  - o nome;
  - "como fazer" em 2 ou 3 linhas (textos do §4).
- No fim da nota: **"Toque no selo rosa do exercício para ver esta explicação de novo."**
- Botões:
  - **"Entendi"**: a nota volta na próxima vez.
  - **"Não mostrar de novo"**: some para aqueles métodos, naquele celular.
- Quem se arrepender tem dois caminhos:
  - tocar no selo, que sempre abre a explicação;
  - no Guia de métodos, usar o botão **"Mostrar as notas de novo"**.
- O "não mostrar" fica guardado no celular (`localStorage`, com try/catch), por método.
  - Chave: `forca-nota-<metodo>`.
  - Quem já tinha dispensado o aviso antigo do biset continua sem ver a nota de Biset, Triset, Superset e Circuito.

## 3. Ícones animados (um por método)
- Desenho em SVG e animação com `motion`, em loop suave, sem arquivos de imagem.
- Se o celular pedir "reduzir movimento", o ícone fica parado (`MotionConfig reducedMotion="user"`, que já existe).
- Mesmo componente em três tamanhos: pequeno no selo, médio na nota e grande no guia.
- `src/features/metodos/IconeMetodo.tsx`:

| Método | Ícone |
|---|---|
| Dropset | barra com anilhas; uma anilha sai e a barra continua subindo |
| Biset | dois halteres; um destaque passa do 1º para o 2º |
| Triset | três pontos em triângulo, acendendo em sequência |
| Superset | duas setas opostas (empurra/puxa) que se alternam |
| Circuito | seta circular girando, com pontos no caminho |
| Rest-pause | barra que enche, pausa (relógio) e enche mais um pouco |
| Clusterset | blocos pequenos aparecendo com espaços entre eles |

## 4. Guia de métodos (nova página, para aluno e coach)
- Rota `#/metodos`.
  - O aluno chega por um link "Guia de métodos" na tela Hoje e pelo botão "Ver todos os métodos" dentro da nota.
  - O coach chega pelo menu.
- Para cada método: ícone grande, **o que é**, **como fazer** (passos curtos) e **dica**.
- A fonte única dos textos é `src/data/metodos.ts`. A nota, o selo e o guia leem do mesmo arquivo, e ele é a documentação oficial dos métodos.
- **Textos (rascunho: o Victor confere e corrige):**
  - **Dropset**
    - O que é: continuar o exercício depois do cansaço, com menos peso.
    - Como fazer: faça a série; **sem descansar**, tire uns 20–30% do peso e faça as reps do D1; anote a carga do D1.
    - Dica: deixe o peso menor separado antes de começar.
  - **Biset**
    - O que é: 2 exercícios seguidos, sem descanso entre eles.
    - Como fazer: faça o A1 e vá direto para o A2; descanse só depois do A2; repita.
    - Dica: deixe os dois aparelhos prontos antes.
  - **Triset**
    - O que é: 3 exercícios seguidos, sem descanso entre eles.
    - Como fazer: A1 → A2 → A3; descanse só depois do último.
  - **Superset**
    - O que é: 2 exercícios seguidos, normalmente de músculos opostos (ex.: bíceps e tríceps), com pausa bem curta entre eles.
    - Como fazer: faça o 1º, descanse no máximo uns 15 s e faça o 2º; o descanso normal vem depois dos dois.
  - **Circuito**
    - O que é: todos os exercícios do grupo em sequência, como uma volta.
    - Como fazer: uma série de cada exercício, com pausa curta entre eles; o descanso normal vem no fim da volta.
  - **Rest-pause**
    - O que é: uma série "esticada" com mini-pausas.
    - Como fazer: vá até perto da falha, pare uns 20 s **com o mesmo peso** e faça mais algumas reps; repita se o treino pedir.
  - **Clusterset**
    - O que é: a série dividida em blocos pequenos.
    - Como fazer: faça poucas reps, pare uns 30 s, faça mais um bloco com o mesmo peso; os blocos juntos contam como uma série.

## 5. Cronômetro de descanso que chama a pessoa de volta
- **Continua rodando se a pessoa sair do app.**
  - Ao tocar ▶, o horário de término fica salvo no celular (`localStorage`).
  - Ao voltar ao app, o cronômetro mostra o tempo certo. Se já acabou, mostra "Descanso acabou".
- **Sons** (sem pacote de sons: gerados pelo próprio celular via Web Audio):
  - aos **5 s** e **4 s**, um bipe curto e médio;
  - aos **3, 2, 1 s**, um bipe mais agudo e mais forte;
  - aos **0 s**, o som de "tempo acabou" (dois tons subindo).
  - Todos os bipes são **agendados no toque do ▶**, então tocam no tempo certo mesmo se o app ficar lento.
  - Tocam por cima da música, sem parar o Spotify. No iPhone, a música abaixa um instante quando o iOS permite.
- **Vibração:** pulsos curtos em 3, 2, 1 e um longo no fim.
- **Notificação** "Descanso acabou, volte para o treino 💪" quando a pessoa está fora do app. O app pede a permissão no 1º ▶.
- **Tela acesa** enquanto o descanso corre (Wake Lock). Isso ajuda muito no iPhone.
- **Botão 🔔/🔕** ao lado do cronômetro para ligar e desligar o som (guardado no celular).
- **O que funciona em cada celular** (limite do sistema, dito com honestidade):

| | Android (APK/Chrome) | iPhone (Tela de Início) |
|---|---|---|
| Continua contando fora do app | ✅ | ✅ (mostra certo ao voltar) |
| Som com o app aberto | ✅ | ✅ |
| Som com o app em segundo plano | ✅ na maioria dos casos | ❌ o iOS pausa o app |
| Vibração | ✅ | ❌ o iPhone não deixa sites vibrarem |
| Notificação fora do app | ✅ (descansos de até ~5 min) | ❌ exige servidor |

- A notificação no iPhone precisaria de um servidor que dispare o aviso na hora certa: Cloud Functions, plano **Blaze** do Firebase, com cartão cadastrado. Para o volume atual o custo deve ficar perto de zero. **Fica fora desta entrega**, a menos que o Victor peça.
- Arquivos:
  - `src/lib/descanso.ts`: hook `useDescanso` com persistência, sons, vibração, notificação e tela acesa, com teste da parte de tempo;
  - `public/sw-descanso.js`: a notificação no Android, pelo service worker;
  - `vite.config.ts`: `workbox.importScripts`.

## Divisão (agentes Sonnet; nunca dois no mesmo arquivo)
- **A (dev):**
  - `src/data/metodos.ts`
  - `src/features/metodos/{IconeMetodo,GuiaMetodos}.tsx`
  - a rota em `src/App.tsx`
  - o link em `src/features/aluno/Hoje.tsx` e no menu do coach
- **C (dev), em paralelo com A:** `src/lib/descanso.ts` (+ teste), `public/sw-descanso.js`, `vite.config.ts`.
- **B (dev), depois de A e C:**
  - `src/lib/metodoSeries.ts` (+ teste)
  - `src/features/aluno/Treino.tsx`: selos, bordas rosa, nota nova (sai o `AvisoSequencia`) e troca para o `useDescanso` novo
- **e2e (aluno):**
  - o selo aparece, abre a nota e "Não mostrar de novo" funciona;
  - o guia lista os 7 métodos;
  - o cronômetro continua certo depois de recarregar a página.
- **Fechamento:** revisor → auxiliar (Haiku) faz commit, push e PR → "pode juntar" do Victor.
