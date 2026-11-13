# Plano — carga por lado (2 halteres) e exercícios isométricos

Pedido do Victor em 13/11/2026. Decisões dele (13/11/2026):
- 2 halteres/articulado ao mesmo tempo: **1 campo "kg em cada lado"** (o app dobra) + botão **"lados diferentes"** que abre Esquerdo e Direito.
- Alternado (rosca alternada etc.): **não dobra** (um braço de cada vez, como a concentrada).
- Isometria: **separada** — "tempo sob tensão" (soma dos segundos); não entra em movimentos nem no volume de carga.
- Progressão da isometria: mesmo +% por semana, **máximo 60 s por série** (passou disso, vira mais uma série).

## Fase 1 — Catálogo (só dados)
- `src/data/exercicios.json` ganha dois campos opcionais por exercício: `"doisLados": true` e `"isometrico": true`.
- O slot continua ligado ao catálogo **pelo nome** (como hoje). Exercício fora do catálogo = comum.
- Isométricos entram nos grupos musculares que já existem, com "Isométric(o/a)" no nome (a busca acha por "isom").

### Marcados como `doisLados` (proposta — Victor confere)
- Quadríceps e Glúteos: Agachamento Frontal Halter, Terra Romeno Halter, Afundo Halter, Avanço Halter, Retrocesso Halter, Búlgaro com Halter.
- Posterior: Stiff Halter.
- Peitorais: Supino Reto/Inclinado/Declinado Halter, Crucifixo Reto/Inclinado/Declinado Halter, Peck Deck Articulado.
- Dorsais: Puxada Articulada (Supinada, Peso Acima, Peso Abaixo, Cross), Remada Alta Articulada Pronada, Remada Articulada Tradicional (Aberta, Fechada), Remada Baixa Articulada (Aberta, Fechada), Remada Articulada Supinada.
- Ombros: Elevação Lateral Halter (e sentado), Elevação Diagonal Halter (e sentado), Elevação Frontal Halter (e sentado, e com Giro), Desenvolvimento Halter (e sentado), Encolhimento Halter, Crucifixo Inverso com Halter (em pé, sentado, banco inclinado).
- Antebraço: Rosca Punho Halter, Rosca Punho Inversa Halter.
- Bíceps: Rosca Direta Halter, Rosca Inclinada Halter Deitado, Rosca com Giro Halter Simultânea, Rosca Martelo Halter.
- Tríceps: Tríceps Testa Halter.

### Ficam SEM marca (um halter só, ou um lado de cada vez)
Terra Sumô com Halter, Elevação Pélvica Halter, Stiff Unilateral Halter, Flexão de Joelhos com Halter, Pull Over Halter, Remada Unilateral (serrote), Abdominal Oblíquo Halter, todos os "Alternado", Rosca Concentrada, Tríceps Francês (em pé e sentado), Elevação Pélvica Máquina Articulada, tudo que tem "Unilateral" no nome.

### Dúvidas para o Victor
- Agachamento Livre Halter e Agachamento Halter Banco: 1 halter (taça) ou 2?
- Rosca Scott Halter: os dois braços juntos ou um de cada vez?
- Cadeira Extensora Articulada (Peso Acima/Abaixo): braços independentes com anilha de cada lado?
- Supinação/Pronação com Halter: os dois punhos juntos?
- Stiff no Smith com Halter: o halter conta como carga extra?

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
- `cargas.<slotId>.s<n>` continua guardando o **total** (os dois lados somados), como no peso do corpo. Assim volume, recordes, evolução e relatórios não mudam.
- Novo: `lados.<slotId>.s<n> = [esq, dir]` só quando os lados forem diferentes; e `porLado.<slotId> = true` marca o registro feito no formato novo. Gravação campo a campo, igual a hoje.
- Registro antigo (sem `porLado`): fica como está, nunca reescrito. Não dá para saber se o aluno anotou 6 ou 12; a tela mostra o número como "anotado antes". O placeholder "semana passada" só usa registros no formato novo.
- Com peso do corpo (`pc`): total = 2 × lado + pc.

Telas: `Treino.tsx` (aluno) e `SessaoCard.tsx`/`LoadInput` (coach) — campo "kg cada lado", botão "lados diferentes" (E | D). Placeholder e resumo mostram por lado.

Testes: conversores (total ↔ lado, antigo intacto), e2e do aluno anotando 6 e o coach vendo volume com 12.

## Fase 3 — Isometria
- Prescrição: o número da progressão do slot isométrico vale **segundos**. Slot isométrico novo nasce com progressão própria 3 × 30 s (o coach muda). Limite da série = 60 s (motor `volume.ts`, `limiteDe` por slot).
- Aluno: a coluna de reps vira "s"; o campo de "reps feitas" guarda os segundos feitos (`reps.<slotId>.s<n>`, mesmo caminho). Botão de cronômetro na série (reaproveita o do descanso). Carga continua opcional (ex.: anilha nas costas na prancha).
- Motor (`metricas.ts`): isométrico fica fora de `movimentos` e `volume`; novo `tempoSobTensaoS`. Gráfico "Ajustar volume" conta só os não isométricos.
- Também mudam: PDF/relatório/planilha (mostrar "s"), IA do treino (`iaTreino.ts`: avisar que isométrico é em segundos), Monitoramento.

## Riscos
- Isométrico mal identificado entra no volume errado → teste com cada isométrico do catálogo.
- Aparelho antigo com versão velha do app grava só o total, sem `porLado` → lido como "antigo", nada se perde.
- O app da Gislane usa o mesmo catálogo: as marcas valem para os dois.

## Pronto quando
- typecheck, test, build e e2e verdes; revisor aprovou.
- Aluno anota 6 por lado na Rosca Direta Halter e o volume conta 12 por rep.
- Prancha prescrita 3 × 30 s, aluno cronometra, o coach vê o tempo sob tensão; volume da semana não muda.
