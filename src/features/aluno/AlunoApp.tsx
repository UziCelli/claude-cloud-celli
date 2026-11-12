import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { emAtraso, type Usuario } from '../../lib/acesso'
import { useHoje } from '../../lib/hooks'
import { inscreverAvisos } from '../../lib/push'
import { casar, useRota } from '../../rota'
import { Tela } from '../../ui'
import { IcCasa, IcGrafico, IcHaltere, IcPessoa } from '../../icones'
import { BarraAbas, Brilho } from '../../vidro'
import AvisoAtraso from './AvisoAtraso'
import AvisoIOS from '../instalar/AvisoIOS'
import EvolucaoAluno from './EvolucaoAluno'
import GuiaMetodos from '../metodos/GuiaMetodos'
import FisioAluno from '../fisio/FisioAluno'
import ContaAluno from './ContaAluno'
import Hoje from './Hoje'
import InicioAluno from './InicioAluno'
import Treino from './Treino'
import RelatorioAluno from '../relatorio/RelatorioAluno'
import AnamneseAluno from '../anamnese/AnamneseAluno'
import PausaSaude from '../anamnese/PausaSaude'
import { useAnamnese } from '../anamnese/useAnamnese'
import AvaliacaoAluno from '../avaliacao/AvaliacaoAluno'
import EnviarFeedback from '../feedback/EnviarFeedback'
import Tutorial, { tutorialNaoVisto } from './Tutorial'

export default function AlunoApp({ uid, perfil }: { uid: string; perfil: Usuario }) {
  const nome = perfil.nome
  const rota = useRota()
  const atraso = emAtraso(perfil, useHoje())
  const [tutorial, setTutorial] = useState(tutorialNaoVisto)
  const { pausado } = useAnamnese(uid)
  useEffect(() => {
    void inscreverAvisos()
  }, [uid])
  let p: Record<string, string> | null
  let tela = <InicioAluno uid={uid} nome={nome} />
  if ((p = casar('/treino/:mesoId/:semana/:treino', rota)))
    tela = <Treino uid={uid} mesoId={p.mesoId} semana={Number(p.semana)} treino={Number(p.treino)} />
  else if ((p = casar('/relatorio/:mesoId', rota))) tela = <RelatorioAluno uid={uid} nome={nome} mesoId={p.mesoId} />
  else if ((p = casar('/avaliacao/:id', rota))) tela = <AvaliacaoAluno key={p.id} uid={uid} nome={nome} id={p.id} />
  else if (rota === '/treino') tela = <Hoje uid={uid} />
  else if (rota === '/anamnese') tela = <AnamneseAluno uid={uid} />
  else if (rota === '/metodos') tela = <GuiaMetodos />
  else if (rota === '/fisio') tela = <FisioAluno uid={uid} pausado={pausado} />
  else if (rota === '/feedback') tela = <EnviarFeedback uid={uid} nome={nome} />
  else if (rota === '/evolucao') tela = <EvolucaoAluno uid={uid} nome={nome} />
  else if (rota === '/conta') tela = <ContaAluno uid={uid} perfil={perfil} abrirTutorial={() => setTutorial(true)} />

  // PAR-Q grave: anamnese, conta (LGPD) e alertas Físio continuam acessíveis; FisioAluno oculta protocolos/recados durante a pausa.
  if (pausado && rota !== '/anamnese' && rota !== '/conta' && rota !== '/fisio')
    return (
      <>
        <Brilho />
        <PausaSaude />
      </>
    )

  // Sem barra na tela do treino (e no fim do treino, que mora nela): ela cobriria os botões.
  const interna = !!p || rota === '/anamnese'
  const comBarra = !interna
  const abas = [
    { rotulo: 'Início', href: '#/', Icone: IcCasa, ativo: rota === '/' },
    { rotulo: 'Treino', href: '#/treino', Icone: IcHaltere, ativo: rota === '/treino' },
    { rotulo: 'Evolução', href: '#/evolucao', Icone: IcGrafico, ativo: rota === '/evolucao' },
    { rotulo: 'Conta', href: '#/conta', Icone: IcPessoa, ativo: rota === '/conta' || rota === '/metodos' || rota === '/feedback' || rota === '/fisio' },
  ]

  return (
    <div className={`min-h-lvh ${comBarra ? 'pb-barra' : ''}`}>
      <Brilho />
      {atraso != null && <AvisoAtraso uid={uid} perfil={perfil} dias={atraso} />}
      <AnimatePresence>{tutorial && <Tutorial nome={nome} fechar={() => setTutorial(false)} />}</AnimatePresence>
      <div className="pt-topo">
        <AvisoIOS />
        <Tela chave={rota} abrir={interna}>{tela}</Tela>
      </div>
      {comBarra && <BarraAbas abas={abas} />}
    </div>
  )
}
