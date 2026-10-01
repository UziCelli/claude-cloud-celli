// Aba aberta há muito tempo continua rodando o código antigo mesmo depois de publicar: o service
// worker novo assume, mas a página não recarrega sozinha. Na tela de login é seguro recarregar
// (não há carga nem edição para perder). versao.json vem do mesmo cache do service worker que
// serviria a página no recarregamento, então nunca recarrega para a mesma versão.
const MARCA = 'forca-recarregou'

export const deveRecarregar = (disponivel: string | null, atual: string, jaTentou: string | null) =>
  !!disponivel && disponivel !== atual && jaTentou !== disponivel

async function versaoDisponivel(): Promise<string | null> {
  try {
    const r = await fetch('/versao.json', { cache: 'no-store' })
    return r.ok ? ((await r.json()) as { versao?: string }).versao ?? null : null
  } catch {
    return null
  }
}

export function atualizarNaEntrada() {
  const sw = navigator.serviceWorker
  let ativo = true
  const conferir = async () => {
    const v = await versaoDisponivel()
    try {
      if (!ativo || !deveRecarregar(v, __VERSAO__, sessionStorage.getItem(MARCA))) return
      sessionStorage.setItem(MARCA, v!) // tenta cada versão uma vez só: nunca entra em laço
    } catch {
      return // sem armazenamento não dá para evitar laço: não recarrega
    }
    location.reload()
  }
  conferir()
  sw?.addEventListener('controllerchange', conferir)
  sw?.getRegistration().then((r) => r?.update()).catch(() => {})
  return () => {
    ativo = false
    sw?.removeEventListener('controllerchange', conferir)
  }
}
