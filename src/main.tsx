import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { normalizeInitialPath } from '@js/router';
import { applyTheme, getInitialTheme } from '@js/theme';
import AppRouter from './shared/components/AppRouter';
import App from './App';
import '@css/style.css';
import '@css/components.css';

normalizeInitialPath();
applyTheme(getInitialTheme());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppRouter>
        <App />
      </AppRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
