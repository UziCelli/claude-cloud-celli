# Graph Report - claude-cloud-celli  (2026-11-04)

## Corpus Check
- 274 files · ~253,868 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2135 nodes · 6105 edges · 136 communities (121 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 262 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c69ae772`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- Tutorial.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- ImportarPlanilha.tsx
- PainelEvolucao.tsx
- icones.tsx
- icones.tsx
- EditarTreino.tsx
- BoasVindas.tsx
- App.tsx
- relatorio.ts
- Treino.tsx
- Alunos.tsx
- TabMetodos.tsx
- criarRegistro
- Botao
- prescreverSessao
- Onde fica cada coisa
- sugestao.ts
- prints.spec.ts
- push.ts
- criarCoach
- jwt.ts
- TabProgressao.tsx
- Estado da sessão (retomada) — atualizado em 13/10/2026
- evolucao.ts
- registrarErro
- Alertas.tsx
- Cartao
- settings.json
- importar.spec.ts
- sugestao.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- Entrar.tsx
- cartaoRelatorio.ts
- Segurança — passos do Victor no console
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- validar.ts
- TabDivisao.tsx
- GuiaMetodos.tsx
- devDependencies
- react
- TabMetodos.tsx
- evolucao.test.ts
- vitest
- src/acesso.ts
- compilerOptions
- Hoje.tsx
- Plano — App da Gislane (segunda marca)
- ref_node_fs
- package.json
- scripts
- inatividade.ts
- Presencial.tsx
- vigia.test.ts
- Coleções Firestore
- AcaoEmail.tsx
- layout.spec.ts
- Motion / Framer Motion Examples
- Pontos sensíveis (leia antes de auditar ou mexer)
- Plano — Entrega 4: registro de erros e segurança
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- src/index.ts
- acoes.ts
- limpeza-lgpd.test.ts
- ref_node_fs
- fetch
- metricas.ts
- Treino
- codigoPix
- importar-meso.mjs
- varredura.spec.ts
- resumo.test.ts
- overrides
- Push do descanso (Entrega 3b)
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- relatorio.spec.ts
- 5. Auditoria 02/10/2026 (segurança + LGPD)
- 6. Monitoramento (alertas)
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
- @playwright/test
- gislane/Logo.tsx
- Mapa do Código — Força
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- Plano — Painel de Evolução (03/10/2026)
- Notificações: mensalidade e treino pronto (13/10/2026)
- seriesDoRotulo
- EditorMeso.tsx
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- ehRecorde
- conversores.test.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 87 edges
2. `Botao()` - 83 edges
3. `Treino()` - 74 edges
4. `vitest` - 59 edges
5. `prescreverSessao()` - 57 edges
6. `react` - 56 edges
7. `Meso` - 47 edges
8. `Cartao()` - 46 edges
9. `firebase` - 39 edges
10. `registrarErro()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx
- `Como funciona` --references--> `useDescanso()`  [INFERRED]
  docs/push.md → src/lib/descanso.ts

## Import Cycles
- None detected.

## Communities (136 total, 15 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.12
Nodes (21): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Armazem (+13 more)

### Community 1 - "Tutorial.tsx"
Cohesion: 0.07
Nodes (57): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+49 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.06
Nodes (35): @firebase/rules-unit-testing, agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db() (+27 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (43): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+35 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "ImportarPlanilha.tsx"
Cohesion: 0.09
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaMesoFalsa() (+32 more)

### Community 7 - "PainelEvolucao.tsx"
Cohesion: 0.09
Nodes (37): mesoAtual(), Aba, ABAS, freq(), MEDALHA, RankingAlunos(), EvolucaoCoach(), fmtData() (+29 more)

### Community 8 - "icones.tsx"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 9 - "icones.tsx"
Cohesion: 0.12
Nodes (28): Hoje(), Msg(), RegistroFlag, Semana(), InicioAluno(), Msg(), Quadros(), RelatorioPronto() (+20 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.13
Nodes (30): adicionarExercicio(), adicionarMetodo(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), padraoMetodo(), removerExercicio() (+22 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "App.tsx"
Cohesion: 0.22
Nodes (23): `src/` — Raiz, ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso(), AlunoApp() (+15 more)

### Community 13 - "relatorio.ts"
Cohesion: 0.12
Nodes (21): Peças, r, Evolucao, historicoExercicios(), MesoEvolucao, treinosFeitos(), arred(), cicloTerminou() (+13 more)

### Community 14 - "Treino.tsx"
Cohesion: 0.17
Nodes (18): motion, AvisoNotificacoes(), permissao(), AvisoAdaptado(), CONFETE, RegistroFlag, IcSino, agil (+10 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.14
Nodes (24): firebase, PIX, reais(), Aluno, Alunos(), Chip(), comparar(), dataPadrao() (+16 more)

### Community 16 - "TabMetodos.tsx"
Cohesion: 0.33
Nodes (11): Onde mexer para…, CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio() (+3 more)

### Community 17 - "criarRegistro"
Cohesion: 0.12
Nodes (14): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), ALUNO (+6 more)

### Community 18 - "Botao"
Cohesion: 0.12
Nodes (46): `src/features/aluno/` — App do aluno, ContaAluno(), escolherFoto(), desde(), Mensalidade(), Peso(), dataCurta(), PagarPix() (+38 more)

### Community 19 - "prescreverSessao"
Cohesion: 0.12
Nodes (20): nomes(), igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+12 more)

### Community 20 - "Onde fica cada coisa"
Cohesion: 0.18
Nodes (18): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+10 more)

### Community 21 - "sugestao.ts"
Cohesion: 0.08
Nodes (33): AvisoReps(), AlertaAbaixo, AlertaAcima, AlertaDemorado, chavesAtuais(), Grupos, agora, alunos (+25 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (14): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+6 more)

### Community 23 - "push.ts"
Cohesion: 0.17
Nodes (22): AvisoDescanso(), Chave(), agendarPush(), avisarTreinoPronto(), avisosCoachLigados(), avisosLigados(), b64uParaBytes(), BASE (+14 more)

### Community 24 - "criarCoach"
Cohesion: 0.10
Nodes (19): ALUNO, COACH, COACH, ALUNO, COACH, semear(), COACH, ALUNO (+11 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "TabProgressao.tsx"
Cohesion: 0.16
Nodes (21): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica(), reduzirVolume() (+13 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.10
Nodes (19): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 09/10/2026 (noite) — Animações e calendário automático (+11 more)

### Community 28 - "evolucao.ts"
Cohesion: 0.15
Nodes (27): `src/lib/` — Firestore, estado, cálculos com dados, arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+19 more)

### Community 29 - "registrarErro"
Cohesion: 0.13
Nodes (23): bloquear(), liberar(), reativar(), ConfirmarAluno(), confirmar(), apagarAluno(), definirAcesso(), Contador (+15 more)

### Community 30 - "Alertas.tsx"
Cohesion: 0.15
Nodes (29): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+21 more)

### Community 31 - "Cartao"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "importar.spec.ts"
Cohesion: 0.17
Nodes (8): ALUNO, COACH, NOMES, ALUNO, COACH, ALUNO, marca, lerDoc()

### Community 34 - "sugestao.ts"
Cohesion: 0.14
Nodes (19): ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano (+11 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.08
Nodes (22): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), [a, m, d], achados, b, db (+14 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.13
Nodes (17): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarCoach() (+9 more)

### Community 38 - "Entrar.tsx"
Cohesion: 0.15
Nodes (24): Entrar(), enviar(), voltar(), erros, mensagemErro(), CaixaAceite(), cadastrar(), confirmarLoginTotp() (+16 more)

### Community 39 - "cartaoRelatorio.ts"
Cohesion: 0.06
Nodes (65): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, CONFETE, dur(), FimTreino() (+57 more)

### Community 40 - "Segurança — passos do Victor no console"
Cohesion: 0.18
Nodes (10): `registros/{regId}`, 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 7. Teste de ataques (03/10/2026), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h) (+2 more)

### Community 41 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.18
Nodes (10): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Peças compartilhadas (já no código), Plano — Redesenho das telas secundárias (VFITCOACH + Gislane) (+2 more)

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "TabDivisao.tsx"
Cohesion: 0.14
Nodes (19): `src/features/coach/` — App do coach, Meso, CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar() (+11 more)

### Community 44 - "GuiaMetodos.tsx"
Cohesion: 0.21
Nodes (11): COR_METODO, METODOS, ORDEM, Metodo, desenhos(), IconeMetodo(), loop(), dispensarNota() (+3 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "react"
Cohesion: 0.28
Nodes (12): react, BotaoPdf(), RelatorioAluno(), RelatorioDoc, RelatorioCoach(), useDadosAluno(), MesoSalvo, app (+4 more)

### Community 47 - "TabMetodos.tsx"
Cohesion: 0.20
Nodes (11): CampoNum(), FiltroSelect(), LinhaMetodo(), METODOS, padrao(), Selecao(), TabMetodos(), adicionar() (+3 more)

### Community 48 - "evolucao.test.ts"
Cohesion: 0.21
Nodes (11): agora, dia(), emSemana(), feito(), linha, m1, meso(), quarta() (+3 more)

### Community 49 - "vitest"
Cohesion: 0.18
Nodes (4): vitest, Slot, meso, base

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "Hoje.tsx"
Cohesion: 0.16
Nodes (20): SemanaCarregada(), Treinos(), dataSP(), IcRelogio, cargaVolta(), comVolta(), dataDe(), Dia (+12 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "ref_node_fs"
Cohesion: 0.11
Nodes (8): ALUNO, COACH, ALUNO, COACH, marca, CAINDO, COACH, @playwright/test

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "inatividade.ts"
Cohesion: 0.21
Nodes (12): Vigia(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, limparTreino() (+4 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.28
Nodes (13): Avatar(), iniciais(), Aluno(), Barra(), Folha(), Grupo(), lerGrupo(), Membro() (+5 more)

### Community 59 - "vigia.test.ts"
Cohesion: 0.15
Nodes (5): SCRIPTS, app, auth, COLECOES, db

### Community 60 - "Coleções Firestore"
Cohesion: 0.22
Nodes (10): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `fotos/{uid}`, `mesos/{mesoId}`, `notas/{alunoId}`, `relatorios/{mesoId}` (+2 more)

### Community 61 - "AcaoEmail.tsx"
Cohesion: 0.14
Nodes (24): Logo(), trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+16 more)

### Community 62 - "layout.spec.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.19
Nodes (14): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), FestaRecorde(), AvisoIOS(), iOS(), standalone(), Editor(), informarPagamento() (+6 more)

### Community 65 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 66 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.25
Nodes (7): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

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

### Community 73 - "src/index.ts"
Cohesion: 0.21
Nodes (8): CacheAcesso, cors(), ORIGENS, Env, Mensagem, MENSALIDADE, TREINO, Aviso

### Community 74 - "acoes.ts"
Cohesion: 0.10
Nodes (33): 09/10/2026 — Segurança, movimento e aba Conta, uqr, sairAgora(), confirmarPix(), DuasEtapas(), tentar(), erros, mensagemErro() (+25 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "ref_node_fs"
Cohesion: 0.18
Nodes (5): ALUNO, COACH, marca, arquivos(), RAIZ

### Community 77 - "fetch"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 78 - "metricas.ts"
Cohesion: 0.16
Nodes (20): `src/engine/` — Motor de cálculo puro (sem React/Firebase), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana() (+12 more)

### Community 79 - "Treino"
Cohesion: 0.14
Nodes (22): `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach), metodoDoRotulo(), ExplicacaoMetodo(), hms(), Modal(), NotaMetodos(), RelogioTreino(), Treino() (+14 more)

### Community 80 - "codigoPix"
Cohesion: 0.17
Nodes (11): arquivos(), chaves(), PROIBIDOS, semPix(), VARS, campo(), codigoPix(), crc16() (+3 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "varredura.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, PNG

### Community 83 - "resumo.test.ts"
Cohesion: 0.29
Nodes (5): fimDaSessao(), agora, aluno(), paga(), TETO_TREINO_MS

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Push do descanso (Entrega 3b)"
Cohesion: 0.29
Nodes (6): Como funciona, Limites do plano grátis (Cloudflare), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 91 - "5. Auditoria 02/10/2026 (segurança + LGPD)"
Cohesion: 0.33
Nodes (6): 5. Auditoria 02/10/2026 (segurança + LGPD), Conferido e OK, Em aberto (decisão do Victor), LGPD (feito nesta auditoria), Passos do Victor (console, uma vez), Repositório público (22/10/2026)

### Community 92 - "6. Monitoramento (alertas)"
Cohesion: 0.33
Nodes (6): 6. Monitoramento (alertas), Alertas automáticos (Vigia de segurança), Cloudflare (notificação de descanso), Dependabot, Procedimento ao receber alerta, Proteção contra cobrança

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
Cohesion: 0.20
Nodes (7): firebase-admin, atual, novo, acao, email, projeto, PROJETOS

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

### Community 108 - "@playwright/test"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 110 - "Mapa do Código — Força"
Cohesion: 0.50
Nodes (3): Comandos e workflows, Mapa do Código — Força, Rotas do app

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

### Community 119 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 120 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

### Community 122 - "EditorMeso.tsx"
Cohesion: 0.17
Nodes (17): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setFrequencia(), setSemanas() (+9 more)

### Community 137 - "conversores.test.ts"
Cohesion: 0.22
Nodes (8): Entregas, arred(), caminhoCarga(), docParaCargas(), docParaReps, normalizarCargas(), meso, temArrayDeArray()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 833 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `descanso.ts`, `ataques.test.ts`, `ImportarPlanilha.tsx`, `ehRecorde`, `icones.tsx`, `EditarTreino.tsx`, `conversores.test.ts`, `relatorio.ts`, `Alunos.tsx`, `TabMetodos.tsx`, `prescreverSessao`, `Onde fica cada coisa`, `sugestao.ts`, `push.ts`, `jwt.ts`, `TabProgressao.tsx`, `registrarErro`, `Cartao`, `sugestao.ts`, `webpush.ts`, `Entrar.tsx`, `cartaoRelatorio.ts`, `validar.ts`, `TabDivisao.tsx`, `GuiaMetodos.tsx`, `evolucao.test.ts`, `src/acesso.ts`, `Hoje.tsx`, `package.json`, `inatividade.ts`, `vigia.test.ts`, `layout.spec.ts`, `src/index.ts`, `acoes.ts`, `limpeza-lgpd.test.ts`, `ref_node_fs`, `metricas.ts`, `codigoPix`, `resumo.test.ts`, `seriesDoRotulo`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Are the 86 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 86 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `descanso.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `ImportarPlanilha.tsx`, `PainelEvolucao.tsx`, `icones.tsx`, `EditarTreino.tsx`, `conversores.test.ts`, `App.tsx`, `Alunos.tsx`, `TabMetodos.tsx`, `Botao`, `prescreverSessao`, `Onde fica cada coisa`, `push.ts`, `evolucao.ts`, `registrarErro`, `Alertas.tsx`, `Entrar.tsx`, `cartaoRelatorio.ts`, `Segurança — passos do Victor no console`, `GuiaMetodos.tsx`, `src/acesso.ts`, `Hoje.tsx`, `inatividade.ts`, `AcaoEmail.tsx`, `acoes.ts`, `Treino`, `resumo.test.ts`, `Mapa do Código — Força`, `seriesDoRotulo`, `EditorMeso.tsx`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Tutorial.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07231638418079096 - nodes in this community are weakly interconnected._