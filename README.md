# Força — app de treino

Substitui a planilha de treino "Força 2027.1" por um app que funciona **sem internet na academia** e **não perde cargas**.

- **Coach (web):** monta o mesociclo (2–7 treinos/semana, 1–12 semanas, métodos avançados) e controla o acesso dos alunos ("pago até" + bloquear/liberar).
- **Aluno (Android e iPhone):** vê o treino do dia e registra a carga de cada série.
  - Android: APK enviado por WhatsApp ou baixado pelo link.
  - iPhone: link → "Adicionar à Tela de Início".

## Fases
| Fase | Entrega | Status |
|---|---|---|
| 0 | Fundação: motor de cálculo, regras de segurança, catálogo, CI | ✅ |
| 1 | Painel do coach (alunos, acesso, mesociclos, visão semanal) | ✅ falta publicar ([guia do Firebase](docs/firebase-setup.md)) |
| 2 | App do aluno + APK + página `/instalar` | — |
| 3 | Avaliação física | — |
| 4 | Extras (rotina, importação, PDF) | — |

## Para desenvolvedores
```bash
npm install
npm run dev          # app local
npm test             # motor de cálculo
npm run test:rules   # regras do Firestore (precisa de Java; usa o emulador)
npm run test:e2e     # fluxo completo no navegador (emuladores)
npm run emuladores   # banco de teste local; rode o app com VITE_USE_EMULATOR=1
npm run build
```
- Especificação das fórmulas: [`docs/logica-planilha.md`](docs/logica-planilha.md)
- Regras para o Claude Code (agentes, plugins, economia de tokens): [`CLAUDE.md`](CLAUDE.md)

## Manutenção
- **Trocar e-mail de aluno** (o aluno não troca sozinho): GitHub → **Actions** → **Alterar e-mail de aluno** → **Run workflow** → e-mail atual e e-mail novo. A conta, a senha e o histórico continuam. Coaches trocam o próprio e-mail no app (clique no seu nome → Minha conta).
- **Gerar APK**: ver [`docs/apk.md`](docs/apk.md).
