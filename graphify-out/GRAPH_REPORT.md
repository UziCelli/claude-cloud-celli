# Graph Report - claude-cloud-celli  (2026-11-10)

## Corpus Check
- 312 files · ~309,197 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3022 nodes · 8244 edges · 172 communities (153 shown, 19 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e23ed029`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- VozTreino.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- vitest
- vitest
- InicioAluno.tsx
- AvaliacaoCoach.tsx
- EditarTreino.tsx
- Cartao
- App.tsx
- Avaliacao.tsx
- engine/index.ts
- Alunos.tsx
- Alertas.tsx
- SessaoCard.tsx
- EnviarFeedback.tsx
- Segurança — passos do Victor no console
- GuiaMetodos.tsx
- iaTreino.ts
- prints.spec.ts
- PagarPix.tsx
- Feedbacks.tsx
- jwt.ts
- InicioAluno.tsx
- Estado da sessão (retomada) — atualizado em 09/11/2026
- cartaoStory.ts
- Cartao
- registrarErro
- Logo
- settings.json
- @playwright/test
- conversores.test.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avaliacao.ts
- acoes.ts
- sessao.ts
- vidro.tsx
- validar.ts
- Msg
- Coleções Firestore
- devDependencies
- Onde fica cada coisa
- evolucao.ts
- firebase-admin
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- engine/index.ts
- Plano — App da Gislane (segunda marca)
- treino.test.ts
- package.json
- scripts
- Inicio.tsx
- Presencial.tsx
- main.tsx
- @playwright/test
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- Principal
- avaliacao.ts
- push.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- ui.tsx
- fetch
- limpeza-lgpd.test.ts
- criarMeso
- PagarPix.tsx
- relatorio.spec.ts
- CardioHoje.tsx
- Coleções Firestore
- importar-meso.mjs
- conversores.ts
- Entrar.tsx
- overrides
- Onboarding.tsx
- relatorio.test.ts
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- firebase-admin
- AlunoApp.tsx
- Meso
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
- MinhaConta.tsx
- gislane/Logo.tsx
- cartaoDepoimento.ts
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- TutorialCoach.tsx
- layout.spec.ts
- TutorialCoach.tsx
- aluno.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- log.ts
- evolucao.test.ts
- Árvore por pasta
- Tutorial.tsx
- inatividade.ts
- cors.ts
- VozTreino.tsx
- engine/index.ts
- Treino.tsx
- criarCoach
- voz-ia.spec.ts
- atualizar.ts
- Nota
- fetch
- AssistenteIA.tsx
- limpeza
- marca
- Campo
- env
- TabDivisao
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- Push do descanso (Entrega 3b)
- with
- vidro.tsx
- preparar
- motion
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- tutorial.spec.ts
- Aceite
- EditorMeso
- Nota
- cardio.spec.ts
- Plano — Painel de Evolução (03/10/2026)
- varredura.spec.ts
- AvisoNotificacoes.tsx
- ehRecorde

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 140 edges
2. `Botao()` - 101 edges
3. `Treino()` - 78 edges
4. `react` - 68 edges
5. `vitest` - 67 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 52 edges
8. `Cartao()` - 49 edges
9. `registrarErro()` - 46 edges
10. `firebase` - 45 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Entregas` --references--> `normalizarCargas()`  [INFERRED]
  docs/estado-sessao.md → src/lib/conversores.ts

## Import Cycles
- None detected.

## Communities (172 total, 19 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.13
Nodes (20): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Armazem (+12 more)

### Community 1 - "VozTreino.tsx"
Cohesion: 0.11
Nodes (32): `src/features/aluno/` — App do aluno, `src/features/conta/` — Minha Conta, Avatar(), iniciais(), AvisoDescanso(), ContaAluno(), escolherFoto(), sairAgora() (+24 more)

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

### Community 6 - "vitest"
Cohesion: 0.09
Nodes (32): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+24 more)

### Community 7 - "vitest"
Cohesion: 0.09
Nodes (17): 1. Configuração do mesociclo, `mesos/{mesoId}`, vitest, m(), semanas(), igual(), Linhas, migrarProgressao() (+9 more)

### Community 8 - "InicioAluno.tsx"
Cohesion: 0.17
Nodes (27): LGPD, NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso() (+19 more)

### Community 9 - "AvaliacaoCoach.tsx"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.11
Nodes (12): ALUNO, COACH, NOMES, ALUNO, COACH, marca, ALUNO, COACH (+4 more)

### Community 11 - "Cartao"
Cohesion: 0.14
Nodes (28): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS, copiarLink() (+20 more)

### Community 12 - "App.tsx"
Cohesion: 0.08
Nodes (38): BIO, Ciclo, DESCE, Destaque, DobraId, DOBRAS, FAIXA, fmtDelta() (+30 more)

