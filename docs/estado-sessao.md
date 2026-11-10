# Estado da sessão (retomada) — atualizado em 10/11/2026

Leia antes: `CLAUDE.md`, `docs/mapa.md`. Branch de trabalho: recriada a partir da `main` a cada entrega. Os PRs até o #126 (avaliação física) estão juntados e publicados.

## 10/11/2026 — Meso inteiro por voz
- "Montar o meso por voz" saiu da aba Divisão e fica no topo do editor do meso.
- Além da divisão, a fala agora monta: séries e reps (padrão ou de um exercício), volume (progredir, reduzir, polimento) e métodos (pôr ou tirar; Biset/Triset/Superset/Circuito com parceiros).
- Prévia mostra cada ação em texto; nada grava sem "Aplicar no editor" + "Salvar".
- Fora por enquanto: configurações (semanas, dias, descansos) por voz.

## 10/11/2026 — Varredura e 3 correções
- **Lembrete do treino na hora:** o agendador do GitHub atrasava 5 a 10 h. Agora o robô entrega a lista e o Worker dispara às 6h47 (`docs/plano-notificacoes.md`, "Lembrete na hora certa"). A mensalidade continua saindo à tarde.
- **Lembrete só em dia de treino:** respeita os "Dias de treino" (ou o calendário automático) e para quando a semana está completa.
- **Anotações ao dar acesso ao app:** as anotações do presencial vão junto para a conta nova.
- **2ª leva (mesmo dia):**
  - notificações em até 3 aparelhos por pessoa (celular + computador), cada um com os próprios liga/desliga; sair tira só aquele aparelho;
  - "Apagar de vez": a Limpeza LGPD agora também apaga a inscrição de notificação guardada no Worker (`/esquecer`);
  - aba Métodos oferece os exercícios de "Trocas e adições", só nas semanas em que existem;
  - `docs/mapa.md` sem a linha antiga do `window.print()`.
- **Achados ainda abertos** (não corrigidos):
  - Dependabot falha no `minimatch`: vem de dentro de ferramentas de build (`firebase-tools`, `workbox-build`) e a versão corrigida não é compatível com elas; não vai para o app (produção com 0 vulnerabilidades). Esperar as ferramentas atualizarem;
  - inscrições de notificação de alunos apagados antes de 10/11/2026 ficam no Worker até o endereço morrer sozinho;
  - anotações órfãs de migrações antigas (presencial → app) continuam no banco: apagar exige o ok do Victor;
  - o monitor "Saúde dos apps" roda ~3 vezes por dia, não a cada hora (atraso do agendador do GitHub);
  - `push.yml` publica o Worker a partir de qualquer branch que mexa em `push/`;
  - a mensalidade ainda é avisada à tarde (atraso do agendador do GitHub).

## 09/11/2026 — Avaliação física e relatório escrito (Fase 3)
- Plano e escolhas do Victor: `docs/plano-avaliacao.md` (perímetros, dobras Pollock 7, bioimpedância; só o coach preenche e libera; lembrete a cada mesociclo; **sem foto**).
- Coach: perfil do aluno → "Avaliação física" → "Nova avaliação". O app calcula IMC, % de gordura, massa magra e escreve o texto de evolução (compara com a anterior e com a primeira). Recado, Salvar rascunho / Liberar / Recolher, PDF.
- Aluno: cartão "Sua avaliação física está pronta" no Início; vê só as liberadas e baixa o PDF.
- Início do coach: "Avaliações a fazer" (ciclo terminou há até 30 dias sem avaliação nova).
- Segurança/LGPD: coleção `avaliacoes` com regra e testes de ataque; entra no "Apagar de vez" e na Limpeza LGPD; Política atualizada (`VERSAO_PRIVACIDADE` = `2026-11-09b`: todos os alunos aceitam de novo uma vez, com a conferência de senha).
- Texto do relatório por regras, sem IA (nenhuma medida sai do Firebase). PDF usa as mesmas folhas do relatório do ciclo (`relatorio/folhasPdf.ts`).
- Vale para as duas marcas.
- **Pendências do Victor:** fazer uma avaliação real (ele e a Gislane) e conferir o PDF no celular; pedir ao advogado para revisar a Política, agora com medidas do corpo.
- Ideias para depois (não fazer sem pedido): foto do corpo (Storage exige plano pago), outros protocolos de dobras (3 dobras, Guedes), gráfico da evolução das medidas, aluno online lançar o próprio peso.

