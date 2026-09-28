# Firebase — Guia de Setup

## O que é e quanto custa

Firebase é o serviço do Google que guarda os dados do app (treinos, cargas, alunos). Plano **gratuito** (Spark), sem cartão de crédito. Funciona para ~100 alunos.

---

## Parte 1 — Criar o projeto (10 min)

- [ ] Acesse https://console.firebase.google.com com sua conta Google
- [ ] Clique no botão para **criar projeto novo**
- [ ] Nome: `forca-app` (copie exatamente)
- [ ] Desmarque "Google Analytics" (você não precisa)
- [ ] Clique **Criar projeto** e espere (demora ~1 min)

---

## Parte 2 — Ativar o login por e-mail

- [ ] No menu esquerdo, clique **Build** → **Authentication**
- [ ] Clique **Começar**
- [ ] Clique no provedor **E-mail/Senha**
- [ ] Alterne para **Ativado**
- [ ] Clique **Salvar**

---

## Parte 3 — Criar o banco de dados

- [ ] Ainda em Build, clique **Firestore Database**
- [ ] Clique **Criar banco**
- [ ] Localização: `southamerica-east1 (São Paulo)`
- [ ] Modo: **Produção** (as regras de segurança do app protegem depois)
- [ ] Clique **Criar**

---

## Parte 4 — Me mandar a configuração

- [ ] Clique a engrenagem (⚙) → **Configurações do projeto**
- [ ] Role até "Seus apps"
- [ ] Clique no ícone da Web **`</>`**
- [ ] Apelido: `Força`
- [ ] Desmarque "Também configurar Hosting"
- [ ] Clique **Registrar app**
- [ ] **Copie o bloco `firebaseConfig`** (não é senha — é público)
- [ ] Cole aqui na conversa comigo

---

## Parte 5 — Virar o coach

*Faça isso depois que o app estiver no ar.*

- [ ] Entre no app e crie sua conta (e-mail + senha)
- [ ] Volte no Firebase Console
- [ ] Clique **Firestore** → coleção `usuarios`
- [ ] Encontre seu documento
- [ ] Mude `papel` para `coach`
- [ ] Mude `status` para `ativo`
- [ ] Pronto — você controla tudo agora

---

## Se algo der errado

Tire um print da tela e mande aqui na conversa. Incluir o texto de erro ajuda.
