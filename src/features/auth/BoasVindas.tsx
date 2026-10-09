import { AnimatePresence, m } from 'motion/react'
import { saida, suave } from '../../movimento'
import { useState } from 'react'
import Logo from '@marca/Logo'
import { Brilho, IconeQuadrado } from '../../vidro'
import { IcBaixar, IcCompartilhar, IcGrafico, IcHaltere, IcMais, IcNuvem, IcPontos, IcSeta } from '../../icones'
import { eAndroid, eIOS, navegadorEmbutido, useEventoInstalar } from '../instalar/Instalar'

const VISTO = 'forca-boas-vindas-visto'
const FORCAR = 'forca-boas-vindas-forcar'

const ler = (k: string) => {
  try {
    return localStorage.getItem(k)
  } catch {
    return null
  }
}

// Só no navegador e só na 1ª visita (marca no aparelho, sem IP). O e2e (webdriver) não vê, a não ser que force.
export const deveMostrarBoasVindas = (instalado: boolean) =>
  !instalado && !ler(VISTO) && (!navigator.webdriver || !!ler(FORCAR))

export function marcarBoasVindasVistas() {
  try {
    localStorage.setItem(VISTO, '1')
  } catch {
    /* sem armazenamento: só mostra de novo na próxima visita */
  }
}

const VANTAGENS = [
  { Icone: IcHaltere, texto: 'Treino do dia pronto' },
  { Icone: IcNuvem, texto: 'Cargas salvas, mesmo offline' },
  { Icone: IcGrafico, texto: 'Veja sua evolução' },
]

const Linha = ({ children, destaque = false }: { children: React.ReactNode; destaque?: boolean }) => (
  <div className={`flex h-12 items-center justify-between rounded-xl px-3.5 text-base font-semibold ${destaque ? 'bg-marca-500/30 text-white ring-2 ring-marca-400' : 'bg-white/10 text-white'}`}>{children}</div>
)

// O Safari não deixa a página abrir o menu: a folha mostra o caminho inteiro e aponta para o botão ⋯.
function FolhaIPhone({ onFechar }: { onFechar: () => void }) {
  return (
    <>
      <m.div className="fixed inset-0 z-30 bg-black/65" onClick={onFechar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: saida }} transition={suave} />
      <m.div
        aria-hidden
        initial={{ y: -8 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.1, repeat: Infinity }}
        className="fixed bottom-[88px] right-[22px] z-40 text-marca-300 drop-shadow-lg"
      >
        <IcSeta className="size-14 rotate-90" />
      </m.div>
      <m.section
        role="dialog"
        aria-label="Instalar no iPhone"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0, transition: saida }}
        transition={suave}
        className="fixed inset-x-3 bottom-[148px] z-40 mx-auto max-w-[406px] rounded-3xl bg-slate-900 p-5 text-left ring-1 ring-white/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_20px_50px_rgb(0_0_0/0.6)]"
      >
        <h2 className="text-[26px] leading-tight text-white">Toque em <IcPontos className="inline size-7 text-marca-300" /> aqui embaixo</h2>
        <div className="mt-4 space-y-2 rounded-2xl bg-black/30 p-2.5">
          <Linha>Compartilhar <IcCompartilhar className="size-5" /></Linha>
          <Linha destaque>Adicionar à Tela de Início <span className="grid size-6 place-items-center rounded-md border-2 border-white"><IcMais className="size-4" /></span></Linha>
          <div className="flex h-12 items-center justify-center rounded-xl bg-blue-500 text-base font-bold text-white">Adicionar</div>
        </div>
        <p className="mt-4 text-base leading-snug text-white">O menu do iPhone vai cobrir esta tela. Siga: Compartilhar → Adicionar à Tela de Início → Adicionar.</p>
        {navegadorEmbutido() && <p className="mt-2 text-[15px] leading-snug text-marca-300">Só funciona no Safari. Se abriu por outro app, copie o link e cole no Safari.</p>}
        <button type="button" className="mt-3 h-11 w-full text-[16px] font-semibold text-slate-200 underline underline-offset-4" onClick={onFechar}>Agora não</button>
      </m.section>
    </>
  )
}

export default function BoasVindas({ onCriar, onEntrar }: { onCriar: () => void; onEntrar: () => void }) {
  const evento = useEventoInstalar()
  const [folha, setFolha] = useState(false)
  const [dica, setDica] = useState(false)
  const ios = eIOS()
  const android = eAndroid()

  const escolher = (fn: () => void) => () => {
    marcarBoasVindasVistas()
    fn()
  }
  const instalar = () => (ios ? setFolha(true) : evento ? evento.prompt() : setDica(true))

  return (
    <div className="min-h-dvh">
      <Brilho />
      <main className="mx-auto max-w-sm px-5 pb-8 pt-[calc(1rem+env(safe-area-inset-top))] text-left">
        <Logo className="h-9 text-white" />
        <h1 className="mt-6 font-display text-[32px] font-extrabold leading-[1.1]">Seu treino na palma da mão</h1>
        <p className="mt-2 text-base leading-snug text-slate-200">Treinos do seu coach, suas cargas e sua evolução. Funciona até sem internet.</p>

        <ul className="mt-5 space-y-3">
          {VANTAGENS.map(({ Icone, texto }) => (
            <li key={texto} className="flex items-center gap-3 text-[17px] font-semibold text-white">
              <IconeQuadrado><Icone className="size-5" /></IconeQuadrado>
              {texto}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-3">
          <button type="button" className="h-14 w-full rounded-2xl bg-marca-500 text-[17px] font-bold text-white shadow-lg" onClick={escolher(onCriar)}>Criar minha conta</button>
          <button type="button" className="vidro-escuro h-14 w-full rounded-2xl text-[17px] font-bold text-white" onClick={escolher(onEntrar)}>Já tenho conta</button>
        </div>

        {(ios || android) && (
          <div className="vidro-escuro mt-4 rounded-3xl p-3.5">
            <div className="flex items-center gap-3">
              <IconeQuadrado><IcBaixar className="size-5" /></IconeQuadrado>
              <div>
                <p className="text-base font-bold leading-tight text-white">Instale o app no celular</p>
                <p className="text-[15px] text-slate-200">Leva 30 segundos</p>
              </div>
            </div>
            <button type="button" className="mt-3 h-12 w-full rounded-xl bg-white/15 text-[16px] font-bold text-white" onClick={instalar}>Como instalar</button>
            {dica && !evento && <p className="mt-2 text-[15px] text-slate-200">No Chrome, toque em <strong>⋮</strong> e escolha <strong>Instalar app</strong>.</p>}
          </div>
        )}

        <p className="mt-4 text-center"><a href="/privacidade" className="text-[15px] font-medium text-slate-200 underline underline-offset-4">Política de Privacidade</a></p>
      </main>
      <AnimatePresence>{folha && <FolhaIPhone onFechar={() => setFolha(false)} />}</AnimatePresence>
    </div>
  )
}
