# Graph Report - claude-cloud-celli  (2026-11-04)

## Corpus Check
- 274 files · ~255,999 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2137 nodes · 6125 edges · 138 communities (123 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 265 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `78cbca74`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- Tutorial.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- ImportarPlanilha.tsx
- PainelEvolucao.tsx
- Inicio.tsx
- InicioAluno.tsx
- engine/index.ts
- BoasVindas.tsx
- App.tsx
- TutorialCoach.tsx
- ui.tsx
- Alunos.tsx
- CardioHoje.tsx
- criarMeso
- acoes.ts
- prescreverSessao
- Pontos sensíveis (leia antes de auditar ou mexer)
- alertas.ts
- prints.spec.ts
- Botao
- criarCoach
- jwt.ts
- avisos-pagamento.mjs
- Estado da sessão (retomada) — atualizado em 13/10/2026
- evolucao.ts
- conversores.ts
- Alertas.tsx
- atualizar.ts
- settings.json
- coach.spec.ts
- ranking.spec.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- Entrar.tsx
- cartaoStory.ts
- Segurança — passos do Victor no console
- Coleções Firestore
- validar.ts
- TabMetodos.tsx
- EditorMeso.tsx
- devDependencies
- normalizarCargas
- registrarErro
- vigia.test.ts
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- Hoje.tsx
- Plano — App da Gislane (segunda marca)
- @playwright/test
- package.json
- scripts
- inatividade.ts
- Presencial.tsx
- vitest
- CampoExercicio.tsx
- AcaoEmail.tsx
- aluno-exemplo.test.ts
- Motion / Framer Motion Examples
- AlunoApp.tsx
- Plano — Entrega 4: registro de erros e segurança
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- src/index.ts
- MinhaConta.tsx
- limpeza-lgpd.test.ts
- criarAluno
- fetch
- metricas.ts
- Árvore por pasta
- codigoPix
- importar-meso.mjs
- fotoTreino.spec.ts
- descanso.ts
- overrides
- varredura.spec.ts
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- Árvore por pasta
- aluno-exemplo.test.ts
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- firebase-admin
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- layout.spec.ts
- gislane/Logo.tsx
- sair.spec.ts
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- Push do descanso (Entrega 3b)
- inscreverAvisos
- firebase.ts
- EditorMeso.tsx
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Notificações: mensalidade e treino pronto (13/10/2026)
- marca.test.ts
- seriesDoRotulo
- Treino.tsx

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 90 edges
2. `Botao()` - 83 edges
3. `Treino()` - 75 edges
4. `vitest` - 59 edges
5. `prescreverSessao()` - 57 edges
6. `react` - 56 edges
7. `Meso` - 47 edges
8. `Cartao()` - 46 edges
9. `registrarErro()` - 41 edges
10. `firebase` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- `09/10/2026 — Segurança, movimento e aba Conta` --references--> `MinhaConta()`  [INFERRED]
  docs/estado-sessao.md → src/features/conta/MinhaConta.tsx

## Import Cycles
- None detected.

## Communities (138 total, 15 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.19
Nodes (19): agendarPush(), avisarTreinoPronto(), avisosLigados(), b64uParaBytes(), BASE, cabecalhosPush(), cancelarPush(), chamar() (+11 more)

### Community 1 - "Tutorial.tsx"
Cohesion: 0.31
Nodes (15): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+7 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.06
Nodes (35): @firebase/rules-unit-testing, agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db() (+27 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (43): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+35 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "ImportarPlanilha.tsx"
Cohesion: 0.09
Nodes (32): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+24 more)

### Community 7 - "PainelEvolucao.tsx"
Cohesion: 0.29
Nodes (11): BotaoPdf(), RelatorioDoc, Editor(), RelatorioCoach(), liberarRelatorio(), recolherRelatorio(), relatorio(), salvarRelatorio() (+3 more)

### Community 8 - "Inicio.tsx"
Cohesion: 0.31
Nodes (6): motion, react-dom, App(), carregar(), Features, montar()

### Community 9 - "InicioAluno.tsx"
Cohesion: 0.19
Nodes (18): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+10 more)

### Community 10 - "engine/index.ts"
Cohesion: 0.11
Nodes (32): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+24 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.24
Nodes (17): `src/features/instalar/` — PWA/Android, copiarLink(), eAndroid(), eIOS(), EventoInstalar, IconeCompartilhar(), Instalar(), jaInstalado() (+9 more)

### Community 12 - "App.tsx"
Cohesion: 0.16
Nodes (21): firebase, PIX, Inicio(), saudacao(), faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado() (+13 more)

### Community 13 - "TutorialCoach.tsx"
Cohesion: 0.13
Nodes (20): Peças, historicoExercicios(), MesoEvolucao, recordesDe(), treinosFeitos(), arred(), cicloTerminou(), diasDesdeFim() (+12 more)

### Community 14 - "ui.tsx"
Cohesion: 0.31
Nodes (11): linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica(), reduzirVolume(), tempoPorSemana() (+3 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.15
Nodes (26): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+18 more)

