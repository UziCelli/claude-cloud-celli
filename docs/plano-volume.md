# Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

Aprovado pelo Victor. Todos os textos da interface em pt-BR. Ponytail: o mínimo que funciona.

## 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD)
- **Volume = movimentos = soma das reps das séries** de um exercício numa semana (ex.: 3×8 = 24).
- `ajustarSeries(reps, pct, limite)`:
  - `alvo = pct > 0 ? ceil(total·(1+pct)) : floor(total·(1+pct))`, com mínimo de 1 rep por série.
  - Com `n` séries, enquanto `ceil(alvo/n) > limite` e `n < 6`, faz `n++`.
  - Distribui por igual; as primeiras séries levam o +1 que sobrar (ex.: 26 em 3 séries → 9/9/8).
  - Reps sempre inteiras ≥ 1; ímpar é permitido.
  - Retorna um array de 6 posições (`null` nas séries vazias).
- **Configuração do meso** (novos campos opcionais em `Meso`):
  - `progressaoPct` (padrão 5 = 5%/semana)
  - `limiteReps` (padrão 15)
  - `tempoLimiteMin` (sem padrão = sem aviso)
- **Por exercício:** `progressaoExercicio?: Record<'${treino}-${pos}', (number|null)[][]>` ([semana][série]).
  - Quando existe, **substitui** a linha principal/auxiliar daquele exercício em `sessao.ts`.
  - No Firestore fica como `{ 't1-3': { w1: [...], w2: [...] } }`, porque o Firestore não aceita array dentro de array.
- **Alvo de um ajuste:**
  - todos: linhas principais + auxiliares + overrides existentes
  - um treino: cria override para cada posição daquele treino
  - um exercício (treino+posição): cria override só dele
  - O override novo nasce como cópia da linha do grupo.
- `progressaoAutomatica(meso, { pct, de, ate, alvo })`: para cada semana `w` de `de` até `ate`, `linha(w) = ajustarSeries(linha(w-1), pct, limite)`.
- `reduzirVolume(meso, { pct, de, ate, retorno = 2, alvo })`: redução com **volta gradual** e **progressão pausada**.
  - A decisão está pendente de confirmação; esta é a sugestão.
  - `ref = linha(de-1)`; se `de == 1`, `ref = linha(1)`.
  - Semanas `de..ate`: `ajustarSeries(ref, -pct)`.
  - Volta em `retorno` semanas: a k-ésima semana usa `-pct·(retorno+1-k)/(retorno+1)` sobre `ref`. Ex.: −20% vira −13% e depois −7%.
  - Depois da volta, a progressão recomeça de `ref` com `+progressaoPct` por semana até o fim do meso.
  - Ou seja, a progressão fica **pausada** durante a redução e não "pula" para onde estaria. Evita o rebote.
- `tempoPorSemana(meso)`: o maior `tempoMin` entre os treinos de cada semana, via `prescreverSessao`. A tela usa para o aviso de tempo limite.
- **Meso novo** (`mesoPadrao`): as semanas 2..N já vêm com +5%/semana.

## 2. Tela do coach (editor do meso)
- **Aba Config:**
  - "Progressão por semana (%)"
  - "Limite de reps por série"
  - "Tempo limite do aluno (min)"
- **Aba Progressão, painel "Ajustar volume":**
  - modo: Progressão (%/semana) | Reduzir com volta gradual
  - % e semanas (de, até); na redução, também as semanas de volta
  - onde: todos | treino T | exercício (treino T, posição P)
  - botão **Calcular prévia**: mostra movimentos e tempo previsto por semana, antes → depois
  - botão **Aplicar**
  - Se alguma semana passar do `tempoLimiteMin`, aparece um `confirm`: "Vai passar do tempo limite: treino previsto ~82 min (limite 75). Aplicar mesmo assim?"
- **Overrides por exercício:** uma tabela por exercício, editável como as outras, com o botão "Voltar ao padrão".

## 3. Treino do dia em destaque (aluno)
- **Hoje:**
  - Abre na semana atual (já faz isso).
  - Destaca o **próximo treino**: o primeiro da semana ainda não concluído ("▶ Faça hoje: Treino 3").
  - Se a semana acabou, mostra "Semana concluída ✓".

## 4. Carga fantasma
- O placeholder do kg passa a ser **só o número** da carga anterior (em cinza, como as reps). Hoje aparece "sem. passada: 40 kg", que não cabe.
- Etapas de dropset continuam como estão.

## 5. Peso corporal (PC)
- Em cada exercício, um checkbox **"PC"**. Ligado:
  - `carga registrada = kg do corpo + kg extra digitado` (o total vai para `cargas`, então métricas e histórico não mudam)
  - `registro.pc.<slotId> = kg do corpo usado` (número; 0 ou ausente = desligado)
  - O campo mostra o **extra**. Abaixo aparece "PC: 41 kg (64% de 64 kg)".
- **Peso do aluno:** `usuarios/{uid}.pesoKg` (20..300). Na 1ª vez que ligar o PC, o app pergunta; dá para editar em Minha conta.
- **% por exercício** (`src/lib/pesoCorporal.ts`, por palavra-chave no nome; fontes: Winter 2009, massas dos segmentos; Ebben et al. 2011, flexões):

  | Palavra-chave no nome | % do peso |
  |---|---|
  | flexão de braço (joelhos: 49%) | 64% |
  | barra fixa, pull-up, chin-up | 95% |
  | paralela, mergulho | 90% |
  | remada invertida, australiana | 60% |
  | agachamento, afundo, passada, búlgaro, avanço, step, subida | 88% |
  | panturrilha | 95% |
  | lombar, hiperextensão, banco romano | 55% |
  | elevação pélvica, ponte, glúteo no solo | 50% |
  | abdominal (qualquer) | 30% |
  | outros | 100% |

## 6. Novidades (tutorial)
- Na tela de treino do aluno, um cartão "Novidades" nas **2 primeiras aberturas** depois da atualização. O contador fica no `localStorage`, com try/catch.
  - Itens: 📝 Anotação, PC, número fantasma, treino do dia em destaque.
  - Botão "Entendi".

## Divisão (agentes Sonnet; ninguém no mesmo arquivo)
- **A, motor:**
  - `src/engine/{tipos,sessao,volume,volume.test}.ts`
  - `src/lib/conversores.ts` (+ teste)
- **B, regras:**
  - `firestore.rules` + `tests/rules.test.ts`
  - `registros`: aceita `pc` (map)
  - `usuarios`: o aluno pode alterar `nome` e `pesoKg` (número 20..300)
- **C, aluno:**
  - `src/features/aluno/**`, `src/features/conta/MinhaConta.tsx`
  - `src/lib/acoes.ts`, `src/lib/pesoCorporal.ts` (+ teste)
  - e2e do aluno
- **D, coach (depois de A):**
  - `src/features/coach/meso/**`
  - e2e do coach
- **Fechamento:** revisor, depois o auxiliar (Haiku) faz commit, push, PR e acompanha o CI.
