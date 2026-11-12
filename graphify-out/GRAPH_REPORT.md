# Graph Report - claude-cloud-celli  (2026-11-12)

## Corpus Check
- 370 files · ~355,758 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3427 nodes · 9544 edges · 177 communities (163 shown, 14 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 399 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `86d533e7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- criarCoach
- AcaoEmail.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- lib/planilha.test.ts
- Hoje.tsx
- prescreverSessao
- env
- seed.ts
- BoasVindas.tsx
- avaliacao.ts
- FisioCoach.tsx
- util.ts
- App.tsx
- anamnese.ts
- steps
- env
- Segurança — passos do Victor no console
- AlunoApp.tsx
- Avaliacao.tsx
- prints.spec.ts
- segmentos.ts
- PainelEvolucao.tsx
- jwt.ts
- InicioAluno.tsx
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- Entrar
- steps
- steps
- settings.json
- Coleções Firestore
- avisos-pagamento.mjs
- aluno-exemplo.mjs
- webpush.ts
- Alunos.tsx
- vigia.test.ts
- firebase-admin
- iaTreino.ts
- VozTreino.tsx
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- MesosDoAluno.tsx
- cartaoRelatorio.ts
- with
- Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)
- src/acesso.ts
- compilerOptions
- erros.mjs
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- diaSP
- push.ts
- steps
- anatomia.ts
- SessaoCard.tsx
- engine/index.ts
- Motion / Framer Motion Examples
- 5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)
- EnviarFeedback.tsx
- Treino.tsx
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- SenhaSegura.tsx
- steps
- App.tsx
- montarPdf
- ui.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- sessao.ts
- importar-meso.mjs
- pdfAvaliacao.ts
- with
- overrides
- icones.tsx
- Físio — articulações e músculos de cada exercício (para o Victor conferir)
- Plano — Sistema Físio (grande atualização, branch separada)
- Performance Optimization
- limpeza-lgpd.mjs
- rules.test.ts
- registrarErro
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- resumo.ts
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- icones.tsx
- gislane/Logo.tsx
- GuiaMetodos.tsx
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- lib/acesso.ts
- Presencial.tsx
- alertas.ts
- criarAluno
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- MinhaConta.tsx
- AvaliacaoCoach.tsx
- relatorio.spec.ts
- saude.yml
- src/index.ts
- avaliacao.spec.ts
- `src/lib/` — Firestore, estado, cálculos com dados
- ref_node_fs
- pesoCorporal.ts
- src/ia.ts
- Árvore por pasta
- acoes.ts
- Descanso
- ContaAluno.tsx
- limpeza
- marca
- sugestao.test.ts
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- voz-ia.spec.ts
- with
- FimTreino.tsx
- preparar
- criarMeso
- firebase-admin
- Feedbacks.tsx
- evolucao.test.ts
- aluno-exemplo.test.ts
- vitest
- anamnese.spec.ts
- marca.test.ts
- cartaoDepoimento.ts
- tutorial.spec.ts
- pwa-assets.config.ts
- fotoTreino.spec.ts
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- seriesDoRotulo
- limparEmuladores
- Mapa do Código — Força

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 149 edges
2. `Botao()` - 138 edges
3. `Treino()` - 84 edges
4. `react` - 82 edges
5. `vitest` - 78 edges
6. ``src/lib/` — Firestore, estado, cálculos com dados` - 57 edges
7. `Cartao()` - 57 edges
8. `Aviso()` - 56 edges
9. `prescreverSessao()` - 55 edges
10. `useLista()` - 53 edges

## Surprising Connections (you probably didn't know these)
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- ``src/features/conta/` — Minha Conta` --references--> `Chave()`  [INFERRED]
  docs/mapa.md → src/features/conta/ChavesAvisos.tsx
- ``src/features/privacidade/` — Política e Aceite` --references--> `CaixaAceite()`  [INFERRED]
  docs/mapa.md → src/features/privacidade/Politica.tsx
- ``relatorios/{mesoId}`` --references--> `relatorioCiclo()`  [INFERRED]
  docs/mapa.md → src/lib/relatorio.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts

## Import Cycles
- 2-file cycle: `src/lib/avaliacao.ts -> src/lib/segmentos.ts -> src/lib/avaliacao.ts`

## Communities (177 total, 14 thin omitted)

### Community 0 - "criarCoach"
Cohesion: 0.11
Nodes (17): COACH, COACH, ALUNO, COACH, ALUNO, COACH, semear(), COACH (+9 more)

### Community 1 - "AcaoEmail.tsx"
Cohesion: 0.10
Nodes (31): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, AcaoEmail(), salvar(), ACOES (+23 more)

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
Cohesion: 0.14
Nodes (26): Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), diaCurto(), DIAS_CURTO, mesoAtual() (+18 more)

### Community 8 - "prescreverSessao"
Cohesion: 0.11
Nodes (33): nomes(), linhaPrescrita(), prescreverSessao(), slotsDaSessao(), aplicarSugestao(), AlvoVolume, ajustarSeries(), aplicar() (+25 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.13
Nodes (18): ALUNO, COACH, ALUNO, COACH, confere(), semTransbordar(), ALUNO, COACH (+10 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.12
Nodes (37): `src/features/instalar/` — PWA/Android, SemAcesso(), PausaSaude(), BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler() (+29 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.09
Nodes (33): BIO, Ciclo, corteAvaliacoes(), Destaque, DobraId, DOBRAS, FAIXA, forca() (+25 more)

### Community 13 - "FisioCoach.tsx"
Cohesion: 0.08
Nodes (43): ALERTA_LOMBAR, ALERTA_TENDAO, AVISO_FISIO, linkPubmed(), MetodoFisio, METODOS_FISIO, Nivel, opcional() (+35 more)

### Community 14 - "util.ts"
Cohesion: 0.15
Nodes (30): Registros, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+22 more)

### Community 15 - "App.tsx"
Cohesion: 0.10
Nodes (36): Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, dados(), nadaPassaDaTela(), versao(), adicionarExercicio(), adicionarMetodo(), alternarSerieDropset() (+28 more)

### Community 16 - "anamnese.ts"
Cohesion: 0.07
Nodes (53): Onde mexer para…, apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach (+45 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.08
Nodes (23): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+15 more)

### Community 20 - "AlunoApp.tsx"
Cohesion: 0.26
Nodes (11): AlunoApp(), AvisoAtraso(), chave(), jaViu(), dataSP(), tutorialNaoVisto(), AnamneseAluno(), AvisoIOS() (+3 more)

### Community 21 - "Avaliacao.tsx"
Cohesion: 0.18
Nodes (19): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), gerarPdfAvaliacao() (+11 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (13): ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES, PROIBIDO, registros() (+5 more)

### Community 23 - "segmentos.ts"
Cohesion: 0.13
Nodes (19): estavel(), DESCE, Leitura, PAR_DOBRA, REGIAO, Ocorrencia, cargaPorSegmento(), CargaSegmento (+11 more)

### Community 24 - "PainelEvolucao.tsx"
Cohesion: 0.12
Nodes (27): Aba, ABAS, freq(), MEDALHA, RankingAlunos(), BotaoCompartilhar(), clicar(), compartilharArquivo() (+19 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): deb64u(), abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims (+13 more)

### Community 26 - "InicioAluno.tsx"
Cohesion: 0.22
Nodes (22): Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), jaViuPopup(), marcarPopup(), Msg(), Quadros() (+14 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (42): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+34 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.23
Nodes (20): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), DadosCartao, desenhar(), desenharTreino(), desenharTreinoFoto() (+12 more)

### Community 29 - "Entrar"
Cohesion: 0.14
Nodes (24): Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar() (+16 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "Coleções Firestore"
Cohesion: 0.17
Nodes (12): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}` (+4 more)

### Community 34 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.15
Nodes (18): RFC-8188, RFC-8292, b64u(), juntar(), assinar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "Alunos.tsx"
Cohesion: 0.10
Nodes (35): `fisioOrientacoes/{id automático}`, LGPD, reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar() (+27 more)

### Community 38 - "vigia.test.ts"
Cohesion: 0.15
Nodes (5): SCRIPTS, app, auth, COLECOES, db

### Community 39 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 40 - "iaTreino.ts"
Cohesion: 0.13
Nodes (23): Acao, acharPosicao(), descreverAcao(), doCatalogo, ExercicioProposto, FERRAMENTA, inteiroOpc(), inteiros() (+15 more)

### Community 41 - "VozTreino.tsx"
Cohesion: 0.09
Nodes (35): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+27 more)

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
Nodes (25): devDependencies, @cloudflare/workers-types@^5.20260930.2, @firebase/rules-unit-testing@^5.0.2, firebase-tools@^15.33.0, @playwright/test@^1.63.0, tailwindcss@^4.3.3, @types/react@^19.0.0, @types/react-dom@^19.0.0 (+17 more)

