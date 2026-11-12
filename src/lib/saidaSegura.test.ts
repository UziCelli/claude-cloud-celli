import { describe, it, expect, vi } from 'vitest'
import { sincronizarAntesDeSair } from './saidaSegura'
describe('saída segura', () => {
  it('aguarda confirmação do servidor', async () => {
    let confirmar!: () => void
    const fila = new Promise<void>(r => { confirmar = r })
    let pronta = false
    const saida = sincronizarAntesDeSair(() => fila).then(() => { pronta = true })
    await Promise.resolve()
    expect(pronta).toBe(false)
    confirmar()
    await saida
    expect(pronta).toBe(true)
  })
  it('recusa saída com fila pendente, sem descartar gravações', async () => {
    vi.useFakeTimers()
    const saida = sincronizarAntesDeSair(() => new Promise(() => {}))
    const erro = expect(saida).rejects.toThrow('sincronizar')
    await vi.advanceTimersByTimeAsync(5000)
    await erro
    vi.useRealTimers()
  })
  it('não permite limpeza se sincronização falhar', async () => {
    await expect(sincronizarAntesDeSair(() => Promise.reject(new Error('sem conexão')))).rejects.toThrow('sem conexão')
  })
})
