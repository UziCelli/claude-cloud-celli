import { sair } from '../../lib/acoes'
import { casar, useRota } from '../../rota'
import { Botao, Tela } from '../../ui'
import AvisoIOS from '../instalar/AvisoIOS'
import EvolucaoAluno from './EvolucaoAluno'
import Hoje from './Hoje'
import Treino from './Treino'

export default function AlunoApp({ uid, nome }: { uid: string; nome: string }) {
  const rota = useRota()
  let p: Record<string, string> | null
  let tela = <Hoje uid={uid} />
  if ((p = casar('/treino/:mesoId/:semana/:treino', rota)))
    tela = <Treino uid={uid} mesoId={p.mesoId} semana={Number(p.semana)} treino={Number(p.treino)} />
  else if (rota === '/evolucao') tela = <EvolucaoAluno uid={uid} />

  return (
    <>
      <header className="sticky top-0 z-30 border-b pt-[env(safe-area-inset-top)] border-slate-800 bg-marca-900">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
          <span className="font-bold">Olá, {nome}</span>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <a href="#/evolucao" className="hover:text-marca-400">
              Evolução
            </a>
            <Botao onClick={sair}>Sair</Botao>
          </div>
        </div>
      </header>
      <AvisoIOS />
      <Tela chave={rota}>{tela}</Tela>
    </>
  )
}
