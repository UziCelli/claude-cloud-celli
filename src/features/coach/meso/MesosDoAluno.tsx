import { m } from 'motion/react'
import { useMemo, useRef, useState, type ReactNode } from 'react'
import { collection, doc, query, where, type Timestamp } from 'firebase/firestore'
import type { Usuario } from '../../../lib/acesso'
import { darAcessoAoApp, duplicarMeso, excluirMeso, salvarMeso } from '../../../lib/acoes'
import { registrarErro } from '../../../lib/log'
import type { Meso } from '../../../engine'
import { docParaMeso, type MesoSalvo } from '../../../lib/conversores'
import { db } from '../../../lib/firebase'
import { TEXTO_SEM_INTERNET, useDoc, useLista, useSemInternet } from '../../../lib/hooks'
import { ir } from '../../../rota'
import { IcPlay } from '../../../icones'
import { Aviso, Botao, Campo, campoBase, Cartao, cascata, flash, item, Msg, Pagina, Painel } from '../../../ui'
import { BotaoVoltar } from '../../../voltar'
import { diaSP, hojeMaisDias } from '../../../lib/acesso'
import { somarDias } from '../../../lib/avaliacao'
import { msSessao } from '../../../lib/resumo'
import { semanaAtual } from '../../../lib/treino'
import { dataSP, mesoAtual, proximoMeso } from '../../aluno/mesoAtual'
import { fmtData } from '../semana/format'
import { cicloTerminou, fimISO } from '../../../lib/relatorio'
import { useAnamnesesDoAluno } from '../../anamnese/AnamneseCoach'
import { maisRecente, sinaisAtencao } from '../../../lib/anamnese'
import ImportarPlanilha from './ImportarPlanilha'
import { mesoPadrao } from './mesoPadrao'

type RegistroHoje = { semana: number; treino: number; realizado?: boolean; inicioEm?: Timestamp | null; realizadoEm?: Timestamp | null; atualizadoEm?: Timestamp | null }

