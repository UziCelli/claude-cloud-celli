# Plano — carga por lado (2 halteres) e exercícios isométricos

Pedido do Victor em 13/11/2026. Decisões dele (13/11/2026):
- 2 halteres/articulado ao mesmo tempo: **1 campo "kg em cada lado"** (o app dobra) + botão **"lados diferentes"** que abre Esquerdo e Direito.
- Alternado (rosca alternada etc.): **não dobra** (um braço de cada vez, como a concentrada).
- Isometria: **separada** — "tempo sob tensão" (soma dos segundos); não entra em movimentos nem no volume de carga.
- Progressão da isometria: mesmo +% por semana, **máximo 60 s por série** (passou disso, vira mais uma série).

Entregas: **A** = fases 1 + 2 (marcas `doisLados` + carga por lado). **B** = fase 3 (isométricos no catálogo + mecanismo de tempo). Os isométricos só entram no catálogo junto com o mecanismo, para ninguém prescrever prancha em reps.

## Estado (13/11/2026)
- **Entrega A: FEITA** no PR #166 (branch `ccr-a5bd671d-284cns`). Testes locais verdes; CI e junção pendentes no momento desta nota — confira o PR.
- **Entrega B: NÃO COMEÇADA.** Próximo passo. Ver "Para o Codex continuar" no fim.

## Fase 1 — Catálogo (só dados)
- As marcas ficam **fora** do `exercicios.json`, em listas de ids: `src/data/doisLados.json` (feito) e `src/data/isometricos.json` (entrega B). Motivo: `tools/extrair_planilha.py` regrava o `exercicios.json` inteiro (mesmo motivo do `anatomia.json`). Um teste garante que todo id da lista existe no catálogo.
- O slot continua ligado ao catálogo **pelo nome** (como hoje). Exercício fora do catálogo = comum.
- Isométricos entram nos grupos musculares que já existem, com "Isométric(o/a)" no nome (a busca acha por "isom").

### Marcados como `doisLados` (proposta — Victor confere)
- Quadríceps e Glúteos: Agachamento Frontal Halter, Terra Romeno Halter, Afundo Halter, Avanço Halter, Retrocesso Halter, Búlgaro com Halter, Cadeira Extensora Articulada (Peso Acima e Peso Abaixo).
- Posterior: Stiff Halter.
- Peitorais: Supino Reto/Inclinado/Declinado Halter, Crucifixo Reto/Inclinado/Declinado Halter, Peck Deck Articulado.
- Dorsais: Puxada Articulada (Supinada, Peso Acima, Peso Abaixo, Cross), Remada Alta Articulada Pronada, Remada Articulada Tradicional (Aberta, Fechada), Remada Baixa Articulada (Aberta, Fechada), Remada Articulada Supinada.
- Ombros: Elevação Lateral Halter (e sentado), Elevação Diagonal Halter (e sentado), Elevação Frontal Halter (e sentado, e com Giro), Desenvolvimento Halter (e sentado), Encolhimento Halter, Crucifixo Inverso com Halter (em pé, sentado, banco inclinado).
- Antebraço: Rosca Punho Halter, Rosca Punho Inversa Halter.
- Bíceps: Rosca Direta Halter, Rosca Inclinada Halter Deitado, Rosca com Giro Halter Simultânea, Rosca Martelo Halter.
- Tríceps: Tríceps Testa Halter.

### Ficam SEM marca (um halter só, ou um lado de cada vez)
Terra Sumô com Halter, Elevação Pélvica Halter, Stiff Unilateral Halter, Flexão de Joelhos com Halter, Pull Over Halter, Remada Unilateral (serrote), Abdominal Oblíquo Halter, todos os "Alternado", Rosca Concentrada, Tríceps Francês (em pé e sentado), Elevação Pélvica Máquina Articulada, tudo que tem "Unilateral" no nome.

### Respostas do Victor (13/11/2026)
- Agachamento Livre Halter e Agachamento Halter Banco: geralmente 1 halter → **sem marca**.
- Rosca Scott Halter: pode ser 1 ou 2 → **sem marca**; o coach liga "2 lados" naquele exercício do meso quando for com 2 (ver abaixo).
- Cadeira Extensora Articulada (Peso Acima e Peso Abaixo): cada lado tem sua anilha → **`doisLados`**.
- Supinação/Pronação com Halter: rotação de reabilitação, não muda → **sem marca**.
- Stiff no Smith com Halter: o Smith só apoia, a carga é o halter → **sem marca** (o aluno anota só o halter).

