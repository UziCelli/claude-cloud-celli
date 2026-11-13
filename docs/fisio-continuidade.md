# Continuidade Físio — Codex / Claude

## 12/11/2026 — orientação individual dos métodos

Victor pediu ao Codex que continuasse o PR #161 a partir do Markdown científico e deixasse o contexto para o Claude retomar. O arquivo anexado é idêntico ao corpo de `docs/fisio-pesquisa.md` (o repositório só acrescenta uma nota introdutória). A pesquisa original fica preservada. Não juntar nem publicar sem o pedido explícito do Victor, conforme `plano-fisio.md`.

### Decisões desta entrega

- Completar o critério 4 do Markdown: o coach revisa alertas e registra uma liberação profissional existente antes de disponibilizar uma orientação individual; o aluno acessa somente suas orientações. Isso não insere métodos no motor nem muda cargas, séries ou progressão automaticamente.
- Usar coleção `fisioOrientacoes`, com um documento por orientação. Conteúdo imutável depois de enviado; o coach pode recolher. Correção exige uma nova orientação. O aluno só pode marcar que apresentou um dos sinais de alerta; não pode retirar o sinal nem alterar a orientação. O coach vê esses relatos no Início e na ficha.
- ~~Métodos sem `encaminharSe` ficam apenas no catálogo do coach.~~ **Atualizado (Claude, 12/11/2026, decisão do Victor):** M08, M09, M15, M16, M17, M19, M20, M22, M23 e M24 usam `ALERTA_GERAL` (sinais gerais de perigo, marcados `alertaGeral: true` e exibidos como gerais, não como evidência) e podem ser enviados. `fisioLiberavel` e `fisioExigeLiberacao` nas regras foram atualizados (todo método com `liberacao` exige registro).
- Todo método com `liberacao` exige, conservadoramente, registro de profissional, conselho/registro e data. Nos demais, o formulário pergunta pelos contextos globais da pesquisa (pós-cirúrgico, lesão aguda, osteoporose, fibromialgia ou dor irradiada); se presentes, também exige o registro. O coach registra uma liberação de médico/fisioterapeuta; esse formulário não emite uma liberação clínica.
- Uma orientação com sinal relatado deixa de mostrar o protocolo ao aluno e orienta parar e procurar atendimento profissional. O sinal permanece no histórico, inclusive após recolhimento. O coach não pode apagá-lo com uma edição concorrente.
- Leitura offline usa o cache já existente; publicação pelo coach espera confirmação do servidor. Relato de sinal oferece orientação de parada imediatamente e mostra separadamente se está aguardando sincronização. Não prometer notificação push: o aviso ao coach é um cartão no app.
- Dado de saúde: incluir na Política e nova versão de aceite, exclusão direta, limpeza LGPD e transferência presencial → conta. Não colocar dados pessoais em comentários do PR, logs ou documentos versionados.

### Critério de pronto e verificação

Testes de domínio (catálogo liberável, condições, liberação e leitura desconfiada), regras no emulador (isolamento, MFA, adulteração, campo extra, não apagar sinal, transferência), fluxo de navegador coach → aluno → sinal → coach e recolhimento; typecheck, testes unitários e builds. Registrar os resultados reais abaixo ao concluir.

### Próximas etapas que continuam no plano

O botão geral “Senti dor” por exercício/intensidade e a resposta do coach ao relato ainda são a Etapa 3. Esta entrega implementa somente o fluxo de orientação individual dos métodos científicos e o relato de seus sinais de alerta. Não aplicar automaticamente os limiares R1 a uma dor de origem desconhecida.

### Critérios do Markdown científico

| Critério | Situação |
| --- | --- |
| 25 métodos, evidência e filtro por queixa | Já implementado pelo Claude no guia do coach; preservado. |
| R1–R8 disponíveis | Guia do coach e leitura das orientações do aluno. |
| Limítrofes opcionais com ressalva | Preservado no guia; indicação e ressalva também na orientação individual. |
| Alertas e liberação antes de enviar ao aluno | Implementado para os 15 métodos com sinais específicos. Envio dos outros 10 bloqueado também nas regras, aguardando complemento da fonte. |
| Sugestão inicial onde não verificado | Preservado, sem promover protocolo a “verificado”. |
| Nenhuma carga absoluta preenchida | Não há campo de carga neste fluxo nem alteração no motor. |
| Apontar o que não coube sem inventar | Protocolos continuam como texto da fonte, sem converter faixas em uma prescrição automática. Sinais ausentes e botão geral de dor continuam pendentes, explicitados acima. |

### Resultados

