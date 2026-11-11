import { useEffect, useRef, useState } from 'react'
import { aceitarPrivacidade, sair } from '../../lib/acoes'
import { Aviso, Botao, Msg } from '../../ui'
import { Brilho } from '../../vidro'
import { CaixaAceite } from './Politica'

// Pop-up do aceite: aluno liberado que ainda não aceitou a versão vigente dos termos.
// Só "Li e aceito" e Aceitar (ou Sair). Não pede senha: a senha é outra tela (SenhaSegura.tsx), que vem antes e só uma vez.
// Funciona offline: o updateDoc fica na fila e o perfil local muda na hora.
export default function Aceite({ uid, atualizou }: { uid: string; atualizou: boolean }) {
  const [marcada, setMarcada] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [saindo, setSaindo] = useState(false)
  const [erro, setErro] = useState('')
  const titulo = useRef<HTMLHeadingElement>(null)
  useEffect(() => titulo.current?.focus(), []) // leitor de tela começa pelo pop-up

  function aceitar() {
    setEnviando(true)
    setErro('')
    aceitarPrivacidade(uid).catch(() => {
      setEnviando(false)
      setErro('Não deu para salvar o aceite. Tente de novo.')
    })
  }

  return (
    <div className="min-h-dvh">
      <Brilho />
      <div className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-black/60 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-topo">
        <div role="dialog" aria-modal="true" aria-labelledby="titulo-aceite" className="w-full max-w-md space-y-4 rounded-3xl bg-slate-900 p-5 text-left shadow-2xl">
          <h1 id="titulo-aceite" ref={titulo} tabIndex={-1} className="text-xl font-bold outline-none">{atualizou ? 'Atualizamos os termos' : 'Termos de uso e privacidade'}</h1>
          <p className="text-sm text-slate-300">{atualizou ? 'Leia o resumo e aceite para continuar usando o app.' : 'Para usar o app, leia o resumo e aceite.'}</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
            <li>Guardamos seu nome, e-mail, peso, treinos e, se o seu coach fizer, a avaliação física (medidas do corpo).</li>
            <li>Peso, medidas da avaliação física, lipedema (se o coach marcar) e treinos são dados de saúde: só usamos com o seu aceite.</li>
            <li>Não vendemos seus dados.</li>
            <li>Você pode pedir cópia ou exclusão a qualquer momento pelo WhatsApp.</li>
          </ul>
          <a href="/privacidade" className="block text-sm underline">Ler a política completa</a>
          <CaixaAceite marcada={marcada} onChange={setMarcada} />
          <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
          <Botao tipo="primario" className="w-full" disabled={!marcada || enviando} carregando={enviando} onClick={aceitar}>
            Aceitar e continuar
          </Botao>
          <Botao
            className="w-full"
            disabled={saindo}
            onClick={() => {
              setSaindo(true)
              sair().catch(() => setSaindo(false))
            }}
          >
            {saindo ? 'Saindo…' : 'Não aceito, sair'}
          </Botao>
        </div>
      </div>
    </div>
  )
}
