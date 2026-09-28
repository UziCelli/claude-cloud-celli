# Lógica da planilha "Força 2027.1" — especificação do motor

Fonte: aba **Meso 3x** (as abas 2x–7x são a mesma lógica com N treinos por semana; a 3x usa blocos de 40 linhas por semana).
Tudo aqui vira funções puras em `src/engine/`. Onde a planilha tem bug, a regra correta está marcada **[CORRIGIDO]**.

## 1. Configuração do mesociclo
| Campo | Planilha | Regra |
|---|---|---|
| `frequencia` | `AZ5` | 2–7 treinos por semana |
| `semanas` | `AZ3` | 1–12 |
| `inicio` | `AZ4` | data; início da semana `w` = `inicio + 7·(w−1)` |
| `pausaS` | `Z33` | pausa entre séries (s), única no meso |

Semanas `> semanas` não existem (a planilha esconde com `cfgSemanas < w`).

## 2. Divisão (quais exercícios em cada treino)
- `T4:Y13`: coluna = treino (T=1, U=2, …), linha = posição 1–10. Nome vem do catálogo (`src/data/exercicios.json`).
- A posição define a linha de progressão: **1–2 = Principais**, **3–10 = Auxiliares**.
- Troca pontual: o coach pode trocar o exercício de uma posição numa semana específica (na planilha, a partir da semana 4 a célula `C` vira lista). No app: `trocas[semana-treino-posição] = slot`.

## 3. Progressão (reps por série)
- Principais: `T18:Y29` (linha = semana 1–12, coluna = série 1–6). Auxiliares: `T33:Y44`.
- `base(pos)` = reps da série `pos` na linha da semana; `n` = quantidade de séries preenchidas (`COUNT`) nessa linha.

## 4. Métodos avançados (`tblLocalMetodosNx`)
Cada linha = uma aplicação. Campos:
`ativo` (SIM/NÃO), `semana`, `treino`, `exercicio` (posição 1–10), `metodo`, `escopo`, `serie` (1–6, só p/ escopo "Série específica"), `grupo` (1–3, agrupa exercícios do mesmo biset/triset), `reducaoCarga` (informativo), `pausaInternaS`, `blocos`, `repsPorBloco`, `adicional` (carga/reps adicionais), `etapas` (etapas extras do dropset, 1–3), `cargaEtapa1..3`, `repsPadrao`, `repsEtapa1..3`.

Métodos: `Dropset, Biset, Triset, Superset, Circuito, Rest-pause, Clusterset`.
Escopos: `Todas as séries, Série específica, Primeiras 2|3|4 séries, Últimas 2|3|4 séries`.

**Escopo cobre a série `pos`?** (`n` = séries da progressão)
- Todas → sempre · Série específica → `pos == serie` · Primeiras k → `pos ≤ k` · Últimas k → `pos > max(0, n−k)`.

**Várias linhas no mesmo exercício:** cada campo numérico é combinado com **MAX** entre as linhas que casam (é o que o `FILTER`+`MAX` da planilha faz). Só linhas `ativo` da mesma `semana`+`treino`+`exercicio`.

Padrões sugeridos ao criar um método (aba "Avaliador e Referências"):
| Método | Exercícios | Redução carga | Pausa interna | Blocos | Séries padrão |
|---|---|---|---|---|---|
| Dropset | 1 | 20% | 10 s | 1 | Última série |
| Biset | 2 | — | 15 s | 1 | Todas |
| Triset | 3 | — | 15 s | 1 | Todas |
| Superset | 2 | — | 15 s | 1 | Todas |
| Circuito | 4 | — | 20 s | 3 | Todas |
| Rest-pause | 1 | — | 20 s | 2 | Última série |
| Clusterset | 1 | — | 30 s | 3 | Todas |

## 5. Reps de cada série — `AvRep(base, n, semana, treino, ex, pos)`
- **Série normal (`pos ≤ n`)**: linhas que casam **e cobrem `pos`** → `pad = MAX(repsPadrao)`, `bloco = MAX(repsPorBloco)`.
  Resultado: `pad > 0 ? pad : bloco > 0 ? bloco : base(pos)`.
- **Etapa extra de dropset (`pos > n`)**: linhas Dropset do exercício (escopo **não** filtra aqui).
  `passo = pos − n`; `et = MAX(etapas)`; se `1 ≤ passo ≤ et`:
  `repEt = MAX(repsEtapa[passo])`, `padDrop = MAX(repsPadrao)`, `alvo = MAX(serie)` (ou `n` se vazio) →
  `repEt > 0 ? repEt : padDrop > 0 ? padDrop : base(min(alvo, n))`. Senão, a coluna fica vazia.
- As etapas do dropset aparecem como colunas depois da última série (na planilha, até 6 colunas no total).

## 6. Carga sugerida das etapas do dropset — `AvCarga`
Para `pos > n` e `1 ≤ passo ≤ et`: `cargaEtapa[passo]` da **primeira** linha Dropset que casa (0 = vazio). Para `pos ≤ n` a carga é a registrada pelo aluno. (Na aba 3x a função não é usada nas células — no app ela vira a **sugestão** mostrada ao aluno.)

