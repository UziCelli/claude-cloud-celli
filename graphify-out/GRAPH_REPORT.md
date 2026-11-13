# Graph Report - claude-cloud-celli  (2026-11-13)

## Corpus Check
- 394 files · ~404,484 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 3672 nodes · 10668 edges · 196 communities (177 shown, 19 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 515 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ea3d516`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- avaliacao.ts
- react
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- ImportarPlanilha.tsx
- InicioAluno.tsx
- engine/index.ts
- env
- seed.ts
- BoasVindas.tsx
- ui.tsx
- TabMetodos.tsx
- util.ts
- engine/index.ts
- anamnese.ts
- steps
- env
- Segurança — passos do Victor no console
- alertas.ts
- Presencial.tsx
- prints.spec.ts
- lados.ts
- FimTreino.tsx
- jwt.ts
- metricas.ts
- Estado da sessão (retomada) — atualizado em 10/11/2026
- cartaoStory.ts
- inatividade.ts
- steps
- steps
- settings.json
- firebase-admin
- sugestao.test.ts
- aluno-exemplo.mjs
- webpush.ts
- Alunos.tsx
- ref_node_fs
- firebase-admin
- Treino.tsx
- iaTreino.ts
- src/index.ts
- steps
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- vidro.tsx
- QrCadastro.tsx
- evolucao.ts
- with
- Entrar.tsx
- src/acesso.ts
- compilerOptions
- lib/fisio.ts
- Plano — App da Gislane (segunda marca)
- steps
- steps
- scripts
- sugestoesFisio.ts
- push.ts
- steps
- acoesFisio.ts
- SessaoCard.tsx
- pix.ts
- Motion / Framer Motion Examples
- ContaAluno.tsx
- EnviarFeedback.tsx
- dor.ts
- compilerOptions
- devDependencies
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- GuiaFisio.tsx
- steps
- App.tsx
- fetch
- inscreverAvisos
- marcas_vfit_marca
- push.yml
- Botao
- importar-meso.mjs
- Onde fica cada coisa
- with
- overrides
- TutorialCoach.tsx
- pix.spec.ts
- layout.spec.ts
- Performance Optimization
- avisos-pagamento.mjs
- rules.test.ts
- Feedbacks.tsx
- progressaoFisio.ts
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- descanso.ts
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- anamnese.spec.ts
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
- MesosDoAluno.tsx
- pdfRelatorio.ts
- cartaoRelatorio.ts
- hojeSaoPaulo
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- corpoPaths.ts
- MinhaConta.tsx
- norm
- react
- saude.yml
- cors.ts
- Quadro
- Coleções Firestore
- @playwright/test
- 12/11/2026 — orientação individual dos métodos
- src/ia.ts
- Árvore por pasta
- acoes.ts
- 5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)
- Entrar.tsx
- limpeza
- marca
- vitest
- env
- ConfirmarAluno
- steps
- pdfAvaliacao.ts
- limpeza-lgpd.yml
- relogio.spec.ts
- with
- Aviso
- preparar
- criarRegistro
- firebase-admin
- feedback.spec.ts
- Físio — articulações e músculos de cada exercício (para o Victor conferir)
- aluno-exemplo.test.ts
- Logo
- Pesquisa — Delimitação de volume adequado, lesão e dor (o que a literatura diz)
- anatomia.ts
- GraficoVolume.tsx
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- main.tsx
- tutorial.spec.ts
- icones.tsx
- package.json
- notasMetodo.ts
- vite.config.ts
- Push do descanso (Entrega 3b)
- limpeza-lgpd.mjs
- AvisoIOS
- seriesDoRotulo
- Força — app de treino (substitui a planilha "Força 2027.1")
- README.md
- Firebase — Guia de Setup
- Falso
- AGENTS.md
- registrarErro
- 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito
- APK do Força (Android)
- fisio-rules.test.ts
- vitest
- sair.spec.ts
- varredura.spec.ts
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- Plano — Painel de Evolução (03/10/2026)
- pwa-assets.config.ts

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 167 edges
2. `Botao()` - 145 edges
3. `Treino()` - 102 edges
4. `react` - 92 edges
5. `vitest` - 84 edges
6. ``src/lib/` — Firestore, estado, cálculos com dados` - 65 edges
7. `prescreverSessao()` - 64 edges
8. `firebase` - 62 edges
9. `useLista()` - 61 edges
10. `Aviso()` - 61 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- `Fase 3 — Isometria` --references--> `limiteDe()`  [INFERRED]
  docs/plano-lados-isometria.md → src/engine/volume.ts
- `Contexto` --references--> `polimento()`  [INFERRED]
  docs/plano-fisio.md → src/engine/volume.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx

## Import Cycles
- None detected.

## Communities (196 total, 19 thin omitted)

### Community 0 - "avaliacao.ts"
Cohesion: 0.06
Nodes (55): salvarAvaliacao(), AvaliacaoForm, BIO, Ciclo, DESCE, Destaque, DobraId, DOBRAS (+47 more)

### Community 1 - "react"
Cohesion: 0.11
Nodes (53): firebase, react, useArquivados(), useFeedbacks(), Inicio(), saudacao(), Aba, ABAS (+45 more)

### Community 2 - "ataques.test.ts"
Cohesion: 0.13
Nodes (15): agora(), ALUNOS, COM_FATOR, comoFirestore(), contexto(), criarReg(), db(), dbEmail() (+7 more)

### Community 3 - "Lógica da planilha "Força 2027.1" — especificação do motor"
Cohesion: 0.17
Nodes (12): 11. Meta robusta (por métrica: movimentos, carga média, volume) — `AS66:AU66`, 12. Evolução de um exercício — `CG2`, 13. Não portado (de propósito), 2. Divisão (quais exercícios em cada treino), 3. Progressão (reps por série), 4. Métodos avançados (`tblLocalMetodosNx`), 5. Reps de cada série — `AvRep(base, n, semana, treino, ex, pos)`, 6. Carga sugerida das etapas do dropset — `AvCarga` (+4 more)

### Community 4 - "extrair_planilha.py"
Cohesion: 0.08
Nodes (17): col_letters_to_num(), excel_serial_to_date(), extract_divisao(), extract_exercicios(), extract_meso3x_config(), extract_monitoramento(), extract_progressao(), extract_semanas_data() (+9 more)

### Community 5 - "Motion & Framer Motion"
Cohesion: 0.04
Nodes (44): 1. Forgetting AnimatePresence for Exit Animations, 1. Hover Animations, 1. Motion Components, 1. Use Transform Properties, 2. Animate Prop, 2. Individual Transform Properties, 2. Missing key Prop in Lists, 2. Tap/Press Animations (+36 more)

### Community 6 - "ImportarPlanilha.tsx"
Cohesion: 0.08
Nodes (42): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaAntigaFalsa() (+34 more)

### Community 7 - "InicioAluno.tsx"
Cohesion: 0.17
Nodes (26): AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), InicioAluno(), jaViuPopup() (+18 more)

### Community 8 - "engine/index.ts"
Cohesion: 0.10
Nodes (42): `src/features/coach/` — App do coach, isometrico(), LIMITE_ISOMETRIA_S, linhaIsometrica(), nomes, normalizar(), progressaoIsometrica(), base() (+34 more)

### Community 9 - "env"
Cohesion: 0.04
Nodes (46): if, needs, runs-on, steps, strategy, AGENDAR, EVENTO, MARCA (+38 more)

### Community 10 - "seed.ts"
Cohesion: 0.12
Nodes (15): doAluno(), PARQ_NAO, ALUNO, COACH, ANAMNESE_MINIMA, criarAluno(), criarAlunoAguardando(), criarAlunoArquivado() (+7 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (28): `src/features/instalar/` — PWA/Android, BoasVindas(), CartaoInstalar(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas() (+20 more)

### Community 12 - "ui.tsx"
Cohesion: 0.11
Nodes (27): BotaoCompartilhar(), clicar(), compartilharArquivo(), dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa(), Painel() (+19 more)

### Community 13 - "TabMetodos.tsx"
Cohesion: 0.13
Nodes (35): 1. Configuração do mesociclo, `mesos/{mesoId}`, `src/engine/` — Motor de cálculo puro (sem React/Firebase), COR_METODO, ORDEM, padraoMetodo(), assinatura(), emGrupo() (+27 more)

### Community 14 - "util.ts"
Cohesion: 0.15
Nodes (31): Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarLados(), mudarPausa() (+23 more)

### Community 15 - "engine/index.ts"
Cohesion: 0.13
Nodes (27): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+19 more)

### Community 16 - "anamnese.ts"
Cohesion: 0.08
Nodes (49): `src/lib/` — Firestore, estado, cálculos com dados, apagar(), Caixa(), Campo(), Conteudo(), enviar(), ler(), ModoCoach (+41 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (45): concurrency, if, needs, runs-on, steps, strategy, group, BACKUP_SENHA (+37 more)

### Community 18 - "env"
Cohesion: 0.05
Nodes (42): EVENTO, GH_TOKEN, MARCA, PROJETO, SA, marca, jobs, preparar (+34 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.09
Nodes (22): 10. Correções da revisão de 12/11/2026, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD) (+14 more)

### Community 20 - "alertas.ts"
Cohesion: 0.05
Nodes (58): Proposta em 3 passos (do mais seguro ao maior), AlertaAbaixo, AlertaAcima, AlertaDemorado, chavesAtuais(), Grupos, Reg, agora (+50 more)

### Community 21 - "Presencial.tsx"
Cohesion: 0.21
Nodes (20): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+12 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.06
Nodes (19): 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades (+11 more)

### Community 23 - "lados.ts"
Cohesion: 0.12
Nodes (18): 13/11/2026 — Carga por lado (entrega A) e próximo: isometria (entrega B), Ajuste por exercício no meso, Entrega B — decisões e histórico (Codex, 13/11/2026), Estado (13/11/2026), Fase 1 — Catálogo (só dados), Fase 3 — Isometria, Ficam SEM marca (um halter só, ou um lado de cada vez), Isométricos novos (proposta — Victor confere) (+10 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.20
Nodes (13): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, IcCamera, IcSubir (+5 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "metricas.ts"
Cohesion: 0.19
Nodes (19): Para o Codex continuar (entrega B — isometria), ESCOPOS, mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio() (+11 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 10/11/2026"
Cohesion: 0.04
Nodes (44): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+36 more)

### Community 28 - "cartaoStory.ts"
Cohesion: 0.23
Nodes (20): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), DadosCartao, desenhar(), desenharTreino(), desenharTreinoFoto() (+12 more)

### Community 29 - "inatividade.ts"
Cohesion: 0.19
Nodes (15): sairAgora(), sairAgora(), sair(), concluirSaida(), reabrirAposFalha(), Armazem, AVISO_SAIU, cronometroRodando() (+7 more)

### Community 30 - "steps"
Cohesion: 0.05
Nodes (37): env, if, runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group (+29 more)

### Community 31 - "steps"
Cohesion: 0.05
Nodes (36): description, options, required, type, description, required, ACAO, EMAIL (+28 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "firebase-admin"
Cohesion: 0.12
Nodes (8): firebase-admin, SCRIPTS, app, auth, COLECOES, db, atual, novo

### Community 34 - "sugestao.test.ts"
Cohesion: 0.13
Nodes (20): slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm() (+12 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.09
Nodes (19): 1. Progressão por exercício (acaba principal/auxiliar), [a, m, d], achados, b, db, diaSemana, divisao, inicio (+11 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "Alunos.tsx"
Cohesion: 0.08
Nodes (48): `src/features/aluno/` — App do aluno, chave(), jaViu(), Mensalidade(), PixPopup(), hoje, mk(), contaDoDia() (+40 more)

### Community 38 - "ref_node_fs"
Cohesion: 0.07
Nodes (15): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, CORS (+7 more)

### Community 39 - "firebase-admin"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 40 - "Treino.tsx"
Cohesion: 0.09
Nodes (43): `notas/{alunoId}`, METODOS, AvisoAdaptado(), ExplicacaoMetodo(), Festa, FestaRecorde(), hms(), Nota() (+35 more)

### Community 41 - "iaTreino.ts"
Cohesion: 0.06
Nodes (56): ROTULO, VozTreino(), aplicar(), falar(), iniciar(), limpar(), montar(), mudarTexto() (+48 more)

### Community 42 - "src/index.ts"
Cohesion: 0.11
Nodes (38): podeAvisarTreino(), MAX_CORPO_IA, ResultadoIA, DO_ALUNO, Env, fetch(), Mensagem, ROBO (+30 more)

### Community 43 - "steps"
Cohesion: 0.06
Nodes (30): description, required, ALUNO, MESO, NOME, SA, if, runs-on (+22 more)

### Community 44 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.25
Nodes (7): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 45 - "vidro.tsx"
Cohesion: 0.18
Nodes (15): `src/features/privacidade/` — Política e Aceite, trocarSenha(), campo, EsqueciSenha(), enviar(), mensagemRecuperar(), rotulo, Aceite() (+7 more)

### Community 46 - "QrCadastro.tsx"
Cohesion: 0.26
Nodes (6): uqr, QrCadastro(), CAMINHO_CADASTRO, emLinkCadastro(), linkCadastro, qrDataUrl()

### Community 47 - "evolucao.ts"
Cohesion: 0.07
Nodes (43): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao (+35 more)

### Community 48 - "with"
Cohesion: 0.07
Nodes (31): if, runs-on, steps, if, runs-on, steps, jobs, app (+23 more)

### Community 49 - "Entrar.tsx"
Cohesion: 0.20
Nodes (18): Entrar(), enviar(), voltar(), erros, mensagemErro(), SENHA_FRACA, cadastrar(), confirmarLoginTotp() (+10 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.18
Nodes (14): acessoComCache(), CacheAcesso, Campos, ehCoach(), lerPerfil(), lerPermissao(), liberado(), quemAvisaCoach() (+6 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "lib/fisio.ts"
Cohesion: 0.22
Nodes (15): ALERTA_GERAL, ARTICULACAO_QUEIXA, COLECAO_FISIO, CONTEXTOS_LIBERACAO, dataValida(), lerLiberacao(), lerOrientacao(), LiberacaoProfissional (+7 more)

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

### Community 57 - "sugestoesFisio.ts"
Cohesion: 0.15
Nodes (21): Checkin, diaDe(), Entrada, ev(), Gatilho, gatilhosConversar(), gatilhosPolimento(), gatilhosProgressao() (+13 more)

### Community 58 - "push.ts"
Cohesion: 0.15
Nodes (24): enviar(), agendarPush(), avisarTreinoPronto(), AVISOS_ALUNO, AVISOS_COACH, avisosLigados(), b64uParaBytes(), BASE (+16 more)

### Community 59 - "steps"
Cohesion: 0.07
Nodes (26): MARCA, PROJETO, SA, if, runs-on, steps, marca, jobs (+18 more)

### Community 60 - "acoesFisio.ts"
Cohesion: 0.20
Nodes (18): checkinJaExiste(), registrarCheckin(), CheckinFim(), chip(), Estado, CampoCheckin, CheckinForm, checkinValido() (+10 more)

### Community 61 - "SessaoCard.tsx"
Cohesion: 0.13
Nodes (26): BotaoLadosDiferentes(), CampoLados(), fmt(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard() (+18 more)

### Community 62 - "pix.ts"
Cohesion: 0.33
Nodes (8): campo(), centavos(), codigoPix(), crc16(), limparChave(), semAcento(), base, valorComAtraso()

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "ContaAluno.tsx"
Cohesion: 0.29
Nodes (12): ContaAluno(), escolherFoto(), desde(), Linha(), Peso(), IcLivro, IcPessoa, apagarFoto() (+4 more)

### Community 65 - "EnviarFeedback.tsx"
Cohesion: 0.19
Nodes (19): chip(), EnviarFeedback(), enviar(), Opcao(), enviarFeedback(), Assunto, ASSUNTOS, CHAVE_CONVITE (+11 more)

### Community 66 - "dor.ts"
Cohesion: 0.19
Nodes (19): `fisioDores/{id automático}` (Etapa 3, 12/11/2026), relatarDor(), chip(), RelatarDor(), ROTULO_LOCAL, vazio(), IcFisio, ArticulacaoId (+11 more)

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

### Community 73 - "GuiaFisio.tsx"
Cohesion: 0.16
Nodes (19): ALERTA_LOMBAR, ALERTA_TENDAO, AVISO_FISIO, linkPubmed(), MetodoFisio, METODOS_FISIO, Nivel, opcional() (+11 more)

### Community 74 - "steps"
Cohesion: 0.08
Nodes (24): MODO, SA, if, runs-on, steps, modo, jobs, exemplo (+16 more)

### Community 75 - "App.tsx"
Cohesion: 0.17
Nodes (22): mesoAtual(), abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), linkBtn, rotulo (+14 more)

### Community 76 - "fetch"
Cohesion: 0.20
Nodes (7): Pontos sensíveis (leia antes de auditar ou mexer), Segurança — revisão 12/11/2026, nadaPassaDaTela(), Descanso, Fixa, Tipo, ParVapid

### Community 77 - "inscreverAvisos"
Cohesion: 0.31
Nodes (11): `src/features/conta/` — Minha Conta, AvisoNotificacoes(), permissao(), AvisoDescanso(), Chave(), ChavesAvisos(), NotificacoesCoach(), avisosDesligados() (+3 more)

### Community 78 - "marcas_vfit_marca"
Cohesion: 0.21
Nodes (12): DadosDepoimento, desenhar(), gerarCartaoDepoimento(), quebrar(), textosDepoimento(), D_ESTRELA, assinaturaMarca(), Entrada (+4 more)

### Community 79 - "push.yml"
Cohesion: 0.08
Nodes (25): concurrency, cancel-in-progress, group, if, runs-on, steps, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN (+17 more)

### Community 80 - "Botao"
Cohesion: 0.12
Nodes (39): ativaAba(), Coach(), Menu(), PerfilDemora(), pedir(), Principal(), SemAcesso(), Vigia() (+31 more)

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "Onde fica cada coisa"
Cohesion: 0.13
Nodes (23): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+15 more)

### Community 83 - "with"
Cohesion: 0.08
Nodes (23): if, runs-on, steps, timeout-minutes, GH_TOKEN, jobs, emulador, name (+15 more)

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "TutorialCoach.tsx"
Cohesion: 0.31
Nodes (15): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+7 more)

### Community 86 - "pix.spec.ts"
Cohesion: 0.18
Nodes (9): `src/lib/` — Privacidade, ALUNO, COACH, marca, definirPagoAte(), aceitouPrivacidade(), SENHA_CONFERIDA_DESDE, senhaJaConferida() (+1 more)

### Community 87 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "avisos-pagamento.mjs"
Cohesion: 0.21
Nodes (14): assinarJwt(), base64url(), diaBrasilia(), diaDaSemana(), DIAS_AUTO, emMillis(), executar(), numeroDoDia() (+6 more)

### Community 90 - "rules.test.ts"
Cohesion: 0.22
Nodes (11): ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro, passado (+3 more)

### Community 91 - "Feedbacks.tsx"
Cohesion: 0.27
Nodes (14): Cartao(), Doc, Estrelas(), Feedbacks(), FILTROS, mediaTexto(), IcEstrela(), apagarFeedback() (+6 more)

### Community 92 - "progressaoFisio.ts"
Cohesion: 0.12
Nodes (19): DIF_REPS, proporcao(), PROPORCAO_SERIES, RegistroProgressao, SALTO_FATOR, Serie, SessaoEx, SESSOES_SEGUIDAS (+11 more)

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

### Community 100 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

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

### Community 108 - "anamnese.spec.ts"
Cohesion: 0.24
Nodes (8): confirmarGrave(), GRAVES, marcar(), mesoDe(), NOVA, PARQ, proximo(), responder()

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

### Community 119 - "MesosDoAluno.tsx"
Cohesion: 0.10
Nodes (52): motion, proximoMeso(), NovoAluno(), enviar(), Aba, ABAS, DIAS_SEMANA, EditorMeso() (+44 more)

### Community 120 - "pdfRelatorio.ts"
Cohesion: 0.14
Nodes (16): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, C, criarFolhas(), disp(), LARG, M, MUDO (+8 more)

### Community 121 - "cartaoRelatorio.ts"
Cohesion: 0.20
Nodes (18): H, pngDe(), W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio(), num() (+10 more)

### Community 122 - "hojeSaoPaulo"
Cohesion: 0.10
Nodes (14): ALUNO, amanha(), COACH, DOBRAS, ALUNO, COACH, PNG, ALUNO (+6 more)

### Community 134 - "corpoPaths.ts"
Cohesion: 0.11
Nodes (22): ARTE, clarear(), COR_CORPO, ESTAVEL_PDF, LEGENDA, LEGENDA_FRACA, lista(), Parte (+14 more)

### Community 135 - "MinhaConta.tsx"
Cohesion: 0.20
Nodes (18): 09/10/2026 — Segurança, movimento e aba Conta, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), trocarEmail(), trocarSenha() (+10 more)

### Community 136 - "norm"
Cohesion: 0.24
Nodes (11): salvarExerciciosFisio(), ExerciciosDaOrientacao(), mudar(), SeletorExercicios(), POR_NOME, buscarExercicios(), itens, norm() (+3 more)

### Community 137 - "react"
Cohesion: 0.14
Nodes (37): `src/features/avaliacao/` — Avaliação física e relatório escrito de evolução (Fase 3; plano em `docs/plano-avaliacao.md`), Peças, BotaoPdfAvaliacao(), AvaliacaoAluno(), AvaliacaoCoach(), Editor(), Faixa, fora() (+29 more)

### Community 138 - "saude.yml"
Cohesion: 0.10
Nodes (19): ENDERECOS, GH_TOKEN, jobs, saude, name, on, schedule, workflow_dispatch (+11 more)

### Community 140 - "Quadro"
Cohesion: 0.24
Nodes (15): Peças compartilhadas (já no código), AnamnesePendente(), AvaliacaoPronta(), Quadros(), RelatorioPronto(), ConviteFeedback(), Faixa(), FaixaFeedback() (+7 more)

### Community 141 - "Coleções Firestore"
Cohesion: 0.04
Nodes (41): `anamneses/{id automático}`, `arquivados/{chave}`, `avaliacoes/{id automático}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `feedbacks/{id automático}` (+33 more)

### Community 142 - "@playwright/test"
Cohesion: 0.08
Nodes (22): COACH, ALUNO, COACH, NOMES, ALUNO, meso(), prog, ALUNO (+14 more)

### Community 143 - "12/11/2026 — orientação individual dos métodos"
Cohesion: 0.11
Nodes (16): 12/11/2026 (noite) — Claude: Etapa 3 e lista geral de perigo, 12/11/2026 — orientação individual dos métodos, 13/11/2026 (madrugada) — Claude: rodada 4 (pedido do Victor antes de dormir), 13/11/2026 (manhã) — Claude: correções da revisão do PR (F1–F8), Continuidade Físio — Codex / Claude, Critério de pronto e verificação, Critérios do Markdown científico, Decisões desta entrega (+8 more)

### Community 144 - "src/ia.ts"
Cohesion: 0.19
Nodes (15): appCheckOk(), AcaoIA, ArmazemIA, atenderIA(), chaveIAValida(), erro(), EstadoIA, metadados() (+7 more)

### Community 145 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/anamnese/` — Anamnese (PAR-Q+, saúde, dores, rotina, treino; 10/11/2026), `src/features/auth/` — Autenticação (+7 more)

### Community 146 - "acoes.ts"
Cohesion: 0.13
Nodes (27): Onde mexer para…, CardioHoje(), IcCardio, anotarAnamnese(), criarAlunoComApp(), criarConta(), darAcessoAoApp(), desfazerCardio() (+19 more)

### Community 147 - "5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)"
Cohesion: 0.12
Nodes (16): 1. Sua tarefa, 2. Regras de escopo (valem para o grupo inteiro), 3. Estrutura de dados sugerida para cada método, 4. Regras globais de progressão (aplicar a todos os métodos), 5.1 Coluna lombar — dor lombar crônica inespecífica, 5.2 Ombro — dor relacionada ao manguito rotador / subacromial, 5.3 Joelho, 5.4 Tendões (tendinopatias) (+8 more)

### Community 148 - "Entrar.tsx"
Cohesion: 0.13
Nodes (27): copiar(), codigo(), falhou(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez() (+19 more)

### Community 149 - "limpeza"
Cohesion: 0.18
Nodes (11): group, PREFIXO, limpeza, concurrency, env, if, needs, runs-on (+3 more)

### Community 150 - "marca"
Cohesion: 0.20
Nodes (10): marca, default, description, options, type, on, schedule, workflow_dispatch (+2 more)

### Community 151 - "vitest"
Cohesion: 0.06
Nodes (36): Critério do Victor (13/11/2026): progressão demasiada × dor, Isometria — extensão do aplicativo (13/11/2026), `registros/{regId}`, 7. Teste de ataques (03/10/2026), vitest, nomes(), NOMES_ISOMETRICOS, igual() (+28 more)

### Community 152 - "env"
Cohesion: 0.25
Nodes (8): BACKUP_SENHA, EVENTO, GH_TOKEN, MARCA, NOVO, PROJETO, SA, env

### Community 153 - "ConfirmarAluno"
Cohesion: 0.32
Nodes (8): `fisioOrientacoes/{id automático}`, bloquear(), liberar(), reativar(), ConfirmarAluno(), confirmar(), apagarAluno(), definirAcesso()

### Community 154 - "steps"
Cohesion: 0.33
Nodes (7): steps, steps, id, if, name, run, uses

### Community 155 - "pdfAvaliacao.ts"
Cohesion: 0.16
Nodes (24): Avaliacao(), Chipe(), COR, GrupoCartao(), LinhaMedida(), SETA_VEREDITO, SetaIc(), corParte() (+16 more)

### Community 156 - "limpeza-lgpd.yml"
Cohesion: 0.33
Nodes (5): jobs, name, permissions, actions, contents

### Community 157 - "relogio.spec.ts"
Cohesion: 0.29
Nodes (5): ALUNO, COACH, iniciarEConcluir(), seg(), semear()

### Community 158 - "with"
Cohesion: 0.40
Nodes (5): with, name, node-version, path, retention-days

### Community 159 - "Aviso"
Cohesion: 0.29
Nodes (12): AnamneseCoach(), Anotacao(), quando(), quandoMs(), useAnamnesesDoAluno(), relatarSinalFisio(), BotaoSinal(), relatar() (+4 more)

### Community 160 - "preparar"
Cohesion: 0.40
Nodes (5): preparar, matriz, if, outputs, runs-on

### Community 161 - "criarRegistro"
Cohesion: 0.09
Nodes (21): ALUNO, COACH, ALUNO, COACH, diasAtras(), semear(), ALUNO, COACH (+13 more)

### Community 162 - "firebase-admin"
Cohesion: 0.33
Nodes (4): acao, email, projeto, PROJETOS

### Community 163 - "feedback.spec.ts"
Cohesion: 0.40
Nodes (5): ANA, BIA, COACH, comoAluno(), entrar()

### Community 164 - "Físio — articulações e músculos de cada exercício (para o Victor conferir)"
Cohesion: 0.13
Nodes (14): Abdome e Lombar, Adutores e Abdutores, Antebraço, Bíceps, Dorsais, Escolhas que eu fiz (confira primeiro), Físio — articulações e músculos de cada exercício (para o Victor conferir), Ombros (+6 more)

### Community 165 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 166 - "Logo"
Cohesion: 0.29
Nodes (8): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, Lista(), Politica(), Secao()

### Community 167 - "Pesquisa — Delimitação de volume adequado, lesão e dor (o que a literatura diz)"
Cohesion: 0.13
Nodes (14): 0. Conclusão central (ler primeiro), 1. Como o volume é medido, 2. Faixas de volume da literatura (população saudável), 3.1 Epidemiologia na musculação, 3.2 Razão carga aguda:crônica (ACWR), 3.3 Aumento semana a semana ("regra dos 10%"), 3.4 Retorno após pausa, 3.5 Deload (+6 more)

### Community 168 - "anatomia.ts"
Cohesion: 0.15
Nodes (15): Decisões suas antes de começar, Físio — proposta A1: cruzar o treino real com as sugestões, O que a pesquisa de volume muda (`docs/fisio-pesquisa-volume.md`, 13/11/2026), O que mudaria para você (em linguagem simples), O que o app continua NÃO fazendo, Etapa 1 — Base no catálogo (pode começar já), Anatomia, anatomiaDo() (+7 more)

### Community 169 - "GraficoVolume.tsx"
Cohesion: 0.33
Nodes (8): AnaliseProgressao, fmt(), FORMA, GraficoVolume(), M, passoBonito(), RITMO, sinal()

### Community 170 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 171 - "main.tsx"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 172 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 173 - "icones.tsx"
Cohesion: 0.12
Nodes (36): Campo(), Cartao(), CHAVE_NOVIDADES, Chip(), Novidades(), novidadesNaoVistas(), passos(), Abas() (+28 more)

### Community 174 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 175 - "notasMetodo.ts"
Cohesion: 0.36
Nodes (5): ANTIGA(), dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 176 - "vite.config.ts"
Cohesion: 0.18
Nodes (8): @tailwindcss/vite, vite, vite-plugin-pwa, @vitejs/plugin-react, arquivos(), previewHeaders, TIPOS, versao

### Community 177 - "Push do descanso (Entrega 3b)"
Cohesion: 0.25
Nodes (7): Como funciona, Limites do plano grátis (Cloudflare), Outros avisos (09/11/2026), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 178 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 179 - "AvisoIOS"
Cohesion: 0.83
Nodes (3): AvisoIOS(), iOS(), standalone()

### Community 181 - "Força — app de treino (substitui a planilha "Força 2027.1")"
Cohesion: 0.20
Nodes (10): Comandos, Economia de tokens — regra de delegação, Força — app de treino (substitui a planilha "Força 2027.1"), graphify, Hierarquia dos agentes (definida pelo Victor em 14/10/2026), Onde está cada coisa, Plugins (ativados em `.claude/settings.json`), PRs: fluxo automático (autorizado pelo Victor em 07/10/2026) (+2 more)

### Community 182 - "README.md"
Cohesion: 0.22
Nodes (4): Fases, Força — app de treino, Manutenção, Para desenvolvedores

### Community 183 - "Firebase — Guia de Setup"
Cohesion: 0.25
Nodes (8): Firebase — Guia de Setup, O que é e quanto custa, Parte 1 — Criar o projeto (10 min), Parte 2 — Ativar o login por e-mail, Parte 3 — Criar o banco de dados, Parte 4 — Me mandar a configuração, Parte 5 — Virar o coach, Se algo der errado

### Community 187 - "registrarErro"
Cohesion: 0.19
Nodes (17): limparArquivadosAntigos(), Contador, contarDia(), cortar(), empilhar(), enviar(), gravar(), iniciarLog() (+9 more)

### Community 188 - "2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito"
Cohesion: 0.15
Nodes (12): 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito, Contrato do Worker, Contrato novo do Worker, Critério de pronto, Decisões, Decisões, Lembrete na hora certa (10/11/2026), Notificações: mensalidade e treino pronto (13/10/2026) (+4 more)

### Community 189 - "APK do Força (Android)"
Cohesion: 0.29
Nodes (7): APK do Força (Android), Atualizações do app, Como gerar, Como mandar para o aluno, O que o workflow faz, Segredo importante, Testar sem ter Android

### Community 191 - "fisio-rules.test.ts"
Cohesion: 0.33
Nodes (5): @firebase/rules-unit-testing, db(), liberacao, MFA, ref()

### Community 192 - "vitest"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 197 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.50
Nodes (3): 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)

### Community 198 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.29
Nodes (6): 10. Monitoramento, Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), Regras gerais, cargaMax()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1408 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `avaliacao.ts`, `ataques.test.ts`, `corpoPaths.ts`, `MinhaConta.tsx`, `engine/index.ts`, `norm`, `react`, `cors.ts`, `ImportarPlanilha.tsx`, `TabMetodos.tsx`, `util.ts`, `engine/index.ts`, `src/ia.ts`, `anamnese.ts`, `acoes.ts`, `ui.tsx`, `alertas.ts`, `Entrar.tsx`, `FimTreino.tsx`, `jwt.ts`, `metricas.ts`, `cartaoStory.ts`, `inatividade.ts`, `firebase-admin`, `sugestao.test.ts`, `webpush.ts`, `Alunos.tsx`, `ref_node_fs`, `aluno-exemplo.test.ts`, `anatomia.ts`, `iaTreino.ts`, `src/index.ts`, `Treino.tsx`, `firebase-admin`, `package.json`, `QrCadastro.tsx`, `evolucao.ts`, `notasMetodo.ts`, `src/acesso.ts`, `Entrar.tsx`, `lib/fisio.ts`, `seriesDoRotulo`, `sugestoesFisio.ts`, `push.ts`, `registrarErro`, `acoesFisio.ts`, `SessaoCard.tsx`, `pix.ts`, `fisio-rules.test.ts`, `vitest`, `dor.ts`, `GuiaFisio.tsx`, `marcas_vfit_marca`, `Onde fica cada coisa`, `avisos-pagamento.mjs`, `rules.test.ts`, `progressaoFisio.ts`, `descanso.ts`, `marca.test.ts`, `pdfRelatorio.ts`, `cartaoRelatorio.ts`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Are the 165 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `dados()` and `nadaPassaDaTela()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 165 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `avaliacao.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.059562841530054644 - nodes in this community are weakly interconnected._
- **Why does `Pontos sensíveis (leia antes de auditar ou mexer)` connect `fetch` to `avaliacao.ts`, `react`, `ImportarPlanilha.tsx`, `InicioAluno.tsx`, `engine/index.ts`, `MinhaConta.tsx`, `react`, `ui.tsx`, `Coleções Firestore`, `util.ts`, `12/11/2026 — orientação individual dos métodos`, `src/ia.ts`, `engine/index.ts`, `TabMetodos.tsx`, `acoes.ts`, `Entrar.tsx`, `Presencial.tsx`, `alertas.ts`, `vitest`, `FimTreino.tsx`, `ConfirmarAluno`, `pdfAvaliacao.ts`, `cartaoStory.ts`, `inatividade.ts`, `Aviso`, `sugestao.test.ts`, `Alunos.tsx`, `Treino.tsx`, `iaTreino.ts`, `src/index.ts`, `icones.tsx`, `vidro.tsx`, `evolucao.ts`, `Entrar.tsx`, `src/acesso.ts`, `AvisoIOS`, `seriesDoRotulo`, `push.ts`, `registrarErro`, `SessaoCard.tsx`, `pix.ts`, `inscreverAvisos`, `Botao`, `anamnese.ts`, `Onde fica cada coisa`, `pix.spec.ts`, `avisos-pagamento.mjs`, `MesosDoAluno.tsx`, `pdfRelatorio.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.11237928007023705 - nodes in this community are weakly interconnected._