### Community 13 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (30): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SetaIc(), TEXTO_COR, COR_TOM (+22 more)

### Community 14 - "engine/index.ts"
Cohesion: 0.17
Nodes (25): Registros, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes() (+17 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.16
Nodes (25): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), comparar(), ConfirmarAluno() (+17 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.15
Nodes (21): nomes(), prescreverSessao(), slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), grupoDe (+13 more)

### Community 17 - "SessaoCard.tsx"
Cohesion: 0.05
Nodes (43): concurrency, needs, runs-on, steps, strategy, group, BACKUP_SENHA, EVENTO (+35 more)

### Community 18 - "EnviarFeedback.tsx"
Cohesion: 0.05
Nodes (40): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+32 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (21): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+13 more)

### Community 20 - "GuiaMetodos.tsx"
Cohesion: 0.18
Nodes (12): COR_METODO, metodoDoRotulo(), METODOS, ORDEM, ExplicacaoMetodo(), Modal(), NotaMetodos(), IconeMetodo() (+4 more)

### Community 21 - "iaTreino.ts"
Cohesion: 0.14
Nodes (23): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), acharPosicao(), corpoPedido(), descreverAcao(), doCatalogo, ExercicioProposto, FERRAMENTA, inteiroOpc() (+15 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (11): ANTES, DIAS_AUTO, ids, marca, NOMES, PROIBIDO, T1, T2 (+3 more)

### Community 23 - "PagarPix.tsx"
Cohesion: 0.17
Nodes (17): contaDoDia(), dataCurta(), PagarPix(), PIX, reais(), useHoje(), Chip(), ComAtraso() (+9 more)

### Community 24 - "Feedbacks.tsx"
Cohesion: 0.13
Nodes (25): CONFETE, dur(), FimTreino(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+17 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "InicioAluno.tsx"
Cohesion: 0.07
Nodes (63): Meso, AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), InicioAluno() (+55 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 09/11/2026"
Cohesion: 0.05
Nodes (35): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+27 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.14
Nodes (32): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), ajustar(), caixa() (+24 more)

### Community 29 - "Cartao"
Cohesion: 0.18
Nodes (19): tempoPorSemana(), Preview(), LinhaAcima(), AjustarVolume(), aplicar(), fmt(), Modo, Previa (+11 more)

### Community 30 - "registrarErro"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "Logo"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 34 - "conversores.test.ts"
Cohesion: 0.13
Nodes (16): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), FestaRecorde(), FaixaAjustado(), cancelarTreino(), voltarAoPlanejado(), caminhoCarga(), docParaCargas() (+8 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.17
Nodes (19): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), Inscricao, criptografar() (+11 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "avaliacao.ts"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 39 - "acoes.ts"
Cohesion: 0.19
Nodes (14): Editor(), arquivarAlerta(), liberarRelatorio(), recolherRelatorio(), relatorio(), salvarAvaliacao(), salvarRelatorio(), AvaliacaoForm (+6 more)

### Community 40 - "sessao.ts"
Cohesion: 0.16
Nodes (19): cobre(), extraTempo(), linhaPrescrita(), sufixo(), TAMANHO, AlvoVolume, ExercicioPrescrito, Sessao (+11 more)

### Community 41 - "vidro.tsx"
Cohesion: 0.19
Nodes (19): Peças compartilhadas (já no código), ativaAba(), Menu(), AvaliacaoPronta(), RelatorioPronto(), Atalho, marcarVisto(), Onboarding() (+11 more)

### Community 42 - "validar.ts"
Cohesion: 0.11
Nodes (34): CacheAcesso, DO_ALUNO, Env, Mensagem, ROBO, TREINO, alvosDe(), Aviso (+26 more)

### Community 43 - "Msg"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Coleções Firestore"
Cohesion: 0.15
Nodes (9): ALUNO, COACH, PNG, ALUNO, COACH, iniciarEConcluir(), seg(), semear() (+1 more)

### Community 45 - "devDependencies"
Cohesion: 0.10
Nodes (19): name, private, type, version, @cloudflare/workers-types, @firebase/rules-unit-testing, firebase-tools, tailwindcss (+11 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.19
Nodes (17): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.12
Nodes (38): `src/lib/` — Firestore, estado, cálculos com dados, Peças, avaliacoesParaFazer(), arred(), calcular(), cargasPositivas(), coletar(), Conquista (+30 more)

### Community 48 - "firebase-admin"
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

### Community 52 - "engine/index.ts"
Cohesion: 0.19
Nodes (11): ESCOPOS, mediana(), metaCiclo(), metaRobusta(), divisao, meso, Equipamento, PropostaMetodo (+3 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "treino.test.ts"
Cohesion: 0.08
Nodes (25): runs-on, steps, description, required, description, required, EMAIL_ATUAL, EMAIL_NOVO (+17 more)

### Community 55 - "package.json"
Cohesion: 0.09
Nodes (25): concurrency, cancel-in-progress, group, runs-on, steps, SA, runs-on, steps (+17 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "Inicio.tsx"
Cohesion: 0.19
Nodes (20): useArquivados(), Feedbacks(), mediaTexto(), useFeedbacks(), Inicio(), saudacao(), Aba, ABAS (+12 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.20
Nodes (21): `src/` — Raiz, Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente(), lerGrupo(), lerRecentes() (+13 more)

### Community 59 - "main.tsx"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.12
Nodes (27): deveMostrarBoasVindas(), ler(), Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar() (+19 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.18
Nodes (30): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+22 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "Principal"
Cohesion: 0.28
Nodes (11): sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, marcar() (+3 more)

### Community 65 - "avaliacao.ts"
Cohesion: 0.10
Nodes (39): Cartao(), Doc, Estrelas(), FILTROS, ConviteFeedback(), Faixa(), FaixaFeedback(), chip() (+31 more)

### Community 66 - "push.ts"
Cohesion: 0.18
Nodes (23): enviar(), agendarPush(), avisarTreinoPronto(), avisosDesligados(), b64uParaBytes(), BASE, cabecalhosPush(), cancelarPush() (+15 more)

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

### Community 73 - "ui.tsx"
Cohesion: 0.15
Nodes (17): Aba, ABAS, DIAS_SEMANA, TITULO_ABA, DIAS_AUTO, agil, saida, suave (+9 more)

### Community 74 - "fetch"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarMeso"
Cohesion: 0.10
Nodes (20): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+12 more)

### Community 77 - "PagarPix.tsx"
Cohesion: 0.43
Nodes (3): uqr, QrCadastro(), qrDataUrl()

### Community 78 - "relatorio.spec.ts"
Cohesion: 0.15
Nodes (12): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+4 more)

### Community 79 - "CardioHoje.tsx"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Coleções Firestore"
Cohesion: 0.05
Nodes (35): `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}` (+27 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "conversores.ts"
Cohesion: 0.12
Nodes (28): firebase, Cargas, CORES, RegistroDocCompleto, VisaoSemana(), diaSP(), diasParaVencer(), fimDoDiaSaoPaulo() (+20 more)

### Community 83 - "Entrar.tsx"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Onboarding.tsx"
Cohesion: 0.19
Nodes (16): Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog(), Item (+8 more)

### Community 86 - "relatorio.test.ts"
Cohesion: 0.18
Nodes (8): MesoEvolucao, agora, linha, m0, m1, meso(), registros, slot()

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "pwa-assets.config.ts"
Cohesion: 0.13
Nodes (42): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), react, BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa (+34 more)

### Community 90 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 91 - "AlunoApp.tsx"
Cohesion: 0.17
Nodes (21): Logo(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+13 more)

### Community 92 - "Meso"
Cohesion: 0.30
Nodes (13): `registros/{regId}`, 7. Teste de ataques (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros() (+5 more)

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

### Community 108 - "MinhaConta.tsx"
Cohesion: 0.16
Nodes (22): 09/10/2026 — Segurança, movimento e aba Conta, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail() (+14 more)

### Community 110 - "cartaoDepoimento.ts"
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

### Community 119 - "TutorialCoach.tsx"
Cohesion: 0.29
Nodes (16): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+8 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "TutorialCoach.tsx"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach) (+6 more)

### Community 122 - "aluno.spec.ts"
Cohesion: 0.14
Nodes (7): ALUNO, COACH, ALUNO, COACH, CORS, CAINDO, COACH

### Community 134 - "log.ts"
Cohesion: 0.09
Nodes (35): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, trocarSenha(), AcaoEmail(), salvar(), ACOES (+27 more)

### Community 135 - "evolucao.test.ts"
Cohesion: 0.19
Nodes (12): agora, dia(), emSemana(), feito(), linha, m1, meso(), painel() (+4 more)

### Community 136 - "Árvore por pasta"
Cohesion: 0.18
Nodes (20): Onde mexer para…, CardioHoje(), dataCurta(), EvolucaoAluno(), Faixa(), Painel(), plural(), segunda() (+12 more)

### Community 138 - "inatividade.ts"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "VozTreino.tsx"
Cohesion: 0.11
Nodes (23): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+15 more)

### Community 141 - "engine/index.ts"
Cohesion: 0.13
Nodes (27): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+19 more)

### Community 142 - "Treino.tsx"
Cohesion: 0.15
Nodes (27): Convenção de gravação (TOTAL), AvisoAdaptado(), CONFETE, hms(), Novidades(), RegistroFlag, RelogioTreino(), Treino() (+19 more)

### Community 143 - "criarCoach"
Cohesion: 0.09
Nodes (21): COACH, ALUNO, COACH, ALUNO, amanha(), COACH, DOBRAS, COACH (+13 more)

### Community 144 - "voz-ia.spec.ts"
Cohesion: 0.60
Nodes (4): buscarExercicios(), itens, norm(), nomes()

### Community 145 - "atualizar.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "Nota"
Cohesion: 0.11
Nodes (29): `src/features/coach/` — App do coach, abertura(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+21 more)

### Community 147 - "fetch"
Cohesion: 0.22
Nodes (6): Descanso, fetch(), Fixa, nomeDO(), Tipo, ParVapid

### Community 148 - "AssistenteIA.tsx"
Cohesion: 0.39
Nodes (10): AssistenteIA(), remover(), salvar(), apagarChaveIA(), chaveMascarada(), chaveValida(), ERROS_HTTP, refChave() (+2 more)

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "Campo"
Cohesion: 0.40
Nodes (9): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaSugerida() (+1 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "TabDivisao"
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

### Community 157 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "vidro.tsx"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "motion"
Cohesion: 0.32
Nodes (5): motion, react-dom, carregar(), Features, montar()

### Community 162 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.29
Nodes (6): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 163 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 165 - "EditorMeso"
Cohesion: 0.47
Nodes (6): EditorMeso(), atualizar(), salvar(), setSemanas(), estavel(), marcarAdaptado()

### Community 166 - "Nota"
Cohesion: 0.67
Nodes (4): `notas/{alunoId}`, Nota(), salvarNota(), avisarCoach()

### Community 167 - "cardio.spec.ts"
Cohesion: 0.20
Nodes (22): App(), Coach(), PerfilDemora(), pedir(), Principal(), SemAcesso(), Vigia(), AlunoApp() (+14 more)

### Community 168 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 170 - "AvisoNotificacoes.tsx"
Cohesion: 0.83
Nodes (3): AvisoNotificacoes(), permissao(), IcSino

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1202 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `descanso.ts`, `VozTreino.tsx`, `ataques.test.ts`, `vitest`, `evolucao.test.ts`, `Árvore por pasta`, `log.ts`, `cors.ts`, `App.tsx`, `engine/index.ts`, `engine/index.ts`, `Alertas.tsx`, `voz-ia.spec.ts`, `Nota`, `atualizar.ts`, `GuiaMetodos.tsx`, `iaTreino.ts`, `prints.spec.ts`, `PagarPix.tsx`, `Feedbacks.tsx`, `jwt.ts`, `InicioAluno.tsx`, `Estado da sessão (retomada) — atualizado em 09/11/2026`, `cartaoStory.ts`, `Cartao`, `vidro.tsx`, `conversores.test.ts`, `webpush.ts`, `Aceite`, `avaliacao.ts`, `sessao.ts`, `validar.ts`, `ehRecorde`, `devDependencies`, `Onde fica cada coisa`, `src/acesso.ts`, `engine/index.ts`, `Entrar.tsx`, `TabMetodos.tsx`, `Principal`, `avaliacao.ts`, `push.ts`, `ui.tsx`, `limpeza-lgpd.test.ts`, `PagarPix.tsx`, `conversores.ts`, `Onboarding.tsx`, `relatorio.test.ts`, `pwa-assets.config.ts`, `firebase-admin`, `Meso`, `MinhaConta.tsx`, `cartaoDepoimento.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Are the 139 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 139 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `descanso.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12681159420289856 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `conversores.test.ts` to `VozTreino.tsx`, `log.ts`, `InicioAluno.tsx`, `Árvore por pasta`, `App.tsx`, `engine/index.ts`, `Treino.tsx`, `Alunos.tsx`, `Alertas.tsx`, `engine/index.ts`, `Avaliacao.tsx`, `fetch`, `GuiaMetodos.tsx`, `iaTreino.ts`, `PagarPix.tsx`, `Feedbacks.tsx`, `Campo`, `InicioAluno.tsx`, `Estado da sessão (retomada) — atualizado em 09/11/2026`, `cartaoStory.ts`, `Cartao`, `Aceite`, `avaliacao.ts`, `cardio.spec.ts`, `sessao.ts`, `vidro.tsx`, `validar.ts`, `acoes.ts`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `Inicio.tsx`, `Presencial.tsx`, `TabMetodos.tsx`, `Principal`, `push.ts`, `ui.tsx`, `Coleções Firestore`, `conversores.ts`, `Onboarding.tsx`, `pwa-assets.config.ts`, `AlunoApp.tsx`, `Meso`, `MinhaConta.tsx`, `TutorialCoach.tsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `VozTreino.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._