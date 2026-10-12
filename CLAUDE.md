# Força — app de treino (substitui a planilha "Força 2027.1")

App web + Android (APK via TWA) + iPhone (PWA na Tela de Início) para o personal Victor Celli prescrever mesociclos e os alunos registrarem cargas, inclusive offline.
O dono do projeto **não programa**: explique decisões em linguagem simples, respostas curtas e em tópicos (ele tem TDAH).

## Stack
React + Vite + TypeScript + Tailwind (PWA) · Firebase (Auth, Firestore offline, Hosting) no plano gratuito · Vitest.
Sem Cloud Functions (plano gratuito). Catálogo de exercícios em `src/data/exercicios.json`.

## Onde está cada coisa
- `docs/estado-sessao.md` — **retomada**: o que está em andamento e os próximos passos (leia primeiro ao voltar).
- `docs/mapa.md` — mapa do código: comece por aqui para achar onde mexer (atualize ao criar/mover arquivos).
  - A seção "Pontos sensíveis" guia auditorias e investigações de bug.
  - Todo agente lê essa seção antes de mexer.
  - Quem corrigir um bug acrescenta uma linha nela.
- `docs/logica-planilha.md` — especificação das fórmulas (fonte da verdade do motor).
- `docs/peso-corporal.md` — peso do corpo nas cargas: convenção (total), leitura de dados antigos, como verificar.
- `src/engine/` — motor de cálculo puro (sem React/Firebase). TDD obrigatório.
- `firestore.rules` — segurança e bloqueio por pagamento. TDD obrigatório (emulador).
- `tools/extrair_planilha.py` — lê o .xlsx original (só biblioteca padrão). O .xlsx nunca vai para o repositório.
- `tools/planilha_para_meso.py` + workflow "Importar mesociclo" (`tools/importar-meso.mjs`) — traz um meso da planilha de um aluno para o app, com as cargas.
- `docs/marca/` — logo VFITCOACH em SVG. `docs/plano-app-gislane.md` — plano pronto do app da Gislane (segunda marca).

## Comandos
`npm run dev` · `npm run typecheck` · `npm test` · `npm run build`

## Economia de tokens — regra de delegação
A sessão principal (Opus) **orquestra**: planeja, decide e delega. Delegue sempre para o agente mais barato que resolve:

| Agente | Modelo | Quando |
|---|---|---|
| `explorador` | Haiku | achar código/arquivos |
| `auxiliar` | Haiku | tarefas mecânicas: dados, boilerplate, CI, docs, rodar testes |
| `dev` | Sonnet | telas, formulários, integração Firebase |
| `revisor` | Sonnet | revisar diff antes de commit/PR |
| `arquiteto` | Opus | motor de cálculo, regras de segurança, sync offline, bugs difíceis |

- Prompts de delegação curtos e completos (arquivos, critério de pronto, limite de palavras na resposta).
- Tarefas independentes em paralelo; nunca dois agentes no mesmo arquivo ao mesmo tempo.
- Pedido do Victor: tarefas executivas (merge de PR, disparar workflow, acompanhar CI/deploy, commit/push de rotina, conferir status) vão para o `auxiliar` (Haiku). Só faça direto quando for uma única chamada (delegar custaria mais do que fazer).

## PRs: fluxo automático (autorizado pelo Victor em 07/10/2026)
O Victor não revisa código: a revisão é nossa e o merge também, **sem pedir "pode juntar"**.
1. Implementar e rodar as checagens locais: `typecheck`, `test`, `build` e os e2e afetados.
2. Revisar o diff com o agente `revisor` e corrigir o que ele apontar. Não levar código ao Victor.
3. Commit, push, PR e `subscribe_pr_activity`.
4. Acompanhar o CI com um laço em segundo plano (`gh api …/check-runs`), **sem criar rotinas** (`send_later`/triggers).
5. CI verde: marcar como pronto e juntar sozinho (`merge_pull_request` com `expectedHeadSha`).
6. Depois de juntar:
   - conferir os jobs `deploy` e `gislane` do "Publicar";
   - recriar a branch a partir da `main`;
   - avisar o Victor em 2–3 tópicos (o que mudou e se já está no ar).
7. CI vermelho: corrigir e repetir. Se a falha não for nossa, explicar ao Victor em linguagem simples.
- **Perguntar antes de juntar** só quando a mudança apagar ou migrar dados que já estão em produção, ou tiver custo em dinheiro.

## Plugins (ativados em `.claude/settings.json`)
- **Superpowers**: fluxo brainstorming → writing-plans → subagent-driven-development; TDD; systematic-debugging.
- **Ponytail** (modo `full`): escreva o mínimo que funciona — reuse o que existe, prefira recursos nativos, nenhuma abstração "para o futuro".

## Regras do domínio (não quebrar)
- Nenhuma carga registrada pode se perder: gravação campo a campo (`cargas.<slotId>.s<n>`), nunca sobrescrever o documento inteiro.
- Aluno só lê o próprio treino e só escreve o próprio registro, e só com `status == 'ativo'` e `pagoAte` no futuro.
- Textos da interface em português do Brasil.
- Topo da tela: toda barra ou cabeçalho no topo usa `pt-topo` (área segura + 12px, em `src/index.css`). Nada clicável colado na borda superior: ali o dedo puxa a barra de notificações. Ações frequentes ficam embaixo, perto do polegar.
