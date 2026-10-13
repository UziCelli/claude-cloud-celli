# Mapa do Código — Força

Comece por aqui para achar onde mexer.

## Onde mexer para…

| Tarefa | Arquivo(s) |
|--------|-----------|
| Mudar acesso/bloqueio por pagamento | `firestore.rules` + `src/lib/acesso.ts` + `tests/rules.test.ts` |
| Texto/tela de login (Entrar) | `src/features/auth/Entrar.tsx` |
| Fluxo do aluno (hoje, evolução, treino) | `src/features/aluno/` |
| Fluxo do coach (início, alunos, meso, semana) | `src/features/coach/` |
| Cálculo de reps, séries, dropset, tempo | `src/engine/sessao.ts` + `src/engine/metricas.ts` |
| Gravação de cargas/reps no Firestore | `src/lib/acoes.ts` + `firestore.rules` |
| Estrutura de dados (Meso, Registro, tipos) | `src/engine/tipos.ts` + `src/lib/conversores.ts` |
| Cores, fontes, grid | `marcas/<id>/tema.css` (escalas slate/marca) + `src/index.css` (fontes; Tailwind 4, sem tailwind.config) |
| Nome, logo, ícones, cores e dados do responsável de uma marca | `marcas/<id>/` (`marca.json` com `cores`, `tema.css`, `Logo.tsx`, `logoPaths.ts`, `public/`) |
| Cabeçalhos HTTP, CSP, PWA | `firebase.json` |
| Importar mesociclo de planilha | Botão "Importar da planilha" no perfil do aluno: `meso/ImportarPlanilha.tsx`, `lib/xlsx.ts`, `lib/planilha.ts` (reserva: `tools/planilha_para_meso.py` + `tools/importar-meso.mjs` + workflow `importar-meso.yml`) |
| Monitoramento de segurança | `tools/vigia.mjs` + `.github/workflows/vigia.yml` + `tests/vigia.test.ts` |
| Offline/sync Firebase | `src/lib/firebase.ts` + `firestore.rules` |
| Roteamento (hash, /aluno/123, etc.) | `src/rota.ts` + `src/App.tsx` |
| Notificação "Descanso acabou" (push, app fechado) | `src/lib/push.ts` + `public/sw-push.js` + `push/` (Worker Cloudflare) — veja `docs/push.md` |
| Painel de evolução, conquistas, ranking | `src/lib/evolucao.ts` + `src/features/evolucao/` + `src/features/coach/RankingAlunos.tsx` |
| Relatório do fim do ciclo (tela, PDF, story) | `src/lib/relatorio.ts` + `src/features/relatorio/` |
| PDF (canvas → arquivo) | `src/lib/pdf.ts` (`montarPdf`) + `src/features/relatorio/pdfRelatorio.ts` (+ `pdf.test.ts`) |
| Guarda contra emoji | `src/semEmoji.test.ts` (varre `src/**`; usar `src/icones.tsx`) |

## Árvore por pasta

### `src/engine/` — Motor de cálculo puro (sem React/Firebase)
- `tipos.ts` — `Meso`, `Sessao`, `Cargas`, `Registros`, `Slot`, métodos de treino
- `sessao.ts` — `calcularSessao()`: reps, séries, dropsets, progressão
- `metricas.ts` — `calcularMetricas()`: 1RM, força, volume
- `meta.ts` — `calcularMeta()`: objetivo (RME) por semana
- `index.ts` — exports públicas
- `*.test.ts` — testes (TDD obrigatório)

### `src/lib/` — Firestore, estado, cálculos com dados
- `firebase.ts` — inicializa Firebase, emulador, offline
- `acesso.ts` — `liberado()`, `bloqueado()`: verifica status/pagamento
- `acoes.ts` — `salvarRegistro()`, `atualizarRegistro()`: grava no Firestore campo a campo
- `alertas.ts` (+ `alertas.test.ts`) — `repsAbaixo()` e `treinosDemorados()` (7 dias; limites em constantes no topo); `chaveAlerta` (id de `arquivados/{chave}`) e `arquivadosVencidos()`
- `relatorio.ts` (+ `relatorio.test.ts`) — relatório do fim do ciclo: `relatorioCiclo()` (números calculados na hora), `cicloTerminou()`, `relatoriosParaRevisar()` (Início do coach)
- `agenda.ts` (+ `agenda.test.ts`) — agenda da semana do aluno, pura: `diasDaSemana()`, `treinoDeHoje()`, `travado()`, `semanaDeVolta()`, `comVolta()` (prescrição com −5% na semana de volta), `cargaVolta()`
- `conversores.ts` — `mesoParaDoc()`, `docParaMeso()`, `registroId()`: serialização; `normalizarCargas()`/`docsParaRegistros()`: leitura única das cargas (peso do corpo)
- `hooks.ts` — `useUsuarioAtual()`, `useMeso()`, etc.: React hooks
- `push.ts` — `agendarPush()`, `cancelarPush()`: avisam o Worker de push (sem `VITE_PUSH_URL`, não fazem nada; `agendarPush` não agenda com o aviso desligado: `avisosLigados()`, chave `forca-avisos-descanso`); `inscreverAvisos()`, `desinscreverAvisos()`, `avisarTreinoPronto(alunoId)`: avisos fixos de treino novo e mensalidade (chave `forca-avisos-coach`)
- `foto.ts` — `reduzirFoto()`: recorte quadrado 192×192, JPEG ≤ 60000 caracteres (lê por data URL por causa da CSP)
- `treino.ts` — `buscarTreino()`, `carregarRegistros()`: dados do Firestore
- `resumo.ts` — resumo semanal: totais de volume/força
- `evolucao.ts` — `painelEvolucao()`, `historicoExercicios()`, `recordesDe()`, `comparacaoToneladas()`, `recordeAnterior()`, `resumoTreino()` (tela de fim de treino), `rankingAlunos()`: cálculos do painel de evolução
- `recorde.ts` — `ehRecorde()`: verifica se uma carga é recorde
- `evolucao.test.ts`, `recorde.test.ts` — testes desses cálculos
- `*.test.ts` — testes

### `push/` — Worker Cloudflare (notificação do descanso)
- `wrangler.toml` — Worker `vfit-descanso`, Durable Object `Descanso` (SQLite)
- `src/index.ts` — rotas `/vapid`, `/agendar`, `/cancelar`, CORS e a classe `Descanso` (alarme)
- `src/jwt.ts` — confere o ID token do Firebase; `src/validar.ts` — inscrição e `fimEm`
- `src/webpush.ts` — chaves VAPID, criptografia aes128gcm e envio; `src/b64.ts` — base64url
- `src/*.test.ts` — testes (rodam com o `npm test` da raiz); tsconfig próprio (`npm run typecheck` confere)

### `src/features/auth/` — Autenticação
- `Entrar.tsx` — login Google/e-mail, cadastro
- `BoasVindas.tsx` — boas-vindas da 1ª visita no navegador (marca `forca-boas-vindas-visto`) e folha "instalar no iPhone"

