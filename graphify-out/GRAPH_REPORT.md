# Graph Report - claude-cloud-celli  (2026-11-08)

## Corpus Check
- 278 files · ~261,024 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 3, (none) 2, .ico 2)

## Summary
- 2159 nodes · 6274 edges · 143 communities (128 shown, 15 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 283 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2dc76258`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- ui.tsx
- ataques.test.ts
- Lógica da planilha "Força 2027.1" — especificação do motor
- extrair_planilha.py
- Motion & Framer Motion
- planilha.ts
- RelatorioCoach.tsx
- Hoje.tsx
- AlunoApp.tsx
- engine/index.ts
- Instalar.tsx
- lib/acesso.ts
- relatorio.ts
- engine/index.ts
- Botao
- Alertas.tsx
- criarMeso
- MesosDoAluno.tsx
- ui.tsx
- Treino.tsx
- alertas.ts
- prints.spec.ts
- ContaAluno.tsx
- criarCoach
- jwt.ts
- Segurança — passos do Victor no console
- Estado da sessão (retomada) — atualizado em 13/10/2026
- `src/lib/` — Firestore, estado, cálculos com dados
- evolucao.test.ts
- EditorMeso.tsx
- cartaoStory.ts
- settings.json
- coach.spec.ts
- Pontos sensíveis (leia antes de auditar ou mexer)
- aluno-exemplo.mjs
- webpush.ts
- seed.ts
- fmtMin
- cartaoStory.ts
- evolucao.ts
- CardioHoje.tsx
- validar.ts
- icones.tsx
- Meso
- devDependencies
- pesoCorporal.ts
- FimTreino.tsx
- vitest
- criarAluno
- src/acesso.ts
- compilerOptions
- Hoje.tsx
- Plano — App da Gislane (segunda marca)
- ref_node_fs
- package.json
- scripts
- icones.tsx
- App.tsx
- ref_node_fs
- criarCoach
- Entrar.tsx
- TabMetodos.tsx
- Motion / Framer Motion Examples
- descanso.ts
- Plano — Entrega 4: registro de erros e segurança
- Plano — volume (progressão/redução), treino do dia, PC, carga fantasma, novidades
- compilerOptions
- vite.config.ts
- vigia.mjs
- Motion & Framer Motion - Complete API Reference
- Hooks
- Plano — Entrega 1 (aprovado pelo Victor)
- src/index.ts
- Entrar
- limpeza-lgpd.test.ts
- evolucao.test.ts
- fetch
- Monitoramento.tsx
- prescreverSessao
- codigoPix
- importar-meso.mjs
- FimTreino.tsx
- descanso.ts
- overrides
- rules.test.ts
- erros.mjs
- limpeza-lgpd.mjs
- Performance Optimization
- pwa-assets.config.ts
- Logo
- aluno-exemplo.test.ts
- GuiaMetodos.tsx
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
- avisos-pagamento.mjs
- Navigation Menus
- List Animations
- Shared Element Transitions
- Complex Gestures
- Form Animations
- Variants
- Event Info Types
- Layout Props
- Botao
- Presencial.tsx
- PagarPix.tsx
- SugestaoTempo.tsx
- .claude/CLAUDE.md
- session-start.sh
- android-teste.sh
- motion
- Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta
- marcas_vfit_marca
- Push do descanso (Entrega 3b)
- varredura.spec.ts
- Plano — Painel de Evolução (03/10/2026)
- Notificações: mensalidade e treino pronto (13/10/2026)
- AvisoNotificacoes.tsx
- seriesDoRotulo

## God Nodes (most connected - your core abstractions)
1. `Pontos sensíveis (leia antes de auditar ou mexer)` - 98 edges
2. `Botao()` - 83 edges
3. `Treino()` - 75 edges
4. `vitest` - 61 edges
5. `prescreverSessao()` - 57 edges
6. `react` - 56 edges
7. `Meso` - 49 edges
8. `Cartao()` - 44 edges
9. `registrarErro()` - 41 edges
10. `firebase` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Pontos sensíveis (leia antes de auditar ou mexer)` --references--> `nadaPassaDaTela()`  [INFERRED]
  docs/mapa.md → e2e/layout.spec.ts
- `9. Registro do aluno` --references--> `repsEfetivas()`  [INFERRED]
  docs/logica-planilha.md → src/engine/metricas.ts
- `1. Registro de erros ("Erros do app")` --references--> `mensagem()`  [INFERRED]
  docs/plano-entrega4.md → src/features/auth/AcaoEmail.tsx
- ``src/features/auth/` — Autenticação` --references--> `useSair()`  [INFERRED]
  docs/mapa.md → src/features/auth/BotaoSair.tsx
- `Convenção de gravação (TOTAL)` --references--> `LoadInput()`  [INFERRED]
  docs/peso-corporal.md → src/features/coach/semana/LoadInput.tsx

## Import Cycles
- None detected.

## Communities (143 total, 15 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.18
Nodes (22): AvisoDescanso(), agendarPush(), avisarTreinoPronto(), avisosCoachLigados(), avisosLigados(), b64uParaBytes(), BASE, cabecalhosPush() (+14 more)

### Community 1 - "ui.tsx"
Cohesion: 0.12
Nodes (24): react, Aba, ABAS, DIAS_SEMANA, EditorMeso(), atualizar(), salvar(), setSemanas() (+16 more)

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

### Community 6 - "planilha.ts"
Cohesion: 0.09
Nodes (39): ImportarPlanilha(), escolher(), importar(), trocarAba(), Previa(), nomeImportado(), abaMesoFalsa(), Cel (+31 more)

### Community 7 - "RelatorioCoach.tsx"
Cohesion: 0.20
Nodes (21): dadosCartaoRelatorio(), volumeTexto(), Bloco(), BotaoPdf(), Faixa(), Numero(), Relatorio(), RelatorioAluno() (+13 more)

### Community 8 - "Hoje.tsx"
Cohesion: 0.30
Nodes (9): Hoje(), Msg(), RegistroFlag, Semana(), diaCurto(), DIAS_CURTO, mesoAtual(), quando() (+1 more)

### Community 9 - "AlunoApp.tsx"
Cohesion: 0.06
Nodes (65): `.github/workflows/` — CI/CD, `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`), `public/` (comum às marcas), `push/` — Worker Cloudflare (notificação do descanso), Raiz, `src/data/` — Dados estáticos, `src/features/auth/` — Autenticação, `src/features/conta/` — Minha Conta (+57 more)

