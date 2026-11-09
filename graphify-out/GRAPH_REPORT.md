# Graph Report - claude-cloud-celli  (2026-11-09)

## Corpus Check
- 288 files · ~268,923 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2230 nodes · 6557 edges · 148 communities (132 shown, 16 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 305 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e22e52b4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- TabDivisao.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- Meso
- push.ts
- Tutorial.tsx
- EditarTreino.tsx
- icones.tsx
- PainelEvolucao.tsx
- cartaoRelatorio.ts
- prescreverSessao
- Alunos.tsx
- Alertas.tsx
- lib/acesso.ts
- acoes.ts
- Segurança — passos do Victor no console
- Treino.tsx
- EditorMeso.tsx
- prints.spec.ts
- ContaAluno.tsx
- FimTreino.tsx
- jwt.ts
- GuiaMetodos.tsx
- Estado da sessão (retomada) — atualizado em 08/11/2026
- InicioAluno.tsx
- useDoc
- ui.tsx
- cartaoStory.ts
- settings.json
- criarAluno
- conversores.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- criarMeso
- inatividade.ts
- sessao.ts
- metricas.ts
- validar.ts
- Árvore por pasta
- TutorialCoach.tsx
- devDependencies
- Onde fica cada coisa
- evolucao.ts
- firebase-admin
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- src/index.ts
- compilerOptions
- alertas.ts
- Plano — App da Gislane (segunda marca)
- iaTreino.ts
- package.json
- scripts
- App.tsx
- Presencial.tsx
- log.ts
- sair.spec.ts
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- Botao
- Plano — Entrega 4: registro de erros e segurança
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- CardioHoje.tsx
- Entrar
- limpeza-lgpd.test.ts
- criarCoach
- pdfRelatorio.ts
- SessaoCard.tsx
- Msg
- codigoPix
- importar-meso.mjs
- fotoTreino.spec.ts
- atualizar.ts
- overrides
- Politica.tsx
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- ref_node_fs
- aluno-exemplo.test.ts
- Monitoramento.tsx
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
- PagarPix.tsx
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
- layout.spec.ts
- vfit/Logo.tsx
- engine/index.ts
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- varredura.spec.ts
- seriesDoRotulo
- Campo
- Slot
- Coleções Firestore
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- vitest
- Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)
- Push do descanso (Entrega 3b)
- relatorio.spec.ts
- 5. Auditoria 02/10/2026 (segurança + LGPD)
- 6. Monitoramento (alertas)
- reduzirFoto
- Mapa do Código — Força

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 107 edges
2. `Botao()` - 87 edges
3. `Treino()` - 77 edges
4. `vitest` - 63 edges
5. `react` - 58 edges
6. `prescreverSessao()` - 57 edges
7. `Meso` - 50 edges
8. `Cartao()` - 48 edges
9. `registrarErro()` - 41 edges
10. `firebase` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``push/` — Worker Cloudflare (notificação do descanso)` --references--> `Descanso()`  [INFERRED]
  docs/mapa.md → src/features/aluno/Tutorial.tsx
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx

## Import Cycles
- None detected.

## Communities (148 total, 16 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.22
Nodes (13): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), mmss() (+5 more)

### Community 1 - "TabDivisao.tsx"
Cohesion: 0.22
Nodes (20): Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasEAdicoes(), remover() (+12 more)

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

### Community 6 - "planilha.ts"
Cohesion: 0.09
Nodes (32): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+24 more)

### Community 7 - "Meso"
Cohesion: 0.15
Nodes (20): `src/lib/` — Firestore, estado, cálculos com dados, Meso, SemanaCarregada(), cargaVolta(), comVolta(), dataDe(), Dia, DIAS_AUTO (+12 more)

### Community 8 - "push.ts"
Cohesion: 0.17
Nodes (18): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026), agendarPush(), b64uParaBytes(), BASE, cabecalhosPush(), cancelarPush() (+10 more)

### Community 9 - "Tutorial.tsx"
Cohesion: 0.31
Nodes (14): Logo(), Abas(), Botaozinho(), Cronometro(), Descanso(), Linha(), mmss(), passos() (+6 more)

### Community 10 - "EditarTreino.tsx"
Cohesion: 0.12
Nodes (29): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+21 more)

### Community 11 - "icones.tsx"
Cohesion: 0.12
Nodes (34): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+26 more)

### Community 12 - "PainelEvolucao.tsx"
Cohesion: 0.11
Nodes (38): firebase, Aba, ABAS, freq(), MEDALHA, RankingAlunos(), dataCurta(), EvolucaoAluno() (+30 more)

