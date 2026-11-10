# Graph Report - claude-cloud-celli  (2026-11-10)

## Corpus Check
- 309 files · ~296,329 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2944 nodes · 7960 edges · 161 communities (145 shown, 16 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 343 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2a5fd88a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cartaoStory.ts
- VozTreino.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- Hoje.tsx
- ContaAluno.tsx
- App.tsx
- @playwright/test
- Entrar.tsx
- react
- alertas.ts
- AvaliacaoAluno.tsx
- Alunos.tsx
- sugestao.test.ts
- BoasVindas.tsx
- MesosDoAluno.tsx
- acoes.ts
- Treino.tsx
- ui.tsx
- prints.spec.ts
- codigoPix
- limparEmuladores
- jwt.ts
- AvaliacaoCoach.tsx
- sugestao.ts
- lib/acesso.ts
- Feedbacks.tsx
- `src/lib/` — Firestore, estado, cálculos com dados
- engine/index.ts
- settings.json
- importar.spec.ts
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- icones.tsx
- evolucao.test.ts
- prescreverSessao
- criarAluno
- validar.ts
- GuiaMetodos.tsx
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- Presencial.tsx
- Botao
- Árvore por pasta
- metricas.ts
- src/acesso.ts
- compilerOptions
- vite.config.ts
- Plano — App da Gislane (segunda marca)
- criarMeso
- package.json
- scripts
- AlunoApp.tsx
- importar.spec.ts
- conta.spec.ts
- sair.spec.ts
- Entrar.tsx
- inatividade.ts
- Motion / Framer Motion Examples
- App.tsx
- Plano — Entrega 4: registro de erros e segurança
- @playwright/test
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- CardioHoje.tsx
- aluno-exemplo.test.ts
- limpeza-lgpd.test.ts
- criarAluno
- Descanso
- engine/planilha.test.ts
- progressao.test.ts
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- importar-meso.mjs
- InicioAluno.tsx
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- overrides
- firebase-admin
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- Push do descanso (Entrega 3b)
- Coleções Firestore
- fmtMin
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
- atualizar.ts
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- Nota
- cardio.spec.ts
- qrDataUrl
- seriesDoRotulo
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- log.ts
- erros.mjs
- Árvore por pasta
- Tutorial.tsx
- saude.yml
- cors.ts
- AssistenteIA.tsx
- engine/index.ts
- montarPdf
- criarCoach
- Mapa do Código — Força
- rules.test.ts
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- fetch
- Modelo de dados
- limpeza
- marca
- cartaoDepoimento.ts
- env
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- varredura.spec.ts
- with
- preparar
- avisos-pagamento.mjs
- vfit/Logo.tsx

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 119 edges
2. `Botao()` - 98 edges
3. `Treino()` - 78 edges
4. `react` - 66 edges
5. `vitest` - 66 edges
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
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx

## Import Cycles
- None detected.

## Communities (161 total, 16 thin omitted)

### Community 0 - "cartaoStory.ts"
Cohesion: 0.06
Nodes (50): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+42 more)

### Community 1 - "VozTreino.tsx"
Cohesion: 0.05
Nodes (69): Registros, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+61 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.13
Nodes (15): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+7 more)

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
Cohesion: 0.09
Nodes (32): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+24 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.13
Nodes (30): AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), dataSP() (+22 more)

### Community 8 - "ContaAluno.tsx"
Cohesion: 0.11
Nodes (30): `src/features/aluno/` — App do aluno, `src/features/conta/` — Minha Conta, uqr, AvisoDescanso(), ContaAluno(), escolherFoto(), desde(), Mensalidade() (+22 more)

### Community 9 - "App.tsx"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "@playwright/test"
Cohesion: 0.10
Nodes (11): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, CORS (+3 more)

### Community 11 - "Entrar.tsx"
Cohesion: 0.13
Nodes (31): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+23 more)

### Community 12 - "react"
Cohesion: 0.12
Nodes (50): firebase, react, AvaliacaoCoach(), AvaliacoesCoach(), useAvaliacoesDoAluno(), Inicio(), saudacao(), Aba (+42 more)

