import { atenderIA, MAX_CORPO_IA, ROTAS_IA, type AcaoIA, type ResultadoIA } from './ia'
import { DurableObject } from 'cloudflare:workers'
import { acessoComCache, appCheckOk, ehCoach, lerPermissao, podeAvisarTreino, quemAvisaCoach, registrarAgendamento, type CacheAcesso } from './acesso'
import { cors } from './cors'
import { chaveDaConta, chaveDoGoogle, verificarAviso, verificarIdToken, type Projeto } from './jwt'
import { alvosDe, comAparelho, endpointOk, semAparelho, type Fixa, inicioDoDiaBrasilia, nomeAgenda, nomeCoaches, nomeDO, passoAgenda, prefixoAgenda, tipoCoachOk, uidOk, validarAvisos, validarDesligados, validarEsquecer, validarFimEm, validarInscricao, validarRecado, type Aviso, type Inscricao, type Tipo, type TipoCoach } from './validar'
import { enviarPush, gerarParVapid, type ParVapid } from './webpush'

type Env = { DESCANSO: DurableObjectNamespace<Descanso> }

type Mensagem = { title: string; body: string; tag: string; url: string }

// Lidas pelo public/sw-push.js. Sem emoji (o ícone é a letra da marca).
const DESCANSO: Mensagem = { title: 'Descanso acabou', body: 'Volte para o treino', tag: 'descanso', url: '/' }
const TREINO: Mensagem = { title: 'Treino novo pronto', body: 'Seu próximo treino já está no app. Toque para ver.', tag: 'treino', url: '/' }
// Avisos do robô diário: [mensagem, tipo que a pessoa liga/desliga em Conta].
const ROBO: Record<Aviso['tipo'], [Mensagem, Tipo]> = {
  'vence-3d': [{ title: 'Mensalidade vence em 3 dias', body: 'Toque para ver como pagar.', tag: 'mensalidade', url: '/#/' }, 'mensalidade'],
  'vence-hoje': [{ title: 'Mensalidade vence hoje', body: 'Toque para ver como pagar.', tag: 'mensalidade', url: '/#/' }, 'mensalidade'],
  'treino-hoje': [{ title: 'Hoje tem treino', body: 'Seu treino de hoje está no app. Toque para começar.', tag: 'lembrete', url: '/' }, 'lembrete'],
}
const recado = (texto: string): Mensagem => ({ title: 'Aviso do coach', body: texto, tag: 'recado', url: '/' })
// Para o coach. A tag leva o uid do aluno: o aviso de um aluno não apaga o de outro na tela do coach.
const DO_ALUNO: Record<TipoCoach, (nome: string, uid: string) => Mensagem> = {
  concluiu: (n, u) => ({ title: 'Treino concluído', body: `${n} concluiu o treino.`, tag: `concluiu:${u}`, url: '/' }),
  comentou: (n, u) => ({ title: 'Nova anotação', body: `${n} escreveu uma anotação no treino.`, tag: `comentou:${u}`, url: '/' }),
  pagou: (n, u) => ({ title: 'Pagamento informado', body: `${n} tocou em "Já paguei". Toque para confirmar.`, tag: `pagou:${u}`, url: '/#/alunos' }),
}
const DEZ_MIN = 10 * 60_000
const MAX_COACHES = 5

// Uma instância por aluno (nome: veja nomeDO): guarda a inscrição e dispara o alarme.
// A instância '__vapid' guarda o par de chaves VAPID (gerado na 1ª vez, nunca regenerado).
export class Descanso extends DurableObject<Env> {
  private iaFila: Promise<unknown> = Promise.resolve()
  // Fila exclusiva do projeto: não deixa uma migração atrasada sobrescrever uma chave nova.
  ia(acao: AcaoIA, corpo: unknown, projeto: Projeto, token: string, appCheck?: string): Promise<string> {
    const resultado = this.iaFila.then(() => atenderIA(acao, corpo, this.ctx.storage, projeto, token, appCheck))
    this.iaFila = resultado.catch(() => {})
    return resultado.then(r => JSON.stringify(r))
  }

