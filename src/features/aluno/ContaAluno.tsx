import { sair } from '../../lib/acoes'
import { IcLivro, IcPessoa, IcPrancheta, IcSair, IcSeta } from '../../icones'
import { IconeQuadrado, Quadro } from '../../vidro'
import type { ReactNode } from 'react'

const Linha = ({ icone, children }: { icone: ReactNode; children: ReactNode }) => (
  <span className="flex min-h-12 w-full items-center gap-3 text-left text-base font-semibold">
    <IconeQuadrado>{icone}</IconeQuadrado>
    <span className="flex-1">{children}</span>
    <IcSeta className="size-5 text-slate-500" />
  </span>
)

// Aba Conta do aluno: o que o cabeçalho antigo tinha (Como usar, Sair) mais o guia e a política (LGPD).
export default function ContaAluno({ nome, abrirTutorial }: { nome: string; abrirTutorial: () => void }) {
  return (
    <main className="mx-auto max-w-md space-y-4 px-4 py-4">
      <h1 className="pt-2 text-[30px] leading-tight">{nome}</h1>
      <Quadro className="divide-y divide-white/10 !py-1">
        <button type="button" onClick={abrirTutorial} className="block w-full py-2">
          <Linha icone={<IcPrancheta className="size-5" />}>Como usar</Linha>
        </button>
        <a href="#/metodos" className="toque block py-2">
          <Linha icone={<IcLivro className="size-5" />}>Guia de métodos</Linha>
        </a>
        <a href="/privacidade" className="toque block py-2">
          <Linha icone={<IcPessoa className="size-5" />}>Política de Privacidade</Linha>
        </a>
      </Quadro>
      <button type="button" onClick={sair} className="vidro-escuro flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold text-rose-300">
        <IcSair className="size-5" /> Sair
      </button>
    </main>
  )
}
