import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Sidebar from '../../../shared/components/Sidebar';
import PageMeta from '../../../shared/components/PageMeta';
import { searchArticles } from '../data/news';
import { BRAND_EMOJI } from '@js/brand';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';

  const results = useMemo(() => searchArticles(query), [query]);

  const description = query
    ? `Resultados da busca por "${query}" no ${BRAND_EMOJI.news} Mundo News.`
    : 'Busque notícias por título, resumo, autor ou tags.';

  return (
    <>
      <PageMeta
        title={query ? `Busca: ${query}` : 'Buscar notícias'}
        description={description}
        path={query ? `/busca?q=${encodeURIComponent(query)}` : '/busca'}
        noIndex={Boolean(query)}
      />
      <main className="page__main">
        <div className="container page-grid page-grid--home">
          <div>
            <header className="category-header">
              <h1 className="category-header__title">
                {BRAND_EMOJI.search} {query ? `Resultados para “${query}”` : 'Buscar notícias'}
              </h1>
              <p className="category-header__description">
                {query
                  ? `${results.length} ${results.length === 1 ? 'matéria encontrada' : 'matérias encontradas'}.`
                  : 'Digite um termo no campo de busca do cabeçalho para encontrar matérias.'}
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
                <p>Nenhuma matéria encontrada para &ldquo;{query}&rdquo;.</p>
                <p>
                  Tente outros termos ou navegue pelas{' '}
                  <Link to="/brasil">seções do portal</Link>.
                </p>
              </div>
            )}

            {!query && (
              <div className="search-empty">
                <p>Use o campo de busca no topo do site para pesquisar notícias.</p>
              </div>
            )}
          </div>

          <Sidebar />
        </div>
      </main>
    </>
  );
}
