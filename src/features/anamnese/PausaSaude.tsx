import { IcSair } from '../../icones'
import { ir } from '../../rota'
import { Botao } from '../../ui'
import { Quadro } from '../../vidro'
import { useSair } from '../auth/BotaoSair'

// Tela única do aluno com treino pausado por saúde (liga no AlunoApp). Botões embaixo, perto do polegar.
export default function PausaSaude() {
  const [saindo, sairAgora] = useSair()
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-topo">
      <div className="flex flex-1 items-center">
        <Quadro className="w-full space-y-3 text-center">
          <h1 className="text-[24px] leading-tight">Treino pausado pela sua saúde</h1>
          <p className="text-slate-300">Seu coach vai conversar com você e liberar o treino.</p>
        </Quadro>
      </div>
      <div className="space-y-2">
        <Botao tipo="primario" tamanho="lg" className="w-full" onClick={() => ir('/anamnese')}>Ver minha anamnese</Botao>
        <Botao tipo="fantasma" tamanho="lg" className="flex w-full items-center justify-center gap-2" disabled={saindo} onClick={sairAgora}>
          <IcSair className="size-5" /> {saindo ? 'Saindo…' : 'Sair'}
        </Botao>
      </div>
    </main>
  )
}
