# Graph Report - claude-cloud-celli  (2026-11-11)

## Corpus Check
- 324 files · ~324,135 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3163 nodes · 8792 edges · 163 communities (146 shown, 17 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 396 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e1b83985`
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
- agenda.ts
- registrarErro
- env
- @playwright/test
- Cartao
- avaliacao.ts
- Avaliacao.tsx
- TabDivisao.tsx
- engine/index.ts
- `src/lib/` — Firestore, estado, cálculos com dados
- steps
- env
- Segurança — passos do Victor no console
- Treino.tsx
- relatorio.ts
- prints.spec.ts
- PagarPix.tsx
- segmentos.ts
- jwt.ts
- icones.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- registrarErro
- steps
- steps
- settings.json
- voz-ia.spec.ts
- acoes.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avisos-pagamento.mjs
- ref_node_fs
- vitest
- util.ts
- src/index.ts
- steps
- Alunos.tsx
- package.json
- vitest
- evolucao.ts
- with
- ui.tsx
- src/acesso.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- Principal
- Presencial.tsx
- steps
- GuiaMetodos.tsx
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- inatividade.ts
- Feedbacks.tsx
- react
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- pdfRelatorio.ts
- steps
- firebase-admin
- limparEmuladores
- PainelEvolucao.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- acoes.ts
- importar-meso.mjs
- Pontos sensíveis (leia antes de auditar ou mexer)
- with
- overrides
- Tutorial.tsx
- Mapa do Código — Força
- limpeza-lgpd.mjs
- Performance Optimization
- App.tsx
- AvaliacaoCoach.tsx
- TutorialCoach.tsx
- progressao.test.ts
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
- Hoje.tsx
- gislane/Logo.tsx
- evolucao.test.ts
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
- lib/acesso.ts
- anamnese.spec.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Inicio
- CardioHoje.tsx
- acoes.ts
- treino.test.ts
- saude.yml
- vite.config.ts
- avaliacao.spec.ts
- AvisoIOS
- ImportarPlanilha.tsx
- varredura.spec.ts
- main.tsx
- inscreverAvisos
- AvisoIOS
- mfa.mjs
- limpeza
- marca
- sugestao.test.ts
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- with
- aluno-exemplo.test.ts
- preparar
- criarMeso
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- pwa-assets.config.ts
- Meso

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

## Communities (163 total, 17 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.13
Nodes (35): `src/features/aluno/` — App do aluno, `src/features/conta/` — Minha Conta, permissao(), AvisoDescanso(), ContaAluno(), escolherFoto(), desde(), Linha() (+27 more)

### Community 1 - "iaTreino.ts"
Cohesion: 0.05
Nodes (63): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, Registros (+55 more)

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
Cohesion: 0.08
Nodes (41): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaAntigaFalsa() (+33 more)

### Community 7 - "agenda.ts"
Cohesion: 0.13
Nodes (19): Treinos(), dataSP(), diaCurto(), DIAS_CURTO, quando(), cargaVolta(), dataDe(), Dia (+11 more)

### Community 8 - "registrarErro"
Cohesion: 0.11
Nodes (18): react-dom, Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog() (+10 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "@playwright/test"
Cohesion: 0.09
Nodes (15): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+7 more)

### Community 11 - "Cartao"
Cohesion: 0.14
Nodes (30): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+22 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.08
Nodes (42): precisaAtualizar(), Avaliacao, AvaliacaoForm, avaliacoesParaFazer(), BIO, Ciclo, cicloDaAvaliacao(), corteAvaliacoes() (+34 more)

### Community 13 - "Avaliacao.tsx"
Cohesion: 0.19
Nodes (19): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), COR_TOM (+11 more)

### Community 14 - "TabDivisao.tsx"
Cohesion: 0.18
Nodes (26): Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes() (+18 more)

### Community 15 - "engine/index.ts"
Cohesion: 0.12
Nodes (28): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+20 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.09
Nodes (36): apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach, Rascunho (+28 more)

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
Nodes (54): `notas/{alunoId}`, AvisoNotificacoes(), AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada() (+46 more)

### Community 21 - "relatorio.ts"
Cohesion: 0.09
Nodes (30): nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO, base (+22 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "PagarPix.tsx"
Cohesion: 0.29
Nodes (9): contaDoDia(), campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base (+1 more)

### Community 24 - "segmentos.ts"
Cohesion: 0.12
Nodes (21): DESCE, Leitura, PAR_DOBRA, REGIAO, buscarExercicios(), itens, norm(), nomes() (+13 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "icones.tsx"
Cohesion: 0.15
Nodes (27): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+19 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.06
Nodes (34): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+26 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.07
Nodes (55): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, CONFETE, dur(), FimTreino() (+47 more)

### Community 29 - "registrarErro"
Cohesion: 0.15
Nodes (21): Logo(), trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+13 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 34 - "acoes.ts"
Cohesion: 0.15
Nodes (22): Onde mexer para…, LGPD, anotarAnamnese(), apagarAluno(), apagarFeedback(), cancelarTreino(), criarConta(), darAcessoAoApp() (+14 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.16
Nodes (18): RFC-8188, RFC-8292, b64u(), juntar(), assinar(), criptografar(), Efemera, enviarPush() (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.13
Nodes (16): ALUNO, COACH, ALUNO, COACH, marca, ANAMNESE_MINIMA, criarAlunoAguardando(), criarAlunoArquivado() (+8 more)

### Community 38 - "avisos-pagamento.mjs"
Cohesion: 0.25
Nodes (11): diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia(), pedeTreino(), PROJETOS (+3 more)

### Community 39 - "ref_node_fs"
Cohesion: 0.09
Nodes (11): ALUNO, marca, ALUNO, COACH, marca, arquivos(), RAIZ, app (+3 more)

### Community 40 - "vitest"
Cohesion: 0.12
Nodes (8): vitest, caminhoCarga(), mesoParaDoc(), paraMapa(), meso, temArrayDeArray(), ehRecorde(), meso

### Community 41 - "util.ts"
Cohesion: 0.17
Nodes (22): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+14 more)

### Community 42 - "src/index.ts"
Cohesion: 0.15
Nodes (26): deb64u(), fetch(), Aviso, bytesOk(), endpointOk(), hostOk(), HOSTS, MAX_APARELHOS (+18 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Alunos.tsx"
Cohesion: 0.22
Nodes (8): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Peças compartilhadas (já no código), Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.10
Nodes (19): name, private, type, version, @cloudflare/workers-types, @firebase/rules-unit-testing, firebase-tools, tailwindcss (+11 more)

### Community 46 - "vitest"
Cohesion: 0.11
Nodes (24): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+16 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.16
Nodes (23): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao (+15 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "ui.tsx"
Cohesion: 0.07
Nodes (49): react, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+41 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.15
Nodes (21): acessoComCache(), appCheckOk(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+13 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.08
Nodes (34): Entregas, AlertaAbaixo, AlertaAcima, AlertaDemorado, Grupos, agora, alunos, linha (+26 more)

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

### Community 57 - "Principal"
Cohesion: 0.13
Nodes (16): App(), PerfilDemora(), pedir(), Principal(), Vigia(), atualizar(), setSemanas(), pedirAcesso() (+8 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.20
Nodes (21): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+13 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.17
Nodes (21): Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar() (+13 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.23
Nodes (26): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+18 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.23
Nodes (12): sairAgora(), sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima() (+4 more)

### Community 65 - "Feedbacks.tsx"
Cohesion: 0.10
Nodes (36): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), Cartao(), Estrelas(), chip() (+28 more)

### Community 66 - "react"
Cohesion: 0.11
Nodes (24): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Armazem (+16 more)

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

### Community 73 - "pdfRelatorio.ts"
Cohesion: 0.16
Nodes (13): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, criarFolhas(), disp(), LARG, M, MUDO, PH (+5 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, app, auth, COLECOES, db, SCRIPTS, atual, novo

### Community 76 - "limparEmuladores"
Cohesion: 0.09
Nodes (28): COACH, ALUNO, COACH, diasAtras(), semear(), ALUNO, COACH, PNG (+20 more)

### Community 77 - "PainelEvolucao.tsx"
Cohesion: 0.09
Nodes (42): mesoAtual(), TabelaProgressao(), TabProgressao(), Aba, ABAS, freq(), MEDALHA, RankingAlunos() (+34 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.15
Nodes (12): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+4 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "acoes.ts"
Cohesion: 0.16
Nodes (22): uqr, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), trocarEmail(), trocarSenha() (+14 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.14
Nodes (13): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), CacheAcesso, Descanso, alvosDe(), comAparelho(), Fixa, inicioDoDiaBrasilia() (+5 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Tutorial.tsx"
Cohesion: 0.19
Nodes (20): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+12 more)

### Community 86 - "Mapa do Código — Força"
Cohesion: 0.06
Nodes (28): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}` (+20 more)

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.20
Nodes (8): assinarJwt(), base64url(), auth, corte, db, esquecerNoWorker(), projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "App.tsx"
Cohesion: 0.10
Nodes (46): `src/features/coach/` — App do coach, motion, ativaAba(), Coach(), Menu(), SemAcesso(), AlunoApp(), Quadros() (+38 more)

### Community 90 - "AvaliacaoCoach.tsx"
Cohesion: 0.12
Nodes (17): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+9 more)

