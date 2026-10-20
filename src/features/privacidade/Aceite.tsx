import { useState } from 'react'
import { aceitarPrivacidade, sair } from '../../lib/acoes'
import { Aviso, Botao, Cartao, Centro, Msg } from '../../ui'
import { CaixaAceite } from './Politica'

// Aluno liberado que ainda não aceitou a versão vigente. A gravação fica na fila se estiver offline.
export default function Aceite({ uid }: { uid: string }) {
  const [marcada, setMarcada] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [saindo, setSaindo] = useState(false)
  const [erro, setErro] = useState(false)
  return (
    <Centro>
      <h1 className="text-2xl font-bold">Sua privacidade</h1>
      <Cartao className="space-y-3 text-left">
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>Guardamos seu nome, e-mail, peso e treinos para montar e acompanhar seu treino.</li>
          <li>Peso e treinos podem ser dados de saúde: só usamos com o seu aceite.</li>
          <li>Não vendemos seus dados.</li>
          <li>Você pode pedir cópia ou exclusão a qualquer momento pelo WhatsApp.</li>
        </ul>
        <a href="/privacidade" className="block text-sm underline">Ler a política completa</a>
        <CaixaAceite marcada={marcada} onChange={setMarcada} />
      </Cartao>
      <Botao
        tipo="primario"
        className="w-full"
        disabled={!marcada || enviando}
        carregando={enviando}
        onClick={() => {
          setEnviando(true)
          setErro(false)
          // Offline o updateDoc só resolve ao sincronizar: não esperamos; o perfil local muda na hora.
          aceitarPrivacidade(uid).catch(() => {
            setEnviando(false)
            setErro(true)
          })
        }}
      >
        Aceitar e continuar
      </Botao>
      <Msg>{erro && <Aviso>Não deu para salvar o aceite. Tente de novo.</Aviso>}</Msg>
      <Botao
        disabled={saindo}
        onClick={() => {
          setSaindo(true)
          sair().catch(() => setSaindo(false))
        }}
      >
        {saindo ? 'Saindo…' : 'Sair'}
      </Botao>
    </Centro>
  )
}
