# Graph Report - claude-cloud-celli  (2026-11-12)

## Corpus Check
- 350 files · ~329,686 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3271 nodes · 9137 edges · 170 communities (154 shown, 16 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 389 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c0dc77e3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- InicioAluno.tsx
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
- prescreverSessao
- prints.spec.ts
- segmentos.ts
- FimTreino.tsx
- jwt.ts
- Alunos.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- RelatorioCoach.tsx
- Entrar.tsx
- steps
- steps
- settings.json
- Alertas.tsx
- avisos-pagamento.mjs
- aluno-exemplo.mjs
- webpush.ts
- PagarPix.tsx
- Avaliacao.tsx
- firebase-admin
- @playwright/test
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- ui.tsx
- evolucao.ts
- with
- Pontos sensíveis (leia antes de auditar ou mexer)
- src/acesso.ts
- compilerOptions
- Cartao
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- Presencial.tsx
- lib/acesso.ts
- steps
- iaTreino.ts
- QrCadastro.tsx
- engine/index.ts
- Motion / Framer Motion Examples
- inatividade.ts
- EnviarFeedback.tsx
- push.ts
- compilerOptions
- pwa-assets.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- icones.tsx
- steps
- Inicio.tsx
- criarCoach
- PainelEvolucao.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- ContaAluno.tsx
- importar-meso.mjs
- cartaoStory.ts
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
- acoes.ts
- gislane/Logo.tsx
- vite.config.ts
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
- src/index.ts
- src/ia.ts
- aluno-exemplo.test.ts
- ref_node_fs
- erros.mjs
- Árvore por pasta
- SenhaSegura.tsx
- criarAluno
- Descanso
- SessaoCard.tsx
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
- sair.spec.ts
- preparar
- criarMeso
- firebase-admin
- AvisoAtraso.tsx
- relatorio.test.ts
- cartaoDepoimento.ts
- marca.test.ts
- vfit/Logo.tsx
- seriesDoRotulo
- ehRecorde

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 147 edges
2. `Botao()` - 132 edges
3. `Treino()` - 82 edges
4. `react` - 78 edges
5. `vitest` - 74 edges
6. `prescreverSessao()` - 57 edges
7. ``src/lib/` — Firestore, estado, cálculos com dados` - 56 edges
8. `Meso` - 54 edges
9. `registrarErro()` - 51 edges
10. `useLista()` - 50 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Entregas` --references--> `normalizarCargas()`  [INFERRED]
  docs/estado-sessao.md → src/lib/conversores.ts
- ``src/lib/` — Privacidade` --references--> `senhaJaConferida()`  [INFERRED]
  docs/mapa.md → src/lib/privacidade.ts
- `Decisões` --references--> `avisarCoach()`  [INFERRED]
  docs/plano-notificacoes.md → src/lib/push.ts

## Import Cycles
- 2-file cycle: `src/lib/avaliacao.ts -> src/lib/segmentos.ts -> src/lib/avaliacao.ts`

## Communities (170 total, 16 thin omitted)

### Community 0 - "InicioAluno.tsx"
Cohesion: 0.23
Nodes (23): Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), jaViuPopup(), marcarPopup(), Msg(), Quadros() (+15 more)

### Community 1 - "AcaoEmail.tsx"
Cohesion: 0.15
Nodes (25): `src/features/privacidade/` — Política e Aceite, AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA (+17 more)

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
Cohesion: 0.08
Nodes (42): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaAntigaFalsa() (+34 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.13
Nodes (26): AvisoReps(), RegistroFlag, Semana(), SemanaCarregada(), diaCurto(), DIAS_CURTO, quando(), IcCadeado (+18 more)

### Community 8 - "TabProgressao.tsx"
Cohesion: 0.12
Nodes (33): linhaPrescrita(), AlvoVolume, Slot, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento() (+25 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.12
Nodes (17): ALUNO, COACH, ALUNO, COACH, marca, ANAMNESE_MINIMA, criarAlunoAguardando(), criarAlunoArquivado() (+9 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.15
Nodes (29): `src/features/instalar/` — PWA/Android, CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+21 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.09
Nodes (32): AvaliacaoForm, BIO, Ciclo, Destaque, DobraId, DOBRAS, FAIXA, forca() (+24 more)

### Community 13 - "vitest"
Cohesion: 0.10
Nodes (18): vitest, mediana(), metaCiclo(), metaRobusta(), divisao, meso, igual(), Linhas (+10 more)

### Community 14 - "util.ts"
Cohesion: 0.21
Nodes (20): Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes(), remover() (+12 more)

### Community 15 - "App.tsx"
Cohesion: 0.11
Nodes (42): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), padraoMetodo() (+34 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.07
Nodes (68): Onde mexer para…, `src/lib/` — Firestore, estado, cálculos com dados, AnamneseAluno(), apagar(), Caixa(), Campo(), Conteudo(), enviar() (+60 more)

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
Cohesion: 0.13
Nodes (34): `notas/{alunoId}`, metodoDoRotulo(), AvisoNotificacoes(), permissao(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde() (+26 more)

### Community 21 - "prescreverSessao"
Cohesion: 0.11
Nodes (26): ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano (+18 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (11): ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES, PROIBIDO, registros() (+3 more)

### Community 23 - "segmentos.ts"
Cohesion: 0.11
Nodes (25): estavel(), DESCE, Leitura, PAR_DOBRA, REGIAO, buscarExercicios(), itens, norm() (+17 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.19
Nodes (13): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, IcCamera, IcSubir (+5 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): deb64u(), abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims (+13 more)

### Community 26 - "Alunos.tsx"
Cohesion: 0.10
Nodes (37): Aluno, Alunos(), bloquear(), liberar(), reativar(), comparar(), ConfirmarAluno(), confirmar() (+29 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (41): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+33 more)

### Community 28 - "RelatorioCoach.tsx"
Cohesion: 0.12
Nodes (31): BotaoCompartilhar(), clicar(), C, compartilharArquivo(), dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio() (+23 more)

### Community 29 - "Entrar.tsx"
Cohesion: 0.14
Nodes (25): Logo(), BoasVindas(), Entrar(), enviar(), voltar(), erros, mensagemErro(), Lista() (+17 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "Alertas.tsx"
Cohesion: 0.11
Nodes (30): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+22 more)

### Community 34 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.15
Nodes (18): RFC-8188, RFC-8292, b64u(), juntar(), assinar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "PagarPix.tsx"
Cohesion: 0.18
Nodes (17): Mensalidade(), PixPopup(), dataCurta(), PagarPix(), copiar(), PIX, useHoje(), inicioDoDiaSP() (+9 more)

### Community 38 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (32): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), carregar() (+24 more)

### Community 39 - "firebase-admin"
Cohesion: 0.14
Nodes (5): app, auth, COLECOES, db, SCRIPTS

### Community 40 - "@playwright/test"
Cohesion: 0.09
Nodes (14): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+6 more)

### Community 41 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.22
Nodes (8): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

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

### Community 46 - "ui.tsx"
Cohesion: 0.09
Nodes (20): motion, LoadInput(), carregar(), Features, montar(), agil, confete, elastico (+12 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.09
Nodes (47): Peças, arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+39 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.14
Nodes (34): Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, nadaPassaDaTela(), versao(), App(), ativaAba(), Coach(), Menu() (+26 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.17
Nodes (16): acessoComCache(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), quemAvisaCoach() (+8 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "Cartao"
Cohesion: 0.15
Nodes (25): AssistenteIA(), remover(), salvar(), DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta() (+17 more)

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
Cohesion: 0.18
Nodes (23): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+15 more)

### Community 58 - "lib/acesso.ts"
Cohesion: 0.13
Nodes (21): confirmarPix(), CARENCIA_DIAS, emAtraso(), fimDoDiaSaoPaulo(), Foto, liberado(), proximoVencimento(), vencePerto() (+13 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "iaTreino.ts"
Cohesion: 0.06
Nodes (49): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+41 more)

### Community 61 - "QrCadastro.tsx"
Cohesion: 0.29
Nodes (5): QrCadastro(), CAMINHO_CADASTRO, emLinkCadastro(), linkCadastro, qrDataUrl()

### Community 62 - "engine/index.ts"
Cohesion: 0.32
Nodes (15): `src/engine/` — Motor de cálculo puro (sem React/Firebase), assinatura(), emGrupo(), limpa(), linhasDoExercicio(), removerLinha(), salvarLinha(), semanasTexto() (+7 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.19
Nodes (15): sairAgora(), sairAgora(), sair(), concluirSaida(), reabrirAposFalha(), Armazem, AVISO_SAIU, cronometroRodando() (+7 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.12
Nodes (31): Cartao(), Estrelas(), chip(), EnviarFeedback(), enviar(), Opcao(), IcEstrela(), apagarFeedback() (+23 more)

### Community 66 - "push.ts"
Cohesion: 0.06
Nodes (57): `src/features/conta/` — Minha Conta, 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta (+49 more)

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "pwa-assets.config.ts"
Cohesion: 0.50
Nodes (3): @vite-pwa/assets-generator@^1.0.4, fundo, @vite-pwa/assets-generator

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

### Community 73 - "icones.tsx"
Cohesion: 0.15
Nodes (25): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+17 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "Inicio.tsx"
Cohesion: 0.28
Nodes (14): Feedbacks(), mediaTexto(), useFeedbacks(), Inicio(), saudacao(), IcQr, consultaRegistrosRecentes(), avaliacoesParaFazer() (+6 more)

### Community 76 - "criarCoach"
Cohesion: 0.09
Nodes (23): COACH, ALUNO, COACH, PNG, COACH, ALUNO, COACH, semearFormatoAntigo() (+15 more)

### Community 77 - "PainelEvolucao.tsx"
Cohesion: 0.16
Nodes (19): arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps, docsParaRegistros(), docsParaRegistrosReps() (+11 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.17
Nodes (11): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+3 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "ContaAluno.tsx"
Cohesion: 0.23
Nodes (15): `src/features/aluno/` — App do aluno, ContaAluno(), escolherFoto(), desde(), Linha(), Peso(), IcBalao, IcLivro (+7 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "cartaoStory.ts"
Cohesion: 0.21
Nodes (21): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), DadosCartao, desenhar(), desenharTreino(), desenharTreinoFoto() (+13 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "TutorialCoach.tsx"
Cohesion: 0.20
Nodes (21): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+13 more)

### Community 86 - "aluno-exemplo.test.ts"
Cohesion: 0.18
Nodes (18): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+10 more)

### Community 87 - "GuiaMetodos.tsx"
Cohesion: 0.24
Nodes (8): ANTIGA(), COR_METODO, METODOS, ORDEM, dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

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
Cohesion: 0.17
Nodes (12): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}` (+4 more)

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

### Community 108 - "acoes.ts"
Cohesion: 0.20
Nodes (14): cancelarTreino(), marcarInicio(), marcarRealizado(), perfilCadastro(), reabrirTreino(), registrarCarga(), registrarPc(), registrarReps() (+6 more)

### Community 110 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): vite@^8.3.4, vite-plugin-pwa@^1.3.0, vite, vite-plugin-pwa, arquivos(), previewHeaders, TIPOS, versao

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
Cohesion: 0.14
Nodes (32): LGPD, NovoAluno(), enviar(), EditorMeso(), atualizar(), salvar(), setSemanas(), mesoPadrao() (+24 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 121 - "prescreverSessao"
Cohesion: 0.13
Nodes (22): diaSP(), ARQUIVADO_DIAS, chaveAlerta, DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS (+14 more)

### Community 122 - "criarAluno"
Cohesion: 0.24
Nodes (8): confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder()

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (23): ARTE, clarear(), COR_CORPO, corParte(), ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista() (+15 more)

### Community 135 - "AvaliacaoCoach.tsx"
Cohesion: 0.18
Nodes (22): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa, fora() (+14 more)

### Community 136 - "react"
Cohesion: 0.11
Nodes (48): firebase, react, AvaliacoesCoach(), Doc, FILTROS, Aba, ABAS, DIAS_SEMANA (+40 more)

### Community 137 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.22
Nodes (8): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, v2 (10/11/2026): tela do aluno resumida, cores de evolução e leitura medida x dobra

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 139 - "src/index.ts"
Cohesion: 0.17
Nodes (12): CacheAcesso, cors(), ORIGENS, AcaoIA, ROTAS_IA, DESCANSO, DO_ALUNO, Env (+4 more)

### Community 140 - "src/ia.ts"
Cohesion: 0.19
Nodes (14): appCheckOk(), ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, MAX_CORPO_IA, metadados() (+6 more)

### Community 141 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 142 - "ref_node_fs"
Cohesion: 0.07
Nodes (13): ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, marca, arquivos() (+5 more)

### Community 143 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 144 - "Árvore por pasta"
Cohesion: 0.11
Nodes (17): Comandos e workflows, `.github/workflows/` — CI/CD, Mapa do Código — Força, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, Rotas do app (+9 more)

### Community 145 - "SenhaSegura.tsx"
Cohesion: 0.21
Nodes (17): trocarSenha(), RequisitosSenha(), erroSenha(), SenhaSegura(), conferir(), criarNova(), esqueci(), reautenticar() (+9 more)

### Community 146 - "criarAluno"
Cohesion: 0.15
Nodes (8): doAluno(), PARQ_NAO, ALUNO, COACH, CORS, criarAluno(), criarAnamnese(), listarDocs()

### Community 147 - "Descanso"
Cohesion: 0.15
Nodes (6): Descanso, alvosDe(), comAparelho(), inicioDoDiaBrasilia(), nomeDO(), semAparelho()

### Community 148 - "SessaoCard.tsx"
Cohesion: 0.25
Nodes (9): EvolucaoCoach(), fmt(), Chips(), CORES, RepsFeitas(), SessaoCard(), textoNota(), Barra() (+1 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "prescreverSessao"
Cohesion: 0.11
Nodes (28): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, nomes(), evolucaoExercicio(), media(), metricasExercicio() (+20 more)

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

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.09
Nodes (20): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+12 more)

### Community 162 - "firebase-admin"
Cohesion: 0.18
Nodes (8): firebase-admin@14.5.0, firebase-admin, atual, novo, acao, email, projeto, PROJETOS

### Community 163 - "AvisoAtraso.tsx"
Cohesion: 0.31
Nodes (12): AvisoAtraso(), chave(), jaViu(), Hoje(), Msg(), dataSP(), mesoAtual(), contaDoDia() (+4 more)

### Community 164 - "relatorio.test.ts"
Cohesion: 0.21
Nodes (10): agora, feito(), linha, m0, m1, meso(), registros, slot() (+2 more)

### Community 165 - "cartaoDepoimento.ts"
Cohesion: 0.27
Nodes (9): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), H, pngDe(), W (+1 more)

### Community 166 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 167 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

## Knowledge Gaps
- **4 isolated node(s):** `RFC-8291`, `RFC-8292`, `RFC-8291`, `RFC-8188`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1265 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `TabProgressao.tsx`, `lib/planilha.test.ts`, `src/index.ts`, `src/ia.ts`, `avaliacao.ts`, `util.ts`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `SenhaSegura.tsx`, `ref_node_fs`, `aluno-exemplo.test.ts`, `SessaoCard.tsx`, `prescreverSessao`, `prescreverSessao`, `segmentos.ts`, `jwt.ts`, `FimTreino.tsx`, `Alunos.tsx`, `RelatorioCoach.tsx`, `Entrar.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `Alertas.tsx`, `avisos-pagamento.mjs`, `webpush.ts`, `cartaoDepoimento.ts`, `marca.test.ts`, `PagarPix.tsx`, `seriesDoRotulo`, `ehRecorde`, `src/index.ts`, `relatorio.test.ts`, `firebase-admin`, `package.json`, `ui.tsx`, `evolucao.ts`, `src/acesso.ts`, `Cartao`, `lib/acesso.ts`, `iaTreino.ts`, `QrCadastro.tsx`, `engine/index.ts`, `inatividade.ts`, `EnviarFeedback.tsx`, `push.ts`, `PainelEvolucao.tsx`, `cartaoStory.ts`, `aluno-exemplo.test.ts`, `GuiaMetodos.tsx`, `rules.test.ts`, `CardioHoje.tsx`, `acoes.ts`, `prescreverSessao`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Are the 145 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `versao()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 145 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RFC-8291`, `RFC-8292`, `RFC-8291` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AcaoEmail.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14532019704433496 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `AcaoEmail.tsx`, `lib/planilha.test.ts`, `Hoje.tsx`, `TabProgressao.tsx`, `AvaliacaoCoach.tsx`, `react`, `src/ia.ts`, `avaliacao.ts`, `util.ts`, `App.tsx`, `Árvore por pasta`, ``src/lib/` — Firestore, estado, cálculos com dados`, `SenhaSegura.tsx`, `Descanso`, `Treino.tsx`, `SessaoCard.tsx`, `prescreverSessao`, `prescreverSessao`, `FimTreino.tsx`, `Alunos.tsx`, `Estado da sessão (retomada) — atualizado em 10/11/2026`, `RelatorioCoach.tsx`, `Entrar.tsx`, `Alertas.tsx`, `avisos-pagamento.mjs`, `AvisoAtraso.tsx`, `PagarPix.tsx`, `Avaliacao.tsx`, `seriesDoRotulo`, `ehRecorde`, `src/index.ts`, `ui.tsx`, `evolucao.ts`, `src/acesso.ts`, `Cartao`, `Presencial.tsx`, `lib/acesso.ts`, `iaTreino.ts`, `inatividade.ts`, `push.ts`, `Inicio.tsx`, `PainelEvolucao.tsx`, `cartaoStory.ts`, `aluno-exemplo.test.ts`, `CardioHoje.tsx`, `acoes.ts`, `MesosDoAluno.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._