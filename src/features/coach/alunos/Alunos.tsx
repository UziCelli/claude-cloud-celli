import { AnimatePresence, m } from 'motion/react'
import { saida, suave } from '../../../movimento'
import { useState } from 'react'
import { collection, query, where } from 'firebase/firestore'
import { diasParaVencer, hojeMaisDias, type Usuario } from '../../../lib/acesso'
import { apagarAluno, confirmarPagamento, definirAcesso, salvarMensalidade } from '../../../lib/acoes'
import { registrarErro } from '../../../lib/log'
import { db } from '../../../lib/firebase'
import { useLista } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { Avatar } from '../../../avatar'
import type { Foto } from '../../../lib/acesso'
import { PIX, reais } from '../../aluno/PagarPix'
import { Aviso, Botao, Campo, campoBase, Cartao, Msg, Pagina } from '../../../ui'

type Aluno = Usuario & { id: string }

const dataPadrao = (a: Aluno) => {
  const dias = a.pagoAte ? diasParaVencer(a.pagoAte, new Date()) : -1
  if (a.status === 'ativo' && dias >= 0) return hojeMaisDias(dias + 30)
  return hojeMaisDias(30)
}

const formatarData = (v: string) => {
  const [ano, mes, dia] = v.split('-')
  return `${dia}/${mes}/${ano}`
}

function statusAluno(a: Aluno): { texto: string; cor: string } {
  if (a.status === 'aguardando') return { texto: 'Aguardando', cor: 'bg-amber-900/50 text-amber-300' }
  if (a.status === 'arquivado') return { texto: 'Arquivado', cor: 'bg-slate-700 text-slate-300' }
  if (a.status === 'bloqueado') return { texto: 'Bloqueado', cor: 'bg-slate-700 text-slate-300' }
  const dias = a.pagoAte ? diasParaVencer(a.pagoAte, new Date()) : -1
  if (dias < 0) return { texto: 'Vencido', cor: 'bg-red-900/50 text-red-300' }
  return { texto: 'Ativo', cor: 'bg-green-900/50 text-green-300' }
}

function textoVencimento(a: Aluno) {
  if (!a.pagoAte) return '—'
  const dias = diasParaVencer(a.pagoAte, new Date())
  const data = formatarData(hojeMaisDias(dias))
  if (dias === 0) return `${data} · vence hoje`
  if (dias > 0) return `${data} · vence em ${dias} dia${dias === 1 ? '' : 's'}`
  return `${data} · vencido há ${-dias} dia${-dias === 1 ? '' : 's'}`
}

// Entrada em cascata (máx. 8 passos) e saída deslizando.
const linha = (i: number) => ({
  layout: 'position' as const,
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { ...suave, delay: Math.min(i, 8) * 0.04 } },
  exit: { opacity: 0, x: 60, transition: saida },
})

const ordem = { aguardando: 0, ativo: 1, bloqueado: 2, arquivado: 3 }

function comparar(a: Aluno, b: Aluno) {
  if (ordem[a.status] !== ordem[b.status]) return ordem[a.status] - ordem[b.status]
  if (a.status === 'ativo' && a.pagoAte && b.pagoAte) return a.pagoAte.toMillis() - b.pagoAte.toMillis()
  return a.nome.localeCompare(b.nome)
}

