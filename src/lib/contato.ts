// Mensagem ao aluno sem guardar telefone (LGPD): o WhatsApp abre com o texto e o coach escolhe o contato;
// o e-mail usa o do login do aluno, que o app já tem.
export const linkWhatsApp = (texto: string) => `https://wa.me/?text=${encodeURIComponent(texto)}`

export const linkEmail = (email: string, assunto: string, corpo: string) =>
  `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`

// Saudação pelo primeiro nome.
export const primeiroNome = (nome: string) => nome.trim().split(/\s+/)[0] ?? ''
