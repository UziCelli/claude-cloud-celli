# Graph Report - claude-cloud-celli  (2026-11-11)

## Corpus Check
- 324 files · ~323,411 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3162 nodes · 8789 edges · 168 communities (151 shown, 17 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 396 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3739952c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ContaAluno.tsx
- VozTreino.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- InicioAluno.tsx
- Botao
- env
- aluno.spec.ts
- BoasVindas.tsx
- avaliacao.ts
- Avaliacao.tsx
- util.ts
- App.tsx
- `src/lib/` — Firestore, estado, cálculos com dados
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- prescreverSessao
- prints.spec.ts
- pix.ts
- FimTreino.tsx
- jwt.ts
- Alunos.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- AcaoEmail.tsx
- steps
- steps
- settings.json
- importar.spec.ts
- iaTreino.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avisos-pagamento.mjs
- firebase-admin
- Msg
- TabProgressao.tsx
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- pesoCorporal.ts
- evolucao.ts
- with
- ui.tsx
- src/acesso.ts
- compilerOptions
- Inicio.tsx
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- motion
- Presencial.tsx
- steps
- sair.spec.ts
- Entrar.tsx
- TabMetodos.tsx
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
- vitest
- steps
- firebase-admin
- criarAluno
- conversores.ts
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- Botao
- importar-meso.mjs
- src/index.ts
- with
- overrides
- icones.tsx
- Árvore por pasta
- limpeza-lgpd.mjs
- Performance Optimization
- Pontos sensíveis (leia antes de auditar ou mexer)
- Árvore por pasta
- AvaliacaoCoach.tsx
- Slot
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- push.ts
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- react
- gislane/Logo.tsx
- criarAluno
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- EditorMeso.tsx
- layout.spec.ts
- lib/acesso.ts
- hojeSaoPaulo
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- corpoPaths.ts
- acoes.ts
- Aceite.tsx
- Relatorio.tsx
- saude.yml
- cors.ts
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- Push do descanso (Entrega 3b)
- tutorial.spec.ts
- relatorio.ts
- rules.test.ts
- marca.test.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- mfa.mjs
- limpeza
- marca
- notasMetodo.ts
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- chamar
- with
- Plano — Painel de Evolução (03/10/2026)
- preparar
- criarRegistro
- cardio.spec.ts
- coach.spec.ts
- EnviarAviso.tsx
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- pwa-assets.config.ts
- metricas.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 138 edges
2. `Botao()` - 124 edges
3. `Treino()` - 79 edges
4. `react` - 71 edges
5. `vitest` - 70 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 54 edges
8. ``src/lib/` — Firestore, estado, cálculos com dados` - 53 edges
9. `registrarErro()` - 51 edges
10. `diaSP()` - 49 edges

## Surprising Connections (you probably didn't know these)
- `Divisão (agentes Sonnet; ninguém no mesmo arquivo)` --references--> `registros()`  [INFERRED]
  docs/plano-volume.md → e2e/prints.spec.ts
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

## Communities (168 total, 17 thin omitted)

### Community 0 - "ContaAluno.tsx"
Cohesion: 0.13
Nodes (34): `src/features/conta/` — Minha Conta, Peças compartilhadas (já no código), AvisoDescanso(), ContaAluno(), escolherFoto(), desde(), Linha(), AnamnesePendente() (+26 more)

### Community 1 - "VozTreino.tsx"
Cohesion: 0.12
Nodes (21): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+13 more)

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
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaMesoFalsa() (+32 more)

### Community 7 - "InicioAluno.tsx"
Cohesion: 0.11
Nodes (35): `src/features/aluno/` — App do aluno, AvisoReps(), RegistroFlag, SemanaCarregada(), InicioAluno(), Msg(), Treinos(), dataSP() (+27 more)

