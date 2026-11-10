# Plano — Fase 3: avaliação física e relatório escrito de evolução (09/11/2026)

Vale para as duas marcas (mesmo código). Escolhas do Victor:
- **Medidas:** peso e altura (sempre), perímetros, dobras cutâneas (Pollock 7 dobras) e bioimpedância.
- **Quem preenche:** só o coach. O aluno só vê depois de "Liberar" (igual ao relatório do ciclo).
- **Lembrete:** a cada mesociclo (ciclo terminou sem avaliação nova).
- **Foto:** não por enquanto. O Firebase Storage exige o plano pago (Blaze); se um dia entrar foto, avisar antes.

Decisões do arquiteto:
- O texto do relatório é montado por regras, no aparelho. **Sem IA:** dado de saúde não sai do Firebase.
- Guardamos a **idade**, nunca a data de nascimento (a Política promete não pedir).
- Só as medidas são gravadas. IMC, % de gordura, massa magra e o texto são **calculados na hora**.

## Modelo de dados
`avaliacoes/{id automático}`:

| Campo | Tipo | Regra |
|---|---|---|
| `alunoId` | texto | precisa ser um aluno que existe |
| `data` | `AAAA-MM-DD` | dia da avaliação |
| `pesoKg` | número | 20 a 300 (obrigatório) |
| `alturaCm` | número | 100 a 250 (opcional) |
| `sexo` | `M` ou `F` | opcional; a conta das dobras precisa |
| `idade` | inteiro | 10 a 100 (opcional; a conta das dobras precisa) |
| `perimetros` | mapa (cm) | ombro, torax, cintura, abdomen, quadril, bracoD, bracoE, antebracoD, antebracoE, coxaD, coxaE, panturrilhaD, panturrilhaE |
| `dobras` | mapa (mm) | peitoral, axilar, triceps, subescapular, abdominal, suprailiaca, coxa |
| `bio` | mapa | gorduraPct, massaMuscularKg, visceral |
| `comentario` | texto | até 3000 |
| `liberado`, `liberadoEm` | bool, hora | `liberadoEm` não nulo exatamente quando liberado |
| `atualizadoEm` | hora do servidor | |

- Id automático (não leva o uid): o aluno presencial que ganha acesso ao app muda de id, e a avaliação vai junto.
- Gravação: o documento **inteiro** de uma vez (`setDoc` sem merge). Só o coach edita, num formulário; medida apagada precisa sumir. A regra "campo a campo" é das cargas, não vale aqui.

## Cálculo (`src/lib/avaliacao.ts`, puro, com testes)
- **IMC** = peso ÷ altura².
- **% de gordura pelas dobras** (precisa das 7 dobras, sexo e idade), Jackson & Pollock + Siri:
  - homem: D = 1,112 − 0,00043499·S + 0,00000055·S² − 0,00028826·idade;
  - mulher: D = 1,097 − 0,00046971·S + 0,00000056·S² − 0,00012828·idade;
  - % = (4,95 ÷ D − 4,5) × 100. S = soma das 7 dobras em mm.
- Sem as dobras completas, vale o % digitado da bioimpedância.
- **Massa gorda** = peso × %; **massa magra** = peso − massa gorda.
- **Cintura/quadril** = cintura ÷ quadril.
- **Leitura com desconfiança:** número que não é finito ou está fora da faixa é ignorado (as regras não conferem os valores dentro dos mapas).
- **Comparação:** com a avaliação anterior (por data) e, se houver, com a primeira.
- **Texto:** frases prontas, só descrevem (o app não sabe se o objetivo é ganhar ou perder peso). Nunca "você piorou".
- **Ciclo de referência:** o ciclo terminado mais recente até 7 dias depois da avaliação; sem nenhum, o ciclo em andamento. Dele saem aderência, volume e recordes (`relatorioCiclo`, que já existe).
- **Lembrete:** ciclo terminado há até 30 dias e nenhuma avaliação do aluno a partir de 7 dias antes do fim.

## Regras (`firestore.rules`)
- Coach (com 2º fator): lê, cria, altera e apaga.
- Aluno: lê **só a própria, liberada**, estando ativo e em dia, pela consulta `alunoId == uid` + `liberado == true`. Nunca escreve.
- Rascunho, avaliação de outro aluno, listar tudo, aluno vencido/bloqueado, anônimo: negado.
- Formato conferido: campos permitidos, chaves dos mapas, faixas de peso/altura/idade, `atualizadoEm` = hora do servidor.

