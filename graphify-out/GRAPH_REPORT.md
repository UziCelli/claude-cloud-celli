# Graph Report - claude-cloud-celli  (2026-11-12)

## Corpus Check
- 330 files · ~343,455 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3214 nodes · 9136 edges · 170 communities (156 shown, 14 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c0dc77e3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- vidro.tsx
- AcaoEmail.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- lib/planilha.test.ts
- Hoje.tsx
- TabProgressao.tsx
- env
- seed.ts
- BoasVindas.tsx
- avaliacao.ts
- vitest
- util.ts
- App.tsx
- `src/lib/` — Firestore, estado, cálculos com dados
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- vitest
- prints.spec.ts
- segmentos.ts
- FimTreino.tsx
- jwt.ts
- Alunos.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- Entrar.tsx
- steps
- steps
- settings.json
- EditorMeso.tsx
- avisos-pagamento.mjs
- aluno-exemplo.mjs
- webpush.ts
- pix.ts
- firebase-admin
- firebase-admin
- criarAluno
- iaTreino.ts
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- main.tsx
- evolucao.ts
- with
- Botao
- src/acesso.ts
- compilerOptions
- MinhaConta.tsx
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- Presencial.tsx
- push.ts
- steps
- icones.tsx
- Msg
- engine/index.ts
- Motion / Framer Motion Examples
- inatividade.ts
- EnviarFeedback.tsx
- descanso.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- AlunoApp.tsx
- steps
- lib/acesso.ts
- criarCoach
- PainelEvolucao.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- Botao
- importar-meso.mjs
- pdfAvaliacao.ts
- with
- overrides
- TutorialCoach.tsx
- aluno-exemplo.test.ts
- GuiaMetodos.tsx
- Performance Optimization
- limpeza-lgpd.mjs
- rules.test.ts
- Coleções Firestore
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- CardioHoje.tsx
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- Pontos sensíveis (leia antes de auditar ou mexer)
- gislane/Logo.tsx
- prescreverSessao
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- MesosDoAluno.tsx
- layout.spec.ts
- prescreverSessao
- criarAluno
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- AvaliacaoCoach.tsx
- react
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- saude.yml
- cors.ts
- hojeSaoPaulo
- cartaoRelatorio.ts
- ref_node_fs
- erros.mjs
- RelatorioCoach.tsx
- Árvore por pasta
- 5. Auditoria 02/10/2026 (segurança + LGPD)
- Pontos sensíveis (leia antes de auditar ou mexer)
- 6. Monitoramento (alertas)
- limpeza
- marca
- prescreverSessao
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- limparEmuladores
- with
- @playwright/test
- preparar
- criarMeso
- firebase-admin
- varredura.spec.ts
- Avaliacao.tsx
- inscreverAvisos
- relatorio.test.ts
- Push do descanso (Entrega 3b)
- marca.test.ts
- Mapa do Código — Força

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 153 edges
2. `Botao()` - 134 edges
3. `Treino()` - 83 edges
4. `react` - 75 edges
5. `vitest` - 70 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 55 edges
8. ``src/lib/` — Firestore, estado, cálculos com dados` - 55 edges
9. `registrarErro()` - 52 edges
10. `diaSP()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx

## Import Cycles
- None detected.

## Communities (170 total, 14 thin omitted)

### Community 0 - "vidro.tsx"
Cohesion: 0.19
Nodes (20): Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), Quadros(), RelatorioPronto(), ConviteFeedback(), Faixa(), FaixaFeedback() (+12 more)

### Community 1 - "AcaoEmail.tsx"
Cohesion: 0.19
Nodes (16): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+8 more)

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
Cohesion: 0.09
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaAntigaFalsa() (+32 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.14
Nodes (34): `src/features/aluno/` — App do aluno, AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), PixPopup(), Treinos(), dataSP() (+26 more)

### Community 8 - "TabProgressao.tsx"
Cohesion: 0.19
Nodes (19): AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica(), reduzirVolume() (+11 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "seed.ts"
Cohesion: 0.11
Nodes (19): doAluno(), PARQ_NAO, ALUNO, COACH, ALUNO, COACH, marca, ANAMNESE_MINIMA (+11 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (27): `src/features/instalar/` — PWA/Android, CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.08
Nodes (35): AvaliacaoForm, BIO, Ciclo, Destaque, DobraId, DOBRAS, FAIXA, fmtDelta() (+27 more)

### Community 13 - "vitest"
Cohesion: 0.15
Nodes (21): mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+13 more)

### Community 14 - "util.ts"
Cohesion: 0.15
Nodes (30): padraoMetodo(), totalCerto(), linhaPrescrita(), Slot, Seletor(), TabDivisao(), cartaoTreino(), commit() (+22 more)

### Community 15 - "App.tsx"
Cohesion: 0.13
Nodes (31): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+23 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.07
Nodes (67): `src/lib/` — Firestore, estado, cálculos com dados, AnamneseAluno(), apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler() (+59 more)

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
Cohesion: 0.07
Nodes (52): `notas/{alunoId}`, motion, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms() (+44 more)

### Community 21 - "vitest"
Cohesion: 0.15
Nodes (6): vitest, seriesDestacadas(), seriesDoRotulo(), ehRecorde(), meso, base

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "segmentos.ts"
Cohesion: 0.11
Nodes (25): DESCE, Leitura, PAR_DOBRA, REGIAO, Tom, buscarExercicios(), itens, norm() (+17 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.22
Nodes (12): CONFETE, dur(), FimTreino(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+4 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "Alunos.tsx"
Cohesion: 0.09
Nodes (41): mensagemErro(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), comparar() (+33 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.04
Nodes (42): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+34 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.17
Nodes (24): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), caixa(), carregarImagem() (+16 more)

### Community 29 - "Entrar.tsx"
Cohesion: 0.10
Nodes (37): Entrar(), enviar(), voltar(), erros, RequisitosSenha(), erroSenha(), SenhaSegura(), conferir() (+29 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "EditorMeso.tsx"
Cohesion: 0.10
Nodes (38): `src/features/coach/` — App do coach, aplicarSugestao(), abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo (+30 more)

### Community 34 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.17
Nodes (19): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), Inscricao, criptografar() (+11 more)

### Community 37 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 38 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 39 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 40 - "criarAluno"
Cohesion: 0.10
Nodes (10): ALUNO, COACH, ALUNO, COACH, CORS, ALUNO, marca, CAINDO (+2 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.05
Nodes (62): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, ROTULO (+54 more)

### Community 42 - "src/index.ts"
Cohesion: 0.11
Nodes (34): CacheAcesso, DO_ALUNO, Env, Mensagem, ROBO, TREINO, alvosDe(), Aviso (+26 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.10
Nodes (18): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @tailwindcss/vite (+10 more)

### Community 46 - "main.tsx"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 47 - "evolucao.ts"
Cohesion: 0.08
Nodes (44): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), arred(), calcular(), cargasPositivas(), coletar() (+36 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Botao"
Cohesion: 0.12
Nodes (39): Logo(), ativaAba(), Coach(), Menu(), PerfilDemora(), pedir(), Principal(), SemAcesso() (+31 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.22
Nodes (15): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+7 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "MinhaConta.tsx"
Cohesion: 0.20
Nodes (18): DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail(), trocarSenha() (+10 more)

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

### Community 57 - "Presencial.tsx"
Cohesion: 0.21
Nodes (20): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+12 more)

### Community 58 - "push.ts"
Cohesion: 0.16
Nodes (22): AvisoDescanso(), EnviarAviso(), enviar(), agendarPush(), AVISOS_COACH, avisosLigados(), b64uParaBytes(), BASE (+14 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 60 - "icones.tsx"
Cohesion: 0.18
Nodes (22): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+14 more)

### Community 61 - "Msg"
Cohesion: 0.19
Nodes (13): uqr, Mensalidade(), contaDoDia(), dataCurta(), PagarPix(), copiar(), PIX, reais() (+5 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.17
Nodes (28): 1. Configuração do mesociclo, `mesos/{mesoId}`, `src/engine/` — Motor de cálculo puro (sem React/Firebase), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+20 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.28
Nodes (11): sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, marcar() (+3 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.09
Nodes (45): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), Cartao(), Doc, Estrelas() (+37 more)

### Community 66 - "descanso.ts"
Cohesion: 0.13
Nodes (19): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Armazem (+11 more)

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

### Community 73 - "AlunoApp.tsx"
Cohesion: 0.15
Nodes (21): AlunoApp(), AvisoAtraso(), chave(), jaViu(), Hoje(), Msg(), InicioAluno(), jaViuPopup() (+13 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "lib/acesso.ts"
Cohesion: 0.17
Nodes (17): CARENCIA_DIAS, diasParaVencer(), emAtraso(), faltaSegundoFator(), Foto, inicioDoDiaSP(), liberado(), proximoVencimento() (+9 more)

### Community 76 - "criarCoach"
Cohesion: 0.14
Nodes (12): ALUNO, COACH, diasAtras(), semear(), COACH, ALUNO, COACH, iniciarEConcluir() (+4 more)

### Community 77 - "PainelEvolucao.tsx"
Cohesion: 0.13
Nodes (20): hoje, mk(), mesoPadrao(), arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas() (+12 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.15
Nodes (12): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+4 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Botao"
Cohesion: 0.15
Nodes (20): ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde(), Linha(), Peso(), escolher() (+12 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "pdfAvaliacao.ts"
Cohesion: 0.17
Nodes (18): carregar(), COR_TOM, corpo(), EntradaPdfAvaliacao, C, criarFolhas(), disp(), LARG (+10 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "TutorialCoach.tsx"
Cohesion: 0.26
Nodes (17): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+9 more)

### Community 86 - "aluno-exemplo.test.ts"
Cohesion: 0.11
Nodes (25): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+17 more)

### Community 87 - "GuiaMetodos.tsx"
Cohesion: 0.39
Nodes (6): COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 90 - "rules.test.ts"
Cohesion: 0.20
Nodes (12): @firebase/rules-unit-testing, ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro (+4 more)

### Community 91 - "Coleções Firestore"
Cohesion: 0.18
Nodes (11): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, `registros/{regId}`, `relatorios/{mesoId}` (+3 more)

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

### Community 100 - "CardioHoje.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

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

### Community 108 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.15
Nodes (25): Onde mexer para…, Pontos sensíveis (leia antes de auditar ou mexer), LGPD, fimDoDiaSaoPaulo(), anotarAnamnese(), cancelarTreino(), criarConta(), darAcessoAoApp() (+17 more)

### Community 110 - "prescreverSessao"
Cohesion: 0.21
Nodes (14): prescreverSessao(), Preview(), fmt(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard() (+6 more)

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
Cohesion: 0.18
Nodes (34): NovoAluno(), enviar(), CartaoAgora(), CartaoMeso(), CartaoProximo(), ConfirmarExclusao(), excluir(), DarAcesso() (+26 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "prescreverSessao"
Cohesion: 0.08
Nodes (31): AlertaAbaixo, AlertaAcima, AlertaDemorado, Grupos, Reg, agora, alunos, linha (+23 more)

### Community 122 - "criarAluno"
Cohesion: 0.21
Nodes (9): ANTIGA(), confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo() (+1 more)

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (22): ARTE, clarear(), COR_CORPO, corParte(), ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista() (+14 more)

### Community 135 - "AvaliacaoCoach.tsx"
Cohesion: 0.20
Nodes (19): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), BotaoPdfAvaliacao(), AvaliacaoCoach(), Editor(), Faixa, fora(), hoje(), num() (+11 more)

### Community 136 - "react"
Cohesion: 0.13
Nodes (36): firebase, react, AvaliacaoAluno(), useAvaliacoesLiberadas(), Aba, ABAS, freq(), MEDALHA (+28 more)

### Community 137 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.20
Nodes (9): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, v2 (10/11/2026): tela do aluno resumida, cores de evolução e leitura medida x dobra (+1 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "hojeSaoPaulo"
Cohesion: 0.13
Nodes (11): ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, dia(), meso() (+3 more)

### Community 141 - "cartaoRelatorio.ts"
Cohesion: 0.22
Nodes (15): H, W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), num(), periodoTexto(), r (+7 more)

### Community 142 - "ref_node_fs"
Cohesion: 0.11
Nodes (10): ALUNO, COACH, marca, ALUNO, COACH, marca, fundo, @vite-pwa/assets-generator (+2 more)

### Community 143 - "erros.mjs"
Cohesion: 0.22
Nodes (7): `avaliacoes/{id automático}`, corte, data(), db, linhas, projeto, PROJETOS

### Community 144 - "RelatorioCoach.tsx"
Cohesion: 0.27
Nodes (14): BotaoPdf(), RelatorioAluno(), RelatorioDoc, useRelatoriosLiberados(), Editor(), RelatorioCoach(), useDadosAluno(), liberarRelatorio() (+6 more)

### Community 145 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+7 more)

### Community 146 - "5. Auditoria 02/10/2026 (segurança + LGPD)"
Cohesion: 0.33
Nodes (6): 5. Auditoria 02/10/2026 (segurança + LGPD), Conferido e OK, Em aberto (decisão do Victor), LGPD (feito nesta auditoria), Passos do Victor (console, uma vez), Repositório público (22/10/2026)

### Community 147 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.22
Nodes (6): Descanso, fetch(), Fixa, nomeDO(), Tipo, ParVapid

### Community 148 - "6. Monitoramento (alertas)"
Cohesion: 0.33
Nodes (6): 6. Monitoramento (alertas), Alertas automáticos (Vigia de segurança), Cloudflare (notificação de descanso), Dependabot, Procedimento ao receber alerta, Proteção contra cobrança

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "prescreverSessao"
Cohesion: 0.07
Nodes (33): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+25 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.15
Nodes (12): `anamneses/{id automático}`, 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento (+4 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 157 - "limparEmuladores"
Cohesion: 0.10
Nodes (13): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, COACH, semear() (+5 more)

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "@playwright/test"
Cohesion: 0.12
Nodes (8): COACH, ALUNO, COACH, PNG, COACH, ALUNO, COACH, @playwright/test

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.09
Nodes (19): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, ALUNO (+11 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 164 - "Avaliacao.tsx"
Cohesion: 0.27
Nodes (14): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), CorpoSvg() (+6 more)

### Community 165 - "inscreverAvisos"
Cohesion: 0.30
Nodes (10): `src/features/conta/` — Minha Conta, AvisoNotificacoes(), permissao(), Chave(), ChavesAvisos(), NotificacoesCoach(), avisosDesligados(), inscreverAvisos() (+2 more)

### Community 166 - "relatorio.test.ts"
Cohesion: 0.18
Nodes (8): MesoEvolucao, agora, linha, m0, m1, meso(), registros, slot()

### Community 167 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 168 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 169 - "Mapa do Código — Força"
Cohesion: 0.50
Nodes (3): Comandos e workflows, Mapa do Código — Força, Rotas do app

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1247 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `lib/planilha.test.ts`, `Hoje.tsx`, `AvaliacaoCoach.tsx`, `react`, `TabProgressao.tsx`, `avaliacao.ts`, `util.ts`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `RelatorioCoach.tsx`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `Treino.tsx`, `vitest`, `FimTreino.tsx`, `Plano — Entrega 4: registro de erros e segurança`, `Alunos.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `Entrar.tsx`, `EditorMeso.tsx`, `avisos-pagamento.mjs`, `inscreverAvisos`, `pix.ts`, `Mapa do Código — Força`, `src/index.ts`, `iaTreino.ts`, `evolucao.ts`, `Botao`, `src/acesso.ts`, `MinhaConta.tsx`, `Presencial.tsx`, `push.ts`, `Msg`, `engine/index.ts`, `inatividade.ts`, `AlunoApp.tsx`, `lib/acesso.ts`, `PainelEvolucao.tsx`, `pdfAvaliacao.ts`, `aluno-exemplo.test.ts`, `GuiaMetodos.tsx`, `Coleções Firestore`, `CardioHoje.tsx`, `prescreverSessao`, `MesosDoAluno.tsx`, `layout.spec.ts`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Are the 152 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `versao()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 152 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `TabProgressao.tsx`, `lib/planilha.test.ts`, `cors.ts`, `avaliacao.ts`, `vitest`, `util.ts`, `App.tsx`, `cartaoRelatorio.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `RelatorioCoach.tsx`, `ref_node_fs`, `Treino.tsx`, `prescreverSessao`, `segmentos.ts`, `jwt.ts`, `Alunos.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `Entrar.tsx`, `avisos-pagamento.mjs`, `webpush.ts`, `pix.ts`, `relatorio.test.ts`, `firebase-admin`, `marca.test.ts`, `iaTreino.ts`, `src/index.ts`, `firebase-admin`, `package.json`, `evolucao.ts`, `src/acesso.ts`, `MinhaConta.tsx`, `push.ts`, `Msg`, `engine/index.ts`, `inatividade.ts`, `EnviarFeedback.tsx`, `descanso.ts`, `lib/acesso.ts`, `PainelEvolucao.tsx`, `Botao`, `aluno-exemplo.test.ts`, `rules.test.ts`, `CardioHoje.tsx`, `prescreverSessao`, `prescreverSessao`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Lógica da planilha "Força 2027.1" — especificação do motor` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._