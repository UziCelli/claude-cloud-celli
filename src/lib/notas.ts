// Data de uma anotação do aluno ("12/11 · há 2 semanas"), para saber se ela ainda vale.
const SP = 3 * 3_600_000 // São Paulo, sem horário de verão
const diaSP = (ms: number) => Math.floor((ms - SP) / 86_400_000)

// null = hora do servidor ainda pendente (offline): vale agora. undefined = anotação antiga.
export const msDaNota = (v: { toMillis(): number } | null | undefined, agora = Date.now()) =>
  v === undefined ? undefined : v === null ? agora : v.toMillis()

export function dataDaNota(ms: number | undefined, agora = Date.now()): string {
  if (ms == null) return 'sem data'
  const d = new Date(ms - SP)
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dias = diaSP(agora) - diaSP(ms)
  const data = dias >= 365 ? `${dd}/${mm}/${d.getUTCFullYear()}` : `${dd}/${mm}`
  const plural = (n: number, um: string, varios: string) => `há ${n} ${n === 1 ? um : varios}`
  const idade =
    dias <= 0 ? 'hoje'
    : dias === 1 ? 'ontem'
    : dias < 7 ? plural(dias, 'dia', 'dias')
    : dias < 30 ? plural(Math.floor(dias / 7), 'semana', 'semanas')
    : plural(Math.floor(dias / 30), 'mês', 'meses')
  return `${data} · ${idade}`
}

// Confirmação antes de excluir (a anotação some para o aluno e para o coach).
export const confirmarExclusao = (exercicio: string, texto: string, data: string, quemMais: 'o coach' | 'o aluno') =>
  window.confirm(`Excluir a anotação de ${exercicio}?\n\n"${texto}"\n(${data})\n\nEla some para você e para ${quemMais}.`)
