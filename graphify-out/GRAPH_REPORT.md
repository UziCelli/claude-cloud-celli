# Graph Report - claude-cloud-celli  (2026-11-11)

## Corpus Check
- 329 files · ~340,967 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3196 nodes · 9024 edges · 165 communities (151 shown, 14 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 420 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7af8137d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- icones.tsx
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
- cartaoStory.ts
- Entrar.tsx
- steps
- steps
- settings.json
- Inicio.tsx
- avisos-pagamento.mjs
- aluno-exemplo.mjs
- webpush.ts
- pix.ts
- firebase-admin
- firebase-admin
- @playwright/test
- iaTreino.ts
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- package.json
- ui.tsx
- evolucao.ts
- with
- App.tsx
- src/acesso.ts
- compilerOptions
- MinhaConta.tsx
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- Presencial.tsx
- pdfRelatorio.ts
- steps
- CardioHoje.tsx
- Árvore por pasta
- engine/index.ts
- Motion / Framer Motion Examples
- inatividade.ts
- EnviarFeedback.tsx
- push.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- prescreverSessao
- steps
- Entrar.tsx
- criarCoach
- PainelEvolucao.tsx
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- push.yml
- Botao
- importar-meso.mjs
- relatorio.ts
- with
- overrides
- Tutorial.tsx
- aluno-exemplo.test.ts
- GuiaMetodos.tsx
- Performance Optimization
- limpeza-lgpd.mjs
- rules.test.ts
- Feedbacks.tsx
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- PainelEvolucao.tsx
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- Pontos sensíveis (leia antes de auditar ou mexer)
- gislane/Logo.tsx
- ref_node_fs
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
- firebase
- resumo.ts
- cartaoRelatorio.ts
- saude.yml
- cors.ts
- evolucao.test.ts
- metricas.ts
- avaliacao.spec.ts
- cartaoDepoimento.ts
- QrCadastro.tsx
- SenhaSegura.tsx
- marca.test.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- vfit/Logo.tsx
- limpeza
- marca
- prescreverSessao
- env
- Coleções Firestore
- steps
- feedback.spec.ts
- limpeza-lgpd.yml
- notificacoes.spec.ts
- with
- sair.spec.ts
- preparar
- criarMeso
- firebase-admin
- atualizar.ts
- registrarErro

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 152 edges
2. `Botao()` - 130 edges
3. `Treino()` - 81 edges
4. `react` - 74 edges
5. `vitest` - 70 edges
6. `prescreverSessao()` - 57 edges
7. ``src/lib/` — Firestore, estado, cálculos com dados` - 55 edges
8. `Meso` - 54 edges
9. `registrarErro()` - 51 edges
10. `useLista()` - 50 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
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

## Communities (165 total, 14 thin omitted)

### Community 0 - "icones.tsx"
Cohesion: 0.20
Nodes (23): Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), InicioAluno(), Msg(), PixPerto(), Quadros(), RelatorioPronto() (+15 more)

### Community 1 - "AcaoEmail.tsx"
Cohesion: 0.31
Nodes (10): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA, aplicarCodigo() (+2 more)

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

### Community 6 - "lib/planilha.test.ts"
Cohesion: 0.09
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), abaAntigaFalsa(), Cel (+32 more)

### Community 7 - "Hoje.tsx"
Cohesion: 0.13
Nodes (30): AvisoReps(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), Treinos(), diaCurto(), DIAS_CURTO (+22 more)

### Community 8 - "TabProgressao.tsx"
Cohesion: 0.17
Nodes (24): linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+16 more)

### Community 9 - "env"
Cohesion: 0.05
Nodes (43): needs, runs-on, steps, strategy, EVENTO, MARCA, MODO, PROJETO (+35 more)

### Community 10 - "seed.ts"
Cohesion: 0.12
Nodes (19): ALUNO, COACH, ALUNO, COACH, marca, ANAMNESE_MINIMA, criarAluno(), criarAlunoAguardando() (+11 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.17
Nodes (26): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS, copiarLink() (+18 more)

### Community 12 - "avaliacao.ts"
Cohesion: 0.10
Nodes (31): BIO, Ciclo, corteAvaliacoes(), Destaque, DobraId, DOBRAS, fmtDelta(), fmtNum() (+23 more)

### Community 13 - "vitest"
Cohesion: 0.11
Nodes (12): 1. Configuração do mesociclo, `mesos/{mesoId}`, vitest, mediana(), metaCiclo(), metaRobusta(), divisao, meso (+4 more)

### Community 14 - "util.ts"
Cohesion: 0.16
Nodes (27): Slot, CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+19 more)

### Community 15 - "App.tsx"
Cohesion: 0.15
Nodes (28): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio() (+20 more)

