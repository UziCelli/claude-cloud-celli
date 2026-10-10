# Estado da sessão (retomada) — atualizado em 08/10/2026

Leia antes: `CLAUDE.md`, `docs/mapa.md`. Branch de trabalho: `claude/fervent-brahmagupta-y5vri5`. Os PRs até o #19 estão juntados e publicados.

## Regras combinadas com o Victor
- **Linguagem:** respostas curtas, em tópicos, pt-BR (ele tem TDAH e não programa).
- **Economia:** a sessão principal só orquestra.
  - Código vai para agentes **Sonnet** (dev/arquiteto com `model: sonnet`).
  - Tarefas executivas (commit, push, PR, merge, acompanhar CI e deploy) vão para o **auxiliar (Haiku)**.
- **Merge (desde 07/10/2026):** automático depois de revisão própria + CI verde, sem pedir ao Victor (fluxo em `CLAUDE.md`, "PRs: fluxo automático"). Depois de juntar, conferir o workflow "Publicar".

## Entregas
- **Entrega 1** (`docs/plano-entrega1.md`): PR #20, juntado pelo Victor.
- **Entrega 2** (`docs/plano-entrega2.md`): PR #21, juntado e publicado.
  - Padrão adotado: os 2 primeiros exercícios de cada treino ficam fora do biset automático (`incluirPrincipais=false`).
  - O motor ainda lê as chaves antigas `'t-p'` de `progressaoExercicio` como reserva para mesos não migrados.
- **Entrega 3**: PRs #23 e #24 (Superset = 4+ exercícios), juntados e publicados.
  - Worker: `https://vfit-descanso.vfitcoach-site.workers.dev`.
  - Falta o Victor testar a notificação num iPhone real.
