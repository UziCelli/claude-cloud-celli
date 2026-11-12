// A persistência só é apagada depois de confirmar todas as gravações.
// Se não houver rede, preserva a fila e mantém a sessão para tentar novamente.
export async function sincronizarAntesDeSair(esperar: () => Promise<void>, prazo = 5000) {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      esperar(),
      new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('Ainda há dados para sincronizar. Conecte-se à internet e tente sair novamente.')), prazo) }),
    ])
  } finally {
    clearTimeout(timer)
  }
}
