import { useRef, useState, type ReactNode } from 'react'
import { FirebaseError } from 'firebase/app'
import { doc } from 'firebase/firestore'
import { m } from 'motion/react'
import marca from '@marca/marca.json'
import { Avatar } from '../../avatar'
import { IcLivro, IcPessoa, IcPrancheta, IcSair, IcSeta, IcSino } from '../../icones'
import type { Foto, Usuario } from '../../lib/acesso'
import { apagarFoto, recuperarSenha, sair, salvarFoto, salvarNome, salvarPeso, salvarSelo } from '../../lib/acoes'
import { db } from '../../lib/firebase'
import { reduzirFoto } from '../../lib/foto'
import { useDoc } from '../../lib/hooks'
import { avisosLigados, cancelarPush, CHAVE_AVISOS } from '../../lib/push'
import { agil } from '../../movimento'
import { Aviso, Botao, Campo, Msg, Painel } from '../../ui'
import { IconeQuadrado, Quadro } from '../../vidro'
import { permissao } from './AvisoNotificacoes'
import PagarPix, { dataCurta, PIX } from './PagarPix'

const SEM_INTERNET = 'Sem internet. Verifique sua conexão e tente de novo.'
const GRAVAR = 'Não deu para gravar. Tente de novo.'

const Linha = ({ icone, children }: { icone: ReactNode; children: ReactNode }) => (
  <span className="flex min-h-12 w-full items-center gap-3 text-left text-base font-semibold">
    <IconeQuadrado>{icone}</IconeQuadrado>
    <span className="flex-1">{children}</span>
    <IcSeta className="size-5 text-slate-500" />
  </span>
)

// Chave liga/desliga (role="switch"). A bolinha anda por `x`, não por `layout`: com `layout` ela animava
// também quando a tela mudava de lugar (entrada da aba, foto carregando) e chegava atrasada, vindo de baixo.
function Chave({ ligada, rotulo, onChange }: { ligada: boolean; rotulo: string; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligada}
      aria-label={rotulo}
      onClick={() => onChange(!ligada)}
      className={`relative flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors after:absolute after:-inset-2 ${ligada ? 'bg-marca-500' : 'bg-white/15'}`}
    >
      <m.span initial={false} animate={{ x: ligada ? 24 : 0 }} transition={agil} className="size-6 rounded-full bg-white shadow" />
    </button>
  )
}

function Peso({ uid, atual }: { uid: string; atual?: number }) {
  const [kg, setKg] = useState(atual != null ? String(atual) : '')
  const [salvo, setSalvo] = useState(false)
  const [erro, setErro] = useState('')
  const n = Number(kg.replace(',', '.'))
  const valido = n >= 20 && n <= 300
  return (
    <Quadro>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (!valido) return
          setErro('')
          setSalvo(true)
          salvarPeso(uid, n).catch(() => {
            setSalvo(false)
            setErro(GRAVAR)
          })
        }}
      >
        <h2 className="text-base">Peso corporal (kg)</h2>
        <Campo rotulo="Usado nos exercícios com peso do corpo" type="number" inputMode="decimal" step={0.5} min={20} max={300} value={kg} onChange={(e) => { setKg(e.target.value); setSalvo(false) }} />
        <Botao tipo="primario" className="w-full" disabled={!valido}>
          Salvar peso
        </Botao>
        <Msg>{salvo ? <p className="text-sm text-emerald-400">Peso salvo</p> : erro ? <Aviso>{erro}</Aviso> : null}</Msg>
      </form>
    </Quadro>
  )
}

// Aviso do fim do descanso: depende da permissão do aparelho; liga/desliga fica no localStorage deste aparelho.
function AvisoDescanso() {
  const [p, setP] = useState(permissao)
  const [ligado, setLigado] = useState(avisosLigados)
  const pedir = async () => {
    try {
      await Notification.requestPermission()
    } catch {
      /* segue com o que o aparelho disser */
    }
    setP(permissao())
  }
  const trocar = (v: boolean) => {
    setLigado(v)
    if (!v) cancelarPush() // descanso em andamento: o aviso já agendado não chega
    try {
      localStorage.setItem(CHAVE_AVISOS, v ? '1' : '0')
    } catch {
      /* sem armazenamento: vale só até fechar o app */
    }
  }
  return (
    <Quadro className="space-y-2">
      <div className="flex min-h-12 items-center gap-3">
        <IconeQuadrado><IcSino className="size-5" /></IconeQuadrado>
        <span className="flex-1 text-base font-semibold">Aviso do fim do descanso</span>
        {p === 'default' && <Botao tipo="primario" onClick={pedir}>Ativar</Botao>}
        {p === 'granted' && <Chave ligada={ligado} rotulo="Aviso do fim do descanso" onChange={trocar} />}
      </div>
      {p == null && <p className="text-sm text-slate-400">Este aparelho não permite notificações.</p>}
      {p === 'denied' && <p className="text-sm text-slate-400">Bloqueado no celular — libere nas configurações do aparelho.</p>}
    </Quadro>
  )
}

const desde = (d: Date) => {
  const p = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric', timeZone: 'America/Sao_Paulo' }).formatToParts(d)
  const v = (t: string) => p.find((x) => x.type === t)?.value ?? ''
  return `${v('month').replace('.', '')}/${v('year')}`
}

