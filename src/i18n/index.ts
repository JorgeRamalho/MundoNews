import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

export const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const STORAGE_KEY = 'mundonews-lang';

function getInitialLanguage(): AppLanguage {
  if (typeof window === 'undefined') return 'pt';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'pt' || stored === 'en' || stored === 'es') return stored;
  const browser = navigator.language.slice(0, 2);
  if (browser === 'en' || browser === 'es') return browser;
  return 'pt';
}

void i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    es: { translation: es },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (language) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEY, language);
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language;
}

export default i18n;

export function localeToBcp47(language: string): string {
  if (language === 'en') return 'en-US';
  if (language === 'es') return 'es-ES';
  return 'pt-BR';
}