### Community 10 - "engine/index.ts"
Cohesion: 0.14
Nodes (26): adicionarExercicio(), adicionarMetodo(), alternarSerieDropset(), escoposPara(), iniciarEdicao(), mudarSeries(), removerExercicio(), removerMetodo() (+18 more)

### Community 11 - "Instalar.tsx"
Cohesion: 0.18
Nodes (25): `src/features/instalar/` — PWA/Android, BoasVindas(), FolhaIPhone(), Linha(), marcarBoasVindasVistas(), VANTAGENS, copiarLink(), eAndroid() (+17 more)

### Community 12 - "lib/acesso.ts"
Cohesion: 0.19
Nodes (15): firebase, faltaSegundoFator(), fimDoDiaSaoPaulo(), inicioDoDiaSP(), liberado(), proximoVencimento(), Usuario, AlunoComId (+7 more)

### Community 13 - "relatorio.ts"
Cohesion: 0.12
Nodes (21): Peças, r, historicoExercicios(), MesoEvolucao, recordesDe(), treinosFeitos(), arred(), cicloTerminou() (+13 more)

### Community 14 - "engine/index.ts"
Cohesion: 0.16
Nodes (22): ESCOPOS, linhaPrescrita(), AlvoVolume, ajustarSeries(), aplicar(), limiteDe(), Linha, progressaoAutomatica() (+14 more)

### Community 15 - "Botao"
Cohesion: 0.09
Nodes (42): Aluno, Alunos(), bloquear(), confirmarPix(), liberar(), reativar(), Chip(), comparar() (+34 more)

### Community 16 - "Alertas.tsx"
Cohesion: 0.12
Nodes (25): abertura(), Acoes(), Alertas(), CartaoAbaixo(), Grupo(), rotulo, Saindo(), textoAbaixo() (+17 more)

### Community 17 - "criarMeso"
Cohesion: 0.19
Nodes (8): ALUNO, meso(), prog, ALUNO, COACH, diasAtras(), semear(), criarMeso()

### Community 18 - "MesosDoAluno.tsx"
Cohesion: 0.21
Nodes (23): NovoAluno(), enviar(), mesoPadrao(), CartaoMeso(), DarAcesso(), enviar(), dataBr(), FormDuplicar() (+15 more)