  private par?: Promise<ParVapid>
  // Só na memória: se a instância reiniciar, o limite e o cache recomeçam (basta para segurar abuso).
  private marcas: number[] = []
  private marcasTreino: number[] = []
  private limites = new Map<string, number[]>()
  private acesso?: CacheAcesso

  vapid(): Promise<ParVapid> {
    this.par ??= (async () => {
      const salvo = await this.ctx.storage.get<ParVapid>('vapid')
      if (salvo) return salvo
      const novo = await gerarParVapid()
      await this.ctx.storage.put('vapid', novo)
      return novo
    })().catch((e) => {
      this.par = undefined // falha temporária não fica presa no cache até o DO reiniciar
      throw e
    })
    return this.par
  }

  // Limite de frequência, depois acesso (ativo e em dia), depois agenda.
  async agendar(uid: string, projeto: Projeto, token: string, inscricao: Inscricao, fimEm: number, appCheck?: string): Promise<'ok' | 'limite' | 'bloqueado' | 'indisponivel'> {
    const agora = Date.now()
    const marcas = registrarAgendamento(this.marcas, agora)
    if (!marcas) return 'limite'
    this.marcas = marcas
    const r = await acessoComCache(this.acesso, agora, () => lerPermissao(uid, token, agora, projeto, fetch, appCheck))
    this.acesso = r.cache
    if (r.ok === null) return 'indisponivel'
    if (!r.ok) return 'bloqueado'
    await this.ctx.storage.put('inscricao', inscricao)
    await this.ctx.storage.setAlarm(fimEm)
    return 'ok'
  }

  async cancelar() {
    await this.ctx.storage.deleteAlarm()
    await this.ctx.storage.delete('inscricao')
  }

  // Limite de frequência por chave (janela deslizante, só na memória). false = estourou.
  async passar(chave: string, limite: number, janela: number): Promise<boolean> {
    const marcas = registrarAgendamento(this.limites.get(chave) ?? [], Date.now(), limite, janela)
    if (marcas) this.limites.set(chave, marcas)
    return !!marcas
  }

  // Só na instância '__coaches:<projeto>': uids dos coaches que ativaram as notificações (no máximo 5; sai o mais antigo).
  async coaches(): Promise<string[]> {
    return (await this.ctx.storage.get<string[]>('coaches')) ?? []
  }

  async entrarCoach(uid: string) {
    const lista = (await this.coaches()).filter((c) => c !== uid)
    await this.ctx.storage.put('coaches', [...lista, uid].slice(-MAX_COACHES))
  }

  async sairCoach(uid: string) {
    const lista = await this.coaches()
    if (lista.includes(uid)) await this.ctx.storage.put('coaches', lista.filter((c) => c !== uid))
  }

  // Inscrições fixas (todos os avisos menos o descanso), uma por aparelho: não são apagadas depois do alarme do descanso.
  // Formato antigo (uma só: chaves `fixa` e `desligados`) é lido como a primeira da lista.
  private async fixas(): Promise<Fixa[]> {
    const lista = await this.ctx.storage.get<Fixa[]>('fixas')
    if (lista) return lista
    const antiga = await this.ctx.storage.get<Inscricao>('fixa')
    return antiga ? [{ i: antiga, d: (await this.ctx.storage.get<Tipo[]>('desligados')) ?? [], em: 0 }] : []
  }

  private async guardarFixas(lista: Fixa[]) {
    await this.ctx.storage.put('fixas', lista)
    await this.ctx.storage.delete(['fixa', 'desligados'])
  }

  // `desligados` = tipos que a pessoa desligou em Conta, neste aparelho.
  async inscrever(inscricao: Inscricao, desligados: Tipo[] = []) {
    await this.guardarFixas(comAparelho(await this.fixas(), { i: inscricao, d: desligados, em: Date.now() }))
  }

  // Tira este aparelho (ou todos, sem endpoint). Devolve quantos aparelhos sobraram.
  async desinscrever(endpoint?: string): Promise<number> {
    const resto = semAparelho(await this.fixas(), endpoint)
    await this.guardarFixas(resto)
    return resto.length
  }

