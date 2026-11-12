# Graph Report - claude-cloud-celli  (2026-11-12)

## Corpus Check
- 351 files · ~331,634 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3286 nodes · 9238 edges · 172 communities (157 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 390 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `39d140b6`
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
- Pontos sensíveis (leia antes de auditar ou mexer)
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
- Inicio.tsx
- avisos-pagamento.mjs
- aluno-exemplo.mjs
- webpush.ts
- pix.ts
- firebase-admin
- firebase-admin
- criarAluno
- util.ts
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
- VozTreino.tsx
- steps
- Tutorial.tsx
- diaSP
- prescreverSessao
- Motion / Framer Motion Examples
- inatividade.ts
- VozTreino
- push.ts
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- ui.tsx
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
- src/ia.ts
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
- AnamneseCoach.tsx
- gislane/Logo.tsx
- SessaoCard.tsx
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
- acoes.ts
- react
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- saude.yml
- src/index.ts
- avaliacao.spec.ts
- cartaoRelatorio.ts
- tutorial.spec.ts
- erros.mjs
- evolucao.test.ts
- Árvore por pasta
- relatorio.ts
- Descanso
- aluno-exemplo.test.ts
- limpeza
- marca
- prescreverSessao
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- voz-ia.spec.ts
- with
- @playwright/test
- preparar
- criarMeso
- firebase-admin
- varredura.spec.ts
- Avaliacao.tsx
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- relatorio.test.ts
- fmtMin
- marca.test.ts
- evolucao.spec.ts
- pwa-assets.config.ts
- semana.test.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 148 edges
2. `Botao()` - 134 edges
3. `Treino()` - 84 edges
4. `react` - 78 edges
5. `vitest` - 74 edges
6. `prescreverSessao()` - 57 edges
7. ``src/lib/` — Firestore, estado, cálculos com dados` - 56 edges
8. `Meso` - 55 edges
9. `registrarErro()` - 52 edges
10. `diaSP()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `versao()`  [INFERRED]
  docs/mapa.md → e2e/privacidade.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- ``src/features/conta/` — Minha Conta` --references--> `Chave()`  [INFERRED]
  docs/mapa.md → src/features/conta/ChavesAvisos.tsx

## Import Cycles
- 2-file cycle: `src/lib/avaliacao.ts -> src/lib/segmentos.ts -> src/lib/avaliacao.ts`

## Communities (172 total, 15 thin omitted)

### Community 0 - "vidro.tsx"
Cohesion: 0.25
Nodes (19): Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), jaViuPopup(), marcarPopup(), Msg(), Quadros() (+11 more)

### Community 1 - "AcaoEmail.tsx"
Cohesion: 0.13
Nodes (21): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+13 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.13
Nodes (15): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+7 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (43): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+35 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "lib/planilha.test.ts"
Cohesion: 0.09
Nodes (32): abaAntigaFalsa(), abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc (+24 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.13
Nodes (30): AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), diaCurto() (+22 more)

### Community 8 - "TabProgressao.tsx"
Cohesion: 0.19
Nodes (20): ESCOPOS, linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento() (+12 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.10
Nodes (20): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, marca, versao() (+12 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (28): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+20 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.09
Nodes (35): BIO, Ciclo, corteAvaliacoes(), Destaque, DobraId, DOBRAS, FAIXA, forca() (+27 more)

### Community 13 - "vitest"
Cohesion: 0.12
Nodes (24): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, vitest, mediana(), metaCiclo(), metaRobusta() (+16 more)

### Community 14 - "util.ts"
Cohesion: 0.19
Nodes (20): CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes() (+12 more)

### Community 15 - "App.tsx"
Cohesion: 0.09
Nodes (47): `src/engine/` — Motor de cálculo puro (sem React/Firebase), COR_METODO, METODOS, ORDEM, adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara() (+39 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.06
Nodes (59): `src/lib/` — Firestore, estado, cálculos com dados, useAnamnese(), chip(), EnviarFeedback(), enviar(), Opcao(), IcEstrela(), enviarFeedback() (+51 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.08
Nodes (23): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+15 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.09
Nodes (45): `notas/{alunoId}`, metodoDoRotulo(), AvisoNotificacoes(), permissao(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), hms() (+37 more)

### Community 21 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.16
Nodes (12): Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, Testes, FestaRecorde(), FaixaAjustado(), voltarAoPlanejado(), seriesDestacadas(), seriesDoRotulo() (+4 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (15): ALUNO, COACH, ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+7 more)

### Community 23 - "segmentos.ts"
Cohesion: 0.11
Nodes (24): DESCE, Leitura, PAR_DOBRA, REGIAO, Tom, buscarExercicios(), itens, norm() (+16 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.16
Nodes (14): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, CONFETE, dur(), FimTreino(), escolher() (+6 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): deb64u(), abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims (+13 more)

### Community 26 - "Alunos.tsx"
Cohesion: 0.07
Nodes (56): EsqueciSenha(), enviar(), mensagemRecuperar(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar() (+48 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.04
Nodes (42): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+34 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.14
Nodes (31): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), ajustar(), caixa() (+23 more)

### Community 29 - "Entrar.tsx"
Cohesion: 0.10
Nodes (34): Entrar(), enviar(), voltar(), erros, mensagemErro(), conferir(), criarNova(), tentar() (+26 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "Inicio.tsx"
Cohesion: 0.10
Nodes (43): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+35 more)

### Community 34 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.15
Nodes (18): RFC-8188, RFC-8292, b64u(), juntar(), assinar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 38 - "firebase-admin"
Cohesion: 0.22
Nodes (4): app, auth, COLECOES, db

### Community 39 - "firebase-admin"
Cohesion: 0.11
Nodes (9): firebase-admin@14.5.0, firebase-admin, app, auth, COLECOES, db, SCRIPTS, atual (+1 more)

### Community 40 - "criarAluno"
Cohesion: 0.13
Nodes (10): doAluno(), PARQ_NAO, ALUNO, COACH, ALUNO, COACH, marca, criarAluno() (+2 more)

### Community 41 - "util.ts"
Cohesion: 0.09
Nodes (36): `src/features/coach/` — App do coach, emGrupo(), limpa(), METODOS, salvarLinha(), AcaoDivisao, aplicarAcoes(), aplicarDivisao() (+28 more)

### Community 42 - "src/index.ts"
Cohesion: 0.14
Nodes (27): fetch(), recado(), PROJETOS, Aviso, bytesOk(), endpointOk(), Fixa, hostOk() (+19 more)

### Community 43 - "steps"
Cohesion: 0.06
Nodes (30): description, required, ALUNO, MESO, NOME, SA, if, runs-on (+22 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.10
Nodes (25): devDependencies, @cloudflare/workers-types@^5.20260930.2, @firebase/rules-unit-testing@^5.0.2, firebase-tools@^15.33.0, @playwright/test@^1.63.0, tailwindcss@^4.3.3, @tailwindcss/vite@^4.3.3, @types/react@^19.0.0 (+17 more)

### Community 46 - "main.tsx"
Cohesion: 0.36
Nodes (5): motion, App(), carregar(), Features, montar()

### Community 47 - "evolucao.ts"
Cohesion: 0.17
Nodes (22): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao (+14 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Botao"
Cohesion: 0.11
Nodes (37): ativaAba(), Coach(), Menu(), PerfilDemora(), pedir(), Principal(), SemAcesso(), AlunoApp() (+29 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.17
Nodes (16): acessoComCache(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), quemAvisaCoach() (+8 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "MinhaConta.tsx"
Cohesion: 0.17
Nodes (19): erroSenha(), SenhaSegura(), esqueci(), DuasEtapas(), erros, mensagemErro(), MinhaConta(), trocarEmail() (+11 more)

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

### Community 57 - "Presencial.tsx"
Cohesion: 0.25
Nodes (18): `src/` — Raiz, Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente(), lerGrupo(), lerRecentes() (+10 more)

### Community 58 - "VozTreino.tsx"
Cohesion: 0.22
Nodes (16): ROTULO, AssistenteIA(), remover(), salvar(), appCheck, apagarChaveIA(), BASE, chamar() (+8 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "Tutorial.tsx"
Cohesion: 0.18
Nodes (22): Logo(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+14 more)

### Community 61 - "diaSP"
Cohesion: 0.23
Nodes (17): AvisoAtraso(), chave(), jaViu(), mesoAtual(), contaDoDia(), PagarPix(), copiar(), PIX (+9 more)

### Community 62 - "prescreverSessao"
Cohesion: 0.12
Nodes (25): cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), ANTAGONISTAS, aplicarSugestao(), Candidato (+17 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.15
Nodes (19): Vigia(), sairAgora(), Aceite(), aceitar(), CaixaAceite(), Lista(), Politica(), Secao() (+11 more)

### Community 65 - "VozTreino"
Cohesion: 0.12
Nodes (20): VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto(), silenciar() (+12 more)

### Community 66 - "push.ts"
Cohesion: 0.06
Nodes (52): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+44 more)

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): vite@^8.3.4, vite-plugin-pwa@^1.3.0, vite, vite-plugin-pwa, arquivos(), previewHeaders, TIPOS, versao

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
Cohesion: 0.13
Nodes (21): BotaoCompartilhar(), clicar(), compartilharArquivo(), dataCurta(), Faixa(), Painel(), plural(), segunda() (+13 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "lib/acesso.ts"
Cohesion: 0.16
Nodes (18): CARENCIA_DIAS, diasParaVencer(), emAtraso(), faltaSegundoFator(), fimDoDiaSaoPaulo(), Foto, liberado(), vencePerto() (+10 more)

### Community 76 - "criarCoach"
Cohesion: 0.09
Nodes (25): COACH, ALUNO, COACH, PNG, COACH, ALUNO, COACH, ALUNO (+17 more)

### Community 77 - "PainelEvolucao.tsx"
Cohesion: 0.12
Nodes (25): Onde fica cada coisa, hoje, mk(), mesoPadrao(), cancelarTreino(), arred(), caminhoCarga(), CargasDoc (+17 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.17
Nodes (11): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+3 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "Botao"
Cohesion: 0.15
Nodes (22): `src/features/aluno/` — App do aluno, Avatar(), iniciais(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde() (+14 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "pdfAvaliacao.ts"
Cohesion: 0.17
Nodes (21): carregar(), COR_TOM, corpo(), EntradaPdfAvaliacao, gerarPdfAvaliacao(), seta(), C, criarFolhas() (+13 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "TutorialCoach.tsx"
Cohesion: 0.28
Nodes (16): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+8 more)

### Community 86 - "aluno-exemplo.test.ts"
Cohesion: 0.19
Nodes (15): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), arred() (+7 more)

### Community 87 - "src/ia.ts"
Cohesion: 0.19
Nodes (14): appCheckOk(), ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, MAX_CORPO_IA, metadados() (+6 more)

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 90 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 91 - "Coleções Firestore"
Cohesion: 0.13
Nodes (14): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}` (+6 more)

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
Cohesion: 0.25
Nodes (8): dependencies, firebase@^12.19.0, motion@^13.4.6, react@^19.3.0, react-dom@^19.3.0, uqr@^0.1.3, react-dom, uqr

### Community 100 - "CardioHoje.tsx"
Cohesion: 0.33
Nodes (11): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+3 more)

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

