import { useTranslation } from 'react-i18next';
import NewsCard from '../components/NewsCard';
import Sidebar from '../../../shared/components/Sidebar';
import PageMeta from '../../../shared/components/PageMeta';
import type { NewsCategory } from '../../../shared/types';
import { getArticlesByCategory } from '../data/article-repository';
import { breadcrumbJsonLd } from '@js/seo';
import { BRAND } from '@js/brand';

interface CategoryPageProps {
  category: NewsCategory;
}

const categoryPaths: Record<NewsCategory, string> = {
  brasil: '/brasil',
  mundo: '/mundo',
  opiniao: '/opiniao',
  esporte: '/esporte',
  artigo: '/artigos',
  breaking: '/',
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const { t } = useTranslation();
  const articles = getArticlesByCategory(category);
  const label = t(`category.${category}`);
  const path = categoryPaths[category];
  const description = t(`category.desc.${category}`, { defaultValue: BRAND.description });

  return (
    <>
      <PageMeta
        title={label}
        description={description}
        path={path}
        jsonLd={breadcrumbJsonLd([
          { name: t('nav.home'), path: '/' },
          { name: label, path },
        ])}
      />
      <main className="page__main">
        <div className="container page-grid page-grid--home">
          <div>
            <header className="category-header">
              <h1 className="category-header__title">{label}</h1>
              <p className="category-header__description">{description}</p>
            </header>

            {articles.length > 0 ? (
              <div className="news-grid news-grid--2">
                {articles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>{t('category.empty')}</p>
            )}
          </div>

          <Sidebar />
        </div>
      </main>
    </>
  );
}
