# Graph Report - claude-cloud-celli  (2026-11-12)

## Corpus Check
- 360 files · ~374,649 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3438 nodes · 9749 edges · 174 communities (157 shown, 17 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 442 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8a0192c8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- hojeSaoPaulo
- AcaoEmail.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- lib/planilha.test.ts
- InicioAluno.tsx
- EditorMeso.tsx
- env
- seed.ts
- BoasVindas.tsx
- avaliacao.ts
- GuiaFisio.tsx
- util.ts
- layout.spec.ts
- anamnese.ts
- steps
- env
- Segurança — passos do Victor no console
- AlunoApp.tsx
- Avaliacao.tsx
- prints.spec.ts
- segmentos.ts
- dor.ts
- jwt.ts
- Cartao
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- Entrar
- steps
- steps
- settings.json
- Coleções Firestore
- fetch
- aluno-exemplo.mjs
- webpush.ts
- Alunos.tsx
- vitest
- firebase-admin
- lib/fisio.ts
- VozTreino.tsx
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- relatorio.ts
- cartaoRelatorio.ts
- with
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- src/acesso.ts
- compilerOptions
- erros.mjs
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- diaSP
- push.ts
- steps
- anatomia.ts
- descanso.ts
- engine/index.ts
- Motion / Framer Motion Examples
- 5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)
- EnviarFeedback.tsx
- @playwright/test
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- App.tsx
- steps
- App.tsx
- inscreverAvisos
- ui.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- evolucao.test.ts
- importar-meso.mjs
- pdfAvaliacao.ts
- with
- overrides
- icones.tsx
- Físio — articulações e músculos de cada exercício (para o Victor conferir)
- Plano — Sistema Físio (grande atualização, branch separada)
- Performance Optimization
- Força — app de treino (substitui a planilha "Força 2027.1")
- rules.test.ts
- registrarErro
- README.md
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- Firebase — Guia de Setup
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- icones.tsx
- gislane/Logo.tsx
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- Push do descanso (Entrega 3b)
- Presencial.tsx
- alertas.ts
- sair.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- MinhaConta.tsx
- AvaliacaoCoach.tsx
- criarCoach
- saude.yml
- cors.ts
- APK do Força (Android)
- `src/lib/` — Firestore, estado, cálculos com dados
- ref_node_fs
- Pontos sensíveis (leia antes de auditar ou mexer)
- src/ia.ts
- Árvore por pasta
- acoes.ts
- fisio-rules.test.ts
- ContaAluno.tsx
- limpeza
- marca
- notificacoes.spec.ts
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- voz-ia.spec.ts
- with
- FimTreino.tsx
- preparar
- criarMeso
- firebase-admin
- varredura.spec.ts
- evolucao.ts
- aluno-exemplo.test.ts
- prescreverSessao
- anamnese.spec.ts
- marca.test.ts
- cartaoRelatorio.ts
- tutorial.spec.ts
- EnviarAviso.tsx
- semana.test.ts
- limparEmuladores

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 157 edges
2. `Botao()` - 141 edges
3. `Treino()` - 86 edges
4. `react` - 83 edges
5. `vitest` - 78 edges
6. `Cartao()` - 59 edges
7. `Aviso()` - 58 edges
8. ``src/lib/` — Firestore, estado, cálculos com dados` - 58 edges
9. `prescreverSessao()` - 57 edges
10. `firebase` - 55 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `Definições (fonte da verdade do cálculo)` --references--> `metricasExercicio()`  [INFERRED]
  docs/plano-evolucao.md → src/engine/metricas.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- `Contexto` --references--> `polimento()`  [INFERRED]
  docs/plano-fisio.md → src/engine/volume.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx

## Import Cycles
- None detected.

## Communities (174 total, 17 thin omitted)

### Community 0 - "hojeSaoPaulo"
Cohesion: 0.13
Nodes (11): ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, dia(), meso() (+3 more)

