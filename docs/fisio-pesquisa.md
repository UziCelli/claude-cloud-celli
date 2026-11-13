> Pesquisa do agente do Victor (PubMed, 12/11/2026), guardada como veio. Os 60 PMIDs foram conferidos no PubMed em 12/11/2026: todos existem e batem com autor/revista/ano. Implementação: `src/data/fisio.ts`.

# PROMPT — Grupo de métodos "Fisioterapia" (reabilitação pelo exercício, escopo Educação Física)

## 1. Sua tarefa

Você vai atualizar o sistema de métodos do aplicativo de treino criando um novo grupo chamado **"Métodos Fisioterapia"**. São métodos de treino usados na reabilitação, mas executáveis na musculação por um profissional de Educação Física. O catálogo abaixo já foi filtrado por nível de evidência (pesquisa PubMed de 12/11/2026). Cadastre os métodos, as regras globais e os alertas exatamente como descritos; não invente métodos, parâmetros nem referências além do que está aqui.

## 2. Regras de escopo (valem para o grupo inteiro)

- Somente prescrição de exercício. Nunca incluir: terapia manual, manipulação, mobilização articular passiva, eletroterapia, ultrassom, ondas de choque, agulhamento, bandagem, diagnóstico ou laudo.
- O app nunca diagnostica. A queixa entra como "condição informada pelo aluno/já diagnosticada por médico ou fisioterapeuta".
- Todo método carrega o campo `encaminhar_se` (sinais de alerta). Se o aluno relatar um deles, o app orienta parar e procurar médico/fisioterapeuta.
- Pós-cirúrgico, lesão aguda, osteoporose, fibromialgia e dor irradiada só com liberação profissional registrada (`exige_liberacao: true`).
- Não pré-preencher carga absoluta (kg). Usar só intensidade relativa (%1RM, RM, esforço percebido); a carga é preenchida pelo aluno.
- Linguagem do app: "ajuda na reabilitação", nunca "trata" ou "cura".

## 3. Estrutura de dados sugerida para cada método

```
id, nome, grupo: "Fisioterapia", queixas[], objetivo,
nivel_evidencia: "ALTO" | "MODERADO" | "LIMITROFE",
protocolo: { exercicios[], series, repeticoes_ou_tempo, intensidade, cadencia,
             frequencia_semanal, duracao_semanas, criterio_progressao },
protocolo_verificado: true | false,
materiais[], exige_liberacao: bool, encaminhar_se[], ressalva, referencias[]
```

- `ALTO` = várias revisões sistemáticas/meta-análises consistentes ou certeza GRADE alta/moderada-alta.
- `MODERADO` = ensaios clínicos de boa qualidade ou revisões com alguma inconsistência.
- `LIMITROFE` = entre baixo e moderado. Cadastrar com a flag `opcional: true` e exibir a ressalva. Se o dono do app preferir rigor máximo, basta ocultar esse nível.
- `protocolo_verificado: false` = os números (séries, reps, cadência) são o protocolo clássico ou padrão de prática, não foram conferidos no artigo original nesta pesquisa. Exibir como "sugestão inicial".

## 4. Regras globais de progressão (aplicar a todos os métodos)