### Community 16 - "CardioHoje.tsx"
Cohesion: 0.15
Nodes (25): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+17 more)

### Community 17 - "criarMeso"
Cohesion: 0.11
Nodes (20): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), ALUNO (+12 more)

### Community 18 - "acoes.ts"
Cohesion: 0.18
Nodes (27): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+19 more)

### Community 19 - "prescreverSessao"
Cohesion: 0.15
Nodes (14): nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO, base (+6 more)

### Community 20 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.13
Nodes (24): Pontos sensíveis (leia antes de auditar ou mexer), AvisoAdaptado(), FestaRecorde(), hms(), RelogioTreino(), Treino(), FaixaAjustado(), IcReiniciar (+16 more)

### Community 21 - "alertas.ts"
Cohesion: 0.14
Nodes (13): agora, alunos, linha, meso, mesos, registros, CargasDoc, deMapa() (+5 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (14): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+6 more)

### Community 23 - "Botao"
Cohesion: 0.15
Nodes (20): Avatar(), iniciais(), Chave(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde() (+12 more)

### Community 24 - "criarCoach"
Cohesion: 0.11
Nodes (15): ALUNO, COACH, ALUNO, COACH, PNG, COACH, ALUNO, COACH (+7 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "avisos-pagamento.mjs"
Cohesion: 0.47
Nodes (3): mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 27 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.08
Nodes (23): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 09/10/2026 (noite) — Animações e calendário automático (+15 more)

### Community 28 - "evolucao.ts"
Cohesion: 0.15
Nodes (24): arred(), calcular(), cargasPositivas(), coletar(), conquistas(), diaInicio(), Evolucao, Feito (+16 more)

### Community 29 - "conversores.ts"
Cohesion: 0.18
Nodes (13): painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1, meso() (+5 more)

### Community 30 - "Alertas.tsx"
Cohesion: 0.13
Nodes (35): Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto, VisaoSemana(), dataCurta() (+27 more)

### Community 31 - "atualizar.ts"
Cohesion: 0.16
Nodes (22): C, H, W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), num(), periodoTexto() (+14 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "coach.spec.ts"
Cohesion: 0.22
Nodes (6): ALUNO, COACH, NOMES, ALUNO, COACH, lerDoc()

### Community 34 - "ranking.spec.ts"
Cohesion: 0.20
Nodes (9): caminhoCarga(), docParaReps, docsParaRegistros(), docsParaRegistrosReps(), lerPc(), numeroOk(), seriesDe(), meso (+1 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.17
Nodes (13): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+5 more)

### Community 38 - "Entrar.tsx"
Cohesion: 0.16
Nodes (16): Convenção de gravação (TOTAL), Novidades(), fmt(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard() (+8 more)

### Community 39 - "cartaoStory.ts"
Cohesion: 0.16
Nodes (25): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), caixa(), carregarImagem() (+17 more)

### Community 40 - "Segurança — passos do Victor no console"
Cohesion: 0.11
Nodes (15): vitest, igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+7 more)

### Community 41 - "Coleções Firestore"
Cohesion: 0.05
Nodes (41): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `mesos/{mesoId}` (+33 more)

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "TabMetodos.tsx"
Cohesion: 0.22
Nodes (12): Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasPontuais(), copiarTreino() (+4 more)

### Community 44 - "EditorMeso.tsx"
Cohesion: 0.22
Nodes (14): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setFrequencia(), setSemanas() (+6 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "normalizarCargas"
Cohesion: 0.17
Nodes (20): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+12 more)

### Community 47 - "registrarErro"
Cohesion: 0.14
Nodes (24): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), Contador (+16 more)

