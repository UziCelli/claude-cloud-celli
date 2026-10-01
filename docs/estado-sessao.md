# Estado da sessão (retomada) — atualizado em 01/10/2026

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
- **Entrega 3**: PRs #23 e #24 (Superset = 4+ exercícios), juntados e publicados.
  - Worker: `https://vfit-descanso.vfitcoach-site.workers.dev`.
  - Falta o Victor testar a notificação num iPhone real.
- **Entrega 4** (`docs/plano-entrega4.md`): juntada (PRs #25 e #26) e publicada.
  - Inatividade: aluno 30 min, coach 20 min.
  - MFA TOTP só para o coach: ativo.
  - Sem tela de erros no painel: os erros ficam no workflow "Ver erros do app".
  - PR #27 (2 etapas obrigatórias + App Check) aguarda o "pode juntar" do Victor.
  - App Check: provedor **reCAPTCHA Enterprise**, aguardando a chave do Victor (`docs/seguranca.md`, passo 3). Depois, modo Monitorar e, após alguns dias sem erros, **Aplicar**.
- **Entrega 5** (a planejar), pagamento:
  - Pix estático no app (QR + copia e cola, sem taxa), com "Valor mensal" por aluno e configuração de pagamento no painel;
  - "Já paguei" → "Pagamentos a confirmar" no Início → "Confirmar" (+1 mês);
  - link de cartão opcional (a DOC Pagamentos não tem API);
  - botão também na tela de bloqueio;
  - aviso de vencimento por push (3 dias antes e no dia), abrindo a tela do Pix.
- **Ao retomar:** `git status`/`git log`, conferir PRs abertos e CI, e seguir o que faltar.

## Ideias e pendências futuras (não fazer sem pedido)
- Senha provisória pelo WhatsApp em vez do e-mail do Firebase (o nome "forca--app" aparece nos e-mails).
- Botão "ver vídeo" em cada exercício, quando o Victor gravar os vídeos.
- App da Gislane (`docs/plano-app-gislane.md`):
  - faltam o nome embaixo do ícone (até 12 letras), o domínio próprio e o ID do projeto Firebase;
  - as cores já estão aprovadas.
- Importar planilhas de outros alunos: `tools/planilha_para_meso.py` + workflow "Importar mesociclo".
- A migração do projeto Firebase foi descartada pelo Victor.