## 09/11/2026 — Sua opinião (feedback)
- Aluno envia nota, assunto, tipo e texto, com nome ou anônimo (anônimo não guarda quem enviou). Só o personal lê (aba Feedbacks): filtros, marcar lido, apagar.
- Depoimento: só com nome, nota 5, texto e autorização marcada (a regra do Firestore confere). Sai em texto/cartão para story e site.
- Convite para opinar em bons momentos (recorde, fim de ciclo), no máximo 1 vez a cada 60 dias por aparelho.
- Privacidade: Política ganhou "Sua opinião e depoimentos" (versão 2026-11-09, o app pede aceite de novo); "apagar de vez" e a limpeza LGPD removem os com nome.
- Testes: regras (`rules` e `ataques`), `feedback.test.ts`, LGPD.
- Falta o Victor: mandar o link "Avaliar no Google" (dele e da Gislane) para colocar em `marcas/*/marca.json` → `avaliarGoogle` (hoje vazio).

## 10/11/2026 — Assistente de voz (IA)
- Pedido do Victor: chave da API da Anthropic (Haiku) nos dois apps (VFit e Gislane, mesmo código) para montar treino falando.
- Decisão do Victor: chave guardada no Firestore (`segredos/ia`), só o personal lê. Sem Cloud Function (plano grátis).
- Feito: cadastro da chave em Minha conta; botão "Montar treinos por voz" na aba Divisão (ditado do navegador, grátis → Haiku → prévia → Aplicar); regra + testes; CSP; backup ignora `segredos`.
- Falta o Victor: criar a chave no console.anthropic.com, **definir limite de gasto lá**, colar em Minha conta (nos dois apps) e testar o microfone num celular real (Android; no iPhone instalado o ditado pode não existir, aí usa o microfone do teclado).
- Ideia futura: pedir também séries/reps/métodos por voz (hoje só a lista de exercícios por treino).
- 10/11/2026 (2ª leva, a pedido do Victor): texto apagado não volta mais (mexer no texto desliga o microfone; botão Limpar); a IA entende adicionar (padrão, no fim do treino), trocar X por Y e refazer a lista; ditado continua após silêncio. Em aberto: transcrição melhor que a do navegador exige um serviço pago de voz→texto (a API da Anthropic não transcreve áudio); decisão do Victor.

## Regras combinadas com o Victor
- **Linguagem:** respostas curtas, em tópicos, pt-BR (ele tem TDAH e não programa).
- **Hierarquia (14/10/2026, `CLAUDE.md`):** Opus é o **arquiteto** (decisões e questões difíceis passam por ele), Sonnet **executa** (`dev`, `revisor`), Haiku faz o **operacional** (`auxiliar`, `explorador`: commit, PR, merge, CI, deploy, testes).
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
  - Conteúdo: foto dela (fundo vermelho), WhatsApp (número no arquivo da marca), @gislane_personal, agenda do Google, Vila Andrade e Vila das Belezas (SP).
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

## 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji
- PDF do relatório: agora é gerado em canvas (`src/lib/pdf.ts`, `montarPdf`), não mais pelo `window.print()`.
- Correção não conta como treino: editar sem "Iniciar" grava as cargas (histórico e recordes), mas não vira treino feito nem "em andamento"; a correção é datada na semana planejada.
- Modo coach: o coach edita o treino sem "Iniciar"; o aluno não abre semana passada não feita (só na tela; as regras não mudam).
- Presencial em grupo: as telas ficam montadas e escondidas; push, marca de inatividade e cronômetro de descanso são compartilhados (vale o último).
- Sem emoji: ícones de traço em `src/icones.tsx`; `src/semEmoji.test.ts` barra emoji e símbolos de teclado em `src/**`.
- e2e de texto ajustados (link "(feito)", "Feito hoje" com ícone, "Primeiro treino" com ícone).
- Mapa e pontos sensíveis atualizados com as novas regras.

## Ideias e pendências futuras (não fazer sem pedido)
- **Notificações:** prontas (2ª parte em 09/11/2026, ver a seção do dia). Sobrou só uma ideia: avisar o coach de "Sua opinião" nova.
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
- A migração do projeto Firebase foi descartada pelo Victor.

