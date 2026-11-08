import { IcVoltar } from './icones'
import { voltar } from './rota'

// "Voltar" padrão das telas internas: volta à tela anterior; se o app abriu nesta tela, vai para `para`.
// `aoVoltar` troca o comportamento (ex.: presencial volta sempre à lista do aluno, não ao aluno anterior do grupo).
// Fora de ui.tsx porque importa o roteador (ui.tsx é usado em testes sem navegador).
export const BotaoVoltar = ({ para = '/', aoVoltar }: { para?: string; aoVoltar?: () => void }) => (
  <button type="button" onClick={() => (aoVoltar ? aoVoltar() : voltar(para))} className="mb-2 -ml-1 inline-flex min-h-11 items-center gap-1 pr-4 text-[15px] text-slate-300 hover:text-white">
    <IcVoltar className="size-5" /> Voltar
  </button>
)
