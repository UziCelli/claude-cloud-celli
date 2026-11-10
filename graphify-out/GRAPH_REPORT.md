# Graph Report - claude-cloud-celli  (2026-11-10)

## Corpus Check
- 309 files · ~301,903 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2969 nodes · 8077 edges · 165 communities (149 shown, 16 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 363 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `88e3a032`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- iaTreino.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- ImportarPlanilha.tsx
- InicioAluno.tsx
- Msg
- AlunoApp.tsx
- EditarTreino.tsx
- BoasVindas.tsx
- AvaliacaoCoach.tsx
- evolucao.ts
- util.ts
- Alunos.tsx
- Alertas.tsx
- limparEmuladores
- MinhaConta.tsx
- Segurança — passos do Victor no console
- Treino.tsx
- Relatorio.tsx
- prints.spec.ts
- ContaAluno.tsx
- criarAluno
- jwt.ts
- ContaAluno.tsx
- Estado da sessão (retomada) — atualizado em 13/10/2026
- agenda.ts
- vidro.tsx
- EditorMeso.tsx
- cartaoStory.ts
- settings.json
- importar.spec.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- avisos-pagamento.mjs
- inatividade.ts
- progressao.test.ts
- push.ts
- validar.ts
- TabDivisao.tsx
- montarPdf
- devDependencies
- react
- log.ts
- vigia.test.ts
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- ref_node_fs
- package.json
- scripts
- Logo
- App.tsx
- vigia.test.ts
- firebase-admin
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- inatividade.ts
- EnviarFeedback.tsx
- Aceite.tsx
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- GuiaMetodos.tsx
- Entrar.tsx
- limpeza-lgpd.test.ts
- AvisoIOS
- Alertas.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- vidro.tsx
- codigoPix
- importar-meso.mjs
- relatorio.spec.ts
- vitest
- overrides
- treino.test.ts
- relatorio.test.ts
- limpeza-lgpd.mjs
- Performance Optimization
- PainelEvolucao.tsx
- vigia.test.ts
- aluno-exemplo.test.ts
- TutorialCoach.tsx
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
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- ui.tsx
- CampoExercicio
- treino.test.ts
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- registrarErro
- seriesDoRotulo
- main.tsx
- Tutorial.tsx
- saude.yml
- cors.ts
- VozTreino.tsx
- engine/index.ts
- montarPdf
- criarCoach
- busca.ts
- rules.test.ts
- resumo.ts
- fetch
- RelatorioCoach.tsx
- limpeza
- marca
- cartaoDepoimento.ts
- env
- Plano — Entrega 4: registro de erros e segurança
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- cardio.spec.ts
- with
- aluno-exemplo.test.ts
- preparar
- seriesDoRotulo
- tutorial.spec.ts
- Plano — Painel de Evolução (03/10/2026)
- App.tsx

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 134 edges
2. `Botao()` - 98 edges
3. `Treino()` - 78 edges
4. `react` - 66 edges
5. `vitest` - 66 edges
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

## Communities (165 total, 16 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.09
Nodes (26): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Como funciona (+18 more)

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

### Community 6 - "ImportarPlanilha.tsx"
Cohesion: 0.09
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaMesoFalsa() (+32 more)

### Community 7 - "InicioAluno.tsx"
Cohesion: 0.06
Nodes (73): `src/features/aluno/` — App do aluno, CardioHoje(), AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada() (+65 more)

### Community 8 - "Msg"
Cohesion: 0.13
Nodes (23): Peso(), PagarPix(), PIX, reais(), NovoAluno(), enviar(), ConfirmarExclusao(), excluir() (+15 more)

### Community 9 - "AlunoApp.tsx"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.12
Nodes (8): ALUNO, COACH, ALUNO, COACH, CORS, CAINDO, COACH, criarAluno()

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.12
Nodes (37): `src/features/instalar/` — PWA/Android, BoasVindas(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS, CartaoMeso(), dataBr() (+29 more)

### Community 12 - "AvaliacaoCoach.tsx"
Cohesion: 0.08
Nodes (54): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Avaliacao(), BotaoPdfAvaliacao(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa, fora() (+46 more)

### Community 13 - "evolucao.ts"
Cohesion: 0.22
Nodes (13): EntradaPdfAvaliacao, C, criarFolhas(), disp(), LARG, M, MUDO, PH (+5 more)

### Community 14 - "util.ts"
Cohesion: 0.15
Nodes (31): Registros, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+23 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.11
Nodes (32): LGPD, Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip() (+24 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.13
Nodes (21): slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm() (+13 more)

### Community 17 - "limparEmuladores"
Cohesion: 0.05
Nodes (43): concurrency, needs, runs-on, steps, strategy, group, BACKUP_SENHA, EVENTO (+35 more)

### Community 18 - "MinhaConta.tsx"
Cohesion: 0.05
Nodes (40): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+32 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (21): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+13 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.10
Nodes (39): `notas/{alunoId}`, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), Modal() (+31 more)

### Community 21 - "Relatorio.tsx"
Cohesion: 0.21
Nodes (16): fmt(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao, dadosCartaoRelatorio(), dataBr(), periodoTexto() (+8 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (15): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+7 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 24 - "criarAluno"
Cohesion: 0.12
Nodes (19): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, D_ESTRELA, D_SUBIR (+11 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "ContaAluno.tsx"
Cohesion: 0.14
Nodes (26): `src/features/conta/` — Minha Conta, AvisoNotificacoes(), permissao(), AvisoDescanso(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha() (+18 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.06
Nodes (30): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+22 more)

### Community 28 - "agenda.ts"
Cohesion: 0.19
Nodes (24): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), desenhar(), desenharTreino(), desenharTreinoFoto(), fundoELogo() (+16 more)

### Community 29 - "vidro.tsx"
Cohesion: 0.13
Nodes (21): Peças compartilhadas (já no código), motion, react-dom, Atalho, marcarVisto(), Onboarding(), Passo, Pronto() (+13 more)

### Community 30 - "EditorMeso.tsx"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "cartaoStory.ts"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "importar.spec.ts"
Cohesion: 0.09
Nodes (14): ALUNO, COACH, NOMES, ALUNO, COACH, marca, ALUNO, COACH (+6 more)

### Community 34 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.16
Nodes (20): arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps, docsParaRegistros(), docsParaRegistrosReps() (+12 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.16
Nodes (19): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), criptografar(), Efemera (+11 more)

### Community 37 - "seed.ts"
Cohesion: 0.15
Nodes (14): ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta(), definirPagoAte(), gravarDoc() (+6 more)

### Community 38 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 39 - "inatividade.ts"
Cohesion: 0.19
Nodes (12): agora, dia(), emSemana(), feito(), linha, m1, meso(), painel() (+4 more)

### Community 40 - "progressao.test.ts"
Cohesion: 0.09
Nodes (38): nomes(), igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas() (+30 more)

### Community 41 - "push.ts"
Cohesion: 0.16
Nodes (24): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026), agendarPush(), avisarTreinoPronto(), AVISOS_COACH, avisosLigados(), b64uParaBytes() (+16 more)

### Community 42 - "validar.ts"
Cohesion: 0.14
Nodes (31): podeAvisarTreino(), DO_ALUNO, Env, fetch(), Mensagem, ROBO, TREINO, Projeto (+23 more)

### Community 43 - "TabDivisao.tsx"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "montarPdf"
Cohesion: 0.20
Nodes (9): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam (+1 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (14): name, private, type, version, fundo, @cloudflare/workers-types, @firebase/rules-unit-testing, firebase-tools (+6 more)

### Community 46 - "react"
Cohesion: 0.19
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 47 - "log.ts"
Cohesion: 0.13
Nodes (32): `src/lib/` — Firestore, estado, cálculos com dados, Peças, arred(), calcular(), cargasPositivas(), coletar(), comparacaoToneladas(), Conquista (+24 more)

### Community 48 - "vigia.test.ts"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

### Community 50 - "src/acesso.ts"
Cohesion: 0.16
Nodes (17): acessoComCache(), appCheckOk(), CacheAcesso, Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado() (+9 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "ref_node_fs"
Cohesion: 0.08
Nodes (25): runs-on, steps, description, required, description, required, EMAIL_ATUAL, EMAIL_NOVO (+17 more)

### Community 55 - "package.json"
Cohesion: 0.09
Nodes (25): concurrency, cancel-in-progress, group, runs-on, steps, SA, runs-on, steps (+17 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "Logo"
Cohesion: 0.29
Nodes (8): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, Lista(), Politica(), Secao()

### Community 58 - "App.tsx"
Cohesion: 0.19
Nodes (22): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+14 more)

### Community 59 - "vigia.test.ts"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.14
Nodes (24): deveMostrarBoasVindas(), ler(), Entrar(), enviar(), voltar(), erros, mensagemErro(), SENHA_FRACA (+16 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.19
Nodes (29): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+21 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.25
Nodes (12): sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN (+4 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.12
Nodes (29): Onde mexer para…, Cartao(), chip(), EnviarFeedback(), enviar(), Opcao(), apagarFeedback(), enviarFeedback() (+21 more)

### Community 66 - "Aceite.tsx"
Cohesion: 0.27
Nodes (11): Aceite(), continuar(), esqueci(), erroSenha(), CaixaAceite(), aceitarPrivacidade(), confirmarSenha(), auth (+3 more)

### Community 67 - "compilerOptions"
Cohesion: 0.18
Nodes (10): compilerOptions, lib, module, moduleResolution, noEmit, skipLibCheck, strict, target (+2 more)

### Community 68 - "vite.config.ts"
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

### Community 74 - "Entrar.tsx"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "AvisoIOS"
Cohesion: 0.09
Nodes (24): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, diasAtras() (+16 more)

### Community 77 - "Alertas.tsx"
Cohesion: 0.11
Nodes (31): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+23 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.18
Nodes (10): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato novo do Worker, Critério de pronto, Decisões, Lembrete na hora certa (10/11/2026), Respostas do Victor, Riscos, Vários aparelhos e "Apagar de vez" (10/11/2026) (+2 more)

### Community 79 - "vidro.tsx"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "codigoPix"
Cohesion: 0.22
Nodes (8): Critério de pronto, Cálculo (`src/lib/avaliacao.ts`, puro, com testes), Modelo de dados, Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026), Regras (`firestore.rules`), Riscos, Telas, dobras()

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "relatorio.spec.ts"
Cohesion: 0.33
Nodes (11): AvaliacaoPronta(), Quadros(), RelatorioPronto(), ConviteFeedback(), Faixa(), FaixaFeedback(), IcBalao, IcGrafico (+3 more)

### Community 83 - "vitest"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "treino.test.ts"
Cohesion: 0.25
Nodes (5): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), base

### Community 86 - "relatorio.test.ts"
Cohesion: 0.18
Nodes (8): MesoEvolucao, agora, linha, m0, m1, meso(), registros, slot()

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "PainelEvolucao.tsx"
Cohesion: 0.10
Nodes (48): useArquivados(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), useFeedbacks(), Inicio() (+40 more)

### Community 90 - "vigia.test.ts"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.18
Nodes (10): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, Mapa do Código — Força (+2 more)

### Community 92 - "TutorialCoach.tsx"
Cohesion: 0.12
Nodes (20): `registros/{regId}`, 7. Teste de ataques (03/10/2026), vitest, mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media() (+12 more)

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
Cohesion: 0.19
Nodes (21): DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), trocarEmail(), trocarSenha(), alterarEmail() (+13 more)

### Community 110 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
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

### Community 119 - "ui.tsx"
Cohesion: 0.13
Nodes (23): react, Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas() (+15 more)

### Community 120 - "CampoExercicio"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "treino.test.ts"
Cohesion: 0.23
Nodes (18): `src/features/onboarding/` — Onboarding (aluno e coach, as duas marcas), Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros() (+10 more)

### Community 122 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.29
Nodes (6): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 134 - "registrarErro"
Cohesion: 0.10
Nodes (33): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), campo, EsqueciSenha() (+25 more)

### Community 135 - "seriesDoRotulo"
Cohesion: 0.22
Nodes (7): `avaliacoes/{id automático}`, corte, data(), db, linhas, projeto, PROJETOS

### Community 136 - "main.tsx"
Cohesion: 0.17
Nodes (12): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach), `src/features/privacidade/` — Política e Aceite (+4 more)

### Community 137 - "Tutorial.tsx"
Cohesion: 0.33
Nodes (13): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+5 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "VozTreino.tsx"
Cohesion: 0.10
Nodes (31): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+23 more)

### Community 141 - "engine/index.ts"
Cohesion: 0.12
Nodes (31): Pontos sensíveis (leia antes de auditar ou mexer), adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries() (+23 more)

### Community 142 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 143 - "criarCoach"
Cohesion: 0.07
Nodes (21): COACH, ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, PNG (+13 more)

### Community 144 - "busca.ts"
Cohesion: 0.48
Nodes (4): buscarExercicios(), itens, norm(), nomes()

### Community 145 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 146 - "resumo.ts"
Cohesion: 0.19
Nodes (15): firebase, faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), Usuario, AlunoComId, inicioJanela() (+7 more)

### Community 147 - "fetch"
Cohesion: 0.18
Nodes (6): Descanso, alvosDe(), comAparelho(), Fixa, inicioDoDiaBrasilia(), semAparelho()

### Community 148 - "RelatorioCoach.tsx"
Cohesion: 0.22
Nodes (19): AvaliacaoAluno(), BotaoPdf(), RelatorioAluno(), RelatorioDoc, useRelatoriosLiberados(), Editor(), RelatorioCoach(), useDadosAluno() (+11 more)

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "cartaoDepoimento.ts"
Cohesion: 0.39
Nodes (7): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), pngDe(), primeiroNome()

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
Cohesion: 0.14
Nodes (29): `src/features/auth/` — Autenticação, App(), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+21 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1181 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `TutorialCoach.tsx` to `descanso.ts`, `iaTreino.ts`, `ataques.test.ts`, `registrarErro`, `InicioAluno.tsx`, `ImportarPlanilha.tsx`, `Msg`, `cors.ts`, `AvaliacaoCoach.tsx`, `engine/index.ts`, `util.ts`, `montarPdf`, `Alertas.tsx`, `busca.ts`, `resumo.ts`, `rules.test.ts`, `RelatorioCoach.tsx`, `Relatorio.tsx`, `Treino.tsx`, `cartaoDepoimento.ts`, `criarAluno`, `jwt.ts`, `ContaAluno.tsx`, `prints.spec.ts`, `agenda.ts`, `aluno-exemplo.test.ts`, `seriesDoRotulo`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `webpush.ts`, `avisos-pagamento.mjs`, `inatividade.ts`, `progressao.test.ts`, `push.ts`, `validar.ts`, `devDependencies`, `react`, `src/acesso.ts`, `Entrar.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `EnviarFeedback.tsx`, `Aceite.tsx`, `GuiaMetodos.tsx`, `limpeza-lgpd.test.ts`, `Alertas.tsx`, `treino.test.ts`, `relatorio.test.ts`, `vigia.test.ts`, `MinhaConta.tsx`, `Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Are the 133 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 133 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `descanso.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08817204301075268 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `engine/index.ts` to `iaTreino.ts`, `registrarErro`, `InicioAluno.tsx`, `Msg`, `ImportarPlanilha.tsx`, `BoasVindas.tsx`, `AvaliacaoCoach.tsx`, `evolucao.ts`, `util.ts`, `Alunos.tsx`, `Alertas.tsx`, `montarPdf`, `resumo.ts`, `fetch`, `Treino.tsx`, `Relatorio.tsx`, `RelatorioCoach.tsx`, `ContaAluno.tsx`, `agenda.ts`, `vidro.tsx`, `seriesDoRotulo`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `webpush.ts`, `avisos-pagamento.mjs`, `App.tsx`, `progressao.test.ts`, `push.ts`, `validar.ts`, `react`, `log.ts`, `src/acesso.ts`, `App.tsx`, `TabMetodos.tsx`, `inatividade.ts`, `Aceite.tsx`, `PainelEvolucao.tsx`, `aluno-exemplo.test.ts`, `TutorialCoach.tsx`, `MinhaConta.tsx`, `ui.tsx`, `CampoExercicio`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `iaTreino.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12433862433862433 - nodes in this community are weakly interconnected._