### Community 13 - "alertas.ts"
Cohesion: 0.16
Nodes (21): fmt(), dadosCartaoRelatorio(), periodoTexto(), volumeTexto(), criarFolhas(), disp(), LARG, M (+13 more)

### Community 14 - "AvaliacaoAluno.tsx"
Cohesion: 0.29
Nodes (16): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Avaliacao(), BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), EntradaPdfAvaliacao, gerarPdfAvaliacao(), dataBR() (+8 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.15
Nodes (25): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+17 more)

### Community 16 - "sugestao.test.ts"
Cohesion: 0.13
Nodes (11): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), L, mesoCom(), nomes(), NOVE (+3 more)

### Community 17 - "BoasVindas.tsx"
Cohesion: 0.05
Nodes (43): concurrency, needs, runs-on, steps, strategy, group, BACKUP_SENHA, EVENTO (+35 more)

### Community 18 - "MesosDoAluno.tsx"
Cohesion: 0.05
Nodes (40): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+32 more)

### Community 19 - "acoes.ts"
Cohesion: 0.09
Nodes (21): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+13 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.08
Nodes (49): `notas/{alunoId}`, Pontos sensíveis (leia antes de auditar ou mexer), metodoDoRotulo(), metodosDaSessao(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde() (+41 more)

### Community 21 - "ui.tsx"
Cohesion: 0.10
Nodes (31): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas(), estavel() (+23 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 24 - "limparEmuladores"
Cohesion: 0.16
Nodes (17): CONFETE, dur(), FimTreino(), escolher(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo() (+9 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): deb64u(), abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims (+14 more)

### Community 26 - "AvaliacaoCoach.tsx"
Cohesion: 0.23
Nodes (13): Editor(), Faixa, fora(), hoje(), num(), Textos, txt(), apagarAvaliacao() (+5 more)

### Community 27 - "sugestao.ts"
Cohesion: 0.07
Nodes (29): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+21 more)

### Community 28 - "lib/acesso.ts"
Cohesion: 0.16
Nodes (27): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), desenhar(), desenharTreino(), desenharTreinoFoto(), fundoELogo() (+19 more)

### Community 29 - "Feedbacks.tsx"
Cohesion: 0.25
Nodes (14): Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), useFeedbacks(), IcEstrela() (+6 more)

### Community 30 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "engine/index.ts"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "importar.spec.ts"
Cohesion: 0.11
Nodes (10): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, marca, lerDoc() (+2 more)