| Regra | Conteúdo | Evidência |
|---|---|---|
| R1. Monitoramento de dor | Escala 0–10. Dor durante o exercício é aceitável se for tolerável (referência prática: até ~5/10 em tendão; ≤3–4/10 nas demais queixas), voltar ao nível basal em até 24 h e não piorar a rigidez matinal. Se passar disso: reduzir carga/volume na próxima sessão. Estável ou menor por 2–3 sessões: progredir. | MODERADO (ensaio clínico em tendão de Aquiles com seguimento de 5 anos; o número exato do limiar é convenção prática). Silbernagel 2007 PMID 17307888; 2010 PMID 21084657 |
| R2. Progressão por critério | Avançar por dor, função e força, nunca só por calendário. Mudar 1 variável por vez. Reavaliar a cada 4 semanas. | Consenso |
| R3. Exercício como 1ª linha | Nas queixas abaixo, exercício progressivo por pelo menos ~12 semanas antes de qualquer conclusão. Nenhum tipo de exercício é universalmente superior; aderência e progressão importam mais que a modalidade. | ALTO. Cochrane Hayden 2021 PMID 34580864; Challoumas 2023 PMID 37553459 |
| R4. Elástico equivale a peso | Resistência elástica gera ganhos de força semelhantes a halteres/máquinas quando o esforço é equiparado. Pode substituir carga em qualquer método. | MODERADO. Lopes 2019 PMID 30815258 |
| R5. Superfície instável (bosu, disco) | Usar como progressão de equilíbrio, com carga leve. Nunca para força máxima/hipertrofia nem com carga alta. | MODERADO para equilíbrio; sem vantagem para força. PMID 42468010, 39839523 |
| R6. Educação em dor junto com o treino | Mensagens simples durante a sessão: dor não é igual a dano; o corpo se adapta à carga gradual. Sem abordagem psicoterápica. | MODERADO. Pain 2022 PMID 33863860 |
| R7. Força previne lesão | Treino de força regular reduz lesões esportivas a cerca de um terço; alongamento isolado não reduz. | ALTO. Lauersen 2014 PMID 24100287; 2018 PMID 30131332 |
| R8. Amplitude total para mobilidade | Treino resistido em amplitude completa com excêntrica controlada ganha amplitude de forma semelhante ao alongamento. | MODERADO. Afonso 2021 PMID 33917036 |

## 5. Catálogo por queixa (ordem: as que mais aparecem na rotina de academia)

### 5.1 Coluna lombar — dor lombar crônica inespecífica

**M01. Exercício geral progressivo supervisionado — ALTO**
- Protocolo: 2–4x/sem, sessões de 25–30 min de trabalho específico, 8–13 semanas. Doses baixas a moderadas já funcionam.
- Exercícios: agachamento/leg press, remada, dobradiça de quadril (hinge) com carga leve a moderada, 2–3 séries de 8–15 reps. `protocolo_verificado: false` para séries/reps; dose semanal verificada.
- Ressalva: nenhuma modalidade é claramente superior. Deixar o aluno escolher a que adere melhor.
- Refs: Hayden 2021 (Cochrane) PMID 34580864; Arora 2026 BJSM PMID 42785965.

**M02. Treino resistido progressivo para lombar — MODERADO**
- Protocolo: 2–4 semanas de adaptação com carga leve; depois 2–3x/sem, 2–4 séries de 6–12 reps a ~65–80% 1RM; subir 2–5% quando completar as reps sem aumento de dor. Idosos: ≥3x/sem por >12 semanas. `protocolo_verificado: false` nos detalhes.
- Ressalva: carga externa não é superior a exercício sem carga; o ganho parece vir da exposição e da aderência.
- Refs: Rodríguez-Domínguez 2025 PMID 41065407; Ranzani 2025 PMID 41356326.

**M03. Core: estabilização / controle motor / Pilates — MODERADO**
- Protocolo: core resistido 3–4x/sem, 30–45 min; estabilização 3–4x/sem, 40–60 min, 6–8 sem; Pilates 2–3x/sem, ~50 min, 8–12 sem.
- Progressão: ativação de baixa carga (prancha com apoio, bird dog) → tarefas funcionais (hinge, carregadas, anti-rotação) → carga.
- Ressalva: não superior ao resistido geral. Individualizar melhora o resultado.
- Refs: Guo 2025 PMID 41178988; Capel-Alcaraz 2023 PMID 37432388; Fleckenstein 2022 PMID 35914641.

`encaminhar_se` (lombar): dor noturna/em repouso que piora, febre, perda de peso inexplicada, trauma, fraqueza ou dormência progressiva na perna, alteração para urinar/evacuar, dormência na região genital. Dor irradiada (ciática/hérnia): `exige_liberacao: true`.

### 5.2 Ombro — dor relacionada ao manguito rotador / subacromial

