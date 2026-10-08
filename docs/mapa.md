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
| Importar mesociclo de planilha | `tools/planilha_para_meso.py` + `tools/importar-meso.mjs` + workflow `.github/workflows/importar-meso.yml` |
| Monitoramento de segurança | `tools/vigia.mjs` + `.github/workflows/vigia.yml` + `tests/vigia.test.ts` |
| Offline/sync Firebase | `src/lib/firebase.ts` + `firestore.rules` |
| Roteamento (hash, /aluno/123, etc.) | `src/rota.ts` + `src/App.tsx` |
| Notificação "Descanso acabou" (push, app fechado) | `src/lib/push.ts` + `public/sw-push.js` + `push/` (Worker Cloudflare) — veja `docs/push.md` |
| Painel de evolução, conquistas, ranking | `src/lib/evolucao.ts` + `src/features/evolucao/` + `src/features/coach/RankingAlunos.tsx` |

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
- `alertas.ts` (+ `alertas.test.ts`) — `repsAbaixo()` e `treinosDemorados()` (7 dias; limites em constantes no topo)
- `conversores.ts` — `mesoParaDoc()`, `docParaMeso()`, `registroId()`: serialização; `normalizarCargas()`/`docsParaRegistros()`: leitura única das cargas (peso do corpo)
- `hooks.ts` — `useUsuarioAtual()`, `useMeso()`, etc.: React hooks
- `push.ts` — `agendarPush()`, `cancelarPush()`: avisam o Worker de push (sem `VITE_PUSH_URL`, não fazem nada)
- `treino.ts` — `buscarTreino()`, `carregarRegistros()`: dados do Firestore
- `resumo.ts` — resumo semanal: totais de volume/força
- `evolucao.ts` — `painelEvolucao()`, `historicoExercicios()`, `comparacaoToneladas()`, `recordeAnterior()`, `resumoTreino()` (tela de fim de treino), `rankingAlunos()`: cálculos do painel de evolução
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

### `src/features/aluno/` — App do aluno
- `AlunoApp.tsx` — roteador do aluno
- `Hoje.tsx` — treino de hoje (prop `base`: prefixo das rotas; o presencial do coach usa) + aviso "Reps abaixo da meta"
- `Treino.tsx` — detalhe do treino (cargas, reps, selos de método, nota ao abrir, cronômetro, festa no recorde)
- `FimTreino.tsx` — tela de fim de treino estilo story (duração, volume, recordes, cargas que subiram, semana) + "Compartilhar no story"; abre no "Concluir treino" e no "Ver resumo"; vale também no presencial
- `Tutorial.tsx` — passo a passo do aluno (abre 1x no 1º acesso; botão "Como usar" no topo; título de boas-vindas em `marca.json` → `boasVindas`)
- `AvisoNotificacoes.tsx` — cartão persistente para permitir notificações (Hoje e Treino)
- `src/lib/pesoCorporal.ts` (+ `pesoCorporal.test.ts`) — fração do peso do corpo e `corpoEhCarga` (marca automática)
- `src/lib/metodoSeries.ts` — séries destacadas (borda rosa) a partir do rótulo do método
- `EvolucaoAluno.tsx` — reexporta o painel de evolução
- `mesoAtual.ts` — `mesoAtual()`: mesociclo em vigor

### `src/features/evolucao/` — Painel de evolução, conquistas, cartão
- `PainelEvolucao.tsx` — tela única para aluno (`#/evolucao`) e coach (`#/aluno/:uid/evolucao`): números, calendário, maiores evoluções, recordes, conquistas, tabela por exercício
- `cartaoStory.ts` — imagem Canvas 1080×1920 com logo, primeiro nome e números para compartilhar no Instagram (`gerarCartao` da evolução, `gerarCartaoTreino` do fim do treino)
- `BotaoCompartilhar.tsx` — botão "Compartilhar no story" (usa `navigator.share` ou download PNG)

### `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach)
- `IconeMetodo.tsx` — ícone SVG animado por método
- `GuiaMetodos.tsx` — página "Guia de métodos" + botão "Mostrar as notas de novo"
- Textos: `src/data/metodos.ts` (`METODOS`, `COR_METODO`, `ORDEM`, `metodoDoRotulo`); notas dispensadas: `src/lib/notasMetodo.ts`

