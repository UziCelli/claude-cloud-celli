// Pix estático (BR Code EMV do BACEN): sem API e sem taxa. Funções puras.

const campo = (id: string, valor: string) => `${id}${String(valor.length).padStart(2, '0')}${valor}`

// CRC16-CCITT-FALSE (poli 0x1021, início 0xFFFF), 4 hex maiúsculos.
export function crc16(texto: string) {
  let crc = 0xffff
  for (let i = 0; i < texto.length; i++) {
    crc ^= texto.charCodeAt(i) << 8
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

const semAcento = (s: string, max: number) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim().slice(0, max)

// CPF/CNPJ com pontuação vira só dígitos; e-mail, telefone (+55…) e chave aleatória ficam como estão.
const limparChave = (c: string) => {
  const t = c.trim()
  return /^[\d.\-/\s]+$/.test(t) ? t.replace(/\D/g, '') : t
}

export function codigoPix(p: { chave: string; nome: string; cidade: string; valor?: number }) {
  const sem = [
    campo('00', '01'),
    campo('26', campo('00', 'br.gov.bcb.pix') + campo('01', limparChave(p.chave))),
    campo('52', '0000'),
    campo('53', '986'),
    p.valor && p.valor > 0 ? campo('54', p.valor.toFixed(2)) : '',
    campo('58', 'BR'),
    campo('59', semAcento(p.nome, 25)),
    campo('60', semAcento(p.cidade, 15)),
    campo('62', campo('05', '***')),
    '6304',
  ].join('')
  return sem + crc16(sem)
}