**M04. Exercício resistido progressivo de manguito e escápula — MODERADO**
- Exercícios: rotação externa/interna com elástico, elevação no plano da escápula, remada, desenvolvimento leve.
- Protocolo: 2–3x/sem, 2–3 séries de 8–12 reps, 12 semanas ou mais, progredir a cada 1–2 semanas pela regra R1. `protocolo_verificado: false` (a literatura usa de 2–7x/sem, 1–3 séries, 4–30 reps; não há receita única).
- Ressalva: nenhum tipo (excêntrico, escapular, controle motor) é comprovadamente melhor. Exercícios proprioceptivos adicionais não acrescentaram benefício.
- Refs: Lafrance 2024 JOSPT PMID 38848304; Lazzarini 2026 BJSM PMID 42135016; Dubé 2023 PMID 36796859.
- `encaminhar_se`: trauma com perda súbita da elevação do braço, dor noturna intensa e progressiva, formigamento/fraqueza, perda global de movimento (suspeita de ombro congelado), dor no ombro com sintoma no peito.

### 5.3 Joelho

**M05. Treino resistido progressivo na osteoartrite (artrose) de joelho e quadril — ALTO**
- Exercícios: cadeira extensora, leg press, agachamento parcial, flexora, abdução de quadril, panturrilha.
- Protocolo: 2–3x/sem, intensidade moderada (~40–60% 1RM funciona bem para dor e função; mais alto para força), 12 semanas ou mais; supervisionado rende mais que domiciliar. Combinar com aeróbico melhora o resultado no curto prazo.
- Ressalva: a dose exata tem certeza baixa; mais volume nem sempre é melhor (curva em U invertido).
- Refs: Brown 2026 PMID 42030701 (120 ensaios); Núñez-Cortés 2026 JOSPT PMID 42676087.
- `encaminhar_se`: joelho inchado que piora, travamento, falseio, dor noturna, vermelhidão/febre, dor pior por mais de 24–48 h.

**M06. Dor patelofemoral (dor na frente do joelho): fortalecimento de quadril + joelho — MODERADO**
- Exercícios: abdução e rotação externa de quadril (ostra, abdução com miniband), ponte, stiff; leg press, agachamento e extensora em amplitude sem dor.
- Protocolo: 2–3x/sem, 6–12 semanas, aumentar carga e amplitude conforme a dor permitir. `protocolo_verificado: false` nos detalhes.
- Ressalva: quadril + joelho combinados dão o resultado mais consistente.
- Ref: Contreras-Mora 2026 PMID 42784051.
- `encaminhar_se`: sem melhora em 6–8 semanas, travamento, falseio, inchaço, luxação de patela.

**M07. Lesão degenerativa de menisco (meia-idade): programa de força — ALTO**
- Protocolo: 12 semanas, 2–3x/sem, força de quadril e joelho (agachamento, leg press, avanço, step) + controle neuromuscular. `protocolo_verificado: false` nos detalhes.
- Fundamento: resultado equivalente à cirurgia (meniscectomia parcial) em 2 e 10 anos.
- Refs: Kise 2016 BMJ PMID 27440192; Berg 2025 BJSM PMID 39326908; Meng 2024 PMID 38531745.
- `exige_liberacao: true`. `encaminhar_se`: joelho que trava e não estende, lesão traumática, aluno jovem, inchaço importante.

**M08. Pós-reconstrução de LCA — fase de academia — MODERADO** (`exige_liberacao: true`)
- Conteúdo: fortalecimento de quadríceps (leg press, agachamento, extensora) e posteriores; trabalho unilateral para corrigir assimetria; cadeia aberta e fechada são ambas aceitáveis; excêntrico ajuda força do quadríceps.
- Meta de referência: força do lado operado ≥90% do lado sadio (simetria sozinha não garante boa mecânica de aterrissagem).
- Ressalva: dose e critérios de progressão têm evidência fraca; saltos e retorno ao esporte dependem do cirurgião/fisioterapeuta.
- Refs: Kotsifaki 2023 (guia Aspetar) PMID 36731908; Perriman 2018 PMID 29685058.

**M09. Aquecimento neuromuscular para prevenção de lesão de LCA e membros inferiores — ALTO**
- Protocolo: 15–20 min antes do treino, 2–3x/sem, contínuo. Corrida com mudança de direção, Nordic, avanço, panturrilha, prancha, equilíbrio unipodal, saltos com aterrissagem controlada (sem joelho para dentro). `protocolo_verificado: false` nos detalhes.
- Fundamento: redução de cerca de metade das lesões de LCA, principalmente em mulheres jovens.
- Refs: J Orthop Res 2018 PMID 29737024; Am J Sports Med 2026 PMID 41486737.

