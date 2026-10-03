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
| Cores, fontes, grid | `src/index.css` (`@theme`: escalas slate/marca e fontes; Tailwind 4, sem tailwind.config) |
| Cabeçalhos HTTP, CSP, PWA | `firebase.json` |
| Importar mesociclo de planilha | `tools/planilha_para_meso.py` + `tools/importar-meso.mjs` + workflow `.github/workflows/importar-meso.yml` |
| Monitoramento de segurança | `tools/vigia.mjs` + `.github/workflows/vigia.yml` + `tests/vigia.test.ts` |
| Offline/sync Firebase | `src/lib/firebase.ts` + `firestore.rules` |
| Roteamento (hash, /aluno/123, etc.) | `src/rota.ts` + `src/App.tsx` |
| Notificação "Descanso acabou" (push, app fechado) | `src/lib/push.ts` + `public/sw-push.js` + `push/` (Worker Cloudflare) — veja `docs/push.md` |

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
- `conversores.ts` — `mesoParaDoc()`, `docParaMeso()`, `registroId()`: serialização; `normalizarCargas()`/`docsParaRegistros()`: leitura única das cargas (peso do corpo)
- `hooks.ts` — `useUsuarioAtual()`, `useMeso()`, etc.: React hooks
- `push.ts` — `agendarPush()`, `cancelarPush()`: avisam o Worker de push (sem `VITE_PUSH_URL`, não fazem nada)
- `treino.ts` — `buscarTreino()`, `carregarRegistros()`: dados do Firestore
- `resumo.ts` — resumo semanal: totais de volume/força
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
- `Hoje.tsx` — treino de hoje
- `Treino.tsx` — detalhe do treino (cargas, reps, selos de método, nota ao abrir, cronômetro)
- `AvisoNotificacoes.tsx` — cartão persistente para permitir notificações (Hoje e Treino)
- `src/lib/pesoCorporal.ts` (+ `pesoCorporal.test.ts`) — fração do peso do corpo e `corpoEhCarga` (marca automática)
- `src/lib/metodoSeries.ts` — séries destacadas (borda rosa) a partir do rótulo do método
- `EvolucaoAluno.tsx` — gráficos: reps, força, volume
- `mesoAtual.ts` — `mesoAtual()`: mesociclo em vigor

### `src/features/metodos/` — Guia e ícones dos métodos (rota `#/metodos`, aluno e coach)
- `IconeMetodo.tsx` — ícone SVG animado por método
- `GuiaMetodos.tsx` — página "Guia de métodos" + botão "Mostrar as notas de novo"
- Textos: `src/data/metodos.ts` (`METODOS`, `ORDEM`, `metodoDoRotulo`); notas dispensadas: `src/lib/notasMetodo.ts`

### `src/features/coach/` — App do coach
- `inicio/Inicio.tsx` — dashboard do coach
- `alunos/Alunos.tsx`, `NovoAluno.tsx` — lista, cadastro
- `meso/EditorMeso.tsx` — editor visual: divisão, métodos, progressão
- `meso/MesosDoAluno.tsx` — lista de mesos de um aluno
- `meso/CampoExercicio.tsx` — combobox de exercício (sugestões de `src/lib/busca.ts`, texto livre)
- `meso/TabDivisao.tsx` (navegação por teclado: Tab/Enter via `onAvancar` do `CampoExercicio`, foco no `useEffect`; copiar treino via `copiarTreino` de `meso/util.ts`), `TabMetodos.tsx` (filtro semana/treino/exercício via `filtrarMetodos`, só visualização), `TabProgressao.tsx` (prévia do Ajustar volume com Cancelar e reps por exercício via `fmtReps` de `src/lib/tempo.ts`) — abas do editor (progressão: padrão + por exercício via slotId)
- `meso/SugestaoTempo.tsx` — aviso "Treinos acima do tempo" + painel de sugestão de biset/triset (usado no editor e no Início)
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

### `public/`
- `sw-push.js` — trata o push e o clique na notificação (importado pelo service worker via `workbox.importScripts`)

### `src/` — Raiz
- `App.tsx` — roteador principal: rotas, verificação de permissão
- `rota.ts` — `useRota()`, `ir()`, `casar()`: hash routing
- `main.tsx` — entry point React
- `ui.tsx` — componentes comuns: `Botao`, `Centro`, `Tab`, etc.
- `motionFeatures.ts` — recursos da biblioteca Motion carregados sob demanda; animações e componentes `Tela`, `Painel`, `Barra`, `cascata`/`item` ficam em `src/ui.tsx`
- `ui.tsx` também tem `Abertura` (carregando), `Msg` (mensagem que aparece/some), `Deslizar` (troca de semana), `Contar`; toque/hover de botões, links, selects e checkboxes vêm do `index.css`
- `index.css` — Tailwind, cores marca, fontes
- `Logo.tsx` — marca VFITCOACH