### Community 13 - "cartaoRelatorio.ts"
Cohesion: 0.20
Nodes (17): C, H, pngDe(), W, dadosCartaoRelatorio(), DadosRelatorio, dataBr(), gerarCartaoRelatorio() (+9 more)

### Community 14 - "prescreverSessao"
Cohesion: 0.25
Nodes (15): linhaPrescrita(), prescreverSessao(), ajustarSeries(), aplicar(), limiteDe(), Linha, polimento(), progressaoAutomatica() (+7 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.16
Nodes (25): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+17 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.14
Nodes (27): PIX, abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo() (+19 more)

### Community 17 - "lib/acesso.ts"
Cohesion: 0.19
Nodes (17): `src/features/aluno/` — App do aluno, diaSP(), diasParaVencer(), faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento() (+9 more)

### Community 18 - "acoes.ts"
Cohesion: 0.25
Nodes (14): DuasEtapas(), tentar(), erros, alterarEmail(), ativarTotp(), iniciarTotp(), reautenticar(), sincronizarEmail() (+6 more)

### Community 19 - "Segurança — passos do Victor no console"
Cohesion: 0.17
Nodes (11): `registros/{regId}`, 1. Identity Platform (liga a verificação em 2 etapas), 1b. Senha mínima no servidor (08/11/2026), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 7. Teste de ataques (03/10/2026) (+3 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.10
Nodes (40): `notas/{alunoId}`, Pontos sensíveis (leia antes de auditar ou mexer), AvisoNotificacoes(), AvisoAdaptado(), CONFETE, FestaRecorde(), hms(), Nota() (+32 more)

### Community 21 - "EditorMeso.tsx"
Cohesion: 0.16
Nodes (15): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas(), estavel() (+7 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (13): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+5 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.21
Nodes (19): permissao(), AvisoDescanso(), Chave(), ContaAluno(), escolherFoto(), desde(), Quadros(), IcCartao (+11 more)

### Community 24 - "FimTreino.tsx"
Cohesion: 0.20
Nodes (14): CONFETE, dur(), FimTreino(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+6 more)

### Community 25 - "jwt.ts"
Cohesion: 0.15
Nodes (20): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+12 more)

### Community 26 - "GuiaMetodos.tsx"
Cohesion: 0.16
Nodes (14): COR_METODO, metodoDoRotulo(), METODOS, ORDEM, ExplicacaoMetodo(), Modal(), NotaMetodos(), desenhos() (+6 more)

### Community 27 - "Estado da sessão (retomada) — atualizado em 08/11/2026"
Cohesion: 0.08
Nodes (25): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+17 more)

### Community 28 - "InicioAluno.tsx"
Cohesion: 0.21
Nodes (18): Hoje(), Msg(), RegistroFlag, Semana(), Treinos(), dataSP(), diaCurto(), DIAS_CURTO (+10 more)

### Community 29 - "useDoc"
Cohesion: 0.14
Nodes (26): aplicarProposta(), VozTreino(), aplicar(), falar(), montar(), AssistenteIA(), remover(), salvar() (+18 more)

### Community 30 - "ui.tsx"
Cohesion: 0.17
Nodes (13): react, Registros, EvolucaoCoach(), Barra(), camada, campoBase, cascata, confirmarNumero() (+5 more)

### Community 31 - "cartaoStory.ts"
Cohesion: 0.27
Nodes (16): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), caixa(), carregarImagem(), desenhar(), desenharTreino(), desenharTreinoFoto(), fundoELogo() (+8 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "criarAluno"
Cohesion: 0.08
Nodes (18): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+10 more)

### Community 34 - "conversores.ts"
Cohesion: 0.15
Nodes (22): RegistroDocCompleto, VisaoSemana(), arred(), caminhoCarga(), CargasDoc, deMapa(), docParaMeso(), docParaReps (+14 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.16
Nodes (19): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), assinar(), criptografar(), Efemera (+11 more)

### Community 37 - "seed.ts"
Cohesion: 0.16
Nodes (14): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+6 more)

### Community 38 - "criarMeso"
Cohesion: 0.11
Nodes (14): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, ALUNO (+6 more)

### Community 39 - "inatividade.ts"
Cohesion: 0.25
Nodes (13): sairAgora(), sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima() (+5 more)

### Community 40 - "sessao.ts"
Cohesion: 0.11
Nodes (17): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), cobre() (+9 more)

