import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type AppLanguage } from '../../i18n';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    void i18n.changeLanguage(event.target.value as AppLanguage);
  }

  return (
    <label className="language-switcher">
      <span className="sr-only">{t('lang.label')}</span>
      <select
        className="language-switcher__select"
        value={i18n.language}
        onChange={handleChange}
        aria-label={t('lang.label')}
      >
        {SUPPORTED_LANGUAGES.map((code) => (
          <option key={code} value={code}>
            {code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
