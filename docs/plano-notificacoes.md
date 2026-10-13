# Notificações: mensalidade e treino pronto (13/10/2026)

Pedido do Victor:
1. avisar os alunos do vencimento da mensalidade;
2. avisar o aluno quando o treino novo está pronto no app;
3. ícone da notificação = letra da marca (V no VFIT, G na Gislane), sem o emoji 💪 de antes.

## Decisões
- Um Worker só (`push/`, já no ar) atende as **duas marcas**: aceita tokens dos projetos `forca--app` e `gislane-personal-trainer`.
  - Nome da instância (Durable Object): VFIT = `uid` (como hoje, nada se perde); Gislane = `gislane-personal-trainer:<uid>`.
- O aluno guarda uma **inscrição fixa** no Worker (chave `fixa` no storage do DO), separada da do descanso (`inscricao`, apagada depois do alarme).
- **Treino pronto:** botão do coach no editor do meso ("Avisar aluno: treino pronto"). Nada automático (o meso grava a cada edição; seria spam).
- **Mensalidade:** workflow diário do GitHub (9h de Brasília, as 2 marcas) lê `usuarios` com a conta de serviço que já existe e manda ao Worker quem vence **em 3 dias** e **hoje**.
  - Sem segredo novo: o workflow assina um JWT com a chave da conta de serviço; o Worker confere a assinatura nas chaves públicas do Google.
- Ícone: `icon` = `/pwa-192x192.png` (já é o da marca); `badge` = `/badge-96.png` novo por marca (letra branca em fundo transparente, que o Android pede).
- Textos sem emoji.

## Contrato do Worker
Todas as rotas POST com `Authorization: Bearer <token>`; respostas JSON; CORS também para `https://app.gislanepersonaltrainer.com` e `https://gislane-personal-trainer.web.app`.

| Rota | Quem | Corpo | Resposta |
|---|---|---|---|
| `/agendar`, `/cancelar` | como hoje (agora nas 2 marcas) | como hoje | como hoje |
| `/inscrever` | qualquer usuário com token válido (mesmo bloqueado: precisa do aviso de pagamento) | `{ subscription }` | `{ ok: true }` |
| `/desinscrever` | token válido | `{}` | `{ ok: true }` |
| `/treino-pronto` | coach: o Worker lê `usuarios/<alunoId>` **com o token de quem chama**; só o coach (com 2º fator, pelas regras) consegue ler o perfil de outro; `alunoId` ≠ uid de quem chama e `papel` ≠ `coach` | `{ alunoId }` | `{ ok: true, enviado: boolean }` (`false` = aluno sem notificações ativas) |
| `/aviso-pagamento` | robô: JWT RS256 assinado pela conta de serviço (`iss` = e-mail `…@forca--app.iam.gserviceaccount.com` ou `…@gislane-personal-trainer.iam.gserviceaccount.com`, `aud` = `vfit-push-avisos`, `exp` ≤ `iat` + 600, ainda válido); chave pública em `https://www.googleapis.com/service_accounts/v1/jwk/<iss>` pelo `kid` | `{ projeto, avisos: [{ uid, tipo: 'vence-3d' \| 'vence-hoje' }] }` (máx. 20 por chamada: limite de subpedidos do plano grátis) | `{ ok: true, enviados: n }` |

Mensagem enviada (JSON do push), lida pelo `public/sw-push.js`:

| Tipo | title | body | tag | url |
|---|---|---|---|---|
| descanso | Descanso acabou | Volte para o treino | descanso | `/` |
| treino pronto | Treino novo pronto | Seu próximo treino já está no app. Toque para ver. | treino | `/` |
| vence-3d | Mensalidade vence em 3 dias | Toque para ver como pagar. | mensalidade | `/#/conta` |
| vence-hoje | Mensalidade vence hoje | Toque para ver como pagar. | mensalidade | `/#/conta` |

Push respondido com 404/410: a inscrição `fixa` é apagada.
