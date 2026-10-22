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

### Repositório público (22/10/2026)

O repositório ficou público para o GitHub Actions ser grátis e ilimitado. O que muda:

- **Backups sempre criptografados** (AES-256, senha no segredo `BACKUP_SENHA`). Sem o segredo, o robô falha e **não guarda nada**.
  - Abrir um backup: `openssl enc -d -aes-256-cbc -pbkdf2 -iter 600000 -in backup.json.enc -out backup.json` (pede a senha).
  - Guarde a senha também fora do GitHub (gerenciador de senhas): sem ela o backup não abre.
- **Registros e resumos dos robôs são públicos:** não imprimem nome, e-mail nem uid de aluno (a tabela do "Ver erros do app" também não).
- **Campos digitados nos workflows manuais aparecem na página da execução** (e-mail atual/novo em "Alterar e-mail", e-mail do coach em "2 etapas", nome do aluno em "Importar mesociclo"). Para dado de aluno, prefira o botão dentro do app.
- Segredos (`FIREBASE_SERVICE_ACCOUNT`, etc.) continuam privados: nenhum workflow roda com segredos a partir de fork.
- Nunca commitar: .xlsx, backups, nomes ou telefones reais, e-mails de alunos.

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

## 6. Monitoramento (alertas)

### Alertas automáticos (Vigia de segurança)

O workflow "Vigia de segurança" roda **a cada 6 horas** e confere sinais de ataque e vulnerabilidades:

| Alerta | Limite | O que é |
|--------|--------|--------|
| Muitos cadastros novos | 10 por 24h | Possível ataque de robôs; confira quem se cadastrou |
| Muitos aguardando aprovação | 20 pessoas | Possível cadastro em massa; fila muito grande |
| Muitos erros no app | 100 por 24h | Bug novo ou abuso; confira o workflow "Ver erros do app" |
| Muitos acessos negados | 20 por 24h | Tentativa de acesso indevido ou bug; leia os logs |
| Coach sem 2º fator | 1 conta | Verificação em 2 etapas desligada; ative em "Minha conta" |
| Quantidade de coaches incorreta | 1 esperado | Alguém virou coach ou sumiu; confira a lista de usuários |
| Coleção de logs muito grande | 5.000 logs | Abuso da cota grátis; limpar manualmente ou na Limpeza LGPD |
| Limpeza LGPD atrasada | 2+ dias | Pedido de exclusão não foi processado; workflow falhou |
| Pacotes com vulnerabilidade | crítica/grave | npm audit achou vulnerabilidade; atualizar dependência |

**Cada alerta vira uma Issue com @UziCelli** sem repetir se já houver uma aberta. Se o vigia quebra (permissão, rede), abre Issue também.

### Dependabot

**Ligado em 03/10/2026** (alertas + security updates automáticas):

- **Alerts:** confira toda semana no GitHub → Security → Dependabot alerts
- **Security updates:** PR automáticas na seção "Manutenção"
- **Ação:** abrir a PR → revisar com o Claude → juntar se tudo OK → conferir CI

### Cloudflare (notificação de descanso)

Worker `vfit-descanso` só hospeda o aviso de descanso:

- **Sem dados guardados:** faz CORS, confere token Firebase, envia push e pronto
- **Limite:** 30 notificações por minuto (429 acima disso)
- **Cache de acesso:** 10 min (perfil do aluno)

### Proteção contra cobrança

Plano Spark do Firebase:

- Sem cartão no console: ataque não gera cobrança
- Quota de `npm audit`: 10.000 avaliações/mês (grátis, monitorar uso)
- Logs no Firestore: máx. 20 por aparelho por dia (cliente limita)

### Procedimento ao receber alerta

1. Abrir a Issue no GitHub
2. Chamar o Claude: "Recebemos um alerta de `<tipo>`. Olha a Issue e o que fazer?"
3. Resolver o problema (atualizar pacote, desativar 2º fator, etc.)
4. Fechar a Issue quando pronto

