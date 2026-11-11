# Graph Report - claude-cloud-celli  (2026-11-11)

## Corpus Check
- 319 files · ~319,697 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3106 nodes · 8625 edges · 174 communities (156 shown, 18 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 393 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `489dfbf2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- push.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- InicioAluno.tsx
- Botao
- env
- criarAluno
- icones.tsx
- acoes.ts
- pdfRelatorio.ts
- util.ts
- Alunos.tsx
- prescreverSessao
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- SessaoCard.tsx
- prints.spec.ts
- Hoje.tsx
- FimTreino.tsx
- jwt.ts
- vidro.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- motion
- steps
- steps
- settings.json
- voz-ia.spec.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avisos-pagamento.mjs
- ref_node_fs
- TabProgressao.tsx
- Onboarding.tsx
- src/index.ts
- steps
- relatorio.spec.ts
- package.json
- Onde fica cada coisa
- evolucao.ts
- with
- conta.spec.ts
- src/acesso.ts
- compilerOptions
- vite.config.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- ui.tsx
- Presencial.tsx
- steps
- criarMeso
- Entrar.tsx
- engine/index.ts
- Motion / Framer Motion Examples
- voz-ia.spec.ts
- EnviarFeedback.tsx
- atualizar.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- sessao.ts
- steps
- limpeza-lgpd.test.ts
- limparEmuladores
- Inicio.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- importar-meso.mjs
- relatorio.ts
- with
- overrides
- TutorialCoach.tsx
- src/index.ts
- limpeza-lgpd.mjs
- Performance Optimization
- Inicio.tsx
- ref_node_fs
- Tutorial.tsx
- vitest
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
- Avaliacao.tsx
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
- layout.spec.ts
- Alunos.tsx
- VisaoSemana.tsx
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- react
- erros.mjs
- SessaoCard.tsx
- src/index.ts
- saude.yml
- cors.ts
- iaTreino.ts
- atualizar.ts
- ContaAluno.tsx
- criarCoach
- busca.ts
- AssistenteIA.tsx
- Pontos sensíveis (leia antes de auditar ou mexer)
- Pontos sensíveis (leia antes de auditar ou mexer)
- atualizar.ts
- limpeza
- marca
- evolucao.test.ts
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- reps
- with
- aluno-exemplo.test.ts
- preparar
- relatorio.spec.ts
- 5. Auditoria 02/10/2026 (segurança + LGPD)
- @playwright/test
- erros.mjs
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- vfit/Logo.tsx
- Modelo de dados
- `src/lib/` — Firestore, estado, cálculos com dados
- varredura.spec.ts
- Mapa do Código — Força
- evolucao.test.ts
- CampoExercicio
- seriesDoRotulo

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 137 edges
2. `Botao()` - 124 edges
3. `Treino()` - 79 edges
4. `react` - 71 edges
5. `vitest` - 68 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 54 edges
8. ``src/lib/` — Firestore, estado, cálculos com dados` - 53 edges
9. `registrarErro()` - 51 edges
10. `Cartao()` - 49 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `09/10/2026 — Segurança, movimento e aba Conta` --references--> `MinhaConta()`  [INFERRED]
  docs/estado-sessao.md → src/features/conta/MinhaConta.tsx
- `Entregas` --references--> `normalizarCargas()`  [INFERRED]
  docs/estado-sessao.md → src/lib/conversores.ts
- `Decisões` --references--> `inscricao()`  [INFERRED]
  docs/plano-notificacoes.md → src/lib/push.ts

## Import Cycles
- None detected.

## Communities (174 total, 18 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.06
Nodes (54): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+46 more)

### Community 1 - "push.ts"
Cohesion: 0.05
Nodes (60): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, ROTULO (+52 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.13
Nodes (15): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+7 more)

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
Nodes (35): escolher(), trocarAba(), nomeImportado(), abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto() (+27 more)

### Community 7 - "InicioAluno.tsx"
Cohesion: 0.14
Nodes (28): AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), dataSP(), diaCurto(), DIAS_CURTO (+20 more)

### Community 8 - "Botao"
Cohesion: 0.14
Nodes (24): bloquear(), liberar(), reativar(), ConfirmarAluno(), confirmar(), apagarAluno(), definirAcesso(), limparArquivadosAntigos() (+16 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "criarAluno"
Cohesion: 0.09
Nodes (15): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+7 more)

### Community 11 - "icones.tsx"
Cohesion: 0.13
Nodes (33): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+25 more)

### Community 12 - "acoes.ts"
Cohesion: 0.07
Nodes (53): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SetaIc(), TEXTO_COR, COR_TOM (+45 more)

### Community 13 - "pdfRelatorio.ts"
Cohesion: 0.21
Nodes (14): C, icone(), criarFolhas(), disp(), LARG, M, MUDO, PH (+6 more)

### Community 14 - "util.ts"
Cohesion: 0.16
Nodes (29): Registros, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+21 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.10
Nodes (44): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), padraoMetodo() (+36 more)

### Community 16 - "prescreverSessao"
Cohesion: 0.09
Nodes (35): AnamneseAluno(), apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach (+27 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (43): concurrency, needs, runs-on, steps, strategy, group, BACKUP_SENHA, EVENTO (+35 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (40): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+32 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.20
Nodes (9): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h), 9. Avaliação física (09/11/2026, Fase 3) (+1 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.10
Nodes (39): `notas/{alunoId}`, metodoDoRotulo(), AvisoNotificacoes(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms() (+31 more)

### Community 21 - "SessaoCard.tsx"
Cohesion: 0.31
Nodes (7): Convenção de gravação (TOTAL), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), NotasDoc

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "Hoje.tsx"
Cohesion: 0.15
Nodes (24): Pontos sensíveis (leia antes de auditar ou mexer), `src/features/aluno/` — App do aluno, nadaPassaDaTela(), SemAcesso(), Mensalidade(), PixPerto(), contaDoDia(), dataCurta() (+16 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.20
Nodes (13): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, IcCamera, IcSubir (+5 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "vidro.tsx"
Cohesion: 0.14
Nodes (30): Hoje(), Msg(), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), Msg(), Quadros(), RelatorioPronto() (+22 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (37): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+29 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.19
Nodes (22): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), DadosCartao, desenhar(), desenharTreino(), desenharTreinoFoto() (+14 more)

### Community 29 - "motion"
Cohesion: 0.21
Nodes (18): AnamneseCoach(), Anotacao(), codigo(), falhou(), quando(), useAnamnesesDoAluno(), useAnamnese(), anotarAnamnese() (+10 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 34 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.14
Nodes (30): `src/features/auth/` — Autenticação, `src/features/onboarding/` — Onboarding (aluno e coach, as duas marcas), Peças compartilhadas (já no código), Logo(), App(), ativaAba(), Coach(), Menu() (+22 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.17
Nodes (19): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), Inscricao, criptografar() (+11 more)

### Community 37 - "seed.ts"
Cohesion: 0.15
Nodes (15): ALUNO, COACH, ALUNO, COACH, marca, ANAMNESE_MINIMA, criarAlunoAguardando(), criarAlunoArquivado() (+7 more)

### Community 38 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 39 - "ref_node_fs"
Cohesion: 0.14
Nodes (7): ALUNO, marca, ALUNO, COACH, marca, arquivos(), RAIZ

### Community 40 - "TabProgressao.tsx"
Cohesion: 0.09
Nodes (32): nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO, base (+24 more)

### Community 41 - "Onboarding.tsx"
Cohesion: 0.13
Nodes (29): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+21 more)

### Community 42 - "src/index.ts"
Cohesion: 0.11
Nodes (34): CacheAcesso, DO_ALUNO, Env, Mensagem, ROBO, TREINO, alvosDe(), Aviso (+26 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "relatorio.spec.ts"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.10
Nodes (19): name, private, type, version, @cloudflare/workers-types, @firebase/rules-unit-testing, firebase-tools, tailwindcss (+11 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.20
Nodes (16): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+8 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.15
Nodes (24): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao (+16 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "conta.spec.ts"
Cohesion: 0.29
Nodes (5): ALUNO, COACH, iniciarEConcluir(), seg(), semear()

### Community 50 - "src/acesso.ts"
Cohesion: 0.22
Nodes (15): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+7 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "vite.config.ts"
Cohesion: 0.08
Nodes (36): AlertaAbaixo, AlertaAcima, AlertaDemorado, calcularAlertas(), Grupos, Reg, agora, alunos (+28 more)

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

### Community 57 - "ui.tsx"
Cohesion: 0.11
Nodes (42): EnviarAviso(), enviar(), NovoAluno(), enviar(), ImportarPlanilha(), importar(), Previa(), mesoPadrao() (+34 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.19
Nodes (19): Entrar(), enviar(), voltar(), erros, mensagemErro(), CaixaAceite(), cadastrar(), confirmarLoginTotp() (+11 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.26
Nodes (17): 1. Configuração do mesociclo, `mesos/{mesoId}`, `src/engine/` — Motor de cálculo puro (sem React/Firebase), assinatura(), emGrupo(), limpa(), linhasDoExercicio(), removerLinha() (+9 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "voz-ia.spec.ts"
Cohesion: 0.25
Nodes (12): sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN (+4 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.14
Nodes (25): chip(), EnviarFeedback(), enviar(), Opcao(), IcEstrela(), enviarFeedback(), assinaturaMarca(), Assunto (+17 more)

### Community 66 - "atualizar.ts"
Cohesion: 0.12
Nodes (44): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), firebase, react, BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor() (+36 more)

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

### Community 73 - "sessao.ts"
Cohesion: 0.10
Nodes (14): vitest, igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+6 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "limparEmuladores"
Cohesion: 0.09
Nodes (21): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+13 more)

### Community 77 - "Inicio.tsx"
Cohesion: 0.12
Nodes (31): Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto, VisaoSemana(), dataCurta() (+23 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.15
Nodes (12): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+4 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.17
Nodes (21): permissao(), DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail() (+13 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "relatorio.ts"
Cohesion: 0.18
Nodes (8): MesoEvolucao, agora, linha, m0, m1, meso(), registros, slot()

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "TutorialCoach.tsx"
Cohesion: 0.13
Nodes (25): motion, react-dom, Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno() (+17 more)

### Community 86 - "src/index.ts"
Cohesion: 0.12
Nodes (15): Comandos e workflows, `.github/workflows/` — CI/CD, Mapa do Código — Força, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, Rotas do app (+7 more)

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "Inicio.tsx"
Cohesion: 0.13
Nodes (30): `src/features/coach/` — App do coach, useAlertasCoach(), useArquivados(), chavesAtuais(), Cartao(), Doc, Estrelas(), Feedbacks() (+22 more)

### Community 90 - "ref_node_fs"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 91 - "Tutorial.tsx"
Cohesion: 0.22
Nodes (9): `anamneses/{id automático}`, `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, `relatorios/{mesoId}` (+1 more)

### Community 92 - "vitest"
Cohesion: 0.19
Nodes (17): mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+9 more)

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
Cohesion: 0.24
Nodes (8): ANTIGA(), COR_METODO, METODOS, ORDEM, dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

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

