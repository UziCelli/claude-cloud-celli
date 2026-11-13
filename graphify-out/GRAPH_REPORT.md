# Graph Report - claude-cloud-celli  (2026-11-13)

## Corpus Check
- 408 files · ~387,347 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3679 nodes · 10580 edges · 185 communities (168 shown, 17 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 466 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `11348d22`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- criarCoach
- react
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- lib/planilha.test.ts
- Hoje.tsx
- engine/index.ts
- env
- seed.ts
- BoasVindas.tsx
- prescreverSessao
- TabMetodos.tsx
- util.ts
- engine/index.ts
- `src/lib/` — Firestore, estado, cálculos com dados
- steps
- env
- Segurança — passos do Victor no console
- alertas.ts
- Presencial.tsx
- prints.spec.ts
- lados.ts
- FimTreino.tsx
- jwt.ts
- vitest
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- Entrar.tsx
- steps
- steps
- settings.json
- firebase-admin
- segmentos.ts
- aluno-exemplo.mjs
- webpush.ts
- Botao
- ref_node_fs
- firebase-admin
- Treino.tsx
- VozTreino.tsx
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- acoes.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- evolucao.ts
- with
- iaTreino.ts
- src/acesso.ts
- compilerOptions
- conversores.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- sugestoesFisio.ts
- push.ts
- steps
- acoesFisio.ts
- SessaoCard.tsx
- pix.ts
- Motion / Framer Motion Examples
- ContaAluno.tsx
- EnviarFeedback.tsx
- dor.ts
- compilerOptions
- package.json
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- GuiaFisio.tsx
- steps
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- EditorMeso.tsx
- PagarPix.tsx
- push.yml
- Descanso
- importar-meso.mjs
- Onde fica cada coisa
- with
- overrides
- TutorialCoach.tsx
- relatorio.spec.ts
- layout.spec.ts
- Performance Optimization
- avisos-pagamento.mjs
- rules.test.ts
- Feedbacks.tsx
- progressaoFisio.ts
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- descanso.ts
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- firebase-admin
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
- MesosDoAluno.tsx
- AlunoApp.tsx
- conversores.test.ts
- anamnese.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- corpoPaths.ts
- MinhaConta.tsx
- norm
- avaliacao.ts
- saude.yml
- src/index.ts
- icones.tsx
- Plano — Entrega 4: registro de erros e segurança
- @playwright/test
- 12/11/2026 — orientação individual dos métodos
- src/ia.ts
- Árvore por pasta
- PainelEvolucao.tsx
- 5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)
- Entrar.tsx
- limpeza
- marca
- sugestao.test.ts
- env
- Coleções Firestore
- steps
- pdfAvaliacao.ts
- limpeza-lgpd.yml
- criarCoach
- with
- lados.ts
- preparar
- criarRegistro
- firebase-admin
- feedback.spec.ts
- Físio — articulações e músculos de cada exercício (para o Victor conferir)
- aluno-exemplo.test.ts
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- Pesquisa — Delimitação de volume adequado, lesão e dor (o que a literatura diz)
- anatomia.ts
- progressao.test.ts
- GraficoVolume.tsx
- lib/ia.ts
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- Tutorial.tsx
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- notasMetodo.ts
- vite.config.ts
- Push do descanso (Entrega 3b)
- limpeza-lgpd.mjs
- Reconhecedor
- seriesDoRotulo
- ehRecorde
- Falso
- AGENTS.md
- registrarErro

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 158 edges
2. `Botao()` - 145 edges
3. `Treino()` - 102 edges
4. `react` - 92 edges
5. `vitest` - 85 edges
6. ``src/lib/` — Firestore, estado, cálculos com dados` - 65 edges
7. `prescreverSessao()` - 64 edges
8. `firebase` - 63 edges
9. `useLista()` - 61 edges
10. `Aviso()` - 61 edges

## Surprising Connections (you probably didn't know these)
- `5. Cronômetro de descanso que chama a pessoa de volta` --references--> `useDescanso()`  [INFERRED]
  docs/plano-entrega3.md → src/lib/descanso.ts
- `Divisão (agentes Sonnet; nunca dois no mesmo arquivo)` --references--> `useDescanso()`  [INFERRED]
  docs/plano-entrega3.md → src/lib/descanso.ts
- `Como funciona` --references--> `useDescanso()`  [INFERRED]
  docs/push.md → src/lib/descanso.ts
