# Graph Report - claude-cloud-celli  (2026-11-10)

## Corpus Check
- 312 files · ~303,856 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2988 nodes · 8166 edges · 171 communities (156 shown, 15 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 368 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `719a4341`
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
- ui.tsx
- env
- CardioHoje.tsx
- BoasVindas.tsx
- acoes.ts
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
- Pontos sensíveis (leia antes de auditar ou mexer)
- FimTreino.tsx
- jwt.ts
- vidro.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- motion
- steps
- steps
- settings.json
- criarAluno
- Pontos sensíveis (leia antes de auditar ou mexer)
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avisos-pagamento.mjs
- inscreverAvisos
- TabProgressao.tsx
- Onboarding.tsx
- src/index.ts
- steps
- relatorio.spec.ts
- package.json
- Onde fica cada coisa
- evolucao.ts
- with
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- vite.config.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- BotaoCompartilhar
- Presencial.tsx
- steps
- @playwright/test
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
- GuiaMetodos.tsx
- steps
- limpeza-lgpd.test.ts
- limparEmuladores
- lib/acesso.ts
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- importar-meso.mjs
- InicioAluno.tsx
- with
- overrides
- vitest
- cardio.spec.ts
- limpeza-lgpd.mjs
- Performance Optimization
- firebase
- ref_node_fs
- Tutorial.tsx
- prescreverSessao
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
- marca.test.ts
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
- Árvore por pasta
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
- engine/index.ts
- ContaAluno.tsx
- criarCoach
- busca.ts
- AssistenteIA.tsx
- lib/acesso.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- atualizar.ts
- limpeza
- marca
- Botao
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- PainelEvolucao.tsx
- with
- aluno-exemplo.test.ts
- preparar
- vite.config.ts
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- Coleções Firestore
- erros.mjs
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- Push do descanso (Entrega 3b)
- 5. Auditoria 02/10/2026 (segurança + LGPD)
- 6. Monitoramento (alertas)
- varredura.spec.ts
- Mapa do Código — Força

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 137 edges
2. `Botao()` - 113 edges
3. `Treino()` - 78 edges
4. `react` - 67 edges
5. `vitest` - 67 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 52 edges
8. `Cartao()` - 49 edges
9. `registrarErro()` - 46 edges
10. `firebase` - 45 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx

## Import Cycles
- None detected.

## Communities (171 total, 15 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

### Community 1 - "push.ts"
Cohesion: 0.16
Nodes (21): enviar(), ChavesAvisos(), avisarTreinoPronto(), AVISOS_ALUNO, AVISOS_COACH, avisosDesligados(), b64uParaBytes(), BASE (+13 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.08
Nodes (27): @firebase/rules-unit-testing, agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db() (+19 more)

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

### Community 7 - "InicioAluno.tsx"
Cohesion: 0.12
Nodes (35): AvisoReps(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), InicioAluno(), Msg(), Treinos() (+27 more)

### Community 8 - "ui.tsx"
Cohesion: 0.17
Nodes (29): Coach(), NovoAluno(), enviar(), EditorMeso(), atualizar(), salvar(), setSemanas(), estavel() (+21 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "CardioHoje.tsx"
Cohesion: 0.10
Nodes (11): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, CORS (+3 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (28): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+20 more)

### Community 12 - "acoes.ts"
Cohesion: 0.15
Nodes (23): Avaliacao, avaliacoesParaFazer(), BIO, Ciclo, cicloDaAvaliacao(), DOBRAS, Ids, lerAvaliacao() (+15 more)

### Community 13 - "pdfRelatorio.ts"
Cohesion: 0.14
Nodes (21): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, EntradaPdfAvaliacao, gerarPdfAvaliacao(), criarFolhas(), disp(), LARG, M (+13 more)

### Community 14 - "util.ts"
Cohesion: 0.16
Nodes (28): Registros, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+20 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.15
Nodes (25): reais(), Aluno, Alunos(), bloquear(), liberar(), reativar(), Chip(), ComAtraso() (+17 more)

### Community 16 - "prescreverSessao"
Cohesion: 0.07
Nodes (37): nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO, base (+29 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (43): concurrency, needs, runs-on, steps, strategy, group, BACKUP_SENHA, EVENTO (+35 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (40): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+32 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.15
Nodes (12): `registros/{regId}`, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 7. Teste de ataques (03/10/2026) (+4 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.10
Nodes (32): Peças, motion, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), hms(), Modal() (+24 more)

### Community 21 - "cartaoRelatorio.ts"
Cohesion: 0.19
Nodes (16): BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao, dadosCartaoRelatorio(), dataBr(), num(), periodoTexto() (+8 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (16): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras() (+8 more)

### Community 23 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 24 - "FimTreino.tsx"
Cohesion: 0.16
Nodes (15): CONFETE, dur(), FimTreino(), Lista(), Quadros(), DadosTreino, IcCamera, IcCartao (+7 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (20): agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe(), ObterChave (+12 more)

### Community 26 - "vidro.tsx"
Cohesion: 0.19
Nodes (20): Peças compartilhadas (já no código), Linha(), AvaliacaoPronta(), RelatorioPronto(), ConviteFeedback(), Faixa(), FaixaFeedback(), Atalho (+12 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.06
Nodes (32): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+24 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.16
Nodes (29): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, desenhar(), gerarCartaoDepoimento(), quebrar(), ajustar(), C, caixa(), carregarImagem() (+21 more)

### Community 29 - "motion"
Cohesion: 0.12
Nodes (24): Preview(), AjustarVolume(), fmt(), Modo, Previa, TabelaProgressao(), TabProgressao(), EvolucaoCoach() (+16 more)

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
Cohesion: 0.11
Nodes (10): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, marca, lerDoc() (+2 more)

### Community 34 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.11
Nodes (38): Pontos sensíveis (leia antes de auditar ou mexer), `src/lib/` — Firestore, estado, cálculos com dados, FestaRecorde(), cancelarTreino(), criarConta(), darAcessoAoApp(), importarMeso(), informarPagamento() (+30 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.18
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), abrir(), assinar(), criptografar() (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 39 - "inscreverAvisos"
Cohesion: 0.29
Nodes (11): AvisoNotificacoes(), permissao(), AvisoDescanso(), IcSino, agendarPush(), avisosLigados(), cancelarPush(), desinscreverAvisos() (+3 more)

### Community 40 - "TabProgressao.tsx"
Cohesion: 0.24
Nodes (16): ESCOPOS, linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+8 more)

### Community 41 - "Onboarding.tsx"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 42 - "src/index.ts"
Cohesion: 0.14
Nodes (23): Aviso, bytesOk(), endpointOk(), hostOk(), HOSTS, MAX_APARELHOS, nomeCoaches(), nomeLimpo() (+15 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "relatorio.spec.ts"
Cohesion: 0.22
Nodes (6): ALUNO, COACH, iniciarEConcluir(), seg(), semear(), criarAluno()

### Community 45 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, type, version, fundo, @cloudflare/workers-types, firebase-tools, tailwindcss (+5 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.18
Nodes (18): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+10 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.09
Nodes (38): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao (+30 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (14): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+6 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "vite.config.ts"
Cohesion: 0.08
Nodes (20): 1. Configuração do mesociclo, `mesos/{mesoId}`, vitest, mediana(), metaCiclo(), metaRobusta(), divisao, meso (+12 more)

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

### Community 57 - "BotaoCompartilhar"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 58 - "Presencial.tsx"
Cohesion: 0.16
Nodes (26): `src/` — Raiz, PerfilDemora(), Principal(), AlunoApp(), Hoje(), Aluno(), Barra(), EscolherAluno() (+18 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.18
Nodes (18): Entrar(), enviar(), voltar(), cadastrar(), confirmarLoginTotp(), entrar(), resolverMfa(), marcar() (+10 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.21
Nodes (25): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva, linhasDoExercicio() (+17 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "voz-ia.spec.ts"
Cohesion: 0.26
Nodes (11): Vigia(), Armazem, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, limparTreino(), marcarTreino() (+3 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.10
Nodes (42): Onde mexer para…, DadosDepoimento, textosDepoimento(), Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS (+34 more)

### Community 66 - "atualizar.ts"
Cohesion: 0.15
Nodes (20): comVolta(), ARQUIVADO_DIAS, chaveAlerta, DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS (+12 more)

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
Cohesion: 0.21
Nodes (10): COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop(), dispensarNota(), mostrarNotasDeNovo() (+2 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.12
Nodes (8): firebase-admin, app, auth, COLECOES, db, SCRIPTS, atual, novo

### Community 76 - "limparEmuladores"
Cohesion: 0.09
Nodes (24): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+16 more)

### Community 77 - "lib/acesso.ts"
Cohesion: 0.16
Nodes (17): faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento(), Usuario, confirmarPagamento(), deMapa() (+9 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.17
Nodes (11): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026), Respostas do Victor (+3 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.20
Nodes (9): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), LGPD, Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas (+1 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "InicioAluno.tsx"
Cohesion: 0.18
Nodes (17): AvaliacaoCoach(), Editor(), Faixa, fora(), num(), Textos, txt(), useAvaliacoesDoAluno() (+9 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "vitest"
Cohesion: 0.11
Nodes (27): mensagemErro(), confirmarPix(), ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado() (+19 more)

### Community 86 - "cardio.spec.ts"
Cohesion: 0.18
Nodes (8): MesoEvolucao, agora, linha, m0, m1, meso(), registros, slot()

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "firebase"
Cohesion: 0.10
Nodes (41): firebase, Aba, ABAS, DIAS_SEMANA, TITULO_ABA, Aba, ABAS, freq() (+33 more)

### Community 90 - "ref_node_fs"
Cohesion: 0.11
Nodes (9): ALUNO, COACH, marca, arquivos(), RAIZ, app, auth, COLECOES (+1 more)

### Community 91 - "Tutorial.tsx"
Cohesion: 0.16
Nodes (22): Logo(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+14 more)

### Community 92 - "prescreverSessao"
Cohesion: 0.42
Nodes (10): evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros(), repsEfetivas(), soma() (+2 more)

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
Cohesion: 0.14
Nodes (25): `src/features/auth/` — Autenticação, BotaoSair(), useSair(), DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta() (+17 more)

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

### Community 119 - "TutorialCoach.tsx"
Cohesion: 0.29
Nodes (16): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+8 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "Árvore por pasta"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/conta/` — Minha Conta, `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach) (+6 more)

### Community 122 - "VisaoSemana.tsx"
Cohesion: 0.26
Nodes (13): Cargas, fmt(), fmtData(), Monitoramento(), Chips(), CORES, RepsFeitas(), SessaoCard() (+5 more)

### Community 134 - "react"
Cohesion: 0.12
Nodes (32): react, AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), erros (+24 more)

### Community 135 - "erros.mjs"
Cohesion: 0.31
Nodes (14): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Avaliacao(), BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacoesCoach(), dataBR(), fmtDelta() (+6 more)

### Community 136 - "SessaoCard.tsx"
Cohesion: 0.39
Nodes (9): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, idCardio(), rotuloCardio(), TipoCardio (+1 more)

### Community 137 - "src/index.ts"
Cohesion: 0.14
Nodes (15): Contrato novo do Worker, DO_ALUNO, Env, Mensagem, recado(), ROBO, TREINO, alvosDe() (+7 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "iaTreino.ts"
Cohesion: 0.06
Nodes (52): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, ROTULO (+44 more)

### Community 141 - "engine/index.ts"
Cohesion: 0.13
Nodes (28): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+20 more)

### Community 142 - "ContaAluno.tsx"
Cohesion: 0.17
Nodes (17): Avatar(), iniciais(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde(), escolher() (+9 more)

### Community 143 - "criarCoach"
Cohesion: 0.09
Nodes (16): COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, PNG (+8 more)

### Community 144 - "busca.ts"
Cohesion: 0.48
Nodes (4): buscarExercicios(), itens, norm(), nomes()

### Community 145 - "AssistenteIA.tsx"
Cohesion: 0.39
Nodes (10): AssistenteIA(), remover(), salvar(), apagarChaveIA(), chaveMascarada(), chaveValida(), ERROS_HTTP, refChave() (+2 more)

### Community 146 - "lib/acesso.ts"
Cohesion: 0.10
Nodes (43): `src/features/coach/` — App do coach, ativaAba(), Menu(), PIX, abertura(), Acoes(), Alertas(), CartaoAbaixo() (+35 more)

### Community 147 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.21
Nodes (7): CacheAcesso, Descanso, fetch(), nomeAgenda(), nomeDO(), gerarParVapid(), ParVapid

### Community 148 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "Botao"
Cohesion: 0.16
Nodes (18): `src/features/aluno/` — App do aluno, SemAcesso(), Mensalidade(), Peso(), PixPerto(), contaDoDia(), dataCurta(), PagarPix() (+10 more)

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

### Community 157 - "PainelEvolucao.tsx"
Cohesion: 0.32
Nodes (11): dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel(), plural(), segunda(), Titulo() (+3 more)

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

### Community 162 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.20
Nodes (9): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam (+1 more)

### Community 163 - "Coleções Firestore"
Cohesion: 0.22
Nodes (10): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, `notas/{alunoId}`, `relatorios/{mesoId}` (+2 more)

### Community 164 - "erros.mjs"
Cohesion: 0.22
Nodes (7): `avaliacoes/{id automático}`, corte, data(), db, linhas, projeto, PROJETOS

### Community 165 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 166 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 167 - "5. Auditoria 02/10/2026 (segurança + LGPD)"
Cohesion: 0.33
Nodes (6): 5. Auditoria 02/10/2026 (segurança + LGPD), Conferido e OK, Em aberto (decisão do Victor), LGPD (feito nesta auditoria), Passos do Victor (console, uma vez), Repositório público (22/10/2026)

### Community 168 - "6. Monitoramento (alertas)"
Cohesion: 0.33
Nodes (6): 6. Monitoramento (alertas), Alertas automáticos (Vigia de segurança), Cloudflare (notificação de descanso), Dependabot, Procedimento ao receber alerta, Proteção contra cobrança

### Community 170 - "Mapa do Código — Força"
Cohesion: 0.50
Nodes (3): Comandos e workflows, Mapa do Código — Força, Rotas do app

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1186 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vite.config.ts` to `descanso.ts`, `push.ts`, `ataques.test.ts`, `planilha.ts`, `InicioAluno.tsx`, `SessaoCard.tsx`, `react`, `cors.ts`, `acoes.ts`, `engine/index.ts`, `util.ts`, `ContaAluno.tsx`, `prescreverSessao`, `busca.ts`, `lib/acesso.ts`, `iaTreino.ts`, `atualizar.ts`, `cartaoRelatorio.ts`, `Treino.tsx`, `Botao`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `jwt.ts`, `cartaoStory.ts`, `motion`, `aluno-exemplo.test.ts`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `webpush.ts`, `avisos-pagamento.mjs`, `TabProgressao.tsx`, `src/index.ts`, `package.json`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `Entrar.tsx`, `engine/index.ts`, `EnviarFeedback.tsx`, `atualizar.ts`, `pdfRelatorio.ts`, `GuiaMetodos.tsx`, `limpeza-lgpd.test.ts`, `lib/acesso.ts`, `InicioAluno.tsx`, `vitest`, `cardio.spec.ts`, `ref_node_fs`, `prescreverSessao`, `MinhaConta.tsx`, `marca.test.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Are the 136 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 136 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07899159663865546 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `push.ts`, `react`, `InicioAluno.tsx`, `SessaoCard.tsx`, `src/index.ts`, `ui.tsx`, `acoes.ts`, `engine/index.ts`, `util.ts`, `Alunos.tsx`, `prescreverSessao`, `ContaAluno.tsx`, `lib/acesso.ts`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `Treino.tsx`, `cartaoRelatorio.ts`, `pdfRelatorio.ts`, `Botao`, `Segurança — passos do Victor no console`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `vidro.tsx`, `cartaoStory.ts`, `motion`, `PainelEvolucao.tsx`, `avisos-pagamento.mjs`, `inscreverAvisos`, `TabProgressao.tsx`, `Mapa do Código — Força`, `src/index.ts`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `Presencial.tsx`, `Entrar.tsx`, `engine/index.ts`, `voz-ia.spec.ts`, `iaTreino.ts`, `GuiaMetodos.tsx`, `lib/acesso.ts`, `InicioAluno.tsx`, `vitest`, `firebase`, `Tutorial.tsx`, `MinhaConta.tsx`, `layout.spec.ts`, `VisaoSemana.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Lógica da planilha "Força 2027.1" — especificação do motor` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._