### Community 19 - "ui.tsx"
Cohesion: 0.10
Nodes (19): 1. Identity Platform (liga a verificação em 2 etapas), 2. Proteção contra enumeração de e-mail (feito), 2b. URL de ação dos e-mails (/acao), 3. App Check (reCAPTCHA Enterprise, invisível), 4. Restringir a chave da API, 5. Auditoria 02/10/2026 (segurança + LGPD), 6. Monitoramento (alertas), 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h) (+11 more)

### Community 20 - "Treino.tsx"
Cohesion: 0.16
Nodes (26): `notas/{alunoId}`, metodoDoRotulo(), CONFETE, Nota(), Novidades(), RegistroFlag, Treino(), IcInfo (+18 more)

### Community 21 - "alertas.ts"
Cohesion: 0.18
Nodes (20): 09/10/2026 — Segurança, movimento e aba Conta, DuasEtapas(), tentar(), erros, mensagemErro(), MinhaConta(), sairAgora(), trocarEmail() (+12 more)

### Community 22 - "prints.spec.ts"
Cohesion: 0.08
Nodes (15): Regras gerais, Divisão (agentes Sonnet; ninguém no mesmo arquivo), ANTES, DIAS_AUTO, diasAtras(), ids, marca, NOMES (+7 more)

### Community 23 - "ContaAluno.tsx"
Cohesion: 0.17
Nodes (20): `src/features/aluno/` — App do aluno, Avatar(), iniciais(), Chave(), ContaAluno(), escolherFoto(), desde(), Linha() (+12 more)

### Community 24 - "criarCoach"
Cohesion: 0.10
Nodes (18): COACH, ALUNO, COACH, ALUNO, COACH, PNG, COACH, ALUNO (+10 more)

### Community 25 - "jwt.ts"
Cohesion: 0.13
Nodes (22): abrir(), agoraOk(), caches, chaveDaConta(), chaveDe(), chaveDoGoogle(), Claims, maxAgeDe() (+14 more)

### Community 26 - "Segurança — passos do Victor no console"
Cohesion: 0.43
Nodes (4): dispensarNota(), mostrarNotasDeNovo(), notaDispensada(), SEQUENCIA

### Community 27 - "Estado da sessão (retomada) — atualizado em 13/10/2026"
Cohesion: 0.07
Nodes (24): 03/10/2026, 03/10/2026 (tarde) — App da Gislane, 04/10/2026 — Gislane no ar, 04/11/2026 — Editar o treino na hora (presencial), 04/11/2026 — Login que não cai, 2FA menos vezes e concluir com confirmação, 07/10/2026, 08/10/2026 — Redesenho (PR 56), 08/11/2026 — Aba Métodos mais simples (editor do meso) (+16 more)

### Community 28 - "`src/lib/` — Firestore, estado, cálculos com dados"
Cohesion: 0.12
Nodes (23): `registros/{regId}`, `src/lib/` — Firestore, estado, cálculos com dados, 7. Teste de ataques (03/10/2026), diaSP(), cargaVolta(), comVolta(), dataDe(), Dia (+15 more)

### Community 29 - "evolucao.test.ts"
Cohesion: 0.33
Nodes (11): Onde mexer para…, CardioHoje(), dataSP(), desfazerCardio(), registrarCardio(), CardioDoc, diaNumero(), idCardio() (+3 more)

### Community 30 - "EditorMeso.tsx"
Cohesion: 0.10
Nodes (39): Aba, ABAS, freq(), MEDALHA, RankingAlunos(), RegistroDocCompleto, dataCurta(), EvolucaoCoach() (+31 more)

### Community 31 - "cartaoStory.ts"
Cohesion: 0.13
Nodes (35): `src/features/evolucao/` — Painel de evolução, conquistas, cartão, ajustar(), C, caixa(), carregarImagem(), desenhar(), desenharTreino(), desenharTreinoFoto() (+27 more)

### Community 32 - "settings.json"
Cohesion: 0.10
Nodes (20): effortLevel, enabledPlugins, ponytail@ponytail, superpowers@superpowers-marketplace, env, PONYTAIL_DEFAULT_MODE, extraKnownMarketplaces, ponytail (+12 more)

### Community 33 - "coach.spec.ts"
Cohesion: 0.50
Nodes (3): ALUNO, COACH, NOMES

