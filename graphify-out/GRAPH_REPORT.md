# Graph Report - claude-cloud-celli  (2026-11-12)

## Corpus Check
- 351 files · ~332,999 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3295 nodes · 9277 edges · 180 communities (166 shown, 14 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 392 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70ff674a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- criarCoach
- SenhaSegura.tsx
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
- progressao.test.ts
- util.ts
- App.tsx
- anamnese.ts
- steps
- env
- Segurança — passos do Victor no console
- react
- AnamneseCoach.tsx
- prints.spec.ts
- segmentos.ts
- FimTreino.tsx
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
- ref_node_fs
- firebase-admin
- acoes.ts
- iaTreino.ts
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- MesosDoAluno.tsx
- evolucao.ts
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
- cartaoDepoimento.ts
- SessaoCard.tsx
- engine/index.ts
- Motion / Framer Motion Examples
- inatividade.ts
- EnviarFeedback.tsx
- descanso.ts
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- Pontos sensíveis (leia antes de auditar ou mexer)
- steps
- Inicio.tsx
- montarPdf
- conversores.ts
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- vitest
- importar-meso.mjs
- pdfAvaliacao.ts
- with
- overrides
- icones.tsx
- atualizar.ts
- AcaoEmail.tsx
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
- lib/acesso.ts
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- relatorio.ts
- gislane/Logo.tsx
- Treino.tsx
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- ir
- Presencial.tsx
- alertas.ts
- criarAluno
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- Avaliacao.tsx
- MinhaConta.tsx
- AvaliacaoCoach.tsx
- PainelEvolucao.tsx
- saude.yml
- src/index.ts
- avaliacao.spec.ts
- cartaoRelatorio.ts
- ref_node_fs
- pesoCorporal.ts
- src/ia.ts
- Árvore por pasta
- CardioHoje.tsx
- Descanso
- ContaAluno.tsx
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
- lib/ia.ts
- evolucao.test.ts
- aluno-exemplo.test.ts
- Meso
- inscreverAvisos
- marca.test.ts
- ui.tsx
- Logo
- pwa-assets.config.ts
- motion
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- firebase-admin
- Push do descanso (Entrega 3b)
- Msg
- notificacoes.spec.ts
- varredura.spec.ts
- Mapa do Código — Força

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 148 edges
2. `Botao()` - 134 edges
3. `Treino()` - 85 edges
4. `react` - 78 edges
5. `vitest` - 74 edges
6. `prescreverSessao()` - 57 edges
7. ``src/lib/` — Firestore, estado, cálculos com dados` - 57 edges
8. `Meso` - 55 edges
9. `registrarErro()` - 52 edges
10. `useLista()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `Decisões` --references--> `avisarCoach()`  [INFERRED]
  docs/plano-notificacoes.md → src/lib/push.ts
- `Testes` --references--> `cargaAnterior()`  [INFERRED]
  docs/peso-corporal.md → src/lib/treino.ts
- ``relatorios/{mesoId}`` --references--> `relatorioCiclo()`  [INFERRED]
  docs/mapa.md → src/lib/relatorio.ts
- `Cálculo (`src/lib/avaliacao.ts`, puro, com testes)` --references--> `relatorioCiclo()`  [INFERRED]
  docs/plano-avaliacao.md → src/lib/relatorio.ts

## Import Cycles
- 2-file cycle: `src/lib/avaliacao.ts -> src/lib/segmentos.ts -> src/lib/avaliacao.ts`

## Communities (180 total, 14 thin omitted)

### Community 0 - "criarCoach"
Cohesion: 0.08
Nodes (26): COACH, ALUNO, COACH, COACH, ALUNO, COACH, ALUNO, COACH (+18 more)

### Community 1 - "SenhaSegura.tsx"
Cohesion: 0.23
Nodes (16): RequisitosSenha(), erroSenha(), SenhaSegura(), conferir(), criarNova(), esqueci(), reautenticar(), recuperarSenha() (+8 more)

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
Cohesion: 0.16
Nodes (23): AvisoReps(), Msg(), RegistroFlag, SemanaCarregada(), IcCadeado, IcRaio, diaSP(), comVolta() (+15 more)

### Community 8 - "TabProgressao.tsx"
Cohesion: 0.10
Nodes (37): `src/features/coach/` — App do coach, linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento() (+29 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.10
Nodes (22): ALUNO, COACH, ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar(), ALUNO (+14 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (29): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+21 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.08
Nodes (34): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), Ciclo (+26 more)

### Community 13 - "progressao.test.ts"
Cohesion: 0.33
Nodes (7): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas()

### Community 14 - "util.ts"
Cohesion: 0.18
Nodes (26): Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes() (+18 more)

### Community 15 - "App.tsx"
Cohesion: 0.14
Nodes (30): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+22 more)

### Community 16 - "anamnese.ts"
Cohesion: 0.12
Nodes (29): `src/lib/` — Firestore, estado, cálculos com dados, AlunoAnam, anamnesesNovas(), anamnesesPendentes(), Base, emOuAgora(), Etapa, FRASE_PARQ (+21 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.08
Nodes (23): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+15 more)

### Community 20 - "react"
Cohesion: 0.26
Nodes (13): firebase, react, AvisoAtraso(), chave(), jaViu(), AvisoIOS(), iOS(), standalone() (+5 more)

### Community 21 - "AnamneseCoach.tsx"
Cohesion: 0.14
Nodes (28): apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach, Rascunho (+20 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (11): ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES, PROIBIDO, registros() (+3 more)

### Community 23 - "segmentos.ts"
Cohesion: 0.11
Nodes (24): DESCE, fmtDelta(), fmtNum(), Leitura, PAR_DOBRA, REGIAO, itens, norm() (+16 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.15
Nodes (16): CONFETE, dur(), FimTreino(), Lista(), fmt(), ConviteFeedback(), IcCamera, IcSubir (+8 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): deb64u(), abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims (+13 more)

### Community 26 - "InicioAluno.tsx"
Cohesion: 0.18
Nodes (28): Peças compartilhadas (já no código), Linha(), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), jaViuPopup(), marcarPopup(), Msg() (+20 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (41): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+33 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.16
Nodes (25): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, clicar(), ajustar(), caixa(), carregarImagem(), compartilharArquivo(), DadosCartao, DadosTreino (+17 more)

### Community 29 - "Entrar"
Cohesion: 0.16
Nodes (21): Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar() (+13 more)

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
Cohesion: 0.25
Nodes (11): diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia(), pedeTreino(), PROJETOS (+3 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.15
Nodes (18): RFC-8188, RFC-8292, b64u(), juntar(), assinar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "Alunos.tsx"
Cohesion: 0.14
Nodes (26): reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+18 more)

### Community 38 - "ref_node_fs"
Cohesion: 0.08
Nodes (12): ALUNO, marca, versao(), ALUNO, COACH, marca, arquivos(), RAIZ (+4 more)

### Community 39 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 40 - "acoes.ts"
Cohesion: 0.13
Nodes (23): BotaoPdf(), RelatorioDoc, Editor(), RelatorioCoach(), enviarAnamnese(), liberarRelatorio(), limparArquivadosAntigos(), recolherRelatorio() (+15 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.06
Nodes (47): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+39 more)

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
Cohesion: 0.11
Nodes (23): devDependencies, @cloudflare/workers-types@^5.20260930.2, @firebase/rules-unit-testing@^5.0.2, firebase-tools@^15.33.0, @playwright/test@^1.63.0, tailwindcss@^4.3.3, @tailwindcss/vite@^4.3.3, @types/react@^19.0.0 (+15 more)

### Community 46 - "MesosDoAluno.tsx"
Cohesion: 0.19
Nodes (23): `src/features/aluno/` — App do aluno, dataSP(), DIAS_CURTO, mesoAtual(), proximoMeso(), hoje, mk(), mesoPadrao() (+15 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.17
Nodes (22): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Feito (+14 more)

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
Cohesion: 0.14
Nodes (19): Mensalidade(), PixPopup(), contaDoDia(), dataCurta(), PagarPix(), copiar(), useHoje(), QrCadastro() (+11 more)

### Community 58 - "push.ts"
Cohesion: 0.17
Nodes (20): agendarPush(), avisarTreinoPronto(), AVISOS_ALUNO, AVISOS_COACH, avisosLigados(), b64uParaBytes(), BASE, cancelarPush() (+12 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "cartaoDepoimento.ts"
Cohesion: 0.27
Nodes (9): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), H, W, D_ESTRELA (+1 more)

### Community 61 - "SessaoCard.tsx"
Cohesion: 0.17
Nodes (21): `notas/{alunoId}`, Nota(), aplicar(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard() (+13 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.14
Nodes (33): `src/engine/` — Motor de cálculo puro (sem React/Firebase), COR_METODO, METODOS, ORDEM, padraoMetodo(), assinatura(), emGrupo(), limpa() (+25 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.19
Nodes (15): `src/features/privacidade/` — Política e Aceite, Aceite(), aceitar(), CaixaAceite(), aceitarPrivacidade(), sair(), Armazem, AVISO_SAIU (+7 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.11
Nodes (38): Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), chip(), EnviarFeedback() (+30 more)

### Community 66 - "descanso.ts"
Cohesion: 0.13
Nodes (19): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Armazem (+11 more)

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "vite.config.ts"
Cohesion: 0.15
Nodes (10): vite@^8.3.4, vite-plugin-pwa@^1.3.0, @vitejs/plugin-react@^6.1.1, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders (+2 more)

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

### Community 73 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.13
Nodes (38): Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, ativaAba(), Coach(), Menu(), PerfilDemora(), pedir(), Principal() (+30 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "Inicio.tsx"
Cohesion: 0.13
Nodes (31): PIX, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+23 more)

### Community 76 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 77 - "conversores.ts"
Cohesion: 0.17
Nodes (19): arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps, docsParaRegistros(), docsParaRegistrosReps() (+11 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.17
Nodes (11): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+3 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "vitest"
Cohesion: 0.14
Nodes (6): vitest, CampoExercicio(), buscarExercicios(), nomes(), meso, base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "pdfAvaliacao.ts"
Cohesion: 0.18
Nodes (19): carregar(), COR_TOM, corpo(), EntradaPdfAvaliacao, gerarPdfAvaliacao(), seta(), C, criarFolhas() (+11 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "icones.tsx"
Cohesion: 0.12
Nodes (38): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+30 more)

### Community 86 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 87 - "AcaoEmail.tsx"
Cohesion: 0.18
Nodes (16): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, campo (+8 more)

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "limpeza-lgpd.mjs"
Cohesion: 0.20
Nodes (8): assinarJwt(), base64url(), auth, corte, db, esquecerNoWorker(), projeto, PROJETOS

### Community 90 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 91 - "registrarErro"
Cohesion: 0.19
Nodes (17): salvar(), Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog() (+9 more)

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
Nodes (6): dependencies, firebase@^12.19.0, motion@^13.4.6, react@^19.3.0, uqr@^0.1.3, uqr

### Community 100 - "lib/acesso.ts"
Cohesion: 0.15
Nodes (19): CARENCIA_DIAS, diasParaVencer(), emAtraso(), faltaSegundoFator(), fimDoDiaSaoPaulo(), Foto, liberado(), proximoVencimento() (+11 more)

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

### Community 108 - "relatorio.ts"
Cohesion: 0.13
Nodes (20): precisaAtualizar(), avaliacoesParaFazer(), Evolucao, MesoEvolucao, RegistroEvolucao, arred(), cicloTerminou(), diasDesdeFim() (+12 more)

### Community 110 - "Treino.tsx"
Cohesion: 0.09
Nodes (41): ANTIGA(), metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), NotaMetodos() (+33 more)

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

### Community 119 - "ir"
Cohesion: 0.21
Nodes (18): LGPD, Peso(), NovoAluno(), enviar(), DarAcesso(), enviar(), FormDuplicar(), confirmar() (+10 more)

### Community 120 - "Presencial.tsx"
Cohesion: 0.23
Nodes (18): `src/` — Raiz, Aluno(), Barra(), Grupo(), guardarRecente(), lerGrupo(), lerRecentes(), Membro() (+10 more)

### Community 121 - "alertas.ts"
Cohesion: 0.07
Nodes (34): AlertaAbaixo, AlertaAcima, AlertaDemorado, chavesAtuais(), Grupos, agora, alunos, linha (+26 more)

### Community 122 - "criarAluno"
Cohesion: 0.15
Nodes (13): doAluno(), PARQ_NAO, confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ (+5 more)

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.11
Nodes (23): ARTE, clarear(), COR_CORPO, corParte(), ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista() (+15 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.21
Nodes (17): DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail(), trocarSenha() (+9 more)

### Community 136 - "AvaliacaoCoach.tsx"
Cohesion: 0.10
Nodes (41): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Peças, BotaoPdfAvaliacao(), AvaliacaoAluno(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa (+33 more)

### Community 137 - "PainelEvolucao.tsx"
Cohesion: 0.12
Nodes (34): Hoje(), Semana(), AvaliacoesCoach(), Aba, ABAS, freq(), MEDALHA, RankingAlunos() (+26 more)

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
Cohesion: 0.22
Nodes (17): pngDe(), dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num(), periodoTexto(), r (+9 more)

### Community 142 - "ref_node_fs"
Cohesion: 0.10
Nodes (11): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+3 more)

### Community 143 - "pesoCorporal.ts"
Cohesion: 0.18
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.19
Nodes (14): appCheckOk(), ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, MAX_CORPO_IA, metadados() (+6 more)

### Community 145 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+7 more)

### Community 146 - "CardioHoje.tsx"
Cohesion: 0.30
Nodes (12): Onde mexer para…, CardioHoje(), IcCardio, desfazerCardio(), novaVersaoCoach(), registrarCardio(), CardioDoc, diaNumero() (+4 more)

### Community 147 - "Descanso"
Cohesion: 0.15
Nodes (6): Descanso, alvosDe(), comAparelho(), inicioDoDiaBrasilia(), nomeDO(), semAparelho()

### Community 148 - "ContaAluno.tsx"
Cohesion: 0.20
Nodes (14): Avatar(), iniciais(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde(), escolher() (+6 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "prescreverSessao"
Cohesion: 0.11
Nodes (26): nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), ANTAGONISTAS, aplicarSugestao() (+18 more)

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
Nodes (8): ALUNO, COACH, PNG, CAINDO, COACH, ALUNO, COACH, @playwright/test

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.11
Nodes (17): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), ALUNO (+9 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 163 - "lib/ia.ts"
Cohesion: 0.29
Nodes (13): AssistenteIA(), remover(), salvar(), appCheck, apagarChaveIA(), BASE, chamar(), chaveValida() (+5 more)

### Community 164 - "evolucao.test.ts"
Cohesion: 0.19
Nodes (13): agora, dia(), emSemana(), feito(), linha, m1, meso(), painel() (+5 more)

### Community 165 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 166 - "Meso"
Cohesion: 0.09
Nodes (31): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio() (+23 more)

### Community 167 - "inscreverAvisos"
Cohesion: 0.33
Nodes (11): AvisoNotificacoes(), permissao(), AvisoDescanso(), Chave(), ChavesAvisos(), NotificacoesCoach(), IcSino, avisosDesligados() (+3 more)

### Community 168 - "marca.test.ts"
Cohesion: 0.29
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 169 - "ui.tsx"
Cohesion: 0.18
Nodes (9): camada, Camada(), confirmarNumero(), desliza, estilos, pedeQuieto(), reduzida, sobe (+1 more)

### Community 170 - "Logo"
Cohesion: 0.29
Nodes (8): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, Lista(), Politica(), Secao()

### Community 171 - "pwa-assets.config.ts"
Cohesion: 0.50
Nodes (3): @vite-pwa/assets-generator@^1.0.4, fundo, @vite-pwa/assets-generator

### Community 172 - "motion"
Cohesion: 0.27
Nodes (7): react-dom@^19.3.0, motion, react-dom, App(), carregar(), Features, montar()

### Community 173 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.22
Nodes (8): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 174 - "firebase-admin"
Cohesion: 0.22
Nodes (5): firebase-admin@14.5.0, firebase-admin, SCRIPTS, atual, novo

### Community 175 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 176 - "Msg"
Cohesion: 0.53
Nodes (5): EnviarAviso(), enviar(), enviarRecado(), Msg(), useMontou()

### Community 177 - "notificacoes.spec.ts"
Cohesion: 0.40
Nodes (3): ALUNO, COACH, CORS

### Community 179 - "Mapa do Código — Força"
Cohesion: 0.50
Nodes (3): Comandos e workflows, Mapa do Código — Força, Rotas do app

## Knowledge Gaps
- **4 isolated node(s):** `RFC-8188`, `RFC-8292`, `RFC-8291`, `RFC-8291`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1275 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `SenhaSegura.tsx`, `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `TabProgressao.tsx`, `AvaliacaoCoach.tsx`, `MinhaConta.tsx`, `src/index.ts`, `lib/planilha.test.ts`, `progressao.test.ts`, `util.ts`, `App.tsx`, `src/ia.ts`, `cartaoRelatorio.ts`, `anamnese.ts`, `CardioHoje.tsx`, `ContaAluno.tsx`, `pesoCorporal.ts`, `prescreverSessao`, `segmentos.ts`, `jwt.ts`, `cartaoStory.ts`, `Entrar`, `avisos-pagamento.mjs`, `webpush.ts`, `evolucao.test.ts`, `Meso`, `ref_node_fs`, `acoes.ts`, `iaTreino.ts`, `src/index.ts`, `marca.test.ts`, `ui.tsx`, `package.json`, `MesosDoAluno.tsx`, `firebase-admin`, `firebase-admin`, `src/acesso.ts`, `diaSP`, `push.ts`, `cartaoDepoimento.ts`, `SessaoCard.tsx`, `engine/index.ts`, `aluno-exemplo.test.ts`, `inatividade.ts`, `EnviarFeedback.tsx`, `descanso.ts`, `montarPdf`, `conversores.ts`, `atualizar.ts`, `rules.test.ts`, `registrarErro`, `lib/acesso.ts`, `relatorio.ts`, `Treino.tsx`, `alertas.ts`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 146 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `versao()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 146 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RFC-8188`, `RFC-8292`, `RFC-8291` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `criarCoach` be split into smaller, more focused modules?**
  _Cohesion score 0.08461538461538462 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `SenhaSegura.tsx`, `lib/planilha.test.ts`, `Hoje.tsx`, `TabProgressao.tsx`, `PainelEvolucao.tsx`, `seed.ts`, `MinhaConta.tsx`, `AvaliacaoCoach.tsx`, `BoasVindas.tsx`, `util.ts`, `App.tsx`, `src/ia.ts`, `anamnese.ts`, `CardioHoje.tsx`, `Descanso`, `pesoCorporal.ts`, `AnamneseCoach.tsx`, `prescreverSessao`, `FimTreino.tsx`, `cartaoStory.ts`, `Entrar`, `avisos-pagamento.mjs`, `Alunos.tsx`, `ref_node_fs`, `inscreverAvisos`, `acoes.ts`, `iaTreino.ts`, `src/index.ts`, `ui.tsx`, `MesosDoAluno.tsx`, `evolucao.ts`, `Msg`, `src/acesso.ts`, `Mapa do Código — Força`, `diaSP`, `push.ts`, `SessaoCard.tsx`, `engine/index.ts`, `inatividade.ts`, `Inicio.tsx`, `montarPdf`, `conversores.ts`, `pdfAvaliacao.ts`, `icones.tsx`, `limpeza-lgpd.mjs`, `registrarErro`, `lib/acesso.ts`, `Treino.tsx`, `ir`, `Presencial.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._