import { requisitosSenha } from '../../lib/senha'

// Debaixo do campo de senha nova: cada requisito fica verde com ✓ assim que é cumprido,
// e "Senha forte" aparece quando todos estão ok. `repete`: confere também a repetição.
export default function RequisitosSenha({ senha, repete }: { senha: string; repete?: string }) {
  const lista = requisitosSenha(senha)
  const forte = lista.every((r) => r.ok)
  return (
    <div className="mt-1.5 text-sm">
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {lista.map((r) => (
          <li key={r.texto} className={r.ok ? 'text-emerald-400' : 'text-slate-300'}>
            <span aria-hidden>{r.ok ? '✓' : '○'} </span>
            {r.texto}
            <span className="sr-only">{r.ok ? ': ok' : ': falta'}</span>
          </li>
        ))}
      </ul>
      {/* Só os resumos são anunciados pelo leitor de tela (a lista mudaria a cada tecla). */}
      <div aria-live="polite">
        {forte && <p className="mt-1 font-semibold text-emerald-400">✓ Senha forte</p>}
        {repete !== undefined && repete !== '' && (
          <p className={`mt-1 ${repete === senha ? 'text-emerald-400' : 'text-amber-300'}`}>
            {repete === senha ? '✓ As senhas são iguais' : 'As senhas ainda não são iguais'}
          </p>
        )}
      </div>
    </div>
  )
}