### Community 34 - "Pontos sensíveis (leia antes de auditar ou mexer)"
Cohesion: 0.15
Nodes (17): Pontos sensíveis (leia antes de auditar ou mexer), Onde fica cada coisa, Testes, FestaRecorde(), importarMeso(), arred(), caminhoCarga(), docParaCargas() (+9 more)

### Community 35 - "aluno-exemplo.mjs"
Cohesion: 0.08
Nodes (22): 1. Progressão por exercício (acaba principal/auxiliar), 2. Sugestão de biset/triset para caber no tempo, Divisão (agentes Sonnet), Plano — Entrega 2 (fim de principal/auxiliar + encaixar o treino no tempo), [a, m, d], achados, b, db (+14 more)

### Community 36 - "webpush.ts"
Cohesion: 0.19
Nodes (18): RFC-8188, RFC-8292, b64u(), deb64u(), juntar(), Inscricao, criptografar(), Efemera (+10 more)

### Community 37 - "seed.ts"
Cohesion: 0.17
Nodes (13): ALUNO, COACH, ALUNO, COACH, marca, criarAlunoAguardando(), criarAlunoArquivado(), criarConta() (+5 more)

### Community 38 - "fmtMin"
Cohesion: 0.24
Nodes (11): EvolucaoCoach(), fmt(), LoadInput(), Chips(), CORES, RepsFeitas(), SessaoCard(), IcCheck (+3 more)

### Community 39 - "cartaoStory.ts"
Cohesion: 0.28
Nodes (12): sairAgora(), sair(), Armazem, AVISO_SAIU, cronometroRodando(), expirou(), lerUltima(), LIMITE_MIN (+4 more)

### Community 40 - "evolucao.ts"
Cohesion: 0.15
Nodes (24): arred(), calcular(), cargasPositivas(), coletar(), Conquista, conquistas(), diaInicio(), Evolucao (+16 more)

### Community 41 - "CardioHoje.tsx"
Cohesion: 0.10
Nodes (18): `arquivados/{chave}`, `cardios/{uid}_{AAAA-MM-DD}`, Coleções Firestore, Comandos e workflows, `exclusoes/{uid}`, `fotos/{uid}`, Mapa do Código — Força, `relatorios/{mesoId}` (+10 more)

### Community 42 - "validar.ts"
Cohesion: 0.26
Nodes (11): bytesOk(), hostOk(), HOSTS, nomeDO(), auth, boa, p256dh, uidOk() (+3 more)

### Community 43 - "icones.tsx"
Cohesion: 0.14
Nodes (26): Slot, CampoExercicio(), Seletor(), TabDivisao(), cartaoTreino(), commit(), copiar(), mudarPausa() (+18 more)

### Community 44 - "Meso"
Cohesion: 0.11
Nodes (15): igual(), Linhas, migrarProgressao(), antigo(), L(), slot(), todas(), TAMANHO (+7 more)

### Community 45 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @cloudflare/workers-types, firebase-admin, @firebase/rules-unit-testing, firebase-tools, @playwright/test, tailwindcss, @tailwindcss/vite (+8 more)

### Community 46 - "pesoCorporal.ts"
Cohesion: 0.20
Nodes (15): Como verificar, Convenção de gravação (TOTAL), Limites conhecidos (aceitos), Marcação automática (`corpoEhCarga`), Normalização de leitura (`normalizarCargas`), Peso do corpo nas cargas, `rebasear` e `preencherCorpo` (escrita), arred() (+7 more)

### Community 47 - "FimTreino.tsx"
Cohesion: 0.18
Nodes (15): CONFETE, dur(), FimTreino(), Lista(), BotaoCompartilhar(), clicar(), compartilharArquivo(), DadosCartao (+7 more)

### Community 48 - "vitest"
Cohesion: 0.11
Nodes (8): vitest, arquivos(), RAIZ, SCRIPTS, app, auth, COLECOES, db

### Community 49 - "criarAluno"
Cohesion: 0.15
Nodes (6): ALUNO, COACH, semearFormatoAntigo(), CAINDO, COACH, criarAluno()

### Community 50 - "src/acesso.ts"
Cohesion: 0.23
Nodes (12): acessoComCache(), appCheckOk(), Campos, lerPerfil(), lerPermissao(), liberado(), podeAvisarTreino(), registrarAgendamento() (+4 more)

