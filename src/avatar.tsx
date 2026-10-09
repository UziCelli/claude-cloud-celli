import marca from '@marca/marca.json'

const iniciais = (nome: string) =>
  nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

// Foto em círculo; sem foto, iniciais sobre gradiente da marca. `selo`: ícone da marca no canto, como "verificado".
export function Avatar({ img, nome, selo, tamanho }: { img?: string; nome: string; selo?: boolean; tamanho: number }) {
  const s = Math.round(tamanho * 0.35)
  return (
    <span className="relative inline-block shrink-0" style={{ width: tamanho, height: tamanho }}>
      {img ? (
        <img src={img} alt={`Foto de ${nome}`} className="size-full rounded-full object-cover" />
      ) : (
        <span
          aria-hidden
          className="grid size-full place-items-center rounded-full bg-gradient-to-br from-marca-500 to-marca-700 font-bold text-white"
          style={{ fontSize: tamanho * 0.4 }}
        >
          {iniciais(nome)}
        </span>
      )}
      {selo && (
        <img
          src="/icon.svg"
          alt={`Selo ${marca.nome}`}
          className="absolute -bottom-px -right-px rounded-full bg-slate-900 ring-2 ring-slate-900"
          style={{ width: s, height: s }}
        />
      )}
    </span>
  )
}
