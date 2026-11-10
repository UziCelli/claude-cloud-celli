# Graph Report - claude-cloud-celli  (2026-11-10)

## Corpus Check
- 309 files · ~302,056 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2971 nodes · 8082 edges · 161 communities (145 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 364 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8654fe0b`
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
- Feedbacks.tsx
- env
- @playwright/test
- BoasVindas.tsx
- AvaliacaoCoach.tsx
- pdfRelatorio.ts
- util.ts
- Alunos.tsx
- prescreverSessao
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- cartaoRelatorio.ts
- prints.spec.ts
- codigoPix
- FimTreino.tsx
- jwt.ts
- Inicio.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- CardioHoje.tsx
- steps
- steps
- settings.json
- criarAluno
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avisos-pagamento.mjs
- avaliacao.spec.ts
- TabProgressao.tsx
- 5. Auditoria 02/10/2026 (segurança + LGPD)
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- Onde fica cada coisa
- PainelEvolucao.tsx
- with
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- vite.config.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- vfit/Logo.tsx
- Presencial.tsx
- steps
- sair.spec.ts
- Entrar.tsx
- engine/index.ts
- Motion / Framer Motion Examples
- voz-ia.spec.ts
- EnviarFeedback.tsx
- AcaoEmail.tsx
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- GuiaMetodos.tsx
- steps
- limpeza-lgpd.test.ts
- criarMeso
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- importar-meso.mjs
- InicioAluno.tsx
- with
- overrides
- vitest
- relatorio.ts
- limpeza-lgpd.mjs
- Performance Optimization
- firebase
- firebase-admin
- Coleções Firestore
- metricas.ts
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
- acoes.ts
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
- TutorialCoach.tsx
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- m
- erros.mjs
- Árvore por pasta
- icones.tsx
- saude.yml
- cors.ts
- useDoc
- montarPdf
- criarCoach
- rules.test.ts
- lib/acesso.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- limpeza
- marca
- marcas_vfit_marca
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- cardio.spec.ts
- with
- aluno-exemplo.test.ts
- preparar
- tutorial.spec.ts
- Plano — Painel de Evolução (03/10/2026)
- App.tsx

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 134 edges
2. `Botao()` - 99 edges
3. `Treino()` - 78 edges
4. `react` - 66 edges
5. `vitest` - 66 edges
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
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx

## Import Cycles
- None detected.

## Communities (161 total, 16 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (57): `src/lib/` — Firestore, estado, cálculos com dados, 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta (+49 more)

### Community 1 - "iaTreino.ts"
Cohesion: 0.12
Nodes (25): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), Acao, acharPosicao(), corpoPedido(), descreverAcao(), doCatalogo, ExercicioProposto, FERRAMENTA (+17 more)

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
Nodes (30): AvisoReps(), RegistroFlag, SemanaCarregada(), Treinos(), dataSP(), diaCurto(), quando(), Preview() (+22 more)

### Community 8 - "Feedbacks.tsx"
Cohesion: 0.19
Nodes (17): Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), BotaoCompartilhar(), clicar() (+9 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "@playwright/test"
Cohesion: 0.09
Nodes (11): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, CORS (+3 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.17
Nodes (26): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+18 more)

### Community 12 - "AvaliacaoCoach.tsx"
Cohesion: 0.09
Nodes (48): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Avaliacao(), BotaoPdfAvaliacao(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa, fora() (+40 more)

### Community 13 - "pdfRelatorio.ts"
Cohesion: 0.19
Nodes (13): C, criarFolhas(), disp(), LARG, M, MUDO, PH, PW (+5 more)

### Community 14 - "util.ts"
Cohesion: 0.12
Nodes (33): Registros, Slot, CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar() (+25 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.09
Nodes (42): LGPD, reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar() (+34 more)

### Community 16 - "prescreverSessao"
Cohesion: 0.12
Nodes (26): cobre(), extraTempo(), metodosDaSessao(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO, ANTAGONISTAS (+18 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (43): concurrency, needs, runs-on, steps, strategy, group, BACKUP_SENHA, EVENTO (+35 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (40): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+32 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.12
Nodes (15): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h) (+7 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.09
Nodes (42): `notas/{alunoId}`, metodoDoRotulo(), AvisoNotificacoes(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms() (+34 more)

### Community 21 - "cartaoRelatorio.ts"
Cohesion: 0.23
Nodes (16): pngDe(), dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num(), periodoTexto(), r (+8 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (15): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+7 more)

### Community 23 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 24 - "FimTreino.tsx"
Cohesion: 0.18
Nodes (14): CONFETE, dur(), FimTreino(), escolher(), Lista(), fmt(), ConviteFeedback(), IcCamera (+6 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "Inicio.tsx"
Cohesion: 0.32
Nodes (14): `src/features/coach/` — App do coach, useAlertasCoach(), useArquivados(), calcularAlertas(), chavesAtuais(), useFeedbacks(), Inicio(), saudacao() (+6 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.06
Nodes (30): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+22 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.23
Nodes (20): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), DadosTreino, desenhar(), desenharTreino(), desenharTreinoFoto() (+12 more)

### Community 29 - "CardioHoje.tsx"
Cohesion: 0.33
Nodes (11): Onde mexer para…, CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio() (+3 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "criarAluno"
Cohesion: 0.13
Nodes (12): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, COACH, semearFormatoAntigo() (+4 more)

### Community 34 - "conversores.ts"
Cohesion: 0.06
Nodes (52): Grupos, Reg, agora, alunos, linha, meso, mesos, registros (+44 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.17
Nodes (19): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), criptografar(), Efemera (+11 more)

### Community 37 - "seed.ts"
Cohesion: 0.15
Nodes (14): ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta(), definirPagoAte(), gravarDoc() (+6 more)

### Community 38 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 39 - "avaliacao.spec.ts"
Cohesion: 0.22
Nodes (4): ALUNO, amanha(), COACH, DOBRAS

### Community 40 - "TabProgressao.tsx"
Cohesion: 0.17
Nodes (22): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+14 more)

### Community 41 - "5. Auditoria 02/10/2026 (segurança + LGPD)"
Cohesion: 0.33
Nodes (6): 5. Auditoria 02/10/2026 (segurança + LGPD), Conferido e OK, Em aberto (decisão do Victor), LGPD (feito nesta auditoria), Passos do Victor (console, uma vez), Repositório público (22/10/2026)

### Community 42 - "src/index.ts"
Cohesion: 0.12
Nodes (29): CacheAcesso, DO_ALUNO, Env, Mensagem, ROBO, TREINO, Aviso, bytesOk() (+21 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.20
Nodes (9): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam (+1 more)

### Community 45 - "package.json"
Cohesion: 0.12
Nodes (14): name, private, type, version, fundo, @cloudflare/workers-types, @firebase/rules-unit-testing, firebase-tools (+6 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.19
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 47 - "PainelEvolucao.tsx"
Cohesion: 0.08
Nodes (48): Peças, dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda() (+40 more)

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

### Community 52 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

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

### Community 57 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 58 - "Presencial.tsx"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.11
Nodes (32): Entrar(), enviar(), voltar(), erros, mensagemErro(), CaixaAceite(), cadastrar(), confirmarLoginTotp() (+24 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.10
Nodes (54): `src/engine/` — Motor de cálculo puro (sem React/Firebase), adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries() (+46 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.15
Nodes (24): chip(), EnviarFeedback(), enviar(), Opcao(), enviarFeedback(), Assunto, ASSUNTOS, CHAVE_CONVITE (+16 more)

### Community 66 - "AcaoEmail.tsx"
Cohesion: 0.15
Nodes (21): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+13 more)

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

### Community 73 - "GuiaMetodos.tsx"
Cohesion: 0.27
Nodes (7): COR_METODO, METODOS, ORDEM, dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarMeso"
Cohesion: 0.12
Nodes (16): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), ALUNO (+8 more)

### Community 77 - "Alertas.tsx"
Cohesion: 0.13
Nodes (21): abertura(), Acoes(), Grupo(), rotulo, Saindo(), textoAbaixo(), textoAcima(), textoDemorado() (+13 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.14
Nodes (13): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+5 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.22
Nodes (8): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, dobras()

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "InicioAluno.tsx"
Cohesion: 0.18
Nodes (26): `src/features/aluno/` — App do aluno, Peças compartilhadas (já no código), Linha(), Hoje(), Msg(), Semana(), AvaliacaoPronta(), InicioAluno() (+18 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "vitest"
Cohesion: 0.08
Nodes (18): vitest, igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+10 more)

### Community 86 - "relatorio.ts"
Cohesion: 0.12
Nodes (16): Linha, Evolucao, MesoEvolucao, RegistroEvolucao, arred(), cicloTerminou(), RELATORIO_DIAS, relatoriosParaRevisar() (+8 more)

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "firebase"
Cohesion: 0.15
Nodes (30): firebase, AvaliacaoAluno(), Aba, ABAS, freq(), MEDALHA, RankingAlunos(), BotaoPdf() (+22 more)

### Community 90 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 91 - "Coleções Firestore"
Cohesion: 0.14
Nodes (13): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, Mapa do Código — Força (+5 more)

### Community 92 - "metricas.ts"
Cohesion: 0.20
Nodes (16): mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+8 more)

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

### Community 108 - "acoes.ts"
Cohesion: 0.08
Nodes (50): react, permissao(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde(), Mensalidade() (+42 more)

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
Nodes (62): Alertas(), CartaoAbaixo(), EnviarAviso(), NovoAluno(), enviar(), Aba, ABAS, DIAS_SEMANA (+54 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "TutorialCoach.tsx"
Cohesion: 0.17
Nodes (22): motion, Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros() (+14 more)

### Community 122 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.29
Nodes (6): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 134 - "m"
Cohesion: 0.50
Nodes (4): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas()

### Community 135 - "erros.mjs"
Cohesion: 0.22
Nodes (7): `avaliacoes/{id automático}`, corte, data(), db, linhas, projeto, PROJETOS

### Community 136 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+7 more)

### Community 137 - "icones.tsx"
Cohesion: 0.10
Nodes (37): AlunoApp(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+29 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "useDoc"
Cohesion: 0.10
Nodes (32): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+24 more)

### Community 142 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 143 - "criarCoach"
Cohesion: 0.10
Nodes (22): COACH, ALUNO, COACH, ALUNO, COACH, PNG, COACH, ALUNO (+14 more)

### Community 145 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "lib/acesso.ts"
Cohesion: 0.13
Nodes (24): DIAS_CURTO, diaSP(), diasParaVencer(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento(), Usuario (+16 more)

### Community 147 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.16
Nodes (13): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), Descanso, fetch(), alvosDe(), comAparelho(), Fixa, inicioDoDiaBrasilia() (+5 more)

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "marcas_vfit_marca"
Cohesion: 0.24
Nodes (9): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), H, W, D_ESTRELA (+1 more)

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

### Community 159 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 164 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 165 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 167 - "App.tsx"
Cohesion: 0.13
Nodes (29): Logo(), react-dom, App(), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal() (+21 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1182 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `push.ts`, `iaTreino.ts`, `ataques.test.ts`, `planilha.ts`, `Hoje.tsx`, `cors.ts`, `AvaliacaoCoach.tsx`, `util.ts`, `Alunos.tsx`, `prescreverSessao`, `montarPdf`, `lib/acesso.ts`, `rules.test.ts`, `Treino.tsx`, `cartaoRelatorio.ts`, `prints.spec.ts`, `marcas_vfit_marca`, `FimTreino.tsx`, `jwt.ts`, `codigoPix`, `cartaoStory.ts`, `CardioHoje.tsx`, `aluno-exemplo.test.ts`, `conversores.ts`, `webpush.ts`, `avisos-pagamento.mjs`, `TabProgressao.tsx`, `src/index.ts`, `package.json`, `Onde fica cada coisa`, `PainelEvolucao.tsx`, `src/acesso.ts`, `Entrar.tsx`, `engine/index.ts`, `EnviarFeedback.tsx`, `AcaoEmail.tsx`, `GuiaMetodos.tsx`, `limpeza-lgpd.test.ts`, `Alertas.tsx`, `relatorio.ts`, `firebase-admin`, `metricas.ts`, `acoes.ts`, `marca.test.ts`, `Botao`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Are the 133 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 133 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06013986013986014 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `push.ts`, `iaTreino.ts`, `Hoje.tsx`, `Feedbacks.tsx`, `icones.tsx`, `AvaliacaoCoach.tsx`, `pdfRelatorio.ts`, `util.ts`, `Alunos.tsx`, `prescreverSessao`, `montarPdf`, `lib/acesso.ts`, `Treino.tsx`, `Inicio.tsx`, `cartaoStory.ts`, `CardioHoje.tsx`, `conversores.ts`, `avisos-pagamento.mjs`, `App.tsx`, `TabProgressao.tsx`, `src/index.ts`, `Onde fica cada coisa`, `PainelEvolucao.tsx`, `src/acesso.ts`, `Presencial.tsx`, `Entrar.tsx`, `engine/index.ts`, `AcaoEmail.tsx`, `Alertas.tsx`, `InicioAluno.tsx`, `firebase`, `Coleções Firestore`, `acoes.ts`, `Botao`, `TutorialCoach.tsx`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `iaTreino.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12433862433862433 - nodes in this community are weakly interconnected._