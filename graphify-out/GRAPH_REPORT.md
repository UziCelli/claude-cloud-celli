# Graph Report - claude-cloud-celli  (2026-11-09)

## Corpus Check
- 306 files · ~288,375 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2409 nodes · 7273 edges · 145 communities (129 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 329 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6aacf68b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- VozTreino.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- vitest
- Hoje.tsx
- InicioAluno.tsx
- AvaliacaoCoach.tsx
- EditarTreino.tsx
- Cartao
- App.tsx
- cartaoRelatorio.ts
- engine/index.ts
- Alunos.tsx
- Alertas.tsx
- SessaoCard.tsx
- EnviarFeedback.tsx
- Segurança — passos do Victor no console
- Treino.tsx
- ui.tsx
- prints.spec.ts
- ContaAluno.tsx
- Feedbacks.tsx
- jwt.ts
- notasMetodo.ts
- Estado da sessão (retomada) — atualizado em 09/11/2026
- cartaoStory.ts
- acoes.ts
- registrarErro
- Logo
- settings.json
- @playwright/test
- alertas.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- limparEmuladores
- pdfRelatorio.ts
- sessao.ts
- CampoExercicio
- validar.ts
- Msg
- Coleções Firestore
- devDependencies
- Onde fica cada coisa
- evolucao.ts
- firebase-admin
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- metricas.ts
- Plano — App da Gislane (segunda marca)
- treino.test.ts
- package.json
- scripts
- AlunoApp.tsx
- Presencial.tsx
- main.tsx
- sair.spec.ts
- AcaoEmail.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- EditorMeso.tsx
- avaliacao.ts
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- PainelEvolucao.tsx
- fetch
- limpeza-lgpd.test.ts
- criarAluno
- PagarPix.tsx
- relatorio.spec.ts
- CardioHoje.tsx
- codigoPix
- importar-meso.mjs
- criarCoach
- Entrar.tsx
- overrides
- vidro.tsx
- icones.tsx
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- ref_node_fs
- aluno-exemplo.test.ts
- Meso
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
- GuiaMetodos.tsx
- gislane/Logo.tsx
- cartaoDepoimento.ts
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- layout.spec.ts
- TutorialCoach.tsx
- prescreverSessao
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Pontos sensíveis (leia antes de auditar ou mexer)
- seriesDoRotulo
- Árvore por pasta
- Tutorial.tsx
- inatividade.ts
- src/index.ts
- feedback.spec.ts
- Aceite.tsx
- Plano — Entrega 4: registro de erros e segurança
- varredura.spec.ts
- atualizar.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 111 edges
2. `Botao()` - 95 edges
3. `Treino()` - 77 edges
4. `vitest` - 66 edges
5. `react` - 64 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 52 edges
8. `Cartao()` - 48 edges
9. `registrarErro()` - 46 edges
10. `firebase` - 45 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx
- `09/10/2026 — Segurança, movimento e aba Conta` --references--> `MinhaConta()`  [INFERRED]
  docs/estado-sessao.md → src/features/conta/MinhaConta.tsx

## Import Cycles
- None detected.

## Communities (145 total, 16 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (46): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Contrato do Worker (+38 more)

### Community 1 - "VozTreino.tsx"
Cohesion: 0.05
Nodes (73): Registros, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+65 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.06
Nodes (35): @firebase/rules-unit-testing, agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db() (+27 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (42): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+34 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "vitest"
Cohesion: 0.07
Nodes (46): vitest, ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso() (+38 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.17
Nodes (23): `src/lib/` — Firestore, estado, cálculos com dados, AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), IcCadeado, IcRaio, cargaVolta() (+15 more)

### Community 8 - "InicioAluno.tsx"
Cohesion: 0.17
Nodes (23): Hoje(), Msg(), AvaliacaoPronta(), InicioAluno(), Msg(), Quadros(), RelatorioPronto(), Treinos() (+15 more)

### Community 9 - "AvaliacaoCoach.tsx"
Cohesion: 0.13
Nodes (30): AvaliacaoCoach(), Editor(), Faixa, fora(), hoje(), num(), Textos, txt() (+22 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.14
Nodes (26): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+18 more)

### Community 11 - "Cartao"
Cohesion: 0.16
Nodes (28): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+20 more)

### Community 12 - "App.tsx"
Cohesion: 0.14
Nodes (42): react, ativaAba(), Coach(), Menu(), AvaliacoesCoach(), useArquivados(), Feedbacks(), mediaTexto() (+34 more)

### Community 13 - "cartaoRelatorio.ts"
Cohesion: 0.22
Nodes (16): pngDe(), dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num(), periodoTexto(), r (+8 more)

### Community 14 - "engine/index.ts"
Cohesion: 0.20
Nodes (20): ESCOPOS, linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento() (+12 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.17
Nodes (21): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+13 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.10
Nodes (34): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+26 more)

### Community 17 - "SessaoCard.tsx"
Cohesion: 0.23
Nodes (13): Preview(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcCheck, NotasDoc (+5 more)

### Community 18 - "EnviarFeedback.tsx"
Cohesion: 0.16
Nodes (23): chip(), EnviarFeedback(), enviar(), Opcao(), enviarFeedback(), Assunto, ASSUNTOS, CHAVE_CONVITE (+15 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (21): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+13 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.11
Nodes (35): `notas/{alunoId}`, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), Modal(), Nota() (+27 more)

### Community 21 - "ui.tsx"
Cohesion: 0.10
Nodes (28): motion, CONFETE, dur(), FimTreino(), escolher(), Lista(), EvolucaoCoach(), fmt() (+20 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (16): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras() (+8 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.16
Nodes (28): `src/features/aluno/` — App do aluno, AvisoNotificacoes(), permissao(), AvisoDescanso(), Chave(), ContaAluno(), escolherFoto(), sairAgora() (+20 more)

### Community 24 - "Feedbacks.tsx"
Cohesion: 0.18
Nodes (16): Cartao(), Doc, Estrelas(), FILTROS, BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+8 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "notasMetodo.ts"
Cohesion: 0.43
Nodes (4): dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 27 - "Estado da sessão (retomada) — atualizado em 09/11/2026"
Cohesion: 0.06
Nodes (30): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+22 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.24
Nodes (19): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), DadosTreino, desenhar(), desenharTreino(), desenharTreinoFoto() (+11 more)

### Community 29 - "acoes.ts"
Cohesion: 0.11
Nodes (35): firebase, NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso() (+27 more)

### Community 30 - "registrarErro"
Cohesion: 0.16
Nodes (18): Contador, contarDia(), cortar(), empilhar(), enviar(), etapaCarregando(), gravar(), iniciarLog() (+10 more)

### Community 31 - "Logo"
Cohesion: 0.29
Nodes (8): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, Lista(), Politica(), Secao()

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "@playwright/test"
Cohesion: 0.11
Nodes (8): ALUNO, COACH, ALUNO, COACH, marca, CAINDO, COACH, @playwright/test

### Community 34 - "alertas.ts"
Cohesion: 0.10
Nodes (26): Normalização de leitura (`normalizarCargas`), ARQUIVADO_DIAS, arquivadosVencidos(), DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS (+18 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "limparEmuladores"
Cohesion: 0.10
Nodes (14): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, COACH, semear() (+6 more)

### Community 39 - "pdfRelatorio.ts"
Cohesion: 0.22
Nodes (14): EntradaPdfAvaliacao, C, criarFolhas(), disp(), LARG, M, MUDO, PH (+6 more)

### Community 40 - "sessao.ts"
Cohesion: 0.16
Nodes (11): LinhaMetodo, LinhaSalva, TAMANHO, base, ex1(), AplicacaoMetodo, ExercicioPrescrito, Metodo (+3 more)

### Community 41 - "CampoExercicio"
Cohesion: 0.33
Nodes (5): CampoExercicio(), buscarExercicios(), itens, norm(), nomes()

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "Msg"
Cohesion: 0.20
Nodes (20): DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), trocarEmail(), trocarSenha(), alterarEmail() (+12 more)

### Community 44 - "Coleções Firestore"
Cohesion: 0.06
Nodes (29): `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}` (+21 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.19
Nodes (16): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+8 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.06
Nodes (42): arred(), calcular(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao, Feito (+34 more)

### Community 48 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "metricas.ts"
Cohesion: 0.19
Nodes (17): mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+9 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "treino.test.ts"
Cohesion: 0.25
Nodes (5): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), base

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "AlunoApp.tsx"
Cohesion: 0.30
Nodes (9): AlunoApp(), Tutorial(), tutorialNaoVisto(), EvolucaoAluno(), AvisoIOS(), iOS(), standalone(), GuiaMetodos() (+1 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.22
Nodes (20): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+12 more)

### Community 59 - "main.tsx"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 61 - "AcaoEmail.tsx"
Cohesion: 0.19
Nodes (17): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+9 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.25
Nodes (21): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), linhasDoExercicio(), METODOS (+13 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "EditorMeso.tsx"
Cohesion: 0.18
Nodes (14): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas(), estavel() (+6 more)

### Community 65 - "avaliacao.ts"
Cohesion: 0.10
Nodes (43): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Peças, Avaliacao(), BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), gerarPdfAvaliacao(), Avaliacao (+35 more)

### Community 66 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.25
Nodes (7): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

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

### Community 73 - "PainelEvolucao.tsx"
Cohesion: 0.14
Nodes (25): dataCurta(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda(), Titulo(), IcMedalha (+17 more)

### Community 74 - "fetch"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarAluno"
Cohesion: 0.11
Nodes (19): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+11 more)

### Community 77 - "PagarPix.tsx"
Cohesion: 0.31
Nodes (6): uqr, PagarPix(), PIX, reais(), informarPagamento(), qrDataUrl()

### Community 78 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 79 - "CardioHoje.tsx"
Cohesion: 0.30
Nodes (12): Onde mexer para…, CardioHoje(), dataSP(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero() (+4 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "criarCoach"
Cohesion: 0.09
Nodes (18): COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, PNG (+10 more)

### Community 83 - "Entrar.tsx"
Cohesion: 0.19
Nodes (19): Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar() (+11 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "vidro.tsx"
Cohesion: 0.17
Nodes (17): ConviteFeedback(), Faixa(), FaixaFeedback(), Atalho, marcarVisto(), naoVisto(), Onboarding(), Passo (+9 more)

### Community 86 - "icones.tsx"
Cohesion: 0.18
Nodes (10): `src/features/auth/` — Autenticação, BotaoSair(), useSair(), D_ESTRELA, D_SUBIR, D_TROFEU, IcCasa, IcGrupo (+2 more)

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "ref_node_fs"
Cohesion: 0.11
Nodes (9): ALUNO, COACH, marca, arquivos(), RAIZ, app, auth, COLECOES (+1 more)

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 92 - "Meso"
Cohesion: 0.20
Nodes (9): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), Meso (+1 more)

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

### Community 108 - "GuiaMetodos.tsx"
Cohesion: 0.39
Nodes (6): COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop()

### Community 110 - "cartaoDepoimento.ts"
Cohesion: 0.31
Nodes (8): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), H, W, assinaturaMarca()

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

### Community 119 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, Ordem, Peças compartilhadas (já no código), Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "TutorialCoach.tsx"
Cohesion: 0.31
Nodes (15): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+7 more)

### Community 122 - "prescreverSessao"
Cohesion: 0.10
Nodes (27): `registros/{regId}`, 7. Teste de ataques (03/10/2026), nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo() (+19 more)

### Community 134 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.21
Nodes (17): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), PerfilDemora(), Principal(), SemAcesso(), hms(), RelogioTreino(), ConfirmarAluno() (+9 more)

### Community 136 - "Árvore por pasta"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/conta/` — Minha Conta, `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach) (+6 more)

### Community 137 - "Tutorial.tsx"
Cohesion: 0.33
Nodes (13): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+5 more)

### Community 138 - "inatividade.ts"
Cohesion: 0.23
Nodes (13): Vigia(), sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima() (+5 more)

### Community 139 - "src/index.ts"
Cohesion: 0.21
Nodes (8): CacheAcesso, cors(), ORIGENS, Env, Mensagem, MENSALIDADE, TREINO, Aviso

### Community 140 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 141 - "Aceite.tsx"
Cohesion: 0.31
Nodes (10): Aceite(), continuar(), esqueci(), erroSenha(), CaixaAceite(), aceitarPrivacidade(), confirmarSenha(), problemaSenha() (+2 more)

### Community 142 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 145 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 888 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `push.ts`, `VozTreino.tsx`, `ataques.test.ts`, `Hoje.tsx`, `InicioAluno.tsx`, `AvaliacaoCoach.tsx`, `EditarTreino.tsx`, `src/index.ts`, `inatividade.ts`, `cartaoRelatorio.ts`, `engine/index.ts`, `seriesDoRotulo`, `Alertas.tsx`, `atualizar.ts`, `EnviarFeedback.tsx`, `Aceite.tsx`, `Treino.tsx`, `ui.tsx`, `SessaoCard.tsx`, `jwt.ts`, `notasMetodo.ts`, `Estado da sessão (retomada) — atualizado em 09/11/2026`, `cartaoStory.ts`, `acoes.ts`, `registrarErro`, `alertas.ts`, `webpush.ts`, `sessao.ts`, `CampoExercicio`, `validar.ts`, `Msg`, `Onde fica cada coisa`, `evolucao.ts`, `firebase-admin`, `src/acesso.ts`, `metricas.ts`, `treino.test.ts`, `package.json`, `TabMetodos.tsx`, `avaliacao.ts`, `limpeza-lgpd.test.ts`, `PagarPix.tsx`, `CardioHoje.tsx`, `codigoPix`, `Entrar.tsx`, `ref_node_fs`, `aluno-exemplo.test.ts`, `Meso`, `cartaoDepoimento.ts`, `prescreverSessao`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Are the 110 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 110 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `push.ts`, `VozTreino.tsx`, `vitest`, `Hoje.tsx`, `InicioAluno.tsx`, `AvaliacaoCoach.tsx`, `EditarTreino.tsx`, `inatividade.ts`, `App.tsx`, `Aceite.tsx`, `seriesDoRotulo`, `Alunos.tsx`, `SessaoCard.tsx`, `Treino.tsx`, `ui.tsx`, `ContaAluno.tsx`, `Feedbacks.tsx`, `Estado da sessão (retomada) — atualizado em 09/11/2026`, `cartaoStory.ts`, `acoes.ts`, `registrarErro`, `alertas.ts`, `pdfRelatorio.ts`, `Msg`, `Coleções Firestore`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `AlunoApp.tsx`, `Presencial.tsx`, `AcaoEmail.tsx`, `TabMetodos.tsx`, `EditorMeso.tsx`, `PainelEvolucao.tsx`, `PagarPix.tsx`, `CardioHoje.tsx`, `vidro.tsx`, `GuiaMetodos.tsx`, `prescreverSessao`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `VozTreino.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05388151174668029 - nodes in this community are weakly interconnected._