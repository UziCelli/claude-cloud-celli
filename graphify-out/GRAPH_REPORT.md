# Graph Report - claude-cloud-celli  (2026-11-12)

## Corpus Check
- 336 files · ~348,744 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3281 nodes · 9302 edges · 164 communities (147 shown, 17 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 426 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e1fe686c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- criarCoach
- Entrar.tsx
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
- sessao.ts
- util.ts
- App.tsx
- Inicio.tsx
- steps
- env
- Segurança — passos do Victor no console
- AvisoIOS
- iaTreino.ts
- prints.spec.ts
- segmentos.ts
- FimTreino.tsx
- jwt.ts
- icones.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- tentativas.ts
- steps
- steps
- settings.json
- TabProgressao.tsx
- avisos-pagamento.mjs
- aluno-exemplo.mjs
- webpush.ts
- Alunos.tsx
- ref_node_fs
- firebase-admin
- acoes.ts
- iaTreino.ts
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- conversores.ts
- evolucao.ts
- with
- PainelEvolucao.tsx
- src/acesso.ts
- compilerOptions
- EditorMeso.tsx
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- pix.ts
- push.ts
- steps
- cartaoDepoimento.ts
- Treino.tsx
- engine/index.ts
- Motion / Framer Motion Examples
- sair
- EnviarFeedback.tsx
- descanso.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- App.tsx
- steps
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- Pontos sensíveis (leia antes de auditar ou mexer)
- fetch
- push.yml
- treino.test.ts
- importar-meso.mjs
- pdfAvaliacao.ts
- with
- overrides
- icones.tsx
- relatorio.spec.ts
- layout.spec.ts
- Performance Optimization
- limpeza-lgpd.mjs
- rules.test.ts
- registrarErro
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- seriesDoRotulo
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- IconeMetodo.tsx
- gislane/Logo.tsx
- notasMetodo.ts
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- ui.tsx
- ehRecorde
- alertas.ts
- criarAluno
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- MinhaConta.tsx
- AvaliacaoCoach.tsx
- react
- saude.yml
- cors.ts
- cartaoRelatorio.ts
- criarAluno
- pesoCorporal.ts
- src/ia.ts
- CardioHoje.tsx
- limpeza
- marca
- prescreverSessao
- env
- Coleções Firestore
- steps
- limpeza-lgpd.yml
- limparEmuladores
- with
- @playwright/test
- preparar
- criarMeso
- firebase-admin
- lib/ia.ts
- aluno-exemplo.test.ts
- Meso
- marca.test.ts
- Push do descanso (Entrega 3b)
- varredura.spec.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 156 edges
2. `Botao()` - 134 edges
3. `Treino()` - 85 edges
4. `react` - 77 edges
5. `vitest` - 73 edges
6. `prescreverSessao()` - 57 edges
7. ``src/lib/` — Firestore, estado, cálculos com dados` - 56 edges
8. `Meso` - 55 edges
9. `registrarErro()` - 52 edges
10. `useLista()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx
- `09/10/2026 — Segurança, movimento e aba Conta` --references--> `MinhaConta()`  [INFERRED]
  docs/estado-sessao.md → src/features/conta/MinhaConta.tsx

## Import Cycles
- None detected.

## Communities (164 total, 17 thin omitted)

### Community 0 - "criarCoach"
Cohesion: 0.08
Nodes (20): ALUNO, amanha(), COACH, DOBRAS, COACH, COACH, ALUNO, COACH (+12 more)

### Community 1 - "Entrar.tsx"
Cohesion: 0.08
Nodes (54): Logo(), trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+46 more)

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

### Community 6 - "lib/planilha.test.ts"
Cohesion: 0.08
Nodes (41): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaAntigaFalsa() (+33 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.13
Nodes (27): Meso, AvisoReps(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), IcCadeado (+19 more)

### Community 8 - "engine/index.ts"
Cohesion: 0.34
Nodes (11): linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica(), reduzirVolume() (+3 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.13
Nodes (18): doAluno(), PARQ_NAO, ALUNO, COACH, marca, ANAMNESE_MINIMA, criarAlunoAguardando(), criarAlunoArquivado() (+10 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (28): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+20 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.10
Nodes (35): precisaAtualizar(), Avaliacao, avaliacoesParaFazer(), BIO, Ciclo, cicloDaAvaliacao(), Destaque, DobraId (+27 more)

### Community 13 - "sessao.ts"
Cohesion: 0.11
Nodes (19): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+11 more)

### Community 14 - "util.ts"
Cohesion: 0.15
Nodes (30): padraoMetodo(), totalCerto(), Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar() (+22 more)

### Community 15 - "App.tsx"
Cohesion: 0.12
Nodes (27): adicionarExercicio(), adicionarMetodo(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+19 more)

### Community 16 - "Inicio.tsx"
Cohesion: 0.06
Nodes (79): `src/lib/` — Firestore, estado, cálculos com dados, copiar(), apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler() (+71 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (22): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+14 more)

### Community 20 - "AvisoIOS"
Cohesion: 0.83
Nodes (3): AvisoIOS(), iOS(), standalone()

### Community 21 - "iaTreino.ts"
Cohesion: 0.15
Nodes (22): acharPosicao(), corpoPedido(), descreverAcao(), doCatalogo, ExercicioProposto, FERRAMENTA, inteiroOpc(), inteiros() (+14 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (18): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, ANTES (+10 more)

### Community 23 - "segmentos.ts"
Cohesion: 0.10
Nodes (26): estavel(), DESCE, Leitura, PAR_DOBRA, REGIAO, Tom, buscarExercicios(), itens (+18 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.22
Nodes (12): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, IcCamera, IcSubir (+4 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "icones.tsx"
Cohesion: 0.11
Nodes (46): `src/features/conta/` — Minha Conta, Peças compartilhadas (já no código), Avatar(), iniciais(), AvisoNotificacoes(), permissao(), AvisoDescanso(), ContaAluno() (+38 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.04
Nodes (44): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+36 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.19
Nodes (22): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), caixa(), carregarImagem() (+14 more)

### Community 29 - "tentativas.ts"
Cohesion: 0.39
Nodes (6): esperaSeg(), Estado, gravar(), ler(), LIVRES, registrarFalha()

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "TabProgressao.tsx"
Cohesion: 0.22
Nodes (15): tempoPorSemana(), Preview(), AjustarVolume(), aplicar(), fmt(), Modo, Previa, resumo() (+7 more)

### Community 34 - "avisos-pagamento.mjs"
Cohesion: 0.25
Nodes (11): diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia(), pedeTreino(), PROJETOS (+3 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "Alunos.tsx"
Cohesion: 0.09
Nodes (47): AvisoAtraso(), chave(), jaViu(), Mensalidade(), PixPopup(), contaDoDia(), dataCurta(), PagarPix() (+39 more)

### Community 38 - "ref_node_fs"
Cohesion: 0.09
Nodes (11): ALUNO, COACH, marca, fundo, @vite-pwa/assets-generator, arquivos(), RAIZ, app (+3 more)

### Community 39 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, app, auth, COLECOES, db, SCRIPTS, atual, novo

### Community 40 - "acoes.ts"
Cohesion: 0.13
Nodes (26): Onde mexer para…, pedir(), apagarFeedback(), cancelarTreino(), criarAlunoComApp(), criarConta(), darAcessoAoApp(), enviarAnamnese() (+18 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.11
Nodes (23): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+15 more)

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
Cohesion: 0.10
Nodes (18): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @tailwindcss/vite (+10 more)

### Community 46 - "conversores.ts"
Cohesion: 0.15
Nodes (19): `src/features/aluno/` — App do aluno, 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), dataSP(), diaCurto(), DIAS_CURTO, mesoAtual(), proximoMeso(), quando() (+11 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.07
Nodes (53): Peças, diaSP(), corteAvaliacoes(), arred(), calcular(), cargasPositivas(), coletar(), conquistas() (+45 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "PainelEvolucao.tsx"
Cohesion: 0.18
Nodes (16): BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao, dataCurta(), EvolucaoAluno(), Faixa(), Painel() (+8 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.12
Nodes (23): acessoComCache(), CacheAcesso, Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+15 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "EditorMeso.tsx"
Cohesion: 0.19
Nodes (11): Aba, ABAS, DIAS_SEMANA, TITULO_ABA, DIAS_AUTO, agil, confete, elastico (+3 more)

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

### Community 57 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 58 - "push.ts"
Cohesion: 0.14
Nodes (26): EnviarAviso(), enviar(), ChavesAvisos(), agendarPush(), avisarTreinoPronto(), avisosDesligados(), avisosLigados(), b64uParaBytes() (+18 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "cartaoDepoimento.ts"
Cohesion: 0.24
Nodes (10): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), H, pngDe(), W (+2 more)

### Community 61 - "Treino.tsx"
Cohesion: 0.12
Nodes (38): `notas/{alunoId}`, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), hms(), Nota(), NotaMetodos() (+30 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.16
Nodes (29): `src/engine/` — Motor de cálculo puro (sem React/Firebase), COR_METODO, METODOS, ORDEM, alternarSerieDropset(), serieDoDrop(), assinatura(), emGrupo() (+21 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "sair"
Cohesion: 0.13
Nodes (20): sairAgora(), sairAgora(), sair(), apagarCacheAoSair(), bloquearDuranteSaida(), concluirSaida(), reabrirAposFalha(), Armazem (+12 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.12
Nodes (32): Cartao(), Estrelas(), chip(), EnviarFeedback(), enviar(), Opcao(), IcEstrela(), enviarFeedback() (+24 more)

### Community 66 - "descanso.ts"
Cohesion: 0.13
Nodes (20): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Armazem (+12 more)

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

### Community 73 - "App.tsx"
Cohesion: 0.10
Nodes (51): `src/` — Raiz, App(), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+43 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "Alertas.tsx"
Cohesion: 0.11
Nodes (30): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+22 more)

### Community 76 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.25
Nodes (8): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato novo do Worker, Critério de pronto, Decisões, Respostas do Victor, Riscos, recado(), Tipo

### Community 77 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.11
Nodes (20): Comandos e workflows, Mapa do Código — Força, Pontos sensíveis (leia antes de auditar ou mexer), Rotas do app, Segurança — revisão 12/11/2026, FestaRecorde(), excluir(), FaixaAjustado() (+12 more)

### Community 78 - "fetch"
Cohesion: 0.12
Nodes (15): Contrato do Worker, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026), Vários aparelhos e "Apagar de vez" (10/11/2026), Descanso, fetch(), alvosDe() (+7 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "treino.test.ts"
Cohesion: 0.25
Nodes (5): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "pdfAvaliacao.ts"
Cohesion: 0.12
Nodes (31): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), corParte() (+23 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "icones.tsx"
Cohesion: 0.07
Nodes (53): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+45 more)

### Community 86 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 87 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "limpeza-lgpd.mjs"
Cohesion: 0.20
Nodes (8): assinarJwt(), base64url(), auth, corte, db, esquecerNoWorker(), projeto, PROJETOS

### Community 90 - "rules.test.ts"
Cohesion: 0.20
Nodes (12): @firebase/rules-unit-testing, ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro (+4 more)

### Community 91 - "registrarErro"
Cohesion: 0.13
Nodes (21): motion, react-dom, Contador, contarDia(), cortar(), empilhar(), enviar(), gravar() (+13 more)

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

### Community 110 - "notasMetodo.ts"
Cohesion: 0.47
Nodes (3): mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

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
Nodes (40): Peso(), NovoAluno(), enviar(), EditorMeso(), atualizar(), salvar(), setSemanas(), CartaoAgora() (+32 more)

### Community 121 - "alertas.ts"
Cohesion: 0.14
Nodes (20): ARQUIVADO_DIAS, DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS, MIN_ABAIXO, prescrito() (+12 more)

### Community 122 - "criarAluno"
Cohesion: 0.21
Nodes (9): ANTIGA(), confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo() (+1 more)

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (21): ARTE, clarear(), COR_CORPO, ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista(), Parte (+13 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.13
Nodes (23): uqr, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), trocarEmail(), trocarSenha() (+15 more)

### Community 136 - "AvaliacaoCoach.tsx"
Cohesion: 0.18
Nodes (16): BotaoPdfAvaliacao(), Editor(), Faixa, fora(), hoje(), num(), Textos, txt() (+8 more)

### Community 137 - "react"
Cohesion: 0.13
Nodes (46): firebase, react, AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), AvaliacoesCoach(), useAvaliacoesDoAluno(), Doc (+38 more)

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 141 - "cartaoRelatorio.ts"
Cohesion: 0.15
Nodes (26): fmt(), C, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), num(), periodoTexto(), r (+18 more)

### Community 142 - "criarAluno"
Cohesion: 0.10
Nodes (11): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, CORS (+3 more)

### Community 143 - "pesoCorporal.ts"
Cohesion: 0.18
Nodes (18): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+10 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.19
Nodes (14): appCheckOk(), AcaoIA, ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, metadados() (+6 more)

### Community 146 - "CardioHoje.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "prescreverSessao"
Cohesion: 0.12
Nodes (25): `registros/{regId}`, 7. Teste de ataques (03/10/2026), prescreverSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento (+17 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Coleções Firestore"
Cohesion: 0.05
Nodes (37): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}` (+29 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 157 - "limparEmuladores"
Cohesion: 0.09
Nodes (15): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, COACH, semear() (+7 more)

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "@playwright/test"
Cohesion: 0.11
Nodes (12): COACH, ANA, BIA, COACH, comoAluno(), entrar(), ALUNO, COACH (+4 more)

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.08
Nodes (20): ALUNO, COACH, ALUNO, COACH, ALUNO, meso(), prog, ALUNO (+12 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 163 - "lib/ia.ts"
Cohesion: 0.33
Nodes (11): AssistenteIA(), remover(), salvar(), appCheck, apagarChaveIA(), BASE, chamar(), chaveValida() (+3 more)

### Community 165 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 166 - "Meso"
Cohesion: 0.12
Nodes (25): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio() (+17 more)

### Community 168 - "marca.test.ts"
Cohesion: 0.17
Nodes (9): vitest, atualizarNaEntrada(), deveRecarregar(), versaoDisponivel(), arquivos(), chaves(), PROIBIDOS, semPix() (+1 more)

### Community 175 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1276 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `Entrar.tsx`, `lib/planilha.test.ts`, `Hoje.tsx`, `MinhaConta.tsx`, `react`, `AvaliacaoCoach.tsx`, `avaliacao.ts`, `cartaoRelatorio.ts`, `util.ts`, `App.tsx`, `src/ia.ts`, `Inicio.tsx`, `CardioHoje.tsx`, `pesoCorporal.ts`, `AvisoIOS`, `iaTreino.ts`, `prescreverSessao`, `FimTreino.tsx`, `Coleções Firestore`, `icones.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `TabProgressao.tsx`, `avisos-pagamento.mjs`, `Alunos.tsx`, `acoes.ts`, `src/index.ts`, `conversores.ts`, `evolucao.ts`, `PainelEvolucao.tsx`, `src/acesso.ts`, `pix.ts`, `push.ts`, `Treino.tsx`, `engine/index.ts`, `sair`, `App.tsx`, `Alertas.tsx`, `fetch`, `pdfAvaliacao.ts`, `layout.spec.ts`, `limpeza-lgpd.mjs`, `registrarErro`, `seriesDoRotulo`, `ui.tsx`, `ehRecorde`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Are the 154 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `versao()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 154 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `criarCoach` be split into smaller, more focused modules?**
  _Cohesion score 0.0846774193548387 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `marca.test.ts` to `Entrar.tsx`, `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `engine/index.ts`, `MinhaConta.tsx`, `react`, `cors.ts`, `avaliacao.ts`, `sessao.ts`, `util.ts`, `App.tsx`, `src/ia.ts`, `cartaoRelatorio.ts`, `Inicio.tsx`, `CardioHoje.tsx`, `pesoCorporal.ts`, `iaTreino.ts`, `prescreverSessao`, `segmentos.ts`, `jwt.ts`, `FimTreino.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `tentativas.ts`, `lib/planilha.test.ts`, `TabProgressao.tsx`, `avisos-pagamento.mjs`, `webpush.ts`, `Alunos.tsx`, `Meso`, `ref_node_fs`, `aluno-exemplo.test.ts`, `firebase-admin`, `src/index.ts`, `package.json`, `conversores.ts`, `evolucao.ts`, `src/acesso.ts`, `pix.ts`, `push.ts`, `cartaoDepoimento.ts`, `Treino.tsx`, `engine/index.ts`, `sair`, `EnviarFeedback.tsx`, `descanso.ts`, `Alertas.tsx`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `treino.test.ts`, `rules.test.ts`, `registrarErro`, `seriesDoRotulo`, `notasMetodo.ts`, `ui.tsx`, `ehRecorde`, `alertas.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Entrar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08065268065268065 - nodes in this community are weakly interconnected._