## Telas
- **Coach**
  - botão "Avaliação física" no perfil do aluno → lista (`#/aluno/:uid/avaliacoes`) com "Nova avaliação";
  - formulário (`#/aluno/:uid/avaliacao/:id`): medidas, resultado ao vivo, texto de evolução, recado, Salvar rascunho / Liberar / Atualizar / Recolher, Baixar PDF, Apagar;
  - Início: cartão "Avaliações a fazer".
- **Aluno**
  - Início: cartão "Sua avaliação física está pronta";
  - `#/avaliacao/:id`: resultado, comparação, texto, recado do coach, Baixar PDF e as outras avaliações liberadas.
- **PDF:** mesmo motor do relatório do ciclo (`src/lib/pdf.ts`); as peças de página saem de `pdfRelatorio.ts` para um arquivo comum.

## LGPD
- `avaliacoes` entra em "Apagar de vez" (`apagarAluno`), na Limpeza LGPD e em `darAcessoAoApp`.
- O backup já leva todas as coleções (criptografado, 30 dias).
- Política de Privacidade: item novo e seção "Dados de saúde"; `VERSAO_PRIVACIDADE` nova (todos aceitam de novo uma vez).
- Sem nome, e-mail ou medida em log, resumo de robô ou alerta.

## v2 (10/11/2026): tela do aluno resumida, cores de evolução e leitura medida x dobra
Pedido do Victor depois de testar no celular: o quadro "Avaliações · Em breve" contradizia o banner "avaliação pronta"; a tela tinha informação demais; os números não mostravam quem evoluiu; a coluna Diferença era cortada.
- **Leitura** (motor, `src/lib/avaliacao.ts`): seta + cor por medida; braço x tríceps, cintura x supra-ilíaca etc. (`PAR_DOBRA`); esperado subir, exceto cintura e abdômen; limiares 0,5 cm e 1 mm. Detalhes na linha "Avaliação física" de "Pontos sensíveis".
- **Lipedema** (decidido pelo Victor): campo `lipedema` (`bracos`/`pernas`) na avaliação, só o coach marca, inverte a expectativa da região. Dado de saúde novo: Política e `VERSAO_PRIVACIDADE` = `2026-11-10`.
- **Peso e IMC neutros** (decidido pelo Victor): seta cinza; a cor vem da composição (gordura %, massa magra).
- **Tela** (7 leis de UX): resumo no topo (frase + 4 cartões com delta), "O que mais mudou" (até 3 ganhos e 3 a observar), grupos recolhidos por região, linha de medida sem tabela, texto escrito recolhido.
- **Início do aluno:** o quadro vira link para a última avaliação; o banner "pronta" só nos 7 dias seguintes à liberação.
- **PDF:** delta colorido com seta desenhada e a linha da leitura.

## Critério de pronto
- `npm run typecheck`, `npm test`, `npm run test:rules`, `npm run build` e `build:gislane` verdes.
- e2e `avaliacao.spec.ts` (coach lança, rascunho escondido, libera, aluno vê, 2ª avaliação compara, PDF) e `varredura.spec.ts`, nas duas marcas.
- Testes de regras e de ataque para `avaliacoes`; teste da Limpeza LGPD apagando avaliações.
- `docs/mapa.md` (arquivos, rota, coleção, ponto sensível) e `docs/estado-sessao.md` atualizados.

## Riscos
- **Dado sensível novo:** vazamento seria grave. Proteção: regra testada, leitura do aluno só por consulta, 2º fator do coach.
- **Aceite de novo:** todos os alunos veem a tela de aceite uma vez (e a conferência de senha).
- **Fórmula:** Pollock 7 dobras vale para adultos; fora disso o número é uma estimativa. O app mostra de onde veio o % (dobras ou bioimpedância).
- **Comparação do aluno:** ele compara só com avaliações liberadas; o coach compara com todas.
- **Leituras:** a tela do aluno lê os mesos e registros dele (como a Evolução). O Início do coach ganha 1 consulta pequena (avaliações dos últimos 45 dias).
