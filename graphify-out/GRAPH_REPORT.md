# Graph Report - claude-cloud-celli  (2026-11-08)

## Corpus Check
- 279 files · ~263,120 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2172 nodes · 6371 edges · 131 communities (115 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 300 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d55c6ccf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- TutorialCoach.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- TabDivisao.tsx
- criarAluno
- Hoje.tsx
- Tutorial.tsx
- EditarTreino.tsx
- BoasVindas.tsx
- lib/acesso.ts
- evolucao.ts
- TabProgressao.tsx
- Alunos.tsx
- Alertas.tsx
- criarMeso
- acoes.ts
- Coleções Firestore
- Treino.tsx
- Logo
- prints.spec.ts
- ContaAluno.tsx
- criarAluno
- jwt.ts
- notasMetodo.ts
- Estado da sessão (retomada) — atualizado em 08/11/2026
- Presencial.tsx
- Monitoramento.tsx
- PainelEvolucao.tsx
- cartaoRelatorio.ts
- settings.json
- firebase-admin
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- SessaoCard.tsx
- inatividade.ts
- sugestao.test.ts
- Árvore por pasta
- validar.ts
- m
- evolucao.test.ts
- devDependencies
- Onde fica cada coisa
- Notificações: mensalidade e treino pronto (13/10/2026)
- FimTreino.tsx
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- @playwright/test
- package.json
- scripts
- ui.tsx
- Presencial.tsx
- ref_node_fs
- fotoTreino.spec.ts
- vidro.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- pdfRelatorio.ts
- Plano — Entrega 4: registro de erros e segurança
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- src/index.ts
- Entrar.tsx
- limpeza-lgpd.test.ts
- fetch
- vitest
- TabProgressao.tsx
- PagarPix.tsx
- importar-meso.mjs
- criarRegistro
- atualizar.ts
- overrides
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- Logo
- aluno-exemplo.test.ts
- GuiaMetodos.tsx
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
- gislane/Logo.tsx
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- EditorMeso.tsx
- Msg
- prescreverSessao
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- main.tsx
- marca.test.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 104 edges
2. `Botao()` - 83 edges
3. `Treino()` - 77 edges
4. `vitest` - 61 edges
5. `prescreverSessao()` - 57 edges
6. `react` - 56 edges
7. `Meso` - 49 edges
8. `Cartao()` - 44 edges
9. `registrarErro()` - 41 edges
10. `firebase` - 39 edges

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

## Communities (131 total, 16 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.09
Nodes (26): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+18 more)

### Community 1 - "TutorialCoach.tsx"
Cohesion: 0.28
Nodes (16): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+8 more)

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

### Community 6 - "TabDivisao.tsx"
Cohesion: 0.06
Nodes (61): Slot, ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), Seletor(), TabDivisao() (+53 more)

### Community 7 - "criarAluno"
Cohesion: 0.15
Nodes (6): ALUNO, COACH, semearFormatoAntigo(), CAINDO, COACH, criarAluno()

### Community 8 - "Hoje.tsx"
Cohesion: 0.12
Nodes (29): `src/features/aluno/` — App do aluno, `src/features/auth/` — Autenticação, Mensalidade(), Hoje(), Msg(), InicioAluno(), Msg(), PixPerto() (+21 more)

### Community 9 - "Tutorial.tsx"
Cohesion: 0.17
Nodes (25): Linha(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+17 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.14
Nodes (26): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+18 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.17
Nodes (26): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+18 more)

### Community 12 - "lib/acesso.ts"
Cohesion: 0.22
Nodes (9): faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento(), agora, aluno(), paga() (+1 more)

### Community 13 - "evolucao.ts"
Cohesion: 0.06
Nodes (60): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), arred(), calcular(), cargasPositivas(), coletar() (+52 more)

### Community 14 - "TabProgressao.tsx"
Cohesion: 0.29
Nodes (10): AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica(), reduzirVolume(), linha8() (+2 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.09
Nodes (41): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+33 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.10
Nodes (48): `src/features/coach/` — App do coach, ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso(), Vigia() (+40 more)

### Community 17 - "criarMeso"
Cohesion: 0.13
Nodes (10): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), ALUNO (+2 more)

