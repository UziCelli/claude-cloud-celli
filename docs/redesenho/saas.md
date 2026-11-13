# Rumo ao SaaS — o que muda (RASCUNHO, não aprovado)

Ideia do Victor (13/11/2026): vender o app para outros personais e para academias (pessoa jurídica). O contratante põe a logo dele e o app se ajusta às cores.
Este arquivo só mapeia o terreno. **Toda decisão aqui é de arquiteto + Victor**, e várias têm custo em dinheiro.

## Como a marca funciona hoje
- Cada marca é uma pasta: `marcas/vfit/` e `marcas/gislane/` (`marca.json`, `tema.css`, `Logo.tsx`, ícones).
- A marca é escolhida **na hora de montar o app** (`vite --mode gislane`). O código importa `@marca/...`.
- Cada marca tem **o próprio projeto Firebase e o próprio endereço** (`.firebaserc`: `forca--app` e `gislane-personal-trainer`).
- Marca nova hoje = pasta nova + projeto Firebase novo + publicação nova, feito por nós. Serve para 2 ou 3 marcas; não serve para 50.

O lado bom: o código já **não tem cor nem nome fixo**. Tudo passa por `marca-*`, `slate-*` e `marca.json`. A prévia do SaaS (`previa/previa-saas.jpg`) é a mesma tela com outras variáveis.

## O que o SaaS precisa (em ordem de dificuldade)
### 1. Marca em tempo real (mais fácil, é quase só tela)
- Cores viram variáveis carregadas quando o app abre, em vez de fixas na montagem.
- Logo enviada pelo contratante (imagem), no lugar do `Logo.tsx`.
- **Cores a partir de 1 cor:** o contratante escolhe a cor principal (ou o app sugere a partir da logo). O app calcula o resto:
  - tons claros e escuros da cor;
  - fundo e superfícies neutros puxados de leve para a cor;
  - **texto sobre a cor (branco ou preto) escolhido pelo contraste**, para nunca ficar ilegível (ex.: amarelo pede texto escuro);
  - verde de "feito", amarelo de alerta e rosa de dor **não mudam** com a marca (são significado, não enfeite). Se a cor da marca for parecida com uma delas, o app afasta o tom.
- Tema claro e escuro: a prévia do SaaS está em claro para mostrar que o desenho aguenta. Decidir se o contratante escolhe ou se segue o celular do aluno.
- Limite a testar: logo com muitas cores, logo só branca, cor muito clara.

### 2. Nome, textos e dados do responsável
- Hoje vêm do `marca.json` (nome, "do VFITCOACH", CREF, Pix, link de avaliação no Google). Passam a vir do cadastro do contratante.
- A Política de Privacidade cita o responsável: no SaaS, **o contratante é o controlador dos dados e nós viramos operador** (LGPD). Precisa de advogado.

### 3. Dados separados por contratante (difícil, mexe em segurança)
- Hoje cada projeto tem um coach e os alunos dele. Não há "de qual contratante é este aluno".
- Dois caminhos, a decidir pelo arquiteto:
  - **um projeto Firebase por contratante** (como hoje): isolamento forte, mas cada cliente novo é trabalho manual e custo de manutenção;
  - **um projeto só, com todos os contratantes dentro**: escala, mas exige reescrever `firestore.rules` (cada leitura e escrita checando o contratante), migrar dados e testar tudo de novo.
- Academia tem **vários coaches** e papéis (dono, coach, recepção). Hoje só existem coach e aluno.

### 4. App instalado com a cara do cliente
- PWA: nome e ícone vêm do manifesto, hoje fixo por marca. Em tempo real dá para servir um manifesto por endereço (ex.: `academiax.dominio.com`).
- APK Android (TWA) e loja: um por marca. No SaaS, o caminho barato é um app só com a marca por dentro; app próprio na loja vira plano mais caro.
- Notificações: o Worker (`push/`) precisa saber de qual contratante é cada aviso (conferir como ele separa as duas marcas hoje).

### 5. Cobrança e limites (tem custo)
- Cobrar o contratante (mensalidade por aluno ativo? por coach?), bloquear por falta de pagamento, período de teste.
- Hoje o projeto é **plano gratuito do Firebase, sem Cloud Functions**. SaaS com cobrança automática e cadastro de contratante quase certamente pede servidor pago.
- IA (voz do meso, análise): conferir de quem é a chave hoje (`features/conta/AssistenteIA.tsx`); no SaaS vira custo por contratante.

### 6. Operação
- Cadastro do contratante sem a nossa mão (hoje aluno novo é liberado pelo coach; contratante novo seria liberado por quem?).
- Suporte, termos de uso, contrato com pessoa jurídica, nota fiscal.
- Catálogo de exercícios e métodos: igual para todos ou cada contratante edita o seu?

## Ordem sugerida
1. **Redesenho do aluno** (`proposta.md`), já usando só variáveis de marca. Não custa nada a mais e deixa o app pronto para trocar de cor.
2. **Marca em tempo real** nas duas marcas atuais (VFITCOACH e Gislane continuam iguais por fora). Prova que a troca de cor/logo funciona sem montar o app de novo.
3. **Gerador de tema a partir de 1 cor** + tela "Minha marca" para o coach, com prévia ao vivo.
4. Só depois: dados por contratante, papéis, cobrança. É outro projeto, com plano próprio e orçamento.

## Perguntas para o Victor (quando chegar a hora)
- Primeiro cliente-alvo: personal sozinho ou academia? Muda quase tudo do item 3.
- O aluno do contratante vê "feito com VFITCOACH" em algum lugar, ou a marca some por completo?
- O app do Victor e o da Gislane migram para dentro do SaaS ou continuam separados?
- Quanto dá para investir por mês em servidor antes do primeiro contratante pagar?
