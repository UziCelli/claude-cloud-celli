# Segurança — passos do Victor no console

Tudo grátis (plano Spark). Faça na ordem. Peça ao Claude para guiar qualquer passo.

## 1. Identity Platform (liga a verificação em 2 etapas)
1. Console do Firebase → **Authentication** → **Configurações** → **Fazer upgrade** (Identity Platform). Grátis até 3.000 usuários ativos por dia.
2. No GitHub, rode o workflow **"2 etapas do coach"** (ação `ativar-totp`).
3. No app: **Minha conta → Verificação em 2 etapas → Ativar** (só aparece para o coach). Escaneie o QR no Google Authenticator e confirme com o código.
4. Saia e entre de novo para testar o código. **Guarde o celular com o autenticador**; se perder, use o workflow de emergência (desativar).

## 2. Proteção contra enumeração de e-mail (feito)
- Authentication → Configurações → **Proteção contra enumeração de e-mail** → ligar.

## 3. App Check (reCAPTCHA Enterprise, invisível)
1. ✅ (feito em 01/10/2026) em https://console.cloud.google.com/security/recaptcha?project=forca--app crie uma chave tipo **Site**, com os domínios `app.vfitcoachapp.com` e `forca--app.web.app`, **sem** o desafio de caixa de seleção.
2. ⏳ Pendente: Console do Firebase → **App Check** → app web → **reCAPTCHA Enterprise** → cole a **mesma chave do site** (não existe chave secreta). Validade do token: **1 dia** (gasta menos avaliações).
3. Em **APIs**, deixe **Firestore** e **Authentication** em **Monitorar** (não bloqueia ninguém).
4. ✅ (feito em 01/10/2026) coloque a **chave do site** em `.env.production`: `VITE_RECAPTCHA_KEY=...` e publique o app. Sem essa linha o App Check fica desligado.
5. ✅ (feito em 01/10/2026) CSP liberada (`firebase.json`; `https://www.google.com/recaptcha/` já cobre o `enterprise.js`):
   - `script-src`: `https://www.google.com/recaptcha/` e `https://www.gstatic.com/recaptcha/`
   - `frame-src`: `https://www.google.com/recaptcha/` e `https://recaptcha.google.com/recaptcha/`
   - `connect-src`: `https://www.google.com/recaptcha/` (os `*.googleapis.com` já estão)
6. ⏳ Pendente: grátis até 10.000 avaliações por mês. Confira o uso no painel e, depois de alguns dias sem erros, mude Firestore e Authentication para **Aplicar**.
- Importante: a CSP precisa estar no ar **antes** de publicar com a chave.

## 4. Restringir a chave da API
- Google Cloud → **APIs e serviços** → **Credenciais** → chave de navegador do Firebase → **Restrições de aplicativo: sites** → adicione `app.vfitcoachapp.com/*`, `forca--app.web.app/*` e `forca--app.firebaseapp.com/*`. (feito)
- (Ficou de fora por ora) Em **Restrições de API**, deixe só: Identity Toolkit, Token Service, Cloud Firestore e Firebase App Check.

## 5. Auditoria 02/10/2026 (segurança + LGPD)

### Conferido e OK
- **Trocar o ID não dá acesso a dados de outro aluno.** `firestore.rules` usa o uid do login (token assinado pelo Google), nunca o ID enviado pelo app.
  - Aluno lê e grava só o que tem `alunoId` = ele mesmo, e só ativo e em dia.
  - O registro também confere se o meso é do aluno.
  - 107 testes em `tests/` cobrem isso.
- **Coach:** todo poder exige o 2º fator (`sign_in_second_factor`). Ninguém vira coach pelo app.
- **Cadastro próprio:** nasce sempre aluno "aguardando". Papel, status, `pagoAte` e e-mail são travados.
- **Worker de notificação:** confere a assinatura do token do Google (aud, iss, exp), libera CORS só para os domínios do app, limita a frequência e não guarda nada depois do aviso.
- **Workflows:** entradas passam por variável de ambiente (sem injeção no shell). Não há `pull_request_target` nem chave no histórico do git.
- **Site:** CSP sem `unsafe-eval`, HSTS e `X-Frame-Options: DENY`. Não há `innerHTML` nem `eval` no código.
- **Dependências:** `npm audit` aponta o `@grpc/grpc-js`, que só roda no Node (servidor/testes) e não vai para o app do navegador. Sem risco para o usuário.

### LGPD (feito nesta auditoria)
- **Política de Privacidade** pública em `/privacidade`.
  - Aceite obrigatório no cadastro e tela de aceite para quem já é aluno.
  - Grava `privacidadeEm` e `privacidadeVersao`: a prova do consentimento.
  - Mudou o texto? Troque `VERSAO_PRIVACIDADE` (`src/lib/privacidade.ts`): todos aceitam de novo.
- **Exclusão total.** O "Apagar de vez" grava `exclusoes/{uid}` e apaga perfil, mesos, cargas e anotações na hora.
  - O workflow diário **"Limpeza LGPD"** apaga o login (Auth), os erros do aluno e o que tiver sobrado.
  - Se apagou alguém, faz um backup novo e **apaga todos os backups antigos**.
- **Retenção:** backups e erros por 30 dias.

### Passos do Victor (console, uma vez)
1. **GitHub → Settings → Actions → General → "Artifact and log retention" → 30 dias.** Os resumos de execução (ex.: "Ver erros do app") guardam o uid do aluno.
2. **App Check → Aplicar**, depois de alguns dias em Monitorar sem erros (item 3).
3. **Restrições de API da chave** (item 4, ainda em aberto).
4. **Política de senha:** Authentication → Configurações → Política de senha → mínimo 8 caracteres.
5. **2 etapas na conta Google e na conta GitHub do Victor.** Quem entra nelas controla tudo: banco, chaves e backups.
6. **Revisão da política por um advogado** (o texto é um rascunho em linguagem simples).

### Em aberto (decisão do Victor)
- **Cadastro aberto ("Criar conta").** Qualquer pessoa cria conta "aguardando" e pode gravar registros de erro (com limite de tamanho). Daí dois riscos:
  - alguém se cadastrar com o e-mail de um futuro aluno;
  - gastar a cota grátis.
- **Se todos os alunos entram por "Novo aluno"/"Dar acesso" no painel, o melhor é fechar o cadastro:**
  - tirar o botão da tela;
  - bloquear nas regras;
  - desligar "Criar conta" no Authentication.
