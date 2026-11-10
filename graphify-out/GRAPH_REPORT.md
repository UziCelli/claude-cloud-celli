# Graph Report - claude-cloud-celli  (2026-11-10)

## Corpus Check
- 316 files · ~313,056 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3055 nodes · 8437 edges · 170 communities (154 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 388 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6995a674`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- iaTreino.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- Hoje.tsx
- MesosDoAluno.tsx
- env
- @playwright/test
- BoasVindas.tsx
- AvaliacaoCoach.tsx
- cartaoRelatorio.ts
- util.ts
- Alunos.tsx
- `src/lib/` — Firestore, estado, cálculos com dados
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- SessaoCard.tsx
- prints.spec.ts
- codigoPix
- FimTreino.tsx
- jwt.ts
- InicioAluno.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- main.tsx
- steps
- steps
- settings.json
- importar.spec.ts
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avisos-pagamento.mjs
- evolucao.test.ts
- prescreverSessao
- TabProgressao.tsx
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- pesoCorporal.ts
- evolucao.ts
- with
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- Logo
- AlunoApp.tsx
- steps
- sair.spec.ts
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- inatividade.ts
- EnviarFeedback.tsx
- Msg
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- Feedbacks.tsx
- steps
- firebase-admin
- criarAluno
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- importar-meso.mjs
- AnamneseAluno.tsx
- with
- overrides
- Meso
- relatorio.ts
- limpeza-lgpd.mjs
- Performance Optimization
- react
- ref_node_fs
- Coleções Firestore
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
- Botao
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
- ui.tsx
- layout.spec.ts
- icones.tsx
- anamnese.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- AcaoEmail.tsx
- erros.mjs
- CardioHoje.tsx
- AssistenteIA.tsx
- saude.yml
- cors.ts
- VozTreino.tsx
- engine/index.ts
- calcularAlertas.test.ts
- criarCoach
- ImportarPlanilha.tsx
- rules.test.ts
- App.tsx
- Pontos sensíveis (leia antes de auditar ou mexer)
- acoes.ts
- limpeza
- marca
- cartaoDepoimento.ts
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- relogio.spec.ts
- with
- aluno-exemplo.test.ts
- preparar
- 5. Auditoria 02/10/2026 (segurança + LGPD)
- 6. Monitoramento (alertas)
- varredura.spec.ts
- atualizar.ts
- Plano — Painel de Evolução (03/10/2026)
- Mapa do Código — Força
- Modelo de dados
- reps
- pwa-assets.config.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 136 edges
2. `Botao()` - 103 edges
3. `Treino()` - 79 edges
4. `react` - 69 edges
5. `vitest` - 67 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 54 edges
8. ``src/lib/` — Firestore, estado, cálculos com dados` - 52 edges
9. `registrarErro()` - 51 edges
10. `Cartao()` - 49 edges

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

## Communities (170 total, 16 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (57): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+49 more)

### Community 1 - "iaTreino.ts"
Cohesion: 0.09
Nodes (32): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, Acao (+24 more)

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
Nodes (32): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+24 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.12
Nodes (31): AvisoReps(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), dataSP(), diaCurto() (+23 more)

### Community 8 - "MesosDoAluno.tsx"
Cohesion: 0.20
Nodes (25): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+17 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "@playwright/test"
Cohesion: 0.09
Nodes (11): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, CORS (+3 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "AvaliacaoCoach.tsx"
Cohesion: 0.09
Nodes (43): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Avaliacao(), BotaoPdfAvaliacao(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa, fora() (+35 more)

### Community 13 - "cartaoRelatorio.ts"
Cohesion: 0.10
Nodes (38): EntradaPdfAvaliacao, gerarPdfAvaliacao(), EvolucaoCoach(), fmt(), C, dadosCartaoRelatorio(), DadosRelatorio, dataBr() (+30 more)

### Community 14 - "util.ts"
Cohesion: 0.11
Nodes (32): Slot, CampoExercicio(), Seletor(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes() (+24 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.09
Nodes (42): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+34 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.11
Nodes (35): `src/lib/` — Firestore, estado, cálculos com dados, AnamneseAluno(), useAnamnese(), AlunoAnam, ANAMNESE_TRAVA_DESDE, anamnesesNovas(), anamnesesPendentes(), Base (+27 more)

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
Cohesion: 0.08
Nodes (47): `notas/{alunoId}`, ANTIGA(), COR_METODO, metodoDoRotulo(), METODOS, ORDEM, AvisoAdaptado(), CONFETE (+39 more)

### Community 21 - "SessaoCard.tsx"
Cohesion: 0.15
Nodes (18): Preview(), aplicar(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcCheck (+10 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 24 - "FimTreino.tsx"
Cohesion: 0.17
Nodes (15): CONFETE, dur(), FimTreino(), escolher(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo() (+7 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "InicioAluno.tsx"
Cohesion: 0.08
Nodes (58): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/aluno/` — App do aluno, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026) (+50 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (34): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+26 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.20
Nodes (22): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), desenhar(), desenharTreino(), desenharTreinoFoto(), fundoELogo() (+14 more)