export default function Alunos() {
  const { dados } = useLista<Usuario>(query(collection(db, 'usuarios'), where('papel', '==', 'aluno')))
  const alunos = dados as Aluno[]
  const { dados: fotos } = useLista<Foto>(collection(db, 'fotos'))
  const imgs = new Map(fotos.map((f) => [f.id, f.img]))
  const avatar = (a: Aluno) => <Avatar img={imgs.get(a.id)} nome={a.nome} selo={a.selo} tamanho={36} />
  const [busca, setBusca] = useState('')
  const [editando, setEditando] = useState<string | null>(null)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')
  const [arquivados, setArquivados] = useState(false)
  const [confirmando, setConfirmando] = useState<{ id: string; tipo: 'arquivar' | 'apagar' } | null>(null)
  const nArquivados = alunos.filter((a) => a.status === 'arquivado').length

  const filtrados = alunos
    .filter((a) => (a.status === 'arquivado') === arquivados)
    .filter((a) => a.nome.toLowerCase().includes(busca.toLowerCase()) || a.email.toLowerCase().includes(busca.toLowerCase()))
    .sort(comparar)

  function liberar(uid: string, pagoAte: string) {
    setErro('')
    definirAcesso(uid, { status: 'ativo', pagoAte }).catch((e) => {
      registrarErro('gravacao', `definir acesso: ${e?.code ?? e}`, e)
      setErro('Não deu para gravar. Tente de novo.')
    })
    setEditando(null)
  }

  function confirmarPix(uid: string, pagoAte: Usuario['pagoAte']) {
    setErro('')
    const { data, gravando } = confirmarPagamento(uid, pagoAte)
    setOk(`Acesso até ${data.split('-').reverse().slice(0, 2).join('/')}`)
    gravando.catch((e) => {
      setOk('')
      registrarErro('gravacao', `confirmar pagamento: ${e?.code ?? e}`, e)
      setErro('Não deu para gravar. Tente de novo.')
    })
  }

  function bloquear(uid: string) {
    if (!confirm('Bloquear o acesso deste aluno?')) return
    setErro('')
    definirAcesso(uid, { status: 'bloqueado' }).catch((e) => {
      registrarErro('gravacao', `definir acesso: ${e?.code ?? e}`, e)
      setErro('Não deu para gravar. Tente de novo.')
    })
  }

  function reativar(uid: string) {
    setErro('')
    definirAcesso(uid, { status: 'ativo' }).catch((e) => {
      registrarErro('gravacao', `definir acesso: ${e?.code ?? e}`, e)
      setErro('Não deu para gravar. Tente de novo.')
    })
  }

  const acoes = (a: Aluno) =>
    confirmando?.id === a.id ? (
      <ConfirmarAluno id={a.id} nome={a.nome} tipo={confirmando.tipo} onFechar={() => setConfirmando(null)} />
    ) : a.status === 'arquivado' ? (
      <div className="flex flex-wrap gap-2">
        <Botao tipo="primario" onClick={() => reativar(a.id)}>Reativar</Botao>
        <Botao tipo="perigo" onClick={() => setConfirmando({ id: a.id, tipo: 'apagar' })}>Apagar de vez</Botao>
      </div>
    ) : a.presencial ? (
      <Botao tipo="perigo" onClick={() => setConfirmando({ id: a.id, tipo: 'arquivar' })}>Arquivar</Botao>
    ) : editando === a.id ? (
      <div className="w-full space-y-3">
        <FormularioData padrao={dataPadrao(a)} onConfirmar={(v) => liberar(a.id, v)} onCancelar={() => setEditando(null)} />
        {PIX && <Mensalidade a={a} onSalvo={() => setEditando(null)} onErro={() => setErro('Não deu para gravar. Tente de novo.')} />}
      </div>
    ) : (
      <div className="flex flex-wrap gap-2">
        {(a.status === 'aguardando' || a.status === 'bloqueado') && (
          <Botao tipo="primario" onClick={() => setEditando(a.id)}>
            Liberar
          </Botao>
        )}
        {PIX && a.pagamentoInformadoEm && <Botao tipo="primario" onClick={() => confirmarPix(a.id, a.pagoAte)}>Confirmar pagamento</Botao>}
        {a.status === 'ativo' && <Botao onClick={() => setEditando(a.id)}>Renovar</Botao>}
        {a.status !== 'bloqueado' && (
          <Botao tipo="perigo" onClick={() => bloquear(a.id)}>
            Bloquear
          </Botao>
        )}
        <Botao tipo="perigo" onClick={() => setConfirmando({ id: a.id, tipo: 'arquivar' })}>Arquivar</Botao>
      </div>
    )

  return (
    <Pagina titulo="Alunos" acoes={<Botao tipo="primario" onClick={() => ir('/alunos/novo')}>Novo aluno</Botao>}>
      <div className="mb-4">
        <Campo rotulo="Buscar" placeholder="Nome ou e-mail" value={busca} onChange={(e) => setBusca(e.target.value)} />
      </div>
      {(nArquivados > 0 || arquivados) && (
        <div className="mb-4">
          <Botao onClick={() => setArquivados((v) => !v)}>{arquivados ? 'Voltar aos alunos' : `Arquivados (${nArquivados})`}</Botao>
        </div>
      )}
      {arquivados && <p className="mb-4 text-sm text-slate-400">Apagar de vez apaga tudo do aluno, inclusive o login e as cópias de segurança (em até 24 h).</p>}
      <Msg>{ok && <p className="mb-4 text-sm text-emerald-400">{ok}</p>}</Msg>
      <Msg>
        {erro && (
          <div className="mb-4">
            <Aviso>{erro}</Aviso>
          </div>
        )}
      </Msg>
      {alunos.length === 0 ? (
        <Cartao className="text-slate-400">
          Nenhum aluno ainda. Use Novo aluno, ou peça para seus alunos criarem a conta no app — eles aparecem aqui para você liberar.
        </Cartao>
      ) : (
        <>
        <div className="space-y-3 md:hidden">
          <AnimatePresence initial={false}>
          {filtrados.map((a, i) => {
            const s = statusAluno(a)
            return (
              <m.div key={a.id} {...linha(i)}>
              <Cartao className="space-y-2">
                <button className="flex w-full min-w-0 items-center gap-3 text-left" onClick={() => ir('/aluno/' + a.id)}>
                  {avatar(a)}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{a.nome}</span>
                    <span className="block truncate text-xs text-slate-500">{a.email}</span>
                  </span>
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip a={a} s={s} />
                  {!a.presencial && <span className="text-sm text-slate-300">{textoVencimento(a)}</span>}
                </div>
                {acoes(a)}
              </Cartao>
              </m.div>
            )
          })}
          </AnimatePresence>
        </div>
        <Cartao className="hidden overflow-x-auto p-0 md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr>
                <th className="p-3">Nome</th>
                <th className="p-3">Status</th>
                <th className="p-3">Pago até</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
              {filtrados.map((a, i) => {
                const s = statusAluno(a)
                return (
                  <m.tr key={a.id} {...linha(i)} className="border-b border-slate-800 last:border-0">
                    <td className="p-3">
                      <button className="flex items-center gap-3 text-left hover:underline" onClick={() => ir('/aluno/' + a.id)}>
                        {avatar(a)}
                        <span>
                          <span className="block font-medium">{a.nome}</span>
                          <span className="block text-xs text-slate-500">{a.email}</span>
                        </span>
                      </button>
                    </td>
                    <td className="p-3">
                      <Chip a={a} s={s} />
                    </td>
                    <td className="p-3 text-slate-300">{a.presencial ? '' : textoVencimento(a)}</td>
                    <td className="p-3">
                      {acoes(a)}
                    </td>
                  </m.tr>
                )
              })}
              </AnimatePresence>
            </tbody>
          </table>
        </Cartao>
        </>
      )}
    </Pagina>
  )
}