## 7. Teste de ataques (03/10/2026)
- `tests/ataques.test.ts` tem 79 casos e cerca de 555 tentativas de ataque. Todas foram negadas, e o teste roda junto com `npm run test:rules`.
  - Cobertura: troca de ID (get e list), escalada de privilégio, pagamento vencido ou bloqueado, acesso anônimo, abuso de logs, notas e exclusões, e datas forjadas.
- **Furos reais:** nenhum. `npm audit --omit=dev`: 0 vulnerabilidades.
- **Achados menores, aceitos e documentados no teste:**
  - os valores dentro de `cargas`, `reps`, `pc` e `notas` não têm o tipo validado; o dano fica só nos dados do próprio aluno, e o motor ignora o que não é número;
  - login anônimo: fechado nas regras em 03/10/2026 (`signedIn()` não conta o provider `anonymous`). Mesmo se alguém ligar "Anônimo" no console, ele não grava nada. Mesmo assim, mantenha desligado.
- `e2e/varredura.spec.ts` abre todas as telas (coach, aluno e públicas) em 1280 e 390 px e falha em caso de erro, rolagem horizontal ou "undefined"/"NaN".

## 8. Verificação 07/10/2026 (depois do Painel de Evolução, do app da Gislane e da inatividade de 4 h)
- **Testes:** regras + ataques (199 testes, 79 casos de ataque) passando; nenhum furo novo.
- **Regras do Firestore:** iguais às da auditoria de 02/10; o app da Gislane publica as MESMAS regras no projeto dela.
- **Workflows das duas marcas** (backup, Limpeza LGPD, vigia, erros, 2 etapas, APK): cada execução só toca o próprio projeto (`PROJETO` obrigatório e validado), backups com prefixos que não se misturam, entradas manuais validadas por `case`. Nenhum gatilho perigoso (`pull_request_target`, comentário de issue); permissões mínimas. O CI ganhou `permissions: contents: read`.
- **Cabeçalhos do site:** CSP estrita (sem script de terceiros além do reCAPTCHA), HSTS, `X-Frame-Options: DENY`, `nosniff`, `Permissions-Policy`.
- **Segredos:** nenhum no repositório (`.env.*` só têm a configuração pública do Firebase; o keystore do APK está criptografado). O repositório é público desde 22/10/2026: a proteção do keystore depende só da força de `APK_SENHA` (use senha longa e aleatória).
- **Dependências:** app em produção com 0 vulnerabilidades. Ferramentas de desenvolvimento: 2 alertas novos corrigidos (`@modelcontextprotocol/sdk`, `source-map-js`; `firebase-tools` 15.32.1). Restam alertas só dentro do `firebase-tools` (roda no GitHub, nunca no celular), sem correção ainda; o Dependabot avisa quando sair.
- **Evolução/ranking/recorde:** só leitura de dados que as regras já liberam (aluno: só os próprios; coach: todos). Cartão do story leva só o primeiro nome e números.
- **Inatividade do aluno em 4 h** (pedido do Victor): risco baixo (celular do próprio aluno, só vê o próprio treino). Coach continua com 20 min.
- **Pendências (console, Victor):**
  - App Check da VFIT: mudar de Monitorar para **Aplicar**;
  - App Check da Gislane: chave reCAPTCHA criada e registrada no App Check (22/10/2026); a chave do site está no `.env.gislane`. Fica em **Monitorar**; mudar para **Aplicar** depois de alguns dias sem requisições não verificadas;
  - Gislane: conferir se a chave de navegador (API key) está restrita aos domínios dela, como na VFIT (não há registro disso nos docs);
  - as duas marcas usam a mesma conta de serviço (`FIREBASE_SERVICE_ACCOUNT`): se vazar, afeta os dois projetos. Aceitável hoje; separar se a Gislane crescer.
