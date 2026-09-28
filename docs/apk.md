# APK do Força (Android)

## O que o workflow faz
1. Cria o keystore de assinatura na primeira vez (fica guardado, criptografado, no repositório).
2. Empacota o site como app Android (TWA) e assina com esse keystore.
3. Publica o APK como um "release" do GitHub chamado `apk`.
4. Manda o site publicar de novo, para levar junto o link de confiança do app.

## Como gerar
1. No GitHub, aba **Actions**.
2. Escolha **Gerar APK** na lista à esquerda.
3. Clique em **Run workflow** → **Run workflow**.
4. Espere terminar (uns 10 a 20 minutos). O APK fica em **Releases → apk**.

## Segredo importante
- A senha `APK_SENHA` protege o keystore. Sem ela, não dá para gerar uma
  atualização do mesmo app — os celulares que já instalaram o APK antigo
  não aceitariam um APK novo assinado com outra chave.
- Guarde essa senha em local seguro. Não precisa trocar o APK sempre: se
  perder a senha, é possível gerar um app novo, mas os alunos precisam
  reinstalar.

## Atualizações do app
- O conteúdo (telas, textos, cálculos) atualiza sozinho, sem precisar
  gerar um APK novo — o app é uma "casca" que abre o site.
- Só gere um APK novo se quiser mudar o nome ou o ícone que aparecem
  no celular (o app não passa por loja nenhuma).
