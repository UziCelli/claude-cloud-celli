import { describe, expect, it } from 'vitest'
import { b64u } from './b64'
import { nomeDO, uidOk, validarAvisos, validarDesligados, validarRecado, tipoCoachOk, nomeLimpo, nomeCoaches, validarFimEm, validarInscricao } from './validar'

const p256dh = b64u(new Uint8Array([4, ...new Array(64).fill(7)]))
const auth = b64u(new Uint8Array(16).fill(9))
const boa = { endpoint: 'https://fcm.googleapis.com/fcm/send/abc', keys: { p256dh, auth } }

describe('validarInscricao', () => {
  it('aceita inscrição de serviços de push conhecidos', () => {
    expect(validarInscricao(boa)).not.toBeNull()
    for (const e of [
      'https://web.push.apple.com/QAbc',
      'https://updates.push.services.mozilla.com/wpush/v2/xyz',
      'https://wns2-par02p.notify.windows.com/w/?token=1',
    ])
      expect(validarInscricao({ ...boa, endpoint: e })).not.toBeNull()
  })
  it('rejeita endpoint que não é https ou não é de serviço de push', () => {
    for (const e of [
      'http://fcm.googleapis.com/x',
      'https://exemplo.com/x',
      'https://evil.com/fcm.googleapis.com',
      'https://fcm.googleapis.com.evil.com/x',
      'https://user:pw@fcm.googleapis.com/x',
      'lixo',
      '',
    ])
      expect(validarInscricao({ ...boa, endpoint: e })).toBeNull()
  })
  it('rejeita chaves com tamanho errado', () => {
    expect(validarInscricao({ ...boa, keys: { p256dh: b64u(new Uint8Array(65)), auth } })).toBeNull() // não começa com 0x04
    expect(validarInscricao({ ...boa, keys: { p256dh, auth: b64u(new Uint8Array(8)) } })).toBeNull()
    expect(validarInscricao({ ...boa, keys: { p256dh: 'não-base64!', auth } })).toBeNull()
  })
  it('rejeita formato inválido', () => {
    for (const s of [null, undefined, 1, 'x', {}, { endpoint: boa.endpoint }, { endpoint: 1, keys: boa.keys }]) expect(validarInscricao(s)).toBeNull()
  })
  it('devolve só os campos necessários', () => {
    expect(validarInscricao({ ...boa, extra: 'x' })).toEqual({ endpoint: boa.endpoint, keys: { p256dh, auth } })
  })
})

describe('validarFimEm', () => {
  const agora = 1_800_000_000_000
  it('aceita entre agora+1 s e agora+15 min', () => {
    expect(validarFimEm(agora + 1000, agora)).toBe(true)
    expect(validarFimEm(agora + 15 * 60_000, agora)).toBe(true)
  })
  it('rejeita fora da janela ou não numérico', () => {
    expect(validarFimEm(agora + 999, agora)).toBe(false)
    expect(validarFimEm(agora + 15 * 60_000 + 1, agora)).toBe(false)
    expect(validarFimEm(agora - 5000, agora)).toBe(false)
    for (const v of ['1', null, undefined, NaN, Infinity]) expect(validarFimEm(v, agora)).toBe(false)
  })
})

describe('uidOk e nomeDO', () => {
  it('aceita uid do Firebase e recusa o que poderia colidir ou escapar', () => {
    expect(uidOk('aB3xYz0123456789ABCDEFGH0123')).toBe(true)
    for (const u of ['', '__vapid', 'a:b', 'a/b', 'a b', 'x'.repeat(129), 42, null, undefined]) expect(uidOk(u)).toBe(false)
  })
  it('VFIT = uid puro; Gislane = projeto:uid', () => {
    expect(nomeDO('forca--app', 'u1')).toBe('u1')
    expect(nomeDO('gislane-personal-trainer', 'u1')).toBe('gislane-personal-trainer:u1')
  })
})

