# Graph Report - claude-cloud-celli  (2026-11-08)

## Corpus Check
- 279 files · ~264,215 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2174 nodes · 6382 edges · 143 communities (127 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 301 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fb9f44de`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- TutorialCoach.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- ImportarPlanilha.tsx
- InicioAluno.tsx
- Hoje.tsx
- AlunoApp.tsx
- EditarTreino.tsx
- BoasVindas.tsx
- resumo.test.ts
- evolucao.ts
- engine/index.ts
- Alunos.tsx
- Alertas.tsx
- limparEmuladores
- MinhaConta.tsx
- Segurança — passos do Victor no console
- Treino.tsx
- MinhaConta.tsx
- prints.spec.ts
- ContaAluno.tsx
- criarAluno
- jwt.ts
- GuiaMetodos.tsx
- Estado da sessão (retomada) — atualizado em 13/10/2026
- agenda.ts
- CardioHoje.tsx
- EditorMeso.tsx
- cartaoStory.ts
- settings.json
- importar.spec.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- SessaoCard
- inatividade.ts
- progressao.test.ts
- Plano — Painel de Evolução (03/10/2026)
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
- App.tsx
- App.tsx
- vigia.test.ts
- firebase-admin
- ui.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- MinhaConta
- icones.tsx
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- src/index.ts
- Entrar.tsx
- limpeza-lgpd.test.ts
- AvisoIOS
- Descanso
- metricas.ts
- vidro.tsx
- codigoPix
- importar-meso.mjs
- relatorio.spec.ts
- vitest
- overrides
- TabProgressao.tsx
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- Árvore por pasta
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
- Coleções Firestore
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
- MesosDoAluno.tsx
- CampoExercicio
- treino.test.ts
- sugestao.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- varredura.spec.ts
- seriesDoRotulo
- main.tsx
- 5. Auditoria 02/10/2026 (segurança + LGPD)
- 6. Monitoramento (alertas)
- atualizar.ts
- AvisoNotificacoes.tsx
- Nota
- ehRecorde

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 104 edges
2. `Botao()` - 83 edges
3. `Treino()` - 77 edges
4. `vitest` - 61 edges
5. `prescreverSessao()` - 57 edges
6. `react` - 56 edges
7. `Meso` - 49 edges
8. `Cartao()` - 44 edges
9. `registrarErro()` - 41 edges
10. `firebase` - 39 edges

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

## Communities (143 total, 16 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (50): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Contrato do Worker (+42 more)

### Community 1 - "TutorialCoach.tsx"
Cohesion: 0.20
Nodes (22): Meso, Slot, Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+14 more)

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

### Community 6 - "ImportarPlanilha.tsx"
Cohesion: 0.09
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaMesoFalsa() (+32 more)

### Community 7 - "InicioAluno.tsx"
Cohesion: 0.13
Nodes (27): AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), IcCadeado, IcRaio (+19 more)

### Community 8 - "Hoje.tsx"
Cohesion: 0.18
Nodes (13): painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1, meso() (+5 more)

### Community 9 - "AlunoApp.tsx"
Cohesion: 0.18
Nodes (20): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+12 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.14
Nodes (26): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+18 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.14
Nodes (30): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+22 more)

### Community 12 - "resumo.test.ts"
Cohesion: 0.17
Nodes (28): firebase, Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto, VisaoSemana() (+20 more)

### Community 13 - "evolucao.ts"
Cohesion: 0.19
Nodes (17): C, dadosCartaoRelatorio(), dataBr(), periodoTexto(), r, volumeTexto(), disp(), EntradaPdf (+9 more)

### Community 14 - "engine/index.ts"
Cohesion: 0.21
Nodes (14): ESCOPOS, linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+6 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.09
Nodes (40): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+32 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.12
Nodes (33): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+25 more)

### Community 17 - "limparEmuladores"
Cohesion: 0.19
Nodes (14): fimDoDiaSaoPaulo(), Foto, inicioDoDiaSP(), liberado(), proximoVencimento(), Usuario, AlunoComId, msSessao() (+6 more)

### Community 18 - "MinhaConta.tsx"
Cohesion: 0.16
Nodes (22): sairAgora(), DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail() (+14 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.18
Nodes (10): `registros/{regId}`, 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 7. Teste de ataques (03/10/2026), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h) (+2 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.14
Nodes (29): AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), hms(), Modal(), NotaMetodos(), Novidades(), RegistroFlag (+21 more)

### Community 21 - "MinhaConta.tsx"
Cohesion: 0.20
Nodes (17): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas(), estavel() (+9 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (11): ANTES, DIAS_AUTO, ids, marca, NOMES, PROIBIDO, T1, T2 (+3 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.16
Nodes (23): Chave(), ContaAluno(), escolherFoto(), trocarSenha(), desde(), Linha(), Mensalidade(), Peso() (+15 more)

### Community 24 - "criarAluno"
Cohesion: 0.22
Nodes (12): CONFETE, dur(), FimTreino(), escolher(), Lista(), limitar(), IcCamera, IcSubir (+4 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "GuiaMetodos.tsx"
Cohesion: 0.24
Nodes (8): COR_METODO, metodoDoRotulo(), METODOS, ORDEM, dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 27 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.08
Nodes (24): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+16 more)

### Community 28 - "agenda.ts"
Cohesion: 0.21
Nodes (21): `src/features/aluno/` — App do aluno, InicioAluno(), Msg(), PixPerto(), Quadros(), RelatorioPronto(), Treinos(), dataSP() (+13 more)

### Community 29 - "CardioHoje.tsx"
Cohesion: 0.18
Nodes (16): BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao, dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa() (+8 more)

### Community 30 - "EditorMeso.tsx"
Cohesion: 0.39
Nodes (7): Editor(), liberarRelatorio(), recolherRelatorio(), relatorio(), salvarRelatorio(), authCadastro(), protegerApp()

### Community 31 - "cartaoStory.ts"
Cohesion: 0.14
Nodes (30): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), caixa(), carregarImagem() (+22 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "importar.spec.ts"
Cohesion: 0.10
Nodes (14): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+6 more)

### Community 34 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.13
Nodes (25): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), FestaRecorde(), cancelarTreino(), arred(), caminhoCarga(), CargasDoc, deMapa() (+17 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "SessaoCard"
Cohesion: 0.15
Nodes (14): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ALUNO, COACH, confere(), semTransbordar(), diasAtras(), registros() (+6 more)

### Community 39 - "inatividade.ts"
Cohesion: 0.33
Nodes (10): Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, marcar(), treinoEmAndamento() (+2 more)

### Community 40 - "progressao.test.ts"
Cohesion: 0.33
Nodes (7): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas()

### Community 41 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 42 - "validar.ts"
Cohesion: 0.17
Nodes (19): podeAvisarTreino(), Env, fetch(), Mensagem, MENSALIDADE, TREINO, Aviso, bytesOk() (+11 more)

### Community 43 - "TabDivisao.tsx"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+6 more)

### Community 44 - "montarPdf"
Cohesion: 0.40
Nodes (3): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, montarPdf()

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "react"
Cohesion: 0.16
Nodes (19): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+11 more)

### Community 47 - "log.ts"
Cohesion: 0.14
Nodes (28): Peças, arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+20 more)

### Community 48 - "vigia.test.ts"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.22
Nodes (11): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), registrarAgendamento(), AGORA (+3 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.09
Nodes (28): agora, alunos, linha, meso, mesos, registros, comVolta(), ARQUIVADO_DIAS (+20 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "ref_node_fs"
Cohesion: 0.15
Nodes (6): ALUNO, COACH, semearFormatoAntigo(), CAINDO, COACH, criarAluno()

### Community 55 - "package.json"
Cohesion: 0.17
Nodes (11): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+3 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "App.tsx"
Cohesion: 0.19
Nodes (23): `src/features/privacidade/` — Política e Aceite, App(), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+15 more)

### Community 58 - "App.tsx"
Cohesion: 0.19
Nodes (21): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+13 more)

### Community 59 - "vigia.test.ts"
Cohesion: 0.22
Nodes (4): app, auth, COLECOES, db

### Community 60 - "firebase-admin"
Cohesion: 0.13
Nodes (10): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), ALUNO (+2 more)

### Community 61 - "ui.tsx"
Cohesion: 0.13
Nodes (29): Logo(), react, AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem() (+21 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.16
Nodes (30): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+22 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "MinhaConta"
Cohesion: 0.13
Nodes (19): `src/lib/` — Firestore, estado, cálculos com dados, Evolucao, MesoEvolucao, RegistroEvolucao, arred(), cicloTerminou(), diasDesdeFim(), fimISO() (+11 more)

### Community 65 - "icones.tsx"
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
Cohesion: 0.33
Nodes (11): Onde mexer para…, CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio() (+3 more)

### Community 74 - "Entrar.tsx"
Cohesion: 0.20
Nodes (16): Entrar(), enviar(), voltar(), mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar(), resolverMfa() (+8 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "AvisoIOS"
Cohesion: 0.10
Nodes (21): COACH, ALUNO, COACH, COACH, ALUNO, COACH, ALUNO, COACH (+13 more)

### Community 77 - "Descanso"
Cohesion: 0.38
Nodes (3): CacheAcesso, Descanso, ParVapid

### Community 78 - "metricas.ts"
Cohesion: 0.13
Nodes (26): mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+18 more)

### Community 79 - "vidro.tsx"
Cohesion: 0.21
Nodes (16): Peças compartilhadas (já no código), motion, Atalho, marcarVisto(), Onboarding(), Pronto(), Icone, IcSeta (+8 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "relatorio.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, PNG

### Community 83 - "vitest"
Cohesion: 0.18
Nodes (8): cors(), ORIGENS, vitest, arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "TabProgressao.tsx"
Cohesion: 0.22
Nodes (14): AlvoVolume, Preview(), AjustarVolume(), aplicar(), fmt(), Modo, Previa, resumo() (+6 more)

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "Árvore por pasta"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 92 - "TutorialCoach.tsx"
Cohesion: 0.29
Nodes (16): Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno(), Numeros(), passos() (+8 more)

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

### Community 108 - "Coleções Firestore"
Cohesion: 0.20
Nodes (9): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `relatorios/{mesoId}` (+1 more)

### Community 110 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.20
Nodes (9): `usuarios/{uid}`, 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, 4. Entrada, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam (+1 more)

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
Cohesion: 0.18
Nodes (27): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+19 more)

### Community 120 - "CampoExercicio"
Cohesion: 0.39
Nodes (5): CampoExercicio(), buscarExercicios(), itens, norm(), nomes()

### Community 121 - "treino.test.ts"
Cohesion: 0.25
Nodes (5): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), base

### Community 122 - "sugestao.ts"
Cohesion: 0.09
Nodes (28): nomes(), cobre(), extraTempo(), prescreverSessao(), slotsDaSessao(), sufixo(), TAMANHO, base (+20 more)

### Community 136 - "main.tsx"
Cohesion: 0.33
Nodes (4): react-dom, carregar(), Features, montar()

### Community 137 - "5. Auditoria 02/10/2026 (segurança + LGPD)"
Cohesion: 0.33
Nodes (6): 5. Auditoria 02/10/2026 (segurança + LGPD), Conferido e OK, Em aberto (decisão do Victor), LGPD (feito nesta auditoria), Passos do Victor (console, uma vez), Repositório público (22/10/2026)

### Community 138 - "6. Monitoramento (alertas)"
Cohesion: 0.33
Nodes (6): 6. Monitoramento (alertas), Alertas automáticos (Vigia de segurança), Cloudflare (notificação de descanso), Dependabot, Procedimento ao receber alerta, Proteção contra cobrança

### Community 139 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 140 - "AvisoNotificacoes.tsx"
Cohesion: 0.83
Nodes (3): AvisoNotificacoes(), permissao(), IcSino

### Community 141 - "Nota"
Cohesion: 1.00
Nodes (3): `notas/{alunoId}`, Nota(), salvarNota()

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 833 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `push.ts`, `TutorialCoach.tsx`, `ataques.test.ts`, `ImportarPlanilha.tsx`, `InicioAluno.tsx`, `Hoje.tsx`, `seriesDoRotulo`, `EditarTreino.tsx`, `atualizar.ts`, `evolucao.ts`, `engine/index.ts`, `Alunos.tsx`, `Alertas.tsx`, `limparEmuladores`, `MinhaConta.tsx`, `ehRecorde`, `prints.spec.ts`, `criarAluno`, `jwt.ts`, `GuiaMetodos.tsx`, `agenda.ts`, `cartaoStory.ts`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `webpush.ts`, `progressao.test.ts`, `validar.ts`, `montarPdf`, `react`, `vigia.test.ts`, `src/acesso.ts`, `alertas.ts`, `package.json`, `vigia.test.ts`, `ui.tsx`, `TabMetodos.tsx`, `MinhaConta`, `src/index.ts`, `Entrar.tsx`, `limpeza-lgpd.test.ts`, `metricas.ts`, `codigoPix`, `TabProgressao.tsx`, `aluno-exemplo.test.ts`, `CampoExercicio`, `treino.test.ts`, `sugestao.ts`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Are the 103 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 103 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06078316773816481 - nodes in this community are weakly interconnected._
- **Why does `react` connect `ui.tsx` to `push.ts`, `TutorialCoach.tsx`, `ImportarPlanilha.tsx`, `InicioAluno.tsx`, `main.tsx`, `AlunoApp.tsx`, `EditarTreino.tsx`, `BoasVindas.tsx`, `AvisoNotificacoes.tsx`, `resumo.test.ts`, `evolucao.ts`, `Alunos.tsx`, `Alertas.tsx`, `MinhaConta.tsx`, `Treino.tsx`, `MinhaConta.tsx`, `ContaAluno.tsx`, `criarAluno`, `GuiaMetodos.tsx`, `CardioHoje.tsx`, `inatividade.ts`, `package.json`, `App.tsx`, `App.tsx`, `TabMetodos.tsx`, `src/index.ts`, `metricas.ts`, `vidro.tsx`, `TabProgressao.tsx`, `TutorialCoach.tsx`, `MesosDoAluno.tsx`, `CampoExercicio`, `sugestao.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._