### Community 108 - "AnamneseCoach.tsx"
Cohesion: 0.15
Nodes (28): Onde mexer para…, apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach (+20 more)

### Community 110 - "SessaoCard.tsx"
Cohesion: 0.18
Nodes (14): fmt(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcCheck, registrarCarga() (+6 more)

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
Cohesion: 0.10
Nodes (53): dataSP(), proximoMeso(), Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar() (+45 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "prescreverSessao"
Cohesion: 0.08
Nodes (35): AlertaAbaixo, AlertaAcima, AlertaDemorado, calcularAlertas(), Grupos, Reg, agora, alunos (+27 more)

### Community 122 - "criarAluno"
Cohesion: 0.21
Nodes (9): ANTIGA(), confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo() (+1 more)

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (22): ARTE, clarear(), COR_CORPO, corParte(), ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista() (+14 more)

### Community 135 - "acoes.ts"
Cohesion: 0.09
Nodes (37): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), BotaoPdfAvaliacao(), Editor(), Faixa, fora(), hoje(), num(), Textos (+29 more)

### Community 136 - "react"
Cohesion: 0.17
Nodes (31): firebase, react, AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), AvaliacoesCoach(), useAvaliacoesDoAluno(), Aba (+23 more)

### Community 137 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.22
Nodes (8): Critério de pronto, LGPD, Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, v2 (10/11/2026): tela do aluno resumida, cores de evolução e leitura medida x dobra

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 139 - "src/index.ts"
Cohesion: 0.17
Nodes (12): CacheAcesso, cors(), ORIGENS, AcaoIA, ROTAS_IA, DESCANSO, DO_ALUNO, Env (+4 more)

