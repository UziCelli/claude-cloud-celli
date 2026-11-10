import marca from '@marca/marca.json'

// Link que o coach mostra em QR Code: abre direto o cadastro da marca (rota pública, como /instalar).
export const CAMINHO_CADASTRO = '/cadastro'
export const linkCadastro = `https://${marca.dominio}${CAMINHO_CADASTRO}`
export const emLinkCadastro = (caminho = location.pathname) => caminho === CAMINHO_CADASTRO
