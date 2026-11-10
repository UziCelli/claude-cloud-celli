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
Cabeçalho opcional `X-Firebase-AppCheck: <token>` (liberado no CORS): o app manda quando o App Check está ligado; o Worker repassa igual na leitura de `usuarios/<uid>` no Firestore (sem ele, o Firestore em "Aplicar" recusa com 403). Valor inválido (vazio, com espaço/quebra, > 4096) é ignorado; nunca é logado nem entra no cache de permissão.

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

---

# 2ª parte (09/11/2026): avisos para o coach, lembrete do treino e aviso escrito

Pedido do Victor: terminar as notificações nas 2 marcas.
- Para o coach: aluno concluiu o treino; aluno escreveu anotação; aluno tocou "Já paguei".
- Para o aluno: lembrete do treino do dia; aviso escrito pelo coach.

## Respostas do Victor
- Lembrete: horário fixo para todos (6h47 de Brasília), disparado pelo Worker (ver "Lembrete na hora certa" abaixo).
- Dias: segunda a sábado, só para quem tem meso em andamento e ainda não treinou hoje.
- Aviso escrito: para todos os alunos ativos ou para um aluno só.
- Aviso escrito é só a notificação: nada gravado no banco (sem regra nova no Firestore, sem dado novo para a LGPD).

## Decisões
- **Sem Cloud Functions e sem segredo novo.** Tudo no Worker `push/` e no workflow "Avisos de mensalidade".
- **Quem é o coach?** O app do coach manda `coach: true` no `/inscrever`. O Worker lê o perfil dele (com o token dele) e, se `papel == 'coach'`, guarda o uid na instância `__coaches:<projeto>` (até 5). Sai da lista ao sair da conta (`/desinscrever`).
- **Aluno avisa o coach** pelo app, logo depois de gravar no Firestore (`avisarCoach`). O texto é fixo e o nome vem do perfil lido pelo Worker, nunca do pedido.
- **Ligar/desligar por tipo:** a lista de tipos desligados fica no aparelho (`forca-avisos-desligados`) e vai ao Worker no `/inscrever` (`desligados`). O Worker não envia tipo desligado. Quem tinha desligado "Treino novo e mensalidade" continua com os dois desligados.
- **Lembrete:** mesmo workflow e mesmo script (`MODO=lembrete`), com um 2º horário. Usa a rota `/aviso-pagamento` com o tipo novo `treino-hoje`.
- **Comentário** = anotação do aluno no exercício. "Sua opinião" fica de fora (pode ser anônima).
- **Regras do Firestore:** não mudam (nenhum dado novo).

## Contrato novo do Worker
| Rota | Quem | Corpo | Resposta |
|---|---|---|---|
| `/inscrever` | token válido | `{ subscription, desligados?: Tipo[], coach?: true }` | `{ ok: true }`; tipo desconhecido = 400 |
| `/desinscrever` | token válido | `{}` | apaga inscrição e preferências; tira o uid da lista de coaches |
| `/avisar-coach` | aluno (perfil lido com o token dele; `concluiu` e `comentou` exigem ativo e em dia; `pagou` não) | `{ tipo: 'concluiu' \| 'comentou' \| 'pagou' }` | `{ ok: true }` (não diz se o coach recebeu) |
| `/recado` | coach: cada `alunoId` é conferido como no `/treino-pronto` | `{ alunoIds: string[] (1 a 15), texto (1 a 200) }` | `{ ok: true, enviados: n }`; ninguém permitido = 403 |
| `/aviso-pagamento` | robô (igual) | aceita também `tipo: 'treino-hoje'` | igual |

Tipos (`Tipo`): aluno `treino`, `mensalidade`, `lembrete`, `recado`; coach `concluiu`, `comentou`, `pagou`.

Limites (memória da instância):
- `/avisar-coach`: 10 por minuto por aluno e 1 por tipo a cada 10 min (concluir, desfazer e concluir de novo manda um só).
- `/recado`: 10 chamadas a cada 10 min por coach; cada aluno recebe no máximo 3 avisos do coach a cada 10 min (somado ao "treino pronto").
- `/inscrever` com `coach: true`: 5 conferências de papel a cada 10 min.

