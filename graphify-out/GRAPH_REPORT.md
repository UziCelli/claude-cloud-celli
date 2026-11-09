# Graph Report - claude-cloud-celli  (2026-11-09)

## Corpus Check
- 314 files · ~277,329 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2851 nodes · 7525 edges · 162 communities (144 shown, 18 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 297 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8cb09e78`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- VozTreino.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- Hoje.tsx
- icones.tsx
- env
- EditarTreino.tsx
- BoasVindas.tsx
- react
- cartaoRelatorio.ts
- engine/index.ts
- Alunos.tsx
- alertas.ts
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- fmt
- prints.spec.ts
- InicioAluno.tsx
- FimTreino.tsx
- jwt.ts
- notasMetodo.ts
- Estado da sessão (retomada) — atualizado em 08/11/2026
- cartaoStory.ts
- lib/acesso.ts
- steps
- steps
- settings.json
- ref_node_fs
- Pontos sensíveis (leia antes de auditar ou mexer)
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- limparEmuladores
- TabDivisao.tsx
- prescreverSessao
- iaTreino.ts
- validar.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- pesoCorporal.ts
- evolucao.ts
- with
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- metricas.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- AlunoApp.tsx
- Presencial.tsx
- steps
- sair.spec.ts
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- ui.tsx
- Feedbacks.tsx
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- acoes.ts
- steps
- limpeza-lgpd.test.ts
- hojeSaoPaulo
- Alertas.tsx
- relatorio.spec.ts
- push.yml
- codigoPix
- importar-meso.mjs
- @playwright/test
- with
- overrides
- vidro.tsx
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- vigia.test.ts
- aluno-exemplo.test.ts
- vitest
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
- IconeMetodo
- gislane/Logo.tsx
- marcas_vfit_marca
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
- SessaoCard.tsx
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- App.tsx
- seriesDoRotulo
- Árvore por pasta
- Tutorial.tsx
- saude.yml
- src/index.ts
- AssistenteIA.tsx
- pdfRelatorio.ts
- Plano — Entrega 4: registro de erros e segurança
- criarCoach
- voz-ia.spec.ts
- rules.test.ts
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- Descanso
- `src/features/coach/` — App do coach
- limpeza
- marca
- cartaoDepoimento.ts
- env
- TabDivisao
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- varredura.spec.ts
- with
- coach.spec.ts
- preparar
- Reconhecedor

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 106 edges
2. `Botao()` - 94 edges
3. `Treino()` - 78 edges
4. `vitest` - 66 edges
5. `react` - 64 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 50 edges
8. `Cartao()` - 49 edges
9. `registrarErro()` - 46 edges
10. `Msg()` - 43 edges

## Surprising Connections (you probably didn't know these)
- `Decisões` --references--> `avisarCoach()`  [INFERRED]
  docs/plano-notificacoes.md → src/lib/push.ts
- ``src/features/conta/` — Minha Conta` --references--> `Chave()`  [INFERRED]
  docs/mapa.md → src/features/conta/ChavesAvisos.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Testes` --references--> `cargaAnterior()`  [INFERRED]
  docs/peso-corporal.md → src/lib/treino.ts
- `Entregas` --references--> `normalizarCargas()`  [INFERRED]
  docs/estado-sessao.md → src/lib/conversores.ts

## Import Cycles
- None detected.

## Communities (162 total, 18 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (58): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+50 more)

### Community 1 - "VozTreino.tsx"
Cohesion: 0.13
Nodes (24): aplicarAcoes(), ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar() (+16 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.09
Nodes (24): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+16 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (43): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+35 more)

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
Cohesion: 0.13
Nodes (32): `src/features/aluno/` — App do aluno, `src/lib/` — Firestore, estado, cálculos com dados, AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), dataSP() (+24 more)

