import type { ReactNode } from 'react'
import Logo from '@marca/Logo'
import { Cartao } from '../../ui'
import marca from '@marca/marca.json'

// Caixa obrigatória do cadastro e da tela de aceite (mesmo texto nos dois).
export function CaixaAceite({ marcada, onChange }: { marcada: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-3 text-sm">
      <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-marca-500" checked={marcada} onChange={(e) => onChange(e.target.checked)} />
      <span>
        Li e aceito a{' '}
        <a href="/privacidade" target="_blank" rel="noopener" className="underline">Política de Privacidade</a>, inclusive o uso dos meus
        dados de saúde (peso e treinos)
      </span>
    </label>
  )
}

const Secao = ({ n, titulo, children }: { n: number; titulo: string; children: ReactNode }) => (
  <Cartao className="space-y-2 text-sm text-slate-300">
    <h2 className="font-semibold text-slate-100">{n}. {titulo}</h2>
    {children}
  </Cartao>
)

const Lista = ({ children }: { children: ReactNode }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>

// Página pública /privacidade (sem login).
export default function Politica() {
  return (
    <main className="mx-auto max-w-md space-y-4 px-4 pb-8 pt-[calc(2rem+env(safe-area-inset-top))]">
      <h1 className="flex flex-col items-center gap-3 text-center text-2xl font-bold">
        <Logo className="h-10 text-white" />
        Política de Privacidade
      </h1>
      <p className="text-center text-xs text-slate-500">Versão vigente: 09/10/2026</p>
      <Secao n={1} titulo="Quem cuida dos seus dados">
        <p>
          {marca.responsavel.nome}, personal trainer (CREF {marca.responsavel.cref}), é {marca.responsavel.papel} pelos dados do app {marca.nome}. Contato:{' '}
          {marca.responsavel.contato}.
        </p>
      </Secao>
      <Secao n={2} titulo="Dados que usamos">
        <Lista>
          <li>Nome e e-mail (login).</li>
          <li>Peso corporal.</li>
          <li>Foto de perfil (opcional).</li>
          <li>Valor da mensalidade e o aviso de pagamento ("Já paguei").</li>
          <li>Treinos, cargas, repetições e anotações.</li>
          <li>Horários de treino.</li>
          <li>Registros técnicos de erro (aparelho/navegador, tela, horário).</li>
        </Lista>
        <p>
          A foto de perfil é opcional: só você e o seu coach a veem, e ela fica guardada em tamanho pequeno no banco de dados do app.
          Você remove quando quiser (aba Conta) e ela é apagada junto com a conta.
        </p>
        <p>Não pedimos CPF, data de nascimento, endereço nem cartão.</p>
      </Secao>
      <Secao n={3} titulo="Dados de saúde">
        <p>
          Peso e informações de treino podem ser dados de saúde (dados sensíveis, LGPD art. 11). Só os usamos com o seu consentimento
          específico, dado ao aceitar esta política.
        </p>
      </Secao>
      <Secao n={4} titulo="Para quê">
        <p>
          Montar e ajustar seu treino, acompanhar sua evolução, liberar o acesso conforme o pagamento, avisar o fim do descanso (se você
          permitir notificações) e manter o app funcionando e seguro.
        </p>
      </Secao>
      <Secao n={5} titulo="Com quem">
        <p>Não vendemos nem cedemos dados para propaganda.</p>
        <Lista>
          <li>
            Usamos serviços que guardam ou processam os dados por nós: Google Firebase (login, banco de dados e site), Cloudflare (aviso
            de fim do descanso; não guarda nada depois do aviso) e GitHub (cópias de segurança e manutenção).
          </li>
          <li>Alguns ficam fora do Brasil, com proteções de segurança.</li>
        </Lista>
      </Secao>
      <Secao n={6} titulo="Por quanto tempo">
        <Lista>
          <li>Enquanto você for aluno.</li>
          <li>
            Se você pedir a exclusão, apagamos tudo (perfil, login, treinos, cargas, anotações e registros de erro) em até 24 horas,
            inclusive das cópias de segurança.
          </li>
          <li>Registros de erro e cópias de segurança são apagados sozinhos após 30 dias.</li>
          <li>Os provedores podem levar um tempo extra para limpar as cópias internas deles.</li>
        </Lista>
      </Secao>
      <Secao n={7} titulo="Seus direitos (LGPD art. 18)">
        <p>
          Confirmar se usamos seus dados, ver e receber uma cópia, corrigir, pedir a exclusão, revogar o consentimento (o que encerra o uso
          do app) e tirar dúvidas. Basta pedir {marca.responsavel.pedirA} pelo WhatsApp. Respondemos em até 15 dias.
        </p>
      </Secao>
      <Secao n={8} titulo="Segurança">
        <p>
          Conexão criptografada; regras que impedem um aluno de ver dados de outro; acesso do coach com verificação em 2 etapas; proteção
          contra robôs (reCAPTCHA); saída automática por inatividade.
        </p>
      </Secao>
      <Secao n={9} titulo="Mudanças">
        <p>Se esta política mudar, o app pede o seu aceite de novo.</p>
      </Secao>
      {/* No iPhone (app na Tela de Início) não há botão de voltar do navegador. */}
      <a href="/" className="block text-center text-sm text-slate-400 underline hover:text-slate-200">Voltar ao app</a>
    </main>
  )
}