### `src/features/aluno/` — App do aluno
- `AlunoApp.tsx` — roteador do aluno + barra de abas embaixo (Início, Treino, Evolução, Conta; some em `#/treino/…`)
- `InicioAluno.tsx` — aba Início: cartão do treino de hoje, "Sua semana", quadros (Evolução, Pagamento, Avaliações, Guia)
- `Hoje.tsx` — aba Treino (`#/treino`): semanas com trava, aviso da semana de volta, cartões dos treinos (prop `base`: prefixo das rotas; o presencial do coach usa e nada trava) + aviso "Reps abaixo da meta"
- `PagarPix.tsx` — QR + copia e cola + "Já paguei" (`PIX` lido de `marca.json`; sem `pix` na marca a interface some). Usado na `SemAcesso` (`App.tsx`) e na seção "Mensalidade" da `ContaAluno`
- `ContaAluno.tsx` — aba Conta (recebe `uid` e o `Usuario`): cabeçalho (foto, nome com Editar, e-mail, "aluno desde"), selo da marca, `Peso` (movido da `MinhaConta`), aviso do fim do descanso (chave por aparelho), Trocar senha, Como usar, Guia de métodos, Política, Sair
- `Treino.tsx` — detalhe do treino (Iniciar/Cancelar treino, cargas, reps, selos de método, nota ao abrir, cronômetro, festa no recorde)
- `FimTreino.tsx` — tela de fim de treino estilo story (duração, volume, recordes, cargas que subiram, semana) + "Compartilhar no story"; abre no "Concluir treino" e no "Ver resumo"; vale também no presencial
- `Tutorial.tsx` — passo a passo do aluno (abre 1x no 1º acesso; "Como usar" na aba Conta; título de boas-vindas em `marca.json` → `boasVindas`)
- `AvisoNotificacoes.tsx` — cartão persistente para permitir notificações (Hoje e Treino)
- `src/lib/pesoCorporal.ts` (+ `pesoCorporal.test.ts`) — fração do peso do corpo e `corpoEhCarga` (marca automática)
- `src/lib/metodoSeries.ts` — séries destacadas (borda rosa) a partir do rótulo do método
- `EvolucaoAluno.tsx` — reexporta o painel de evolução
- `mesoAtual.ts` — `mesoAtual()`: mesociclo em vigor; `dataSP`, `diaCurto`, `DIAS_CURTO` (datas curtas)

### `src/features/evolucao/` — Painel de evolução, conquistas, cartão
- `PainelEvolucao.tsx` — tela única para aluno (`#/evolucao`) e coach (`#/aluno/:uid/evolucao`): números, calendário, maiores evoluções, recordes, conquistas, tabela por exercício
- `cartaoStory.ts` — imagem Canvas 1080×1920 com logo, primeiro nome e números para compartilhar no Instagram (`gerarCartao` da evolução, `gerarCartaoTreino` do fim do treino)
- `BotaoCompartilhar.tsx` — botão "Compartilhar no story" (usa `navigator.share` ou download PNG)

### `src/features/relatorio/` — Relatório do fim do ciclo
- `Relatorio.tsx` — tela comum (aderência, semana a semana, evoluções, recordes, recado do coach) + "Baixar PDF" (`pdfRelatorio.ts`, não `window.print()`)
- `pdfRelatorio.ts` — desenha o relatório em canvas e monta o PDF com `montarPdf` (`src/lib/pdf.ts`)
- `RelatorioCoach.tsx` (`#/meso/:id/relatorio`: comentário, Salvar rascunho/Liberar/Recolher, avisar por WhatsApp/e-mail) · `RelatorioAluno.tsx` (`#/relatorio/:mesoId`, só liberados)
- `useDadosAluno.ts` — todos os mesos/registros do aluno (recordes comparam com o histórico)
- `cartaoRelatorio.ts` (+ teste) — imagem story 1080×1920 (usa os helpers de `cartaoStory.ts`)

### `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach)
- `IconeMetodo.tsx` — ícone SVG animado por método
- `GuiaMetodos.tsx` — página "Guia de métodos" + botão "Mostrar as notas de novo"
- Textos: `src/data/metodos.ts` (`METODOS`, `COR_METODO`, `ORDEM`, `metodoDoRotulo`); notas dispensadas: `src/lib/notasMetodo.ts`

### `src/features/coach/` — App do coach
- `presencial/Presencial.tsx` — `PresencialHoje`/`PresencialTreino`: faixa "Presencial: aluno" + as telas Hoje/Treino do aluno com `base`
- `inicio/Inicio.tsx` — dashboard do coach: saudação, 4 números, aguardando aprovação, Novo aluno/Ranking, treinaram hoje, sumidos e vencimentos (faixa "⚠️ N alertas")
- `alertas/Alertas.tsx` — aba Alertas (`#/alertas`): reps abaixo da meta, treinos acima do tempo, treinos que demoraram; hooks `useAlertasCoach()` e `useArquivados()` (também usado no Início e no selo)
- `alertas/calcularAlertas.ts` (+ teste) — `calcularAlertas()` puro (visíveis, `arquivados`, `chave` em cada item) e `chavesAtuais()`
- `alunos/Alunos.tsx`, `NovoAluno.tsx` — lista, cadastro
- `meso/EditorMeso.tsx` — editor visual: divisão, métodos, progressão (Config: pausa dos principais e dos auxiliares)
- `meso/MesosDoAluno.tsx` — lista de mesos de um aluno
- `meso/ImportarPlanilha.tsx` — "Importar da planilha": lê o .xlsx no aparelho (`lib/xlsx.ts` + `lib/planilha.ts`) e grava meso + cargas num lote (`importarMeso` em `acoes.ts`)
- `meso/CampoExercicio.tsx` — combobox de exercício (sugestões de `src/lib/busca.ts`, texto livre)
- `meso/TabDivisao.tsx` (navegação por teclado: Tab/Enter via `onAvancar` do `CampoExercicio`, foco no `useEffect`; copiar treino via `copiarTreino` de `meso/util.ts`), `TabMetodos.tsx` (filtro semana/treino/exercício via `filtrarMetodos`, só visualização), `TabProgressao.tsx` (Ajustar volume: % por semana e limite de reps gravados no meso, prévia automática com movimentos por semana, variação % e total; só "Aplicar alterações" grava) — abas do editor (progressão: padrão + por exercício via slotId)
- `meso/SugestaoTempo.tsx` — aviso "Treinos acima do tempo" + painel de sugestão de biset/triset (usado no editor e na aba Alertas)
- `semana/VisaoSemana.tsx` — monitoramento: séries/reps realizadas vs. prescrição
- `semana/Monitoramento.tsx`, `LoadInput.tsx`, `SessaoCard.tsx` — cards de treino (treino de hoje em destaque: prop `hoje`, calculada em `VisaoSemana`; Início usa `resumoCoach().treinosHoje`)

### `src/features/conta/` — Minha Conta
- `MinhaConta.tsx` — só do coach: e-mail, trocar e-mail/senha, 2 etapas, Sair (o aluno usa a `ContaAluno`)

### `src/features/privacidade/` — Política e Aceite
- `Politica.tsx` — página pública /privacidade + `CaixaAceite` (widget persistente)
- `Aceite.tsx` — tela de aceite obrigatório (aluno antes de `AlunoApp`, coach antes do `CoachApp`)

### `src/lib/` — Privacidade
- `privacidade.ts` — `VERSAO_PRIVACIDADE` (troca = novo aceite obrigatório)

### `src/features/instalar/` — PWA/Android
- `Instalar.tsx` — página de instalação; exporta `jaInstalado`, `eIOS`, `eAndroid`, `navegadorEmbutido` e `useEventoInstalar` (`beforeinstallprompt`), usados também nas boas-vindas
- `AvisoIOS.tsx` — instrução iOS

### `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`)
- `marca.json` — nome, título, nome curto, cores do manifest, domínio e dados do responsável (Política). Os textos do app leem daqui (`import marca from '@marca/marca.json'`).
- `tema.css` — `@theme` com as escalas `slate` e `marca`; `Logo.tsx` — logo; `public/` — ícones, favicon, `icon.svg`, `.well-known/assetlinks.json`.
- A marca vem do `--mode` do Vite: existe `marcas/<mode>` → essa marca; senão `vfit`. `@marca` aponta para a pasta (no `tsc` sempre `vfit`).
- `public/` da marca é mesclada com `public/` por um plugin em `vite.config.ts` (dev serve, build emite antes do SW, então entra no precache).
- Gislane local: `npm run emuladores` + `npm run dev:gislane` (sem `.env.production` cai no emulador). Build: `npm run build:gislane`. Ícones: `npm run icones:gislane`. e2e: `MARCA=gislane npm run test:e2e`.
- `marcas/gislane/marca.json` completo (o deploy trava se aparecer "A CONFIRMAR").

### `public/` (comum às marcas)
- `sw-push.js` — trata o push e o clique na notificação (importado pelo service worker via `workbox.importScripts`); `badge-96.png` (letra da marca) fica em `marcas/<id>/public`