### 5.4 Tendões (tendinopatias)

**M10. Heavy Slow Resistance (HSR) — MODERADO** — tendão patelar e de Aquiles
- Protocolo clássico: 3 exercícios (patelar: agachamento, leg press, hack; Aquiles: panturrilha em pé, sentado e no leg press), 3x/sem, cadência ~3 s subida + 3 s descida, 4 séries progredindo de 15RM → 12 → 10 → 8 → 6RM ao longo de ~12 semanas. `protocolo_verificado: false`.
- Ressalva: tendão muito irritado começa pela isometria (M12). Não usar no cotovelo lateral (aderência de 32% por piora da dor).
- Refs: Liu 2026 PMID 42192475; Bruna-Mejias 2026 PMID 42783641.

**M11. Sobrecarga excêntrica (protocolo Alfredson) — MODERADO** — tendão de Aquiles (porção média)
- Protocolo clássico: descida lenta unilateral no degrau, joelho estendido e depois flexionado, 3x15 de cada, até 2x/dia, 12 semanas; subida com a perna boa; adicionar carga quando ficar indolor. Ajustar volume à tolerância. `protocolo_verificado: false`.
- Variação patelar: agachamento unilateral em prancha inclinada 25°, 3x15 (nível LIMITROFE para patelar).
- Ressalva: dor no ponto de inserção no calcanhar → não descer abaixo da linha do degrau.
- Refs: Sivrika 2023 PMID 37628466; Rhim 2020 PMID 32728589.

**M12. Isometria sustentada — LIMITROFE** (`opcional: true`)
- Protocolo clássico: 4–5 séries de 30–45 s a ~70% do esforço máximo, 2 min de intervalo, no ângulo tolerável (ex.: extensora a 60° para patelar; panturrilha isométrica para Aquiles). `protocolo_verificado: false`.
- Uso correto: porta de entrada quando o exercício dinâmico ainda não é tolerado; depois migrar para M10.
- Ressalva obrigatória: não prometer analgesia. Os estudos recentes mostram efeito igual ao exercício dinâmico, não superior, e curto.
- Refs: Soliman 2026 PMID 42203537; Holden 2019 PMID 31735531; Challoumas 2021 PMID 34900334.

**M13. Carga tendínea em estágios — estrutura organizadora (LIMITROFE como sequência)**
- Estágio 1 isometria (M12) → Estágio 2 HSR (M10) → Estágio 3 armazenamento de energia (saltos, M20) → Estágio 4 gesto do esporte.
- Ressalva: as peças têm ensaios clínicos; o encadeamento é consenso de especialistas.

**M14. Tendinopatia glútea (dor lateral do quadril): educação de carga + exercício — MODERADO**
- Educação: evitar ficar apoiado em uma perna com o quadril "caído", cruzar pernas, sentar muito baixo.
- Exercício: fortalecimento de abdutores e carga funcional (ponte, agachamento, step), ~8 semanas, progressivo. `protocolo_verificado: false` nos detalhes.
- Fundamento: melhor que infiltração de corticoide em 8 semanas e 1 ano.
- Refs: Mellor 2018 BMJ (LEAP) PMID 29720374; Wang 2025 PMID 39891188.

`encaminhar_se` (tendões): dor noturna ou em repouso crescente, piora após 2 semanas, inchaço marcado, estalo com perda súbita de força, estagnação por 6–8 semanas.

### 5.5 Coxa e virilha

**M15. Nordic (flexão nórdica) — MODERADO para força e arquitetura muscular**
- Protocolo: 2–3 séries de 8–12 reps, 2–3x/sem (volume alto, muda força e estrutura do músculo); ou 1–2 séries de 3–5 reps, 1–2x/sem (manutenção de força). Começar com volume baixo.
- Ressalva: como prevenção isolada de lesão a evidência é mais fraca; funciona melhor dentro de M09.
- Refs: Cholp 2025 PMID 41178985; Pecci 2025 PMID 40230340.

