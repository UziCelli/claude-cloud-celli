# Plano — Sistema Físio (grande atualização, branch separada)

> Status 12/11/2026: Etapa 1 feita (`src/data/anatomia.json`, `src/lib/anatomia.ts`, tabela em `docs/fisio-catalogo.md`). Etapa 2 feita: pesquisa em `docs/fisio-pesquisa.md` (60 PMIDs conferidos), dados em `src/data/fisio.ts`, tela do coach `#/fisio` (`src/features/fisio/GuiaFisio.tsx`).

## Contexto
- Victor quer uma nova área **Físio** no app: o aluno relata dor/sensação no treino e recebe orientações curtas; o coach recebe o relato e manda orientação específica.
- Base técnica: HSR (Heavy Slow Resistance), sobrecarga/ênfase excêntrica, redução de volume/carga e polimento (já existe `polimento()` em `src/engine/volume.ts`).
- Não é fisioterapia: o app sempre lembra de procurar um fisioterapeuta.
- **Sem merge na `main` até o Victor mandar** (exceção ao fluxo automático do CLAUDE.md). Tudo fica na branch `ccr-0e483d63-az3bo7` (PR em rascunho, sem juntar).
- Decisões do Victor (12/11/2026):
  - Dor marcada → aluno vê **dica pronta e segura na hora** + coach é avisado e manda a orientação específica.
  - Pesquisa científica: vem do agente do Victor (aguardando o prompt). Textos de orientação só depois disso.
  - **1ª etapa: articulações e músculos no catálogo.**

## Etapa 1 — Base no catálogo (pode começar já)
O catálogo (`src/data/exercicios.json`) tem 12 grupos e 329 exercícios, cada um só com `id` e `nome`.

1. Dados em `src/data/anatomia.json`, **por id do exercício** (fora do `exercicios.json`, que o `tools/extrair_planilha.py` regrava inteiro). Cada exercício tem:
   - `articulacoes`: ids **iguais aos da anamnese** (`src/lib/anamnese.ts`, pergunta `dores`): `ombro, cotovelo, punho, cervical, lombar, quadril, joelho, tornozelo`, em ordem de importância. Assim a dor do treino cruza com a dor da anamnese.
   - `principais` e `secundarios`: músculos de uma lista fixa (`MUSCULOS` em `src/lib/anatomia.ts`: quadriceps, gluteos, isquiotibiais, adutores, abdutores, panturrilha, peitoral, dorsal, trapezio, deltoide-anterior/lateral/posterior, manguito, biceps, triceps, antebraco, abdomen, obliquos, lombar).
2. Preenchimento:
   - Script único (descartável, fora do repositório) gerou o rascunho por grupo + palavras do nome (mesma ideia do `DIVIDE` em `src/lib/segmentos.ts`), revisado pelo arquiteto e pelo revisor.
   - Victor confere a tabela `docs/fisio-catalogo.md` (por grupo), não o JSON. Mudanças dele entram direto no `anatomia.json`.
3. Leitura: `anatomiaDo(nome)` e `articulacoesDo(nome)` em `src/lib/anatomia.ts`, com `norm()` de `src/lib/busca.ts`. Fora do catálogo: `anatomiaDo` = null e `articulacoesDo` = as 8 articulações (o "Outro" com texto fica na tela, Etapa 3).
4. Teste (Vitest): todo exercício tem ≥1 articulação e ≥1 músculo principal; só ids válidos.
5. Nada muda na tela nesta etapa (sem risco para os alunos).

## Etapas seguintes (dependem da pesquisa do Victor)
- **Etapa 2 — Conteúdo (feita 12/11/2026):** 25 métodos + regras R1–R8 da pesquisa em `src/data/fisio.ts`; tela só do coach em Métodos → "Métodos Fisioterapia".
  - Fora do modelo (decisão pendente, não adaptado): liberar método para o aluno com alerta de `exige_liberacao`/`encaminhar_se` (vira a Etapa 3/4); protocolo ficou em texto (não em campos séries/reps), porque a pesquisa traz faixas; nenhum protocolo veio como "verificado", então todos mostram "sugestão inicial"; 10 métodos sem sinais de alerta próprios (M08, M09, M15, M16, M17, M19, M20, M22, M23, M24).
- **Etapa 3 — Botão "Senti dor" no treino** (`src/features/aluno/Treino.tsx`):
  - Pop-up: articulações do exercício (Etapa 1) + "Outro" com texto; tipo (dor / outra sensação); intensidade 0–10; momento (durante / fim do treino).
  - Dica pronta na hora conforme intensidade; alerta forte acima do limite.
  - Coach vê o relato (cartão no Início e na tela do aluno) e responde.
  - **Passa pelo arquiteto antes:** modelo de dados (coleção nova, gravação campo a campo, offline), `firestore.rules` com TDD, LGPD (dado de saúde → atualizar Política e `VERSAO_PRIVACIDADE`).
- **Etapa 4 — Aba Físio:** guia de leitura (como `GuiaMetodos.tsx`) + histórico de relatos do aluno + orientações recebidas.
- **Etapa 5 (talvez):** sugestões ao coach (ex.: trocar para HSR/excêntrico, polimento) — só sugestão, nunca automático.

## Arquivos principais
- `src/data/anatomia.json` + `src/lib/anatomia.ts` (Etapa 1), `src/lib/anamnese.ts` (ids das articulações), `src/lib/segmentos.ts` e `src/lib/busca.ts` (reuso), `src/data/metodos.ts` + `src/features/metodos/GuiaMetodos.tsx` (modelo da aba), `src/features/aluno/Treino.tsx` e `AlunoApp.tsx` (Etapas 3–4), `firestore.rules`.
- Docs: criar `docs/plano-fisio.md` (este plano) e atualizar `docs/mapa.md` e `docs/estado-sessao.md`.

## Verificação (Etapa 1)
- `npm run typecheck`, `npm test` (teste novo do catálogo), `npm run build`.
- Conferir que segmentos/evolução continuam iguais (`src/lib/segmentos.test.ts` verde).
- `graphify update .` e commit do grafo.
- Revisor (Opus) revisa o diff; push na branch; **PR em rascunho, sem merge**.
