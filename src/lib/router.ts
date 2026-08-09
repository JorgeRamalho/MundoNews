/**
 * Roteamento adaptativo — BrowserRouter em produção/Vite, HashRouter no Live Server.
 *
 * O Live Server não faz fallback SPA: URLs como /brasil retornam 404 do servidor.
 * Com HashRouter (#/brasil), a navegação funciona sem configuração extra.
 */

export function shouldUseHashRouter(): boolean {
  if (typeof window === 'undefined') return false;

  const { pathname, port } = window.location;

  // Live Server via html5/index.html ou dist/ na porta do projeto
  return pathname.includes('/html5') || port === '5502';
}

export function normalizeInitialPath(): void {
  if (typeof window === 'undefined') return;
  if (shouldUseHashRouter()) return;

  const { pathname, search, hash } = window.location;
  if (!pathname.endsWith('/index.html')) return;

  const base = pathname.replace(/\/index\.html$/, '') || '/';
  const next = `${base}${search}${hash}`;
  window.history.replaceState(null, '', next);
}
