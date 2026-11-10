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
        dados de saúde (peso, avaliação física e treinos)
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
      <p className="text-center text-xs text-slate-500">Versão vigente: 10/11/2026 (anamnese, avaliação física e lipedema)</p>
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
          <li>Cardio (dia, tipo e minutos).</li>
          <li>Avaliação física, se o seu coach fizer: data, idade, sexo, peso, altura, perímetros, dobras cutâneas, bioimpedância, o recado do coach e, se existir, a condição de saúde lipedema (braços e/ou pernas).</li>
          <li>Anamnese (histórico de saúde): respostas sobre saúde, dores, rotina e treino, e se você tem menos de 18 anos, a autorização do responsável.</li>
          <li>Sua opinião e depoimentos (nota, assunto e texto).</li>
          <li>Registros técnicos de erro (aparelho/navegador, tela, horário).</li>
        </Lista>
        <p>
          A foto de perfil é opcional: só você e o seu coach a veem, e ela fica guardada em tamanho pequeno no banco de dados do app.
          Você remove quando quiser (aba Conta) e ela é apagada junto com a conta.
        </p>
        <p>
          Sua opinião: você escolhe enviar com o seu nome ou anônima. A anônima não guarda quem enviou. Só {marca.responsavel.nome} lê. O depoimento só é usado com a autorização que você marca ao enviar, só com o seu primeiro nome, na divulgação de {marca.nome} (Instagram e
          site). Você pode pedir para retirar a qualquer momento, e ele sai junto no "apagar de vez".
        </p>
        <p>
          Avaliação física: quem mede e registra é {marca.responsavel.nome}. Só você e o seu coach veem, e você só vê depois que ele libera.
          O IMC, o percentual de gordura, as setas coloridas e o texto de evolução são calculados no seu aparelho, sem enviar suas medidas para outro serviço.
          A informação sobre lipedema só é marcada pelo seu coach, serve apenas para interpretar as suas medidas e você a vê no seu relatório.
          Não guardamos foto do corpo. O PDF é montado no seu aparelho; depois de baixado ou compartilhado, o arquivo fica sob o seu cuidado.
        </p>
        <p>
          Anamnese: você responde no app, pelo celular, no começo e a cada ciclo de treino, e pode ver e atualizar quando quiser (aba Conta). Só você e o seu coach
          veem. Não enviamos suas respostas para inteligência artificial nem para terceiros, e elas saem junto no "apagar de vez". Se você tem menos de 18 anos, um
          responsável legal precisa autorizar ao responder. Um "sim" nas perguntas de saúde mostra um aviso para procurar um médico, mas não bloqueia o seu treino.
        </p>
        <p>Não pedimos CPF, data de nascimento (só a idade, na avaliação física), endereço nem cartão.</p>
      </Secao>
      <Secao n={3} titulo="Dados de saúde">
        <p>
          Peso, medidas da avaliação física (perímetros, dobras, percentual de gordura), condições como o lipedema, respostas da anamnese (doenças, dores, remédios, gestação) e informações de treino são dados de saúde (dados
          sensíveis, LGPD art. 11). Só os usamos com o seu consentimento específico, dado ao aceitar esta política.
        </p>
      </Secao>
      <Secao n={4} titulo="Para quê">
        <p>
          Montar e ajustar seu treino, acompanhar sua evolução (inclusive pela avaliação física), liberar o acesso conforme o pagamento, avisar o fim do descanso (se você
          permitir notificações) e manter o app funcionando e seguro.
        </p>
      </Secao>
      <Secao n={5} titulo="Com quem">
        <p>Não vendemos nem cedemos dados para propaganda.</p>
        <Lista>
          <li>
            Usamos serviços que guardam ou processam os dados por nós: Google Firebase (login, banco de dados e site), Cloudflare (envio das
            notificações; guarda só o endereço de notificação do aparelho e quais avisos estão ligados) e GitHub (cópias de segurança e manutenção).
          </li>
          <li>Alguns ficam fora do Brasil, com proteções de segurança.</li>
        </Lista>
      </Secao>
      <Secao n={6} titulo="Por quanto tempo">
        <Lista>
          <li>Enquanto você for aluno.</li>
          <li>
            Se você pedir a exclusão, apagamos tudo (perfil, login, treinos, cargas, anotações, cardio, avaliações físicas, anamneses, opiniões enviadas com nome e registros de erro) em até 24 horas,
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
          Conexão criptografada; dados guardados criptografados pelo Google; regras que impedem um aluno de ver dados de outro; acesso do
          coach com verificação em 2 etapas; proteção contra robôs (reCAPTCHA); saída automática por inatividade.
        </p>
        <p>
          Senha com no mínimo 8 caracteres, com letra e número. Ela é guardada pelo Google de um jeito que ninguém consegue ler, nem o coach.
          Quem tinha senha mais fraca precisa criar uma nova para continuar usando o app.
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
