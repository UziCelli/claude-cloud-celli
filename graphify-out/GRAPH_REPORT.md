# Graph Report - claude-cloud-celli  (2026-11-13)

## Corpus Check
- 367 files · ~380,129 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3488 nodes · 9928 edges · 187 communities (169 shown, 18 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 450 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0985ba5c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- avaliacao.spec.ts
- Entrar.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- lib/planilha.test.ts
- Hoje.tsx
- AlunoApp.tsx
- env
- seed.ts
- BoasVindas.tsx
- avaliacao.ts
- metricas.ts
- util.ts
- conversores.ts
- anamnese.ts
- steps
- env
- Segurança — passos do Victor no console
- Pontos sensíveis (leia antes de auditar ou mexer)
- vidro.tsx
- prints.spec.ts
- anatomia.ts
- sugestoesFisio.ts
- jwt.ts
- ContaAluno.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- registrarErro
- steps
- steps
- settings.json
- relatorio.ts
- Quadro
- aluno-exemplo.mjs
- webpush.ts
- ui.tsx
- ref_node_fs
- firebase-admin
- AnamneseCoach.tsx
- iaTreino.ts
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- SessaoCard.tsx
- evolucao.ts
- with
- SenhaSegura
- src/acesso.ts
- compilerOptions
- semanas
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- pix.ts
- push.ts
- steps
- TutorialCoach.tsx
- Treino.tsx
- engine/index.ts
- Motion / Framer Motion Examples
- sair
- Inicio.tsx
- descanso.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- Presencial.tsx
- steps
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- FimTreino.tsx
- fetch
- push.yml
- norm
- importar-meso.mjs
- pdfAvaliacao.ts
- with
- overrides
- icones.tsx
- relatorio.spec.ts
- layout.spec.ts
- Performance Optimization
- evolucao.test.ts
- rules.test.ts
- Botao
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- dor.ts
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- GuiaFisio.tsx
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
- MesosDoAluno.tsx
- Feedbacks.tsx
- alertas.ts
- criarAluno
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- MinhaConta.tsx
- 5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)
- AvaliacaoCoach.tsx
- saude.yml
- cors.ts
- cartaoDepoimento.ts
- Força — app de treino (substitui a planilha "Força 2027.1")
- @playwright/test
- pesoCorporal.ts
- src/ia.ts
- sair.spec.ts
- cardio.ts
- Árvore por pasta
- Físio — articulações e músculos de cada exercício (para o Victor conferir)
- limpeza
- marca
- vitest
- env
- Coleções Firestore
- steps
- 12/11/2026 — orientação individual dos métodos
- limpeza-lgpd.yml
- voz-ia.spec.ts
- with
- QrCadastro.tsx
- preparar
- criarCoach
- firebase-admin
- aluno-exemplo.test.ts
- lib/fisio.ts
- criarMeso
- README.md
- criarAluno
- marca.test.ts
- seriesDoRotulo
- FisioCoach.tsx
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- vite.config.ts
- Plano — Entrega 4: registro de erros e segurança
- erros.mjs
- Firebase — Guia de Setup
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- APK do Força (Android)
- varredura.spec.ts
- fisio-rules.test.ts
- vfit/Logo.tsx
- montarPdf
- feedback.spec.ts
- Menu
- atualizar.ts
- pwa-assets.config.ts
- AvisoIOS

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 159 edges
2. `Botao()` - 141 edges
3. `Treino()` - 91 edges
4. `react` - 84 edges
5. `vitest` - 80 edges
6. ``src/lib/` — Firestore, estado, cálculos com dados` - 61 edges
7. `firebase` - 59 edges
8. `Cartao()` - 59 edges
9. `Aviso()` - 58 edges
10. `prescreverSessao()` - 57 edges

## Surprising Connections (you probably didn't know these)
- `Definições (fonte da verdade do cálculo)` --references--> `metricasExercicio()`  [INFERRED]
  docs/plano-evolucao.md → src/engine/metricas.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- `Contexto` --references--> `polimento()`  [INFERRED]
  docs/plano-fisio.md → src/engine/volume.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx

