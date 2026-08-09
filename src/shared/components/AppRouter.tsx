import type { ReactNode } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { shouldUseHashRouter } from '@js/router';

interface AppRouterProps {
  children: ReactNode;
}

export default function AppRouter({ children }: AppRouterProps) {
  if (shouldUseHashRouter()) {
    return <HashRouter>{children}</HashRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}