- **Entrega 4** (`docs/plano-entrega4.md`): juntada (PRs #25 e #26) e publicada.
  - Inatividade: aluno 4 h (era 30 min; mudado em 06/10/2026 a pedido do Victor), coach 20 min.
  - MFA TOTP só para o coach: ativo.
  - Sem tela de erros no painel: os erros ficam no workflow "Ver erros do app".
  - PR #27 (2 etapas obrigatórias + App Check) juntado e publicado. PR #28 corrigiu o login que caía na hora (marca de inatividade antiga).
  - App Check: **reCAPTCHA Enterprise** registrado no Firebase em modo Monitorar (01/10/2026). Após alguns dias sem erros, conferir o uso (grátis até 10 mil/mês) e mudar para **Aplicar**.
- **01/10/2026 (madrugada, autorizado pelo Victor a juntar sozinho):** PRs #29 e #30 juntados e publicados.
  - Peso do corpo automático (barra fixa, flexão de braços, abdominais no solo sem carga, "Agachamento com Peso do Corpo") + opção "Feito com o peso do corpo" abaixo das séries; campo de anotação limpo; menu do topo sem cortes (ícone de conta no celular).
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
- **PR #41 "Painel de Evolução"** (juntada):
  - Painel do aluno: números (treinos, semanas seguidas, toneladas), calendário 12 semanas, maiores evoluções, recordes, conquistas, tabela por exercício.
  - Cartão do story (Instagram): imagem Canvas 1080×1920 com logo, primeiro nome e números.
  - "Novo recorde! 🎉" no treino + vibração (leitura, não mexe na gravação).
  - Coach: botão "Evolução" em cada aluno, página `/ranking` (Mais evoluíram / Mais frequentes / Em risco), cartão "Frequência caindo" no Início.
  - Plano completo em `docs/plano-evolucao.md`.
- **Vigia de segurança + Dependabot:** PR a abrir (Victor autorizou juntar direto). Workflow roda a cada 6h e abre Issues com @UziCelli sem repetir. Alertas com contagens apenas, limites em `tools/vigia.mjs`, falha do vigia também alerta. Documentação em `docs/seguranca.md` seção "## 6. Monitoramento".
- **PR #37 "Coach mais rápido"** (juntado com autorização do Victor):
  - Prescrição rápida: Tab ou Enter (com texto/sugestão) confirma e vai ao próximo exercício; Enter no campo vazio vai ao próximo treino.
  - "Copiar de…" em cada treino: repete exercícios, pausas, métodos e progressão. Bloqueado se destino tem cargas.
  - Início: seção "Treinaram hoje" mostra "Treino N ✓" com link para a semana.
  - Semana: cartão do treino de hoje com selo "Feito hoje ✓"/"Treinando hoje".
  - Ajustar volume: prévia com reps por exercício (3×10 → 3×11) e botão Cancelar.
- PR #38 (juntado): filtro da aba Métodos (semana/treino/exercício), `e2e/varredura.spec.ts` (todas as telas, sem bugs), `tests/ataques.test.ts` (79 casos, nenhum furo) e link da política no Hoje do aluno.
- PR #39 (juntado): login anônimo não conta como logado nas regras.
- **Próximo:** app da Gislane (segunda marca) numa conversa nova. Plano em `docs/plano-app-gislane.md`.
- **Pendências do Victor:**
  - App Check → Aplicar;
  - retenção de logs do GitHub em 30 dias;
  - 2 etapas no Google e no GitHub;
  - advogado revisar a política.

## 03/10/2026 (tarde) — App da Gislane
- Branch `claude/sweet-wozniak-88xkfn`. Coordenação pelo Opus; código e testes com Sonnet/Haiku (pedido do Victor).
- **Decisão do Victor:** um repositório só. Toda melhoria (segurança, back-end, design) vale para os dois apps; só a marca muda.
- Fases A e B de `docs/plano-app-gislane.md` feitas (seção "Andamento"). Rodar local: `npm run emuladores` + `npm run dev:gislane`.
- PRs #1–#40 conferidas: 39 juntadas. A #22 foi fechada por engano do Victor e fica descartada.
- Pendências antigas achadas nas PRs: conferir login, "Esqueci minha senha" e o app no iPhone/Android (#13); rodar "Aluno de exemplo" para acertar a semana 1 (#33).
- Aprovados pelo Victor: ícone "G", nome "Gislane" embaixo do ícone e botão "perigo" em vinho escuro.
- Responsável na Política: Gislane dos Santos Madeira, CREF 180464-G/SP.
- PR #42 recebeu a `main` com o Painel de Evolução (#41): o cartão do story agora lê logo (`@marca/logoPaths`), cores (`marca.json` → `cores`, conferidas contra o `tema.css` por teste) e nome da marca. Toda tela ou imagem nova deve ler a marca assim, nunca ter VFIT fixo.
- Domínio: `gislanepersonaltrainer.com` (landing na Cloudflare, igual ao VFIT; app em `app.`). Landing em `vfitcoach-site/gislane/` (PR #4 daquele repositório).
- **App da Gislane, Fase C no código** (03/10/2026): projeto `gislane-personal-trainer`, `.env.gislane`, aliases no `.firebaserc`, job `gislane` em `deploy.yml` (com trava) e `build:gislane` no CI.
- PR #43 juntada. O job `gislane` deu 403 até o robô ganhar o papel "Consumidor do Service Usage" no projeto dela; depois, publicado.
- PR #44 juntada e publicada nos 2 projetos:
  - scripts operacionais (backup, LGPD, vigia, mfa, erros) exigem `PROJETO` e rodam nas 2 marcas;
  - APK reserva da Gislane;
  - Instalar por marca (Android dela pelo Chrome).

## 04/10/2026 — Gislane no ar
- **App:** https://app.gislanepersonaltrainer.com (Firebase `gislane-personal-trainer`). Victor e Gislane conferiram os 2 apps: tudo ok.
- **2 etapas:** TOTP ligado no projeto dela (workflow "2 etapas do coach", marca gislane). A conta de coach dela já ativou.
- **Landing:** https://gislanepersonaltrainer.com.
  - Worker `gislane-site` na conta Cloudflare dela.
  - Publica pelo workflow manual "Publicar site da Gislane" (`vfitcoach-site`); juntar no `master` não publica.
  - PRs #3 (Dependabot), #4 e #5 daquele repositório juntadas.
  - Conteúdo: foto dela (fundo vermelho), WhatsApp (11) 91568-8424, @gislane_personal, agenda do Google, Vila Andrade e Vila das Belezas (SP).
  - Resultados: 4 alunas, **só iniciais** (G., G., B., J.), números exatos das fichas de avaliação, sem arredondar.
  - Primeiros nomes só com termo de autorização das alunas (Victor vai perguntar a ela).
- **DNS (Cloudflare dela):** os registros copiados da Squarespace (A 198.x e CNAME www) foram apagados. Sem isso, o Worker não liga o domínio (erro 100117). A Squarespace só registra o domínio.
- **"Workers Builds: vfitcoach"** falha em todas as PRs do `vfitcoach-site`. O log só aparece no painel da Cloudflare do Victor. Não afeta a publicação da Gislane.
- **Pendências da Gislane:** e-mails do Auth com a marca dela, Worker de push dela, DNSSEC/DMARC.

## 07/10/2026
- Treino: "▶ Iniciar treino" + relógio "Treino em andamento · mm:ss" até concluir (duração final parada depois). Treino em andamento neste aparelho conta como uso na inatividade (teto 3 h). Não commitado. e2e `relogio.spec.ts`.

## 08/10/2026 — Redesenho (PR 56)
- Plano aprovado em `docs/plano-redesenho.md` a partir dos prints do protótipo (local, fora do git: `prototipo.html`, `src/prototipo/`).
- Feito:
  - visual vidro;
  - barra de abas embaixo (aluno e coach) e menu lateral do coach no computador;
  - Início do aluno e do coach;
  - aba Treino com travas e semana de volta (−5%);
  - Conta do aluno;
  - boas-vindas, instalar e login;
  - "Dias de treino" no editor do meso.
- `Treino.tsx` manteve o visual; só ganhou a carga −5% na semana de volta.
- Corrigido: o aviso de "treino adaptado" nunca aparecia, porque lia `adaptadoEm` do meso convertido.

## 09/10/2026 — Segurança, movimento e aba Conta
- PR #57: alertas do `npm audit` corrigidos com overrides; o `braces` fica aceito (sem correção publicada).
- PR #58: movimento estilo iOS, com as molas em `src/movimento.ts`. Victor vai sentir no celular e pedir ajustes.
- Aba Conta do aluno:
  - foto redonda em `fotos/{uid}`, selo da marca, nome editável, "Aluno desde";
  - peso (saiu da `MinhaConta`), trocar senha, liga/desliga do aviso de descanso;
  - foto aparece na lista do coach.
  - `VERSAO_PRIVACIDADE` = 2026-10-09: todos os alunos aceitam a política de novo uma vez.
- Ordem combinada a seguir: **Pix**. Depois: compartilhar foto no fim do treino com a marca.

## 09/10/2026 (noite) — Pix simples
- QR estático (BR Code, sem API e sem taxa) com a chave de cada marca (`marcas/<id>/marca.json` → `pix`): VFIT = CNPJ, Gislane = e-mail dela. Marca sem `pix` não mostra nada de Pix.
- Coach: Alunos → Renovar → "Mensalidade (R$)". A lista mostra "R$ X/mês" e "Informou pagamento"; "Confirmar pagamento" leva o `pagoAte` do vencimento atual para +1 mês.
- Aluno: Conta → Mensalidade → "Pagar com Pix" (QR, copiar código, "Já paguei"). A tela "Acesso pausado" também mostra o Pix.
- Início do coach: cartão de avisos de Pix a confirmar.
- `VERSAO_PRIVACIDADE` = 2026-10-10 (a política cita a mensalidade): os alunos aceitam de novo uma vez.
- Pix automático (gateway + webhook) só depois de ~6 meses: tem taxa por Pix e o gateway pede CPF.

## 09/10/2026 (noite) — Animações e calendário automático
- PR #61: fundo sem corte na troca de tela, chave da Conta sem atraso, brilho correndo na borda do treino de hoje.
- Calendário automático (meso sem `dias`): os treinos ganham dia pela frequência a partir do início (3x = dias 0, 2, 4 do bloco). "Hoje" só no dia; antes, "Próximo · Amanhã/Qua, 14". Nunca dois no mesmo dia (dia seguinte ao último feito), limitado ao fim do bloco.
  - Atraso no começo: decidido "só a 1ª semana se ajusta" (o fim do meso não muda). Se o Victor pedir, a alternativa é o meso todo andar junto (mexe nas telas do coach).
  - Presencial do coach: o próximo treino sempre em destaque.
- Próximo combinado: compartilhar foto no fim do treino com a marca.

## 10/10/2026 — Iniciar/Cancelar treino, pausas e Ajustar volume
- Treino do aluno: só "Iniciar treino" inicia (com brilho da marca); campos travados antes; "Cancelar treino" apaga o tempo e as cargas daquele treino.
- Editor: pausa dos principais (exercícios 1–2) e dos auxiliares na Config; pausa por exercício continua; % de progressão e limite de reps só no Ajustar volume (antes eram dois % diferentes); prévia automática com movimentos por semana, variação % e total.
- "Ver semanas": borda do card "Treinando hoje" cabe no painel.
- Próximo combinado (sem mudança): foto do treino com a marca; notificações; lojas.

## 10/10/2026 (noite) — Alertas com ações e relatório do ciclo
- Alertas: Arquivar (some do Início e do selo; volta sozinho com dado novo), "Arquivados" com Desarquivar, WhatsApp (`wa.me/?text=`, sem telefone) e E-mail (o do login).
- Relatório do fim do ciclo: Victor revisa, escreve o recado e toca "Liberar"; o aluno vê no Início, baixa PDF ou imagem story. Números calculados na hora (só o comentário é gravado).
- Escolhas do Victor: não "excluir de vez" alertas; aluno só vê depois da revisão.

## Ideias e pendências futuras (não fazer sem pedido)
- **Notificações (tema importante, a planejar depois):**
  - para o coach: aluno fez o treino, comentário do aluno, "Já paguei";
  - para o aluno: avisos do coach, treino do dia.
  - Reaproveitar o Worker de push que já existe (`push/`, Cloudflare, grátis).
- **Lojas (App Store / Google Play), ideia de 08/10/2026:**
  - embrulhar o mesmo código com Capacitor; nada de reescrever nativo;
  - mesmo projeto Firebase (aceita web + iOS + Android);
  - custo: Apple US$ 99/ano, Google US$ 25 uma vez;
  - risco: revisão da Apple (regra 4.2, app que é "só um site"); notificações ajudam a passar;
  - fazer depois das notificações.
- **Segurança é prioridade contínua** (pedido do Victor em 01/10/2026), antes de entrarem dados sensíveis:
  - avaliação física (Fase 3): dados de saúde, com acesso só do coach e do próprio aluno, e auditoria das regras;
  - cartão no app (Apple Pay, Google Pay, Samsung Pay…): o app nunca guarda nem vê dados de cartão, tudo via gateway com tokenização (PCI); precisa de servidor (Worker da Cloudflare, já que o Spark não tem Functions).
  - **Relatórios escritos de evolução** quando chegar a avaliação física (Fase 3).
- Senha provisória pelo WhatsApp em vez do e-mail do Firebase (o nome "forca--app" aparece nos e-mails).
- Botão "ver vídeo" em cada exercício, quando o Victor gravar os vídeos.
- App da Gislane: no ar (ver "04/10/2026 — Gislane no ar"). Plano e histórico em `docs/plano-app-gislane.md`.
- Importar planilhas de outros alunos: `tools/planilha_para_meso.py` + workflow "Importar mesociclo".
- A migração do projeto Firebase foi descartada pelo Victor.
