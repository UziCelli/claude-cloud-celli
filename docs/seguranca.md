# Segurança — passos do Victor no console

Tudo grátis (plano Spark). Faça na ordem. Peça ao Claude para guiar qualquer passo.

## 1. Identity Platform (liga a verificação em 2 etapas)
1. Console do Firebase → **Authentication** → **Configurações** → **Fazer upgrade** (Identity Platform). Grátis até 3.000 usuários ativos por dia.
2. No GitHub, rode o workflow **"2 etapas do coach"** (ação `ativar-totp`).
3. No app: **Minha conta → Verificação em 2 etapas → Ativar** (só aparece para o coach). Escaneie o QR no Google Authenticator e confirme com o código.
4. Saia e entre de novo para testar o código. **Guarde o celular com o autenticador**; se perder, use o workflow de emergência (desativar).

## 2. Proteção contra enumeração de e-mail (feito)
- Authentication → Configurações → **Proteção contra enumeração de e-mail** → ligar.

## 3. App Check (reCAPTCHA v3 invisível)
1. ✅ (feito em 01/10/2026) Em https://www.google.com/recaptcha/admin crie uma chave **reCAPTCHA v3** com os domínios `app.vfitcoachapp.com` e `forca--app.web.app`.
2. ✅ (feito em 01/10/2026) Console do Firebase → **App Check** → app web → **reCAPTCHA** → cole a **chave secreta**. Ative o token com validade padrão.
3. Em **APIs**, deixe **Firestore** e **Authentication** em **Monitorar** (não bloqueia ninguém).
4. ✅ (feito em 01/10/2026) Coloque a **chave do site** (a pública) em `.env.production`: `VITE_RECAPTCHA_KEY=...` e publique o app. Sem essa linha o App Check fica desligado.
5. ✅ (feito em 01/10/2026) Libere os domínios na CSP (`firebase.json`, o Claude altera na hora de ligar):
   - `script-src`: `https://www.google.com/recaptcha/` e `https://www.gstatic.com/recaptcha/`
   - `frame-src`: `https://www.google.com/recaptcha/` e `https://recaptcha.google.com/recaptcha/`
   - `connect-src`: `https://www.google.com/recaptcha/` (os `*.googleapis.com` já estão)
6. ⏳ Pendente: depois de alguns dias sem erros no painel do App Check, mude Firestore e Authentication para **Aplicar**.
- Importante: a CSP nova precisa estar no ar **antes** de publicar com a chave, senão o app não carrega o reCAPTCHA.

## 4. Restringir a chave da API
- Google Cloud → **APIs e serviços** → **Credenciais** → chave de navegador do Firebase → **Restrições de aplicativo: sites** → adicione `app.vfitcoachapp.com/*`, `forca--app.web.app/*` e `forca--app.firebaseapp.com/*`. (feito)
- (Ficou de fora por ora) Em **Restrições de API**, deixe só: Identity Toolkit, Token Service, Cloud Firestore e Firebase App Check.