### Community 51 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compilerOptions, jsx, lib, module, moduleResolution, noEmit, paths, resolveJsonModule (+6 more)

### Community 52 - "Hoje.tsx"
Cohesion: 0.13
Nodes (21): AvisoReps(), ARQUIVADO_DIAS, chaveAlerta, DEMORA_FATOR, DEMORA_MAX, DEMORA_MIN, dentro(), JANELA_DIAS (+13 more)

### Community 53 - "Plano — App da Gislane (segunda marca)"
Cohesion: 0.14
Nodes (13): 1. Mesmo código, duas marcas (não copiar o repositório), 2. Banco de dados: um projeto Firebase para cada coach, 3. Endereço (decidir antes de ela ter alunos), 4. APK Android, Andamento, Checklist antes de começar (Victor/Gislane), Cuidados, Decisões recomendadas (e por quê) (+5 more)

### Community 54 - "ref_node_fs"
Cohesion: 0.12
Nodes (10): ALUNO, COACH, ALUNO, COACH, marca, ALUNO, COACH, ALUNO (+2 more)

### Community 55 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, type, version, @cloudflare/workers-types, firebase-tools, tailwindcss, @types/react (+2 more)

### Community 56 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, build:gislane, dev, dev:gislane, emuladores, icones, icones:gislane (+5 more)

### Community 57 - "icones.tsx"
Cohesion: 0.17
Nodes (22): Peças compartilhadas (já no código), InicioAluno(), Msg(), Quadros(), RelatorioPronto(), Treinos(), fmtData(), IcCadeado (+14 more)

### Community 58 - "App.tsx"
Cohesion: 0.19
Nodes (27): `src/features/coach/` — App do coach, ativaAba(), Coach(), Menu(), PerfilDemora(), Principal(), SemAcesso(), Vigia() (+19 more)

### Community 59 - "ref_node_fs"
Cohesion: 0.33
Nodes (3): ALUNO, COACH, marca

### Community 60 - "criarCoach"
Cohesion: 0.15
Nodes (9): ALUNO, COACH, iniciarEConcluir(), seg(), semear(), ALUNO, COACH, criarCoach() (+1 more)

### Community 61 - "Entrar.tsx"
Cohesion: 0.16
Nodes (20): trocarSenha(), AcaoEmail(), salvar(), ACOES, aplicados, aplicarUmaVez(), mensagem(), SENHA_FRACA (+12 more)

### Community 62 - "TabMetodos.tsx"
Cohesion: 0.20
Nodes (26): `src/engine/` — Motor de cálculo puro (sem React/Firebase), padraoMetodo(), serieDoDrop(), assinatura(), emGrupo(), limpa(), LinhaMetodo, LinhaSalva (+18 more)

### Community 63 - "Motion / Framer Motion Examples"
Cohesion: 0.18
Nodes (10): Additional Resources, Carousel with Swipe, Custom Route Transition with Direction Detection, Image Galleries, License, Lightbox Gallery, Motion / Framer Motion Examples, Multi-Stage Route Transition (+2 more)

### Community 64 - "descanso.ts"
Cohesion: 0.23
Nodes (12): Armazem, Bipe, EstadoSalvo, gravarEstado(), lerEstado(), lerSom(), marcosBipes(), Oscs (+4 more)

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

### Community 74 - "Entrar"
Cohesion: 0.18
Nodes (20): deveMostrarBoasVindas(), ler(), Entrar(), enviar(), voltar(), erros, mensagemErro(), cadastrar() (+12 more)

### Community 75 - "limpeza-lgpd.test.ts"
Cohesion: 0.20
Nodes (4): app, auth, COLECOES, db

### Community 76 - "evolucao.test.ts"
Cohesion: 0.18
Nodes (13): painelEvolucao(), agora, dia(), emSemana(), feito(), linha, m1, meso() (+5 more)

### Community 77 - "fetch"
Cohesion: 0.42
Nodes (3): Descanso, fetch(), ParVapid

### Community 78 - "Monitoramento.tsx"
Cohesion: 0.18
Nodes (18): mediana(), metaCiclo(), metaRobusta(), evolucaoExercicio(), media(), metricasExercicio(), metricasSemana(), metricasSessao() (+10 more)

