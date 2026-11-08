# Graph Report - claude-cloud-celli  (2026-11-08)

## Corpus Check
- 276 files · ~259,478 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2150 nodes · 6234 edges · 136 communities (119 shown, 17 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 282 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7975d527`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- PainelEvolucao.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- RelatorioCoach.tsx
- InicioAluno.tsx
- Tutorial.tsx
- EditarTreino.tsx
- Botao
- MesosDoAluno.tsx
- `src/lib/` — Firestore, estado, cálculos com dados
- engine/index.ts
- Alunos.tsx
- App.tsx
- criarCoach
- acoes.ts
- prescreverSessao
- Pontos sensíveis (leia antes de auditar ou mexer)
- mfa.ts
- prints.spec.ts
- ContaAluno.tsx
- @playwright/test
- jwt.ts
- Segurança — passos do Victor no console
- Estado da sessão (retomada) — atualizado em 13/10/2026
- Hoje.tsx
- Entrar
- ui.tsx
- Relatorio.tsx
- settings.json
- xlsxFalso.ts
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- Treino.tsx
- cartaoStory.ts
- progressao.test.ts
- Coleções Firestore
- validar.ts
- TabDivisao
- prescreverSessao
- devDependencies
- Onde fica cada coisa
- evolucao.ts
- firebase-admin
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- InicioAluno.tsx
- Plano — App da Gislane (segunda marca)
- criarMeso
- package.json
- scripts
- AlunoApp.tsx
- Presencial.tsx
- ref_node_fs
- diaSP
- AcaoEmail.tsx
- inatividade.ts
- Motion / Framer Motion Examples
- Árvore por pasta
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
- xlsx.ts
- fetch
- metricas.ts
- SessaoCard.tsx
- codigoPix
- importar-meso.mjs
- FimTreino.tsx
- descanso.ts
- overrides
- Entrar.tsx
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- Politica.tsx
- aluno-exemplo.test.ts
- BotaoCompartilhar
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
- layout.spec.ts
- gislane/Logo.tsx
- vitest
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- EditorMeso
- busca.ts
- sair.spec.ts
- sugestao.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- varredura.spec.ts
- seriesDoRotulo

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 95 edges
2. `Botao()` - 83 edges
3. `Treino()` - 75 edges
4. `vitest` - 60 edges
5. `prescreverSessao()` - 57 edges
6. `react` - 56 edges
7. `Meso` - 49 edges
8. `Cartao()` - 44 edges
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
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx

## Import Cycles
- None detected.

## Communities (136 total, 17 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (50): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Contrato do Worker (+42 more)

### Community 1 - "PainelEvolucao.tsx"
Cohesion: 0.31
Nodes (15): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+7 more)

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
Cohesion: 0.16
Nodes (15): escolher(), abaSugerida(), arredondar(), colNome(), colNum(), dataSerial(), METODO_COLS, num() (+7 more)

### Community 7 - "RelatorioCoach.tsx"
Cohesion: 0.26
Nodes (15): BotaoPdf(), RelatorioAluno(), RelatorioDoc, useRelatoriosLiberados(), Editor(), RelatorioCoach(), useDadosAluno(), liberarRelatorio() (+7 more)

### Community 8 - "InicioAluno.tsx"
Cohesion: 0.21
Nodes (20): `src/features/aluno/` — App do aluno, Mensalidade(), InicioAluno(), Msg(), PixPerto(), Quadros(), RelatorioPronto(), Treinos() (+12 more)

### Community 9 - "Tutorial.tsx"
Cohesion: 0.20
Nodes (18): Logo(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+10 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.13
Nodes (29): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+21 more)

### Community 11 - "Botao"
Cohesion: 0.16
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "MesosDoAluno.tsx"
Cohesion: 0.12
Nodes (30): mesoPadrao(), CartaoMeso(), DarAcesso(), enviar(), dataBr(), FormDuplicar(), confirmar(), MesosDoAluno() (+22 more)

### Community 13 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.13
Nodes (21): `src/lib/` — Firestore, estado, cálculos com dados, Peças, arquivadosVencidos(), historicoExercicios(), MesoEvolucao, treinosFeitos(), arred(), cicloTerminou() (+13 more)

### Community 14 - "engine/index.ts"
Cohesion: 0.19
Nodes (19): ESCOPOS, linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica() (+11 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.09
Nodes (41): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+33 more)

### Community 16 - "App.tsx"
Cohesion: 0.12
Nodes (39): `src/features/coach/` — App do coach, ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso(), Vigia() (+31 more)

### Community 17 - "criarCoach"
Cohesion: 0.11
Nodes (16): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+8 more)

### Community 18 - "acoes.ts"
Cohesion: 0.10
Nodes (45): motion, uqr, PIX, NovoAluno(), enviar(), ImportarPlanilha(), importar(), Previa() (+37 more)

### Community 19 - "prescreverSessao"
Cohesion: 0.10
Nodes (19): 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h) (+11 more)

### Community 20 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.14
Nodes (22): Pontos sensíveis (leia antes de auditar ou mexer), AvisoAdaptado(), FestaRecorde(), hms(), RelogioTreino(), Treino(), FaixaAjustado(), IcReiniciar (+14 more)

### Community 21 - "mfa.ts"
Cohesion: 0.39
Nodes (6): tentar(), chaveManual(), codigoCompleto(), limparCodigo(), mensagemMfa(), msgs

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.17
Nodes (21): Avatar(), iniciais(), AvisoNotificacoes(), permissao(), AvisoDescanso(), Chave(), ContaAluno(), escolherFoto() (+13 more)

### Community 24 - "@playwright/test"
Cohesion: 0.11
Nodes (19): ALUNO, COACH, PNG, COACH, ALUNO, COACH, semear(), COACH (+11 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "Segurança — passos do Victor no console"
Cohesion: 0.18
Nodes (12): COR_METODO, metodoDoRotulo(), METODOS, ORDEM, ExplicacaoMetodo(), Modal(), NotaMetodos(), IconeMetodo() (+4 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.08
Nodes (23): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+15 more)

### Community 28 - "Hoje.tsx"
Cohesion: 0.14
Nodes (26): AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), diaCurto(), DIAS_CURTO, mesoAtual(), quando() (+18 more)

### Community 29 - "Entrar"
Cohesion: 0.30
Nodes (12): Onde mexer para…, CardioHoje(), dataSP(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero() (+4 more)

### Community 30 - "ui.tsx"
Cohesion: 0.09
Nodes (51): firebase, react, Aba, ABAS, DIAS_SEMANA, TITULO_ABA, Aba, ABAS (+43 more)

### Community 31 - "Relatorio.tsx"
Cohesion: 0.06
Nodes (64): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, CONFETE, dur(), FimTreino() (+56 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "xlsxFalso.ts"
Cohesion: 0.24
Nodes (10): ALUNO, COACH, abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate() (+2 more)

### Community 34 - "conversores.ts"
Cohesion: 0.17
Nodes (19): arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps, docsParaRegistros(), docsParaRegistrosReps() (+11 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "Treino.tsx"
Cohesion: 0.15
Nodes (17): `notas/{alunoId}`, Convenção de gravação (TOTAL), CONFETE, Nota(), Novidades(), RegistroFlag, LoadInput(), IcCheck (+9 more)

### Community 39 - "cartaoStory.ts"
Cohesion: 0.29
Nodes (10): Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, marcar(), treinoEmAndamento() (+2 more)

### Community 40 - "progressao.test.ts"
Cohesion: 0.22
Nodes (3): Meso, meso, base

### Community 41 - "Coleções Firestore"
Cohesion: 0.10
Nodes (18): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `relatorios/{mesoId}` (+10 more)

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "TabDivisao"
Cohesion: 0.24
Nodes (11): trocarAba(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), copiarTreino(), nomeImportado() (+3 more)

### Community 44 - "prescreverSessao"
Cohesion: 0.11
Nodes (21): nomes(), igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+13 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.19
Nodes (17): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.15
Nodes (22): arred(), calcular(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao, Feito (+14 more)

### Community 48 - "firebase-admin"
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

### Community 52 - "InicioAluno.tsx"
Cohesion: 0.09
Nodes (30): AlertaAbaixo, AlertaAcima, AlertaDemorado, Grupos, agora, alunos, linha, meso (+22 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "criarMeso"
Cohesion: 0.09
Nodes (15): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+7 more)

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "AlunoApp.tsx"
Cohesion: 0.13
Nodes (27): `src/` — Raiz, Peças compartilhadas (já no código), AlunoApp(), Tutorial(), tutorialNaoVisto(), EvolucaoAluno(), AvisoIOS(), iOS() (+19 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.26
Nodes (14): Hoje(), Msg(), BotaoSair(), Aluno(), Barra(), Folha(), Grupo(), lerGrupo() (+6 more)

### Community 59 - "ref_node_fs"
Cohesion: 0.18
Nodes (5): ALUNO, COACH, marca, arquivos(), RAIZ

### Community 60 - "diaSP"
Cohesion: 0.14
Nodes (17): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), diaSP(), painelEvolucao(), agora, dia(), emSemana() (+9 more)

### Community 61 - "AcaoEmail.tsx"
Cohesion: 0.31
Nodes (10): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, aplicarCodigo() (+2 more)

### Community 62 - "inatividade.ts"
Cohesion: 0.22
Nodes (24): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva, linhasDoExercicio() (+16 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "Árvore por pasta"
Cohesion: 0.12
Nodes (16): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+8 more)

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
Cohesion: 0.20
Nodes (16): Entrar(), enviar(), voltar(), mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar(), resolverMfa() (+8 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "xlsx.ts"
Cohesion: 0.30
Nodes (10): abrirPlanilha(), attr(), celulas(), compartilhadas(), desescapar(), Entrada, extrair(), indice() (+2 more)

### Community 77 - "fetch"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 78 - "metricas.ts"
Cohesion: 0.16
Nodes (20): `registros/{regId}`, 7. Teste de ataques (03/10/2026), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+12 more)

### Community 79 - "SessaoCard.tsx"
Cohesion: 0.24
Nodes (12): Preview(), fmt(), Chips(), CORES, RepsFeitas(), SessaoCard(), registrarCarga(), NotasDoc (+4 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "FimTreino.tsx"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 83 - "descanso.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Entrar.tsx"
Cohesion: 0.31
Nodes (9): trocarSenha(), erros, campo, EsqueciSenha(), enviar(), mensagemRecuperar(), rotulo, recuperarSenha() (+1 more)

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "Politica.tsx"
Cohesion: 0.21
Nodes (9): react-dom, App(), CaixaAceite(), Lista(), Politica(), Secao(), carregar(), Features (+1 more)

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

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

### Community 108 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 110 - "vitest"
Cohesion: 0.25
Nodes (6): vitest, arquivos(), chaves(), PROIBIDOS, semPix(), VARS

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

### Community 119 - "EditorMeso"
Cohesion: 0.39
Nodes (8): EditorMeso(), atualizar(), salvar(), setFrequencia(), setSemanas(), estavel(), redimensionar(), marcarAdaptado()

### Community 120 - "busca.ts"
Cohesion: 0.60
Nodes (4): buscarExercicios(), itens, norm(), nomes()

### Community 122 - "sugestao.ts"
Cohesion: 0.11
Nodes (23): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento() (+15 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 831 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `push.ts`, `ataques.test.ts`, `planilha.ts`, `RelatorioCoach.tsx`, `seriesDoRotulo`, `EditarTreino.tsx`, `MesosDoAluno.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `engine/index.ts`, `Alunos.tsx`, `acoes.ts`, `mfa.ts`, `jwt.ts`, `Segurança — passos do Victor no console`, `Hoje.tsx`, `Entrar`, `Relatorio.tsx`, `xlsxFalso.ts`, `conversores.ts`, `webpush.ts`, `Treino.tsx`, `cartaoStory.ts`, `progressao.test.ts`, `validar.ts`, `TabDivisao`, `prescreverSessao`, `Onde fica cada coisa`, `firebase-admin`, `src/acesso.ts`, `InicioAluno.tsx`, `package.json`, `ref_node_fs`, `diaSP`, `inatividade.ts`, `src/index.ts`, `MinhaConta.tsx`, `limpeza-lgpd.test.ts`, `metricas.ts`, `SessaoCard.tsx`, `codigoPix`, `descanso.ts`, `aluno-exemplo.test.ts`, `busca.ts`, `sugestao.ts`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Are the 94 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 94 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05902980713033314 - nodes in this community are weakly interconnected._
- **Why does `firebase` connect `ui.tsx` to `push.ts`, `ataques.test.ts`, `RelatorioCoach.tsx`, `InicioAluno.tsx`, `MesosDoAluno.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `Alunos.tsx`, `App.tsx`, `acoes.ts`, `ContaAluno.tsx`, `Hoje.tsx`, `Entrar`, `Treino.tsx`, `cartaoStory.ts`, `evolucao.ts`, `package.json`, `Presencial.tsx`, `diaSP`, `AcaoEmail.tsx`, `SessaoCard.tsx`, `Entrar.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._