### `src/features/coach/` — App do coach
- `presencial/Presencial.tsx` — `PresencialHoje`/`PresencialTreino`: faixa "Presencial: aluno" + as telas Hoje/Treino do aluno com `base`
- `inicio/Inicio.tsx` — dashboard do coach (faixa "⚠️ N alertas" no topo)
- `alertas/Alertas.tsx` — aba Alertas (`#/alertas`): reps abaixo da meta, treinos acima do tempo, treinos que demoraram; hook `useAlertasCoach()` (também usado no Início)
- `alunos/Alunos.tsx`, `NovoAluno.tsx` — lista, cadastro
- `meso/EditorMeso.tsx` — editor visual: divisão, métodos, progressão
- `meso/MesosDoAluno.tsx` — lista de mesos de um aluno
- `meso/CampoExercicio.tsx` — combobox de exercício (sugestões de `src/lib/busca.ts`, texto livre)
- `meso/TabDivisao.tsx` (navegação por teclado: Tab/Enter via `onAvancar` do `CampoExercicio`, foco no `useEffect`; copiar treino via `copiarTreino` de `meso/util.ts`), `TabMetodos.tsx` (filtro semana/treino/exercício via `filtrarMetodos`, só visualização), `TabProgressao.tsx` (prévia do Ajustar volume com Cancelar e reps por exercício via `fmtReps` de `src/lib/tempo.ts`) — abas do editor (progressão: padrão + por exercício via slotId)
- `meso/SugestaoTempo.tsx` — aviso "Treinos acima do tempo" + painel de sugestão de biset/triset (usado no editor e na aba Alertas)
- `semana/VisaoSemana.tsx` — monitoramento: séries/reps realizadas vs. prescrição
- `semana/Monitoramento.tsx`, `LoadInput.tsx`, `SessaoCard.tsx` — cards de treino (treino de hoje em destaque: prop `hoje`, calculada em `VisaoSemana`; Início usa `resumoCoach().treinosHoje`)

### `src/features/conta/` — Minha Conta
- `MinhaConta.tsx` — perfil, logout, solicitar exclusão

### `src/features/privacidade/` — Política e Aceite
- `Politica.tsx` — página pública /privacidade + `CaixaAceite` (widget persistente)
- `Aceite.tsx` — tela de aceite obrigatório (aluno antes de `AlunoApp`, coach antes do `CoachApp`)

### `src/lib/` — Privacidade
- `privacidade.ts` — `VERSAO_PRIVACIDADE` (troca = novo aceite obrigatório)

### `src/features/instalar/` — PWA/Android
- `Instalar.tsx` — página de instalação
- `AvisoIOS.tsx` — instrução iOS

### `marcas/<id>/` — uma pasta por marca (`vfit`, `gislane`)
- `marca.json` — nome, título, nome curto, cores do manifest, domínio e dados do responsável (Política). Os textos do app leem daqui (`import marca from '@marca/marca.json'`).
- `tema.css` — `@theme` com as escalas `slate` e `marca`; `Logo.tsx` — logo; `public/` — ícones, favicon, `icon.svg`, `.well-known/assetlinks.json`.
- A marca vem do `--mode` do Vite: existe `marcas/<mode>` → essa marca; senão `vfit`. `@marca` aponta para a pasta (no `tsc` sempre `vfit`).
- `public/` da marca é mesclada com `public/` por um plugin em `vite.config.ts` (dev serve, build emite antes do SW, então entra no precache).
- Gislane local: `npm run emuladores` + `npm run dev:gislane` (sem `.env.production` cai no emulador). Build: `npm run build:gislane`. Ícones: `npm run icones:gislane`. e2e: `MARCA=gislane npm run test:e2e`.
- `marcas/gislane/marca.json` completo (o deploy trava se aparecer "A CONFIRMAR").

### `public/` (comum às marcas)
- `sw-push.js` — trata o push e o clique na notificação (importado pelo service worker via `workbox.importScripts`)