### `src/data/` — Dados estáticos
- `exercicios.json` — catálogo de exercícios

### `tests/` · `e2e/` — Testes
- `tests/rules.test.ts` — segurança Firestore (emulador)
- `tests/ataques.test.ts` — teste de ataques (troca de ID, escalada, anônimo, abuso); todo caso deve ser negado
- `e2e/*.spec.ts` — fluxo aluno/coach (Playwright); `e2e/varredura.spec.ts` abre todas as telas em 1280/390 px (erro, rolagem horizontal, "undefined"/"NaN")
- `e2e/seed.ts` — fixture: usuários, mesos

### `tools/` — Scripts offline
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
- `deploy.yml` — build e deploy Firebase Hosting
- `android.yml`, `apk.yml` — gera APK (TWA)
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
| `/meso/:id` | EditorMeso | Coach |
| `/meso/:id/semana/:n` | VisaoSemana | Coach |
| `/conta` | MinhaConta | Ambos |
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
| `npm run icones` | gera favicons/app icons |

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
| Inatividade | `src/lib/inatividade.ts` | Coach 20 min, aluno 30 min; o cronômetro rodando conta como uso; só sai depois de `waitForPendingWrites` (offline = avisa e espera). Bug corrigido em 01/10/2026: a marca de uso fica no aparelho depois de sair, então o login novo derrubava a pessoa na hora (e o código do 2º fator, já usado, dava "incorreto" até travar em quota-exceeded). Por isso o `Entrar.tsx` chama `marcar()` ao enviar.  Sem marca (0, navegador sem armazenamento) não expira. | `inatividade.test.ts`, e2e "login novo não cai por inatividade antiga" |
| Aba antiga após publicar | `src/lib/atualizar.ts`, `Entrar.tsx`, plugin `versao` em `vite.config.ts` | O service worker novo assume, mas a página aberta continua com o JS antigo (foi o login que caía no PC em 01/10/2026). Na tela de login, compara `__VERSAO__` com `versao.json` (do mesmo cache do SW) e recarrega uma vez por versão (marca em sessionStorage evita laço). Só na tela de login: em telas logadas um reload poderia perder edição. A versão aparece no rodapé do login. | `atualizar.test.ts`, e2e `atualizar.spec.ts` |
| Tentativas de login | `src/lib/tentativas.ts`, `Entrar.tsx` | Depois de 5 falhas, espera crescente (30 s → máx. 15 min) por aparelho; zera no sucesso. | `tentativas.test.ts` |
| Push: acesso | `push/src/acesso.ts`, `index.ts` | `/agendar` só para coach ou aluno ativo e em dia (perfil lido com o token dele, cache de 10 min); 30 por minuto (429); falha ao ler = 503; CORS sem localhost. O limite e o cache ficam na memória da instância e recomeçam se ela reiniciar. | `push/src/acesso.test.ts`, `cors.test.ts` |
| Descanso salvo | `src/lib/descanso.ts` | O estado guarda o `uid`; de outra conta (ou sem uid) é ignorado e apagado. | `descanso.test.ts` |
| 2º fator do coach | `src/lib/mfa.ts`, `Entrar.tsx`, `MinhaConta.tsx` | TOTP (Google Authenticator). Código errado conta como tentativa falha; sessão vencida e `auth/quota-exceeded` (limite de códigos errados por login, 01/10/2026) voltam ao e-mail e senha. Tentativas de ativação antigas deixam vários "VFITCOACH" no Authenticator: só o mais recente vale. Emergência: workflow `mfa.yml`, ação `desativar-coach`. | `mfa.test.ts` |
| 2º fator exigido nas regras | `firestore.rules` (`segundoFator`, `isCoach`), `src/lib/acesso.ts` (`faltaSegundoFator`), `App.tsx`, `e2e/seed.ts` | Todo poder de coach exige `sign_in_second_factor` no token; sem ele o coach só lê o próprio `usuarios/{uid}` e o painel mostra um aviso. A exceção `mfaDispensado` (custom claim) existe só no seed do emulador: nenhum código do app nem workflow de produção a define. Emergência: workflow `mfa.yml` ação `desativar-coach`; depois de rodar, é preciso reativar o 2º fator em Minha conta e entrar de novo. | `tests/rules.test.ts` (2º fator do coach), `acesso.test.ts`, e2e |
| App Check | `src/lib/firebase.ts` | Provedor reCAPTCHA Enterprise, em modo Monitorar (só liga com `VITE_RECAPTCHA_KEY` e fora do emulador). A CSP precisa manter os domínios do reCAPTCHA (`script-src`, `frame-src`, `connect-src`). Selo escondido por CSS (`.grecaptcha-badge`) com o aviso legal na tela de login (`Entrar.tsx`). | build |
| Anotações do aluno | `firestore.rules` (`notas`), `acoes.ts` | Até 300 exercícios por documento; a interface corta cada texto em 300 caracteres. As regras do Firestore não conseguem limitar o tamanho dos **valores** de um mapa: um aluno logado pode gravar até 1 MiB só no próprio documento. Risco aceito (afeta só o documento dele). | `tests/rules.test.ts` (notas) |
| Alertas de segurança | `tools/vigia.mjs` | Alertas com **contagens** apenas (nunca nome, e-mail ou uid). Limites em topo de `vigia.mjs`: cadastros/24h (10), aguardando aprovação (20), erros/24h (100), acessos negados/24h (20), logs total (5000), limpeza LGPD atrasada (2 dias). A cada 6h o workflow abre Issues com @UziCelli sem repetir se houver aberta. Falha do vigia também abre Issue. Override de `@grpc/grpc-js` em `package.json` é falso positivo de `npm audit` (roda só no Node). | `tests/vigia.test.ts` |
| Peso do corpo automático | `src/lib/pesoCorporal.ts` (`corpoEhCarga`, `rebasear`, `preencherCorpo`), `conversores.ts` (`normalizarCargas`), `Treino.tsx`, `SessaoCard.tsx` | **Detalhes, formatos antigos e como verificar: `docs/peso-corporal.md`.** Toda leitura de cargas passa por `docsParaRegistros(docs, meso)` (normaliza dado de versão antiga; nunca use `docParaCargas` cru em tela/cálculo). Barra fixa, flexão de braços, abdominal no solo sem carga e agachamento com peso do corpo já vêm com "Somar meu peso corporal" marcado. Só vale para slot **sem carga** e **sem `pc.<slot>` explícito**; ao gravar a 1ª carga, o `pc` é gravado junto, então histórico e métricas antigas não mudam. Sem `pesoKg` no perfil não há automático (fica a opção manual com aviso). **Convenção: `cargas.<slot>.s<n>` guarda o TOTAL (extra + `pc`)**; a tela mostra `total - corpo`. Ao marcar/desmarcar/trocar o `pc` (A para B), `rebasear` regrava campo a campo cada carga já preenchida como `c - A + B`; carga menor que A (gravada sem o corpo, dado antigo) fica como está, para nenhuma carga se perder. Ao "Concluir treino", `preencherCorpo` grava `pc` (se faltar) e `carga = corpo` nas séries prescritas **vazias** (nunca sobrescreve; drop fica de fora); `estadoCorpo` (Treino.tsx) é a regra única de `corpo`/`auto`. O coach vê "Inclui peso do corpo: X kg" no card. `tools/aluno-exemplo.mjs` também grava extra + pc. | `pesoCorporal.test.ts`, `conversores.test.ts`, `treino.test.ts`, `tests/aluno-exemplo.test.ts`, e2e `peso-corpo.spec.ts` |
| Volume de logs | `firestore.rules` (`logs`), `log.ts` | O limite de 20 por dia é do cliente; uma conta logada pode criar mais (documentos de até ~1 KB). Risco baixo, aceito. | — |
| Aluno de exemplo | `tools/aluno-exemplo.mjs`, `aluno-exemplo.yml` | Escreve em **produção**, só no aluno "Victor Aluno"/"Victor C.L. Silva" (falha se não houver exatamente 1). Nunca cria, altera ou apaga registros da **semana 2** (o Victor registra ao vivo); só grava a semana 1, com merge. Em outros mesos da conta só muda `inicio` dos que estiverem em andamento (guarda `inicioOriginal`). | `tests/aluno-exemplo.test.ts` (emulador) |
| LGPD / exclusão | `Alunos.tsx` ("Apagar de vez") → `apagarAluno` (`acoes.ts`), `exclusoes/{uid}`, `tools/limpeza-lgpd.mjs` | "Apagar de vez" grava `exclusoes/{uid}` **antes** de apagar; Limpeza LGPD (diária) termina Auth/logs/dados, se apagou alguém faz backup novo e apaga os antigos (backups guardados 30 dias); resumo do workflow nunca expõe nome/e-mail/uid; nunca apagar pedido de coach; quem mudar política troca `VERSAO_PRIVACIDADE`. | `tests/limpeza-lgpd.test.ts` |