**M16. Protocolo de alongamento sob carga para posteriores (Askling, protocolo L) — MODERADO** (`exige_liberacao: true`)
- Uso: fase de retorno após estiramento de posterior de coxa. Exercícios excêntricos em posição alongada ("extender", "diver", "glider"). `protocolo_verificado: false`.
- Fundamento: retorno em média 49 vs 86 dias em atletas de elite (um ensaio, n=56).
- Ref: Askling 2014 PMID 24620041.

**M17. Copenhagen (adução em prancha lateral) — MODERADO para força de adutores**
- Protocolo: 2x/sem por 8 semanas; começar com alavanca curta (apoio no joelho) e evoluir para longa (apoio no tornozelo).
- Ressalva: não vender como prevenção de lesão na virilha (evidência baixa; uma meta-análise do tema foi retratada).
- Refs: Quintana-Cepedal 2024 PMID 39551738; Wang 2025 PMID 41217257.

### 5.6 Tornozelo e pé

**M18. Equilíbrio/propriocepção + fortalecimento com elástico — MODERADO** — pós-entorse liberada e instabilidade crônica
- Equilíbrio: apoio unipodal 3x30–45 s, olhos abertos → fechados → disco/bosu → tarefa dupla → alcances multidirecionais.
- Força: eversão, inversão e dorsiflexão com elástico 3x12–15; panturrilha bi → unipodal 3x10–15.
- Protocolo: 2–3x/sem, mínimo 6–8 semanas, depois manutenção. `protocolo_verificado: false` nos números.
- Refs: Martin 2021 (diretriz JOSPT) PMID 33789434; EFORT Open Rev 2026 PMID 42227253.
- `encaminhar_se`: entorse recente com incapacidade de apoiar, inchaço grande, travamento.

**M19. Fascite plantar: panturrilha de alta carga com dedos elevados — LIMITROFE** (`opcional: true`)
- Protocolo: elevação de calcanhar unilateral com toalha enrolada sob os dedos, dias alternados, cadência lenta com pausa no topo, carga progressiva (12RM → 8RM em ~3 meses). `protocolo_verificado: false` na cadência.
- Ressalva: acelera a melhora aos 3 meses; sem diferença aos 6 e 12 meses.
- Ref: Rathleff 2015 PMID 25145882.

**M20. Pliometria progressiva — MODERADO para desempenho** (`exige_liberacao: true` após lesão)
- Estágios: aterrissagem bipodal controlada 3x5 → saltos curtos 3x8–10 → unipodal e laterais → profundidade e mudança de direção. 2x/sem, 48 h entre sessões. `protocolo_verificado: false`.
- Critério: sem dor, sem joelho para dentro, aterrissagem consistente.
- Refs: Sports Med 2020 PMID 32915430; 2023 PMID 37897637.

### 5.7 Pescoço

**M21. Fortalecimento de pescoço, ombros e escápula — LIMITROFE** (`opcional: true`)
- Exercícios: elevação lateral, remada, encolhimento, face pull, extensão cervical isométrica/elástico.
- Protocolo: ~1 h por semana no total (1x60, 3x20 ou em blocos curtos diários), 2–3 séries de 8–12 reps difíceis nas últimas repetições, 10 semanas ou mais.
- Ressalva: ensaios grandes em trabalhadores mostram ~50% menos dor, mas as meta-análises dão certeza baixa; nenhum tipo é superior.
- Refs: Dalager 2015 PMID 25816746; Jones 2024 PMID 38219373; de Zoete 2020 PMID 33139256.
- `encaminhar_se`: dor que desce para o braço com fraqueza/dormência, tontura, desmaio, dor de cabeça súbita e forte, trauma recente.

### 5.8 Idosos e condições crônicas

**M22. Prevenção de quedas: equilíbrio + exercícios funcionais + força — ALTO**
- Equilíbrio desafiador: tandem, unipodal, marcha em linha, passos laterais. Força: sentar-levantar, agachamento com apoio, panturrilha, step.
- Protocolo: 3x/sem, somando ~3 h semanais, contínuo. Progressão: menos apoio de mãos, base menor, superfície macia. `protocolo_verificado: false` na dose.
- Fundamento: −23% na taxa de quedas; equilíbrio + funcional + resistido chega a −34%. Força isolada não basta.
- Ref: Sherrington 2019 (Cochrane) PMID 30703272.
- `exige_liberacao: true` se queda recente com lesão, tontura, desmaio, osteoporose grave.

