import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContextProvider } from './context/ToastContext';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </BrowserRouter>
  </StrictMode>
);
