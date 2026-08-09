import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

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
          Buscar notícias
        </label>
        <input
          id="header-search"
          className="header__search-input"
          type="search"
          name="q"
          placeholder="Buscar…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="header__search-btn" aria-label="Enviar busca">
          🔍
        </button>
      </form>
      <Link to="/busca" className="header__search-mobile" aria-label="Ir para busca">
        🔍
      </Link>
    </>
  );
}
