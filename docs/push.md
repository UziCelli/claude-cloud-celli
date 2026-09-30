# Push do descanso (Entrega 3b)

Avisa "Descanso acabou / Volte para o treino 💪" na hora certa, mesmo com o app fechado (iPhone iOS 16.4+ na Tela de Início, e Android).

## Como funciona
1. O aluno toca ▶: `useDescanso` (`src/lib/descanso.ts`) chama `agendarPush(fimEm)` (`src/lib/push.ts`).
2. O app se inscreve no push do celular (usa a chave de `GET /vapid`) e manda `{ subscription, fimEm }` para `POST /agendar`, com o ID token do Firebase.
3. O Worker (`push/src/index.ts`) confere o token, guarda a inscrição numa Durable Object **do aluno** e marca um alarme para `fimEm`.
4. No alarme, envia o push criptografado (`push/src/webpush.ts`). O service worker (`public/sw-push.js`) mostra a notificação.
5. Pausar, pular ou parar chama `POST /cancelar`. Um novo ▶ substitui o agendamento anterior.

## Segurança
- Só ID token válido do projeto `forca--app` (RS256, chaves públicas do Google, `aud`, `iss`, `exp`, `iat`).
- `fimEm` precisa estar entre 1 s e 15 min à frente.
- O endereço da inscrição precisa ser de um serviço de push conhecido (Google/FCM, Apple, Mozilla, Microsoft). Se um navegador novo usar outro servidor, acrescente em `HOSTS` (`push/src/validar.ts`).
- O par de chaves VAPID nasce no primeiro `GET /vapid` e fica na instância `__vapid`. **Nunca apague essa instância**: todos os alunos teriam de se inscrever de novo.
- CORS só para `app.vfitcoachapp.com`, `forca--app.web.app` e `localhost:5173/4173`.

## Limites do plano grátis (Cloudflare)
- Só Durable Objects com SQLite (já configurado na migração `v1`).
- Cada descanso gasta poucos pedidos (agendar, o alarme e, se pausar, cancelar). O plano dá 100 mil pedidos por dia; confira os limites atuais no painel da Cloudflare.
- Se o serviço de push estiver fora do ar na hora do alarme, o aviso daquele descanso se perde (não insistimos, porque chegaria atrasado).
- O relógio do celular define `fimEm`: se estiver muito errado, o aviso sai na hora errada.

## Publicar e trocar a URL
- O workflow `.github/workflows/push.yml` publica o Worker a cada mudança em `push/` (ou em "Run workflow"). No final, mostra a URL (`https://vfit-descanso.<subdomínio>.workers.dev`) no log e no resumo.
- Essa URL vai em `VITE_PUSH_URL` (arquivo `.env.production`, publicado com o app). **Sem ela o app não faz nada de push.**
- Em `firebase.json`, o `connect-src` da CSP hoje libera `https://*.workers.dev`. Depois do primeiro deploy, troque pela URL exata.
- Para ver o Worker localmente: `cd push && npx wrangler@4 deploy --dry-run` (só empacota, não precisa de conta).

## Testes
`npm test` roda `push/src/*.test.ts` (sem rede): JWT do Firebase, criptografia (vetor do RFC 8291), JWT VAPID e validação. `npm run typecheck` confere também `push/` (`push/tsconfig.json`).
