import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewsCard from '../components/NewsCard';
import Sidebar from '../../../shared/components/Sidebar';
import PageMeta from '../../../shared/components/PageMeta';
import { searchArticles } from '../data/article-repository';
import { BRAND_EMOJI } from '@js/brand';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const { t } = useTranslation();

  const results = useMemo(() => searchArticles(query), [query]);

  return (
    <>
      <PageMeta
        title={query ? `${t('search.title')}: ${query}` : t('search.title')}
        description={query ? t('search.resultsFor', { query }) : t('search.hint')}
        path={query ? `/busca?q=${encodeURIComponent(query)}` : '/busca'}
        noIndex={Boolean(query)}
      />
      <main className="page__main">
        <div className="container page-grid page-grid--home">
          <div>
            <header className="category-header">
              <h1 className="category-header__title">
                {BRAND_EMOJI.search}{' '}
                {query ? t('search.resultsFor', { query }) : t('search.title')}
              </h1>
              <p className="category-header__description">
                {query
                  ? t('search.found', { count: results.length })
                  : t('search.hint')}
              </p>
            </header>

            {query && results.length > 0 && (
              <div className="news-grid news-grid--2">
                {results.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="search-empty">
                <p>{t('search.empty', { query })}</p>
                <p>
                  {t('search.tryOther')}{' '}
                  <Link to="/brasil">{t('search.sections')}</Link>.
                </p>
              </div>
            )}

            {!query && (
              <div className="search-empty">
                <p>{t('search.useHeader')}</p>
              </div>
            )}
          </div>

          <Sidebar />
        </div>
      </main>
    </>
  );
}
