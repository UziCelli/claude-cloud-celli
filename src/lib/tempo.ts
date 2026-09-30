// Exibição do tempo do treino: o motor é preciso, a tela arredonda para cima.
export const fmtMin = (min: number) => `${Math.ceil(min)} min`

export const acimaDoLimite = (min: number, limite?: number) => limite != null && min > limite