### Community 34 - "conversores.ts"
Cohesion: 0.10
Nodes (26): arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps, docsParaRegistros(), docsParaRegistrosReps() (+18 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.15
Nodes (18): RFC-8188, RFC-8292, b64u(), juntar(), assinar(), criptografar(), Efemera, enviarPush() (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "icones.tsx"
Cohesion: 0.13
Nodes (20): Avaliacao, AvaliacaoForm, BIO, Ciclo, cicloDaAvaliacao(), DOBRAS, FAIXA, Ids (+12 more)

### Community 39 - "evolucao.test.ts"
Cohesion: 0.19
Nodes (12): agora, dia(), emSemana(), feito(), linha, m1, meso(), painel() (+4 more)

### Community 40 - "prescreverSessao"
Cohesion: 0.09
Nodes (39): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+31 more)

### Community 41 - "criarAluno"
Cohesion: 0.22
Nodes (6): ALUNO, COACH, iniciarEConcluir(), seg(), semear(), criarAluno()

### Community 42 - "validar.ts"
Cohesion: 0.12
Nodes (29): DO_ALUNO, Env, Mensagem, ROBO, TREINO, Aviso, bytesOk(), hostOk() (+21 more)

### Community 43 - "GuiaMetodos.tsx"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.20
Nodes (9): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam (+1 more)

### Community 45 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 46 - "Presencial.tsx"
Cohesion: 0.19
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 47 - "Botao"
Cohesion: 0.15
Nodes (29): `src/lib/` — Firestore, estado, cálculos com dados, diaSP(), corteAvaliacoes(), arred(), calcular(), cargasPositivas(), coletar(), comparacaoToneladas() (+21 more)

### Community 48 - "Árvore por pasta"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "metricas.ts"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (14): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+6 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "criarMeso"
Cohesion: 0.08
Nodes (25): runs-on, steps, description, required, description, required, EMAIL_ATUAL, EMAIL_NOVO (+17 more)

### Community 55 - "package.json"
Cohesion: 0.09
Nodes (25): concurrency, cancel-in-progress, group, runs-on, steps, SA, runs-on, steps (+17 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "AlunoApp.tsx"
Cohesion: 0.15
Nodes (22): motion, AlunoApp(), Tutorial(), tutorialNaoVisto(), AvisoIOS(), iOS(), standalone(), Atalho (+14 more)

### Community 58 - "importar.spec.ts"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 59 - "conta.spec.ts"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.05
Nodes (63): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+55 more)

### Community 62 - "inatividade.ts"
Cohesion: 0.11
Nodes (43): `src/engine/` — Motor de cálculo puro (sem React/Firebase), COR_METODO, METODOS, ORDEM, adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), padraoMetodo() (+35 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "App.tsx"
Cohesion: 0.20
Nodes (19): App(), Coach(), PerfilDemora(), Principal(), SemAcesso(), Vigia(), BotaoSair(), useSair() (+11 more)

### Community 65 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.15
Nodes (25): chip(), EnviarFeedback(), enviar(), Opcao(), enviarFeedback(), assinaturaMarca(), Assunto, ASSUNTOS (+17 more)

### Community 66 - "@playwright/test"
Cohesion: 0.25
Nodes (7): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "vite.config.ts"
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

### Community 73 - "CardioHoje.tsx"
Cohesion: 0.33
Nodes (11): Onde mexer para…, CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio() (+3 more)

### Community 74 - "aluno-exemplo.test.ts"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarAluno"
Cohesion: 0.11
Nodes (14): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, ALUNO (+6 more)

### Community 77 - "Descanso"
Cohesion: 0.05
Nodes (62): `src/features/coach/` — App do coach, ativaAba(), Menu(), abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo() (+54 more)

### Community 78 - "engine/planilha.test.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 79 - "progressao.test.ts"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.25
Nodes (7): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), LGPD, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "InicioAluno.tsx"
Cohesion: 0.25
Nodes (19): Peças compartilhadas (já no código), Linha(), AvaliacaoPronta(), InicioAluno(), Msg(), Quadros(), RelatorioPronto(), fmtData() (+11 more)

### Community 83 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 86 - "erros.mjs"
Cohesion: 0.11
Nodes (24): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), avaliacoesParaFazer(), Evolucao, historicoExercicios(), MesoEvolucao (+16 more)

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "Push do descanso (Entrega 3b)"
Cohesion: 0.11
Nodes (9): ALUNO, COACH, marca, arquivos(), RAIZ, app, auth, COLECOES (+1 more)

### Community 91 - "Coleções Firestore"
Cohesion: 0.29
Nodes (7): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, `relatorios/{mesoId}`

### Community 92 - "fmtMin"
Cohesion: 0.12
Nodes (20): `registros/{regId}`, 7. Teste de ataques (03/10/2026), vitest, mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media() (+12 more)

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
Cohesion: 0.11
Nodes (40): AvisoNotificacoes(), permissao(), trocarSenha(), EsqueciSenha(), enviar(), mensagemRecuperar(), ChavesAvisos(), DuasEtapas() (+32 more)

### Community 110 - "atualizar.ts"
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

### Community 119 - "Nota"
Cohesion: 0.14
Nodes (38): Peso(), EnviarAviso(), NovoAluno(), enviar(), ImportarPlanilha(), escolher(), importar(), trocarAba() (+30 more)

### Community 120 - "cardio.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "qrDataUrl"
Cohesion: 0.26
Nodes (17): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+9 more)

### Community 122 - "seriesDoRotulo"
Cohesion: 0.25
Nodes (10): aplicar(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), NotasDoc, acimaDoLimite() (+2 more)

### Community 134 - "log.ts"
Cohesion: 0.10
Nodes (20): react-dom, auth, Contador, contarDia(), cortar(), empilhar(), enviar(), gravar() (+12 more)

