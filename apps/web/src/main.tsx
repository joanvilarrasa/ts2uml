import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ReactFlowProvider } from '@xyflow/react';
import App from './app';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './theme-provider';
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReactFlowProvider>
        <App />
        <Toaster />
      </ReactFlowProvider>
    </ThemeProvider>
  </StrictMode>
);