### `src/` — Raiz
- `App.tsx` — roteador principal: rotas, verificação de permissão
- `rota.ts` — `useRota()`, `ir()`, `casar()`: hash routing
- `main.tsx` — entry point React
- `ui.tsx` — componentes comuns: `Botao`, `Centro`, `Tab`, etc.
- `motionFeatures.ts` — recursos da biblioteca Motion carregados sob demanda; animações e componentes `Tela`, `Painel`, `Barra`, `cascata`/`item` ficam em `src/ui.tsx`
- `ui.tsx` também tem `Abertura` (carregando), `Msg` (mensagem que aparece/some), `Deslizar` (troca de semana), `Contar`; toque/hover de botões, links, selects e checkboxes vêm do `index.css`
- `index.css` — Tailwind, fontes (as cores vêm de `marcas/<id>/tema.css`)
- Logo: `marcas/<id>/Logo.tsx` (`import Logo from '@marca/Logo'`)

### `src/data/` — Dados estáticos
- `exercicios.json` — catálogo de exercícios

### `tests/` · `e2e/` — Testes
- `tests/rules.test.ts` — segurança Firestore (emulador)
- `tests/ataques.test.ts` — teste de ataques (troca de ID, escalada, anônimo, abuso); todo caso deve ser negado
- `e2e/*.spec.ts` — fluxo aluno/coach (Playwright); `e2e/varredura.spec.ts` abre todas as telas em 1280/390 px (erro, rolagem horizontal, "undefined"/"NaN")
- `e2e/presencial.spec.ts` — coach treina o aluno (com app e presencial) no próprio celular
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
| `/ranking` | RankingAlunos | Coach |
| `/conta` | MinhaConta | Ambos |
| `/evolucao` | EvolucaoAluno (`PainelEvolucao.tsx`) | Aluno |
| (padrão) | AlunoApp | Aluno |

---

## Coleções Firestore

