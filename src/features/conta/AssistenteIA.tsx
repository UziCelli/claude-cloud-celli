import { useState } from 'react'
import { apagarChaveIA, chaveMascarada, chaveValida, refChaveIA, salvarChaveIA } from '../../lib/ia'
import { useDoc } from '../../lib/hooks'
import { Aviso, Botao, Campo, Cartao, Msg } from '../../ui'

// Só coach: cadastra a chave da Anthropic (assistente de voz do editor). A chave inteira nunca volta para a tela.
export default function AssistenteIA() {
  const { dados, carregando, erro: erroLeitura } = useDoc<{ chave: string }>(refChaveIA())
  const [nova, setNova] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState('')

  async function salvar() {
    setErro('')
    setOk('')
    if (!chaveValida(nova)) return setErro('Essa chave não parece certa. Ela começa com sk-ant- (copie inteira no console.anthropic.com).')
    setOcupado(true)
    try {
      await salvarChaveIA(nova)
      setNova('')
      setOk('Chave salva. Já dá para montar o meso por voz no editor.')
    } catch {
      setErro('Não deu para salvar. Confira a internet e a verificação em 2 etapas.')
    } finally {
      setOcupado(false)
    }
  }

  async function remover() {
    if (!confirm('Remover a chave? O assistente de voz para de funcionar até você cadastrar outra.')) return
    setErro('')
    setOk('')
    setOcupado(true)
    try {
      await apagarChaveIA()
      setOk('Chave removida.')
    } catch {
      setErro('Não deu para remover. Tente de novo.')
    } finally {
      setOcupado(false)
    }
  }

  if (carregando) return null
  return (
    <Cartao>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          salvar()
        }}
      >
        <h2 className="font-semibold">Assistente de voz (IA)</h2>
        <p className="text-sm text-slate-400">
          Fale os exercícios no editor do mesociclo e a IA (modelo Haiku, barato) monta a lista. A chave fica guardada só para você; aluno nunca vê.
        </p>
        {erroLeitura ? (
          <Aviso>Ative a verificação em 2 etapas (acima) para cadastrar a chave.</Aviso>
        ) : (
          <>
            {dados?.chave && <p className="text-sm">Chave cadastrada: <span className="font-mono">{chaveMascarada(dados.chave)}</span></p>}
            <Campo
              rotulo={dados?.chave ? 'Trocar a chave' : 'Chave da API (sk-ant-…)'}
              type="password"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              value={nova}
              onChange={(e) => setNova(e.target.value)}
            />
            <Botao tipo="primario" className="w-full" disabled={ocupado || !nova.trim()}>
              {ocupado ? 'Salvando…' : 'Salvar chave'}
            </Botao>
            {dados?.chave && (
              <Botao type="button" className="w-full" disabled={ocupado} onClick={remover}>
                Remover chave
              </Botao>
            )}
          </>
        )}
      </form>
      <Msg>{erro && <Aviso>{erro}</Aviso>}</Msg>
      <Msg>{ok && <Aviso>{ok}</Aviso>}</Msg>
    </Cartao>
  )
}
