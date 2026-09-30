import { useState } from 'react'
import { collection, query, where } from 'firebase/firestore'
import { diasParaVencer, hojeMaisDias, type Usuario } from '../../../lib/acesso'
import { apagarAluno, definirAcesso } from '../../../lib/acoes'
import { db } from '../../../lib/firebase'
import { useLista } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { Aviso, Botao, Campo, campoBase, Cartao, Pagina } from '../../../ui'

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

const ordem = { aguardando: 0, ativo: 1, bloqueado: 2, arquivado: 3 }

function comparar(a: Aluno, b: Aluno) {
  if (ordem[a.status] !== ordem[b.status]) return ordem[a.status] - ordem[b.status]
  if (a.status === 'ativo' && a.pagoAte && b.pagoAte) return a.pagoAte.toMillis() - b.pagoAte.toMillis()
  return a.nome.localeCompare(b.nome)
}

export default function Alunos() {
  const { dados } = useLista<Usuario>(query(collection(db, 'usuarios'), where('papel', '==', 'aluno')))
  const alunos = dados as Aluno[]
  const [busca, setBusca] = useState('')
  const [editando, setEditando] = useState<string | null>(null)
  const [erro, setErro] = useState('')
  const [arquivados, setArquivados] = useState(false)
  const [confirmando, setConfirmando] = useState<{ id: string; tipo: 'arquivar' | 'apagar' } | null>(null)
  const nArquivados = alunos.filter((a) => a.status === 'arquivado').length

  const filtrados = alunos
    .filter((a) => (a.status === 'arquivado') === arquivados)
    .filter((a) => a.nome.toLowerCase().includes(busca.toLowerCase()) || a.email.toLowerCase().includes(busca.toLowerCase()))
    .sort(comparar)

  function liberar(uid: string, pagoAte: string) {
    setErro('')
    definirAcesso(uid, { status: 'ativo', pagoAte }).catch(() => setErro('Não deu para gravar. Tente de novo.'))
    setEditando(null)
  }

  function bloquear(uid: string) {
    if (!confirm('Bloquear o acesso deste aluno?')) return
    setErro('')
    definirAcesso(uid, { status: 'bloqueado' }).catch(() => setErro('Não deu para gravar. Tente de novo.'))
  }

  function reativar(uid: string) {
    setErro('')
    definirAcesso(uid, { status: 'ativo' }).catch(() => setErro('Não deu para gravar. Tente de novo.'))
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
      <FormularioData padrao={dataPadrao(a)} onConfirmar={(v) => liberar(a.id, v)} onCancelar={() => setEditando(null)} />
    ) : (
      <div className="flex flex-wrap gap-2">
        {(a.status === 'aguardando' || a.status === 'bloqueado') && (
          <Botao tipo="primario" onClick={() => setEditando(a.id)}>
            Liberar
          </Botao>
        )}
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
      {arquivados && <p className="mb-4 text-sm text-slate-400">Apagar de vez não remove o login (e-mail) no Firebase Auth.</p>}
      {erro && (
        <div className="mb-4">
          <Aviso>{erro}</Aviso>
        </div>
      )}
      {alunos.length === 0 ? (
        <Cartao className="text-slate-400">
          Nenhum aluno ainda. Use Novo aluno, ou peça para seus alunos criarem a conta no app — eles aparecem aqui para você liberar.
        </Cartao>
      ) : (
        <>
        <div className="space-y-3 md:hidden">
          {filtrados.map((a) => {
            const s = statusAluno(a)
            return (
              <Cartao key={a.id} className="space-y-2">
                <button className="block w-full min-w-0 text-left" onClick={() => ir('/aluno/' + a.id)}>
                  <div className="truncate font-medium">{a.nome}</div>
                  <div className="truncate text-xs text-slate-500">{a.email}</div>
                </button>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip a={a} s={s} />
                  {!a.presencial && <span className="text-sm text-slate-300">{textoVencimento(a)}</span>}
                </div>
                {acoes(a)}
              </Cartao>
            )
          })}
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
              {filtrados.map((a) => {
                const s = statusAluno(a)
                return (
                  <tr key={a.id} className="border-b border-slate-800 last:border-0">
                    <td className="p-3">
                      <button className="text-left hover:underline" onClick={() => ir('/aluno/' + a.id)}>
                        <div className="font-medium">{a.nome}</div>
                        <div className="text-xs text-slate-500">{a.email}</div>
                      </button>
                    </td>
                    <td className="p-3">
                      <Chip a={a} s={s} />
                    </td>
                    <td className="p-3 text-slate-300">{a.presencial ? '' : textoVencimento(a)}</td>
                    <td className="p-3">
                      {acoes(a)}
                    </td>
                  </tr>
                )
              })}
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
    <div className="w-full space-y-2">
      <p className="text-sm">
        {apagar
          ? `Apagar “${nome}” de vez? Apaga perfil, mesociclos, cargas e anotações. Não dá para desfazer.`
          : `Arquivar “${nome}”? Perde o acesso e some da lista. Dá para reativar depois.`}
      </p>
      {erro && <p className="text-sm text-red-400">{erro}</p>}
      <div className="flex flex-wrap gap-2">
        <Botao tipo="perigo" disabled={enviando} onClick={confirmar}>
          {enviando ? 'Aguarde…' : apagar ? 'Sim, apagar de vez' : 'Sim, arquivar'}
        </Botao>
        <Botao onClick={onFechar}>Cancelar</Botao>
      </div>
    </div>
  )
}

function Chip({ a, s }: { a: Aluno; s: { texto: string; cor: string } }) {
  return a.presencial ? (
    <span className="rounded-full bg-sky-900/50 px-2 py-1 text-xs font-semibold text-sky-300">Presencial</span>
  ) : (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${s.cor}`}>{s.texto}</span>
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
