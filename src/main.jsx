import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
// import ReactDOM from 'react-dom/client'
import { ToastContextProvider } from "./context/ToastContext";
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <App />
 </React.StrictMode>,
)

root.render(
  <StrictMode>
    <ToastContextProvider>
      <App />
    </ToastContextProvider>
  </StrictMode>
);