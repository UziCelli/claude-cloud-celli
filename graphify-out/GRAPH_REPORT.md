# Graph Report - claude-cloud-celli  (2026-11-10)

## Corpus Check
- 312 files · ~302,701 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2980 nodes · 8119 edges · 161 communities (146 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 364 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8654fe0b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- engine/index.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- Hoje.tsx
- MesosDoAluno.tsx
- env
- ranking.spec.ts
- icones.tsx
- AvaliacaoCoach.tsx
- pdfRelatorio.ts
- util.ts
- Alunos.tsx
- inscreverAvisos
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- Relatorio.tsx
- prints.spec.ts
- codigoPix
- FimTreino.tsx
- jwt.ts
- ContaAluno.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- CardioHoje.tsx
- steps
- steps
- settings.json
- criarAluno
- PainelEvolucao.tsx
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- PagarPix.tsx
- ImportarPlanilha.tsx
- prescreverSessao
- push.ts
- src/index.ts
- steps
- AssistenteIA.tsx
- package.json
- Onde fica cada coisa
- evolucao.ts
- with
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- src/acesso.ts
- compilerOptions
- vite.config.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- vfit/Logo.tsx
- Presencial.tsx
- steps
- @playwright/test
- Entrar.tsx
- Pontos sensíveis (leia antes de auditar ou mexer)
- Motion / Framer Motion Examples
- Push do descanso (Entrega 3b)
- Feedbacks.tsx
- Aviso
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- GuiaMetodos.tsx
- steps
- limpeza-lgpd.test.ts
- criarMeso
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- criarCoach
- importar-meso.mjs
- Inicio.tsx
- with
- overrides
- treino.test.ts
- relatorio.spec.ts
- voz-ia.spec.ts
- Performance Optimization
- InicioAluno.tsx
- firebase-admin
- Coleções Firestore
- metricas.ts
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- mfa.mjs
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- acoes.ts
- gislane/Logo.tsx
- marca.test.ts
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- Botao
- layout.spec.ts
- TutorialCoach.tsx
- varredura.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- registrarErro
- atualizar.ts
- Árvore por pasta
- Tutorial.tsx
- saude.yml
- cors.ts
- iaTreino.ts
- EditarTreino.tsx
- limparEmuladores
- CampoExercicio
- rules.test.ts
- lib/acesso.ts
- fetch
- contato.ts
- limpeza
- marca
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- with
- aluno-exemplo.test.ts
- preparar
- vitest
- ref_node_fs
- App.tsx

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 134 edges
2. `Botao()` - 100 edges
3. `Treino()` - 78 edges
4. `react` - 67 edges
5. `vitest` - 67 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 52 edges
8. `Cartao()` - 49 edges
9. `registrarErro()` - 46 edges
10. `firebase` - 45 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx

## Import Cycles
- None detected.

## Communities (161 total, 15 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

### Community 1 - "engine/index.ts"
Cohesion: 0.30
Nodes (12): linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica(), reduzirVolume() (+4 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.07
Nodes (34): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+26 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (42): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+34 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "planilha.ts"
Cohesion: 0.10
Nodes (31): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+23 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.11
Nodes (32): `src/features/aluno/` — App do aluno, `src/lib/` — Firestore, estado, cálculos com dados, Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), dataSP() (+24 more)

### Community 8 - "MesosDoAluno.tsx"
Cohesion: 0.18
Nodes (24): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+16 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "ranking.spec.ts"
Cohesion: 0.17
Nodes (5): ALUNO, COACH, CORS, CAINDO, COACH

### Community 11 - "icones.tsx"
Cohesion: 0.09
Nodes (43): `src/features/instalar/` — PWA/Android, Linha(), AvaliacaoPronta(), RelatorioPronto(), BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone() (+35 more)

### Community 12 - "AvaliacaoCoach.tsx"
Cohesion: 0.10
Nodes (42): Avaliacao(), BotaoPdfAvaliacao(), AvaliacaoCoach(), Editor(), Faixa, fora(), hoje(), num() (+34 more)

### Community 13 - "pdfRelatorio.ts"
Cohesion: 0.23
Nodes (16): EntradaPdfAvaliacao, gerarPdfAvaliacao(), criarFolhas(), disp(), LARG, M, MUDO, PH (+8 more)

### Community 14 - "util.ts"
Cohesion: 0.15
Nodes (29): AlvoVolume, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+21 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.13
Nodes (29): LGPD, Peso(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar() (+21 more)

### Community 16 - "inscreverAvisos"
Cohesion: 0.30
Nodes (12): `src/features/conta/` — Minha Conta, AvisoNotificacoes(), permissao(), AvisoDescanso(), Chave(), ChavesAvisos(), NotificacoesCoach(), IcSino (+4 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (43): concurrency, needs, runs-on, steps, strategy, group, BACKUP_SENHA, EVENTO (+35 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (40): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+32 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (21): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+13 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.08
Nodes (52): `notas/{alunoId}`, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), Modal() (+44 more)

### Community 21 - "Relatorio.tsx"
Cohesion: 0.30
Nodes (10): dadosCartaoRelatorio(), dataBr(), periodoTexto(), r, volumeTexto(), Bloco(), Faixa(), gerarPdf() (+2 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (16): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras() (+8 more)

### Community 23 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 24 - "FimTreino.tsx"
Cohesion: 0.18
Nodes (15): CONFETE, dur(), FimTreino(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+7 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "ContaAluno.tsx"
Cohesion: 0.17
Nodes (17): ContaAluno(), escolherFoto(), trocarSenha(), desde(), escolher(), IcLivro, IcPessoa, IcPrancheta (+9 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.06
Nodes (33): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+25 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.16
Nodes (28): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, desenhar(), gerarCartaoDepoimento(), quebrar(), ajustar(), C, caixa(), carregarImagem() (+20 more)

### Community 29 - "CardioHoje.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "criarAluno"
Cohesion: 0.13
Nodes (12): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, COACH, semear() (+4 more)

### Community 34 - "PainelEvolucao.tsx"
Cohesion: 0.14
Nodes (26): mesoAtual(), dataCurta(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda(), Titulo() (+18 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.08
Nodes (22): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), [a, m, d], achados, b, db (+14 more)

### Community 36 - "webpush.ts"
Cohesion: 0.17
Nodes (19): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), Inscricao, criptografar() (+11 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "PagarPix.tsx"
Cohesion: 0.27
Nodes (8): uqr, Mensalidade(), dataCurta(), PagarPix(), PIX, reais(), informarPagamento(), qrDataUrl()

### Community 39 - "ImportarPlanilha.tsx"
Cohesion: 0.33
Nodes (10): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), mesoParaDoc() (+2 more)

### Community 40 - "prescreverSessao"
Cohesion: 0.08
Nodes (36): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+28 more)

### Community 41 - "push.ts"
Cohesion: 0.18
Nodes (21): enviar(), agendarPush(), AVISOS_COACH, avisosLigados(), b64uParaBytes(), BASE, cabecalhosPush(), cancelarPush() (+13 more)

### Community 42 - "src/index.ts"
Cohesion: 0.11
Nodes (34): CacheAcesso, DO_ALUNO, Env, Mensagem, ROBO, TREINO, alvosDe(), Aviso (+26 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "AssistenteIA.tsx"
Cohesion: 0.44
Nodes (8): AssistenteIA(), remover(), salvar(), apagarChaveIA(), chaveMascarada(), chaveValida(), refChave(), salvarChaveIA()

### Community 45 - "package.json"
Cohesion: 0.14
Nodes (12): name, private, type, version, fundo, @cloudflare/workers-types, firebase-tools, tailwindcss (+4 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.19
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.06
Nodes (49): Peças, Linha, RegistroDoc, arred(), calcular(), coletar(), Conquista, conquistas() (+41 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 50 - "src/acesso.ts"
Cohesion: 0.22
Nodes (15): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+7 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "steps"
Cohesion: 0.08
Nodes (25): runs-on, steps, description, required, description, required, EMAIL_ATUAL, EMAIL_NOVO (+17 more)

### Community 55 - "steps"
Cohesion: 0.09
Nodes (25): concurrency, cancel-in-progress, group, runs-on, steps, SA, runs-on, steps (+17 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 58 - "Presencial.tsx"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 60 - "@playwright/test"
Cohesion: 0.17
Nodes (4): COACH, ALUNO, COACH, @playwright/test

### Community 61 - "Entrar.tsx"
Cohesion: 0.14
Nodes (27): Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar() (+19 more)

### Community 62 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.17
Nodes (33): Pontos sensíveis (leia antes de auditar ou mexer), `src/engine/` — Motor de cálculo puro (sem React/Firebase), alternarSerieDropset(), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa() (+25 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 65 - "Feedbacks.tsx"
Cohesion: 0.09
Nodes (43): Onde mexer para…, DadosDepoimento, textosDepoimento(), Cartao(), Doc, Estrelas(), FILTROS, ConviteFeedback() (+35 more)

### Community 66 - "Aviso"
Cohesion: 0.13
Nodes (26): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+18 more)

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 69 - "vigia.mjs"
Cohesion: 0.18
Nodes (9): agora, alertas, auth, coaches, corte, db, h24, projeto (+1 more)

### Community 70 - "Motion & Framer Motion - Complete API Reference"
Cohesion: 0.20
Nodes (9): Common Patterns Quick Reference, Core Animation Props, Custom Component with Motion, Import Types, Motion Component Props, Motion & Framer Motion - Complete API Reference, Performance Tips, Table of Contents (+1 more)

### Community 71 - "Hooks"
Cohesion: 0.20
Nodes (10): Hooks, useAnimate, useAnimationControls, useInView, useMotionValue, usePresence, useReducedMotion, useScroll (+2 more)

### Community 72 - "Plano — Entrega 1 (aprovado pelo Victor)"
Cohesion: 0.20
Nodes (9): 1. Semana certa ao abrir (aluno), 2. Tempo do treino, 3. Cronômetro manual por exercício, 4. Tempo real do treino, 5. Aviso de biset/triset/superset/circuito, 6. Lista de exercícios (coach, Divisão e trocas), 7. Divisão bonita no PC, Divisão de trabalho (agentes Sonnet; nunca dois no mesmo arquivo) (+1 more)

### Community 73 - "GuiaMetodos.tsx"
Cohesion: 0.21
Nodes (10): COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop(), dispensarNota(), mostrarNotasDeNovo() (+2 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarMeso"
Cohesion: 0.11
Nodes (14): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, ALUNO (+6 more)

### Community 77 - "Alertas.tsx"
Cohesion: 0.21
Nodes (18): aplicarSugestao(), abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+10 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.15
Nodes (12): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+4 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "criarCoach"
Cohesion: 0.32
Nodes (6): ALUNO, COACH, diasAtras(), semear(), criarCoach(), dispensarMfa()

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "Inicio.tsx"
Cohesion: 0.21
Nodes (19): `src/features/coach/` — App do coach, useAlertasCoach(), useArquivados(), calcularAlertas(), chavesAtuais(), QrCadastro(), Feedbacks(), mediaTexto() (+11 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "treino.test.ts"
Cohesion: 0.25
Nodes (5): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), base

### Community 86 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "InicioAluno.tsx"
Cohesion: 0.12
Nodes (48): firebase, Hoje(), InicioAluno(), Msg(), PixPerto(), Quadros(), AvaliacaoAluno(), useAvaliacoesLiberadas() (+40 more)

### Community 90 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 91 - "Coleções Firestore"
Cohesion: 0.05
Nodes (34): `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}` (+26 more)

### Community 92 - "metricas.ts"
Cohesion: 0.15
Nodes (21): `registros/{regId}`, 7. Teste de ataques (03/10/2026), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+13 more)

### Community 93 - "backup.mjs"
Cohesion: 0.33
Nodes (6): backup, db, lerColecao(), limpa(), projeto, PROJETOS

### Community 94 - "Best Practices Summary"
Cohesion: 0.33
Nodes (6): 1. Use Transform Properties, 2. Respect Accessibility, 3. Optimize Bundle Size, 4. Clean Up Animations, 5. Debounce/Throttle Expensive Operations, Best Practices Summary

### Community 95 - "Scroll-Based Animations"
Cohesion: 0.33
Nodes (6): Parallax Scrolling, Scroll-Based Animations, Scroll-Based Counter, Scroll Progress Indicator, Scroll-Triggered Animation Sequence, Sticky Scroll Sections

### Community 96 - "Utilities"
Cohesion: 0.33
Nodes (6): animate (standalone), clamp, mix, stagger, transform, Utilities

### Community 97 - "Gesture Props"
Cohesion: 0.33
Nodes (6): Gesture Props, whileDrag, whileFocus, whileHover, whileInView, whileTap

### Community 98 - "Transition Options"
Cohesion: 0.33
Nodes (6): Inertia Transitions (Decelerating), Orchestration, Spring Transitions (Physics-based), Transition Interface, Transition Options, Tween Transitions (Duration-based)

### Community 99 - "dependencies"
Cohesion: 0.33
Nodes (6): dependencies, firebase, motion, react, react-dom, uqr

### Community 100 - "mfa.mjs"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 101 - "Advanced Layout Animations"
Cohesion: 0.40
Nodes (5): Accordion with Layout Animation, Advanced Layout Animations, Expandable Card, Grid to List View Toggle, Masonry Grid with Layout Animation

### Community 102 - "Modal & Dialog Patterns"
Cohesion: 0.40
Nodes (5): Bottom Sheet (Mobile), Confirmation Dialog with Shake, Drawer / Side Panel, Modal & Dialog Patterns, Smooth Modal with Backdrop

### Community 103 - "Loading States"
Cohesion: 0.40
Nodes (5): Content Fade In, Loading States, Progress Bar with Pulse, Skeleton Loading, Spinner with Variants

### Community 104 - "Page Transitions"
Cohesion: 0.40
Nodes (5): Depth Transition (Scale + Blur), Full Page Fade, Page Transitions, Slide Transition, Stack Navigation

### Community 105 - "Animation Props"
Cohesion: 0.40
Nodes (5): animate, Animation Props, exit, initial, style

### Community 106 - "AnimatePresence"
Cohesion: 0.40
Nodes (5): AnimatePresence, Basic Usage, Custom Data, Mode Options, Props

### Community 107 - "Roteiro de apresentação do app"
Cohesion: 0.40
Nodes (4): Antes de cada apresentação, Dicas, O que mostrar, na ordem, Roteiro de apresentação do app

### Community 108 - "acoes.ts"
Cohesion: 0.16
Nodes (25): 09/10/2026 — Segurança, movimento e aba Conta, sairAgora(), DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora() (+17 more)

### Community 110 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 111 - "Navigation Menus"
Cohesion: 0.50
Nodes (4): Animated Dropdown Menu, Mega Menu, Mobile Hamburger Menu, Navigation Menus

### Community 112 - "List Animations"
Cohesion: 0.50
Nodes (4): Animated List with Add/Remove, List Animations, Reorderable List (Drag to Reorder), Staggered Grid

### Community 113 - "Shared Element Transitions"
Cohesion: 0.50
Nodes (4): Card Expansion with Shared Layout, Image Gallery with Shared Layout, Shared Element Transitions, Tab Indicator

### Community 114 - "Complex Gestures"
Cohesion: 0.50
Nodes (4): Complex Gestures, Long Press Gesture, Multi-Direction Swipe Handler, Pinch to Zoom

### Community 115 - "Form Animations"
Cohesion: 0.50
Nodes (4): Floating Label Input, Form Animations, Form Validation with Animation, Multi-Step Form with Progress

### Community 116 - "Variants"
Cohesion: 0.50
Nodes (4): Dynamic Variants, Variant Definition, Variant Propagation, Variants

### Community 117 - "Event Info Types"
Cohesion: 0.50
Nodes (4): Event Info Types, PanInfo (Drag events), Point, TapInfo

### Community 118 - "Layout Props"
Cohesion: 0.50
Nodes (4): layout, Layout Props, layoutDependency, layoutId

### Community 119 - "Botao"
Cohesion: 0.10
Nodes (39): motion, react, Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar() (+31 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "TutorialCoach.tsx"
Cohesion: 0.26
Nodes (17): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+9 more)

### Community 134 - "registrarErro"
Cohesion: 0.13
Nodes (20): react-dom, Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog() (+12 more)

### Community 135 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 136 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`) (+7 more)

### Community 137 - "Tutorial.tsx"
Cohesion: 0.22
Nodes (18): Logo(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+10 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "iaTreino.ts"
Cohesion: 0.06
Nodes (54): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, ROTULO (+46 more)

### Community 141 - "EditarTreino.tsx"
Cohesion: 0.13
Nodes (25): adicionarExercicio(), adicionarMetodo(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+17 more)

### Community 143 - "limparEmuladores"
Cohesion: 0.10
Nodes (16): COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, PNG (+8 more)

### Community 144 - "CampoExercicio"
Cohesion: 0.33
Nodes (5): CampoExercicio(), buscarExercicios(), itens, norm(), nomes()

### Community 145 - "rules.test.ts"
Cohesion: 0.20
Nodes (12): @firebase/rules-unit-testing, ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro (+4 more)

### Community 146 - "lib/acesso.ts"
Cohesion: 0.07
Nodes (49): AvisoReps(), AlertaAbaixo, AlertaAcima, AlertaDemorado, Grupos, Reg, agora, alunos (+41 more)

### Community 147 - "fetch"
Cohesion: 0.22
Nodes (6): Descanso, fetch(), Fixa, nomeDO(), Tipo, ParVapid

### Community 148 - "contato.ts"
Cohesion: 0.31
Nodes (7): Editor(), liberarRelatorio(), recolherRelatorio(), relatorio(), salvarRelatorio(), linkEmail(), linkWhatsApp()

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "vitest"
Cohesion: 0.24
Nodes (5): vitest, seriesDestacadas(), seriesDoRotulo(), arquivos(), RAIZ

### Community 164 - "ref_node_fs"
Cohesion: 0.12
Nodes (8): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, marca

### Community 167 - "App.tsx"
Cohesion: 0.11
Nodes (37): Peças compartilhadas (já no código), App(), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+29 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1184 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `descanso.ts`, `engine/index.ts`, `ataques.test.ts`, `registrarErro`, `Hoje.tsx`, `atualizar.ts`, `planilha.ts`, `cors.ts`, `AvaliacaoCoach.tsx`, `EditarTreino.tsx`, `util.ts`, `iaTreino.ts`, `CampoExercicio`, `rules.test.ts`, `lib/acesso.ts`, `contato.ts`, `Relatorio.tsx`, `Treino.tsx`, `codigoPix`, `jwt.ts`, `ContaAluno.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `CardioHoje.tsx`, `aluno-exemplo.test.ts`, `PainelEvolucao.tsx`, `webpush.ts`, `PagarPix.tsx`, `App.tsx`, `prescreverSessao`, `push.ts`, `src/index.ts`, `package.json`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `Entrar.tsx`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `Feedbacks.tsx`, `Aviso`, `GuiaMetodos.tsx`, `limpeza-lgpd.test.ts`, `treino.test.ts`, `firebase-admin`, `metricas.ts`, `acoes.ts`, `marca.test.ts`, `Botao`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Are the 133 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 133 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06717687074829932 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `engine/index.ts`, `ataques.test.ts`, `registrarErro`, `Hoje.tsx`, `MesosDoAluno.tsx`, `AvaliacaoCoach.tsx`, `EditarTreino.tsx`, `util.ts`, `Alunos.tsx`, `inscreverAvisos`, `pdfRelatorio.ts`, `lib/acesso.ts`, `fetch`, `Treino.tsx`, `contato.ts`, `FimTreino.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `CardioHoje.tsx`, `vitest`, `PainelEvolucao.tsx`, `PagarPix.tsx`, `App.tsx`, `prescreverSessao`, `ImportarPlanilha.tsx`, `src/index.ts`, `push.ts`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `Presencial.tsx`, `Entrar.tsx`, `iaTreino.ts`, `Aviso`, `GuiaMetodos.tsx`, `Inicio.tsx`, `InicioAluno.tsx`, `Coleções Firestore`, `metricas.ts`, `acoes.ts`, `Botao`, `layout.spec.ts`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Lógica da planilha "Força 2027.1" — especificação do motor` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._