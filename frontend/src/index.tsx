import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.scss';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
