// Formatação pt-BR compartilhada pela visão da semana.
export const fmt = (v: number | null) => (v == null ? '—' : v.toLocaleString('pt-BR', { maximumFractionDigits: 1 }))

export const fmtData = (isoDia: string) => {
  const [, mes, dia] = isoDia.slice(0, 10).split('-')
  return `${dia}/${mes}`
}