### Community 8 - "icones.tsx"
Cohesion: 0.14
Nodes (21): AvisoNotificacoes(), permissao(), ContaAluno(), escolherFoto(), trocarSenha(), desde(), Linha(), IcBalao (+13 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.13
Nodes (27): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+19 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.17
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "react"
Cohesion: 0.10
Nodes (47): react, Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto, VisaoSemana() (+39 more)

### Community 13 - "cartaoRelatorio.ts"
Cohesion: 0.21
Nodes (16): C, H, W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num() (+8 more)

### Community 14 - "engine/index.ts"
Cohesion: 0.19
Nodes (20): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+12 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.09
Nodes (40): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+32 more)

### Community 16 - "alertas.ts"
Cohesion: 0.08
Nodes (33): AlertaAbaixo, AlertaAcima, AlertaDemorado, Grupos, agora, alunos, linha, meso (+25 more)

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
Cohesion: 0.10
Nodes (39): `notas/{alunoId}`, COR_METODO, metodoDoRotulo(), METODOS, ORDEM, AvisoAdaptado(), CONFETE, ExplicacaoMetodo() (+31 more)

### Community 21 - "fmt"
Cohesion: 0.70
Nodes (3): EvolucaoCoach(), fmt(), Barra()

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (11): ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES, PROIBIDO, registros() (+3 more)

