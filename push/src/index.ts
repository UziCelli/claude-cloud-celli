import { DurableObject } from 'cloudflare:workers'
import { acessoComCache, lerPermissao, podeAvisarTreino, registrarAgendamento, type CacheAcesso } from './acesso'
import { cors } from './cors'
import { chaveDaConta, chaveDoGoogle, verificarAviso, verificarIdToken, type Projeto } from './jwt'
import { nomeDO, uidOk, validarAvisos, validarFimEm, validarInscricao, type Aviso, type Inscricao } from './validar'
import { enviarPush, gerarParVapid, type ParVapid } from './webpush'

type Env = { DESCANSO: DurableObjectNamespace<Descanso> }

type Mensagem = { title: string; body: string; tag: string; url: string }

// Lidas pelo public/sw-push.js. Sem emoji (o ícone é a letra da marca).
const DESCANSO: Mensagem = { title: 'Descanso acabou', body: 'Volte para o treino', tag: 'descanso', url: '/' }
const TREINO: Mensagem = { title: 'Treino novo pronto', body: 'Seu próximo treino já está no app. Toque para ver.', tag: 'treino', url: '/' }
const MENSALIDADE: Record<Aviso['tipo'], Mensagem> = {
  'vence-3d': { title: 'Mensalidade vence em 3 dias', body: 'Toque para ver como pagar.', tag: 'mensalidade', url: '/#/conta' },
  'vence-hoje': { title: 'Mensalidade vence hoje', body: 'Toque para ver como pagar.', tag: 'mensalidade', url: '/#/conta' },
}

// Uma instância por aluno (nome: veja nomeDO): guarda a inscrição e dispara o alarme.
// A instância '__vapid' guarda o par de chaves VAPID (gerado na 1ª vez, nunca regenerado).
export class Descanso extends DurableObject<Env> {
  private par?: Promise<ParVapid>
  // Só na memória: se a instância reiniciar, o limite e o cache recomeçam (basta para segurar abuso).
  private marcas: number[] = []
  private marcasTreino: number[] = []
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
  async agendar(uid: string, projeto: Projeto, token: string, inscricao: Inscricao, fimEm: number): Promise<'ok' | 'limite' | 'bloqueado' | 'indisponivel'> {
    const agora = Date.now()
    const marcas = registrarAgendamento(this.marcas, agora)
    if (!marcas) return 'limite'
    this.marcas = marcas
    const r = await acessoComCache(this.acesso, agora, () => lerPermissao(uid, token, agora, projeto))
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

  // Inscrição fixa (avisos de treino e mensalidade): não é apagada depois do alarme do descanso.
  async inscrever(inscricao: Inscricao) {
    await this.ctx.storage.put('fixa', inscricao)
  }

  async desinscrever() {
    await this.ctx.storage.delete('fixa')
  }

  // Envia à inscrição fixa. false = sem inscrição ou não entregue; 404/410 apagam a inscrição.
  async avisar(msg: Mensagem, comLimite: boolean): Promise<boolean | 'limite'> {
    if (comLimite) {
      // 3 por 10 min: o coach pode corrigir e reenviar, mas não dá para spammar o aluno.
      const marcas = registrarAgendamento(this.marcasTreino, Date.now(), 3, 10 * 60_000)
      if (!marcas) return 'limite'
      this.marcasTreino = marcas
    }
    const fixa = await this.ctx.storage.get<Inscricao>('fixa')
    if (!fixa) return false
    try {
      const chaves = await this.env.DESCANSO.get(this.env.DESCANSO.idFromName('__vapid')).vapid()
      const status = await enviarPush(fixa, msg, chaves, Math.floor(Date.now() / 1000))
      if (status === 404 || status === 410) await this.ctx.storage.delete('fixa')
      return status >= 200 && status < 300
    } catch {
      return false
    }
  }

  async alarm() {
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
    const lerJson = async (max: number): Promise<{ corpo: unknown } | Response> => {
      const texto = await req.text()
      if (texto.length > max) return json({ erro: 'corpo grande demais' }, 413)
      try {
        return { corpo: JSON.parse(texto) }
      } catch {
        return json({ erro: 'JSON inválido' }, 400)
      }
    }
    const aluno = (projeto: Projeto, uid: string) => env.DESCANSO.get(env.DESCANSO.idFromName(nomeDO(projeto, uid)))

    // Robô diário (GitHub): JWT da conta de serviço, não ID token.
    if (req.method === 'POST' && pathname === '/aviso-pagamento') {
      if (!token || !(await verificarAviso(token, (iss, kid) => chaveDaConta(iss, kid), agora))) return json({ erro: 'não autorizado' }, 401)
      const j = await lerJson(64 * 1024)
      if (j instanceof Response) return j
      const dados = validarAvisos((j as { corpo: unknown }).corpo)
      if (!dados) return json({ erro: 'avisos inválidos' }, 400)
      let enviados = 0
      for (let k = 0; k < dados.avisos.length; k += 10) {
        const lote = dados.avisos.slice(k, k + 10)
        const r = await Promise.all(lote.map((a) => aluno(dados.projeto, a.uid).avisar(MENSALIDADE[a.tipo], false).catch(() => false)))
        enviados += r.filter((x) => x === true).length
      }
      return json({ ok: true, enviados })
    }

    if (req.method === 'POST' && ['/agendar', '/cancelar', '/inscrever', '/desinscrever', '/treino-pronto'].includes(pathname)) {
      const id = token ? await verificarIdToken(token, (kid) => chaveDoGoogle(kid), agora) : null
      if (!token || !id || !uidOk(id.uid)) return json({ erro: 'não autorizado' }, 401)
      const { uid, projeto } = id
      const meu = aluno(projeto, uid)

      if (pathname === '/cancelar') {
        await meu.cancelar()
        return json({ ok: true })
      }
      if (pathname === '/desinscrever') {
        await meu.desinscrever()
        return json({ ok: true })
      }

      const j = await lerJson(4096)
      if (j instanceof Response) return j
      const corpo = (j as { corpo: { subscription?: unknown; fimEm?: unknown; alunoId?: unknown } | null }).corpo

      if (pathname === '/treino-pronto') {
        const s = await podeAvisarTreino(projeto, uid, corpo?.alunoId, token)
        if (s === 400) return json({ erro: 'alunoId inválido' }, 400)
        if (s === 403) return json({ erro: 'sem permissão' }, 403)
        if (s === 503) return json({ erro: 'não foi possível verificar o aluno' }, 503)
        const r = await aluno(projeto, corpo!.alunoId as string).avisar(TREINO, true)
        if (r === 'limite') return json({ erro: 'aviso já enviado há pouco' }, 429, { 'Retry-After': '600' })
        return json({ ok: true, enviado: r })
      }

      const inscricao = validarInscricao(corpo?.subscription)
      if (!inscricao) return json({ erro: 'inscrição inválida' }, 400)
      if (pathname === '/inscrever') {
        await meu.inscrever(inscricao)
        return json({ ok: true })
      }

      if (!validarFimEm(corpo?.fimEm, Date.now())) return json({ erro: 'fimEm fora da janela (1 s a 15 min)' }, 400)
      const r = await meu.agendar(uid, projeto, token, inscricao, corpo.fimEm)
      if (r === 'limite') return json({ erro: 'muitos agendamentos' }, 429, { 'Retry-After': '60' })
      if (r === 'bloqueado') return json({ erro: 'acesso bloqueado' }, 403)
      if (r === 'indisponivel') return json({ erro: 'não foi possível verificar o acesso' }, 503)
      return json({ ok: true })
    }

    return json({ erro: 'não encontrado' }, 404)
  },
}