### Community 8 - "Botao"
Cohesion: 0.13
Nodes (24): bloquear(), liberar(), reativar(), ConfirmarAluno(), confirmar(), apagarAluno(), definirAcesso(), auth (+16 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "aluno.spec.ts"
Cohesion: 0.08
Nodes (16): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, ALUNO (+8 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (26): `src/features/instalar/` — PWA/Android, CartaoInstalar(), FolhaIPhone(), Linha(), VANTAGENS, copiarLink(), eAndroid(), eIOS() (+18 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.06
Nodes (56): Avaliacao, BIO, Ciclo, corteAvaliacoes(), DESCE, Destaque, DobraId, DOBRAS (+48 more)

### Community 13 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (33): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), corParte() (+25 more)

### Community 14 - "util.ts"
Cohesion: 0.23
Nodes (19): Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes(), remover() (+11 more)

### Community 15 - "App.tsx"
Cohesion: 0.14
Nodes (29): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+21 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.09
Nodes (42): `src/lib/` — Firestore, estado, cálculos com dados, apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach (+34 more)

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
Cohesion: 0.09
Nodes (42): metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), Modal(), NotaMetodos() (+34 more)

### Community 21 - "prescreverSessao"
Cohesion: 0.08
Nodes (34): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO (+26 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (11): ANTES, DIAS_AUTO, ids, marca, NOMES, PROIBIDO, T1, T2 (+3 more)

### Community 23 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 24 - "FimTreino.tsx"
Cohesion: 0.17
Nodes (15): CONFETE, dur(), FimTreino(), escolher(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo() (+7 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (20): agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe(), ObterChave (+12 more)

### Community 26 - "Alunos.tsx"
Cohesion: 0.13
Nodes (26): Mensalidade(), PixPerto(), contaDoDia(), dataCurta(), PagarPix(), copiar(), PIX, reais() (+18 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.06
Nodes (35): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+27 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.11
Nodes (37): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, desenhar(), gerarCartaoDepoimento(), quebrar() (+29 more)

### Community 29 - "AcaoEmail.tsx"
Cohesion: 0.18
Nodes (16): 1. Registro de erros ("Erros do app"), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA (+8 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 34 - "iaTreino.ts"
Cohesion: 0.13
Nodes (24): Acao, acharPosicao(), corpoPedido(), descreverAcao(), doCatalogo, ExercicioProposto, FERRAMENTA, inteiroOpc() (+16 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.18
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), abrir(), assinar(), criptografar() (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.14
Nodes (17): doAluno(), PARQ_NAO, ALUNO, COACH, marca, ANAMNESE_MINIMA, criarAlunoAguardando(), criarAlunoArquivado() (+9 more)

### Community 38 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 39 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 40 - "Msg"
Cohesion: 0.20
Nodes (21): Peso(), dataPadrao(), NovoAluno(), enviar(), DarAcesso(), AssistenteIA(), remover(), salvar() (+13 more)

### Community 41 - "TabProgressao.tsx"
Cohesion: 0.19
Nodes (19): AlvoVolume, Meso, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+11 more)

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
Cohesion: 0.10
Nodes (19): name, private, type, version, @cloudflare/workers-types, @firebase/rules-unit-testing, firebase-tools, tailwindcss (+11 more)

### Community 46 - "pesoCorporal.ts"
Cohesion: 0.11
Nodes (25): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+17 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.09
Nodes (43): Peças, arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+35 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "ui.tsx"
Cohesion: 0.10
Nodes (29): motion, EvolucaoCoach(), fmt(), dataCurta(), EvolucaoCoach(), Faixa(), Painel(), plural() (+21 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (14): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+6 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "Inicio.tsx"
Cohesion: 0.10
Nodes (38): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+30 more)

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

### Community 57 - "motion"
Cohesion: 0.22
Nodes (9): Logo(), react-dom, App(), Lista(), Politica(), Secao(), carregar(), Features (+1 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.22
Nodes (18): Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente(), lerGrupo() (+10 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.09
Nodes (35): BoasVindas(), deveMostrarBoasVindas(), ler(), marcarBoasVindasVistas(), Entrar(), enviar(), voltar(), erros (+27 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.16
Nodes (34): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva, linhasDoExercicio() (+26 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.29
Nodes (10): Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, marcar(), treinoEmAndamento() (+2 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.10
Nodes (38): DadosDepoimento, Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), useFeedbacks() (+30 more)

### Community 66 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

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

### Community 73 - "vitest"
Cohesion: 0.23
Nodes (6): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, vitest, seriesDestacadas(), seriesDoRotulo(), montarPdf()

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarAluno"
Cohesion: 0.09
Nodes (22): COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear() (+14 more)

### Community 77 - "conversores.ts"
Cohesion: 0.19
Nodes (18): VisaoSemana(), arred(), caminhoCarga(), CargasDoc, docParaCargas(), docParaReps, docsParaRegistros(), docsParaRegistrosReps() (+10 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.17
Nodes (11): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026), Respostas do Victor (+3 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Botao"
Cohesion: 0.14
Nodes (25): uqr, AvisoNotificacoes(), permissao(), sairAgora(), QrCadastro(), TabelaProgressao(), TabProgressao(), DuasEtapas() (+17 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "src/index.ts"
Cohesion: 0.14
Nodes (15): Contrato novo do Worker, DO_ALUNO, Env, Mensagem, recado(), ROBO, TREINO, alvosDe() (+7 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "icones.tsx"
Cohesion: 0.12
Nodes (40): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+32 more)

### Community 86 - "Árvore por pasta"
Cohesion: 0.06
Nodes (29): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}` (+21 more)

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.11
Nodes (44): Pontos sensíveis (leia antes de auditar ou mexer), `src/` — Raiz, nadaPassaDaTela(), ativaAba(), Coach(), Menu(), PerfilDemora(), pedir() (+36 more)

### Community 90 - "Árvore por pasta"
Cohesion: 0.10
Nodes (19): Comandos e workflows, `.github/workflows/` — CI/CD, Mapa do Código — Força, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, Rotas do app (+11 more)

### Community 91 - "AvaliacaoCoach.tsx"
Cohesion: 0.17
Nodes (17): BotaoPdfAvaliacao(), Editor(), Faixa, fora(), hoje(), num(), Textos, txt() (+9 more)

### Community 92 - "Slot"
Cohesion: 0.13
Nodes (14): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), igual(), Linhas, migrarProgressao(), antigo() (+6 more)

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

### Community 100 - "push.ts"
Cohesion: 0.22
Nodes (13): AVISOS_ALUNO, AVISOS_COACH, b64uParaBytes(), BASE, cabecalhosPush(), CHAVE_AVISOS, chaveVapid(), fila (+5 more)

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

### Community 108 - "react"
Cohesion: 0.12
Nodes (48): firebase, react, Hoje(), Msg(), Semana(), AnamneseCoach(), codigo(), falhou() (+40 more)

### Community 110 - "criarAluno"
Cohesion: 0.15
Nodes (9): ALUNO, COACH, PNG, ALUNO, COACH, iniciarEConcluir(), seg(), semear() (+1 more)

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

### Community 119 - "EditorMeso.tsx"
Cohesion: 0.11
Nodes (35): Aba, ABAS, DIAS_SEMANA, EditorMeso(), salvar(), estavel(), TITULO_ABA, CartaoMeso() (+27 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "lib/acesso.ts"
Cohesion: 0.09
Nodes (36): useHoje(), diaSP(), diasParaVencer(), inicioDoDiaSP(), liberado(), proximoVencimento(), Usuario, vencePerto() (+28 more)

### Community 122 - "hojeSaoPaulo"
Cohesion: 0.13
Nodes (11): marcar(), mesoDe(), NOVA, PARQ, proximo(), responder(), ALUNO, amanha() (+3 more)

### Community 134 - "corpoPaths.ts"
Cohesion: 0.09
Nodes (30): BASE_DIREITA, BASE_PDF, BASE_TELA, CENTRO, clarear(), CONTORNO, COR_CORPO, dobro() (+22 more)

### Community 135 - "acoes.ts"
Cohesion: 0.15
Nodes (24): Onde mexer para…, CardioHoje(), Anotacao(), enviar(), IcCardio, fimDoDiaSaoPaulo(), anotarAnamnese(), criarConta() (+16 more)

### Community 136 - "Aceite.tsx"
Cohesion: 0.29
Nodes (11): trocarSenha(), EsqueciSenha(), enviar(), mensagemRecuperar(), Aceite(), continuar(), esqueci(), erroSenha() (+3 more)

### Community 137 - "Relatorio.tsx"
Cohesion: 0.31
Nodes (11): dadosCartaoRelatorio(), dataBr(), periodoTexto(), r, volumeTexto(), gerarPdfRelatorio(), Bloco(), Faixa() (+3 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 141 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.25
Nodes (7): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 142 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 143 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 144 - "relatorio.ts"
Cohesion: 0.14
Nodes (16): precisaAtualizar(), avaliacoesParaFazer(), cicloDaAvaliacao(), somarDias(), MesoEvolucao, cicloTerminou(), diasDesdeFim(), fimISO() (+8 more)

### Community 145 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

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

### Community 151 - "notasMetodo.ts"
Cohesion: 0.19
Nodes (11): ANTIGA(), COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop(), dispensarNota() (+3 more)

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

### Community 157 - "chamar"
Cohesion: 0.53
Nodes (6): agendarPush(), cancelarPush(), chamar(), desinscreverAvisos(), disponivel(), enfileirar()

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "criarRegistro"
Cohesion: 0.10
Nodes (15): Regras gerais, ALUNO, COACH, ALUNO, COACH, diasAtras(), registros(), ALUNO (+7 more)

### Community 163 - "coach.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, NOMES

### Community 164 - "EnviarAviso.tsx"
Cohesion: 0.83
Nodes (3): EnviarAviso(), enviar(), enviarRecado()

### Community 165 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

### Community 171 - "metricas.ts"
Cohesion: 0.16
Nodes (19): `registros/{regId}`, 7. Teste de ataques (03/10/2026), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+11 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1238 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `ataques.test.ts`, `corpoPaths.ts`, `InicioAluno.tsx`, `acoes.ts`, `Relatorio.tsx`, `Botao`, `cors.ts`, `avaliacao.ts`, `planilha.ts`, `util.ts`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `relatorio.ts`, `marca.test.ts`, `rules.test.ts`, `Treino.tsx`, `prescreverSessao`, `prints.spec.ts`, `notasMetodo.ts`, `FimTreino.tsx`, `jwt.ts`, `pix.ts`, `cartaoStory.ts`, `AcaoEmail.tsx`, `iaTreino.ts`, `webpush.ts`, `avisos-pagamento.mjs`, `firebase-admin`, `TabProgressao.tsx`, `src/index.ts`, `metricas.ts`, `package.json`, `pesoCorporal.ts`, `evolucao.ts`, `ui.tsx`, `src/acesso.ts`, `Inicio.tsx`, `Entrar.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `EnviarFeedback.tsx`, `descanso.ts`, `firebase-admin`, `conversores.ts`, `Botao`, `AvaliacaoCoach.tsx`, `Slot`, `push.ts`, `lib/acesso.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Are the 137 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 137 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ContaAluno.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13063063063063063 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `ContaAluno.tsx`, `planilha.ts`, `InicioAluno.tsx`, `Botao`, `acoes.ts`, `Aceite.tsx`, `avaliacao.ts`, `Avaliacao.tsx`, `util.ts`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `Treino.tsx`, `prescreverSessao`, `notasMetodo.ts`, `FimTreino.tsx`, `pix.ts`, `Alunos.tsx`, `cartaoStory.ts`, `chamar`, `AcaoEmail.tsx`, `iaTreino.ts`, `avisos-pagamento.mjs`, `src/index.ts`, `metricas.ts`, `pesoCorporal.ts`, `evolucao.ts`, `ui.tsx`, `src/acesso.ts`, `Inicio.tsx`, `Presencial.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `vitest`, `conversores.ts`, `Botao`, `src/index.ts`, `Árvore por pasta`, `AvaliacaoCoach.tsx`, `react`, `EditorMeso.tsx`, `lib/acesso.ts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `VozTreino.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12433862433862433 - nodes in this community are weakly interconnected._