import { createRoot } from 'react-dom/client';
import { LazyMotion } from 'framer-motion';
import App from './App.jsx';
import './styles.css';

const loadMotionFeatures = () => import('./motion-features.js').then((module) => module.default);
createRoot(document.getElementById('root')).render(
  <LazyMotion features={loadMotionFeatures} strict>
    <App />
  </LazyMotion>,
);
