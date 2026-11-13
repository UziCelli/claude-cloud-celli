# Redesenho 2027 — ponto de partida (RASCUNHO)

Pedido do Victor em 13/11/2026. **Nada aqui está aprovado nem implementado.** É documentação para pensar o redesenho com calma (alvo: início de 2027) e para os próximos agentes (Claude Code e Codex) partirem do mesmo retrato.

## O pedido, em 5 linhas
- O app ganhou muita função em pouco tempo. No celular, a tela ficou **pesada de botões** (não de arquivo).
- Redesenhar pensando no **fluxo do aluno até o treino** e, principalmente, **dentro do treino**, que é corrido.
- Meta: o aluno usa todas as funções **sem se perder e no menor tempo possível**.
- Incluir tudo que entrou (Físio, dor, check-in, carga por lado, cardio, anotações com data…) e a **isometria**, que está em andamento (`docs/plano-lados-isometria.md`, entrega B).
- Spoiler do Victor: o app vai virar **SaaS** (personal ou academia põe a própria logo e o app se ajusta às cores).

## O que tem nesta pasta
| Arquivo | Para quê |
|---|---|
| `estado-atual.md` | Retrato do app do aluno hoje: telas, fluxo, contagem de botões, onde pesa. Com prints reais. |
| `proposta.md` | Direção do redesenho: fluxo novo, tela de treino "um exercício por vez", para onde vai cada função. |
| `saas.md` | O que o SaaS muda (marca em tempo real, cores a partir da logo, dados por contratante) e a ordem sugerida. |
| `atual/*.jpg` | Prints do app de hoje (emulador, dados fictícios). |
| `previa/*.jpg` | Prévia desenhada do redesenho nas 3 versões: VFITCOACH, Gislane e SaaS. |
| `previa/mockup.html` | Fonte da prévia. É um desenho, **não é código do app**. |

## Regras para quem for trabalhar nisto (Claude Code e Codex)
1. Leia antes: `CLAUDE.md`, `AGENTS.md`, `docs/mapa.md` ("Pontos sensíveis"), `docs/plano-redesenho.md` (redesenho de 10/2026, já no ar) e os 3 arquivos desta pasta.
2. **Redesenho é só de tela.** Não muda o motor (`src/engine/`), o formato dos dados nem as regras do Firestore. Se a tela nova pedir dado novo, pare e leve ao arquiteto.
3. Regras do domínio continuam valendo, sem exceção:
   - nenhuma carga pode se perder (gravação campo a campo, `cargas.<slotId>.s<n>`);
   - funciona offline;
   - textos em pt-BR;
   - topo com `pt-topo`; ação frequente embaixo, perto do polegar.
4. A marca nunca é fixa no código: sempre `@marca/...` e as cores `marca-*` / `slate-*`. Isso já vale hoje e é o que permite o SaaS depois.
5. Decisões em aberto (lista abaixo) são do Victor. Não decidir sozinho.
6. O `docs/plano-redesenho.md` dizia "a tela do treino não muda de visual". Este redesenho **revoga essa regra quando for aprovado**; até lá ela vale.
7. Coordenação entre agentes: um arquivo, um agente por vez. A isometria (Codex) mexe em `Treino.tsx`; o redesenho do treino só começa **depois** dela juntada.

## Decisões em aberto (Victor)
- [ ] Treino "um exercício por vez" (prévia, tela 2) como padrão, com "Ver todos" (tela 5) como mapa? Ou manter a lista e só enxugar os cartões?
- [ ] Botões de − e + na carga (passo de 0,5 kg? 1 kg?) além de poder digitar.
- [ ] "Série feita" liga o descanso sozinha? (Hoje são dois toques separados.)
- [ ] Barra de baixo com 4 abas (Início, Treino, Evolução, Você), com o Físio aparecendo só para quem tem orientação?
- [ ] Início com fila única "Para você" (um aviso por vez) no lugar dos cartões empilhados.
- [ ] SaaS: tema claro e escuro, ou só escuro? O contratante escolhe 1 cor ou o app tira da logo?
- [ ] O coach também entra neste redesenho ou fica para uma 2ª etapa? (Este rascunho cobre só o aluno.)

## Ordem sugerida (nada começa sem o ok do Victor)
1. **Agora:** só este rascunho. Victor olha os prints e responde as decisões.
2. Isometria juntada (entrega B).
3. Protótipo navegável da tela de treino (fora do app, como este mockup) e teste com 2 ou 3 alunos no presencial.
4. Treino novo no app, atrás de uma chave ("Experimentar o treino novo"), nas duas marcas.
5. Início e barra de abas.
6. Marca em tempo real (base do SaaS). Ver `saas.md`.

## Como regerar os prints
- Estado atual: `PRINTS=1 PRINTS_DIR=<pasta> npx firebase emulators:exec --only auth,firestore --project demo-forca "npx playwright test e2e/prints.spec.ts"` (dados fictícios; `MARCA=gislane` para a outra marca). Os desta pasta foram tirados em página inteira, em 13/11/2026.
- Prévia: abrir `previa/mockup.html?t=vfit` (ou `gislane`, `saas`) no navegador e tirar o print. As cores de cada versão são só as variáveis no topo do arquivo.