### Ajuste por exercício no meso
- O catálogo dá o padrão. O coach pode ligar/desligar "2 lados" em um exercício do meso (`Slot.doisLados?: boolean`, vence o catálogo).
- Serve para os casos que variam (Rosca Scott, agachamento com 2 halteres, exercício fora do catálogo).

### Isométricos novos (proposta — Victor confere)
- Abdome e Lombar: Prancha Frontal Isométrica (cotovelos), Prancha Frontal Isométrica (mãos), Prancha Lateral Isométrica, Prancha Invertida Isométrica, Canoa Isométrica (Hollow Hold), Superman Isométrico, Perdigueiro Isométrico, Pallof Press Isométrico na Polia, Abdominal em L Isométrico (L-sit), Dead Bug Isométrico.
- Quadríceps e Glúteos: Agachamento Isométrico na Parede (cadeirinha), Agachamento Isométrico Livre, Afundo Isométrico, Búlgaro Isométrico, Elevação Pélvica Isométrica, Elevação Pélvica Unilateral Isométrica, Cadeira Extensora Isométrica.
- Posterior: Mesa Flexora Isométrica, Ponte de Posteriores Isométrica (calcanhar no banco).
- Adutores: Prancha Copenhagen Isométrica, Adução Isométrica com Bola.
- Panturrilha: Panturrilha em Pé Isométrica.
- Dorsais: Suspensão na Barra (Dead Hang), Suspensão Ativa na Barra (escápulas), Barra Fixa Isométrica (queixo acima da barra), Remada Isométrica.
- Peitorais: Flexão de Braços Isométrica (meio do movimento).
- Ombros: Elevação Lateral Isométrica.
- Bíceps: Rosca Isométrica a 90º.
- Antebraço: Pegada Isométrica com Halteres (Farmer Hold) — `doisLados`.

## Fase 2 — Carga por lado
Dados (sem perder nenhuma carga já gravada):
- `cargas.<slotId>.s<n>` continua guardando o **total** (esq + dir, + `pc` se houver), como no peso do corpo. Assim volume, recordes, evolução e relatórios não mudam.
- Novo mapa `lados.<slotId>.s<n>` = kg do lado **esquerdo** (número). Direito = total − pc − esq. Lados iguais: esq = metade.
  - Gravado **na mesma escrita** que a carga (um `setDoc merge` com `cargas` e `lados` juntos). Nunca um sem o outro.
  - A presença de `lados.<slotId>.s<n>` marca a célula como formato novo.
- Célula antiga (carga sem `lados`): fica como está, nunca reescrita. Não dá para saber se o aluno anotou 6 ou 12; a tela mostra o número inteiro como "anotado antes". O placeholder "semana passada" só usa células no formato novo.
- `firestore.rules`: `lados` entra nas listas de campos permitidos do registro, com a mesma validação das `cargas` (TDD no emulador).
- `cancelarTreino` apaga também `lados`. `rebasear` (peso do corpo) não mexe em `lados` (o esquerdo não muda quando o pc muda).

Telas: `Treino.tsx` (aluno) e `SessaoCard.tsx`/`LoadInput` (coach) — campo "kg cada lado", botão "lados diferentes" (E | D). Placeholder e resumo mostram por lado.

Testes: conversores (total ↔ lado, antigo intacto), e2e do aluno anotando 6 e o coach vendo volume com 12.

## Fase 3 — Isometria
- Prescrição: o número da progressão do slot isométrico vale **segundos**. Slot isométrico novo nasce com progressão própria 3 × 30 s (o coach muda). Limite da série = 60 s (motor `volume.ts`, `limiteDe` por slot).
- Aluno: a coluna de reps vira "s"; o campo de "reps feitas" guarda os segundos feitos (`reps.<slotId>.s<n>`, mesmo caminho). Botão de cronômetro na série (reaproveita o do descanso). Carga continua opcional (ex.: anilha nas costas na prancha).
- Motor (`metricas.ts`): isométrico fica fora de `movimentos` e `volume`; novo `tempoSobTensaoS`. Gráfico "Ajustar volume" conta só os não isométricos.
- Também mudam: PDF/relatório/planilha (mostrar "s"), IA do treino (`iaTreino.ts`: avisar que isométrico é em segundos), Monitoramento.

