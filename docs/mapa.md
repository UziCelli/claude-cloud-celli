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
- `conversores.ts` — `mesoParaDoc()`, `docParaMeso()`, `registroId()`: serialização
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
- `meso/TabDivisao.tsx`, `TabMetodos.tsx`, `TabProgressao.tsx` — abas do editor (progressão: padrão + por exercício via slotId)
- `meso/SugestaoTempo.tsx` — aviso "Treinos acima do tempo" + painel de sugestão de biset/triset (usado no editor e no Início)
- `semana/VisaoSemana.tsx` — monitoramento: séries/reps realizadas vs. prescrição
- `semana/Monitoramento.tsx`, `LoadInput.tsx`, `SessaoCard.tsx` — cards de treino

### `src/features/conta/` — Minha Conta
- `MinhaConta.tsx` — perfil, logout

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
- `e2e/*.spec.ts` — fluxo aluno/coach (Playwright)
- `e2e/seed.ts` — fixture: usuários, mesos

### `tools/` — Scripts offline
- `tools/mfa.mjs` + `.github/workflows/mfa.yml`: ativa o TOTP no projeto e remove o 2º fator do coach em emergência.
- `tools/erros.mjs` + `.github/workflows/erros.yml` ("Ver erros do app"): lista os 100 logs mais recentes no resumo e apaga os com mais de 30 dias.
- `extrair_planilha.py` — lê .xlsx original (conversão manual)
- `planilha_para_meso.py` — transforma matriz em `Meso` JSON
- `importar-meso.mjs` — sobe um meso + cargas para demo Firebase
- `alterar-email.mjs`, `backup.mjs` — utilitários admin

### `.github/workflows/` — CI/CD
- `ci.yml` — typecheck, lint, testes
- `push.yml` — publica o Worker `push/` na Cloudflare (push em `push/**` ou manual) e mostra a URL
- `deploy.yml` — build e deploy Firebase Hosting
- `android.yml`, `apk.yml` — gera APK (TWA)
- `importar-meso.yml` — workflow: `/importar` trigger (auth: token)
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
| Inatividade | `src/lib/inatividade.ts` | Coach 20 min, aluno 30 min; o cronômetro rodando conta como uso; só sai depois de `waitForPendingWrites` (offline = avisa e espera). | `inatividade.test.ts` |
| Tentativas de login | `src/lib/tentativas.ts`, `Entrar.tsx` | Depois de 5 falhas, espera crescente (30 s → máx. 15 min) por aparelho; zera no sucesso. | `tentativas.test.ts` |
| Push: acesso | `push/src/acesso.ts`, `index.ts` | `/agendar` só para coach ou aluno ativo e em dia (perfil lido com o token dele, cache de 10 min); 30 por minuto (429); falha ao ler = 503; CORS sem localhost. O limite e o cache ficam na memória da instância e recomeçam se ela reiniciar. | `push/src/acesso.test.ts`, `cors.test.ts` |
| Descanso salvo | `src/lib/descanso.ts` | O estado guarda o `uid`; de outra conta (ou sem uid) é ignorado e apagado. | `descanso.test.ts` |
| 2º fator do coach | `src/lib/mfa.ts`, `Entrar.tsx`, `MinhaConta.tsx` | TOTP (Google Authenticator). Código errado conta como tentativa falha; sessão vencida volta ao e-mail e senha. Emergência: workflow `mfa.yml`, ação `desativar-coach`. | `mfa.test.ts` |
| App Check | `src/lib/firebase.ts` | Só liga com `VITE_RECAPTCHA_KEY` e fora do emulador. Antes, liberar o reCAPTCHA na CSP (`docs/seguranca.md`). | build |
| Anotações do aluno | `firestore.rules` (`notas`), `acoes.ts` | Até 300 exercícios por documento; a interface corta cada texto em 300 caracteres. As regras do Firestore não conseguem limitar o tamanho dos **valores** de um mapa: um aluno logado pode gravar até 1 MiB só no próprio documento. Risco aceito (afeta só o documento dele). | `tests/rules.test.ts` (notas) |
| Volume de logs | `firestore.rules` (`logs`), `log.ts` | O limite de 20 por dia é do cliente; uma conta logada pode criar mais (documentos de até ~1 KB). Risco baixo, aceito. | — |