  // Limpeza LGPD ("Apagar de vez"): apaga tudo o que esta instância guarda da pessoa.
  async esquecer() {
    await this.ctx.storage.deleteAlarm()
    await this.ctx.storage.deleteAll()
  }

  // O aluno concluiu um treino agora (vem do /avisar-coach): o lembrete de hoje não faz mais sentido.
  async marcarConcluiu() {
    await this.ctx.storage.put('concluiuEm', Date.now())
  }

  // Só na instância '__agenda:<projeto>': guarda um lote de avisos para disparar em `quando` (alarme pontual).
  // `limpar` = 1º lote de um envio novo: troca o que estava guardado para essa mesma hora.
  async agendarAvisos(projeto: Projeto, quando: number, avisos: Aviso[], limpar: boolean) {
    const prefixo = prefixoAgenda(quando)
    if (limpar) await this.ctx.storage.delete([...(await this.ctx.storage.list({ prefix: prefixo })).keys()])
    if (avisos.length) await this.ctx.storage.put(`${prefixo}${crypto.randomUUID()}`, { projeto, avisos })
    const { alarme } = passoAgenda([...(await this.ctx.storage.list({ prefix: 'ag:' })).keys()], 0)
    if (alarme) await this.ctx.storage.setAlarm(alarme)
    else await this.ctx.storage.deleteAlarm()
  }

  // Um lote (até 20 avisos) por alarme, para caber nos 50 subpedidos do plano grátis; o resto fica para o alarme seguinte.
  private async dispararAgenda(chaves: string[]) {
    const { disparar, descartar, alarme } = passoAgenda(chaves, Date.now())
    const lote = disparar ? await this.ctx.storage.get<{ projeto: Projeto; avisos: Aviso[] }>(disparar) : undefined
    // Apaga antes de enviar: se o alarme falhar e repetir, ninguém recebe duas vezes.
    await this.ctx.storage.delete([...descartar, ...(disparar ? [disparar] : [])])
    if (alarme) await this.ctx.storage.setAlarm(alarme)
    if (!lote) return
    await Promise.all(
      lote.avisos.map((a) =>
        this.env.DESCANSO.get(this.env.DESCANSO.idFromName(nomeDO(lote.projeto, a.uid)))
          .avisar(...ROBO[a.tipo], false)
          .catch(() => false),
      ),
    )
  }

  // Envia a todos os aparelhos da pessoa que não desligaram o tipo. true = chegou em pelo menos um;
  // false = sem inscrição, tipo desligado ou não entregue; 404/410 apagam a inscrição daquele aparelho.
  async avisar(msg: Mensagem, tipo: Tipo, comLimite: boolean): Promise<boolean | 'limite'> {
    const fixas = await this.fixas()
    const alvos = alvosDe(fixas, tipo)
    if (fixas.length && !alvos.length) return false
    // Lembrete do treino: quem já concluiu um treino hoje (Brasília) não recebe.
    if (tipo === 'lembrete' && ((await this.ctx.storage.get<number>('concluiuEm')) ?? 0) >= inicioDoDiaBrasilia(Date.now())) return false
    if (comLimite) {
      // 3 por 10 min: o coach pode corrigir e reenviar, mas não dá para spammar o aluno.
      const marcas = registrarAgendamento(this.marcasTreino, Date.now(), 3, 10 * 60_000)
      if (!marcas) return 'limite'
      this.marcasTreino = marcas
    }
    if (!alvos.length) return false
    try {
      const chaves = await this.env.DESCANSO.get(this.env.DESCANSO.idFromName('__vapid')).vapid()
      const agora = Math.floor(Date.now() / 1000)
      const status = await Promise.all(alvos.map((f) => enviarPush(f.i, msg, chaves, agora).catch(() => 0)))
      const mortas = alvos.filter((_, k) => status[k] === 404 || status[k] === 410).map((f) => f.i.endpoint)
      // Relê a lista: durante o envio pode ter chegado um /inscrever ou /desinscrever (não regravar a lista velha).
      if (mortas.length) await this.guardarFixas((await this.fixas()).filter((f) => !mortas.includes(f.i.endpoint)))
      return status.some((x) => x >= 200 && x < 300)
    } catch {
      return false
    }
  }

