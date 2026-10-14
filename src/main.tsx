import React from 'react';
import ReactDOM from 'react-dom/client';
import { LazyMotion, MotionConfig } from 'motion/react';
import App from './App';
import './index.css';
import { iniciarLog } from './lib/log';

iniciarLog();

// Só renderiza depois que as animações carregaram: se a 1ª tela montar antes, o AnimatePresence
// perde a animação de saída e a tela de abertura nunca some (login não aparece).
type Features = Parameters<typeof LazyMotion>[0]['features']
const montar = (features: Features) =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <LazyMotion features={features} strict>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LazyMotion>
    </React.StrictMode>
  );
const carregar = () => import('./motionFeatures').then((x) => x.default);
// Se o chunk falhar (rede), monta mesmo assim no modo assíncrono antigo em vez de ficar em branco.
carregar().then(montar, () => montar(carregar));

// Android: ao voltar ao app o Chrome às vezes não redesenha as camadas de GPU (tela preta); 1 quadro de opacidade força o redesenho.
const redesenhar = () => {
  document.body.style.opacity = '0.999';
  requestAnimationFrame(() => requestAnimationFrame(() => { document.body.style.opacity = ''; }));
};
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') redesenhar(); });
window.addEventListener('pageshow', (e) => { if (e.persisted) redesenhar(); });