## 12–13/10/2026 — Importar da planilha no app
- Botão "Importar da planilha" no perfil do aluno (PR #74): lê o .xlsx no aparelho e grava o meso com as cargas dos treinos realizados. Limites em `docs/mapa.md` (Pontos sensíveis, "Importar planilha").
- PR #76: aceita também o rótulo "Número de semanas" na Configuração do Meso.
- Validado pelo Victor com uma planilha real (aba M7) em 13/10/2026.
- `tools/planilha_para_meso.py` + workflow "Importar mesociclo" ficam só de reserva.

## 13/10/2026 — Notificações: mensalidade e treino pronto
- Plano e contrato: `docs/plano-notificacoes.md`.
- Worker `push/` agora atende as 2 marcas (a Gislane ganhou push) com rotas `/inscrever`, `/desinscrever`, `/treino-pronto` e `/aviso-pagamento`.
- Mensalidade: workflow "Avisos de mensalidade" (diário 8h47 de Brasília) avisa quem vence em 3 dias e hoje; toque abre a Conta (Pix).
- Treino pronto: botão "Avisar aluno: treino pronto" no editor do meso (não é automático).
- Ícone: `badge-96.png` por marca (V/G branco); textos sem emoji. Aluno liga/desliga em Conta → "Treino novo e mensalidade".
- A conferir com o Victor num celular real: chegada do aviso e ícone V/G no Android.

## 13/10/2026 (noite) — Cardio, pílula do Novo aluno e prints
- **Cardio:** no Início o aluno marca que fez cardio (tipo e minutos opcionais), mesmo sem treino de força. Um registro por dia (`cardios`). O painel de evolução marca os dias no calendário (3 meses).
- **Coach:** lê e apaga o cardio, nunca grava. Cardio não entra nos números de força, ranking, relatório nem agenda.
- **LGPD:** `cardios` entra em "Apagar de vez" e na Limpeza LGPD.
- **Política de Privacidade:** cita o cardio. `VERSAO_PRIVACIDADE` = 2026-10-13: todos os alunos aceitam de novo uma vez.
- **Pílula do "Novo aluno":** o fundo ficou no contêiner, para o botão seguinte não cobrir a pílula ao deslizar. Teste de guarda em `e2e/coach.spec.ts`.
- **Prints para divulgação** (opt-in, só emulador, alunos fictícios; saída fora do repositório):
  - `PRINTS=1 PRINTS_DIR=<pasta> flock /tmp/claude-emulador.lock npx firebase emulators:exec --only auth,firestore --project demo-forca 'npx playwright test e2e/prints.spec.ts'`
  - `MARCA=gislane` para a outra marca.
- **Pendências do Victor:**
  - no iPhone, conferir a pílula do "Novo aluno" nos dois sentidos e o Cardio;
  - no Android, conferir os avisos de mensalidade e de treino pronto.

## 14/10/2026 — Foto de fim de treino e hierarquia dos agentes
- **Hierarquia nova** no `CLAUDE.md`: Opus arquiteto, Sonnet executor, Haiku operacional.
- **Foto no story do fim do treino** (PR #80): "Adicionar foto" na tela "Treino concluído", foto em tela cheia com a marca (logo, data, nome e chips de Duração/Volume/Semana; selo de recorde só se houver). Botões "Trocar foto" e "Tirar foto".
  - A foto fica só no aparelho (sem Firestore/Storage/regras; política e `VERSAO_PRIVACIDADE` não mudam).
  - Escolhas do Victor: tela cheia e poucos números. Fora do escopo: zoom/arrastar, filtros, adesivos.
- **Pendência do Victor:** no iPhone (PWA) e no Android, conferir câmera/galeria e compartilhar direto no Instagram.
- Próximos combinados (sem mudança): notificações (resto) e lojas.

## 04/11/2026 — Editar o treino na hora (presencial)
- No presencial, o coach ajusta **só o treino daquele dia**: lápis em cada exercício (trocar, tirar, pôr/tirar método) e "+ Adicionar exercício" no fim.
- "Treino ajustado só hoje" + "Voltar ao planejado" desfaz tudo; nenhuma carga é apagada.
- O planejamento do meso não muda. Detalhes e limites: `docs/mapa.md`, linha "Treino ajustado na hora".
- Pendência do Victor: testar no celular num treino real.

## 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação
- **Saída por inatividade:** aluno 30 dias (era 4 h), coach 7 dias (era 20 min). Fechar o app e voltar não pede login de novo; o 2FA do coach só volta em aparelho novo, depois de "Sair" ou de 7 dias sem abrir.
- **Concluir treino:** pede um 2º toque ("Concluir o treino?" → Sim, concluir / Continuar treinando).
- **Desfazer:** logo depois de concluir (até 3 h do início), o treino volta a correr com o tempo do início original; cargas ficam.
- Vale para as duas marcas (mesmo código).

## 08/11/2026 — Aba Métodos mais simples (editor do meso)
- Pedido do Victor: pôr métodos mais rápido, no exercício e nas semanas que ele quer.
- **Como ficou:**
  - um treino por vez (abas), com a lista de exercícios e os métodos embaixo de cada um;
  - cada método é **uma linha com as semanas** ("Dropset · S3 · todas as semanas"), não um cartão por semana;
  - "+ Método" abre uma folha: método, semanas (chips + "Todas"), séries, drop (etapas e carga) e "Juntar com" (Biset…);
  - o resto fica em "Mais ajustes", fechado.
- Sem filtro, sem "Copiar para todas" e sem campo "Grupo" (o número do grupo é automático).
- O formato dos dados não mudou (sem migração). Lógica em `src/engine/planoMetodos.ts`.
- **Pendência do Victor:** montar um meso real no PC e no celular e dizer o que ainda incomoda.

## 08/11/2026 — Pix aparece antes de vencer
- Conferido: o Pix já podia ser pago a qualquer hora (Conta → Mensalidade) e as notificações de 3 dias e do dia funcionam (workflow diário verde).
- Novo: nos **5 dias antes** do vencimento, o Início do aluno mostra o cartão "Mensalidade vence em N dias" com QR, "Copiar código Pix" e "Já paguei", sem bloquear o acesso.
- Quem toca na notificação cai na Conta com o Pix já aberto.
- Escolha do Victor: 5 dias. Detalhes: `docs/mapa.md`, linha "Pix antes do vencimento".

## 08/11/2026 — Prescrição mais fácil (PR #114)
- Pré-visualização do editor abre/fecha (começa fechada, lembra a escolha).
- Campos numéricos (semanas, pausas, tempo limite, progressão) deixam apagar e digitar; o limite só vale ao sair do campo.
- Ícone do calendário do "Início" visível; clicar no campo abre o calendário.
- Campo Frequência saiu: frequência = dias de treino marcados.
- Divisão: cartão "Trocas e adições" — trocar ou acrescentar exercício num intervalo de semanas (`meso.adicoes`).
- Pendência: a aba Métodos nova (PR #113) ainda não oferece as posições adicionadas.

## 08/11/2026 — Navegação: "Voltar" em todas as telas e presencial em 2 toques
- Pedido do Victor: botão voltar faltando e o caminho até o presencial era longo.
- **Como ficou:**
  - "← Voltar" igual (topo à esquerda) em toda tela que não é aba: mesociclos do aluno, editor, semanas, novo aluno, ranking, evolução, relatórios, métodos, treino;
  - ele volta para a tela de onde a pessoa veio; se o app abriu direto ali, vai para um lugar seguro;
  - Início do coach: botão **"Treino presencial"** → escolher aluno (busca + recentes) → já cai no treino de hoje;
  - presencial: "Sair" virou "Encerrar" (volta para onde estava antes); no grupo, "Tirar";
  - aluno: o Voltar do treino respeita de onde veio (Início ou aba Treino); saiu o "← Hoje" da aba Evolução.
- Vale para as duas marcas. Nada muda nos dados.

## 09/11/2026 — Notificações: coach, lembrete do treino e aviso escrito
- Plano e contrato: `docs/plano-notificacoes.md` (2ª parte). Vale para as 2 marcas.
- **Coach recebe:** aluno concluiu o treino, escreveu anotação, tocou "Já paguei". Ativa em Minha conta → Notificações.
- **Aluno recebe:** lembrete do treino do dia (seg a sáb, 6h47, só com meso em andamento e sem treino hoje) e aviso escrito pelo coach.
- **Aviso escrito:** em Alunos → "Aviso para todos", ou engrenagem do aluno → "Enviar aviso". Até 200 letras; nada é gravado no banco.
- **Ligar/desligar por tipo** em Conta (aluno e coach), por aparelho.
- Ao sair da conta, o aparelho para de receber avisos.
- Regras do Firestore não mudaram. Texto da Política sobre a Cloudflare ajustado, sem novo aceite.
- **Pendências do Victor (testar em iPhone e Android):**
  - coach: Minha conta → "Ativar notificações neste aparelho";
  - aluno conclui treino, escreve anotação e toca "Já paguei": o coach recebe os 3;
  - coach manda "Aviso para todos" e um aviso para um aluno;
  - lembrete das 6h47 (ou rodar o workflow "Avisos de mensalidade" com modo `lembrete`);
  - desligar um tipo em Conta e conferir que ele para de chegar.

## 10/11/2026 — Multa e juros no Pix
- Venceu: o Pix soma multa de 2% (uma vez) + juros de 1% ao mês, proporcional aos dias (1%/30 por dia).
- O QR e o "copia e cola" já saem com o total do dia e se atualizam sozinhos à meia-noite.
- Antes de vencer, o Pix avisa: "Após o vencimento: multa de 2% e juros de 1% ao mês."
- Coach: lista de Alunos mostra "Com atraso: R$ X" (valor do dia em que o aluno tocou "Já paguei").
- Ligado nas duas marcas (`pix.atraso` no `marca.json`): VFIT e Gislane, mesma regra.