### Community 108 - "Avaliacao.tsx"
Cohesion: 0.31
Nodes (14): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+6 more)

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
Cohesion: 0.13
Nodes (30): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+22 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "Alunos.tsx"
Cohesion: 0.11
Nodes (30): Aluno, Alunos(), confirmarPix(), comparar(), dataPadrao(), formatarData(), FormularioData(), linha() (+22 more)

### Community 122 - "VisaoSemana.tsx"
Cohesion: 0.14
Nodes (11): doAluno(), PARQ_NAO, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder() (+3 more)

### Community 134 - "react"
Cohesion: 0.13
Nodes (19): 1. Registro de erros ("Erros do app"), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+11 more)

### Community 135 - "erros.mjs"
Cohesion: 0.26
Nodes (6): uqr, QrCadastro(), CAMINHO_CADASTRO, emLinkCadastro(), linkCadastro, qrDataUrl()

### Community 136 - "SessaoCard.tsx"
Cohesion: 0.19
Nodes (19): Onde mexer para…, CardioHoje(), IcCardio, criarConta(), desfazerCardio(), enviarAnamnese(), novaVersaoCoach(), registrarCardio() (+11 more)

### Community 137 - "src/index.ts"
Cohesion: 0.22
Nodes (15): fmt(), dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num(), periodoTexto(), r (+7 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "iaTreino.ts"
Cohesion: 0.22
Nodes (8): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), LGPD, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, v2 (10/11/2026): tela do aluno resumida, cores de evolução e leitura medida x dobra

