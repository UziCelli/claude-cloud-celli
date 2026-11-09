# Graph Report - claude-cloud-celli  (2026-11-09)

## Corpus Check
- 296 files · ~274,362 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2294 nodes · 6817 edges · 135 communities (119 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 313 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9d7e4a5e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- EnviarFeedback.tsx
- relatorio.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- vitest
- Hoje.tsx
- push.ts
- Tutorial.tsx
- EditarTreino.tsx
- BoasVindas.tsx
- InicioAluno.tsx
- cartaoStory.ts
- engine/index.ts
- evolucao.test.ts
- Alertas.tsx
- Alunos.tsx
- MinhaConta.tsx
- Segurança — passos do Victor no console
- acoes.ts
- Treino.tsx
- prints.spec.ts
- fetch
- FimTreino.tsx
- jwt.ts
- IconeMetodo
- Estado da sessão (retomada) — atualizado em 08/11/2026
- icones.tsx
- TabDivisao.tsx
- Editor
- main.tsx
- settings.json
- criarAluno
- PainelEvolucao.tsx
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- criarMeso
- inatividade.ts
- progressao.test.ts
- metricas.ts
- validar.ts
- Árvore por pasta
- TutorialCoach.tsx
- devDependencies
- Onde fica cada coisa
- evolucao.ts
- firebase-admin
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- Onboarding.tsx
- package.json
- scripts
- App.tsx
- feedback.spec.ts
- registrarErro
- sair.spec.ts
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- Cartao
- Plano — Entrega 4: registro de erros e segurança
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- Cartao
- Entrar
- limpeza-lgpd.test.ts
- criarCoach
- Plano — Painel de Evolução (03/10/2026)
- AvisoIOS
- monitoramento.spec.ts
- importar-meso.mjs
- fotoTreino.spec.ts
- atualizar.ts
- overrides
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- ref_node_fs
- aluno-exemplo.test.ts
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
- Pontos sensíveis (leia antes de auditar ou mexer)
- gislane/Logo.tsx
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- Botao
- layout.spec.ts
- prescreverSessao
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- varredura.spec.ts
- seriesDoRotulo
- Meso
- Coleções Firestore
- src/index.ts
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- relatorio.spec.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 107 edges
2. `Botao()` - 91 edges
3. `Treino()` - 77 edges
4. `vitest` - 65 edges
5. `react` - 61 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 50 edges
8. `Cartao()` - 48 edges
9. `registrarErro()` - 46 edges
10. `firebase` - 41 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `09/10/2026 — Segurança, movimento e aba Conta` --references--> `MinhaConta()`  [INFERRED]
  docs/estado-sessao.md → src/features/conta/MinhaConta.tsx

## Import Cycles
- None detected.

## Communities (135 total, 16 thin omitted)

### Community 0 - "EnviarFeedback.tsx"
Cohesion: 0.14
Nodes (26): chip(), EnviarFeedback(), enviar(), Opcao(), IcEstrela(), enviarFeedback(), assinaturaMarca(), Assunto (+18 more)

### Community 1 - "relatorio.ts"
Cohesion: 0.12
Nodes (20): Peças, r, historicoExercicios(), MesoEvolucao, treinosFeitos(), arred(), cicloTerminou(), diasDesdeFim() (+12 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.06
Nodes (35): @firebase/rules-unit-testing, agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db() (+27 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.04
Nodes (42): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+34 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "vitest"
Cohesion: 0.05
Nodes (54): vitest, ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso() (+46 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.13
Nodes (31): `src/lib/` — Firestore, estado, cálculos com dados, AvisoReps(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), dataSP() (+23 more)

### Community 8 - "push.ts"
Cohesion: 0.06
Nodes (55): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Contrato do Worker (+47 more)

### Community 9 - "Tutorial.tsx"
Cohesion: 0.22
Nodes (18): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+10 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.11
Nodes (32): `src/features/coach/` — App do coach, COR_METODO, ORDEM, adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao() (+24 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.17
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "InicioAluno.tsx"
Cohesion: 0.14
Nodes (37): Peças compartilhadas (já no código), firebase, react, CardioHoje(), InicioAluno(), Msg(), PixPerto(), Quadros() (+29 more)

### Community 13 - "cartaoStory.ts"
Cohesion: 0.08
Nodes (55): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, DadosDepoimento, desenhar(), gerarCartaoDepoimento() (+47 more)

### Community 14 - "engine/index.ts"
Cohesion: 0.29
Nodes (13): ESCOPOS, linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+5 more)

### Community 15 - "evolucao.test.ts"
Cohesion: 0.17
Nodes (14): painelEvolucao(), recordeAnterior(), agora, dia(), emSemana(), feito(), linha, m1 (+6 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.16
Nodes (32): Menu(), abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+24 more)

### Community 17 - "Alunos.tsx"
Cohesion: 0.09
Nodes (40): `src/features/aluno/` — App do aluno, Avatar(), iniciais(), reais(), Aluno, Alunos(), confirmarPix(), Chip() (+32 more)

### Community 18 - "MinhaConta.tsx"
Cohesion: 0.15
Nodes (23): uqr, trocarSenha(), DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora() (+15 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.10
Nodes (20): 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas) (+12 more)

### Community 20 - "acoes.ts"
Cohesion: 0.20
Nodes (18): Treino(), FaixaAjustado(), cancelarTreino(), criarConta(), marcarInicio(), marcarRealizado(), reabrirTreino(), registrarCarga() (+10 more)

### Community 21 - "Treino.tsx"
Cohesion: 0.10
Nodes (31): motion, METODOS, AvisoAdaptado(), CONFETE, RegistroFlag, Aba, ABAS, DIAS_SEMANA (+23 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (14): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+6 more)

### Community 23 - "fetch"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 24 - "FimTreino.tsx"
Cohesion: 0.19
Nodes (14): CONFETE, dur(), FimTreino(), escolher(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo() (+6 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "IconeMetodo"
Cohesion: 0.21
Nodes (10): ExplicacaoMetodo(), Modal(), NotaMetodos(), desenhos(), IconeMetodo(), loop(), dispensarNota(), mostrarNotasDeNovo() (+2 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 08/11/2026"
Cohesion: 0.07
Nodes (27): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+19 more)

### Community 28 - "icones.tsx"
Cohesion: 0.17
Nodes (9): D_ESTRELA, D_SUBIR, IcCasa, IcFogo, IcGrupo, IcNuvem, IcReiniciar, IcSinoMudo (+1 more)

### Community 29 - "TabDivisao.tsx"
Cohesion: 0.06
Nodes (63): Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes() (+55 more)

### Community 30 - "Editor"
Cohesion: 0.31
Nodes (7): Editor(), liberarRelatorio(), recolherRelatorio(), relatorio(), salvarRelatorio(), linkEmail(), linkWhatsApp()

### Community 31 - "main.tsx"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "criarAluno"
Cohesion: 0.08
Nodes (18): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+10 more)

### Community 34 - "PainelEvolucao.tsx"
Cohesion: 0.12
Nodes (28): mesoAtual(), Aba, ABAS, freq(), MEDALHA, VisaoSemana(), dataCurta(), EvolucaoCoach() (+20 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "criarMeso"
Cohesion: 0.19
Nodes (8): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), criarMeso()

### Community 39 - "inatividade.ts"
Cohesion: 0.21
Nodes (13): Vigia(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, limparTreino() (+5 more)

### Community 40 - "progressao.test.ts"
Cohesion: 0.33
Nodes (7): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas()

### Community 41 - "metricas.ts"
Cohesion: 0.16
Nodes (19): `registros/{regId}`, 7. Teste de ataques (03/10/2026), mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+11 more)

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "Árvore por pasta"
Cohesion: 0.12
Nodes (17): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+9 more)

### Community 44 - "TutorialCoach.tsx"
Cohesion: 0.27
Nodes (17): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+9 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.19
Nodes (17): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.15
Nodes (25): diaSP(), arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+17 more)

### Community 48 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.08
Nodes (36): AlertaAbaixo, AlertaAcima, AlertaDemorado, chavesAtuais(), Grupos, agora, alunos, linha (+28 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "Onboarding.tsx"
Cohesion: 0.43
Nodes (7): Atalho, marcarVisto(), Onboarding(), Passo, Pronto(), Icone, IcSeta

### Community 55 - "package.json"
Cohesion: 0.14
Nodes (12): name, private, type, version, fundo, @cloudflare/workers-types, firebase-tools, tailwindcss (+4 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "App.tsx"
Cohesion: 0.12
Nodes (40): `src/` — Raiz, ativaAba(), Coach(), PerfilDemora(), Principal(), SemAcesso(), AlunoApp(), Hoje() (+32 more)

### Community 58 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 59 - "registrarErro"
Cohesion: 0.14
Nodes (23): bloquear(), liberar(), reativar(), ConfirmarAluno(), confirmar(), apagarAluno(), definirAcesso(), Contador (+15 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.14
Nodes (26): Logo(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), erros (+18 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.16
Nodes (30): 1. Configuração do mesociclo, `mesos/{mesoId}`, `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo (+22 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "Cartao"
Cohesion: 0.12
Nodes (27): Convenção de gravação (TOTAL), AlvoVolume, Sessao, Preview(), AjustarVolume(), aplicar(), fmt(), Modo (+19 more)

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

### Community 73 - "Cartao"
Cohesion: 0.17
Nodes (14): Onde mexer para…, Cartao(), Estrelas(), apagarFeedback(), desfazerCardio(), marcarFeedbackLido(), registrarCardio(), diaNumero() (+6 more)

### Community 74 - "Entrar"
Cohesion: 0.20
Nodes (16): Entrar(), enviar(), voltar(), mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar(), resolverMfa() (+8 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarCoach"
Cohesion: 0.09
Nodes (22): COACH, ALUNO, COACH, COACH, ALUNO, COACH, semearFormatoAntigo(), ALUNO (+14 more)

### Community 77 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 78 - "AvisoIOS"
Cohesion: 0.83
Nodes (3): AvisoIOS(), iOS(), standalone()

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "fotoTreino.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, PNG

### Community 83 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "ref_node_fs"
Cohesion: 0.11
Nodes (9): ALUNO, COACH, marca, arquivos(), RAIZ, app, auth, COLECOES (+1 more)

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

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

### Community 108 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.13
Nodes (14): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), FestaRecorde(), hms(), RelogioTreino(), excluir(), excluirMeso(), informarPagamento() (+6 more)

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

### Community 119 - "Botao"
Cohesion: 0.11
Nodes (46): ContaAluno(), escolherFoto(), sairAgora(), desde(), Linha(), Mensalidade(), Peso(), dataCurta() (+38 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 122 - "prescreverSessao"
Cohesion: 0.09
Nodes (30): nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO, base (+22 more)

### Community 137 - "Meso"
Cohesion: 0.24
Nodes (3): Meso, meso, base

### Community 138 - "Coleções Firestore"
Cohesion: 0.15
Nodes (13): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}`, `fotos/{uid}`, Mapa do Código — Força (+5 more)

### Community 140 - "src/index.ts"
Cohesion: 0.21
Nodes (8): CacheAcesso, cors(), ORIGENS, Env, Mensagem, MENSALIDADE, TREINO, Aviso

### Community 141 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.20
Nodes (9): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam (+1 more)

### Community 143 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 856 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `EnviarFeedback.tsx`, `relatorio.ts`, `ataques.test.ts`, `Hoje.tsx`, `push.ts`, `seriesDoRotulo`, `EditarTreino.tsx`, `Meso`, `src/index.ts`, `cartaoStory.ts`, `engine/index.ts`, `evolucao.test.ts`, `Alunos.tsx`, `MinhaConta.tsx`, `FimTreino.tsx`, `jwt.ts`, `IconeMetodo`, `TabDivisao.tsx`, `Editor`, `webpush.ts`, `inatividade.ts`, `progressao.test.ts`, `metricas.ts`, `validar.ts`, `Onde fica cada coisa`, `firebase-admin`, `src/acesso.ts`, `alertas.ts`, `package.json`, `registrarErro`, `Entrar.tsx`, `TabMetodos.tsx`, `Cartao`, `Cartao`, `Entrar`, `limpeza-lgpd.test.ts`, `atualizar.ts`, `ref_node_fs`, `aluno-exemplo.test.ts`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `prescreverSessao`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Are the 106 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 106 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `EnviarFeedback.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `vitest`, `Hoje.tsx`, `push.ts`, `seriesDoRotulo`, `Coleções Firestore`, `EditarTreino.tsx`, `InicioAluno.tsx`, `cartaoStory.ts`, `Alertas.tsx`, `Alunos.tsx`, `MinhaConta.tsx`, `acoes.ts`, `Treino.tsx`, `FimTreino.tsx`, `IconeMetodo`, `TabDivisao.tsx`, `Editor`, `PainelEvolucao.tsx`, `inatividade.ts`, `metricas.ts`, `Onde fica cada coisa`, `evolucao.ts`, `src/acesso.ts`, `alertas.ts`, `App.tsx`, `registrarErro`, `Entrar.tsx`, `Cartao`, `Cartao`, `AvisoIOS`, `Botao`, `prescreverSessao`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `relatorio.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12307692307692308 - nodes in this community are weakly interconnected._