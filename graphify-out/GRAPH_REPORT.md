# Graph Report - claude-cloud-celli  (2026-10-22)

## Corpus Check
- 264 files · ~242,513 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2036 nodes · 5688 edges · 133 communities (119 shown, 14 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 242 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d5f824e8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Hoje.tsx
- evolucao.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- alertas.ts
- vigia.test.ts
- firebase
- TabMetodos.tsx
- BoasVindas.tsx
- acoes.ts
- PainelEvolucao.tsx
- registrarErro
- Alunos.tsx
- App.tsx
- criarMeso
- MesosDoAluno.tsx
- prescreverSessao
- Treino.tsx
- Estado da sessão (retomada) — atualizado em 13/10/2026
- prints.spec.ts
- push.ts
- criarCoach
- jwt.ts
- App.tsx
- sugestao.ts
- icones.tsx
- Onde fica cada coisa
- InicioAluno.tsx
- TabProgressao.tsx
- settings.json
- resumo.ts
- ui.tsx
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- Entrar
- cartaoStory.ts
- Segurança — passos do Victor no console
- @playwright/test
- validar.ts
- GuiaMetodos.tsx
- progressao.test.ts
- devDependencies
- EditorMeso.tsx
- TabDivisao.tsx
- CardioHoje.tsx
- metricas.ts
- src/acesso.ts
- compilerOptions
- diaSP
- Plano — App da Gislane (segunda marca)
- ranking.spec.ts
- package.json
- scripts
- Alertas.tsx
- Presencial.tsx
- fotoTreino.spec.ts
- Logo
- vitest
- inatividade.ts
- Motion / Framer Motion Examples
- Entrar.tsx
- Plano — Entrega 4: registro de erros e segurança
- alertas.test.ts
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- src/index.ts
- aluno-exemplo.test.ts
- limpeza-lgpd.test.ts
- calcularAlertas.test.ts
- Descanso
- vitest
- Árvore por pasta
- marca.test.ts
- importar-meso.mjs
- firebase-admin
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- overrides
- mfa.ts
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- marca.test.ts
- evolucao.spec.ts
- motion
- busca.ts
- backup.mjs
- Best Practices Summary
- Scroll-Based Animations
- Utilities
- Gesture Props
- Transition Options
- dependencies
- firebase-admin
- Advanced Layout Animations
- Modal & Dialog Patterns
- Loading States
- Page Transitions
- Animation Props
- AnimatePresence
- Roteiro de apresentação do app
- layout.spec.ts
- gislane/Logo.tsx
- atualizar.ts
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- varredura.spec.ts
- conversores.ts
- engine/index.ts

## God Nodes (most connected - your core abstractions)
1. `Botao()` - 79 edges
2. `Pontos sensíveis (leia antes de auditar ou mexer)` - 72 edges
3. `Treino()` - 68 edges
4. `vitest` - 57 edges
5. `react` - 51 edges
6. `prescreverSessao()` - 51 edges
7. `Meso` - 47 edges
8. `Cartao()` - 46 edges
9. `firebase` - 37 edges
10. `useLista()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``tools/` — Scripts offline` --references--> `Meso`  [INFERRED]
  docs/mapa.md → src/engine/tipos.ts
- ``src/features/conta/` — Minha Conta` --references--> `ContaAluno()`  [INFERRED]
  docs/mapa.md → src/features/aluno/ContaAluno.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx
- `09/10/2026 — Segurança, movimento e aba Conta` --references--> `MinhaConta()`  [INFERRED]
  docs/estado-sessao.md → src/features/conta/MinhaConta.tsx

## Import Cycles
- None detected.

## Communities (133 total, 14 thin omitted)

### Community 0 - "Hoje.tsx"
Cohesion: 0.20
Nodes (18): `src/features/aluno/` — App do aluno, AvisoReps(), Hoje(), Msg(), RegistroFlag, Semana(), SemanaCarregada(), InicioAluno() (+10 more)

### Community 1 - "evolucao.ts"
Cohesion: 0.06
Nodes (64): `src/lib/` — Firestore, estado, cálculos com dados, Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), diaSP(), arred(), calcular() (+56 more)

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

### Community 6 - "planilha.ts"
Cohesion: 0.09
Nodes (32): abaMesoFalsa(), Cel, colNum(), criarXlsx(), criarXlsxBruto(), deflate(), enc, esc() (+24 more)

### Community 7 - "alertas.ts"
Cohesion: 0.22
Nodes (13): Entregas, ARQUIVADO_DIAS, DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS, prescrito() (+5 more)

### Community 8 - "vigia.test.ts"
Cohesion: 0.15
Nodes (6): arquivos(), RAIZ, app, auth, COLECOES, db

### Community 9 - "firebase"
Cohesion: 0.13
Nodes (31): firebase, Aba, ABAS, freq(), MEDALHA, RankingAlunos(), BotaoPdf(), RelatorioAluno() (+23 more)

### Community 10 - "TabMetodos.tsx"
Cohesion: 0.15
Nodes (15): CampoNum(), ESCOPOS, FiltroSelect(), LinhaMetodo(), METODOS, padrao(), Selecao(), TabMetodos() (+7 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.16
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "acoes.ts"
Cohesion: 0.22
Nodes (15): DuasEtapas(), erros, mensagemErro(), MinhaConta(), trocarEmail(), trocarSenha(), alterarEmail(), ativarTotp() (+7 more)

### Community 13 - "PainelEvolucao.tsx"
Cohesion: 0.17
Nodes (22): `src/features/coach/` — App do coach, useAlertasCoach(), useArquivados(), calcularAlertas(), chavesAtuais(), Inicio(), saudacao(), dataCurta() (+14 more)

### Community 14 - "registrarErro"
Cohesion: 0.20
Nodes (13): Contador, cortar(), enviar(), gravar(), iniciarLog(), Item, jaLogados, ler() (+5 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.15
Nodes (24): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+16 more)

### Community 16 - "App.tsx"
Cohesion: 0.15
Nodes (27): Avatar(), Chave(), ContaAluno(), escolherFoto(), sairAgora(), trocarSenha(), desde(), Linha() (+19 more)

### Community 17 - "criarMeso"
Cohesion: 0.12
Nodes (16): ALUNO, COACH, ALUNO, meso(), prog, ALUNO, COACH, ALUNO (+8 more)

### Community 18 - "MesosDoAluno.tsx"
Cohesion: 0.14
Nodes (35): NovoAluno(), enviar(), ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), mesoPadrao() (+27 more)

### Community 19 - "prescreverSessao"
Cohesion: 0.13
Nodes (18): cobre(), extraTempo(), prescreverSessao(), sufixo(), TAMANHO, base, ex1(), L (+10 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.10
Nodes (44): `notas/{alunoId}`, metodoDoRotulo(), AvisoAdaptado(), CONFETE, ExplicacaoMetodo(), FestaRecorde(), hms(), Modal() (+36 more)

### Community 21 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.11
Nodes (17): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 09/10/2026 (noite) — Animações e calendário automático, 09/10/2026 (noite) — Pix simples, 09/10/2026 — Segurança, movimento e aba Conta (+9 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (14): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+6 more)

### Community 23 - "push.ts"
Cohesion: 0.06
Nodes (52): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta, Contrato do Worker (+44 more)

### Community 24 - "criarCoach"
Cohesion: 0.13
Nodes (16): COACH, ALUNO, COACH, semearFormatoAntigo(), ALUNO, COACH, semear(), COACH (+8 more)

### Community 25 - "jwt.ts"
Cohesion: 0.14
Nodes (21): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+13 more)

### Community 26 - "App.tsx"
Cohesion: 0.26
Nodes (19): Pontos sensíveis (leia antes de auditar ou mexer), `src/` — Raiz, ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso() (+11 more)

### Community 27 - "sugestao.ts"
Cohesion: 0.27
Nodes (10): ANTAGONISTAS, Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano, pontos() (+2 more)

### Community 28 - "icones.tsx"
Cohesion: 0.12
Nodes (21): AlunoApp(), marcarVisto(), PASSOS, Selo(), Tutorial(), tutorialNaoVisto(), AvisoIOS(), iOS() (+13 more)

### Community 29 - "Onde fica cada coisa"
Cohesion: 0.18
Nodes (17): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita) (+9 more)

### Community 30 - "InicioAluno.tsx"
Cohesion: 0.22
Nodes (17): Peças compartilhadas (já no código), Msg(), Quadros(), RelatorioPronto(), Treinos(), IcCartao, IcFogo, IcGrafico (+9 more)

### Community 31 - "TabProgressao.tsx"
Cohesion: 0.20
Nodes (15): aplicarSugestao(), AlvoVolume, tempoPorSemana(), Acima, LinhaAcima(), PainelSugestao(), AjustarVolume(), aplicar() (+7 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "resumo.ts"
Cohesion: 0.18
Nodes (15): faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento(), Usuario, confirmarPagamento(), AlunoComId (+7 more)

### Community 34 - "ui.tsx"
Cohesion: 0.23
Nodes (11): motion, react, agil, saida, suave, camada, desliza, estilos (+3 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.08
Nodes (22): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), [a, m, d], achados, b, db (+14 more)

### Community 36 - "webpush.ts"
Cohesion: 0.20
Nodes (17): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), criptografar(), Efemera, enviarPush() (+9 more)

### Community 37 - "seed.ts"
Cohesion: 0.17
Nodes (15): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarCoach() (+7 more)

### Community 38 - "Entrar"
Cohesion: 0.20
Nodes (16): Entrar(), enviar(), voltar(), mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar(), resolverMfa() (+8 more)

### Community 39 - "cartaoStory.ts"
Cohesion: 0.06
Nodes (65): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/evolucao/` — Painel de evolução, conquistas, cartão, `src/features/relatorio/` — Relatório do fim do ciclo, iniciais(), CONFETE, dur(), FimTreino(), escolher() (+57 more)

### Community 40 - "Segurança — passos do Victor no console"
Cohesion: 0.11
Nodes (18): 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h), Alertas automáticos (Vigia de segurança) (+10 more)