## Riscos
- Isométrico mal identificado entra no volume errado → teste com cada isométrico do catálogo.
- Aparelho com versão velha do app grava só o total, sem `lados` → lido como "antigo" (`lerCelula`), nada se perde.
- O app da Gislane usa o mesmo catálogo: as marcas valem para os dois.

## Pronto quando
- typecheck, test, build e e2e verdes; revisor aprovou.
- Aluno anota 6 por lado na Rosca Direta Halter e o volume conta 12 por rep.
- Prancha prescrita 3 × 30 s, aluno cronometra, o coach vê o tempo sob tensão; volume da semana não muda.

## Para o Codex continuar (entrega B — isometria)
Leia antes: `CLAUDE.md` (regras do domínio, PRs, textos em pt-BR, `pt-topo`), `docs/mapa.md` ("Pontos sensíveis"), este plano, `docs/peso-corporal.md`.

O que já existe e serve de modelo (entrega A):
- Lista de ids fora do catálogo: `src/data/doisLados.json` + `src/lib/lados.ts` (`doisLadosPadrao`, `doisLados(slot)`: `Slot.doisLados` vence o catálogo). Faça igual: `src/data/isometricos.json` + `isometrico(slot)`.
- Interruptor por exercício no meso: `src/features/coach/meso/TabDivisao.tsx` (`mudarLados`). Não precisa de interruptor de isometria (é do exercício, não varia).

Passos (TDD; motor em `src/engine/` é puro, sem React/Firebase):
1. Catálogo: incluir os isométricos da lista "Isométricos novos" no `src/data/exercicios.json`, cada um com id em slug (padrão dos ids atuais) **e linha no `src/data/anatomia.json`** (o `anatomia.test.ts` falha sem ela). Ids em `isometricos.json`. "Pegada Isométrica com Halteres" também em `doisLados.json` (ajuste o `toBe(46)` em `lados.test.ts`).
2. Motor: `limiteDe` em `src/engine/volume.ts` usa 60 para slot isométrico (o motor não importa JSON do app: receba um `isIsometrico(nome)` ou um conjunto por parâmetro). `metricasExercicio`/`metricasSessao`/`metricasSemana` (`src/engine/metricas.ts`): isométrico fora de `movimentos` e `volume`; novo `tempoSobTensaoS` = soma dos segundos (feitos, senão prescritos). Atualize `docs/logica-planilha.md` se mudar fórmula.
3. Slot isométrico novo no meso nasce com `progressaoExercicio[slotId]` = 3 × 30 s em todas as semanas (onde a divisão cria slot: `src/features/coach/meso/util.ts`).
4. Telas: aluno (`src/features/aluno/Treino.tsx`) e coach (`src/features/coach/semana/SessaoCard.tsx`, `Preview.tsx`, `TabProgressao.tsx`) mostram "s" em vez de reps; "reps feitas" vira "segundos feitos" no mesmo campo `reps.<slotId>.s<n>` (`registrarReps` em `src/lib/acoes.ts`, sem regra nova no Firestore). Botão de cronômetro por série (veja `src/lib/descanso.ts`). Carga continua opcional.
5. Onde aparece volume/movimentos: Monitoramento, gráfico de "Ajustar volume" (só não isométricos), relatório (`src/lib/relatorio.ts`), PDF (`src/lib/pdf.ts`), IA (`src/lib/iaTreino.ts`: dizer que isométrico é em segundos). Mostrar "tempo sob tensão" onde houver isométrico.
6. Verificar: `npm run typecheck`, `npm test`, `npm run build`, `npm run test:rules` (se mexer em regras), e2e novo (aluno faz prancha 3 × 30 s; volume da semana igual com e sem a prancha). Rode `graphify update .` e inclua `graphify-out/` (`git add -f`).
7. Docs: linha nova em "Pontos sensíveis" do `docs/mapa.md`; atualizar "Estado" deste plano e `docs/estado-sessao.md`.

Não decidir sozinho (perguntar ao Victor): mudar o limite de 60 s, contar isometria no volume, ou apagar/migrar qualquer dado já gravado.