### Community 46 - "MesosDoAluno.tsx"
Cohesion: 0.13
Nodes (40): motion, Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas() (+32 more)

### Community 47 - "cartaoRelatorio.ts"
Cohesion: 0.22
Nodes (16): pngDe(), dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num(), periodoTexto(), r (+8 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)"
Cohesion: 0.22
Nodes (8): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, v2 (10/11/2026): tela do aluno resumida, cores de evolução e leitura medida x dobra

### Community 50 - "src/acesso.ts"
Cohesion: 0.17
Nodes (16): acessoComCache(), Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), quemAvisaCoach() (+8 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

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

### Community 57 - "diaSP"
Cohesion: 0.18
Nodes (19): Mensalidade(), PixPopup(), contaDoDia(), dataCurta(), PagarPix(), copiar(), useHoje(), diaSP() (+11 more)

### Community 58 - "push.ts"
Cohesion: 0.06
Nodes (50): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+42 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "anatomia.ts"
Cohesion: 0.15
Nodes (17): Etapa 1 — Base no catálogo (pode começar já), TODAS, Anatomia, anatomiaDo(), ArticulacaoId, ARTICULACOES, articulacoesDo(), DADOS (+9 more)

### Community 61 - "SessaoCard.tsx"
Cohesion: 0.16
Nodes (21): `notas/{alunoId}`, Nota(), fmt(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard() (+13 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.25
Nodes (23): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+15 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)"
Cohesion: 0.12
Nodes (16): 1. Sua tarefa, 2. Regras de escopo (valem para o grupo inteiro), 3. Estrutura de dados sugerida para cada método, 4. Regras globais de progressão (aplicar a todos os métodos), 5.1 Coluna lombar — dor lombar crônica inespecífica, 5.2 Ombro — dor relacionada ao manguito rotador / subacromial, 5.3 Joelho, 5.4 Tendões (tendinopatias) (+8 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.14
Nodes (25): chip(), EnviarFeedback(), enviar(), Opcao(), enviarFeedback(), Assunto, ASSUNTOS, CHAVE_CONVITE (+17 more)

### Community 66 - "Treino.tsx"
Cohesion: 0.16
Nodes (22): AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), NotaMetodos(), Novidades(), RegistroFlag (+14 more)

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite@^4.3.3, vite@^8.3.4, @tailwindcss/vite, vite, arquivos(), previewHeaders, TIPOS, versao

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

### Community 73 - "SenhaSegura.tsx"
Cohesion: 0.12
Nodes (28): `src/lib/` — Privacidade, PerfilDemora(), pedir(), Principal(), Vigia(), RequisitosSenha(), erroSenha(), SenhaSegura() (+20 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "App.tsx"
Cohesion: 0.10
Nodes (45): `src/features/coach/` — App do coach, `src/` — Raiz, ativaAba(), Coach(), Menu(), PIX, abertura(), Acoes() (+37 more)

### Community 76 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 77 - "ui.tsx"
Cohesion: 0.12
Nodes (24): react, NovoAluno(), enviar(), EvolucaoCoach(), relatarSinalFisio(), ConteudoMetodo(), FisioAluno(), Orientacao() (+16 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.17
Nodes (11): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+3 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "sessao.ts"
Cohesion: 0.11
Nodes (19): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+11 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.14
Nodes (10): firebase-admin@14.5.0, firebase-admin, atual, novo, aluno, b, db, { meso, registros } (+2 more)

### Community 82 - "pdfAvaliacao.ts"
Cohesion: 0.20
Nodes (14): C, criarFolhas(), disp(), LARG, M, MUDO, PH, PW (+6 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "icones.tsx"
Cohesion: 0.15
Nodes (27): react-dom@^19.3.0, react-dom, Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno() (+19 more)

### Community 86 - "Físio — articulações e músculos de cada exercício (para o Victor conferir)"
Cohesion: 0.13
Nodes (14): Abdome e Lombar, Adutores e Abdutores, Antebraço, Bíceps, Dorsais, Escolhas que eu fiz (confira primeiro), Físio — articulações e músculos de cada exercício (para o Victor conferir), Ombros (+6 more)

### Community 87 - "Plano — Sistema Físio (grande atualização, branch separada)"
Cohesion: 0.14
Nodes (12): 12/11/2026 — orientação individual dos métodos, Continuidade Físio — Codex / Claude, Critério de pronto e verificação, Critérios do Markdown científico, Decisões desta entrega, Próximas etapas que continuam no plano, Resultados, Arquivos principais (+4 more)

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 90 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 91 - "registrarErro"
Cohesion: 0.15
Nodes (20): App(), Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog() (+12 more)

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
Nodes (6): dependencies, firebase@^12.19.0, motion@^13.4.6, react@^19.3.0, uqr@^0.1.3, uqr

### Community 100 - "resumo.ts"
Cohesion: 0.19
Nodes (13): Usuario, AlunoComId, fimDaSessao(), RegistroResumo, resumoCoach(), Sessao, agora, aluno() (+5 more)

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

### Community 108 - "icones.tsx"
Cohesion: 0.17
Nodes (21): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+13 more)

### Community 110 - "GuiaMetodos.tsx"
Cohesion: 0.22
Nodes (9): ANTIGA(), COR_METODO, metodoDoRotulo(), METODOS, ORDEM, dispensarNota(), mostrarNotasDeNovo(), notaDispensada() (+1 more)

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

### Community 119 - "lib/acesso.ts"
Cohesion: 0.18
Nodes (15): `src/features/aluno/` — App do aluno, proximoMeso(), hoje, mk(), dataPadrao(), mesoPadrao(), CARENCIA_DIAS, diasParaVencer() (+7 more)

### Community 120 - "Presencial.tsx"
Cohesion: 0.15
Nodes (25): firebase, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+17 more)

### Community 121 - "alertas.ts"
Cohesion: 0.07
Nodes (37): AvisoReps(), AlertaAbaixo, AlertaAcima, AlertaDemorado, calcularAlertas(), Grupos, Reg, agora (+29 more)

### Community 122 - "criarAluno"
Cohesion: 0.14
Nodes (8): doAluno(), PARQ_NAO, ALUNO, COACH, ANAMNESE_MINIMA, criarAluno(), criarAnamnese(), listarDocs()

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.10
Nodes (29): ARTE, clarear(), COR_CORPO, corParte(), ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista() (+21 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.15
Nodes (22): Peso(), QrCadastro(), DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), trocarEmail() (+14 more)

### Community 136 - "AvaliacaoCoach.tsx"
Cohesion: 0.11
Nodes (46): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Peças, BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa (+38 more)

### Community 137 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 139 - "src/index.ts"
Cohesion: 0.17
Nodes (12): CacheAcesso, cors(), ORIGENS, AcaoIA, ROTAS_IA, DESCANSO, DO_ALUNO, Env (+4 more)

### Community 140 - "avaliacao.spec.ts"
Cohesion: 0.22
Nodes (4): ALUNO, amanha(), COACH, DOBRAS

### Community 141 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.23
Nodes (17): `src/lib/` — Firestore, estado, cálculos com dados, CardioHoje(), useAnamnese(), IcCardio, desfazerCardio(), registrarCardio(), anamnesesNovas(), emOuAgora() (+9 more)

### Community 142 - "ref_node_fs"
Cohesion: 0.09
Nodes (14): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+6 more)

### Community 143 - "pesoCorporal.ts"
Cohesion: 0.13
Nodes (24): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+16 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.19
Nodes (14): appCheckOk(), ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, MAX_CORPO_IA, metadados() (+6 more)

### Community 145 - "Árvore por pasta"
Cohesion: 0.12
Nodes (16): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+8 more)

### Community 146 - "acoes.ts"
Cohesion: 0.09
Nodes (29): sairAgora(), cancelarTreino(), criarConta(), marcarInicio(), marcarRealizado(), reabrirTreino(), registrarReps(), registro() (+21 more)

### Community 147 - "Descanso"
Cohesion: 0.15
Nodes (6): Descanso, alvosDe(), comAparelho(), inicioDoDiaBrasilia(), nomeDO(), semAparelho()

### Community 148 - "ContaAluno.tsx"
Cohesion: 0.14
Nodes (25): AvisoNotificacoes(), permissao(), AvisoDescanso(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde() (+17 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "sugestao.test.ts"
Cohesion: 0.11
Nodes (19): m(), semanas(), ANTAGONISTAS, Candidato, classificarEquipamento(), Equipamento, grupoDe, norm() (+11 more)

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

### Community 159 - "FimTreino.tsx"
Cohesion: 0.21
Nodes (12): CONFETE, dur(), FimTreino(), Lista(), DadosTreino, ConviteFeedback(), IcCamera, IcSubir (+4 more)

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.09
Nodes (18): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+10 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 163 - "Feedbacks.tsx"
Cohesion: 0.32
Nodes (11): Cartao(), Doc, Estrelas(), FILTROS, IcEstrela(), apagarFeedback(), marcarFeedbackLido(), rotuloAssunto() (+3 more)

### Community 164 - "evolucao.test.ts"
Cohesion: 0.07
Nodes (49): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao (+41 more)

### Community 165 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 166 - "vitest"
Cohesion: 0.09
Nodes (26): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, vitest, mediana(), metaCiclo(), metaRobusta() (+18 more)

### Community 167 - "anamnese.spec.ts"
Cohesion: 0.24
Nodes (8): confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder()

### Community 168 - "marca.test.ts"
Cohesion: 0.29
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 169 - "cartaoDepoimento.ts"
Cohesion: 0.27
Nodes (9): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), H, W, D_ESTRELA (+1 more)

### Community 170 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 171 - "pwa-assets.config.ts"
Cohesion: 0.50
Nodes (3): @vite-pwa/assets-generator@^1.0.4, fundo, @vite-pwa/assets-generator

### Community 172 - "fotoTreino.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, PNG

### Community 173 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.22
Nodes (8): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 177 - "limparEmuladores"
Cohesion: 0.12
Nodes (11): ALUNO, COACH, CORS, ALUNO, COACH, iniciarEConcluir(), seg(), semear() (+3 more)

### Community 179 - "Mapa do Código — Força"
Cohesion: 0.50
Nodes (3): Comandos e workflows, Mapa do Código — Força, Rotas do app

## Knowledge Gaps
- **4 isolated node(s):** `RFC-8188`, `RFC-8292`, `RFC-8291`, `RFC-8291`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1333 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `prescreverSessao`, `AvaliacaoCoach.tsx`, `MinhaConta.tsx`, `src/index.ts`, `avaliacao.ts`, `FisioCoach.tsx`, `util.ts`, `App.tsx`, `src/ia.ts`, `anamnese.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `acoes.ts`, `ContaAluno.tsx`, `pesoCorporal.ts`, `prints.spec.ts`, `sugestao.test.ts`, `segmentos.ts`, `jwt.ts`, `cartaoStory.ts`, `Entrar`, `lib/planilha.test.ts`, `avisos-pagamento.mjs`, `webpush.ts`, `evolucao.test.ts`, `aluno-exemplo.test.ts`, `firebase-admin`, `iaTreino.ts`, `cartaoDepoimento.ts`, `src/index.ts`, `marca.test.ts`, `vigia.test.ts`, `package.json`, `seriesDoRotulo`, `cartaoRelatorio.ts`, `src/acesso.ts`, `diaSP`, `push.ts`, `anatomia.ts`, `SessaoCard.tsx`, `engine/index.ts`, `EnviarFeedback.tsx`, `Treino.tsx`, `SenhaSegura.tsx`, `montarPdf`, `sessao.ts`, `rules.test.ts`, `resumo.ts`, `GuiaMetodos.tsx`, `lib/acesso.ts`, `alertas.ts`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Are the 147 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `dados()` and `nadaPassaDaTela()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 147 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RFC-8188`, `RFC-8292`, `RFC-8291` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `criarCoach` be split into smaller, more focused modules?**
  _Cohesion score 0.1076923076923077 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `App.tsx` to `AcaoEmail.tsx`, `Avaliacao.tsx`, `Hoje.tsx`, `prescreverSessao`, `MinhaConta.tsx`, `lib/planilha.test.ts`, `BoasVindas.tsx`, `AvaliacaoCoach.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `util.ts`, `avaliacao.ts`, `src/ia.ts`, `anamnese.ts`, `acoes.ts`, `Descanso`, `ContaAluno.tsx`, `pesoCorporal.ts`, `PainelEvolucao.tsx`, `cartaoStory.ts`, `Entrar`, `FimTreino.tsx`, `avisos-pagamento.mjs`, `evolucao.test.ts`, `Alunos.tsx`, `iaTreino.ts`, `src/index.ts`, `MesosDoAluno.tsx`, `seriesDoRotulo`, `src/acesso.ts`, `Mapa do Código — Força`, `diaSP`, `push.ts`, `SessaoCard.tsx`, `engine/index.ts`, `Treino.tsx`, `SenhaSegura.tsx`, `App.tsx`, `montarPdf`, `pdfAvaliacao.ts`, `icones.tsx`, `registrarErro`, `resumo.ts`, `lib/acesso.ts`, `Presencial.tsx`, `alertas.ts`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `AcaoEmail.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0990990990990991 - nodes in this community are weakly interconnected._