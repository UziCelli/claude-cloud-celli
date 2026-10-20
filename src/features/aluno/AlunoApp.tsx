import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import type { Usuario } from '../../lib/acesso'
import { inscreverAvisos } from '../../lib/push'
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
import RelatorioAluno from '../relatorio/RelatorioAluno'
import Tutorial, { tutorialNaoVisto } from './Tutorial'

export default function AlunoApp({ uid, perfil }: { uid: string; perfil: Usuario }) {
  const nome = perfil.nome
  const rota = useRota()
  const [tutorial, setTutorial] = useState(tutorialNaoVisto)
  useEffect(() => {
    void inscreverAvisos()
  }, [uid])
  let p: Record<string, string> | null
  let tela = <InicioAluno uid={uid} nome={nome} />
  if ((p = casar('/treino/:mesoId/:semana/:treino', rota)))
    tela = <Treino uid={uid} mesoId={p.mesoId} semana={Number(p.semana)} treino={Number(p.treino)} />
  else if ((p = casar('/relatorio/:mesoId', rota))) tela = <RelatorioAluno uid={uid} nome={nome} mesoId={p.mesoId} />
  else if (rota === '/treino') tela = <Hoje uid={uid} />
  else if (rota === '/metodos') tela = <GuiaMetodos />
  else if (rota === '/evolucao') tela = <EvolucaoAluno uid={uid} nome={nome} />
  else if (rota === '/conta') tela = <ContaAluno uid={uid} perfil={perfil} abrirTutorial={() => setTutorial(true)} />

  // Sem barra na tela do treino (e no fim do treino, que mora nela): ela cobriria os botões.
  const comBarra = !p
  const abas = [
    { rotulo: 'Início', href: '#/', Icone: IcCasa, ativo: rota === '/' },
    { rotulo: 'Treino', href: '#/treino', Icone: IcHaltere, ativo: rota === '/treino' },
    { rotulo: 'Evolução', href: '#/evolucao', Icone: IcGrafico, ativo: rota === '/evolucao' },
    { rotulo: 'Conta', href: '#/conta', Icone: IcPessoa, ativo: rota === '/conta' || rota === '/metodos' },
  ]

  return (
    <div className={`min-h-lvh ${comBarra ? 'pb-barra' : ''}`}>
      <Brilho />
      <AnimatePresence>{tutorial && <Tutorial fechar={() => setTutorial(false)} />}</AnimatePresence>
      <div className="pt-topo">
        <AvisoIOS />
        <Tela chave={rota} abrir={!!p}>{tela}</Tela>
      </div>
      {comBarra && <BarraAbas abas={abas} />}
    </div>
  )
}