## 7. Rótulo — `AvRotulo(semana, treino, ex)`
Linhas ativas que casam, na ordem da tabela, unidas por `"; "`: `metodo + sufixo`.
Sufixos: Todas → ` [todas]` · Série específica → ` [S{serie}]` · Primeiras k → ` [primeiras k]` · Últimas k → ` [últimas k]`.
Ex.: `Dropset [últimas 2]; Biset [todas]`.

## 8. Tempo da sessão (min) — coluna `Q`
```
tempo = 10 + ( Σ reps de todas as colunas da sessão
             + nSeries · pausaS · max(0, nExercicios − economizados)
             + extraMetodos(semana, treino) ) / 60
```
- `nSeries` = maior nº de séries da sessão (cabeçalho `MAX(D4:I4)`, que na planilha olha só o 1º exercício — no app use o maior `n` entre os exercícios).
- `nExercicios` = posições preenchidas. A planilha usa `paresBiset = INT(nº de linhas Biset ativas da semana+treino / 2)` (bloco "EXTRAS"); o app troca por `economizados` (abaixo).
- As reps entram como segundos (≈1 s por rep) — manter.
- `extraMetodos` (`AvTempo`) = soma por linha ativa da semana+treino, com `p = pausaInternaS`, `b = blocos`, `rp = repsPadrao > 0 ? repsPadrao : repsPorBloco`, `ad = adicional`, `et = etapas`:
  - Clusterset: `rp·(b−1) + p·(b−1)` se `b > 1`, senão 0. **[CORRIGIDO]** a planilha testa `"Cluster"`, nome que não existe na lista, e cai na regra genérica.
  - Dropset: `p · et`
  - Rest-pause: `ad + p · (b > 1 ? b−1 : 1)`
  - Demais: `ad + p · (b > 1 ? b−1 : 0)`
- `economizados` **[DECIDIDO pelo Victor]** — exercícios do mesmo grupo dividem uma pausa só (Biset, Superset, Triset e Circuito):
  - Considera só linhas ativas da semana+treino com método ∈ {Biset, Superset, Triset, Circuito}, contando **posições distintas** (a mesma posição listada duas vezes conta uma).
  - Linhas com `grupo`: agrupa por (método, grupo); cada grupo economiza `posições − 1`.
  - Linhas sem `grupo`: agrupa por método; `tamanho` = 2 (Biset/Superset), 3 (Triset), todas as posições (Circuito); economiza `INT(posições / tamanho) · (tamanho − 1)` (Circuito: `posições − 1`).
  - `economizados` = soma dos grupos. Mantém o comportamento da planilha para Biset (2 linhas → 1).

## 9. Registro do aluno
- Por treino: `realizado` (checkbox) + carga (kg) de cada série/etapa (`J:O`).
- Cargas são digitadas pelo aluno; nada é calculado a partir delas além do monitoramento.

## 10. Monitoramento
Por exercício (linha):
- `movimentos` = Σ reps prescritas (`AD`).
- `cargaMedia` = média das cargas preenchidas (`AF = AVERAGE(J:O)`). **[CORRIGIDO]** na 1ª linha do bloco a planilha usa `K:O` e ignora a série 1.
- `volume` = Σ (reps × carga) por coluna (`AH = SUMPRODUCT`); vazio se 0.
- `cargaMax` = maior carga (usado na evolução).

Por sessão: `movimentos` = Σ movimentos (`AE`); `cargaMedia` = média das `cargaMedia` > 0 dos exercícios (`AG`); `volume` = Σ volumes (`AI`). Valor 0 é exibido vazio.

Por semana (`tblMonitoramento`, linhas 54–65): `movimentos` = Σ das sessões; `cargaMedia` = média das `cargaMedia` das sessões que têm valor; `volume` = Σ; `sessoesAtivas` = nº de sessões com movimentos; `status` = "Ativa" se houver algum número; `dataInicial` = início da semana.

Resumo do ciclo: Σ e média das semanas.

## 11. Meta robusta (por métrica: movimentos, carga média, volume) — `AS66:AU66`
Com `y` = valores semanais numéricos (na ordem), `n = |y|`:
```
med = mediana(y); mad = mediana(|y − med|)
lo = max(0, med − 2.5·mad); hi = med + 2.5·mad
w  = mad == 0 ? y : clamp(y, lo, hi)       // winsorização
avg = média(w)
sl  = n ≥ 3 ? inclinação da regressão linear de w contra 1..n : 0
raw = w[n] + sl
metaSemanal = max(0, min(avg·1.15, max(avg·0.85, raw)))
```
Sem dados → vazio. Meta do ciclo = `metaSemanal × semanas`. **[CORRIGIDO]** a planilha multiplica por 12 fixo (`AV66`).

## 12. Evolução de um exercício — `CG2`
Para um exercício escolhido, cada ocorrência dele no meso (em ordem de semana/treino/posição) gera:
`[ocorrência nº, semana, cargaMax, cargaMedia, volume]`.

## 13. Não portado (de propósito)
- Chave "Cálculos pesados LIGADO/DESLIGADO" (`AN73`): existia só para o Excel não travar.
- Formatação condicional (cores de método): vira estilo na tela.
- Projeções `TREND` do Resumo 2x: só existiam na aba 2x; revisitar se o Victor pedir.
