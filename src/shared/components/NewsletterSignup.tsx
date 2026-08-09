import { useState, type FormEvent } from 'react';
import { BRAND_EMOJI } from '@js/brand';

const STORAGE_KEY = 'mundonews-newsletter';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError('Informe um e-mail válido.');
      return;
    }

    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(`${STORAGE_KEY}-email`, trimmed);
    setSubscribed(true);
    setEmail('');
  }

  if (subscribed) {
    return (
      <div className="newsletter newsletter--success" role="status">
        <p>
          {BRAND_EMOJI.email} Obrigado! Você está inscrito para receber as principais notícias do
          Mundo News.
        </p>
      </div>
    );
  }

  return (
    <div className="newsletter">
      <h3 className="newsletter__title">
        {BRAND_EMOJI.email} Newsletter
      </h3>
      <p className="newsletter__text">
        Receba os destaques do dia no seu e-mail. Sem spam — só fatos verificados.
      </p>
      <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          E-mail para newsletter
        </label>
        <input
          id="newsletter-email"
          className="newsletter__input"
          type="email"
          name="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />
        <button type="submit" className="newsletter__btn">
          Inscrever-se
        </button>
      </form>
      {error && (
        <p className="newsletter__error" role="alert">
          {error}
        </p>
      )}
      <p className="newsletter__hint">
        Ou assine o{' '}
        <a href="/feed.xml" className="newsletter__rss-link">
          feed RSS
        </a>
        .
      </p>
    </div>
  );
}
