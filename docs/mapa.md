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
- `treino.ts` — `buscarTreino()`, `carregarRegistros()`: dados do Firestore
- `resumo.ts` — resumo semanal: totais de volume/força
- `*.test.ts` — testes

### `src/features/auth/` — Autenticação
- `Entrar.tsx` — login Google/e-mail, cadastro

### `src/features/aluno/` — App do aluno
- `AlunoApp.tsx` — roteador do aluno
- `Hoje.tsx` — treino de hoje
- `Treino.tsx` — detalhe do treino (cargas, reps)
- `EvolucaoAluno.tsx` — gráficos: reps, força, volume
- `mesoAtual.ts` — `mesoAtual()`: mesociclo em vigor

### `src/features/coach/` — App do coach
- `inicio/Inicio.tsx` — dashboard do coach
- `alunos/Alunos.tsx`, `NovoAluno.tsx` — lista, cadastro
- `meso/EditorMeso.tsx` — editor visual: divisão, métodos, progressão
- `meso/MesosDoAluno.tsx` — lista de mesos de um aluno
- `meso/TabDivisao.tsx`, `TabMetodos.tsx`, `TabProgressao.tsx` — abas do editor
- `semana/VisaoSemana.tsx` — monitoramento: séries/reps realizadas vs. prescrição
- `semana/Monitoramento.tsx`, `LoadInput.tsx`, `SessaoCard.tsx` — cards de treino

### `src/features/conta/` — Minha Conta
- `MinhaConta.tsx` — perfil, logout

### `src/features/instalar/` — PWA/Android
- `Instalar.tsx` — página de instalação
- `AvisoIOS.tsx` — instrução iOS

### `src/` — Raiz
- `App.tsx` — roteador principal: rotas, verificação de permissão
- `rota.ts` — `useRota()`, `ir()`, `casar()`: hash routing
- `main.tsx` — entry point React
- `ui.tsx` — componentes comuns: `Botao`, `Centro`, `Tab`, etc.
- `index.css` — Tailwind, cores marca, fontes
- `Logo.tsx` — marca VFITCOACH

### `src/data/` — Dados estáticos
- `exercicios.json` — catálogo de exercícios

### `tests/` · `e2e/` — Testes
- `tests/rules.test.ts` — segurança Firestore (emulador)
- `e2e/*.spec.ts` — fluxo aluno/coach (Playwright)
- `e2e/seed.ts` — fixture: usuários, mesos

### `tools/` — Scripts offline
- `extrair_planilha.py` — lê .xlsx original (conversão manual)
- `planilha_para_meso.py` — transforma matriz em `Meso` JSON
- `importar-meso.mjs` — sobe um meso + cargas para demo Firebase
- `alterar-email.mjs`, `backup.mjs` — utilitários admin

### `.github/workflows/` — CI/CD
- `ci.yml` — typecheck, lint, testes
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
- `progressao`: `{ principais: { s1: [reps meta], … }, auxiliares: … }`
- `criadoEm`, `atualizadoEm`

### `registros/{regId}`
- Chave: `{mesoId}_s{semana:02d}_t{treino}` (ex.: `abc_s01_t1`)
- `alunoId`, `mesoId`, `semana`, `treino`
- `cargas`: `{ slotId: { s1: 100, s2: 95, … } }` (peso ou reps absolutas)
- `reps`: idem (reps feitas, opcional)
- `realizado`: bool, `realizadoEm`, `atualizadoEm`

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