const dataBr = (iso: string) => {
  const [a, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}/${a}`
}

export default function MesosDoAluno({ uid }: { uid: string }) {
  const aluno = useDoc<Usuario>(doc(db, 'usuarios', uid))
  const mesosQ = useMemo(() => query(collection(db, 'mesos'), where('alunoId', '==', uid)), [uid])
  const mesos = useLista<MesoSalvo>(mesosQ)
  const semInternet = useSemInternet()
  const ultimaAnam = maisRecente(useAnamnesesDoAluno(uid).dados)
  const atencao = !!ultimaAnam && sinaisAtencao(ultimaAnam.r).length > 0
  const [erro, setErro] = useState<string | null>(null)
  const [importando, setImportando] = useState(false)
  const [mais, setMais] = useState(false)
  const [aviso] = useState(() => {
    const t = flash.texto
    flash.texto = ''
    return t
  })

  const criando = useRef(false)

  // Abre o editor na hora; se a gravação falhar, avisa aqui.
  function criar(nome: string, meso: Meso) {
    if (criando.current) return
    criando.current = true
    setErro(null)
    const { id, gravado } = salvarMeso(null, uid, nome, meso)
    ir(`/meso/${id}`)
    gravado.catch((e) => {
      registrarErro('gravacao', `novo meso: ${e?.code ?? e}`, e)
      setErro('Não foi possível salvar o novo mesociclo.')
      criando.current = false
    })
  }
  const novoMeso = () => criar(`Mesociclo ${mesos.dados.length + 1}`, mesoPadrao())

  const hoje = new Date()
  const hojeISO = dataSP(hoje)
  const agora = mesoAtual(mesos.dados.filter((d) => d.inicio.slice(0, 10) <= hojeISO), hoje) // ciclo que o aluno vê (ou o último que terminou)
  const prox = proximoMeso(mesos.dados, hoje)
  const anteriores = mesos.dados
    .filter((d) => d.id !== agora?.doc.id && d.id !== prox?.id)
    .sort((a, b) => b.inicio.localeCompare(a.inicio))

  if (!aluno.carregando && !aluno.dados && !aluno.cache) // só com a resposta do servidor: offline sem cache não é "não encontrado"
    return (
      <Pagina titulo="Aluno não encontrado.">
        <a href="#/alunos" className="text-marca-500 underline">Voltar para os alunos</a>
      </Pagina>
    )

  const botaoPresencial = (
    <Botao tipo="destaque" className="inline-flex items-center gap-1.5" onClick={() => ir(`/aluno/${uid}/presencial`)}>
      <IcPlay className="size-4" />
      Treino presencial
    </Botao>
  )
  const semMeso = !mesos.carregando && mesos.dados.length === 0

  return (
    <Pagina
      voltar={<BotaoVoltar para="/alunos" />}
      titulo={`Mesociclos de ${aluno.dados?.nome ?? '…'}`}
      acoes={
        <Botao className="inline-flex items-center gap-1.5" aria-expanded={mais} onClick={() => setMais((v) => !v)}>
          Mais
          {atencao && <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">Atenção</span>}
        </Botao>
      }
    >
      <Msg>{aviso && <p className="mb-3 text-sm text-green-400">{aviso}</p>}</Msg>
      <Painel aberto={mais}>
        <div className="mb-3 flex flex-wrap gap-2">
          <Botao onClick={() => ir(`/aluno/${uid}/evolucao`)}>Evolução</Botao>
          <Botao onClick={() => ir(`/aluno/${uid}/avaliacoes`)}>Avaliação física</Botao>
          <Botao onClick={() => ir(`/aluno/${uid}/fisio`)}>Físio · orientações</Botao>
          <Botao className="inline-flex items-center gap-1.5" onClick={() => ir(`/aluno/${uid}/anamnese`)}>
            Anamnese
            {atencao && <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">Atenção</span>}
          </Botao>
          {!semMeso && <Botao onClick={() => setImportando((v) => !v)}>Importar da planilha</Botao>}
          {!semMeso && <Botao onClick={novoMeso}>Novo mesociclo</Botao>}
        </div>
      </Painel>
      {aluno.dados?.presencial && <DarAcesso id={uid} />}
      <Painel aberto={importando}>
        {importando && <ImportarPlanilha uid={uid} qtdMesos={mesos.dados.length} onFechar={() => setImportando(false)} />}
      </Painel>
      <Msg>{erro && <p className="mb-3 text-sm text-red-400">{erro}</p>}</Msg>
      {mesos.carregando && <p className="text-slate-400">Carregando…</p>}
      {mesos.carregando || (
        <div className="space-y-3">
          {agora ? (
            <CartaoAgora doc={agora.doc} presencial={botaoPresencial} />
          ) : (
            <div className="flex flex-wrap gap-2">
              {botaoPresencial}
            </div>
          )}
          {semMeso && (
            <>
              <p className="text-slate-400">{semInternet ? TEXTO_SEM_INTERNET : 'Nenhum mesociclo ainda.'}</p>
              <div className="flex flex-wrap gap-2">
                <Botao tipo="primario" onClick={novoMeso}>Novo mesociclo</Botao>
                <Botao tipo="primario" onClick={() => setImportando((v) => !v)}>Importar da planilha</Botao>
              </div>
            </>
          )}
          {(agora || prox) && (
            <CartaoProximo
              uid={uid}
              atual={agora?.doc}
              prox={prox}
              onMontar={() => {
                if (!agora) return
                const depois = somarDias(fimISO(agora.meso), 1)
                criar(`Mesociclo ${mesos.dados.length + 1}`, { ...agora.meso, inicio: depois > hojeISO ? depois : hojeISO })
              }}
              onErro={setErro}
            />
          )}
          {anteriores.length > 0 && (
            <details className="group">
              <summary className="toque cursor-pointer text-sm font-semibold text-slate-300">Mesos anteriores ({anteriores.length})</summary>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {anteriores.map((d) => <CartaoMeso key={d.id} meso={d} />)}
              </div>
            </details>
          )}
        </div>
      )}
    </Pagina>
  )
}

// Ciclo que o aluno vê hoje: semana, fim calculado, treino de hoje e os atalhos principais.
function CartaoAgora({ doc: d, presencial }: { doc: MesoSalvo & { id: string }; presencial: ReactNode }) {
  const registros = useLista<RegistroHoje>(useMemo(() => query(collection(db, 'registros'), where('mesoId', '==', d.id)), [d.id]))
  const [excluindo, setExcluindo] = useState(false)
  const meso = docParaMeso(d)
  const agora = new Date()
  const { estado, semana } = semanaAtual(meso, agora)
  const hoje = diaSP(agora.getTime())
  const deHoje: Record<number, 'feito' | 'andamento'> = {}
  for (const r of registros.dados) {
    const ms = r.semana === semana ? msSessao(r, agora) : null
    if (ms != null && diaSP(ms) === hoje) deHoje[r.treino] = r.realizado ? 'feito' : 'andamento'
  }
  return (
    <Cartao>
      <p className="text-xs font-semibold tracking-wide text-marca-300">AGORA</p>
      <h2 className="font-semibold">{d.nome}</h2>
      <p className="mt-1 text-sm text-slate-400">
        {estado === 'durante' ? `Semana ${semana} de ${meso.semanas} · termina ~${fmtData(fimISO(meso))}` : `Terminou em ${fmtData(fimISO(meso))}`}
      </p>
      {Object.entries(deHoje).map(([t, s]) => (
        <p key={t} className="mt-1 text-sm text-green-400">Treino {t} de hoje: {s === 'feito' ? 'feito' : 'em andamento'}</p>
      ))}
      <div className="mt-3 flex flex-wrap gap-2">
        <Botao tipo="primario" onClick={() => ir(`/meso/${d.id}`)}>Editar treino</Botao>
        <Botao onClick={() => ir(`/meso/${d.id}/semana/${semana}`)}>Ver o que ele fez</Botao>
        {cicloTerminou(meso, agora) && <Botao onClick={() => ir(`/meso/${d.id}/relatorio`)}>Relatório</Botao>}
        {presencial}
        <Botao tipo="perigo" onClick={() => setExcluindo((v) => !v)}>Excluir</Botao>
      </div>
      <Painel aberto={excluindo}>
        <ConfirmarExclusao meso={d} onFechar={() => setExcluindo(false)} />
      </Painel>
    </Cartao>
  )
}

// Próximo meso: montado com antecedência (inicio futuro), o aluno ainda não vê.
function CartaoProximo({ uid, atual, prox, onMontar, onErro }: { uid: string; atual?: MesoSalvo & { id: string }; prox: (MesoSalvo & { id: string }) | null; onMontar: () => void; onErro: (e: string) => void }) {
  const [excluindo, setExcluindo] = useState(false)
  if (!prox)
    return !atual ? null : (
      <Cartao>
        <p className="text-xs font-semibold tracking-wide text-slate-400">PRÓXIMO</p>
        <p className="mt-1 text-sm text-slate-400">Copia o ciclo atual e começa no dia seguinte ao fim dele.</p>
        <div className="mt-3"><Botao onClick={onMontar}>Montar próximo meso</Botao></div>
      </Cartao>
    )
  const fimAtual = atual ? fimISO(docParaMeso(atual)) : ''
  const sobrepoe = !!atual && prox.inicio.slice(0, 10) <= fimAtual
  const mudarInicio = (inicio: string) => {
    onErro('')
    salvarMeso(prox.id, uid, prox.nome, { ...docParaMeso(prox), inicio }).gravado.catch((e) => {
      registrarErro('gravacao', `início do próximo meso: ${e?.code ?? e}`, e)
      onErro('Não foi possível salvar a nova data.')
    })
  }
  return (
    <Cartao>
      <p className="text-xs font-semibold tracking-wide text-slate-400">PRÓXIMO</p>
      <h2 className="font-semibold">{prox.nome}</h2>
      <p className="mt-1 text-sm text-amber-300">O aluno ainda não vê · começa {fmtData(prox.inicio)}</p>
      {sobrepoe && (
        <div className="mt-2">
          <Aviso>
            Começa antes do fim do ciclo atual.{' '}
            <Botao tipo="fantasma" className="!text-amber-100 underline" onClick={() => mudarInicio(somarDias(fimAtual, 1))}>
              Ajustar para {fmtData(somarDias(fimAtual, 1))}
            </Botao>
          </Aviso>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <Botao onClick={() => ir(`/meso/${prox.id}`)}>Editar</Botao>
        <Botao
          onClick={() => confirm('Começar hoje? O ciclo atual sai da tela do aluno e ele passa a ver este.') && mudarInicio(dataSP(new Date()))}
        >
          Começar hoje
        </Botao>
        <Botao tipo="perigo" onClick={() => setExcluindo((v) => !v)}>Excluir</Botao>
      </div>
      <Painel aberto={excluindo}>
        <ConfirmarExclusao meso={prox} onFechar={() => setExcluindo(false)} />
      </Painel>
    </Cartao>
  )
}

function CartaoMeso({ meso }: { meso: MesoSalvo & { id: string } }) {
  const [aberto, setAberto] = useState<'duplicar' | 'excluir' | null>(null)
  const alternar = (q: 'duplicar' | 'excluir') => setAberto((v) => (v === q ? null : q))
  return (
    <Cartao>
      <h2 className="font-semibold">{meso.nome}</h2>
      <p className="mt-1 text-sm text-slate-400">
        {meso.frequencia}x/semana · {meso.semanas} semanas · início {dataBr(meso.inicio)} · termina {fmtData(fimISO(docParaMeso(meso)))}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Botao onClick={() => ir(`/meso/${meso.id}`)}>Editar</Botao>
        <Botao onClick={() => ir(`/meso/${meso.id}/semana/1`)}>Ver semanas</Botao>
        {cicloTerminou(docParaMeso(meso), new Date()) && <Botao onClick={() => ir(`/meso/${meso.id}/relatorio`)}>Relatório</Botao>}
        <Botao onClick={() => alternar('duplicar')}>Duplicar</Botao>
        <Botao tipo="perigo" onClick={() => alternar('excluir')}>Excluir</Botao>
      </div>
      <Painel aberto={aberto === 'duplicar'}>
        <FormDuplicar mesoId={meso.id} onFechar={() => setAberto(null)} />
      </Painel>
      <Painel aberto={aberto === 'excluir'}>
        <ConfirmarExclusao meso={meso} onFechar={() => setAberto(null)} />
      </Painel>
    </Cartao>
  )
}

function ConfirmarExclusao({ meso, onFechar }: { meso: MesoSalvo & { id: string }; onFechar: () => void }) {
  const regsQ = useMemo(() => query(collection(db, 'registros'), where('mesoId', '==', meso.id)), [meso.id])
  const treinos = useLista(regsQ).dados.length
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  function excluir() {
    setEnviando(true)
    setErro(null)
    // Sucesso: o cartão some da lista sozinho.
    excluirMeso(meso.id).catch(() => {
      setErro('Não foi possível excluir. Confira a internet e tente de novo.')
      setEnviando(false)
    })
  }

  return (
    <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">
      <p className="text-sm">Tem certeza que quer excluir “{meso.nome}”? Não dá para desfazer.</p>
      {treinos > 0 && (
        <Aviso>
          O aluno já registrou {treinos} treino{treinos === 1 ? '' : 's'} neste mesociclo. As cargas também serão apagadas.
        </Aviso>
      )}
      <Msg>{erro && <p className="text-sm text-red-400">{erro}</p>}</Msg>
      <div className="flex flex-wrap gap-2">
        <Botao tipo="perigo" disabled={enviando} carregando={enviando} onClick={excluir}>
          {enviando ? 'Excluindo…' : 'Sim, excluir'}
        </Botao>
        <Botao onClick={onFechar}>Cancelar</Botao>
      </div>
    </div>
  )
}

function FormDuplicar({ mesoId, onFechar }: { mesoId: string; onFechar: () => void }) {
  const alunosQ = useMemo(() => query(collection(db, 'usuarios'), where('papel', '==', 'aluno')), [])
  const alunos = useLista<Usuario>(alunosQ)
  const [alunoId, setAlunoId] = useState('')
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  async function confirmar() {
    if (!alunoId || !nome.trim()) return
    setEnviando(true)
    setErro(null)
    try {
      const { id, gravado } = await duplicarMeso(mesoId, alunoId, nome.trim())
      ir(`/meso/${id}`)
      gravado.catch((e) => {
        registrarErro('gravacao', `duplicar meso: ${e?.code ?? e}`, e)
        setErro('Não foi possível duplicar o mesociclo.')
      })
    } catch {
      setErro('Não foi possível duplicar o mesociclo.')
      setEnviando(false)
    }
  }

  return (
    <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-slate-400">Aluno</span>
        <select
          value={alunoId}
          onChange={(e) => setAlunoId(e.target.value)}
          className={`${campoBase} px-3 py-2`}
        >
          <option value="">Selecione…</option>
          {alunos.dados.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          ))}
        </select>
      </label>
      <Campo rotulo="Nome do novo mesociclo" value={nome} onChange={(e) => setNome(e.target.value)} />
      <Msg>{erro && <p className="text-sm text-red-400">{erro}</p>}</Msg>
      <div className="flex flex-wrap gap-2">
        <Botao tipo="primario" disabled={!alunoId || !nome.trim() || enviando} carregando={enviando} onClick={confirmar}>
          Confirmar
        </Botao>
        <Botao onClick={onFechar}>Cancelar</Botao>
      </div>
    </div>
  )
}

function DarAcesso({ id }: { id: string }) {
  const [aberto, setAberto] = useState(false)
  const [email, setEmail] = useState('')
  const [pagoAte, setPagoAte] = useState(hojeMaisDias(30))
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setEnviando(true)
    setErro('')
    try {
      flash.texto = 'Acesso criado. O aluno recebeu um e-mail para criar a senha.'
      ir('/aluno/' + (await darAcessoAoApp(id, { email: email.trim(), pagoAte })))
    } catch (err) {
      flash.texto = ''
      setErro(err instanceof Error ? err.message : 'Não foi possível dar acesso.')
      setEnviando(false)
    }
  }

  return (
    <div className="mb-4 space-y-3">
      <Aviso>Aluno presencial: você anota as cargas em Ver semanas.</Aviso>
      <Painel aberto={aberto}>
        <Cartao className="max-w-md">
          <form onSubmit={enviar} className="space-y-3">
            <Campo rotulo="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Campo rotulo="Pago até" type="date" required value={pagoAte} onChange={(e) => setPagoAte(e.target.value)} />
            <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
            <div className="flex gap-2">
              <Botao tipo="primario" type="submit" disabled={enviando} carregando={enviando}>{enviando ? 'Criando…' : 'Criar acesso'}</Botao>
              <Botao type="button" onClick={() => setAberto(false)}>Cancelar</Botao>
            </div>
          </form>
        </Cartao>
      </Painel>
      <Painel aberto={!aberto}>
        <Botao onClick={() => setAberto(true)}>Dar acesso ao app</Botao>
      </Painel>
    </div>
  )
}
