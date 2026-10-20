# Graph Report - claude-cloud-celli  (2026-10-20)

## Corpus Check
- 264 files · ~240,328 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2028 nodes · 5616 edges · 138 communities (123 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 232 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `316ec124`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cartaoRelatorio.ts
- evolucao.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- Hoje.tsx
- ui.tsx
- acoes.ts
- TabMetodos.tsx
- Entrar.tsx
- Alertas.tsx
- alertas.ts
- push.ts
- Alunos.tsx
- ContaAluno.tsx
- icones.tsx
- MesosDoAluno.tsx
- Inicio.tsx
- Treino.tsx
- Estado da sessão (retomada) — atualizado em 13/10/2026
- prints.spec.ts
- descanso.ts
- criarCoach
- jwt.ts
- registrarErro
- prescreverSessao
- lib/acesso.ts
- Onde fica cada coisa
- relatorio.ts
- engine/index.ts
- settings.json
- Coleções Firestore
- App.tsx
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- TabDivisao.tsx
- cartaoStory.ts
- Segurança — passos do Victor no console
- vigia.test.ts
- validar.ts
- notasMetodo.ts
- VisaoSemana.tsx
- devDependencies
- useLista
- EditorMeso.tsx
- Árvore por pasta
- metricas.ts
- src/acesso.ts
- compilerOptions
- InicioAluno.tsx
- Plano — App da Gislane (segunda marca)
- criarMeso
- package.json
- scripts
- Pontos sensíveis (leia antes de auditar ou mexer)
- ref_node_fs
- @playwright/test
- evolucao.test.ts
- vfit/Logo.tsx
- FimTreino.tsx
- Motion / Framer Motion Examples
- ImportarPlanilha.tsx
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
- criarAluno
- Descanso
- vitest
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- marca.test.ts
- importar-meso.mjs
- SessaoCard.tsx
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- overrides
- Botao
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- Push do descanso (Entrega 3b)
- motion
- RankingAlunos.tsx
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
- relatorio.spec.ts
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- inscreverAvisos
- montarPdf
- evolucao.spec.ts
- seriesDoRotulo
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- varredura.spec.ts
- Plano — Painel de Evolução (03/10/2026)
- Notificações: mensalidade e treino pronto (13/10/2026)
- pwa-assets.config.ts

## God Nodes (most connected - your core abstractions)
1. `Botao()` - 79 edges
2. `Treino()` - 67 edges
3. `Pontos sensíveis (leia antes de auditar ou mexer)` - 63 edges
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

## Communities (138 total, 15 thin omitted)

### Community 0 - "cartaoRelatorio.ts"
Cohesion: 0.16
Nodes (22): C, H, W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), num(), periodoTexto() (+14 more)

### Community 1 - "evolucao.ts"
Cohesion: 0.15
Nodes (27): Peças, arred(), calcular(), cargasPositivas(), coletar(), conquistas(), diaInicio(), Feito (+19 more)

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
Nodes (32): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+24 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.14
Nodes (30): `src/lib/` — Firestore, estado, cálculos com dados, AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), IcCadeado, IcRaio, diaSP() (+22 more)

### Community 8 - "ui.tsx"
Cohesion: 0.13
Nodes (25): Logo(), react, Registros, EsqueciSenha(), enviar(), mensagemRecuperar(), GuiaMetodos(), Aceite() (+17 more)

### Community 9 - "acoes.ts"
Cohesion: 0.22
Nodes (19): firebase, BotaoPdf(), RelatorioAluno(), RelatorioDoc, Editor(), useDadosAluno(), liberarRelatorio(), recolherRelatorio() (+11 more)

### Community 10 - "TabMetodos.tsx"
Cohesion: 0.20
Nodes (11): CampoNum(), ESCOPOS, FiltroSelect(), LinhaMetodo(), METODOS, padrao(), Selecao(), TabMetodos() (+3 more)

### Community 11 - "Entrar.tsx"
Cohesion: 0.06
Nodes (57): uqr, Vigia(), trocarSenha(), Entrar(), enviar(), voltar(), erros, mensagemErro() (+49 more)

### Community 12 - "Alertas.tsx"
Cohesion: 0.17
Nodes (20): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+12 more)

### Community 13 - "alertas.ts"
Cohesion: 0.10
Nodes (22): agora, alunos, linha, meso, mesos, registros, ARQUIVADO_DIAS, arquivadosVencidos() (+14 more)

### Community 14 - "push.ts"
Cohesion: 0.22
Nodes (17): agendarPush(), avisosLigados(), b64uParaBytes(), BASE, cancelarPush(), chamar(), CHAVE_AVISOS, CHAVE_AVISOS_COACH (+9 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.15
Nodes (25): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+17 more)

### Community 16 - "ContaAluno.tsx"
Cohesion: 0.19
Nodes (16): Avatar(), iniciais(), Chave(), ContaAluno(), escolherFoto(), desde(), Linha(), escolher() (+8 more)