## Import Cycles
- None detected.

## Communities (187 total, 18 thin omitted)

### Community 0 - "avaliacao.spec.ts"
Cohesion: 0.22
Nodes (4): ALUNO, amanha(), COACH, DOBRAS

### Community 1 - "Entrar.tsx"
Cohesion: 0.17
Nodes (21): deveMostrarBoasVindas(), ler(), Entrar(), enviar(), voltar(), erros, mensagemErro(), SENHA_FRACA (+13 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.07
Nodes (34): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+26 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.15
Nodes (13): 10. Monitoramento, 11. Meta robusta (por métrica: movimentos, carga média, volume) — `AS66:AU66`, 12. Evolução de um exercício — `CG2`, 13. Não portado (de propósito), 2. Divisão (quais exercícios em cada treino), 3. Progressão (reps por série), 4. Métodos avançados (`tblLocalMetodosNx`), 5. Reps de cada série — `AvRep(base, n, semana, treino, ex, pos)` (+5 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "lib/planilha.test.ts"
Cohesion: 0.09
Nodes (33): abaAntigaFalsa(), abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc (+25 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.11
Nodes (35): AvisoReps(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), diaCurto(), quando() (+27 more)

### Community 8 - "AlunoApp.tsx"
Cohesion: 0.13
Nodes (32): AlunoApp(), AvisoAtraso(), chave(), jaViu(), Hoje(), InicioAluno(), jaViuPopup(), marcarPopup() (+24 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.15
Nodes (15): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+7 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.17
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS, copiarLink() (+19 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.06
Nodes (53): Avaliacao, AvaliacaoForm, BIO, Ciclo, DESCE, Destaque, DobraId, DOBRAS (+45 more)

### Community 13 - "metricas.ts"
Cohesion: 0.16
Nodes (19): `registros/{regId}`, 7. Teste de ataques (03/10/2026), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+11 more)

### Community 14 - "util.ts"
Cohesion: 0.09
Nodes (47): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+39 more)

### Community 15 - "conversores.ts"
Cohesion: 0.13
Nodes (22): Cargas, hoje, mk(), mesoPadrao(), arred(), caminhoCarga(), CargasDoc, deMapa() (+14 more)

### Community 16 - "anamnese.ts"
Cohesion: 0.10
Nodes (37): `src/lib/` — Firestore, estado, cálculos com dados, AlunoAnam, Anamnese, anamnesesNovas(), anamnesesPendentes(), avisoMedico(), Base, CHAVE_RASCUNHO (+29 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (22): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+14 more)

### Community 20 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.09
Nodes (43): `fisioOrientacoes/{id automático}`, Onde mexer para…, Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, LGPD, nadaPassaDaTela(), pedir(), excluir() (+35 more)

### Community 21 - "vidro.tsx"
Cohesion: 0.16
Nodes (21): Logo(), trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+13 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (17): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras() (+9 more)

### Community 23 - "anatomia.ts"
Cohesion: 0.23
Nodes (10): Etapa 1 — Base no catálogo (pode começar já), Anatomia, anatomiaDo(), ArticulacaoId, ARTICULACOES, articulacoesDo(), DADOS, MusculoId (+2 more)

### Community 24 - "sugestoesFisio.ts"
Cohesion: 0.13
Nodes (23): CampoCheckin, Checkin, CheckinForm, checkinValido(), COLECAO_CHECKINS, lerCheckin(), nota(), PERGUNTAS_CHECKIN (+15 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "ContaAluno.tsx"
Cohesion: 0.16
Nodes (23): `src/features/conta/` — Minha Conta, AvisoNotificacoes(), permissao(), AvisoDescanso(), ContaAluno(), escolherFoto(), desde(), Linha() (+15 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (42): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+34 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.10
Nodes (44): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, fmt(), ajustar(), C, caixa(), carregarImagem(), DadosCartao, DadosTreino (+36 more)

### Community 29 - "registrarErro"
Cohesion: 0.09
Nodes (39): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), comparar(), ConfirmarAluno() (+31 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "relatorio.ts"
Cohesion: 0.13
Nodes (19): precisaAtualizar(), avaliacoesParaFazer(), somarDias(), Evolucao, MesoEvolucao, arred(), cicloTerminou(), diasDesdeFim() (+11 more)

### Community 34 - "Quadro"
Cohesion: 0.18
Nodes (21): Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), Quadros(), RelatorioPronto(), ConviteFeedback(), Faixa(), FaixaFeedback() (+13 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "ui.tsx"
Cohesion: 0.09
Nodes (31): EnviarAviso(), EvolucaoCoach(), BotaoCompartilhar(), clicar(), compartilharArquivo(), dataCurta(), EvolucaoAluno(), EvolucaoCoach() (+23 more)

### Community 38 - "ref_node_fs"
Cohesion: 0.11
Nodes (9): ALUNO, COACH, marca, arquivos(), RAIZ, app, auth, COLECOES (+1 more)

### Community 39 - "firebase-admin"
Cohesion: 0.14
Nodes (5): app, auth, COLECOES, db, SCRIPTS

### Community 40 - "AnamneseCoach.tsx"
Cohesion: 0.22
Nodes (17): apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach, Rascunho (+9 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.06
Nodes (54): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+46 more)

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
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 46 - "SessaoCard.tsx"
Cohesion: 0.20
Nodes (17): `notas/{alunoId}`, Convenção de gravação (TOTAL), Nota(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard() (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.17
Nodes (23): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Feito (+15 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "SenhaSegura"
Cohesion: 0.23
Nodes (14): RequisitosSenha(), erroSenha(), SenhaSegura(), conferir(), criarNova(), reautenticar(), trocarSenha(), estadoSenha (+6 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.12
Nodes (23): acessoComCache(), CacheAcesso, Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+15 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "semanas"
Cohesion: 0.67
Nodes (3): 1. Configuração do mesociclo, `mesos/{mesoId}`, semanas()

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
Cohesion: 0.18
Nodes (23): enviar(), agendarPush(), avisarCoach(), avisarTreinoPronto(), avisosLigados(), b64uParaBytes(), BASE, cabecalhosPush() (+15 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "TutorialCoach.tsx"
Cohesion: 0.29
Nodes (16): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+8 more)

### Community 61 - "Treino.tsx"
Cohesion: 0.12
Nodes (34): Peças, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), NotaMetodos() (+26 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.09
Nodes (58): `src/engine/` — Motor de cálculo puro (sem React/Firebase), COR_METODO, METODOS, ORDEM, adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS (+50 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "sair"
Cohesion: 0.14
Nodes (18): sairAgora(), sairAgora(), sair(), apagarCacheAoSair(), bloquearDuranteSaida(), concluirSaida(), reabrirAposFalha(), Armazem (+10 more)

### Community 65 - "Inicio.tsx"
Cohesion: 0.27
Nodes (13): `src/features/coach/` — App do coach, useAlertasCoach(), useArquivados(), chavesAtuais(), QrCadastro(), mediaTexto(), Inicio(), saudacao() (+5 more)

### Community 66 - "descanso.ts"
Cohesion: 0.09
Nodes (26): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+18 more)

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

### Community 73 - "Presencial.tsx"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "Alertas.tsx"
Cohesion: 0.14
Nodes (20): motion, react-dom, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo (+12 more)

### Community 76 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.25
Nodes (8): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato novo do Worker, Critério de pronto, Decisões, Respostas do Victor, Riscos, recado(), Tipo

### Community 77 - "FimTreino.tsx"
Cohesion: 0.23
Nodes (11): CONFETE, dur(), FimTreino(), escolher(), Lista(), IcCamera, IcSubir, comparacaoToneladas() (+3 more)

### Community 78 - "fetch"
Cohesion: 0.12
Nodes (15): Contrato do Worker, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026), Vários aparelhos e "Apagar de vez" (10/11/2026), Descanso, fetch(), alvosDe() (+7 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "norm"
Cohesion: 0.28
Nodes (8): CampoExercicio(), SeletorExercicios(), POR_NOME, buscarExercicios(), itens, norm(), nomes(), MAX_EXERCICIOS

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "pdfAvaliacao.ts"
Cohesion: 0.11
Nodes (34): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), corParte() (+26 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "icones.tsx"
Cohesion: 0.19
Nodes (20): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+12 more)

### Community 86 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 87 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "evolucao.test.ts"
Cohesion: 0.18
Nodes (13): painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1, meso() (+5 more)

### Community 90 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 91 - "Botao"
Cohesion: 0.13
Nodes (33): `src/features/privacidade/` — Política e Aceite, App(), Coach(), PerfilDemora(), Principal(), SemAcesso(), Vigia(), PausaSaude() (+25 more)

### Community 92 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

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

### Community 100 - "dor.ts"
Cohesion: 0.19
Nodes (19): `fisioDores/{id automático}` (Etapa 3, 12/11/2026), relatarDor(), chip(), RelatarDor(), ROTULO_LOCAL, vazio(), IcFisio, ALERTA_DOR (+11 more)

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

### Community 108 - "GuiaFisio.tsx"
Cohesion: 0.16
Nodes (18): ALERTA_GERAL, ALERTA_LOMBAR, ALERTA_TENDAO, AVISO_FISIO, linkPubmed(), MetodoFisio, METODOS_FISIO, Nivel (+10 more)

### Community 110 - "notasMetodo.ts"
Cohesion: 0.36
Nodes (5): ANTIGA(), dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

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
Nodes (54): `src/features/aluno/` — App do aluno, CardioHoje(), Peso(), dataSP(), DIAS_CURTO, mesoAtual(), proximoMeso(), NovoAluno() (+46 more)

### Community 120 - "Feedbacks.tsx"
Cohesion: 0.12
Nodes (30): Cartao(), Estrelas(), chip(), EnviarFeedback(), enviar(), Opcao(), IcEstrela(), enviarFeedback() (+22 more)

### Community 121 - "alertas.ts"
Cohesion: 0.07
Nodes (39): calcularAlertas(), Grupos, Reg, agora, alunos, linha, meso, mesos (+31 more)

### Community 122 - "criarAluno"
Cohesion: 0.24
Nodes (8): confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder()

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (22): ARTE, clarear(), COR_CORPO, ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista(), Parte (+14 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.19
Nodes (17): DuasEtapas(), tentar(), erros, mensagemErro(), trocarEmail(), trocarSenha(), alterarEmail(), ativarTotp() (+9 more)

### Community 136 - "5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)"
Cohesion: 0.12
Nodes (16): 1. Sua tarefa, 2. Regras de escopo (valem para o grupo inteiro), 3. Estrutura de dados sugerida para cada método, 4. Regras globais de progressão (aplicar a todos os métodos), 5.1 Coluna lombar — dor lombar crônica inespecífica, 5.2 Ombro — dor relacionada ao manguito rotador / subacromial, 5.3 Joelho, 5.4 Tendões (tendinopatias) (+8 more)

### Community 137 - "AvaliacaoCoach.tsx"
Cohesion: 0.11
Nodes (57): firebase, react, BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa (+49 more)

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 140 - "cartaoDepoimento.ts"
Cohesion: 0.31
Nodes (9): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), D_ESTRELA, assinaturaMarca(), primeiroNome() (+1 more)

### Community 141 - "Força — app de treino (substitui a planilha "Força 2027.1")"
Cohesion: 0.20
Nodes (10): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+2 more)

### Community 142 - "@playwright/test"
Cohesion: 0.06
Nodes (19): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, PNG (+11 more)

### Community 143 - "pesoCorporal.ts"
Cohesion: 0.19
Nodes (17): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+9 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.19
Nodes (14): appCheckOk(), AcaoIA, ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, metadados() (+6 more)

### Community 146 - "cardio.ts"
Cohesion: 0.53
Nodes (4): diaNumero(), rotuloCardio(), TipoCardio, TIPOS

### Community 147 - "Árvore por pasta"
Cohesion: 0.12
Nodes (17): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+9 more)

### Community 148 - "Físio — articulações e músculos de cada exercício (para o Victor conferir)"
Cohesion: 0.13
Nodes (14): Abdome e Lombar, Adutores e Abdutores, Antebraço, Bíceps, Dorsais, Escolhas que eu fiz (confira primeiro), Físio — articulações e músculos de cada exercício (para o Victor conferir), Ombros (+6 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "vitest"
Cohesion: 0.06
Nodes (48): vitest, m(), igual(), Linhas, migrarProgressao(), antigo(), L(), slot() (+40 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Coleções Firestore"
Cohesion: 0.12
Nodes (15): `anamneses/{id automático}`, `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fisioCheckins/{id automático}` (rodada 4, 13/11/2026) (+7 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "12/11/2026 — orientação individual dos métodos"
Cohesion: 0.12
Nodes (14): 12/11/2026 (noite) — Claude: Etapa 3 e lista geral de perigo, 12/11/2026 — orientação individual dos métodos, 13/11/2026 (madrugada) — Claude: rodada 4 (pedido do Victor antes de dormir), Continuidade Físio — Codex / Claude, Critério de pronto e verificação, Critérios do Markdown científico, Decisões desta entrega, Próximas etapas que continuam no plano (+6 more)

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "QrCadastro.tsx"
Cohesion: 0.31
Nodes (5): uqr, CAMINHO_CADASTRO, emLinkCadastro(), linkCadastro, qrDataUrl()

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarCoach"
Cohesion: 0.09
Nodes (24): COACH, ALUNO, COACH, COACH, ALUNO, COACH, ALUNO, COACH (+16 more)

### Community 162 - "firebase-admin"
Cohesion: 0.20
Nodes (7): firebase-admin, atual, novo, acao, email, projeto, PROJETOS

### Community 163 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 164 - "lib/fisio.ts"
Cohesion: 0.21
Nodes (17): ARTICULACAO_QUEIXA, contextoPelaAnamnese(), CONTEXTOS_LIBERACAO, dataValida(), doresDaAnamnese(), lerLiberacao(), lerOrientacao(), LiberacaoProfissional (+9 more)

### Community 165 - "criarMeso"
Cohesion: 0.14
Nodes (11): ALUNO, COACH, NOMES, ALUNO, meso(), prog, ALUNO, COACH (+3 more)

### Community 166 - "README.md"
Cohesion: 0.22
Nodes (4): Fases, Força — app de treino, Manutenção, Para desenvolvedores

### Community 167 - "criarAluno"
Cohesion: 0.12
Nodes (13): doAluno(), PARQ_NAO, dados(), ALUNO, COACH, dia(), meso(), semear() (+5 more)

### Community 168 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 170 - "FisioCoach.tsx"
Cohesion: 0.17
Nodes (27): enviarOrientacao(), marcarDorVista(), recolherOrientacao(), relatarSinalFisio(), responderDor(), salvarExerciciosFisio(), ConteudoMetodo(), descreverDor() (+19 more)

### Community 171 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.20
Nodes (9): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, v2 (10/11/2026): tela do aluno resumida, cores de evolução e leitura medida x dobra (+1 more)

### Community 172 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

### Community 173 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.20
Nodes (9): 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um), Divisão (agentes Sonnet; nunca dois no mesmo arquivo) (+1 more)

### Community 174 - "erros.mjs"
Cohesion: 0.22
Nodes (7): `avaliacoes/{id automático}`, corte, data(), db, linhas, projeto, PROJETOS

### Community 175 - "Firebase — Guia de Setup"
Cohesion: 0.25
Nodes (8): Firebase — Guia de Setup, O que é e quanto custa, Parte 1 — Criar o projeto (10 min), Parte 2 — Ativar o login por e-mail, Parte 3 — Criar o banco de dados, Parte 4 — Me mandar a configuração, Parte 5 — Virar o coach, Se algo der errado

### Community 176 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.25
Nodes (7): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 177 - "APK do Força (Android)"
Cohesion: 0.29
Nodes (7): APK do Força (Android), Atualizações do app, Como gerar, Como mandar para o aluno, O que o workflow faz, Segredo importante, Testar sem ter Android

### Community 179 - "fisio-rules.test.ts"
Cohesion: 0.33
Nodes (5): @firebase/rules-unit-testing, db(), liberacao, MFA, ref()

### Community 180 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 181 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 182 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 183 - "Menu"
Cohesion: 0.60
Nodes (5): ativaAba(), Menu(), Icone, BarraAbas(), Bolha()

### Community 184 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 186 - "AvisoIOS"
Cohesion: 0.83
Nodes (3): AvisoIOS(), iOS(), standalone()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1347 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `Entrar.tsx`, `ataques.test.ts`, `Hoje.tsx`, `AlunoApp.tsx`, `AvaliacaoCoach.tsx`, `avaliacao.ts`, `metricas.ts`, `util.ts`, `conversores.ts`, `src/ia.ts`, `anamnese.ts`, `pesoCorporal.ts`, `Árvore por pasta`, `vidro.tsx`, `vitest`, `Coleções Firestore`, `ContaAluno.tsx`, `cartaoStory.ts`, `registrarErro`, `ui.tsx`, `criarAluno`, `iaTreino.ts`, `src/index.ts`, `FisioCoach.tsx`, `seriesDoRotulo`, `SessaoCard.tsx`, `evolucao.ts`, `SenhaSegura`, `src/acesso.ts`, `montarPdf`, `Menu`, `pix.ts`, `AvisoIOS`, `push.ts`, `TutorialCoach.tsx`, `Treino.tsx`, `engine/index.ts`, `sair`, `Inicio.tsx`, `Presencial.tsx`, `FimTreino.tsx`, `fetch`, `pdfAvaliacao.ts`, `evolucao.test.ts`, `Botao`, `MesosDoAluno.tsx`, `alertas.ts`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `dados()` and `nadaPassaDaTela()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 157 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06717687074829932 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `Entrar.tsx`, `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `AlunoApp.tsx`, `AvaliacaoCoach.tsx`, `MinhaConta.tsx`, `cors.ts`, `cartaoDepoimento.ts`, `metricas.ts`, `util.ts`, `conversores.ts`, `src/ia.ts`, `anamnese.ts`, `avaliacao.ts`, `cardio.ts`, `pesoCorporal.ts`, `anatomia.ts`, `sugestoesFisio.ts`, `jwt.ts`, `cartaoStory.ts`, `registrarErro`, `QrCadastro.tsx`, `lib/planilha.test.ts`, `relatorio.ts`, `aluno-exemplo.test.ts`, `webpush.ts`, `lib/fisio.ts`, `ref_node_fs`, `ui.tsx`, `marca.test.ts`, `iaTreino.ts`, `src/index.ts`, `seriesDoRotulo`, `firebase-admin`, `package.json`, `SessaoCard.tsx`, `SenhaSegura`, `src/acesso.ts`, `fisio-rules.test.ts`, `montarPdf`, `atualizar.ts`, `pix.ts`, `push.ts`, `Treino.tsx`, `engine/index.ts`, `sair`, `descanso.ts`, `FimTreino.tsx`, `norm`, `evolucao.test.ts`, `rules.test.ts`, `dor.ts`, `GuiaFisio.tsx`, `notasMetodo.ts`, `Feedbacks.tsx`, `alertas.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `extrair_planilha.py` be split into smaller, more focused modules?**
  _Cohesion score 0.08383838383838384 - nodes in this community are weakly interconnected._