### `src/` — Raiz
- `App.tsx` — roteador principal: rotas, verificação de permissão; `Menu` do coach (barra de abas no celular, menu lateral ≥ lg, selo de alertas)
- `avatar.tsx` — `Avatar`: foto redonda ou iniciais, com selo da marca opcional (aluno e coach)
- `vidro.tsx` — visual "vidro": `BarraAbas`, `Brilho`, `Quadro`, `Chip`, `IconeQuadrado`
- `icones.tsx` — ícones de traço (barra de abas e cartões)
- `rota.ts` — `useRota()`, `ir()`, `casar()`: hash routing
- `main.tsx` — entry point React
- `ui.tsx` — componentes comuns: `Botao`, `Centro`, `Tab`, etc.
- `movimento.ts` — molas no modelo da Apple (`suave`, `agil`, `elastico`, `saida`, `confete`); o CSS tem as mesmas em `--mola-agil`/`--mola-suave` (`index.css`)
- `motionFeatures.ts` — recursos da biblioteca Motion carregados sob demanda; animações e componentes `Tela`, `Painel`, `Barra`, `cascata`/`item` ficam em `src/ui.tsx`
- `ui.tsx` também tem `Abertura` (carregando), `Msg` (mensagem que aparece/some), `Deslizar` (troca de semana), `Contar`; toque/hover de botões, links, selects e checkboxes vêm do `index.css`
- `index.css` — Tailwind, fontes (as cores vêm de `marcas/<id>/tema.css`), classes `.vidro`/`.lente`/`.vidro-escuro` e o espaço `pb-barra`
- Logo: `marcas/<id>/Logo.tsx` (`import Logo from '@marca/Logo'`)

### `src/data/` — Dados estáticos
- `exercicios.json` — catálogo de exercícios

### `tests/` · `e2e/` — Testes
- `tests/rules.test.ts` — segurança Firestore (emulador)
- `tests/ataques.test.ts` — teste de ataques (troca de ID, escalada, anônimo, abuso); todo caso deve ser negado
- `e2e/*.spec.ts` — fluxo aluno/coach (Playwright); `e2e/varredura.spec.ts` abre todas as telas em 1280/390 px (erro, rolagem horizontal, "undefined"/"NaN")
- `e2e/presencial.spec.ts` — coach treina o aluno (com app e presencial) no próprio celular
- `e2e/conta.spec.ts` — aba Conta do aluno: nome, foto, selo, peso, trocar senha e foto na lista do coach
- `e2e/pix.spec.ts` — Pix simples: mensalidade, QR/copia e cola, "Já paguei", coach confirma
- `e2e/evolucao.spec.ts`, `e2e/recorde.spec.ts`, `e2e/ranking.spec.ts` — fluxos do painel de evolução, recorde e ranking
- `e2e/seed.ts` — fixture: usuários, mesos

### `tools/` — Scripts offline
- **Marca/projeto nos scripts operacionais** (`mfa`, `backup`, `limpeza-lgpd`, `vigia`, `erros`): todos exigem a env `PROJETO` (`forca--app` ou `gislane-personal-trainer`); sem ela saem com erro. Agendados rodam nas 2 marcas (matrix, `fail-fast: false`); manuais têm o input `marca` (padrão vfit). Issues da Gislane levam "(gislane)" no título; backups `backup-gislane-firestore-<data>`. Teste: `tests/projeto-explicito.test.ts`.
- `tools/mfa.mjs` + `.github/workflows/mfa.yml`: ativa o TOTP no projeto e remove o 2º fator do coach em emergência.
- `tools/erros.mjs` + `.github/workflows/erros.yml` ("Ver erros do app"): lista os 100 logs mais recentes no resumo e apaga os com mais de 30 dias.
- `tools/limpeza-lgpd.mjs` + `.github/workflows/limpeza-lgpd.yml` ("Limpeza LGPD", diário): atende `exclusoes/{uid}`, apaga Auth/logs/dados, faz backup novo e apaga os com 30+ dias. Teste em `tests/limpeza-lgpd.test.ts`.
- `extrair_planilha.py` — lê .xlsx original (conversão manual)
- `planilha_para_meso.py` — transforma matriz em `Meso` JSON
- `importar-meso.mjs` — sobe um meso + cargas para demo Firebase
- `aluno-exemplo.mjs` + `.github/workflows/aluno-exemplo.yml` ("Aluno de exemplo", modo simular/gravar): prepara a conta "Victor C.L. Silva" para apresentações (meso `exemplo-victor`, semana 1 registrada). Roteiro em `docs/apresentacao.md`; teste em `tests/aluno-exemplo.test.ts`.
- `alterar-email.mjs`, `backup.mjs` — utilitários admin

### `.github/workflows/` — CI/CD
- `ci.yml` — typecheck, lint, testes
- `push.yml` — publica o Worker `push/` na Cloudflare (push em `push/**` ou manual) e mostra a URL
- `deploy.yml` — build e deploy Firebase Hosting; job `deploy` (VFIT) e job `gislane` (separado, com trava no `dist/`, `--project gislane`)
- `android.yml`, `apk.yml` — gera APK (TWA); `apk.yml` tem input `marca` (Gislane: reserva, release `apk-gislane`; no Android ela instala pelo Chrome, `marca.json` → `apk: ""`)
- `importar-meso.yml` — workflow: `/importar` trigger (auth: token)
- `aluno-exemplo.yml` — manual: aluno de exemplo (simular/gravar)
- `alterar-email.yml` — workflow: alterar e-mail de aluno
- `backup.yml` — backup automático

### Raiz
- `firestore.rules` — segurança: quem lê/escreve o quê
- `firebase.json` — config: headers CSP, redirects, publicDir
- `firestore.indexes.json` — índices compostos

---

## Rotas do app

| Caminho | Componente | Quem |
|---------|-----------|------|
| `/` | Home | Ambos |
| `/instalar` | Instalar | Público |
| `/alunos` | Alunos | Coach |
| `/alunos/novo` | NovoAluno | Coach |
| `/aluno/:uid` | MesosDoAluno | Coach |
| `/aluno/:uid/evolucao` | EvolucaoCoach (`PainelEvolucao.tsx`) | Coach |
| `/aluno/:uid/presencial` | PresencialHoje (`presencial/Presencial.tsx`) | Coach |
| `/aluno/:uid/presencial/treino/:mesoId/:semana/:treino` | PresencialTreino | Coach |
| `/meso/:id` | EditorMeso | Coach |
| `/meso/:id/semana/:n` | VisaoSemana | Coach |
| `/meso/:id/relatorio` | RelatorioCoach | Coach |
| `/ranking` | RankingAlunos | Coach |
| `/conta` | MinhaConta (coach) · ContaAluno (aluno) | Ambos |
| `/evolucao` | EvolucaoAluno (`PainelEvolucao.tsx`) | Aluno |
| `/treino` | Hoje (aba Treino) | Aluno |
| `/treino/:mesoId/:semana/:treino` | Treino | Aluno |
| `/relatorio/:mesoId` | RelatorioAluno (só liberado) | Aluno |
| (padrão) | AlunoApp → InicioAluno | Aluno |

---

## Coleções Firestore

### `usuarios/{uid}`
- `papel`: 'coach' \| 'aluno'
- `status`: 'ativo' \| 'aguardando' \| 'bloqueado'
- `nome`, `email`, `criadoEm`, `pagoAte` (timestamp), `selo` (bool, opcional), `pesoKg`

### `fotos/{uid}`
- `img` (data URL JPEG 192×192, ≤ 60000 caracteres), `atualizadoEm`. Aluno grava a própria; o coach lê todas (`Alunos.tsx`).

### `mesos/{mesoId}`
- `alunoId`, `nome`, `frequencia`, `semanas`
- `divisao`: `{ s1: [slots], s2: … }` (slotId → exercício, método, série/rep)
- `progressao`: `{ principais, auxiliares, padrao? }` (linhas por semana); `progressaoExercicio`: `{ [slotId]: linhas }`; `adaptadoEm` (marcarAdaptado)
- `criadoEm`, `atualizadoEm`

### `registros/{regId}`
- Chave: `{mesoId}_s{semana:02d}_t{treino}` (ex.: `abc_s01_t1`)
- `alunoId`, `mesoId`, `semana`, `treino`
- `cargas`: `{ slotId: { s1: 100, s2: 95, … } }` (peso ou reps absolutas)
- `reps`: idem (reps feitas, opcional)
- `realizado`: bool, `realizadoEm`, `atualizadoEm`

