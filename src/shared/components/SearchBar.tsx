import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/busca?q=${encodeURIComponent(trimmed)}`);
    setQuery('');
  }

  return (
    <>
      <form className="header__search header__search--desktop" onSubmit={handleSubmit} role="search">
        <label htmlFor="header-search" className="sr-only">
          {t('nav.search')}
        </label>
        <input
          id="header-search"
          className="header__search-input"
          type="search"
          name="q"
          placeholder={t('common.searchPlaceholder')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="header__search-btn" aria-label={t('nav.searchSubmit')}>
          🔍
        </button>
      </form>
      <Link to="/busca" className="header__search-mobile" aria-label={t('nav.goToSearch')}>
        🔍
      </Link>
    </>
  );
}
