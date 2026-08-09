import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS_BRANDED } from '@js/brand';
import Logo from './Logo';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo variant="header" />

        <nav
          className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
          aria-label="Navegação principal"
        >
          {NAV_LINKS_BRANDED.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`header__nav-link${location.pathname === link.path ? ' header__nav-link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="header__nav-emoji" aria-hidden="true">{link.emoji}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="header__menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
