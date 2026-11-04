# Graph Report - claude-cloud-celli  (2026-11-04)

## Corpus Check
- 272 files · ~250,188 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2100 nodes · 5939 edges · 134 communities (118 shown, 16 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 257 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5c895ed7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- relatorio.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- ImportarPlanilha.tsx
- hooks.ts
- icones.tsx
- push.ts
- EditarTreino.tsx
- BoasVindas.tsx
- Alertas.tsx
- engine/index.ts
- registrarErro
- Alunos.tsx
- firebase-admin
- criarMeso
- Botao
- vitest
- Treino.tsx
- InicioAluno.tsx
- prints.spec.ts
- ContaAluno.tsx
- criarCoach
- jwt.ts
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- Estado da sessão (retomada) — atualizado em 13/10/2026
- evolucao.ts
- aluno-exemplo.test.ts
- RelatorioCoach.tsx
- Cartao
- settings.json
- lib/acesso.ts
- ui.tsx
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- Entrar.tsx
- cartaoStory.ts
- Segurança — passos do Victor no console
- Coleções Firestore
- validar.ts
- TabMetodos.tsx
- `src/lib/` — Firestore, estado, cálculos com dados
- devDependencies
- evolucao.test.ts
- montarPdf
- atualizar.ts
- Notificações: mensalidade e treino pronto (13/10/2026)
- src/acesso.ts
- compilerOptions
- Hoje.tsx
- Plano — App da Gislane (segunda marca)
- ref_node_fs
- package.json
- scripts
- inatividade.ts
- Presencial.tsx
- vigia.test.ts
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- Aviso
- coach.spec.ts
- Motion / Framer Motion Examples
- App.tsx
- Plano — Entrega 4: registro de erros e segurança
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- src/index.ts
- acoes.ts
- limpeza-lgpd.test.ts
- acoes.ts
- fetch
- metricas.ts
- Árvore por pasta
- codigoPix
- importar-meso.mjs
- fotoTreino.spec.ts
- relatorio.spec.ts
- overrides
- importar.spec.ts
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- vfit/Logo.tsx
- Plano — Painel de Evolução (03/10/2026)
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
- @playwright/test
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
- main.tsx
- seriesDoRotulo
- EditorMeso.tsx
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- marca.test.ts
- Alertas.tsx

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 84 edges
2. `Botao()` - 83 edges
3. `Treino()` - 73 edges
4. `vitest` - 59 edges
5. `prescreverSessao()` - 57 edges
6. `react` - 54 edges
7. `Meso` - 50 edges
8. `Cartao()` - 46 edges
9. `firebase` - 39 edges
10. `registrarErro()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``tools/` — Scripts offline` --references--> `Meso`  [INFERRED]
  docs/mapa.md → src/engine/tipos.ts
- ``src/features/conta/` — Minha Conta` --references--> `ContaAluno()`  [INFERRED]
  docs/mapa.md → src/features/aluno/ContaAluno.tsx
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx

## Import Cycles
- None detected.

## Communities (134 total, 16 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.09
Nodes (26): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+18 more)

### Community 1 - "relatorio.ts"
Cohesion: 0.13
Nodes (16): Evolucao, MesoEvolucao, RegistroEvolucao, arred(), diasDesdeFim(), fimISO(), RELATORIO_DIAS, relatorioCiclo (+8 more)

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

### Community 7 - "hooks.ts"
Cohesion: 0.16
Nodes (16): Hoje(), Msg(), Aba, ABAS, freq(), MEDALHA, RankingAlunos(), fmtData() (+8 more)

### Community 8 - "icones.tsx"
Cohesion: 0.10
Nodes (24): motion, react, marcarVisto(), PASSOS, Selo(), Tutorial(), tutorialNaoVisto(), AvisoIOS() (+16 more)

### Community 9 - "push.ts"
Cohesion: 0.17
Nodes (24): AvisoNotificacoes(), permissao(), AvisoDescanso(), IcSino, agendarPush(), avisosCoachLigados(), avisosLigados(), b64uParaBytes() (+16 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.11
Nodes (27): `src/engine/` — Motor de cálculo puro (sem React/Firebase), adicionarExercicio(), adicionarMetodo(), iniciarEdicao(), padraoMetodo(), removerExercicio(), removerMetodo(), semGruposSozinhos() (+19 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "Alertas.tsx"
Cohesion: 0.30
Nodes (13): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+5 more)

### Community 13 - "engine/index.ts"
Cohesion: 0.20
Nodes (18): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica(), reduzirVolume() (+10 more)

### Community 14 - "registrarErro"
Cohesion: 0.16
Nodes (22): ImportarPlanilha(), escolher(), importar(), Previa(), importarMeso(), Contador, contarDia(), cortar() (+14 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.15
Nodes (25): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+17 more)

### Community 16 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 17 - "criarMeso"
Cohesion: 0.11
Nodes (12): ALUNO, meso(), prog, ALUNO, COACH, ALUNO, COACH, semearFormatoAntigo() (+4 more)

### Community 18 - "Botao"
Cohesion: 0.20
Nodes (27): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+19 more)

### Community 19 - "vitest"
Cohesion: 0.08
Nodes (28): vitest, igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+20 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.09
Nodes (46): `notas/{alunoId}`, COR_METODO, metodoDoRotulo(), METODOS, ORDEM, Metodo, AvisoAdaptado(), CONFETE (+38 more)

### Community 21 - "InicioAluno.tsx"
Cohesion: 0.18
Nodes (26): Onde mexer para…, Peças compartilhadas (já no código), CardioHoje(), InicioAluno(), Msg(), Quadros(), RelatorioPronto(), Treinos() (+18 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.14
Nodes (24): `src/features/aluno/` — App do aluno, Avatar(), iniciais(), Chave(), ContaAluno(), escolherFoto(), desde(), Linha() (+16 more)

### Community 24 - "criarCoach"
Cohesion: 0.10
Nodes (21): ALUNO, COACH, ALUNO, COACH, diasAtras(), semear(), COACH, ALUNO (+13 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 27 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.11
Nodes (18): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 07/10/2026, 08/10/2026 — Redesenho (PR 56), 09/10/2026 (noite) — Animações e calendário automático, 09/10/2026 (noite) — Pix simples (+10 more)

### Community 28 - "evolucao.ts"
Cohesion: 0.17
Nodes (23): diaSP(), arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+15 more)

### Community 29 - "aluno-exemplo.test.ts"
Cohesion: 0.11
Nodes (24): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+16 more)

### Community 30 - "RelatorioCoach.tsx"
Cohesion: 0.24
Nodes (16): BotaoPdf(), RelatorioAluno(), RelatorioDoc, useRelatoriosLiberados(), Editor(), RelatorioCoach(), useDadosAluno(), liberarRelatorio() (+8 more)

### Community 31 - "Cartao"
Cohesion: 0.12
Nodes (27): ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano (+19 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "lib/acesso.ts"
Cohesion: 0.17
Nodes (16): firebase, RegistroDocCompleto, fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento(), perfilApp(), MesoSalvo (+8 more)

### Community 34 - "ui.tsx"
Cohesion: 0.23
Nodes (14): dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda(), Titulo() (+6 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.13
Nodes (18): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarCoach() (+10 more)

### Community 38 - "Entrar.tsx"
Cohesion: 0.21
Nodes (18): Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar() (+10 more)

### Community 39 - "cartaoStory.ts"
Cohesion: 0.07
Nodes (63): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, CONFETE, dur(), FimTreino(), escolher(), Lista(), EvolucaoCoach(), fmt() (+55 more)

### Community 40 - "Segurança — passos do Victor no console"
Cohesion: 0.10
Nodes (19): 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h) (+11 more)

### Community 41 - "Coleções Firestore"
Cohesion: 0.18
Nodes (10): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `mesos/{mesoId}` (+2 more)

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "TabMetodos.tsx"
Cohesion: 0.08
Nodes (32): CampoExercicio(), trocarAba(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+24 more)

### Community 44 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.31
Nodes (8): `src/lib/` — Firestore, estado, cálculos com dados, CardioDoc, diaNumero(), rotuloCardio(), TipoCardio, TIPOS, cicloTerminou(), relatoriosParaRevisar()

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "evolucao.test.ts"
Cohesion: 0.18
Nodes (13): painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1, meso() (+5 more)

### Community 47 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 48 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 49 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "Hoje.tsx"
Cohesion: 0.14
Nodes (23): Meso, AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), IcCadeado, IcRaio, comVolta() (+15 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "ref_node_fs"
Cohesion: 0.12
Nodes (10): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, marca, lerDoc() (+2 more)

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "inatividade.ts"
Cohesion: 0.29
Nodes (11): sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN (+3 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.40
Nodes (10): Aluno(), Barra(), Folha(), Grupo(), lerGrupo(), Membro(), padrao(), primeiro() (+2 more)

### Community 59 - "vigia.test.ts"
Cohesion: 0.22
Nodes (4): app, auth, COLECOES, db

### Community 60 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.20
Nodes (9): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam (+1 more)

### Community 61 - "Aviso"
Cohesion: 0.14
Nodes (23): `src/features/privacidade/` — Política e Aceite, trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+15 more)

### Community 62 - "coach.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, NOMES

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "App.tsx"
Cohesion: 0.14
Nodes (37): Pontos sensíveis (leia antes de auditar ou mexer), `src/` — Raiz, nadaPassaDaTela(), App(), ativaAba(), Coach(), Menu(), PerfilDemora() (+29 more)

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

### Community 74 - "acoes.ts"
Cohesion: 0.16
Nodes (21): uqr, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail() (+13 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "acoes.ts"
Cohesion: 0.23
Nodes (13): cancelarTreino(), criarConta(), marcarInicio(), marcarRealizado(), registrarPc(), registrarReps(), registro(), registroId() (+5 more)

### Community 77 - "fetch"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 78 - "metricas.ts"
Cohesion: 0.17
Nodes (18): `registros/{regId}`, 7. Teste de ataques (03/10/2026), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+10 more)

### Community 79 - "Árvore por pasta"
Cohesion: 0.15
Nodes (13): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+5 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "fotoTreino.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, PNG

### Community 83 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

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

### Community 91 - "vfit/Logo.tsx"
Cohesion: 0.29
Nodes (8): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, Lista(), Politica(), Secao()

### Community 92 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.29
Nodes (6): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), recordeAnterior(), treinosFeitos()

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

### Community 108 - "@playwright/test"
Cohesion: 0.15
Nodes (8): ALUNO, COACH, confere(), semTransbordar(), ALUNO, COACH, marca, @playwright/test

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

### Community 120 - "main.tsx"
Cohesion: 0.33
Nodes (4): react-dom, carregar(), Features, montar()

### Community 122 - "EditorMeso.tsx"
Cohesion: 0.21
Nodes (16): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setFrequencia(), setSemanas() (+8 more)

### Community 135 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 137 - "Alertas.tsx"
Cohesion: 0.05
Nodes (56): Entregas, `src/features/coach/` — App do coach, useAlertasCoach(), AlertaAbaixo, AlertaAcima, AlertaDemorado, calcularAlertas(), chavesAtuais() (+48 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 833 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `descanso.ts`, `relatorio.ts`, `ataques.test.ts`, `ImportarPlanilha.tsx`, `marca.test.ts`, `Alertas.tsx`, `EditarTreino.tsx`, `push.ts`, `engine/index.ts`, `firebase-admin`, `Treino.tsx`, `InicioAluno.tsx`, `jwt.ts`, `aluno-exemplo.test.ts`, `RelatorioCoach.tsx`, `Cartao`, `lib/acesso.ts`, `webpush.ts`, `Entrar.tsx`, `cartaoStory.ts`, `validar.ts`, `TabMetodos.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `evolucao.test.ts`, `montarPdf`, `atualizar.ts`, `src/acesso.ts`, `Hoje.tsx`, `ref_node_fs`, `package.json`, `vigia.test.ts`, `src/index.ts`, `acoes.ts`, `limpeza-lgpd.test.ts`, `metricas.ts`, `codigoPix`, `seriesDoRotulo`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Are the 83 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 83 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `descanso.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09032258064516129 - nodes in this community are weakly interconnected._
- **Why does `firebase` connect `lib/acesso.ts` to `relatorio.ts`, `ataques.test.ts`, `hooks.ts`, `push.ts`, `Alertas.tsx`, `registrarErro`, `Alunos.tsx`, `Botao`, `Treino.tsx`, `InicioAluno.tsx`, `ContaAluno.tsx`, `evolucao.ts`, `RelatorioCoach.tsx`, `Cartao`, `ui.tsx`, `Entrar.tsx`, `evolucao.test.ts`, `Hoje.tsx`, `package.json`, `inatividade.ts`, `Presencial.tsx`, `Aviso`, `App.tsx`, `acoes.ts`, `acoes.ts`, `EditorMeso.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `relatorio.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._