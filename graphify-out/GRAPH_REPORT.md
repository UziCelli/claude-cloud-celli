# Graph Report - claude-cloud-celli  (2026-11-09)

## Corpus Check
- 288 files · ~272,498 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2254 nodes · 6633 edges · 149 communities (132 shown, 17 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 307 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f72a3cbe`
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
- icones.tsx
- push.ts
- RelatorioCoach.tsx
- EditarTreino.tsx
- BoasVindas.tsx
- PainelEvolucao.tsx
- cartaoRelatorio.ts
- engine/index.ts
- Alunos.tsx
- Alertas.tsx
- SessaoCard.tsx
- relatorio.test.ts
- Segurança — passos do Victor no console
- Treino.tsx
- Botao
- prints.spec.ts
- ContaAluno.tsx
- FimTreino.tsx
- jwt.ts
- IconeMetodo
- Estado da sessão (retomada) — atualizado em 08/11/2026
- cartaoStory.ts
- vitest
- ui.tsx
- vfit/Logo.tsx
- settings.json
- @playwright/test
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- criarMeso
- TabDivisao.tsx
- sessao.ts
- iaTreino.ts
- src/index.ts
- MinhaConta.tsx
- Coleções Firestore
- devDependencies
- Onde fica cada coisa
- evolucao.ts
- firebase-admin
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- metricas.ts
- Plano — App da Gislane (segunda marca)
- sugestao.test.ts
- package.json
- scripts
- AlunoApp.tsx
- Presencial.tsx
- motion
- criarAluno
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- Botao
- MesosDoAluno.tsx
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- acoes.ts
- tentativas.ts
- limpeza-lgpd.test.ts
- hojeSaoPaulo
- Inicio.tsx
- criarMeso
- GuiaMetodos.tsx
- codigoPix
- importar-meso.mjs
- criarAluno
- Entrar
- overrides
- vidro.tsx
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- ref_node_fs
- BotaoCompartilhar
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
- Notificações: mensalidade e treino pronto (13/10/2026)
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
- Msg
- cardio.spec.ts
- TutorialCoach.tsx
- sugestao.test.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- App.tsx
- seriesDoRotulo
- Árvore por pasta
- Tutorial.tsx
- inatividade.ts
- src/index.ts
- AssistenteIA.tsx
- Aceite.tsx
- Plano — Entrega 4: registro de erros e segurança
- criarCoach
- voz-ia.spec.ts
- atualizar.ts
- Notificações: mensalidade e treino pronto (13/10/2026)
- cardio.spec.ts
- Nota

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 108 edges
2. `Botao()` - 87 edges
3. `Treino()` - 77 edges
4. `vitest` - 63 edges
5. `react` - 58 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 50 edges
8. `Cartao()` - 48 edges
9. `firebase` - 41 edges
10. `registrarErro()` - 41 edges

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

## Communities (149 total, 17 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.09
Nodes (26): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+18 more)

### Community 1 - "VozTreino.tsx"
Cohesion: 0.11
Nodes (23): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+15 more)

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
Cohesion: 0.09
Nodes (32): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+24 more)

### Community 7 - "icones.tsx"
Cohesion: 0.05
Nodes (82): Onde mexer para…, `src/features/aluno/` — App do aluno, `src/lib/` — Firestore, estado, cálculos com dados, Meso, CardioHoje(), AvisoReps(), Hoje(), Msg() (+74 more)

### Community 8 - "push.ts"
Cohesion: 0.18
Nodes (23): AvisoNotificacoes(), permissao(), AvisoDescanso(), IcSino, agendarPush(), avisarTreinoPronto(), avisosCoachLigados(), avisosLigados() (+15 more)

### Community 9 - "RelatorioCoach.tsx"
Cohesion: 0.22
Nodes (18): Bloco(), BotaoPdf(), Faixa(), Numero(), Relatorio(), RelatorioAluno(), RelatorioDoc, Editor() (+10 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.13
Nodes (26): adicionarExercicio(), adicionarMetodo(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+18 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (28): `src/features/instalar/` — PWA/Android, Logo(), BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+20 more)

### Community 12 - "PainelEvolucao.tsx"
Cohesion: 0.13
Nodes (33): firebase, Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto, VisaoSemana() (+25 more)

### Community 13 - "cartaoRelatorio.ts"
Cohesion: 0.15
Nodes (19): fmt(), C, H, W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), num() (+11 more)

### Community 14 - "engine/index.ts"
Cohesion: 0.27
Nodes (13): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+5 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.10
Nodes (37): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+29 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.11
Nodes (28): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+20 more)

### Community 17 - "SessaoCard.tsx"
Cohesion: 0.22
Nodes (11): Convenção de gravação (TOTAL), Cargas, Novidades(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard() (+3 more)

### Community 18 - "relatorio.test.ts"
Cohesion: 0.18
Nodes (8): MesoEvolucao, agora, linha, m0, m1, meso(), registros, slot()

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.10
Nodes (20): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+12 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.16
Nodes (23): Peças, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), hms(), Modal(), NotaMetodos() (+15 more)

### Community 21 - "Botao"
Cohesion: 0.17
Nodes (14): react, EvolucaoCoach(), agil, saida, suave, Barra(), camada, campoBase (+6 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.10
Nodes (9): ANTES, DIAS_AUTO, ids, marca, NOMES, PROIBIDO, T1, T2 (+1 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.14
Nodes (22): Chave(), ContaAluno(), escolherFoto(), desde(), Mensalidade(), escolher(), PixPerto(), dataCurta() (+14 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.19
Nodes (14): CONFETE, dur(), FimTreino(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+6 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "IconeMetodo"
Cohesion: 0.43
Nodes (4): dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 27 - "Estado da sessão (retomada) — atualizado em 08/11/2026"
Cohesion: 0.06
Nodes (28): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+20 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.23
Nodes (20): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), desenhar(), desenharTreino(), desenharTreinoFoto(), fundoELogo() (+12 more)

### Community 29 - "vitest"
Cohesion: 0.12
Nodes (22): vitest, dataPadrao(), formatarData(), textoVencimento(), diasParaVencer(), faltaSegundoFator(), fimDoDiaSaoPaulo(), Foto (+14 more)

### Community 30 - "ui.tsx"
Cohesion: 0.19
Nodes (12): agora, dia(), emSemana(), feito(), linha, m1, meso(), painel() (+4 more)

### Community 31 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "@playwright/test"
Cohesion: 0.12
Nodes (7): ALUNO, COACH, ALUNO, COACH, marca, CAINDO, COACH

### Community 34 - "conversores.ts"
Cohesion: 0.20
Nodes (11): Normalização de leitura (`normalizarCargas`), arred(), caminhoCarga(), docParaCargas(), docsParaRegistros(), lerPc(), normalizarCargas(), numeroOk() (+3 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.15
Nodes (14): ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta(), definirPagoAte(), gravarDoc() (+6 more)

### Community 38 - "criarMeso"
Cohesion: 0.13
Nodes (12): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, COACH, semear() (+4 more)

### Community 39 - "TabDivisao.tsx"
Cohesion: 0.19
Nodes (25): Registros, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+17 more)

### Community 40 - "sessao.ts"
Cohesion: 0.12
Nodes (20): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+12 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.14
Nodes (19): buscarExercicios(), itens, norm(), nomes(), acharPosicao(), corpoPedido(), doCatalogo, ExercicioProposto (+11 more)

### Community 42 - "src/index.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "MinhaConta.tsx"
Cohesion: 0.21
Nodes (18): DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), trocarEmail(), trocarSenha(), alterarEmail() (+10 more)

### Community 44 - "Coleções Firestore"
Cohesion: 0.10
Nodes (18): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `relatorios/{mesoId}` (+10 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.20
Nodes (16): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes, arred() (+8 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.12
Nodes (30): arred(), calcular(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao, Feito (+22 more)

### Community 48 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "metricas.ts"
Cohesion: 0.22
Nodes (15): `registros/{regId}`, 7. Teste de ataques (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros() (+7 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "sugestao.test.ts"
Cohesion: 0.18
Nodes (10): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), L, mesoCom(), nomes(), NOVE (+2 more)

### Community 55 - "package.json"
Cohesion: 0.17
Nodes (11): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+3 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "AlunoApp.tsx"
Cohesion: 0.26
Nodes (10): AlunoApp(), Tutorial(), tutorialNaoVisto(), EvolucaoAluno(), AvisoIOS(), iOS(), standalone(), naoVisto() (+2 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.17
Nodes (24): `src/` — Raiz, Coach(), Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo() (+16 more)

### Community 59 - "motion"
Cohesion: 0.31
Nodes (6): motion, react-dom, App(), carregar(), Features, montar()

### Community 61 - "Entrar.tsx"
Cohesion: 0.18
Nodes (17): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), erros, SENHA_FRACA (+9 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.21
Nodes (25): `src/engine/` — Motor de cálculo puro (sem React/Firebase), alternarSerieDropset(), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo (+17 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "Botao"
Cohesion: 0.15
Nodes (26): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), setSemanas(), estavel(), TITULO_ABA (+18 more)

### Community 65 - "MesosDoAluno.tsx"
Cohesion: 0.23
Nodes (18): mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), dataBr(), FormDuplicar(), confirmar(), MesosDoAluno() (+10 more)

### Community 66 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.12
Nodes (14): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma (+6 more)

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

### Community 73 - "acoes.ts"
Cohesion: 0.14
Nodes (26): Pontos sensíveis (leia antes de auditar ou mexer), FestaRecorde(), enviar(), FaixaAjustado(), cancelarTreino(), criarConta(), darAcessoAoApp(), importarMeso() (+18 more)

### Community 74 - "tentativas.ts"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "hojeSaoPaulo"
Cohesion: 0.14
Nodes (13): ALUNO, COACH, ALUNO, COACH, diasAtras(), semear(), ALUNO, COACH (+5 more)

### Community 77 - "Inicio.tsx"
Cohesion: 0.23
Nodes (18): `src/features/coach/` — App do coach, ativaAba(), Menu(), PIX, useAlertasCoach(), useArquivados(), calcularAlertas(), chavesAtuais() (+10 more)

### Community 78 - "criarMeso"
Cohesion: 0.19
Nodes (9): ALUNO, meso(), prog, ALUNO, COACH, diaISO(), diasAtras(), semear() (+1 more)

### Community 79 - "GuiaMetodos.tsx"
Cohesion: 0.50
Nodes (5): trocarSenha(), EsqueciSenha(), enviar(), mensagemRecuperar(), recuperarSenha()

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "criarAluno"
Cohesion: 0.13
Nodes (10): COACH, ALUNO, COACH, PNG, COACH, COACH, ALUNO, COACH (+2 more)

### Community 83 - "Entrar"
Cohesion: 0.20
Nodes (16): Entrar(), enviar(), voltar(), mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar(), resolverMfa() (+8 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "vidro.tsx"
Cohesion: 0.24
Nodes (15): Peças compartilhadas (já no código), Linha(), Atalho, marcarVisto(), Onboarding(), Passo, Pronto(), Icone (+7 more)

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
Cohesion: 0.11
Nodes (9): ALUNO, COACH, marca, arquivos(), RAIZ, app, auth, COLECOES (+1 more)

### Community 91 - "BotaoCompartilhar"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 92 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.57
Nodes (4): mediana(), metaCiclo(), metaRobusta(), Monitoramento()

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

### Community 108 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.31
Nodes (7): COR_METODO, METODOS, ORDEM, Metodo, Rascunho, desenhos(), loop()

### Community 110 - "vitest"
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

### Community 119 - "Msg"
Cohesion: 0.25
Nodes (16): Peso(), NovoAluno(), enviar(), ImportarPlanilha(), escolher(), trocarAba(), Previa(), DarAcesso() (+8 more)

### Community 120 - "cardio.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "TutorialCoach.tsx"
Cohesion: 0.28
Nodes (16): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+8 more)

### Community 122 - "sugestao.test.ts"
Cohesion: 0.24
Nodes (14): slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm() (+6 more)

### Community 134 - "App.tsx"
Cohesion: 0.26
Nodes (14): PerfilDemora(), Principal(), SemAcesso(), sairAgora(), BotaoSair(), useSair(), sairAgora(), IcSair (+6 more)

### Community 136 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+7 more)

### Community 137 - "Tutorial.tsx"
Cohesion: 0.33
Nodes (13): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+5 more)

### Community 138 - "inatividade.ts"
Cohesion: 0.26
Nodes (11): Vigia(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, marcar() (+3 more)

### Community 139 - "src/index.ts"
Cohesion: 0.21
Nodes (8): CacheAcesso, cors(), ORIGENS, Env, Mensagem, MENSALIDADE, TREINO, Aviso

### Community 140 - "AssistenteIA.tsx"
Cohesion: 0.39
Nodes (10): AssistenteIA(), remover(), salvar(), apagarChaveIA(), chaveMascarada(), chaveValida(), ERROS_HTTP, refChave() (+2 more)

### Community 141 - "Aceite.tsx"
Cohesion: 0.32
Nodes (10): Aceite(), continuar(), esqueci(), erroSenha(), CaixaAceite(), Lista(), Politica(), Secao() (+2 more)

### Community 142 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 143 - "criarCoach"
Cohesion: 0.24
Nodes (7): ALUNO, COACH, iniciarEConcluir(), seg(), semear(), criarCoach(), dispensarMfa()

### Community 145 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 146 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

### Community 148 - "Nota"
Cohesion: 1.00
Nodes (3): `notas/{alunoId}`, Nota(), salvarNota()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 854 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `descanso.ts`, `ataques.test.ts`, `planilha.ts`, `icones.tsx`, `seriesDoRotulo`, `RelatorioCoach.tsx`, `EditarTreino.tsx`, `src/index.ts`, `inatividade.ts`, `cartaoRelatorio.ts`, `engine/index.ts`, `Alunos.tsx`, `Alertas.tsx`, `atualizar.ts`, `relatorio.test.ts`, `Treino.tsx`, `Botao`, `ContaAluno.tsx`, `jwt.ts`, `IconeMetodo`, `Estado da sessão (retomada) — atualizado em 08/11/2026`, `cartaoStory.ts`, `ui.tsx`, `conversores.ts`, `webpush.ts`, `TabDivisao.tsx`, `sessao.ts`, `iaTreino.ts`, `src/index.ts`, `MinhaConta.tsx`, `push.ts`, `Onde fica cada coisa`, `firebase-admin`, `src/acesso.ts`, `metricas.ts`, `sugestao.test.ts`, `package.json`, `Entrar.tsx`, `TabMetodos.tsx`, `Botao`, `limpeza-lgpd.test.ts`, `codigoPix`, `Entrar`, `ref_node_fs`, `BotaoCompartilhar`, `Plano — Painel de Evolução (03/10/2026)`, `vitest`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Are the 107 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 107 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `descanso.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09032258064516129 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `acoes.ts` to `App.tsx`, `icones.tsx`, `seriesDoRotulo`, `RelatorioCoach.tsx`, `inatividade.ts`, `EditarTreino.tsx`, `PainelEvolucao.tsx`, `Aceite.tsx`, `push.ts`, `Alunos.tsx`, `SessaoCard.tsx`, `Treino.tsx`, `Botao`, `ContaAluno.tsx`, `FimTreino.tsx`, `Estado da sessão (retomada) — atualizado em 08/11/2026`, `cartaoStory.ts`, `vitest`, `conversores.ts`, `TabDivisao.tsx`, `sessao.ts`, `iaTreino.ts`, `MinhaConta.tsx`, `Coleções Firestore`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `metricas.ts`, `AlunoApp.tsx`, `Presencial.tsx`, `Entrar.tsx`, `TabMetodos.tsx`, `Botao`, `MesosDoAluno.tsx`, `Inicio.tsx`, `vidro.tsx`, `cardio.spec.ts`, `sugestao.test.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `VozTreino.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11264367816091954 - nodes in this community are weakly interconnected._