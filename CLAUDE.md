# Força — app de treino (substitui a planilha "Força 2027.1")

App web + Android (APK via TWA) + iPhone (PWA na Tela de Início) para o personal Victor Celli prescrever mesociclos e os alunos registrarem cargas, inclusive offline.
O dono do projeto **não programa**: explique decisões em linguagem simples, respostas curtas e em tópicos (ele tem TDAH).

## Stack
React + Vite + TypeScript + Tailwind (PWA) · Firebase (Auth, Firestore offline, Hosting) no plano gratuito · Vitest.
Sem Cloud Functions (plano gratuito). Catálogo de exercícios em `src/data/exercicios.json`.

## Onde está cada coisa
- `docs/logica-planilha.md` — especificação das fórmulas (fonte da verdade do motor).
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

## Plugins (ativados em `.claude/settings.json`)
- **Superpowers**: fluxo brainstorming → writing-plans → subagent-driven-development; TDD; systematic-debugging.
- **Ponytail** (modo `full`): escreva o mínimo que funciona — reuse o que existe, prefira recursos nativos, nenhuma abstração "para o futuro".

## Regras do domínio (não quebrar)
- Nenhuma carga registrada pode se perder: gravação campo a campo (`cargas.<slotId>.s<n>`), nunca sobrescrever o documento inteiro.
- Aluno só lê o próprio treino e só escreve o próprio registro, e só com `status == 'ativo'` e `pagoAte` no futuro.
- Textos da interface em português do Brasil.