### Community 141 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 142 - "ContaAluno.tsx"
Cohesion: 0.33
Nodes (8): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), pngDe(), D_ESTRELA, primeiroNome()

### Community 143 - "criarCoach"
Cohesion: 0.09
Nodes (16): COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, PNG (+8 more)

### Community 144 - "busca.ts"
Cohesion: 0.33
Nodes (9): trocarSenha(), Aceite(), continuar(), esqueci(), erroSenha(), aceitarPrivacidade(), confirmarSenha(), reautenticar() (+1 more)

### Community 145 - "AssistenteIA.tsx"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.18
Nodes (13): `src/features/privacidade/` — Política e Aceite, AlunoApp(), tutorialNaoVisto(), tutorialCoachNaoVisto(), EvolucaoAluno(), AvisoIOS(), iOS(), standalone() (+5 more)

### Community 147 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.22
Nodes (6): Descanso, fetch(), Fixa, nomeDO(), Tipo, ParVapid

### Community 148 - "atualizar.ts"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "evolucao.test.ts"
Cohesion: 0.29
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.20
Nodes (9): 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um), Divisão (agentes Sonnet; nunca dois no mesmo arquivo) (+1 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 157 - "reps"
Cohesion: 0.67
Nodes (3): `registros/{regId}`, 7. Teste de ataques (03/10/2026), reps()

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 162 - "5. Auditoria 02/10/2026 (segurança + LGPD)"
Cohesion: 0.33
Nodes (6): 5. Auditoria 02/10/2026 (segurança + LGPD), Conferido e OK, Em aberto (decisão do Victor), LGPD (feito nesta auditoria), Passos do Victor (console, uma vez), Repositório público (22/10/2026)

### Community 164 - "erros.mjs"
Cohesion: 0.33
Nodes (6): 6. Monitoramento (alertas), Alertas automáticos (Vigia de segurança), Cloudflare (notificação de descanso), Dependabot, Procedimento ao receber alerta, Proteção contra cobrança

### Community 165 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

### Community 166 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 167 - "Modelo de dados"
Cohesion: 0.50
Nodes (4): `avaliacoes/{id automático}`, Modelo de dados, dobras(), data()

### Community 168 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.18
Nodes (20): `src/lib/` — Firestore, estado, cálculos com dados, Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), anamnesesPendentes(), motivoAnamnese(), precisaAtualizar() (+12 more)

