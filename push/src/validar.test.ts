import { describe, expect, it } from 'vitest'
import { b64u } from './b64'
import { alvosDe, comAparelho, endpointOk, semAparelho, validarEsquecer, type Fixa, inicioDoDiaBrasilia, nomeAgenda, nomeDO, passoAgenda, prefixoAgenda, uidOk, validarAvisos, validarDesligados, validarRecado, tipoCoachOk, nomeLimpo, nomeCoaches, validarFimEm, validarInscricao } from './validar'

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
    expect(validarAvisos(ok)).toEqual({ ...ok, inicio: false })
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

describe('validarAvisos: agendado (quando)', () => {
  const agora = 1_800_000_000_000
  const c = (extra: object) => ({ projeto: 'forca--app', avisos: [{ uid: 'u1', tipo: 'treino-hoje' }], ...extra })
  it('sem quando: envio imediato, como antes', () => {
    expect(validarAvisos(c({}), agora)).toEqual({ projeto: 'forca--app', avisos: [{ uid: 'u1', tipo: 'treino-hoje' }], inicio: false })
  })
  it('aceita de 1 min a 36 h à frente e lê inicio', () => {
    expect(validarAvisos(c({ quando: agora + 60_000 }), agora)?.quando).toBe(agora + 60_000)
    expect(validarAvisos(c({ quando: agora + 36 * 3600_000, inicio: true }), agora)).toMatchObject({ quando: agora + 36 * 3600_000, inicio: true })
    expect(validarAvisos(c({ quando: agora + 3600_000, inicio: 'sim' }), agora)?.inicio).toBe(false)
    expect(validarAvisos({ projeto: 'forca--app', avisos: [], quando: agora + 3600_000, inicio: true }, agora)?.avisos).toEqual([])
  })
  it('recusa passado, longe demais e o que não é inteiro', () => {
    for (const quando of [agora, agora - 1, agora + 59_000, agora + 36 * 3600_000 + 1, 1.5, '1800000000000', null, NaN, Infinity]) expect(validarAvisos(c({ quando }), agora)).toBeNull()
  })
})

