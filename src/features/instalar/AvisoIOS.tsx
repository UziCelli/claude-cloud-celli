// Banner para lembrar alunos no iPhone/iPad de instalar o app (evita perder treinos).
// Outro agente monta este componente no app do aluno.
const iOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent))
const standalone = () => matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true

export default function AvisoIOS() {
  if (!iOS() || standalone()) return null
  return (
    <div className="border-b border-amber-700 bg-amber-950/50 px-3 py-2 text-center text-sm text-amber-200">
      Para não perder seus treinos, instale o app: toque em Compartilhar → Adicionar à Tela de Início ·{' '}
      <a href="/instalar" className="underline">
        Como instalar
      </a>
    </div>
  )
}

export { AvisoIOS }
