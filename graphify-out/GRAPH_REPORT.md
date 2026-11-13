# Graph Report - claude-cloud-celli  (2026-11-13)

## Corpus Check
- 380 files · ~394,537 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3591 nodes · 10320 edges · 181 communities (165 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 478 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f5c277ae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- limparEmuladores
- FisioCoach.tsx
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
- avaliacao.ts
- TabMetodos.tsx
- util.ts
- engine/index.ts
- Inicio.tsx
- steps
- env
- Segurança — passos do Victor no console
- alertas.ts
- App.tsx
- prints.spec.ts
- CampoExercicio
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
- avisos-pagamento.mjs
- aluno-exemplo.mjs
- webpush.ts
- Alunos.tsx
- tutorial.spec.ts
- firebase-admin
- Treino.tsx
- iaTreino.ts
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- Presencial.tsx
- evolucao.ts
- with
- lib/acesso.ts
- src/acesso.ts
- compilerOptions
- PainelEvolucao.tsx
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- sugestoesFisio.ts
- push.ts
- steps
- inscreverAvisos
- SessaoCard.tsx
- pix.ts
- Motion / Framer Motion Examples
- ContaAluno.tsx
- EnviarFeedback.tsx
- dor.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- GuiaFisio.tsx
- steps
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- ui.tsx
- fetch
- push.yml
- criarCoach
- importar-meso.mjs
- Onde fica cada coisa
- with
- overrides
- Tutorial.tsx
- relatorio.spec.ts
- layout.spec.ts
- Performance Optimization
- limpeza-lgpd.mjs
- rules.test.ts
- registrarErro
- progressaoFisio.ts
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- cartaoDepoimento.ts
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
- Botao
- AvisoAtraso.tsx
- conversores.ts
- anamnese.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- MinhaConta.tsx
- pdfRelatorio.ts
- AvaliacaoCoach.tsx
- saude.yml
- src/index.ts
- icones.tsx
- cartaoRelatorio.ts
- @playwright/test
- 12/11/2026 — orientação individual dos métodos
- src/ia.ts
- Árvore por pasta
- PainelEvolucao.tsx
- 5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)
- AcaoEmail.tsx
- limpeza
- marca
- sugestao.test.ts
- env
- Coleções Firestore
- steps
- descanso.ts
- limpeza-lgpd.yml
- coach.spec.ts
- with
- sair.spec.ts
- preparar
- criarRegistro
- firebase-admin
- feedback.spec.ts
- Físio — articulações e músculos de cada exercício (para o Victor conferir)
- aluno-exemplo.test.ts
- prescreverSessao
- Pesquisa — Delimitação de volume adequado, lesão e dor (o que a literatura diz)
- anatomia.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- GuiaMetodos.tsx
- pwa-assets.config.ts
- fmtMin
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- Push do descanso (Entrega 3b)
- notasMetodo.ts
- fisio-rules.test.ts
- Físio — proposta A1: cruzar o treino real com as sugestões
- Plano — Painel de Evolução (03/10/2026)
- varredura.spec.ts
- seriesDoRotulo

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 160 edges
2. `Botao()` - 145 edges
3. `Treino()` - 93 edges
4. `react` - 90 edges
5. `vitest` - 81 edges
6. ``src/lib/` — Firestore, estado, cálculos com dados` - 65 edges
7. `firebase` - 61 edges
8. `useLista()` - 61 edges
9. `Aviso()` - 61 edges
10. `prescreverSessao()` - 60 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- `Contexto` --references--> `polimento()`  [INFERRED]
  docs/plano-fisio.md → src/engine/volume.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx

## Import Cycles
- None detected.

## Communities (181 total, 16 thin omitted)

### Community 0 - "limparEmuladores"
Cohesion: 0.15
Nodes (12): ALUNO, COACH, dia(), meso(), semear(), w, ALUNO, COACH (+4 more)