**M23. Treino de potência / excêntrico em idosos — MODERADO**
- Protocolo: 2–3x/sem, 2–3 séries de 6–10 reps, subida rápida e descida controlada, ~40–60% 1RM, 8–12 semanas. `protocolo_verificado: false`.
- Ref: Exp Gerontol 2026 PMID 42660338.

**M24. Treino resistido na fibromialgia — MODERADO** (`exige_liberacao: true`)
- Protocolo: 2–3x/sem, intensidade moderada, 2–3 séries de 8–12 reps, progressão gradual, ~12 semanas, evitando picos de dor.
- Refs: J Bodyw Mov Ther 2026 PMID 42264849; Ann Phys Rehabil Med 2026 PMID 42551246.

**M25. Treino resistido para massa óssea e sarcopenia — MODERADO** (`exige_liberacao: true` na osteoporose)
- Osso: 2–3x/sem, ≥70% 1RM quando liberado, 8–12 reps, longa duração; versão de alta intensidade com impacto (modelo LIFTMOR: 2x/sem, 30 min, 8 meses, sempre supervisionado).
- Sarcopenia: 2–3x/sem, 2–3 séries de 8–12 reps, grandes grupos musculares.
- Cuidados: evitar flexão de coluna com carga e torções; dor lombar súbita após esforço → parar e encaminhar.
- Refs: J Orthop Surg Res 2025 PMID 40420105; Watson 2019 PMID 30612163; Harding 2020 PMID 32176813; BMC Geriatr 2026 PMID 42947012.

## 6. Não cadastrar (evidência baixa ou fora do escopo)

| Item | Motivo |
|---|---|
| Restrição de fluxo sanguíneo (BFR/oclusão) | Exige equipamento, medida de pressão e triagem vascular; certeza muito baixa para dor e função |
| Isometria como "analgésico garantido" | Resultados conflitantes |
| HSR e excêntrico no cotovelo (epicondilite lateral/medial) | Só estudo de viabilidade com baixa aderência; certeza baixa |
| McGill Big 3 como método nomeado | Sem ensaio clínico localizado; os exercícios podem aparecer dentro de M03 |
| Extensão lombar isolada em máquina / isocinético | Certeza muito baixa |
| Exercício em hérnia/ciática sem liberação | Quase não há ensaios |
| Flexores profundos do pescoço isolados | Evidência heterogênea |
| Exercício escapular ou proprioceptivo isolado no ombro como superior | Sem benefício adicional |
| Fortalecimento de quadril para impacto femoroacetabular; banda iliotibial | Estudos pequenos e heterogêneos |
| Treino unilateral do lado sadio (cross-education) em lesão de membro inferior | Efeito não significativo |
| Copenhagen como prevenção de lesão na virilha | Evidência baixa |
| Treino de perturbação com empurrões | Estudado com esteiras especiais; versão de academia pouco testada |
| Short foot / exercício para canelite | Baixa certeza; sem superioridade |
| Alongamento isolado como prevenção de lesão ou para fascite plantar | Sem efeito demonstrado |
| Bosu/instável para força ou para ativar serrátil | Sem vantagem |
| Vibração de corpo inteiro, estimulação elétrica, terapia manual, ondas de choque, laser | Fora do escopo |

## 7. Critérios de aceite da atualização

1. Os 25 métodos cadastrados no grupo "Fisioterapia", com nível de evidência visível e filtro por queixa.
2. Regras R1–R8 disponíveis como regras globais do grupo.
3. Métodos `LIMITROFE` marcados como opcionais e com ressalva exibida.
4. Campos `encaminhar_se` e `exige_liberacao` funcionando como alerta antes de liberar o método ao aluno.
5. Onde `protocolo_verificado: false`, exibir "sugestão inicial — ajustar individualmente".
6. Nenhuma carga absoluta pré-preenchida.
7. Ao final, entregar a lista do que foi criado e apontar qualquer item que não coube no modelo de dados atual, sem adaptar por conta própria.