### Community 18 - "acoes.ts"
Cohesion: 0.12
Nodes (47): Peso(), NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso() (+39 more)

### Community 19 - "Coleções Firestore"
Cohesion: 0.10
Nodes (19): 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h) (+11 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.14
Nodes (26): `notas/{alunoId}`, AvisoAdaptado(), CONFETE, hms(), Nota(), Novidades(), RegistroFlag, RelogioTreino() (+18 more)

### Community 21 - "Logo"
Cohesion: 0.29
Nodes (8): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, Lista(), Politica(), Secao()

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (11): ANTES, DIAS_AUTO, ids, marca, NOMES, PROIBIDO, T1, T2 (+3 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.12
Nodes (38): `src/lib/` — Firestore, estado, cálculos com dados, AvisoNotificacoes(), permissao(), AvisoDescanso(), Chave(), ContaAluno(), escolherFoto(), sairAgora() (+30 more)

### Community 24 - "criarAluno"
Cohesion: 0.10
Nodes (21): COACH, ALUNO, COACH, COACH, ALUNO, COACH, ALUNO, COACH (+13 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "notasMetodo.ts"
Cohesion: 0.18
Nodes (12): COR_METODO, metodoDoRotulo(), METODOS, ORDEM, ExplicacaoMetodo(), Modal(), NotaMetodos(), IconeMetodo() (+4 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 08/11/2026"
Cohesion: 0.08
Nodes (24): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+16 more)

### Community 28 - "Presencial.tsx"
Cohesion: 0.13
Nodes (29): AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), dataSP(), diaCurto(), DIAS_CURTO (+21 more)

### Community 29 - "Monitoramento.tsx"
Cohesion: 0.31
Nodes (6): mediana(), metaCiclo(), metaRobusta(), divisao, meso, Monitoramento()

### Community 30 - "PainelEvolucao.tsx"
Cohesion: 0.10
Nodes (51): firebase, react, Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto (+43 more)

### Community 31 - "cartaoRelatorio.ts"
Cohesion: 0.06
Nodes (68): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/evolucao/` — Painel de evolução, conquistas, cartão, `src/features/relatorio/` — Relatório do fim do ciclo, CONFETE, dur(), FimTreino(), escolher(), Lista() (+60 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 34 - "conversores.ts"
Cohesion: 0.14
Nodes (24): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), FestaRecorde(), cancelarTreino(), arred(), caminhoCarga(), CargasDoc, deMapa() (+16 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "SessaoCard.tsx"
Cohesion: 0.33
Nodes (8): LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcCheck, registrarCarga(), NotasDoc

### Community 39 - "inatividade.ts"
Cohesion: 0.29
Nodes (10): Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, marcar(), treinoEmAndamento() (+2 more)

### Community 40 - "sugestao.test.ts"
Cohesion: 0.20
Nodes (4): vitest, Meso, meso, base

### Community 41 - "Árvore por pasta"
Cohesion: 0.09
Nodes (29): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, Onde mexer para… (+21 more)

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "m"
Cohesion: 0.50
Nodes (4): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas()

### Community 44 - "evolucao.test.ts"
Cohesion: 0.10
Nodes (18): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+10 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.18
Nodes (18): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+10 more)

### Community 47 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

### Community 48 - "FimTreino.tsx"
Cohesion: 0.22
Nodes (4): app, auth, COLECOES, db

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.10
Nodes (27): agora, alunos, linha, meso, mesos, registros, diaSP(), ARQUIVADO_DIAS (+19 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "@playwright/test"
Cohesion: 0.10
Nodes (14): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+6 more)

### Community 55 - "package.json"
Cohesion: 0.17
Nodes (11): name, private, type, version, @cloudflare/workers-types, firebase-tools, react-dom, tailwindcss (+3 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "ui.tsx"
Cohesion: 0.20
Nodes (11): EvolucaoCoach(), agil, saida, suave, Barra(), camada, campoBase, confirmarNumero() (+3 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 59 - "ref_node_fs"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 60 - "fotoTreino.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, PNG

### Community 61 - "vidro.tsx"
Cohesion: 0.13
Nodes (24): Peças compartilhadas (já no código), trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+16 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.19
Nodes (27): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+19 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "pdfRelatorio.ts"
Cohesion: 0.11
Nodes (21): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/conta/` — Minha Conta, `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach) (+13 more)

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

### Community 74 - "Entrar.tsx"
Cohesion: 0.14
Nodes (25): Entrar(), enviar(), voltar(), erros, mensagemErro(), tentar(), CaixaAceite(), cadastrar() (+17 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 77 - "fetch"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 78 - "vitest"
Cohesion: 0.30
Nodes (13): `registros/{regId}`, 7. Teste de ataques (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros() (+5 more)

### Community 79 - "TabProgressao.tsx"
Cohesion: 0.24
Nodes (14): tempoPorSemana(), Preview(), AjustarVolume(), aplicar(), fmt(), Previa, resumo(), TabelaProgressao() (+6 more)

### Community 80 - "PagarPix.tsx"
Cohesion: 0.20
Nodes (10): uqr, PIX, informarPagamento(), campo(), codigoPix(), crc16(), limparChave(), semAcento() (+2 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "criarRegistro"
Cohesion: 0.15
Nodes (14): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ALUNO, COACH, confere(), semTransbordar(), diasAtras(), registros() (+6 more)

### Community 83 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

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

### Community 90 - "Logo"
Cohesion: 0.36
Nodes (5): motion, App(), carregar(), Features, montar()

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

### Community 119 - "EditorMeso.tsx"
Cohesion: 0.21
Nodes (15): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas(), estavel() (+7 more)

### Community 120 - "Msg"
Cohesion: 0.33
Nodes (5): CampoExercicio(), buscarExercicios(), itens, norm(), nomes()

### Community 122 - "prescreverSessao"
Cohesion: 0.15
Nodes (23): ESCOPOS, nomes(), prescreverSessao(), slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento() (+15 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 832 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `sugestao.test.ts` to `push.ts`, `ataques.test.ts`, `TabDivisao.tsx`, `marca.test.ts`, `EditarTreino.tsx`, `lib/acesso.ts`, `evolucao.ts`, `TabProgressao.tsx`, `Alunos.tsx`, `Treino.tsx`, `prints.spec.ts`, `ContaAluno.tsx`, `jwt.ts`, `notasMetodo.ts`, `Presencial.tsx`, `Monitoramento.tsx`, `PainelEvolucao.tsx`, `cartaoRelatorio.ts`, `firebase-admin`, `conversores.ts`, `webpush.ts`, `inatividade.ts`, `Árvore por pasta`, `validar.ts`, `evolucao.test.ts`, `Onde fica cada coisa`, `FimTreino.tsx`, `src/acesso.ts`, `alertas.ts`, `package.json`, `ui.tsx`, `TabMetodos.tsx`, `src/index.ts`, `Entrar.tsx`, `limpeza-lgpd.test.ts`, `vitest`, `TabProgressao.tsx`, `PagarPix.tsx`, `atualizar.ts`, `aluno-exemplo.test.ts`, `Msg`, `prescreverSessao`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Are the 103 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 103 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09032258064516129 - nodes in this community are weakly interconnected._
- **Why does `react` connect `PainelEvolucao.tsx` to `push.ts`, `TutorialCoach.tsx`, `TabDivisao.tsx`, `Hoje.tsx`, `Tutorial.tsx`, `EditarTreino.tsx`, `BoasVindas.tsx`, `Alunos.tsx`, `Alertas.tsx`, `acoes.ts`, `Treino.tsx`, `Logo`, `ContaAluno.tsx`, `notasMetodo.ts`, `Presencial.tsx`, `cartaoRelatorio.ts`, `SessaoCard.tsx`, `inatividade.ts`, `Árvore por pasta`, `package.json`, `ui.tsx`, `Presencial.tsx`, `vidro.tsx`, `TabMetodos.tsx`, `pdfRelatorio.ts`, `Entrar.tsx`, `TabProgressao.tsx`, `PagarPix.tsx`, `Logo`, `GuiaMetodos.tsx`, `EditorMeso.tsx`, `Msg`, `prescreverSessao`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._