describe('agenda de avisos', () => {
  const t = 1_800_000_000_000
  const k = (quando: number, id: string) => `${prefixoAgenda(quando)}${id}`
  it('nome e prefixo não colidem com uid nem entre horas', () => {
    expect(nomeAgenda('forca--app')).toBe('__agenda:forca--app')
    expect(uidOk(nomeAgenda('forca--app'))).toBe(false)
    expect(prefixoAgenda(5)).toBe('ag:0000000000005:')
    expect(k(t, 'a').startsWith(prefixoAgenda(t))).toBe(true)
  })
  it('antes da hora: nada dispara e o alarme fica na hora mais próxima', () => {
    expect(passoAgenda([k(t + 5000, 'b'), k(t + 1000, 'a')], t)).toEqual({ disparar: undefined, descartar: [], alarme: t + 1000 })
    expect(passoAgenda([k(t + 5000, 'b')], 0).alarme).toBe(t + 5000)
  })
  it('na hora: dispara um lote por vez e rearma em 1 s enquanto houver lote vencido', () => {
    expect(passoAgenda([k(t, 'b'), k(t, 'a'), k(t + 86400_000, 'c')], t + 10)).toEqual({ disparar: k(t, 'a'), descartar: [], alarme: t + 1010 })
    expect(passoAgenda([k(t, 'b'), k(t + 86400_000, 'c')], t + 2000)).toEqual({ disparar: k(t, 'b'), descartar: [], alarme: t + 86400_000 })
    expect(passoAgenda([k(t, 'b')], t)).toEqual({ disparar: k(t, 'b'), descartar: [], alarme: undefined })
  })
  it('mais de 3 h atrasado ou chave estranha: descarta sem enviar', () => {
    expect(passoAgenda([k(t, 'a'), 'ag:x:1', k(t + 4 * 3600_000, 'b')], t + 3 * 3600_000 + 1)).toEqual({ disparar: undefined, descartar: [k(t, 'a'), 'ag:x:1'], alarme: t + 4 * 3600_000 })
    expect(passoAgenda([], t)).toEqual({ disparar: undefined, descartar: [], alarme: undefined })
  })
  it('início do dia em Brasília (UTC-3)', () => {
    expect(inicioDoDiaBrasilia(Date.parse('2026-10-13T06:47:00-03:00'))).toBe(Date.parse('2026-10-13T00:00:00-03:00'))
    expect(inicioDoDiaBrasilia(Date.parse('2026-10-13T23:59:59-03:00'))).toBe(Date.parse('2026-10-13T00:00:00-03:00'))
    expect(inicioDoDiaBrasilia(Date.parse('2026-10-13T00:00:00-03:00'))).toBe(Date.parse('2026-10-13T00:00:00-03:00'))
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

describe('inscrições por aparelho', () => {
  const f = (endpoint: string, em: number, d: Fixa['d'] = []): Fixa => ({ i: { endpoint, keys: { p256dh, auth } }, d, em })
  it('aparelho novo entra; o mesmo aparelho é atualizado, não duplicado', () => {
    const lista = comAparelho(comAparelho([], f('a', 1)), f('b', 2))
    expect(lista.map((x) => x.i.endpoint)).toEqual(['a', 'b'])
    const de_novo = comAparelho(lista, f('a', 3, ['lembrete']))
    expect(de_novo.map((x) => [x.i.endpoint, x.d])).toEqual([['b', []], ['a', ['lembrete']]])
  })
  it('no máximo 3 aparelhos: sai o mais antigo', () => {
    const lista = ['a', 'b', 'c', 'd'].reduce<Fixa[]>((l, e, k) => comAparelho(l, f(e, k)), [])
    expect(lista.map((x) => x.i.endpoint)).toEqual(['b', 'c', 'd'])
  })
  it('sair tira só o aparelho; sem endpoint (app antigo) tira todos', () => {
    const lista = [f('a', 1), f('b', 2)]
    expect(semAparelho(lista, 'a').map((x) => x.i.endpoint)).toEqual(['b'])
    expect(semAparelho(lista, 'x')).toHaveLength(2)
    expect(semAparelho(lista)).toEqual([])
  })
  it('cada aparelho desliga os próprios tipos', () => {
    const lista = [f('a', 1, ['lembrete']), f('b', 2)]
    expect(alvosDe(lista, 'lembrete').map((x) => x.i.endpoint)).toEqual(['b'])
    expect(alvosDe(lista, 'treino')).toHaveLength(2)
  })
  it('endpointOk', () => {
    expect(endpointOk('https://fcm.googleapis.com/x')).toBe(true)
    for (const e of ['', 'x'.repeat(1001), 1, null, undefined]) expect(endpointOk(e)).toBe(false)
  })
})

describe('validarEsquecer', () => {
  it('aceita projeto da lista e de 1 a 20 uids', () => {
    expect(validarEsquecer({ projeto: 'forca--app', uids: ['u1'] })).toEqual({ projeto: 'forca--app', uids: ['u1'] })
    expect(validarEsquecer({ projeto: 'gislane-personal-trainer', uids: Array.from({ length: 20 }, (_, i) => `u${i}`) })).not.toBeNull()
  })
  it('recusa o resto', () => {
    for (const c of [null, {}, { projeto: 'outro', uids: ['u1'] }, { projeto: 'forca--app', uids: [] }, { projeto: 'forca--app', uids: ['__vapid'] }, { projeto: 'forca--app', uids: ['a:b'] }, { projeto: 'forca--app', uids: 'u1' }, { projeto: 'forca--app', uids: Array.from({ length: 21 }, (_, i) => `u${i}`) }])
      expect(validarEsquecer(c)).toBeNull()
  })
})