### Community 79 - "prescreverSessao"
Cohesion: 0.26
Nodes (10): nomes(), cobre(), extraTempo(), prescreverSessao(), sufixo(), SemanaCarregada(), Preview(), acimaDoLimite() (+2 more)

### Community 80 - "codigoPix"
Cohesion: 0.39
Nodes (6): campo(), codigoPix(), crc16(), limparChave(), semAcento(), base

### Community 81 - "importar-meso.mjs"
Cohesion: 0.22
Nodes (6): aluno, b, db, { meso, registros }, mesoRef, nome

### Community 82 - "FimTreino.tsx"
Cohesion: 0.38
Nodes (5): ALUNO, COACH, diaISO(), diasAtras(), semear()

### Community 83 - "descanso.ts"
Cohesion: 0.70
Nodes (3): atualizarNaEntrada(), deveRecarregar(), versaoDisponivel()

### Community 84 - "overrides"
Cohesion: 0.25
Nodes (8): @grpc/grpc-js, uuid, @opentelemetry/core, overrides, basic-ftp, @firebase/firestore, gaxios, @google-cloud/pubsub

### Community 85 - "rules.test.ts"
Cohesion: 0.20
Nodes (12): @firebase/rules-unit-testing, ALUNOS, COM_FATOR, contexto(), db(), dbEmail(), fator(), futuro (+4 more)

### Community 86 - "erros.mjs"
Cohesion: 0.25
Nodes (5): corte, db, linhas, projeto, PROJETOS

### Community 87 - "limpeza-lgpd.mjs"
Cohesion: 0.25
Nodes (5): auth, corte, db, projeto, PROJETOS

### Community 88 - "Performance Optimization"
Cohesion: 0.29
Nodes (7): Exit Before Enter (Reduce Simultaneous Animations), Lazy Motion Component, Performance Optimization, Reuse Variant Objects, Throttle Scroll Events, useReducedMotion Hook, will-change Optimization

### Community 90 - "Logo"
Cohesion: 0.20
Nodes (12): `src/features/privacidade/` — Política e Aceite, Logo(), LOGO_COACH, LOGO_PARTES, LOGO_VFIT, LOGO_VIEWBOX, Aceite(), CaixaAceite() (+4 more)

### Community 91 - "aluno-exemplo.test.ts"
Cohesion: 0.22
Nodes (7): AGORA, COLECOES, db, FUTURO, plano(), SEMANA2, tudo()

### Community 92 - "GuiaMetodos.tsx"
Cohesion: 0.39
Nodes (6): COR_METODO, METODOS, ORDEM, desenhos(), IconeMetodo(), loop()

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

### Community 108 - "layout.spec.ts"
Cohesion: 0.40
Nodes (5): ALUNO, COACH, confere(), nadaPassaDaTela(), semTransbordar()

### Community 110 - "avisos-pagamento.mjs"
Cohesion: 0.24
Nodes (8): assinarJwt(), base64url(), diaBrasilia(), emMillis(), executar(), numeroDoDia(), PROJETOS, quaisAvisar()

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
Cohesion: 0.20
Nodes (12): AvisoAdaptado(), ExplicacaoMetodo(), hms(), Modal(), NotaMetodos(), RelogioTreino(), ConfirmarExclusao(), excluir() (+4 more)

### Community 120 - "Presencial.tsx"
Cohesion: 0.38
Nodes (10): Aluno(), Barra(), Folha(), Grupo(), lerGrupo(), Membro(), padrao(), primeiro() (+2 more)

### Community 121 - "PagarPix.tsx"
Cohesion: 0.31
Nodes (7): uqr, Mensalidade(), dataCurta(), PagarPix(), reais(), informarPagamento(), qrDataUrl()

### Community 122 - "SugestaoTempo.tsx"
Cohesion: 0.10
Nodes (27): 1. Configuração do mesociclo, `mesos/{mesoId}`, m(), semanas(), slotsDaSessao(), ANTAGONISTAS, aplicarSugestao(), Candidato (+19 more)

### Community 134 - "motion"
Cohesion: 0.31
Nodes (6): motion, react-dom, App(), carregar(), Features, montar()

### Community 135 - "Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta"
Cohesion: 0.25
Nodes (7): 1. Método em destaque no treino do aluno, 2. Nota de cada método (substitui o aviso atual do biset), 3. Ícones animados (um por método), 4. Guia de métodos (nova página, para aluno e coach), 5. Cronômetro de descanso que chama a pessoa de volta, Divisão (agentes Sonnet; nunca dois no mesmo arquivo), Plano — Entrega 3: métodos em destaque, guia de métodos e cronômetro que chama de volta

