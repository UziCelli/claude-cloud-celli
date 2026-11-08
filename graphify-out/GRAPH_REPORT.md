# Graph Report - claude-cloud-celli  (2026-11-08)

## Corpus Check
- 279 files · ~264,161 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2174 nodes · 6381 edges · 132 communities (117 shown, 15 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 301 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a5f44e0d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- TutorialCoach.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- TabDivisao.tsx
- `src/lib/` — Firestore, estado, cálculos com dados
- Hoje.tsx
- Tutorial.tsx
- EditarTreino.tsx
- BoasVindas.tsx
- VisaoSemana.tsx
- cartaoRelatorio.ts
- TabProgressao.tsx
- Alunos.tsx
- Alertas.tsx
- lib/acesso.ts
- acoes.ts
- Coleções Firestore
- Treino.tsx
- Botao
- prints.spec.ts
- ContaAluno.tsx
- FimTreino.tsx
- jwt.ts
- notasMetodo.ts
- Estado da sessão (retomada) — atualizado em 08/11/2026
- InicioAluno.tsx
- Monitoramento.tsx
- acoes.ts
- cartaoStory.ts
- settings.json
- @playwright/test
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- criarRegistro
- react
- Meso
- metricas.ts
- validar.ts
- Árvore por pasta
- pdfRelatorio.ts
- devDependencies
- Onde fica cada coisa
- evolucao.ts
- FimTreino.tsx
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/acesso.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- criarAluno
- package.json
- scripts
- ui.tsx
- Presencial.tsx
- vigia.test.ts
- criarMeso
- ui.tsx
- engine/index.ts
- Motion / Framer Motion Examples
- relatorio.test.ts
- Plano — Entrega 4: registro de erros e segurança
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- cardio.ts
- Entrar.tsx
- limpeza-lgpd.test.ts
- criarCoach
- src/index.ts
- Cartao
- relatorio.ts
- PagarPix.tsx
- importar-meso.mjs
- criarRegistro
- atualizar.ts
- overrides
- calcularAlertas.test.ts
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- tutorial.spec.ts
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
- EditorMeso.tsx
- prescreverSessao
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- main.tsx
- marca.test.ts

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

## Communities (132 total, 15 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (50): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Contrato do Worker (+42 more)

### Community 1 - "TutorialCoach.tsx"
Cohesion: 0.14
Nodes (26): Slot, CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+18 more)

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

### Community 6 - "TabDivisao.tsx"
Cohesion: 0.09
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaMesoFalsa() (+32 more)

### Community 7 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.14
Nodes (19): `src/lib/` — Firestore, estado, cálculos com dados, comVolta(), dataDe(), Dia, DIAS_AUTO, diasDaSemana(), feitoEm(), Proximo (+11 more)

### Community 8 - "Hoje.tsx"
Cohesion: 0.18
Nodes (13): painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1, meso() (+5 more)