### Community 1 - "AcaoEmail.tsx"
Cohesion: 0.12
Nodes (32): Logo(), trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+24 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.07
Nodes (34): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+26 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.12
Nodes (16): 10. Monitoramento, 11. Meta robusta (por métrica: movimentos, carga média, volume) — `AS66:AU66`, 12. Evolução de um exercício — `CG2`, 13. Não portado (de propósito), 1. Configuração do mesociclo, 2. Divisão (quais exercícios em cada treino), 3. Progressão (reps por série), 4. Métodos avançados (`tblLocalMetodosNx`) (+8 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "lib/planilha.test.ts"
Cohesion: 0.08
Nodes (43): ALUNO, COACH, ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado() (+35 more)

### Community 7 - "InicioAluno.tsx"
Cohesion: 0.08
Nodes (70): `src/features/aluno/` — App do aluno, Peças, 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), motion, AvisoReps(), RegistroFlag, Semana(), SemanaCarregada() (+62 more)

### Community 8 - "EditorMeso.tsx"
Cohesion: 0.07
Nodes (50): igual(), Linhas, migrarProgressao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento (+42 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.11
Nodes (20): doAluno(), PARQ_NAO, ALUNO, COACH, ALUNO, COACH, marca, ANAMNESE_MINIMA (+12 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.12
Nodes (39): `src/features/instalar/` — PWA/Android, Peças compartilhadas (já no código), BoasVindas(), CartaoInstalar(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+31 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.10
Nodes (30): AvaliacaoForm, BIO, Ciclo, Destaque, DobraId, DOBRAS, FAIXA, forca() (+22 more)

### Community 13 - "GuiaFisio.tsx"
Cohesion: 0.17
Nodes (18): ALERTA_LOMBAR, ALERTA_TENDAO, AVISO_FISIO, linkPubmed(), MetodoFisio, METODOS_FISIO, Nivel, opcional() (+10 more)

### Community 14 - "util.ts"
Cohesion: 0.20
Nodes (21): Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes(), remover() (+13 more)

### Community 15 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 16 - "anamnese.ts"
Cohesion: 0.08
Nodes (59): `src/lib/` — Firestore, estado, cálculos com dados, AnamneseAluno(), apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler() (+51 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.08
Nodes (23): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+15 more)

### Community 20 - "AlunoApp.tsx"
Cohesion: 0.16
Nodes (22): AlunoApp(), AvisoAtraso(), chave(), jaViu(), Hoje(), Msg(), AvaliacaoPronta(), InicioAluno() (+14 more)

### Community 21 - "Avaliacao.tsx"
Cohesion: 0.23
Nodes (12): AnamnesePendente(), Avaliacao(), Chipe(), COR, GrupoCartao(), SETA_VEREDITO, SetaIc(), IcSeta (+4 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.06
Nodes (22): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC) (+14 more)

### Community 23 - "segmentos.ts"
Cohesion: 0.13
Nodes (19): DESCE, Leitura, PAR_DOBRA, REGIAO, Ocorrencia, cargaPorSegmento(), CargaSegmento, ClasseCarga (+11 more)

### Community 24 - "dor.ts"
Cohesion: 0.17
Nodes (21): `fisioDores/{id automático}` (Etapa 3, 12/11/2026), relatarDor(), chip(), RelatarDor(), ROTULO_LOCAL, vazio(), ArticulacaoId, ALERTA_DOR (+13 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "Cartao"
Cohesion: 0.24
Nodes (20): enviarOrientacao(), marcarDorVista(), recolherOrientacao(), relatarSinalFisio(), responderDor(), ConteudoMetodo(), descreverDor(), FisioAluno() (+12 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.04
Nodes (44): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+36 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.19
Nodes (22): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), caixa(), carregarImagem() (+14 more)

### Community 29 - "Entrar"
Cohesion: 0.12
Nodes (26): deveMostrarBoasVindas(), ler(), Entrar(), enviar(), voltar(), erros, mensagemErro(), SENHA_FRACA (+18 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "Coleções Firestore"
Cohesion: 0.15
Nodes (12): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, Mapa do Código — Força (+4 more)

### Community 34 - "fetch"
Cohesion: 0.23
Nodes (5): CacheAcesso, Descanso, fetch(), Tipo, ParVapid

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.08
Nodes (22): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), [a, m, d], achados, b, db (+14 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "Alunos.tsx"
Cohesion: 0.10
Nodes (38): contaDoDia(), reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar() (+30 more)

### Community 38 - "vitest"
Cohesion: 0.12
Nodes (9): vitest, seriesDestacadas(), seriesDoRotulo(), arquivos(), RAIZ, app, auth, COLECOES (+1 more)

### Community 39 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, app, auth, COLECOES, db, SCRIPTS, atual, novo

### Community 40 - "lib/fisio.ts"
Cohesion: 0.24
Nodes (14): ALERTA_GERAL, COLECAO_FISIO, dataValida(), lerLiberacao(), lerOrientacao(), LiberacaoProfissional, metodoFisio(), metodoLiberavel() (+6 more)

### Community 41 - "VozTreino.tsx"
Cohesion: 0.06
Nodes (57): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+49 more)

### Community 42 - "src/index.ts"
Cohesion: 0.11
Nodes (37): DO_ALUNO, Env, Mensagem, ROBO, TREINO, alvosDe(), Aviso, bytesOk() (+29 more)

### Community 43 - "steps"
Cohesion: 0.06
Nodes (30): description, required, ALUNO, MESO, NOME, SA, if, runs-on (+22 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.09
Nodes (20): name, private, type, version, fundo, @cloudflare/workers-types, firebase-tools, tailwindcss (+12 more)

### Community 46 - "relatorio.ts"
Cohesion: 0.10
Nodes (26): r, precisaAtualizar(), avaliacoesParaFazer(), somarDias(), conquistas(), Evolucao, historicoExercicios(), MesoEvolucao (+18 more)

### Community 47 - "cartaoRelatorio.ts"
Cohesion: 0.23
Nodes (15): dados(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao, dadosCartaoRelatorio(), dataBr(), periodoTexto() (+7 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.18
Nodes (10): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), LGPD, Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas (+2 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (14): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+6 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "erros.mjs"
Cohesion: 0.22
Nodes (7): `avaliacoes/{id automático}`, corte, data(), db, linhas, projeto, PROJETOS

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

### Community 57 - "diaSP"
Cohesion: 0.15
Nodes (18): uqr, Mensalidade(), dataCurta(), PagarPix(), copiar(), PIX, useHoje(), inicioDoDiaSP() (+10 more)

### Community 58 - "push.ts"
Cohesion: 0.22
Nodes (17): agendarPush(), avisosLigados(), b64uParaBytes(), BASE, cancelarPush(), chamar(), chaveVapid(), desinscreverAvisos() (+9 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "anatomia.ts"
Cohesion: 0.15
Nodes (16): Etapa 1 — Base no catálogo (pode começar já), TODAS, Anatomia, anatomiaDo(), ARTICULACOES, articulacoesDo(), DADOS, MusculoId (+8 more)

### Community 61 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.09
Nodes (57): `src/engine/` — Motor de cálculo puro (sem React/Firebase), adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), mudarSeries(), padraoMetodo() (+49 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)"
Cohesion: 0.12
Nodes (16): 1. Sua tarefa, 2. Regras de escopo (valem para o grupo inteiro), 3. Estrutura de dados sugerida para cada método, 4. Regras globais de progressão (aplicar a todos os métodos), 5.1 Coluna lombar — dor lombar crônica inespecífica, 5.2 Ombro — dor relacionada ao manguito rotador / subacromial, 5.3 Joelho, 5.4 Tendões (tendinopatias) (+8 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.09
Nodes (44): Onde mexer para…, Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), useFeedbacks() (+36 more)

### Community 66 - "@playwright/test"
Cohesion: 0.13
Nodes (7): COACH, ALUNO, COACH, NOMES, COACH, COACH, @playwright/test

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

### Community 73 - "App.tsx"
Cohesion: 0.14
Nodes (26): App(), ativaAba(), PerfilDemora(), Principal(), SemAcesso(), Vigia(), PausaSaude(), BotaoSair() (+18 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "App.tsx"
Cohesion: 0.13
Nodes (33): `src/features/coach/` — App do coach, Menu(), abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo (+25 more)

### Community 76 - "inscreverAvisos"
Cohesion: 0.30
Nodes (12): `src/features/conta/` — Minha Conta, AvisoNotificacoes(), permissao(), AvisoDescanso(), Chave(), ChavesAvisos(), NotificacoesCoach(), IcSino (+4 more)

### Community 77 - "ui.tsx"
Cohesion: 0.12
Nodes (18): EvolucaoCoach(), fmt(), agil, confete, elastico, ESPERA_ENTRADA_MS, saida, suave (+10 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.14
Nodes (13): `fisioOrientacoes/{id automático}`, 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026) (+5 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "evolucao.test.ts"
Cohesion: 0.19
Nodes (12): agora, dia(), emSemana(), feito(), linha, m1, meso(), painel() (+4 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "pdfAvaliacao.ts"
Cohesion: 0.15
Nodes (23): LinhaMedida(), carregar(), COR_TOM, corpo(), EntradaPdfAvaliacao, gerarPdfAvaliacao(), seta(), criarFolhas() (+15 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "icones.tsx"
Cohesion: 0.25
Nodes (18): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+10 more)

### Community 86 - "Físio — articulações e músculos de cada exercício (para o Victor conferir)"
Cohesion: 0.13
Nodes (14): Abdome e Lombar, Adutores e Abdutores, Antebraço, Bíceps, Dorsais, Escolhas que eu fiz (confira primeiro), Físio — articulações e músculos de cada exercício (para o Victor conferir), Ombros (+6 more)

### Community 87 - "Plano — Sistema Físio (grande atualização, branch separada)"
Cohesion: 0.13
Nodes (13): 12/11/2026 (noite) — Claude: Etapa 3 e lista geral de perigo, 12/11/2026 — orientação individual dos métodos, Continuidade Físio — Codex / Claude, Critério de pronto e verificação, Critérios do Markdown científico, Decisões desta entrega, Próximas etapas que continuam no plano, Resultados (+5 more)

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "Força — app de treino (substitui a planilha "Força 2027.1")"
Cohesion: 0.20
Nodes (10): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+2 more)

### Community 90 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 91 - "registrarErro"
Cohesion: 0.14
Nodes (20): react-dom, Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog() (+12 more)

### Community 92 - "README.md"
Cohesion: 0.22
Nodes (4): Fases, Força — app de treino, Manutenção, Para desenvolvedores

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

### Community 100 - "Firebase — Guia de Setup"
Cohesion: 0.25
Nodes (8): Firebase — Guia de Setup, O que é e quanto custa, Parte 1 — Criar o projeto (10 min), Parte 2 — Ativar o login por e-mail, Parte 3 — Criar o banco de dados, Parte 4 — Me mandar a configuração, Parte 5 — Virar o coach, Se algo der errado

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

### Community 108 - "icones.tsx"
Cohesion: 0.16
Nodes (22): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+14 more)

### Community 110 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

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
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 120 - "Presencial.tsx"
Cohesion: 0.20
Nodes (20): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), Grupo(), guardarRecente(), lerGrupo() (+12 more)

### Community 121 - "alertas.ts"
Cohesion: 0.07
Nodes (34): Grupos, Reg, agora, alunos, linha, meso, mesos, registros (+26 more)

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (23): ARTE, clarear(), COR_CORPO, corParte(), ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista() (+15 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.17
Nodes (20): 09/10/2026 — Segurança, movimento e aba Conta, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail() (+12 more)

### Community 136 - "AvaliacaoCoach.tsx"
Cohesion: 0.09
Nodes (60): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), firebase, react, Coach(), BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach() (+52 more)

### Community 137 - "criarCoach"
Cohesion: 0.17
Nodes (10): ALUNO, COACH, semear(), ALUNO, COACH, diaISO(), diasAtras(), semear() (+2 more)

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 140 - "APK do Força (Android)"
Cohesion: 0.29
Nodes (7): APK do Força (Android), Atualizações do app, Como gerar, Como mandar para o aluno, O que o workflow faz, Segredo importante, Testar sem ter Android

### Community 141 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.17
Nodes (20): CardioHoje(), dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda() (+12 more)

### Community 142 - "ref_node_fs"
Cohesion: 0.11
Nodes (10): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, marca, CAINDO (+2 more)

### Community 143 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.05
Nodes (81): `notas/{alunoId}`, Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`) (+73 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.16
Nodes (15): AcaoIA, ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, MAX_CORPO_IA, metadados() (+7 more)

### Community 145 - "Árvore por pasta"
Cohesion: 0.12
Nodes (16): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+8 more)

### Community 146 - "acoes.ts"
Cohesion: 0.09
Nodes (35): pedir(), sairAgora(), NovoAluno(), enviar(), DarAcesso(), enviar(), criarAlunoComApp(), criarAlunoPresencial() (+27 more)

### Community 147 - "fisio-rules.test.ts"
Cohesion: 0.33
Nodes (5): @firebase/rules-unit-testing, db(), liberacao, MFA, ref()

### Community 148 - "ContaAluno.tsx"
Cohesion: 0.23
Nodes (15): ContaAluno(), escolherFoto(), desde(), Linha(), Peso(), IcLivro, IcPessoa, IcPrancheta (+7 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "notificacoes.spec.ts"
Cohesion: 0.40
Nodes (3): ALUNO, COACH, CORS

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.15
Nodes (12): `anamneses/{id automático}`, 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento (+4 more)

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

### Community 159 - "FimTreino.tsx"
Cohesion: 0.22
Nodes (12): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, IcCamera, IcSubir (+4 more)

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.10
Nodes (18): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+10 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 164 - "evolucao.ts"
Cohesion: 0.10
Nodes (32): arred(), caminhoCarga(), CargasDoc, deMapa(), docsParaRegistros(), docsParaRegistrosReps(), Linhas, mesoParaDoc() (+24 more)

### Community 165 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 166 - "prescreverSessao"
Cohesion: 0.05
Nodes (57): iniciarEdicao(), SEQUENCIA, base, nomes(), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio() (+49 more)

### Community 167 - "anamnese.spec.ts"
Cohesion: 0.24
Nodes (8): confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder()

### Community 168 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 169 - "cartaoRelatorio.ts"
Cohesion: 0.17
Nodes (16): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), C, H, pngDe() (+8 more)

### Community 170 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 171 - "EnviarAviso.tsx"
Cohesion: 0.83
Nodes (3): EnviarAviso(), enviar(), enviarRecado()

### Community 177 - "limparEmuladores"
Cohesion: 0.18
Nodes (9): ALUNO, COACH, PNG, ALUNO, COACH, iniciarEConcluir(), seg(), semear() (+1 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1336 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `ataques.test.ts`, `Avaliacao.tsx`, `InicioAluno.tsx`, `AvaliacaoCoach.tsx`, `MinhaConta.tsx`, `lib/planilha.test.ts`, `cors.ts`, `avaliacao.ts`, `GuiaFisio.tsx`, `util.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `src/ia.ts`, `anamnese.ts`, `acoes.ts`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `fisio-rules.test.ts`, `segmentos.ts`, `dor.ts`, `jwt.ts`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `Entrar`, `FimTreino.tsx`, `webpush.ts`, `Alunos.tsx`, `prescreverSessao`, `evolucao.ts`, `lib/fisio.ts`, `cartaoRelatorio.ts`, `src/index.ts`, `VozTreino.tsx`, `marca.test.ts`, `package.json`, `relatorio.ts`, `semana.test.ts`, `EditorMeso.tsx`, `src/acesso.ts`, `diaSP`, `push.ts`, `anatomia.ts`, `descanso.ts`, `engine/index.ts`, `aluno-exemplo.test.ts`, `EnviarFeedback.tsx`, `firebase-admin`, `App.tsx`, `ui.tsx`, `evolucao.test.ts`, `rules.test.ts`, `alertas.ts`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Are the 155 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `dados()` and `nadaPassaDaTela()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 155 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `hojeSaoPaulo` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `AcaoEmail.tsx`, `ataques.test.ts`, `lib/planilha.test.ts`, `InicioAluno.tsx`, `EditorMeso.tsx`, `MinhaConta.tsx`, `AvaliacaoCoach.tsx`, `BoasVindas.tsx`, `avaliacao.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `util.ts`, `layout.spec.ts`, `src/ia.ts`, `anamnese.ts`, `acoes.ts`, `AlunoApp.tsx`, `Plano — Entrega 4: registro de erros e segurança`, `Cartao`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `Entrar`, `FimTreino.tsx`, `Coleções Firestore`, `fetch`, `evolucao.ts`, `Alunos.tsx`, `prescreverSessao`, `vitest`, `VozTreino.tsx`, `src/index.ts`, `relatorio.ts`, `cartaoRelatorio.ts`, `src/acesso.ts`, `diaSP`, `push.ts`, `engine/index.ts`, `EnviarFeedback.tsx`, `App.tsx`, `App.tsx`, `inscreverAvisos`, `ui.tsx`, `pdfAvaliacao.ts`, `icones.tsx`, `registrarErro`, `Presencial.tsx`, `alertas.ts`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `AcaoEmail.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12375533428165007 - nodes in this community are weakly interconnected._