### Community 91 - "TutorialCoach.tsx"
Cohesion: 0.32
Nodes (14): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+6 more)

### Community 92 - "progressao.test.ts"
Cohesion: 0.33
Nodes (7): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas()

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
Nodes (26): EnviarAviso(), enviar(), ChavesAvisos(), NotificacoesCoach(), avisarTreinoPronto(), AVISOS_ALUNO, AVISOS_COACH, avisosDesligados() (+18 more)

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

### Community 108 - "Hoje.tsx"
Cohesion: 0.11
Nodes (53): firebase, InicioAluno(), Msg(), useAnamnese(), BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach() (+45 more)

### Community 110 - "evolucao.test.ts"
Cohesion: 0.18
Nodes (13): painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1, meso() (+5 more)

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
Cohesion: 0.15
Nodes (30): AnamneseCoach(), Anotacao(), codigo(), falhou(), quando(), useAnamnesesDoAluno(), mesoPadrao(), CartaoMeso() (+22 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "lib/acesso.ts"
Cohesion: 0.15
Nodes (20): useHoje(), diaSP(), diasParaVencer(), faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento() (+12 more)

### Community 122 - "anamnese.spec.ts"
Cohesion: 0.16
Nodes (9): doAluno(), PARQ_NAO, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder() (+1 more)

### Community 134 - "Inicio"
Cohesion: 0.09
Nodes (33): BASE_DIREITA, BASE_PDF, BASE_TELA, CENTRO, clarear(), CONTORNO, COR_CORPO, corParte() (+25 more)

### Community 135 - "CardioHoje.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

### Community 136 - "acoes.ts"
Cohesion: 0.31
Nodes (10): Aceite(), continuar(), esqueci(), erroSenha(), CaixaAceite(), aceitarPrivacidade(), confirmarSenha(), problemaSenha() (+2 more)

### Community 137 - "treino.test.ts"
Cohesion: 0.22
Nodes (6): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), cargaAnterior(), base

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "avaliacao.spec.ts"
Cohesion: 0.22
Nodes (4): ALUNO, amanha(), COACH, DOBRAS

