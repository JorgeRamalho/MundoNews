import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  { path: '/', key: 'nav.home', emoji: '🏠' },
  { path: '/brasil', key: 'nav.brazil', emoji: '🇧🇷' },
  { path: '/mundo', key: 'nav.world', emoji: '🌎' },
  { path: '/opiniao', key: 'nav.opinion', emoji: '💬' },
  { path: '/esporte', key: 'nav.sports', emoji: '⚽' },
  { path: '/artigos', key: 'nav.articles', emoji: '📄' },
  { path: '/sobre', key: 'nav.about', emoji: 'ℹ️' },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo variant="header" />

        <nav
          className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
          aria-label={t('nav.main')}
        >
          {NAV_ITEMS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`header__nav-link${location.pathname === link.path ? ' header__nav-link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="header__nav-emoji" aria-hidden="true">{link.emoji}</span>
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <SearchBar />
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="header__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