  async alarm() {
    const agenda = [...(await this.ctx.storage.list({ prefix: 'ag:' })).keys()]
    if (agenda.length) return this.dispararAgenda(agenda)
    const inscricao = await this.ctx.storage.get<Inscricao>('inscricao')
    if (!inscricao) return
    await this.ctx.storage.delete('inscricao')
    try {
      const chaves = await this.env.DESCANSO.get(this.env.DESCANSO.idFromName('__vapid')).vapid()
      // 404/410: inscrição morta, já foi apagada acima. Outro erro: não insiste (o aviso ficaria atrasado).
      await enviarPush(inscricao, DESCANSO, chaves, Math.floor(Date.now() / 1000))
    } catch {
      /* sem rede: perdeu este aviso */
    }
  }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const h = cors(req.headers.get('Origin'))
    const json = (corpo: unknown, status = 200, extra: Record<string, string> = {}) => Response.json(corpo, { status, headers: { ...h, ...extra } })
    const { pathname } = new URL(req.url)

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h })

    if (req.method === 'GET' && pathname === '/vapid') {
      const { publicKey } = await env.DESCANSO.get(env.DESCANSO.idFromName('__vapid')).vapid()
      return json({ publicKey }, 200, { 'Cache-Control': 'public, max-age=86400' })
    }

    const token = /^Bearer (\S+)$/.exec(req.headers.get('Authorization') ?? '')?.[1]
    const agora = Math.floor(Date.now() / 1000)
    const appCheck = appCheckOk(req.headers.get('X-Firebase-AppCheck')) // nunca logar
    const lerJson = async (max: number): Promise<{ corpo: unknown } | Response> => {
      const texto = await req.text()
      if (texto.length > max) return json({ erro: 'corpo grande demais' }, 413)
      try {
        return { corpo: JSON.parse(texto) }
      } catch {
        return json({ erro: 'JSON inválido' }, 400)
      }
    }
    const coaches = (projeto: Projeto) => env.DESCANSO.get(env.DESCANSO.idFromName(nomeCoaches(projeto)))
    const aluno = (projeto: Projeto, uid: string) => env.DESCANSO.get(env.DESCANSO.idFromName(nomeDO(projeto, uid)))

    if (req.method === 'POST' && ROTAS_IA.includes(pathname as AcaoIA)) {
      const id = token ? await verificarIdToken(token, kid => chaveDoGoogle(kid), agora, true) : null
      if (!token || !id || !uidOk(id.uid)) return json({ erro: 'Entre novamente com a verificação em 2 etapas.' }, 401)
      if (!(await aluno(id.projeto, id.uid).passar('ia', 30, 60000))) return json({ erro: 'Muitos pedidos. Tente mais tarde.' }, 429)
      if (!(await ehCoach(id.projeto, id.uid, token, fetch, appCheck))) return json({ erro: 'Sem permissão para usar a IA.' }, 403)
      // Limita o fluxo antes de armazenar o corpo inteiro (não confia em Content-Length).
      const reader = req.body?.getReader()
      const chunks: Uint8Array[] = []
      let size = 0
      if (reader) {
        for (;;) {
          const { value, done } = await reader.read()
          if (done) break
          size += value.byteLength
          if (size > MAX_CORPO_IA) { await reader.cancel(); return json({ erro: 'Pedido grande demais.' }, 413) }
          chunks.push(value)
        }
      }
      const bytes = new Uint8Array(size)
      let offset = 0
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
      let corpo: unknown
      try { corpo = JSON.parse(new TextDecoder().decode(bytes)) } catch { return json({ erro: 'Pedido inválido.' }, 400) }
      const r: ResultadoIA = JSON.parse(await env.DESCANSO.get(env.DESCANSO.idFromName(`__ia:${id.projeto}`)).ia(pathname as AcaoIA, corpo, id.projeto, token, appCheck))
      return json(r.corpo, r.status, { 'Cache-Control': 'no-store' })
    }

    // Robô diário (GitHub): JWT da conta de serviço, não ID token.
    if (req.method === 'POST' && pathname === '/aviso-pagamento') {
      if (!token || !(await verificarAviso(token, (iss, kid) => chaveDaConta(iss, kid), agora))) return json({ erro: 'não autorizado' }, 401)
      const j = await lerJson(64 * 1024)
      if (j instanceof Response) return j
      const dados = validarAvisos((j as { corpo: unknown }).corpo)
      if (!dados) return json({ erro: 'avisos inválidos' }, 400)
      if (dados.quando) {
        await env.DESCANSO.get(env.DESCANSO.idFromName(nomeAgenda(dados.projeto))).agendarAvisos(dados.projeto, dados.quando, dados.avisos, dados.inicio)
        return json({ ok: true, agendados: dados.avisos.length })
      }
      let enviados = 0
      for (let k = 0; k < dados.avisos.length; k += 10) {
        const lote = dados.avisos.slice(k, k + 10)
        const r = await Promise.all(lote.map((a) => aluno(dados.projeto, a.uid).avisar(...ROBO[a.tipo], false).catch(() => false)))
        enviados += r.filter((x) => x === true).length
      }
      return json({ ok: true, enviados })
    }

    // Limpeza LGPD (GitHub): mesmo JWT da conta de serviço. Apaga o que o Worker guarda de cada pessoa apagada.
    if (req.method === 'POST' && pathname === '/esquecer') {
      if (!token || !(await verificarAviso(token, (iss, kid) => chaveDaConta(iss, kid), agora))) return json({ erro: 'não autorizado' }, 401)
      const j = await lerJson(4096)
      if (j instanceof Response) return j
      const dados = validarEsquecer((j as { corpo: unknown }).corpo)
      if (!dados) return json({ erro: 'pedido inválido' }, 400)
      for (const uid of dados.uids) {
        await aluno(dados.projeto, uid).esquecer()
        await coaches(dados.projeto).sairCoach(uid)
      }
      return json({ ok: true, esquecidos: dados.uids.length })
    }

    if (req.method === 'POST' && ['/agendar', '/cancelar', '/inscrever', '/desinscrever', '/treino-pronto', '/avisar-coach', '/recado'].includes(pathname)) {
      const id = token ? await verificarIdToken(token, (kid) => chaveDoGoogle(kid), agora) : null
      if (!token || !id || !uidOk(id.uid)) return json({ erro: 'não autorizado' }, 401)
      const { uid, projeto } = id
      const meu = aluno(projeto, uid)

      if (pathname === '/cancelar') {
        await meu.cancelar()
        return json({ ok: true })
      }
      if (pathname === '/desinscrever') {
        // Com `endpoint`, sai só este aparelho; o app antigo manda `{}` e tira todos.
        const endpoint = await req.text().then((t) => (t.length <= 4096 ? (JSON.parse(t) as { endpoint?: unknown } | null)?.endpoint : undefined)).catch(() => undefined)
        const sobraram = await meu.desinscrever(endpointOk(endpoint) ? endpoint : undefined)
        if (sobraram === 0) await coaches(projeto).sairCoach(uid)
        return json({ ok: true })
      }

      const j = await lerJson(4096)
      if (j instanceof Response) return j
      const corpo = (j as { corpo: { subscription?: unknown; fimEm?: unknown; alunoId?: unknown; desligados?: unknown; coach?: unknown; tipo?: unknown } | null }).corpo

      if (pathname === '/treino-pronto') {
        const s = await podeAvisarTreino(projeto, uid, corpo?.alunoId, token, fetch, appCheck)
        if (s === 400) return json({ erro: 'alunoId inválido' }, 400)
        if (s === 403) return json({ erro: 'sem permissão' }, 403)
        if (s === 503) return json({ erro: 'não foi possível verificar o aluno' }, 503)
        const r = await aluno(projeto, corpo!.alunoId as string).avisar(TREINO, 'treino', true)
        if (r === 'limite') return json({ erro: 'aviso já enviado há pouco' }, 429, { 'Retry-After': '600' })
        return json({ ok: true, enviado: r })
      }

      // Aluno avisa o coach (concluiu, anotou, "Já paguei"). Texto fixo; o nome sai do perfil do aluno.
      if (pathname === '/avisar-coach') {
        const tipo = corpo?.tipo
        if (!tipoCoachOk(tipo)) return json({ erro: 'tipo inválido' }, 400)
        // 10 por minuto no total (segura as leituras do Firestore) e, depois de conferido, 1 por tipo a cada 10 min.
        if (!(await meu.passar('coach', 10, 60_000))) return json({ erro: 'muitos avisos' }, 429, { 'Retry-After': '60' })
        const quem = await quemAvisaCoach(projeto, uid, tipo, token, Date.now(), fetch, appCheck)
        if (quem === 403) return json({ erro: 'sem permissão' }, 403)
        if (quem === 503) return json({ erro: 'não foi possível verificar o acesso' }, 503)
        if (tipo === 'concluiu') await meu.marcarConcluiu()
        if (!(await meu.passar(`coach:${tipo}`, 1, DEZ_MIN))) return json({ erro: 'aviso já enviado há pouco' }, 429, { 'Retry-After': '600' })
        const lista = (await coaches(projeto).coaches()).filter((c) => c !== uid)
        await Promise.all(lista.map((c) => aluno(projeto, c).avisar(DO_ALUNO[tipo](quem.nome, uid), tipo, false).catch(() => false)))
        return json({ ok: true }) // não revela se o coach recebeu
      }

      // Coach escreve um aviso para até 15 alunos por chamada. Cada aluno é conferido como no /treino-pronto.
      if (pathname === '/recado') {
        const dados = validarRecado(corpo)
        if (!dados) return json({ erro: 'recado inválido' }, 400)
        if (!(await meu.passar('recado', 10, DEZ_MIN))) return json({ erro: 'muitos avisos' }, 429, { 'Retry-After': '600' })
        const msg = recado(dados.texto)
        const r = await Promise.all(
          dados.alunoIds.map(async (id) => {
            const s = await podeAvisarTreino(projeto, uid, id, token, fetch, appCheck)
            return s === 200 ? aluno(projeto, id).avisar(msg, 'recado', true).catch(() => false) : s
          }),
        )
        if (r.every((x) => x === 403)) return json({ erro: 'sem permissão' }, 403)
        if (r.every((x) => x === 503)) return json({ erro: 'não foi possível verificar os alunos' }, 503)
        return json({ ok: true, enviados: r.filter((x) => x === true).length })
      }

      const inscricao = validarInscricao(corpo?.subscription)
      if (!inscricao) return json({ erro: 'inscrição inválida' }, 400)
      if (pathname === '/inscrever') {
        const desligados = validarDesligados(corpo?.desligados)
        if (!desligados) return json({ erro: 'tipos inválidos' }, 400)
        await meu.inscrever(inscricao, desligados)
        // Só o app do coach manda `coach: true`; o papel é conferido no perfil (o aluno não gasta essa leitura).
        if (corpo?.coach === true && (await meu.passar('souCoach', 5, DEZ_MIN)) && (await ehCoach(projeto, uid, token, fetch, appCheck))) await coaches(projeto).entrarCoach(uid)
        return json({ ok: true })
      }

      if (!validarFimEm(corpo?.fimEm, Date.now())) return json({ erro: 'fimEm fora da janela (1 s a 15 min)' }, 400)
      const r = await meu.agendar(uid, projeto, token, inscricao, corpo.fimEm, appCheck)
      if (r === 'limite') return json({ erro: 'muitos agendamentos' }, 429, { 'Retry-After': '60' })
      if (r === 'bloqueado') return json({ erro: 'acesso bloqueado' }, 403)
      if (r === 'indisponivel') return json({ erro: 'não foi possível verificar o acesso' }, 503)
      return json({ ok: true })
    }

    return json({ erro: 'não encontrado' }, 404)
  },
}