- `Regras gerais` --references--> `evolucaoExercicio()`  [INFERRED]
  docs/plano-evolucao.md → src/engine/metricas.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts

## Import Cycles
- 2-file cycle: `src/lib/avaliacao.ts -> src/lib/segmentos.ts -> src/lib/avaliacao.ts`

## Communities (185 total, 17 thin omitted)

### Community 0 - "criarCoach"
Cohesion: 0.29
Nodes (5): ALUNO, COACH, iniciarEConcluir(), seg(), semear()

### Community 1 - "react"
Cohesion: 0.09
Nodes (60): firebase, react, ALERTA_GERAL, RegistroDocCompleto, enviarOrientacao(), marcarDorVista(), recolherOrientacao(), responderDor() (+52 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.13
Nodes (15): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+7 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (43): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+35 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "lib/planilha.test.ts"
Cohesion: 0.08
Nodes (41): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaAntigaFalsa() (+33 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.21
Nodes (23): AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), diaCurto(), quando(), IcCadeado (+15 more)

### Community 8 - "engine/index.ts"
Cohesion: 0.12
Nodes (39): isometrico(), linhaIsometrica(), progressaoIsometrica(), linhaPrescrita(), AlvoVolume, ajustarSeries(), analisarProgressao(), aplicar() (+31 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.07
Nodes (24): doAluno(), PARQ_NAO, ALUNO, COACH, ALUNO, COACH, CORS, ALUNO (+16 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (28): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+20 more)

### Community 12 - "prescreverSessao"
Cohesion: 0.10
Nodes (30): Para o Codex continuar (entrega B — isometria), nomes(), LIMITE_ISOMETRIA_S, nomes, NOMES_ISOMETRICOS, normalizar(), prancha, evolucaoExercicio() (+22 more)

### Community 13 - "TabMetodos.tsx"
Cohesion: 0.15
Nodes (35): `src/engine/` — Motor de cálculo puro (sem React/Firebase), COR_METODO, METODOS, ORDEM, padraoMetodo(), serieDoDrop(), assinatura(), emGrupo() (+27 more)

### Community 14 - "util.ts"
Cohesion: 0.20
Nodes (22): Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarLados(), mudarPausa(), TrocasEAdicoes() (+14 more)

### Community 15 - "engine/index.ts"
Cohesion: 0.13
Nodes (28): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+20 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.07
Nodes (61): `src/lib/` — Firestore, estado, cálculos com dados, copiar(), AnamneseAluno(), apagar(), Caixa(), Campo(), Conteudo(), enviar() (+53 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.08
Nodes (23): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+15 more)

### Community 20 - "alertas.ts"
Cohesion: 0.13
Nodes (22): Proposta em 3 passos (do mais seguro ao maior), ARQUIVADO_DIAS, chaveAlerta, DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS (+14 more)

### Community 21 - "Presencial.tsx"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (13): ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES, PROIBIDO, registros() (+5 more)

### Community 23 - "lados.ts"
Cohesion: 0.11
Nodes (19): 13/11/2026 — Carga por lado (entrega A) e próximo: isometria (entrega B), Ajuste por exercício no meso, Entrega B — decisões e histórico (Codex, 13/11/2026), Estado (13/11/2026), Fase 1 — Catálogo (só dados), Fase 2 — Carga por lado, Fase 3 — Isometria, Ficam SEM marca (um halter só, ou um lado de cada vez) (+11 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.19
Nodes (14): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, ConviteFeedback(), IcCamera (+6 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): deb64u(), abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims (+13 more)

### Community 26 - "vitest"
Cohesion: 0.07
Nodes (21): Critério do Victor (13/11/2026): progressão demasiada × dor, 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), vitest, mediana(), metaCiclo(), metaRobusta(), divisao, meso (+13 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (43): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+35 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.11
Nodes (35): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, dados(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, clicar(), ajustar() (+27 more)

### Community 29 - "Entrar.tsx"
Cohesion: 0.11
Nodes (30): Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar() (+22 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "firebase-admin"
Cohesion: 0.15
Nodes (5): SCRIPTS, app, auth, COLECOES, db

### Community 34 - "segmentos.ts"
Cohesion: 0.12
Nodes (22): DESCE, fmtDelta(), fmtNum(), Leitura, PAR_DOBRA, REGIAO, Ocorrencia, cargaPorSegmento() (+14 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.06
Nodes (27): Decisões suas antes de começar, Físio — proposta A1: cruzar o treino real com as sugestões, O que a pesquisa de volume muda (`docs/fisio-pesquisa-volume.md`, 13/11/2026), O que mudaria para você (em linguagem simples), O que o app continua NÃO fazendo, 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet) (+19 more)

### Community 36 - "webpush.ts"
Cohesion: 0.15
Nodes (18): RFC-8188, RFC-8292, b64u(), juntar(), assinar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "Botao"
Cohesion: 0.07
Nodes (59): Peso(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), comparar() (+51 more)

### Community 38 - "ref_node_fs"
Cohesion: 0.09
Nodes (10): ALUNO, COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH (+2 more)

### Community 39 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 40 - "Treino.tsx"
Cohesion: 0.12
Nodes (34): metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), NotaMetodos(), Novidades() (+26 more)

### Community 41 - "VozTreino.tsx"
Cohesion: 0.14
Nodes (22): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+14 more)

### Community 42 - "src/index.ts"
Cohesion: 0.14
Nodes (27): fetch(), recado(), PROJETOS, Aviso, bytesOk(), endpointOk(), Fixa, hostOk() (+19 more)

### Community 43 - "steps"
Cohesion: 0.06
Nodes (30): description, required, ALUNO, MESO, NOME, SA, if, runs-on (+22 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "acoes.ts"
Cohesion: 0.12
Nodes (24): `fisioOrientacoes/{id automático}`, LGPD, sairAgora(), confirmar(), enviar(), Aceite(), aceitar(), CaixaAceite() (+16 more)

### Community 46 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.13
Nodes (36): Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, App(), ativaAba(), Coach(), Menu(), PerfilDemora(), pedir() (+28 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.06
Nodes (54): Aba, ABAS, freq(), MEDALHA, RankingAlunos(), arred(), calcular(), cargasPositivas() (+46 more)

### Community 48 - "with"
Cohesion: 0.07
Nodes (31): if, runs-on, steps, if, runs-on, steps, jobs, app (+23 more)

### Community 49 - "iaTreino.ts"
Cohesion: 0.14
Nodes (20): corpoPedido(), descreverAcao(), doCatalogo, ExercicioProposto, FERRAMENTA, inteiroOpc(), inteiros(), lerResposta() (+12 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.17
Nodes (16): acessoComCache(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), quemAvisaCoach() (+8 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "conversores.ts"
Cohesion: 0.13
Nodes (24): mk(), dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda() (+16 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "steps"
Cohesion: 0.07
Nodes (26): if, runs-on, steps, description, required, description, required, EMAIL_ATUAL (+18 more)

### Community 55 - "steps"
Cohesion: 0.08
Nodes (27): concurrency, cancel-in-progress, group, if, runs-on, steps, SA, if (+19 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "sugestoesFisio.ts"
Cohesion: 0.14
Nodes (22): Checkin, diaDe(), Entrada, ev(), Gatilho, gatilhosConversar(), gatilhosPolimento(), gatilhosProgressao() (+14 more)

### Community 58 - "push.ts"
Cohesion: 0.15
Nodes (24): enviar(), agendarPush(), AVISOS_ALUNO, AVISOS_COACH, avisosLigados(), b64uParaBytes(), BASE, cabecalhosPush() (+16 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "acoesFisio.ts"
Cohesion: 0.25
Nodes (15): checkinJaExiste(), registrarCheckin(), CheckinFim(), chip(), Estado, CampoCheckin, CheckinForm, checkinValido() (+7 more)

### Community 61 - "SessaoCard.tsx"
Cohesion: 0.19
Nodes (20): `notas/{alunoId}`, Nota(), BotaoLadosDiferentes(), CampoLados(), fmt(), LoadInput(), Chips(), CORES (+12 more)

### Community 62 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "ContaAluno.tsx"
Cohesion: 0.21
Nodes (20): AvisoNotificacoes(), permissao(), AvisoDescanso(), ContaAluno(), escolherFoto(), desde(), Linha(), Chave() (+12 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.09
Nodes (40): Onde mexer para…, DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), Cartao(), chip() (+32 more)

### Community 66 - "dor.ts"
Cohesion: 0.17
Nodes (21): `fisioDores/{id automático}` (Etapa 3, 12/11/2026), relatarDor(), chip(), RelatarDor(), ROTULO_LOCAL, vazio(), IcFisio, ALERTA_DOR (+13 more)

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "package.json"
Cohesion: 0.10
Nodes (25): devDependencies, @cloudflare/workers-types@^5.20260930.2, firebase-tools@^15.33.0, @playwright/test@^1.63.0, tailwindcss@^4.3.3, @types/react@^19.0.0, @types/react-dom@^19.0.0, typescript@^5.9.3 (+17 more)

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

### Community 73 - "GuiaFisio.tsx"
Cohesion: 0.12
Nodes (23): ALERTA_LOMBAR, ALERTA_TENDAO, AVISO_FISIO, linkPubmed(), MetodoFisio, METODOS_FISIO, Nivel, opcional() (+15 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "Alertas.tsx"
Cohesion: 0.06
Nodes (66): `src/features/coach/` — App do coach, useHoje(), abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), linkBtn (+58 more)

### Community 76 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.17
Nodes (11): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+3 more)

### Community 77 - "EditorMeso.tsx"
Cohesion: 0.12
Nodes (27): slotsDaSessao(), aplicarSugestao(), Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar() (+19 more)

### Community 78 - "PagarPix.tsx"
Cohesion: 0.16
Nodes (14): Mensalidade(), contaDoDia(), dataCurta(), PagarPix(), PIX, reais(), Chip(), ComAtraso() (+6 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "Descanso"
Cohesion: 0.15
Nodes (6): Descanso, alvosDe(), comAparelho(), inicioDoDiaBrasilia(), nomeDO(), semAparelho()

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "Onde fica cada coisa"
Cohesion: 0.18
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "TutorialCoach.tsx"
Cohesion: 0.26
Nodes (17): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+9 more)

### Community 86 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 87 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 90 - "rules.test.ts"
Cohesion: 0.18
Nodes (13): @firebase/rules-unit-testing@^5.0.2, @firebase/rules-unit-testing, ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator() (+5 more)

### Community 91 - "Feedbacks.tsx"
Cohesion: 0.33
Nodes (9): Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), useFeedbacks(), IcEstrela(), filtrar() (+1 more)

### Community 92 - "progressaoFisio.ts"
Cohesion: 0.09
Nodes (26): 10. Monitoramento, Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, cargaMax(), DIF_REPS, proporcao() (+18 more)

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
Cohesion: 0.25
Nodes (8): dependencies, firebase@^12.19.0, motion@^13.4.6, react@^19.3.0, react-dom@^19.3.0, uqr@^0.1.3, react-dom, uqr

### Community 100 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

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

### Community 108 - "firebase-admin"
Cohesion: 0.15
Nodes (9): firebase-admin@14.5.0, firebase-admin, atual, novo, corte, db, linhas, projeto (+1 more)

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

### Community 119 - "MesosDoAluno.tsx"
Cohesion: 0.23
Nodes (23): CartaoAgora(), CartaoMeso(), CartaoProximo(), ConfirmarExclusao(), excluir(), dataBr(), FormDuplicar(), confirmar() (+15 more)

### Community 120 - "AlunoApp.tsx"
Cohesion: 0.20
Nodes (14): AvisoAtraso(), chave(), jaViu(), Hoje(), Msg(), dataSP(), DIAS_CURTO, mesoAtual() (+6 more)

### Community 121 - "conversores.test.ts"
Cohesion: 0.22
Nodes (8): Entregas, arred(), caminhoCarga(), docParaReps, normalizarCargas(), meso, temArrayDeArray(), sessoesPorExercicio()

### Community 122 - "anamnese.spec.ts"
Cohesion: 0.21
Nodes (9): ANTIGA(), confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo() (+1 more)

### Community 134 - "corpoPaths.ts"
Cohesion: 0.11
Nodes (21): ARTE, clarear(), COR_CORPO, ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista(), Parte (+13 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.20
Nodes (18): DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail(), trocarSenha() (+10 more)

### Community 136 - "norm"
Cohesion: 0.30
Nodes (8): SeletorExercicios(), POR_NOME, buscarExercicios(), itens, norm(), nomes(), MAX_EXERCICIOS, padrao

### Community 137 - "avaliacao.ts"
Cohesion: 0.05
Nodes (91): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Peças, BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa (+83 more)

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 139 - "src/index.ts"
Cohesion: 0.17
Nodes (12): CacheAcesso, cors(), ORIGENS, AcaoIA, ROTAS_IA, DESCANSO, DO_ALUNO, Env (+4 more)

### Community 140 - "icones.tsx"
Cohesion: 0.21
Nodes (24): `src/features/aluno/` — App do aluno, Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), jaViuPopup(), marcarPopup(), Msg() (+16 more)

### Community 141 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 142 - "@playwright/test"
Cohesion: 0.07
Nodes (18): ALUNO, COACH, NOMES, ALUNO, COACH, marca, ALUNO, COACH (+10 more)

### Community 143 - "12/11/2026 — orientação individual dos métodos"
Cohesion: 0.12
Nodes (15): 12/11/2026 (noite) — Claude: Etapa 3 e lista geral de perigo, 12/11/2026 — orientação individual dos métodos, 13/11/2026 (madrugada) — Claude: rodada 4 (pedido do Victor antes de dormir), 13/11/2026 (manhã) — Claude: correções da revisão do PR (F1–F8), Continuidade Físio — Codex / Claude, Critério de pronto e verificação, Critérios do Markdown científico, Decisões desta entrega (+7 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.19
Nodes (14): appCheckOk(), ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, MAX_CORPO_IA, metadados() (+6 more)

### Community 145 - "Árvore por pasta"
Cohesion: 0.09
Nodes (20): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026) (+12 more)

### Community 146 - "PainelEvolucao.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

### Community 147 - "5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)"
Cohesion: 0.12
Nodes (16): 1. Sua tarefa, 2. Regras de escopo (valem para o grupo inteiro), 3. Estrutura de dados sugerida para cada método, 4. Regras globais de progressão (aplicar a todos os métodos), 5.1 Coluna lombar — dor lombar crônica inespecífica, 5.2 Ombro — dor relacionada ao manguito rotador / subacromial, 5.3 Joelho, 5.4 Tendões (tendinopatias) (+8 more)

### Community 148 - "Entrar.tsx"
Cohesion: 0.10
Nodes (36): Logo(), trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+28 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "sugestao.test.ts"
Cohesion: 0.15
Nodes (16): ANTAGONISTAS, Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano, pontos() (+8 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Coleções Firestore"
Cohesion: 0.12
Nodes (16): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}` (+8 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "pdfAvaliacao.ts"
Cohesion: 0.09
Nodes (42): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), corParte() (+34 more)

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 157 - "criarCoach"
Cohesion: 0.09
Nodes (23): COACH, ALUNO, COACH, ALUNO, COACH, PNG, COACH, ALUNO (+15 more)

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "lados.ts"
Cohesion: 0.36
Nodes (6): arred(), CelulaLados, ids, ladosDiferentes(), lerCelula(), totalLados()

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarRegistro"
Cohesion: 0.09
Nodes (18): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), ALUNO (+10 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 163 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 164 - "Físio — articulações e músculos de cada exercício (para o Victor conferir)"
Cohesion: 0.13
Nodes (14): Abdome e Lombar, Adutores e Abdutores, Antebraço, Bíceps, Dorsais, Escolhas que eu fiz (confira primeiro), Físio — articulações e músculos de cada exercício (para o Victor conferir), Ombros (+6 more)

### Community 165 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 166 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.22
Nodes (8): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, v2 (10/11/2026): tela do aluno resumida, cores de evolução e leitura medida x dobra

### Community 167 - "Pesquisa — Delimitação de volume adequado, lesão e dor (o que a literatura diz)"
Cohesion: 0.13
Nodes (14): 0. Conclusão central (ler primeiro), 1. Como o volume é medido, 2. Faixas de volume da literatura (população saudável), 3.1 Epidemiologia na musculação, 3.2 Razão carga aguda:crônica (ACWR), 3.3 Aumento semana a semana ("regra dos 10%"), 3.4 Retorno após pausa, 3.5 Deload (+6 more)

### Community 168 - "anatomia.ts"
Cohesion: 0.24
Nodes (10): Etapa 1 — Base no catálogo (pode começar já), Anatomia, anatomiaDo(), ArticulacaoId, ARTICULACOES, articulacoesDo(), DADOS, MusculoId (+2 more)

### Community 169 - "progressao.test.ts"
Cohesion: 0.33
Nodes (7): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas()

### Community 170 - "GraficoVolume.tsx"
Cohesion: 0.33
Nodes (8): AnaliseProgressao, fmt(), FORMA, GraficoVolume(), M, passoBonito(), RITMO, sinal()

### Community 171 - "lib/ia.ts"
Cohesion: 0.28
Nodes (8): remover(), appCheck, apagarChaveIA(), BASE, chamar(), MetadadosIA, useChaveIA(), Proposta

### Community 172 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 173 - "Tutorial.tsx"
Cohesion: 0.16
Nodes (22): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+14 more)

### Community 174 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.25
Nodes (7): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 175 - "notasMetodo.ts"
Cohesion: 0.43
Nodes (4): dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 176 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite@^4.3.3, vite-plugin-pwa@^1.3.0, @tailwindcss/vite, vite-plugin-pwa, arquivos(), previewHeaders, TIPOS, versao

### Community 177 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 178 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 187 - "registrarErro"
Cohesion: 0.13
Nodes (22): motion, cancelarTreino(), auth, Contador, contarDia(), cortar(), empilhar(), enviar() (+14 more)

## Knowledge Gaps
- **4 isolated node(s):** `RFC-8188`, `RFC-8292`, `RFC-8291`, `RFC-8291`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1411 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `react`, `ataques.test.ts`, `corpoPaths.ts`, `MinhaConta.tsx`, `engine/index.ts`, `avaliacao.ts`, `norm`, `src/index.ts`, `prescreverSessao`, `TabMetodos.tsx`, `util.ts`, `engine/index.ts`, `src/ia.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `PainelEvolucao.tsx`, `Árvore por pasta`, `alertas.ts`, `prints.spec.ts`, `sugestao.test.ts`, `FimTreino.tsx`, `jwt.ts`, `cartaoStory.ts`, `Entrar.tsx`, `lados.ts`, `lib/planilha.test.ts`, `firebase-admin`, `segmentos.ts`, `webpush.ts`, `Botao`, `aluno-exemplo.test.ts`, `firebase-admin`, `anatomia.ts`, `progressao.test.ts`, `src/index.ts`, `acoes.ts`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `evolucao.ts`, `notasMetodo.ts`, `iaTreino.ts`, `src/acesso.ts`, `seriesDoRotulo`, `ehRecorde`, `sugestoesFisio.ts`, `push.ts`, `registrarErro`, `acoesFisio.ts`, `SessaoCard.tsx`, `pix.ts`, `EnviarFeedback.tsx`, `dor.ts`, `package.json`, `GuiaFisio.tsx`, `Alertas.tsx`, `EditorMeso.tsx`, `PagarPix.tsx`, `Onde fica cada coisa`, `avisos-pagamento.mjs`, `rules.test.ts`, `progressaoFisio.ts`, `descanso.ts`, `marca.test.ts`, `AlunoApp.tsx`, `conversores.test.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Are the 156 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `dados()` and `nadaPassaDaTela()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 156 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RFC-8188`, `RFC-8292`, `RFC-8291` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.09292854498333951 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `react`, `lib/planilha.test.ts`, `Hoje.tsx`, `engine/index.ts`, `MinhaConta.tsx`, `avaliacao.ts`, `prescreverSessao`, `TabMetodos.tsx`, `@playwright/test`, `engine/index.ts`, `src/ia.ts`, `icones.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `util.ts`, `Entrar.tsx`, `Presencial.tsx`, `PainelEvolucao.tsx`, `Árvore por pasta`, `FimTreino.tsx`, `Coleções Firestore`, `vitest`, `pdfAvaliacao.ts`, `cartaoStory.ts`, `Entrar.tsx`, `lados.ts`, `Botao`, `Treino.tsx`, `src/index.ts`, `acoes.ts`, `evolucao.ts`, `iaTreino.ts`, `src/acesso.ts`, `conversores.ts`, `seriesDoRotulo`, `ehRecorde`, `push.ts`, `registrarErro`, `SessaoCard.tsx`, `pix.ts`, `ContaAluno.tsx`, `Alertas.tsx`, `EditorMeso.tsx`, `PagarPix.tsx`, `Descanso`, `Onde fica cada coisa`, `TutorialCoach.tsx`, `layout.spec.ts`, `avisos-pagamento.mjs`, `MesosDoAluno.tsx`, `AlunoApp.tsx`, `conversores.test.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._