### `notas/{alunoId}`
- `alunoId`, `exercicios`: `{ [nome do exercício]: texto (até 300) }`, `atualizadoEm`
- Vale em todas as semanas/mesos (chave = nome). `''` = sem nota.
- Gravação: `salvarNota()` em `src/lib/acoes.ts`. UI: aluno edita em `Treino.tsx` (`Nota`); coach lê em `semana/SessaoCard.tsx`.

### `arquivados/{chave}`
- `em` (hora do servidor). Alerta arquivado pelo coach; a chave muda quando a situação muda (`chaveAlerta` em `src/lib/alertas.ts`). Só o coach.

### `relatorios/{mesoId}`
- `alunoId`, `mesoId`, `comentario` (≤ 3000), `liberado`, `liberadoEm`, `atualizadoEm`. Os números não são gravados (`relatorioCiclo`). Aluno lê só o próprio liberado, pela consulta.

### `exclusoes/{uid}`
- `uid`, `solicitadoEm`, `status` (pending/processado)
- Pedido de exclusão total (LGPD). Workflow "Limpeza LGPD" processa uma vez por dia.

---

## Comandos e workflows

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | dev server Vite (HMR) |
| `npm run build` | build produção: tsc + vite build |
| `npm run typecheck` | tsc (valida tipos) |
| `npm test` | vitest: engine, lib, acesso, conversores |
| `npm run test:rules` | vitest + emulador Firestore: firestore.rules |
| `npm run test:e2e` | playwright: fluxos aluno/coach |
| `npm run emuladores` | inicia emulador Firebase (auth, Firestore) |
| `npm run icones` | gera favicons/app icons da VFIT (`icones:gislane` = da Gislane) |
| `npm run dev:gislane` / `build:gislane` | app da Gislane (dev: emulador; build: projeto `gislane-personal-trainer`) |

| Workflow | Trigger | O que faz |
|----------|---------|----------|
| `ci.yml` | push/PR | typecheck, lint, testes |
| `deploy.yml` | push main | build + deploy Firebase Hosting |
| `android.yml` | push com tag `android-*` | gera APK (TWA) |
| `apk.yml` | dispatch manual | idem |
| `importar-meso.yml` | `/importar` comment | sobe meso + cargas (token) |
| `aluno-exemplo.yml` | dispatch manual | prepara o aluno de exemplo (modo simular ou gravar) |
| `alterar-email.yml` | dispatch manual | altera e-mail de aluno (admin) |
| `backup.yml` | schedule (diário) | backup Firestore → Cloud Storage |

## Pontos sensíveis (leia antes de auditar ou mexer)
Onde já houve falha ou onde errar custa caro. Cada linha diz o que protege e como é testado. Quem corrigir um bug novo acrescenta uma linha aqui.

