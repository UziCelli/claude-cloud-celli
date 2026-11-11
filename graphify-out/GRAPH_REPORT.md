# Graph Report - claude-cloud-celli  (2026-11-11)

## Corpus Check
- 321 files · ~321,656 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3127 nodes · 8692 edges · 168 communities (151 shown, 17 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 394 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `61b6d626`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- iaTreino.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- Hoje.tsx
- Botao
- env
- @playwright/test
- BoasVindas.tsx
- avaliacao.ts
- pdfRelatorio.ts
- util.ts
- App.tsx
- `src/lib/` — Firestore, estado, cálculos com dados
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- SessaoCard.tsx
- prints.spec.ts
- pix.ts
- FimTreino.tsx
- jwt.ts
- InicioAluno.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- acoes.ts
- steps
- steps
- settings.json
- importar.spec.ts
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avisos-pagamento.mjs
- ref_node_fs
- sugestao.test.ts
- TabProgressao.tsx
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- pesoCorporal.ts
- evolucao.ts
- with
- push.ts
- src/acesso.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- MesosDoAluno.tsx
- Presencial.tsx
- steps
- sair.spec.ts
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- inatividade.ts
- EnviarFeedback.tsx
- AvaliacaoCoach.tsx
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- progressao.test.ts
- steps
- firebase-admin
- criarCoach
- conversores.ts
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- Cartao
- importar-meso.mjs
- segmentos.ts
- with
- overrides
- icones.tsx
- relatorio.ts
- limpeza-lgpd.mjs
- Performance Optimization
- EditorMeso.tsx
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
- src/index.ts
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- PainelEvolucao.tsx
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
- ui.tsx
- layout.spec.ts
- Inicio.tsx
- anamnese.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- QrCadastro.tsx
- CardioHoje.tsx
- Relatorio.tsx
- saude.yml
- cors.ts
- criarMeso
- inscreverAvisos
- cadastro.ts
- avaliacao.spec.ts
- relatorioAvaliacao
- rules.test.ts
- AlunoApp.tsx
- Pontos sensíveis (leia antes de auditar ou mexer)
- mfa.mjs
- limpeza
- marca
- treino.test.ts
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- Push do descanso (Entrega 3b)
- with
- aluno-exemplo.test.ts
- preparar
- relatorio.spec.ts
- motion
- varredura.spec.ts
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- pwa-assets.config.ts
- ContaAluno.tsx
- busca.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 137 edges
2. `Botao()` - 118 edges
3. `Treino()` - 79 edges
4. `react` - 71 edges
5. `vitest` - 69 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 54 edges
8. ``src/lib/` — Firestore, estado, cálculos com dados` - 53 edges
9. `registrarErro()` - 51 edges
10. `diaSP()` - 49 edges

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

## Communities (168 total, 17 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.13
Nodes (20): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Armazem (+12 more)

### Community 1 - "iaTreino.ts"
Cohesion: 0.06
Nodes (54): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, ROTULO (+46 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.13
Nodes (16): @firebase/rules-unit-testing, agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db() (+8 more)

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
Cohesion: 0.10
Nodes (31): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+23 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.14
Nodes (26): AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), diaCurto(), DIAS_CURTO (+18 more)

### Community 8 - "Botao"
Cohesion: 0.09
Nodes (39): Mensalidade(), contaDoDia(), dataCurta(), PagarPix(), PIX, reais(), useHoje(), Aluno (+31 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "@playwright/test"
Cohesion: 0.08
Nodes (17): ALUNO, COACH, NOMES, ALUNO, COACH, marca, ALUNO, COACH (+9 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.17
Nodes (28): `src/features/instalar/` — PWA/Android, Logo(), BoasVindas(), CartaoInstalar(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+20 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.09
Nodes (27): Avaliacao, AvaliacaoForm, BIO, Ciclo, Destaque, DobraId, DOBRAS, FAIXA (+19 more)

### Community 13 - "pdfRelatorio.ts"
Cohesion: 0.14
Nodes (19): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, COR_TOM, EntradaPdfAvaliacao, C, criarFolhas(), disp(), LARG (+11 more)

### Community 14 - "util.ts"
Cohesion: 0.17
Nodes (27): Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes() (+19 more)

### Community 15 - "App.tsx"
Cohesion: 0.13
Nodes (28): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+20 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.09
Nodes (43): `src/lib/` — Firestore, estado, cálculos com dados, copiar(), AnamneseCoach(), Anotacao(), codigo(), falhou(), quando(), useAnamnesesDoAluno() (+35 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (43): concurrency, needs, runs-on, steps, strategy, group, BACKUP_SENHA, EVENTO (+35 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (40): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+32 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (21): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+13 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.08
Nodes (45): `notas/{alunoId}`, ANTIGA(), COR_METODO, metodoDoRotulo(), METODOS, ORDEM, AvisoAdaptado(), CONFETE (+37 more)

### Community 21 - "SessaoCard.tsx"
Cohesion: 0.24
Nodes (12): Preview(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcCheck, NotasDoc (+4 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (17): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras() (+9 more)

### Community 23 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 24 - "FimTreino.tsx"
Cohesion: 0.15
Nodes (17): CONFETE, dur(), FimTreino(), escolher(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo() (+9 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (20): agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe(), ObterChave (+12 more)

### Community 26 - "InicioAluno.tsx"
Cohesion: 0.17
Nodes (28): `src/features/aluno/` — App do aluno, Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), Msg(), PixPerto(), Quadros() (+20 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.06
Nodes (34): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+26 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.18
Nodes (23): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), caixa(), carregarImagem() (+15 more)

### Community 29 - "acoes.ts"
Cohesion: 0.12
Nodes (26): Onde mexer para…, LGPD, apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler() (+18 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 34 - "conversores.ts"
Cohesion: 0.19
Nodes (24): Pontos sensíveis (leia antes de auditar ou mexer), App(), Coach(), PerfilDemora(), pedir(), Principal(), SemAcesso(), Vigia() (+16 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.18
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), abrir(), assinar(), criptografar() (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.15
Nodes (15): ALUNO, COACH, ALUNO, COACH, marca, ANAMNESE_MINIMA, criarAlunoAguardando(), criarAlunoArquivado() (+7 more)

### Community 38 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 39 - "ref_node_fs"
Cohesion: 0.13
Nodes (7): ALUNO, COACH, ALUNO, COACH, marca, arquivos(), RAIZ

### Community 40 - "sugestao.test.ts"
Cohesion: 0.08
Nodes (33): nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO, base (+25 more)

### Community 41 - "TabProgressao.tsx"
Cohesion: 0.17
Nodes (22): ESCOPOS, linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+14 more)

### Community 42 - "src/index.ts"
Cohesion: 0.14
Nodes (23): Aviso, bytesOk(), endpointOk(), hostOk(), HOSTS, MAX_APARELHOS, nomeCoaches(), nomeLimpo() (+15 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.09
Nodes (20): name, private, type, version, @cloudflare/workers-types, firebase-tools, react-dom, tailwindcss (+12 more)

### Community 46 - "pesoCorporal.ts"
Cohesion: 0.19
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.07
Nodes (59): Peças, diaSP(), precisaAtualizar(), avaliacoesParaFazer(), cicloDaAvaliacao(), somarDias(), arred(), calcular() (+51 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "push.ts"
Cohesion: 0.17
Nodes (22): enviar(), agendarPush(), avisarCoach(), avisarTreinoPronto(), AVISOS_COACH, avisosLigados(), b64uParaBytes(), BASE (+14 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (14): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+6 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.07
Nodes (38): AlertaDemorado, chavesAtuais(), Grupos, Reg, agora, alunos, linha, meso (+30 more)

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

### Community 57 - "MesosDoAluno.tsx"
Cohesion: 0.09
Nodes (47): NovoAluno(), enviar(), salvar(), ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa() (+39 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.09
Nodes (39): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), deveMostrarBoasVindas(), ler() (+31 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.18
Nodes (28): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva, linhasDoExercicio() (+20 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.29
Nodes (9): Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, treinoEmAndamento(), useInatividade() (+1 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.11
Nodes (35): Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, chip(), EnviarFeedback(), enviar() (+27 more)

### Community 66 - "AvaliacaoCoach.tsx"
Cohesion: 0.11
Nodes (49): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), firebase, BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa (+41 more)

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

### Community 73 - "progressao.test.ts"
Cohesion: 0.33
Nodes (7): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas()

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarCoach"
Cohesion: 0.09
Nodes (24): COACH, ALUNO, COACH, COACH, ALUNO, COACH, ALUNO, COACH (+16 more)

### Community 77 - "conversores.ts"
Cohesion: 0.15
Nodes (22): RegistroDocCompleto, VisaoSemana(), arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps (+14 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.18
Nodes (10): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026), Respostas do Victor (+2 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Cartao"
Cohesion: 0.12
Nodes (41): Peso(), DarAcesso(), AssistenteIA(), remover(), salvar(), DuasEtapas(), tentar(), erros (+33 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "segmentos.ts"
Cohesion: 0.11
Nodes (21): DESCE, Leitura, PAR_DOBRA, REGIAO, Ocorrencia, cargaPorSegmento(), CargaSegmento, ClasseCarga (+13 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "icones.tsx"
Cohesion: 0.09
Nodes (48): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+40 more)

### Community 86 - "relatorio.ts"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+7 more)

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "EditorMeso.tsx"
Cohesion: 0.13
Nodes (26): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+18 more)

### Community 90 - "ref_node_fs"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 91 - "Coleções Firestore"
Cohesion: 0.06
Nodes (28): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}` (+20 more)

### Community 92 - "vitest"
Cohesion: 0.13
Nodes (22): `registros/{regId}`, 7. Teste de ataques (03/10/2026), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+14 more)

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

### Community 100 - "src/index.ts"
Cohesion: 0.14
Nodes (15): Contrato novo do Worker, DO_ALUNO, Env, Mensagem, recado(), ROBO, TREINO, alvosDe() (+7 more)

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

### Community 108 - "PainelEvolucao.tsx"
Cohesion: 0.16
Nodes (18): Aba, ABAS, freq(), MEDALHA, RankingAlunos(), dataCurta(), EvolucaoCoach(), Faixa() (+10 more)

### Community 110 - "vitest"
Cohesion: 0.17
Nodes (9): vitest, atualizarNaEntrada(), deveRecarregar(), versaoDisponivel(), arquivos(), chaves(), PROIBIDOS, semPix() (+1 more)

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
Cohesion: 0.17
Nodes (13): react, EvolucaoCoach(), Lista(), Politica(), Secao(), Barra(), camada, confirmarNumero() (+5 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "Inicio.tsx"
Cohesion: 0.25
Nodes (18): `src/features/coach/` — App do coach, ativaAba(), Menu(), useAlertasCoach(), useArquivados(), calcularAlertas(), mediaTexto(), useFeedbacks() (+10 more)

### Community 122 - "anamnese.spec.ts"
Cohesion: 0.11
Nodes (14): doAluno(), PARQ_NAO, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder() (+6 more)

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.21
Nodes (13): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), fmtMedida() (+5 more)

### Community 135 - "QrCadastro.tsx"
Cohesion: 0.29
Nodes (5): QrCadastro(), CAMINHO_CADASTRO, emLinkCadastro(), linkCadastro, qrDataUrl()

### Community 136 - "CardioHoje.tsx"
Cohesion: 0.39
Nodes (9): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, idCardio(), rotuloCardio(), TipoCardio (+1 more)

### Community 137 - "Relatorio.tsx"
Cohesion: 0.22
Nodes (16): fmt(), H, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num(), periodoTexto() (+8 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "criarMeso"
Cohesion: 0.19
Nodes (8): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), criarMeso()

### Community 141 - "inscreverAvisos"
Cohesion: 0.33
Nodes (9): AvisoNotificacoes(), permissao(), AvisoDescanso(), ChavesAvisos(), avisosDesligados(), inscreverAvisos(), lerDesligados(), TipoAviso (+1 more)

### Community 142 - "cadastro.ts"
Cohesion: 0.27
Nodes (10): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), pngDe(), W, D_ESTRELA (+2 more)

### Community 143 - "avaliacao.spec.ts"
Cohesion: 0.22
Nodes (4): ALUNO, amanha(), COACH, DOBRAS

### Community 144 - "relatorioAvaliacao"
Cohesion: 0.33
Nodes (10): gerarPdfAvaliacao(), seta(), fmtDelta(), fmtDeltaUn(), fmtNum(), lerSegmento(), relatorioAvaliacao, resumoGrupo() (+2 more)

### Community 145 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "AlunoApp.tsx"
Cohesion: 0.29
Nodes (9): AlunoApp(), Tutorial(), tutorialNaoVisto(), AnamneseAluno(), EvolucaoAluno(), AvisoIOS(), iOS(), standalone() (+1 more)

### Community 147 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.21
Nodes (7): CacheAcesso, Descanso, fetch(), nomeAgenda(), nomeDO(), gerarParVapid(), ParVapid

### Community 148 - "mfa.mjs"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "treino.test.ts"
Cohesion: 0.25
Nodes (5): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), base

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

### Community 157 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

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

### Community 162 - "motion"
Cohesion: 0.38
Nodes (4): motion, carregar(), Features, montar()

### Community 165 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

### Community 170 - "ContaAluno.tsx"
Cohesion: 0.18
Nodes (17): `src/features/conta/` — Minha Conta, ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde(), Linha(), Chave() (+9 more)

### Community 176 - "busca.ts"
Cohesion: 0.36
Nodes (6): buscarExercicios(), itens, norm(), nomes(), DO_CATALOGO, segmentoDoExercicio()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1227 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `conversores.ts` to `iaTreino.ts`, `Hoje.tsx`, `Botao`, `CardioHoje.tsx`, `BoasVindas.tsx`, `pdfRelatorio.ts`, `util.ts`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `relatorioAvaliacao`, `AlunoApp.tsx`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `Treino.tsx`, `SessaoCard.tsx`, `inscreverAvisos`, `pix.ts`, `FimTreino.tsx`, `InicioAluno.tsx`, `cartaoStory.ts`, `acoes.ts`, `avisos-pagamento.mjs`, `sugestao.test.ts`, `TabProgressao.tsx`, `src/index.ts`, `ContaAluno.tsx`, `pesoCorporal.ts`, `evolucao.ts`, `push.ts`, `src/acesso.ts`, `alertas.ts`, `MesosDoAluno.tsx`, `Presencial.tsx`, `Entrar.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `AvaliacaoCoach.tsx`, `conversores.ts`, `Cartao`, `icones.tsx`, `EditorMeso.tsx`, `Coleções Firestore`, `vitest`, `src/index.ts`, `ui.tsx`, `layout.spec.ts`, `Inicio.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Are the 136 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 136 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `descanso.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12681159420289856 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `descanso.ts`, `iaTreino.ts`, `ataques.test.ts`, `planilha.ts`, `Hoje.tsx`, `Botao`, `Relatorio.tsx`, `QrCadastro.tsx`, `cors.ts`, `avaliacao.ts`, `CardioHoje.tsx`, `cadastro.ts`, `App.tsx`, `util.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `pdfRelatorio.ts`, `rules.test.ts`, `Treino.tsx`, `SessaoCard.tsx`, `pix.ts`, `FimTreino.tsx`, `jwt.ts`, `treino.test.ts`, `cartaoStory.ts`, `aluno-exemplo.test.ts`, `webpush.ts`, `avisos-pagamento.mjs`, `ref_node_fs`, `sugestao.test.ts`, `TabProgressao.tsx`, `src/index.ts`, `package.json`, `pesoCorporal.ts`, `evolucao.ts`, `busca.ts`, `push.ts`, `src/acesso.ts`, `alertas.ts`, `MesosDoAluno.tsx`, `Entrar.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `EnviarFeedback.tsx`, `AvaliacaoCoach.tsx`, `progressao.test.ts`, `firebase-admin`, `conversores.ts`, `Cartao`, `segmentos.ts`, `ref_node_fs`, `vitest`, `ui.tsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `iaTreino.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05547785547785548 - nodes in this community are weakly interconnected._