### Community 48 - "vigia.test.ts"
Cohesion: 0.15
Nodes (5): SCRIPTS, app, auth, COLECOES, db

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "Hoje.tsx"
Cohesion: 0.06
Nodes (79): Onde mexer para…, `src/features/aluno/` — App do aluno, `src/lib/` — Firestore, estado, cálculos com dados, CardioHoje(), AvisoReps(), Hoje(), Msg(), RegistroFlag (+71 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "@playwright/test"
Cohesion: 0.12
Nodes (8): ALUNO, COACH, ALUNO, COACH, marca, CAINDO, COACH, @playwright/test

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "inatividade.ts"
Cohesion: 0.15
Nodes (25): Linha(), BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+17 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.16
Nodes (27): `src/features/auth/` — Autenticação, ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso(), Vigia() (+19 more)

### Community 59 - "vitest"
Cohesion: 0.14
Nodes (7): ALUNO, marca, ALUNO, COACH, marca, arquivos(), RAIZ

### Community 60 - "CampoExercicio.tsx"
Cohesion: 0.43
Nodes (4): buscarExercicios(), itens, norm(), nomes()

### Community 61 - "AcaoEmail.tsx"
Cohesion: 0.12
Nodes (30): Logo(), Peso(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+22 more)

### Community 62 - "aluno-exemplo.test.ts"
Cohesion: 0.18
Nodes (13): ESCOPOS, padraoMetodo(), CampoNum(), FiltroSelect(), LinhaMetodo(), METODOS, padrao(), Selecao() (+5 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "AlunoApp.tsx"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 65 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

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

### Community 73 - "src/index.ts"
Cohesion: 0.21
Nodes (8): CacheAcesso, cors(), ORIGENS, Env, Mensagem, MENSALIDADE, TREINO, Aviso

### Community 74 - "MinhaConta.tsx"
Cohesion: 0.07
Nodes (54): uqr, Entrar(), enviar(), voltar(), erros, mensagemErro(), SENHA_FRACA, DuasEtapas() (+46 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarAluno"
Cohesion: 0.24
Nodes (13): `src/` — Raiz, Peças compartilhadas (já no código), AlunoApp(), Tutorial(), tutorialNaoVisto(), AvisoIOS(), iOS(), standalone() (+5 more)

### Community 77 - "fetch"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 78 - "metricas.ts"
Cohesion: 0.18
Nodes (18): `src/engine/` — Motor de cálculo puro (sem React/Firebase), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana() (+10 more)

### Community 79 - "Árvore por pasta"
Cohesion: 0.23
Nodes (13): react, Preview(), AjustarVolume(), aplicar(), fmt(), num(), Previa, resumo() (+5 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "fotoTreino.spec.ts"
Cohesion: 0.21
Nodes (13): CONFETE, dur(), FimTreino(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+5 more)

### Community 83 - "descanso.ts"
Cohesion: 0.23
Nodes (12): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), Oscs (+4 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "Árvore por pasta"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/conta/` — Minha Conta, `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach) (+6 more)

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 92 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

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

### Community 100 - "firebase-admin"
Cohesion: 0.20
Nodes (7): firebase-admin, atual, novo, acao, email, projeto, PROJETOS

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

### Community 108 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 110 - "sair.spec.ts"
Cohesion: 0.14
Nodes (8): ALUNO, COACH, iniciarEConcluir(), seg(), semear(), ALUNO, COACH, criarAluno()

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

### Community 119 - "Push do descanso (Entrega 3b)"
Cohesion: 0.29
Nodes (6): Como funciona, Limites do plano grátis (Cloudflare), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 120 - "inscreverAvisos"
Cohesion: 0.57
Nodes (6): AvisoNotificacoes(), permissao(), AvisoDescanso(), IcSino, avisosCoachLigados(), inscreverAvisos()

### Community 121 - "firebase.ts"
Cohesion: 0.40
Nodes (5): app, appCheck, auth, authCadastro(), protegerApp()

### Community 122 - "EditorMeso.tsx"
Cohesion: 0.14
Nodes (19): ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano (+11 more)

### Community 134 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

### Community 135 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 137 - "Treino.tsx"
Cohesion: 0.18
Nodes (15): `notas/{alunoId}`, COR_METODO, metodoDoRotulo(), METODOS, ORDEM, CONFETE, ExplicacaoMetodo(), Modal() (+7 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 833 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `Segurança — passos do Victor no console` to `push.ts`, `ataques.test.ts`, `ImportarPlanilha.tsx`, `PainelEvolucao.tsx`, `marca.test.ts`, `seriesDoRotulo`, `engine/index.ts`, `Treino.tsx`, `App.tsx`, `TutorialCoach.tsx`, `ui.tsx`, `prescreverSessao`, `alertas.ts`, `Botao`, `jwt.ts`, `avisos-pagamento.mjs`, `Estado da sessão (retomada) — atualizado em 13/10/2026`, `conversores.ts`, `atualizar.ts`, `ranking.spec.ts`, `webpush.ts`, `Entrar.tsx`, `cartaoStory.ts`, `validar.ts`, `TabMetodos.tsx`, `normalizarCargas`, `registrarErro`, `vigia.test.ts`, `src/acesso.ts`, `Hoje.tsx`, `package.json`, `vitest`, `CampoExercicio.tsx`, `src/index.ts`, `MinhaConta.tsx`, `limpeza-lgpd.test.ts`, `metricas.ts`, `codigoPix`, `descanso.ts`, `aluno-exemplo.test.ts`, `EditorMeso.tsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Are the 89 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 89 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Árvore por pasta` to `Tutorial.tsx`, `PainelEvolucao.tsx`, `Inicio.tsx`, `Treino.tsx`, `InicioAluno.tsx`, `engine/index.ts`, `App.tsx`, `BoasVindas.tsx`, `Alunos.tsx`, `CardioHoje.tsx`, `acoes.ts`, `Botao`, `Alertas.tsx`, `atualizar.ts`, `Entrar.tsx`, `Segurança — passos do Victor no console`, `TabMetodos.tsx`, `EditorMeso.tsx`, `registrarErro`, `Hoje.tsx`, `package.json`, `inatividade.ts`, `Presencial.tsx`, `CampoExercicio.tsx`, `AcaoEmail.tsx`, `aluno-exemplo.test.ts`, `MinhaConta.tsx`, `criarAluno`, `fotoTreino.spec.ts`, `descanso.ts`, `inscreverAvisos`, `EditorMeso.tsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Lógica da planilha "Força 2027.1" — especificação do motor` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._