### Community 140 - "avaliacao.spec.ts"
Cohesion: 0.22
Nodes (4): ALUNO, amanha(), COACH, DOBRAS

### Community 141 - "cartaoRelatorio.ts"
Cohesion: 0.25
Nodes (12): dadosCartaoRelatorio(), dataBr(), num(), periodoTexto(), r, textosRelatorio(), volumeTexto(), Bloco() (+4 more)

### Community 142 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 143 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 144 - "evolucao.test.ts"
Cohesion: 0.17
Nodes (15): painelEvolucao(), recordeAnterior(), agora, dia(), emSemana(), feito(), linha, m1 (+7 more)

### Community 145 - "Árvore por pasta"
Cohesion: 0.12
Nodes (16): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+8 more)

### Community 146 - "relatorio.ts"
Cohesion: 0.35
Nodes (10): `relatorios/{mesoId}`, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), Peças, historicoExercicios(), recordesDe(), treinosFeitos(), arred(), RelatorioCiclo (+2 more)

### Community 147 - "Descanso"
Cohesion: 0.15
Nodes (6): Descanso, alvosDe(), comAparelho(), inicioDoDiaBrasilia(), nomeDO(), semAparelho()

### Community 148 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "prescreverSessao"
Cohesion: 0.09
Nodes (27): assinatura(), LinhaMetodo, LinhaSalva, linhasDoExercicio(), semanasTexto(), SEQUENCIA, m(), semanas() (+19 more)

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

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "@playwright/test"
Cohesion: 0.11
Nodes (9): ALUNO, COACH, NOMES, ALUNO, COACH, CORS, ALUNO, COACH (+1 more)

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.09
Nodes (19): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, semearFormatoAntigo() (+11 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 164 - "Avaliacao.tsx"
Cohesion: 0.23
Nodes (16): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), CorpoSvg() (+8 more)

