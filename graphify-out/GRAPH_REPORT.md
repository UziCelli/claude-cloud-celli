# Graph Report - claude-cloud-celli  (2026-11-13)

## Corpus Check
- 371 files · ~382,243 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3503 nodes · 10026 edges · 180 communities (165 shown, 15 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 452 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `36d5de92`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- hojeSaoPaulo
- Entrar.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- lib/planilha.test.ts
- Hoje.tsx
- AvisoAtraso.tsx
- env
- pix.spec.ts
- BoasVindas.tsx
- avaliacao.ts
- metricas.ts
- util.ts
- react
- anamnese.ts
- steps
- env
- Segurança — passos do Victor no console
- acoes.ts
- iaTreino.ts
- prints.spec.ts
- anatomia.ts
- sugestoesFisio.ts
- jwt.ts
- ContaAluno.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- Alunos.tsx
- steps
- steps
- settings.json
- relatorio.ts
- Quadro
- aluno-exemplo.mjs
- webpush.ts
- ui.tsx
- tutorial.spec.ts
- firebase-admin
- AnamneseCoach.tsx
- VozTreino.tsx
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- SessaoCard.tsx
- evolucao.ts
- with
- SenhaSegura
- src/acesso.ts
- compilerOptions
- TabMetodos.tsx
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- TabProgressao.tsx
- push.ts
- steps
- pdfRelatorio.ts
- Treino.tsx
- EditarTreino.tsx
- Motion / Framer Motion Examples
- sair
- lib/acesso.ts
- descanso.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- Presencial.tsx
- steps
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- sessao.ts
- fetch
- push.yml
- AnamneseCoach.tsx
- importar-meso.mjs
- pdfAvaliacao.ts
- with
- overrides
- icones.tsx
- criarMeso
- layout.spec.ts
- Performance Optimization
- evolucao.test.ts
- avisos-pagamento.mjs
- Botao
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- dor.ts
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- GuiaFisio.tsx
- gislane/Logo.tsx
- GuiaMetodos.tsx
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- MesosDoAluno.tsx
- Feedbacks.tsx
- alertas.ts
- criarAluno
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- MinhaConta.tsx
- 5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)
- AvaliacaoCoach.tsx
- saude.yml
- cors.ts
- cartaoDepoimento.ts
- log.ts
- ref_node_fs
- pesoCorporal.ts
- src/ia.ts
- @playwright/test
- CardioHoje.tsx
- checkin.ts
- Físio — articulações e músculos de cada exercício (para o Victor conferir)
- limpeza
- marca
- engine/index.ts
- env
- Coleções Firestore
- steps
- 12/11/2026 — orientação individual dos métodos
- limpeza-lgpd.yml
- voz-ia.spec.ts
- with
- QrCadastro.tsx
- preparar
- criarCoach
- firebase-admin
- aluno-exemplo.test.ts
- lib/fisio.ts
- prescreverSessao
- mesoAtual.ts
- seed.ts
- marca.test.ts
- seriesDoRotulo
- FisioCoach.tsx
- vitest
- vite.config.ts
- limpeza-lgpd.mjs
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- Push do descanso (Entrega 3b)
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- proximo-meso.spec.ts
- main.tsx
- feedback.spec.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 160 edges
2. `Botao()` - 143 edges
3. `Treino()` - 91 edges
4. `react` - 87 edges
5. `vitest` - 80 edges
6. ``src/lib/` — Firestore, estado, cálculos com dados` - 61 edges
7. `firebase` - 60 edges
8. `useLista()` - 59 edges
9. `Cartao()` - 59 edges
10. `Aviso()` - 58 edges

## Surprising Connections (you probably didn't know these)
- `Definições (fonte da verdade do cálculo)` --references--> `metricasExercicio()`  [INFERRED]
  docs/plano-evolucao.md → src/engine/metricas.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- `Contexto` --references--> `polimento()`  [INFERRED]
  docs/plano-fisio.md → src/engine/volume.ts
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx

## Import Cycles
- None detected.

## Communities (180 total, 15 thin omitted)

### Community 0 - "hojeSaoPaulo"
Cohesion: 0.11
Nodes (11): ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, diasAtras(), semear() (+3 more)

### Community 1 - "Entrar.tsx"
Cohesion: 0.15
Nodes (23): 11/11/2026 — Entrada do aluno: senha e termos sem laço, deveMostrarBoasVindas(), ler(), Entrar(), enviar(), voltar(), erros, mensagemErro() (+15 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.07
Nodes (31): @firebase/rules-unit-testing, agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db() (+23 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (42): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+34 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "lib/planilha.test.ts"
Cohesion: 0.10
Nodes (32): abaAntigaFalsa(), abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc (+24 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.15
Nodes (28): Meso, AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos() (+20 more)

### Community 8 - "AvisoAtraso.tsx"
Cohesion: 0.16
Nodes (23): AvisoAtraso(), chave(), jaViu(), Mensalidade(), PixPopup(), contaDoDia(), dataCurta(), PagarPix() (+15 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "pix.spec.ts"
Cohesion: 0.29
Nodes (5): ALUNO, COACH, marca, definirPagoAte(), VERSAO_PRIVACIDADE

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.14
Nodes (33): `src/features/instalar/` — PWA/Android, Logo(), BoasVindas(), CartaoInstalar(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+25 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.06
Nodes (52): AvaliacaoForm, BIO, Ciclo, DESCE, Destaque, DobraId, DOBRAS, FAIXA (+44 more)

### Community 13 - "metricas.ts"
Cohesion: 0.17
Nodes (19): mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+11 more)

### Community 14 - "util.ts"
Cohesion: 0.14
Nodes (30): Registros, Slot, CampoExercicio(), trocarAba(), Seletor(), TabDivisao(), cartaoTreino(), commit() (+22 more)

### Community 15 - "react"
Cohesion: 0.09
Nodes (50): firebase, react, Aba, ABAS, DIAS_SEMANA, TITULO_ABA, Aba, ABAS (+42 more)

### Community 16 - "anamnese.ts"
Cohesion: 0.12
Nodes (28): `src/lib/` — Firestore, estado, cálculos com dados, useAnamnese(), AlunoAnam, anamnesesNovas(), anamnesesPendentes(), Base, emOuAgora(), Etapa (+20 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (22): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+14 more)

### Community 20 - "acoes.ts"
Cohesion: 0.14
Nodes (20): sairAgora(), confirmarPix(), sairAgora(), fimDoDiaSaoPaulo(), confirmarPagamento(), criarAlunoComApp(), criarConta(), darAcessoAoApp() (+12 more)

### Community 21 - "iaTreino.ts"
Cohesion: 0.12
Nodes (26): appCheck, BASE, MetadadosIA, acharPosicao(), corpoPedido(), descreverAcao(), doCatalogo, ExercicioProposto (+18 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "anatomia.ts"
Cohesion: 0.14
Nodes (18): Etapa 1 — Base no catálogo (pode começar já), SeletorExercicios(), TODAS, Anatomia, anatomiaDo(), ARTICULACOES, articulacoesDo(), DADOS (+10 more)

### Community 24 - "sugestoesFisio.ts"
Cohesion: 0.19
Nodes (16): Checkin, RelatoDor, chave(), diaDe(), Entrada, motivoConversar(), motivoPolimento(), ms() (+8 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "ContaAluno.tsx"
Cohesion: 0.14
Nodes (27): `src/features/conta/` — Minha Conta, Avatar(), iniciais(), AvisoNotificacoes(), permissao(), AvisoDescanso(), ContaAluno(), escolherFoto() (+19 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.04
Nodes (44): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+36 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.13
Nodes (32): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), C, caixa() (+24 more)

### Community 29 - "Alunos.tsx"
Cohesion: 0.14
Nodes (26): `fisioOrientacoes/{id automático}`, LGPD, Aluno, Alunos(), bloquear(), liberar(), reativar(), comparar() (+18 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "relatorio.ts"
Cohesion: 0.13
Nodes (18): precisaAtualizar(), avaliacoesParaFazer(), Evolucao, MesoEvolucao, arred(), cicloTerminou(), diasDesdeFim(), fimISO() (+10 more)

### Community 34 - "Quadro"
Cohesion: 0.22
Nodes (21): AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), jaViuPopup(), marcarPopup(), Msg(), Quadros(), RelatorioPronto() (+13 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "ui.tsx"
Cohesion: 0.10
Nodes (24): motion, CONFETE, dur(), FimTreino(), Lista(), IcCamera, IcSubir, agil (+16 more)

### Community 38 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 39 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, app, auth, COLECOES, db, SCRIPTS, atual, novo

### Community 40 - "AnamneseCoach.tsx"
Cohesion: 0.20
Nodes (16): apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach, Rascunho (+8 more)

### Community 41 - "VozTreino.tsx"
Cohesion: 0.12
Nodes (22): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+14 more)

### Community 42 - "src/index.ts"
Cohesion: 0.14
Nodes (23): Aviso, bytesOk(), endpointOk(), hostOk(), HOSTS, MAX_APARELHOS, nomeAgenda(), nomeCoaches() (+15 more)

### Community 43 - "steps"
Cohesion: 0.06
Nodes (30): description, required, ALUNO, MESO, NOME, SA, if, runs-on (+22 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.14
Nodes (12): name, private, type, version, fundo, @cloudflare/workers-types, firebase-tools, tailwindcss (+4 more)

### Community 46 - "SessaoCard.tsx"
Cohesion: 0.19
Nodes (19): `notas/{alunoId}`, Nota(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcCheck (+11 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.13
Nodes (27): dados(), clicar(), compartilharArquivo(), arred(), calcular(), cargasPositivas(), coletar(), Conquista (+19 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "SenhaSegura"
Cohesion: 0.13
Nodes (28): trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA (+20 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.12
Nodes (23): acessoComCache(), CacheAcesso, Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+15 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "TabMetodos.tsx"
Cohesion: 0.21
Nodes (25): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva, linhasDoExercicio() (+17 more)

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

### Community 57 - "TabProgressao.tsx"
Cohesion: 0.16
Nodes (24): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+16 more)

### Community 58 - "push.ts"
Cohesion: 0.17
Nodes (20): enviar(), chamar(), avisarCoach(), avisarTreinoPronto(), AVISOS_ALUNO, b64uParaBytes(), BASE, cabecalhosPush() (+12 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "pdfRelatorio.ts"
Cohesion: 0.14
Nodes (22): dadosCartaoRelatorio(), dataBr(), periodoTexto(), r, volumeTexto(), criarFolhas(), disp(), LARG (+14 more)

### Community 61 - "Treino.tsx"
Cohesion: 0.12
Nodes (34): Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, nadaPassaDaTela(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms() (+26 more)

### Community 62 - "EditarTreino.tsx"
Cohesion: 0.13
Nodes (28): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+20 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "sair"
Cohesion: 0.23
Nodes (12): Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, limparTreino(), marcar() (+4 more)

### Community 65 - "lib/acesso.ts"
Cohesion: 0.16
Nodes (19): CARENCIA_DIAS, diaSP(), diasParaVencer(), emAtraso(), faltaSegundoFator(), Foto, inicioDoDiaSP(), liberado() (+11 more)

### Community 66 - "descanso.ts"
Cohesion: 0.18
Nodes (17): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+9 more)

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

### Community 73 - "Presencial.tsx"
Cohesion: 0.22
Nodes (19): `src/` — Raiz, Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente(), lerGrupo(), lerRecentes() (+11 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "Alertas.tsx"
Cohesion: 0.11
Nodes (34): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), linkBtn, rotulo (+26 more)

### Community 76 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.25
Nodes (8): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato novo do Worker, Critério de pronto, Decisões, Respostas do Victor, Riscos, recado(), Tipo

### Community 77 - "sessao.ts"
Cohesion: 0.11
Nodes (16): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+8 more)

### Community 78 - "fetch"
Cohesion: 0.12
Nodes (15): Contrato do Worker, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026), Vários aparelhos e "Apagar de vez" (10/11/2026), Descanso, fetch(), alvosDe() (+7 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "AnamneseCoach.tsx"
Cohesion: 0.19
Nodes (18): Onde mexer para…, copiar(), AnamneseCoach(), Anotacao(), codigo(), falhou(), quando(), quandoMs() (+10 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "pdfAvaliacao.ts"
Cohesion: 0.15
Nodes (29): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), carregar() (+21 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "icones.tsx"
Cohesion: 0.07
Nodes (55): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+47 more)

### Community 86 - "criarMeso"
Cohesion: 0.08
Nodes (21): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, ALUNO (+13 more)

### Community 87 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "evolucao.test.ts"
Cohesion: 0.13
Nodes (17): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), recordeAnterior(), agora, dia(), emSemana() (+9 more)

### Community 90 - "avisos-pagamento.mjs"
Cohesion: 0.25
Nodes (11): diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia(), pedeTreino(), PROJETOS (+3 more)

### Community 91 - "Botao"
Cohesion: 0.09
Nodes (47): `src/features/privacidade/` — Política e Aceite, Peças compartilhadas (já no código), App(), ativaAba(), Coach(), Menu(), PerfilDemora(), pedir() (+39 more)

### Community 92 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

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

### Community 100 - "dor.ts"
Cohesion: 0.18
Nodes (20): `fisioDores/{id automático}` (Etapa 3, 12/11/2026), relatarDor(), chip(), RelatarDor(), vazio(), IcFisio, ArticulacaoId, ALERTA_DOR (+12 more)

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

### Community 108 - "GuiaFisio.tsx"
Cohesion: 0.15
Nodes (20): ALERTA_LOMBAR, ALERTA_TENDAO, AVISO_FISIO, linkPubmed(), MetodoFisio, METODOS_FISIO, Nivel, opcional() (+12 more)

### Community 110 - "GuiaMetodos.tsx"
Cohesion: 0.18
Nodes (11): ANTIGA(), COR_METODO, metodoDoRotulo(), METODOS, ORDEM, desenhos(), loop(), dispensarNota() (+3 more)

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
Cohesion: 0.15
Nodes (38): Peso(), NovoAluno(), enviar(), salvar(), ImportarPlanilha(), escolher(), importar(), Previa() (+30 more)

### Community 120 - "Feedbacks.tsx"
Cohesion: 0.10
Nodes (43): Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), useFeedbacks(), Inicio() (+35 more)

### Community 121 - "alertas.ts"
Cohesion: 0.09
Nodes (27): agora, alunos, linha, meso, mesos, registros, ARQUIVADO_DIAS, arquivadosVencidos() (+19 more)

### Community 122 - "criarAluno"
Cohesion: 0.24
Nodes (8): confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder()

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.13
Nodes (20): ARTE, clarear(), COR_CORPO, corParte(), ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista() (+12 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.13
Nodes (27): 09/10/2026 — Segurança, movimento e aba Conta, AssistenteIA(), remover(), salvar(), DuasEtapas(), tentar(), erros, mensagemErro() (+19 more)

### Community 136 - "5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)"
Cohesion: 0.12
Nodes (16): 1. Sua tarefa, 2. Regras de escopo (valem para o grupo inteiro), 3. Estrutura de dados sugerida para cada método, 4. Regras globais de progressão (aplicar a todos os métodos), 5.1 Coluna lombar — dor lombar crônica inespecífica, 5.2 Ombro — dor relacionada ao manguito rotador / subacromial, 5.3 Joelho, 5.4 Tendões (tendinopatias) (+8 more)

### Community 137 - "AvaliacaoCoach.tsx"
Cohesion: 0.13
Nodes (40): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa, fora() (+32 more)

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 140 - "cartaoDepoimento.ts"
Cohesion: 0.31
Nodes (9): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), D_ESTRELA, assinaturaMarca(), primeiroNome() (+1 more)

### Community 141 - "log.ts"
Cohesion: 0.18
Nodes (16): auth, Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog() (+8 more)

### Community 142 - "ref_node_fs"
Cohesion: 0.08
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, marca, lerDoc() (+6 more)

### Community 143 - "pesoCorporal.ts"
Cohesion: 0.15
Nodes (22): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+14 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.19
Nodes (14): appCheckOk(), AcaoIA, ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, metadados() (+6 more)

### Community 145 - "@playwright/test"
Cohesion: 0.12
Nodes (8): COACH, ALUNO, COACH, PNG, COACH, ALUNO, COACH, @playwright/test

### Community 146 - "CardioHoje.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

### Community 147 - "checkin.ts"
Cohesion: 0.29
Nodes (11): registrarCheckin(), CheckinFim(), chip(), CampoCheckin, CheckinForm, checkinValido(), COLECAO_CHECKINS, lerCheckin() (+3 more)

### Community 148 - "Físio — articulações e músculos de cada exercício (para o Victor conferir)"
Cohesion: 0.13
Nodes (14): Abdome e Lombar, Adutores e Abdutores, Antebraço, Bíceps, Dorsais, Escolhas que eu fiz (confira primeiro), Físio — articulações e músculos de cada exercício (para o Victor conferir), Ombros (+6 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "engine/index.ts"
Cohesion: 0.11
Nodes (25): 1. Configuração do mesociclo, `mesos/{mesoId}`, ESCOPOS, m(), semanas(), slotsDaSessao(), ANTAGONISTAS, aplicarSugestao() (+17 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Coleções Firestore"
Cohesion: 0.04
Nodes (40): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}` (+32 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "12/11/2026 — orientação individual dos métodos"
Cohesion: 0.12
Nodes (14): 12/11/2026 (noite) — Claude: Etapa 3 e lista geral de perigo, 12/11/2026 — orientação individual dos métodos, 13/11/2026 (madrugada) — Claude: rodada 4 (pedido do Victor antes de dormir), Continuidade Físio — Codex / Claude, Critério de pronto e verificação, Critérios do Markdown científico, Decisões desta entrega, Próximas etapas que continuam no plano (+6 more)

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "QrCadastro.tsx"
Cohesion: 0.26
Nodes (6): uqr, QrCadastro(), CAMINHO_CADASTRO, emLinkCadastro(), linkCadastro, qrDataUrl()

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarCoach"
Cohesion: 0.08
Nodes (20): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, COACH, CORS (+12 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 163 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 164 - "lib/fisio.ts"
Cohesion: 0.23
Nodes (15): ALERTA_GERAL, ARTICULACAO_QUEIXA, contextoPelaAnamnese(), dataValida(), doresDaAnamnese(), lerLiberacao(), lerOrientacao(), LiberacaoProfissional (+7 more)

### Community 165 - "prescreverSessao"
Cohesion: 0.30
Nodes (9): `registros/{regId}`, 7. Teste de ataques (03/10/2026), prescreverSessao(), Preview(), reps(), acimaDoLimite(), fmtMin(), fmtReps() (+1 more)

### Community 166 - "mesoAtual.ts"
Cohesion: 0.29
Nodes (9): `src/features/aluno/` — App do aluno, dataSP(), DIAS_CURTO, mesoAtual(), proximoMeso(), hoje, mk(), mesoParaDoc() (+1 more)

### Community 167 - "seed.ts"
Cohesion: 0.13
Nodes (15): doAluno(), PARQ_NAO, ALUNO, COACH, ANAMNESE_MINIMA, criarAluno(), criarAlunoAguardando(), criarAlunoArquivado() (+7 more)

### Community 168 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 170 - "FisioCoach.tsx"
Cohesion: 0.15
Nodes (28): enviarOrientacao(), marcarDorVista(), recolherOrientacao(), relatarSinalFisio(), responderDor(), salvarExerciciosFisio(), descreverDor(), FisioAluno() (+20 more)

### Community 171 - "vitest"
Cohesion: 0.18
Nodes (3): vitest, meso, base

### Community 172 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

### Community 173 - "limpeza-lgpd.mjs"
Cohesion: 0.20
Nodes (8): assinarJwt(), base64url(), auth, corte, db, esquecerNoWorker(), projeto, PROJETOS

### Community 174 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 175 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 176 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.25
Nodes (7): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 177 - "proximo-meso.spec.ts"
Cohesion: 0.29
Nodes (6): ALUNO, COACH, dia(), meso(), semear(), w

### Community 178 - "main.tsx"
Cohesion: 0.33
Nodes (4): react-dom, carregar(), Features, montar()

### Community 182 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1348 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `Entrar.tsx`, `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `MinhaConta.tsx`, `AvaliacaoCoach.tsx`, `AvisoAtraso.tsx`, `cors.ts`, `cartaoDepoimento.ts`, `metricas.ts`, `util.ts`, `avaliacao.ts`, `src/ia.ts`, `anamnese.ts`, `CardioHoje.tsx`, `checkin.ts`, `react`, `iaTreino.ts`, `pesoCorporal.ts`, `engine/index.ts`, `anatomia.ts`, `jwt.ts`, `ContaAluno.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `acoes.ts`, `sugestoesFisio.ts`, `QrCadastro.tsx`, `lib/planilha.test.ts`, `relatorio.ts`, `aluno-exemplo.test.ts`, `webpush.ts`, `lib/fisio.ts`, `mesoAtual.ts`, `prescreverSessao`, `marca.test.ts`, `seriesDoRotulo`, `src/index.ts`, `ui.tsx`, `firebase-admin`, `package.json`, `SessaoCard.tsx`, `SenhaSegura`, `src/acesso.ts`, `TabMetodos.tsx`, `TabProgressao.tsx`, `push.ts`, `pdfRelatorio.ts`, `Treino.tsx`, `EditarTreino.tsx`, `sair`, `lib/acesso.ts`, `descanso.ts`, `ref_node_fs`, `sessao.ts`, `evolucao.test.ts`, `avisos-pagamento.mjs`, `dor.ts`, `GuiaFisio.tsx`, `GuiaMetodos.tsx`, `Feedbacks.tsx`, `alertas.ts`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 158 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `dados()` and `nadaPassaDaTela()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 158 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `hojeSaoPaulo` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Treino.tsx` to `Entrar.tsx`, `Hoje.tsx`, `AvisoAtraso.tsx`, `MinhaConta.tsx`, `AvaliacaoCoach.tsx`, `BoasVindas.tsx`, `avaliacao.ts`, `util.ts`, `react`, `src/ia.ts`, `anamnese.ts`, `CardioHoje.tsx`, `pesoCorporal.ts`, `acoes.ts`, `iaTreino.ts`, `engine/index.ts`, `Coleções Firestore`, `ContaAluno.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `Alunos.tsx`, `prescreverSessao`, `ui.tsx`, `mesoAtual.ts`, `seriesDoRotulo`, `src/index.ts`, `FisioCoach.tsx`, `limpeza-lgpd.mjs`, `SessaoCard.tsx`, `evolucao.ts`, `SenhaSegura`, `src/acesso.ts`, `TabProgressao.tsx`, `push.ts`, `pdfRelatorio.ts`, `EditarTreino.tsx`, `sair`, `lib/acesso.ts`, `descanso.ts`, `Presencial.tsx`, `Alertas.tsx`, `fetch`, `AnamneseCoach.tsx`, `pdfAvaliacao.ts`, `avisos-pagamento.mjs`, `Botao`, `MesosDoAluno.tsx`, `alertas.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Entrar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14532019704433496 - nodes in this community are weakly interconnected._