### Community 17 - "icones.tsx"
Cohesion: 0.09
Nodes (42): `src/features/instalar/` — PWA/Android, marcarVisto(), PASSOS, Selo(), Tutorial(), BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone() (+34 more)

### Community 18 - "MesosDoAluno.tsx"
Cohesion: 0.19
Nodes (23): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+15 more)

### Community 19 - "Inicio.tsx"
Cohesion: 0.32
Nodes (13): `src/features/coach/` — App do coach, PIX, useAlertasCoach(), useArquivados(), calcularAlertas(), chavesAtuais(), Inicio(), saudacao() (+5 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.10
Nodes (34): `notas/{alunoId}`, COR_METODO, metodoDoRotulo(), METODOS, ORDEM, Metodo, AvisoAdaptado(), CONFETE (+26 more)

### Community 21 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.11
Nodes (18): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 09/10/2026 (noite) — Animações e calendário automático, 09/10/2026 (noite) — Pix simples, 09/10/2026 — Segurança, movimento e aba Conta (+10 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (14): Regras gerais, ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES, PROIBIDO (+6 more)

### Community 23 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

### Community 24 - "criarCoach"
Cohesion: 0.11
Nodes (19): ALUNO, COACH, PNG, COACH, ALUNO, COACH, ALUNO, COACH (+11 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "registrarErro"
Cohesion: 0.19
Nodes (16): Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog(), Item (+8 more)

### Community 27 - "prescreverSessao"
Cohesion: 0.07
Nodes (41): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+33 more)

### Community 28 - "lib/acesso.ts"
Cohesion: 0.20
Nodes (12): faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento(), Usuario, AlunoComId, Sessao (+4 more)

### Community 29 - "Onde fica cada coisa"
Cohesion: 0.18
Nodes (18): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+10 more)

### Community 30 - "relatorio.ts"
Cohesion: 0.14
Nodes (17): Evolucao, RegistroEvolucao, arred(), cicloTerminou(), diasDesdeFim(), fimISO(), RELATORIO_DIAS, relatorioCiclo (+9 more)

### Community 31 - "engine/index.ts"
Cohesion: 0.18
Nodes (20): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica(), reduzirVolume() (+12 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "Coleções Firestore"
Cohesion: 0.18
Nodes (10): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `mesos/{mesoId}` (+2 more)

### Community 34 - "App.tsx"
Cohesion: 0.16
Nodes (29): `src/` — Raiz, App(), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+21 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.08
Nodes (22): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), [a, m, d], achados, b, db (+14 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "seed.ts"
Cohesion: 0.17
Nodes (13): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+5 more)

### Community 38 - "TabDivisao.tsx"
Cohesion: 0.17
Nodes (15): CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasPontuais() (+7 more)

### Community 39 - "cartaoStory.ts"
Cohesion: 0.23
Nodes (20): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), desenhar(), desenharTreino(), desenharTreinoFoto(), fundoELogo() (+12 more)

### Community 40 - "Segurança — passos do Victor no console"
Cohesion: 0.11
Nodes (17): 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h), Alertas automáticos (Vigia de segurança) (+9 more)

### Community 41 - "vigia.test.ts"
Cohesion: 0.15
Nodes (5): SCRIPTS, app, auth, COLECOES, db

### Community 42 - "validar.ts"
Cohesion: 0.21
Nodes (14): fetch(), PROJETOS, Aviso, bytesOk(), hostOk(), HOSTS, nomeDO(), auth (+6 more)

