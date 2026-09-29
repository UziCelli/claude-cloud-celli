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
- [ ] **Nome certo:** "Gislane" ou "Gislaine"? No Canva está "Gislane Personal Trainer".
- [ ] **Nome do app** embaixo do ícone (curto, até 12 letras).
- [ ] **Logo** em PNG com fundo transparente (ou SVG), anexado na conversa, como você fez com o da VFIT.
- [ ] **Cores e fontes:** estão no Canva, no kit de marca "Gislane Personal Trainer". O Claude lê pelas miniaturas dos designs ("Cópia de Portfólio Gislane", "Proposta Comercial - Gislane") e pede confirmação.
- [ ] **Endereço** escolhido (tabela acima). Se for domínio próprio, já comprado.
- [ ] **Projeto Firebase novo** (o Claude guia na hora):
  1. Criar o projeto (ex.: `gislane-app`) e ativar Authentication (e-mail/senha) e Firestore em `southamerica-east1`.
  2. Registrar o app Web e colar aqui o `firebaseConfig`, que é público.
  3. Em IAM → Conceder acesso, dar à conta de serviço do GitHub (a mesma do `FIREBASE_SERVICE_ACCOUNT`) o papel **Administrador do Firebase** no projeto novo. Assim não precisa de secret novo.

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

## Cuidados
- ⚠️ **Nunca** publique o build de uma marca no projeto da outra. Por isso a matrix usa o alias do `.firebaserc`, e nenhum comando de deploy deve ficar sem `--project`.
- A memória offline do celular (IndexedDB) é por endereço, então os dois apps não se misturam nem no mesmo aparelho.
- Estimativa: 1 sessão para as fases A a C, mais uns 15 minutos de cliques do Victor (Firebase e Cloudflare) e mais a Fase D.
