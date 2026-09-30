# Estado da sessão (retomada) — atualizado em 30/09/2026

Leia antes: `CLAUDE.md`, `docs/mapa.md`. Branch de trabalho: `claude/fervent-brahmagupta-y5vri5`. Os PRs até o #19 estão juntados e publicados.

## Regras combinadas com o Victor
- **Linguagem:** respostas curtas, em tópicos, pt-BR (ele tem TDAH e não programa).
- **Economia:** a sessão principal só orquestra.
  - Código vai para agentes **Sonnet** (dev/arquiteto com `model: sonnet`).
  - Tarefas executivas (commit, push, PR, merge, acompanhar CI e deploy) vão para o **auxiliar (Haiku)**.
- **Merge:** nunca juntar PR sem o Victor dizer "pode juntar". Depois de juntar, conferir o workflow "Publicar".

## Entregas
- **Entrega 1** (`docs/plano-entrega1.md`): PR #20, juntado pelo Victor.
- **Entrega 2** (`docs/plano-entrega2.md`): PR #21, juntado e publicado.
  - Padrão adotado: os 2 primeiros exercícios de cada treino ficam fora do biset automático (`incluirPrincipais=false`).
  - O motor ainda lê as chaves antigas `'t-p'` de `progressaoExercicio` como reserva para mesos não migrados.
- **Entrega 3 (3a + 3b)**: PR #23. CI verde, revisada sem bloqueantes, Worker publicado.
  - Worker: `https://vfit-descanso.vfitcoach-site.workers.dev`.
  - Esperando o "pode juntar". Depois, o Victor testa a notificação num iPhone real.
  - Pendências menores da revisão (ficam para a Entrega 4):
    - o Worker não limita frequência nem confere `pagoAte`;
    - o estado salvo do cronômetro não guarda o uid;
    - origens localhost liberadas no CORS em produção;
    - com o app aberto no fim do descanso, chegam o bipe e a notificação (confirmar no iPhone se incomoda).
- **Entrega 4** (a planejar): registro de erros (coleção `logs` + tela "Erros do app" + vigia de carregamento) e segurança:
  - MFA TOTP via Identity Platform (grátis no Spark);
  - limite de tentativas + App Check;
  - logout por inatividade sem perder cargas;
  - varredura XSS.
  - Esperando o Victor responder: MFA só para o coach? Inatividade de 30 min para o coach e 7 dias para o aluno?
- **Ao retomar:** `git status`/`git log`, conferir PRs abertos e CI, e seguir o que faltar.

## Ideias e pendências futuras (não fazer sem pedido)
- Senha provisória pelo WhatsApp em vez do e-mail do Firebase (o nome "forca--app" aparece nos e-mails).
- Botão "ver vídeo" em cada exercício, quando o Victor gravar os vídeos.
- App da Gislane (`docs/plano-app-gislane.md`):
  - faltam o nome embaixo do ícone (até 12 letras), o domínio próprio e o ID do projeto Firebase;
  - as cores já estão aprovadas.
- Importar planilhas de outros alunos: `tools/planilha_para_meso.py` + workflow "Importar mesociclo".
- A migração do projeto Firebase foi descartada pelo Victor.