### Community 41 - "@playwright/test"
Cohesion: 0.09
Nodes (17): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, COACH, marca (+9 more)

### Community 42 - "validar.ts"
Cohesion: 0.21
Nodes (14): fetch(), PROJETOS, Aviso, bytesOk(), hostOk(), HOSTS, nomeDO(), auth (+6 more)

### Community 43 - "GuiaMetodos.tsx"
Cohesion: 0.23
Nodes (8): COR_METODO, METODOS, ORDEM, Metodo, desenhos(), loop(), mostrarNotasDeNovo(), SEQUENCIA

### Community 44 - "progressao.test.ts"
Cohesion: 0.33
Nodes (7): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas()

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "EditorMeso.tsx"
Cohesion: 0.17
Nodes (19): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setFrequencia(), setSemanas() (+11 more)

### Community 47 - "TabDivisao.tsx"
Cohesion: 0.24
Nodes (11): CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasPontuais() (+3 more)

### Community 48 - "CardioHoje.tsx"
Cohesion: 0.36
Nodes (10): Onde mexer para…, CardioHoje(), IcCardio, desfazerCardio(), registrarCardio(), CardioDoc, idCardio(), rotuloCardio() (+2 more)

### Community 49 - "metricas.ts"
Cohesion: 0.30
Nodes (13): `registros/{regId}`, 7. Teste de ataques (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros() (+5 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.24
Nodes (11): acessoComCache(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento(), AGORA (+3 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "diaSP"
Cohesion: 0.13
Nodes (15): comVolta(), dataDe(), Dia, DIAS_AUTO, diasDaSemana(), feitoEm(), Proximo, Reg (+7 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 55 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, type, version, fundo, @cloudflare/workers-types, firebase-tools, tailwindcss (+5 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "Alertas.tsx"
Cohesion: 0.16
Nodes (22): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+14 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.35
Nodes (12): Aluno(), Barra(), Folha(), Grupo(), lerGrupo(), Membro(), padrao(), primeiro() (+4 more)

### Community 59 - "fotoTreino.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, PNG

### Community 60 - "Logo"
Cohesion: 0.26
Nodes (9): Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, CaixaAceite(), Lista(), Politica() (+1 more)

### Community 61 - "vitest"
Cohesion: 0.29
Nodes (4): vitest, seriesDestacadas(), seriesDoRotulo(), ehRecorde()

### Community 62 - "inatividade.ts"
Cohesion: 0.29
Nodes (10): Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN, marcar(), treinoEmAndamento() (+2 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "Entrar.tsx"
Cohesion: 0.36
Nodes (8): erros, campo, EsqueciSenha(), enviar(), mensagemRecuperar(), rotulo, voltar(), Brilho()

### Community 65 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 66 - "alertas.test.ts"
Cohesion: 0.22
Nodes (9): MIN_ABAIXO, PROPORCAO_ABAIXO, RegistroAlerta, abaixoDe3, agora, ha(), linha, meso (+1 more)

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
Cohesion: 0.27
Nodes (6): cors(), ORIGENS, Env, Mensagem, MENSALIDADE, TREINO

### Community 74 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "calcularAlertas.test.ts"
Cohesion: 0.22
Nodes (7): agora, alunos, linha, meso, mesos, registros, chaveAlerta

### Community 77 - "Descanso"
Cohesion: 0.31
Nodes (4): CacheAcesso, Descanso, Inscricao, ParVapid

### Community 78 - "vitest"
Cohesion: 0.18
Nodes (14): `src/engine/` — Motor de cálculo puro (sem React/Firebase), 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), mediana(), metaCiclo(), metaRobusta(), divisao, meso, Cargas (+6 more)

### Community 79 - "Árvore por pasta"
Cohesion: 0.06
Nodes (33): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, `.github/workflows/` — CI/CD, Mapa do Código — Força (+25 more)

### Community 80 - "marca.test.ts"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "firebase-admin"
Cohesion: 0.25
Nodes (4): firebase-admin, SCRIPTS, atual, novo

### Community 83 - "Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades"
Cohesion: 0.29
Nodes (6): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "mfa.ts"
Cohesion: 0.39
Nodes (6): tentar(), chaveManual(), codigoCompleto(), limparCodigo(), mensagemMfa(), msgs

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 89 - "marca.test.ts"
Cohesion: 0.33
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 90 - "evolucao.spec.ts"
Cohesion: 0.40
Nodes (4): ALUNO, COACH, diasAtras(), semear()

### Community 91 - "motion"
Cohesion: 0.32
Nodes (5): react-dom, App(), carregar(), Features, montar()

### Community 92 - "busca.ts"
Cohesion: 0.60
Nodes (4): buscarExercicios(), itens, norm(), nomes()

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

### Community 100 - "firebase-admin"
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

### Community 108 - "layout.spec.ts"
Cohesion: 0.50
Nodes (4): ALUNO, COACH, confere(), semTransbordar()

### Community 110 - "atualizar.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

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

### Community 137 - "conversores.ts"
Cohesion: 0.14
Nodes (19): RegistroDocCompleto, VisaoSemana(), importarMeso(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docsParaRegistros() (+11 more)

### Community 139 - "engine/index.ts"
Cohesion: 0.33
Nodes (10): linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica(), reduzirVolume(), linha8() (+2 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 814 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `Hoje.tsx`, `evolucao.ts`, `ataques.test.ts`, `planilha.ts`, `vigia.test.ts`, `conversores.ts`, `TabMetodos.tsx`, `engine/index.ts`, `acoes.ts`, `prescreverSessao`, `push.ts`, `jwt.ts`, `Onde fica cada coisa`, `TabProgressao.tsx`, `resumo.ts`, `webpush.ts`, `Entrar`, `cartaoStory.ts`, `validar.ts`, `GuiaMetodos.tsx`, `progressao.test.ts`, `CardioHoje.tsx`, `metricas.ts`, `src/acesso.ts`, `diaSP`, `package.json`, `inatividade.ts`, `alertas.test.ts`, `src/index.ts`, `aluno-exemplo.test.ts`, `limpeza-lgpd.test.ts`, `calcularAlertas.test.ts`, `vitest`, `marca.test.ts`, `firebase-admin`, `mfa.ts`, `marca.test.ts`, `busca.ts`, `atualizar.ts`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `evolucao.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05536568694463431 - nodes in this community are weakly interconnected._
- **Why does `firebase-admin` connect `firebase-admin` to `ataques.test.ts`, `aluno-exemplo.mjs`, `firebase-admin`, `vigia.mjs`, `vigia.test.ts`, `aluno-exemplo.test.ts`, `limpeza-lgpd.test.ts`, `importar-meso.mjs`, `erros.mjs`, `package.json`, `limpeza-lgpd.mjs`, `backup.mjs`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Are the 71 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `Menu()` and `Principal()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 71 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._