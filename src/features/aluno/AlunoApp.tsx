import { useState } from 'react'
import { casar, useRota } from '../../rota'
import { Tela } from '../../ui'
import { IcCasa, IcGrafico, IcHaltere, IcPessoa } from '../../icones'
import { BarraAbas, Brilho } from '../../vidro'
import AvisoIOS from '../instalar/AvisoIOS'
import EvolucaoAluno from './EvolucaoAluno'
import GuiaMetodos from '../metodos/GuiaMetodos'
import ContaAluno from './ContaAluno'
import Hoje from './Hoje'
import InicioAluno from './InicioAluno'
import Treino from './Treino'
import Tutorial, { tutorialNaoVisto } from './Tutorial'

export default function AlunoApp({ uid, nome }: { uid: string; nome: string }) {
  const rota = useRota()
  const [tutorial, setTutorial] = useState(tutorialNaoVisto)
  let p: Record<string, string> | null
  let tela = <InicioAluno uid={uid} nome={nome} />
  if ((p = casar('/treino/:mesoId/:semana/:treino', rota)))
    tela = <Treino uid={uid} mesoId={p.mesoId} semana={Number(p.semana)} treino={Number(p.treino)} />
  else if (rota === '/treino') tela = <Hoje uid={uid} />
  else if (rota === '/metodos') tela = <GuiaMetodos />
  else if (rota === '/evolucao') tela = <EvolucaoAluno uid={uid} nome={nome} />
  else if (rota === '/conta') tela = <ContaAluno nome={nome} abrirTutorial={() => setTutorial(true)} />

  // Sem barra na tela do treino (e no fim do treino, que mora nela): ela cobriria os botões.
  const comBarra = !p
  const abas = [
    { rotulo: 'Início', href: '#/', Icone: IcCasa, ativo: rota === '/' },
    { rotulo: 'Treino', href: '#/treino', Icone: IcHaltere, ativo: rota === '/treino' },
    { rotulo: 'Evolução', href: '#/evolucao', Icone: IcGrafico, ativo: rota === '/evolucao' },
    { rotulo: 'Conta', href: '#/conta', Icone: IcPessoa, ativo: rota === '/conta' || rota === '/metodos' },
  ]

  return (
    <div className={comBarra ? 'pb-barra' : ''}>
      <Brilho />
      {tutorial && <Tutorial fechar={() => setTutorial(false)} />}
      <AvisoIOS />
      <div className="pt-[env(safe-area-inset-top)]">
        <Tela chave={rota} abrir={!!p}>{tela}</Tela>
      </div>
      {comBarra && <BarraAbas abas={abas} />}
    </div>
  )
}
