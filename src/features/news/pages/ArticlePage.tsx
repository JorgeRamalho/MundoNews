import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug } from '../data/news';
import PageMeta from '../../../shared/components/PageMeta';
import {
  formatDateTime,
  getCategoryLabel,
  getCategoryBadgeClass,
} from '@js/utils';
import { breadcrumbJsonLd, newsArticleJsonLd } from '@js/seo';
import { CATEGORY_ROUTES } from '@js/constants';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <>
        <PageMeta
          title="Matéria não encontrada"
          description="A notícia que você procura não existe ou foi removida."
          path={`/noticia/${slug ?? ''}`}
          noIndex
        />
        <main className="page__main">
          <div className="container not-found">
            <div className="not-found__code">404</div>
            <h1 className="not-found__title">Matéria não encontrada</h1>
            <p className="not-found__text">
              A notícia que você procura não existe ou foi removida.
            </p>
            <Link to="/" className="btn btn--primary">Voltar ao início</Link>
          </div>
        </main>
      </>
    );
  }

  const paragraphs = article.content.split('\n\n').filter(Boolean);
  const path = `/noticia/${article.slug}`;
  const categoryPath = CATEGORY_ROUTES[article.category] ?? '/';
  const categoryLabel = getCategoryLabel(article.category);

  return (
    <>
      <PageMeta
        title={article.title}
        description={article.excerpt}
        path={path}
        image={article.imageUrl}
        imageAlt={article.imageAlt}
        type="article"
        publishedTime={article.publishedAt}
        author={article.author}
        tags={article.tags}
        jsonLd={[
          newsArticleJsonLd(article, path),
          breadcrumbJsonLd([
            { name: 'Início', path: '/' },
            { name: categoryLabel, path: categoryPath },
            { name: article.title, path },
          ]),
        ]}
      />
      <main className="page__main">
        <article className="container" style={{ maxWidth: '800px' }}>
          <header className="article-header">
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className={getCategoryBadgeClass(article.category)}>
                {getCategoryLabel(article.category)}
              </span>
              {article.isBreaking && (
                <span className="badge badge--breaking">Urgente</span>
              )}
            </div>

            <h1 className="article-header__title">{article.title}</h1>

            <div className="article-header__meta">
              <span>Por <strong>{article.author}</strong> — {article.authorRole}</span>
              <time dateTime={article.publishedAt}>
                {formatDateTime(article.publishedAt)}
              </time>
            </div>
          </header>

          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            className="article-hero-image"
          />

          <div className="article-body">
            <p style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
              {article.excerpt}
            </p>
            {paragraphs.slice(0, 2).map((paragraph, index) => (
              <p key={`lead-${index}`}>{paragraph}</p>
            ))}

            {article.gallery && article.gallery.length > 0 && (
              <div className="article-gallery">
                {article.gallery.map((image) => (
                  <figure key={image.url} className="article-gallery__item">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="article-gallery__image"
                      loading="lazy"
                    />
                    {(image.caption || image.alt) && (
                      <figcaption className="article-gallery__caption">
                        {image.caption ?? image.alt}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            {paragraphs.slice(2).map((paragraph, index) => (
              <p key={`body-${index}`}>{paragraph}</p>
            ))}
          </div>

          {article.tags.length > 0 && (
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>
                Tags:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-block',
                    margin: '0.25rem',
                    padding: '0.2rem 0.6rem',
                    background: 'var(--color-bg)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <Link to="/" className="btn btn--outline">← Voltar às notícias</Link>
          </div>
        </article>
      </main>
    </>
  );
}