### Community 165 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.22
Nodes (8): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 166 - "relatorio.test.ts"
Cohesion: 0.19
Nodes (11): MesoEvolucao, agora, feito(), linha, m0, m1, meso(), registros (+3 more)

### Community 167 - "fmtMin"
Cohesion: 0.54
Nodes (5): Preview(), acimaDoLimite(), fmtMin(), fmtReps(), Deslizar()

### Community 168 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 169 - "evolucao.spec.ts"
Cohesion: 0.40
Nodes (4): ALUNO, COACH, diasAtras(), semear()

### Community 170 - "pwa-assets.config.ts"
Cohesion: 0.50
Nodes (3): @vite-pwa/assets-generator@^1.0.4, fundo, @vite-pwa/assets-generator

## Knowledge Gaps
- **4 isolated node(s):** `RFC-8291`, `RFC-8292`, `RFC-8291`, `RFC-8188`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1272 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `AcaoEmail.tsx`, `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `TabProgressao.tsx`, `acoes.ts`, `lib/planilha.test.ts`, `src/index.ts`, `avaliacao.ts`, `cartaoRelatorio.ts`, `util.ts`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `evolucao.test.ts`, `Treino.tsx`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `prints.spec.ts`, `prescreverSessao`, `segmentos.ts`, `jwt.ts`, `Alunos.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `Entrar.tsx`, `avisos-pagamento.mjs`, `webpush.ts`, `pix.ts`, `relatorio.test.ts`, `fmtMin`, `marca.test.ts`, `util.ts`, `src/index.ts`, `semana.test.ts`, `firebase-admin`, `package.json`, `firebase-admin`, `src/acesso.ts`, `MinhaConta.tsx`, `prescreverSessao`, `inatividade.ts`, `push.ts`, `ui.tsx`, `lib/acesso.ts`, `PainelEvolucao.tsx`, `Botao`, `aluno-exemplo.test.ts`, `src/ia.ts`, `rules.test.ts`, `CardioHoje.tsx`, `aluno-exemplo.test.ts`, `SessaoCard.tsx`, `prescreverSessao`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Are the 146 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `versao()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 146 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RFC-8291`, `RFC-8292`, `RFC-8291` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AcaoEmail.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12615384615384614 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `AcaoEmail.tsx`, `Hoje.tsx`, `acoes.ts`, `react`, `seed.ts`, `avaliacao.ts`, `vitest`, `util.ts`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `evolucao.test.ts`, `relatorio.ts`, `Descanso`, `Treino.tsx`, `FimTreino.tsx`, `Alunos.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `cartaoStory.ts`, `Entrar.tsx`, `Inicio.tsx`, `avisos-pagamento.mjs`, `pix.ts`, `fmtMin`, `util.ts`, `src/index.ts`, `evolucao.ts`, `Botao`, `src/acesso.ts`, `MinhaConta.tsx`, `Presencial.tsx`, `Tutorial.tsx`, `diaSP`, `prescreverSessao`, `inatividade.ts`, `push.ts`, `ui.tsx`, `lib/acesso.ts`, `PainelEvolucao.tsx`, `Botao`, `pdfAvaliacao.ts`, `aluno-exemplo.test.ts`, `src/ia.ts`, `Coleções Firestore`, `CardioHoje.tsx`, `AnamneseCoach.tsx`, `SessaoCard.tsx`, `MesosDoAluno.tsx`, `layout.spec.ts`, `prescreverSessao`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._