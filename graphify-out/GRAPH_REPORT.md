# Graph Report - claude-cloud-celli  (2026-10-20)

## Corpus Check
- 264 files · ~241,083 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2031 nodes · 5639 edges · 128 communities (113 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 236 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a2e5586f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- InicioAluno.tsx
- evolucao.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- alertas.ts
- vigia.test.ts
- App.tsx
- TabMetodos.tsx
- MinhaConta.tsx
- calcularAlertas.ts
- relatorio.spec.ts
- push.ts
- Alunos.tsx
- ContaAluno.tsx
- icones.tsx
- acoes.ts
- prescreverSessao
- Treino.tsx
- Árvore por pasta
- prints.spec.ts
- descanso.ts
- criarCoach
- jwt.ts
- Peças
- sugestao.ts
- AvisoIOS
- Onde fica cada coisa
- relatorio.ts
- engine/index.ts
- settings.json
- CardioHoje
- ui.tsx
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- TabDivisao.tsx
- cartaoStory.ts
- Segurança — passos do Victor no console
- ref_node_fs
- validar.ts
- AlunoApp.tsx
- pwa-assets.config.ts
- devDependencies
- useLista
- ehRecorde
- metricas.ts
- src/acesso.ts
- compilerOptions
- diaSP
- Plano — App da Gislane (segunda marca)
- criarMeso
- package.json
- scripts
- Alertas.tsx
- criarAluno
- @playwright/test
- evolucao.test.ts
- Motion / Framer Motion Examples
- Plano — Entrega 4: registro de erros e segurança
- PainelEvolucao.tsx
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- src/index.ts
- aluno-exemplo.test.ts
- limpeza-lgpd.test.ts
- marcas_vfit_marca
- Descanso
- vitest
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- marca.test.ts
- importar-meso.mjs
- Cartao
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- overrides
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- motion
- firebase-admin
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
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- evolucao.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- varredura.spec.ts
- Notificações: mensalidade e treino pronto (13/10/2026)
- conversores.ts
- vitest

## God Nodes (most connected - your core abstractions)
1. `Botao()` - 79 edges
2. `Treino()` - 67 edges
3. `Pontos sensíveis (leia antes de auditar ou mexer)` - 67 edges
4. `vitest` - 57 edges
5. `react` - 51 edges
6. `prescreverSessao()` - 50 edges
7. `Meso` - 47 edges
8. `Cartao()` - 46 edges
9. `firebase` - 37 edges
10. `useLista()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `Divisão (agentes Sonnet; ninguém no mesmo arquivo)` --references--> `registros()`  [INFERRED]
  docs/plano-volume.md → e2e/prints.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``tools/` — Scripts offline` --references--> `Meso`  [INFERRED]
  docs/mapa.md → src/engine/tipos.ts
- ``src/features/conta/` — Minha Conta` --references--> `ContaAluno()`  [INFERRED]
  docs/mapa.md → src/features/aluno/ContaAluno.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx

## Import Cycles
- None detected.

## Communities (128 total, 15 thin omitted)

### Community 0 - "InicioAluno.tsx"
Cohesion: 0.17
Nodes (24): `src/features/aluno/` — App do aluno, `src/` — Raiz, Peças compartilhadas (já no código), Avatar(), iniciais(), InicioAluno(), Msg(), Quadros() (+16 more)

### Community 1 - "evolucao.ts"
Cohesion: 0.15
Nodes (26): `src/lib/` — Firestore, estado, cálculos com dados, arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+18 more)

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

### Community 6 - "planilha.ts"
Cohesion: 0.09
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaMesoFalsa() (+32 more)

### Community 7 - "alertas.ts"
Cohesion: 0.14
Nodes (20): AvisoReps(), ARQUIVADO_DIAS, arquivadosVencidos(), DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS (+12 more)

### Community 8 - "vigia.test.ts"
Cohesion: 0.22
Nodes (4): app, auth, COLECOES, db

### Community 9 - "App.tsx"
Cohesion: 0.13
Nodes (37): firebase, react, ativaAba(), Menu(), PerfilDemora(), Principal(), SemAcesso(), useSair() (+29 more)

### Community 10 - "TabMetodos.tsx"
Cohesion: 0.15
Nodes (15): CampoNum(), ESCOPOS, FiltroSelect(), LinhaMetodo(), METODOS, padrao(), Selecao(), TabMetodos() (+7 more)

### Community 11 - "MinhaConta.tsx"
Cohesion: 0.06
Nodes (54): uqr, Vigia(), sairAgora(), trocarSenha(), Entrar(), enviar(), voltar(), DuasEtapas() (+46 more)

### Community 12 - "calcularAlertas.ts"
Cohesion: 0.14
Nodes (15): AlertaAbaixo, AlertaAcima, AlertaDemorado, calcularAlertas(), chavesAtuais(), Grupos, agora, alunos (+7 more)

### Community 13 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 14 - "push.ts"
Cohesion: 0.23
Nodes (20): Pontos sensíveis (leia antes de auditar ou mexer), AvisoDescanso(), agendarPush(), avisarTreinoPronto(), avisosCoachLigados(), avisosLigados(), b64uParaBytes(), BASE (+12 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.08
Nodes (42): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+34 more)

### Community 16 - "ContaAluno.tsx"
Cohesion: 0.13
Nodes (24): permissao(), Chave(), ContaAluno(), escolherFoto(), desde(), Linha(), Mensalidade(), Peso() (+16 more)

### Community 17 - "icones.tsx"
Cohesion: 0.20
Nodes (20): `src/features/instalar/` — PWA/Android, FolhaIPhone(), Linha(), copiarLink(), eAndroid(), eIOS(), EventoInstalar, IconeCompartilhar() (+12 more)

### Community 18 - "acoes.ts"
Cohesion: 0.09
Nodes (50): mensagemErro(), NovoAluno(), enviar(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+42 more)

### Community 19 - "prescreverSessao"
Cohesion: 0.13
Nodes (20): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+12 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.08
Nodes (56): `notas/{alunoId}`, metodoDoRotulo(), AvisoNotificacoes(), CONFETE, dur(), FimTreino(), Lista(), Hoje() (+48 more)

### Community 21 - "Árvore por pasta"
Cohesion: 0.06
Nodes (33): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 09/10/2026 (noite) — Animações e calendário automático, 09/10/2026 (noite) — Pix simples, 09/10/2026 — Segurança, movimento e aba Conta (+25 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (14): Regras gerais, ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES, PROIBIDO (+6 more)

### Community 23 - "descanso.ts"
Cohesion: 0.09
Nodes (26): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+18 more)

### Community 24 - "criarCoach"
Cohesion: 0.11
Nodes (19): ALUNO, COACH, PNG, COACH, ALUNO, COACH, ALUNO, COACH (+11 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "Peças"
Cohesion: 0.33
Nodes (5): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), treinosFeitos()

### Community 27 - "sugestao.ts"
Cohesion: 0.15
Nodes (18): ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano (+10 more)

### Community 28 - "AvisoIOS"
Cohesion: 0.83
Nodes (3): AvisoIOS(), iOS(), standalone()

### Community 29 - "Onde fica cada coisa"
Cohesion: 0.17
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+9 more)

### Community 30 - "relatorio.ts"
Cohesion: 0.14
Nodes (17): Evolucao, MesoEvolucao, arred(), cicloTerminou(), diasDesdeFim(), fimISO(), RELATORIO_DIAS, relatorioCiclo (+9 more)

### Community 31 - "engine/index.ts"
Cohesion: 0.27
Nodes (12): linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica(), reduzirVolume(), tempoPorSemana() (+4 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "CardioHoje"
Cohesion: 0.31
Nodes (8): Comandos e workflows, Mapa do Código — Força, Onde mexer para…, Rotas do app, CardioHoje(), desfazerCardio(), registrarCardio(), idCardio()

### Community 34 - "ui.tsx"
Cohesion: 0.10
Nodes (34): `src/features/privacidade/` — Política e Aceite, Logo(), BoasVindas(), deveMostrarBoasVindas(), ler(), marcarBoasVindasVistas(), VANTAGENS, erros (+26 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "seed.ts"
Cohesion: 0.17
Nodes (13): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+5 more)

### Community 38 - "TabDivisao.tsx"
Cohesion: 0.16
Nodes (16): `src/features/coach/` — App do coach, CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+8 more)

### Community 39 - "cartaoStory.ts"
Cohesion: 0.07
Nodes (66): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, BotaoCompartilhar(), clicar(), ajustar() (+58 more)

### Community 40 - "Segurança — passos do Victor no console"
Cohesion: 0.11
Nodes (17): 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h), Alertas automáticos (Vigia de segurança) (+9 more)

### Community 41 - "ref_node_fs"
Cohesion: 0.13
Nodes (10): ALUNO, COACH, ALUNO, marca, lerDoc(), ALUNO, COACH, marca (+2 more)

### Community 42 - "validar.ts"
Cohesion: 0.21
Nodes (14): fetch(), PROJETOS, Aviso, bytesOk(), hostOk(), HOSTS, nomeDO(), auth (+6 more)

### Community 43 - "AlunoApp.tsx"
Cohesion: 0.11
Nodes (24): Coach(), COR_METODO, METODOS, ORDEM, Metodo, AlunoApp(), marcarVisto(), PASSOS (+16 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "useLista"
Cohesion: 0.30
Nodes (13): Aluno(), Barra(), Folha(), Grupo(), lerGrupo(), Membro(), padrao(), primeiro() (+5 more)

### Community 49 - "metricas.ts"
Cohesion: 0.30
Nodes (13): `registros/{regId}`, 7. Teste de ataques (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros() (+5 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.24
Nodes (11): acessoComCache(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento(), AGORA (+3 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "diaSP"
Cohesion: 0.18
Nodes (18): SemanaCarregada(), diaSP(), cargaVolta(), comVolta(), dataDe(), Dia, DIAS_AUTO, diasDaSemana() (+10 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "criarMeso"
Cohesion: 0.15
Nodes (9): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, meso(), prog (+1 more)

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "Alertas.tsx"
Cohesion: 0.12
Nodes (29): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+21 more)

### Community 58 - "criarAluno"
Cohesion: 0.18
Nodes (8): ALUNO, COACH, ALUNO, COACH, iniciarEConcluir(), seg(), semear(), criarAluno()

### Community 59 - "@playwright/test"
Cohesion: 0.15
Nodes (6): ALUNO, COACH, marca, CAINDO, COACH, @playwright/test

### Community 60 - "evolucao.test.ts"
Cohesion: 0.17
Nodes (14): painelEvolucao(), RegistroEvolucao, agora, dia(), emSemana(), feito(), linha, m1 (+6 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 65 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 66 - "PainelEvolucao.tsx"
Cohesion: 0.18
Nodes (17): dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda(), Titulo() (+9 more)

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
Cohesion: 0.27
Nodes (6): cors(), ORIGENS, Env, Mensagem, MENSALIDADE, TREINO

### Community 74 - "aluno-exemplo.test.ts"
Cohesion: 0.20
Nodes (8): registroId(), AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "marcas_vfit_marca"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 77 - "Descanso"
Cohesion: 0.31
Nodes (4): CacheAcesso, Descanso, Inscricao, ParVapid

### Community 78 - "vitest"
Cohesion: 0.19
Nodes (12): `src/engine/` — Motor de cálculo puro (sem React/Firebase), mediana(), metaCiclo(), metaRobusta(), divisao, meso, Cargas, Registros (+4 more)

### Community 79 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.12
Nodes (16): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `fotos/{uid}`, `mesos/{mesoId}`, `relatorios/{mesoId}`, `usuarios/{uid}` (+8 more)

### Community 80 - "marca.test.ts"
Cohesion: 0.26
Nodes (8): seriesDestacadas(), seriesDoRotulo(), campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "Cartao"
Cohesion: 0.17
Nodes (22): AlvoVolume, Sessao, Preview(), AjustarVolume(), aplicar(), fmt(), num(), Previa (+14 more)

### Community 83 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.25
Nodes (7): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

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

### Community 91 - "motion"
Cohesion: 0.31
Nodes (6): motion, react-dom, App(), carregar(), Features, montar()

### Community 92 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

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

### Community 108 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 110 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

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

### Community 121 - "evolucao.spec.ts"
Cohesion: 0.40
Nodes (4): ALUNO, COACH, diasAtras(), semear()

### Community 136 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

### Community 137 - "conversores.ts"
Cohesion: 0.16
Nodes (16): Entregas, Onde fica cada coisa, arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docsParaRegistros() (+8 more)

### Community 139 - "vitest"
Cohesion: 0.20
Nodes (3): vitest, meso, base

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 813 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `InicioAluno.tsx`, `ataques.test.ts`, `planilha.ts`, `alertas.ts`, `vigia.test.ts`, `conversores.ts`, `TabMetodos.tsx`, `MinhaConta.tsx`, `calcularAlertas.ts`, `push.ts`, `Alunos.tsx`, `ContaAluno.tsx`, `acoes.ts`, `prescreverSessao`, `Árvore por pasta`, `descanso.ts`, `jwt.ts`, `sugestao.ts`, `Onde fica cada coisa`, `relatorio.ts`, `engine/index.ts`, `webpush.ts`, `TabDivisao.tsx`, `cartaoStory.ts`, `ref_node_fs`, `validar.ts`, `AlunoApp.tsx`, `ehRecorde`, `metricas.ts`, `src/acesso.ts`, `diaSP`, `package.json`, `evolucao.test.ts`, `PainelEvolucao.tsx`, `src/index.ts`, `aluno-exemplo.test.ts`, `limpeza-lgpd.test.ts`, `marcas_vfit_marca`, `vitest`, `marca.test.ts`, `Cartao`, `firebase-admin`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._
- **Why does `firebase` connect `App.tsx` to `InicioAluno.tsx`, `evolucao.ts`, `ui.tsx`, `PainelEvolucao.tsx`, `ataques.test.ts`, `cartaoStory.ts`, `MinhaConta.tsx`, `useLista`, `Alunos.tsx`, `ContaAluno.tsx`, `acoes.ts`, `Cartao`, `Treino.tsx`, `package.json`, `Alertas.tsx`, `evolucao.test.ts`, `relatorio.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 66 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `Menu()` and `Principal()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 66 INFERRED edges - model-reasoned connections that need verification._
- **Should `Lógica da planilha "Força 2027.1" — especificação do motor` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._