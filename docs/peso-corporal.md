# Peso do corpo nas cargas

Para quem for auditar ou mexer. Tudo em português do Brasil na tela.

## Convenção de gravação (TOTAL)
- `cargas.<slotId>.s<n>` guarda o **total**: extra digitado + `pc.<slotId>` (peso do corpo daquele exercício, kg).
- `pc.<slotId>` = 0 ou ausente: a célula é só o que foi digitado.
- Aluno (`Treino.tsx`): o campo mostra `total - corpo` e grava `extra + corpo`.
- Coach (`SessaoCard.tsx`, campo `LoadInput`): igual ao aluno (mostra o extra, grava extra + `pc`).
- Gravação sempre campo a campo (`setDoc merge`); nunca se reescreve dado existente em massa.

## Normalização de leitura (`normalizarCargas`)
Aba e celular antigos continuam rodando versões velhas do app (o service worker não recarrega a página). Por isso há dados em formatos antigos, que são **lidos** de forma robusta, nunca reescritos. Com `pc[slot] > 0`:
- **(i) c < pc** → conta `c + pc`. Formato antigo: o aluno digitou o extra e marcou o corpo depois, numa versão sem `rebasear`. No formato novo `c >= pc` sempre.
- **(ii) célula vazia** → conta `pc` se o registro está `realizado` **ou** a série tem reps feitas (> 0). Formato antigo: versão sem `preencherCorpo`. Só séries prescritas (coluna < n); colunas de drop não são preenchidas.
- **(iii) c >= pc** → fica como está.
- Sem `pc` (ou 0): nada muda. Reps nunca mudam.
- `n` (séries prescritas) vem do meso (`docsParaRegistros(docs, meso)`). Sem `n`, usa o maior índice com dado em cargas/reps do slot.

## Marcação automática (`corpoEhCarga`)
- Barra fixa, flexão de braços, abdominal no solo sem carga, Superman/Paraquedista e agachamento com peso do corpo já vêm com "Somar meu peso corporal" marcado.
- Superman/Paraquedista contam 30% do peso do corpo, como o abdominal (deitado de bruços, só o tronco sobe). Antes de 07/10/2026 contavam 100%: registros antigos com o corpo inteiro ficam como estão até alguém desmarcar e marcar de novo "Somar meu peso corporal" naquele treino (o `rebasear` corrige as cargas).
- Só em slot **sem carga** e **sem `pc` explícito**; sem `pesoKg` no perfil não há automático.
- Ao gravar a 1ª carga, o `pc` é gravado junto: o histórico não muda.

## `rebasear` e `preencherCorpo` (escrita)
- `rebasear(cargas, antigo, novo)`: ao marcar/desmarcar/trocar o `pc`, cada carga vira `c - antigo + novo`. Carga menor que `antigo` fica como está (nenhuma carga se perde). Recebe os valores **normalizados**: célula antiga 2 com pc 80 lê 82; ao desmarcar grava 2.
- `pc` e as cargas rebaseadas vão numa **única gravação** (`registrarPc(..., cargas)`), e a caixa fica desabilitada até o Firestore confirmar (evita 2º toque sobre cargas velhas). Gravação recusada devolve a tela ao que está gravado.
- `preencherCorpo(cargas, n, corpo)`: ao "Concluir treino", grava `pc` (se faltar) e `carga = corpo` nas séries prescritas **vazias** (usa as cargas cruas, para gravar também a série que só tinha reps). Nunca sobrescreve; drop fica de fora.
- Placeholder "semana passada": `cargaAnterior(..., pcs)` devolve total normalizado menos o `pc` **do registro de origem**.

## Onde fica cada coisa
- `src/lib/conversores.ts`: `normalizarCargas`, `docsParaRegistros(docs, meso?)` (usa a normalização; é por onde passam todas as telas), `docParaCargas` (cru, só dentro da normalização e do `concluir`).
- `src/lib/pesoCorporal.ts`: `fracaoPC`, `corpoEhCarga`, `rebasear`, `preencherCorpo`.
- `src/lib/treino.ts`: `cargaAnterior`. `src/lib/acoes.ts`: `registrarPc`.
- Consumidores: `Treino.tsx`, `EvolucaoAluno.tsx`, `VisaoSemana.tsx` (alimenta `SessaoCard`, `Monitoramento`, `EvolucaoCoach`), `EditorMeso.tsx` (só testa "há carga"; usa a normalização sem meso).

## Testes
- `src/lib/conversores.test.ts` (normalização i/ii/iii, drop, sem pc, concluído ou não, com reps), `pesoCorporal.test.ts`, `treino.test.ts` (`cargaAnterior` com pcs), `tests/aluno-exemplo.test.ts`.
- e2e `e2e/peso-corpo.spec.ts`: marcar depois de digitar, concluir, coach vê o corpo, **formato antigo** concluído e não concluído.
- O motor (`metricas.ts`) ignora `null` na carga média e soma 0 no volume; com a normalização, séries válidas em branco passam a contar o corpo.

## Limites conhecidos (aceitos)
- Extra antigo **maior ou igual** ao `pc` não é detectado (lido como total).
- `pc` aumentado por versão antiga sem `rebasear` pode somar a mais.
- Série em branco que não foi feita, num treino concluído, conta o corpo.
- Sem o meso, série vazia depois da última com dado não é conhecida (as telas passam o meso, menos o `EditorMeso`).
- Desmarcar o corpo: célula vazia no banco (só a leitura contava o corpo) continua vazia. Já célula que o "Concluir treino" preencheu com o corpo vira 0.

## Como verificar
1. `npm test` (normalização e rebasear), `npm run typecheck`, `npm run build`.
2. e2e: `export PW_CHROMIUM=/opt/pw-browsers/chromium && npx firebase emulators:exec --only auth,firestore --project demo-forca 'npx playwright test e2e/peso-corpo.spec.ts --reporter=line'`.
3. À mão: registro com `pc` 80, só `s1: 2`, `realizado: true` → coach mostra volume com 80 nas outras séries; aluno vê 2 e 0.
4. Tela do coach: digitar 5 numa série com `pc` 80 grava 85 (total).
5. Marcar e desmarcar o corpo rápido: nenhuma carga muda de valor no fim.