### Community 141 - "AvisoIOS"
Cohesion: 0.39
Nodes (5): AvisoIOS(), iOS(), standalone(), seriesDestacadas(), seriesDoRotulo()

### Community 142 - "ImportarPlanilha.tsx"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 144 - "main.tsx"
Cohesion: 0.13
Nodes (20): `src/lib/` — Firestore, estado, cálculos com dados, Peças, comparacaoToneladas(), historicoExercicios(), MesoEvolucao, recordeAnterior(), recordesDe(), treinosFeitos() (+12 more)

### Community 145 - "inscreverAvisos"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "AvisoIOS"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 148 - "mfa.mjs"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "sugestao.test.ts"
Cohesion: 0.19
Nodes (11): ANTIGA(), COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop(), dispensarNota() (+3 more)

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
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.11
Nodes (16): ALUNO, COACH, ALUNO, meso(), prog, CAINDO, COACH, ALUNO (+8 more)

### Community 165 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

### Community 171 - "Meso"
Cohesion: 0.15
Nodes (20): `registros/{regId}`, 7. Teste de ataques (03/10/2026), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+12 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1237 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `iaTreino.ts`, `ataques.test.ts`, `Inicio`, `agenda.ts`, `CardioHoje.tsx`, `registrarErro`, `planilha.ts`, `vite.config.ts`, `avaliacao.ts`, `AvisoIOS`, `TabDivisao.tsx`, `engine/index.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `main.tsx`, `AvisoIOS`, `inscreverAvisos`, `Treino.tsx`, `relatorio.ts`, `sugestao.test.ts`, `segmentos.ts`, `jwt.ts`, `PagarPix.tsx`, `cartaoStory.ts`, `webpush.ts`, `avisos-pagamento.mjs`, `ref_node_fs`, `util.ts`, `src/index.ts`, `Meso`, `package.json`, `vitest`, `acoes.ts`, `ui.tsx`, `src/acesso.ts`, `treino.test.ts`, `alertas.ts`, `Principal`, `Entrar.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `Feedbacks.tsx`, `react`, `pdfRelatorio.ts`, `firebase-admin`, `acoes.ts`, `progressao.test.ts`, `src/index.ts`, `Hoje.tsx`, `evolucao.test.ts`, `lib/acesso.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Are the 137 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 137 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13363363363363365 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `push.ts`, `iaTreino.ts`, `planilha.ts`, `CardioHoje.tsx`, `acoes.ts`, `agenda.ts`, `treino.test.ts`, `Cartao`, `avaliacao.ts`, `Avaliacao.tsx`, `TabDivisao.tsx`, `engine/index.ts`, `AvisoIOS`, ``src/lib/` — Firestore, estado, cálculos com dados`, `Treino.tsx`, `relatorio.ts`, `PagarPix.tsx`, `sugestao.test.ts`, `icones.tsx`, `cartaoStory.ts`, `acoes.ts`, `avisos-pagamento.mjs`, `vitest`, `util.ts`, `src/index.ts`, `Meso`, `vitest`, `evolucao.ts`, `ui.tsx`, `src/acesso.ts`, `alertas.ts`, `Principal`, `Presencial.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `react`, `pdfRelatorio.ts`, `PainelEvolucao.tsx`, `acoes.ts`, `Mapa do Código — Força`, `limpeza-lgpd.mjs`, `App.tsx`, `src/index.ts`, `Hoje.tsx`, `MesosDoAluno.tsx`, `lib/acesso.ts`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `iaTreino.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05052631578947368 - nodes in this community are weakly interconnected._