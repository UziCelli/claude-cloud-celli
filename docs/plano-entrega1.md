# Plano — Entrega 1 (aprovado pelo Victor)

pt-BR, Ponytail, cabe em 360px, animações seguem o padrão Motion já existente (`src/ui.tsx`).

## 1. Semana certa ao abrir (aluno)
- `semanaParaAbrir(meso, registros, hoje)` = `max(semana pela data, primeira semana ainda não concluída)`, limitada a `1..semanas`.
  - "Concluída" = todos os treinos `1..frequencia` com `realizado`.
  - Antes do início, abre a semana 1.
- As setas ← → continuam servindo só para olhar outras semanas.
- Nada de cache: os registros já estão no Firestore (offline).

## 2. Tempo do treino
- Na tela, sempre `Math.ceil(min)` + " min", **sem "~"**. O motor continua preciso; só a exibição arredonda.
- O tempo aparece em destaque (chip grande) no Hoje, na tela do treino e nas telas do coach (pré-visualização, visão da semana, prévia do Ajustar volume).
- Acima de `meso.tempoLimiteMin` o tempo fica **vermelho**, para o aluno e para o coach.
- Helper: `src/lib/tempo.ts`, com `fmtMin(min)` e `acimaDoLimite(min, limite?)`.

## 3. Cronômetro manual por exercício
- O cronômetro **não** liga mais sozinho ao gravar a carga.
- Cada exercício tem o botão **▶ {pausa} s**, que alterna entre ⏸ e ▶ e tem reiniciar.
- **Pausa por exercício:** campo opcional `Slot.pausaS`, que o coach edita na Divisão.
  - Vazio = pausa do meso.
  - O motor usa a pausa do exercício no cálculo do tempo. Sem `pausaS`, o resultado é idêntico ao de hoje (golden da planilha).

## 4. Tempo real do treino
- `registro.inicioEm` = `serverTimestamp()` na 1ª ação do aluno naquele treino (1ª carga/reps ou ▶). Só grava se ainda não existir.
- Duração real = `realizadoEm − inicioEm`.
- O coach vê "real X min × previsto Y min" no cartão da sessão.
- **Regras:** o registro aceita `inicioEm`, que precisa ser igual a `request.time` quando mudar.

## 5. Aviso de biset/triset/superset/circuito
- Na tela do treino, se a sessão tem algum desses métodos, aparece um modal com fundo escuro e borrado (`backdrop-blur`) explicando como fazer:
  - fazer os exercícios em sequência;
  - descansar só depois do último.
- Botões "Entendi" e "Não mostrar de novo". Essa escolha fica no `localStorage`, com try/catch.

## 6. Lista de exercícios (coach, Divisão e trocas)
- Troca o `<input list="catalogo">`, que não funciona bem no iOS, por um **combobox próprio**:
  - input com lista pequena (até 8 itens) logo abaixo;
  - toque seleciona; o teclado funciona (↑↓ Enter Esc);
  - mostra o grupo muscular em texto pequeno.
- **Busca:** `src/lib/busca.ts`, com `buscarExercicios(texto, limite=8)`.
  - Ignora acentos e maiúsculas.
  - Todos os termos precisam casar: "agach bulg" acha "Agachamento Búlgaro".
  - Ordem: nome começa com o texto → palavra começa com o termo → contém.
  - Aceita nome livre (fora do catálogo), como hoje.

## 7. Divisão bonita no PC
- Em telas médias ou maiores, cada treino vira um **cartão** alinhado, igual ao da pré-visualização:
  - "Treino N" no topo;
  - posições numeradas;
  - o campo de exercício com o combobox;
  - o campo de pausa (s) opcional.
- No celular fica o seletor de treino atual, com o mesmo cartão.

## Divisão de trabalho (agentes Sonnet; nunca dois no mesmo arquivo)
- **A (lógica, TDD):**
  - `src/lib/{semana,tempo,busca}.ts` com testes
  - `src/engine` (`Slot.pausaS` no tempo) com testes
  - `firestore.rules` e `tests/rules.test.ts` (`inicioEm`)
- **B (aluno), depois de A:**
  - `src/features/aluno/**`, `src/lib/acoes.ts`
  - `e2e/aluno.spec.ts`
- **C (coach), depois de A:**
  - `src/features/coach/**`
  - `e2e/coach.spec.ts` e `e2e/layout.spec.ts`
- **Fechamento:** auxiliar (Haiku) faz commit, PR e acompanha o CI.
