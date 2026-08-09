import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError(t('newsletter.invalidEmail'));
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
        <p>{t('newsletter.success')}</p>
      </div>
    );
  }

  return (
    <div className="newsletter">
      <h3 className="newsletter__title">{t('newsletter.title')}</h3>
      <p className="newsletter__text">{t('newsletter.text')}</p>
      <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          {t('newsletter.emailLabel')}
        </label>
        <input
          id="newsletter-email"
          className="newsletter__input"
          type="email"
          name="email"
          placeholder={t('newsletter.placeholder')}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />
        <button type="submit" className="newsletter__btn">
          {t('newsletter.submit')}
        </button>
      </form>
      {error && (
        <p className="newsletter__error" role="alert">
          {error}
        </p>
      )}
      <p className="newsletter__hint">
        {t('newsletter.orRss')}{' '}
        <a href="/feed.xml" className="newsletter__rss-link">
          {t('newsletter.rssLink')}
        </a>
        .
      </p>
    </div>
  );
}
