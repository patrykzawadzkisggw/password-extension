import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PasswordButtonAdder from './components/PasswordButtonAdder.tsx';

const rootElement = document.getElementById('mypasswordManagerPopup');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Drugi root (np. dla innego elementu w HTML)
const anotherRootElement = document.getElementById('gen-password-button');
if (anotherRootElement) {
  createRoot(anotherRootElement).render(
    <StrictMode>
      <PasswordButtonAdder />
    </StrictMode>
  );
}