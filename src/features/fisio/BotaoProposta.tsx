import type { MesoSalvo } from '../../lib/conversores'
import { classesBotao } from '../../ui'
import { prepararProposta } from './propostaEditor'

// "Preparar proposta": abre o editor do meso ativo com o polimento já montado nos exercícios da região
// (o coach revisa a prévia e aplica). Sem meso ativo ou sem semana seguinte: abre a tela do aluno.
export default function BotaoProposta({ mesoDoc, regiao, motivo, alunoId }: { mesoDoc?: MesoSalvo & { id: string }; regiao: string | null; motivo: string; alunoId: string }) {
  const abrir = () => {
    const destino = mesoDoc ? prepararProposta(mesoDoc, regiao, motivo) : null
    location.hash = destino ?? `#/aluno/${alunoId}`
  }
  return <button type="button" onClick={abrir} className={classesBotao('vidro', 'md', 'inline-flex items-center justify-center')}>Preparar proposta no meso</button>
}