### Community 29 - "main.tsx"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "importar.spec.ts"
Cohesion: 0.11
Nodes (10): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, marca, lerDoc() (+2 more)

### Community 34 - "conversores.ts"
Cohesion: 0.17
Nodes (19): Onde fica cada coisa, arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps, docsParaRegistros() (+11 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "seed.ts"
Cohesion: 0.15
Nodes (16): ALUNO, COACH, ALUNO, COACH, marca, ANAMNESE_MINIMA, criarAlunoAguardando(), criarAlunoArquivado() (+8 more)

### Community 38 - "avisos-pagamento.mjs"
Cohesion: 0.25
Nodes (11): diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia(), pedeTreino(), PROJETOS (+3 more)

### Community 39 - "evolucao.test.ts"
Cohesion: 0.21
Nodes (11): agora, dia(), emSemana(), feito(), linha, m1, meso(), quarta() (+3 more)

### Community 40 - "prescreverSessao"
Cohesion: 0.07
Nodes (37): nomes(), igual(), Linhas, migrarProgressao(), todas(), cobre(), extraTempo(), prescreverSessao() (+29 more)

### Community 41 - "TabProgressao.tsx"
Cohesion: 0.22
Nodes (17): AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica(), reduzirVolume() (+9 more)

### Community 42 - "src/index.ts"
Cohesion: 0.12
Nodes (29): CacheAcesso, DO_ALUNO, Env, Mensagem, ROBO, TREINO, Aviso, bytesOk() (+21 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.10
Nodes (19): name, private, type, version, @cloudflare/workers-types, @firebase/rules-unit-testing, firebase-tools, tailwindcss (+11 more)

### Community 46 - "pesoCorporal.ts"
Cohesion: 0.15
Nodes (19): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+11 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.14
Nodes (30): Peças, diaSP(), arred(), calcular(), cargasPositivas(), coletar(), conquistas(), diaInicio() (+22 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

### Community 50 - "src/acesso.ts"
Cohesion: 0.22
Nodes (15): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+7 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.14
Nodes (19): ARQUIVADO_DIAS, DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS, MIN_ABAIXO, prescrito() (+11 more)

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

### Community 57 - "Logo"
Cohesion: 0.29
Nodes (8): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, Lista(), Politica(), Secao()

### Community 58 - "AlunoApp.tsx"
Cohesion: 0.12
Nodes (35): `src/` — Raiz, Avatar(), iniciais(), AlunoApp(), Hoje(), tutorialNaoVisto(), Aluno(), Barra() (+27 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.15
Nodes (24): Entrar(), enviar(), voltar(), erros, mensagemErro(), tentar(), CaixaAceite(), cadastrar() (+16 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.19
Nodes (28): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva, linhasDoExercicio() (+20 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.23
Nodes (13): sairAgora(), sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima() (+5 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.17
Nodes (20): chip(), EnviarFeedback(), enviar(), Opcao(), IcEstrela(), enviarFeedback(), Assunto, ASSUNTOS (+12 more)

### Community 66 - "Msg"
Cohesion: 0.23
Nodes (15): Peso(), EsqueciSenha(), enviar(), mensagemRecuperar(), EnviarAviso(), Aceite(), continuar(), esqueci() (+7 more)

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

### Community 73 - "Feedbacks.tsx"
Cohesion: 0.16
Nodes (18): Onde mexer para…, DadosDepoimento, Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto() (+10 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, app, auth, COLECOES, db, SCRIPTS, atual, novo

### Community 76 - "criarAluno"
Cohesion: 0.11
Nodes (21): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+13 more)

### Community 77 - "Alertas.tsx"
Cohesion: 0.16
Nodes (20): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+12 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.14
Nodes (13): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+5 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.25
Nodes (7): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), LGPD, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "AnamneseAluno.tsx"
Cohesion: 0.18
Nodes (17): apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach, Rascunho (+9 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Meso"
Cohesion: 0.14
Nodes (9): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), Meso, Registros, meso, cargaAnterior() (+1 more)

### Community 86 - "relatorio.ts"
Cohesion: 0.15
Nodes (11): Evolucao, MesoEvolucao, RegistroEvolucao, soma(), agora, linha, m0, m1 (+3 more)

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.20
Nodes (8): assinarJwt(), base64url(), auth, corte, db, esquecerNoWorker(), projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "react"
Cohesion: 0.13
Nodes (40): firebase, react, mesoAtual(), AvaliacaoAluno(), AvaliacoesCoach(), Aba, ABAS, freq() (+32 more)

### Community 90 - "ref_node_fs"
Cohesion: 0.11
Nodes (9): ALUNO, COACH, marca, arquivos(), RAIZ, app, auth, COLECOES (+1 more)

### Community 91 - "Coleções Firestore"
Cohesion: 0.22
Nodes (9): `anamneses/{id automático}`, `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, `relatorios/{mesoId}` (+1 more)

### Community 92 - "vitest"
Cohesion: 0.19
Nodes (16): vitest, mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana() (+8 more)

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

### Community 108 - "Botao"
Cohesion: 0.18
Nodes (20): uqr, FormularioData(), TabelaProgressao(), TabProgressao(), DuasEtapas(), erros, mensagemErro(), MinhaConta() (+12 more)

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

### Community 119 - "ui.tsx"
Cohesion: 0.12
Nodes (24): motion, Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas() (+16 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "icones.tsx"
Cohesion: 0.10
Nodes (45): AvisoNotificacoes(), permissao(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss() (+37 more)

### Community 122 - "anamnese.spec.ts"
Cohesion: 0.16
Nodes (9): doAluno(), PARQ_NAO, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder() (+1 more)

### Community 134 - "AcaoEmail.tsx"
Cohesion: 0.19
Nodes (15): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+7 more)

### Community 135 - "erros.mjs"
Cohesion: 0.29
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 136 - "CardioHoje.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

### Community 137 - "AssistenteIA.tsx"
Cohesion: 0.39
Nodes (10): AssistenteIA(), remover(), salvar(), apagarChaveIA(), chaveMascarada(), chaveValida(), ERROS_HTTP, refChave() (+2 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "VozTreino.tsx"
Cohesion: 0.13
Nodes (20): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+12 more)

### Community 141 - "engine/index.ts"
Cohesion: 0.14
Nodes (30): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+22 more)

### Community 142 - "calcularAlertas.test.ts"
Cohesion: 0.22
Nodes (7): agora, alunos, linha, meso, mesos, registros, chaveAlerta

### Community 143 - "criarCoach"
Cohesion: 0.09
Nodes (20): COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, PNG (+12 more)

### Community 144 - "ImportarPlanilha.tsx"
Cohesion: 0.44
Nodes (8): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaSugerida()

### Community 145 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "App.tsx"
Cohesion: 0.11
Nodes (38): `src/features/coach/` — App do coach, ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), Vigia(), PIX (+30 more)

### Community 147 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.16
Nodes (13): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), Descanso, fetch(), alvosDe(), comAparelho(), Fixa, inicioDoDiaBrasilia() (+5 more)

### Community 148 - "acoes.ts"
Cohesion: 0.17
Nodes (19): AnamneseCoach(), Anotacao(), codigo(), falhou(), quando(), useAnamnesesDoAluno(), Editor(), anotarAnamnese() (+11 more)

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "cartaoDepoimento.ts"
Cohesion: 0.27
Nodes (10): desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), H, W, D_ESTRELA, assinaturaMarca() (+2 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 157 - "relogio.spec.ts"
Cohesion: 0.29
Nodes (5): ALUNO, COACH, iniciarEConcluir(), seg(), semear()

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "aluno-exemplo.test.ts"
Cohesion: 0.20
Nodes (8): registroId(), AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "5. Auditoria 02/10/2026 (segurança + LGPD)"
Cohesion: 0.33
Nodes (6): 5. Auditoria 02/10/2026 (segurança + LGPD), Conferido e OK, Em aberto (decisão do Victor), LGPD (feito nesta auditoria), Passos do Victor (console, uma vez), Repositório público (22/10/2026)

### Community 162 - "6. Monitoramento (alertas)"
Cohesion: 0.33
Nodes (6): 6. Monitoramento (alertas), Alertas automáticos (Vigia de segurança), Cloudflare (notificação de descanso), Dependabot, Procedimento ao receber alerta, Proteção contra cobrança

### Community 164 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 165 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 166 - "Mapa do Código — Força"
Cohesion: 0.50
Nodes (3): Comandos e workflows, Mapa do Código — Força, Rotas do app

### Community 167 - "Modelo de dados"
Cohesion: 0.50
Nodes (4): `avaliacoes/{id automático}`, Modelo de dados, dobras(), data()

### Community 168 - "reps"
Cohesion: 0.67
Nodes (3): `registros/{regId}`, 7. Teste de ataques (03/10/2026), reps()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1207 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `push.ts`, `iaTreino.ts`, `AcaoEmail.tsx`, `Hoje.tsx`, `MesosDoAluno.tsx`, `CardioHoje.tsx`, `AvaliacaoCoach.tsx`, `engine/index.ts`, `util.ts`, `Alunos.tsx`, `cartaoRelatorio.ts`, `ImportarPlanilha.tsx`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `Treino.tsx`, `SessaoCard.tsx`, `acoes.ts`, `FimTreino.tsx`, `InicioAluno.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `conversores.ts`, `Mapa do Código — Força`, `avisos-pagamento.mjs`, `prescreverSessao`, `TabProgressao.tsx`, `src/index.ts`, `reps`, `pesoCorporal.ts`, `evolucao.ts`, `src/acesso.ts`, `AlunoApp.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `Msg`, `Feedbacks.tsx`, `Meso`, `limpeza-lgpd.mjs`, `react`, `Botao`, `ui.tsx`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Are the 135 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 135 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05827505827505827 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `push.ts`, `iaTreino.ts`, `ataques.test.ts`, `planilha.ts`, `Hoje.tsx`, `CardioHoje.tsx`, `AcaoEmail.tsx`, `cors.ts`, `AvaliacaoCoach.tsx`, `engine/index.ts`, `calcularAlertas.test.ts`, `util.ts`, `cartaoRelatorio.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `App.tsx`, `Alunos.tsx`, `Treino.tsx`, `SessaoCard.tsx`, `rules.test.ts`, `cartaoDepoimento.ts`, `FimTreino.tsx`, `jwt.ts`, `codigoPix`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `aluno-exemplo.test.ts`, `conversores.ts`, `webpush.ts`, `atualizar.ts`, `avisos-pagamento.mjs`, `evolucao.test.ts`, `prescreverSessao`, `TabProgressao.tsx`, `src/index.ts`, `package.json`, `pesoCorporal.ts`, `src/acesso.ts`, `alertas.ts`, `Entrar.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `EnviarFeedback.tsx`, `firebase-admin`, `Alertas.tsx`, `Meso`, `relatorio.ts`, `ref_node_fs`, `Botao`, `marca.test.ts`, `ui.tsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `iaTreino.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0873015873015873 - nodes in this community are weakly interconnected._