### Community 43 - "notasMetodo.ts"
Cohesion: 0.43
Nodes (4): dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 44 - "VisaoSemana.tsx"
Cohesion: 0.29
Nodes (11): Cargas, EvolucaoCoach(), fmt(), fmtData(), Monitoramento(), RegistroDocCompleto, VisaoSemana(), marcarRealizado() (+3 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "useLista"
Cohesion: 0.27
Nodes (15): Hoje(), Msg(), Aluno(), Barra(), Folha(), Grupo(), lerGrupo(), Membro() (+7 more)

### Community 47 - "EditorMeso.tsx"
Cohesion: 0.21
Nodes (16): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setFrequencia(), setSemanas() (+8 more)

### Community 48 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/engine/` — Motor de cálculo puro (sem React/Firebase), `src/features/auth/` — Autenticação (+7 more)

### Community 49 - "metricas.ts"
Cohesion: 0.32
Nodes (12): `registros/{regId}`, 7. Teste de ataques (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros() (+4 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.24
Nodes (11): acessoComCache(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento(), AGORA (+3 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "InicioAluno.tsx"
Cohesion: 0.13
Nodes (34): Onde mexer para…, `src/features/aluno/` — App do aluno, Peças compartilhadas (já no código), CardioHoje(), InicioAluno(), Msg(), Quadros(), RelatorioPronto() (+26 more)

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

### Community 57 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.12
Nodes (20): Pontos sensíveis (leia antes de auditar ou mexer), FestaRecorde(), cancelarTreino(), arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas() (+12 more)

### Community 58 - "ref_node_fs"
Cohesion: 0.13
Nodes (10): ALUNO, COACH, ALUNO, marca, lerDoc(), ALUNO, COACH, marca (+2 more)

### Community 59 - "@playwright/test"
Cohesion: 0.15
Nodes (6): ALUNO, COACH, marca, CAINDO, COACH, @playwright/test

### Community 60 - "evolucao.test.ts"
Cohesion: 0.17
Nodes (14): MesoEvolucao, painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1 (+6 more)

### Community 61 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 62 - "FimTreino.tsx"
Cohesion: 0.22
Nodes (12): CONFETE, dur(), FimTreino(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+4 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "ImportarPlanilha.tsx"
Cohesion: 0.24
Nodes (12): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), filtrarMetodos(), FiltroMetodos, nomeImportado() (+4 more)

### Community 65 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 66 - "PainelEvolucao.tsx"
Cohesion: 0.23
Nodes (12): dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda(), Titulo() (+4 more)

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
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarAluno"
Cohesion: 0.18
Nodes (8): ALUNO, COACH, ALUNO, COACH, iniciarEConcluir(), seg(), semear(), criarAluno()

### Community 77 - "Descanso"
Cohesion: 0.31
Nodes (4): CacheAcesso, Descanso, Inscricao, ParVapid

### Community 78 - "vitest"
Cohesion: 0.18
Nodes (7): vitest, mediana(), metaCiclo(), metaRobusta(), divisao, meso, meso

### Community 79 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.20
Nodes (9): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam (+1 more)

### Community 80 - "marca.test.ts"
Cohesion: 0.17
Nodes (11): arquivos(), chaves(), PROIBIDOS, semPix(), VARS, campo(), codigoPix(), crc16() (+3 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "SessaoCard.tsx"
Cohesion: 0.23
Nodes (13): Preview(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcCheck, registrarCarga() (+5 more)

### Community 83 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.25
Nodes (7): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Botao"
Cohesion: 0.38
Nodes (8): Mensalidade(), Peso(), dataCurta(), PagarPix(), reais(), informarPagamento(), Botao(), Msg()

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 90 - "Push do descanso (Entrega 3b)"
Cohesion: 0.29
Nodes (6): Como funciona, Limites do plano grátis (Cloudflare), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 91 - "motion"
Cohesion: 0.32
Nodes (5): motion, react-dom, carregar(), Features, montar()

### Community 92 - "RankingAlunos.tsx"
Cohesion: 0.36
Nodes (7): Aba, ABAS, freq(), MEDALHA, RankingAlunos(), IcMedalha, Pagina()

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
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 110 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

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

### Community 119 - "inscreverAvisos"
Cohesion: 0.57
Nodes (6): AvisoNotificacoes(), permissao(), AvisoDescanso(), IcSino, avisosCoachLigados(), inscreverAvisos()

### Community 120 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 121 - "evolucao.spec.ts"
Cohesion: 0.40
Nodes (4): ALUNO, COACH, diasAtras(), semear()

### Community 135 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 136 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 815 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `cartaoRelatorio.ts`, `ataques.test.ts`, `planilha.ts`, `Hoje.tsx`, `Entrar.tsx`, `alertas.ts`, `push.ts`, `ContaAluno.tsx`, `Treino.tsx`, `descanso.ts`, `jwt.ts`, `registrarErro`, `prescreverSessao`, `lib/acesso.ts`, `Onde fica cada coisa`, `relatorio.ts`, `engine/index.ts`, `webpush.ts`, `TabDivisao.tsx`, `cartaoStory.ts`, `vigia.test.ts`, `validar.ts`, `notasMetodo.ts`, `metricas.ts`, `src/acesso.ts`, `InicioAluno.tsx`, `package.json`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `ref_node_fs`, `evolucao.test.ts`, `ImportarPlanilha.tsx`, `src/index.ts`, `aluno-exemplo.test.ts`, `limpeza-lgpd.test.ts`, `marca.test.ts`, `SessaoCard.tsx`, `montarPdf`, `seriesDoRotulo`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `evolucao.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14814814814814814 - nodes in this community are weakly interconnected._
- **Why does `firebase` connect `acoes.ts` to `evolucao.ts`, `ataques.test.ts`, `Hoje.tsx`, `ui.tsx`, `Entrar.tsx`, `Alertas.tsx`, `Alunos.tsx`, `ContaAluno.tsx`, `MesosDoAluno.tsx`, `Inicio.tsx`, `Treino.tsx`, `registrarErro`, `lib/acesso.ts`, `relatorio.ts`, `App.tsx`, `VisaoSemana.tsx`, `useLista`, `EditorMeso.tsx`, `InicioAluno.tsx`, `package.json`, `evolucao.test.ts`, `PainelEvolucao.tsx`, `SessaoCard.tsx`, `RankingAlunos.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Are the 62 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `Menu()` and `Principal()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 62 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._