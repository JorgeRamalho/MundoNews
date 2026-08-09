import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeProvider';

interface GiscusCommentsProps {
  slug: string;
}

export default function GiscusComments({ slug }: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const repo = import.meta.env.VITE_GISCUS_REPO;
  const repoId = import.meta.env.VITE_GISCUS_REPO_ID;
  const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID;
  const category = import.meta.env.VITE_GISCUS_CATEGORY ?? 'Announcements';
  const mapping = import.meta.env.VITE_GISCUS_MAPPING ?? 'pathname';
  const isConfigured = Boolean(repo && repoId && categoryId);

  useEffect(() => {
    if (!isConfigured || !containerRef.current) return;

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', repo!);
    script.setAttribute('data-repo-id', repoId!);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId!);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-term', slug);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', document.documentElement.lang || 'pt');
    script.setAttribute('data-loading', 'lazy');

    containerRef.current.appendChild(script);
  }, [category, categoryId, isConfigured, mapping, repo, repoId, slug, theme]);

  return (
    <section className="comments" aria-label={t('comments.title')}>
      <h2 className="comments__title">{t('comments.title')}</h2>
      {isConfigured ? (
        <div ref={containerRef} className="comments__embed" />
      ) : (
        <p className="comments__placeholder">{t('comments.notConfigured')}</p>
      )}
    </section>
  );
}