### Community 135 - "erros.mjs"
Cohesion: 0.29
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 136 - "Árvore por pasta"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach) (+6 more)

### Community 137 - "Tutorial.tsx"
Cohesion: 0.26
Nodes (16): Logo(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+8 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "AssistenteIA.tsx"
Cohesion: 0.44
Nodes (8): AssistenteIA(), remover(), salvar(), apagarChaveIA(), chaveMascarada(), chaveValida(), refChave(), salvarChaveIA()

### Community 141 - "engine/index.ts"
Cohesion: 0.12
Nodes (25): ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo(), semGruposSozinhos(), SEQUENCIA (+17 more)

### Community 142 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 143 - "criarCoach"
Cohesion: 0.09
Nodes (21): COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, diasAtras() (+13 more)

### Community 144 - "Mapa do Código — Força"
Cohesion: 0.50
Nodes (3): Comandos e workflows, Mapa do Código — Força, Rotas do app

### Community 145 - "rules.test.ts"
Cohesion: 0.20
Nodes (12): @firebase/rules-unit-testing, ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro (+4 more)

### Community 146 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.20
Nodes (9): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026), Respostas do Victor (+1 more)

### Community 147 - "fetch"
Cohesion: 0.23
Nodes (7): Contrato novo do Worker, CacheAcesso, Descanso, fetch(), recado(), Inscricao, Tipo

### Community 148 - "Modelo de dados"
Cohesion: 0.50
Nodes (4): `avaliacoes/{id automático}`, Modelo de dados, dobras(), data()

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "cartaoDepoimento.ts"
Cohesion: 0.25
Nodes (9): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), C, H, W (+1 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

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

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 162 - "avisos-pagamento.mjs"
Cohesion: 0.23
Nodes (13): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+5 more)

### Community 163 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1175 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `fmtMin` to `cartaoStory.ts`, `VozTreino.tsx`, `ataques.test.ts`, `log.ts`, `Hoje.tsx`, `ContaAluno.tsx`, `planilha.ts`, `cors.ts`, `engine/index.ts`, `montarPdf`, `sugestao.test.ts`, `rules.test.ts`, `Treino.tsx`, `ui.tsx`, `cartaoDepoimento.ts`, `limparEmuladores`, `jwt.ts`, `AvaliacaoCoach.tsx`, `codigoPix`, `lib/acesso.ts`, `conversores.ts`, `avisos-pagamento.mjs`, `webpush.ts`, `icones.tsx`, `evolucao.test.ts`, `prescreverSessao`, `validar.ts`, `package.json`, `Presencial.tsx`, `src/acesso.ts`, `Entrar.tsx`, `inatividade.ts`, `Plano — Entrega 4: registro de erros e segurança`, `CardioHoje.tsx`, `limpeza-lgpd.test.ts`, `Descanso`, `firebase-admin`, `erros.mjs`, `Push do descanso (Entrega 3b)`, `atualizar.ts`, `seriesDoRotulo`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Are the 118 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 118 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cartaoStory.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05928614640048397 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Treino.tsx` to `cartaoStory.ts`, `VozTreino.tsx`, `Hoje.tsx`, `ContaAluno.tsx`, `react`, `engine/index.ts`, `alertas.ts`, `Alunos.tsx`, `Mapa do Código — Força`, `montarPdf`, `fetch`, `ui.tsx`, `limparEmuladores`, `AvaliacaoCoach.tsx`, `lib/acesso.ts`, `conversores.ts`, `avisos-pagamento.mjs`, `webpush.ts`, `icones.tsx`, `prescreverSessao`, `validar.ts`, `Presencial.tsx`, `Botao`, `src/acesso.ts`, `AlunoApp.tsx`, `importar.spec.ts`, `Entrar.tsx`, `inatividade.ts`, `App.tsx`, `CardioHoje.tsx`, `Descanso`, `fmtMin`, `acoes.ts`, `Nota`, `cardio.spec.ts`, `seriesDoRotulo`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `VozTreino.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.053194333066025126 - nodes in this community are weakly interconnected._