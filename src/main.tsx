import React from 'react';
import ReactDOM from 'react-dom/client';
import { LazyMotion, MotionConfig } from 'motion/react';
import App from './App';
import './index.css';

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