### Community 136 - "marcas_vfit_marca"
Cohesion: 0.29
Nodes (5): arquivos(), chaves(), PROIBIDOS, semPix(), VARS

### Community 137 - "Push do descanso (Entrega 3b)"
Cohesion: 0.29
Nodes (6): Como funciona, Limites do plano grátis (Cloudflare), Publicar e trocar a URL, Push do descanso (Entrega 3b), Segurança, Testes

### Community 139 - "Plano — Painel de Evolução (03/10/2026)"
Cohesion: 0.50
Nodes (3): Custo de leitura (plano grátis), Definições (fonte da verdade do cálculo), Plano — Painel de Evolução (03/10/2026)

### Community 140 - "Notificações: mensalidade e treino pronto (13/10/2026)"
Cohesion: 0.50
Nodes (3): Contrato do Worker, Decisões, Notificações: mensalidade e treino pronto (13/10/2026)

### Community 141 - "AvisoNotificacoes.tsx"
Cohesion: 0.83
Nodes (3): AvisoNotificacoes(), permissao(), IcSino

## Knowledge Gaps
- **10 isolated node(s):** `@cloudflare/workers-types`, `@types/react`, `@types/react-dom`, `firebase-tools`, `tailwindcss` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 830 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `push.ts`, `ataques.test.ts`, `planilha.ts`, `RelatorioCoach.tsx`, `Hoje.tsx`, `marcas_vfit_marca`, `engine/index.ts`, `lib/acesso.ts`, `relatorio.ts`, `engine/index.ts`, `Botao`, `Alertas.tsx`, `seriesDoRotulo`, `Treino.tsx`, `alertas.ts`, `ContaAluno.tsx`, `jwt.ts`, `Segurança — passos do Victor no console`, `Estado da sessão (retomada) — atualizado em 13/10/2026`, ``src/lib/` — Firestore, estado, cálculos com dados`, `evolucao.test.ts`, `cartaoStory.ts`, `Pontos sensíveis (leia antes de auditar ou mexer)`, `webpush.ts`, `validar.ts`, `icones.tsx`, `Meso`, `pesoCorporal.ts`, `src/acesso.ts`, `Hoje.tsx`, `package.json`, `TabMetodos.tsx`, `descanso.ts`, `src/index.ts`, `Entrar`, `limpeza-lgpd.test.ts`, `evolucao.test.ts`, `Monitoramento.tsx`, `prescreverSessao`, `codigoPix`, `descanso.ts`, `rules.test.ts`, `aluno-exemplo.test.ts`, `avisos-pagamento.mjs`, `PagarPix.tsx`, `SugestaoTempo.tsx`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Are the 97 inferred relationships involving `Pontos sensíveis (leia antes de auditar ou mexer)` (e.g. with `nadaPassaDaTela()` and `appCheckOk()`) actually correct?**
  _`Pontos sensíveis (leia antes de auditar ou mexer)` has 97 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@cloudflare/workers-types`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11822660098522167 - nodes in this community are weakly interconnected._
- **Why does `react` connect `ui.tsx` to `planilha.ts`, `RelatorioCoach.tsx`, `Hoje.tsx`, `AlunoApp.tsx`, `engine/index.ts`, `Instalar.tsx`, `motion`, `AvisoNotificacoes.tsx`, `engine/index.ts`, `Botao`, `Alertas.tsx`, `MesosDoAluno.tsx`, `Treino.tsx`, `alertas.ts`, `ContaAluno.tsx`, `evolucao.test.ts`, `EditorMeso.tsx`, `fmtMin`, `cartaoStory.ts`, `icones.tsx`, `FimTreino.tsx`, `package.json`, `icones.tsx`, `App.tsx`, `Entrar.tsx`, `TabMetodos.tsx`, `descanso.ts`, `Entrar`, `Logo`, `GuiaMetodos.tsx`, `Presencial.tsx`, `PagarPix.tsx`, `SugestaoTempo.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Botao()` (e.g. with `Pontos sensíveis (leia antes de auditar ou mexer)` and ``src/` — Raiz`) actually correct?**
  _`Botao()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `ataques.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._