| Tipo | title | body | url |
|---|---|---|---|
| lembrete | Hoje tem treino | Seu treino de hoje está no app. Toque para começar. | `/` |
| recado | Aviso do coach | texto do coach (uma linha) | `/` |
| concluiu | Treino concluído | `<nome> concluiu o treino.` | `/` |
| comentou | Nova anotação | `<nome> escreveu uma anotação no treino.` | `/` |
| pagou | Pagamento informado | `<nome> tocou em "Já paguei". Toque para confirmar.` | `/#/alunos` |

## Critério de pronto
- Testes do Worker (`push/src/*.test.ts`), do robô (`tests/avisos-pagamento.test.ts`) e do app (`src/lib/push.test.ts`) passando.
- e2e `notificacoes.spec.ts`: chaves por tipo na Conta (aluno e coach) e aviso escrito (todos e um aluno).
- Worker publicado pelo `push.yml` e app no ar nas 2 marcas.
- Victor confirma num iPhone e num Android (lista em `docs/estado-sessao.md`).

## Riscos
- **Sem internet na hora:** o aviso ao coach se perde (o dado em si fica gravado; o coach vê no app).
- **Até 3 aparelhos por pessoa** (desde 10/11/2026): cada aparelho guarda a própria inscrição e os tipos que desligou. Antes valia só o último aparelho que abriu o app.
- **Horário do lembrete:** pontual (alarme do Worker). A mensalidade ainda sai quando o robô do GitHub roda (hoje, à tarde).
- **Coach que deixa de ser coach** continua na lista até sair da conta naquele aparelho.
- **Nome do aluno** passa pelo Worker dentro da notificação (criptografada até o celular do coach); nada é guardado nem logado. O texto da Política sobre a Cloudflare foi ajustado, sem pedir novo aceite.
- **Aluno mal-intencionado** só consegue mandar ao coach os 3 textos fixos, com o próprio nome, 1 a cada 10 min por tipo.

# Lembrete na hora certa (10/11/2026)
Medido em 12 dias: o agendador do GitHub rodou o robô das 8h47 entre 13h19 e 18h37. O lembrete das 6h47 chegaria à tarde.
- **Como ficou:** o robô roda 3 vezes por dia (`AGENDAR=1`) só para **entregar** a lista ao Worker, com `quando` = próximas 6h47 de Brasília. O Worker guarda na instância `__agenda:<projeto>` e dispara pelo alarme do Durable Object, que é pontual. Sem segredo novo.
- **Contrato:** `/aviso-pagamento` aceita `quando` (ms, de agora+1 min a agora+36 h) e `inicio` (1º lote: troca a lista guardada para essa hora; lote vazio limpa). Sem `quando`, envia na hora (mensalidade e teste manual do lembrete).
- **No disparo:** um lote (até 20) por alarme; lote com mais de 3 h de atraso é descartado; apaga antes de enviar (alarme repetido não duplica).
- **Quem recebe** (`quaisLembrar`): meso em andamento que pede treino naquele dia. Com "Dias de treino": só nos dias marcados e enquanto faltar treino na semana. Sem eles: calendário automático (`DIAS_AUTO`, igual a `src/lib/agenda.ts`), no dia planejado ou enquanto estiver atrasado na semana.
- **Já treinou hoje:** como a lista sai na véspera, o Worker anota a hora do "concluiu" (`/avisar-coach`) e não manda o lembrete a quem concluiu treino no dia.
- **Limite:** renovação ou meso criado depois da última rodada do robô (em geral à noite) só entra no lembrete do dia seguinte.

# Vários aparelhos e "Apagar de vez" (10/11/2026)
- **Vários aparelhos:** `fixas` no storage do DO = lista de até 3 `{ i: inscrição, d: tipos desligados, em }`. `/inscrever` atualiza o aparelho pelo `endpoint`; `/desinscrever` com `{ endpoint }` tira só aquele (sem `endpoint`, todos). O aviso vai a todos os aparelhos que não desligaram o tipo; 404/410 apaga só a inscrição morta.
- **`/esquecer`:** JWT da conta de serviço (igual a `/aviso-pagamento`), corpo `{ projeto, uids }` (1 a 20). Apaga tudo o que o Worker guarda da pessoa e tira o uid da lista de coaches. Chamado pela Limpeza LGPD.