- `npm run typecheck`: passou.
- `npm test`: 997 testes passaram (67 arquivos).
- `npm run build` e `npm run build:gislane`: passaram. Os avisos de tamanho de bundle/import dinâmico já existentes permanecem.
- Emuladores Auth/Firestore + `npx vitest run --config vitest.rules.config.ts --testTimeout=30000`: 370 testes passaram (8 arquivos), inclusive os seis novos de Físio e a limpeza LGPD com a coleção nova. Usado limite de 30 s por teste para os scripts administrativos, que já tinham histórico de timeout em 5 s; não alterado o limite geral do projeto.
- Emuladores + `npx playwright test e2e/fisio.spec.ts`: 2 cenários passaram (envio, liberação, isolamento, relato offline, sincronização, painel do coach, recolhimento e pausa por saúde). Capturas locais de celular conferidas visualmente; apenas contas fictícias no emulador.
- Repetição conjunta final: `npx playwright test e2e/fisio.spec.ts e2e/metodos.spec.ts e2e/privacidade.spec.ts`: 13 cenários passaram, incluindo Físio (2), Métodos (2) e Privacidade (9).
- `graphify update .`: executado (AST, sem LLM); incluir o grafo atualizado no commit.

Para retomar: buscar a branch `ccr-0e483d63-az3bo7`, ler este documento e o diff do último commit do Codex. Não reescrever as orientações para editar/recolher/relatar: isso apagaria sinais concorrentes. A próxima entrega é o botão geral de dor (Etapa 3) ou completar os dez conjuntos de sinais com fonte científica. O PR continua em rascunho e sem publicação.

## 12/11/2026 (noite) — Claude: Etapa 3 e lista geral de perigo

- `ALERTA_GERAL` nos 10 métodos sem sinais próprios (decisão do Victor). O teste de catálogo completo das regras pegou que `fisioExigeLiberacao` precisava incluir M08, M16, M20, M22 e M24; corrigido.
- Etapa 3: coleção `fisioDores` (relato de dor por exercício: local, tipo, intensidade 0–10, momento, texto). Aluno só cria; coach marca visto, responde e transfere. Dica fixa por faixa (`src/lib/dor.ts`), sem chamar a dor de aceitável, conforme a nota acima sobre R1 em dor de origem desconhecida. Sem push.
- `VERSAO_PRIVACIDADE` não foi trocada de novo: a versão desta branch ainda não foi publicada e cobre o PR inteiro.

## 13/11/2026 (madrugada) — Claude: rodada 4 (pedido do Victor antes de dormir)

- Ajustes dos prints (botão "Senti dor" visível; frase vazia do Físio do aluno) e os 6 pontos: métodos aplicados no treino (os 25), check-in de recuperação + "sentiu dor hoje?" no fim do treino, sugestões de polimento/conversar, cruzamentos com a anamnese, aba Físio.
- Consulta ao Fable (desenho): a orientação ganha `exercicios` (não mexe em meso/motor); check-in com sono, estresse, cansaço (Hooper & McLean / Saw 2016) e alimentação só como contexto; números conservadores das sugestões; coach mantém 6 abas com "Treino | Físio" dentro de Métodos; aluno ganha a 5ª aba Físio.
- Contexto de liberação pré-marcado e travado quando a anamnese diz cirurgia em 12 meses, gestação ou problema de osso/articulação/coluna (conservador; gestação não está na lista da pesquisa, decisão de segurança a confirmar com o Victor).

## 13/11/2026 (manhã) — Claude: correções da revisão do PR (F1–F8)

- F1/F8: o modal do selo no treino lê a orientação atual (fecha se recolhida; esconde protocolo se sinalizada) e tem o botão de sinal (`BotaoSinal.tsx`, compartilhado com a aba Físio).
- F2: a chave da sugestão segue o evento mais recente entre todos os gatilhos (sinal usa `sinalEm`).
- F3/F7: check-in com id da sessão (`registroId`), só create nas regras (idempotente); estados enviando/recebido/já respondido/erro com "Tentar de novo"; só para treino concluído há até 12 h.
- F4/F5: `sugestoesFisio` corta a própria janela (`JANELA_CALCULO_DIAS` = 45); hooks devolvem `todos` (cálculo, sem corte de quantidade) e `dados` (exibição). Ficha e Alertas dão o mesmo resultado.
- F6: erro de leitura (Físio ou base) mostra aviso, não "Tudo em dia", e não limpa dispensas.
- A1 (cruzar cargas/volume/anamnese nas sugestões): proposta em `docs/fisio-a1-proposta.md`, aguardando o Victor.
