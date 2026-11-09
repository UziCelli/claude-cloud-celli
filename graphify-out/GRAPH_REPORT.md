# Graph Report - claude-cloud-celli  (2026-11-09)

## Corpus Check
- 288 files · ~271,240 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2249 nodes · 6605 edges · 140 communities (124 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 306 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `332868fb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- VozTreino.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- Meso
- push.ts
- icones.tsx
- EditarTreino.tsx
- icones.tsx
- App.tsx
- cartaoRelatorio.ts
- prescreverSessao
- Alunos.tsx
- Alertas.tsx
- lib/acesso.ts
- relatorio.ts
- Segurança — passos do Victor no console
- Treino.tsx
- ui.tsx
- prints.spec.ts
- InicioAluno.tsx
- FimTreino.tsx
- jwt.ts
- notasMetodo.ts
- Estado da sessão (retomada) — atualizado em 08/11/2026
- InicioAluno.tsx
- AssistenteIA.tsx
- evolucao.test.ts
- cartaoStory.ts
- settings.json
- criarAluno
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- criarMeso
- vidro.tsx
- prescreverSessao
- Plano — Painel de Evolução (03/10/2026)
- src/index.ts
- Árvore por pasta
- TutorialCoach.tsx
- devDependencies
- Onde fica cada coisa
- evolucao.ts
- vigia.test.ts
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- progressao.test.ts
- package.json
- scripts
- AlunoApp.tsx
- Presencial.tsx
- main.tsx
- sair.spec.ts
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- react
- calcularAlertas.test.ts
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- CardioHoje.tsx
- Descanso
- limpeza-lgpd.test.ts
- criarCoach
- RelatorioCoach.tsx
- evolucao.spec.ts
- acoes.ts
- codigoPix
- importar-meso.mjs
- @playwright/test
- BotaoVoltar
- overrides
- Notificações: mensalidade e treino pronto (13/10/2026)
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- ref_node_fs
- aluno-exemplo.test.ts
- Monitoramento.tsx
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
- IconeMetodo
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
- layout.spec.ts
- vfit/Logo.tsx
- engine/index.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- varredura.spec.ts
- seriesDoRotulo
- Slot
- Coleções Firestore
- Push do descanso (Entrega 3b)
- relatorio.spec.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 107 edges
2. `Botao()` - 87 edges
3. `Treino()` - 77 edges
4. `vitest` - 63 edges
5. `react` - 58 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 50 edges
8. `Cartao()` - 48 edges
9. `registrarErro()` - 41 edges
10. `firebase` - 40 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `09/10/2026 — Segurança, movimento e aba Conta` --references--> `MinhaConta()`  [INFERRED]
  docs/estado-sessao.md → src/features/conta/MinhaConta.tsx
- `Entregas` --references--> `normalizarCargas()`  [INFERRED]
  docs/estado-sessao.md → src/lib/conversores.ts
- `Como funciona` --references--> `useDescanso()`  [INFERRED]
  docs/push.md → src/lib/descanso.ts

## Import Cycles
- None detected.

## Communities (140 total, 16 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.13
Nodes (20): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Armazem (+12 more)

### Community 1 - "VozTreino.tsx"
Cohesion: 0.05
Nodes (69): Registros, Slot, CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar() (+61 more)

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

### Community 6 - "planilha.ts"
Cohesion: 0.10
Nodes (31): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+23 more)

### Community 7 - "Meso"
Cohesion: 0.15
Nodes (18): `src/lib/` — Firestore, estado, cálculos com dados, cargaVolta(), comVolta(), dataDe(), Dia, DIAS_AUTO, diasDaSemana(), feitoEm() (+10 more)

### Community 8 - "push.ts"
Cohesion: 0.18
Nodes (21): agendarPush(), avisarTreinoPronto(), avisosCoachLigados(), avisosLigados(), b64uParaBytes(), BASE, cabecalhosPush(), cancelarPush() (+13 more)

### Community 9 - "icones.tsx"
Cohesion: 0.15
Nodes (22): AvisoNotificacoes(), permissao(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss() (+14 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.13
Nodes (26): adicionarExercicio(), adicionarMetodo(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+18 more)

### Community 11 - "icones.tsx"
Cohesion: 0.17
Nodes (28): `src/features/instalar/` — PWA/Android, Logo(), BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+20 more)

### Community 12 - "App.tsx"
Cohesion: 0.10
Nodes (53): `src/features/coach/` — App do coach, firebase, ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), Vigia() (+45 more)

### Community 13 - "cartaoRelatorio.ts"
Cohesion: 0.12
Nodes (25): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, C, H, W, dadosCartaoRelatorio(), DadosRelatorio, dataBr() (+17 more)

### Community 14 - "prescreverSessao"
Cohesion: 0.21
Nodes (18): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+10 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.09
Nodes (41): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+33 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.21
Nodes (16): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+8 more)

### Community 17 - "lib/acesso.ts"
Cohesion: 0.20
Nodes (13): diaSP(), diasParaVencer(), faltaSegundoFator(), inicioDoDiaSP(), liberado(), proximoVencimento(), msSessao(), resumoCoach() (+5 more)

### Community 18 - "relatorio.ts"
Cohesion: 0.13
Nodes (19): Peças, historicoExercicios(), MesoEvolucao, treinosFeitos(), arred(), cicloTerminou(), diasDesdeFim(), fimISO() (+11 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.10
Nodes (20): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+12 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.11
Nodes (34): `notas/{alunoId}`, metodoDoRotulo(), METODOS, AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms() (+26 more)

### Community 21 - "ui.tsx"
Cohesion: 0.12
Nodes (25): motion, Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas() (+17 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (14): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+6 more)

### Community 23 - "InicioAluno.tsx"
Cohesion: 0.12
Nodes (39): `src/features/aluno/` — App do aluno, `src/features/auth/` — Autenticação, SemAcesso(), AvisoDescanso(), Chave(), ContaAluno(), escolherFoto(), sairAgora() (+31 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.16
Nodes (17): CONFETE, dur(), FimTreino(), escolher(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo() (+9 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "notasMetodo.ts"
Cohesion: 0.43
Nodes (4): dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 27 - "Estado da sessão (retomada) — atualizado em 08/11/2026"
Cohesion: 0.08
Nodes (25): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+17 more)

### Community 28 - "InicioAluno.tsx"
Cohesion: 0.28
Nodes (13): AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), dataSP(), diaCurto(), DIAS_CURTO (+5 more)

### Community 29 - "AssistenteIA.tsx"
Cohesion: 0.44
Nodes (8): AssistenteIA(), remover(), salvar(), apagarChaveIA(), chaveMascarada(), chaveValida(), refChave(), salvarChaveIA()

### Community 30 - "evolucao.test.ts"
Cohesion: 0.17
Nodes (14): painelEvolucao(), recordeAnterior(), agora, dia(), emSemana(), feito(), linha, m1 (+6 more)

### Community 31 - "cartaoStory.ts"
Cohesion: 0.22
Nodes (21): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), desenhar(), desenharTreino(), desenharTreinoFoto(), fundoELogo() (+13 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "criarAluno"
Cohesion: 0.12
Nodes (8): ALUNO, COACH, ALUNO, COACH, marca, CAINDO, COACH, criarAluno()

### Community 34 - "conversores.ts"
Cohesion: 0.14
Nodes (24): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), cancelarTreino(), voltarAoPlanejado(), arred(), caminhoCarga(), CargasDoc, deMapa() (+16 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "criarMeso"
Cohesion: 0.13
Nodes (10): ALUNO, COACH, NOMES, ALUNO, meso(), prog, criarMeso(), lerDoc() (+2 more)

### Community 39 - "vidro.tsx"
Cohesion: 0.29
Nodes (12): Peças compartilhadas (já no código), Linha(), Atalho, marcarVisto(), Onboarding(), Pronto(), Icone, IcSeta (+4 more)

### Community 40 - "prescreverSessao"
Cohesion: 0.13
Nodes (26): `registros/{regId}`, 7. Teste de ataques (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros() (+18 more)

### Community 41 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 42 - "src/index.ts"
Cohesion: 0.17
Nodes (19): podeAvisarTreino(), Env, fetch(), Mensagem, MENSALIDADE, TREINO, Aviso, bytesOk() (+11 more)

### Community 43 - "Árvore por pasta"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/conta/` — Minha Conta, `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach) (+6 more)

### Community 44 - "TutorialCoach.tsx"
Cohesion: 0.26
Nodes (17): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+9 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.16
Nodes (19): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+11 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.14
Nodes (25): RegistroDoc, arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+17 more)

### Community 48 - "vigia.test.ts"
Cohesion: 0.15
Nodes (5): SCRIPTS, app, auth, COLECOES, db

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.22
Nodes (11): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), registrarAgendamento(), AGORA (+3 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.13
Nodes (22): Grupos, ARQUIVADO_DIAS, arquivadosVencidos(), chaveAlerta, DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro() (+14 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "progressao.test.ts"
Cohesion: 0.33
Nodes (7): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas()

### Community 55 - "package.json"
Cohesion: 0.17
Nodes (11): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+3 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "AlunoApp.tsx"
Cohesion: 0.33
Nodes (9): AlunoApp(), Tutorial(), tutorialNaoVisto(), AvisoIOS(), iOS(), standalone(), assinar(), useRota() (+1 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.18
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Hoje(), Msg(), Aluno(), Barra(), EscolherAluno() (+14 more)

### Community 59 - "main.tsx"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 61 - "Entrar.tsx"
Cohesion: 0.05
Nodes (63): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+55 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.17
Nodes (30): `src/engine/` — Motor de cálculo puro (sem React/Firebase), COR_METODO, ORDEM, alternarSerieDropset(), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo() (+22 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "react"
Cohesion: 0.15
Nodes (22): react, Preview(), Acima, LinhaAcima(), PainelSugestao(), aplicar(), EvolucaoCoach(), fmt() (+14 more)

### Community 65 - "calcularAlertas.test.ts"
Cohesion: 0.25
Nodes (6): agora, alunos, linha, meso, mesos, registros

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

### Community 73 - "CardioHoje.tsx"
Cohesion: 0.33
Nodes (11): Onde mexer para…, CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio() (+3 more)

### Community 74 - "Descanso"
Cohesion: 0.38
Nodes (3): CacheAcesso, Descanso, ParVapid

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarCoach"
Cohesion: 0.09
Nodes (22): COACH, ALUNO, COACH, COACH, ALUNO, COACH, ALUNO, COACH (+14 more)

### Community 77 - "RelatorioCoach.tsx"
Cohesion: 0.26
Nodes (15): BotaoPdf(), RelatorioAluno(), RelatorioDoc, useRelatoriosLiberados(), Editor(), RelatorioCoach(), useDadosAluno(), liberarRelatorio() (+7 more)

### Community 78 - "evolucao.spec.ts"
Cohesion: 0.40
Nodes (4): ALUNO, COACH, diasAtras(), semear()

### Community 79 - "acoes.ts"
Cohesion: 0.12
Nodes (30): EsqueciSenha(), enviar(), mensagemRecuperar(), DuasEtapas(), erros, mensagemErro(), MinhaConta(), trocarEmail() (+22 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "@playwright/test"
Cohesion: 0.14
Nodes (8): ALUNO, COACH, PNG, ALUNO, COACH, ALUNO, COACH, @playwright/test

### Community 83 - "BotaoVoltar"
Cohesion: 0.70
Nodes (3): GuiaMetodos(), IcVoltar, BotaoVoltar()

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "ref_node_fs"
Cohesion: 0.14
Nodes (7): ALUNO, marca, ALUNO, COACH, marca, arquivos(), RAIZ

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 92 - "Monitoramento.tsx"
Cohesion: 0.31
Nodes (6): mediana(), metaCiclo(), metaRobusta(), divisao, meso, Monitoramento()

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

### Community 108 - "IconeMetodo"
Cohesion: 0.83
Nodes (3): desenhos(), IconeMetodo(), loop()

### Community 110 - "marca.test.ts"
Cohesion: 0.19
Nodes (8): cors(), ORIGENS, vitest, arquivos(), chaves(), PROIBIDOS, semPix(), VARS

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
Cohesion: 0.13
Nodes (38): NovoAluno(), enviar(), ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), mesoPadrao() (+30 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 122 - "engine/index.ts"
Cohesion: 0.17
Nodes (17): ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano (+9 more)

### Community 137 - "Slot"
Cohesion: 0.25
Nodes (5): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), base

### Community 138 - "Coleções Firestore"
Cohesion: 0.10
Nodes (18): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `relatorios/{mesoId}` (+10 more)

### Community 142 - "Push do descanso (Entrega 3b)"
Cohesion: 0.29
Nodes (6): Como funciona, Limites do plano grátis (Cloudflare), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 143 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 854 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `marca.test.ts` to `descanso.ts`, `VozTreino.tsx`, `ataques.test.ts`, `planilha.ts`, `Meso`, `seriesDoRotulo`, `push.ts`, `EditarTreino.tsx`, `Slot`, `cartaoRelatorio.ts`, `prescreverSessao`, `Alunos.tsx`, `lib/acesso.ts`, `relatorio.ts`, `Treino.tsx`, `ui.tsx`, `FimTreino.tsx`, `jwt.ts`, `notasMetodo.ts`, `InicioAluno.tsx`, `evolucao.test.ts`, `cartaoStory.ts`, `conversores.ts`, `webpush.ts`, `prescreverSessao`, `src/index.ts`, `Onde fica cada coisa`, `vigia.test.ts`, `src/acesso.ts`, `alertas.ts`, `progressao.test.ts`, `package.json`, `Entrar.tsx`, `TabMetodos.tsx`, `react`, `calcularAlertas.test.ts`, `CardioHoje.tsx`, `limpeza-lgpd.test.ts`, `RelatorioCoach.tsx`, `acoes.ts`, `codigoPix`, `ref_node_fs`, `aluno-exemplo.test.ts`, `Monitoramento.tsx`, `engine/index.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Are the 106 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 106 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `descanso.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12681159420289856 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `conversores.ts` to `VozTreino.tsx`, `Meso`, `seriesDoRotulo`, `push.ts`, `Coleções Firestore`, `EditarTreino.tsx`, `App.tsx`, `cartaoRelatorio.ts`, `Alunos.tsx`, `lib/acesso.ts`, `Treino.tsx`, `ui.tsx`, `InicioAluno.tsx`, `FimTreino.tsx`, `InicioAluno.tsx`, `cartaoStory.ts`, `vidro.tsx`, `prescreverSessao`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `alertas.ts`, `AlunoApp.tsx`, `Presencial.tsx`, `Entrar.tsx`, `TabMetodos.tsx`, `react`, `CardioHoje.tsx`, `RelatorioCoach.tsx`, `acoes.ts`, `BotaoVoltar`, `IconeMetodo`, `MesosDoAluno.tsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `VozTreino.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.052604698672114404 - nodes in this community are weakly interconnected._