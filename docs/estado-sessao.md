# Estado da sessão (retomada) — atualizado em 30/09/2026

Leia antes: `CLAUDE.md`, `docs/mapa.md`. Branch de trabalho: `claude/fervent-brahmagupta-y5vri5`. Os PRs até o #19 estão juntados e publicados.

## Regras combinadas com o Victor
- **Linguagem:** respostas curtas, em tópicos, pt-BR (ele tem TDAH e não programa).
- **Economia:** a sessão principal só orquestra.
  - Código vai para agentes **Sonnet** (dev/arquiteto com `model: sonnet`).
  - Tarefas executivas (commit, push, PR, merge, acompanhar CI e deploy) vão para o **auxiliar (Haiku)**.
- **Merge:** nunca juntar PR sem o Victor dizer "pode juntar". Depois de juntar, conferir o workflow "Publicar".

## Em andamento: Entrega 1 (`docs/plano-entrega1.md`, aprovada)
- **Parte A (lógica):** feita e commitada (67ce2ba): `src/lib/{semana,tempo,busca}.ts`, `Slot.pausaS` no motor, regra `inicioEm`.
- **Partes B (aluno) e C (coach):** feitas e commitadas; typecheck/test/build/e2e passaram. Próximo: PR da Entrega 1 (via auxiliar) e esperar o "pode juntar" do Victor.
- **Ao retomar:**
  1. `git status` e `git log`.
  2. Se B ou C não estiverem commitados (o container pode ter sido reiniciado e perdido o que não foi salvo), refazer pelo plano.
  3. Rodar typecheck, test, test:rules, build e e2e:
     `export PW_CHROMIUM=/opt/pw-browsers/chromium && npx firebase emulators:exec --only auth,firestore --project demo-forca 'npx playwright test --reporter=line'`
  4. Pelo auxiliar: commit, push, PR rascunho "Entrega 1: …", acompanhar o CI.
  5. Mandar os prints ao Victor (`test-results/prints/70-*`, `71-*`, `72-*`) e esperar o "pode juntar".

## Próxima: Entrega 2 (`docs/plano-entrega2.md`)
- Começar depois do PR da Entrega 1, **num PR separado**.
- Pendente de confirmação: os 2 primeiros exercícios de cada treino ficam fora do biset automático. Seguir com esse padrão e avisar o Victor.

## Ideias e pendências futuras (não fazer sem pedido)
- Senha provisória pelo WhatsApp em vez do e-mail do Firebase (o nome "forca--app" aparece nos e-mails).
- Botão "ver vídeo" em cada exercício, quando o Victor gravar os vídeos.
- App da Gislane (`docs/plano-app-gislane.md`):
  - faltam o nome embaixo do ícone (até 12 letras), o domínio próprio e o ID do projeto Firebase;
  - as cores já estão aprovadas.
- Importar planilhas de outros alunos: `tools/planilha_para_meso.py` + workflow "Importar mesociclo".
- A migração do projeto Firebase foi descartada pelo Victor.
