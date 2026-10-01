# Plano — Entrega 4: registro de erros e segurança

Status: **aprovado pelo Victor ("pode rodar")**. Textos em pt-BR. Ponytail: o mínimo que funciona. Tudo grátis (plano Spark + Cloudflare grátis).

## 1. Registro de erros ("Erros do app")
- `src/lib/log.ts`: `registrarErro(tipo, detalhe)` grava na coleção `logs` do Firestore. **Só com login**: assim ninguém de fora consegue esgotar a cota grátis de gravações, o que travaria o app inteiro. Erros de antes do login ficam guardados no aparelho (`localStorage`) e são enviados no próximo login.
  - Campos fixos: `tipo`, `mensagem` (até 500 caracteres), `tela` (rota), `versao` do app, `aparelho` (userAgent resumido), `online`, `uid` (quando houver login) e `em` (hora do servidor).
- **O que é registrado automaticamente:**
  - erros de programação (`window.onerror`, promessas rejeitadas);
  - falhas ao salvar;
  - **vigia de carregamento:** a tela ficou 15 s em "carregando" (com a etapa: autenticação, perfil ou treino).
- Limite de **20 registros por aparelho por dia** (contador no `localStorage`), para não gastar a cota grátis.
- **Regras:** um usuário logado pode só **criar**, com os campos e tamanhos fixos (`hasOnly`, até 2 KB). Só o coach lê e apaga. Tudo coberto por testes de regras.
- **Sem tela no painel do coach** (decisão do Victor: o painel é para trabalhar). Os erros ficam num canal técnico: o workflow manual "Ver erros do app" lista os últimos 100 registros no resumo do GitHub Actions e apaga os que têm mais de 30 dias. Quem consulta é o Claude, ao investigar.

## 2. Verificação em 2 etapas (MFA) — só para o coach
- Código de 6 dígitos de um app autenticador (Google Authenticator), no padrão TOTP. SMS fica de fora porque é pago.
- **Passo do Victor (1 vez):** no console do Firebase, em Authentication → Configurações, clicar em "Fazer upgrade" para o **Identity Platform** (grátis no Spark, até 3.000 usuários ativos por dia).
- **Workflow "Ativar 2 etapas":** liga o TOTP no projeto com a conta de serviço que já existe.
- **Minha conta (coach):** "Ativar verificação em 2 etapas" mostra um QR code para escanear no autenticador, e o coach confirma com um código.
- **Login:** depois da senha, o app pede o código de 6 dígitos.
- **Obrigatória de verdade (etapa 2):** só depois que o Victor confirmar que entrou com o código, as regras do Firestore passam a exigir o 2º fator para qualquer poder de coach (`sign_in_second_factor`). Assim ele não fica trancado para fora.
- **Emergência (perdeu o celular):** workflow "Desativar 2 etapas do coach", que remove o fator pela conta de serviço.

## 3. Tentativas de login
- O Firebase já bloqueia sozinho depois de muitas tentativas. A mensagem na tela fica clara em pt-BR.
- **No aparelho:** depois de 5 senhas erradas, espera crescente de 30 s, 1 min, 2 min…, com contagem na tela.
- **Proteção contra robôs (App Check + reCAPTCHA v3 invisível):** o banco e o login só aceitam o app de verdade.
  - Passo do Victor: criar a chave do reCAPTCHA e registrar no App Check; eu guio.
  - Primeiro fica em modo "só monitorar"; depois de uns dias sem erro, passa para "bloquear".
- **Passo do Victor:** ligar a "Proteção contra enumeração de e-mail" em Authentication → Configurações.

## 4. Desconectar por falta de uso
- **Aluno: 30 min. Coach: 20 min.**
- Contam como uso: toque, tecla, rolagem, voltar ao app e **cronômetro de descanso rodando**.
- A conferência roda a cada 30 s e sempre que o app volta para a tela. Se o app ficou fechado, confere ao abrir.
- **Nenhuma carga se perde:** antes de sair, o app espera as cargas pendentes serem enviadas.
  - Se estiver sem internet, mostra "Conecte-se à internet para salvar suas cargas antes de sair" e só desconecta depois de enviar.
- Na tela de login aparece "Você saiu por inatividade".
- Arquivo: `src/lib/inatividade.ts` (com teste da lógica de tempo).

## 5. Varredura de injeção (o "SQL injection" daqui)
- O app não usa SQL, então não existe SQL injection. O risco equivalente é **código malicioso digitado em campos (XSS)** e **dados inválidos no banco**.
- A varredura procura `dangerouslySetInnerHTML`, `innerHTML`, `eval`, links montados com texto do usuário (`javascript:`) e campos sem limite de tamanho nas regras.
- O resultado entra na seção "Pontos sensíveis" de `docs/mapa.md`.

## 6. Pendências da revisão da Entrega 3
- **Worker de push:**
  - confere se o aluno está ativo e com `pagoAte` no futuro, lendo o próprio perfil no Firestore com o token dele, sem segredo novo;
  - limita a 30 agendamentos por minuto por aluno;
  - tira as origens localhost do CORS em produção.
- **Cronômetro salvo:** passa a guardar o uid e ignora o estado salvo de outra conta.

## 7. Aviso de vencimento
- Foi para a **Entrega 5 (pagamento)**, porque o aviso abre direto a tela do Pix.

## 8. Passos do Victor no console (eu guio um por um)
1. Upgrade para o Identity Platform (item 2).
2. Proteção contra enumeração de e-mail (item 3).
3. Chave do reCAPTCHA + App Check (item 3).
4. Restringir a chave da API do Firebase aos domínios do app, no Google Cloud → Credenciais.

## Divisão (agentes Sonnet; nunca dois no mesmo arquivo)
- **A, arquiteto:**
  - `firestore.rules` e `tests/rules.test.ts` (coleção `logs`);
  - workflow "2 etapas do coach" (ativar o TOTP no projeto e desativar em caso de emergência): `.github/workflows/mfa.yml` e `tools/mfa.mjs`.
- **B, dev:**
  - `src/lib/log.ts`, o vigia de carregamento e o workflow "Ver erros do app";
  - `src/lib/inatividade.ts`;
  - tentativas de login e mensagem "saiu por inatividade".
  - É o dono de `App.tsx`, `main.tsx` e `Entrar.tsx`.
- **E, arquiteto:** pendências do Worker e `uid` no estado do cronômetro (item 6).
- **D, arquiteto, depois de B:** login com 2º fator, ativação em Minha conta e App Check (liga só quando existir `VITE_RECAPTCHA_KEY`).
- **Fechamento:**
  - o revisor faz a varredura de injeção (item 5) e revisa o diff;
  - e2e, PR e "pode juntar".