### Community 1 - "FisioCoach.tsx"
Cohesion: 0.08
Nodes (68): METODOS_FISIO, checkinJaExiste(), enviarOrientacao(), marcarDorVista(), recolherOrientacao(), registrarCheckin(), relatarSinalFisio(), responderDor() (+60 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.13
Nodes (15): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+7 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.06
Nodes (29): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+21 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "lib/planilha.test.ts"
Cohesion: 0.09
Nodes (33): abaAntigaFalsa(), abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc (+25 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.14
Nodes (28): AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), diaCurto(), quando(), IcCadeado (+20 more)

### Community 8 - "engine/index.ts"
Cohesion: 0.10
Nodes (36): AlvoVolume, ajustarSeries(), analisarProgressao(), AnaliseProgressao, aplicar(), CURVA_EXP, FormaProgressao, fracaoPolimento() (+28 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.12
Nodes (15): doAluno(), PARQ_NAO, ALUNO, COACH, ANAMNESE_MINIMA, criarAluno(), criarAlunoAguardando(), criarAlunoArquivado() (+7 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.15
Nodes (29): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+21 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.06
Nodes (58): AvaliacoesCoach(), useAvaliacoesDoAluno(), Avaliacao, BIO, Ciclo, corteAvaliacoes(), dataBR(), DESCE (+50 more)

### Community 13 - "TabMetodos.tsx"
Cohesion: 0.17
Nodes (30): 1. Configuração do mesociclo, `mesos/{mesoId}`, `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo (+22 more)

### Community 14 - "util.ts"
Cohesion: 0.15
Nodes (29): Registros, Slot, CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar() (+21 more)

### Community 15 - "engine/index.ts"
Cohesion: 0.15
Nodes (28): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+20 more)

### Community 16 - "Inicio.tsx"
Cohesion: 0.08
Nodes (55): AnamneseAluno(), apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach (+47 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (22): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+14 more)

### Community 20 - "alertas.ts"
Cohesion: 0.08
Nodes (32): Proposta em 3 passos (do mais seguro ao maior), AlertaAbaixo, AlertaAcima, AlertaDemorado, Grupos, Reg, agora, alunos (+24 more)

### Community 21 - "App.tsx"
Cohesion: 0.11
Nodes (41): `src/` — Raiz, ativaAba(), Coach(), Menu(), PerfilDemora(), pedir(), Principal(), SemAcesso() (+33 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.06
Nodes (20): Critério do Victor (13/11/2026): progressão demasiada × dor, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ALUNO, COACH, marca, ANTES, DIAS_AUTO, diasAtras() (+12 more)

### Community 23 - "CampoExercicio"
Cohesion: 0.42
Nodes (6): SeletorExercicios(), buscarExercicios(), itens, norm(), nomes(), campoBase

### Community 24 - "FimTreino.tsx"
Cohesion: 0.23
Nodes (12): CONFETE, dur(), FimTreino(), escolher(), Lista(), limitar(), IcCamera, IcSubir (+4 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "vitest"
Cohesion: 0.10
Nodes (17): vitest, mediana(), metaCiclo(), metaRobusta(), divisao, meso, igual(), Linhas (+9 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (41): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+33 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.17
Nodes (23): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), caixa(), carregarImagem() (+15 more)

### Community 29 - "Entrar.tsx"
Cohesion: 0.11
Nodes (31): 11/11/2026 — Entrada do aluno: senha e termos sem laço, Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp() (+23 more)

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

### Community 34 - "avisos-pagamento.mjs"
Cohesion: 0.25
Nodes (11): diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia(), pedeTreino(), PROJETOS (+3 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.08
Nodes (22): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), [a, m, d], achados, b, db (+14 more)

### Community 36 - "webpush.ts"
Cohesion: 0.18
Nodes (16): RFC-8188, RFC-8292, b64u(), juntar(), assinar(), criptografar(), Efemera, enviarPush() (+8 more)

### Community 37 - "Alunos.tsx"
Cohesion: 0.12
Nodes (29): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+21 more)

### Community 38 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 39 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 40 - "Treino.tsx"
Cohesion: 0.12
Nodes (34): Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, nadaPassaDaTela(), metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde() (+26 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.06
Nodes (56): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+48 more)

### Community 42 - "src/index.ts"
Cohesion: 0.14
Nodes (23): deb64u(), Aviso, bytesOk(), hostOk(), HOSTS, MAX_APARELHOS, nomeAgenda(), nomeCoaches() (+15 more)

### Community 43 - "steps"
Cohesion: 0.06
Nodes (30): description, required, ALUNO, MESO, NOME, SA, if, runs-on (+22 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.10
Nodes (19): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @tailwindcss/vite (+11 more)

### Community 46 - "Presencial.tsx"
Cohesion: 0.16
Nodes (21): Avatar(), iniciais(), Hoje(), Msg(), Aluno(), Barra(), EscolherAluno(), Grupo() (+13 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.06
Nodes (50): Peças, arred(), calcular(), cargasPositivas(), coletar(), conquistas(), diaInicio(), Evolucao (+42 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "lib/acesso.ts"
Cohesion: 0.18
Nodes (17): CARENCIA_DIAS, diaSP(), diasParaVencer(), emAtraso(), faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado() (+9 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.22
Nodes (15): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+7 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "PainelEvolucao.tsx"
Cohesion: 0.13
Nodes (21): BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao, dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa() (+13 more)

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
Nodes (22): SinalProgressao, diaDe(), Entrada, ev(), Gatilho, gatilhosConversar(), gatilhosPolimento(), gatilhosProgressao() (+14 more)

### Community 58 - "push.ts"
Cohesion: 0.18
Nodes (21): agendarPush(), avisarTreinoPronto(), AVISOS_ALUNO, b64uParaBytes(), BASE, cabecalhosPush(), cancelarPush(), chamar() (+13 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "inscreverAvisos"
Cohesion: 0.35
Nodes (9): AvisoNotificacoes(), permissao(), ChavesAvisos(), NotificacoesCoach(), IcSino, avisosDesligados(), inscreverAvisos(), TipoAviso (+1 more)

### Community 61 - "SessaoCard.tsx"
Cohesion: 0.18
Nodes (19): `notas/{alunoId}`, Nota(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcLixeira (+11 more)

### Community 62 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "ContaAluno.tsx"
Cohesion: 0.21
Nodes (17): `src/features/conta/` — Minha Conta, AvisoDescanso(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde(), Linha() (+9 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.10
Nodes (41): Onde mexer para…, Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), useFeedbacks() (+33 more)

### Community 66 - "dor.ts"
Cohesion: 0.17
Nodes (21): `fisioDores/{id automático}` (Etapa 3, 12/11/2026), relatarDor(), chip(), RelatarDor(), ROTULO_LOCAL, vazio(), IcFisio, ArticulacaoId (+13 more)

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

### Community 73 - "GuiaFisio.tsx"
Cohesion: 0.15
Nodes (19): ALERTA_GERAL, ALERTA_LOMBAR, ALERTA_TENDAO, AVISO_FISIO, linkPubmed(), MetodoFisio, Nivel, opcional() (+11 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "Alertas.tsx"
Cohesion: 0.11
Nodes (40): `src/features/coach/` — App do coach, `src/lib/` — Firestore, estado, cálculos com dados, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), linkBtn (+32 more)

### Community 76 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.17
Nodes (11): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026), Respostas do Victor (+3 more)

### Community 77 - "ui.tsx"
Cohesion: 0.08
Nodes (28): `src/features/privacidade/` — Política e Aceite, Logo(), motion, react, App(), QrCadastro(), Aceite(), aceitar() (+20 more)

### Community 78 - "fetch"
Cohesion: 0.14
Nodes (13): CacheAcesso, Descanso, fetch(), alvosDe(), comAparelho(), endpointOk(), Fixa, inicioDoDiaBrasilia() (+5 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "criarCoach"
Cohesion: 0.09
Nodes (16): COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, PNG (+8 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "Onde fica cada coisa"
Cohesion: 0.17
Nodes (19): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+11 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Tutorial.tsx"
Cohesion: 0.12
Nodes (37): react-dom, Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+29 more)

### Community 86 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 87 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "limpeza-lgpd.mjs"
Cohesion: 0.20
Nodes (8): assinarJwt(), base64url(), auth, corte, db, esquecerNoWorker(), projeto, PROJETOS

### Community 90 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 91 - "registrarErro"
Cohesion: 0.21
Nodes (16): Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog(), Item (+8 more)

### Community 92 - "progressaoFisio.ts"
Cohesion: 0.12
Nodes (19): RegistroDoc, cargaMax(), DIF_REPS, proporcao(), PROPORCAO_SERIES, RegistroProgressao, SALTO_FATOR, Serie (+11 more)

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

### Community 100 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.16
Nodes (12): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, hoje (+4 more)

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

### Community 108 - "cartaoDepoimento.ts"
Cohesion: 0.23
Nodes (11): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), H, pngDe(), W (+3 more)

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

### Community 119 - "Botao"
Cohesion: 0.08
Nodes (71): NovoAluno(), enviar(), Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar() (+63 more)

### Community 120 - "AvisoAtraso.tsx"
Cohesion: 0.19
Nodes (18): `src/features/aluno/` — App do aluno, AvisoAtraso(), chave(), jaViu(), Mensalidade(), PixPopup(), dataSP(), DIAS_CURTO (+10 more)

### Community 121 - "conversores.ts"
Cohesion: 0.17
Nodes (18): arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps, docsParaRegistros(), docsParaRegistrosReps() (+10 more)

### Community 122 - "anamnese.spec.ts"
Cohesion: 0.24
Nodes (8): confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder()

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.07
Nodes (48): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), ARTE (+40 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.17
Nodes (20): 09/10/2026 — Segurança, movimento e aba Conta, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail() (+12 more)

### Community 136 - "pdfRelatorio.ts"
Cohesion: 0.18
Nodes (14): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, C, prepararFontes(), criarFolhas(), disp(), M, MUDO (+6 more)

### Community 137 - "AvaliacaoCoach.tsx"
Cohesion: 0.10
Nodes (52): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), firebase, BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa (+44 more)

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 139 - "src/index.ts"
Cohesion: 0.16
Nodes (12): `fisioOrientacoes/{id automático}`, Contrato novo do Worker, cors(), ORIGENS, DO_ALUNO, Env, Mensagem, recado() (+4 more)

### Community 140 - "icones.tsx"
Cohesion: 0.20
Nodes (24): Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), jaViuPopup(), marcarPopup(), Msg(), Quadros() (+16 more)

### Community 141 - "cartaoRelatorio.ts"
Cohesion: 0.20
Nodes (17): EvolucaoCoach(), fmt(), dadosCartaoRelatorio(), DadosRelatorio, dataBr(), num(), periodoTexto(), r (+9 more)

### Community 142 - "@playwright/test"
Cohesion: 0.07
Nodes (16): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, ALUNO (+8 more)

### Community 143 - "12/11/2026 — orientação individual dos métodos"
Cohesion: 0.11
Nodes (16): 12/11/2026 (noite) — Claude: Etapa 3 e lista geral de perigo, 12/11/2026 — orientação individual dos métodos, 13/11/2026 (madrugada) — Claude: rodada 4 (pedido do Victor antes de dormir), 13/11/2026 (manhã) — Claude: correções da revisão do PR (F1–F8), Continuidade Físio — Codex / Claude, Critério de pronto e verificação, Critérios do Markdown científico, Decisões desta entrega (+8 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.16
Nodes (15): AcaoIA, ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, MAX_CORPO_IA, metadados() (+7 more)

### Community 145 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+7 more)

### Community 146 - "PainelEvolucao.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

### Community 147 - "5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)"
Cohesion: 0.12
Nodes (16): 1. Sua tarefa, 2. Regras de escopo (valem para o grupo inteiro), 3. Estrutura de dados sugerida para cada método, 4. Regras globais de progressão (aplicar a todos os métodos), 5.1 Coluna lombar — dor lombar crônica inespecífica, 5.2 Ombro — dor relacionada ao manguito rotador / subacromial, 5.3 Joelho, 5.4 Tendões (tendinopatias) (+8 more)

### Community 148 - "AcaoEmail.tsx"
Cohesion: 0.12
Nodes (30): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+22 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "sugestao.test.ts"
Cohesion: 0.13
Nodes (20): slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm() (+12 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Coleções Firestore"
Cohesion: 0.04
Nodes (41): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}` (+33 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 157 - "coach.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, NOMES

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarRegistro"
Cohesion: 0.08
Nodes (20): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+12 more)

### Community 162 - "firebase-admin"
Cohesion: 0.20
Nodes (7): firebase-admin, atual, novo, acao, email, projeto, PROJETOS

### Community 163 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 164 - "Físio — articulações e músculos de cada exercício (para o Victor conferir)"
Cohesion: 0.13
Nodes (14): Abdome e Lombar, Adutores e Abdutores, Antebraço, Bíceps, Dorsais, Escolhas que eu fiz (confira primeiro), Físio — articulações e músculos de cada exercício (para o Victor conferir), Ombros (+6 more)

### Community 165 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 166 - "prescreverSessao"
Cohesion: 0.12
Nodes (26): `registros/{regId}`, 7. Teste de ataques (03/10/2026), nomes(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+18 more)

### Community 167 - "Pesquisa — Delimitação de volume adequado, lesão e dor (o que a literatura diz)"
Cohesion: 0.13
Nodes (14): 0. Conclusão central (ler primeiro), 1. Como o volume é medido, 2. Faixas de volume da literatura (população saudável), 3.1 Epidemiologia na musculação, 3.2 Razão carga aguda:crônica (ACWR), 3.3 Aumento semana a semana ("regra dos 10%"), 3.4 Retorno após pausa, 3.5 Deload (+6 more)

### Community 168 - "anatomia.ts"
Cohesion: 0.23
Nodes (10): Etapa 1 — Base no catálogo (pode começar já), Anatomia, anatomiaDo(), ARTICULACOES, articulacoesDo(), DADOS, MusculoId, MUSCULOS (+2 more)

### Community 169 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.15
Nodes (13): 10. Monitoramento, 11. Meta robusta (por métrica: movimentos, carga média, volume) — `AS66:AU66`, 12. Evolução de um exercício — `CG2`, 13. Não portado (de propósito), 2. Divisão (quais exercícios em cada treino), 3. Progressão (reps por série), 4. Métodos avançados (`tblLocalMetodosNx`), 5. Reps de cada série — `AvRep(base, n, semana, treino, ex, pos)` (+5 more)

### Community 170 - "GuiaMetodos.tsx"
Cohesion: 0.39
Nodes (6): COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop()

### Community 172 - "fmtMin"
Cohesion: 0.44
Nodes (6): Preview(), aplicar(), acimaDoLimite(), fmtMin(), fmtReps(), Deslizar()

### Community 173 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 174 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 175 - "notasMetodo.ts"
Cohesion: 0.36
Nodes (5): ANTIGA(), dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 176 - "fisio-rules.test.ts"
Cohesion: 0.33
Nodes (5): @firebase/rules-unit-testing, db(), liberacao, MFA, ref()

### Community 177 - "Físio — proposta A1: cruzar o treino real com as sugestões"
Cohesion: 0.33
Nodes (5): Decisões suas antes de começar, Físio — proposta A1: cruzar o treino real com as sugestões, O que a pesquisa de volume muda (`docs/fisio-pesquisa-volume.md`, 13/11/2026), O que mudaria para você (em linguagem simples), O que o app continua NÃO fazendo

### Community 178 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.40
Nodes (4): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1384 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Treino.tsx` to `FisioCoach.tsx`, `Avaliacao.tsx`, `Hoje.tsx`, `MinhaConta.tsx`, `pdfRelatorio.ts`, `AvaliacaoCoach.tsx`, `engine/index.ts`, `avaliacao.ts`, `TabMetodos.tsx`, `util.ts`, `12/11/2026 — orientação individual dos métodos`, `src/ia.ts`, `engine/index.ts`, `Inicio.tsx`, `PainelEvolucao.tsx`, `AcaoEmail.tsx`, `App.tsx`, `sugestao.test.ts`, `FimTreino.tsx`, `Coleções Firestore`, `cartaoStory.ts`, `Entrar.tsx`, `avisos-pagamento.mjs`, `Alunos.tsx`, `prescreverSessao`, `iaTreino.ts`, `src/index.ts`, `GuiaMetodos.tsx`, `fmtMin`, `Presencial.tsx`, `evolucao.ts`, `lib/acesso.ts`, `src/acesso.ts`, `PainelEvolucao.tsx`, `seriesDoRotulo`, `push.ts`, `inscreverAvisos`, `SessaoCard.tsx`, `pix.ts`, `ContaAluno.tsx`, `EnviarFeedback.tsx`, `Alertas.tsx`, `ui.tsx`, `fetch`, `Onde fica cada coisa`, `limpeza-lgpd.mjs`, `registrarErro`, `Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades`, `Botao`, `AvisoAtraso.tsx`, `conversores.ts`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Are the 158 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `dados()` and `nadaPassaDaTela()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 158 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `limparEmuladores` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `FisioCoach.tsx`, `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `engine/index.ts`, `AvaliacaoCoach.tsx`, `MinhaConta.tsx`, `src/index.ts`, `avaliacao.ts`, `TabMetodos.tsx`, `util.ts`, `engine/index.ts`, `src/ia.ts`, `cartaoRelatorio.ts`, `Inicio.tsx`, `PainelEvolucao.tsx`, `alertas.ts`, `App.tsx`, `prints.spec.ts`, `sugestao.test.ts`, `CampoExercicio`, `jwt.ts`, `FimTreino.tsx`, `descanso.ts`, `cartaoStory.ts`, `Entrar.tsx`, `lib/planilha.test.ts`, `firebase-admin`, `avisos-pagamento.mjs`, `webpush.ts`, `aluno-exemplo.test.ts`, `prescreverSessao`, `firebase-admin`, `anatomia.ts`, `iaTreino.ts`, `src/index.ts`, `Treino.tsx`, `fmtMin`, `package.json`, `pdfRelatorio.ts`, `evolucao.ts`, `notasMetodo.ts`, `lib/acesso.ts`, `src/acesso.ts`, `fisio-rules.test.ts`, `seriesDoRotulo`, `sugestoesFisio.ts`, `push.ts`, `SessaoCard.tsx`, `pix.ts`, `EnviarFeedback.tsx`, `dor.ts`, `GuiaFisio.tsx`, `ui.tsx`, `Onde fica cada coisa`, `rules.test.ts`, `registrarErro`, `progressaoFisio.ts`, `Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades`, `cartaoDepoimento.ts`, `marca.test.ts`, `conversores.ts`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `FisioCoach.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07699089039083162 - nodes in this community are weakly interconnected._