### Community 23 - "InicioAluno.tsx"
Cohesion: 0.17
Nodes (19): Mensalidade(), InicioAluno(), Msg(), PixPerto(), Quadros(), RelatorioPronto(), dataCurta(), PagarPix() (+11 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.21
Nodes (13): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, ConviteFeedback(), IcCamera (+5 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "notasMetodo.ts"
Cohesion: 0.43
Nodes (4): dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 27 - "Estado da sessão (retomada) — atualizado em 08/11/2026"
Cohesion: 0.07
Nodes (27): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+19 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.23
Nodes (19): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), DadosCartao, desenhar(), desenharTreino(), desenharTreinoFoto() (+11 more)

### Community 29 - "lib/acesso.ts"
Cohesion: 0.16
Nodes (19): diaSP(), diasParaVencer(), faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento(), vencePerto() (+11 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "ref_node_fs"
Cohesion: 0.10
Nodes (12): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, ALUNO (+4 more)

### Community 34 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.16
Nodes (21): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps (+13 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.13
Nodes (16): ALUNO, COACH, ALUNO, COACH, marca, criarAluno(), criarAlunoAguardando(), criarAlunoArquivado() (+8 more)

### Community 38 - "limparEmuladores"
Cohesion: 0.14
Nodes (11): COACH, ALUNO, meso(), prog, COACH, ALUNO, COACH, semear() (+3 more)

### Community 39 - "TabDivisao.tsx"
Cohesion: 0.26
Nodes (16): Registros, Slot, Seletor(), TrocasEAdicoes(), remover(), salvar(), agruparTrocas(), aplicarAdicao() (+8 more)

### Community 40 - "prescreverSessao"
Cohesion: 0.09
Nodes (26): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+18 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.21
Nodes (15): acharPosicao(), corpoPedido(), doCatalogo, ExercicioProposto, FERRAMENTA, lerResposta(), listaAtual(), MAX_POR_TREINO (+7 more)

### Community 42 - "validar.ts"
Cohesion: 0.19
Nodes (21): podeAvisarTreino(), fetch(), Aviso, bytesOk(), hostOk(), HOSTS, nomeCoaches(), nomeDO() (+13 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, @cloudflare/workers-types@^5.20260930.2, @firebase/rules-unit-testing@^5.0.2, firebase-tools@^15.33.0, @playwright/test@^1.63.0, tailwindcss@^4.3.3, @types/react@^19.0.0, @types/react-dom@^19.0.0 (+15 more)

### Community 46 - "pesoCorporal.ts"
Cohesion: 0.18
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.06
Nodes (63): Peças, arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+55 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.21
Nodes (13): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), quemAvisaCoach() (+5 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "metricas.ts"
Cohesion: 0.27
Nodes (13): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, evolucaoExercicio(), media(), metricasExercicio(), metricasSemana() (+5 more)

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

### Community 57 - "AlunoApp.tsx"
Cohesion: 0.22
Nodes (12): AlunoApp(), Tutorial(), tutorialNaoVisto(), EvolucaoAluno(), AvisoIOS(), iOS(), standalone(), naoVisto() (+4 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.18
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Hoje(), Msg(), Aluno(), Barra(), EscolherAluno() (+14 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.05
Nodes (66): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, sairAgora(), AcaoEmail(), salvar() (+58 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.17
Nodes (29): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva, linhasDoExercicio() (+21 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "ui.tsx"
Cohesion: 0.11
Nodes (26): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas(), estavel() (+18 more)

### Community 65 - "Feedbacks.tsx"
Cohesion: 0.10
Nodes (39): Onde mexer para…, Cartao(), Doc, Estrelas(), FILTROS, BotaoCompartilhar(), clicar(), compartilharArquivo() (+31 more)

### Community 66 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.22
Nodes (8): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "vite.config.ts"
Cohesion: 0.15
Nodes (10): @tailwindcss/vite@^4.3.3, vite@^8.3.4, @vitejs/plugin-react@^6.1.1, @tailwindcss/vite, vite, @vitejs/plugin-react, arquivos(), previewHeaders (+2 more)

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

### Community 73 - "acoes.ts"
Cohesion: 0.22
Nodes (16): firebase, CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, idCardio(), rotuloCardio() (+8 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "hojeSaoPaulo"
Cohesion: 0.12
Nodes (15): ALUNO, COACH, ALUNO, COACH, diasAtras(), semear(), ALUNO, COACH (+7 more)

### Community 77 - "Alertas.tsx"
Cohesion: 0.17
Nodes (29): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+21 more)

### Community 78 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "@playwright/test"
Cohesion: 0.11
Nodes (9): ALUNO, COACH, CORS, CAINDO, COACH, ALUNO, COACH, marca (+1 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "vidro.tsx"
Cohesion: 0.18
Nodes (19): Peças compartilhadas (já no código), Faixa(), Atalho, marcarVisto(), Onboarding(), Pronto(), Icone, IcSeta (+11 more)

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "pwa-assets.config.ts"
Cohesion: 0.50
Nodes (3): @vite-pwa/assets-generator@^1.0.4, fundo, @vite-pwa/assets-generator

### Community 90 - "vigia.test.ts"
Cohesion: 0.15
Nodes (5): SCRIPTS, app, auth, COLECOES, db

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 92 - "vitest"
Cohesion: 0.14
Nodes (10): vitest, mediana(), metaCiclo(), metaRobusta(), divisao, meso, Meso, Monitoramento() (+2 more)

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

### Community 100 - "firebase-admin"
Cohesion: 0.18
Nodes (8): firebase-admin@14.5.0, firebase-admin, atual, novo, acao, email, projeto, PROJETOS

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

### Community 108 - "IconeMetodo"
Cohesion: 0.83
Nodes (3): desenhos(), IconeMetodo(), loop()

### Community 110 - "marcas_vfit_marca"
Cohesion: 0.29
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
Nodes (58): Peso(), NovoAluno(), enviar(), ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa() (+50 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "TutorialCoach.tsx"
Cohesion: 0.31
Nodes (15): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+7 more)

### Community 122 - "SessaoCard.tsx"
Cohesion: 0.12
Nodes (24): ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano (+16 more)

### Community 134 - "App.tsx"
Cohesion: 0.17
Nodes (20): motion, App(), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+12 more)

### Community 136 - "Árvore por pasta"
Cohesion: 0.07
Nodes (28): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, `.github/workflows/` — CI/CD (+20 more)

### Community 137 - "Tutorial.tsx"
Cohesion: 0.30
Nodes (14): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+6 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 139 - "src/index.ts"
Cohesion: 0.18
Nodes (11): CacheAcesso, cors(), ORIGENS, DESCANSO, DO_ALUNO, Env, Mensagem, recado() (+3 more)

### Community 140 - "AssistenteIA.tsx"
Cohesion: 0.39
Nodes (10): AssistenteIA(), remover(), salvar(), apagarChaveIA(), chaveMascarada(), chaveValida(), ERROS_HTTP, refChave() (+2 more)

### Community 141 - "pdfRelatorio.ts"
Cohesion: 0.20
Nodes (11): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, prepararFontes(), disp(), EntradaPdf, gerarPdfRelatorio(), quebrar(), sans() (+3 more)

### Community 142 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 143 - "criarCoach"
Cohesion: 0.18
Nodes (9): ALUNO, COACH, PNG, ALUNO, COACH, iniciarEConcluir(), seg(), semear() (+1 more)

### Community 145 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.18
Nodes (10): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Notificações: mensalidade e treino pronto (13/10/2026), Respostas do Victor (+2 more)

### Community 148 - "`src/features/coach/` — App do coach"
Cohesion: 0.29
Nodes (6): `src/features/coach/` — App do coach, CampoExercicio(), buscarExercicios(), itens, norm(), nomes()

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "cartaoDepoimento.ts"
Cohesion: 0.33
Nodes (8): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), pngDe(), D_ESTRELA, primeiroNome()

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "TabDivisao"
Cohesion: 0.50
Nodes (8): TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), semanasComHistorico(), treinoTemCarga(), trocarExercicio()

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

### Community 159 - "coach.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, NOMES

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

## Knowledge Gaps
- **4 isolated node(s):** `RFC-8188`, `RFC-8292`, `RFC-8291`, `RFC-8291`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1142 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `push.ts`, `ataques.test.ts`, `planilha.ts`, `Hoje.tsx`, `seriesDoRotulo`, `EditarTreino.tsx`, `src/index.ts`, `react`, `cartaoRelatorio.ts`, `engine/index.ts`, `Alunos.tsx`, `alertas.ts`, `pdfRelatorio.ts`, `rules.test.ts`, ``src/features/coach/` — App do coach`, `Treino.tsx`, `cartaoDepoimento.ts`, `FimTreino.tsx`, `jwt.ts`, `notasMetodo.ts`, `InicioAluno.tsx`, `cartaoStory.ts`, `lib/acesso.ts`, `ref_node_fs`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `webpush.ts`, `TabDivisao.tsx`, `prescreverSessao`, `iaTreino.ts`, `validar.ts`, `package.json`, `pesoCorporal.ts`, `evolucao.ts`, `src/acesso.ts`, `metricas.ts`, `Entrar.tsx`, `TabMetodos.tsx`, `ui.tsx`, `Feedbacks.tsx`, `acoes.ts`, `limpeza-lgpd.test.ts`, `codigoPix`, `vigia.test.ts`, `aluno-exemplo.test.ts`, `marcas_vfit_marca`, `SessaoCard.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Are the 105 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 105 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RFC-8188`, `RFC-8292`, `RFC-8291` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0574400723654455 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `push.ts`, `VozTreino.tsx`, `App.tsx`, `Hoje.tsx`, `Árvore por pasta`, `seriesDoRotulo`, `EditarTreino.tsx`, `react`, `pdfRelatorio.ts`, `engine/index.ts`, `Alunos.tsx`, `alertas.ts`, `Treino.tsx`, `InicioAluno.tsx`, `cartaoStory.ts`, `lib/acesso.ts`, `TabDivisao.tsx`, `prescreverSessao`, `iaTreino.ts`, `pesoCorporal.ts`, `evolucao.ts`, `src/acesso.ts`, `AlunoApp.tsx`, `Presencial.tsx`, `Entrar.tsx`, `ui.tsx`, `acoes.ts`, `Alertas.tsx`, `vidro.tsx`, `IconeMetodo`, `Botao`, `SessaoCard.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `VozTreino.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12962962962962962 - nodes in this community are weakly interconnected._