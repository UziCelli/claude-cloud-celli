# Estado da sessão (retomada) — atualizado em 03/10/2026

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
  - PR #27 (2 etapas obrigatórias + App Check) juntado e publicado. PR #28 corrigiu o login que caía na hora (marca de inatividade antiga).
  - App Check: **reCAPTCHA Enterprise** registrado no Firebase em modo Monitorar (01/10/2026). Após alguns dias sem erros, conferir o uso (grátis até 10 mil/mês) e mudar para **Aplicar**.
- **01/10/2026 (madrugada, autorizado pelo Victor a juntar sozinho):** PRs #29 e #30 juntados e publicados.
  - Peso do corpo automático (barra fixa, flexão de braços, abdominais no solo sem carga, "Agachamento com Peso do Corpo") + opção "Somar meu peso corporal" abaixo das séries; campo de anotação limpo; menu do topo sem cortes (ícone de conta no celular).
  - Aluno de exemplo "Victor C.L. Silva" (antes "Victor Aluno") com o meso `exemplo-victor`; workflow "Aluno de exemplo" (rodar em `gravar` antes de cada apresentação); roteiro em `docs/apresentacao.md`. O meso de teste antigo "Teste 1" dessa conta foi encerrado (só a data; `inicioOriginal` guarda a antiga).
  - Para o Victor decidir: marcar também como peso do corpo Abdominal Paralela (4 variações), Abdominal Declinado, Tríceps Barra Paralela, Flexão Nórdica?
- **01/10/2026 (dia, Victor autorizou juntar direto):**
  - PR #31: menu e anotação.
  - PR #32: aba antiga se atualiza sozinha na tela de login (`versao.json`), com a versão no rodapé.
  - PR #33: o coach soma o peso do corpo.
  - PR seguinte: leitura única `normalizarCargas`, que conta certo os registros gravados por versões antigas sem reescrever dados. O campo do coach mostra o extra.
  - Regras, limites e como verificar: `docs/peso-corporal.md`.
- **02/10/2026:** auditoria de segurança + LGPD (PR a abrir, aguardando "pode juntar" do Victor).
  - Política de Privacidade (/privacidade), aceite obrigatório no cadastro e tela de aceite para alunos atuais.
  - Exclusão total: `exclusoes/{uid}` + workflow diário "Limpeza LGPD".
  - Backups com 30 dias.
  - Relatório da auditoria e passos do Victor em `docs/seguranca.md` (seção "Auditoria 02/10/2026").
- **Entrega 5** (a planejar), pagamento:
  - Pix estático no app (QR + copia e cola, sem taxa), com "Valor mensal" por aluno e configuração de pagamento no painel;
  - "Já paguei" → "Pagamentos a confirmar" no Início → "Confirmar" (+1 mês);
  - link de cartão opcional (a DOC Pagamentos não tem API);
  - botão também na tela de bloqueio;
  - aviso de vencimento por push (3 dias antes e no dia), abrindo a tela do Pix.
- **Ao retomar:** `git status`/`git log`, conferir PRs abertos e CI, e seguir o que faltar.

## 03/10/2026

- **Cadastro próprio:** continua aberto (decisão do Victor, risco controlado com alertas).
- **Vigia de segurança + Dependabot:** PR a abrir (Victor autorizou juntar direto). Workflow roda a cada 6h e abre Issues com @UziCelli sem repetir. Alertas com contagens apenas, limites em `tools/vigia.mjs`, falha do vigia também alerta. Documentação em `docs/seguranca.md` seção "## 6. Monitoramento".
- **PR #37 "Coach mais rápido"** (juntado com autorização do Victor):
  - Prescrição rápida: Tab ou Enter (com texto/sugestão) confirma e vai ao próximo exercício; Enter no campo vazio vai ao próximo treino.
  - "Copiar de…" em cada treino: repete exercícios, pausas, métodos e progressão. Bloqueado se destino tem cargas.
  - Início: seção "Treinaram hoje" mostra "Treino N ✓" com link para a semana.
  - Semana: cartão do treino de hoje com selo "Feito hoje ✓"/"Treinando hoje".
  - Ajustar volume: prévia com reps por exercício (3×10 → 3×11) e botão Cancelar.
- **Em andamento:** filtro da aba Métodos (semana/treino/exercício), testes de segurança e varredura do front-end.

## Ideias e pendências futuras (não fazer sem pedido)
- **Segurança é prioridade contínua** (pedido do Victor em 01/10/2026), antes de entrarem dados sensíveis:
  - avaliação física (Fase 3): dados de saúde, com acesso só do coach e do próprio aluno, e auditoria das regras;
  - cartão no app (Apple Pay, Google Pay, Samsung Pay…): o app nunca guarda nem vê dados de cartão, tudo via gateway com tokenização (PCI); precisa de servidor (Worker da Cloudflare, já que o Spark não tem Functions).
- Senha provisória pelo WhatsApp em vez do e-mail do Firebase (o nome "forca--app" aparece nos e-mails).
- Botão "ver vídeo" em cada exercício, quando o Victor gravar os vídeos.
- App da Gislane (`docs/plano-app-gislane.md`):
  - faltam o nome embaixo do ícone (até 12 letras), o domínio próprio e o ID do projeto Firebase;
  - as cores já estão aprovadas.
- Importar planilhas de outros alunos: `tools/planilha_para_meso.py` + workflow "Importar mesociclo".
- A migração do projeto Firebase foi descartada pelo Victor.
