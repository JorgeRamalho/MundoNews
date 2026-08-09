import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Garante que cada navegação comece no topo da página (ex.: ao abrir uma reportagem). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