function ConfirmarAluno({ id, nome, tipo, onFechar }: { id: string; nome: string; tipo: 'arquivar' | 'apagar'; onFechar: () => void }) {
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const apagar = tipo === 'apagar'

  function confirmar() {
    setEnviando(true)
    setErro('')
    // Sucesso: o aluno some da lista sozinho.
    const p = apagar ? apagarAluno(id) : definirAcesso(id, { status: 'arquivado' })
    p.then(onFechar).catch(() => {
      setErro(apagar ? 'Não foi possível apagar. Confira a internet e tente de novo.' : 'Não deu para gravar. Tente de novo.')
      setEnviando(false)
    })
  }

  return (
    <m.div
      className="w-full space-y-2 overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      transition={suave}
    >
      <p className="text-sm">
        {apagar
          ? `Apagar “${nome}” de vez? Apaga perfil, mesociclos, cargas, anotações e o login. A limpeza automática apaga também os registros de erro e as cópias de segurança em até 24 h. Não dá para desfazer.`
          : `Arquivar “${nome}”? Perde o acesso e some da lista. Dá para reativar depois.`}
      </p>
      <Msg>{erro && <p className="text-sm text-red-400">{erro}</p>}</Msg>
      <div className="flex flex-wrap gap-2">
        <Botao tipo="perigo" disabled={enviando} carregando={enviando} onClick={confirmar}>
          {enviando ? 'Aguarde…' : apagar ? 'Sim, apagar de vez' : 'Sim, arquivar'}
        </Botao>
        <Botao onClick={onFechar}>Cancelar</Botao>
      </div>
    </m.div>
  )
}

function Chip({ a, s }: { a: Aluno; s: { texto: string; cor: string } }) {
  return a.presencial ? (
    <span className="rounded-full bg-sky-900/50 px-2 py-1 text-xs font-semibold text-sky-300">Presencial</span>
  ) : (
    <>
      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${s.cor}`}>{s.texto}</span>
      {PIX && a.mensalidade != null && <span className="text-xs text-slate-400">{reais(a.mensalidade)}/mês</span>}
      {PIX && a.pagamentoInformadoEm && <span className="rounded-full bg-amber-900/50 px-2 py-1 text-xs font-semibold text-amber-300">Informou pagamento</span>}
    </>
  )
}

function FormularioData({
  padrao,
  onConfirmar,
  onCancelar,
}: {
  padrao: string
  onConfirmar: (v: string) => void
  onCancelar: () => void
}) {
  const [valor, setValor] = useState(padrao)
  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="date"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className={`${campoBase} px-2 py-1 outline-none focus:border-marca-500`}
      />
      <Botao tipo="primario" onClick={() => onConfirmar(valor)}>
        Confirmar
      </Botao>
      <Botao onClick={onCancelar}>Cancelar</Botao>
    </div>
  )
}

function Mensalidade({ a, onSalvo, onErro }: { a: Aluno; onSalvo: () => void; onErro: () => void }) {
  const [v, setV] = useState(a.mensalidade != null ? String(a.mensalidade) : '')
  const n = Number(v.replace(',', '.'))
  return (
    <form
      className="flex flex-wrap items-end gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        salvarMensalidade(a.id, v.trim() === '' ? null : n).catch(onErro)
        onSalvo() // fecha o formulário: o valor aparece na linha do aluno
      }}
    >
      <Campo rotulo="Mensalidade (R$)" type="number" inputMode="decimal" min={0} step="0.01" value={v} onChange={(e) => setV(e.target.value)} />
      <Botao disabled={v.trim() !== '' && !(n > 0)}>Salvar mensalidade</Botao>
    </form>
  )
}
