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
