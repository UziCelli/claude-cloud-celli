// Seletor "Treino | Físio" no topo dos guias do coach.
export default function SeletorGuia({ ativo }: { ativo: 'treino' | 'fisio' }) {
  const item = (on: boolean) => `flex min-h-11 flex-1 items-center justify-center rounded-lg text-sm font-semibold ${on ? 'bg-marca-600 text-white' : 'text-slate-300'}`
  return (
    <nav aria-label="Tipo de guia" className="mb-3 flex gap-1 rounded-xl border border-slate-700 bg-slate-900 p-1">
      <a href="#/metodos" aria-current={ativo === 'treino' ? 'page' : undefined} className={item(ativo === 'treino')}>Treino</a>
      <a href="#/fisio" aria-current={ativo === 'fisio' ? 'page' : undefined} className={item(ativo === 'fisio')}>Físio</a>
    </nav>
  )
}