### Community 41 - "metricas.ts"
Cohesion: 0.27
Nodes (13): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+5 more)

### Community 42 - "validar.ts"
Cohesion: 0.22
Nodes (11): PROJETOS, Aviso, bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa (+3 more)

### Community 43 - "Árvore por pasta"
Cohesion: 0.13
Nodes (15): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+7 more)

### Community 44 - "TutorialCoach.tsx"
Cohesion: 0.17
Nodes (25): Linha(), RelatorioPronto(), Abas(), Acesso(), Acompanhar(), Meso(), Notificacao(), NovoAluno() (+17 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "Onde fica cada coisa"
Cohesion: 0.19
Nodes (17): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+9 more)

### Community 47 - "evolucao.ts"
Cohesion: 0.06
Nodes (58): Peças, arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio() (+50 more)

### Community 48 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 49 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 50 - "src/index.ts"
Cohesion: 0.14
Nodes (22): acessoComCache(), appCheckOk(), CacheAcesso, Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino() (+14 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "alertas.ts"
Cohesion: 0.09
Nodes (33): `src/features/coach/` — App do coach, AvisoReps(), calcularAlertas(), chavesAtuais(), Grupos, agora, alunos, linha (+25 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "iaTreino.ts"
Cohesion: 0.13
Nodes (17): buscarExercicios(), itens, norm(), nomes(), corpoPedido(), doCatalogo, ExercicioProposto, FERRAMENTA (+9 more)

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "App.tsx"
Cohesion: 0.12
Nodes (38): `src/` — Raiz, Peças compartilhadas (já no código), ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+30 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.23
Nodes (17): Avatar(), iniciais(), Aluno(), Barra(), EscolherAluno(), Grupo(), guardarRecente(), lerGrupo() (+9 more)

### Community 59 - "log.ts"
Cohesion: 0.11
Nodes (21): motion, react-dom, App(), Contador, contarDia(), cortar(), empilhar(), enviar() (+13 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.19
Nodes (16): AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), erros, SENHA_FRACA (+8 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.20
Nodes (26): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+18 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "Botao"
Cohesion: 0.23
Nodes (17): Preview(), Acima, LinhaAcima(), PainelSugestao(), AjustarVolume(), aplicar(), fmt(), Modo (+9 more)

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

### Community 73 - "CardioHoje.tsx"
Cohesion: 0.33
Nodes (11): Onde mexer para…, CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio() (+3 more)

### Community 74 - "Entrar"
Cohesion: 0.20
Nodes (16): Entrar(), enviar(), voltar(), mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar(), resolverMfa() (+8 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "criarCoach"
Cohesion: 0.11
Nodes (19): COACH, ALUNO, COACH, diasAtras(), semear(), COACH, ALUNO, COACH (+11 more)

### Community 77 - "pdfRelatorio.ts"
Cohesion: 0.18
Nodes (13): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/relatorio/` — Relatório do fim do ciclo, icone(), prepararFontes(), disp(), EntradaPdf, gerarPdfRelatorio(), quebrar() (+5 more)

### Community 78 - "SessaoCard.tsx"
Cohesion: 0.26
Nodes (10): Convenção de gravação (TOTAL), fmt(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), registrarCarga() (+2 more)

### Community 79 - "Msg"
Cohesion: 0.24
Nodes (14): trocarSenha(), Peso(), EsqueciSenha(), enviar(), mensagemRecuperar(), mensagemErro(), MinhaConta(), trocarEmail() (+6 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

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

### Community 85 - "Politica.tsx"
Cohesion: 0.60
Nodes (4): CaixaAceite(), Lista(), Politica(), Secao()

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

### Community 92 - "Monitoramento.tsx"
Cohesion: 0.27
Nodes (7): mediana(), metaCiclo(), metaRobusta(), divisao, meso, Cargas, Monitoramento()

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

### Community 108 - "PagarPix.tsx"
Cohesion: 0.29
Nodes (8): uqr, Mensalidade(), PixPerto(), dataCurta(), PagarPix(), reais(), informarPagamento(), qrDataUrl()

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
Cohesion: 0.19
Nodes (25): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso(), enviar() (+17 more)

### Community 120 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 121 - "vfit/Logo.tsx"
Cohesion: 0.47
Nodes (4): LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX

### Community 122 - "engine/index.ts"
Cohesion: 0.16
Nodes (18): ESCOPOS, ANTAGONISTAS, aplicarSugestao(), Candidato, classificarEquipamento(), Equipamento, grupoDe, norm() (+10 more)

### Community 136 - "Campo"
Cohesion: 0.40
Nodes (9): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaSugerida() (+1 more)

### Community 137 - "Slot"
Cohesion: 0.22
Nodes (6): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), Slot, base

### Community 138 - "Coleções Firestore"
Cohesion: 0.22
Nodes (9): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, `exclusoes/{uid}`, `fotos/{uid}`, `relatorios/{mesoId}`, `usuarios/{uid}`, 4. Entrada (+1 more)

### Community 139 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 140 - "vitest"
Cohesion: 0.32
Nodes (3): cors(), ORIGENS, vitest

### Community 141 - "Plano — Redesenho das telas secundárias (VFITCOACH + Gislane)"
Cohesion: 0.29
Nodes (6): 1. Agenda e regras da semana (lógica pura, TDD) — `src/lib/agenda.ts`, 2. App do aluno, 3. App do coach, Ordem, Plano — Redesenho das telas secundárias (VFITCOACH + Gislane), Regras que não mudam

### Community 142 - "Push do descanso (Entrega 3b)"
Cohesion: 0.29
Nodes (6): Como funciona, Limites do plano grátis (Cloudflare), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 143 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 144 - "5. Auditoria 02/10/2026 (segurança + LGPD)"
Cohesion: 0.33
Nodes (6): 5. Auditoria 02/10/2026 (segurança + LGPD), Conferido e OK, Em aberto (decisão do Victor), LGPD (feito nesta auditoria), Passos do Victor (console, uma vez), Repositório público (22/10/2026)

### Community 145 - "6. Monitoramento (alertas)"
Cohesion: 0.33
Nodes (6): 6. Monitoramento (alertas), Alertas automáticos (Vigia de segurança), Cloudflare (notificação de descanso), Dependabot, Procedimento ao receber alerta, Proteção contra cobrança

### Community 146 - "reduzirFoto"
Cohesion: 0.60
Nodes (3): escolher(), recorteCover(), reduzirFoto()

### Community 147 - "Mapa do Código — Força"
Cohesion: 0.50
Nodes (3): Comandos e workflows, Mapa do Código — Força, Rotas do app

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 846 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `descanso.ts`, `TabDivisao.tsx`, `ataques.test.ts`, `planilha.ts`, `Meso`, `seriesDoRotulo`, `push.ts`, `EditarTreino.tsx`, `Slot`, `cartaoRelatorio.ts`, `prescreverSessao`, `Alertas.tsx`, `lib/acesso.ts`, `reduzirFoto`, `acoes.ts`, `Treino.tsx`, `jwt.ts`, `GuiaMetodos.tsx`, `InicioAluno.tsx`, `ui.tsx`, `cartaoStory.ts`, `conversores.ts`, `webpush.ts`, `sessao.ts`, `metricas.ts`, `validar.ts`, `Onde fica cada coisa`, `evolucao.ts`, `firebase-admin`, `src/index.ts`, `alertas.ts`, `iaTreino.ts`, `package.json`, `Entrar.tsx`, `TabMetodos.tsx`, `Botao`, `CardioHoje.tsx`, `Entrar`, `limpeza-lgpd.test.ts`, `pdfRelatorio.ts`, `codigoPix`, `atualizar.ts`, `ref_node_fs`, `aluno-exemplo.test.ts`, `Monitoramento.tsx`, `PagarPix.tsx`, `marca.test.ts`, `engine/index.ts`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Are the 106 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 106 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._
- **Why does `react` connect `ui.tsx` to `descanso.ts`, `TabDivisao.tsx`, `Campo`, `Tutorial.tsx`, `EditarTreino.tsx`, `icones.tsx`, `PainelEvolucao.tsx`, `cartaoRelatorio.ts`, `Alunos.tsx`, `Alertas.tsx`, `acoes.ts`, `Treino.tsx`, `EditorMeso.tsx`, `ContaAluno.tsx`, `FimTreino.tsx`, `GuiaMetodos.tsx`, `InicioAluno.tsx`, `useDoc`, `conversores.ts`, `inatividade.ts`, `TutorialCoach.tsx`, `package.json`, `App.tsx`, `Presencial.tsx`, `log.ts`, `Entrar.tsx`, `TabMetodos.tsx`, `Botao`, `CardioHoje.tsx`, `Msg`, `Politica.tsx`, `PagarPix.tsx`, `MesosDoAluno.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Lógica da planilha "Força 2027.1" — especificação do motor` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._