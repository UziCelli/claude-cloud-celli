import { DurableObject } from 'cloudflare:workers'
import { chaveDoGoogle, verificarIdToken } from './jwt'
import { validarFimEm, validarInscricao, type Inscricao } from './validar'
import { enviarPush, gerarParVapid, type ParVapid } from './webpush'

type Env = { DESCANSO: DurableObjectNamespace<Descanso> }

const ORIGENS = ['https://app.vfitcoachapp.com', 'https://forca--app.web.app', 'http://localhost:5173', 'http://localhost:4173']
const MENSAGEM = { title: 'Descanso acabou', body: 'Volte para o treino 💪' }

// Uma instância por aluno (nome = uid): guarda a inscrição e dispara o alarme.
// A instância '__vapid' guarda o par de chaves VAPID (gerado na 1ª vez, nunca regenerado).
export class Descanso extends DurableObject<Env> {
  private par?: Promise<ParVapid>

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

  async agendar(inscricao: Inscricao, fimEm: number) {
    await this.ctx.storage.put('inscricao', inscricao)
    await this.ctx.storage.setAlarm(fimEm)
  }

  async cancelar() {
    await this.ctx.storage.deleteAlarm()
    await this.ctx.storage.delete('inscricao')
  }

  async alarm() {
    const inscricao = await this.ctx.storage.get<Inscricao>('inscricao')
    if (!inscricao) return
    await this.ctx.storage.delete('inscricao')
    try {
      const chaves = await this.env.DESCANSO.get(this.env.DESCANSO.idFromName('__vapid')).vapid()
      // 404/410: inscrição morta, já foi apagada acima. Outro erro: não insiste (o aviso ficaria atrasado).
      await enviarPush(inscricao, MENSAGEM, chaves, Math.floor(Date.now() / 1000))
    } catch {
      /* sem rede: perdeu este aviso */
    }
  }
}

const cors = (origem: string | null): Record<string, string> =>
  origem && ORIGENS.includes(origem)
    ? {
        'Access-Control-Allow-Origin': origem,
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin',
      }
    : { Vary: 'Origin' }

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

    if (req.method === 'POST' && (pathname === '/agendar' || pathname === '/cancelar')) {
      const token = /^Bearer (\S+)$/.exec(req.headers.get('Authorization') ?? '')?.[1]
      const uid = token ? await verificarIdToken(token, (kid) => chaveDoGoogle(kid), Math.floor(Date.now() / 1000)) : null
      if (!uid) return json({ erro: 'não autorizado' }, 401)
      const aluno = env.DESCANSO.get(env.DESCANSO.idFromName(uid))

      if (pathname === '/cancelar') {
        await aluno.cancelar()
        return json({ ok: true })
      }

      const texto = await req.text()
      if (texto.length > 4096) return json({ erro: 'corpo grande demais' }, 413)
      let corpo: { subscription?: unknown; fimEm?: unknown }
      try {
        corpo = JSON.parse(texto)
      } catch {
        return json({ erro: 'JSON inválido' }, 400)
      }
      const inscricao = validarInscricao(corpo?.subscription)
      if (!inscricao) return json({ erro: 'inscrição inválida' }, 400)
      if (!validarFimEm(corpo.fimEm, Date.now())) return json({ erro: 'fimEm fora da janela (1 s a 15 min)' }, 400)
      await aluno.agendar(inscricao, corpo.fimEm)
      return json({ ok: true })
    }

    return json({ erro: 'não encontrado' }, 404)
  },
}