### Community 9 - "Tutorial.tsx"
Cohesion: 0.11
Nodes (41): Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos(), Selo() (+33 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.12
Nodes (27): adicionarExercicio(), adicionarMetodo(), ESCOPOS, escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+19 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.18
Nodes (25): `src/features/instalar/` — PWA/Android, Logo(), BoasVindas(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS, copiarLink() (+17 more)

### Community 12 - "VisaoSemana.tsx"
Cohesion: 0.17
Nodes (28): firebase, Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto, VisaoSemana() (+20 more)

### Community 13 - "cartaoRelatorio.ts"
Cohesion: 0.18
Nodes (18): C, H, pngDe(), W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio() (+10 more)

### Community 14 - "TabProgressao.tsx"
Cohesion: 0.15
Nodes (25): cobre(), extraTempo(), linhaPrescrita(), metodosDaSessao(), prescreverSessao(), sufixo(), TAMANHO, AlvoVolume (+17 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.09
Nodes (40): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+32 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.12
Nodes (33): `src/features/coach/` — App do coach, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+25 more)

### Community 17 - "lib/acesso.ts"
Cohesion: 0.19
Nodes (14): fimDoDiaSaoPaulo(), Foto, inicioDoDiaSP(), liberado(), proximoVencimento(), Usuario, AlunoComId, msSessao() (+6 more)

### Community 18 - "acoes.ts"
Cohesion: 0.09
Nodes (41): trocarSenha(), PagarPix(), reais(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez() (+33 more)

### Community 19 - "Coleções Firestore"
Cohesion: 0.05
Nodes (40): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `registros/{regId}` (+32 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.11
Nodes (35): `notas/{alunoId}`, AvisoNotificacoes(), permissao(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), hms(), Modal() (+27 more)

### Community 21 - "Botao"
Cohesion: 0.20
Nodes (17): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas(), estavel() (+9 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (11): ANTES, DIAS_AUTO, ids, marca, NOMES, PROIBIDO, T1, T2 (+3 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.23
Nodes (16): Chave(), ContaAluno(), escolherFoto(), desde(), Linha(), Mensalidade(), Peso(), dataCurta() (+8 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.19
Nodes (13): CONFETE, dur(), FimTreino(), escolher(), Lista(), DadosTreino, IcCamera, IcSubir (+5 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "notasMetodo.ts"
Cohesion: 0.24
Nodes (8): COR_METODO, metodoDoRotulo(), METODOS, ORDEM, dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 27 - "Estado da sessão (retomada) — atualizado em 08/11/2026"
Cohesion: 0.08
Nodes (25): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+17 more)

### Community 28 - "InicioAluno.tsx"
Cohesion: 0.16
Nodes (34): `src/features/aluno/` — App do aluno, CardioHoje(), AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada() (+26 more)

### Community 29 - "Monitoramento.tsx"
Cohesion: 0.18
Nodes (16): BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao, dataCurta(), EvolucaoAluno(), EvolucaoCoach(), Faixa() (+8 more)

### Community 30 - "acoes.ts"
Cohesion: 0.39
Nodes (7): Editor(), liberarRelatorio(), recolherRelatorio(), relatorio(), salvarRelatorio(), authCadastro(), protegerApp()

### Community 31 - "cartaoStory.ts"
Cohesion: 0.18
Nodes (22): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, ajustar(), caixa(), carregarImagem() (+14 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "@playwright/test"
Cohesion: 0.10
Nodes (14): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+6 more)

### Community 34 - "conversores.ts"
Cohesion: 0.14
Nodes (24): Pontos sensíveis (leia antes de auditar ou mexer), nadaPassaDaTela(), FestaRecorde(), cancelarTreino(), arred(), caminhoCarga(), CargasDoc, deMapa() (+16 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.18
Nodes (16): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), criptografar(), Efemera (+8 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "criarRegistro"
Cohesion: 0.15
Nodes (14): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ALUNO, COACH, confere(), semTransbordar(), diasAtras(), registros() (+6 more)

### Community 39 - "react"
Cohesion: 0.15
Nodes (21): `src/features/privacidade/` — Política e Aceite, react, sairAgora(), sairAgora(), Aceite(), CaixaAceite(), Lista(), Politica() (+13 more)

### Community 40 - "Meso"
Cohesion: 0.09
Nodes (19): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), igual(), Linhas, migrarProgressao(), antigo() (+11 more)

### Community 41 - "metricas.ts"
Cohesion: 0.29
Nodes (12): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+4 more)

### Community 42 - "validar.ts"
Cohesion: 0.23
Nodes (13): fetch(), bytesOk(), hostOk(), HOSTS, Inscricao, nomeDO(), auth, boa (+5 more)

### Community 43 - "Árvore por pasta"
Cohesion: 0.14
Nodes (14): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+6 more)

### Community 44 - "pdfRelatorio.ts"
Cohesion: 0.26
Nodes (9): `src/features/relatorio/` — Relatório do fim do ciclo, icone(), prepararFontes(), disp(), EntradaPdf, gerarPdfRelatorio(), quebrar(), sans() (+1 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.16
Nodes (19): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+11 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.15
Nodes (25): diaSP(), arred(), calcular(), cargasPositivas(), coletar(), conquistas(), diaInicio(), Evolucao (+17 more)

### Community 48 - "FimTreino.tsx"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/acesso.ts"
Cohesion: 0.24
Nodes (11): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), AGORA (+3 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.14
Nodes (20): ARQUIVADO_DIAS, arquivadosVencidos(), DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS, MIN_ABAIXO (+12 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "criarAluno"
Cohesion: 0.15
Nodes (6): ALUNO, COACH, semearFormatoAntigo(), CAINDO, COACH, criarAluno()

### Community 55 - "package.json"
Cohesion: 0.17
Nodes (11): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+3 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "ui.tsx"
Cohesion: 0.11
Nodes (38): Peças compartilhadas (já no código), motion, react-dom, App(), ativaAba(), Coach(), Menu(), PerfilDemora() (+30 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.19
Nodes (21): `src/` — Raiz, Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente() (+13 more)

### Community 59 - "vigia.test.ts"
Cohesion: 0.22
Nodes (4): app, auth, COLECOES, db

### Community 60 - "criarMeso"
Cohesion: 0.13
Nodes (10): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), ALUNO (+2 more)

### Community 61 - "ui.tsx"
Cohesion: 0.27
Nodes (8): agil, elastico, saida, suave, camada, desliza, estilos, reduzida

### Community 62 - "engine/index.ts"
Cohesion: 0.19
Nodes (29): `src/engine/` — Motor de cálculo puro (sem React/Firebase), alternarSerieDropset(), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo (+21 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "relatorio.test.ts"
Cohesion: 0.17
Nodes (9): MesoEvolucao, RegistroEvolucao, agora, linha, m0, m1, meso(), registros (+1 more)

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

### Community 73 - "cardio.ts"
Cohesion: 0.27
Nodes (9): Onde mexer para…, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio(), rotuloCardio(), TipoCardio (+1 more)

### Community 74 - "Entrar.tsx"
Cohesion: 0.19
Nodes (19): deveMostrarBoasVindas(), ler(), Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar() (+11 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarCoach"
Cohesion: 0.10
Nodes (21): COACH, ALUNO, COACH, COACH, ALUNO, COACH, ALUNO, COACH (+13 more)

### Community 77 - "src/index.ts"
Cohesion: 0.17
Nodes (11): CacheAcesso, registrarAgendamento(), Descanso, Env, Mensagem, MENSALIDADE, TREINO, Aviso (+3 more)

### Community 78 - "Cartao"
Cohesion: 0.12
Nodes (23): mediana(), metaCiclo(), metaRobusta(), divisao, meso, Registros, Sessao, Preview() (+15 more)

### Community 79 - "relatorio.ts"
Cohesion: 0.33
Nodes (10): Peças, historicoExercicios(), recordesDe(), treinosFeitos(), arred(), diasDesdeFim(), fimISO(), RELATORIO_DIAS (+2 more)

### Community 80 - "PagarPix.tsx"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "criarRegistro"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, PNG

### Community 83 - "atualizar.ts"
Cohesion: 0.20
Nodes (7): cors(), ORIGENS, vitest, atualizarNaEntrada(), deveRecarregar(), versaoDisponivel(), confirmarNumero()

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "calcularAlertas.test.ts"
Cohesion: 0.22
Nodes (7): agora, alunos, linha, meso, mesos, registros, chaveAlerta

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "tutorial.spec.ts"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

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

### Community 119 - "EditorMeso.tsx"
Cohesion: 0.18
Nodes (27): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+19 more)

### Community 122 - "prescreverSessao"
Cohesion: 0.13
Nodes (20): slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm() (+12 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 833 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `atualizar.ts` to `push.ts`, `TutorialCoach.tsx`, `ataques.test.ts`, `TabDivisao.tsx`, ``src/lib/` — Firestore, estado, cálculos com dados`, `Hoje.tsx`, `marca.test.ts`, `EditarTreino.tsx`, `cartaoRelatorio.ts`, `TabProgressao.tsx`, `Alunos.tsx`, `Alertas.tsx`, `lib/acesso.ts`, `acoes.ts`, `Treino.tsx`, `prints.spec.ts`, `FimTreino.tsx`, `jwt.ts`, `notasMetodo.ts`, `InicioAluno.tsx`, `cartaoStory.ts`, `conversores.ts`, `webpush.ts`, `Meso`, `metricas.ts`, `validar.ts`, `pdfRelatorio.ts`, `Onde fica cada coisa`, `FimTreino.tsx`, `src/acesso.ts`, `alertas.ts`, `package.json`, `vigia.test.ts`, `engine/index.ts`, `relatorio.test.ts`, `cardio.ts`, `Entrar.tsx`, `limpeza-lgpd.test.ts`, `Cartao`, `PagarPix.tsx`, `calcularAlertas.test.ts`, `aluno-exemplo.test.ts`, `marca.test.ts`, `prescreverSessao`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Are the 103 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 103 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06078316773816481 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `push.ts`, `TutorialCoach.tsx`, `TabDivisao.tsx`, `Tutorial.tsx`, `EditarTreino.tsx`, `BoasVindas.tsx`, `VisaoSemana.tsx`, `cartaoRelatorio.ts`, `TabProgressao.tsx`, `Alunos.tsx`, `Alertas.tsx`, `acoes.ts`, `Treino.tsx`, `Botao`, `ContaAluno.tsx`, `FimTreino.tsx`, `notasMetodo.ts`, `InicioAluno.tsx`, `Monitoramento.tsx`, `package.json`, `ui.tsx`, `Presencial.tsx`, `ui.tsx`, `engine/index.ts`, `Entrar.tsx`, `Cartao`, `EditorMeso.tsx`, `prescreverSessao`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `TutorialCoach.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1443850267379679 - nodes in this community are weakly interconnected._