### Community 170 - "Mapa do Código — Força"
Cohesion: 0.27
Nodes (15): `src/features/conta/` — Minha Conta, AvisoDescanso(), ContaAluno(), escolherFoto(), desde(), Linha(), Peso(), Chave() (+7 more)

### Community 171 - "evolucao.test.ts"
Cohesion: 0.18
Nodes (13): painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1, meso() (+5 more)

### Community 176 - "CampoExercicio"
Cohesion: 0.33
Nodes (5): CampoExercicio(), buscarExercicios(), itens, norm(), nomes()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1226 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `sessao.ts` to `descanso.ts`, `push.ts`, `ataques.test.ts`, `planilha.ts`, `InicioAluno.tsx`, `erros.mjs`, `src/index.ts`, `SessaoCard.tsx`, `cors.ts`, `acoes.ts`, `atualizar.ts`, `ContaAluno.tsx`, `Alunos.tsx`, `util.ts`, `prescreverSessao`, `AssistenteIA.tsx`, `Treino.tsx`, `Hoje.tsx`, `FimTreino.tsx`, `jwt.ts`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `aluno-exemplo.test.ts`, `react`, `webpush.ts`, `avisos-pagamento.mjs`, `ref_node_fs`, `TabProgressao.tsx`, `Onboarding.tsx`, `src/index.ts`, `evolucao.test.ts`, `package.json`, `Onde fica cada coisa`, `CampoExercicio`, `src/acesso.ts`, `seriesDoRotulo`, `vite.config.ts`, `Entrar.tsx`, `engine/index.ts`, `voz-ia.spec.ts`, `EnviarFeedback.tsx`, `atualizar.ts`, `limpeza-lgpd.test.ts`, `Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)`, `relatorio.ts`, `ref_node_fs`, `vitest`, `mfa.mjs`, `marca.test.ts`, `Botao`, `Alunos.tsx`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Are the 136 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 136 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `descanso.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06041986687147977 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Hoje.tsx` to `descanso.ts`, `push.ts`, `react`, `InicioAluno.tsx`, `Botao`, `SessaoCard.tsx`, `acoes.ts`, `pdfRelatorio.ts`, `util.ts`, `Alunos.tsx`, `busca.ts`, `prescreverSessao`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `Treino.tsx`, `SessaoCard.tsx`, `vidro.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `motion`, `reps`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `avisos-pagamento.mjs`, `TabProgressao.tsx`, `Onboarding.tsx`, `src/index.ts`, `Mapa do Código — Força`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `seriesDoRotulo`, `vite.config.ts`, `ui.tsx`, `Presencial.tsx`, `voz-ia.spec.ts`, `atualizar.ts`, `Inicio.tsx`, `Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)`, `src/index.ts`, `Inicio.tsx`, `Botao`, `Alunos.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05136986301369863 - nodes in this community are weakly interconnected._