| Área | Arquivo | Cuidado | Teste que protege |
|---|---|---|---|
| Abertura do app | `src/main.tsx` | Renderizar só **depois** de carregar `motionFeatures`. Com o `LazyMotion` assíncrono, o `AnimatePresence mode="wait"` perdia a saída da tela de abertura e o login nunca aparecia (~5% das aberturas; corrigido na Entrega 3). | e2e: 1º `goto('/')` de todo spec |
| Cargas nunca se perdem | `src/lib/acoes.ts` | Gravar sempre campo a campo (`cargas.<slot>.sN`, `setDoc merge`); nunca sobrescrever o registro inteiro. | `tests/rules.test.ts`, e2e aluno offline |
| Permissões | `firestore.rules` | Aluno só lê o próprio treino e escreve o próprio registro, com `status=='ativo'` e `pagoAte` futuro; `hasOnly` nos campos. | `tests/rules.test.ts` (emulador) |
| Salvar meso | `src/lib/conversores.ts` | Firestore não aceita array dentro de array → `paraMapa`; campos opcionais nunca `undefined`. | `conversores.test.ts`, e2e coach |
| Motor | `src/engine/` | Fonte da verdade: `docs/logica-planilha.md`; TDD obrigatório. | `src/engine/*.test.ts` |
| Push (descanso, treino pronto, mensalidade) | `push/src/` | Token do Firebase verificado (aud/iss/exp/assinatura), projetos `forca--app` e `gislane-personal-trainer`; instância (DO) VFIT = `uid` puro (compatível com o que já estava no ar), Gislane = `gislane-personal-trainer:<uid>`; `/aviso-pagamento` só com JWT RS256 da conta de serviço (`aud` `vfit-push-avisos`, chave do JWK do Google pelo `iss`), máx. 20 avisos por chamada (50 subpedidos no plano grátis). O `iss` não é amarrado ao `projeto` do corpo porque as 2 marcas usam a mesma conta de serviço (`FIREBASE_SERVICE_ACCOUNT`); só endpoints de push conhecidos (`HOSTS`); chaves VAPID nunca regeneradas. | `push/src/*.test.ts`, conferência no `push.yml` |
| CSP | `firebase.json` | `connect-src` só com os domínios usados (Google APIs e o Worker); o e2e usa a mesma CSP. | e2e completo |
| Registro de erros | `firestore.rules` (`logs`), `src/lib/log.ts` | Criar só logado, com `hasOnly` e tamanhos fixos, `uid == auth.uid` e `em == request.time`; só o coach lê e apaga; ninguém edita. O log nunca registra o próprio erro, e `promessa` ignora o que já foi registrado como `gravacao`. Antes do login fica numa fila local; máx. 20 por aparelho por dia. | `tests/rules.test.ts` (logs), `log.test.ts` |
| Menu do coach | `src/App.tsx` (`Menu`) | Celular (< lg): topo só com o logo + `BarraAbas` embaixo (Início, Alunos, Alertas com selo, Métodos, Conta); "Sair" fica em Minha conta. Computador (≥ lg): menu lateral fixo. Aba ativa pela rota. Presencial sem barra e sem as consultas do selo. O selo usa as mesmas consultas do Início (o SDK junta consultas iguais) e fica ligado em todas as telas do coach: uma leitura inicial por sessão, depois só mudanças. Com selo, o nome do link vira "Alertas N" (e2e usam `/^Alertas/`). A página não pode ganhar rolagem horizontal. | `e2e/layout.spec.ts`, `coach.spec.ts` |
| Navegação do aluno | `AlunoApp.tsx`, `InicioAluno.tsx`, `Hoje.tsx`, `ContaAluno.tsx` | Sem cabeçalho no topo; `BarraAbas` embaixo some em `#/treino/…` (inclui o fim do treino); as outras telas usam `pb-barra`. "Ver treino de hoje" só navega: o cronômetro liga só no "Iniciar treino" (o cronômetro de descanso e anotar carga também não iniciam). | e2e `aluno`, `layout`, `varredura`, `tutorial` |
| Agenda, travas e semana de volta | `src/lib/agenda.ts`, `Hoje.tsx`, `InicioAluno.tsx`, `Treino.tsx`, `VisaoSemana.tsx`, `alertas.ts` | Tudo calculado na hora a partir dos registros (`realizado`), nada gravado. Trava só para o aluno (`base` do presencial não trava; `Treino.tsx` não trava). Volta: semana `w` ≥ 2 sem treino feito na `w−1` → `ajustarSeries(−5%)` só nessa semana e carga cinza × 0,95 (passo de 0,5). Quem tem só 14 dias de registros (alertas do coach) usa `comVolta(…, soAtual=true)`, senão dá volta falsa. Sem `dias`: calendário automático por frequência (`DIAS_AUTO` em `agenda.ts`, dias contados do início do bloco de 7 dias); data do treino = max(planejada, dia seguinte ao último feito) limitada ao fim do bloco; `treinoDeHoje` devolve `dataTreino` e a tela só diz "Hoje" com data ≤ hoje, senão "Próximo · <quando>" (09/10/2026). Vale também no presencial do coach (`base`): antes ele sempre dizia "Hoje" no próximo treino, e depois de concluir um treino o seguinte aparecia como de hoje (corrigido em 10/10/2026); abrir antes da data continua livre. Limitação aceita: treino da semana anterior que foi de volta é comparado sem o −5% (pode dar alerta falso de reps). | `agenda.test.ts`, `alertas.test.ts` |
| Entrada (boas-vindas) | `BoasVindas.tsx`, `Entrar.tsx` | Marca `forca-boas-vindas-visto` no aparelho (sem IP). Some no app instalado e com `navigator.webdriver`, salvo `forca-boas-vindas-forcar` (e2e). Rótulos "E-mail"/"Senha" são usados por todos os e2e: o botão de ver senha não pode ter "senha" no `aria-label`. | `entrada.spec.ts` |
| Campos fora do motor no meso | `conversores.ts` (`docParaMeso`), `Treino.tsx` | `docParaMeso` só traz o que o motor usa: `adaptadoEm` (aviso "treino adaptado") e outros campos do documento se leem do doc cru (`dados`), nunca do meso convertido (bug corrigido em 08/10/2026: o aviso nunca aparecia). | — |
| Movimento | `src/movimento.ts`, `src/index.css`, `src/ui.tsx` (`Tela`) | Toda animação usa os tokens de `src/movimento.ts`/`--mola-*`; não usar duration/ease soltos (só troca de cor com `transition-colors` fica no padrão do Tailwind); tempo linear só em cronômetro e progresso (e loops: pulso, ícones de método). `Tela` faz push/pop (abrir false↔true) e fade na troca de aba, em `mode="wait"`: com as duas telas sobrepostas (`popLayout`) o texto repetido quebra os e2e. | e2e completo, `layout` |
| Fundo e animações no iPhone | `src/index.css` (`body`, `.borda-brilho`), `src/vidro.tsx` (`Brilho`), `ContaAluno.tsx` (`Chave`), `Hoje.tsx` | O `body` **não** tem fundo (só o `html`). Com fundo, ele tapava o `Brilho` (`fixed -z-10`), e a borda do body virava um "corte" no meio da tela ao trocar de página. Não usar `layout` em peça pequena dentro de tela que entra animada ou muda de altura: a bolinha da chave chegava atrasada; anime por `x`. Dentro de `Deslizar` (overflow-hidden), anel e sombra por fora do cartão são cortados: use `ring-inset` ou `.borda-brilho` (09/10/2026). | prints em 390px |
| Visual vidro | `src/index.css`, `src/vidro.tsx` | `.vidro`/`.lente`/`.vidro-escuro` ficam em `@layer components`: fora dela venceriam as classes do Tailwind (a folha do iPhone ficou transparente assim). Folha/aviso que precisa ser opaco usa fundo sólido, não `vidro`. | build, prints |
| Inatividade | `src/lib/inatividade.ts` | Coach 20 min, aluno 4 h (era 30 min até 06/10/2026; aluno reclamou); o cronômetro rodando conta como uso; **treino em andamento neste aparelho também** (marca `forca-treino-andamento` = `{inicio, ate: +3 h}` gravada ao iniciar em `Treino.tsx`, apagada no "Concluir"/realizado e no "Cancelar treino"; teto de 3 h para treino esquecido; `treinoEmAndamento` em `inatividade.ts`); só sai depois de `waitForPendingWrites` (offline = avisa e espera). Bug corrigido em 01/10/2026: a marca de uso fica no aparelho depois de sair, então o login novo derrubava a pessoa na hora (e o código do 2º fator, já usado, dava "incorreto" até travar em quota-exceeded). Por isso o `Entrar.tsx` chama `marcar()` ao enviar.  Sem marca (0, navegador sem armazenamento) não expira. | `inatividade.test.ts`, e2e "login novo não cai por inatividade antiga", `relogio.spec.ts` |
| Aba antiga após publicar | `src/lib/atualizar.ts`, `Entrar.tsx`, plugin `versao` em `vite.config.ts` | O service worker novo assume, mas a página aberta continua com o JS antigo (foi o login que caía no PC em 01/10/2026). Na tela de login, compara `__VERSAO__` com `versao.json` (do mesmo cache do SW) e recarrega uma vez por versão (marca em sessionStorage evita laço). Só na tela de login: em telas logadas um reload poderia perder edição. A versão aparece no rodapé do login. | `atualizar.test.ts`, e2e `atualizar.spec.ts` |
| Tentativas de login | `src/lib/tentativas.ts`, `Entrar.tsx` | Depois de 5 falhas, espera crescente (30 s → máx. 15 min) por aparelho; zera no sucesso. | `tentativas.test.ts` |
| Push: acesso | `push/src/acesso.ts`, `index.ts` | `/agendar` só para coach ou aluno ativo e em dia (perfil lido com o token dele, cache de 10 min); 30 por minuto (429); `/inscrever` aceita qualquer token válido (aluno bloqueado precisa do aviso de pagamento); `/treino-pronto` lê `usuarios/<alunoId>` com o token de quem chama (só o coach com 2º fator consegue, pelas regras), recusa o próprio uid e papel coach, 3 por 10 min por aluno; falha ao ler = 503; CORS sem localhost. O limite e o cache ficam na memória da instância e recomeçam se ela reiniciar. | `push/src/acesso.test.ts`, `cors.test.ts` |
| Notificações do coach/mensalidade | `src/lib/push.ts` (`inscreverAvisos`, `desinscreverAvisos`, `avisarTreinoPronto`), `public/sw-push.js`, `AlunoApp.tsx`, `ContaAluno.tsx`, `EditorMeso.tsx` | Contrato em `docs/plano-notificacoes.md`. Só inscreve com permissão concedida e chave `forca-avisos-coach` != '0' (por aparelho); guarda `[uid, endpoint, hora]` em `forca-avisos-inscrito` e reenvia se mudou ou a cada 7 dias. O botão "Avisar aluno: treino pronto" só existe no editor do meso (coach) e não grava nada no Firestore. `badge-96.png` é por marca (`marcas/<id>/public`, entra no precache pelo plugin `public-da-marca`). Gislane usa o mesmo Worker (`VITE_PUSH_URL` em `.env.gislane`; a CSP é a mesma do `firebase.json`). | `push.test.ts` (`precisaInscrever`), e2e coach/conta |
| Descanso salvo | `src/lib/descanso.ts` | O estado guarda o `uid`; de outra conta (ou sem uid) é ignorado e apagado. | `descanso.test.ts` |
| 2º fator do coach | `src/lib/mfa.ts`, `Entrar.tsx`, `MinhaConta.tsx` | TOTP (Google Authenticator). Código errado conta como tentativa falha; sessão vencida e `auth/quota-exceeded` (limite de códigos errados por login, 01/10/2026) voltam ao e-mail e senha. Tentativas de ativação antigas deixam vários "VFITCOACH" no Authenticator: só o mais recente vale. Emergência: workflow `mfa.yml`, ação `desativar-coach`. | `mfa.test.ts` |
| 2º fator exigido nas regras | `firestore.rules` (`segundoFator`, `isCoach`), `src/lib/acesso.ts` (`faltaSegundoFator`), `App.tsx`, `e2e/seed.ts` | Todo poder de coach exige `sign_in_second_factor` no token; sem ele o coach só lê o próprio `usuarios/{uid}` e o painel mostra um aviso. A exceção `mfaDispensado` (custom claim) existe só no seed do emulador: nenhum código do app nem workflow de produção a define. Emergência: workflow `mfa.yml` ação `desativar-coach`; depois de rodar, é preciso reativar o 2º fator em Minha conta e entrar de novo. | `tests/rules.test.ts` (2º fator do coach), `acesso.test.ts`, e2e |
| App Check | `src/lib/firebase.ts` | Provedor reCAPTCHA Enterprise, em modo Monitorar (só liga com `VITE_RECAPTCHA_KEY` e fora do emulador). A CSP precisa manter os domínios do reCAPTCHA (`script-src`, `frame-src`, `connect-src`). Selo escondido por CSS (`.grecaptcha-badge`) com o aviso legal na tela de login (`Entrar.tsx`). | build |
| Anotações do aluno | `firestore.rules` (`notas`), `acoes.ts` | Até 300 exercícios por documento; a interface corta cada texto em 300 caracteres. As regras do Firestore não conseguem limitar o tamanho dos **valores** de um mapa: um aluno logado pode gravar até 1 MiB só no próprio documento. Risco aceito (afeta só o documento dele). | `tests/rules.test.ts` (notas) |
| Alertas de segurança | `tools/vigia.mjs` | Alertas com **contagens** apenas (nunca nome, e-mail ou uid). Limites em topo de `vigia.mjs`: cadastros/24h (10), aguardando aprovação (20), erros/24h (100), acessos negados/24h (20), logs total (5000), limpeza LGPD atrasada (2 dias). A cada 6h o workflow abre Issues com @UziCelli sem repetir se houver aberta. Falha do vigia também abre Issue. Override de `@grpc/grpc-js` em `package.json` é falso positivo de `npm audit` (roda só no Node). | `tests/vigia.test.ts` |
| Peso do corpo automático | `src/lib/pesoCorporal.ts` (`corpoEhCarga`, `rebasear`, `preencherCorpo`), `conversores.ts` (`normalizarCargas`), `Treino.tsx`, `SessaoCard.tsx` | **Detalhes, formatos antigos e como verificar: `docs/peso-corporal.md`.** Toda leitura de cargas passa por `docsParaRegistros(docs, meso)` (normaliza dado de versão antiga; nunca use `docParaCargas` cru em tela/cálculo). Barra fixa, flexão de braços, abdominal no solo sem carga, Superman/Paraquedista (30% do corpo) e agachamento com peso do corpo já vêm com "Feito com o peso do corpo" marcado. Só vale para slot **sem carga** e **sem `pc.<slot>` explícito**; ao gravar a 1ª carga, o `pc` é gravado junto, então histórico e métricas antigas não mudam. Sem `pesoKg` no perfil não há automático (fica a opção manual com aviso). **Convenção: `cargas.<slot>.s<n>` guarda o TOTAL (extra + `pc`)**; a tela mostra `total - corpo`. Ao marcar/desmarcar/trocar o `pc` (A para B), `rebasear` regrava campo a campo cada carga já preenchida como `c - A + B`; carga menor que A (gravada sem o corpo, dado antigo) fica como está, para nenhuma carga se perder. Ao "Concluir treino", `preencherCorpo` grava `pc` (se faltar) e `carga = corpo` nas séries prescritas **vazias** (nunca sobrescreve; drop fica de fora); `estadoCorpo` (Treino.tsx) é a regra única de `corpo`/`auto`. O coach vê "Inclui peso do corpo: X kg" no card. `tools/aluno-exemplo.mjs` também grava extra + pc. | `pesoCorporal.test.ts`, `conversores.test.ts`, `treino.test.ts`, `tests/aluno-exemplo.test.ts`, e2e `peso-corpo.spec.ts` |
| Treino presencial | `src/features/coach/presencial/Presencial.tsx`, `Hoje.tsx`/`Treino.tsx` (prop `base`) | Reaproveita as telas do aluno; tudo grava com o **uid do aluno** (props), nunca o do coach logado. O descanso (`descanso.ts`) guarda o uid do coach, de propósito. | e2e `presencial.spec.ts` |
| Marcas | `vite.config.ts`, `marcas/`, `playwright.config.ts` | Build/dev **sem `--mode` = vfit** (o que vai para produção). Nunca publicar o build de uma marca no projeto Firebase da outra: o deploy da Gislane é job separado em `deploy.yml` com trava (falha se `dist/` tiver "A CONFIRMAR"/"forca--app" ou não tiver "gislane-personal-trainer"); todo `firebase` com `--project` explícito. `vite.config.ts` força `VITE_USE_EMULATOR=1` no `serve` (dev nunca toca o banco real; `.env.gislane` tem a config real). Texto de identidade (nome, CREF, domínio) vem de `marca.json`, nunca fixo no código. | `npm run build` igual ao anterior (dist idêntico exceto hashes), e2e `MARCA=gislane` |
| e2e do editor de divisão | `e2e/coach.spec.ts` (`CAMPO`), `TabDivisao.tsx` (`foco`) | Campos de exercício são `input[role="combobox"]`; o select "Copiar de…" (PR #37) também tem papel combobox. O Tab move o foco **depois** do re-render (efeito em 2 passos); o teste deve esperar `toBeFocused()` no campo seguinte antes do próximo `fill`, senão o foco atrasado rouba o foco do campo já preenchido (falha intermitente 1 em 6: "campo seguinte nunca aparece" / lista de sugestões fechada). Evidência: snapshot da falha com o campo ativo no treino 3 enquanto o `fill` era no treino 1. Mesma família: depois de "Ver semanas" a URL muda antes da tela, então o teste espera o botão "Editar meso" (a visão da semana) antes de usar `table`; sem isso a carga ia para um input do editor, que era desmontado ("carga não gravada"). Corrigido em 03/10/2026. | `e2e/coach.spec.ts` |
| Volume de logs | `firestore.rules` (`logs`), `log.ts` | O limite de 20 por dia é do cliente; uma conta logada pode criar mais (documentos de até ~1 KB). Risco baixo, aceito. | — |
| Aluno de exemplo | `tools/aluno-exemplo.mjs`, `aluno-exemplo.yml` | Escreve em **produção**, só no aluno "Victor Aluno"/"Victor C.L. Silva" (falha se não houver exatamente 1). Nunca cria, altera ou apaga registros da **semana 2** (o Victor registra ao vivo); só grava a semana 1, com merge. Em outros mesos da conta só muda `inicio` dos que estiverem em andamento (guarda `inicioOriginal`). | `tests/aluno-exemplo.test.ts` (emulador) |
| Evolução e recorde | `src/lib/evolucao.ts`, `Treino.tsx` (festa no recorde), `RankingAlunos.tsx` | Tudo calculado no aparelho, sem dado novo nem regra nova; cargas sempre via `docsParaRegistros` (peso do corpo); exercícios casam pelo nome entre mesos; a festa no recorde só lê (não mexe na gravação) e compara o TOTAL gravado; o aluno lê todos os próprios registros na Evolução e no Treino (custo ~100–300 docs/ano por aluno); o ranking lê só os mesos atuais; o Início não ganhou consulta (frequenciaCaindo usa os 14 dias já carregados, meso com < 7 dias não conta); cartão do story só com primeiro nome e números (LGPD), CSP `img-src 'self' data:` (nada de blob: em <img>). | `evolucao.test.ts`, `resumo.test.ts`, `recorde.test.ts`, e2e `evolucao`/`recorde`/`ranking`/`layout` |
| Aviso no topo da tela (iPhone) | `index.html`, `Treino.tsx` (`FestaRecorde`), `App.tsx` (`Vigia`) | Com `viewport-fit=cover` + barra de status `black-translucent`, o app passa **por baixo** da barra de status: `fixed top-4` fica escondido no iPhone; com o teclado aberto, `fixed top` ainda sai da parte visível. O aviso de recorde usa `window.visualViewport` (30% da área visível) e, sem ele, `env(safe-area-inset-top)`; o aviso "Conecte-se à internet…" do `Vigia` soma o safe-area no padding. Corrigido em 07/10/2026 (o Victor não via o recorde). Novo aviso flutuante: faça igual. | e2e `recorde.spec.ts` |
| Cores dos métodos | `src/data/metodos.ts` (`COR_METODO`), `Treino.tsx`, `GuiaMetodos.tsx`, `Tutorial.tsx` | Uma cor fixa por método (selo, faixa, texto, borda), em classes Tailwind escritas por extenso (nunca montar o nome da classe). Série marcada por **faixa fina à esquerda**, uma por método (`seriesDoRotulo`; etapa do drop = Dropset); nunca voltar ao retângulo nem ao rosa único (o Victor se confundiu com biset + dropset no mesmo exercício). | e2e `aluno.spec.ts`, `metodos.spec.ts` |
| Alertas de reps e tempo | `src/lib/alertas.ts`, `Alertas.tsx`, `Inicio.tsx` (faixa), `Hoje.tsx` (aviso do aluno) | Tudo calculado no aparelho com os registros de 7 dias, sem dado novo nem regra nova (sem telefone ou dado sensível: pedido do Victor). Série feita = carga > 0 (via `normalizarCargas`, peso do corpo conta) ou reps anotadas; abaixo = reps anotadas < meta. Alerta com ≥ 3 séries abaixo **e** ≥ 25% das feitas. Demora: ≥ 1,3× o previsto **e** +15 min (acima de 180 min = esqueceu de concluir, ignora). O "Entendi" do aluno guarda `alerta-reps-<mesoId>-<dia>` no `localStorage` (try/catch). | `alertas.test.ts`, e2e `alertas.spec.ts`, `coach.spec.ts` |
| Alertas arquivados | `firestore.rules` (`arquivados`), `alertas.ts` (`chaveAlerta`, `arquivadosVencidos`), `calcularAlertas.ts`, `Alertas.tsx` (`useArquivados`, limpeza), `acoes.ts` | `arquivados/{chave}` = `{ em }` (hora do servidor), só o coach. A chave muda quando a situação muda (abaixo: último dia; demorado: semana+treino; acima: pior semana + tempo arredondado + limite), então o alerta volta sozinho; nada de flag "arquivado" no meso. Selo (`App.tsx`) e faixa do Início também passam os arquivados. A limpeza (> 14 dias e sem alerta atual) roda 1x por abertura da aba, **só com tudo carregado e vindo do servidor** (`cache` do `useLista`; o cache do aparelho pode estar incompleto): rodar antes apagaria arquivados de alertas ainda não lidos (eles voltariam). Sem telefone nem dado do aluno (LGPD): o botão WhatsApp usa `wa.me/?text=` sem número (`src/lib/contato.ts`) e o E-mail usa o do login (aluno presencial não tem, o botão some). | `tests/rules.test.ts` (arquivados), `alertas.test.ts`, `calcularAlertas.test.ts`, e2e `alertas.spec.ts` |
| Relatório do ciclo | `firestore.rules` (`relatorios`), `src/lib/relatorio.ts`, `acoes.ts` (`salvarRelatorio`, `liberarRelatorio`, `recolherRelatorio`), `limpeza-lgpd.mjs` | `relatorios/{mesoId}` guarda só `comentario` (≤ 3000), `liberado`, `liberadoEm` (não nulo ⇔ liberado), `alunoId` (= dono do meso, conferido na regra), `mesoId` (= id) e `atualizadoEm` (hora do servidor); os números nunca são gravados. Aluno só lê o próprio **liberado**, ativo e em dia, pela consulta `alunoId == uid` + `liberado == true` (rascunho ou `getDoc` de relatório inexistente = permissão negada); nunca escreve. `salvarRelatorio` volta a rascunho (aluno deixa de ver até liberar de novo). Quem mexe em dono ou apaga meso precisa levar o relatório junto: `darAcessoAoApp` (troca `alunoId` + `atualizadoEm`, depois dos mesos), `excluirMeso`, `apagarAluno`, Limpeza LGPD; `duplicarMeso` não copia. Recordes comparam com todo o histórico do aluno (passe todos os mesos/registros dele). | `tests/rules.test.ts` (relatorios), `relatorio.test.ts`, `limpeza-lgpd.test.ts`, e2e `relatorio.spec.ts` |
| Relatório: telas e PDF | `src/features/relatorio/`, `src/index.css` (`@media print`) | Já liberado, o coach vê "Atualizar comentário" (relibera) e "Recolher", nunca "Salvar rascunho" (esconderia do aluno sem querer). O PDF é `window.print()`: o CSS de impressão esconde `header`, `nav` e `.nao-imprimir` e redesenha `.relatorio` em fundo branco; elemento novo de tela que não deve sair no PDF leva `.nao-imprimir`. Story: só primeiro nome e números (LGPD). | e2e `relatorio.spec.ts`, `cartaoRelatorio.test.ts` |
| Tutorial do aluno | `src/features/aluno/Tutorial.tsx`, `AlunoApp.tsx` | Abre 1x (`forca-tutorial-visto`), nunca com `navigator.webdriver` (não atrapalha os e2e); sem `localStorage` não abre em laço. Boas-vindas vêm de `marcas/<id>/marca.json` (`boasVindas`: "à VFITCOACH", "ao app da Gislane"), nunca texto fixo. As telas são desenhos fixos: se `Treino.tsx` mudar rótulos ("Iniciar treino", "Feito com o peso do corpo", "Anotação"…), atualize os textos. | e2e `tutorial.spec.ts` |
| Story do fim do treino | `FimTreino.tsx`, `cartaoStory.ts` (`gerarCartaoTreino`) | Heading "Treino concluído", "Semana X: a de b treinos", "Volume" e os botões são âncoras do e2e. O PNG usa só primeiro nome, números e nomes de exercícios (LGPD) e é gerado ao abrir a tela (o Safari exige o compartilhar direto no toque). | e2e `aluno.spec.ts`, `cartaoStory.test.ts` |
| Importar planilha | `src/lib/planilha.ts`, `lib/xlsx.ts`, `ImportarPlanilha.tsx`, `acoes.ts` (`importarMeso`) | Só abas do modelo atual (com "Configuração do Meso"; aba antiga sem o bloco dá erro claro). Config: rótulo "Semana [n]" ou "Número de semanas" (sem acento/maiúsculas; 13/10/2026) ou fallback AY3; bloco de cada semana achado pela 2ª linha "Semana" em B. Treino "Não realizado" fica de fora (carga costuma ser copiada de outro treino e viraria recorde falso). Grava em **produção** num lote só (tudo ou nada); nome repetido no mesmo aluno é recusado (12/10/2026). | `planilha.test.ts`, `xlsx.test.ts`, `e2e/importar.spec.ts` |
| LGPD / exclusão (por projeto: `PROJETO` explícito; nunca lê `exclusoes` de um e apaga no outro) | `Alunos.tsx` ("Apagar de vez") → `apagarAluno` (`acoes.ts`), `exclusoes/{uid}`, `tools/limpeza-lgpd.mjs` | "Apagar de vez" grava `exclusoes/{uid}` **antes** de apagar; Limpeza LGPD (diária) termina Auth/logs/dados, se apagou alguém faz backup novo e apaga os antigos (backups guardados 30 dias); resumo do workflow nunca expõe nome/e-mail/uid; nunca apagar pedido de coach; quem mudar política troca `VERSAO_PRIVACIDADE`. | `tests/limpeza-lgpd.test.ts` |
| Overrides de segurança (`npm audit`) | `package.json` (`overrides`) | Overrides de `basic-ftp`, `uuid` do `gaxios` e `@opentelemetry/core` do `@google-cloud/pubsub` corrigem alertas da firebase-tools. Revisar e tirar quando a CLI atualizar. O `braces` (via chokidar 3) não tem correção publicada: alerta aceito (só roda na CLI, com padrões nossos). | `npm audit` |
| Perfil do aluno (aba Conta) | `ContaAluno.tsx`, `avatar.tsx`, `foto.ts`, `push.ts` | Nome e selo em `usuarios/{uid}`; foto em `fotos/{uid}` (data URL, sem Storage); aviso do fim do descanso por **aparelho** em `localStorage['forca-avisos-descanso']` (`'0'` = desligado; `agendarPush` respeita). `MinhaConta` é só do coach. Gravações sem `await` (offline). Foto lida por `FileReader` (CSP `img-src 'self' data:` bloqueia `blob:`). Política com foto: `VERSAO_PRIVACIDADE` = 2026-10-09. | e2e `conta.spec.ts` |
| Foto de perfil | `firestore.rules` (`fotos`), `acoes.ts` | Só o dono cria/altera (chaves `img` e `atualizadoEm`, JPEG em data URL de até 60000 caracteres, `atualizadoEm == request.time`); dono e coach leem e apagam; o coach nunca grava foto de aluno; `apagarAluno` e a Limpeza LGPD apagam `fotos/{uid}`. Riscos aceitos: qualquer login grava a própria foto (até 60 KB, um doc por uid), e a lista do coach lê todas as fotos (1 leitura por aluno com foto; se pesar no plano gratuito, ler só as linhas visíveis). | `tests/rules.test.ts` (fotos), `limpeza-lgpd.test.ts` |
| Pix simples | `marcas/<id>/marca.json` (`pix`), `PagarPix.tsx`, `Alunos.tsx`, `src/lib/pix.ts`, `acoes.ts` | A chave Pix fica em `marca.json`, é pública (vai no código do app) e não guarda dado do aluno. VFIT = CNPJ, Gislane = e-mail; marca sem `pix` esconde a interface. O acesso só avança com a **confirmação do coach** (`confirmarPagamento`); o "Já paguei" (`informarPagamento`) só grava o aviso e não libera nada sozinho. Gravações sem `await` (offline). Política: `VERSAO_PRIVACIDADE` = 2026-10-10. `confirmarPagamento` recebe o `pagoAte` atual (quem paga adiantado não perde dias; `proximoVencimento` soma 1 mês ao que for maior: vencimento ou hoje). Regras: o aluno só grava `pagamentoInformadoEm == request.time`, mesmo vencido; `mensalidade` (> 0 e ≤ 100000), `pagoAte` e `status` são só do coach. | `pix.test.ts`, `acesso.test.ts`, `tests/rules.test.ts` (pix), e2e `pix.spec.ts` |
| Selects na aba Métodos | `src/features/coach/meso/TabMetodos.tsx` | Select com nome de exercício longo crescia até o maior option e passava da borda (celular). Label `min-w-0 max-w-full` + select `w-full max-w-full`; corrigido em 10/10/2026. | `e2e/layout.spec.ts` (nomes longos, 390 e 1280) |
| Início do treino | `Treino.tsx` (`RelogioTreino`, `travado`), `acoes.ts` (`cancelarTreino`), `firestore.rules` (`inicioEm`), `LoadInput.tsx` (`disabled`) | Só o botão "Iniciar treino" grava `inicioEm`; antes dele os campos de kg e reps e o "Feito com o peso do corpo" ficam travados (treino já concluído continua editável). "Cancelar treino" pede confirmação e faz **um** `updateDoc` que apaga `inicioEm` e cada carga/rep/pc daquele treino **campo a campo** (nunca o documento inteiro; `realizado` não muda). As regras aceitam `inicioEm` = hora do servidor ou removido, nunca a hora do aparelho (10/10/2026). O cancelar mexe em `atualizadoEm`: as telas do coach que olham "hoje" (Início: treinaram hoje/em andamento; Ver semanas: "Treinando hoje") só contam registro com `msSessao` (`resumo.ts`: concluído, `inicioEm` presente ou alguma carga); sem isso o treino cancelado seguia "em andamento" (bug corrigido em 10/10/2026). | `tests/rules.test.ts`, `tests/ataques.test.ts`, `resumo.test.ts` (treino cancelado), e2e `aluno.spec.ts` ("cronômetro não inicia o treino; cancelar…") |
| Correção sem "Iniciar" | `src/lib/acoes.ts` (`atualizarRegistro`), `src/lib/resumo.ts` (`msSessao`), `coletar` (`conta`) | Edição sem "Iniciar" é correção: mantém as cargas (histórico e recordes), mas nunca conta como treino. `realizado` = feito; `inicioEm` = em andamento. Correção é datada na semana planejada. | `resumo.test.ts`, `evolucao.test.ts`, e2e `monitoramento.spec.ts` |
| Modo coach | `Treino.tsx`, `Hoje.tsx` (prop `coach`) | O coach edita sem "Iniciar". O aluno não abre semana passada não feita (só na interface; as regras não mudam, para que carga de sync offline atrasado nunca se perca). | e2e `monitoramento.spec.ts`, `rules.test.ts` |
| Presencial em grupo | `src/features/coach/presencial/`, `src/App.tsx` | As telas ficam montadas e escondidas. Singletons compartilhados: push (só o último cronômetro de descanso), marca de inatividade e restauração do cronômetro de descanso. A troca de aluno é um seletor de vidro embaixo (`nav "Alunos do grupo"`) com pílula própria que desliza por `x` em % (índice do aluno). Não usar `Bolha`/`layoutId` ali: o layoutId mede pela página e, com alunos em rolagens diferentes, a pílula pulava a diferença de rolagem (`layoutRoot` não resolveu). Nada de `overflow` no trilho (corta a pílula) (12/10/2026). A `section` do aluno tem `pb-36` para o seletor não cobrir campos. | e2e `presencial.spec.ts` |
| Alunos (coach) | `Alunos.tsx` (`acoes`) | Visível no cartão só o do dia a dia: Treino presencial (`Botao tipo="destaque"`), Liberar (aguardando) e Confirmar pagamento. Renovar, Bloquear, Liberar (bloqueado), Arquivar, Reativar e Apagar de vez ficam na engrenagem (`Configurações de <nome>`, um aluno aberto por vez). A lista abre sem animar altura (trepidava no iPhone): ela aparece com opacidade + `y` e os cartões de baixo deslizam por `layout="position"` (`linha`), só transform (12/10/2026). Cartão e tabela usam a mesma `acoes`, os dois no DOM: e2e no celular filtra `visible: true`. | e2e `coach.spec.ts`, `pix.spec.ts` |
| Alertas (coach) | `Alertas.tsx` | A lista de arquivados abre sem animar altura (trepidava no iPhone): aparece com opacidade + `y`; cartões e grupos deslizam por `layout="position"`, só transform; o cartão arquivado sai com opacidade + x, sem height (13/10/2026). | e2e `alertas.spec.ts` |
| Barra de abas na mesma altura | `App.tsx` (conteúdo do coach), `AlunoApp.tsx` | Todo conteúdo com `min-h-lvh`: no iPhone a barra fixa embaixo subia nas telas curtas que não rolam (Alertas) (12/10/2026). | e2e `layout.spec.ts` (mesmo `bottom` em todas as abas) |
| PDF do relatório | `src/lib/pdf.ts` (`montarPdf`), `pdfRelatorio.ts` | Gerado em canvas + `montarPdf`, não por `window.print`. | `pdf.test.ts`, e2e `relatorio.spec.ts` |
| Borda nos botões | `src/ui.tsx` (`Botao`, `estilos`) | Todo botão e seletor tem borda, um tom mais claro que o fundo (`Botao` já traz; feito à mão: `border border-slate-600`; vidro: `border-white/20`). Controle segmentado: borda no contêiner. Não vale para abas da barra de vidro, pílulas e botões só de ícone (13/10/2026). | e2e `varredura.spec.ts` |
| Sem emoji | `src/icones.tsx`, `src/semEmoji.test.ts` | Nada de emoji ou símbolo de teclado no código (ⓘ ↻ ▾ ▸ também); use os ícones de `src/icones.tsx`. | `src/semEmoji.test.ts` |
| Pausa e volume no editor | `EditorMeso.tsx`, `TabProgressao.tsx`, `sessao.ts` | Pausa resolvida por exercício: `slot.pausaS` > `pausaPrincipaisS` (posições 1–2; sem valor = `pausaS`) > `pausaS`. Ao editar a pausa dos auxiliares com principais sem valor, grava `pausaPrincipaisS` = valor antigo (os principais não mudam junto). `progressaoPct` e `limiteReps` só existem no Ajustar volume (antes havia um % na Config, usado só na volta da redução, e outro solto no Ajustar volume). A prévia recalcula sozinha (`useMemo`) a partir da semana `de−1`, então reaplicar não muda nada e "Aplicar alterações" fica desligado sem mudança. | `sessao.test.ts` (pausa dos principais), e2e `progressao.spec.ts`, `coach.spec.ts` |
| Topo da tela | `src/index.css` (`pt-topo`), `Presencial.tsx` (`Barra`), `App.tsx` (cabeçalho do coach), `AlunoApp.tsx` | Toda barra ou cabeçalho no topo usa `pt-topo` (área segura + 12px). Toque colado na borda superior puxa a barra de notificações (Android e iPhone), e o botão não responde. Avisos sem toque (`role="alert"`/`status`) podem ficar mais perto. Ações frequentes ficam embaixo, perto do polegar (12/10/2026). | `e2e/layout.spec.ts`, `presencial.spec.ts` |
