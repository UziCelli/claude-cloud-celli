# Graph Report - claude-cloud-celli  (2026-10-22)

## Corpus Check
- 265 files · ~243,178 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2041 nodes · 5705 edges · 131 communities (115 shown, 16 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 245 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c913d6cc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- descanso.ts
- evolucao.ts
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- criarAluno
- vigia.test.ts
- firebase
- TabMetodos.tsx
- BoasVindas.tsx
- acoes.ts
- App.tsx
- registrarErro
- Alunos.tsx
- ContaAluno.tsx
- criarMeso
- MesosDoAluno.tsx
- prescreverSessao
- Treino.tsx
- MinhaConta.tsx
- prints.spec.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- criarCoach
- jwt.ts
- Logo
- sugestao.ts
- icones.tsx
- Onde fica cada coisa
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- TabProgressao.tsx
- settings.json
- resumo.ts
- movimento.ts
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- Entrar
- cartaoStory.ts
- Segurança — passos do Victor no console
- ref_node_fs
- validar.ts
- GuiaMetodos.tsx
- Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)
- devDependencies
- EditorMeso.tsx
- TabDivisao.tsx
- Push do descanso (Entrega 3b)
- metricas.ts
- src/acesso.ts
- compilerOptions
- Hoje.tsx
- Plano — App da Gislane (segunda marca)
- @playwright/test
- package.json
- scripts
- Alertas.tsx
- Presencial.tsx
- relatorio.spec.ts
- inscreverAvisos
- seriesDoRotulo
- inatividade.ts
- Motion / Framer Motion Examples
- rota.ts
- Plano — Entrega 4: registro de erros e segurança
- Notificações: mensalidade e treino pronto (13/10/2026)
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
- LoadInput
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- evolucao.spec.ts
- motion
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
2. `Pontos sensíveis (leia antes de auditar ou mexer)` - 75 edges
3. `Treino()` - 68 edges
4. `vitest` - 58 edges
5. `react` - 51 edges
6. `prescreverSessao()` - 51 edges
7. `Meso` - 47 edges
8. `Cartao()` - 46 edges
9. `firebase` - 38 edges
10. `useLista()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `Divisão (agentes Sonnet; ninguém no mesmo arquivo)` --references--> `registros()`  [INFERRED]
  docs/plano-volume.md → e2e/prints.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- ``tools/` — Scripts offline` --references--> `Meso`  [INFERRED]
  docs/mapa.md → src/engine/tipos.ts
- ``src/features/conta/` — Minha Conta` --references--> `ContaAluno()`  [INFERRED]
  docs/mapa.md → src/features/aluno/ContaAluno.tsx
- `Entregas` --references--> `normalizarCargas()`  [INFERRED]
  docs/estado-sessao.md → src/lib/conversores.ts

## Import Cycles
- None detected.

## Communities (131 total, 16 thin omitted)

### Community 0 - "descanso.ts"
Cohesion: 0.23
Nodes (12): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), Oscs (+4 more)

### Community 1 - "evolucao.ts"
Cohesion: 0.06
Nodes (59): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Peças, Plano — Painel de Evolução (03/10/2026), arred(), calcular(), cargasPositivas(), coletar() (+51 more)

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
Nodes (40): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), importarMeso(), abaMesoFalsa() (+32 more)

### Community 7 - "criarAluno"
Cohesion: 0.18
Nodes (8): ALUNO, COACH, ALUNO, COACH, iniciarEConcluir(), seg(), semear(), criarAluno()

### Community 8 - "vigia.test.ts"
Cohesion: 0.22
Nodes (4): app, auth, COLECOES, db

### Community 9 - "firebase"
Cohesion: 0.12
Nodes (41): firebase, react, Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto (+33 more)

### Community 10 - "TabMetodos.tsx"
Cohesion: 0.14
Nodes (16): Metodo, CampoNum(), ESCOPOS, FiltroSelect(), LinhaMetodo(), METODOS, padrao(), Selecao() (+8 more)

### Community 11 - "BoasVindas.tsx"
Cohesion: 0.17
Nodes (27): `src/features/instalar/` — PWA/Android, BoasVindas(), deveMostrarBoasVindas(), FolhaIPhone(), ler(), Linha(), marcarBoasVindasVistas(), VANTAGENS (+19 more)

### Community 12 - "acoes.ts"
Cohesion: 0.31
Nodes (9): Editor(), criarConta(), informarPagamento(), liberarRelatorio(), recolherRelatorio(), relatorio(), salvarRelatorio(), authCadastro() (+1 more)

### Community 13 - "App.tsx"
Cohesion: 0.31
Nodes (15): `src/features/coach/` — App do coach, ativaAba(), Menu(), PIX, useAlertasCoach(), useArquivados(), calcularAlertas(), chavesAtuais() (+7 more)

### Community 14 - "registrarErro"
Cohesion: 0.15
Nodes (19): limparArquivadosAntigos(), Contador, contarDia(), cortar(), empilhar(), enviar(), etapaCarregando(), gravar() (+11 more)

### Community 15 - "Alunos.tsx"
Cohesion: 0.14
Nodes (28): `src/features/privacidade/` — Política e Aceite, reais(), Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar() (+20 more)

### Community 16 - "ContaAluno.tsx"
Cohesion: 0.24
Nodes (15): Chave(), ContaAluno(), escolherFoto(), desde(), Mensalidade(), Peso(), dataCurta(), PagarPix() (+7 more)

### Community 17 - "criarMeso"
Cohesion: 0.15
Nodes (9): ALUNO, COACH, ALUNO, COACH, NOMES, ALUNO, meso(), prog (+1 more)

### Community 18 - "MesosDoAluno.tsx"
Cohesion: 0.14
Nodes (33): Coach(), NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), ConfirmarExclusao(), excluir(), DarAcesso() (+25 more)

### Community 19 - "prescreverSessao"
Cohesion: 0.09
Nodes (29): `src/engine/` — Motor de cálculo puro (sem React/Firebase), 1. Volume: progressão e redução (motor em `src/engine/volume.ts`, TDD), igual(), Linhas, migrarProgressao(), antigo(), L(), slot() (+21 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.14
Nodes (27): `notas/{alunoId}`, AvisoAdaptado(), CONFETE, FestaRecorde(), hms(), Nota(), Novidades(), RegistroFlag (+19 more)

### Community 21 - "MinhaConta.tsx"
Cohesion: 0.07
Nodes (40): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 09/10/2026 (noite) — Animações e calendário automático, 09/10/2026 (noite) — Pix simples, 09/10/2026 — Segurança, movimento e aba Conta (+32 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.09
Nodes (14): Regras gerais, ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES, PROIBIDO (+6 more)

### Community 23 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.19
Nodes (20): Pontos sensíveis (leia antes de auditar ou mexer), agendarPush(), avisarTreinoPronto(), avisosLigados(), b64uParaBytes(), BASE, cabecalhosPush(), cancelarPush() (+12 more)

### Community 24 - "criarCoach"
Cohesion: 0.11
Nodes (19): ALUNO, COACH, PNG, COACH, ALUNO, COACH, ALUNO, COACH (+11 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "Logo"
Cohesion: 0.27
Nodes (10): Logo(), PerfilDemora(), Principal(), SemAcesso(), useSair(), Lista(), Politica(), Secao() (+2 more)

### Community 27 - "sugestao.ts"
Cohesion: 0.24
Nodes (9): ANTAGONISTAS, Candidato, classificarEquipamento(), Equipamento, grupoDe, norm(), Plano, pontos() (+1 more)

### Community 28 - "icones.tsx"
Cohesion: 0.13
Nodes (19): AlunoApp(), marcarVisto(), PASSOS, Selo(), Tutorial(), tutorialNaoVisto(), AvisoIOS(), iOS() (+11 more)

### Community 29 - "Onde fica cada coisa"
Cohesion: 0.19
Nodes (17): Como verificar, Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Onde fica cada coisa, Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), Testes (+9 more)

### Community 30 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 31 - "TabProgressao.tsx"
Cohesion: 0.15
Nodes (24): aplicarSugestao(), sugerirMetodos(), AlvoVolume, Sessao, Preview(), Acima, LinhaAcima(), PainelSugestao() (+16 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "resumo.ts"
Cohesion: 0.15
Nodes (19): dataPadrao(), formatarData(), textoVencimento(), diasParaVencer(), faltaSegundoFator(), fimDoDiaSaoPaulo(), Foto, hojeMaisDias() (+11 more)

### Community 34 - "movimento.ts"
Cohesion: 0.47
Nodes (4): agil, confete, elastico, saida

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.10
Nodes (16): [a, m, d], achados, b, db, diaSemana, inicio, meso, mesoRef (+8 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.17
Nodes (13): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+5 more)

### Community 38 - "Entrar"
Cohesion: 0.17
Nodes (20): Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar(), confirmarLoginTotp(), entrar() (+12 more)

### Community 39 - "cartaoStory.ts"
Cohesion: 0.05
Nodes (73): 12/10/2026 — PDF real, correção não conta, modo coach, presencial em grupo, sem emoji, `src/features/evolucao/` — Painel de evolução, conquistas, cartão, `src/features/relatorio/` — Relatório do fim do ciclo, LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, CONFETE (+65 more)

### Community 40 - "Segurança — passos do Victor no console"
Cohesion: 0.11
Nodes (18): 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h), Alertas automáticos (Vigia de segurança) (+10 more)

### Community 41 - "ref_node_fs"
Cohesion: 0.13
Nodes (10): ALUNO, COACH, ALUNO, marca, lerDoc(), ALUNO, COACH, marca (+2 more)

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "GuiaMetodos.tsx"
Cohesion: 0.16
Nodes (15): COR_METODO, metodoDoRotulo(), METODOS, ORDEM, ExplicacaoMetodo(), Modal(), NotaMetodos(), GuiaMetodos() (+7 more)

### Community 44 - "Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo)"
Cohesion: 0.29
Nodes (6): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), divisao, slotId()

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "EditorMeso.tsx"
Cohesion: 0.21
Nodes (14): Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setFrequencia(), setSemanas() (+6 more)

### Community 47 - "TabDivisao.tsx"
Cohesion: 0.17
Nodes (15): CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa(), TrocasPontuais() (+7 more)

### Community 48 - "Push do descanso (Entrega 3b)"
Cohesion: 0.29
Nodes (6): Como funciona, Limites do plano grátis (Cloudflare), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 49 - "metricas.ts"
Cohesion: 0.32
Nodes (12): `registros/{regId}`, 7. Teste de ataques (03/10/2026), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao(), numeros() (+4 more)

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "Hoje.tsx"
Cohesion: 0.06
Nodes (80): Onde mexer para…, `src/features/aluno/` — App do aluno, `src/lib/` — Firestore, estado, cálculos com dados, CardioHoje(), Linha(), AvisoReps(), Hoje(), Msg() (+72 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "@playwright/test"
Cohesion: 0.15
Nodes (6): ALUNO, COACH, marca, CAINDO, COACH, @playwright/test

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "Alertas.tsx"
Cohesion: 0.15
Nodes (22): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+14 more)

### Community 58 - "Presencial.tsx"
Cohesion: 0.28
Nodes (14): Avatar(), iniciais(), Aluno(), Barra(), Folha(), Grupo(), lerGrupo(), Membro() (+6 more)

### Community 59 - "relatorio.spec.ts"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 60 - "inscreverAvisos"
Cohesion: 0.57
Nodes (6): AvisoNotificacoes(), permissao(), AvisoDescanso(), IcSino, avisosCoachLigados(), inscreverAvisos()

### Community 62 - "inatividade.ts"
Cohesion: 0.21
Nodes (14): Vigia(), sairAgora(), sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou() (+6 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "rota.ts"
Cohesion: 0.18
Nodes (15): `src/` — Raiz, campo, EsqueciSenha(), enviar(), mensagemRecuperar(), rotulo, Icone, assinar() (+7 more)

### Community 65 - "Plano — Entrega 4: registro de erros e segurança"
Cohesion: 0.18
Nodes (10): 1. Registro de erros ("Erros do app"), 2. Verificação em 2 etapas (MFA) — só para o coach, 3. Tentativas de login, 4. Desconectar por falta de uso, 5. Varredura de injeção (o "SQL injection" daqui), 6. Pendências da revisão da Entrega 3, 7. Aviso de vencimento, 8. Passos do Victor no console (eu guio um por um) (+2 more)

### Community 66 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

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
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 78 - "vitest"
Cohesion: 0.15
Nodes (11): vitest, mediana(), metaCiclo(), metaRobusta(), divisao, meso, EvolucaoCoach(), fmt() (+3 more)

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
Cohesion: 0.25
Nodes (7): 2. Tela do coach (editor do meso), 3. Treino do dia em destaque (aluno), 4. Carga fantasma, 5. Peso corporal (PC), 6. Novidades (tutorial), Divisão (agentes Sonnet; ninguém no mesmo arquivo), Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades

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

### Community 90 - "evolucao.spec.ts"
Cohesion: 0.40
Nodes (4): ALUNO, COACH, diasAtras(), semear()

### Community 91 - "motion"
Cohesion: 0.31
Nodes (6): motion, react-dom, App(), carregar(), Features, montar()

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
Cohesion: 0.15
Nodes (19): cancelarTreino(), arred(), caminhoCarga(), CargasDoc, deMapa(), docParaCargas(), docParaReps, docsParaRegistros() (+11 more)

### Community 139 - "engine/index.ts"
Cohesion: 0.31
Nodes (11): linhaPrescrita(), ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica(), reduzirVolume(), tempoPorSemana() (+3 more)

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 816 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `descanso.ts`, `evolucao.ts`, `ataques.test.ts`, `planilha.ts`, `vigia.test.ts`, `conversores.ts`, `TabMetodos.tsx`, `engine/index.ts`, `registrarErro`, `prescreverSessao`, `Treino.tsx`, `MinhaConta.tsx`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `jwt.ts`, `Onde fica cada coisa`, `TabProgressao.tsx`, `resumo.ts`, `webpush.ts`, `Entrar`, `cartaoStory.ts`, `ref_node_fs`, `validar.ts`, `GuiaMetodos.tsx`, `TabDivisao.tsx`, `metricas.ts`, `src/acesso.ts`, `Hoje.tsx`, `package.json`, `Alertas.tsx`, `seriesDoRotulo`, `inatividade.ts`, `src/index.ts`, `aluno-exemplo.test.ts`, `limpeza-lgpd.test.ts`, `calcularAlertas.test.ts`, `marca.test.ts`, `firebase-admin`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `evolucao.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.058384547848990345 - nodes in this community are weakly interconnected._
- **Why does `firebase-admin` connect `firebase-admin` to `ataques.test.ts`, `aluno-exemplo.mjs`, `firebase-admin`, `vigia.mjs`, `vigia.test.ts`, `aluno-exemplo.test.ts`, `limpeza-lgpd.test.ts`, `importar-meso.mjs`, `erros.mjs`, `package.json`, `limpeza-lgpd.mjs`, `backup.mjs`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Are the 74 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `appCheckOk()` and `lerPerfil()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 74 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._