// Mensalidade: vencimento e, se a marca tem Pix, o pagamento (abre ao tocar).
function Mensalidade({ uid, perfil }: { uid: string; perfil: Usuario }) {
  const [aberto, setAberto] = useState(false)
  return (
    <Quadro className="space-y-3">
      <h2 className="text-base">Mensalidade</h2>
      {perfil.pagoAte && <p className="text-sm text-slate-300">Vence em {dataCurta(perfil.pagoAte.toDate())}</p>}
      {PIX && (
        <>
          <Botao type="button" className="w-full" aria-expanded={aberto} onClick={() => setAberto((v) => !v)}>Pagar com Pix</Botao>
          <Painel aberto={aberto}><PagarPix uid={uid} perfil={perfil} /></Painel>
        </>
      )}
    </Quadro>
  )
}

// Aba Conta do aluno: perfil (foto, nome, selo), peso, avisos, segurança, ajuda e Sair.
export default function ContaAluno({ uid, perfil, abrirTutorial }: { uid: string; perfil: Usuario; abrirTutorial: () => void }) {
  const { dados: foto } = useDoc<Foto>(doc(db, 'fotos', uid))
  const arquivo = useRef<HTMLInputElement>(null)
  const [editando, setEditando] = useState(false)
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [enviandoFoto, setEnviandoFoto] = useState(false)
  const [senhaOk, setSenhaOk] = useState('')
  const nomeValido = nome.trim().length >= 1 && nome.trim().length <= 80
  const falhou = () => setErro(GRAVAR)

  async function escolherFoto(f?: File) {
    if (!f) return
    setErro('')
    setEnviandoFoto(true)
    try {
      salvarFoto(uid, await reduzirFoto(f)).catch(falhou) // sem await: offline a promessa só resolve no servidor
    } catch {
      setErro('Não deu para usar essa foto. Tente outra.')
    } finally {
      setEnviandoFoto(false)
      if (arquivo.current) arquivo.current.value = ''
    }
  }

  function trocarSenha() {
    setErro('')
    setSenhaOk('')
    recuperarSenha(perfil.email)
      .then(() => setSenhaOk(`Enviamos um link para ${perfil.email}`))
      .catch((e) => {
        const c = e instanceof FirebaseError ? e.code : ''
        setErro(c === 'auth/network-request-failed' ? SEM_INTERNET : c === 'auth/too-many-requests' ? 'Muitas tentativas. Espere alguns minutos e tente de novo.' : 'Não deu para enviar o link. Tente de novo.')
      })
  }

  return (
    <main className="mx-auto max-w-md space-y-4 px-4 py-4">
      <section className="flex flex-col items-center gap-2 pt-2 text-center">
        <input ref={arquivo} type="file" accept="image/*" className="hidden" onChange={(e) => escolherFoto(e.target.files?.[0])} />
        <button type="button" onClick={() => arquivo.current?.click()} aria-label="Escolher foto" className="toque rounded-full">
          <Avatar img={foto?.img} nome={perfil.nome} selo={perfil.selo} tamanho={96} />
        </button>
        {editando ? (
          <form
            className="w-full space-y-2 text-left"
            onSubmit={(e) => {
              e.preventDefault()
              if (!nomeValido) return
              salvarNome(uid, nome).catch(falhou)
              setEditando(false)
            }}
          >
            <Campo rotulo="Nome" value={nome} maxLength={80} autoFocus onChange={(e) => setNome(e.target.value)} />
            <div className="flex gap-2">
              <Botao tipo="primario" className="flex-1" disabled={!nomeValido}>Salvar</Botao>
              <Botao type="button" className="flex-1" onClick={() => setEditando(false)}>Cancelar</Botao>
            </div>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] leading-tight">{perfil.nome}</h1>
            <Botao type="button" onClick={() => { setNome(perfil.nome); setEditando(true) }}>Editar</Botao>
          </div>
        )}
        <p className="break-all text-sm text-slate-400">{perfil.email}</p>
        {perfil.criadoEm && <p className="text-sm text-slate-500">Aluno desde {desde(perfil.criadoEm.toDate())}</p>}
        <div className="flex gap-2">
          <Botao type="button" disabled={enviandoFoto} carregando={enviandoFoto} onClick={() => arquivo.current?.click()}>Trocar foto</Botao>
          {foto && <Botao type="button" onClick={() => apagarFoto(uid).catch(falhou)}>Remover foto</Botao>}
        </div>
        {!foto && <p className="text-sm text-slate-400">Sua foto aparece só para você e seu coach. Remova quando quiser.</p>}
        <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
      </section>

      <Quadro>
        <div className="flex min-h-12 items-center gap-3">
          <span className="flex-1 text-base font-semibold">Selo {marca.nome} na foto</span>
          <Chave ligada={!!perfil.selo} rotulo={`Selo ${marca.nome} na foto`} onChange={(v) => salvarSelo(uid, v).catch(falhou)} />
        </div>
      </Quadro>

      <Mensalidade uid={uid} perfil={perfil} />
      <Peso uid={uid} atual={perfil.pesoKg} />
      <AvisoDescanso />

      <Quadro className="space-y-3">
        <Botao type="button" className="w-full" onClick={trocarSenha}>Trocar senha</Botao>
        <Msg>{senhaOk && <p className="text-sm text-emerald-400">{senhaOk}</p>}</Msg>
      </Quadro>

      <Quadro className="divide-y divide-white/10 !py-1">
        <button type="button" onClick={abrirTutorial} className="block w-full py-2">
          <Linha icone={<IcPrancheta className="size-5" />}>Como usar</Linha>
        </button>
        <a href="#/metodos" className="toque block py-2">
          <Linha icone={<IcLivro className="size-5" />}>Guia de métodos</Linha>
        </a>
        <a href="/privacidade" className="toque block py-2">
          <Linha icone={<IcPessoa className="size-5" />}>Política de Privacidade</Linha>
        </a>
      </Quadro>
      <button type="button" onClick={sair} className="vidro-escuro flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold text-rose-300">
        <IcSair className="size-5" /> Sair
      </button>
    </main>
  )
}