### Community 16 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.08
Nodes (62): `src/lib/` — Firestore, estado, cálculos com dados, copiar(), AnamneseAluno(), apagar(), Caixa(), Campo(), Conteudo(), enviar() (+54 more)

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
Nodes (37): `notas/{alunoId}`, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), Modal() (+29 more)

### Community 21 - "prescreverSessao"
Cohesion: 0.13
Nodes (20): slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm() (+12 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.07
Nodes (15): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+7 more)

### Community 23 - "segmentos.ts"
Cohesion: 0.09
Nodes (28): estavel(), DESCE, Leitura, PAR_DOBRA, REGIAO, buscarExercicios(), itens, norm() (+20 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.17
Nodes (16): CONFETE, dur(), FimTreino(), escolher(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo() (+8 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "Alunos.tsx"
Cohesion: 0.09
Nodes (49): `src/features/aluno/` — App do aluno, AvisoAtraso(), chave(), jaViu(), Hoje(), dataSP(), mesoAtual(), contaDoDia() (+41 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.05
Nodes (36): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+28 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.23
Nodes (20): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), DadosCartao, desenhar(), desenharTreino(), desenharTreinoFoto() (+12 more)

### Community 29 - "Entrar.tsx"
Cohesion: 0.18
Nodes (20): deveMostrarBoasVindas(), ler(), Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar() (+12 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (36): env, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, APK_SENHA (+28 more)

### Community 31 - "steps"
Cohesion: 0.06
Nodes (35): description, options, required, type, description, required, ACAO, EMAIL (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "Inicio.tsx"
Cohesion: 0.14
Nodes (30): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+22 more)

### Community 34 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.16
Nodes (19): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), criptografar(), Efemera (+11 more)

### Community 37 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 38 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 39 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 40 - "@playwright/test"
Cohesion: 0.11
Nodes (10): ALUNO, COACH, NOMES, ALUNO, COACH, lerDoc(), COACH, Falso (+2 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.05
Nodes (62): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades, ROTULO (+54 more)

### Community 42 - "src/index.ts"
Cohesion: 0.14
Nodes (31): podeAvisarTreino(), DO_ALUNO, Env, fetch(), Mensagem, ROBO, TREINO, Projeto (+23 more)

### Community 43 - "steps"
Cohesion: 0.07
Nodes (29): description, required, ALUNO, MESO, NOME, SA, runs-on, steps (+21 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "package.json"
Cohesion: 0.10
Nodes (18): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @tailwindcss/vite (+10 more)

### Community 46 - "ui.tsx"
Cohesion: 0.14
Nodes (17): motion, react, react-dom, carregar(), Features, montar(), agil, ESPERA_ENTRADA_MS (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.16
Nodes (24): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao (+16 more)

### Community 48 - "with"
Cohesion: 0.09
Nodes (27): runs-on, steps, runs-on, steps, jobs, app, e2e, rules (+19 more)

### Community 49 - "App.tsx"
Cohesion: 0.11
Nodes (40): `src/features/privacidade/` — Política e Aceite, App(), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+32 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.16
Nodes (17): acessoComCache(), appCheckOk(), CacheAcesso, Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado() (+9 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "MinhaConta.tsx"
Cohesion: 0.19
Nodes (19): 09/10/2026 — Segurança, movimento e aba Conta, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail() (+11 more)

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

### Community 57 - "Presencial.tsx"
Cohesion: 0.21
Nodes (19): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), Grupo(), guardarRecente(), lerGrupo() (+11 more)

### Community 58 - "pdfRelatorio.ts"
Cohesion: 0.15
Nodes (13): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, disp(), LARG, M, MUDO, PH, PW (+5 more)

### Community 59 - "steps"
Cohesion: 0.08
Nodes (25): MARCA, PROJETO, SA, runs-on, steps, marca, jobs, erros (+17 more)

### Community 60 - "CardioHoje.tsx"
Cohesion: 0.36
Nodes (10): CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio() (+2 more)

### Community 61 - "Árvore por pasta"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+6 more)

### Community 62 - "engine/index.ts"
Cohesion: 0.21
Nodes (25): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva, linhasDoExercicio() (+17 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "inatividade.ts"
Cohesion: 0.28
Nodes (12): sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN (+4 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.16
Nodes (24): chip(), EnviarFeedback(), enviar(), Opcao(), enviarFeedback(), assinaturaMarca(), Assunto, ASSUNTOS (+16 more)

### Community 66 - "push.ts"
Cohesion: 0.05
Nodes (56): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Contrato do Worker (+48 more)

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

### Community 73 - "prescreverSessao"
Cohesion: 0.15
Nodes (23): nomes(), prescreverSessao(), Cargas, Registros, Preview(), aplicar(), EvolucaoCoach(), fmt() (+15 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (23): MODO, SA, runs-on, steps, modo, jobs, exemplo, default (+15 more)

### Community 75 - "Entrar.tsx"
Cohesion: 0.29
Nodes (9): trocarSenha(), campo, EsqueciSenha(), enviar(), mensagemRecuperar(), rotulo, esqueci(), recuperarSenha() (+1 more)

### Community 76 - "criarCoach"
Cohesion: 0.08
Nodes (24): COACH, ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH (+16 more)

### Community 77 - "PainelEvolucao.tsx"
Cohesion: 0.19
Nodes (16): arred(), caminhoCarga(), CargasDoc, docParaCargas(), docParaReps, docsParaRegistros(), docsParaRegistrosReps(), lerPc() (+8 more)

### Community 78 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.18
Nodes (10): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato novo do Worker, Critério de pronto, Decisões, Lembrete na hora certa (10/11/2026), Respostas do Victor, Riscos, Vários aparelhos e "Apagar de vez" (10/11/2026) (+2 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (23): concurrency, cancel-in-progress, group, runs-on, steps, env, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+15 more)

### Community 80 - "Botao"
Cohesion: 0.17
Nodes (27): `src/features/conta/` — Minha Conta, AvisoNotificacoes(), permissao(), AvisoDescanso(), ContaAluno(), escolherFoto(), desde(), Linha() (+19 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "relatorio.ts"
Cohesion: 0.10
Nodes (28): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), AvaliacaoAluno(), precisaAtualizar(), avaliacoesParaFazer(), cicloDaAvaliacao() (+20 more)

### Community 83 - "with"
Cohesion: 0.09
Nodes (22): runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name, on (+14 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "Tutorial.tsx"
Cohesion: 0.13
Nodes (36): Logo(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+28 more)

### Community 86 - "aluno-exemplo.test.ts"
Cohesion: 0.11
Nodes (24): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+16 more)

### Community 87 - "GuiaMetodos.tsx"
Cohesion: 0.39
Nodes (6): COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 90 - "rules.test.ts"
Cohesion: 0.20
Nodes (12): @firebase/rules-unit-testing, ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro (+4 more)

### Community 91 - "Feedbacks.tsx"
Cohesion: 0.18
Nodes (18): Onde mexer para…, Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), useFeedbacks() (+10 more)

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
Nodes (6): dependencies, firebase, motion, react, react-dom, uqr

### Community 100 - "PainelEvolucao.tsx"
Cohesion: 0.22
Nodes (14): freq(), RankingAlunos(), dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel(), plural() (+6 more)

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
Cohesion: 0.15
Nodes (24): Pontos sensíveis (leia antes de auditar ou mexer), `registros/{regId}`, 7. Teste de ataques (03/10/2026), pedir(), cancelarTreino(), enviarAnamnese(), importarMeso(), informarPagamento() (+16 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.09
Nodes (12): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, marca, ALUNO (+4 more)

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
Cohesion: 0.17
Nodes (27): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+19 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "prescreverSessao"
Cohesion: 0.09
Nodes (31): calcularAlertas(), Grupos, Reg, agora, alunos, linha, meso, mesos (+23 more)

### Community 122 - "criarAluno"
Cohesion: 0.14
Nodes (12): doAluno(), PARQ_NAO, ANTIGA(), confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA (+4 more)

### Community 134 - "Avaliacao.tsx"
Cohesion: 0.08
Nodes (43): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), ARTE (+35 more)

### Community 135 - "firebase"
Cohesion: 0.10
Nodes (49): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), firebase, BotaoPdfAvaliacao(), useAvaliacoesLiberadas(), AvaliacaoCoach(), Editor(), Faixa, fora() (+41 more)

### Community 136 - "resumo.ts"
Cohesion: 0.20
Nodes (11): deMapa(), docParaMeso(), AlunoComId, fimDaSessao(), msSessao(), resumoCoach(), Sessao, agora (+3 more)

### Community 137 - "cartaoRelatorio.ts"
Cohesion: 0.20
Nodes (18): pngDe(), W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num(), periodoTexto() (+10 more)

### Community 138 - "saude.yml"
Cohesion: 0.11
Nodes (18): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+10 more)

### Community 140 - "evolucao.test.ts"
Cohesion: 0.19
Nodes (12): MesoEvolucao, agora, dia(), emSemana(), feito(), linha, m1, meso() (+4 more)

### Community 141 - "metricas.ts"
Cohesion: 0.42
Nodes (10): evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros(), repsEfetivas(), soma() (+2 more)

### Community 142 - "avaliacao.spec.ts"
Cohesion: 0.22
Nodes (4): ALUNO, amanha(), COACH, DOBRAS

### Community 143 - "cartaoDepoimento.ts"
Cohesion: 0.29
Nodes (8): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), C, H, D_ESTRELA

### Community 144 - "QrCadastro.tsx"
Cohesion: 0.31
Nodes (5): uqr, CAMINHO_CADASTRO, emLinkCadastro(), linkCadastro, qrDataUrl()

### Community 145 - "SenhaSegura.tsx"
Cohesion: 0.26
Nodes (14): RequisitosSenha(), erroSenha(), SenhaSegura(), conferir(), criarNova(), reautenticar(), trocarSenha(), estadoSenha (+6 more)

### Community 146 - "marca.test.ts"
Cohesion: 0.29
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 147 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.18
Nodes (6): Descanso, alvosDe(), comAparelho(), Fixa, inicioDoDiaBrasilia(), semAparelho()

### Community 148 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 149 - "limpeza"
Cohesion: 0.20
Nodes (10): group, PREFIXO, limpeza, concurrency, env, needs, runs-on, strategy (+2 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "prescreverSessao"
Cohesion: 0.10
Nodes (18): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+10 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "Coleções Firestore"
Cohesion: 0.04
Nodes (40): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}` (+32 more)

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 157 - "notificacoes.spec.ts"
Cohesion: 0.40
Nodes (3): ALUNO, COACH, CORS

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 160 - "preparar"
Cohesion: 0.50
Nodes (4): preparar, matriz, outputs, runs-on

### Community 161 - "criarMeso"
Cohesion: 0.10
Nodes (19): ALUNO, COACH, diasAtras(), semear(), ALUNO, COACH, semearFormatoAntigo(), CAINDO (+11 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 165 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 169 - "registrarErro"
Cohesion: 0.11
Nodes (29): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas(), TITULO_ABA (+21 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1239 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `Pontos sensíveis (leia antes de auditar ou mexer)` to `icones.tsx`, `Avaliacao.tsx`, `Hoje.tsx`, `TabProgressao.tsx`, `firebase`, `resumo.ts`, `avaliacao.ts`, `vitest`, `util.ts`, `App.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `SenhaSegura.tsx`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `Treino.tsx`, `prescreverSessao`, `FimTreino.tsx`, `Coleções Firestore`, `Alunos.tsx`, `cartaoStory.ts`, `Entrar.tsx`, `Inicio.tsx`, `avisos-pagamento.mjs`, `webpush.ts`, `pix.ts`, `iaTreino.ts`, `src/index.ts`, `registrarErro`, `evolucao.ts`, `App.tsx`, `src/acesso.ts`, `MinhaConta.tsx`, `Presencial.tsx`, `pdfRelatorio.ts`, `CardioHoje.tsx`, `inatividade.ts`, `push.ts`, `prescreverSessao`, `PainelEvolucao.tsx`, `Botao`, `relatorio.ts`, `aluno-exemplo.test.ts`, `GuiaMetodos.tsx`, `PainelEvolucao.tsx`, `MesosDoAluno.tsx`, `layout.spec.ts`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Are the 151 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `versao()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 151 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `ataques.test.ts`, `Avaliacao.tsx`, `Hoje.tsx`, `TabProgressao.tsx`, `cartaoRelatorio.ts`, `firebase`, `cors.ts`, `avaliacao.ts`, `metricas.ts`, `util.ts`, `App.tsx`, `cartaoDepoimento.ts`, ``src/lib/` — Firestore, estado, cálculos com dados`, `QrCadastro.tsx`, `evolucao.test.ts`, `marca.test.ts`, `prescreverSessao`, `Treino.tsx`, `prescreverSessao`, `segmentos.ts`, `jwt.ts`, `Alunos.tsx`, `FimTreino.tsx`, `cartaoStory.ts`, `Entrar.tsx`, `prints.spec.ts`, `lib/planilha.test.ts`, `avisos-pagamento.mjs`, `webpush.ts`, `atualizar.ts`, `pix.ts`, `firebase-admin`, `firebase-admin`, `iaTreino.ts`, `src/index.ts`, `package.json`, `resumo.ts`, `src/acesso.ts`, `MinhaConta.tsx`, `pdfRelatorio.ts`, `CardioHoje.tsx`, `engine/index.ts`, `EnviarFeedback.tsx`, `push.ts`, `prescreverSessao`, `PainelEvolucao.tsx`, `relatorio.ts`, `aluno-exemplo.test.ts`, `SenhaSegura.tsx`, `rules.test.ts`, `prescreverSessao`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Lógica da planilha "Força 2027.1" — especificação do motor` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._