describe('validarAvisos', () => {
  const ok = { projeto: 'forca--app', avisos: [{ uid: 'u1', tipo: 'vence-3d' }, { uid: 'u2', tipo: 'vence-hoje' }] }
  it('aceita projeto da lista e os dois tipos', () => {
    expect(validarAvisos(ok)).toEqual(ok)
    expect(validarAvisos({ ...ok, projeto: 'gislane-personal-trainer' })?.projeto).toBe('gislane-personal-trainer')
    expect(validarAvisos({ projeto: 'forca--app', avisos: [] })?.avisos).toEqual([])
  })
  it('aceita 20 e recusa 21', () => {
    const mk = (n: number) => ({ projeto: 'forca--app', avisos: Array.from({ length: n }, (_, i) => ({ uid: `u${i}`, tipo: 'vence-hoje' })) })
    expect(validarAvisos(mk(20))).not.toBeNull()
    expect(validarAvisos(mk(21))).toBeNull()
  })
  it('recusa projeto desconhecido, tipo fora do contrato e uid inválido', () => {
    expect(validarAvisos({ ...ok, projeto: 'outro' })).toBeNull()
    expect(validarAvisos({ ...ok, projeto: undefined })).toBeNull()
    expect(validarAvisos({ ...ok, avisos: [{ uid: 'u1', tipo: 'vencido' }] })).toBeNull()
    expect(validarAvisos({ ...ok, avisos: [{ uid: 'a/b', tipo: 'vence-hoje' }] })).toBeNull()
    expect(validarAvisos({ ...ok, avisos: [{ uid: '__vapid', tipo: 'vence-hoje' }] })).toBeNull()
  })
  it('recusa formatos errados', () => {
    for (const c of [null, 'x', 1, [], {}, { projeto: 'forca--app' }, { projeto: 'forca--app', avisos: {} }, { projeto: 'forca--app', avisos: [null] }]) expect(validarAvisos(c)).toBeNull()
  })
})

describe('validarAvisos: lembrete do treino', () => {
  it('aceita o tipo treino-hoje', () => {
    expect(validarAvisos({ projeto: 'forca--app', avisos: [{ uid: 'u1', tipo: 'treino-hoje' }] })?.avisos[0].tipo).toBe('treino-hoje')
  })
})

describe('validarDesligados', () => {
  it('sem o campo: nada desligado', () => {
    expect(validarDesligados(undefined)).toEqual([])
  })
  it('aceita só tipos conhecidos, sem repetir', () => {
    expect(validarDesligados(['lembrete', 'pagou', 'lembrete'])).toEqual(['lembrete', 'pagou'])
    expect(validarDesligados([])).toEqual([])
  })
  it('recusa tipo desconhecido e formato errado', () => {
    for (const v of [['descanso'], ['x'], [1], 'lembrete', {}, null, Array(20).fill('pagou')]) expect(validarDesligados(v)).toBeNull()
  })
})

describe('tipoCoachOk', () => {
  it('só os 3 avisos do aluno para o coach', () => {
    for (const t of ['concluiu', 'comentou', 'pagou']) expect(tipoCoachOk(t)).toBe(true)
    for (const t of ['treino', 'recado', 'lembrete', '', null, 1, undefined]) expect(tipoCoachOk(t)).toBe(false)
  })
})

describe('validarRecado', () => {
  it('aceita de 1 a 15 alunos e texto de 1 a 200 letras (aparado)', () => {
    expect(validarRecado({ alunoIds: ['a1'], texto: '  Amanhã não tem aula.  ' })).toEqual({ alunoIds: ['a1'], texto: 'Amanhã não tem aula.' })
    expect(validarRecado({ alunoIds: Array.from({ length: 15 }, (_, i) => `a${i}`), texto: 'x'.repeat(200) })).not.toBeNull()
  })
  it('tira repetidos e troca quebras de linha por espaço', () => {
    expect(validarRecado({ alunoIds: ['a1', 'a1'], texto: 'oi\n\ntudo\tbem' })).toEqual({ alunoIds: ['a1'], texto: 'oi tudo bem' })
  })
  it('recusa lista vazia, mais de 15, uid inválido, texto vazio ou longo', () => {
    const t = 'oi'
    for (const c of [
      null, {}, { alunoIds: [], texto: t }, { alunoIds: 'a1', texto: t }, { alunoIds: ['a/b'], texto: t }, { alunoIds: ['__vapid'], texto: t },
      { alunoIds: Array.from({ length: 16 }, (_, i) => `a${i}`), texto: t },
      { alunoIds: ['a1'] }, { alunoIds: ['a1'], texto: '   ' }, { alunoIds: ['a1'], texto: 'x'.repeat(201) }, { alunoIds: ['a1'], texto: 5 },
    ]) expect(validarRecado(c)).toBeNull()
  })
})

describe('nomeLimpo', () => {
  it('apara, tira caracteres de controle e limita a 60', () => {
    expect(nomeLimpo('  Ana \n Paula ')).toBe('Ana Paula')
    expect(nomeLimpo('x'.repeat(80))).toHaveLength(60)
  })
  it('sem nome: texto neutro', () => {
    for (const n of [undefined, null, '', '   ', 7]) expect(nomeLimpo(n)).toBe('Um aluno')
  })
})

describe('nomeCoaches', () => {
  it('uma instância por projeto, que nunca colide com uid', () => {
    expect(nomeCoaches('forca--app')).toBe('__coaches:forca--app')
    expect(uidOk(nomeCoaches('forca--app'))).toBe(false)
  })
})
