// Ajuda de preparação dos emuladores para o teste e2e (fetch puro, sem SDK do Firebase).
const PROJETO = 'demo-forca'
const AUTH = 'http://127.0.0.1:9099'
const FIRESTORE = 'http://127.0.0.1:8080'

export async function limparEmuladores() {
  await fetch(`${FIRESTORE}/emulator/v1/projects/${PROJETO}/databases/(default)/documents`, { method: 'DELETE' })
  await fetch(`${AUTH}/emulator/v1/projects/${PROJETO}/accounts`, { method: 'DELETE' })
}

// Cria um usuário no Auth emulator e devolve o uid.
async function criarConta(email: string, senha: string): Promise<string> {
  const r = await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: senha, returnSecureToken: true }),
  })
  if (!r.ok) throw new Error(`signUp falhou: ${r.status} ${await r.text()}`)
  const { localId } = await r.json()
  return localId as string
}

// Grava usuarios/{uid} direto via REST do Firestore emulator (Bearer owner ignora as regras).
async function gravarUsuario(uid: string, dados: Record<string, unknown>) {
  const fields: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(dados)) fields[k] = { stringValue: v as string }
  const r = await fetch(
    `${FIRESTORE}/v1/projects/${PROJETO}/databases/(default)/documents/usuarios/${uid}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
      body: JSON.stringify({ fields }),
    },
  )
  if (!r.ok) throw new Error(`gravar usuario falhou: ${r.status} ${await r.text()}`)
}

// Cria a conta do coach (Auth + Firestore), pronta e ativa.
export async function criarCoach(nome: string, email: string, senha: string): Promise<string> {
  const uid = await criarConta(email, senha)
  await gravarUsuario(uid, { papel: 'coach', status: 'ativo', nome, email })
  return uid
}
