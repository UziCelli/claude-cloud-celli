import { useEffect, useState } from 'react'
import { importarMeso } from '../../../lib/acoes'
import { registrarErro } from '../../../lib/log'
import { abaSugerida, planilhaParaMeso, type Importado } from '../../../lib/planilha'
import { abrirPlanilha, type Planilha } from '../../../lib/xlsx'
import { ir } from '../../../rota'
import { Botao, campoBase, Campo, Cartao, Msg } from '../../../ui'
import { nomeImportado } from './util'

export default function ImportarPlanilha({ uid, qtdMesos, onFechar }: { uid: string; qtdMesos: number; onFechar: () => void }) {
  const [planilha, setPlanilha] = useState<Planilha | null>(null)
  const [aba, setAba] = useState('')
  const [nome, setNome] = useState('')
  const [previa, setPrevia] = useState<{ ok: Importado } | { erro: string } | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  async function escolher(arquivo?: File) {
    setPlanilha(null)
    setPrevia(null)
    setAba('')
    setErro(null)
    if (!arquivo) return
    if (arquivo.size > 15e6) return setPrevia({ erro: 'Arquivo grande demais (máximo 15 MB).' })
    try {
      const p = await abrirPlanilha(await arquivo.arrayBuffer())
      const a = abaSugerida(p.abas) ?? p.abas[0] ?? ''
      setPlanilha(p)
      setAba(a)
      setNome(nomeImportado(a, qtdMesos))
    } catch (e) {
      setPrevia({ erro: e instanceof Error ? e.message : 'Não foi possível ler a planilha.' })
    }
  }

  function trocarAba(a: string) {
    setAba(a)
    setNome(nomeImportado(a, qtdMesos))
  }

  useEffect(() => {
    if (!planilha || !aba) return
    let vivo = true
    setPrevia(null)
    planilha
      .ler(aba)
      .then((c) => planilhaParaMeso(c))
      .then((ok) => vivo && setPrevia({ ok }))
      .catch((e) => vivo && setPrevia({ erro: e instanceof Error ? e.message : 'Não foi possível converter esta aba.' }))
    return () => {
      vivo = false
    }
  }, [planilha, aba])

  async function importar() {
    if (enviando || !previa || !('ok' in previa) || !nome.trim()) return
    setEnviando(true)
    setErro(null)
    try {
      const { id, gravado } = await importarMeso(uid, nome.trim(), previa.ok)
      ir(`/meso/${id}`)
      gravado.catch((e) => registrarErro('gravacao', `importar meso: ${e?.code ?? e}`, e))
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Não foi possível importar.')
      setEnviando(false)
    }
  }

  return (
    <Cartao className="mb-4 max-w-xl space-y-3">
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-slate-400">Planilha (.xlsx)</span>
        <input
          type="file"
          accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(e) => escolher(e.target.files?.[0])}
          className="text-base text-slate-300"
        />
      </label>
      <p className="text-xs text-slate-500">A planilha é lida só neste aparelho.</p>
      {planilha && (
        <>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-400">Aba</span>
            <select value={aba} onChange={(e) => trocarAba(e.target.value)} className={`${campoBase} px-3 py-2`}>
              {planilha.abas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <Campo rotulo="Nome do mesociclo" value={nome} onChange={(e) => setNome(e.target.value)} />
        </>
      )}
      {previa && 'erro' in previa && (
        <p role="alert" className="text-sm text-red-400">
          {previa.erro}
        </p>
      )}
      {previa && 'ok' in previa && <Previa {...previa.ok} />}
      <Msg>{erro && <p role="alert" className="text-sm text-red-400">{erro}</p>}</Msg>
      <div className="flex flex-wrap gap-2">
        <Botao tipo="primario" disabled={!previa || !('ok' in previa) || !nome.trim() || enviando} carregando={enviando} onClick={importar}>
          Importar
        </Botao>
        <Botao onClick={onFechar}>Cancelar</Botao>
      </div>
    </Cartao>
  )
}

function Previa({ meso, registros, deFora }: Importado) {
  return (
    <div className="space-y-1 rounded-lg bg-slate-950 p-3 text-sm" data-testid="previa">
      <p>Início: {meso.inicio.split('-').reverse().join('/')}</p>
      <p>
        {meso.semanas} semanas · {meso.frequencia} treinos por semana
      </p>
      <ul className="text-slate-400">
        {meso.divisao.map((t, i) => (
          <li key={i}>
            Treino {i + 1}: {t.map((s) => s.nome).join(', ') || 'vazio'}
          </li>
        ))}
      </ul>
      <p>
        {registros.length} {registros.length === 1 ? 'treino realizado' : 'treinos realizados'} com carga
      </p>
      {deFora > 0 && (
        <p className="text-xs text-slate-500">
          {deFora} {deFora === 1 ? 'treino com carga marcado como Não realizado fica' : 'treinos com carga marcados como Não realizado ficam'} de
          fora. Se foi feito, marque Realizado na planilha e importe de novo.
        </p>
      )}
    </div>
  )
}
