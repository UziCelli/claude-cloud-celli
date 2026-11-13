# Revisão do PR #166 — carga por lado

13/11/2026 · base `9322880` · revisado `11348d2245881545247f17f0a0f4aee67761efdc`.
O PR #166 foi integrado em `a489a61` durante a sessão. Parecer: corrigir os quatro pontos abaixo em atualização posterior da entrega A. Revisão sem alterações no código da entrega A; correções ficam para o Claude.

## Correções necessárias (P2)

1. **Trocar exercício no treino do dia herda `doisLados`.** `src/engine/editarSessao.ts:55` espalha o slot antigo. Scott com override `true` → Concentrada Halter mantém `true`, embora o catálogo diga `false`; 6 kg viram 12. Remover o override ao trocar o nome/id, preservando progressão, pausa e métodos. Testar também override `false` → exercício bilateral.
2. **Edição de carga total deixa esquerdo obsoleto.** `src/lib/acoes.ts:360` grava só `cargas`; `src/lib/lados.ts:33` só detecta inconsistência quando esquerdo > total − corpo. Reproduzido: E6/D6 → desligar “2 lados” no meso → editar total para 16 → religar: aparece E6/D10, divisão nunca informada. Invalidar o marcador na escrita comum; definir detecção robusta para versões antigas/offline que não limpam esse marcador. Total continua 16, mas orientação por lado e sugestões seguintes ficam erradas.
3. **Limpar ambos os campos E/D grava zeros.** `src/features/coach/semana/CampoLados.tsx:25` transforma campo vazio em zero antes de conseguir esvaziar ambos. E6/D6 → limpar E → limpar D termina em `cargas=0,lados=0`, em vez de `null/null`. Com peso corporal a soma ainda inclui o corpo. Permitir excluir a série sem converter vazio em realização com zero, preservando zero explicitamente digitado e a proteção das células antigas.
4. **Campos E/D pequenos demais no celular.** `src/features/aluno/Treino.tsx:723` usa a mesma coluna estreita para dois inputs. Em 360 px cada input mede 20,75 px, restando cerca de 11 px para texto com padding/borda. Valores decimais/com dois dígitos não cabem inteiros. Dar espaço próprio aos lados (segunda linha ou redistribuição da grade), com identificação acessível. Ver screenshot `lados-360.png` no artefato da revisão.

## Validação

- Typecheck: passou.
- Unitários: 72 arquivos, 1.070 testes passaram.
- E2E existentes: `lados.spec.ts` + `peso-corpo.spec.ts`, 4 passaram.
- Regras: `tests/rules.test.ts`, 194 testes passaram. A suíte completa adicional foi interrompida após chamadas de metadados de testes administrativos; não foi concluída localmente.
- Dois testes temporários fora do repositório confirmaram os estados defeituosos descritos acima (não são testes de aceitação das correções).
- Build de navegador passou. CI `app` e `rules` verdes no SHA revisado; E2E remoto ainda em execução na consulta.

Funciona: digitar 6 por lado grava total 12/esquerdo 6; coach vê volume 96 em 8 reps; histórico sem marcador continua intacto. A isometria é a entrega B separada.

## Histórico econômico

Registrar no PR: SHA revisado, pontos pendentes/resolvidos e checks. Reavaliar só o diff posterior e os fluxos afetados; evitar relatórios duplicados ou revisão completa sem mudança de escopo.