### `usuarios/{uid}`
- `papel`: 'coach' \| 'aluno'
- `status`: 'ativo' \| 'aguardando' \| 'bloqueado'
- `nome`, `email`, `criadoEm`, `pagoAte` (timestamp)

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
| Push do descanso | `push/src/` | Token do Firebase verificado (aud/iss/exp/assinatura); só endpoints de push conhecidos (`HOSTS`); chaves VAPID nunca regeneradas. | `push/src/*.test.ts`, conferência no `push.yml` |
| CSP | `firebase.json` | `connect-src` só com os domínios usados (Google APIs e o Worker); o e2e usa a mesma CSP. | e2e completo |
| Registro de erros | `firestore.rules` (`logs`), `src/lib/log.ts` | Criar só logado, com `hasOnly` e tamanhos fixos, `uid == auth.uid` e `em == request.time`; só o coach lê e apaga; ninguém edita. O log nunca registra o próprio erro, e `promessa` ignora o que já foi registrado como `gravacao`. Antes do login fica numa fila local; máx. 20 por aparelho por dia. | `tests/rules.test.ts` (logs), `log.test.ts` |
| Menu do topo | `src/App.tsx` (coach), `src/features/aluno/AlunoApp.tsx` | Logo fixo (posição e tamanho combinados com o Victor, não mexer). Links sem quebra; abaixo de `sm` "Minha conta" vira ícone (nome acessível "Minha conta"); a fileira rola para o lado com degradê só como reserva em telas muito estreitas. A página não pode ganhar rolagem horizontal. | `e2e/layout.spec.ts` |
| Inatividade | `src/lib/inatividade.ts` | Coach 20 min, aluno 4 h (era 30 min até 06/10/2026; aluno reclamou); o cronômetro rodando conta como uso; **treino em andamento neste aparelho também** (marca `forca-treino-andamento` = `{inicio, ate: +3 h}` gravada ao iniciar em `Treino.tsx`, apagada no "Concluir"/realizado; teto de 3 h para treino esquecido; `treinoEmAndamento` em `inatividade.ts`); só sai depois de `waitForPendingWrites` (offline = avisa e espera). Bug corrigido em 01/10/2026: a marca de uso fica no aparelho depois de sair, então o login novo derrubava a pessoa na hora (e o código do 2º fator, já usado, dava "incorreto" até travar em quota-exceeded). Por isso o `Entrar.tsx` chama `marcar()` ao enviar.  Sem marca (0, navegador sem armazenamento) não expira. | `inatividade.test.ts`, e2e "login novo não cai por inatividade antiga", `relogio.spec.ts` |
| Aba antiga após publicar | `src/lib/atualizar.ts`, `Entrar.tsx`, plugin `versao` em `vite.config.ts` | O service worker novo assume, mas a página aberta continua com o JS antigo (foi o login que caía no PC em 01/10/2026). Na tela de login, compara `__VERSAO__` com `versao.json` (do mesmo cache do SW) e recarrega uma vez por versão (marca em sessionStorage evita laço). Só na tela de login: em telas logadas um reload poderia perder edição. A versão aparece no rodapé do login. | `atualizar.test.ts`, e2e `atualizar.spec.ts` |
| Tentativas de login | `src/lib/tentativas.ts`, `Entrar.tsx` | Depois de 5 falhas, espera crescente (30 s → máx. 15 min) por aparelho; zera no sucesso. | `tentativas.test.ts` |
| Push: acesso | `push/src/acesso.ts`, `index.ts` | `/agendar` só para coach ou aluno ativo e em dia (perfil lido com o token dele, cache de 10 min); 30 por minuto (429); falha ao ler = 503; CORS sem localhost. O limite e o cache ficam na memória da instância e recomeçam se ela reiniciar. | `push/src/acesso.test.ts`, `cors.test.ts` |
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
| Tutorial do aluno | `src/features/aluno/Tutorial.tsx`, `AlunoApp.tsx` | Abre 1x (`forca-tutorial-visto`), nunca com `navigator.webdriver` (não atrapalha os e2e); sem `localStorage` não abre em laço. Boas-vindas vêm de `marcas/<id>/marca.json` (`boasVindas`: "à VFITCOACH", "ao app da Gislane"), nunca texto fixo. As telas são desenhos fixos: se `Treino.tsx` mudar rótulos ("Iniciar treino", "Feito com o peso do corpo", "Anotação"…), atualize os textos. | e2e `tutorial.spec.ts` |
| Story do fim do treino | `FimTreino.tsx`, `cartaoStory.ts` (`gerarCartaoTreino`) | Heading "Treino concluído", "Semana X: a de b treinos", "Volume" e os botões são âncoras do e2e. O PNG usa só primeiro nome, números e nomes de exercícios (LGPD) e é gerado ao abrir a tela (o Safari exige o compartilhar direto no toque). | e2e `aluno.spec.ts`, `cartaoStory.test.ts` |
| Importar planilha | `tools/planilha_para_meso.py`, `importar-meso.yml` | O bloco de cada semana tem `1 + 13·n` linhas, `n` = treinos do **modelo** da aba (79 no "6x", 53 no "4x"); o conversor acha pela 2ª linha "Semana" em B (antes era fixo em 79 e a aba M7 do Thiago, modelo 4x, dava "Layout inesperado"; corrigido em 07/10/2026). Antes de importar, confira treinos "Não realizado" com cargas copiadas de outro treino (ex.: Rosca Martelo 65 kg): ficam de fora para não virar recorde falso. O import grava em **produção**; aluno por e-mail ou nome exato (parecido = erro; sem nenhum = vira presencial). | conferência manual do JSON |
| LGPD / exclusão (por projeto: `PROJETO` explícito; nunca lê `exclusoes` de um e apaga no outro) | `Alunos.tsx` ("Apagar de vez") → `apagarAluno` (`acoes.ts`), `exclusoes/{uid}`, `tools/limpeza-lgpd.mjs` | "Apagar de vez" grava `exclusoes/{uid}` **antes** de apagar; Limpeza LGPD (diária) termina Auth/logs/dados, se apagou alguém faz backup novo e apaga os antigos (backups guardados 30 dias); resumo do workflow nunca expõe nome/e-mail/uid; nunca apagar pedido de coach; quem mudar política troca `VERSAO_PRIVACIDADE`. | `tests/limpeza-lgpd.test.ts` |
