# Plano — App da Gislane (segunda marca)

> Para usar em outra sessão. Comece assim: *"Leia `docs/plano-app-gislane.md` e execute a Fase A"*.
> As decisões abaixo já foram pensadas: não é preciso refazer o brainstorming, é só confirmar a seção "Checklist antes de começar".

## Resumo para o Victor
- A Gislane prescreve igual a você. Por isso ela usa **o mesmo app**, só com **outra identidade visual** (logo, cores, fontes, nome e ícone).
- **Um código só, dois apps.** Toda melhoria que você pedir chega nos dois de uma vez. Nada de manter duas cópias.
- **Um banco de dados para cada um,** que no Firebase é um projeto separado. Ela nunca vê os seus alunos e você não vê os dela.
- **Custo: zero.** Cada projeto tem a própria cota grátis.

## Decisões recomendadas (e por quê)

### 1. Mesmo código, duas marcas (não copiar o repositório)
- Copiar o repositório obrigaria a fazer toda melhoria duas vezes, e as duas versões iam se separar com o tempo.
- O caminho é deixar a marca **configurável na hora de gerar o app**:
  - `npm run build -- --mode vfit` gera o app da VFITCOACH.
  - `npm run build -- --mode gislane` gera o app da Gislane.
- Não precisa de worktree nova nem de repositório novo. É o mesmo repositório, e o trabalho vai num PR normal.

### 2. Banco de dados: um projeto Firebase para cada coach
- **Capacidade não é o problema.** 15 alunos somando os dois dão cerca de 3 mil leituras por dia, e o grátis permite 50 mil. Um projeto só aguentaria.
- **Mesmo assim, separar é melhor, pela organização e pela segurança:**
  - Hoje a regra de segurança dá ao coach acesso a **tudo** do projeto. No mesmo projeto, a Gislane veria os seus alunos. Evitar isso exigiria mudar o modelo de dados e as regras (`coachId` em tudo), o que dá mais trabalho e mais risco.
  - Com projetos separados, **as regras e o código ficam iguais**, cada um tem a própria cota e o próprio login, e um app nunca derruba o outro.
- As regras e os índices (`firestore.rules`) são publicados nos dois projetos pelo mesmo workflow.

### 3. Endereço (decidir antes de ela ter alunos)
Trocar o endereço depois obriga cada aluno a reinstalar o app. Opções:

| Opção | Custo | Observação |
|---|---|---|
| `gislane.vfitcoachapp.com` (subdomínio) | grátis | Rápido, mas fica sob a marca VFIT |
| Domínio próprio dela (ex.: `.com.br`) | ~R$ 40/ano | O mais profissional. Se ela for ter um nos próximos meses, **compre antes** |
| `gislane-app.web.app` (padrão do Firebase) | grátis | Só para testar. Evite dar aos alunos |

### 4. APK Android
- É um segundo APK, com outro nome de pacote (ex.: `br.com.gislane.treino`), outro ícone e outro endereço.
- Pode usar **a mesma chave de assinatura** do seu (secret `APK_SENHA`), então não precisa criar senha nova.

## Checklist antes de começar (Victor/Gislane)
- [x] **Nome:** **Gislane** (confirmado pelo Victor; "Gislaine" era erro de transcrição).
- [x] **Nome do app** embaixo do ícone: **Gislane** (aprovado pelo Victor em 03/10/2026).
- [x] **Logo:** já vetorizado em `docs/marca/gislane-logo.svg` (vermelho `#E21E27`, feito a partir do PNG oficial em fonte Gatwick).
- [ ] **Cores e fontes** (paleta da prévia, a confirmar com o Victor: fundo preto quente, botões vermelho `#E21E27`, destaques rosé `#D4A79C`; escalas usadas na prévia: slate 950 `#0e0a09` · 900 `#1a1311` · 800 `#2c211e` · 700 `#3d2e2a` · 600 `#54423c` · 500 `#85706a` · 400 `#b89a92` · 300 `#d4b8b0` · 200 `#e8d7d2` · 100 `#f6eeeb`; marca 300 `#d4a79c` · 400 `#ea4a50` · 500 `#e21e27` · 600 `#b81a22` · 700 `#5a2a24` · 900 `#1a0f0d`): estão no Canva, no kit de marca "Gislane Personal Trainer". O Claude lê pelas miniaturas dos designs ("Cópia de Portfólio Gislane", "Proposta Comercial - Gislane") e pede confirmação.
- [ ] **Endereço** escolhido (tabela acima). Se for domínio próprio, já comprado.
- [ ] **Projeto Firebase novo** (o Claude guia na hora):
  1. Criar o projeto (ex.: `gislane-app`) e ativar Authentication (e-mail/senha) e Firestore em `southamerica-east1`.
  2. Registrar o app Web e colar aqui o `firebaseConfig`, que é público.
  3. Em IAM → Conceder acesso, dar à conta de serviço do GitHub (a mesma do `FIREBASE_SERVICE_ACCOUNT`) o papel **Administrador do Firebase** no projeto novo. Assim não precisa de secret novo.

