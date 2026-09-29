import type { Meso } from '../../../engine'
import { Botao, Cartao } from '../../../ui'

type Tabela = 'principais' | 'auxiliares'

export default function TabProgressao({ meso, onAtualizar }: { meso: Meso; onAtualizar: (patch: Partial<Meso>) => void }) {
  function setCelula(tabela: Tabela, w: number, s: number, val: number | null) {
    const tab = meso.progressao[tabela].map((r) => [...r])
    tab[w - 1][s - 1] = val
    onAtualizar({ progressao: { ...meso.progressao, [tabela]: tab } })
  }

  function copiarAnterior(tabela: Tabela, w: number) {
    if (w < 2) return
    const tab = meso.progressao[tabela].map((r) => [...r])
    tab[w - 1] = [...tab[w - 2]]
    onAtualizar({ progressao: { ...meso.progressao, [tabela]: tab } })
  }

  function aplicarSemana1(tabela: Tabela) {
    const linha1 = meso.progressao[tabela][0] ?? []
    const tab = meso.progressao[tabela].map(() => [...linha1])
    onAtualizar({ progressao: { ...meso.progressao, [tabela]: tab } })
  }

  return (
    <div className="space-y-4">
      <TabelaProgressao titulo="Principais (posições 1–2)" tabela="principais" meso={meso} setCelula={setCelula} copiarAnterior={copiarAnterior} aplicarSemana1={aplicarSemana1} />
      <TabelaProgressao titulo="Auxiliares (posições 3–10)" tabela="auxiliares" meso={meso} setCelula={setCelula} copiarAnterior={copiarAnterior} aplicarSemana1={aplicarSemana1} />
    </div>
  )
}

function TabelaProgressao({
  titulo,
  tabela,
  meso,
  setCelula,
  copiarAnterior,
  aplicarSemana1,
}: {
  titulo: string
  tabela: Tabela
  meso: Meso
  setCelula: (tabela: Tabela, w: number, s: number, val: number | null) => void
  copiarAnterior: (tabela: Tabela, w: number) => void
  aplicarSemana1: (tabela: Tabela) => void
}) {
  const linhas = meso.progressao[tabela]
  return (
    <Cartao>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold">{titulo}</h3>
        <Botao onClick={() => aplicarSemana1(tabela)}>Aplicar semana 1 em todas</Botao>
      </div>
      <div className="overflow-x-auto">
      <table className="mx-auto border-separate border-spacing-x-0.5 border-spacing-y-1 text-sm md:mx-0 md:w-full md:border-spacing-2">
        <thead>
          <tr>
            <th className="text-left text-slate-400">
              <span className="md:hidden">Sem</span>
              <span className="hidden md:inline">Semana</span>
            </th>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((s) => (
              <th key={s} className="text-center font-normal text-slate-400 md:text-left">
                <span className="md:hidden">S{s}</span>
                <span className="hidden md:inline">Série {s}</span>
              </th>
            ))}
            <th className="hidden md:table-cell" />
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => {
            const w = i + 1
            return (
              <tr key={w}>
                <td className="text-slate-400">
                  <span className="md:hidden">S{w}</span>
                  <span className="hidden md:inline">{w}</span>
                  {w > 1 && (
                    <button type="button" aria-label="Copiar anterior" onClick={() => copiarAnterior(tabela, w)} className="block px-1 text-marca-300 md:hidden">
                      ↑
                    </button>
                  )}
                </td>
                {linha.map((v, j) => (
                  <td key={j}>
                    <input
                      type="number"
                      value={v ?? ''}
                      onChange={(e) => setCelula(tabela, w, j + 1, e.target.value === '' ? null : Number(e.target.value))}
                      className="w-11 rounded-lg border border-slate-700 bg-slate-950 px-0 py-1 text-center text-base md:w-16 md:px-2 md:text-left text-slate-100 outline-none focus:border-marca-500"
                    />
                  </td>
                ))}
                <td className="hidden md:table-cell">
                  {w > 1 && (
                    <Botao onClick={() => copiarAnterior(tabela, w)} className="text-xs">
                      Copiar anterior
                    </Botao>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </Cartao>
  )
}