## Andamento
- [x] **Fase A** (marca configurável): `marcas/<id>/`, alias `@marca`, `--mode`, scripts `dev:gislane`/`build:gislane`/`icones:gislane`, e2e com `MARCA=gislane`. Build vfit igual ao anterior.
- [x] **Fase B** (identidade): paleta aprovada em `marcas/gislane/tema.css`, logo, ícone (o "G" em fundo #1a0f0d) e PNGs gerados. Fontes: Inter/Montserrat por enquanto.
- [x] `apk.yml` (VFIT) já grava o `assetlinks.json` em `marcas/vfit/public/.well-known/`. `slate-500` da Gislane clareado para 4,7:1.
- [x] Ícone (o "G" vermelho) e nome "Gislane" aprovados pelo Victor (03/10/2026).
- [x] Botão "perigo" em vinho escuro (`red-600`/`red-500` sobrescritos só em `marcas/gislane/tema.css`), aprovado pelo Victor.
- [x] Responsável na Política: Gislane dos Santos Madeira, CREF 180464-G/SP (`responsavel.papel` acerta "a responsável").
- [x] **Fase C no código** (03/10/2026): projeto Firebase `gislane-personal-trainer`; `.env.gislane` (config pública) versionado; `.firebaserc` com aliases `vfit`/`gislane`; `deploy.yml` com job separado `gislane` (trava: falha se o `dist/` tiver "A CONFIRMAR" ou "forca--app"); `ci.yml` faz `build:gislane`. O dev (`npm run dev*`) usa sempre os emuladores.
- [ ] **O job `gislane` falha até:** (a) o Victor dar acesso à conta de serviço no projeto dela (passos 6–7 da página de instruções) e (b) o `dominio` de `marcas/gislane/marca.json` ser preenchido (hoje "A CONFIRMAR"). O job da VFIT não é afetado.
- [ ] Pendência do Victor: domínio (comprar na Squarespace; por enquanto só local). Depois seguir o passo a passo abaixo.

## Fase C — passo a passo do Victor (depois de comprar o domínio na Squarespace)
Recomendado: o app em `app.<domínio>` (como `app.vfitcoachapp.com`); o domínio principal fica livre para um site dela.

**1. Projeto Firebase novo** (console.firebase.google.com, mesma conta Google)
1. "Adicionar projeto" → nome `gislane-app` → pode desligar o Google Analytics.
2. Authentication → Começar → ativar **E-mail/senha**.
3. Firestore Database → Criar banco → modo produção → local **southamerica-east1 (São Paulo)**.
4. Configurações do projeto (engrenagem) → "Seus apps" → ícone **Web `</>`** → apelido "Gislane" → **não** marcar Hosting aqui → copiar o bloco `firebaseConfig` e mandar para o Claude (é público, pode colar no chat).
5. console.cloud.google.com → projeto `gislane-app` → IAM → **Conceder acesso** → colar o e-mail da conta de serviço que o GitHub já usa no projeto da VFIT (aparece no IAM do `forca--app` e termina em `iam.gserviceaccount.com`; se houver mais de uma, pergunte ao Claude qual é) → papel **Administrador do Firebase** → Salvar.
6. Avisar o Claude: ele faz a Fase C no código e publica a primeira versão (endereço provisório `gislane-app.web.app`).

**2. Ligar o domínio** (só depois da 1ª publicação)
1. Firebase do `gislane-app` → Hosting → **Adicionar domínio personalizado** → digitar `app.<domínio>` → Continuar.
2. O Firebase mostra 1 a 3 registros (tipo **TXT**, **A** ou **CNAME**). Deixe essa aba aberta.
3. Em outra aba: account.squarespace.com/domains → clicar no domínio → **DNS** → **DNS Settings**.
4. Em **Custom Records** → **Add record**, crie cada registro **exatamente** como o Firebase mostrou: Host = `app` (o que vem antes do domínio), Type = o tipo, Data = o valor. Salvar.
5. Não apague os registros de e-mail (MX), se houver. Se o domínio principal não for usar site da Squarespace, os "Squarespace Defaults" podem ficar como estão: eles não atrapalham o `app.`.
6. Volte ao Firebase → **Verificar**. Pode levar de minutos até 24 h; o certificado (cadeado) vem sozinho depois.
7. Authentication → Configurações → **Domínios autorizados** → Adicionar domínio → `app.<domínio>`.
8. Avisar o Claude o endereço final: ele troca o `dominio` no `marca.json`, publica de novo e segue para a Fase D (APK) e a Fase E (conta de coach da Gislane, 2 etapas e e-mails com a marca dela).
- [ ] Fases C e D: `twa/`, workflows de deploy/APK por marca, `firebase.json`, `.firebaserc`, `push/` (o Worker do descanso só aceita o projeto da VFIT; a Gislane precisa do dela, e sem `VITE_PUSH_URL` o push fica desligado). Antes de publicar, travar o build da Gislane se ainda houver "A CONFIRMAR" ou se faltar a chave do Firebase (sem chave o app cai no emulador).

## Passos técnicos (para o Claude)
Siga o CLAUDE.md: Superpowers + Ponytail, delegando para o agente mais barato. A VFITCOACH não pode mudar nada, e os prints dela devem ficar iguais antes e depois.

**Fase A — Marca configurável (`dev`, Sonnet).** Hoje a marca está espalhada nestes arquivos:
- `src/index.css`: escalas `slate`/`marca` no `@theme` e as fontes.
- `src/Logo.tsx`
- `public/`: ícones, `favicon`, `fonts/` e `.well-known/assetlinks.json`.
- `index.html`: title, `apple-mobile-web-app-title` e `theme-color`.
- `vite.config.ts`: `manifest`.
- `pwa-assets.config.ts`
- `twa/twa-manifest.json`
- `src/features/instalar/Instalar.tsx`: o link.
- `.env.production`: o `firebaseConfig`.

Proposta mínima:
- Pasta `marcas/<id>/` com:
  - `marca.json`: nome, nomeCurto, themeColor, backgroundColor, domínio e projeto Firebase.
  - `tema.css`: as sobreposições do `@theme`.
  - `Logo.tsx` ou os paths do logo.
  - `public/`: ícones, fontes e `assetlinks.json` próprios, usados como `publicDir`.
  - `twa-manifest.json`
- O Vite lê a marca pelo `--mode` (`.env.vfit`, `.env.gislane`, com `VITE_MARCA` e o `firebaseConfig`). Use um alias `@marca` para `marcas/<id>`. No `index.html`, use a substituição `%VITE_...%`.
- **Pronto quando:**
  - O build `--mode vfit` sair idêntico ao atual, com a mesma saída em `dist/` exceto hashes.
  - Os e2e passarem.
  - O build `--mode gislane` gerar sem erro.

**Fase B — Identidade da Gislane (`dev`).**
- Vetorizar o logo como foi feito para a VFIT: potrace em camadas (ver `docs/marca/`).
- Definir a paleta, com escalas `slate` e `marca` e contraste bom no tema escuro, e as fontes.
- Gerar os ícones com `pwa-assets-generator`.
- Prints em 360, 375 e 390px para aprovação.

**Fase C — Publicação (`auxiliar`, Haiku).**
- `.firebaserc` com aliases `vfit: forca--app` e `gislane: <projeto>`.
- `deploy.yml` com `matrix: marca [vfit, gislane]`: `npm run build -- --mode $marca` e depois `firebase deploy --project $marca`, com hosting, rules e indexes.
- `ci.yml` com build das duas marcas. O e2e roda só na vfit.
- Domínio: guiar o Victor no Hosting do projeto novo e no Cloudflare (CNAME com a **nuvem cinza**, como foi o `app.`). Também adicionar o domínio em Authentication → Domínios autorizados.

**Fase D — APK (`auxiliar`).**
- `apk.yml` com input `marca`, usando `marcas/<id>/twa-manifest.json` e gerando `<marca>.apk`.
- Release separada (`apk-<marca>`), ou manter `apk`/`forca.apk` para a VFIT e não quebrar o link antigo.
- `assetlinks.json` da marca com o pacote dela e o fingerprint da chave (a mesma).

**Fase E — Conta de coach dela.**
1. A Gislane cria a conta pelo app dela.
2. O Victor, no console do Firestore **do projeto dela**, muda `papel` para `coach` e `status` para `ativo`. É o mesmo processo que foi feito com a sua conta.
3. Também guiar os e-mails com a marca dela: Authentication → Modelos, igual ao que fizemos para a VFIT.

**Fechamento:** `revisor` (Sonnet), depois commit, PR em rascunho e CI verde. O Victor junta, e então roda o APK da Gislane.

## Workflows que hoje só rodam no projeto da VFIT
Todos usam a credencial/projeto `forca--app`: backup, limpeza LGPD, vigia, mfa, erros, aluno-exemplo, importar-meso, alterar-email. (Não implementado.)
- **Precisam rodar também no da Gislane antes de ela ter alunos:** backup, limpeza LGPD (obrigação LGPD), vigia, mfa (2º fator do coach) e erros.
- Só VFIT (sob demanda): aluno-exemplo; importar-meso e alterar-email só se ela pedir.

## Cuidados
- ⚠️ **Nunca** publique o build de uma marca no projeto da outra. Por isso a matrix usa o alias do `.firebaserc`, e nenhum comando de deploy deve ficar sem `--project`.
- A memória offline do celular (IndexedDB) é por endereço, então os dois apps não se misturam nem no mesmo aparelho.
- Estimativa: 1 sessão para as fases A a C, mais uns 15 minutos de cliques do Victor (Firebase e Cloudflare) e mais a Fase D.
